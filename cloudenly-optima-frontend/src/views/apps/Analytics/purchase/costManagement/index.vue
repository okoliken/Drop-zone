<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 rounded mb-3">
      <div class="flex items-center mb-10">
        <h2 class="font-semibold">Cost Management</h2>

        <s-select :height="27" default-option="--All States--" class="ml-8" />

        <s-select :height="27" default-option="--All Outlets--" class="ml-3" />

        <s-select
          :height="27"
          default-option="--All Product Categories--"
          class="ml-3"
        />
      </div>

      <div class="flex items-center mb-10">
        <div class="flex flex-col">
          <span class="mb-2" style="font-size: 13px;"
            >Current Purchase Price</span
          >
          <span
            class="text-primary-optima-color font-semibold"
            style="font-size: 16px;"
            >₦0.00</span
          >
        </div>

        <div class="flex flex-col ml-10">
          <span class="mb-2" style="font-size: 13px;"
            >Previous Price (Last Purchase)</span
          >
          <span
            class="text-secondary-optima-color font-semibold"
            style="font-size: 16px;"
            >₦0.00</span
          >
        </div>

        <div class="flex flex-col ml-10">
          <span class="mb-2" style="font-size: 13px;">Savings on Item</span>

          <div class="flex items-center font-semibold" style="font-size: 16px;">
            <span class="text-danger-optima-color mr-2">-</span>

            <span class="mr-6">₦0.00</span>

            <span class="text-danger-optima-color">0%</span>
          </div>
        </div>
      </div>

      <!-- <line-chart /> -->
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          :options="chartOption"
          :series="serie"
        ></apexchart>
      </div>
    </section>

    <po-cycle-table-filter />

    <s-table :items="[]" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import apexchart from "vue-apexcharts";
import DataFilter from "../components/dataFilter.vue";
import PoCycleTableFilter from "./components/poCycleTableFilter";
import LineChart from "./svgFolder/lineChart.vue";

export default {
  name: "AnalyticsPurchasesLeadTime",
  components: { DataFilter, PoCycleTableFilter, LineChart, apexchart },
  data: () => ({
    series: [
      {
        name: "Product Cost",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      }
      // {
      //   name: "Page Views",
      //   data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      // },
      // {
      //   name: 'Total Visits',
      //   data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      // }
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
        text: "Cost Management",
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
    }
  }),

  computed: {
    ...mapGetters("analytics", ["getAllPurchaseCostmanagement"]),
    chartOption() {
      if (
        this.getAllPurchaseCostmanagement === undefined ||
        this.getAllPurchaseCostmanagement.length === 0
      ) {
        return {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          noData: {
            text: "No Data..."
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
            text: "Cost Management",
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
        let data = this.getAllPurchaseCostmanagement.data
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
            text: "Cost Management",
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
    serie() {
      if(this.getAllPurchaseCostmanagement === undefined || this.getAllPurchaseCostmanagement.length === 0){
        return [
          {
        name: "Product Cost",
        data: []
      }
        ]
      } else {
          let data = this.getAllPurchaseCostmanagement.data
        return [
          {
        name: "Product Cost",
        data: data
      }
        ]
      }
    }
  },
  mounted() {
    console.log("I got here");
    this.$store.dispatch("analytics/getAllPurchaseCostmanagement");
  }
};
</script>

<style></style>
