<template>
  <div>
    <CustomerAnalysis />
    <ManageCommunity />
  </div>
</template>

<script>
import CustomerAnalysis from "./analysis/customerEngagement";
import ManageCommunity from "./community/ManageCommunity";

export default {
  components: {
    ManageCommunity,
    CustomerAnalysis,
  },

  data() {
    return {
      addCommunity: false,
      search: "",
    };
  },

  methods: {
    createCommunity() {
      this.addCommunity = true;
      // this.$router.push({name: "AddCommunity"})
    },

    closeModal() {
      this.addCommunity = false;
    },
  },
};
</script>

<style>
</style>
