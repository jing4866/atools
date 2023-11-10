import { ref } from "vue";
import _ from 'lodash';
import { DateTime } from "luxon";
import { getAllkeysByAsin } from "@/api/asin.js";


/**
 * 根据关键词将数据进行分组
 * @param { Array }
 * @return { Array }
 * 转换后的目标格式 [{
 *  key: 'apple', // 关键词
 *  ASIN: 'aaa', // ASIN 
 *  early_date: '2020-12-12', // 起始日期
 *  weekly: 100, // 周搜索量
 *  dayly: 100, // 日搜索量
 *  today_sp: 90,   // 今日sp排名
 *  previous_sp: 90, // 前一日sp排名
 *  today_n: 90,  // 今日自然排名
 *  previous_n: 88, // 前一日自然排名
 *  data: [] // 全部原始数据
 * }]
 * */ 
function formatDataByKey (data, asin){
    const dt = DateTime.now();
    const TODAY = dt.toISODate();
    const YESTODAY = dt.minus({ days: 1 }).toISODate();
    // 将数据全部按照‘关键词’进行分组
    const grouped = _.groupBy(data, '关键词'); 
    const format = _.map(grouped, (value, key, collection) => {
        // 符合当前key的数据集
        const dataByKey =  collection[key];
        let t_data = []; // 今日的数据
        let p_data = []; // 前一日的数据

        // 查找是否有前一日数据和今日数据
        if(dataByKey.length){   
            t_data = dataByKey.filter(item => item['下载日期'].includes(TODAY));
            p_data = dataByKey.filter(item => item['下载日期'].includes(YESTODAY));
        }
        
        // 返回目标格式
        return {
            key: key,
            ASIN: asin,
            dayly: dataByKey.length ? dataByKey[dataByKey.length-1]['周搜索量'] / 7 : null,
            weekly: dataByKey.length ? dataByKey[dataByKey.length-1]['周搜索量'] : null,
            early_date: dataByKey.length ? dataByKey[0]['下载日期'] : null,

            today_n:  t_data.length !==0 ? t_data[0]['自然排名']: null ,
            today_sp: t_data.length !==0 ? t_data[0]['sp广告排名']: null ,
            previous_n:   p_data.length !==0 ? p_data[0]['自然排名']: null ,
            previous_sp:  p_data.length !==0 ? p_data[0]['sp广告排名']: null ,

            data : collection[key]
        }
    });
    
    return format;
};
// 表格数据
const tableChartRef = ref([]);
// 表格loading
const tableChartLoadingRef = ref(false);
export default function (asin){
    // 获取指定asin下的全部关键词数据
    async function getkeysByASIN (asin){
        tableChartLoadingRef.value = true;
        const data = await getAllkeysByAsin(asin);
        const formatData = formatDataByKey(data, asin);
        tableChartRef.value = formatData;
        tableChartLoadingRef.value = false;
        return formatData;
    };

    return {
        tableChartRef,
        tableChartLoadingRef,
        getkeysByASIN
    }
}