<template>
    <el-card class="card-container" shadow="hover">
        <!-- CardTextarea Header -->
        <template #header>
            <div class="card-header">
                <p><el-tag :type="props.headerType">{{ props.header }}</el-tag></p>
                <el-button round size="small" @click="contentClearHandle">
                    <el-icon><Delete /></el-icon>清空数据</el-button>
            </div>
        </template>
        <!-- CardTextarea Content -->
        <div class="card-content">
            <el-input class="card-area" v-model="contentRef" type="textarea" :placeholder="`点击当前区域输入数据：${props.header}。`"
                :class="{'success': headerType, 'error-hit': isEmpty}" @change="contentChangeHandle" />
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
// 接收父组件属性 设置组件头
const props = defineProps({
    header: {
        default: '关键词',
        type: String
    },
    headerType: {
        default: '',
        type: String
    },
    isEmpty: {
        default: false,
        type: Boolean
    }
});

// 接收父组件方法
const emit = defineEmits(['onTxtUpdate']);

// textarea 文本内容
const contentRef = ref('');

// 当textarea文本内容更新后，触发父组件的事件，将数据回传。
const contentChangeHandle = () => {
    emit('onTxtUpdate', contentRef.value.trim());
}

// 清空 textarea 内容
const contentClearHandle = () => {
    contentRef.value = '';
    emit('onTxtUpdate', contentRef.value);
}

</script>

<style>
.card-container {
    margin: 10px;
    .card-header {
        display: flex;
        justify-content: space-between;
        padding: 5px;
    }

    .card-area {
        font-size: 14px;
        .el-textarea__inner {
            height: calc(100vh - 570px);
            background-color: rgba(64, 158, 255, 0.05);
        }

        &.success {
            .el-textarea__inner {
                height: calc(100vh - 570px);
                background-color: rgba(103, 194, 58, 0.05);
            }
        }
        &.error-hit{
            .el-textarea__inner {
                border: 1px solid red;
            }
        }
    }
}
</style>