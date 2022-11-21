<template>
  <div>
    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <!-- tab content -->
    <component :is="currentTabComponent" />
  </div>
</template>

<script>
import directDebit from "./directDebit";
import virtualNubanAccounts from "./virtualNubanAccounts";

export default {
  components: {
    directDebit,
    virtualNubanAccounts,
  },
  data() {
    return {
      modal: false,
      checked: false,
      errorCheck: "",
      currentTab: "Virtual Nuban Accounts",
      tabs: ["Virtual Nuban Accounts", "Direct Debit"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },

  
};
</script>

<style></style>
