<template>
  <div class>
    <StockTransactionAnalysis />

    <div class="bg-white">
      <ul
        class="flex items-center px-1 border border-solid border-t-0 border-r-0 border-l-0 border-grey-light"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="mr-5 mt-3 font-bold px-8 pb-2 cursor-pointer"
        >{{tab}}</li>
      </ul>

      <component v-bind:is="currentTabComponent" class="py-2"></component>
    </div>
  </div>
</template>

<script>
import StockTransactionAnalysis from "./stockTransactionAnalysis.";
import materialrequisition from "../MaterialRequest/myMaterialRequest.vue"
import materialreturn from '../MaterialReturn/myMaterialReturn'
export default {
  components: {
    StockTransactionAnalysis,
    materialrequisition,
    materialreturn
  },

  data() {
    return {
      currentTab: "Material Requisition",
      tabs: ["Material Requisition", "Material Return"]
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase();
    }
  },
  mounted() {}
};
</script>


<style lang="css" scoped>
.active {
  border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue;
}
</style>  