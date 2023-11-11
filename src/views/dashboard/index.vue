<template>
    <!-- 数据汇总页面 -->
    <div class="dashboard-container">
        <!-- 面包屑 -->
        <PageTitle title="数据分析" description="产品数据信息汇总" />
        <!-- 筛选 -->
        <OperationBar :count="dataRef.length" @search="searchHandle" @clear="clearHanle"></OperationBar>
        <!-- 数据列表 -->
        <mainTable :height="tableHeightRef" :loading="tableLoadingRef" 
            :filter="filterRef" :data="dataRef" 
            @checkDetail="trggerDrawer"></mainTable>
        <!-- Drawer -->
        <Drawer :available="availableRef" :loading="tableChartLoadingRef" :data="drawerDataRef" :table="tableChartRef"
            @onCloseDrawer="triggerDrawerClose" @onUpdateDrawer="getkeysByASIN"></Drawer>
    </div>
</template>

<script setup>
// 依赖
import { onMounted, onUpdated, ref } from 'vue';
import { ElLoading } from 'element-plus'
import _ from 'lodash';
// 组件
import PageTitle from '@/components/PageTitle.vue';
import OperationBar from './OperationBar/index.vue';
import mainTable from './mainTable/index.vue';
import Drawer from './Drawer/index.vue';
import useTableChart from './compositions/useTableChart.js';
import useMainTable from './compositions/useMainTable.js';


// table高度
let tableHeightRef = ref(500);
onMounted(() => {
    // 根据浏览器高度设置表格高度 以固定表头
    tableHeightRef.value = document.documentElement.clientHeight - 250;
});

// 搜索词
const filterRef = ref('');
const searchHandle = (val) => {
    filterRef.value = val;
};
const clearHanle = () => {
    filterRef.value = '';
};


// 使用本组件composition
const { dataRef, tableLoadingRef } = useMainTable();

// 使用 Drawer 组件的 compositions
const { tableChartRef, tableChartLoadingRef,  getkeysByASIN }  = useTableChart();

const availableRef = ref(false);
const drawerDataRef = ref({});

const trggerDrawer = (val) => {
    drawerDataRef.value = val;
    availableRef.value = true;
}
const  triggerDrawerClose = () => {
    drawerDataRef.value = {};
    availableRef.value = false;   
}

</script>

<style>
.dashboard-content {
    padding: 10px 20px;

    .link-text {
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}



</style>