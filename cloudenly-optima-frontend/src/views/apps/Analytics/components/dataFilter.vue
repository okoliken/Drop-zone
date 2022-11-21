<template>
  <div class="bg-white flex items-center p-6 rounded">
    <label class="flex items-center">
      <input type="radio" class="mr-4" />

      <s-select default-option="Last Week" :width="165" />
    </label>

    <label class="flex items-center ml-16">
      <input type="radio" class="mr-4" />
      <s-text type="date" :width="200" />
      <s-text type="date" :width="200" class="ml-3" />
    </label>
  </div>
</template>

<script>
export default {
  name: "AnalyticsInventoryDataFilter",
  data() {
    return {};
  },
};
</script>

<style></style>
