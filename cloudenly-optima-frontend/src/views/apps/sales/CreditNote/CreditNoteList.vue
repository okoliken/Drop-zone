<template>
  <div>
    <div>
      <p class="font-semibold">Credit Note</p>
    </div>
    <CreditNoteAnalysis class="mt-8" />

    <div class="mt-8 rounded">
      <ul class="flex items-center border-2 border-t-0 border-r-0 border-l-0 border-cloudenly-primary-main">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="text-lg font-normal cursor-pointer bg-gray-300 px-8 py-3 rounded-b-0 "
        >{{tab}}</li>
      </ul>

      <component v-bind:is="currentTabComponent" class=""></component>
    </div>
  </div>
</template>


<script>
import CreditNoteAnalysis from "./creditNoteAnalysis";


import creditnoteissued from "./creditNoteIssued"
import debitnotereceived from "./debitNoteRecieved"
export default {
  components: {
    CreditNoteAnalysis,
  

    creditnoteissued,
    debitnotereceived
  },
  data() {
    return {
      currentTab: "Credit Note Issued",
      tabs: ["Credit Note Issued", "Debit Note Received"],
    };
  },
  methods: {},
  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
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