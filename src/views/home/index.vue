<template>
  <div class="container">
    <h1 class="main-title">
      <span class="title-span">A Tools</span>
    </h1>
    <div class="main-desc">一些在线小工具。</div>
    <ModuleList />
  </div>
</template>

<script setup>
import ModuleList from './ModuleList.vue';

</script>


<style scoped>

.main-title {
  line-height: 60px;
  font-size: 45px;
  color: transparent;
  letter-spacing: -.4px;
  font-weight: 800;
  white-space: pre-wrap;
  margin: 60px 0 0 40px;

  .title-span {
    background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.main-desc {
  margin: 10px 0 0 100px;
}

/* 简单适配移动端 */
@media (max-width: 896px) {
  .main-title {
    margin: 50px 0 0 50px;
  }
}
</style>