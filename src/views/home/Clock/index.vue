<template>
    <!-- 时钟组件:同时显示北京时间和美国时间 -->
    <div class="modules-item modules-clock-container">
        <div class="mudules-innter">
            <div class="modules-title">
                <h2 class="title">美国时间</h2>
            </div>
            <div class="modules-description">
                <!-- Loading -->
                <el-skeleton :rows="3" animated v-if="loading" />
                <template v-else>
                    <!-- 美国时间 -->
                    <div class="us-times">
                        <!-- 时：分 秒 -->
                        <div class="us-time">
                            <strong class="big">{{ USClock.time[0] }}</strong>
                            <strong class="big">:</strong>
                            <strong class="big">{{ USClock.time[1] }}</strong>
                            <span class="small">{{ USClock.time[2] }}</span>
                        </div>
                        <!-- 星期 -->
                        <div class="us-week">{{ USClock.week }}</div>
                        <!-- 年月日 -->
                        <div class="us-year">{{ USClock.date }}</div>
                    </div>
                    <!-- 北京时间 -->
                    <div class="bj-time">
                        <span>北京时间：</span>
                        <span class="p-10" style="width: 80px; display: inline-block;">
                            {{ CNClock.time[0] }}:{{ CNClock.time[1] }}:{{ CNClock.time[2] }}
                        </span>
                        <span>{{ CNClock.week }}</span>
                        <span class="p-10">{{ CNClock.date }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useClock from './useClock';

const loading = ref(true);

const { USClock, CNClock } = useClock();

onMounted(() => {
    loading.value = false
})


</script>
<style>
.modules-clock-container {
    .us-time {
        float: left;
        width: 60%;
        padding-top: 50px;
        min-height: 160px;
        .big {
            font-size: 46px;
            padding: 20px 5px;
        }

        .small {
            font-size: 20px;
            padding: 10px 5px;
        }
    }

    .us-week {
        width: 40%;
        float: left;
        font-size: 20px;
        margin-bottom: 10px;
        padding: 10px 0;
    }

    .us-year {
        float: left;
        width: 40%;
        font-size: 14px;
        padding: 10px 0;
    }

    .bj-time {
        clear: both;
        text-align: right;

        .p-10 {
            padding: 0 10px;
        }
    }
}
</style>