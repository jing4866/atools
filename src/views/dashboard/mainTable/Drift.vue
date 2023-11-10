<template>
    <div class="drift-container" :class="status">
        <!-- icon -->
        <div class="drift-icons">
            <el-icon v-if="status === 'up'">
                <Top />
            </el-icon>
            <el-icon v-if="status === 'down'">
                <Bottom />
            </el-icon>
            <el-icon v-else-if="status === 'incalculable'">
                <Minus />
            </el-icon>
        </div>
        <!-- description -->
        <div class="drift-desc">
            <span v-if="(typeof props.value === 'number')">{{ props.value }}</span>
            <span v-else>*</span>
        </div>
    </div>
</template>

<script setup>
import { Top, Bottom, Minus } from '@element-plus/icons-vue';
import { computed } from 'vue';
const props = defineProps({
    value: {
        default: 0
    }
});

const status = computed(() => {
    if (typeof props.value === 'number') {
        if (props.value > 0) {
            return 'up'
        } else if (props.value < 0) {
            return 'down'
        } else if (props.value === 0) {
            return 'incalculable'
        }
    } else {
        return 'incalculable'
    }
})
</script>

<style scoped>
.drift-container {
    display: flex;
    justify-content: center;
    &.incalculable {
        color: inherit;
    }

    &.up {
        color: red;
    }

    &.down {
        color: green;
    }
    .drift-icons{
        width: 25px;
        text-align: center;
    }
    .drift-desc{
        min-width: 30px;
    }
}
</style>