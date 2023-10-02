<template>
  <div class="root-container">
    <!-- 路由：显示与 URL 对应的组件 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
// 引入全局路由
import { RouterView } from 'vue-router';

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
