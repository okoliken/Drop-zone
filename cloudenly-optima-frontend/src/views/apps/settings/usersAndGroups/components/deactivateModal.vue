<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex items-center justify-between w-full mb-5">
        <h2 class="font-semibold" style="font-size: 15px;">
          <slot name="title">Deactivate User</slot>
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleReset"
        />
      </div>

      <p class="mb-10">
        <slot name="text">Are you sure you want to deactivate this user?</slot>
      </p>

      <div class="flex">
        <s-text
          label="Reason for Deactivation (Optional):"
          placeholder="Enter Reason"
          v-model="deactivationReason"
        />
      </div>

      <s-content-seperator class="my-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="handleReset"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="handleProceed"
        >
          Deactivate
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "DeactivateModal",
  components: { SModal },
  props: {
    value: Boolean,
    payload: Array,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
      deactivationReason: "",
      isSubmitting: false,
    };
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
  methods: {
    handleReset() {
      this.modal = false;
      this.deactivateReason = "";
      this.$emit("reset");
    },

    handleProceed() {
      this.$emit("proceed", this.deactivationReason);
      this.handleReset();
    },
  },
};
</script>

<style></style>
