<template>
  <div>
    <!-- purchase group information -->
    <div class="grid grid-cols-12 bg-white mb-5 py-8">
      <h2 class="col-span-12 pl-6 mb-8">Purchase Group</h2>

      <!-- Group name -->
      <div class="col-span-3 flex items-center pl-10 py-4">
        <img :src="image_UserGroups" alt="user groups" />

        <div class="ml-6">
          <div class="mb-1 font-normal">{{ "Purchasing @ Scelloo" }}</div>
          <div class="text-right">Group Name</div>
        </div>
      </div>

      <!-- Group Admin -->
      <div class="col-span-3 flex items-center pl-10 py-4 seperator">
        <img :src="image_admin" alt="user groups" />

        <div class="ml-6">
          <div class="mb-1 font-normal">{{ "Isioma A John" }}</div>
          <div class="text-right">Group Admin</div>
        </div>
      </div>

      <!-- channel -->
      <div class="col-span-3 flex items-center pl-10 py-4 seperator">
        <img :src="image_messaging" alt="user groups" />

        <div class="ml-6">
          <div class="mb-1 font-normal">Purchasing @ Scelloo</div>
          <div class="text-right">Channel</div>
        </div>
      </div>

      <div class="col-span-3 flex items-center pl-10 py-4 seperator">
        <button class="text-primary-optima-color">View Group Members</button>
      </div>
    </div>

    <!-- chart display information -->
    <div class="grid grid-cols-12 bg-white px-6 pt-6 pb-8 mb-5">
      <div
        class="col-span-12 flex items-center pb-6"
        style="border-bottom: 1px solid #ccc;"
      >
        <h2 class="mr-6">Chart Display:</h2>

        <label class="flex items-center font-normal">
          <input
            type="radio"
            value="month-to-month"
            class="mr-3"
            v-model="chartDisplay"
          />

          Month to Month
        </label>

        <label class="flex items-center ml-8 font-normal">
          <input
            type="radio"
            value="year-to-year"
            class="mr-3"
            v-model="chartDisplay"
          />

          Year to Year
        </label>
      </div>

      <div class="col-span-12 flex mt-8 mb-10">
        <s-select label="Year:" :width="120" defaultOption="2020" />
        <s-select label="Suppliers:" class="ml-16" />
      </div>

      <div class="col-span-12">
        <div class="flex">
          <div style="width: 6%;">View:</div>

          <div class="font-normal" style="width: 9%;">
            <label class="flex items-center">
              <input type="checkbox" class="mr-3" />
              All
            </label>
          </div>

          <div class="flex items-center flex-wrap" style="width: 80%;">
            <div
              class="w-3/12 font-normal mb-3"
              v-for="(item, i) in supplierOptions"
              :key="i"
            >
              <label class="flex items-center">
                <input type="checkbox" class="mr-3" />
                {{ item.text }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex mt-8">
          <div style="width: 6%;"></div>
          <button>Clear All</button>
        </div>
      </div>
    </div>

    <!-- number of suppliers information -->
    <number-of-suppliers />

    <!-- purchase order cycle -->
    <purchase-order-cycle />

    <!-- supplier compliance and defect rate -->
    <supplier-compliance-and-defect-rate />

    <!-- purchase lead time -->
    <purchase-lead-time />

    <!-- cost management  -->
    <cost-management />

    <!-- purchase trend  -->
    <purchase-trends />
  </div>
</template>

<script>
import image_UserGroups from "@/assets/images/optimaAsset/analytics/purchase_analytics_settings_user-groups.svg";
import image_admin from "@/assets/images/optimaAsset/analytics/purchase/settings/admin.svg";
import image_messaging from "@/assets/images/optimaAsset/analytics/purchase/settings/messaging.svg";

import VueApexCharts from "vue-apexcharts";
import NumberOfSuppliers from "./components/numberOfSuppliers";
import PurchaseOrderCycle from "./components/purchaseOrderCycle";
import SupplierComplianceAndDefectRate from "./components/supplierComplianceAndDefectRate";
import PurchaseLeadTime from "./components/purchaseLeadTime";
import PurchaseTrends from "./components/purchaseTrends";
import CostManagement from "./components/costManagement";

export default {
  name: "PurchaseAnalyticsSettings",
  components: {
    VueApexCharts,
    NumberOfSuppliers,
    PurchaseOrderCycle,
    SupplierComplianceAndDefectRate,
    PurchaseLeadTime,
    PurchaseTrends,
    CostManagement,
  },
  data() {
    return {
      image_UserGroups,
      image_admin,
      image_messaging,
      supplierOptions: [
        { value: false, text: "No. of Suppliers" },
        { value: false, text: "Purchase order Cycle" },
        //{ value: false, text: "Supplier Compliance and Defect Rate" },
        { value: false, text: "Purchase Lead Time" },
        { value: false, text: "By Products" },
      ],
      chartDisplay: "month-to-month",
    };
  },
};
</script>

<style scoped>
.seperator {
  border-left: 1px solid #ccc;
}
</style>
