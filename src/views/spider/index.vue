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
                        <el-button type="primary" @click="spiderOnlyHandle">仅爬取</el-button>
                        <el-button type="success" @click="spiderToStoreHandle">爬取并入库</el-button>
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
import { getProductBySpider, getSpiderData, addToStore } from '@/api/spider.js';

// 爬取结果列表 
const spiderRef = ref([]);
// 爬虫网络失败信息
const spiderNetErrRef = ref(null);
// 是否将爬虫数据存入数据库
const isSpider2StoreRef = ref(false);
// 爬取结果保存数据库是否成功
const isStoreSuccessRef = ref(false)

// 手动添加ASIN数据
// const valueRef = ref('');
// 需要爬取的asin列表
const spiderTaskRef = ref([]);
// loading动画
const loading = ref(false);

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

// 使用compositions
const { addSpiderRef, warningDataRef, dialogVisibleRef, addToSpiderOnly, addToSpiderStore } = useAddToSpider(spiderTaskRef, selectInit);
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

// 仅爬取数据
const spiderOnlyHandle = async () => {
    if (!spiderTaskRef.value.length) {
        return ElMessage.warning(`请选择产品`);
    }
    loading.value = true;
    spiderNetErrRef.value = null;
    isSpider2StoreRef.value = false;
    spiderRef.value = [];
    const spiderTasksArray = []
    for(const spider of spiderTaskRef.value){
        spiderTasksArray.push(getSpiderData(spider))
    }
    try {
        const result = await Promise.allSettled(spiderTasksArray);
        for(const item of result){
            const { value } = item
            spiderRef.value.push(value.data.data)
        }
        isStoreSuccessRef.value = true;
        loading.value = false;
        return true
    } catch (error) {
        spiderNetErrRef.value = err;
        loading.value = false;
        return false
    }
}

// 爬取数据并添加到数据库
const spiderToStoreHandle = async() => {
    const success = await spiderOnlyHandle();
    if(success===true){
        addToStore(spiderRef.value).then(res => {
            const { statusText, data} = res;
            if(statusText === 'OK' && data.success){
                ElMessage.success(`数据库更新成功`);  
            }else{
                ElMessage.warning(`数据库更新异常`); 
            }
        }).catch(err => {
            const message = err instanceof Error ? err.message : err;
            ElMessage.error(`${message}`);           
        });
    }else{
        return ElMessage.warning(`爬取数据失败。`);       
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