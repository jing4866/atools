import { getAsinByPk } from '@/api/asin.js';
import { ElMessage } from 'element-plus';
import _ from 'lodash';
import moment from 'moment';
import { DateTime } from "luxon";

/*
 * 根据筛选条件(id, date)查询数据
 * @param { String } pk 产品ID
 * @param { Array } date 时间范围
 * @return { Array } datas 查询结果
 * */ 
export const chartDatasByPk = async(pk, date = []) => {
    const datas = await getAsinByPk(pk, date)
    return datas
};


/*
 * 分组源数据，根据关键词将数据分组，为画图表做准备
 * @param { Array } origin 需要分组的源数据
 * @param { String } key 分组条件，默认关键词
 * @param { String } asin 当前数据的asin
 * @param { Array } dateRange 过滤时间
 * @return { Array } data 分组后的返回值 [{ count: 10, keyword: 'abc', filtered: true, timestamp:'', data: [{}] }]
 * */ 
export const chart2Group = ( origin, key='关键词', asin, dateRange ) => {
    // 用于查找符合条件的 自然排名和广告排名
    const dt = DateTime.now();
    const TODAY = dateRange ? dateRange[1] : dt.toISODate();
    const YESTODAY = dateRange ? dateRange[0] :  dt.minus({ days: 1 }).toISODate();

    const grouped = _.groupBy(origin, key); // 按照关键词分组
    const result = [];
    // 遍历数据 处理格式
    _.mapKeys(grouped, (val, key) => {
        const t_data = val.filter(item => item['下载日期'].includes(moment(TODAY).format('YYYY-MM-DD')));
        const p_data = val.filter(item => item['下载日期'].includes(moment(YESTODAY).format('YYYY-MM-DD')));
        result.push({
            // 分组关键词
            key: key,
            asin: asin,
            previous_n: p_data.length ? p_data[0]['自然排名'] : null,
            previous_sp: p_data.length ? p_data[0]['sp广告排名'] : null,
            current_n: t_data.length ? t_data[0]['自然排名'] : null,
            current_sp: t_data.length ? t_data[0]['sp广告排名'] : null,
            // 当前是否符合过滤条件
            filtered: true,
            // 该关键词下所有的数据
            data: val,
            // data的长度
            count: val.length,
        })
    });
    return result;   
};