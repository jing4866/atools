<template>
    <!-- 关键字趋势分析图 -->
    <div class="trendview-container">
        <!-- 面包屑 -->
        <PageTitle title="关键词趋势分析" description="查询指定 ASIN 下广告关键词流量趋势" />
        <!-- Main -->
        <div class="trend-container">
            <!-- 过滤条件 -->
            <QueryForm :options="state.options" :shortcuts="shortcuts" 
                @onQuerySubmit="onQuerySubmit"></QueryForm>
            <!-- 趋势图列表 -->
            <div class="trend-list">
                <!-- 图表头部信息 -->
                <div class="trend-title">
                    <span class="sub">关键词数量: {{ currentCountRef || '-' }}</span>
                    <h2 class="title"> 产品 ID {{ currentIdRef }}</h2>
                    <!-- 根据关键词过滤图表 -->
                    <div class="filter">
                        <el-select class="filter-select" multiple collapse-tags collapse-tags-tooltip 
                            v-model="state.keyword" placeholder="过滤关键词" clearable size="small" 
                            @change="(val) => keywordFilterHandle(val, state)"
                            @clear="(val) => keywordClearHandle(val, state)">
                            <el-option v-for="item in state.chartData" :key="item.keyword" :label="item.keyword"
                                :value="item.keyword" />
                        </el-select>
                    </div>
                </div>
                <!-- 显示图表 -->
                <div v-if="state.chartData.length === 0">
                    <el-result icon="info" title="当前无可用数据">
                        <template #sub-title>
                            <p>请重新选择 ASIN 进行查找</p>
                        </template>
                    </el-result>
                </div>
                <div class="trend-content" v-else>
                    <template v-for="(item, index) in state.chartData">
                        <!-- 开启一个延时函数，优化渲染速度 -->
                        <template v-if="defer(index)">
                            <div v-if="item.filtered" class="chart-wraper">
                                <div class="title-left">
                                    {{ item.keyword }}
                                </div>
                                <!-- 环比数据 -->
                                <div class="static-center">
                                    <Statistic :key="item.timestamp" :data="item"></Statistic>
                                </div>
                                <!-- 图表数据 -->
                                <div class="chart-right">
                                    <DoubleLines :key="item.timestamp" :data="item"></DoubleLines>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <el-backtop :right="30" :bottom="100" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import _ from 'lodash';
import { ElLoading, ElMessage } from 'element-plus';
import DoubleLines from '@/components/charts/DoubleLines.vue';
import Statistic from '@/components/Statistic.vue';
import PageTitle from '@/components/PageTitle.vue';
import QueryForm from '@/components/QueryForm.vue';
import { shortcuts } from './config.js';

import { selectIdOptions, queryOptions } from './compositions/useQueryState.js';
import { chartDatasByPk, chart2Group } from './compositions/useChartState.js';
import { keywordFilterHandle, keywordClearHandle } from './compositions/useKeywordState.js';
import { useDefer } from './compositions/useDefer.js';


// 页面标题 和 关键词数量
const currentIdRef = ref('');
const currentCountRef = ref('');
// 当前页面状态
const state = reactive({
    options: [],   // 产品 Select 列表
    chartData: [], // 渲染图表的数据
    keyword: [],   //  页面关键词过滤select 
});

// 初始化 产品 ID 列表
selectIdOptions().then(res => {
    state.options = res;
}).catch( err => {
    const message = err instanceof Error ? err.message : err;
    ElMessage.error(`${message}`); 
}); 

// 
const defer = useDefer();

/*
 * 组件过滤查询
 * @param { Object } query 子组件返回的查询对象  {product: '产品id', date_range: ['开始时间','结束时间']}
 * @return { * } 无需返回
 */
const onQuerySubmit = (query) => {
    // 定义Loading
    const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    // 格式化后返回可用查询条件
    const { pk, queryDate } = queryOptions(query);
    // 设置当前页面 产品标题
    currentIdRef.value = pk;
    // 查询后台数据
    chartDatasByPk( pk, queryDate ).then(res => {
        // 将数据根据关键词进行分组
        const data_group = chart2Group(res);
        // 一共有多少组关键词
        currentCountRef.value = data_group.length;
        state.chartData = data_group;
        loadingInstance.close();
    }); 
};


</script>

<style>
.trend-container {
    padding: 5px 10px;
    .chart-wraper {
        background: #f6f6f7;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 5px;
        transition: all 1s;

        &:hover {
            box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.5);
            transform: scale(1.01);
        }
    }

    .trend-title {
        display: flex;
        text-align: center;
        line-height: 60px;
        justify-content: space-around;

        .title {
            padding: 0 20px;
        }

        .sub {
            position: relative;
            top: 3px;
            color: #636466;
        }

        .filter {
            align-self: flex-end;

            .filter-select {
                width: 200px;
            }
        }
    }
    .chart-wraper{
        display: flex;
        .title-left{
            width: 300px;
            color: #185abd;
            padding: 10px;
        }
        .chart-right{
            width: 100%;
        }
        .static-center{
            width: 200px;
        }
    }
}
</style>