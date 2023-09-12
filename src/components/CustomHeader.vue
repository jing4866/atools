<template>
  <el-menu :default-active="activeIndex" class="el-menu-container" mode="horizontal" :ellipsis="false">
    <el-menu-item class="el-menu-item-logo" index="logo">
      <RouterLink to="/"><img class="img-logo" src="../assets/img/logo.png" width="100"></RouterLink>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="Home">
      <RouterLink to="/">Home</RouterLink>
    </el-menu-item>
    <el-menu-item index="KeyTool">
      <RouterLink to="keytool">Keywords</RouterLink>
    </el-menu-item>
    <el-sub-menu index="more">
      <template #title>More</template>
      <el-menu-item index="3-1">个人信息</el-menu-item>
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
import { ref, watch, onUpdated } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const $route = useRoute();
const activeIndex = ref('Home');

// const handleSelect = (key, keyPath) => {
//   activeIndex.value = key
//   console.log(key, keyPath)
// }

watch($route, (value) => {
  activeIndex.value = value.name ? value.name : 'Home';
})

</script>

<style scoped> 
.flex-grow {
   flex-grow: 1;
 }

 .el-menu-item-logo {
   .img-logo {
     vertical-align: middle;
   }
 }
 </style>