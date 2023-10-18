// 公共接口
import $http from './axios.js';

// 请求全部 ASIN 数据
export const exchangeFetch = () => $http.get('/other/exchange');


