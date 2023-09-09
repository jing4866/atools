/*
 * 根据换行或是回车将数据源 str 转换为 Array
 * @param { String } str 需要转化的数据源
 * @return { Array } [] 返回值一个数组
 * */ 
export const str2Array = ( str ) =>{
    // const regexpRN = /\r\n/g; // 同时存在换行和回车
    const regexpR = /\r/g; // 只存在 回车
    const regexpN = /\n/g; // 只存在 换行
    // 判断基本数据类型
    if( str && typeof(str) === 'string' ){
        // 将所有的 \r 替换为 \n 并分割为数组
        return str.replaceAll(regexpR, '\n').split('\n');
    }
    return []
}

