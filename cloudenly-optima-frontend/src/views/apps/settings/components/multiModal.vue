<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 400px; font-size: 14px;"
    >
      <div class="flex justify-between w-full mb-10">
        <h2 class="font-semibold" style="font-size: 15px;">
          <slot name="title">Two-Factor Authentication</slot>
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>

      <p class="mb-5 leading-7">
        <slot name="body">
          Receive an email with an authentication code everytime you login to
          your account.
        </slot>
      </p>

      <s-text
        class="mb-8"
        :type="inputType"
        :placeholder="placeholder"
        :width="280"
        :error="validateTextValue"
        v-model="$v.textValue.$model"
      />

      <s-content-seperator class="mt-12 mb-6" />

      <div class="flex justify-between">
        <s-button
          class="bg-light-optima-color text-primary-optima-color px-8"
          @click="handleClose"
        >
          Close
        </s-button>

        <s-button
          class="bg-primary-optima-color text-white px-8"
          @click="handleProceed"
        >
          Confirm
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
  name: "MultiModal",
  components: { SModal },
  props: {
    value: Boolean,
    placeholder: {
      type: String,
      default: "Enter verified email address",
    },
    inputType: {
      type: String,
      default: "text",
    },
  },
  model: {
    event: "modified",
  },
  data() {
    return { image_close, textValue: "" };
  },
  validations: {
    textValue: { required },
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
    validateTextValue() {
      if (this.$v.textValue.$dirty && !this.$v.textValue.required)
        return ["Value is invalid"];
    },
  },
  methods: {
    handleClose() {
      this.handleReset();
      this.$emit("close");
    },
    handleReset() {
      this.modal = false;
      this.textValue = "";
      this.$v.$reset();
    },
    handleProceed() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // TODO use something like sentry to track errors like these
        console.log("VALIDATION ERROR");
      } else {
        this.$emit("proceed", this.textValue);
        this.handleReset();
      }
    },
  },
};
</script>

<style></style>
