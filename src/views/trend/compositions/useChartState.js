import { getAsinByPk } from '@/api/asin.js';
import { ElMessage } from 'element-plus';
import _ from 'lodash';
import moment from 'moment';

/*
 * 根据筛选条件(id, date)查询数据
 * @param { String } pk 产品ID
 * @param { Array } date 时间范围
 * @return { Array } datas 查询结果
 * */ 
export const chartDatasByPk = async(pk, date = []) => {
    const datas = await getAsinByPk(pk, date).then(res => {
        const { statusText, data } = res;
        if (statusText === 'OK') {
            return data.data;
        } else {
            ElMessage(`${data.message}`);
            return []
        };
    }).catch(err => {
        // 报错信息处理
        const message = err instanceof Error ? err.message : err;
        ElMessage.error(message);
        return []
    });
    // 返回最后结果
    return datas
};


/*
 * 分组源数据，根据关键词将数据分组，为画图表做准备
 * @param { Array } origin 需要分组的源数据
 * @param { String } key 分组条件，默认关键词
 * @return { Array } data 分组后的返回值 [{ count: 10, keyword: 'abc', filtered: true, timestamp:'', data: [{}] }]
 * */ 
export const chart2Group = ( origin, key='关键词' ) => {
    const grouped = _.groupBy(origin, key);
    const result = [];
    // 遍历数据 处理格式
    _.mapKeys(grouped, (val, key) => {
        result.push({
            // 分组关键词
            keyword: key,
            // 该关键词下所有的数据
            data: val,
            // data的长度
            count: val.length,
            // 当前是否符合过滤条件
            filtered: true,
            // 时间戳，做key
            timestamp: moment.unix(1318781876).utc()
        })
    });
    return result;   
};