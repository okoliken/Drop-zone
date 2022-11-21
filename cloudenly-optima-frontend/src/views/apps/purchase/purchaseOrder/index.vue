<template>
  <div>
     <h2 class="mb-10 font-semibold">Purchase Order</h2>

    <purchase-order-analysis v-if="getIsAccOwner ||getPurchaseOrderPrivileges.viewDashboard "  class="mb-6" />

    <purchase-orders />
  </div>
</template>

<script>
import PurchaseOrderAnalysis from "./purchaseOrderAnalysis";
import PurchaseOrders from "./purchaseOrders";
import otherspurchaseorder from "./otherPurchaseOrder";
import {mapGetters}  from "vuex"

export default {
  components: {
    PurchaseOrderAnalysis,
    PurchaseOrders,
    otherspurchaseorder,
  },
  data() {
    return {
      tabs: ["My Purchase Order", "Others Purchase Order"],
      currentTab: "My Purchase Order",
    };
  },
  methods: {},

  computed: {
    currentTabComponent: function() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase();
    },

    ...mapGetters("auth/roles" , ["getIsAccOwner" , "getPurchaseOrderPrivileges"])


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
