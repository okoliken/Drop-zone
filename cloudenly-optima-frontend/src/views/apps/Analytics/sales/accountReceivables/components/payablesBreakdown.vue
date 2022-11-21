<template>
  <div class="col-span-12 bg-white px-6 py-6 rounded rounded-b-none">
    <h2 class="mb-6 font-semibold">Payables Breakdown</h2>

    <div class="flex items-center w-full">
      <s-combo-box />

      <s-text type="date" :width="200" class="ml-10" />

      <s-text type="date" class="ml-3" :width="200" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AnalyticsPurchasesAccountPayablesPayableBreakdown",
};
</script>

<style></style>
