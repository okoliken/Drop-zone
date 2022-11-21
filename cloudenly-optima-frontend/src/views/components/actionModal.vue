<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold">
          <slot name="title">Delete User</slot>
        </h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleReset"
        />
      </div>

      <p class="leading-6">
        <slot name="text">Are you sure you want to delete this user?</slot>
      </p>

      <s-content-seperator class="my-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="handleReset"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 text-white"
          :class="[!type ? 'danger' : 'bg-primary-optima-color']"
          @click="handleProceed"
        >
          Yes, Proceed
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "RoleModal",
  components: { SModal },
  props: {
    value: Boolean,
    type: String,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
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
    handleProceed() {
      this.handleReset();
      this.$emit("proceed");
    },

    handleReset() {
      this.modal = false;
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.danger {
  background-color: #f15846;
}
</style>
