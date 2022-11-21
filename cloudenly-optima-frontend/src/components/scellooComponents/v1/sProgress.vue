<template>
  <div
    class="flex rounded-lg"
    :style="
      `height: ${height}px; background-color: ${backgroundColor || '#9BA0A7'};`
    "
  >
    <span
      class="h-full rounded-lg"
      :style="`background-color: ${color || '#F15846'}; width: ${progress}%;`"
    ></span>
  </div>
</template>

<script>
export default {
  name: "ScellooProgressBar",
  props: ["progress", "height", "color", "backgroundColor"],
};
</script>

<style></style>
