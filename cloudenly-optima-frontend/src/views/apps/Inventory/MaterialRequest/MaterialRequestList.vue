<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Material Request</p>
    </div>

    <MaterialAnalysis v-if="currentTab === 'Issued'" />
    <ReceivedMaterialRequestAnalysis v-else />

    <div
      v-if="getIsAccOwner || getMaterialRequestPrivileges.viewDashboard"
    ></div>

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
import MaterialAnalysis from "./materialRequestAnalysis";
import Issued from "./myMaterialRequest";
import Received from "./ReceivedMaterialRequest";
import ReceivedMaterialRequestAnalysis from "./receivedMaterialRequestAnalysis";
import { mapGetters } from "vuex";
export default {
  components: {
    MaterialAnalysis,
    Issued,
    Received,
    ReceivedMaterialRequestAnalysis,
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
      "getMaterialRequestPrivileges",
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