<template>
  <header
    class="header fixed w-full"
    :style="`height: ${height}px; background: ${backgroundColor}`"
  >
    <slot />
  </header>
</template>

<script>
export default {
  name: "ScellooNavigationBar",
  props: {
    height: {
      type: Number,
      default: 65,
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
  },
};
</script>

<style>
.header {
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
