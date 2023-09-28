<template>
    <!-- 面包屑: 页面标题 -->
    <div class="page-title modules-tool-container">
        <el-page-header :icon="ArrowLeft" @back="() => $router.go(-1)">
            <template #content>
                <span class="text-large"> {{ title }} </span>
            </template>
        </el-page-header>
        <div class="module-desc">
            <el-icon>
                <Warning />
            </el-icon>
            <span class="module-desc-text">{{ description }}</span>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Warning } from '@element-plus/icons-vue';

// 接收父组件属性
const props = defineProps({
    // 页面标题
    title: String,
    // 页面主功能描述
    description: String
});

</script>

<style>
/* 工具模块容器通用样式 */
.modules-tool-container {
    padding: 20px;

    .module-desc {
        font-size: 12px;
        color: #636466;
        padding: 5px 40px 5px 85px;

        .module-desc-text {
            color: #636466;
            vertical-align: text-bottom;
            padding: 0 5px;
        }
    }
}
</style>