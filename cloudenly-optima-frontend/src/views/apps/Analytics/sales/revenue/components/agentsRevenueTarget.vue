<template>
  <section class="bg-white rounded p-6">
    <div class="flex mb-10">
      <div>
        <h2 class="font-semibold mb-2">Revenue Vs. Target</h2>

        <div style="font-size: 13px;">
          From Outlets
        </div>
      </div>

      <s-select :height="27" class="ml-8" />
    </div>

    <div class="flex">
      <section class="w-7/12 pr-6">
        <!-- <horizontal-barchart class="w-full" /> -->
        <div id="chart">
          <apexchart
            type="bar"
            height="350"
            :options="chartOption"
            :series="serie"
          ></apexchart>
        </div>
      </section>

      <section class="w-5/12 pl-6" style="border-left: 1px solid #ccc;">
        <!-- <arc /> -->
        <semidonut />
      </section>
    </div>
  </section>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters } from "vuex";

import arc from "../svgFolder/arc.vue";
import semidonut from "./semidonut.vue";
import horizontalBarchart from "../svgFolder/horizontalBarchart.vue";

export default {
  components: { arc, horizontalBarchart, apexchart, semidonut },
  data: () => ({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350
      },
      noData: {
        text: "No Data..."
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    }
  }),
  computed: {
    ...mapGetters("analytics", ["getRevenueTargetOutlet"]),
    chartOption() {
      if (
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData ===
          undefined ||
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData
          .length === 0
      ) {
        return {
          chart: {
        type: "bar",
        height: 350
      },
      noData: {
        text: "No Data..."
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          
        ]
      }
        };
      }else{
         let data = this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData.map(
          resp => {
            return resp.totalExcludingTax;
          }
        );
        return{
          chart: {
        type: "bar",
        height: 350
      },
      noData: {
        text: "No Data..."
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
        data
        ]
      }
        }
      }
    },
    serie(){
      if( this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData ===
          undefined ||
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData
          .length === 0){
        return [{
        data: []
      }]
      }else{
        let data = this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData.map(
          resp => {
            // console.log(resp.date)
            return resp.date;
          }
        );
        return[{
        data: [data]
      }]
      }
    }
  },
  mounted() {
    // this.$store.dispatch("analytics/getRevenueTargetAgent")
    this.$store.dispatch("analytics/getRevenueTargetOutlet");
  }
};
</script>

<style></style>
