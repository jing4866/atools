<template>
    <!-- 注册 -->
    <div class="sign sign-up">
        <el-form ref="logupForm" :model="logup" :rules="rules">
            <!-- 用户名 -->
            <el-form-item prop="username" label="账号/Account Number">
                <el-input v-model="logup.username" name="username" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码/Password">
                <el-input v-model="logup.password" name="password" type="password" show-password />
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="repassword" label="确认密码/Confirm Password">
                <el-input v-model="logup.repassword" name="repassword" type="password" show-password />
            </el-form-item>
            <!-- 注册按钮 -->
            <el-form-item>
                <el-button type="primary" :disabled="loading" @click="onSubmit">{{ loading ? '注 册 中 ...' : '注 册' }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';

const props = defineProps({
  loading : Boolean,  // 是否正在登录中
});
const emits = defineEmits(['signUpSubmit'])

// 登录表单
const logupForm = ref();

// 登录属性
const logup = reactive({
    username: '',
    password: '',
    repassword: ''
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
    ],
    repassword: [
        {
            required: true, message: `请输入 确认密码/Confirm Password`, trigger: 'blur'  
        },{
            validator: (rule, value, callback)=>{
                if( logup.password !== logup.repassword ){
                    callback(new Error("两次密码不一致。"));
                }
                callback(); // 数据正常的情况下，调用callback，否则validate验证不执行
            },
            trigger: 'blur'
        }    
    ]
});

// 点击登录事件
const onSubmit = () => {
    // 表单验证
    logupForm.value.validate( (valid) => {
        if( !valid ){
            return false;
        };
        emits('signUpSubmit', logup); 
    })  
}



</script>

<style></style>