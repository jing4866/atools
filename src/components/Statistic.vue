<!-- 统计组件 -->
<template>
    <div class="statistic-card">
        <!-- 自然流量 -->
        <el-statistic :value="currentVals['自然排名']">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                    自然流量
                    <el-tooltip effect="dark" content="当日数据减去前一日数据，红色增长，绿色下降。"
                        placement="top">
                        <el-icon style="margin-left: 4px" :size="12">
                            <Warning />
                        </el-icon>
                    </el-tooltip>
                </div>
            </template>
        </el-statistic>
        <div class="statistic-footer">
            <div class="footer-item">
                <span>与昨日环比</span>
                <span :class="currentVals['自然排名'] - prevVals['自然排名']> 0 ? 'red': 'green'">
                    {{ currentVals['自然排名'] - prevVals['自然排名'] }}
                    <!-- <el-icon>
                        {{ ${currentVals['自然排名'] - prevVals['自然排名']} > 0 ? <CaretTop />  :  <CaretBottom /> }}
                    </el-icon> -->
                </span>
            </div>
        </div>
        <el-divider />
        <!-- 广告流量 -->
        <el-statistic :value="currentVals['sp广告排名']">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                    广告流量
                    <el-tooltip effect="dark" content="最后一日与前一日广告流量环比"
                        placement="top">
                        <el-icon style="margin-left: 4px" :size="12">
                            <Warning />
                        </el-icon>
                    </el-tooltip>
                </div>
            </template>
        </el-statistic>
        <div class="statistic-footer">
            <div class="footer-item">
                <span>与昨日环比</span>
                <span class="green">
                    {{ currentVals['sp广告排名'] - prevVals['sp广告排名'] }}
                    <el-icon>
                        <CaretTop />
                    </el-icon>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';

// 接收父组件数据
const props = defineProps({
  data : Object,  // 包含数据： {keyword:'', count: 0, data:[]}
});

// 解构 props 数据
const { keyword, data } = props.data;
// 定义变量并提出最后两项数据
// 数据内容 {关键词: '', 自然排名: '', sp广告排名: '-', 下载日期: '', ASIN: ''}
let staticReactive = reactive({});
let tempData = data;
if( data && data.length > 0){
    // 至少有两项数据
    staticReactive = data.slice(-2);
}

// console.log(staticReactive)
const a = staticReactive.reduce((prev, next) => {
    console.log(prev, next)
    // 处理非法数据数据 
    return {
        n_diff: next['自然排名'] - prev['自然排名'],
        sp_diff:  next['sp广告排名'] - prev['sp广告排名'],
        n: prev['自然排名'],
        sp: prev['sp广告排名'],
        prev_date: prev['下载日期'],
        next_date: next['下载日期'],
        asin: next['ASIN'],
    }
})
console.log(a)
</script>

<style>
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
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
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>