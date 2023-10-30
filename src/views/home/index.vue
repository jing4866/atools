<template>
  <div class="container">
    <h1 class="main-title">
      <span class="title-span">A Tools</span>
    </h1>
    <div class="main-desc">一些在线小工具。</div>
    <ModuleList :data="exchangeRef" @updateTrigger="updateExChangeHandle" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ModuleList from '@/components/ModuleList.vue';
import { exchangeFetch } from '@/api/other.js';
import { ElMessage } from 'element-plus'

// 汇率列表
const exchangeRef = ref([]);

// 请求汇率数据
const fetchExchange = () => {
  exchangeFetch().then(res => {
    const { statusText, data } = res;
    if (statusText === 'OK') {
      exchangeRef.value = JSON.parse(data.data);
    }
  })
};

// 接收子组件更新请求
const updateExChangeHandle = async () => {
  // 保存之前的更新时间
  const last_update = exchangeRef.value.update;
  await fetchExchange();
  // 记录最新的请求时间
  const new_update = exchangeRef.value.update;
  if (new_update && (last_update === new_update)) {
    // 第三方没有更新数据
    ElMessage({
      message: '第三方数据尚未更新.',
      type: 'warning',
    })
  } else if(new_update && (last_update !== new_update)) {
    // 数据更新了
    ElMessage({
      message: '已更新为最新数据.',
      type: 'success',
    })
  }else{
    // 数据出错
    ElMessage.error(`接口似乎出了问题，请参考其他网站数据。`)    
  }
}

onMounted(() => {
  // 初始化成功后，请求接口数据
  fetchExchange()
})


</script>


<style scoped>

.main-title {
  line-height: 64px;
  font-size: 50px;
  color: transparent;
  letter-spacing: -.4px;
  font-weight: 800;
  white-space: pre-wrap;
  margin: 80px 0 0 60px;

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