<template>
  <main>
    <h1 class="main-title">
      <span class="title-span">A Tools</span>
    </h1>
    <ModuleList />
  </main>
</template>

<script setup>
import ModuleList from '../components/ModuleList.vue'
</script>

<style>
.main-title {
  line-height: 64px;
  font-size: 56px;
  color: transparent;
  letter-spacing: -.4px;
  font-weight: 800;
  white-space: pre-wrap;
  margin: 100px 0 0 100px;
  .title-span{
    background: linear-gradient( 120deg, #bd34fe 30%, #41d1ff );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>