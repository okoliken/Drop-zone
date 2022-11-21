<template>
  <div class="bg-white grid grid-cols-12 rounded rounded-t-none">
    <div
      class="col-span-4 text-center py-6 font-normal"
      v-for="(data , i) in analyticData"
      :key="i"
    >
      <h2 class="mb-8 font-bold">{{data.title}}</h2>

      <vue-apex-charts
        type="donut"
        :height="200"
        :options="numberOfSuppliers.donut.options"
        :series="numberOfSuppliers.donut.series2"
      />

      <div class="mb-4 mt-5">{{data.body}}</div>

      <div class=" text-success"> {{data.value}}</div>
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
    return { 
      numberOfSuppliers ,

      analyticData : [
        { 

          title: 'Days Payable Outstanding',
          body : 'Outstanding payable',
          value: '-0.2%'
        },

        {
            title: 'Payable Turnover',
          body : 'Average Accounts payable',
          value: '+1.7%'
        },

        {

          title: 'Payables Turnovers in days',
          body : 'Average Unpaid Payables',
          value: '-0.2%'

        }
      ]
      };
  },
};
</script>

<style></style>
