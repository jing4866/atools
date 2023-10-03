<template>
    <el-card class="card-container" shadow="hover">
        <template #header>
            <div class="card-header">
                <el-button type="success" size="small" @click="event => contrastFilterHandle(1)">
                    <el-icon class="keys-type-icon" color="red" v-show="contrastRef === 1">
                        <LocationInformation />
                    </el-icon>{{ props.header }} [1不在2]
                </el-button>
                <el-button type="primary" size="small" @click="event => contrastFilterHandle(2)">
                    <el-icon class="keys-type-icon" color="red" v-show="contrastRef === 2">
                        <LocationInformation />
                    </el-icon>{{ props.header }} [2不在1]
                </el-button>
            </div>
        </template>

        <div class="card-content">
            <div class="content-result">
                <p class="content-selected">{{ props.header }} {{ contrastRef === 1 ? '[ 1 不在 2 ]' : '[ 2 不在 1 ]' }} > 过滤结果：
                    {{ props.difference.length }} 条</p>
                <el-button class="copyButton" type="danger" round size="small" @click="resultCopyHandle">Copy</el-button>
            </div>
            <div class="content-list"
                :style="{ background: contrastRef === 1 ? 'rgba(103, 194, 58, 0.05)' : 'rgba(64, 158, 255, 0.05)' }">

                <div class="empty-desc" v-if="!props.difference.length">
                    {{ isEmptyDiff || '当前数据为空。如左右两列已导入数据，请点击上侧按钮进行过滤。' }}  
                </div>
                <ul v-else>
                    <li v-for="(item, index) in props.difference" :key="index">{{ item }}</li>
                </ul>
            </div>
        </div>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { LocationInformation } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import copy from 'copy-text-to-clipboard';
import _ from 'lodash';

// 接收父组件属性
const props = defineProps({
    header: {
        default: '关键词'
    },
    contrast: {
        default: 1,
        type: Number
    },
    difference: {
        default: [],
        type: Array
    },
    isEmptyDiff: {
        default: '',
        type: String
    }
});

// 接收父组件方法
const emit = defineEmits(['onContrastTrigger']);

// 当前对比源
const contrastRef = ref(1);

// 交叉对比数据
const contrastFilterHandle = (contrast) => {
    contrastRef.value = contrast;
    emit('onContrastTrigger', contrastRef.value);
}
// 复制计算结果
const resultCopyHandle = () => {
    console.log(props.difference)
    if (props.difference.length === 0) {
        return ElMessage.warning('对比结果为空。')
    }
    const desc = contrastRef.value === 1 ? '关键字[1不在2]' : '关键字[2不在1]';
    const copyReturn = copy(props.difference.join('\r\n'));
    if (copyReturn) {
        ElMessage({
            message: `${desc} : 成功复制 ${props.difference.length} 条数据`,
            type: 'success',
        })
    } else {
        ElMessage.error(`${desc} : 复制失败，请手动复制。`)
    }
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

    .card-content {
        .content-result {
            display: flex;
            justify-content: space-between;
            padding: 5px;
            font-size: 14px;
        }

        .content-list {
            height: calc(100vh - 316px);
            border: 1px solid #e4e7ed;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
        }
    }
}</style>