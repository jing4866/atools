import { ref, nextTick } from 'vue';
import { ElLoading } from 'element-plus';


// loading
const loadingInstance = ref(null);
export const triggerLoading = () => {
    loadingInstance.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
};

export const closeLoading = () => {
    nextTick(() => {
        // Loading should be closed asynchronously
        loadingInstance.value.close();
        loadingInstance.value = null;
    })
}