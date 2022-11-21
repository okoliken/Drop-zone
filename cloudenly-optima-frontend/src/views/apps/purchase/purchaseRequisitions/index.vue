<template>
  <div>
    <h2 class="mb-10 font-semibold">Purchase Requisition</h2>
    <purchase-requisition-analysis
      v-if="getIsAccOwner || getPurchaseRequisitionPrivileges.viewDashboard"
    />
    <purchase-requisitions />
  </div>
</template>

<script>
import PurchaseRequisitionAnalysis from "./purchaseRequisitionAnalysis";
import PurchaseRequisitions from "./myPurchaseRequisitions";
import { mapGetters } from "vuex";

export default {
  components: {
    PurchaseRequisitionAnalysis,
    PurchaseRequisitions,
  },

  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequisitionPrivileges",
    ]),
  },
};
</script>
