import { defineStore } from 'pinia';

/*
 * 用户登录信息状态管理
 *
 * 
 * */
export const loginStore = defineStore('main', {
    // 全局状态
    state: () => ({
        // 是否已经登录 Boolean
        isLogin: false,
        // 当前登录用户 String
        username: null,
        // 正在请求中 Boolean
        loading: false
    }),
    // optional getters
    getters: {
        // getters receive the state as first parameter
        getLogin: (state) => state,
    },
    // optional actions
    actions: {
        updateLoading (val) {
            console.log(val, 'in store')
            this.loading = val;
        },
        loginOut () {
            this.isLogin = false;
            this.username = null;
        },
    },
})