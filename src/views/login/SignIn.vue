<template>
    <!-- 登录 -->
    <div class="sign sign-in">
        <el-form ref="loginForm" :model="login" :rules="rules">
            <!-- 用户名 -->
            <el-form-item prop="username" label="账号/Account Number">
                <el-input v-model="login.username" name="username" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码/Password">
                <el-input v-model="login.password" name="password" type="password" show-password />
            </el-form-item>
            <!-- 记住密码 -->
            <el-form-item>
                <el-checkbox  v-model="login.remember" label="记住密码" />
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
                <el-button type="primary" :disabled="loading" @click="onSubmit">{{ loading ? `登 录 中 ...` : `登 录` }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
// 父组件传递的数据
const props = defineProps({
  loading : Boolean,  // 是否正在登录中
});
const emits = defineEmits(['signInSubmit'])


// 登录表单
const loginForm = ref();

// 登录属性
const login = reactive({
    username: '',
    password: '',
    remember: true
});

// 验证规则
const rules = reactive({
    username: [
        {
            required: true, message: `请输入 账号/Account Number`, trigger: 'blur'       
        },{
            min: 2, max: 1024, message: `账号/Account Number 长度要求在 2-1024 个字符`, trigger: 'blur'
        }
    ],
    password: [
        {
            required: true, message: `请输入 密码/Password`, trigger: 'blur'  
        }
    ]
});

// 点击登录事件
const onSubmit = () => {
    // 表单验证
    if (!loginForm) return;
    loginForm.value.validate( valid => {
        console.log(valid)
        if( !valid ){
            return false;
        };
        emits('signInSubmit', login); 
    })   
}


</script>

<style></style>