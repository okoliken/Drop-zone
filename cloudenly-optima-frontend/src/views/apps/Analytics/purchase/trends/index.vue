<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 rounded mb-3">
      <div class="flex items-center mb-10">
        <h2 class="font-semibold">Purchase Trend</h2>

        <s-select :height="27" default-option="--All States--" class="ml-8" />

        <s-select :height="27" default-option="--All Outlets--" class="ml-3" />

        <s-select
          :height="27"
          default-option="--All Suppliers--"
          class="ml-3"
        />

        <s-select :height="27" default-option="--All Agents--" class="ml-3" />
      </div>

      <div class="flex">
        <div class="w-8/12 pr-6" style="border-right: 1px solid #eee;">
          <div id="chart">
            <apexchart
              type="line"
              height="350"
              :options="chartOption"
              :series="chartData"
            ></apexchart>
          </div>

          <div class="flex">
            <span>Coca Cola</span>
            <span class="ml-8">Playstation 4</span>
            <span class="ml-8">IPhone XS Max</span>
            <span class="ml-8">Others</span>
          </div>
        </div>

        <div class="w-4/12 pl-6">
          <div class="mb-12">
            <div class="mb-2" style="font-size: 13px;">
              Total Purchase Volume
            </div>

            <div class="font-semibold" style="font-size: 16px;">
              2,341<span class="text-primary-optima-color">
                - ₦ 2,200,020.00</span
              >
            </div>
          </div>

          <div
            class="w-full p-6 rounded flex items-center justify-between"
            style="border: 1px solid #ccc;"
          >
            <div>
              <h3 class="mb-6">Average Trend</h3>

              <div class="font-semibold" style="font-size: 48px;">
                7.2%
                <span
                  class="text-tetiary-optima-color font-normal"
                  style="font-size: 16px;"
                >
                  +6.3%
                </span>
              </div>
            </div>

            <div>
              <trend />
            </div>
          </div>
        </div>
      </div>
    </section>

    <po-cycle-table-filter />

    <s-table :items="[]" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataFilter from "../components/dataFilter.vue";
import PoCycleTableFilter from "./components/poCycleTableFilter";
import DonutChart from "./svgFolder/donutChart.vue";
import LineChart from "./svgFolder/lineChart.vue";
import Trend from "./svgFolder/trend.vue";
import apexchart from "vue-apexcharts";

export default {
  name: "AnalyticsPurchasesLeadTime",
  components: {
    DataFilter,
    PoCycleTableFilter,
    DonutChart,
    LineChart,
    Trend,
    apexchart
  },
  data: () => ({
    series: [
      {
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      }
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Purchase Trend",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    }
  }),
  computed: {
    ...mapGetters("analytics", ["getAllPurchaseTrend"]),
    chartOption() {
      if (
        this.getAllPurchaseTrend.purchasegraph === undefined ||
        this.getAllPurchaseTrend.purchasegraph.length === 0
      ) {
        return {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          noData: {
            text: "No Data..."
          },
          stroke: {
            width: [5, 7, 5],
            curve: "straight",
            dashArray: [0, 8, 5]
          },
          title: {
            text: "Purchase Trend",
            align: "left"
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return (
                val +
                " - " +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ""
              );
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: []
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function(val) {
                    return val + " (mins)";
                  }
                }
              },
              {
                title: {
                  formatter: function(val) {
                    return val + " per session";
                  }
                }
              },
              {
                title: {
                  formatter: function(val) {
                    return val;
                  }
                }
              }
            ]
          },
          grid: {
            borderColor: "#f1f1f1"
          }
        };
      } else {
        let data = this.getAllPurchaseTrend.purchasegraph;
        return {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          noData: {
            text: "No Data..."
          },
          stroke: {
            width: [5, 7, 5],
            curve: "straight",
            dashArray: [0, 8, 5]
          },
          title: {
            text: "Purchase Trend",
            align: "left"
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return (
                val +
                " - " +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ""
              );
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: data
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function(val) {
                    return val + " (mins)";
                  }
                }
              },
              {
                title: {
                  formatter: function(val) {
                    return val + " per session";
                  }
                }
              },
              {
                title: {
                  formatter: function(val) {
                    return val;
                  }
                }
              }
            ]
          },
          grid: {
            borderColor: "#f1f1f1"
          }
        };
      }
    },
    chartData() {
      if (
        this.getAllPurchaseTrend.purchasegraph === undefined ||
        this.getAllPurchaseTrend.purchasegraph.length === 0
      ) {
        return [
          {
            name: "Session Duration",
            data: []
          },
        ];
      }else{
        let data = this.getAllPurchaseTrend.purchasegraph
        return[
          {
            name: "Session Duration",
            data: data
          },
        ]
      }
    }
  },
  mounted() {
    // console.log("I got here");
    this.$store.dispatch("analytics/getAllPurchaseTrend");
  }
};
</script>

<style></style>
