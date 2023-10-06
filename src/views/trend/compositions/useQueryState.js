import { getAsinOnly } from '@/api/asin.js';
import { ElMessage } from 'element-plus';
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
        const message = err instanceof Error ? err.message : err ;     // { data } = err.response;
        ElMessage.error(`${message}`);
        return [];
    });
    return data;
};

/*
 * 格式化 Query 查询条件
 * @param { Object } query 子组件的返回的只读属性 {product: '产品id', date_range: ['开始时间','结束时间']}
 * @return { Object } pk 需查询的产品 ID ，queryDate 需要查询的时间范围
 * */ 
export const queryOptions = (query, loading) => {
    // 验证参数是否存在
    if(!query.product){
        if( loading ) loading.close();
        return  ElMessage({
            type: 'warning',
            message: ` 请选择产品 ID 。`
        }); 
    };
    // 定义产品查询条件,返回结果为字符串，已失去响应式
    // 由于后续无需响应式，就不加toRefs了。
    const pk = query.product;
    
    // 格式化时间
    const queryDate = []
    if (query.date_range && query.date_range.length > 0) {
        // 开始时间
        queryDate[0] = moment(query.date_range[0]).format('YYYY-MM-DD');
        // 结束时间：受数据库限制，结束时间不包含当前时间，所以自动加 1。
        queryDate[1] = moment(query.date_range[1]).add(1, 'd').format('YYYY-MM-DD');
    }; 
    // 返回外界需要用的查询条件
    return {
        pk,
        queryDate
    }
};


