<template>
  <div class="flex items-center text-lg">
    <feather-icon
      @click="$router.back()"
      icon="ArrowLeftIcon"
      svgClasses="mr-3 h-6 w-6 cursor-pointer"
    />

    <span class="border-2 border-black border-t-0 border-b-0 border-l-0 pr-4">
      <p>back</p>
    </span>
    <p class="ml-3 font-semibold">{{ location }}</p>
  </div>
</template>

<script>
export default {
  name: "Back",
  props: {
    location: String,
  },
};
</script>

<style></style>


