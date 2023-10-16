<template>
    <div class="chart-container double-lines">
        <div ref="chartDom" class="chart-dom"></div>
    </div>
</template>

<script setup>
import { ref, onBeforeUpdate, onMounted, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { option } from './doubleLinesConfig.js';
import usePatch from './usePatch.js';


// 接收父组件数据
const props = defineProps({
    data: Object,  // 包含数据： {keyword:'', count: 0, data:[]}
    patch: {
        default: false,
        type: Boolean
    }
});


// 设置句柄
const chartHandleRef = ref('');

/*
 * 处理接收到的数据为指定格式
 * @param { Array } data 父组件传递的数据对象
 * @return { Array } 返回后的格式： { date: [], n_rank: [], sp_rank: [], ASIN: '', keyword: '' }
 **/
const chartDataHandle = (data) => {
    const date = []; // 跟源数据相对应的时间
    const n_rank = []; // 自然排名
    const sp_rank = []; // SP广告排名
    if (!data || data.length === 0) {
        return { date: [], n_rank: [], sp_rank: [], ASIN: '', keyword: '' }
    }

    usePatch(data);

    for (let i = 0; i < data.length; i++) {
        date.push(data[i]['下载日期']);
        n_rank.push(data[i]['自然排名']);
        sp_rank.push(data[i]['sp广告排名']);
    };
    return {
        date,
        n_rank,
        sp_rank,
        ASIN: data[0]['ASIN'],
        keyword: data[0]['关键词'],
    }
}

// 初始化图表
const chartInitHandle = (data, keyword) => {
    // // 处理数据
    const chart = chartDataHandle(data);
    // 配置文件
    option.title.text = keyword;
    option.series[0].data = chart.n_rank;
    option.series[1].data = chart.sp_rank;
    option.xAxis.data = chart.date;
    if (chartHandleRef.value) {
        // 句柄存在 更新图表
        chartHandleRef.value.setOption(option);
    } else {
        // 句柄不存在 创建图表
        // 获取实例下的 DOM 元素
        const ins = getCurrentInstance();
        const chartDom = ins.refs.chartDom;
        // 初始化 Echarts
        chartHandleRef.value = echarts.init(chartDom);
        // 生成图表
        option && chartHandleRef.value.setOption(option);
    }
}


// 实例化图表
onMounted(() => {
    // 解构 props 数据
    const { keyword, data } = props.data;
    chartInitHandle(data, keyword)
})

onBeforeUpdate(() => {
    // 解构 props 数据
    const { keyword, data } = props.data;
    chartInitHandle(data, keyword)
})

</script>

<style>
.chart-dom {
    width: 100%;
    height: 200px;
}
</style>