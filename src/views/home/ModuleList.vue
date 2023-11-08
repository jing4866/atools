<template>
    <div class="modules-containter">
        <!-- 汇率 -->
        <Exchange></Exchange>
        <!-- 国际时间 -->
        <Clock></Clock>
        <!-- 其他待更新 -->
        <div class="modules-item">
            <div class="mudules-innter">
                <div class="modules-title">
                    <h2 class="title">其他</h2>
                </div>
                <p class="modules-description">
                    更新中...
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, toRef } from 'vue';
import Exchange from './exchange/index.vue';
import Clock from './Clock/index.vue';

</script>

<style>
.modules-containter {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding: 50px;

    .modules-item {
        display: block;
        width: calc(100% / 3);
        padding: 8px;

        .mudules-innter {
            color: #2C3E50;
            padding: 24px;
            border: 1px solid #f6f6f7;
            border-radius: 12px;
            height: 100%;
            background-color: #f6f6f7;
            transition: box-shadow .25s, background-color .25s, transform .25s;

            &:hover {
                /* border-color: #a8b1ff; */
                box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
                transform: scale(1.01);
            }
        }

        .modules-title {
            display: flex;
            justify-content: space-between;

            .title {
                line-height: 24px;
                font-size: 16px;
                font-weight: 600;
                color: #3C3C43;
            }
        }

        .modules-description {
            flex-grow: 1;
            padding-top: 8px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(60, 60, 67, 0.78);

            .modules-footer {
                text-align: right;
                margin: 5px;
            }
        }
    }
}


/* 简单适配移动端 */
@media (max-width: 896px) {
    .modules-containter {
        display: block;
        padding: 50px;

        .modules-item {
            width: 100%;

            .mudules-innter {
                padding: 12px;
            }
        }
    }
}</style>