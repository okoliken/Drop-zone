<script setup lang="ts">
import { inject, ref } from "vue";

const image = inject("dropped_file");

const file = ref<File>(null);
const select_file = (e) => {
  file.value = e.target.files[0];
};
</script>

<template>
  <div class="drop__spot">
    <span class="material-symbols-outlined mui--size"> cloud_upload </span>
    <h3>Drag&Drop files here</h3>
    <p>or</p>

    <div>
      <label class="select-a-file" for="selectFile"> Browse files </label>

      <input @change="select_file" type="file" hidden id="selectFile" />
    </div>
    <div class="file" v-if="image">
      <img class="user-img-fluid" :src="image" />
    </div>
  </div>
</template>
