import { reactive } from 'vue';
import useHistoryRanks from './useHistoryRanks.js';
const { historyDialogHandle } = useHistoryRanks();

const pageConfig = reactive({
    total: 0,
    size: 10,
    current: 1
})
export default function () {
    const sizeChangeHandle = (value, cb) => {
        pageConfig.size = value;
        historyDialogHandle(pageConfig.size, pageConfig.current);
    };

    const currentChangeHandle = (value, cb) => {
        pageConfig.current = value;
        historyDialogHandle(pageConfig.size, pageConfig.current);
    };

    const preClickHandle = (value, cb) => {
        pageConfig.current = value;
        historyDialogHandle(pageConfig.size, pageConfig.current);
    };

    const nextClickHandle = (value, cb) => {
        pageConfig.current = value;
        historyDialogHandle(pageConfig.size, pageConfig.current);
    };

    return {
        pageConfig,
        sizeChangeHandle,
        currentChangeHandle,
        preClickHandle,
        nextClickHandle
    }
}
