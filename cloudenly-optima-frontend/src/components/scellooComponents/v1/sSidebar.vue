<template>
  <aside
    class="sidebar fixed"
    :style="
      `background-color: ${backgroundColor}; height: calc(100vh - 65px); width: ${width}px;`
    "
  >
    <slot />
  </aside>
</template>

<script>
export default {
  name: "ScellooSidebar",
  props: {
    backgroundColor: {
      type: String,
      default: "#1034A6",
    },
    width: {
      type: Number,
      default: 220,
    },
  },
};
</script>

<style>
.sidebar {
  left: 0;
  top: 65px;
}
</style>
