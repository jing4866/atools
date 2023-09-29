<template>
    <div class="form-container">
        <el-form :inline="true" :model="queryForm" class="form-filter">
            <el-form-item label="产品 ID">
                <el-select v-model="queryForm.product" placeholder="请选择产品 ID" clearable>
                    <el-option v-for="item in options" :key="item.ASIN" :label="item.ASIN" :value="item.ASIN" />
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间">
                <el-date-picker v-model="queryForm.date_range" type="daterange" unlink-panels range-separator="至" start-placeholder="开始时间"
                    end-placeholder="结束时间" :shortcuts="shortcuts" @change="onDateRangeHandle" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuerySubmitHandle">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 接收父组件属性
const props = defineProps({
    // select-options
    options: Array,
    // date-picker's shortcuts
    shortcuts: Array
});

// 接收父组件方法
const emit = defineEmits(['onQuerySubmit'])

const queryForm = reactive({
    product: '',
    date_range: []
});

// 日期选择事件
const onDateRangeHandle = (val) => {
    // 格式化时间
    queryForm.date_range = val || [];
}

// 点击查询事件
const onQuerySubmitHandle = () => {
    emit('onQuerySubmit', queryForm);
}


</script>

<style>
    .form-container {
        display: flex;
        justify-content: space-between;
        background-color: #f6f6f7;
        padding: 5px 25px;
        border-radius: 5px;

        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>