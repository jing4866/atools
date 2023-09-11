<template>
  <div class="keyview-container">
    <!-- 面包屑 -->
    <el-page-header :icon="ArrowLeft" @back="() => $router.go(-1)">
      <template #content>
        <span class="text-large"> Keywords </span>
      </template>
    </el-page-header>
    <div class="tool-desc">
      <el-icon>
        <Warning />
      </el-icon>
      <span class="tool-desc-text">比较 关键词[1] 和 关键词[2] 两组数据的差值，目前仅支持 字符串 类型的比较， 请使用 回车 或 换行 作为分隔符。</span>
    </div>
    <!-- Main -->
    <div class="keys-containter">
      <!-- 关键词列表 - [1] -->
      <div class="keys-item keys-last-day">
        <div class="keys-type">
          <p>关键字 - [1] </p>
          <el-button round size="small" @click="clearHandle(0)"><el-icon>
              <Delete />
            </el-icon>清空数据</el-button>
        </div>
        <div class="keys-content">
          <el-input class="keys-area" v-model="keyleft" type="textarea" placeholder="点击当前区域输入数据：关键字 - [1]。"
            @change="leftChange" />
        </div>
      </div>
      <!-- 关键词列表 - [2] -->
      <div class="keys-item keys-new-day">
        <div class="keys-type">
          <p>关键字 - [2]</p>
          <el-button round size="small" @click="clearHandle(1)"><el-icon>
              <Delete />
            </el-icon>清空数据</el-button>
        </div>
        <div class="keys-content">
          <el-input class="keys-area" v-model="keyright" type="textarea" placeholder="点击当前区域输入数据：关键字 - [2]。"
            @change="rightChange" />
        </div>
      </div>
      <!-- 关键词差值 - [过滤结果] -->
      <div class="keys-item keys-compared">
        <div class="keys-type">
          <el-button type="success" size="small" @click="keysFilterHandle(1)">
            <el-icon class="keys-type-icon" color="red" v-show="keys_filtered_pos === 1">
              <LocationInformation />
            </el-icon>关键字 [1不在2]
          </el-button>
          <el-button type="primary" size="small" @click="keysFilterHandle(0)">
            <el-icon class="keys-type-icon" color="red" v-show="keys_filtered_pos === 0">
              <LocationInformation />
            </el-icon>关键字 [2不在1]
          </el-button>
        </div>
        <div class="keys-content">
          <div class="keys-result">
            <p class="keys-selected">{{ keys_filtered }} > 过滤结果： {{ data.result.length }} 条</p>
            <el-button class="copyButton" type="danger" round size="small" @click="copyHandle">Copy</el-button>
          </div>
          <div class="keys-list"
            :style="{ background: keys_filtered_pos ? 'rgba(103, 194, 58, 0.1)' : 'rgba(64, 158, 255, 0.1)' }">
            <el-empty v-if="!data.result.length && (!data.left.length || !data.right.length)"
              description="当前数据为空。如左右两列已导入数据，请点击上侧按钮进行过滤。" />
            <ul v-else>
              <li v-for="(item, index) in data.result" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// import copy from 'copy-to-clipboard';
import copy from 'copy-text-to-clipboard';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Warning, LocationInformation, Delete } from '@element-plus/icons-vue'
import { str2Array } from '@/utils/util.js'

let keyleft = ref(''); // 左侧关键字 textarea
let keyright = ref(''); // 右侧关键字 textarea
let keys_filtered = ref('关键字[2不在1]'); // 过滤状态
let keys_filtered_pos = ref(0); // 过滤状态
let data = reactive({
  left: [],
  right: [],
  result: []
});

// 左侧关键字函数
const leftChange = (value) => {
  // 将字符串转为数组
  const s2Arr = str2Array(value);
  // 移除数组项中字符串前后空格
  const arrNoTrims = _.map(s2Arr, _.trim);
  // 移除数组中的空项
  _.remove(arrNoTrims, (n) => n === "" || n === " ");
  // 记录数据
  data.left = arrNoTrims;
}

// 右侧关键字函数
const rightChange = (value) => {
  // 将字符串转为数组
  const s2Arr = str2Array(value);
  // 移除数组项中字符串前后空格
  const arrNoTrims = _.map(s2Arr, _.trim);
  // 移除数组中的空项
  _.remove(arrNoTrims, (n) => n === "" || n === " ");
  // 记录数据
  data.right = arrNoTrims;
}

// 清空数据
const clearHandle = (pos) => {
  // 清空 textarea
  pos ? keyright.value = '' : keyleft.value = '';
  // 清空数组数据
  pos ? data.right = [] : data.left = [];
  data.result = []
}

// 点击过滤关键字按钮事件
const keysFilterHandle = (pos) => {
  keys_filtered.value = pos ? '关键字[1不在2]' : '关键字[2不在1]';
  keys_filtered_pos.value = pos;
  D_Value(pos)
}

/*
 * 求左右两列数据差值:0 =>关键字不在左 表示右侧数据列中的数据没有在左侧出现过； 1=> 关键字不在右 表示左侧关键字数据没有在右侧出现过
 * @param { any } pos 当前选中的是关键字不在左(0)还是关键字不在右(1)
 * @return { Array } result 返回数据
 * */
function D_Value(pos) {
  const { left, right } = data;
  if (pos) {
    // 当 pos === 1 时， 左侧关键字不在右侧重复出现
    data.result = _.difference(left, right);
  } else {
    // 当 pos === 0 时，右侧的关键字不在左侧重复出现
    data.result = _.difference(right, left);
  }
};

// 复制过滤结果事件
const copyHandle = () => {
  const result = data.result.join('\r\n');
  const desc = keys_filtered_pos.value ? '关键字[1不在2]' : '关键字[2不在1]';
  const copyReturn = copy(result)

  if (copyReturn) {
    ElMessage({
      message: `${desc} : 成功复制 ${data.result.length} 条数据`,
      type: 'success',
    })
  } else {
    ElMessage.error(`${desc} : 复制失败，请尝试手动复制。`)
  }
}



</script>

<style>
.keyview-container {

  .tool-desc {
    font-size: 12px;
    color: #636466;
    padding: 5px 40px;
    .tool-desc-text{
      color: #636466;
      vertical-align: text-bottom;
      padding: 0 5px;
    }
  }

  .keys-containter {
    display: flex;
    padding: 10px 20px;

    .keys-item {
      width: 30%;
      padding: 8px;
      margin: 10px;

      &:nth-of-type(1) {
        .keys-content {
          .el-textarea__inner {
            background-color: rgba(103, 194, 58, 0.1);
          }
        }
      }

      &:nth-of-type(2) {
        .keys-content {
          .el-textarea__inner {
            background-color: rgba(64, 158, 255, 0.1);
          }
        }
      }

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
        height: calc(100vh - 294px);
        padding: 8px;
        overflow-y: auto;
      }
    }
  }
}</style>
