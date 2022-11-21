<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 rounded mb-3">
      <div class="flex items-center justify-between mb-8">
        <div class="flex">
          <s-select :height="27" default-option="--All Outlets--" />
          <s-select :height="27" default-option="--All States--" class="ml-3" />
          <s-select
            :height="27"
            default-option="--All Suppliers--"
            class="ml-3"
          />
        </div>

        <button class="flex items-center">
          <svg
            class="mr-3"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.4466 16.2801L16.2608 14.466L15.6218 12.1448L15.9002 11.48L18.0008 10.2947V7.72927L15.9061 6.53899L15.6325 5.87537L16.2794 3.553L14.464 1.74022L12.1426 2.37896L11.4793 2.10084L10.2939 0H7.72844L6.53816 2.09468L5.87469 2.36831L3.55269 1.72056L1.74011 3.53314L2.37896 5.85491L2.10084 6.51822L0 7.70365V10.2683L2.09279 11.4613L2.36672 12.1255L1.71987 14.4474L3.53314 16.2607L5.85491 15.6219L6.51829 15.9L7.70375 18H10.2685L11.4606 15.9072L12.1246 15.6333L14.4466 16.2801ZM14.6066 10.3305L13.8933 12.0342L14.4295 13.9822L13.9645 14.4473L12.0206 13.9058L10.3161 14.6087L9.31659 16.3636H8.6584L7.66712 14.6076L5.96534 13.894L4.01627 14.4303L3.55198 13.966L4.0935 12.0221L3.39062 10.3179L1.63569 9.31752V8.65925L3.39249 7.66795L4.10605 5.96609L3.56976 4.01702L4.03308 3.5537L5.97697 4.09597L7.68196 3.39279L8.67999 1.63644H9.33753L10.3288 3.39324L12.0307 4.10681L13.9801 3.57041L14.4456 4.03518L13.9042 5.9787L14.6073 7.68354L16.3636 8.68157V9.3391L14.6066 10.3305ZM8.99965 12.2733C7.19209 12.2733 5.72677 10.808 5.72677 9.00041C5.72677 7.19285 7.19209 5.72753 8.99965 5.72753C10.8072 5.72753 12.2725 7.19285 12.2725 9.00041C12.2725 10.808 10.8072 12.2733 8.99965 12.2733ZM10.6372 9.00041C10.6372 9.90419 9.90453 10.6368 9.00075 10.6368C8.09697 10.6368 7.36431 9.90419 7.36431 9.00041C7.36431 8.09663 8.09697 7.36397 9.00075 7.36397C9.90453 7.36397 10.6372 8.09663 10.6372 9.00041Z"
              fill="#070707"
            />
          </svg>

          Cycle Time Settings
        </button>
      </div>

      <div class="flex">
        <div class="w-5/12 pr-6">
          <h2 class="font-semibold mb-2">Supplier Count and Percentage</h2>
          <div class="mb-10" style="font-size: 13px">
            Percentage of Suppliers
          </div>

          <div class="flex">
            <div class="w-1/2">
              <donut-chart />
            </div>

            <div class="w-1/2 flex flex-col justify-center">
              <div class="font-semibold mb-5">Number of Suppliers:</div>

              <div class="flex items-center justify-between mb-6">
                <span>Long <span class="text-primary"> (56%)</span>:</span>
                <span class="font-semibold" style="font-size: 16px">113</span>
              </div>

              <div class="flex items-center justify-between mb-6">
                <span>Medium <span class="text-danger"> (20%)</span>:</span>
                <span class="font-semibold" style="font-size: 16px">99</span>
              </div>

              <div class="flex items-center justify-between">
                <span>Short <span class="text-success">(18%)</span>:</span>
                <span class="font-semibold" style="font-size: 16px">23</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-7/12 pl-10" style="border-left: 1px solid #eee">
          <h2 class="font-semibold mb-2">Average Purchase Order Cycle</h2>
          <div class="mb-10" style="font-size: 13px">Monthly</div>

          <div class="flex justify-end">
            <div class="flex items-center">
              <svg
                class="mr-2"
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.5" cy="3.5" r="3.5" fill="#507FDF" />
              </svg>
              Long
            </div>
            <div class="ml-5 flex items-center">
              <svg
                class="mr-2"
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.5" cy="3.5" r="3.5" fill="#FF4F79" />
              </svg>

              Medium
            </div>
            <div class="ml-5 flex items-center">
              <svg
              class=" mr-2"
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.55"
                  cx="3.5"
                  cy="3.5"
                  r="3.5"
                  fill="#4ECDC4"
                />
              </svg>

              Short
            </div>
          </div>

          <line-chart class="w-full" />
        </div>
      </div>
    </section>

    <po-cycle-table-filter />

    <s-table :headers="headers" :items="[]" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import DataFilter from "../components/dataFilter.vue";
import PoCycleTableFilter from "./components/poCycleTableFilter";
import DonutChart from "./svgFolder/donutChart.vue";
import LineChart from "./svgFolder/lineChart.vue";

export default {
  name: "AnalyticsPurchasesPurchaseOrderCycleTime",
  components: { DataFilter, PoCycleTableFilter, DonutChart, LineChart },
  data() {
    return {
      headers: [
        {
          text: "Supplier",
        },
        {
          text: "PO Number",
        },

        {
          text: "Description",
        },

        {
          text: "PO Date",
        },

        {
          text: "Issue Date",
        },
        {
          text: "Payment Date",
        },

        {
          text: "Payment Ref.",
        },
      ],
    };
  },
    computed:{
      ...mapGetters("analytics", ["getAllPurchasePocycleCount"]),
  },
  mounted() {
    this.$store.dispatch("analytics/getAllPurchasePocycleCount")}
};
</script>

<style></style>
