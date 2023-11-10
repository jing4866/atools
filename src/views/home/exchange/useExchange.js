import { ref, readonly } from 'vue';
import { exchangeFetch } from "@/api/other.js";
import { ElMessage } from "element-plus";

// 汇率数据
const dataRef = ref({});
// 对外暴露的汇率数据
const exchangeRef = readonly(dataRef);
// loading
const loadingRef = ref(true);

/**
 * 今日汇率：请求第三方数据接口
 * */
export default function () {
    // 请求汇率数据
    const fetchExchange = async() => {
        loadingRef.value = true;
        const data = await exchangeFetch();
        if (data) {
            const {time_last_updated, base, date, rates } = JSON.parse(data);
            dataRef.value = {
                status: true,
                base,
                date,
                rates,
                time_last_updated
            };
        }
        loadingRef.value = false;
    };

    // 接收子组件更新请求
    const updateExchange = async () => {
        loadingRef.value = true;
        // 保存之前的更新时间
        const last_update = dataRef.value.time_last_updated;
        await fetchExchange();
        loadingRef.value = false;
        // 记录最新的请求时间
        const new_update = dataRef.value.time_last_updated;
        if (new_update && last_update === new_update) {
            // 第三方没有更新数据
            ElMessage({
                message: "第三方数据尚未更新.",
                type: "warning",
            });
        } else if (new_update && last_update !== new_update) {
            // 数据更新了
            ElMessage({
                message: "已更新为最新数据.",
                type: "success",
            });
        } else {
            // 数据出错
            ElMessage.error(`接口似乎出了问题，请参考其他网站数据。`);
        }
    };

    return {
        loadingRef,
        exchangeRef,
        fetchExchange,
        updateExchange
    };
}
