<template>
  <div>
    <div>
      <p class="font-semibold text-lg">Sales Pricebook</p>
    </div>
    <PricebookAnalysis class="mt-5" />
    <pricebook />
  </div>
</template>

<script>
import PricebookAnalysis from "./pricebookAnalysis";
import pricebook from "./outletPricebook";

export default {
  components: {
    PricebookAnalysis,
    pricebook,
  },

  data() {
    return {};
  },

  methods: {},

  computed: {},
  mounted() {},
};
</script>


<style lang="css" scoped>
/* .active {
  border: 4px solid;
  border-right: none;
  border-left: n one;
  border-top: none;
  border-color: blue;
  color: blue;
} */
</style>