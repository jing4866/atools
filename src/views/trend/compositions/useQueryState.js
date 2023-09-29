import { getAsinOnly } from '@/api/asin.js';
import { ElMessage, ElLoading } from 'element-plus';
import moment from 'moment';

// 初始化 产品 Select 列表
export const selectIdOptions = async() => {
    const data = await getAsinOnly().then(res => {
        const { statusText, data } = res;
        if (statusText === 'OK') {
            return data.data
        };
        return []
    }).catch(err => {
        const message = err instanceof Error ? err.response.data.message : err ;     // { data } = err.response;
        ElMessage.error(`${message}`);
        return [];
    });
    return data;
};

// 序列化 Query 查询条件
export const queryOptions = (query) => {
    // 验证参数是否存在
    if(!query.product){
        return  ElMessage({
            type: 'warning',
            message: ` 请选择产品 ID 。`
        }); 
    };
    // 定义产品查询条件
    const pk = query.product;
    // 格式化时间
    const queryDate = []
    if (query.date_range && query.date_range.length > 0) {
        queryDate[0] = moment(query.date_range[0]).format('YYYY-MM-DD');
        queryDate[1] = moment(query.date_range[1]).add(1, 'd').format('YYYY-MM-DD');
    }; 
    // 返回外界需要用的查询条件
    return {
        pk,
        queryDate
    }
};


