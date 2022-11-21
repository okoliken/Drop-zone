<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <outlets-revenue-target class="mb-3" />

    <agents-revenue-target class="mb-3" />

    <product-category-revenue />
  </div>
</template>

<script>
import dataFilter from "../../components/dataFilter.vue";
import outletsRevenueTarget from "./components/outletsRevenueTarget.vue";
import agentsRevenueTarget from "./components/agentsRevenueTarget.vue";

import productCategoryRevenue from "./components/productCategoryRevenue.vue";

export default {
  components: {
    dataFilter,
    outletsRevenueTarget,
    agentsRevenueTarget,
    productCategoryRevenue,
  },
};
</script>

<style></style>
