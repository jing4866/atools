<template>
    <!-- 关键字趋势分析图 -->
    <div class="trendview-container">
            <!-- 趋势图列表 -->
            <div class="trend-list">
                <!-- 图表头部信息 -->
                <div class="trend-title">
                    <span class="sub">关键词数量: {{ props.data.length || '-' }}</span>
                    <h2 class="title"> 产品 ID {{ props.id }}</h2>
                    <!-- 根据关键词过滤图表 -->
                    <div class="filter">
                        <el-select class="filter-select" multiple collapse-tags collapse-tags-tooltip 
                            v-model="keyfilterRef" placeholder="过滤关键词" clearable 
                            @change="(val) => keywordFilterHandle(val, props.data)"
                            @clear="(val) => keywordClearHandle(val, props.data)">
                            <el-option v-for="item in props.data" :key="item.keyword" :label="item.keyword"
                                :value="item.keyword" />
                        </el-select>
                    </div>
                </div>
                <!-- 显示图表 -->
                <div v-if="props.data.length === 0">
                    <el-result icon="info" title="当前无可用数据">
                        <template #sub-title>
                            <p>请重新选择 ASIN 进行查找</p>
                        </template>
                    </el-result>
                </div>
                <div class="trend-content" v-else>
                    <template v-for="(item, index) in props.data">
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
</template>
<script setup>
import { ref, reactive } from 'vue';
import _ from 'lodash';
import DoubleLines from '@/components/charts/DoubleLines.vue';
import Statistic from '@/components/Statistic.vue';
import { keywordFilterHandle, keywordClearHandle } from '../compositions/useKeywordState.js';
import { useDefer } from '../compositions/useDefer.js';


// 接收父组件属性
const props = defineProps({
    // 图表数据
    data: {
        type: Array,
        default: () => []
    },
    // 当前产品id
    id: {
        type: String,
        default: ''
    }
});

// 接收父组件方法
const emit = defineEmits([])

// 关键词筛选
const keyfilterRef = ref([]);


// 当前页面状态
// const state = reactive({


//     keyword: [],   //  页面关键词过滤select 
//     patch: false
// });



// 
const defer = useDefer();




</script>

<style>
.trend-container {
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