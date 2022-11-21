<template>
  <div>
    <div id="chart">
      <apexchart
        type="pie"
        width="380"
        :options="chartOption"
        :series="serie"
      ></apexchart>
    </div>
    <!-- {{ getTopSales.products }} -->
  </div>
</template>
<script>
import apexchart from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  components: { apexchart },
  data: () => ({
    series: [44, 55, 13, 43, 22],
    chartOptions: {
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
    ...mapGetters("analytics", ["getTopSales"]),
    chartOption() {
      if (
        this.getTopSales.top3Products === undefined ||
        this.getTopSales.top3Products.length === 0
      ) {
        return {
          chart: {
            width: 380,
            type: "pie"
          },
          noData: {
            text: "No Data..."
          },
          labels: [],
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
        };
      } else {
     let data = this.getTopSales.top3Products;
     return{
       chart: {
        width: 380,
        type: "pie"
      },
      labels: [data],
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
      }
    },

    serie() {
      if (
        this.getTopSales.top3Products === undefined ||
        this.getTopSales.top3Products.length === 0
      ) {
        return [];
      } else {
        let data = this.getTopSales.top3Products;
        return [data];
      }
    }
  },
  mounted() {
    this.$store.dispatch("analytics/getTopSales");
  }
};
</script>
