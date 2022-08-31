<script setup lang="ts">
import { ref } from "vue";
import DropZone from "./components/drop-zone.vue";

const in_drop_zone = ref<boolean>(false);

const drop = () => {
  in_drop_zone.value = !in_drop_zone.value;
};
</script>

<template>
  <div
    @dragenter.prevent="drop"
    @dragleave.prevent="drop"
    @dragover.prevent
    :class="{ 'file--is--in--zone': in_drop_zone }"
    class="drop-wrapper__container"
  >
    <DropZone />
  </div>
</template>

<style scoped></style>
