<template>
    <div class="trend-container">
        <!-- 面包屑 -->
        <PageTitle title="关键词趋势分析" description="查询指定 ASIN 下广告关键词排名趋势" />
        <!-- 过滤条件 -->
        <div class="query-box">
            <QueryForm :options="state.options" :shortcuts="shortcuts" @onQuerySubmit="onQuerySubmit"
                @onQueryPatch="onQueryPatch">
            </QueryForm>
        </div>
        <div class="tabs-box">
            <Transition>
                <KeepAlive>
                    <Table v-if="state.checkout === '表格'" :data="state.chartData" :id="currentIdRef"></Table>
                    <Chart v-else-if="state.checkout === '图表'" :data="state.chartData" :id="currentIdRef"></Chart>
                </KeepAlive>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElLoading, ElMessage } from 'element-plus';
import PageTitle from '@/components/PageTitle.vue';
import QueryForm from '@/components/QueryForm.vue';
import { shortcuts } from './config.js';
import Chart from './pages/Chart.vue';
import Table from './pages/Table.vue';
import { selectIdOptions, queryOptions } from './compositions/useQueryState.js';
import { chartDatasByPk, chart2Group } from './compositions/useChartState.js';
import { useRoute } from 'vue-router';
const $route = useRoute();
// 从总览页面过来时带的参数
// console.log($route.query)

// 页面状态
const queryRef = ref([]);
// 图表数据数量
const currentIdRef = ref('');
const state = reactive({
    checkout: '图表',
    product: '',
    date_range: [],
    options: [], // 条件筛选下拉框
    chartData: [], // 图表数据
})


/*
 * 组件过滤查询
 * @param { Object } query 子组件返回的查询对象  {product: '产品id', date_range: ['开始时间','结束时间']}
 * @return { * } 无需返回
 */
const onQuerySubmit = (query) => {
    state.checkout = query.checkout;
    state.product = query.product;
    state.date_range = query.date_range;

    if (state.checkout === '图表' && state.product !== '') {
        fetchChartHandle(query);
    } else if (state.checkout === '表格' && !state.product !== '') {

    }

};

const fetchChartHandle = (query) => {
    // 定义Loading
    const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    // 格式化后返回可用查询条件
    const { pk, queryDate } = queryOptions(query, loadingInstance);
    // 设置当前页面 产品标题
    currentIdRef.value = pk;
    // 查询后台数据
    chartDatasByPk(pk, queryDate).then(res => {
        // 将数据根据关键词进行分组
        const data_group = chart2Group(res,'关键词', pk, state.date_range);
        // 一共有多少组关键词
        state.chartData = data_group;
        loadingInstance.close();
    });
}

// 临时功能 补全缺失日期
const onQueryPatch = (bool) => {
    // queryRef.patch = bool;
}


// 初始化 产品 ID 列表
selectIdOptions().then(res => {
    state.options = res;
}).catch(err => {
    const message = err instanceof Error ? err.message : err;
    ElMessage.error(`${message}`);
});

</script>

<style>
.trend-container {
    padding: 0 10px;
    .query-box {
        padding: 5px 10px;
    }

    .tabs-box {
        padding: 5px 10px;
    }
}
</style>