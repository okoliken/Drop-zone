<template>
  <div class="font-normal">
    <back location="Edit Pipeline Setting" class="mb-8" />

    <pipeline-settings @cancel="$router.back()" />
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
import PipelineSettings from "@/views/components/pipeline/settings.vue";

export default {
  name: "PipelineSettingsPage",
  components: { Back, PipelineSettings },
};
</script>

<style></style>
