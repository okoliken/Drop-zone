<template>
  <div>
    <materialReturnAnalysis />

    <div class="bg-white mt-5">
      <ul
        class="flex items-center border border-solid border-t-0 border-r-0 border-l-0 border-grey-light"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="mr-8 px-5 py-2 font-semibold cursor-pointer"
        >{{tab}}</li>
      </ul>

      <component v-bind:is="currentTabComponent" class="py-2"></component>
    </div>
  </div>
</template>


<script>
import mymaterialreturn from "./myMaterialReturn";
import otherMaterialReturn from "./othersMaterialReturn";
import receivedmaterialreturn from "./recievematerialReturn";
import materialReturnAnalysis from "./MaterialReturnAnalysis";
export default {
  components: {
    mymaterialreturn,
    otherMaterialReturn,
    receivedmaterialreturn,
    materialReturnAnalysis
  },
  data() {
    return {
      currentTab: "My Material Return",
      tabs: ["My Material Return", "Received Material Return"]
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

<style scoped>
.active {
  border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue;
}
</style>
