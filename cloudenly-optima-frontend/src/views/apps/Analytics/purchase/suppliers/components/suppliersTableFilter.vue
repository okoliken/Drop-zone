<template>
  <div class="col-span-12 bg-white px-6 py-6 rounded rounded-b-none">
    <h2 class="mb-6 font-semibold">All Suppliers</h2>

    <div class="flex items-center w-full">
      <s-combo-box />

      <s-select :width="200" class="ml-10" />

      <s-select :width="200" class="ml-3" />

      <s-select class="ml-3" :width="200" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
