<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Good Received Note</p>
    </div>
    <GoodReceivedNoteAnalysis v-if="getIsAccOwner ||getGoodReceiveNotePrivileges.viewDashboard " />
  
    <div class="mt-10">
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
import {mapGetters} from 'vuex'
import GoodReceivedNoteAnalysis from "./GoodReceiveNoteAnalysis";
import Issued from "./issued";
import Received from "./receivedgoodreceivednote";

export default {
  components: {
    GoodReceivedNoteAnalysis,
    Issued,
    Received,
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
    ...mapGetters('auth/roles', ["getIsAccOwner" , "getGoodReceiveNotePrivileges"])
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