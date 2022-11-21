<template>
  <div style="font-size: 14px">
    <div v-if="getIsAccOwner || getCrmSettingPrivileges.viewPipelineMovement">
      <!-- view state -->
      <pipeline-movement @update="editable = true" v-if="!editable" />

      <!-- edit state -->
      <pipeline-settings @cancel="editable = false" v-else />
    </div>
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PipelineMovement from "@/views/components/pipeline/movement.vue";
import PipelineSettings from "@/views/components/pipeline/settings.vue";

export default {
  name: "SettingPipeline",
  components: {
    PipelineMovement,
    PipelineSettings,
  },
  data() {
    return {
      editable: false,
    };
  },

  computed: {
    ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"]),
  },
};
</script>

<style></style>
