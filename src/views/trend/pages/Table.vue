<template>
    <div>
        Table
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收父组件属性
const props = defineProps({
    // 图表数据
    data: {
        type: Array,
        default: () => []
    },
    // 当前产品id
    id: {
        type: String,
        default: ''
    }
});

console.log(props.data)
</script>

<style>

</style>