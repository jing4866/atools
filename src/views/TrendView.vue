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
                        <el-select v-model="filterForm.asin" placeholder="Asin" clearable>
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择时间">
                        <el-date-picker v-model="filterForm.date" type="daterange" unlink-panels range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" />
                    </el-form-item>
                    <el-form-item label="显示">
                        <el-select v-model="filterForm.size" placeholder="显示全部" clearable>
                            <el-option label="全部" value="all" />
                            <el-option label="前十条" value="10" />
                            <el-option label="前二十条" value="20" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onQuerySubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 趋势图列表 -->
            <div class="trend-list">
                <h2 style="text-align: center; line-height: 60px;">[ASIN] 202401200032</h2>

                <div v-for="item in test" class="chart-wraper">
                    <DoubleLines :key="item.name"></DoubleLines>
                </div>
            </div>
            <el-backtop :right="30" :bottom="100" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Warning } from '@element-plus/icons-vue';
import DoubleLines from '../components/charts/DoubleLines.vue';

const test = [{
    name: 1
},{
    name: 2
},{
    name: 3
}]


const filterForm = reactive({
    asin: null,
    date: null,
    size: '全部数据'
})

const onQuerySubmit = () => {

}

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
    .chart-wraper{
        background: #f6f6f7; 
        margin-bottom: 20px; 
        padding:10px; 
        border-radius: 5px;
        transition: all 1s;
        &:hover{
            box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.5);
            transform: scale(1.01);
        }
    }
}
</style>