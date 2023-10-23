<template>
    <div class="spider-container">
        <!-- 面包屑 -->
        <PageTitle title="网络爬虫" description="根据指定产品信息爬取网站数据" />
        <div class="spider-content">
            <!-- 左侧结果输出栏 -->
            <div class="content-list">
                <div class="list-item">
                    <div class="list-btns">
                        <el-button :icon="CopyDocument" size="small">复制</el-button>
                    </div>
                    <div class="list-logs">
                        <ul>
                            <li>2023-10-23 10:44, B07TMWQCST，Clothing,Shoes & Jewelry，55751</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Women’s Tights， 1300</li>
                            <li>---</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Clothing,Shoes & Jewelry，55751</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Women’s Tights， 1300</li>
                            <li>---</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Clothing,Shoes & Jewelry，55751</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Women’s Tights， 1300</li>
                            <li>---</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Clothing,Shoes & Jewelry，55751</li>
                            <li>2023-10-23 10:44, B07TMWQCST，Women’s Tights， 1300</li>
                            <li>---</li>
                        </ul>

                    </div>
                    <div class="list-feedback">
                        <p>抓取 {{ spiderRef.length }} 条信息完毕—保存到数据库，--
                            <span v-if="isStoreSuccessRef" style="color: green">保存成功</span>
                            <span v-else style="color: red">保存失败</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 右侧操作栏 -->
            <div class="content-operator">
                <div class="operator-item">
                    <el-form>
                        <el-form-item label="选择 ASIN" label-width="120">
                            <el-select v-model="asinSelectionsRef" style="width: 300px" placeholder="请选择需要爬取数据的ASIN">
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手动添加 ASIN" label-width="120">
                            <el-input v-model="valueRef" clearable style="width: 300px" placeholder="支持字母数字，以英文逗号为分隔符" />
                            <el-button type="primary">追加</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="operator-list">
                        <p class="p-desc">爬取列表:</p>
                        <ul class="ul-item">
                            <li class="l-item"><span>XXXXX</span>
                                <el-popconfirm title="确认删除?">
                                    <template #reference>
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </template>
                                </el-popconfirm>
                            </li>

                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                            <li class="l-item"><span>XXXXX</span><el-icon>
                                    <Delete />
                                </el-icon></li>
                        </ul>
                    </div>
                    <div class="operators">
                        <el-button type="primary">仅爬取</el-button>
                        <el-button type="primary">结果入库</el-button>
                        <el-button type="primary">重新爬取</el-button>
                        <el-button type="success">爬取并入库</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Delete, CopyDocument } from '@element-plus/icons-vue';
import PageTitle from '@/components/PageTitle.vue';
// 爬取结果列表 
const spiderRef = ref([]);
// 爬取结果保存数据库是否成功
const isStoreSuccessRef = ref(false)
// ASIN 多选框数据
const asinSelectionsRef = ref([]);
// 手动添加ASIN数据
const valueRef = ref('');


</script>

<style scoped>
.spider-container {
    .spider-content {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .content-list {
            width: 60%;
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
                }

                .list-feedback {
                    padding: 10px;
                    text-align: left;
                    text-indent: 18px;
                }
            }
        }

        .content-operator {
            width: 40%;
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