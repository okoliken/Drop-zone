<template>
  <div>
    <back location="Users and Groups" class="mb-10" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
import Users from "./users";
import Groups from "./groups";
import Deactivated from "./deactivated";
// import {mapGetters} from 'vuex'
export default {
  components: {
    Users,
    Groups,
    Deactivated,
  },

  data() {
    return {
      currentTab: "Users",
      tabs: ["Users", "Groups", "Deactivated"],
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function() {
      return this.currentTab.toLowerCase();
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
        border-color: #1565C0;
        color: #1565C0 */
}
</style>
