<template>
  <div class="w-full mb-3" style="font-size: 14px">
    <div
      class="bg-white w-full md:w-full rounded-sm border-1 border-table-header-bg"
    >
      <div class="flex items-center justify-between pt-3 mt-4 mx-10">
        <div slot="title" class="flex space-x-2">
          <p class="text-lg font-semibold">Analytics</p>
          <span v-if="!getIsCustomer" class="text-gray-500">(No data)</span>
        </div>

        <div>
          <select
            v-model="yearType"
            class="border-1 py-1 px-1 border-gray-400 rounded"
            name=""
            id=""
          >
            <option value="currentYear">Current Year</option>
            <option value="LastYear">Last Year</option>
          </select>
        </div>
      </div>

      <div v-if="yearType === 'currentYear'">
        <vue-apex-charts
          class="w-full pl-5 pr-3"
          type="line"
          height="220"
          :options="chartOptions"
          :series="getYearContactGraph"
        />
      </div>
      <div v-if="!getIsCustomer" class="flex justify-between py-10 px-6">
        <div class="flex space-x-4">
          <div class="">Total registrations this year:</div>
          <div class="text-black font-bold">0</div>
          <div class="text-red-600">0%</div>
        </div>
        <div class="flex space-x-4">
          <div class="">This Month:</div>
          <div class="text-black font-bold">0</div>
          <div class="text-red-600">0%</div>
        </div>
      </div>

      <!-- <div v-else>
        <vue-apex-charts
        class="w-full pl-5 pr-3"
        type="line"
        height="300"
        :options="chartOptions"
        :series="getLastYearContactGraph"
      />
      </div> -->
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      yearType: "currentYear",
      chartOptions: {
        chart: {
          toolbar: { show: false }
        },
        stroke: {
          curve: "smooth",
          // dashArray: [0, 8],
          width: [1, 1]
        },
        grid: {
          borderColor: "#e7e7e7"
        },

        legend: {
          show: false
        },

        colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],

        fill: {
          type: "solid",
          opacity: 1,
          gradient: {
            shade: "dark",
            inverseColors: false,
            gradientToColors: ["#7367F0", "#b8c2cc"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 50, 50]
          }
        },

        markers: {
          size: 0,
          hover: {
            size: 3
          }
        },

        xaxis: {
          labels: {
            style: {
              cssClass: "text-cloudenly-primary-main fill-current"
            }
          },

          axisTicks: {
            show: true
          },
          categories: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEPT",
            "OCT",
            "NOV",
            "DEC"
          ],

          axisBorder: {
            show: false
          }
        },
        yaxis: {
          // tickAmount: 5,
          labels: {
            show: true,
            style: {
              cssClass: "text-cloudenly-primary-main fill-current"
            },
            formatter: function(val) {
              return val;
            }
          },
          title: {
            text: "Values",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "text-cloudenly-primary-main fill-current",
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 200,
              cssClass: "text-cloudenly-primary-main fill-current"
            }
          }
        },
        tooltip: {
          x: { show: true }
        }
      }
    };
  },
  components: {
    VueApexCharts
  },

  computed: {
    ...mapGetters("crm/contact", [
      "getContactGraph",
      "getYearContactGraph",
      "getLastYearContactGraph",
      "getIsCustomer"
    ])
  },

  mounted() {
    this.$store.dispatch("crm/contact/getContactAnalysis");
  }
};
</script>
