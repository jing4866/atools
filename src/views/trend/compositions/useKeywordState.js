import { ref, reactive } from 'vue';
import { ElLoading } from 'element-plus'
import _ from 'lodash';


export default function (){
    const chartFilterByKey = (keyword, data) => {
        return _.map(data, item => {
            // 清空关键词时，显示全部数据
            if ( keyword == null || keyword.length ===0 ) {
                item.filtered = true
                return item
            }
            item.filtered = _.includes(keyword, item.key);
            return item
        });
    }
    const keywordFilterHandle = (val, data) => {
        const loadingInstance = ElLoading.service({
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.5)'
        })
        chartFilterByKey(val, data);
        loadingInstance.close();
    };

    const keywordClearHandle = (val, data) => {
        const loadingInstance = ElLoading.service({
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.5)'
        })
        chartFilterByKey(val, data);
        loadingInstance.close();
    };

    return {
        chartFilterByKey,
        keywordFilterHandle,
        keywordClearHandle
    }
}
