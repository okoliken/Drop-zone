<template>
  <div style="font-size: 14px">
    <h1 class="font-semibold mb-8">Supplier</h1>

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />
    <component :is="currentTabComponent" />

  </div>
</template>

<script>
import mysuppliers from "./supplier/mySupplier";
import globalnetwork from "./globalNetwork/globalSupplierNetwork";
import {mapGetters} from 'vuex'

export default {
  components: {
    globalnetwork,
    mysuppliers,
  },
  data() {
    return {
      currentTab: "Global Network",
      tabs: ["Global Network", "My Suppliers"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),

  },
};
</script>
