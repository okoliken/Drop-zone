<script setup lang="ts">
import { ref, provide } from "vue";
import DropZone from "./components/drop-zone.vue";

const in_drop_zone = ref<boolean>(false);

const drop_file = (e) => {
  console.log(e.dataTransfer.files[0]);
};
const toggle_active = () => {
  in_drop_zone.value = !in_drop_zone.value;
};
provide("in_drop_zone", in_drop_zone);
</script>

<template>
  <div
    @dragenter.prevent="toggle_active"
    @dragleave.prevent="toggle_active"
    @dragover.prevent
    @drop.prevent="drop_file"
    :class="{ 'file--is--in--zone': in_drop_zone }"
    class="drop-wrapper__container"
  >
    <DropZone />
  </div>
</template>

<style scoped></style>
