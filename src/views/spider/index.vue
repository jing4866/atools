<template>
    <div class="spider-container">
        <!-- 面包屑 -->
        <PageTitle title="网络爬虫" description="根据指定产品信息爬取网站数据" />
        <div class="spider-content">
            <!-- 左侧结果输出栏 -->
            <div class="content-list">
                <div class="list-item" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.3)">
                    <div class="list-btns">
                        <el-button :icon="CopyDocument" size="small">复制</el-button>
                    </div>
                    <div class="list-logs">
                        <ul v-for="list in spiderRef">
                            <li v-for="item in list">{{ item.date }}, {{ item.parent_asin }}, {{ item.classic }}, {{
                                item.rank }}</li>
                            <li v-if="list.length">------</li>
                        </ul>
                        <ul v-if="spiderRef.length === 0">
                            <li v-if="spiderRef.length === 0">暂无数据</li>
                        </ul>
                    </div>
                    <div class="list-feedback">
                        <!-- 爬虫网络请求失败 -->
                        <div v-if="spiderNetErrRef" style="color: red"> 网络错误：{{ spiderNetErrRef }}, 请检查是否已开启网络代理。 </div>
                        <!-- 爬虫成功 -->
                        <div v-else-if="spiderRef.length !== 0">
                            抓取 {{ spiderRef.length }} 条信息完毕。
                        </div>
                        <!--  -->
                        <div v-if="isSpider2StoreRef">
                            ------
                            <span v-if="isStoreSuccessRef" style="color: green">保存数据库成功</span>
                            <span v-else style="color: red">保存数据库失败</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧操作栏 -->
            <div class="content-operator">
                <div class="operator-item">
                    <el-form>
                        <el-form-item label="选择 ASIN" label-width="120">
                            <el-select v-model="spiderTaskRef" style="width: 250px" clearable multiple collapse-tags
                                placeholder="请选择需要爬取数据的ASIN">
                                <el-option v-for="item in asinSelectionsRef" :label="item.parent_asin"
                                    :value="item.parent_asin" :key="item.parent_asin" />
                            </el-select>
                        </el-form-item>
                        <!-- 添加需要爬虫的产品 -->
                        <el-form-item label="手动添加 ASIN" label-width="120">
                            <el-input v-model="addSpiderRef" clearable style="width: 250px" placeholder="支持字母数字，以英文逗号为分隔符" />
                            <el-button-group>
                                <el-button type="primary" @click="addToSpiderOnly">追加仅爬取</el-button>
                                <el-button type="primary" @click="addToSpiderStore">追加并入库</el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                    <div class="operator-list">
                        <p class="p-desc">爬取列表:</p>
                        <div v-if="spiderTaskRef.length === 0" class="ul-item" style="color: orange">请选择或是手动添加ASIN</div>
                        <ul v-else class="ul-item">
                            <li class="l-item" v-for="item in spiderTaskRef">
                                <span>- {{ item }}</span>
                                <el-popconfirm title="移出爬虫列表?" @confirm="confirmEvent(item)">
                                    <template #reference>
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </template>
                                </el-popconfirm>
                            </li>
                        </ul>
                    </div>
                    <div class="operators">
                        <el-button type="primary" @click="spiderOnlyHandle">仅爬取</el-button>
                        <el-button type="success">爬取并入库</el-button>
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
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import { ElLoading, ElMessage } from 'element-plus';
import PageTitle from '@/components/PageTitle.vue';
import Dialog from './dialogs/Dialog.vue';
import WarningDialog from './dialogs/WarningDialog.vue';
import useAddToSpider from './compositions/useAddToSpider';
import { getProductBySpider, updateProductByAsins, getSpiderData } from '@/api/spider.js';

// 爬取结果列表 
const spiderRef = ref([]);
// 爬虫网络失败信息
const spiderNetErrRef = ref(null);
// 是否将爬虫数据存入数据库
const isSpider2StoreRef = ref(false);
// 爬取结果保存数据库是否成功
const isStoreSuccessRef = ref(false)
// ASIN 多选框数据
const asinSelectionsRef = ref([]);
// 手动添加ASIN数据
// const valueRef = ref('');
// 需要爬取的asin列表
const spiderTaskRef = ref([]);
// loading动画
const loading = ref(false);

// 初始化Select列表
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
const { addSpiderRef, warningDataRef, dialogVisibleRef, addToSpiderOnly, addToSpiderStore } = useAddToSpider(spiderTaskRef.value, selectInit);


onMounted(() => {
    selectInit()
})



// 新增需要爬虫的产品id
// const addToSpiderOnly = () => {
//     let arr = []
//     if (valueRef.value.trim().length !== 0) {
//         arr = valueRef.value.trim().split(',');
//     }
//     if (arr.length !== 0) {
//         for (const item of arr) {
//             if (item.trim().length !== 0) {
//                 // 先判断任务列表中是否存在
//                 if (spiderTaskRef.value.includes(item)) {
//                     ElMessage.warning(`${item} 已存在于爬虫列表`);
//                 } else {
//                     spiderTaskRef.value.push(item);
//                 }
//             }
//         }
//     }
//     return arr
// }

// const addToSpiderStore = () => {
//     const toChecks = addToSpiderOnly();
//     if (valueRef.value.trim().length !== 0) {
//         updateProductByAsins(valueRef.value.trim()).then(res => {
//             const { statusText, data } = res;
//             if (statusText === 'OK') {
//                 if (data.success) {
//                     ElMessage.success(`数据Spider状态更新成功`);
//                     // 当数据更新成功后重新调用select列表数据
//                     selectInit();
//                 } else {
//                     warningDataRef.value = data.data;
//                     dialogVisibleRef.value = true
//                 }
//             }
//         }).catch(err => {
//             const message = err instanceof Error ? err.message : err;
//             ElMessage.error(`${message}`);
//         })
//     }
// };

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

// 
const spiderOnlyHandle = () => {
    if (!spiderTaskRef.value.length) {
        return ElMessage.warning(`请选择产品`);
    }
    loading.value = true;
    spiderNetErrRef.value = null;
    isSpider2StoreRef.value = false;
    spiderRef.value = [];
    for (const asin of spiderTaskRef.value) {
        getSpiderData(asin).then(res => {
            const { data, statusText } = res;
            if (statusText === 'OK') {
                spiderRef.value.push(data.data);
                isStoreSuccessRef.value = true
            }
            loading.value = false;
        }).catch(err => {
            spiderNetErrRef.value = err;
            loading.value = false;
        })
    }
    console.log(spiderRef.value)

}




</script>

<style scoped>
.spider-container {
    font-size: 12px;

    .spider-content {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .content-list {
            width: 55%;
            padding: 10px;

            .list-btns {
                display: flex;
                justify-content: end;
                padding: 10px;
            }

            .list-item {
                height: calc(100vh - 180px);
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                background-color: #f6f6f7;

                .list-logs {
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

        .content-operator {
            width: 45%;
            padding: 10px;

            .operator-item {
                height: calc(100vh - 180px);
                padding: 10px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                background-color: rgba(64, 158, 255, 0.1);

                .operator-list {
                    padding: 5px;

                    .p-desc {
                        padding-left: 13px;
                    }

                    .ul-item {
                        height: calc(100vh - 390px);
                        padding: 5px;
                        overflow: auto;
                        padding-left: 13px;
                        padding-right: 20px;
                    }

                    .l-item {
                        display: flex;
                        justify-content: space-between;

                        &:hover {
                            color: rgb(64, 158, 255)
                        }
                    }
                }

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