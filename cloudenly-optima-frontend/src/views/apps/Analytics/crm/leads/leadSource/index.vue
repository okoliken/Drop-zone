<template>
  <div>
    <div class="bg-white flex items-center p-6  my-6 rounded">
      <label class="flex items-center">
        <!-- <input type="radio" class="mr-4" /> -->

        <!-- <s-select default-option="Last Week" :width="165" /> -->
        <!-- <input type="radio" />
        <select name="" id=""
          ><option value="">Last 6 months</option
          ><option value="">Last 3 months</option>
        </select> -->
      </label>
      <!-- <label for="" class="flex items-center  ml-16">
        <input type="date" v-model="startHere" />
        <input type="date" v-model="endHere" />
       

        <button @click="changeQuery">Filter</button>
      </label>
      <p>{{startHere}}</p> -->

      <label class="flex items-center ml-16">
        <input type="radio" class="mr-4" checked />
        <s-text
          type="text"
          placeholder="Number"
          v-model="filters.howLongInNumber"
        />
        <s-select
          :options="oneOfDaysWeeksMonthsYears"
          v-model="filters.oneOfDaysWeeksMonthsYears"
          class="mr-3"
        />

        <s-text type="date" :width="200" v-model="filters.startHere" />
        <s-text
          type="date"
          :width="200"
          v-model="filters.endHere"
          class="ml-3"
        />
      </label>
      <button @click="changeQuery" class="mx-4">Filter</button>
    </div>
    <div class="bg-white p-6 rounded">
      <div class="flex mb-10">
        <div>
          <h2 class="font-semibold mb-2">Number of Leads</h2>

          <div style="font-size: 13px">Leads By Source</div>
        </div>
        <s-select :height="27" class="ml-8" />
        <s-select :height="27" class="ml-3" />
      </div>

      <section class="flex">
        <div class="w-8/12">
          <h2 class="mb-4" style="font-size: 13px">Total Leads</h2>
          <div class="flex mb-12">
            <div class="flex">
              <div
                class="text-primary-optima-color font-semibold my-4 justify-center"
                style="font-size: 16px"
              >
                0
              </div>
              <!-- <div class="mb-4 mx-4" style="font-size: 13px">Total Leads</div>
            <div class="mb-4" style="font-size: 13px">Total Leads</div> -->
            </div>
          </div>
          <!-- {{this.getAllCrmLeadCount.leadsGraphItemsBySource}} -->
          <div id="chart">
            <apexchart
              type="area"
              height="350"
              max-width="200"
              :options="chartOption"
              :series="chartData"
            ></apexchart>
          </div>
        </div>

        <div class="w-4/12 pl-6" style="border-left: 1px solid #ccc">
          <div
            class="flex justify-between px-3 py-3 mb-3 font-medium"
            style="border-bottom: 1px solid #eee; font-size: 13px"
          >
            <span>Registrar</span>
            <span>Leads</span>
          </div>
          <div
            class="flex justify-between px-3 py-2 rounded mx-3 mb-3"
            style="background: #eee"
            v-for="(registrar, i) in registrarsSource"
            :key="i"
          >
            <span>{{ registrar.nameOfLeadRegistrar }}</span>

            <span class="font-medium">{{ registrar.leadRegCount }}</span>
          </div>

          <div
            class="flex justify-between items-center px-3 pt-5 font-medium mt-8"
            style="border-top: 1px solid #eee; font-size: 13px"
          >
            <div>
              New Leads:
              <span class="text-tetiary-optima-color font-medium">{{
                analytics.newLeadsCountBySource
              }}</span>
            </div>

            <!-- <s-button :height="30" class="bg-primary-optima-color text-white px-5"
            >View All</s-button
          > -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import Datepicker from "vuejs-datepicker";

// import moment from "moment";

import { mapGetters } from "vuex";
import chart from "../svgFolder/chart.vue";
// import { formatDate } from '../../../../../../canvasjs.min';

export default {
  name: "",
  components: { apexchart, chart, Datepicker },
  data: () => ({
    oneOfDaysWeeksMonthsYears: [
      { name: "Months", id: "months" },
      { name: "Weeks", id: "weeks" },
      { name: "Years", id: "years" },
      { name: "Days", id: "days" }
    ],
    filters: {
      howLongInNumber: "",
      oneOfDaysWeeksMonthsYears: "Months",
      startHere: "",
      endHere: ""
    },
    series: [
      {
        name: "Internal",
        data: []
      }
    ],
    chartOptions: {
      chart: {
        type: "area",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%"
          // endingShape: "rounded",
        }
      },
      dataLabels: {
        style: {
          colors: ["#ffffff"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar"]
      },
      yaxis: {
        title: {
          text: "No. of leads"
        }
      },
      markers: {
        colors: ["#2F80ED", "#F2994A"]
      },
      fill: {
        colors: ["#2F80ED", "#F2994A"]
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val;
          }
        }
      }
    }
  }),
  methods: {
    changeQuery() {
      let data = {
        ...this.filters
      };
      console.log(data, "here2");
      this.$store
        .dispatch("analytics/getAllCrmLeadCount", this.data)
        .then(resp => {
          console.log(resp);
          this.$vs.notify({
            title: "Success",
            position: "top-right",
            color: "primary",
            text: "Filtered sucessfully"
          });
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
          this.$vs.notify({
            title: "Error",
            position: "top-right",
            color: "danger",
            text: "Not Filtered"
          });
        });
    }
  },
  computed: {
    ...mapGetters("analytics", ["getAllCrmLeadCount"]),

    registrarsSource() {
      return this.getAllCrmLeadCount.leadsAndRegistrarsBySource;
    },

    analytics() {
      return this.getAllCrmLeadCount;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    chartData() {
      if (this.getAllCrmLeadCount.leadsGraphItemsBySource === undefined) {
        return [
          {
            name: "Internal",
            data: []
          }
        ];
      } else {
        let data = this.getAllCrmLeadCount.leadsGraphItemsBySource.map(resp => {
          return resp.createdCount;
        });

        return [
          {
            name: "Internal",
            data: data
          }
        ];
      }
    },
    chartOption() {
      if (this.getAllCrmLeadCount.leadsGraphItemsBySource === undefined) {
        return {
          chart: {
            type: "area",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "60%",
              endingShape: "rounded"
            }
          },
          dataLabels: {
            style: {
              colors: ["#ffffff"]
            }
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
              text: "No. of leads"
            }
          },
          markers: {
            colors: ["#2F80ED", "#F2994A"]
          },
          fill: {
            colors: ["#2F80ED", "#F2994A"]
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
        let data = this.getAllCrmLeadCount.leadsGraphItemsBySource.map(resp => {
          return resp.createdOn ;
        });

        return {
          chart: {
            type: "area",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "60%",
              endingShape: "rounded"
            }
          },
          dataLabels: {
            style: {
              colors: ["#ffffff"]
            }
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
              text: "No. of leads"
            }
          },
          markers: {
            colors: ["#2F80ED", "#F2994A"]
          },
          fill: {
            colors: ["#2F80ED", "#F2994A"]
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val;
              }
            }
          }
        };
      }
    }
  },

  async mounted() {
    await this.$store.dispatch("analytics/getAllCrmLeadCount");
  }
};
</script>

<style></style>
