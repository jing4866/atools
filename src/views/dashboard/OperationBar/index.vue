<template>
    <div class="filter-container">
        <div class="filter-desc"> 当前页面总数据: {{ count }} 条</div>
        <el-input v-model.lazy="filterRef" placeholder="ASIN 查询，不区分大小写。" clearable class="filter-input"
            @input="filterHandler" @clear="clearFilter">
            <template #append>
                <el-button :icon="Search" />
            </template>
        </el-input>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
// 接收父组件的数据
const props = defineProps({
    // 当前页面总数据量
    count: {
        type: Number,
        default: 0
    }
});
// 接收父组件事件
const emits = defineEmits(['search', 'clear'])

const filterRef = ref('')

// 向父组件传递用户输入值
const filterHandler = () => {
    emits('search', filterRef.value);
};

// 向父组件传递清空请求
const clearFilter = () => {
    filterRef.value = '';
    emits('clear');   
}

</script>

<style>
.filter-container {
    display: flex;
    justify-content: space-between;
    margin: 5px 20px;
    padding: 5px 20px;
    background-color: #f6f6f7;
    border-radius: 3px;
    .filter-desc {
        line-height: 40px;
    }

    .filter-input {
        width: 300px;
    }
}
</style>