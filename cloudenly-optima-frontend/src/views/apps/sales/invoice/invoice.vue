<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Sales Invoice</p>
    </div>

    <invoice-analysis
      v-if="getIsAccOwner || getSalesInvoicePrivileges.viewDashboard"
      class="mt-5"
    />

    <div class="mt-8 rounded">
      <ul
        class="
          flex
          items-center
          border-2
          border-t-0
          border-r-0
          border-l-0
          border-cloudenly-primary-main
        "
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="
            text-lg
            font-normal
            cursor-pointer
            bg-gray-300
            px-8
            py-3
            rounded-b-0
          "
        >
          {{ tab }}
        </li>
      </ul>

      <component v-bind:is="currentTabComponent"></component>
    </div>
  </div>
</template>


<script>
import InvoiceAnalysis from "./invoiceAnalysis";
import standardinvoice from "./saleInvoice/allInvoice";
import recurring from "./recurringInvoice/allRecurringInvoice";
// import rental from "./rentalInvoice/allRentalInvoice";
// import others from "./othersInvoice";
import { mapGetters } from "vuex";

export default {
  components: {
    InvoiceAnalysis,
    standardinvoice,
    recurring,
    // rental,
    // others
  },
  data() {
    return {
      currentTab: "Standard Invoice",
      tabs: ["Standard Invoice", "Recurring "],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesInvoicePrivileges"]),
  },
};
</script>



<style scoped>
.active {
  background-color: white;
  color: blue;
}
</style>