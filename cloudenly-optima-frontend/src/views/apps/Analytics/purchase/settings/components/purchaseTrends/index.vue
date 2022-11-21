<template>
  <!-- number of suppliers information -->
  <div class="grid grid-cols-12 bg-white px-6 py-8 mb-5" style="height: 400px;">
    <div
      class="col-span-8 flex flex-col justify-between pr-6"
      style="border-right: 1px solid #eee;"
    >
      <h2 class="font-bold">Purchase Trends</h2>

      <div>
        <vue-apex-charts
          type="line"
          height="200"
          width="100%"
          :options="purchaseTrends.line.options"
          :series="purchaseTrends.line.series"
        />

        <!-- line chart navigation -->
        <div class="font-normal flex items-center justify-between mt-3 pl-10">
          <button>
            <img :src="image_arrow" alt="left" />
          </button>

          <span>April to July</span>

          <button>
            <img
              :src="image_arrow"
              alt="right"
              style="transform: rotate(180deg)"
            />
          </button>
        </div>
      </div>

      <div class="flex items-center font-normal pl-10">
        <div class="flex items-center">
          <div
            class="rounded-full bg-secondary-optima-color mr-3"
            style="height: 8px; width: 8px;"
          ></div>

          <span>Contracted Suppliers</span>
        </div>

        <div class="flex items-center ml-12">
          <div
            class="rounded-full bg-tetiary-optima-color mr-3"
            style="height: 8px; width: 8px;"
          ></div>

          <span>Unlisted Suppliers</span>
        </div>
      </div>
    </div>

    <div class="col-span-4 pl-12">
      <div class="flex mb-10">
        <s-select :height="27" defaultOption="Show Month" :width="120" />
      </div>

      <h2 class="font-bold mb-12">This Month</h2>

      <div class="flex items-center">
        <img :src="image_trend" alt="trend" />

        <div class="ml-6">
          <div class="mb-2">Total Volume</div>
          <div class="font-bold" style="font-size: 28px;">1200</div>
          <div class="text-tetiary-optima-color mt-3">+7.8%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SProgress from "@/components/scellooComponents/v1/sProgress.vue";

import purchaseTrends from "./purchaseTrends";

import image_arrow from "@/assets/images/optimaAsset/analytics/left.svg";
import image_trend from "@/assets/images/optimaAsset/analytics/purchase/settings/trend.svg";

export default {
  name: "AnalyticsSupplierComplianceAndDefectRate",
  components: { VueApexCharts, SProgress },
  data() {
    return {
      purchaseTrends,
      image_arrow,
      image_trend,
    };
  },
};
</script>

<style></style>
