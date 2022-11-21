<template>
  <main class="main absolute">
    <div class="pb-12">
      <slot />
    </div>
  </main>
</template>

<script>
export default {
  name: "ScellooMain",
};
</script>

<style scoped>
.main {
  top: 65px;
  left: 220px;
  width: calc(100% - 220px);
  height: calc(100vh - 65px);
  /* background: black; */
}
</style>
