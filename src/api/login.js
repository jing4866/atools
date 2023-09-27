import qs from 'qs';
import $http from './axios.js';

// 登录接口
export const signInService = (param) => $http.post('/login/signin', {
    data : qs.stringify(param)
});

// 登录接口
export const whoIsService = (param) => $http.post('/login/whois', {
    data : qs.stringify(param)
});

// 注册接口
export const signUpService = (param) => $http.post('/login/signup', {
    data : qs.stringify(param)
});