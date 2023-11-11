import { ref } from 'vue';

// 用户输入的关键词 String
const filterRef = ref('');

export default function () {
    return {
        filterRef
    }
}
