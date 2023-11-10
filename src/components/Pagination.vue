<template>
    <el-pagination small background layout="prev, pager, next, jumper" 
        :total="props.total" :page-size="props.size" 
        :current-page="props.current"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        @prev-click="preClickHandle" 
        @next-click="nextClickHandle" />
</template>

<script setup>

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    size: {
        type: Number,
        default: 20
    },
    current: {
        type: Number,
        default: 1
    }
});

const emits = defineEmits(['onSizeChange', 'onCurrentChange', 'onPreClick', 'onNextClick']);
/**
 * page-size 改变时触发
 * @param { Number }
 * */ 
const sizeChangeHandle = (value) => {
    emits('onSizeChange', value);
};

/**
 * current-page 改变时触发
 * @param { Number }
 * */ 
const currentChangeHandle = (value) => {
    emits('onCurrentChange', value);
};

/**
 * 用户点击上一页按钮改变当前页时触发
 * @param { Number }
 * */ 
const preClickHandle = (value) => {
    emits('onPreClick', value - 1)
};

/**
 * 用户点击下一页按钮改变当前页时触发
 * @param { Number }
 * */ 
const nextClickHandle = (value) => {
    emits('onNextClick', value + 1)    
}
</script>