import { ref, reactive } from 'vue';
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
        chartFilterByKey(val, data);
    };

    const keywordClearHandle = (val, data) => {
        chartFilterByKey(val, data);
    };

    return {
        chartFilterByKey,
        keywordFilterHandle,
        keywordClearHandle
    }
}
