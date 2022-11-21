<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white grid grid-cols-12 p-6 rounded">
      <div class="col-span-8 grid grid-cols-2">
        <div class="col-span-2 flex items-center mb-10">
          <div class="flex items-center mr-12">
            <h2 class="font-semibold">Inventory Turnover</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <s-select :height="27" />

          <s-select :height="27" class="ml-3" />
        </div>

        <div class="col-span-1">
          <h3 class="font-semibold text-secondary-optima-color mb-4">Sales</h3>

          <div class="flex">
            <div class="w-1/2 flex flex-col">
              <small class="mb-2">Start Period</small>

              <div class="font-semibold" style="font-size: 16px;">
                ₦ 0.00
              </div>
            </div>

            <div class="w-1/2">
              <small class="flex flex-col mb-2">End Period</small>

              <div class="font-semibold" style="font-size: 16px;">
                ₦ 0.00
              </div>
            </div>
          </div>

          <div class="mt-12 flex flex-col">
            <small class="mb-2">Total Cost of Good Sold</small>
            <div
              class="text-secondary-optima-color font-semibold"
              style="font-size: 16px;"
            >
              ₦ 0.00
            </div>
          </div>
        </div>

        <div class="col-span-1 pl-6" style="border-left: 1px solid #ccc;">
          <h3
            class="font-semibold text-secondary-optima-color mb-4"
            style="color: #F2994A;"
          >
            Inventory
          </h3>

          <div class="flex">
            <div class="w-1/2 flex flex-col">
              <small class="mb-2">Start Period</small>

              <div class="font-semibold" style="font-size: 16px;">
                ₦ 0.00
              </div>
            </div>

            <div class="w-1/2">
              <small class="flex flex-col mb-2">End Period</small>

              <div class="font-semibold" style="font-size: 16px;">
                ₦ 0.00
              </div>
            </div>
          </div>

          <div class="mt-12 flex flex-col">
            <small class="mb-2">Average Inventory</small>

            <div class="font-semibold" style="font-size: 16px; color: #F2994A;">
              ₦ 0.00
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-span-4 pl-6 flex items-center"
        style="border-left: 1px solid #ccc;"
      >
        <div
          class="w-full p-6 rounded flex items-center justify-between"
          style="border: 1px solid #ccc;"
        >
          <div>
            <h3 class="mb-6">Inventory Turnover Ratio</h3>

            <div class="font-semibold" style="font-size: 48px;">
              0
              <span
                class="text-tetiary-optima-color font-normal"
                style="font-size: 16px;"
              >
                0%
              </span>
            </div>
          </div>

          <div>
            <trend />
          </div>
        </div>
      </div>

      <div
        class="col-span-12 flex items-center mt-8 pt-10"
        style="border-top: 1px solid #ccc;"
      >
        <div class="w-1/3 flex flex-col items-center">
          <div class="flex items-center mb-8">
            <h2 class="font-semibold">Inventory Turnover In Days</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <turnover-circle />

          <div class="text-tetiary-optima-color mt-10" style="font-size: 16px;">
            0%
          </div>
        </div>

        <div class="w-1/3 flex flex-col items-center">
          <div class="flex items-center mb-8">
            <h2 class="font-semibold">Inventory Turnover In Days</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <turnover-circle />

          <div class="text-tetiary-optima-color mt-10" style="font-size: 16px;">
            0%
          </div>
        </div>

        <div class="w-1/3 flex flex-col items-center">
          <div class="flex items-center mb-8">
            <h2 class="font-semibold">Inventory Turnover In Days</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <turnover-circle />

          <div class="text-tetiary-optima-color mt-10" style="font-size: 16px;">
            0%
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import DataFilter from "../../../components/dataFilter.vue";
import Trend from "./svgFolder/trend.vue";
import TurnoverCircle from "./svgFolder/turnoverCircle.vue";

export default {
  name: "AnalyticsInventoryTurnover",
  components: { DataFilter, Trend, TurnoverCircle },

  computed: {
    ...mapGetters("analytics", ["getAllInventoryTurnover"])
  },
  mounted() {
    this.$store.dispatch("analytics/getAllInventoryTurnover");
  }
};
</script>

<style></style>
