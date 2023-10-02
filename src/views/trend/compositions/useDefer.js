import { ref, onUnmounted } from 'vue';

/*
 * 递归循环计数器，浏览器的动画函数，返回一个延时函数
 * @param { Number } maxCount 最大循环次数 默认值100 
 * @return { Function } 延时函数
 * https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame
 * */ 

export function useDefer ( maxCount = 100 ) {
    const frameCountRef = ref(0);
    let rafId;
    function updateFrameCount () {
        // 循环执行浏览器动画帧函数
        rafId = requestAnimationFrame(() => {
            frameCountRef.value++;
            if( frameCountRef.value >= maxCount ){
                return;
            };
            updateFrameCount();
        });
    };
    // 调用递归函数
    updateFrameCount();
    // 组件卸载时清空动画帧函数
    onUnmounted(()=>{
        cancelAnimationFrame(rafId);
    });
    // 返回一个可执行函数
    return function defer (n) {
        return frameCountRef.value >= n;
    }
}