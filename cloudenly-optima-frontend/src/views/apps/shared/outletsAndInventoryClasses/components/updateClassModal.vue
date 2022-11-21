<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold capitalize">
          Update Inventory Class
        </h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>

      <s-text
        label="Name"
        :width="280"
        class="mb-8"
        placeholder="Enter inventory class name"
        :error="validateName"
        v-model="$v.name.$model"
      />

      <s-content-seperator class="my-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="handleClose"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white capitalize"
          @click="handleProceed"
        >
          Update
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "NewClassModal",
  components: { SModal },
  props: {
    value: Boolean,
    inventoryName: String,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
    };
  },
  validations: {
    name: { required },
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
    name: {
      get() {
        return this.inventoryName;
      },
      set(val) {
        this.$emit("inventory-name", val);
      },
    },
    validateName() {
      if (this.$v.name.$dirty && !this.$v.name.required)
        return ["Enter a valid name"];
    },
  },
  methods: {
    handleReset() {
      this.modal = false;
      this.$v.$reset();
    },
    handleClose() {
      this.$emit("close");
      this.handleReset();
    },
    handleProceed() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // TODO use something like sentry to track errors like these
        // console.log("VALIDATION ERROR");
      } else {
        this.$emit("proceed");
        this.handleReset();
      }
    },
  },
};
</script>

<style></style>
