<template>
    <!-- 面包屑 -->
    <div class="page-title modules-tool-container">
        <!-- 返回上一页 + 模块标题 -->
        <el-page-header :icon="ArrowLeft" @back="() => $router.go(-1)">
            <template #content>
                <span class="text-large"> {{ title }} </span>
            </template>
        </el-page-header>
        <!-- 模块描述 -->
        <div class="module-desc">
            <div>
                <el-icon>
                    <Warning />
                </el-icon>
                <span class="module-desc-text">{{ description }}</span>
            </div>
                <!-- 默认插槽：接收一些额外操作，在页面最右侧 -->
                <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft, Warning } from '@element-plus/icons-vue';

// 接收父组件属性
const props = defineProps({
    // 页面标题
    title: {
        type: String,
        default: () => ''
    },
    // 页面主功能描述
    description: {
        type: String,
        default: () => ''
    }
});

</script>

<style>
/* 工具模块容器通用样式 */
.modules-tool-container {
    padding: 10px;

    .module-desc {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #636466;
        padding: 5px 10px 5px 85px;

        .module-desc-text {
            color: #636466;
            vertical-align: text-bottom;
            padding: 0 5px;
        }
    }
}
</style>