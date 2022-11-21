<template>
  <div>
    <back location="Outlet and Taxes" class="mb-8" />

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
import Location from "./locations";
import Taxes from "./taxes";
export default {
  components: {
    Location,
    Taxes,
  },
  data() {
    return {
      currentTab: "Location",
      tabs: ["Location", "Taxes"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.toLowerCase();
    },
  },
};
</script>
