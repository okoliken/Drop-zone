
<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MonitorIcon"
          icon-right
          :statistic="getMaterialReturnAnalysis.total"
          statisticTitle="Total Request"
        ></statistics-card-line>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="UserCheckIcon"
          icon-right
          :statistic="getMaterialReturnAnalysis.totalPending"
          statisticTitle="Total Pending"
          color="success"
        ></statistics-card-line>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MailIcon"
          icon-right
          :statistic="getMaterialReturnAnalysis.totalClosed"
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

export default {
  data() {
    return {};
  },
  components: {
    StatisticsCardLine
  },

  computed: {
    ...mapGetters("inventory/materialReturn", ["getMaterialReturnAnalysis"])
  },

  mounted() {
    this.$store
      .dispatch("inventory/materialReturn/getMaterialReturnAnalysisData")
      
  }
};
</script>