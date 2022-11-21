<template>
  <div>
    <div>
      <p class="font-semibold text-lg">Stock Balances</p>
    </div>
    <InventoryAnalysis
      v-if="getIsAccOwner || getStockBalancePrivileges.viewDashboard"
      class="mt-5"
    />
    <div v-if="getIsOutletInventorySetup" class></div>
    <div
      v-else
      class="px-3 py-4 mt-3 bg-white border-solid border-4 border-cloudenly-danger-main border-t-0 border-b-0 border-r-0 rounded"
    >
      <h2 class="mb-0 font-normal text-cloudenly-primary-main">
        You have not defined any other type of inventory for this outlet
      </h2>
    </div>

    <div class="mt-3">
      <ul
        class="flex items-center border-2 border-t-0 border-r-0 border-l-0 border-cloudenly-primary-main"
      >
        <li
          v-for="(tab, index) in getSetOutletInventory"
          :key="index"
          v-on:click="currentTab = tab"
          :class="[{ active: currentTab.name === tab.name }]"
          class="text-lg font-normal cursor-pointer bg-gray-300 px-8 py-3 rounded-b-0"
        >
          {{ tab.name }}
        </li>
      </ul>
      <component
        :currentTab="currentTab"
        v-bind:is="currentTabComponent"
      ></component>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import InventoryAnalysis from "./inventoryAnalysis";
import totalinventory from "./TotalStock";
import holdinginventory from "./holdingStock";
import Drawer from "../../../../components/Drawer/drawer";
import othersinventory from "./otherInventoryType";

export default {
  components: {
    holdinginventory,
    totalinventory,

    InventoryAnalysis,
    othersinventory,
    Drawer,
  },
  data() {
    return {
      search: "",
      drawer: false,

      currentTab: {
        name: "Total Inventory",
        id: null,
        slug: null,
        updatedAt: null,
        createdAt: null,
      },
    };
  },

  async mounted() {
    await this.$store.dispatch("inventory/stock/getOutletInventoryType");
  },

  methods: {},

  computed: {
    ...mapGetters("inventory/stock", [
      "getSetOutletInventory",
      "getIsOutletInventorySetup",
    ]),

    ...mapGetters("auth/roles", ["getIsAccOwner", "getStockBalancePrivileges"]),

    // eslint-disable-next-line vue/return-in-computed-property
    currentTabComponent() {
      if (this.currentTab.name === "Total Inventory") {
        return this.currentTab.name.split(" ").join("").toLowerCase();
      } else if (this.currentTab.name === "Holding Inventory") {
        return this.currentTab.name.split(" ").join("").toLowerCase();
      } else {
        return () => import("./otherInventoryType");
      }
    },
  },
};
</script>

<style scoped>
.active {
  background-color: white;
  color: blue;
}
</style>
