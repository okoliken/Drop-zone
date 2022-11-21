<template>
  <div class="bg-white p-6 rounded">
    <div class="flex mb-10">
      <div>
        <h2 class="font-semibold mb-2">Sales Vs. Cost Vs. Profit</h2>

        <div style="font-size: 13px;">
          Profitability Account
        </div>
      </div>

      <s-select :height="27" class="ml-8" />

      <s-select :height="27" class="ml-3" />
    </div>

    <div class="flex mb-12">
      <div>
        <div class="mb-4" style="font-size: 13px;">Net Sales</div>

        <div
          class="text-primary-optima-color font-semibold"
          style="font-size: 16px;"
        >
          ₦ 1,260,611.46
        </div>
      </div>

      <div class="ml-12">
        <div class="mb-4" style="font-size: 13px;">
          Cost of Goods Sold
        </div>

        <div
          class="text-secondary-optima-color font-semibold"
          style="font-size: 16px;"
        >
          ₦ 2,200,020.00
        </div>
      </div>

      <div class="ml-12">
        <div class="mb-4" style="font-size: 13px;">
          Gross Profit
        </div>

        <div class="font-semibold" style="font-size: 16px; color: #F2994A;">
          ₦ 939,408.54
        </div>
      </div>

      <div class="ml-12">
        <div class="mb-4" style="font-size: 13px;">
          % Gross Margin
        </div>

        <div class="font-semibold" style="font-size: 16px; color: #F2994A;">
          74.5%
        </div>
      </div>
    </div>

    <bar-chart />

    <!-- ***TODO implement the legend component -->
  </div>
</template>

<script>
import barChart from "../svgFolder/barChart.vue";

export default {
  name: "",
  components: { barChart },
};
</script>

<style></style>
