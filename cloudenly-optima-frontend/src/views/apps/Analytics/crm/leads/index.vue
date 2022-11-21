<template>
  <div>
    <data-filter class="mb-3" />

    <lead-source class="mb-3" />

    <lead-industry />
  </div>
</template>

<script>
import dataFilter from "../../components/dataFilter.vue";
import leadSource from "./leadSource";
import leadIndustry from "./leadIndustry.vue";

export default {
  name: "AnalyticsCrmLeads",
  components: { dataFilter, leadSource, leadIndustry },
};
</script>

<style></style>
