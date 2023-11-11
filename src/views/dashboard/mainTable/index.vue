<template>
    <div class="main-table-container dashboard-content">
        <el-table v-loading="props.loading"
                element-loading-text="Loading..."
                :element-loading-spinner="svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
                element-loading-background="rgba(255, 255, 255, 0.5)" 
                :data="dataFilters" :height="props.height">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="ASIN" label="ASIN">
                <template #default="scope">
                    <el-text class="link-text" type="primary" @click="() => goToDetail(scope.row)">
                        {{ scope.row.ASIN }}
                    </el-text>
                </template>
            </el-table-column>
            <el-table-column prop="earliest_date" label="起始日期" align="center" />
            <el-table-column prop="latest_date" label="结束日期" align="center" />
            <el-table-column prop="k_count" label="历史总数" sortable align="center" />
            <el-table-column prop="today" label="查询日期" align="center">
                <template #default="scope">
                    {{ scope.row.today.substring(0, 10) }}
                </template>
            </el-table-column>
            <el-table-column prop="last_count" label="今日数" sortable align="center" />
            <el-table-column prop="previous_count" label="昨日数" sortable align="center" />
            <el-table-column prop="key" label="趋势" align="center">
                <template #default="scope">
                    <Drift :value="scope.row.last_count - scope.row.previous_count"></Drift>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Drift from './Drift.vue';

// 接收父组件的数据
const props = defineProps({
    // 设置表格高度
    height: {
        type: Number,
        default: 500
    },
    // 表格加载 LOADING 状态
    loading: {
        type: Boolean,
        default: false
    },
    // 父组件中的关键词过滤参数
    filter: {
        type: String,
        default: ''
    },
    // 父组件传递来的原始数据
    data: {
        type: Array,
        default: []
    }
});
/**
 * @checkDetail 查看表格详细信息 触发Drawer弹出层
 * */ 
const emits = defineEmits(['checkDetail']);

// 计算属性： props.filter 为过滤条件
const dataFilters = computed(() => {
    if(!props.data){
        return []
    }
    return props.data.filter(item => {
        // 不区分大小写
        return item.ASIN.toLowerCase().includes(props.filter.toLowerCase());
    })
});

// 触发父组件的事件，参数为当前行信息
const goToDetail = (row) => {
    emits('checkDetail', row);
};


</script>