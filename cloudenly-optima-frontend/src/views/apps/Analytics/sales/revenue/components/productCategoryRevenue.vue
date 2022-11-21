<template>
  <section class="bg-white p-6 rounded">
    <div class="flex">
      <section class="w-7/12 pr-6">
        <div class="flex justify-between mb-10">
          <div>
            <h2 class="font-semibold mb-2">Sales Revenue</h2>

            <div style="font-size: 13px;">
              From Products and Product Categories
            </div>
          </div>

          <s-select :height="27" />
        </div>

        <div class="flex mb-10">
          <s-select :height="27" />
          <s-select :height="27" class="ml-3" />
        </div>

        below
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
        <div class="flex justify-between items-center mb-4">
          <s-select :height="27" :width="200" />

          <div>No. of Products: <span>07</span></div>
        </div>

        <div
          class="flex justify-between items-center mb-10"
          style="font-size: 12px;"
        >
          <div>Total Revenue: ₦ 25,580.80 +3.5%</div>

          <div class="flex items-center">
            <span>Since last:</span>

            <s-select :height="24" default-option="Week" class="ml-4" />
          </div>
        </div>

        <div class="flex items-center">
          <section>
         
            <pie-chart  />
            
          </section>

          <section class="w-1/2 pl-6">
            <s-select
              :height="27"
              :width="100"
              default-option="Top 3"
              class="mb-6"
            />
            <div
              class="flex mb-6"
              v-for="(item, i) in categoryRevenue"
              :key="i"
            >
              <div
                class="rounded-full mr-5 mt-1"
                :style="`height: 8px; width: 8px; background: ${item.color};`"
              ></div>

              <div>
                <div class="mb-2" style="color:#000">
                  <b>{{ item.text }}</b>
                </div>

                <div style="font-size: 16px;color:grey">
                  <span
                    class="font-normal"
                    :style="`color: ${item.color}`"
                  ></span
                  >{{ item.percentage }}%, ₦{{ item.value }}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import simpleBarchart from "../svgFolder/simpleBarchart.vue";
import pieChart from "./piechart.vue";
import apexchart from "vue-apexcharts";
import pieChart2 from "../svgFolder/pieChart.vue";
import { mapGetters } from "vuex";

// import apexchart from "vue-apexcharts";

export default {
  components: { simpleBarchart, pieChart, pieChart2, apexchart },
  data: () => ({
    
    series: [
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
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
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    },
    data: {
      series: [44, 55, 13, 43, 22],
      chartOption: {
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
    }
  }),
  computed: {
    ...mapGetters("analytics", ["getSalesRevenue"], ["getTopSales"]),
    chartOption() {
      if (
        this.getSalesRevenue.dates === undefined ||
        this.getSalesRevenue.dates.length === 0
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
          tooltip: {
            y: {
              formatter: function(val) {
                return "$ " + val + " thousands";
              }
            }
          }
        };
      } else {
        let data = this.getSalesRevenue.dates;
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
            categories: [data]
          },
          yaxis: {
            title: {
              text: "$ (thousands)"
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
    serie() {
      if (
        this.getSalesRevenue.quantityAndAmounts === undefined ||
        this.getSalesRevenue.quantityAndAmounts.length === 0
      ) {
        return [
          {
            name: "Free Cash Flow",
            data: []
          }
        ];
      } else {
        let data = this.getSalesRevenue.quantityAndAmounts;
        return [
          {
            name: "Free Cash Flow",
            data: [data]
          }
        ];
      }
    }
  },
  mounted() {
    this.$store.dispatch("analytics/getSalesRevenue");
    this.$store.dispatch("analytics/getTopSales");
  }
};
</script>

<style></style>
