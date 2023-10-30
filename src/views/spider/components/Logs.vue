<template>
    <div class="list-item" v-loading="props.loading" element-loading-background="rgba(122, 122, 122, 0.3)">
        <div class="list-btns">
            <el-button :icon="Delete" size="small" @click="clearHandle">清空</el-button>
            <el-button :icon="CopyDocument" size="small" @click="copyHandle">复制</el-button>
        </div>
        <!-- 爬虫数据列表 -->
        <div class="list-logs-box">
            <div class="list-logs" v-for="list in props.data">
                <p>【{{ list.parent_asin }}】</p>
                <ul v-if="!list.failure">
                    <li v-for="item in list.result">
                        <!-- [{Date:'', PASIN:'', category:'', rank:'' }] -->
                        {{ item.Date }}, {{ item.PASIN }}, {{ item.category }}, {{ item.rank }}
                    </li>
                    <li v-if="list.result.length">------</li>
                </ul>
                <ul v-else>
                    <li>暂无数据</li>
                    <li v-if="list.status === 503" style="color: red"> 网络状态码：{{ list.status }}, 请检查是否已开启网络代理。 </li>
                </ul>
            </div>
            <div class="list-logs" v-if="props.data.length === 0">
                <ul><li>暂无数据</li></ul>
            </div>
        </div>
        <!-- 结果汇总 -->
        <div class="list-feedback">
            <!-- 爬虫网络请求失败 -->
            <div v-if="isError" style="color: red"> 网络错误：{{ isError }}, 请检查是否已开启网络代理。 </div>
            <!-- 爬虫成功 -->
            <div v-else-if="props.data.length !== 0">
                抓取 {{ props.data.length }} 条信息完毕。
            </div>
            <!--  -->
            <div v-if="isStore">
                ------
                <span v-if="isStore" style="color: green">保存数据库成功</span>
                <span v-else style="color: red">保存数据库失败</span>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
import { CopyDocument, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import copy from 'copy-text-to-clipboard';
// 接收父组件数据
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        default: []
    },
    isError: {},
    isStore: {
        type: Boolean,
        default: false
    }
});

// 接收父组件方法
const emit = defineEmits(['clear']);

const clearHandle = () => {
    emit('clear')
};

const copyHandle = () => {
    let copyValue = '';
    for(const list of props.data){
        for(const item of list.result){
            copyValue += `${item.Date}, ${item.PASIN}, ${item.category}, ${item.rank} \n`;
        }
        copyValue += `---- \n`
    }
    const copyReturn = copy(copyValue);
    if (copyReturn) {
        ElMessage({
            message: `复制成功`,
            type: 'success',
        })
    } else {
        ElMessage.error(`复制失败 : 请尝试手动复制。`)
    }
}
</script>

<style>
.content-list {
    width: 55%;
    padding: 5px 10px;
    .list-btns {
        display: flex;
        justify-content: end;
        padding: 5px 10px;
    }

    .list-item {
        height: calc(100vh - 180px);
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        background-color: #f6f6f7;

        .list-logs-box {
            max-height: calc(100vh - 280px);
            overflow: auto;
        }

        .list-feedback {
            padding: 10px;
            text-align: left;
            text-indent: 18px;
        }
    }
}
</style>