<template>
    <div class="spider-container">
        <!-- 面包屑 -->
        <PageTitle title="网络爬虫" description="根据指定产品信息爬取网站数据" />
        <div class="spider-content">
            <!-- 左侧结果输出栏 -->
            <div class="content-list">
                <Logs :loading="loading" :data="spiderRef" :isError="spiderNetErrRef" :isStore="isSpider2StoreRef"></Logs>
            </div>
            <!-- 右侧操作栏 -->
            <div class="content-operator">
                <div class="operator-item">
                    <!-- 表单 -->
                    <Operator :selected="multipleSelectedRef" :value="addSpiderRef" :data="asinSelectionsRef"
                        @selectedChange="updateSelected" @updateTask="updateTaskHandle" @updateStore="updateStoreHandle">
                    </Operator>
                    <!-- 任务列表 -->
                    <SpiderTask :task="spiderTaskRef" @updateTask="confirmEvent"></SpiderTask>
                    <div class="operators">
                        <el-button type="primary" @click="spiderOnly">仅爬取</el-button>
                        <el-button type="success" @click="spiderToStore">爬取并入库</el-button>
                    </div>
                </div>
            </div>
        </div>
        <Dialog :data="warningDataRef" :dialogVisible="dialogVisibleRef" @close="dialogVisibleChange"></Dialog>
        <!-- 功能提示 -->
        <WarningDialog></WarningDialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import PageTitle from '@/components/PageTitle.vue';
import Logs from './components/Logs.vue';
import SpiderTask from './components/SpiderTask.vue';
import Operator from './components/Operator.vue';
import Dialog from './dialogs/Dialog.vue';
import WarningDialog from './dialogs/WarningDialog.vue';
import useAddToSpider from './compositions/useAddToSpider.js';
import useSpiderActions from './compositions/useSpiderActions.js';
import { getProductBySpider } from '@/api/spider.js';

// 需要爬取的asin列表
const spiderTaskRef = ref([]);

// 初始化Select列表
// ASIN 多选框数据
const asinSelectionsRef = ref([]);
const selectInit = () => {
    getProductBySpider().then(res => {
        const { statusText, data } = res;
        if (statusText === 'OK') {
            asinSelectionsRef.value = data.data;
        }
    }).catch(err => {
        const message = err instanceof Error ? err.message : err;
        ElMessage.error(`${message}`);
    });
};
// 更新多选对象
const multipleSelectedRef = ref([])
const updateSelected = (arr) => {
    multipleSelectedRef.value = arr
    // 更新爬虫列表
    const temp = spiderTaskRef.value;
    spiderTaskRef.value = [...new Set(multipleSelectedRef.value, temp)]
}
// 将用户添加产品更新到任务队列
const updateTaskHandle = (val) => {
    addSpiderRef.value = val;
    addToSpiderOnly();
};
// 将用户添加的产品更新到任务队列，并更新数据库
const updateStoreHandle = (val) => {
    addSpiderRef.value = val;
    addToSpiderStore();
}

onMounted(() => {
    selectInit()
});

// 多选框相关 compositions
const { addSpiderRef, warningDataRef, 
        dialogVisibleRef, addToSpiderOnly, 
        addToSpiderStore } = useAddToSpider(spiderTaskRef, selectInit);

// 爬取按钮相关 compositions
const { spiderRef, spiderNetErrRef, 
        isSpider2StoreRef, loading, 
        spiderOnly, spiderToStore } = useSpiderActions(spiderTaskRef);



// 关闭弹出层事件
const dialogVisibleChange = () => {
    dialogVisibleRef.value = false
}

// 移除爬虫列表的confirm事件
const confirmEvent = (val) => {
    const index = spiderTaskRef.value.indexOf(val);
    if (index !== -1) {
        spiderTaskRef.value.splice(index, 1);
    }
}

</script>

<style scoped>
.spider-container {
    font-size: 12px;

    .spider-content {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .content-operator {
            width: 45%;
            padding: 10px;

            .operator-item {
                height: calc(100vh - 180px);
                padding: 10px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                background-color: rgba(64, 158, 255, 0.1);

                .operators {
                    padding: 5px;
                    display: flex;
                    justify-content: end;
                }
            }
        }
    }
}
</style>