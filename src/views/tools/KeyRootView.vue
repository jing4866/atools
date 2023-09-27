<template>
    <div class="keyroot-container modules-tool-container">
        <!-- 面包屑 -->
        <el-page-header :icon="ArrowLeft" @back="() => $router.go(-1)">
            <template #content>
                <span class="text-large"> KeyRoot </span>
            </template>
        </el-page-header>

        <!-- 功能描述 -->
        <div class="tool-desc">
            <el-icon>
                <Warning />
            </el-icon>
            <span class="tool-desc-text">查找所有词组的公有词根。</span>
        </div>

        <!-- 功能模块  -->
        <div class="keys-container">
            <!-- 数据源 -->
            <div class="keys-item keys-source">
                <div class="keys-type">
                    <p>词源</p>
                    <el-button round size="small" @click="clearHandle">
                        <el-icon>
                            <Delete />
                        </el-icon>清空数据
                    </el-button>
                </div>
                <div class="keys-content">
                    <el-input class="keys-area" v-model="origin" type="textarea" placeholder="点击当前区域输入需要过滤的数据源"
                        @change="originChange" />
                </div>
            </div>
            <div class="keys-item keys-transfer">
                <el-button type="success" size="small" class="transfer-btn" @click="keysFilterHandle">
                    <el-icon><DArrowRight /></el-icon>过滤词根
                </el-button>   
            </div>
            <!-- 过滤结果 -->
            <div class="keys-item keys-filtered">
                <div class="keys-type">
                    <p>词根</p>
                    <el-button class="copyButton" type="primary" size="small" @click="copyHandle">复制</el-button>
                </div>
                <div class="keys-content">
                    <div class="keys-result">
                        <p class="keys-selected">过滤结果： 
                            <span  style="color: red;">{{ target==='' ? `无词根` : target }}</span>
                        </p>
                    </div>
                    <div class="keys-list" >
                        <div class="empty-desc" v-if="!data.result.length">
                            {{ target ===  '' ? `过滤结果为无词根存在。` : `当前数据为空。如已导入数据，请点击中间按钮进行过滤。`  }}
                        </div>
                        <ul v-else>
                            <li v-for="(item, index) in filter" :key="index">
                                <p v-html="item"></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue';
import copy from 'copy-text-to-clipboard';
import _, { split } from 'lodash';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Warning, Delete, DArrowRight } from '@element-plus/icons-vue';
import { str2Array } from '@/utils/util.js'

const filter = ref([]);
let origin = ref(''); // 词源 textarea
let target = ref(null); // 词根
let data = reactive({
    source: [],
    result: []
});

// 清空源数据文本域
const clearHandle = () => {
    data.source = [];
    data.result = [];
    target.value = null;
    origin.value = ''
}

// 词源数据更新
const originChange = (value) => {
    // 将字符串转为数组
    const s2Arr = str2Array(value.toLowerCase());
    // 移除数组项中字符串前后空格
    const arrNoTrims = _.map(s2Arr, _.trim);
    // 移除数组中的空项
    _.remove(arrNoTrims, (n) => n === "" || n === " ");
    // 记录数据
    data.source = arrNoTrims;
}

// 过滤词根
const keysFilterHandle = () => {
    // 源数据
    const { source } = data;
    const s_len = source.length;
    if( s_len === 0 ){
        return ElMessage({
            type: 'warning',
            message: ` 请输入原始数据。`
        })       
    }
    if( s_len ===1 ){
        target.value = source[0];
        data.result = source;
        return;
    }
    // 获取数组各项的交集
    const subSource = _.map(source, item => item.split(' '));
    const publicArr = _.intersection(...subSource);
    const publicArr_len = publicArr.length;
    if( publicArr_len === 0 ){
        target.value = '';
        data.result = [];
        return;
    }

    // 当数据不为空时
    let publicWords = publicArr[0];
    const separator = ' ';
    for(let i = 1; i < publicArr_len; i++ ){
        let next = publicWords + separator + publicArr[i];
        let isPub = _.every( source, item => _.includes(item.toLowerCase(), next.toLowerCase()));
        if(isPub){
            publicWords = next;
        }else{
            break;
        }
    }
    target.value = publicWords;
    data.result = publicWords.split(' ');
}
// 监听词根 变动后高亮
watch(target, (newValue, oldValue) => {
    const replaceRegex = `<span style="color: red;">${newValue}</span>`;
    return filter.value = _.map(data.source, item => item.replace(newValue, replaceRegex));   
})

// 复制词根
const copyHandle = () => {
    const desc = target.value ? '复制成功' : '复制失败';
    const copyReturn = copy(target.value)

    if (copyReturn) {
        ElMessage({
            message: `${desc} : ${target.value}`,
            type: 'success',
        })
    } else {
        ElMessage.error(`${desc} : 请尝试手动复制。`)
    }
}

</script>

<style>
.keyroot-container{
    .keys-container{
        display: flex;
        padding: 10px 20px;
        justify-content: space-between;
        .empty-desc{
            color: #636466;
            padding: 0 5px;   
        }
        .keys-item{
            width: 42%;
            padding: 8px;
            margin: 10px;
            &.keys-transfer{
                width: 6%;  
                display: flex;
                justify-content: center;
                align-items: center;
                .transfer-btn{
                    margin-top: 30%;
                }
            }
        }
        .keys-type{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 5px 0;
        }
        .keys-content{
            border-radius: 3px;
            min-height: calc(100vh - 250px);
            border: 1px solid #202127;
            .el-textarea__inner {
                width: 100%;
                height: calc(100vh - 250px);
                padding: 8px;
                font-size: 14px;
                color: #3C3C43;
                resize: none;
                border-radius: 3px;
                background-color: rgba(255, 255, 255, 0.1);
                &:hover {
                    border-color: #a8b1ff;
                }
            }            
        }
        .keys-result {
            display: flex;
            justify-content: space-between;
            padding: 8px;
        }
        .keys-list {
            height: calc(100vh - 294px);
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