<template>
    <div class="form-container">
        <!-- 筛选条件表单 -->
        <el-form :inline="true" :model="queryForm" class="form-filter">
            <!-- 单选下拉框：选择需要查询的产品 ID，Options 由父组件提供 -->
            <el-form-item label="产品 ID">
                <el-select v-model="queryForm.product" placeholder="请选择产品 ID" clearable>
                    <el-option v-for="item in options" :key="item.ASIN" :label="item.ASIN" :value="item.ASIN" />
                </el-select>
            </el-form-item>
            <!-- 日期选择器 -->
            <el-form-item label="选择时间">
                <el-date-picker v-model="queryForm.date_range" type="daterange" unlink-panels range-separator="至"
                    start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" @change="onDateRangeHandle" />
            </el-form-item>
            <el-form-item>
                <!-- 查询操作 -->
                <el-button type="primary" @click="onQuerySubmitHandle">查询</el-button>
            </el-form-item>
        </el-form>
        <el-tooltip class="box-item" effect="dark" content="临时功能" placement="top">
            <el-button type="warning" plain @click="onTriggerPatch" v-show="false">数据补全</el-button>
        </el-tooltip>
        <div class="checkout-box">
            <el-radio-group v-model="queryForm.checkout" @change="checkoutHandle">
                <el-radio-button label="表格" name="table" />
                <el-radio-button label="图表" chame="chart" />
            </el-radio-group>
        </div>
        <!-- End 筛选条件表单 -->
    </div>
</template>

<script setup>
import { reactive, readonly } from 'vue';

// 接收父组件属性
const props = defineProps({
    // select-options
    options: {
        type: Array,
        default: () => []
    },
    // date-picker's shortcuts
    shortcuts: {
        type: Array,
        default: () => []
    }
});

// 接收父组件方法
const emit = defineEmits(['onQuerySubmit', 'onQueryPatch'])

// 表单属性
const queryForm = reactive({
    checkout: "图表",
    product: '',
    date_range: []
});
// 对组件外返回只读属性
const queryFormReturn = readonly(queryForm);

/*
 * 组件 date-picker 选择事件
 * @param { Array } val 选中的日期范围 ['开始时间', '结束时间']
 * @return { Object } 被重新赋值的 queryForm
 * */
const onDateRangeHandle = (val) => {
    queryForm.date_range = val || [];
}

/*
 * 组件点击查询事件 
 * 触发父组件的 onQuerySubmit， 将子组件的 queryFormReturn 传递给父组件
 * */
const onQuerySubmitHandle = () => {
    emit('onQuerySubmit', queryFormReturn);
}

/*
 * 表格图表切换
 * @param { String } val 切换的值
 */ 
const checkoutHandle = (val) => {
    emit('onQuerySubmit', queryFormReturn);
}

/*
 * 临时功能，补全数据不全的日期
 * @param { Boolean } true 触发补全功能
 */
const onTriggerPatch = () => {
    emit('onQueryPatch', true);
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