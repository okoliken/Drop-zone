<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <section class="bg-white p-6 rounded mb-3">
      <div class="flex items-center mb-10">
        <h2 class="font-semibold">Defect Rate</h2>

        <s-select
          defaultOption="Outlet"
          :options="['Outlet']"
          :height="27"
          class="ml-10"
        />
        <s-select
          defaultOption="Supplier"
          :options="['Supplier']"
          :height="27"
          class="ml-3"
        />
        <s-select
          defaultOption="All Product"
          :options="['All Product']"
          :height="27"
          class="ml-3"
        />
      </div>

      <div class="flex mb-12">
        <div>
          <div class="mb-4" style="font-size: 13px">Total Defect</div>

          <div>
            <span
              class="text-primary-optima-color font-semibold"
              style="font-size: 16px"
              >2041</span
            >
            of 21,000 Supplied Goods
          </div>
        </div>

        <div class="ml-12">
          <div class="mb-4" style="font-size: 13px">Total Defect Rate</div>

          <div class="text-tetiary-optima-color">
            <span
              class="text-secondary-optima-color font-semibold"
              style="font-size: 16px"
              >23%</span
            >
            -3.4%
          </div>
        </div>

        <div class="ml-12">
          <div class="mb-4" style="font-size: 13px">Total Defect Value</div>

          <div class="text-danger-optima-color">
            <span
              class="text-secondary-optima-color font-semibold"
              style="font-size: 16px"
              >₦ 99,408.54</span
            >
            +0.77
          </div>
        </div>
      </div>

      <div>
        <bar-chart />
      </div>
    </section>

    <compliance-and-defect-table-filter />

    <s-table :headers="headers" :items="[]" />
  </div>
</template>

<script>
import DataFilter from "../components/dataFilter.vue";
import ComplianceAndDefectTableFilter from "./components/complianceAndDefectTableFilter.vue";
import BarChart from "./svgFolder/barChart.vue";

export default {
  components: { DataFilter, ComplianceAndDefectTableFilter, BarChart },

  data() {
    return {
      headers: [
        {
          text: "Supplier",
        },
        {
          text: "Transaction ID",
        },
        {
          text: "Transaction Type",
        },
        {
          text: "Delivery Date",
        },

        {
          text: "Total Order Value",
        },

        {
          text: "Defect Count (Qty)",
        },
      ],
    };
  },
};
</script>

<style></style>
