<template>
  <div style="font-size: 14px;">
    <h1 class="mb-8">Analytics & Business Intelligence - Purchase</h1>

    <details-box />

    <div>
      <s-tabs
        :tabs="tabs"
        :activeTab="currentTab"
        @currentTab="currentTab = $event"
      />

      <component v-bind:is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import DetailsBox from "../components/detailsBox.vue";
import purchaseSettings from "./settings";
import AccountPayables from "./accountPayables";
import Suppliers from "./suppliers";
// import ComplianceAndDefects from "./complianceAndDefects";
// import POCycleTime from "./purchaseOrderCycleTime";
import LeadTime from "./leadTime";
import PurchaseTrend from "./trends";
import CostManagement from "./costManagement";

export default {
  name: "PurchaseAnalytics",
  components: {
    DetailsBox,
    purchaseSettings,
    AccountPayables,
    Suppliers,
    // ComplianceAndDefects,
    // POCycleTime,
    LeadTime,
    PurchaseTrend,
    CostManagement,
  },
  data() {
    return {
      currentTab: "Account Payables",
      tabs: [
        "Account Payables",
        "Suppliers",
        // "Compliance and Defects",
        // "PO Cycle Time",
        // "Lead Time",
        "Purchase Trend",
        "Cost Management",
        // "Purchase Settings",
      ],
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

<style></style>
