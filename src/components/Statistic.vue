<!-- 统计组件 -->
<template>
    <div class="statistic-card">
        <!-- 自然排名 -->
        <div class="statistic-item">
            <div class="statistic-tooltip">
                <span class="statistic-title">自然排名</span>
                <el-tooltip effect="dark" content="最后数据减去前一日数据，红色增长，绿色下降。" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                    </el-icon>
                </el-tooltip>
            </div>
            <div class="statistic-value">
                <strong>{{ props.current[0] || '无值' }}</strong>
                <Drift :cur="props.current[0]" :pre="props.previous[0]"></Drift>
            </div>
        </div>
        <el-divider />
        <!-- 广告排名 -->
        <div class="statistic-item">
            <div class="statistic-tooltip">
                <span class="statistic-title">广告排名</span>
                <el-tooltip effect="dark" content="最后数据减去前一日数据，红色增长，绿色下降。" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                    </el-icon>
                </el-tooltip>
            </div>
            <div class="statistic-value" style="color: #ffc20e;">
                <strong>{{ props.current[1] || '无值' }}</strong>
                <Drift :cur="props.current[1]" :pre="props.previous[1]"></Drift>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
import Drift from './Drift.vue';
import _ from 'lodash';

// 接收父组件数据
const props = defineProps({
    // 当前数据
    current: {
        type: Array,
        default: ['-' ,'-'] // index：0 为自然排名当前值， index:1为sp排名当前值 
    },
    // 对比数据
    previous: {
        type: Array,
        default: ['-', '-'] // index：0 为自然排名当对比值， index:1为sp排名对比值
    }
});

</script>

<style>
.el-divider--horizontal {
    margin: 10px 0;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    width: 100%;
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