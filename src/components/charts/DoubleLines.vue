<template>
    <div class="chart-container double-lines">
        <div ref="chartDom" class="chart-dom"></div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { option } from './doubleLinesConfig.js';

// 数据
const props = defineProps({
  title: String,
  data : Array,
})

onMounted(() => {
    // 获取实例下的 DOM 元素
    const ins = getCurrentInstance();
    const chartDom = ins.refs.chartDom;
    // 初始化 Echarts
    var myChart = echarts.init(chartDom);

    // 测试数据
    let base = +new Date(1968, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    // 自然流量
    let date = [];
    let data = [Math.random() * 300];
    // 广告流量
    let date1 = [];
    let data1 = [Math.random() * 300];
    for (let i = 1; i < 10000; i++) {
        var now = new Date((base += oneDay));
        var times = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(times);
        // data.push(Math.round((Math.random() - 0.5) * 100 + data[i - 1]));
        data.push(Math.round((Math.random()) * 200 ));
        if(i%10 === 0){
            data.push(null)
            data.push(null)
        }
    }
    for (let i = 1; i < 10000; i++) {
        var now = new Date((base += oneDay));
        var times = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date1.push(times);
        data1.push(Math.round((Math.random()) * 100 ));
        if(i%20 === 0){
            data.push(null)
            data.push(null)
        }

    }
    option.title.text = 'test'
    option.series[0].data = data;
    option.series[1].data = data1;
    option.xAxis.data = date

    console.log(option)

    option && myChart.setOption(option);
})

</script>

<style>
.chart-dom{
    width: 100%;
    height: 200px;
}
</style>