<template>
    <div class="modules-containter">
        <!-- 汇率模块 -->
        <div class="modules-item">
            <div class="mudules-innter">
                <div class="modules-title">
                    <h2 class="title">今日汇率</h2>
                    <el-tooltip class="box-item" effect="dark" content="点击刷新汇率" placement="top">
                        <el-button :icon="Refresh" circle size="small" @click="updateHandle" />
                    </el-tooltip>
                </div>
                <div class="modules-description">
                    <template v-if="exchangeRef.length > 0">
                        <ul class="modules-list">
                            <li v-for="item in exchangeRef">
                                <span> 1 </span>{{ item.c_name }}<span> ≈ </span>{{ item.buy_rate }}<span> 人民币 </span>
                            </li>
                        </ul>
                        <p class="modules-footer">更新时间:{{ updateRef }}</p>
                    </template>
                    <template v-else>
                        <p style="color:red;">请检查服务器或第三方接口状态</p>
                    </template>
                </div>
            </div>
        </div>
        <!-- 国际时间 -->
        <div class="modules-item">
            <div class="mudules-innter">
                <div class="modules-title">
                    <h2 class="title">美国时间</h2>
                </div>
                <div class="modules-description">
                    <div class="us-times">
                        <!-- 时：分 秒 -->
                        <div class="us-time">
                            <strong class="big">{{ USTime.hour }}</strong>
                            <strong class="big">:</strong>
                            <strong class="big">{{ USTime.minute }}</strong>
                            <span class="small">{{ USTime.second }}</span>
                        </div>
                        <!-- 星期 -->
                        <div class="us-week">{{ USTime.week }}</div>
                        <!-- 年月日 -->
                        <div class="us-year">{{ USTime.year }} / {{ USTime.month }} / {{ USTime.date }}</div>
                    </div>
                    <div class="bj-time">
                        <span>北京时间：</span> 
                        <span class="p-10" style="width: 80px; display: inline-block;">{{ BJTime.hour }}:{{ BJTime.minute }}:{{ BJTime.second }} </span>
                        <span>{{ BJTime.week }}</span>
                        <span class="p-10">{{ BJTime.year }} / {{ BJTime.month }} / {{ BJTime.date }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modules-item">
            <div class="mudules-innter">
                <div class="modules-title">
                    <h2 class="title">其他</h2>
                </div>
                <p class="modules-description">
                    更新中...
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watchEffect, onUpdated } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import moment from 'moment';
// 接收父组件属性
const props = defineProps({
    // 汇率数据
    data: {
        type: Object,
        default: () => { },
    }
});

// 接收父组件方法
const emit = defineEmits(["updateTrigger"]);
// 需要显示的外汇
const avalible = ['美元', '欧元', '日元', '英镑'];
// 汇率列表
const exchangeRef = ref([]);
// 汇率更新时间
const updateRef = ref('');
// 触发父组件更新汇率
const updateHandle = () => {
    emit('updateTrigger');
}

// 解析数据：更新时间、数据列表、状态
watchEffect(() => {
    const { update, list, status } = props.data;
    if (status === 200) {
        updateRef.value = update;
        exchangeRef.value = list.filter(item => {
            for (const name of avalible) {
                if (item.c_name === name) {
                    return item
                }
            }
        })
    }
})

// 美国时间相关函数
const USTimeRef = ref();
const USTime = reactive({
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: '',
    second: '',
    week: '',
});
const BJTime = reactive({
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: '',
    second: '',
    week: '',
})

let timer = null;
/**
 * 初始化时间
 * @param { Boolean } isUTC 是否显示UTC时间 默认false 
 * @return { Object } { now: '2022-12-12 12:12:12 星期日'}
 * */ 
const initTime = ( isUTC = false ) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const moments = isUTC ? moment.utc() : moment();
    const year   = moments.year();
    const month  = (+moments.month() + 1).toString().length === 1 ? `0${+moments.month()+1}` : +moments.month()+1 ;
    const date   = moments.date().toString().length === 1 ? `0${moments.date()}` : moments.date() ;
    const hour   = moments.hour().toString().length === 1 ? `0${moments.hour()}` : moments.hour() ;
    const minute = moments.minute().toString().length === 1 ? `0${moments.minute()}` : moments.minute() ;
    const second = moments.second().toString().length === 1 ? `0${moments.second()}` : moments.second() ;
    const week   = weekdays[moments.day()];
    return {
        now: `${year} - ${month} - ${date} ${hour} : ${minute} : ${second} ${week}`,
        year,
        month,
        date,
        hour,
        minute,
        second,
        week
    }
}
// 时钟定时器
const updateTimer = () => {
    timer = setInterval(() => {
        let nowUS = initTime(true);
        let nowBJ = initTime(false);
        // clearInterval(timer);
        // 设置美国时间
        USTime.year   = nowUS.year;
        USTime.month  = nowUS.month;
        USTime.date   = nowUS.date;
        USTime.hour   = nowUS.hour;
        USTime.minute = nowUS.minute;
        USTime.second = nowUS.second;
        USTime.week   = nowUS.week;
        // // 设置北京时间
        BJTime.year   = nowBJ.year;
        BJTime.month  = nowBJ.month;
        BJTime.date   = nowBJ.date;
        BJTime.hour   = nowBJ.hour;
        BJTime.minute = nowBJ.minute;
        BJTime.second = nowBJ.second;
        BJTime.week   = nowBJ.week;
    }, 1000)
};
// 执行函数调用
initTime();
updateTimer();

onUpdated(() => {
    clearInterval(timer);
    updateTimer();
})


</script>

<style scoped>
.modules-containter {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding: 50px;

    .modules-item {
        display: block;
        width: calc(100% / 3);
        padding: 8px;

        .mudules-innter {
            color: #2C3E50;
            padding: 24px;
            border: 1px solid #f6f6f7;
            border-radius: 12px;
            height: 100%;
            background-color: #f6f6f7;
            transition: box-shadow .25s, background-color .25s, transform .25s;

            &:hover {
                /* border-color: #a8b1ff; */
                box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
                transform: scale(1.01);
            }
        }

        .modules-title {
            display: flex;
            justify-content: space-between;

            .title {
                line-height: 24px;
                font-size: 16px;
                font-weight: 600;
                color: #3C3C43;
            }
        }

        .modules-description {
            flex-grow: 1;
            padding-top: 8px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(60, 60, 67, 0.78);

            .modules-footer {
                text-align: right;
                margin: 5px;
            }
            .us-time{
                float: left;
                width: 60%;
                padding-top: 20px;
                .big{
                    font-size: 42px;
                    padding: 20px 5px;
                }
                .small{
                    font-size: 20px;
                    padding: 10px 5px;
                }
            }
            .us-week{
                width: 40%;
                float: left;
                font-size: 20px;
                margin-bottom: 10px;
                padding: 10px 0;
            }
            .us-year{
                float: left;
                width: 40%;
                font-size: 14px;
                padding: 10px 0;
            }
            .bj-time{
                clear: both;
                text-align: right;
                .p-10{
                    padding: 0 10px;
                }
            }
        }
    }
}


/* 简单适配移动端 */
@media (max-width: 896px) {
    .modules-containter {
        display: block;
        padding: 50px;

        .modules-item {
            width: 100%;

            .mudules-innter {
                padding: 12px;
            }
        }
    }
}
</style>