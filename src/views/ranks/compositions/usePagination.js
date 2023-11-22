import { reactive } from 'vue';
import useHistoryRanks from './useHistoryRanks.js';

const pageConfig = reactive({
    total: 0,
    size: 10,
    current: 1
})
export default function () {
    const sizeChangeHandle = (value, cb, filter) => {
        pageConfig.size = value;
        if(cb) cb(pageConfig.size, pageConfig.current, filter);
    };

    const currentChangeHandle = (value, cb, filter) => {
        pageConfig.current = value;
        if(cb) cb(pageConfig.size, pageConfig.current, filter);
    };

    const preClickHandle = (value, cb, filter) => {
        pageConfig.current = value;
        if(cb) cb(pageConfig.size, pageConfig.current, filter);
    };

    const nextClickHandle = (value, cb, filter) => {
        pageConfig.current = value;
        if(cb) cb(pageConfig.size, pageConfig.current, filter);
    };

    return {
        pageConfig,
        sizeChangeHandle,
        currentChangeHandle,
        preClickHandle,
        nextClickHandle
    }
}
