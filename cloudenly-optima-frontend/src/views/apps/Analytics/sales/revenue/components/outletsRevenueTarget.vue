<template>
  <section class="bg-white rounded p-6">
    <div class="flex mb-10">
      <div>
        <h2 class="font-semibold mb-2">Revenue Vs. Target</h2>
        <!-- {{revenueOutlets}} -->
        <div style="font-size: 13px;">
          From Outlets
        </div>
      </div>

      <s-select :height="27" class="ml-8" />
    </div>

    <div class="flex mb-12">
      <div>
        <div class="mb-4" style="font-size: 13px;">Total Sales (YTD)</div>

        <div
          class="text-primary-optima-color font-semibold"
          style="font-size: 16px;"
        >
          {{ revenueOutlets.totalRevenue }}
        </div>
      </div>

      <div class="ml-12">
        <div class="mb-4" style="font-size: 13px;">
          Revenue This Month
        </div>

        <div
          class="text-secondary-optima-color font-semibold"
          style="font-size: 16px;"
        >
          {{ revenueOutlets.revenueThisMonth }}
          <!-- <span
            class="font-normal text-tetiary-optima-color"
            style="font-size: 13px;"
            >+1.2%</span
          > -->
        </div>
      </div>

      <div class="ml-12">
        <div class="mb-4" style="font-size: 13px;">
          Highest Grossing Outlet
        </div>

        <div
          class="text-tetiary-optima-color font-semibold"
          style="font-size: 16px;"
        >
          {{ revenueOutlets.highestGrossingOutlet.invoiceTotal }}
          <!-- <span class="font-normal" style="font-size: 13px; color: #070707;"
            >Ikeja warehouse</span
          > -->
        </div>
      </div>
    </div>

    <!-- <vertical-barchart /> -->
    <div>
      <div id="chart">
        <apexchart
          type="bar"
          height="350"
          :options="chartOption"
          :series="chartData"
        ></apexchart>
      </div>
    </div>
  </section>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters } from "vuex";

import verticalBarchart from "../svgFolder/verticalBarchart.vue";

export default {
  components: { verticalBarchart, apexchart },
  data: () => ({
    series: [
      {
        name: "Free Cash Flow",
        data: []
      }
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      noData: {
        text: "Loading..."
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    }
  }),
  computed: {
    ...mapGetters("analytics", ["getRevenueTargetOutlet"]),
    revenueOutlets() {
      return this.getRevenueTargetOutlet.revenueVsTargetFromOutletData;
    },
    chartOption() {
      if (
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData ===
          undefined ||
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData
          .length === 0
      ) {
        console.log("Data is empty");
        return {
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            title: {
              text: "$ (thousands)"
            }
          },
          fill: {
            opacity: 1
          },
          noData: {
            text: "No Data..."
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val;
              }
            }
          }
        };
      } else {
        let data = this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData.map(
          resp => {
            return resp.totalExcludingTax;
          }
        );
        return {
          chart: {
            type: "bar",
            height: 350
            // width:500
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%"
            }
          },

          noData: {
            text: "Loading..."
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: data
          },
          yaxis: {
            title: {
              text: "Revenue/Target"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return "$ " + val + " thousands";
              }
            }
          }
        };
      }
    },
    chartData() {
      if (
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData ===
          undefined ||
        this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData
          .length === 0
      ) {
        return [{
          name: "Free Cash Flow",
          data: []
        }];
      } else {
        let data = this.getRevenueTargetOutlet.revenueVsTargetFromOutletGraph.graphData.map(
          resp => {
            // console.log(resp.date)
            return resp.date;
          }
        );
        return [
          {
            name: "Free Cash Flow",
            data: data
          }
        ];
      }
    }
  },
  mounted() {
    this.$store.dispatch("analytics/getRevenueTargetOutlet");
  }
};
</script>

<style></style>
