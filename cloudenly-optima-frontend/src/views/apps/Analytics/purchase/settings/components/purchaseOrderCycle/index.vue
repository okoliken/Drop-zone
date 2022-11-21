<template>
  <!-- number of suppliers information -->
  <div class="grid grid-cols-12 bg-white px-6 py-8 mb-5" style="height: 400px;">
    <div class="col-span-5 flex flex-col justify-between">
      <!-- donut header options -->
      <div class="">
        <h2 class="mr-12 font-bold">Purchase Order Cycle Time</h2>

        <p class="mt-12 font-normal">Percentage of Suppliers</p>
      </div>

      <!-- donut chart -->
      <div class="w-full h-full flex items-center">
        <div class="w-6/12 flex items-center" style="height: 250px;">
          <vue-apex-charts
            type="donut"
            height="100%"
            :options="purchaseOrderCycle.donut.options"
            :series="purchaseOrderCycle.donut.series"
          />
        </div>

        <div
          class="w-6/12 pl-10 flex flex-col justify-center"
          style="height: 250px;"
        >
          <div
            :class="{ 'mb-5': i !== 3 }"
            v-for="(item, i) in series"
            :key="i"
          >
            <div class="font-normal mb-1">
              <span>{{ item.text }}</span>

              <span class="font-medium" :style="`color: ${item.color};`">
                ({{ item.percentage }}%)
              </span>
            </div>

            <div class="font-bold" style="font-size: 18px;">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- donut footer options -->
      <div class="flex items-end">
        <span class="font-normal mr-2">Contracted:</span>
        <span
          class="font-bold text-secondary-optima-color"
          style="font-size: 16px;"
          >200</span
        >

        <span class="ml-12 mr-2 font-normal">Unlisted:</span>

        <span
          class="font-bold text-tetiary-optima-color"
          style="font-size: 16px;"
        >
          35
        </span>
      </div>
    </div>

    <div
      class="col-span-7 flex flex-col justify-between"
      style="border-left: 1px solid #eee;"
    >
      <div class="flex items-center justify-end">
        <s-select :width="120" :height="27" defaultOption="Months" />
      </div>

      <div>
        <vue-apex-charts
          type="line"
          height="200"
          width="100%"
          :options="purchaseOrderCycle.line.options"
          :series="purchaseOrderCycle.line.series"
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
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import purchaseOrderCycle from "./purchaseOrderCycle";

import image_arrow from "@/assets/images/optimaAsset/analytics/left.svg";

export default {
  name: "AnalyticsPurchaseOrderCycle",
  components: { VueApexCharts },
  data() {
    return {
      purchaseOrderCycle,
      image_arrow,
      series: [
        { text: "Technology", percentage: 45, value: 113, color: "#507FDF" },
        { text: "Manufacturing", percentage: 35, value: 58, color: "#4ECDC4" },
        { text: "Distribution", percentage: 15, value: 41, color: "#1034A6" },
        { text: "Others", percentage: 5, value: 23, color: "#FF4F79" },
      ],
    };
  },
};
</script>

<style></style>
