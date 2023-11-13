<template>
    <el-dialog v-model="visibleRef" title="排名历史" width="70%">
        <div>
            <el-table ref="tableRef" :data="props.data.rows" v-loading="props.loading" height="460" @close="closeHandle">
                <el-table-column type="index" :index="indexMethod"  width="60" />
                <el-table-column prop="PASIN" label="PASIN" column-key="PASIN" :filter-multiple="true" :filters="asinFilter"
                    :filter-method="filterHandler" />
                <el-table-column prop="Date" label="日期">
                    <template #default="scope">
                        {{ scope.row.Date.replace('T',' ').substring(0,19) }}
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="分类" />
                <el-table-column prop="rank" label="排名" width="150" />
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-popconfirm title="确认删除?"  @confirm="deleteHandle(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pager-container">
            <Pagination :total="pageConfig.total" :size="pageConfig.size" :current="pageConfig.current"
                @onSizeChange="sizeChangeHandle" 
                @onCurrentChange="currentChangeHandle"
                @onPreClick="preClickHandle"
                @onNextClick="nextClickHandle"></Pagination>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, computed,  watch } from 'vue';
import Pagination from '@/components/Pagination.vue';
import usePagination from '../compositions/usePagination.js';

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    visible: {
        type: Boolean,
        default: false
    },
    // 表头过滤参数
    filters: {
        type: Array,
        default: []
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['onClose', 'onDelete', 'callback']);

// 处理浏览器警告visible is readonly
// const { visible } = toRefs(props); // 网络建议 不起作用
const visibleRef = ref(false);
watch(props, (newValue) => {
    visibleRef.value = newValue.visible;
    pageConfig.total = newValue.data.count;
});

// 自定义索引
const indexMethod = (index) => {
    return pageConfig.size * (pageConfig.current - 1) + index + 1
}
// 表头筛选
const asinFilter = computed(() => {
    const filter = [];
    for (const item of props.filters) {
        filter.push({
            text: item.parent_asin,
            value: item.parent_asin
        })
    }
    return filter
});
// 表头筛选函数
const tableRef = ref();
const filterHandler = (value, row, column) => {
    // tableRef.value.clearFilter(['PASIN'])
    // console.log(filterHandler)
    const property = column['property']
    return row[property] === value
};
// 关闭弹窗
const closeHandle = () => {
    emit('onClose')
};

// 删除数据行
const deleteHandle = (row) => {
    emit('onDelete', row)
}


// 分页函数
const { pageConfig, 
        sizeChangeHandle, currentChangeHandle, preClickHandle, nextClickHandle} = usePagination();

</script>

<style>
.el-dialog {
    .el-dialog__body {
        padding: 10px 30px;
        padding-top: 0;
    }

    .total {
        padding: 5px 0;
    }
    .pager-container{
        display: flex;
        justify-content: center;
        padding: 10px;
    }
}
</style>
