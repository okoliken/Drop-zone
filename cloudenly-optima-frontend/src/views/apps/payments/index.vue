<template>
  <div>
    <h1 class="mb-8" style="font-size: 14px;">Payouts & Collections</h1>

    <analysis class="mb-3" />

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
import analysis from "./analysis.vue";
import collections from "./collections";
import payouts from "./payouts";

export default {
  components: { analysis, collections, payouts },
  data() {
    return {
      currentTab: "Collections",
      tabs: ["Collections", "Payouts"],
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
