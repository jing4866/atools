<template>
  <div class="keyview-container">
    <!-- 面包屑 -->
    <PageTitle title="关键词比较" description="比较 关键词[1] 和 关键词[2] 两组数据的差值，目前仅支持 字符串 类型的比较， 请使用 回车 或 换行 作为分隔符" />
    <!-- Main -->
    <div class="keys-container">
      <!-- 左侧 输入数据列  style="background-color: #3c91f9;" -->
      <div class="container-item container-item-left">
        <!-- 关键词列表 - [1] -->
        <TextareaCard header="关键词 - [1]" headerType="success" @onTxtUpdate="onTxtUpdate1" ></TextareaCard>

        <!-- 关键词列表 - [2] -->
        <TextareaCard header="关键词 - [2]" @onTxtUpdate="onTxtUpdate2" ></TextareaCard>

      </div>
      <!-- 右侧 操作结果列 -->
      <div class="container-item container-item-right" >
        <TextOutputCard :contrast="1" :difference="differenceRef" :isEmptyDiff="isEmptyDiff"
          @onContrastTrigger="onContrastTrigger"></TextOutputCard>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { LocationInformation } from '@element-plus/icons-vue';
import PageTitle from '@/components/PageTitle.vue';
import TextareaCard from '@/components/TextareaCard.vue';
import TextOutputCard from '../../components/TextOutputCard.vue';
import { str2Array } from '@/utils/util.js';

// 对比数据
const contrast1Ref = ref([]);
const contrast2Ref = ref([]);
// 警告信息
// const isEmpty1 = ref(false);
// const isEmpty2 = ref(false);
// 对比结果
const differenceRef = ref([]);
const isEmptyDiff = ref('');

/*
 * 关键词 - 1 接收子组件回传数据
 * @param { String } val 子组件用户输入的原始数据
 * */ 
const onTxtUpdate1 = (val) => {
    contrast1Ref.value = str2Array(val);
    // 用户输入的数据为空
    if( !val ){ 
      differenceRef.value = [];
      isEmptyDiff.value = '';
      return ElMessage.warning('关键词 - [ 1 ] 数据为空。')
    }
}

/*
 * 关键词 - 2 接收子组件回传数据
 * @param { String } val 子组件用户输入的原始数据
 * */ 
const onTxtUpdate2 = (val) => {
    contrast2Ref.value = str2Array(val);
    // 用户输入的数据为空
    if( !val ){ 
      differenceRef.value = [];
      isEmptyDiff.value = '';
      return ElMessage.warning('关键词 - [ 2 ] 数据为空。')
    }
}

/*
 * 关键词差值比较
 * @param { Number } contrast 对比的基准
 * */ 
const onContrastTrigger = (contrast) => {
    // 当用户输入的数据有空时，做提示，不做强制返回
    if( !contrast1Ref.value.length ){
      ElMessage.warning('关键词 - [ 1 ] 没有检测到数据。')
    }
    if( !contrast2Ref.value.length ){
      ElMessage.warning('关键词 - [ 2 ] 没有检测到数据。')
    }
    if( contrast === 1 ){ // [1不在2]
      // 比对结果值
      differenceRef.value = _.difference(contrast1Ref.value, contrast2Ref.value);
      // 描述比对结果
      isEmptyDiff.value = differenceRef.value.length ? '' : '[ 1 不在 2 ] 中没有符合条件的数据。';
    }else if( contrast === 2 ){ // [2不在1]
      // 比对结果值
      differenceRef.value = _.difference(contrast2Ref.value, contrast1Ref.value);
      // 描述比对结果
      isEmptyDiff.value = differenceRef.value.length ? '' : '[ 2 不在 1 ] 中没有符合条件的数据。';
    }
}


</script>

<style>
.keyview-container {
  .empty-desc {
    color: #636466;
    padding: 0 5px;
  }

  .keys-container {
    display: flex;
    padding: 0px 10px;

    .container-item {
      padding: 10px;
    }

    .container-item-left {
      width: 60%;
    }

    .container-item-right {
      width: 40%;
    }

    .keys-item {
      padding: 8px;
      margin: 10px;
    }

    .keys-type {
      display: flex;
      justify-content: space-between;
    }

    .keys-result {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}</style>
