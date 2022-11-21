<template>
  <div>
    <data-filter class="mb-3" />

    <pipeline-conversion class="mb-3" />

    <contact-table-filter />

    <s-table :headers="headers" :items="[]" />
  </div>
</template>

<script>
import dataFilter from "../../components/dataFilter.vue";
import pipelineConversion from "./pipelineConversion";
import contactTableFilter from "./components/contactTableFilter.vue";

export default {
  name: "AnalyticsCrmPipeline",
  components: { dataFilter, pipelineConversion, contactTableFilter },

  data() {
    return {
      headers: [
        { text: "Contact" },
        { text: "Description" },
        { text: "Date Registered (Aging)" },
        { text: "Status" },
      ],
    };
  },
};
</script>

<style></style>
