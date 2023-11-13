// Vue2.0 事件总线


// Vue2.0 项目常用方式
// import Vue from 'vue';
// export default new Vue({});

// 用于存储需要监听的事件信息
// const listeners = {};
// 自定义事件总线
// export default {
//     /**
//      * 绑定监听事件
//      * @param { String } eventName 需要监听的事件名称
//      * @param { Function } handler 监听事件的处理函数
//      * */ 
//     $on (eventName, handler) {
//         // 使用 new Set 避免重复添加
//         if( !listeners[eventName] ){
//             // 如果还不存在 eventName，则创建一个new Set准备存储 eventName 的处理函数
//             listeners[eventName] = new Set();
//         };
//         // 将处理函数存入 eventName 空间内, new Set 会自动去重
//         listeners[eventName].add(handler);
//     },
//     /**
//      * 解除监听事件
//      * @param { String } eventName 需要解除监听的事件名称
//      * @param { Function } handler 需要解除监听事件的处理函数
//      * */ 
//     $off (eventName, handler) {
//         // 如果监听事件不存在，则直接返回
//         if( !listeners[eventName] ) return;
//         // 如果监听事件存在，则删除需要解除监听事件的处理函数
//         listeners[eventName].delete(handler);
//     },
//     /**
//      * 触发监听事件
//      * @param { String } eventName 需要触发的监听事件名称
//      * @param { ...Any } args 需要触发的监听事件处理函数的参数
//      * */ 
//     $emit (eventName, ...args) {
//         // 如果需要触发的监听事件不存在， 则直接返回
//         if( !listeners[eventName] ) return;
//         // 如果需要触发的监听事件存在，则遍历执行
//         for( const handler of listeners[eventName]){
//             handler(...args);
//         }
//     }
// }
