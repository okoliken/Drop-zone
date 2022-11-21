<template>
  <div>
    <back location="Account Owner" class="mb-10" />

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
import organisationInformation from "./orgProfile";
import userProfile from "./userProfile";

export default {
  components: {
    organisationInformation,
    userProfile,
  },
  data() {
    return {
      currentTab: "Organisation Information",
      tabs: ["Organisation Information", "User Profile"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
};
</script>
