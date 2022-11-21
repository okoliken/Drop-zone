<template>
  <section class="flex rounded bg-white w-full mb-3 py-6">
    <div class="w-1/2 px-6" style="border-right: 1px solid #ccc;">
      <div class="flex items-center justify-between">
        <!-- title -->
        <div class="flex">
          <h2 class="font-semibold">Inventory Distribution</h2>

          <feather-icon
            icon="AlertCircleIcon"
            svgClasses="ml-3 h-6 w-6 cursor-pointer"
          />
        </div>

        <div class="flex items-center">
          <s-select
            :height="27"
            :width="180"
            default-option="Ajah Retail Centre"
          />

          <s-select :height="27" default-option="Top 5" class="ml-5" />
        </div>
      </div>

      <div class="mb-8" style="font-size: 13px;">By Outlets</div>

      <div class="grid grid-cols-3 col-gap-6">
        <s-select class="col-span-1" :height="27" />
        <s-select class="col-span-1" :height="27" />
        <s-select class="col-span-1" :height="27" />
      </div>

      <div class="flex mt-12">
        <section class="w-1/2">
          <!-- <doughnut-chart style="width: 100%;" /> -->
          <div id="chart">
            <apexcharts
              type="donut"
              width="400"
              :options="chartOption"
              :series="serie"
            />
          </div>
        </section>

        <section class="w-1/2 pl-6">
          <div
            class="flex mb-6"
            v-for="(item, i) in outletsDistribution"
            :key="i"
          >
            <div
              class="rounded-full mr-5 mt-1"
              :style="`height: 8px; width: 8px; background: ${item.color};`"
            ></div>

            <div>
              <div class="mb-2">{{ item.text }} ({{ item.percentage }}%)</div>

              <div class="font-semibold" style="font-size: 16px;">
                <span class="font-normal" :style="`color: ${item.color}`">
                  {{ item.quantity }}</span
                >/₦ {{ item.value }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="w-1/2 px-6">
      <div class="flex items-center justify-between">
        <!-- title -->
        <div class="flex">
          <h2 class="font-semibold">Inventory Distribution</h2>

          <feather-icon
            icon="AlertCircleIcon"
            svgClasses="ml-3 h-6 w-6 cursor-pointer"
          />
        </div>

        <div class="flex items-center">
          <s-select
            :height="27"
            :width="180"
            default-option="Ajah Retail Centre"
          />

          <s-select :height="27" default-option="Top 5" class="ml-5" />
        </div>
      </div>

      <div class="mb-8" style="font-size: 13px;">By Inventory Class</div>

      <div class="grid grid-cols-3 col-gap-6">
        <s-select class="col-span-1" :height="27" />
        <s-select class="col-span-1" :height="27" />
        <s-select class="col-span-1" :height="27" />
      </div>

      <div class="flex mt-12">
        <section class="w-1/2">
          <!-- <doughnut-chart style="width: 100%;" /> -->
          <div id="chart">
            <apexcharts
              type="donut"
              width="400"
              :options="chartInventoryCLass"
              :series="seriesInventoryclass"
            />
            
          </div>
        </section>

        <!-- <section class="w-1/2 pl-6">
          <div
            class="flex mb-6"
            v-for="(item, i) in outletsDistribution"
            :key="i"
          >
            <div
              class="rounded-full mr-5 mt-1"
              :style="`height: 8px; width: 8px; background: ${item.color};`"
            ></div>

            <div>
              <div class="mb-2">{{ item.text }} ({{ item.percentage }}%)</div>

              <div class="font-semibold" style="font-size: 16px;">
                <span class="font-normal" :style="`color: ${item.color}`">
                  {{ item.quantity }}</span
                >/₦ {{ item.value }}
              </div>
            </div>
          </div>
        </section> -->
      </div>
    </div>
  </section>
</template>

<script>
import apexcharts from "vue-apexcharts";
import { mapGetters } from "vuex";
import DoughnutChart from "../svgFolder/doughnutChart.vue";

export default {
  name: "AnalyticsInventoryChartDistribution",
  components: { DoughnutChart, apexcharts },
  data() {
    return {
      classDistribution: [],
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          width: 380,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true
                }
              }
            }
          }
        },
        labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
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
    };
  },
  computed: {
    ...mapGetters(
      "analytics",
      ["getAllInventoryDistribution"],
      ["getAllInventoryBreakdown"]
    ),
    chartOption() {
      if (
        this.getAllInventoryDistribution.inventoryDistributionOutlets.inventoryDistributionData === undefined ||
        this.getAllInventoryDistribution.inventoryDistributionOutlets
          .inventoryDistributionData.length === 0
      ) {
        return {
          chart: {
            width: 380,
            type: "donut",
            dropShadow: {
              enabled: true,
              color: "#111",
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          noData: {
            text: "No Data..."
          },
          stroke: {
            width: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true
                  }
                }
              }
            }
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
        let data = this.getAllInventoryDistribution.inventoryDistributionOutlets
          .inventoryDistributionData;
        return {
          chart: {
            width: 380,
            type: "donut",
            dropShadow: {
              enabled: true,
              color: "#111",
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          stroke: {
            width: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true
                  }
                }
              }
            }
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
        };
      }
    },
    serie() {
      if (
        this.getAllInventoryDistribution.inventoryDistributionOutlets
          .inventoryDistributionData === undefined ||
        this.getAllInventoryDistribution.inventoryDistributionOutlets
          .inventoryDistributionData.length === 0
      ) {
        return [];
      } else {
        let data = this.getAllInventoryDistribution.inventoryDistributionOutlets
          .inventoryDistributionData;
        return [data];
      }
    },
     chartInventoryCLass() {
      if (
        this.getAllInventoryDistribution.inventoryDistributionClass.inventoryDistributionData === undefined ||
        this.getAllInventoryDistribution.inventoryDistributionClass.inventoryDistributionData.length === 0
      ) {
        return {
          chart: {
            width: 380,
            type: "donut",
            dropShadow: {
              enabled: true,
              color: "#111",
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          noData: {
            text: "No Data..."
          },
          stroke: {
            width: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true
                  }
                }
              }
            }
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
        let data = this.getAllInventoryDistribution.inventoryDistributionClass
          .inventoryDistributionData;
        return {
          chart: {
            width: 380,
            type: "donut",
            dropShadow: {
              enabled: true,
              color: "#111",
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          stroke: {
            width: 0
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true
                  }
                }
              }
            }
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
        };
      }
    },
    seriesInventoryclass() {
      if (
        this.getAllInventoryDistribution.inventoryDistributionClass
          .inventoryDistributionData === undefined ||
        this.getAllInventoryDistribution.inventoryDistributionClass
          .inventoryDistributionData.length === 0
      ) {
        return [];
      } else {
        let data = this.getAllInventoryDistribution.inventoryDistributionClass
          .inventoryDistributionData;
        return [data];
      }
    },
    
  },
  mounted() {
    this.$store.dispatch("analytics/getAllInventoryDistribution");
    this.$store.dispatch("analytics/getAllInventoryBreakdown");
  }
};
</script>

<style></style>
