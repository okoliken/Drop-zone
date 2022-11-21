<template>
  <div>
    <div
      v-if="
        getIsAccOwner || getCustomerManagementPrivileges.viewTransactionHistory
      "  >
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

          <label class="flex items-center">
            <input
              type="radio"
              class="mr-3"
              value="materialReturn"
              v-model="selectedOption"
            />
            Material Returns
          </label>
        </div>
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
import alertPrivilege from "../../../../../components/Alert/AlertPrevilege";

import { mapGetters } from "vuex";
export default {
  components: {

    alertPrivilege,
  },
  data() {
    return {
      selectedOption: "quotation",
      tabs: ["Quotation", "Invoice", "Waybill", "Material Return"],
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
