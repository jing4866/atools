<template>
    <Transition name="slide-fade">
        <div class="table-drawer" v-show="visible">
            <!-- Close Button -->
			<div class="close-x" @click="closeHandler">
				<el-icon>
					<CloseBold />
				</el-icon>
			</div>
            <!-- Close Arrow -->
			<div class="close-arrow" @click="closeHandler">
				<el-icon>
					<DArrowRight />
				</el-icon>
			</div>
            <!-- 主区域 -->
            <div class="table-drawer-inner">
                <!-- 标题 -->
                <GeneralView :data="data"></GeneralView>
                <!-- 表格 -->
                <TableChart :data="props.table"   
					v-loading="loading" 
					element-loading-text="Loading..."
					:element-loading-spinner="svg"
					element-loading-svg-view-box="-10, -10, 50, 50"
					element-loading-background="rgba(255, 255, 255, 0.5)" 
					></TableChart>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { computed, watchEffect, onUpdated } from 'vue';
import { CloseBold, DArrowRight } from "@element-plus/icons-vue";
import GeneralView from './GeneralView.vue';
import TableChart from './TableChart.vue';

const props = defineProps({
    available: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false,
    },
    // GeneralView 统计数据
    data: {
        type: Object,
        default: {}
    },
    // Table 表格数据
    table: {
        type: Array,
        default: []
    }
});

const emits = defineEmits(['onCloseDrawer', 'onTriggerExpand', 'onUpdateDrawer'])

const visible = computed(() => props.available);

const closeHandler = () => {
    emits('onCloseDrawer');
};

watchEffect(()=>{
    if(props.data.ASIN !== undefined){
		emits('onUpdateDrawer', props.data.ASIN) 
    }
});

</script>

<style>
.table-drawer {
	position: fixed;
	top: 0;
	right: 0;
	width: 80%;
	height: 100vh;
	z-index: 99;

	.table-drawer-inner {
		height: 100%;
		background-color: #ffffff;
		box-shadow: 0px 5px 10px #cccccc;

		.title {
			font-size: 18px;
			line-height: 36px;
			text-indent: 36px;
			padding: 10px 0;
		}

		.table-content {
			margin: 10px 20px;
			/* height: calc(100vh - 150px);
            overflow: auto; */
		}

		.statistic-content {
			padding: 10px 40px;
			background-color: #f6f6f7;
			box-shadow:  0px 0px 3px rgba(0, 0, 0, .2);
			.el-statistic__content {
				font-size: 16px;
			}
		}

		.total {
			font-size: 12px;
			padding: 5px 30px;
		}
		.drawer-chart{
			position: relative;
			display: flex;
			justify-content: space-between;
			background-color: #f5f7fa;
			&::before{
				content: " ";
				position: absolute;
				width: 0px;
				height: 0px;
				top: -20px;
				left: 70px;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid transparent;
				border-bottom: 10px solid #f5f7fa;
				z-index: 9;
			}
			.drawer-static{
				width: 15%;
				padding: 10px 20px;
			}
			.drawer-line{
				width: 85%;
				height: 200px;
			}
		}
	}

	.close-x {
		position: absolute;
		top: 10px;
		right: 20px;
		z-index: 90;
	}

	.close-arrow {
		position: absolute;
		top: 50%;
		left: 10px;
		z-index: 90;
	}
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
