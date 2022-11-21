<template>
  <div class="grid grid-cols-12 col-gap-10 font-normal" style="font-size: 14px">
    <h1 class="col-span-12 font-bold mb-8">Pipeline Management</h1>

    <div
      class="col-span-4 flex flex-col bg-white p-4 rounded mr-4"
      style="height: 110px"
      v-for="(analytic, i) in analytics"
      :key="i"
    >
      <h2 class="font-semibold mb-5">{{ analytic.title }}</h2>

      <div
        class="w-full flex justify-between mb-5"
        v-if="analytic.title !== 'Leads'"
      >
        <div>By Value</div>
        <div class="font-semibold" :style="`color: ${analytic.color}`">
          {{ analytic.value | currency }}
        </div>
      </div>

      <div class="flex justify-between">
        <div>Total Volume</div>
        <div class="font-semibold" :style="`color: ${analytic.color}`">
          {{ analytic.volume }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PipelineAnalysis",
  computed: {
    ...mapGetters("crm/pipeline", ["getPipelineAnalysisData"]),
    analytics() {
      return [
        {
          title: "Leads",
          value: this.getPipelineAnalysisData.totalValue,
          volume: this.getPipelineAnalysisData.leadVolume,
          color: "#6F8DE9",
        },
        {
          title: "Opportunity",
          value: this.getPipelineAnalysisData.opportunityValue,
          volume: this.getPipelineAnalysisData.opportunityVolume,
          color: "#FF4F79",
        },
        {
          title: "Customer",
          value: this.getPipelineAnalysisData.saleValue,
          volume: this.getPipelineAnalysisData.saleVolume,
          color: "#4ECDC4",
        },
        // {
        //   title: "Total",
        //   value: this.getPipelineAnalysisData.totalValue,
        //   volume: this.getPipelineAnalysisData.totalVolume,
        //   color: "#1034A6",
        // },
      ];
    },
  },

  mounted() {
    this.$store.dispatch("crm/pipeline/getTotalPipelineTotalData"); 
  },
};
</script>
