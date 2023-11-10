<template>
    <div class="drift-container" :class="status.key">
        <!-- icon -->
        <div class="drift-icons">
            <el-icon v-if="status.key === 'up'">
                <Top />
            </el-icon>
            <el-icon v-if="status.key === 'down'">
                <Bottom />
            </el-icon>
            <el-icon v-else-if="status.key === 'incalculable'">
                <Close />
            </el-icon>
            <el-icon v-else-if="status.key === 'flat'">
                <Minus />
            </el-icon>
            <span v-if="status.key !== 'incalculable'" class="icon-span">{{ status.value }}</span>
        </div>
    </div>
</template>

<script setup>
import { Top, Bottom, Minus, Close } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = defineProps({
    pre: {
        value: null
    },
    cur: {
        value: null
    }
});

/**
 * 规则说明
 * pre: 前一日数据: 'number' '-' '' null
 * cur: 当前日数据: 'number' '-' '' null
 * @warn:cur 和 pre 传递过来时类型可能是 number 可能是string
 * @rule: 当 pre 和 cur 均为 number 时， cur - pre > 0 ? '下降' : '上升'  cur - pre === 0 '持平'
 * @rule: 当 pre 为 number， cur 为非 number 时， '下降'
 * @rule: 当 pre 为非number， cur 为 number 时， '上升'
 * */ 
const status = computed(() => {
    // 第一步： 分别判断两个值是否存在
    if(props.cur === null || props.cur === '' || props.cur.includes('-')){
        // cur 不存在的情况
        if(props.pre === null || props.pre === '' || props.pre.includes('-')){
            // pre 也不存在
            return {
                key: 'incalculable',
                value: null  
            }
        }else{
            // pre 存在
            return {
                key: 'down',
                value: -props.pre
            }
        }
    }else{
        // cur 存在
        if(props.pre === null || props.pre === '' || props.pre.includes('-')){
            // pre 不存在
            return {
                key: 'up',
                value: props.cur
            }
        }else{
            // pre 存在
            return{
                key: props.cur - props.pre > 0 ? 'down' : 'up' ,
                value: props.cur - props.pre  
            }
        }
    };
})
</script>

<style scoped>
.drift-container {
    display: flex;
    justify-content: center;
    &.incalculable {
        color: inherit;
    }

    &.up {
        color: red;
    }

    &.down {
        color: green;
    }
    .drift-icons, .icon-span{
        font-size: 12px;
        .el-icon{
            vertical-align: text-bottom;
        }
    }
}
</style>