import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { updateProductByAsins } from '@/api/spider.js';

/**
 * 爬虫任务列表
 * @param   { Array } spiderTask 存储用户需要爬虫数据的产品列表
 * @param   { Function } callback 当数据库更新成功后的回调函数
 * @returns { String } addSpiderRef 输入框需要使用的model
 * @returns { Array } warningDataRef 告警信息
 * @returns { Boolean } warningDataRef 告警弹出框状态
 * @returns { Function } addToSpiderOnly 将产品加入爬虫任务列表函数
 * @returns { Function } addToSpiderStore 将产品加入爬虫任务并更新数据库函数
 * */ 
export default function (spiderTask, callback) {
    // 需要添加到爬虫列表或是数据库的产品字符串，以 ‘,’ 分隔
    const addSpiderRef = ref("");
    // 更新产品信息到数据后的警告信息
    const warningDataRef = ref([]);
    // 告警信息弹出框状态
    const dialogVisibleRef = ref(false);

    /**
     * 仅将用户新增的产品加入 spiderTask 任务列表
     * @returns { Array[string] } arr 用户输入的产品列表数组 
     */ 
    const addToSpiderOnly = () => {
        let arr = []; // 存储分隔后的字符串数据
        if (addSpiderRef.value.trim().length === 0) {
            // 用户未输入有效信息
            return ElMessage.warning(`请输入。`);
        }else{
            // 将用户输入使用分隔符进行分隔
            arr = addSpiderRef.value.trim().split(",");
        };
        // 遍历数据添加到任务队列
        for (const item of arr) {
            if (item.trim().length !== 0) {
                // 先判断任务列表中是否存在
                if (spiderTask.value.includes(item)) {
                    ElMessage.warning(`${item} 已存在于爬虫列表`);
                } else {
                    spiderTask.value.push(item);
                }
            }
        }
        return arr;
    };
    /**
     * 新增需要爬虫的产品，同时添加 spiderTask 爬虫列表和数据库
     * */ 
    const addToSpiderStore = () => {
        if(addSpiderRef.value.trim().length === 0){
            // 用户未输入有效信息
            return ElMessage.warning(`请输入。`);
        }else{
            updateProductByAsins(addSpiderRef.value.trim()).then(data => {
                if (data.success) {
                    ElMessage.success(`数据Spider状态更新成功`);
                    // 当数据更新成功后重新调用select列表数据
                    callback();  // selectInit
                } else {
                    // 当数据在数据库中状态异常 抛出告警信息
                    warningDataRef.value = data;
                    dialogVisibleRef.value = true
                }
            }).catch(err => {
                // 网络错误告警
                const message = err instanceof Error ? err.message : err;
                ElMessage.error(`${message}`);
            })
        }
    };
    
    // 返回待用数据
    return {
        addSpiderRef,
        warningDataRef,
        dialogVisibleRef,
        addToSpiderOnly,
        addToSpiderStore
    };
}
