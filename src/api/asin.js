// ASIN API Request
import $http from './axios.js';

// 请求全部 ASIN 数据
export const getAsinAll = () => $http.get('/asin');

// 请求全部 ASIN 数据
export const getAsinOverview = () => $http.get('/asin/overview');
// 请求指定asin的当日关键词数量
export const getAsinLastCount = (asin) => $http.get('/asin/last',{
    params:{
        asin
    }
});
// 请求指定asin的前一日关键词数量
export const getAsinPreviousCount = (asin) => $http.get('/asin/previous',{
    params:{
        asin
    }
});
// 根据指定asin请求全部关键词数据
export const getAllkeysByAsin = (asin) => $http.get('/asin/allkeys',{
    params:{
        asin
    }
});

// 请求 ASIN 列表 返回值含count
export const getAsinOnly = () => $http.get('/asin/group');

// 根据 ASIN 请求对应数据
export const getAsinByPk = (pk, date) => $http.get(`/asin/pk`, {
    params: {
        pk,
        date
    }
});

// 根据 ASIN 和 关键词 请求历史数据
export const getKeyHistoriesByPk = (pk, key) => $http.get('/asin/histories', {
    params: {
        pk,
        key
    }
})