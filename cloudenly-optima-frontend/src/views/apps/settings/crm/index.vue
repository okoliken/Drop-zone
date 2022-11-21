<template>
  <div class="font-normal">
    <back location="CRM" class="mb-10" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
import loyalty from "./loyalty";
import contact from "./contactCode";
import pipelineconversion from "./pipeline";
export default {
  components: {
    loyalty,
    contact,
    pipelineconversion,
  },
  data() {
    return {
      currentTab: "Loyalty",
      tabs: ["Loyalty", "Pipeline Conversion"],
    };
  },

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
};
</script>
