<template>
  <div class>
    <div>
      <p class="font-semibold text-lg">Purchase Catalogue</p>
    </div>
    <PurchaseAnalysis
      v-if="
        getIsAccOwner || getPurchaseCataloguePrivileges.viewCatalogueDashboard
      "
      class="mt-5"
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
            py-4
            rounded-b-0
          "
        >
          {{ tab }}
        </li>
      </ul>

      <component v-bind:is="currentTabComponent"></component>
      <!-- <products /> -->
    </div>
  </div>
</template>

<script>
import products from "./purchaseProduct.vue";
import services from "./purchaseService.vue";
import PurchaseAnalysis from "./purchaseAnalysis.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    products,
    services,
    PurchaseAnalysis,
  },
  data() {
    return {
      currentTab: "Products",
      tabs: ["Products", "Services"],
    };
  },

  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    },

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseCataloguePrivileges",
    ]),
  },
};
</script>

<style lang="css" scoped>
.active {
  /* border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue; */
  background-color: white;
  color: blue;
}
</style>
