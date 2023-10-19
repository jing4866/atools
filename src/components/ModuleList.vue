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
                    <ul class="modules-list">
                        <li v-for="item in exchangeRef">
                            <span> 1 </span>{{ item.c_name }}<span> ≈ </span>{{ item.buy_rate }}<span> 人民币 </span>
                        </li>
                    </ul>
                    <p class="modules-footer">更新时间:{{ updateRef }}</p>
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
                        <div class="us-week" v-if="USTime.week===0">星期日</div>
                        <div class="us-week" v-else-if="USTime.week===1">星期一</div>
                        <div class="us-week" v-else-if="USTime.week===2">星期二</div>
                        <div class="us-week" v-else-if="USTime.week===3">星期三</div>
                        <div class="us-week" v-else-if="USTime.week===4">星期四</div>
                        <div class="us-week" v-else-if="USTime.week===5">星期五</div>
                        <div class="us-week" v-else="USTime.week===6">星期六</div>
                        <!-- 年月日 -->
                        <div class="us-year">{{ USTime.year }} 年 {{ USTime.month }} 月 {{ USTime.date }} 日</div>
                    </div>
                    <div class="bj-time">
                        <span>北京时间：</span> 
                        <span class="p-10">{{ BJTime.hour }}:{{ BJTime.minute }}:{{ BJTime.second }} </span>
                        <span v-if="BJTime.week===0">星期日</span>
                        <span v-else-if="BJTime.week===1">星期一</span>
                        <span v-else-if="BJTime.week===2">星期二</span>
                        <span v-else-if="BJTime.week===3">星期三</span>
                        <span v-else-if="BJTime.week===4">星期四</span>
                        <span v-else-if="BJTime.week===5">星期五</span>
                        <span v-else="BJTime.week===6">星期六</span>
                        <span class="p-10">{{ BJTime.year }} 年 {{ BJTime.month }} 月 {{ BJTime.date }} 日</span>
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
import { onMounted, reactive, ref, watchEffect } from 'vue';
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
console.log(moment.utc().format(), 'time')



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
const updateTimer = () => {
    timer = setInterval(() => {
        // clearInterval(timer);
        // 设置美国时间
        USTime.year = moment.utc().year();
        USTime.month = moment.utc().month();
        USTime.date = moment.utc().date();
        USTime.hour = moment.utc().hour().toString().length === 1 ? `0${moment.utc().hour()}`: moment.utc().hour();
        USTime.minute = moment.utc().minute().toString().length === 1 ? `0${moment.utc().minute()}`: moment.utc().minute();
        USTime.second = moment.utc().second().toString().length === 1 ? `0${moment.utc().second()}`: moment.utc().second();
        USTime.week = moment.utc().day();
        // 设置北京时间
        BJTime.year = moment().year();
        BJTime.month = moment().month();
        BJTime.date = moment().date();
        BJTime.hour = moment().hour().toString().length === 1 ? `0${moment().hour()}`: moment().hour();
        BJTime.minute = moment().minute().toString().length === 1 ? `0${moment().minute()}`: moment().minute();
        BJTime.second = moment().second().toString().length === 1 ? `0${moment().second()}`: moment().second();
        BJTime.week = moment().day();
    }, 1000)
};

updateTimer();





</script>

<style scoped>
.modules-containter {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding: 100px;

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
                    font-size: 50px;
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
                font-size: 16px;
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