<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 flex rounded">
      <div class="w-5/12">
        <div class="grid grid-cols-2 col-gap-3 mb-10 pr-16">
          <s-select
            :height="27"
            default-option="--All States--"
            class="col-sapn-1"
          />

          <s-select
            :height="27"
            default-option="--All Outlets--"
            class="col-span-1"
          />
        </div>

        <div style="border-right: 1px solid #eee">
          <h2 class="font-semibold mb-4">Number of Suppliers</h2>

          <s-select
            default-option="Top 3"
            :width="100"
            :height="27"
            class="mb-8"
          />

          <div class="w-full flex flex-col items-center">
            <div id="chart">
              <apexcharts
                type="donut"
                width="400"
                :options="chartOption"
                :series="serie"
              />
            </div>

            <!-- <div class="grid grid-cols-4 col-gap-10 row-gap-6">
              <div
                class="col-span-2 flex"
                v-for="(data, i) in dataAnalysis"
                :key="i"
              >
                <div
                  class="rounded-full mt-1 mr-3"
                  style="background: black; height: 8px; width: 8px"
                ></div>

                <div>
                  <div class="mb-2">{{ data.name }}</div>
                  <div class="font-semibold" style="font-size: 18px">
                    {{ data.value }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="w-7/12">
        <div class="flex mb-10">
          <s-select
            :height="27"
            default-option="--All Sectors--"
            class="mr-3"
          />

          <s-select
            :height="27"
            default-option="--All Specializations--"
            class="mr-3"
          />

          <s-select :height="27" default-option="--All Products--" />
        </div>

        <div class="w-full pl-10">
          {{ serie }}
          <h2 class="font-semibold mb-2">Number of suppliers by period</h2>
          <p class="mb-10">Contracted and Unlisted Suppliers</p>

          <line-chart class="w-full" />

          <div class="flex items-center mt-6">
            <div class="mr-10">
              Contracted Suppliers: <span class="font-semibold">200</span>
            </div>

            <div>
              Unlisted Suppliers: <span class="font-semibold">200</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <suppliers-table-filter class="mt-3" />

    <s-table :headers="headers" :items="Suppliers">
      <div slot="title">
        <p class="text-xl font-bold">Collection</p>
      </div>
      <div slot="body">
        <p>Organisation Collection Account</p>
      </div>

      <template v-slot:item="{ item }">
        <div v-if="item.name">
          <p>{{ item.data.name }}</p>
        </div>

        <div v-else-if="item.code">
          <p>{{ item.data.code }}</p>
        </div>

        <div v-else-if="item.industrySector">
          <p>{{ item.data.industrySector }}</p>
        </div>

        <div v-else-if="item.specialization">
          <p>{{ item.data.specialization }}</p>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import apexcharts from "vue-apexcharts";

import { mapGetters } from "vuex";
import DataFilter from "../components/dataFilter.vue";
import DonutChart from "./svgFolder/donutChart.vue";
import LineChart from "./svgFolder/lineChart.vue";
import SuppliersTableFilter from "./components/suppliersTableFilter.vue";

export default {
  name: "AnalyticsPurchasesSuppliers",
  components: {
    DataFilter,
    DonutChart,
    LineChart,
    SuppliersTableFilter,
    apexcharts
  },
  data: () => ({
    headers: [
      {
        text: "Supplier",
        value: "name"
      },

      {
        text: "Cloudenly Id",
        value: "code"
      },

      {
        text: "Industry Sectors",
        value: "industrySector"
      },

      {
        text: "Specialization",
        value: "specialization"
      }
    ],
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
  }),

  computed: {
    ...mapGetters("analytics", ["getAllPurchaseSupplyCount"]),
    Suppliers() {
      return this.getAllPurchaseSupplyCount.allSuppliers;
    },
    serie() {
      if (this.getAllPurchaseSupplyCount.sectorCountAndPercent === undefined) {
        return [];
      } else {
        let data = this.getAllPurchaseSupplyCount.sectorCountAndPercent.map(
          resp => {
            return resp.sectorPercentage;
          }
        );
        console.log(data);
        return data;
      }
    },
    chartOption() {
      if (this.getAllPurchaseSupplyCount.sectorCountAndPercent === undefined) {
        return {
          chart: {
            width: 480,
            type: "donut",
            
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
        let data = this.getAllPurchaseSupplyCount.sectorCountAndPercent.map(
          resp => {
            return resp.sectorName;
          }
        );
        console.log(data);
        return {
          chart: {
            width: 480,
            type: "donut",
           
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
          labels: data,
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
    }
  },
  async mounted() {
    await this.$store.dispatch("analytics/getAllPurchaseSupplyCount");
  }
};
</script>

<style></style>
