<template>
  <div>
    <!-- options and search box -->
    <div v-if="getCustomerManagementPrivileges.viewPricebook || getIsAccOwner">
      <div class="bg-white p-6">
        <div class="flex items-center mb-10">
          <h2 class="font-semibold mr-12">Price Book:</h2>

          <!-- <label class="flex items-center mr-12">
            <input
              type="radio"
              class="mr-3"
              value="products"
              v-model="selectedOption"
            />
            Products
          </label>

          <label class="flex items-center">
            <input
              type="radio"
              class="mr-3"
              value="services"
              v-model="selectedOption"
            />
            Services
          </label> -->
        </div>

        <s-combo-box v-if="getCustomerManagementPrivileges.searchPricebook || getIsAccOwner" />
      </div>

      <!-- <component :is="selectedOption" /> -->

      <products />

    </div>

    <div v-else>
      <div>
        <alert-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import products from "./productPricebook";
import services from "./servicePricebook";
import alertPrivilege from "../../../../components/Alert/AlertPrevilege";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    products,
    services,
    VuePerfectScrollbar,
    alertPrivilege,
  },
  data() {
    return {
      selectedOption: "products",
      currentTab: "Product ",
      tabs: ["Product ", "Service"],
      productHeaders: [
        { text: "Item Name" },
        { text: "Loyalty (Unit)" },
        { text: "Customer Price (Pack)" },
        { text: "Date Updated" },
      ],
    };
  },

  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerManagementPrivileges",
    ]),

    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
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
        color: blue */
}
</style>
