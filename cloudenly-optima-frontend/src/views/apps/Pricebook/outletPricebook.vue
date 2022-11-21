<template>
  <div class>
    <div class="mt-5">
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

      <component
        v-if="getIsAccOwner || getSalesPricebookPrivileges.viewRegister"
        v-bind:is="currentTabComponent"
      ></component>

      <!-- <div v-if="getIsAccOwner || getSalesPricebookPrivileges.viewRegister">
        <products />
      </div> -->

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import products from "./productPricebook.vue";
import services from "./servicesPricebook.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    products,
    services,
  },

  data() {
    return {
      tabs: ["Products", "Services"],
      currentTab: "Products",
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.toLowerCase();
    },
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesPricebookPrivileges",
    ]),
  },

  mounted() {
    // this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>

<style scoped>
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
