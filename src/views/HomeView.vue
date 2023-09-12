<template>
  <div class="container-bg">
    <h1 class="main-title">
      <span class="title-span">A Tools</span>
    </h1>
    <div class="main-desc">一些在线小工具。</div>
    <ModuleList />
  </div>
</template>

<script setup>
import ModuleList from '../components/ModuleList.vue'
</script>

<style scoped>
.container-bg {
  min-height: calc(100vh - 200px);
  background: url(../assets/img/wave_lines.png) center 50% no-repeat;
  background-size: 100%;
}

.main-title {
  line-height: 64px;
  font-size: 56px;
  color: transparent;
  letter-spacing: -.4px;
  font-weight: 800;
  white-space: pre-wrap;
  margin: 100px 0 0 100px;

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