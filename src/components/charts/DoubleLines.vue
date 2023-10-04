<template>
    <div class="chart-container double-lines">
        <div ref="chartDom" class="chart-dom"></div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { option } from './doubleLinesConfig.js';
import usePatch from './usePatch.js';


// 接收父组件数据
const props = defineProps({
  data : Object,  // 包含数据： {keyword:'', count: 0, data:[]}
  patch: {
    default: false,
    type: Boolean
  }
});

// 解构 props 数据
const { keyword, data } = props.data;

/*
 * 处理接收到的数据为指定格式
 * @param { Array } data 父组件传递的数据对象
 * @return { Array } 返回后的格式： { date: [], n_rank: [], sp_rank: [], ASIN: '', keyword: '' }
 **/ 
const chartDataHandle = (data) => {
    const date = []; // 跟源数据相对应的时间
    const n_rank = []; // 自然排名
    const sp_rank = []; // SP广告排名
    if(!data || data.length === 0){
        return { date: [], n_rank: [], sp_rank: [], ASIN: '', keyword: '' }
    }

    usePatch(data);
    
    for( let i = 0; i < data.length; i++ ){
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




// 实例化图表
onMounted(() => {
    // 获取实例下的 DOM 元素
    const ins = getCurrentInstance();
    const chartDom = ins.refs.chartDom;
    // 初始化 Echarts
    var myChart = echarts.init(chartDom);

    // // 处理数据
    const chart = chartDataHandle(data);


    // 配置文件
    option.title.text = keyword;
    option.series[0].data = chart.n_rank;
    option.series[1].data = chart.sp_rank;
    option.xAxis.data = chart.date;

    // 生成图表
    option && myChart.setOption(option);
})

</script>

<style>
.chart-dom{
    width: 100%;
    height: 180px;
}
</style>