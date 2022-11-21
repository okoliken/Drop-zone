<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 rounded mb-3">
      
      <div class="flex mb-10">
        <div>
          <h2 class="font-semibold mb-2">Purchase Lead Time</h2>

          <div style="font-size: 13px">Monthly</div>
        </div>

        <s-select :height="27" default-option="--All States--" class="ml-8" />

        <s-select :height="27" default-option="--All Outlets--" class="ml-3" />

        <s-select
          :height="27"
          default-option="--All Suppliers--"
          class="ml-3"
        />
      </div>

      <div class="flex">
        <div class="w-8/12 pr-6" style="border-right: 1px solid #eee">
          <line-chart class="w-full" />
        </div>

        <div class="w-4/12 pl-6">
          <div
            class="w-full p-6 rounded flex items-center justify-between"
            style="border: 1px solid #ccc"
          >
            <div>
              <h3 class="mb-6">Average Lead Time</h3>

              <div class="font-semibold" style="font-size: 48px">
                3.5<span style="font-size: 16px">days </span>
                <span
                  class="text-tetiary-optima-color font-normal"
                  style="font-size: 16px"
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

    <s-table :headers="headers" :items="[]" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DataFilter from "../components/dataFilter.vue";
import PoCycleTableFilter from "./components/poCycleTableFilter";
import DonutChart from "./svgFolder/donutChart.vue";
import LineChart from "./svgFolder/lineChart.vue";
import Trend from "./svgFolder/trend.vue";

export default {
  name: "AnalyticsPurchasesLeadTime",
  components: { DataFilter, PoCycleTableFilter, DonutChart, LineChart, Trend },
  data() {
    return {
      headers: [
        {
          text: "PR Number",
        },

        {
          text: "Description",
        },

        {
          text: "PO Number",
        },

        {
          text: "PO Date",
        },

        {
          text: "GRN Number",
        },

        {
          text: "GRN Date",
        },

        {
          text: "Lead Time (Days)",
        },
      ],
    };
  },
  computed:{
      ...mapGetters("analytics", ["getAllPurchaseLeadCount"]),
  },
  mounted() {
    this.$store.dispatch("analytics/getAllPurchaseLeadCount")}
};

</script>

<style></style>
