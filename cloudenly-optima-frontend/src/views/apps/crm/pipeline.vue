<template>
  <div>
  

    <PipelineAnalysis v-if="getIsAccOwner ||getCustomerPipelinePrivileges.viewDashboard "  class="mb-12" />

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
import { mapGetters } from "vuex";

import PipelineAnalysis from "./analysis/pipelineAnalysis";
import Leads from "./pipeline/leads";
import Opportunity from "./pipeline/opportunity";
import Sales from "./pipeline/sales";

export default {
  components: {
    PipelineAnalysis,
    Leads,
    Opportunity,
    Sales,
  },

  data() {
    return {
      tabs: ["Leads", "Opportunity", "Sales"],
      currentTab: "Leads",
    };
  },

  computed: {
    ...mapGetters("crm/pipeline", ["getisPipelineSetup", "getPipelineSetup"]),
     ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerPipelinePrivileges",
    ]),
    currentTabComponent: function() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase();
    },
  },
};
</script>

<style></style>
