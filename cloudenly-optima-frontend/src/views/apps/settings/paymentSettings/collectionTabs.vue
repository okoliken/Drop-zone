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
import accounts from "./accounts";
import associations from "./associations";

export default {
  components: {
    accounts,
    associations,
  },
  data() {
    return {
      modal: false,
      checked: false,
      errorCheck: "",
      currentTab: "Accounts",
      tabs: ["Accounts", "Associations"],
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
