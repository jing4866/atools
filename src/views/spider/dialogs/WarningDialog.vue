<template>
    <el-dialog v-model="warningDialogVisible" title="提示" width="30%" align-center destroy-on-close>
        <p>当前功能需要代理支持，请开启代理服务后再使用。</p>
        <p>重新进入应用前不再提示。</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="warningDialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onUnmounted, onBeforeMount } from 'vue';
// 组件属性
const warningDialogVisible = ref(true);

onBeforeMount(()=>{
    // 如果session有数据，则表示用户只是切换路由跳转，不再提示
    warningDialogVisible.value = sessionStorage.getItem('warning') == 'false' ? false : true;
});

onUnmounted(()=>{
    // 销毁前设置false，切换路由等情况不再进行提示
    sessionStorage.setItem('warning', false);   
})
</script>