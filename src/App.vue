<template>
  <el-container>
    <el-header>
      <custom-header></custom-header>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import CustomHeader from './components/CustomHeader.vue'
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
