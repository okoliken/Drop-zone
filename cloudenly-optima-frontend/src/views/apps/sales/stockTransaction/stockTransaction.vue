<template>
  <div class>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Stock Transaction</p>
    </div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color"></p>
    </div>
    <StockTransactionAnalysis class="mt-5" />

    <div class="mt-5">
      <ul
        class="flex items-center border-2 border-t-0 border-r-0 border-l-0 border-cloudenly-primary-main"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="text-lg font-normal cursor-pointer bg-gray-300 px-8 py-3 rounded-b-0"
        >{{tab}}</li>
      </ul>

      <component v-bind:is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import StockTransactionAnalysis from "./stockTransactionAnalysis.";
import materialrequisition from "./materialRequisition";
import materialreturn from "./materialReturn";

export default {
  components: {
    StockTransactionAnalysis,
    materialrequisition,
    materialreturn,
  },

  data() {
    return {
      currentTab: "Material Requisition",
      tabs: ["Material Requisition", "Material Return"],
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
  mounted() {},
};
</script>


<style lang="css" scoped>
.active {
  background-color: white;
  color: blue;
}
</style>  