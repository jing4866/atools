import _ from 'lodash';
const DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function usePatch(data) {
    console.log(data)

    // 存储数据的起始点和结束点
    const start = data[0]['下载日期'].split('-');
    const end = data[data.length - 1]['下载日期'].split('-');

    console.log(start, end)
    // 起始年月日
    const start_yy = start[0];
    const start_mm = start[1];
    const start_dd = start[2];
    // 结束年月日
    const end_yy = end[0];
    const end_mm = end[1];
    const end_dd = end[2];

    // 起始月份有多少天
    const start_DATE = DATE[start_mm - 1];
    // 结束月份有多少天
    const end_DATE = DATE[end_mm - 1];

    const len = data.length;

    // 起始月份的下一个月，如果数据不只两个月的情况有用
    let next_mm = ~~start_mm + 1;

    if (start_mm < end_mm) { // 不只一个月的数据
        // 从起始月份开始循环判断
        // 起始月份剩余天数
        const start_mm_diff = DATE[start_mm - 1] - start_dd;
        if (start_mm_diff > 0) { // 需要补全数据
            const sameMM = _.filter(data, function (item) {
                const mm = item['下载日期'].split('-')[1];
                return ~~start_mm === ~~mm
            });
            for (let i = start_dd; i <= DATE[start_mm - 1]; i++) {
                const dd = _.padStart(i, 2, 0)
                let the_day = `${start_yy}-${start_mm}-${dd}`;
                const isExist = _.find(sameMM, function (item) { return item['下载日期'] === the_day });
                if (!isExist) { // 不存在
                    data.push({
                        '关键词': data[0]['关键词'],
                        '自然排名': '-',
                        'sp广告排名': '-',
                        '下载日期': the_day,
                        'ASIN': data[0]['ASIN']
                    })
                }

            }
        }
        if (next_mm == end_mm) { // 只有两个月的数据
            // 从结束月份开始循环判断
            // 结束月份剩余天数
            const end_mm_diff = DATE[end_mm - 1] - end_dd;
            if (end_mm_diff > 0) { // 需要补全数据
                // 找出当前月份的所有数据
                const sameMM = _.filter(data, function (item) {
                    const mm = item['下载日期'].split('-')[1];
                    return ~~end_mm === ~~mm
                });
                console.log('sameMM', sameMM)
                // 结束月份的情况 起始日期为1  结束日期为数据最后一个值
                for (let i = 1; i <= end_dd; i++) {
                    // 日期
                    const dd = _.padStart(i, 2, 0)
                    // 循环得到的每一天
                    let the_day = `${end_yy}-${end_mm}-${dd}`;
                    // 判断每一天是否存在
                    const isExist = _.find(sameMM, function (item) { 
                        console.log(item['下载日期'], 111111111111)
                        console.log(dd, 222222222222)
                        return item['下载日期'] === the_day
                     });
                    console.log(the_day, isExist)
                    if (!isExist) { // 不存在
                        data.push({
                            '关键词': data[0]['关键词'],
                            '自然排名': '-',
                            'sp广告排名': '-',
                            '下载日期': the_day,
                            'ASIN': data[0]['ASIN']
                        })
                    }

                }
            }
        }

    } else { // 同一个月的数据
        const diff = end_dd - start_dd
        if (diff < len) { // 数据不全 需要补
            for (let i = start_dd; i <= end_dd; i++) {
                const dd = _.padStart(i, 2, 0)
                let the_day = `${end_yy}-${end_mm}-${dd}`;
                const isExist = _.find(data, function (item) { return item['下载日期'] === the_day });
                if (!isExist) { // 不存在
                    data.push({
                        '关键词': data[0]['关键词'],
                        '自然排名': '-',
                        'sp广告排名': '-',
                        '下载日期': the_day,
                        'ASIN': data[0]['ASIN']
                    })
                }
            }
        }
    }
    // 将数据排序
    const arr = _.sortBy(data, function(o) { return o['下载日期']; });
    return arr
}