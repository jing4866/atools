import { ref, reactive } from 'vue';
import _ from 'lodash';

/*
 * 将传入的字符串转为数组返回
 * @param { String } str 字符串类型的参数 
 * @return { Array } array 返回数组
 * */ 
export function string2Array (str) {
    // 如果数据不存在或不是字符串，则返回空数组
    if( !str || typeof str !== 'string'){
        return [];
    }

    const regexpRN = /\r\n/g; // 换行和回车的正则表达式
    const array = str.toLocaleLowerCase().replaceAll(regexpRN, '\n').split('\n');
    // 移除所有数据项的首尾空格并返回非空数据
    array.filter(item => {
        item.trim();
        return !!item; 
    });
    // 去掉首尾空格后的一维数组，每个子项为一条含空格的字符串
    console.log('string2Array', array)
    return array;
};

/*
 * 查找数据的最大子串
 * @param { Array } source 需要遍历处理的数据
 * @return { String } common_str 最大子串
 * */ 
export function proposeCommons ( source ) {
    // 如果参数不存在 则直接返回空数组
    if( source == null ){ return [] };

    // 如果参数只有一项，则直接返回参数
    if( source.length ===1 ){ return source.slice(0) };

    // 当参数长度大于等于2项时
    let array = [];

    // 生成基于源数据的二维数组
    let dimension = _.map(source, item => item.split(' '));

    // 筛选出数组中的所有公共部分,有序
    let commons = _.intersection(...dimension);
    
    // 假设公共部分就是最大子串
    let common_str = commons.join(' ');
    
    // 确认子串
    for (let i = 0; i < source.length; i++) {
        const item = source[i];
        if( item.indexOf(common_str) === -1 ){
            // 一旦在数组中找不到子串，则说明 common_str 不是最大子串
            // 则删除公共 commons 的最后一项并重新生成子串
            commons.pop();
            common_str = commons.join(' ');
            i = 0;
        }   
    }

    return common_str;
}

/*
 * 标记数据交集：将公共子串在源数据中加入html标签<strong></strong>
 * @param { Array } source 用户输入数据转化后的一维数组
 * @param { String } sourceStr 用户输入的原始数据
 * @return { Object } commons 交集， marked 对公共字符处理过后的数组
 * */ 
export function markCommons ( source, sourceStr ){
    // 公共子串
    let commons = proposeCommons(source);
    if(commons.length === 0 ){
        // 如果没有交集，则返回空子串
        return {
            commons,
            marked: source
        }
    }
    
    // 遍历处理源数据，查找公共子串的位置
    for( let i = 0; i < source.length; i++ ){
        // 由于子串是公共部分 所以无需做if判断
        source[i] = _.replace(source[i], commons, `<strong style="color: red;">${commons}</strong>`) 
    }

    return {
        commons,
        marked: source
    }
}
