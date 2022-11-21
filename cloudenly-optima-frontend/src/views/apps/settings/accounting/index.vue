
<template>
  <div>
    <back location="Accounting Settings " class="mb-10" />
    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />
    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
// import chartofaccounts from "@/views/apps/Accounts/ChartOfAccounts/index.vue";
// eslint-disable-next-line no-unused-vars
// import chartofaccountMain from "@/views/apps/Accounts/ChartOfAccounts/chartOfAccount.vue";

import categories from "@/views/apps/Accounts/Category/index";
import expenditurecodes from "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/expenditureCode/index";
import costcentres from "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/costCentres/index";
import revenuecodes from "@/views/apps/Accounts/RevenueCodes/index";
import expenditurecostcentersaccounts from '@/views/apps/Accounts/ExpenditureCodesAndCostCentres/expenditureCostCentresAccounts/index'
import revenuecostcentersaccounts from '@/views/apps/Accounts/RevenueCostCentreAccount/index'

export default {
  components: {
    categories,
    expenditurecodes,
    costcentres,
    revenuecodes,
    expenditurecostcentersaccounts,
    revenuecostcentersaccounts,
  },
  data() {
    return {
      currentTab: "Categories",
      tabs: [
        "Categories",
        "Expenditure Codes",
        "Revenue Codes",
        "Cost Centres",
        "Expenditure, Cost Centers, Accounts",
        "Revenue, Cost Centers, Accounts"
      ],
    };
  },
  computed: {
    currentTabComponent() {
       return this.currentTab.split(" ").join("").toLowerCase().replace(/,/g, "");
      // return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

