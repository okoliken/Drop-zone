<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <profitability-account class="mb-3" />

    <profitability-table-filter />

    <s-table :items="[]" />
  </div>
</template>

<script>
import dataFilter from "../../components/dataFilter.vue";
import profitabilityAccount from "./components/profitabilityAccount.vue";
import profitabilityTableFilter from "./components/profitabilityTableFilter.vue";

export default {
  name: "AnalyticsSalesProfitability",
  components: { dataFilter, profitabilityAccount, profitabilityTableFilter },
  data() {
    return {};
  },
};
</script>

<style></style>
