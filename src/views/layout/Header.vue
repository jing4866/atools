<template>
    <!-- 头部 -->
    <el-menu :default-active="activeRef" class="el-menu-container" mode="horizontal" :ellipsis="false"
        @select="menuChangeHandle">
        <!-- 页面Logo -->
        <el-menu-item class="el-menu-item-logo" index="/">
            <RouterLink to="/home"><img class="img-logo" src="@/assets/img/logo.png" width="100"></RouterLink>
        </el-menu-item>

        <!-- 分隔符 -->
        <div class="flex-grow" ></div>

        <!-- 页面导航：循环路由配置列表 -->
        <template v-for="(link, idx) in routesLinks">
            <!-- 只有一个children数据：隐藏hidden属性  -->
            <template v-if="!link.hidden && link.children.length == 1">
                <el-menu-item :index="link.children[0].toPath">
                    {{ link.children[0].meta.title }}
                </el-menu-item>
            </template>
            <!-- end：只有一个children -->

            <!-- 不只一个children数据：隐藏hidden属性 -->
            <template v-else-if="!link.hidden && link.children.length>1">
                <el-sub-menu :index="`${idx}`">
                    <template #title>{{ link.meta.title }}</template>
                    <template v-for="(sub, i) in link.children">
                        <el-menu-item :index="sub.toPath">
                            {{ sub.meta.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
            </template>
            <!-- end：不只一个children -->
        </template>
        <!-- end：页面导航 -->

        <!-- 用户信息：暂时为退出登录 -->
        <el-sub-menu index="more">
            <template #title>更多</template>
            <el-menu-item index="more-info">个人信息</el-menu-item>
            <el-menu-item index="more-out" divided>退出登录</el-menu-item>
        </el-sub-menu> 
  </el-menu>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
// 当前路由实例信息
const $route = useRoute();
const activeRef = ref('/home');

// 全部路由函数
const $router = useRouter();
const routesLinks = $router.options.routes;

// 导航点击事件，进行跳转
const menuChangeHandle = (key, keyPath) => {
    $router.push(key);
    activeRef.value = key;
};

onBeforeMount(()=>{
    // 当页面强制刷新时 导航状态丢失
    activeRef.value = $route.fullPath;
})
// 当页面路由更改时，修正导航状态
watch($route, (route, preRoute) => {
    activeRef.value = route.fullPath;
})


</script>

<style scoped> 
header {
   line-height: 1.5;
   max-height: 100vh;
 }

 .flex-grow {
    flex-grow: 1;
 }

 .el-menu-item-logo {
    .img-logo {
        vertical-align: middle;
    }
 }
</style>