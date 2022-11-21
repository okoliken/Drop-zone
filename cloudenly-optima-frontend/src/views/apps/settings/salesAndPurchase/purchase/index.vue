<template>
  <div>
    <back location="Purchase Settings" class="mb-10" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
import globalnetwork from "./globalNetwork.vue";
import supplierid from "./supplierId.vue";
import brand from "../shared/brands";
import categories from "../shared/categories";
import subcategories from "../shared/subCategory";

export default {
  components: {
    globalnetwork,
    supplierid,
    brand,
    categories,
    subcategories,
  },
  data() {
    return {
      currentTab: "Global Network",
      tabs: [
        "Global Network",
        //  "Supplier ID",
        "Brand",
        "Categories",
        "Sub Categories",
      ],
    };
  },

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
};
</script>
