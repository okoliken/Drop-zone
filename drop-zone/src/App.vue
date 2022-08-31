<script setup lang="ts">
import { ref, provide } from "vue";
import DropZone from "./components/drop-zone.vue";

// interface Profile {
//   userFile: File | URL;
// }

const in_drop_zone = ref<boolean>(false);
const dropped_file = ref(null);

const drop_file = (e) => {
  in_drop_zone.value = !in_drop_zone.value;
  if (e) {
    dropped_file.value = URL.createObjectURL(e.dataTransfer.files[0]);
  } else return;
};

const toggle_active = () => {
  in_drop_zone.value = !in_drop_zone.value;
};
provide("dropped_file", dropped_file);
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
