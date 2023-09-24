// 双线图
export const option = {
    // 图表的标题
    title: {
        left: '0',
        top: 100,
        text: `标题`,
        textStyle: {
            width: 250,
            height: '100%',
            color: '#185abd',
            fontWeight: 'normal',
            fontSize: 16,
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflow: 'break'
        },
        textAlign: 'left'
    },
    // 图例
    legend: {
        type: 'plain',
        show: true,
        right: 50,
    },
    // 直角坐标系网格
    grid: {
        show: false,
        left: 300,
        right: 50,
        borderColor: '#cccccc',
        containLabel: false
    },
    // X 轴坐标
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine: {
            show: true, // 是否显示坐标轴轴线。
            lineStyle: {
                color: '#333333',
            }
        }
    },
    // y 轴坐标
    yAxis: {
        show: true,
        type: 'value',
        // boundaryGap: [0, '100%'],
        axisLine: {
            show: true, // 是否显示坐标轴轴线。
            lineStyle: {
                color: '#333333',
            }
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ],
    // 提示框组件
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0] - 140, '10%'];
        }
    },
    series: [
        {
            name: '自然流量',
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 8,
            sampling: 'lttb',
            connectNulls: false,
            itemStyle: {
                color: '#41a5ee'
            },
            lineStyle: {
                color: '#41a5ee'
            },
            data: []
        },
        {
            name: '广告流量',
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 8,
            sampling: 'lttb',
            connectNulls: false,
            itemStyle: {
                color: '#ffc20e '
            },
            lineStyle: {
                color: '#ffc20e '
            },
            data: []
        }
    ]
}