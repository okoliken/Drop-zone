/* eslint-disable vue/no-parsing-error */
<template>
  <div class="flex items-center justify-between font-normal">
    <div class="flex items-center">
      <span class="mr-4">Show:</span>

      <s-select
        :options="pageFilters"
        :height="25"
        :has-default="false"
        v-model="perPage"
      />

      <span class="ml-4">Per Page</span>
    </div>

    <div class="flex items-center">
      <span class="mr-2">Showing Page:</span>

      <button
        class="px-3 rounded"
        style="border: 1px solid #ccc; height: 25px"
        :disabled="currentPage == 1"
        @click="currentPage--"
      >
       <p class="heading" v-html="sym"></p>
      </button>

      <span class="px-4">{{ currentPage }}</span>

      <button
        class="px-3 rounded"
        style="border: 1px solid #ccc; height: 25px"
        @click="currentPage++"
        :disabled="currentPage === size"
      >
        {{ ">" }}
      </button>

      <span class="ml-4">Of</span>

      <span class="ml-4">{{ size || perPage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "sPagination",
  props: ["size"],
  data() {
    return {
      currentPage: 1,
      perPage: "10",
      sym : "<"
    };

  },
  watch: {
    currentPage() {
      this.$emit("currentPage", this.currentPage);
      this.$emit("pagination", {
        currentPage: this.currentPage,
        perPage: this.perPage,
      });
    },
    perPage() {
      this.$emit("perPage", this.perPage);
      this.$emit("pagination", {
        currentPage: this.currentPage,
        perPage: this.perPage,
      });
    },

    size() {
      if (this.currentPage > this.size) this.currentPage = this.size;
    },
  },
  computed: {
    pageFilters() {
      const result = [];
      for (let index = 10; index <= 40; index += 10) {
        result.push(index);
      }

      return result;
    },

    // pageSize() {
    //   return this.size / this.perPage;
    // },
  },
};
</script>

<style></style>
