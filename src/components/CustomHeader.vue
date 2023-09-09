<template>
    <el-menu :default-active="activeIndex" class="el-menu-container" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">关键词过滤</el-menu-item>
        <el-sub-menu index="2">
            <template #title>More</template>
            <el-menu-item index="2-1">个人信息</el-menu-item>
            <!-- <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu> -->
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped> 
.flex-grow {
  flex-grow: 1;
}
</style>