import _ from 'lodash';

/*
 * 将数据中同一个月份的值过滤出来
 * @param { String } month 需要过滤的月份数据
 * @param { Array } data 需要过滤数据
 * @param { Array } data 过滤后符合条件的数据
 * */
const sameMonth = (month, data) => {
    return _.filter(data, function (item) {
        const mm = item['下载日期'].split('-')[1];
        return ~~month === ~~mm
    });
}

/*
 * 循环添加不存在的日期
 * @param { Number } from  循环的起始值 i = from
 * @param { Number } to    循环的结束值 i <= to
 * @param { String } yy    循环的年份   
 * @param { String } mm    循环的月份
 * @param { String } dd    循环的日期
 * @param { Array } theMon 需要对比的数据
 * @param { Array } data   原始数据
 * @return { Array } data  返回补全后的数据
 * */



const patchDate = (from, to, yy, mm, theMon, data) => {
    // 结束月份的起始日期为1，结束日期为end_dd
    for (let i = from; i <= to; i++) {
        // day为每个自然日
        const day = _.padStart(i, 2, 0);
        const mon = _.padStart(mm, 2, 0);
        // 生成对应年月日的字符串
        let the_full = `${yy}-${mon}-${day}`;
        // 是否有当前日期的数据存在
        const isExist = _.find(theMon, function (item) { return item['下载日期'] === the_full });
        // 如果不存在当前日期的数据，则补全日期
        if (!isExist) {
            data.push({
                '关键词': theMon[0]['关键词'],
                '自然排名': '-',
                'sp广告排名': '-',
                '下载日期': the_full,
                'ASIN': theMon[0]['ASIN']
            })
        }
    }
    return data;
}

/*
 * 补全传入数据的日期数据——当前不支持跨年
 * 起始月份补全规则： 补全起始点为起始月份的日期，结束点为该月份自然月的最后一天
 * eg: '2023-06-06' 则将日期从2023-06-06生成至2023-06-30
 * 结束月份补全规则： 补全起始点为1日，结束点为该参数的日期
 * eg: '2023-06-06'  则将日期从2023-01-01生成至2023-06-06
 * 非起始月份和结束月份，则补全全月份数据
 * @param { String } start 起始年月日
 * @param { String } end   结束年月日
 * @param { Array }  data  需要补全日期的数据
 * @return { Array } data  补全日期并按照日期排序的数据 
 * @dependent { Lodash } 依赖的插件库
 * */
const loodDatePatch = (start, end, data) => {
    // 常量： 每个月有多少自然天
    const DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 参数如果不存在，则返回undefined
    if (start == null) return
    if (end == null) return
    if (data == null) return

    // 起始日期的年月日
    const start_yy = start[0];
    const start_mm = start[1];
    const start_dd = start[2];
    // 结束日期的年月份
    const end_yy = end[0];
    const end_mm = end[1];
    const end_dd = end[2];

    // 假设只有一个月的数据
    if (start_mm === end_mm) {
        const sameMM = sameMonth(start_mm, data);
        patchDate(start_dd, end_dd, end_yy, end_mm, sameMM, data);
    } else {
        // 循环补充数据 起始月份作为起始点，结束月份作为结束点
        for (let i = +start_mm; i <= +end_mm; i++) {
            const sameMM = sameMonth(i, data); // 符合当前月份的数据
            if (i === +start_mm) { // 起始月份
                // 如果是起始月份，从起始日开始，至自然月尾结束
                patchDate(start_dd, DATE[i - 1], start_yy, i, sameMM, data);
            } else if (i === +end_mm) { // 结束月份
                // 结束月份的内部for循环 从1起，至结束日期
                patchDate(1, end_dd, end_yy, i, sameMM, data);
            } else { // 中间月份
                // 如果是中间月份，则从1起，至自然月尾结束
                patchDate(1, DATE[i - 1], end_yy, i, sameMM, data);
            }
        }
    }
    return data;
};


export default function usePatch(data) {
    // 存储数据的起始点和结束点
    const start = data[0]['下载日期'].split('-');
    const end = data[data.length - 1]['下载日期'].split('-');
    // 数据补全
    loodDatePatch(start, end, data);
    // return _.sortBy( data, (item)=>{ new Date(item['下载日期']) })
    return data.sort( (a, b) =>  new Date(a['下载日期']) - new Date(b['下载日期']) )
}
