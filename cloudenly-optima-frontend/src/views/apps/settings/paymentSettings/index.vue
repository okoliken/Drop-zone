<template>
  <div>
    <back location="Payments" class="mb-10 font-normal" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <!-- tab content -->
    <component :is="currentTabComponent" />
  </div>
</template>

<script>
import payment from "./payment";
import collections from "./collections";
import currencyConversion from "./currencyConvention";
// import collectionAssociation from "./collectionAssociation";

export default {
  components: {
    payment,
    
    collections,
    currencyConversion,
  
  },
  data() {
    return {
      modal: false,
      checked: false,
      errorCheck: "",
      currentTab: "Payment",
      tabs: [
        "Payment",
        "Collections",
        // "Collection Association",
        "Currency Conversion",
      ],
    };
  },

  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },

  mounted() {
    // this.modal = true;
  },
};
</script>

<style></style>
