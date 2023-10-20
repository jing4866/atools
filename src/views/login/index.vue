<template>
    <div class="sign-container">
        <!-- 内容容器 -->
        <div class="sign-wraper">
            <!-- 左侧项目名称 -->
            <div class="left-container">
                <h1 class="title">A T O O L S</h1>
                <div class="logo">T</div>
                <div class="description">生活 可以如此简单</div>
            </div>
            <!-- 右侧登录注册 -->
            <div class="right-container">
                <SignIn v-if="checkLogin" :loading="loading" @signInSubmit="signInSubmit"></SignIn>
                <SignUp v-else :loading="loading" @signUpSubmit="signUpSubmit"></SignUp>
            </div>
            <!-- 切换登录注册 -->
            <div class="checkout">
                <el-tooltip class="box-item" effect="dark" content="请联系管理员添加账号" placement="top">
                    <el-button type="primary" link class="check-btn" @click="checkHandle" disabled>
                        <el-icon>
                            <Promotion />
                        </el-icon>
                        {{ checkLogin ? '注册' : '登录' }}
                    </el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { loginStore } from '@/stores/loginStore';
import { storeToRefs } from 'pinia';
import { triggerLoading, closeLoading } from '@/utils/loading';
import { signInService, whoIsService, signUpService } from '@/api/login';
import SignIn from '@/views/login/SignIn.vue';
import SignUp from '@/views/login/SignUp.vue';


// 全局状态
const loginState = loginStore();
const { isLogin, username, loading } = storeToRefs(loginState);

// 路由
const $router = useRouter();

// 切换登录注册
const checkLogin = ref(true);
const checkHandle = () => {
    checkLogin.value = !checkLogin.value;
};

// 登录函数
const signInSubmit = (val) => {
    // 显示Loading
    triggerLoading();
    loginState.updateLoading(true);
    // 请求接口
    signInService(val).then(res => {
        const { statusText, data } = res;
        // 登录成功
        if (statusText === 'OK') {
            // 存储用户信息到 Store
            console.log('signInSubmit', data);
            $router.push('/');
        }
        // 关闭Loading
        closeLoading();
        loginState.updateLoading(false);
    }).catch(err => {
        const error = err instanceof Error ? err.message : err;
        // 提示错误信息
        ElMessage.error(`登录失败: ${error}`)
        // 关闭Loading
        closeLoading();
        loginState.updateLoading(false);
    })
}

// 注册函数
const signUpSubmit = (val) => {
    triggerLoading();
    loginState.updateLoading(true);
    signUpService(val).then(res => {
        const { statusText, data } = res;
        // 注册成功
        if (statusText === 'OK') {
            // 存储用户信息到 Store
            console.log('signInSubmit', data);
            $router.push('/');
        }
        // 关闭Loading
        closeLoading();
        loginState.updateLoading(false);
    }).catch(err => {
        const error = err instanceof Error ? err.message : err;
        // 提示错误信息
        ElMessage.error(`注册失败: ${error}`)
        // 关闭Loading
        closeLoading();
        loginState.updateLoading(false);
    })
}




</script>

<style>
.sign-container {
    position: relative;
    width: 100%;
    height: 100vh;
    font-size: 12px;
    color: #606266;
    background-color: #445df9;
    background: linear-gradient(to bottom right, #2deff9, #445df9);

    /* 浅色 #2deff9  rgb(45,239,249) */
    /* 深色 #445df9  rgb(68,93,249) */
    .sign-wraper {
        display: flex;
        position: absolute;
        left: 50%;
        margin-left: -380px;
        top: 50%;
        margin-top: -200px;
        border-radius: 20px;
        overflow: hidden;
    }

    .left-container {
        position: relative;
        width: 380px;
        color: #ffffff;
        background-color: #3c91f9;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(6px);
            z-index: 0;
        }

        .title {
            position: relative;
            line-height: 42px;
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            margin-top: 55px;
            z-index: 3;
        }

        .logo {
            position: absolute;
            width: 100px;
            height: 100px;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
            transform: rotate(-45deg);
            font-weight: bolder;
            font-size: 100px;
            font-family: fantasy;
            z-index: 3;
        }

        .description {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            color: #ffffff;
            font-size: 12px;
        }
    }

    .sign {
        width: 380px;
        padding: 50px;
        background-color: #ffffff;

        .el-form-item {
            display: block;

            .el-form-item__label {
                font-size: 12px;
                color: #606266;
            }

            .el-input__inner {
                height: 38px;
            }

            .el-button {
                display: block;
                height: 38px;
                width: 100%;
                font-size: 14px;
            }
        }
    }

    .checkout {
        position: absolute;
        top: 10px;
        right: 20px;
    }
}</style>