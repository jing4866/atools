<template>
    <div class="operator-list">
        <p class="p-desc">爬取列表:</p>
        <div v-if="props.task.length === 0" class="ul-item" style="color: orange">请选择或是手动添加ASIN</div>
        <ul v-else class="ul-item">
            <li class="l-item" v-for="item in props.task">
                <span>- {{ item }}</span>
                <el-popconfirm title="移出爬虫列表?" @confirm="confirmEvent(item)">
                    <template #reference>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </template>
                </el-popconfirm>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue';

const props = defineProps({
    task: {
        type: Array,
        default: []
    }
});

const emit = defineEmits(['updateTask']);

const confirmEvent = (val) => {
    emit('updateTask', val)
};

</script>

<style>
.operator-list {
    padding: 5px;

    .p-desc {
        padding-left: 13px;
    }

    .ul-item {
        height: calc(100vh - 390px);
        padding: 5px;
        overflow: auto;
        padding-left: 13px;
        padding-right: 20px;
    }

    .l-item {
        display: flex;
        justify-content: space-between;

        &:hover {
            color: rgb(64, 158, 255)
        }
    }
}
</style>