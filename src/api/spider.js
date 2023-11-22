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

// 向数据库传递需要插入的信息
export const addToStore = (data) => $http.post('/rank/update',{
    data
})

// 获取历史排名
export const getHistoryRanks = (limit, current, asin) => $http.get('/rank/history', {
    params: {
        limit, 
        current,
        asin
    }
})

// 删除一条历史记录
export const delHistoryRank = (data) => $http.post('/rank/history/del', { data })