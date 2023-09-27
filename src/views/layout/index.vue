<template>
  <el-container>
      <el-header>
          <Header></Header>
      </el-header>
      <el-main>
          <RouterView :key="$route.fullPath" />
      </el-main>
  </el-container>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router';
import Header from './Header.vue';

const $route = useRoute();
// console.log('$route', $route)

</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}
</style>
