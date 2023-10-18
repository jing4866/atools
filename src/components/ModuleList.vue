<template>
    <div class="modules-containter">
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
        <div class="modules-item">
            <div class="mudules-innter">
                <div class="modules-title">
                    <h2 class="title">美国时间</h2>
                </div>
                <p class="modules-description">
                    08:30:22 星期一 2023-10-12
                    比北京慢12小时
                </p>
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
import { onMounted, ref, watchEffect } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
// 接收父组件属性
const props = defineProps({
    // 组件内容
    data: {
        type: Object,
        default: () => { },
    }
});

// 接收父组件方法
const emit = defineEmits(["updateTrigger"]);
// 需要显示的外汇
const avalible = ['美元', '欧元', '日元', '英镑'];

const exchangeRef = ref([]);
const updateRef = ref('');

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