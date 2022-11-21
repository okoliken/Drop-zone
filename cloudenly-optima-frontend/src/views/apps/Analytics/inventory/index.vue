<template>
  <div class="grid grid-cols-12 col-gap-5" style="font-size: 14px;">
    <h1 class="col-span-12 mb-8">
      Analytics & Business Intelligence - Inventory
    </h1>

    <details-box class="col-span-12" />

    <div class="col-span-12">
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
import inventoryDistribution from "./components/inventoryDistribution";
import stockMovement from "./components/stockMovement";
import inventoryTurnover from "./components/inventoryTurnover";
import detailsBox from "../components/detailsBox.vue";

export default {
  name: "AnalyticsInventory",
  components: {
    inventoryDistribution,
    stockMovement,
    inventoryTurnover,
    detailsBox,
  },
  data() {
    return {
      tabs: ["Inventory Distribution", "Stock Movement", "Inventory Turnover"],
      currentTab: "Inventory Distribution",
      headers: [
        { text: "Invoice Number", value: "invoiceNumber" },
        { text: "Supplier", value: "supplier" },
        { text: "Payment Terms", value: "paymentTerms" },
        { text: "Total Amount", value: "total" },
        { text: "Next Due Date", value: "dueDate" },
        { text: "Balance Due", value: "balance" },
        { text: "Days Overdue", value: "overdue" },
      ],
      items: [
        {
          invoiceNumber: "344567",
          supplier: "Okorie Peter",
          paymentTerms: "Payable on Receipt",
          total: "5000",
          dueDate: "12 - 04 - 2020",
          balance: "3400",
          overdue: "1",
        },
      ],
    };
  },
  computed: {
    currentTabComponent() {
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
