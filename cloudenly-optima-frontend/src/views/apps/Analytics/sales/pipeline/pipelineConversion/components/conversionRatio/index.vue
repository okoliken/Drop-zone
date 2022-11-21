<template>
  <div class="grid grid-cols-3 mt-8" style="border-top: 1px solid #ccc;">
    <div
      class="bg-white flex items-center col-span-1 py-8 pr-10 pl-6"
      v-for="(item, i) in chartLabelDetails"
      :key="i"
    >
      <div class="w-5/12">
        <vue-apex-charts
          type="donut"
          :height="150"
          :options="conversionRatio.donut.options"
          :series="conversionRatio.donut.series"
        />
      </div>

      <div class="w-7/12 font-normal text-right">
        <div class="mb-4 font-medium" :style="`color: ${item.color}`">
          {{ item.text }}
        </div>

        <div class="font-bold mb-2" style="font-size: 18px;">
          {{ item.ratio }}
        </div>

        <div>Conversion Ratio</div>
      </div>
    </div>
  </div>
</template>

<script>
import vueApexCharts from "vue-apexcharts";
import conversionRatio from "./conversionRatio";

export default {
  components: { vueApexCharts },
  data() {
    return {
      conversionRatio,
      chartLabelDetails: [
        { text: "Lead to Opportunity", ratio: "5:2", color: "#507FDF" },
        { text: "Opportunity to Sales", ratio: "4:1", color: "#F2994A" },
        { text: "Lead to Sales", ratio: "5:1", color: "#6FCF97" },
      ],
    };
  },
};
</script>

<style></style>
