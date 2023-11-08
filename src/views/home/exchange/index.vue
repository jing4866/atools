<template>
    <!-- 汇率模块 -->
    <div class="modules-item-container modules-item">
        <div class="mudules-innter">
            <!-- 组件头部 -->
            <div class="modules-title">
                <h2 class="title">今日汇率</h2>
                <el-tooltip class="box-item" effect="dark" content="刷新汇率数据" placement="top">
                    <el-button :icon="Refresh" circle size="small" @click="updateExchange" />
                </el-tooltip>
            </div>
            <!-- 组件列表 -->
            <div class="modules-description">
                <el-skeleton :rows="3" animated v-if="loadingRef" />
                <template v-else>
                    <template v-if="exchanges.length > 0">
                        <ul class="modules-list">
                            <li class="li-item" v-for="item in exchanges">
                                <div class="box"><span> 1 </span>{{ item.CN }}<span>  ≈ </span>{{ (1/item.rate).toFixed(3) }} 人民币<span> </span></div>
                                <div><el-icon><Switch /></el-icon></div>
                                <div class="box"><span> 1 人民币 </span><span>  ≈ </span>{{ item.rate }} {{ item.CN }}<span> </span></div>                      
                            </li>
                        </ul>
                        <p class="modules-footer">更新时间:{{ updateRef }}</p>
                    </template>
                    <template v-else>
                        <p style="color:red;">请检查服务器或第三方接口状态</p>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onUpdated } from 'vue';
import { Refresh, Switch } from '@element-plus/icons-vue';
import useExchange from './useExchange.js';

// 汇率组件相关
// 汇率 compositions
const { loadingRef, exchangeRef, fetchExchange, updateExchange } = useExchange();

// 汇率：初始化 exchangeRef 数据
fetchExchange();  // 异步请求函数 获取数据

// 要显示的外汇名称
const avalible = {
    USD: '美元',
    JPY: '日元',
    EUR: '欧元',
    GBP: '英镑'
};

// 本组件需要用到的数据
const updateRef = ref(''); // 更新时间 String
const exchanges = ref([]); // 汇率数据，只存储符合显示需求的部分

// 解析数据：更新时间、数据列表、状态
watchEffect(() => {
    if (exchangeRef.value) {
        // base: 基础货币 date：日期 rates：汇率列表 time_last_updated：最后更新时间
        const { date, rates, status } = exchangeRef.value;
        if (status) {
            updateRef.value = date;
            exchanges.value = [];
            // 过滤需要显示的外汇名称，返回符合需求的数据
            for (const key in rates) {
                if (avalible[key]) {
                    exchanges.value.push({
                        ISO: key,
                        CN: avalible[key],
                        rate: rates[key]
                    })
                }
            }
        }
    };
});

</script>

<style scoped>
.modules-item-container{
    .modules-list{
        padding-left: 0;
        padding: 10px;
        .li-item{
            display: flex;
            justify-content: space-evenly;
            line-height: 2;
            margin-bottom: 5px;
            border-bottom: 1px solid #d7d9e0;
            border-radius: 5px;
            box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
        }
    }
}
</style>