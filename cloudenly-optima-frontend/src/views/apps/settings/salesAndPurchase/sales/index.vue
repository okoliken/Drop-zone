<template>
  <div>
    <back location="Sales Settings" class="mb-10" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
import markupanddiscount from "./markupAndDiscount";
import brand from "../shared/brands";
import categories from "../shared/categories";
import salestarget from "./salesTarget.vue";

export default {
  components: {
    markupanddiscount,
    brand,
    categories,
    salestarget,
  },

  data() {
    return {
      currentTab: "Markup and Discount",
      tabs: ["Markup and Discount", "brand", "Categories", "Sales Target"],
    };
  },

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
};
</script>
