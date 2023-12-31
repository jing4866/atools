import axios from 'axios';
import { ElMessage } from 'element-plus';

const AUTH_TOKEN = '';

// AXIOS 基本配置
const $http = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 50000,
    Authorization: AUTH_TOKEN || '',
    ContentType: 'application/x-www-form-urlencoded'
})

// AXIOS 请求拦截器
$http.interceptors.request.use( (config) => {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// AXIOS 响应拦截器
$http.interceptors.response.use( (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.statusText === 'OK'){
        const { error, message, data } = response.data
        if(error){
            // 请求服务器返回错误信息
            ElMessage({
                type: 'error',
                grouping: true,
                message: message
            })
            return null
        }else{
            // 请求服务器返回的数据
            return data
        }
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { code, message } = error
    ElMessage({
        type: 'error',
        grouping: true,
        message: `${code}: ${message}`
    })
    return Promise.reject(message);
});

export default $http;