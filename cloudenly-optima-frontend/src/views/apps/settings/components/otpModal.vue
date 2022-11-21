<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 pb-12 font-normal"
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

      <p class="mb-8 leading-7">
        <slot name="body">
          Enter the confirmation code to turn on two-factor authentication. You
          can turn it off any time.
        </slot>
      </p>

      <v-otp-input
        ref="otpInput"
        input-classes="otp-input mr-4"
        separator=""
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="false"
        @on-complete="handleOnComplete"
      />
    </div>
  </s-modal>
</template>

<script>
import OtpInput from "@bachdgvn/vue-otp-input";
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "SecurityPolicyOtpModal",
  components: { "v-otp-input": OtpInput, SModal },
  props: {
    value: Boolean,
  },
  model: {
    event: "modified",
  },
  data() {
    return { image_close };
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
    handleOnComplete(code) {
      this.$emit("proceed", code);
      this.modal = false;
    },
    handleClose() {
      this.$emit("close");
      this.modal = false;
    },
  },
};
</script>

<style>
.otp-input {
  width: 35px;
  height: 35px;
  padding: 5px;
  /* margin: 0 10px; */
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  /* &.error {
    border: 1px solid red !important;
  } */
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
