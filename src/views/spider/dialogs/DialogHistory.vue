<template>
    <el-dialog v-model="visibleRef" title="排名历史" width="70%">
        <div>
            <el-table ref="tableRef" :data="props.data" height="400" @close="closeHandle">
                <el-table-column type="index" />
                <el-table-column prop="PASIN" label="PASIN" column-key="PASIN" :filter-multiple="true" :filters="asinFilter"
                    :filter-method="filterHandler" />
                <el-table-column prop="Date" label="日期">
                    <template #default="scope">
                        {{ moment(scope.row.Date).format('YYYY-MM-DD hh:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="分类" />
                <el-table-column prop="rank" label="排名" sortable width="150" />
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
        <div class="total">共 {{ props.data.length }} 条</div>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="small" >
                    确定
                </el-button>
            </span>
        </template> -->
    </el-dialog>
</template>

<script setup>
import { ref, computed, toRefs, watch } from 'vue';
import moment from 'moment';

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    visible: {
        type: Boolean,
        default: false
    },
    // 表头过滤参数
    filters: {
        type: Array,
        default: []
    }
});

const emit = defineEmits(['onClose', 'onDelete']);

// 处理浏览器警告visible is readonly
// const { visible } = toRefs(props); // 网络建议 不起作用
const visibleRef = ref(false);
watch(props, (newValue) => {
    visibleRef.value = newValue.visible
});

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

</script>

<style>
.el-dialog {
    .el-dialog__body {
        padding: 10px 30px;
    }

    .total {
        padding: 5px 0;
    }
}
</style>
