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
    const getRanksData = () => {
        loadingHRef.value = true
        getHistoryRanks()
        .then(data => {
            historyRanksRef.value = data;
            loadingHRef.value = false;
        })
        .catch(err => {
            const message = err instanceof Error ? err.message : err;
            ElMessage.error(`${message}`);
            loadingHRef.value =false
        });       
    };

    // 删除历史排名数据
    const deleteRankData = (row, cb) => {
        loadingHRef.value =true
        delHistoryRank(row)
        .then(data => {
            ElMessage.success(`删除成功`);
            if(cb) cb()
            loadingHRef.value = false;
        })
        .catch(err => {
            const message = err instanceof Error ? err.message : err;
            ElMessage.error(`${message}`);
            loadingHRef.value = false
        });       
    };

    // 关闭历史排名弹出框
    const historyVisibleChange = () => {
        historyVisibleRef.value = false;
    };

    // 数据请求成功后修改visible状态
    const historyDialogHandle = async() => {
        await getRanksData();
        historyVisibleRef.value = true;
    };
    // 删除历史数据后重新获取数据
    const historyDelete = async (row) => {
        await deleteRankData(row, getRanksData);
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