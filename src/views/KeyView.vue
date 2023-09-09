<template>
  <div class="keyview-container">
    <h1>关键字过滤</h1>
    <div class="keys-containter">
      <div class="keys-item keys-last-day">
        <div class="keys-type">关键字 - 左侧</div>
        <div class="keys-content">
          <el-input class="keys-area" v-model="keyleft" type="textarea" placeholder="点击当前区域输入数据：左侧关键字。"
            @change="leftChange" />
        </div>
      </div>
      <div class="keys-item keys-new-day">
        <div class="keys-type">关键字 - 右侧</div>
        <div class="keys-content">
          <el-input class="keys-area" v-model="keyright" type="textarea" placeholder="点击当前区域输入数据：右侧关键字。"
            @change="rightChange" />
        </div>
      </div>
      <div class="keys-item keys-compared">
        <div class="keys-type">
          <el-button type="primary" size="small" @click="keysFilterHandle(0)">
            <el-icon class="keys-type-icon" color="red" v-show="keys_filtered_pos === 0">
              <LocationInformation />
            </el-icon>关键字不在左
          </el-button>
          <el-button type="success" size="small" @click="keysFilterHandle(1)">
            <el-icon class="keys-type-icon" color="red" v-show="keys_filtered_pos === 1">
              <LocationInformation />
            </el-icon>关键字不在右
          </el-button>
        </div>
        <div class="keys-content">
          <div class="keys-result">
            <p class="keys-selected">{{ keys_filtered }} > 过滤结果： {{ 0 }}</p>
            <el-button type="danger" round size="small" @click="copyHandle">Copy</el-button>
          </div>
          <div class="keys-list">
            <el-empty v-if="state.length === 0" description="当前数据未空。如左右两数据列已导入数据，请点击上侧按钮进行过滤。" />
            <ul>
              <li v-for="item in state" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import copy from 'copy-to-clipboard';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { LocationInformation } from '@element-plus/icons-vue'
import { str2Array } from '@/utils/util.js'

let keyleft = ref('');
let keyright = ref('');
let keys_filtered = ref('关键字不在左');
let keys_filtered_pos = ref(0);
let state = reactive([]);

const leftChange = (value) => {
  // 将字符串转为数组
  const s2Arr = str2Array(test);
  // 移除数组项中字符串前后空格
  const arrNoTrims = _.map(s2Arr, _.trim);
  // 移除数组中的空项
  _.remove(arrNoTrims, (n) => n === "" || n === " ");
}
const rightChange = (value) => {
  // 将字符串转为数组
  const s2Arr = str2Array(test);
  // 移除数组项中字符串前后空格
  const arrNoTrims = _.map(s2Arr, _.trim);
  // 移除数组中的空项
  _.remove(arrNoTrims, (n) => n === "" || n === " ");
}

const keysFilterHandle = (pos) => {
  keys_filtered.value = pos ? '关键字不在右' : '关键字不在左';
  keys_filtered_pos.value = pos;

}

const copyHandle = (data) => {
  const cp = copy('adfdf');
  const desc = keys_filtered_pos.value ? '关键字不在右' : '关键字不在左';
  if (cp) {
    ElMessage({
      message: `${desc} : 成功复制 ${0} 条数据`,
      type: 'success',
    })
  } else {
    ElMessage.error(`${desc} : 复制失败，请尝试手动复制。`)
  }
}

</script>

<style>
.keyview-container {
  .keys-containter {
    display: flex;
    padding: 20px;

    .keys-item {
      width: 30%;
      padding: 8px;
      margin: 10px;

      &:nth-of-type(3) {
        width: 40%;

        .keys-content {
          border: 1px solid #202127;
          border-color: #a8b1ff;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      .keys-type {
        font-size: 14px;
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
      }

      .keys-content {
        border-radius: 3px;
        min-height: calc(100vh - 250px);

        .el-textarea__inner {
          width: 100%;
          height: calc(100vh - 250px);
          padding: 8px;
          font-size: 14px;
          resize: none;
          border: 1px solid #202127;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 0.1);

          &:hover {
            border-color: #a8b1ff;
          }
        }
      }

      .keys-result {
        display: flex;
        justify-content: space-between;
        padding: 8px;
      }

      .keys-list {
        height: calc(100vh - 300px);
        padding: 8px;
        overflow-y: auto;
      }
    }
  }
}
</style>
