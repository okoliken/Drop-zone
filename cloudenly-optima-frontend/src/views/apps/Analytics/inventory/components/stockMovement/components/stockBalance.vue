<template>
  <div class="bg-white p-6 rounded" style="font-size: 14px;">
    <div class="flex justify-between">
      <div class="flex">
        <div class="flex">
          <div class="flex flex-col mr-16">
            <div class="flex items-center mb-2">
              <h2 class="font-semibold">Stock Movement</h2>

              <feather-icon
                icon="AlertCircleIcon"
                svgClasses="ml-3 h-6 w-6 cursor-pointer"
              />
            </div>

            <small>Stock Balance</small>
          </div>

          <s-select :height="27" class="mr-3" />
          <s-select :height="27" />
        </div>
      </div>

      <div>Showing Last 30 Days</div>
    </div>

    <div style="font-size: 14px;" class="flex items-center my-10">
      <div class="flex flex-col">
        <small class="font-normal mb-3" style="font-size: 13px;"
          >Total Opening Stock</small
        >
        <div style="font-size: 16px;">
          <span class="font-semibold">2,341</span>
          <span class="font-semibold text-secondary-optima-color">
            - ₦ 220,002.00</span
          >
        </div>
      </div>

      <div class="flex flex-col ml-16">
        <small class="font-normal mb-3" style="font-size: 13px;"
          >Total Closing Stock</small
        >
        <div style="font-size: 16px;">
          <span class="font-semibold">2,341</span>
          <span class="font-semibold text-tetiary-optima-color">
            - ₦ 220,002.00</span
          >
        </div>
      </div>

      <div class="flex flex-col ml-16">
        <small class="font-normal mb-3" style="font-size: 13px;"
          >Stock Movement</small
        >
        <div style="font-size: 16px;">
          <span class="font-semibold">2,341</span>
          <span class="font-semibold"> - ₦ 220,002.00</span>
        </div>
      </div>
    </div>

    <chart />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Chart from "../svgFolder/chart.vue";

export default {
  name: "AnalyticsInventoryStockBalance",
  components: { Chart },
  computed: {
    ...mapGetters("analytics", ["getAllStockMovement"])
  },
  mounted() {
    this.$store.dispatch("analytics/getAllStockMovement");
  }
};
</script>

<style></style>
