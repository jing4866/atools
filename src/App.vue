<template>
  <div class="">
    <RouterView :key="$route.name" />
  </div>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router';

const $route = useRoute();

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
