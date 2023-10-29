// ASIN API Request
import $http from './axios.js';

// 请求全部 ASIN 数据
export const getProductBySpider = () => $http.get('/product/spider');

// 更新asins列表在数据中的spider状态
export const updateProductByAsins = ( asins ) => $http.get('/product/isexist', {
    params: {
        asins
    }
});

// 根据asin爬取数据
export const getSpiderData = ( asin ) => $http.get('/other/spider', {
    params: {
        asin
    }
});