
<template>
  <div>
  

    <div>
      <createProductItem />
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */

// import createServiceItem from "./createServiceItem"; 
import createProductItem from "./createProductItem.vue";

export default {
  components: {
    // createServiceItem,
    createProductItem,
  },

  data() {
    return {
      itemGroup: "product",
    };
  },

  mounted() {
    this.queryInfo = this.$route.query;
    this.itemGroup = this.queryInfo.group;
  },
};
</script>

<style lang="css" scoped>
.select {
  border: 1px solid #cccccc;
  border-radius: 2px !important;
}
</style>
