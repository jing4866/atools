// 图表配色
export const colorConfig = {
    advertise: {
        color: '#ffc20e',
        desc: '广告流量排名'
    },
    natural: {
        color: '#41a5ee',
        desc: '自然流量排名'
    },
    keyword: {
        color: '#185abd',
        desc: '关键字'
    },
    grid: {
        color: '#333333',
        desc: '坐标系'
    }
};

// Date组件配置
export const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
    {
        text: '最近六个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            return [start, end]
        },
    },
    {
        text: '最近一年',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            return [start, end]
        },
    },
]

// 补全数据日期
export const fullDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
