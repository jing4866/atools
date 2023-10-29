<template>
    <el-dialog :modelValue="dialogVisible" title="数据更新告警" @close="closeHandle">
        <el-table :data="data">
            <el-table-column property="asin1" label="asin1" width="200" />
            <el-table-column property="parent_asin" label="parent_asin" width="200" />
            <el-table-column property="message" label="告警信息" >
                <template #default="scope">
                    <div v-if="scope.row.message">
                        {{ scope.row.message }}
                    </div>
                    <div v-else>
                        asin1 不存在 parent_asin
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script setup>
// 接收父组件属性
const props = defineProps({
    // 表格数据
    data: {
        type: Array,
        default: () => []
    },
    // 弹出框状态
    dialogVisible: {
        type: Boolean,
        default: false
    }
});

// 接收父组件方法
const emit = defineEmits(['close']);

const closeHandle = () => {
    emit('close')
}
</script>