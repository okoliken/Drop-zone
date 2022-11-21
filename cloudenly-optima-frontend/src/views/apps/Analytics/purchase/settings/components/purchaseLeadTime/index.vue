<template>
  <!-- number of suppliers information -->
  <div class="grid grid-cols-12 bg-white px-6 py-8 mb-5" style="height: 400px;">
    <div
      class="col-span-8 flex flex-col justify-between pr-6"
      style="border-right: 1px solid #eee;"
    >
      <h2 class="font-bold">Purchase Lead Time</h2>

      <div>
        <vue-apex-charts
          type="line"
          height="200"
          width="100%"
          :options="purchaseLeadTime.line.options"
          :series="purchaseLeadTime.line.series"
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
      <h2 class="font-bold mb-10">Average Lead Time</h2>

      <div class="flex mb-16">
        <s-select :height="27" defaultOption="Measure in Days" :width="120" />
      </div>

      <div class="flex items-center">
        <img :src="image_time" alt="time" />

        <div class="ml-6">
          <div class="mb-2">Average Time</div>
          <div class="font-bold" style="font-size: 28px;">3.5 Days</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SProgress from "@/components/scellooComponents/v1/sProgress.vue";

import purchaseLeadTime from "./purchaseLeadTime";

import image_arrow from "@/assets/images/optimaAsset/analytics/left.svg";
import image_time from "@/assets/images/optimaAsset/analytics/purchase/settings/time.svg";

export default {
  name: "AnalyticsSupplierComplianceAndDefectRate",
  components: { VueApexCharts, SProgress },
  data() {
    return {
      purchaseLeadTime,
      image_arrow,
      image_time,
    };
  },
};
</script>

<style></style>
