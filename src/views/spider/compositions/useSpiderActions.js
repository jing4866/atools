import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getSpiderData, addToStore } from "@/api/spider.js";

/**
 * 爬虫操作
 *
 * @returns { Function } spiderOnly 仅爬取数据
 * @returns { Function } spiderToStore 爬取数据 并更新数据库
 * */
export default function (spiderTask) {
    // 爬取结果列表 
    const spiderRef = ref([]);
    // 爬虫网络失败信息
    const spiderNetErrRef = ref(null);
    // 是否将爬虫数据存入数据库
    const isSpider2StoreRef = ref(false);
    // 爬取结果添加数据库按钮状态
    const isAddToStoreRef = ref(false);
    // loading动画
    const loading = ref(false);

    // 仅爬取数据
    const spiderOnly = async () => {
        // 如果任务列表为空，则直接返回
        if (!spiderTask.value.length) {
            return ElMessage.warning(`请选择产品`);
        }
        // 设置相关属性值
        loading.value = true;
        spiderNetErrRef.value = null;
        isSpider2StoreRef.value = false;
        spiderRef.value = [];
        // 处理任务列表数据
        const spiderTasksArray = [];
        for (const spider of spiderTask.value) {
            spiderTasksArray.push(getSpiderData(spider));
        }
        // 发送请求
        try {
            const result = await Promise.allSettled(spiderTasksArray);
            for (const item of result) {
                const { value } = item;
                spiderRef.value.push(value);
            }
            loading.value = false;
            isAddToStoreRef.value = true;
            return true;
        } catch (error) {
            spiderNetErrRef.value = error;
            loading.value = false;
            isAddToStoreRef.value = false;
            return false;
        }
    };

    // 将爬取结果添加到数据库
    const spiderToStore = () => {
        addToStoreHandle();
    }

    // 爬取数据并添加到数据库
    const spiderAndStore = async () => {
        const success = await spiderOnly();
        if (success === true) {
            addToStoreHandle();
        } else {
            return ElMessage.warning(`爬取数据失败。`);
        }
    };

    const addToStoreHandle = () => {
        addToStore(spiderRef.value)
        .then(data => {
            isSpider2StoreRef.value = true;
            ElMessage.success(`数据库更新成功`);
            isAddToStoreRef.value = false;
        })
        .catch(err => {
            const message = err instanceof Error ? err.message : err;
            ElMessage.error(`${message}`);
        });
    }

    return {
        loading,
        spiderRef,
        spiderNetErrRef,
        isSpider2StoreRef,
        isAddToStoreRef,
        spiderOnly,
        spiderToStore,
        spiderAndStore,
    };
}
