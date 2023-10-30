<template>
    <el-form>
        <el-form-item label="选择产品">
            <el-select v-model="multipleRef" style="width: 200px" clearable multiple collapse-tags
                placeholder="请选择产品" @change="selectedHandle"  size="small">
                <el-option v-for="item in props.data" :label="item.parent_asin" :value="item.parent_asin"  />
            </el-select>
        </el-form-item>
        <!-- 添加需要爬虫的产品 -->
        <el-form-item label="添加产品">
            <el-input v-model="valueRef" clearable style="width: 200px"  size="small" placeholder="以英文逗号为分隔符" />
            <el-button-group>
                <el-button type="primary" size="small" @click="updateTaskHandle">追加仅爬取</el-button>
                <el-button type="primary" size="small" @click="updateStoreHandle">追加并入库</el-button>
            </el-button-group>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
// 接收父组件属性
const props = defineProps({
    selected: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    value: {
        type: String,
        default: ''
    } 
});
// 接收父组件方法
const emit = defineEmits(['selectedChange', 'updateTask', 'updateStore']);

// 新增产品 id  
const valueRef = ref('');

// 产品多选结果
const multipleRef = ref([]);

// 监听父组件状态变化
const { selected } = toRefs(props);
watch(selected, (value) => {
    multipleRef.value = selected.value
});
const { value } = toRefs(props);
watch(value, (value) => {
    valueRef.value = value.value
})

// 将用户手动添加的产品更新到父组件的爬虫列表
const updateTaskHandle = () => {
    emit('updateTask', valueRef.value)
};

// 将用户手动添加的产品更新到父组件的爬虫列表并更新数据库
const updateStoreHandle = () => {
    emit('updateStore', valueRef.value)
};

// 将用户多选的产品更新到父组件的爬虫列表
const selectedHandle = () => {
    emit('selectedChange', multipleRef.value)
}

</script>

<style></style>