import { reactive } from 'vue';

const pageConfig = reactive({
    total: 0,
    size: 20,
    current: 1
})
export default function () {
    const sizeChangeHandle = (value) => {
        pageConfig.size = value;
    };

    const currentChangeHandle = (value) => {
        pageConfig.current = value;
    };

    const preClickHandle = (value) => {
        pageConfig.current = value;
    };

    const nextClickHandle = (value) => {
        pageConfig.current = value;
    };

    return {
        pageConfig,
        sizeChangeHandle,
        currentChangeHandle,
        preClickHandle,
        nextClickHandle
    }
}
