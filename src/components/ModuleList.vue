<template>
    <div class="modules-containter">
        <div class="modules-item">
            <div class="mudules-innter">
                <h2 class="modules-title">关键字过滤</h2>
                <p class="modules-description">
                    关键字过滤
                </p>
            </div>
        </div>
        <div class="modules-item">
            <div class="mudules-innter">
                <h2 class="modules-title">Coming...</h2>
                <p class="modules-description">
                    正在开发中...
                </p>
            </div>
        </div>
        <div class="modules-item">
            <div class="mudules-innter">
                <h2 class="modules-title">Coming...</h2>
                <p class="modules-description">
                    正在开发中...
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.modules-containter{
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    padding: 100px;
    .modules-item{
        display: block;
        width: calc(100% / 3);
        padding: 8px;
        .mudules-innter{
            padding: 24px;
            border: 1px solid #202127;
            border-radius: 12px;
            height: 100%;
            background-color: #202127;
            transition: border-color .25s,background-color .25s;
            &:hover{
                border-color: #a8b1ff;;
            }
        }
        .modules-title{
            line-height: 24px;
            font-size: 16px;
            font-weight: 600;
        }
        .modules-description{
            flex-grow: 1;
            padding-top: 8px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>