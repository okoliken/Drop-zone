<template>
  <div>
    <div>
      <p class="font-bold tracking-wider">Debit Note</p>
    </div>
    <DebitAnalysis class="mt-8" />
    <div class="mt-8 rounded">
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

      <component v-bind:is="currentTabComponent" class></component>
    </div>
  </div>
</template>

<script>

import DebitAnalysis from './debitAnalysis'
import debitnoteissued from "./debitNoteIssued";
import creditnoterecieved from "./creditNoteRecieved";
export default {
  components: {
    debitnoteissued,
    creditnoterecieved,
    DebitAnalysis
  },

  data() {
    return {
      currentTab: "Debit Note Issued",
      tabs: ["Debit Note Issued", "Credit Note Recieved"],
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
};
</script>

<style lang="css" scoped>
.active {
  background-color: white;
  color: blue;
}
</style>
