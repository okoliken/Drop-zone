<template>
  <div class="bg-white flex items-center p-6 rounded">
    <label class="flex items-center">
      <input type="radio" class="mr-4" />

      <div class="flex items-center">
        <s-select default-option="2019" :width="100" class="mr-2" />
        <s-select default-option="--Months--" :width="165" />
      </div>
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
  name: "AnalyticsPurchasesSuppliersDataFilter",
  data() {
    return {};
  },
};
</script>

<style></style>
