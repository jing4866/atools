import { ref, reactive } from 'vue';
import _ from 'lodash';

/*
 * 图表数据过滤器：根据关键词下拉值进行过滤
 * @param { Array } keyword 过滤条件关键词
 * @param { Array } data 需要过滤的源数据
 * @param { Array } 返回值 包含过滤条件的数据
 * */
export const chartFilterByKey = (keyword, data) => {
    return _.map(data, item => {
        // 清空关键词时，显示全部数据
        if (keyword.length === 0) {
            item.filtered = true
            return item
        }
        item.filtered = _.includes(keyword, item.keyword);
        return item
    });
}

/*
 * 根据关键词对图表进行过滤
 * @param { Array } val select多选框的选择结果
 * @return { Array } 返回值，过滤后的结果
 * */
export const keywordFilterHandle = (val,state) => {
    state.keyword = val;
    chartFilterByKey(state.keyword, state.chartData);
}
/**
 * 清空关键词Select多选框数据
 * @param { Array }  无需参数
 * @return { Array } 清空后的数据
 */
export const keywordClearHandle = (val, state) => {
    state.keyword = []
    chartFilterByKey(state.keyword, state.chartData);
}
