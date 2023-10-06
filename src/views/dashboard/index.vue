<template>
    <!-- 数据汇总页面 -->
    <div class="dashboard-container">
        <!-- 面包屑 -->
        <PageTitle title="数据分析" description="产品数据信息汇总" />
        <!-- 筛选 -->
        <div class="filter-container">
            <div class="filter-desc"> 当前页面总数据: {{ dataRef.length }} 条</div>
            <el-input v-model.lazy="filterRef" placeholder="ASIN 查询，不区分大小写。" clearable class="filter-input" @input="filterHandler"
                @clear="clearFilter">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <!-- 数据列表 -->
        <div class="dashboard-content">
            <el-table :data="dataFilterRef" :height="tableH" style="width: 100%" >
                <el-table-column type="index" label="序号" width="70" align="center" />
                <el-table-column prop="ASIN" label="ASIN">
                    <template #default="scope">
                        <el-text class="link-text" type="primary" @click="() => goToDetail(scope.row.ASIN)">{{ scope.row.ASIN }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="earliest_date" label="最早日期" align="center" />
                <el-table-column prop="latest_date" label="最新日期" align="center" />
                <el-table-column prop="k_count" label="关键词历史总数" sortable align="center" />
                <el-table-column prop="today" label="当前日期" align="center">
                    <template #default="scope">
                        {{ moment(scope.row.today).subtract(1, 'day').format('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column prop="t_count" label="关键词数" sortable align="center" />
                <el-table-column prop="y_count" label="昨日数" sortable align="center" />
                <el-table-column prop="key" label="趋势" align="center">
                    <template #default="scope">
                        <div>
                            <!-- 上升 -->
                            <div v-if="scope.row.t_count > scope.row.y_count">
                                <el-icon color="red" style="vertical-align: middle;margin-right: 5px;">
                                    <Top />
                                </el-icon>
                                <span style="color: red; vertical-align: middle;">
                                    {{ scope.row.t_count - scope.row.y_count }}
                                </span>
                            </div>
                            <!-- 下降 -->
                            <div v-else-if="scope.row.t_count < scope.row.y_count">
                                <el-icon color="green" style="vertical-align: middle;margin-right: 5px;">
                                    <Bottom />
                                </el-icon>
                                <span style="color: green; vertical-align: middle;">{{ scope.row.t_count -
                                    scope.row.y_count }}</span>
                            </div>
                            <!-- 持平 -->
                            <div v-else-if="scope.row.t_count === scope.row.y_count">
                                <el-icon>
                                    <Minus />
                                </el-icon>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import _ from 'lodash';
import moment from 'moment';
import { ElMessage } from 'element-plus';
import { Top, Bottom, Minus, Search } from '@element-plus/icons-vue';
import PageTitle from '@/components/PageTitle.vue';
import { getAsinOverview } from '@/api/asin.js';
import { triggerLoading, closeLoading } from '@/utils/loading.js';


// table高度
let tableH = 500;
// 路由中间件
const $router = useRouter();
// 原始数据
const dataRef = ref([]);
// 搜索过滤后的数据
const dataFilterRef = ref([]);
// 搜索词
const filterRef = ref('');
// 清空搜索框
const clearFilter = () => {
    filterRef.value = '';
}
// 搜索过滤函数
const filterHandler = () => {
    // 返回符合条件的数据：不区分大小写
    dataFilterRef.value = dataRef.value.filter(item => item['ASIN'].includes(filterRef.value.toUpperCase()))
}

// 根据浏览器高度设置表格高度 以固定表头
onMounted(() => {
    tableH = document.documentElement.clientHeight - 250;
})

// 跳转至详情页
const goToDetail = (param) => {
    $router.push({
        name: 'Trend',
        query: {
            ASIN: param
        }
    })
}

// 页面加载即打开loading
triggerLoading();
// 请求数据
getAsinOverview().then(res => {
    if (res.statusText === 'OK') {
        const { data } = res.data;
        // 原始数据
        dataRef.value = data2Serialize(data);
        // 显示过滤后的数据
        dataFilterRef.value = dataRef.value;
        // 关闭loading
        closeLoading();
    }else{
        // 如果请求返回异常
        ElMessage.error(`页面请求数据异常，请刷新。`);
    }
}).catch(err => {
    closeLoading();
    const message = err instanceof Error ? err.message : err;
    ElMessage.error(`${message}`);
});

// 格式化数据
const data2Serialize = (data) => {
    const { asins, keys, comparekeys } = data;
    // 将关键词数据进行分组
    const keysGroup = _.groupBy(keys, item => item['ASIN']);
    const compareGroup = _.groupBy(comparekeys, item => item['ASIN']);
    // 返回数据处理结果
    return _.map(asins, item => {
        // 指定asin下今日关键词数
        item.t_count = keysGroup[item.ASIN] ? keysGroup[item.ASIN].length : null;
        // 指定asin下今日关键词列表
        // item.children = keysGroup[item.ASIN] ? keysGroup[item.ASIN] : [];
        // 指定asin下前一日关键词数
        item.y_count = compareGroup[item.ASIN] ? compareGroup[item.ASIN].length : null;
        return item;
    })
}

</script>

<style>
.dashboard-content {
    padding: 10px 20px;
    .link-text{
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

.filter-container {
    display: flex;
    justify-content: space-between;
    margin: 5px 20px;
    padding: 5px 20px;
    background-color: #f6f6f7;
    border-radius: 3px;

    .filter-desc {
        line-height: 40px;
    }

    .filter-input {
        width: 300px;
    }
}
</style>