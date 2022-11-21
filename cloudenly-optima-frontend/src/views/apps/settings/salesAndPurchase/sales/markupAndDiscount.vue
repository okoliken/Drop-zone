<template>
  <div>
    <div class="mt-5">
      <ul class="flex items-center">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-on:click="currentTab = tab"
          v-bind:class="[{ active: currentTab === tab }]"
          class="text-lg font-normal cursor-pointer bg-gray-300 px-8 py-3"
        >
          {{ tab }}
        </li>
      </ul>

      <component v-bind:is="currentTabComponent" class=""></component>
    </div>
  </div>
</template>

<script>
import products from "../sales/markupDiscount/ProductMarkupDiscount.vue";
import services from "../sales/markupDiscount/ServiceMarkupDiscount.vue";
export default {
  components: {
    products,
    services,
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
    // ...mapGetters(["getIsAccOwner", "getSalesCataloguePrivileges"]),
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
      this.currentTabComponent = tab.toLowerCase();
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
