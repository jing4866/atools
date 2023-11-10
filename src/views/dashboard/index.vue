<template>
    <!-- 数据汇总页面 -->
    <div class="dashboard-container">
        <!-- 面包屑 -->
        <PageTitle title="数据分析" description="产品数据信息汇总" />
        <!-- 筛选 -->
        <OperationBar :count="dataRef.length" @search="searchHandle" @clear="clearHanle"></OperationBar>
        <!-- 数据列表 -->
        <mainTable :height="tableHeightRef" :filter="filterRef" :data="dataRef" :counter="counterRef" @checkDetail="trggerDrawer"></mainTable>
        <!-- Drawer -->
        <Drawer :available="availableRef" :loading="tableChartLoadingRef" :data="drawerDataRef" :table="tableChartRef"
            @onCloseDrawer="triggerDrawerClose" @onUpdateDrawer="getkeysByASIN"></Drawer>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { ElLoading } from 'element-plus'
import _ from 'lodash';
import PageTitle from '@/components/PageTitle.vue';
import OperationBar from './OperationBar/index.vue';
import mainTable from './mainTable/index.vue';
import useMainTable from './mainTable/useMainTable.js';
import Drawer from './Drawer/index.vue';
import useTableChart from './compositions/useTableChart.js';

// 根据浏览器高度设置表格高度 以固定表头
onMounted(() => {
    tableHeightRef.value = document.documentElement.clientHeight - 250;
});

// 组件更新事件 
onUpdated(() => {
    if(counterRef.value === dataRef.value.length * 2){
        fullscreenLoading.close();
    };
});
// 初始化时加载 LOADING
const fullscreenLoading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
});
// table高度
let tableHeightRef = ref(500);
// 搜索词
const filterRef = ref('');
const searchHandle = (val) => {
    filterRef.value = val;
};
const clearHanle = () => {
    filterRef.value = '';
};


// 使用本组件composition
const { dataRef, counterRef } = useMainTable();

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