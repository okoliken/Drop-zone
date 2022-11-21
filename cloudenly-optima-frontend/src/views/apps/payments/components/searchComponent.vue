<template>
  <section class="bg-white px-2 py-8 flex justify-evenly h-44 mt-4">
    <s-combo-box class="mb-8" />

    <div class="flex">
      <s-select
        :width="220"
        default-option="--Filter By Customer--"
        class="mr-3"
      />
      <s-select
        :width="220"
        default-option="--Filter By Search--"
        class="mr-3"
      />
      <s-text :width="220" type="date" />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
