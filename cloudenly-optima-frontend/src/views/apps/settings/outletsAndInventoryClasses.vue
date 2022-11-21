<template>
  <div>
    <back location="Outlets & Inventories" class="mb-8" />

    <div>
      <s-tabs
        :tabs="tabs"
        :activeTab="currentTab"
        @currentTab="currentTab = $event"
      />

      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import outlets from "@/views/apps/shared/outletsAndInventoryClasses/outlets.vue";
import Inventoryclasses from "@/views/apps/shared/outletsAndInventoryClasses/inventoryClasses.vue";
import inventoryvaluation from "@/views/apps/shared/outletsAndInventoryClasses/InventoryValuation.vue";

export default {
  components: {
    outlets,
    Inventoryclasses,
    inventoryvaluation
  },

  data() {
    return {
      currentTab: "Outlets",
      tabs: ["Outlets", "Inventory Classes", "Inventory Valuation"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase().replace(/,/g, "");

    },
  },
};
</script>
