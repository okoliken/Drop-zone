<template>
  <div class="bg-white grid grid-cols-12 rounded rounded-t-none">
    <div
      class="col-span-4 text-center py-6 font-normal"
      v-for="i in 3"
      :key="i"
    >
      <h2 class="mb-8 font-bold">Payables Turnover in Days</h2>

      <vue-apex-charts
        type="donut"
        :height="200"
        :options="numberOfSuppliers.donut.options"
        :series="numberOfSuppliers.donut.series"
      />

      <div class="mb-4 mt-5">Average Gross Receivables</div>

      <div>-0.2%</div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import numberOfSuppliers from "../numberOfSuppliers";

export default {
  name: "AnalyticsPurchasesAccountPayablesDonutCharts",
  components: { VueApexCharts },
  data() {
    return { numberOfSuppliers };
  },
};
</script>

<style></style>
