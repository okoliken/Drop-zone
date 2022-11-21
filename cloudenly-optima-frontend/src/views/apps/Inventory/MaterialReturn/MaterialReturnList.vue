<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Material Return</p>
    </div>

    <div v-if="getIsAccOwner || getMaterialReturnPrivileges.viewDashboard">
      <materialReturnAnalysis v-if="currentTab === 'Issued'" />
      <receivedMaterialReturnAnalysis v-else />
    </div>

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
        >
          {{ tab }}
        </li>
      </ul>

      <component v-bind:is="currentTabComponent"></component>
    </div>
  </div>
</template>


<script>
import Issued from "./myMaterialReturn";
import Received from "./recievematerialReturn";
import materialReturnAnalysis from "./MaterialReturnAnalysis";
import receivedMaterialReturnAnalysis from "./receivedMaterialReturnAnalysis";
import { mapGetters } from "vuex";
export default {
  components: {
    Issued,
    Received,
    materialReturnAnalysis,
    receivedMaterialReturnAnalysis,
  },
  data() {
    return {
      currentTab: "Issued",
      tabs: ["Issued", "Received"],
    };
  },
  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getMaterialReturnPrivileges",
    ]),
  },

  mounted() {},
};
</script>

<style scoped>
.active {
  background-color: white;
  color: blue;
}
</style>
