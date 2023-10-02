<template>
    <div class="keyroot-container">
        <!-- 面包屑 -->
        <PageTitle title="词根筛选" description="查找所有词组的公有词根" />

        <!-- 筛选条件 -->
        <div class="form-container">
            <!-- 筛选条件表单 -->
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange" :disabled="true">全选</el-checkbox>
            <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                <el-checkbox v-for="status in status2Check" :key="status.key" :label="status.key" :disabled="status.disabled">{{ status.lable }}</el-checkbox>  
            </el-checkbox-group>
            <!-- End 筛选条件表单 -->
        </div>

        <!-- 功能模块  -->
        <div class="keys-container">
            <!-- 数据源 -->
            <el-card class="keys-item box-card" shadow="hover">
                <template #header>
                    <div class="card-header keys-type">
                        <span>词源</span>
                        <el-popconfirm title="清除页面全部数据?" width="170" placement="top" @confirm="clearHandle">
                            <template #reference>
                                <el-button round size="small">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>清空数据
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
                <div class="keys-content">
                    <el-input class="keys-area" :class="validErrorRef ? 'valid-error' : ''" v-model="originRef"
                        type="textarea" placeholder="点击当前区域输入需要过滤的数据源" @focus="() => { validErrorRef = false }" />
                </div>
            </el-card>
            <!-- 过滤操作 -->
            <div class="keys-item keys-transfer">
                <el-button type="primary" size="small" class="transfer-btn" @click="keyrootsFilterHandle">
                    <el-icon>
                        <DArrowRight />
                    </el-icon>
                    过滤词根
                </el-button>
            </div>
            <!-- 过滤结果 -->
            <el-card class="keys-item box-card" shadow="hover">
                <template #header>
                    <div class="card-header keys-type">
                        <span>词根</span>
                        <el-button class="copyButton" type="primary" size="small" @click="copyHandle">复制</el-button>
                    </div>
                </template>
                <div class="keys-content">
                    <div class="keys-result">
                        <p class="keys-selected">过滤结果：
                            <span style="color: red;">{{ resultRef === '' ? `无词根` : resultRef }}</span>
                        </p>
                    </div>
                    <div class="keys-list">
                        <div class="empty-desc" v-if="!resultRef.length">
                            {{ resultRef === '' ? `过滤结果为无词根存在。` : `当前数据为空。如已导入数据，请点击中间按钮进行过滤。` }}
                        </div>
                        <ul v-else>
                            <li v-for="(item, index) in resultArrRef" :key="index">
                                <p v-html="item"></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-card>
        </div>
        <!-- End 功能模块 -->
    </div>
</template>

<script setup>

import { ref, reactive, watch } from 'vue';
import copy from 'copy-text-to-clipboard';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { Delete, DArrowRight } from '@element-plus/icons-vue';
import PageTitle from '@/components/PageTitle.vue';
import { string2Array, markCommons } from './compositions/useRoot.js';

// 数据源：字符串 textarea
const originRef = ref('');
// 过滤结果：公共的子串
const resultRef = ref('');
// 数据源分隔处理后的数组
const resultArrRef = ref([]);
// 表单错误提示
const validErrorRef = ref(false);


// 筛选条件
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedStatus = ref(['ignoreCase'])
const status2Check = [
    {
        key: 'ignoreCase',
        lable: '忽略大小写',
        disabled: false
    },{
        key: 'ginoreComplex',
        lable: '忽略复数',
        disabled: true
    }]

const handleCheckAllChange = (value) => {
    checkedStatus.value = value ? status2Check : []
    isIndeterminate.value = false
}
const handleCheckedStatusChange = (value) => {
    console.log(value)
      const checkedCount = value.length
      checkAll.value = checkedCount === status2Check.length
      isIndeterminate.value = checkedCount > 0 && checkedCount < status2Check.length
}

/*
 * 清空全部数据
 * 清空原始数据 originRef
 * 清空过滤结果 
 */
const clearHandle = () => {
    originRef.value = '';
    resultRef.value = '';
    resultArrRef.value = [];
}

/*
 * 过滤词根：对用户输入的数据进行处理
 * @param { String } originRef 用户数据源
 * @return { Array } resultRef 处理后的结果
 * */
const keyrootsFilterHandle = () => {
    // 数据源为空的情况
    if (!originRef.value.trim()) {
        validErrorRef.value = true;
        return ElMessage.warning('请在左侧文本域中输入数据。')
    }
    // 当数据不为空的时候，将 String => Array
    const str2Arr = string2Array(originRef.value, checkedStatus.value.includes('ignoreCase'));
    const { commons, marked } = markCommons(str2Arr, originRef.value);

    resultRef.value = commons;
    resultArrRef.value = marked;
}


// 复制词根
const copyHandle = () => {
    const desc = resultRef.value ? '复制成功' : '复制失败';
    const copyReturn = copy(resultRef.value)

    if (copyReturn) {
        ElMessage({
            message: `${desc} : ${resultRef.value}`,
            type: 'success',
        })
    } else {
        ElMessage.error(`${desc} : 请尝试手动复制。`)
    }
}

</script>

<style>
.keyroot-container {
    .form-container {
        display: flex;
        margin: 5px 10px;
        justify-content: flex-start;
        background-color: #f6f6f7;
        padding: 5px 25px;
        border-radius: 5px;
        .el-checkbox-group{
            margin-left: 20px;
        }
    }

    .keys-container {
        display: flex;
        padding: 5px 20px;
        justify-content: space-between;

        .empty-desc {
            color: #636466;
            padding: 0 5px;
        }

        .keys-item {
            width: 43%;
            padding: 8px;
            margin: 10px;

            &.keys-transfer {
                width: 6%;
                display: flex;
                justify-content: center;
                align-items: center;

                .transfer-btn {
                    margin-top: 30%;
                }
            }

            .el-card__header {
                padding: 5px 10px;
            }
        }

        .keys-type {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 5px 0;
        }

        .keys-content {
            border-radius: 3px;
            min-height: calc(100vh - 350px);
            border: 1px solid #e4e7ed;

            .el-textarea__inner {
                width: 100%;
                height: calc(100vh - 350px);
                padding: 8px;
                font-size: 14px;
                color: #3C3C43;
                resize: none;
                border-radius: 3px;
                border: 1px solid #e4e7ed;
                background-color: rgba(255, 255, 255, 0.1);

                &:hover {
                    border-color: #a8b1ff;
                }
            }

            .valid-error {
                .el-textarea__inner {
                    border-color: red;
                }
            }
        }

        .keys-result {
            display: flex;
            justify-content: space-between;
            padding: 8px;
        }

        .keys-list {
            height: calc(100vh - 400px);
            padding: 8px;
            overflow-y: auto;
        }
    }
}


/* 简单适配移动端 */
@media (max-width: 896px) {
    .keyroot-container {
        display: block;

    }
}
</style>