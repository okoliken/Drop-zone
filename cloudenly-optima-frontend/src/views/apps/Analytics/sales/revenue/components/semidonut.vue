<template>
  <div>
    <div id="chart">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script>
import apexchart from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  components: { apexchart },
  data: () => ({
    series: [],
    chartOptions: {
      chart: {
        type: "donut"
      },
       noData: {
            text: "No Data..."
          },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }),
  computed: {
    ...mapGetters("analytics", ["getRevenueTargetOutlet"])
    
  },
  mounted() {
    this.$store.dispatch("analytics/getRevenueTargetOutlet");
  }
};
</script>
