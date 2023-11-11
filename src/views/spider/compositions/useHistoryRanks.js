import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { getHistoryRanks, delHistoryRank } from "@/api/spider.js";

export default function () {
    // 历史排名弹出框 visible
    const historyVisibleRef = ref(false);
    // 历史排名数据
    const historyRanksRef = ref([]);
    // loading
    const loadingHRef = ref(false);
    // 向服务器请求历史排名数据
    const getRanksData = async(limit, current) => {
        // loadingHRef.value = true;
        const data = await getHistoryRanks(limit, current);
        historyRanksRef.value = data;
        loadingHRef.value = false;
        return data      
    };

    // 删除历史排名数据
    const deleteRankData = async(row, cb) => {
        loadingHRef.value =true;
        const data = await delHistoryRank(row);
        ElMessage.success({
            grouping: true,
            message: `删除成功`
        });
        if(cb) cb();
        loadingHRef.value = false;       
    };

    // 关闭历史排名弹出框
    const historyVisibleChange = () => {
        historyVisibleRef.value = false;
    };

    // 数据请求成功后修改visible状态
    const historyDialogHandle = async(limit, current) => {
        loadingHRef.value = true;
        historyVisibleRef.value = true;
        const data = await getRanksData(limit, current);
    };
    // 删除历史数据后重新获取数据
    const historyDelete = async (row) => {
        const data = await deleteRankData(row, getRanksData);
    };

    return {
        historyVisibleRef,
        historyRanksRef,
        loadingHRef,
        historyVisibleChange,
        historyDialogHandle,
        historyDelete
    };
}
