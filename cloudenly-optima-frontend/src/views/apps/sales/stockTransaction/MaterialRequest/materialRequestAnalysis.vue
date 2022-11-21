
<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MonitorIcon"
          icon-right
          :statistic="getMaterialRequestAnalysis.total"
          statisticTitle="Total Request"
        ></statistics-card-line>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="UserCheckIcon"
          icon-right
          :statistic="getMaterialRequestAnalysis.totalPending"
          statisticTitle="Total Pending"
          color="success"
        ></statistics-card-line>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MailIcon"
          icon-right
          :statistic="getMaterialRequestAnalysis.totalClosed"
          statisticTitle="Total Closed"
          color="warning"
        ></statistics-card-line>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from './purchaseOrderData'

export default {
  data() {
    return {
      // analyticsData: analyticsData,
    };
  },
  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("inventory/materialRequest", ["getMaterialRequestAnalysis"]),
  },

  mounted() {
    this.$store
      .dispatch("inventory/materialRequest/getMaterialRequestAnalysisData")
      
  },
};
</script>