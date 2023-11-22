<template>
    <div class="container rank-container">
        <!-- 面包屑 -->
        <PageTitle title="历史排名" description="爬虫记录">
            <!-- <template v-slot:default>
                <el-button :icon="List" size="small" type="primary" plain 
                    @click="() => historyDialogHandle(pageConfig.size, pageConfig.current)">历史排名</el-button>
            </template> -->
        </PageTitle>
        <!-- 筛选: click 搜索按钮时回传数据 -->
        <OperationBar :count="pageConfig.total" @search="searchHandle" @clear="clearHanle"></OperationBar>
        <div class="rank-content">
            <!-- 记录table -->
            <el-table :data="tableData">
                <el-table-column type="index" label="序号" width="70" align="center" />
                <el-table-column prop="PASIN" label="PASIN"></el-table-column>
                <el-table-column prop="Date" label="日期">
                    <template #default="scope">
                        {{ scope.row.Date.replace('T', ' ').substring(0, 19) }}
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="分类"></el-table-column>
                <el-table-column prop="rank" label="排名" width="100"></el-table-column>
                <el-table-column prop="" label="操作" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确认删除?"  @confirm="historyDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="rank-footer">
            <Pagination 
                :total="pageConfig.total" 
                :size="pageConfig.size" 
                :current="pageConfig.current"
                :cb="getRanksData"
                :filter="filterRef"
                @onSizeChange="sizeChangeHandle" 
                @onCurrentChange="currentChangeHandle" 
                @onPreClick="preClickHandle"
                @onNextClick="nextClickHandle"
            ></Pagination>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect, computed } from 'vue';
import moment from "moment";
import PageTitle from '@/components/PageTitle.vue';
import Pagination from '@/components/Pagination.vue';
import OperationBar from './components/OperatorBar.vue';
import useHistoryRanks from './compositions/useHistoryRanks.js';
import usePagination from './compositions/usePagination.js';


// 历史排名弹出框 相关 comsositions
const { historyVisibleRef, historyRanksRef, loadingHRef,
    historyVisibleChange, historyDialogHandle, historyDelete, getRanksData } = useHistoryRanks();

// 分页函数
const { pageConfig,
    sizeChangeHandle, currentChangeHandle, preClickHandle, nextClickHandle } = usePagination();

const tableData = computed(() => {
    pageConfig.total = historyRanksRef.value.count;
    return historyRanksRef.value.rows
});
// 通过asin进行检索
const filterRef = ref(null) 
const searchHandle = (val) => {
    // val => string
    filterRef.value = val;
    pageConfig.current = 1;
    getRanksData(pageConfig.size, pageConfig.current, val);  // limit current filter-asin
};
// 清空检索条件
const clearHanle = (val) => {
    // val => undefined
    filterRef.value = null;
};

</script>

<style>
.rank-container {
    .rank-content {
        padding: 10px 20px;
    }

    .rank-footer {
        display: flex;
        justify-content: center;
        padding: 0 20px;
    }
}
</style>