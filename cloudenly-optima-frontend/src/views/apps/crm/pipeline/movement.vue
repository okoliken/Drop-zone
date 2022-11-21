<template>
  <div class="font-normal">
    <back location="Pipeline Setting" class="mb-8" />

    <pipeline-movement @update="$router.push({ name: 'PipelineSettings' })" />
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
import PipelineMovement from "@/views/components/pipeline/movement.vue";

export default {
  name: "PipelineMovementPage",
  components: { Back, PipelineMovement },
};
</script>

<style></style>
