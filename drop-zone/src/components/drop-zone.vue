<script setup lang="ts"></script>

<template>
  <div class="drop__spot">
    <span class="material-symbols-outlined mui--size"> cloud_upload </span>
    <h3>Drag&Drop files here</h3>
    <p>or</p>

    <div>
      <label class="select-a-file" for="selectFile"> Browse files </label>

      <input type="file" hidden id="selectFile" />
    </div>
  </div>
</template>
