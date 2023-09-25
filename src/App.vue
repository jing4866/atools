<template>
  <el-container>
    <!-- <el-header>
      <custom-header></custom-header>
    </el-header>
    <el-main>
      <RouterView :key="$route.name" />
    </el-main> -->
    <el-main>
      <RouterView :key="$route.name" />
    </el-main>
  </el-container>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router';
import CustomHeader from './components/CustomHeader.vue';

const $route = useRoute();



</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
