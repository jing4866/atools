<template>
	<Transition name="slide-fade">
		<div class="table-drawer" v-show="visible">
			<div class="close-x" @click="closeHandler">
				<el-icon>
					<CloseBold />
				</el-icon>
			</div>
			<div class="close-arrow" @click="closeHandler">
				<el-icon>
					<DArrowRight />
				</el-icon>
			</div>
			<div class="table-drawer-inner">
				<!-- 标题 -->
				<h3 class="title">ASIN: {{ data.ASIN }}</h3>
				<el-row class="statistic-content">
					<el-col :span="4">
						<el-statistic title="最早日期" :value="data.earliest_date" />
					</el-col>
					<el-col :span="4">
						<el-statistic title="最晚日期" :value="data.latest_date" />
					</el-col>
					<el-col :span="4">
						<el-statistic title="历史总数" :value="data.k_count" />
					</el-col>
					<el-col :span="4">
						<el-statistic title="昨日总数" :value="data.y_count" />
					</el-col>
					<el-col :span="4">
						<el-statistic title="今日总数" :value="data.t_count" />
					</el-col>
					<el-col :span="4">
						<el-statistic title="趋势" :value="data.t_count - data.y_count">
							<template #suffix>
								<el-icon style="vertical-align: -0.125em">
									<Top color="red" v-if="data.t_count - data.y_count > 0" />
									<Bottom color="green" v-else-if="data.t_count - data.y_count < 0" />
									<Minus v-else="data.t_count - data.y_count === 0" />
								</el-icon>
							</template>
						</el-statistic>
					</el-col>
				</el-row>
				<div class="table-content">
					<el-table :data="tableData" ref="expandTable" style="width: 100%" :height="tableH" row-key="关键词" 
						:expand-row-keys="expandRowKeys" 
						@expand-change="expandChangeHandle">
						<el-table-column type="expand">
							<template #default="scope">
								<div class="drawer-chart">
									<div class="drawer-static">
										<Statistic :key="scope.row['ASIN']" :data="{
											keyword: scope.row['关键词'],
											data: scope.row.chart
										}"></Statistic>
									</div>
									<div class="drawer-line">
										<DoubleLines :key="scope.row['ASIN']" :data="{
											keyword: scope.row['关键词'],
											data: scope.row.chart
										}"></DoubleLines>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="关键词" label="关键词" sortable />
						<el-table-column prop="下载日期" label="下载日期" align="center" sortable width="120" />
						<el-table-column prop="周搜索量" label="周搜索量" align="center" sortable width="120" />
						<el-table-column prop="周搜索量" label="日搜索量" align="center" sortable width="120">
							<template #default="scope">
								<span>{{ (scope.row["周搜索量"] / 7).toFixed() }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="自然排名" align="center" width="100">
							<template #header>
								<p>自然排名</p>
								<span>[今日:昨日]</span>
							</template>
							<template #default="scope">
								<span>{{ scope.row["自然排名"] }} : {{ scope.row["n_rank"] }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="n_trend" label="自然趋势" align="center" width="100">
							<template #default="scope">
								<div>
									<div v-if="scope.row.n_trend === '上升'">
										<el-icon>
											<Top color="red"></Top>
										</el-icon>
									</div>
									<div v-else-if="scope.row.n_trend === '下降'">
										<el-icon>
											<Bottom color="green"></Bottom>
										</el-icon>
									</div>
									<div v-else-if="scope.row.n_trend === '持平'">
										<el-icon>
											<Minus></Minus>
										</el-icon>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="sp广告排名" align="center" width="100">
							<template #header>
								<p>sp排名</p>
								<span>[今日:昨日]</span>
							</template>
							<template #default="scope">
								<span> {{ scope.row["sp广告排名"] }} : {{ scope.row["sp_rank"] }} </span>
							</template>
						</el-table-column>
						<el-table-column prop="sp_trend" label="sp趋势" align="center" width="100">
							<template #default="scope">
								<div>
									<div v-if="scope.row.sp_trend === '上升'">
										<el-icon>
											<Top color="red"></Top>
										</el-icon>
									</div>
									<div v-else-if="scope.row.sp_trend === '下降'">
										<el-icon>
											<Bottom color="green"></Bottom>
										</el-icon>
									</div>
									<div v-else-if="scope.row.sp_trend === '持平'">
										<el-icon>
											<Minus></Minus>
										</el-icon>
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="total">
					当前页面总数据: {{ data.children ? data.children.length : 0 }} 条
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { CloseBold, DArrowRight, Top, Bottom, Minus } from "@element-plus/icons-vue";
import _ from "lodash";
import DoubleLines from '@/components/charts/DoubleLines.vue';
import Statistic from '@/components/Statistic.vue';

// 接收父组件属性
const props = defineProps({
	// 组件显示隐藏
	visible: {
		type: Boolean,
		default: false,
	},
	// 组件内容
	data: {
		type: Object,
		default: () => { },
	}
});

// 接收父组件方法
const emit = defineEmits(["onCloseDrawer", "onTriggerExpand"]);

// 关闭组件
const closeHandler = () => {
	emit("onCloseDrawer", false);
};

const tableData = computed(() => {
	// 处理从父组件中接收到的数据
	const { children, compare, chart, t_count } = props.data;
	//console.log(props, 'props.data')
	// 遍历今日数据
	// children数据为全部关键词数据
	return _.map(children, (child) => {
		// 在前一日数据中找到关键词相同的数据
		const result = compare.filter(
			(item) => item.ASIN === child.ASIN && item["关键词"] === child["关键词"],
		);
		// 如果存在
		if (result && result.length > 0) {
			child.n_rank = result[0]["自然排名"];
			child.sp_rank = result[0]["sp广告排名"];
			// 处理自然排名
			if (result[0]["自然排名"] === "-" || child["自然排名"] === "-") {
				if (result[0]["自然排名"] !== "-" && child["自然排名"] === "-") {
					child.n_trend = "上升";
				} else if (result[0]["自然排名"] === "-" && child["自然排名"] !== "-") {
					child.n_trend = "下降";
				} else {
					child.n_trend = "持平";
				}
			} else {
				// 今日-昨日 差值大于0 下降； 差值小于0 上升； 差值相等 持平
				child.n_trend =
					child["自然排名"] - result[0]["自然排名"] > 0
						? "下降"
						: child["自然排名"] - result[0]["自然排名"] < 0
							? "上升"
							: "持平";
			}
			// 处理sp排名
			if (result[0]["sp广告排名"] === "-" || child["sp广告排名"] === "-") {
				if (result[0]["sp广告排名"] !== "-" && child["sp广告排名"] === "-") {
					child.sp_trend = "上升";
				} else if (
					result[0]["sp广告排名"] === "-" &&
					child["sp广告排名"] !== "-"
				) {
					child.sp_trend = "下降";
				} else {
					child.sp_trend = "持平";
				}
			} else {
				// 今日-昨日 差值大于0 下降； 差值小于0 上升； 差值相等 持平
				child.sp_trend =
					child["sp广告排名"] - result[0]["sp广告排名"] > 0
						? "下降"
						: child["sp广告排名"] - result[0]["sp广告排名"] < 0
							? "上升"
							: "持平";
			}
		} else {
			// 前一日不存在对比数据
			if (child["自然排名"] === "-") {
				child.n_trend = "持平";
			} else {
				child.n_trend = "上升";
			}
			if (child["sp广告排名"] === "-") {
				child.sp_trend = "持平";
			} else {
				child.sp_trend = "上升";
			}
			child.n_rank = "-";
			child.sp_rank = "-";
		}
		// 将父组件中的chart对象提出
		const isChart = chart&&chart.length ? chart.filter(item => item.ASIN === child.ASIN && item["关键词"] === child["关键词"]) : [];
		if(isChart && isChart.length>0){
			child.chart = chart;
		}else{
			child.chart = [];
		}
		// 返回结果
		return child;
	});
});

// table高度
let tableH = 500;
// 根据浏览器高度设置表格高度 以固定表头
onMounted(() => {
	tableH = document.documentElement.clientHeight - 180;
});


// 当前expand变化的行
const expandRowKeys = ref([]); // 当前展开行
const expandTable = ref();
const expandChangeHandle = (row, expandedRows) => {
	// 先将展开项的key关键字清空
	expandRowKeys.value = [];
	if( expandedRows.length === 0 ){
		// expandedRows为空时 什么都不做
	}else if(expandedRows.length === 1){
		// 当只点开了一行数据时
		expandRowKeys.value.push(row['关键词']);
		// 将当前展开行的数据传递给父组件
		emit('onTriggerExpand', row);
	}else{
		// 当展开不只一行时
		expandRowKeys.value.push(row['关键词']);
		// 将当前展开行的数据传递给父组件
		emit('onTriggerExpand', row);
		// 关闭之前的行
		expandTable.value.toggleRowExpansion(expandedRows[0], true);
	}
};

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
			margin: 10px 30px;
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
