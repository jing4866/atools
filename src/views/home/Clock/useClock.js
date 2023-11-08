import { ref, reactive } from 'vue';
import { DateTime } from "luxon";
import _ from 'lodash'

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const USClock = reactive({
    date: '2000-12-12',
    week: '星期日',
    time: ['12', '12', '12'] // 时分秒
});

const CNClock = reactive({
    date: '2020-12-12',
    week: '星期日',
    time: ['20','12', '12'] // 时分秒
});

const timer = ref(null);

/**
 * 时钟函数
 * 
 * */ 
export default function (){
    // Luxon插件格式为：2023-11-08T01:04:38.936-08:00

    // 动态时钟
    timer.value = setInterval(function(){
        // 设置年月日
        const us = DateTime.now().setZone("America/Los_Angeles").toString();
        const cn = DateTime.now().toString(); // 本地时间    
        
        USClock.date = us.substring(0, 10); // 美国：年月日
        CNClock.date = cn.substring(0, 10); // 中国：年月日
        
        const dt_us = DateTime.now().setZone("America/Los_Angeles"); 
        const dt_cn = DateTime.now();
        // 设置星期
        USClock.week = weekdays[dt_us.weekday]
        CNClock.week = weekdays[dt_cn.weekday];

        // 设置时钟
        USClock.time[0] = _.padStart(dt_us.hour.toString(), 2, '0');
        USClock.time[1] = _.padStart(dt_us.minute.toString(), 2, '0');
        USClock.time[2] = _.padStart(dt_us.second.toString(), 2, '0');

        CNClock.time[0] = _.padStart(dt_cn.hour.toString(), 2, '0');
        CNClock.time[1] = _.padStart(dt_cn.minute.toString(), 2, '0');
        CNClock.time[2] = _.padStart(dt_cn.second.toString(), 2, '0');

    }, 1000);

    return {
        timer,
        USClock,
        CNClock
    }
};