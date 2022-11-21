<template>
  <div>
    <h2 class="mb-8 font-semibold" style="font-size: 15px">Invoice</h2>
    <!-- <PurchaseInvoiceAnalysis
      v-if="getIsAccOwner || getPurchaseInvoicePrivileges.viewDashboard"
      class="mb-3"
    /> -->

    <allinvoice />
  </div>
</template>

<script>
import PurchaseInvoiceAnalysis from "./purchaseInvoiceAnalysis";
import allinvoice from "./AllPurchaseInvoice";
import recurring from "./recurringInvoice";
import rental from "./RentalInvoice";
import { mapGetters } from "vuex";

export default {
  components: {
    PurchaseInvoiceAnalysis,
    allinvoice,
    recurring,
    rental,
  },
  data() {
    return {
      currentTab: "Regular Invoice",
      tabs: ["Regular Invoice", "Recurring ", "Rental "],
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseInvoicePrivileges",
    ]),
  },

  mounted() {},
};
</script>

<style lang="css" scoped>
.active {
  border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue;
}
</style>
