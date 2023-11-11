import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import _ from "lodash";
import { getAsinOverview, getAsinLastCount, getAsinPreviousCount } from "@/api/asin.js";

// Dashboard 主页面 Table
const dataRef = ref([]); // 表格数据
const tableLoadingRef = ref(false);

/**
 * 辅助函数： 格式化数据
 * @param { Array } data 后端返回的原始数据
 * @returns { Array } 按照关键词排序聚合后的数组
 * */ 
const data2Serialize = data => {
    const { asins, allkeys, lastkeys, comparekeys } = data;
    // 将关键词数据进行分组/去重
    const keysGroup = _.groupBy(allkeys, item => item["ASIN"]);
    const no_repeat_keys = _.map(keysGroup, (val, key) => {
        return {
            key: key,
            value: _.unionBy(val, "关键词"),
        };
    });
    // 将最新一日数据分组
    const lastGroup = _.groupBy(lastkeys, item => item["ASIN"]);
    // 将对比数据分组
    const compareGroup = _.groupBy(comparekeys, item => item["ASIN"]);
    // 返回数据处理结果
    return _.map(asins, item => {
        const the_same = no_repeat_keys.filter(it => it.key === item.ASIN)[0];
        // 指定asin下全部关键词列表
        item.children =
            the_same !== undefined && the_same.key === item.ASIN
                ? the_same.value
                : [];
        // 指定asin下需要比较的前一日关键词数
        item.y_count = compareGroup[item.ASIN]
            ? compareGroup[item.ASIN].length
            : null;
        // 指定asin下最新关键词数
        item.t_count = lastGroup[item.ASIN]
            ? lastGroup[item.ASIN].length
            : null;
        // 指定asin下前一日关键词列表
        item.compare = compareGroup[item.ASIN] ? compareGroup[item.ASIN] : [];
        // 返回结果
        return item;
    });
};

// Dashboard 页面主表格
export default function () {

    // 请求指定asin关键词当日数量
    const asinLastDataCount = async (asin) => {
        const count = await getAsinLastCount(asin);
        return count;
    };
    // 请求指定asin关键词前一日数量
    const asinPreviousCount = async (asin) => {
        const count = await getAsinPreviousCount(asin);
        return count;
    };
    // 请求全部asin关键词数据
    const initOverview = async () => {
        tableLoadingRef.value = true;
        const data = await getAsinOverview();
        dataRef.value = data;
        tableLoadingRef.value = false;
        return data;
    };
    // 初始化表格数据
    initOverview().then(res => {
        // 数据asin和关键词请求成功后，做数据补全工作
        dataRef.value.map(async item => {
            item.last_count = await asinLastDataCount(item.ASIN);
            item.previous_count = await asinPreviousCount(item.ASIN);
            return item
        });
    });
    
    return {
        dataRef,
        tableLoadingRef
    };
}
