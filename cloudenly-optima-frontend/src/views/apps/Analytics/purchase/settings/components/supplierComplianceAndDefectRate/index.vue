<template>
  <!-- number of suppliers information -->
  <div class="grid grid-cols-12 bg-white px-6 py-8 mb-5" style="height: 400px;">
    <div
      class="col-span-7 flex flex-col justify-between pr-6"
      style="border-right: 1px solid #eee;"
    >
      <div class="flex items-center justify-between">
        <h2 class="font-bold">Supplier Compliance and Defect Rate</h2>

        <s-select :width="120" :height="27" defaultOption="Months" />
      </div>

      <div>
        <vue-apex-charts
          type="line"
          height="200"
          width="100%"
          :options="supplierComplianceAndDefectRate.line.options"
          :series="supplierComplianceAndDefectRate.line.series"
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

    <div class="col-span-5 pl-6">
      <h2 class="font-bold mb-6">Defect Rate</h2>

      <div
        class="flex items-center pl-4 py-4"
        style="border-bottom: 1px solid #eee; font-size: 12px;"
      >
        <div class="w-10/12">Supplier</div>
        <div class="w-2/12">Rate</div>
      </div>

      <div
        class="flex items-center pl-4 mt-6 font-normal"
        v-for="(item, i) in defects"
        :key="i"
      >
        <div class="w-3/12">{{ item.text }}</div>
        <div class="w-7/12 pr-6">
          <s-progress :height="5" :progress="item.rate" />
        </div>
        <div class="w-2/12 font-bold" style="font-size: 16px;">
          {{ item.rate }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import supplierComplianceAndDefectRate from "./supplierComplianceAndDefectRate";
import SProgress from "@/components/scellooComponents/v1/sProgress.vue";

import image_arrow from "@/assets/images/optimaAsset/analytics/left.svg";

export default {
  name: "AnalyticsSupplierComplianceAndDefectRate",
  components: { VueApexCharts, SProgress },
  data() {
    return {
      supplierComplianceAndDefectRate,
      image_arrow,
      defects: [
        { text: "Intel", rate: 4 },
        { text: "ColToks", rate: 3 },
        { text: "Coors", rate: 2 },
        { text: "Exxon", rate: 1 },
        { text: "Tesla", rate: 6 },
      ],
    };
  },
};
</script>

<style></style>
