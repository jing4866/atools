<!-- 统计组件 -->
<template>
    <div class="statistic-card">
        <!-- 自然流量 -->
        <div class="statistic-item">
            <div class="statistic-tooltip">
                <span class="statistic-title">今日自然排名</span>
                <el-tooltip effect="dark" content="当日数据减去前一日数据，红色增长，绿色下降。" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                    </el-icon>
                </el-tooltip>
            </div>
            <div class="statistic-value">
                <strong>{{ staticReactive['n'] }}</strong>
                <span :class="staticReactive['n_diff'] > 0 ? 'red' : 'green'">
                    {{ staticReactive['n_diff'] }}
                    <el-icon>
                        <CaretTop v-if="staticReactive['n_diff'] > 0" />
                        <CaretBottom v-else />
                    </el-icon>
                </span>
            </div>
        </div>
        <el-divider />
        <div class="statistic-item">
            <div class="statistic-tooltip">
                <span class="statistic-title">今日广告排名</span>
                <el-tooltip effect="dark" content="当日数据减去前一日数据，红色增长，绿色下降。" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                    </el-icon>
                </el-tooltip>
            </div>
            <div class="statistic-value" style="color: #ffc20e;">
                <strong>{{ staticReactive['sp'] }}</strong>
                <span :class="staticReactive['sp_diff'] > 0 ? 'red' : 'green'">
                    {{ staticReactive['sp_diff'] }}
                    <el-icon>
                        <CaretTop v-if="staticReactive['sp_diff'] > 0" />
                        <CaretBottom v-else />
                    </el-icon>
                </span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import _ from 'lodash';

// 接收父组件数据
const props = defineProps({
    data: Object,  // 包含数据： {keyword:'', count: 0, data:[]}
});

// 解构 props 数据
const { keyword, data } = props.data;
// 定义变量并提出最后两项数据
// 数据内容 {关键词: '', 自然排名: '', sp广告排名: '-', 下载日期: '', ASIN: ''}
let staticReactive = reactive({});
let tempData = data;
// 截取目标数据
if (data && data.length > 0) {
    // 至少有两项数据
    tempData = data.slice(-2);
}

staticReactive = tempData.length === 2 ? tempData.reduce((prev, next) => {
    // 处理非法数据数据 
    const n_diff = next['自然排名'] - prev['自然排名'];
    const sp_diff = next['sp广告排名'] - prev['sp广告排名'];

    return {
        n_diff: _.isNaN(n_diff) ? '-' : n_diff,
        sp_diff: _.isNaN(sp_diff) ? '-' : sp_diff,
        n: prev['自然排名'],
        sp: prev['sp广告排名'],
        prev_date: prev['下载日期'],
        next_date: next['下载日期'],
        asin: next['ASIN']
    }
}) : tempData.map(item => {
    item.n_diff = '-';
    item.sp_diff = '-';
    item.n = item['自然排名'];
    item.sp = item['sp广告排名'];
    item.prev_date = item['下载日期'];
    item.next_date = item['下载日期'];
    item.asin = item['ASIN'];
    return item
})[0]

</script>

<style>
.el-divider--horizontal {
    margin: 10px 0;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);

    .statistic-title {
        font-size: 12px;
        line-height: 20px;
        color: #606266;
    }

    .statistic-value {
        display: flex;
        color: #41a5ee;
        font-size: 20px;
        font-weight: 400;
        justify-content: space-between;
    }

    .statistic-desc {
        font-size: 12px;
        line-height: 20px;
        color: #606266;
        padding-right: 3px;
    }
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    font-size: 14px;
    line-height: 30px;
    color: var(--el-color-success);
}

.red {
    font-size: 14px;
    line-height: 30px;
    color: var(--el-color-error);
}
</style>