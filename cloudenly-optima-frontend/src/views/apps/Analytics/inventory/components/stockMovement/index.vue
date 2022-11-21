<template>
  <div class="font-normal">
    <data-filter class="mb-3" />

    <added-stocks class="mb-3" />

    <issued-stocks class="mb-3" />

    <stock-balance />
  </div>
</template>

<script>
import DataFilter from "../../../components/dataFilter.vue";
import AddedStocks from "./components/addedStocks.vue";
import IssuedStocks from "./components/issuedStocks.vue";
import StockBalance from "./components/stockBalance.vue";

export default {
  name: "AnalyticsInventoryStockMovement",
  components: { DataFilter, AddedStocks, IssuedStocks, StockBalance },
  data() {
    return {
      movements: [
        {
          text: "Good Received Notes",
          percentages: 92,
          value: "59,400.54",
          tick: "+1.23",
        },
        {
          text: "Material Returns",
          percentages: 92,
          value: "6,600.06",
          tick: "-0.50",
        },
        {
          text: "Purchase Orders",
          percentages: 92,
          value: "44,000.00",
          tick: "-0.30",
        },
        {
          text: "Material Requests",
          percentages: 92,
          value: "44,000.40",
          tick: "+0.01",
        },
      ],
    };
  },
};
</script>

<style></style>
