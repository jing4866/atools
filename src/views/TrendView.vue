<template>
    <!-- 关键字趋势分析图 -->
    <div class="trendview-container  modules-tool-container">
        <!-- 面包屑 -->
        <el-page-header :icon="ArrowLeft" @back="() => $router.go(-1)">
            <template #content>
                <span class="text-large"> 关键词趋势分析 </span>
            </template>
        </el-page-header>
        <!-- 页面功能描述 -->
        <div class="tool-desc">
            <el-icon>
                <Warning />
            </el-icon>
            <span class="tool-desc-text">查询指定 ASIN 下广告关键词流量趋势。</span>
        </div>
        <!-- Main -->
        <div class="trend-container">
            <!-- 过滤条件 -->
            <div class="form-container">
                <el-form :inline="true" :model="filterForm" class="form-filter">
                    <el-form-item label="ASIN">
                        <el-select v-model="selectModel" placeholder="Asin" clearable>
                            <el-option v-for="item in selectData" :key="item.ASIN" :label="item.ASIN" :value="item.ASIN" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择时间">
                        <el-date-picker v-model="date" type="daterange" unlink-panels range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" 
                            @change="dateChangeHandle" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onQuerySubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 趋势图列表 -->
            <div class="trend-list">
                <div class="trend-title">
                    <span class="sub">关键词数量: {{ currentCount || '-' }}</span>
                    <h2 class="title"> ASIN {{ currentAsin }}</h2>
                    <div class="filter">
                        <el-select class="filter-select" multiple collapse-tags collapse-tags-tooltip
                            v-model="keyword" placeholder="过滤关键词" clearable size="small"
                            @change="filterBykeyword" 
                            @clear="keywordClearHandle">
                            <el-option v-for="item in keywords" :key="item.keyword" :label="item.keyword" :value="item.keyword" />
                        </el-select>
                    </div>
                </div>
                <!-- 显示图表 -->
                <div v-if="chartData.value.length === 0">
                    <el-result icon="info" title="当前无可用数据">
                        <template #sub-title>
                            <p>请重新选择 ASIN 进行查找</p>
                        </template>
                    </el-result>
                </div>
                <div v-else>
                    <template v-for="item in chartData.value">
                        <div v-if="item.filtered" class="chart-wraper">
                            <DoubleLines :key="item.keyword" :data="item"></DoubleLines>
                        </div>
                    </template>
                </div>
            </div>
            <el-backtop :right="30" :bottom="100" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import _ from 'lodash';
import moment from 'moment';
import { ElMessage, ElLoading } from 'element-plus';
import { ArrowLeft, Warning } from '@element-plus/icons-vue';
import DoubleLines from '../components/charts/DoubleLines.vue';
import { getAsinAll, getAsinOnly, getAsinByPk } from '../api/asin.js';

// 页面标题 和 关键词数量
const currentAsin = ref('');
const currentCount = ref('');
// ASIN Selected 和 Options
const selectModel = ref('');
const selectData = ref([]);
// 图表数据
const chartData = reactive({
    value: []
});
// 关键词 selected 和 options
const keyword = ref([]);
const keywords = ref([]);
// 时间
const date = ref([]);
// Form 表单
const filterForm = reactive({
    asin: null,
    date: null,
    size: '全部数据'
});

/*
 * 图表数据过滤器
 * @param { Array } keyword 过滤条件关键词
 * @param { Array } data 需要过滤的源数据
 * @param { Array } 返回值 包含过滤条件的数据
 * */ 
const chartFilterByKey = (keyword, data) => {
    return _.map(data, item => {
        // 清空关键词时，显示全部数据
        if(keyword.length === 0){
            item.filtered = true
            return item
        }
        item.filtered =  _.includes(keyword, item.keyword);
        return item
    });
}

/*
 * 处理后端返回的ASIN数据
 * 返回根据关键字将数据分组的结果
 * @param { Array } data 后端返回的数据
 * @return { Array } 处理过后的结果 [{ count: 10, keyword: 'abc', data: [{}] }]
 * */
const chartDataHandler = (data) => {
    const grouped = _.groupBy(data, '关键词');
    const result = [];
    // 遍历数据 处理格式
    _.mapKeys(grouped, (val, key) => {
        result.push({
            keyword: key,
            data: val,
            count: val.length,
            filtered: true,
        })
    })
    keywords.value = result;
    return result;
};

// 根据条件请求数据
const onQuerySubmit = () => {
    const pk = selectModel.value;
    const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    if (!pk) {
        ElMessage({
            type: 'warning',
            message: ` 请选择 ASIN 。`
        });
        loadingInstance.close()
        return;
    }

    currentAsin.value = pk;
    // 格式化时间
    const queryDate = []
    if(date.value && date.value.length > 0){
        queryDate[0] = moment(date.value[0]).format('YYYY-MM-DD');
        queryDate[1] = moment(date.value[1]).add(1, 'd').format('YYYY-MM-DD');
    }
    getAsinByPk(pk, queryDate).then(res => {
        const { statusText, data } = res;
        if (statusText === 'OK') {
            // 对返回的数据做分组处理
            chartData.value = chartDataHandler(data.data);
            currentCount.value = chartData.value.length;
        } else {
            ElMessage(`${data.message}`);
        };
        loadingInstance.close()
    }).catch(err => {
        ElMessage.error( err );
        loadingInstance.close()
    })
};

// 过滤关键词
const filterBykeyword = (val) => {
    keyword.value = val;
    chartFilterByKey(keyword.value, chartData.value);    
}
// 清空关键词过滤
const keywordClearHandle = (val) => {
    keyword.value = []
    chartFilterByKey(keyword.value, chartData.value);   
}

// 日期选择事件
const dateChangeHandle = (val) => {
    // 格式化时间
    date.value = val || [];
}


// 初始化 ASIN Select 列表
getAsinOnly().then(res => {
    const { statusText, data } = res;
    if (statusText === 'OK') {
        selectData.value = data.data;
    }
}).catch(err => {
    const { data } = err.response;
    ElMessage.error(`${data.message}`);
});

const colorConfig = {
    advertise: {
        color: '#ffc20e',
        desc: '广告流量排名'
    },
    natural: {
        color: '#41a5ee',
        desc: '自然流量排名'
    },
    keyword: {
        color: '#185abd',
        desc: '关键字'
    },
    grid: {
        color: '#333333',
        desc: '坐标系'
    }
}

// Date组件配置
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
    {
        text: '最近六个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            return [start, end]
        },
    },
    {
        text: '最近一年',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            return [start, end]
        },
    },
]


</script>
<style>
.trend-container {
    padding: 5px;

    .form-container {
        background-color: #f6f6f7;
        padding: 5px 25px;
        border-radius: 5px;

        .el-form-item {
            margin-bottom: 0;
        }
    }

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
        .filter{
            align-self: flex-end;
            .filter-select{
                width: 200px;
            }
        }
    }
}</style>