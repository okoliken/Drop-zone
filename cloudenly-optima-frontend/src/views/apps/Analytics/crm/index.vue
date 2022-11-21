<template>
  <div class="grid grid-cols-12 col-gap-5" style="font-size: 14x;">
    <h1 class="col-span-12 mb-8">
      Analytics & Business Intelligence - CRM
    </h1>

    <details-box class="col-span-12" />

    <div class="col-span-12">
      <s-tabs
        :tabs="tabs"
        :activeTab="currentTab"
        @currentTab="currentTab = $event"
      />

      <component v-bind:is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import detailsBox from "../components/detailsBox.vue";
import leads from "./leads";
import pipeline from "./pipeline";
// import activities from "./activities";

export default {
  name: "AnalyticsInventory",
  components: {
    detailsBox,
    leads,
    pipeline,
    // activities,
  },
  data() {
    return {
      tabs: ["Leads", "Pipeline"],
      currentTab: "Leads",
    };
  },

  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },

  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },

  
};
</script>

<style></style>
