<template>
  <div>
    <back location="Outlets & Inventories" class="mb-8" />

    <outlet-analysis
      v-show="
        getIsAccOwner || getOutletAndInventoryPrivileges.viewOutletsDashboard
      "
      v-if="currentTab === 'Outlets'"
      class="mb-3"
    />

    <inventory-class-analysis
      v-show="
        getIsAccOwner || getOutletAndInventoryPrivileges.viewInventoryDashboard
      "
      class="mb-3"
      v-else
    />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component :is="currentTabComponent" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import inventoryClassAnalysis from "./inventoryClassAnalysis.vue";
import outletAnalysis from "./outletAnalysis.vue";

import outlets from "@/views/apps/shared/outletsAndInventoryClasses/outlets.vue";
import Inventoryclasses from "@/views/apps/shared/outletsAndInventoryClasses/inventoryClasses.vue";
import inventoryvaluation from "@/views/apps/shared/outletsAndInventoryClasses/InventoryValuation.vue";



export default {
  components: {
    inventoryClassAnalysis,
    outletAnalysis,
    outlets,
    Inventoryclasses ,
    inventoryvaluation

  },

  data() {
    return {
      currentTab: "Outlets",
      tabs: ["Outlets", "Inventory Classes" , "Inventory Valuation"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase().replace(/,/g, "");
    },
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getOutletAndInventoryPrivileges",
    ]),
  },
};
</script>
