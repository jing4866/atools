<template>
    <div class="table-container">
        <div class="table-content">
            <el-table ref="expandTable" :data="props.data" :height="tableHeightRef" row-key="key"
                :expand-row-keys="expandRowKeys" @expand-change="expandChangeHandle">
                <el-table-column type="expand">
                    <template #default="scope">
                        <div class="drawer-chart">
                            <div class="drawer-static">
                                <Statistic :current="[scope.row.today_n, scope.row.today_sp]"
                                    :previous="[scope.row.previous_n, scope.row.previous_sp]"></Statistic>
                            </div>
                            <div class="drawer-line">
                                <DoubleLines :key="scope.row['ASIN']" :data="{
                                    keyword: scope.row['key'],
                                    data: scope.row.data
                                }"></DoubleLines>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="key" label="关键词" sortable />
                <el-table-column prop="early_date" label="起始日期" align="center" sortable width="120" />
                <el-table-column prop="weekly" label="周搜索量" align="center" sortable width="120" />
                <el-table-column prop="dayly" label="日搜索量" align="center" sortable width="120">
                    <template #default="scope">
                        <span>{{ scope.row["dayly"].toFixed() }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="today_n" align="center" width="100">
                    <template #header>
                        <p>自然排名</p>
                        <span>[今日:昨日]</span>
                    </template>
                    <template #default="scope">
                        <span>{{ scope.row["today_n"] }} : {{ scope.row["previous_n"] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="today_n" label="自然趋势" align="center" width="120">
                    <template #default="scope">
                        <Drift :pre="scope.row.previous_n" :cur="scope.row.today_n"></Drift>
                    </template>
                </el-table-column>
                <el-table-column prop="today_sp" align="center" width="100">
                    <template #header>
                        <p>sp排名</p>
                        <span>[今日:昨日]</span>
                    </template>
                    <template #default="scope">
                        <span> {{ scope.row["today_sp"] }} : {{ scope.row["previous_sp"] }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="today_sp" label="sp趋势" align="center" width="120">
                    <template #default="scope">
                        <Drift :pre="scope.row.previous_sp" :cur="scope.row.today_sp"></Drift>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-footer">
            当前页面总数据: {{ data.length }} 条
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Drift from '@/components/Drift.vue';
import DoubleLines from '@/components/charts/DoubleLines.vue';
import Statistic from '@/components/Statistic.vue';

const props = defineProps({
    data: {
        type: Array,
        default: []
    }
});

const expandRowKeys = ref([])
const expandChangeHandle = (row, expandedRows) => {
    const isExist = expandRowKeys.value.includes(row.key);
    if (isExist) {
        // 当前点击行已经存在，则表示要关闭当前行
        expandRowKeys.value.shift()
    } else {
        // 只展开一行
        if (expandRowKeys.value.length >= 1) {
            expandRowKeys.value.shift()
        }
        expandRowKeys.value.push(row.key)
    }
}

const tableHeightRef = ref(500);
onMounted(() => {
    tableHeightRef.value = document.documentElement.clientHeight - 180;
});

</script>

<style>
.table-container {
    padding: 5px 20px;

    .table-footer {
        padding-left: 30px;
    }
}
</style>