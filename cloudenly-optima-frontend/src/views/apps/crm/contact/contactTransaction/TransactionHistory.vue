<template>
  <div>
    <div
      v-if="
        getIsAccOwner || getCustomerManagementPrivileges.viewTransactionHistory
      "
    >
      <!-- options and search box -->
      <div class="bg-white p-6">
        <div class="flex items-center mb-10">
          <h2 class="font-semibold mr-12">Transaction History:</h2>

          <label class="flex items-center mr-12">
            <input
              type="radio"
              class="mr-3"
              value="quotation"
              v-model="selectedOption"
            />
            Quotation
          </label>

          <label class="flex items-center mr-12">
            <input
              type="radio"
              class="mr-3"
              value="invoice"
              v-model="selectedOption"
            />
            Invoice
          </label>

          <label class="flex items-center mr-12">
            <input
              type="radio"
              class="mr-3"
              value="waybill"
              v-model="selectedOption"
            />
            Waybill
          </label>

          <!-- <label class="flex items-center">
            <input
              type="radio"
              class="mr-3"
              value="materialReturn"
              v-model="selectedOption"
            />
            Material Returns
          </label> -->
        </div>

        <s-combo-box />
      </div>

      <component :is="currentTabComponent" />
    </div>

    <div v-else>
      <div>
        <alert-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import alertPrivilege from "../../../../components/Alert/AlertPrevilege";

// import requestforquote from './contactRequestForQuote'
// import purchaseorder from './contactPurchaseOrder'
import quotation from "./contactQuotation";
import invoice from "./contactInvoice";
// import creditnote from './contactCreditNote'
// import debitnote from './contactDebitNote'

import waybill from "./contactWaybill";
// import grn from './contactGRN'
import materialreturn from "./contactMaterialReturn";
// import loan from './contactLoan'
// import deposit from './contactDeposit.vue'
import { mapGetters } from "vuex";
export default {
  components: {
    // requestforquote,
    // purchaseorder,
    quotation,
    invoice,
    // creditnote,
    // debitnote,
    waybill,
    // grn,
    materialreturn,
    // loan,
    // deposit,

    alertPrivilege,
  },
  data() {
    return {
      selectedOption: "quotation",
      // 'Request For Quote', 'Purchase Order',
      tabs: ["Quotation", "Invoice", "Waybill", "Material Return"],
      headers: [
        { text: "Invoice No." },
        { text: "Description" },
        { text: "BOQ" },
        { text: "Date Issued" },
        { text: "Status" },
        { text: "Action" },
      ],
      items: [
        {
          invoiceNo: "12098",
          description: "02 - 12 - 2020",
          boq: "View",
          createdAt: "02 - 12 - 2020",
          status: "Paid",
          id: "1",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCustomerManagementPrivileges",
    ]),

    currentTabComponent: function () {
      return this.selectedOption.split(" ").join("").toLowerCase();
    },
  },
};
</script>

<style lang="css" scoped>
.active {
  border: 3px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue;
}
</style>
