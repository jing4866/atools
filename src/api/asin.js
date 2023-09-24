// ASIN API Request
import $http from './axios.js';

// 请求全部 ASIN 数据
export const getAsinAll = () => $http.get('/asin');

// 请求 ASIN 列表 返回值含count
export const getAsinOnly = () => $http.get('/asin/group');

// 根据 ASIN 请求对应数据
export const getAsinByPk = (pk, date) => $http.get(`/asin/pk`, {
    params: {
        pk,
        date
    }
});