
<template>
	<div>
		

		<!-- ROW 2 -->
		<div class="vx-row">
			<div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
				<static-card icon="MonitorIcon" icon-right statistic="0" statisticTitle="Total Sales" ></static-card>
			</div>

			<div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
				<static-card icon="UserCheckIcon" icon-right statistic="0" statisticTitle="Total Pending  "></static-card>
			</div>

			<div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
				<static-card icon="MailIcon" icon-right statistic="0" statisticTitle="Total Closed" ></static-card>
			</div>
		</div>

	</div>
</template>

<script>
import StaticCard from '@/components/statistics-cards/StaticCard.vue'
import analyticsData from './saleInvoiceData.js'

export default{
	data() {
		return {
			analyticsData: analyticsData,
		}
	},
	components: {
		StaticCard
	}
}
</script>
