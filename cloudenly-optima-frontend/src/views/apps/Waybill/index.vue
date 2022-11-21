<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Waybill</p>
    </div>


    <waybillAnalysis
      v-if="getIsAccOwner || getInventoryWaybillPrivileges.viewDashboard"
      class="mt-4"
    />

    <div class="mt-8">
      <ul
        class="
          flex
          items-center
          border-2
          border-t-0
          border-r-0
          border-l-0
          border-cloudenly-primary-main
        "
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="
            text-lg
            font-normal
            cursor-pointer
            bg-gray-300
            px-8
            py-3
            rounded-b-0
          "
        >
          {{ tab }}
        </li>
      </ul>
      <component v-bind:is="currentTabComponent"></component>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import waybillAnalysis from "./waybillAnalysis";
import Issued from "./issueWaybill";
import received from "./receiveWaybill";

export default {
  components: {
    waybillAnalysis,
    Issued,
    received,
  },

  data() {
    return {
      currentTab: "Issued",
      tabs: ["Issued", "Received"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase();
    },

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesWaybillPrivileges",
      "getInventoryWaybillPrivileges",
    ]),
  },
  methods: {},
};
</script>


<style scoped>
.active {
  background-color: white;
  color: blue;
}
</style>