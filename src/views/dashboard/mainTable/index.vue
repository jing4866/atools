<template>
    <div class="dashboard-content main-table-container">
        <el-table :data="dataFilters" :height="props.height">
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
    filter: {
        type: String,
        default: ''
    },
    data: {
        type: Array,
        default: []
    }
});
// 接收父组件的事件
const emits = defineEmits(['checkDetail']);

// 计算属性： 父组件的search过滤条件
const dataFilters = computed(() => {
    if(!props.data){
        return []
    }
    return props.data.filter(item => {
        return item.ASIN.toLowerCase().includes(props.filter.toLowerCase())
    })
});

// 触发父组件的事件
const goToDetail = (row) => {
    emits('checkDetail', row);
};


</script>