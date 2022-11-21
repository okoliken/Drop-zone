<template>
  <div style="font-size: 14px;">
    <h1 class="mb-8">Analytics & Business Intelligence - Sales</h1>

    <div>
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
import revenue from "./revenue";
import accountReceivables from "./accountReceivables";
import salesPipeline from "./pipeline";
import profitability from "./profitability";

export default {
  // name: AnalyticsSales,
  components: {
    revenue,
    accountReceivables,
    salesPipeline,
    profitability,
  },
  data() {
    return {
      currentTab: "Revenue",
      tabs: [
        "Revenue",
        "Account Receivables",
        // "Sales Pipeline",
        // "Profitability",
      ],
    };
  },
  computed: {
    currentTabComponent: function() {
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
