<template>
    <div class="statistics-container">
        <h3 class="title">ASIN: {{ data.ASIN }}</h3>
        <el-row>
            <el-col :span="4" >
                <p>起始日期</p>
                <p>{{ data.earliest_date || '1800-12-12' }}</p>
            </el-col>
            <el-col :span="4">
                <p>结束日期</p>
                <p>{{ data.latest_date || '1800-12-12' }}</p>
            </el-col>
            <el-col :span="4">
                <p>历史总数</p>
                <p>{{ data.k_count || '-' }}</p>
            </el-col>
            <el-col :span="4">
                <p>昨日总数</p>
                <p>{{ data.previous_count || '-' }}</p>
            </el-col>
            <el-col :span="4">
                <p>今日总数</p>
                <p>{{ data.last_count || '-' }}</p>
            </el-col>
            <el-col :span="4">
                <p>趋势</p>
                <p v-if="data.last_count - data.previous_count > 0">
                    <el-icon :size="16" color="red"><Top /></el-icon>
                    <span>{{ data.last_count - data.previous_count }}</span>
                </p>
                <p v-else-if="data.last_count - data.previous_count < 0">
                    <el-icon :size="16" color="green"><Bottom /></el-icon>
                    <span>{{ data.last_count - data.previous_count }}</span>
                </p>
                <p v-else-if="data.last_count - data.previous_count === 0">
                    <el-icon :size="16" ><Minus /></el-icon>
                    <span>{{ data.last_count - data.previous_count }}</span>
                </p>
                <p v-else>
                    <el-icon :size="16" ><Minus /></el-icon> <span> - </span>
                </p>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { Top, Bottom, Minus } from "@element-plus/icons-vue";

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    title: {
        type: String,
        default: ''
    }
});

</script>

<style scoped>
.statistics-container{
    padding: 5px 20px;
    background-color: #f6f6f7;
    box-shadow:  0px 0px 3px rgba(0, 0, 0, .2);   
    .title{
        padding: 5px 0;
    }
    .el-row{
        font-size: 14px;
        text-align: center;
        .el-icon{
            margin-right: 5px;
            vertical-align: text-bottom;
        }
    } 
}
</style>