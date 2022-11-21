<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <chart-distribution />

    <section class="bg-white p-6 grid grid-cols-5 col-gap-6 rounded mb-3">
      <h2 class="col-span-5 mb-4 text-secondary-optima-color font-semibold">
        Breakdown
      </h2>

      <s-select class="col-span-1" />
      <s-select class="col-span-1" />
      <s-select class="col-span-1" />
      <s-select class="col-span-1" />
      <s-select class="col-span-1" />
    </section>

    <s-table :headers="headers" :items="breakdown" />
    <!-- {{breakdown}} -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import DataFilter from "../../../components/dataFilter.vue";
import ChartDistribution from "./components/chartDistribution.vue";

export default {
  name: "AnalyticsInventoryTurnovers",
  components: { DataFilter, ChartDistribution },
  data() {
    return {
      headers: [
        { text: "Outlets", value: "outlet" },
        { text: "Total Stock Inventory", value: "quantity" },
        { text: "Inventory Value (₦)", value: "value" },
        { text: "Last Modified", value: "updatedAt" }
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters(
      "analytics",

      ["getAllInventoryBreakdown"]
    ),
    breakdown() {
      return this.getAllInventoryBreakdown.inventoryBreakdowns
    
    }
  },
  mounted() {
    this.$store.dispatch("analytics/getAllInventoryBreakdown");
  }
};
</script>
