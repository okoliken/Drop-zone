<template>
  <div>
    <!-- <h1 class="text-lg font-semibold mb-8">
      Expenditure Codes and Cost Centres
    </h1>

    <div>
    
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

    
      <component v-bind:is="currentTabComponent" />
    </div> -->
  </div>
</template>

<script>
import expenditureCode from "./expenditureCode";
import costCentres from "./costCentres";
import expenditureCostCentresAccounts from "./expenditureCostCentresAccounts";
import expenditureTracking from "./expenditureTracking";

export default {
  name: "ExpenditureCodesAndCostCentres",
  components: {
    expenditureCode,
    costCentres,
    expenditureCostCentresAccounts,
    expenditureTracking,
  },
  data() {
    return {
      tabs: [
        "Expenditure Code",
        "Cost Centres",
        "Expenditure, Cost Centres, Accounts",
        "Expenditure Tracking",
      ],
      currentTab: "Expenditure Code",
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

<style>
.active {
  background-color: white;
  color: blue;
}
</style>
