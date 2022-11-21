<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold capitalize">{{ operation }} Loyalty Scheme</h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>

      <s-text
        label="Loyalty Name"
        :width="280"
        class="mb-8"
        placeholder="Enter loyalty name"
        :error="validateCategory"
        v-model="$v.category.$model"
      />

      <s-text
        label="Discount Rate (%)"
        type="number"
        :width="280"
        class="mb-8"
        placeholder="Enter loyalty rate"
        :error="validateRate"
        v-model.number="$v.rate.$model"
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
          {{ operation }}
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
  name: "LoyaltyModal",
  components: { SModal },
  props: {
    value: Boolean,
    loyaltyCategory: String,
    discountRate: [Number, String],
    operation: String,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
      isSubmitting: false,
    };
  },
  validations: {
    category: { required },
    rate: { required },
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
    category: {
      get() {
        return this.loyaltyCategory;
      },
      set(val) {
        this.$emit("loyalty-category", val);
      },
    },
    rate: {
      get() {
        return this.discountRate;
      },
      set(val) {
        this.$emit("discount-rate", val);
      },
    },
    validateCategory() {
      if (this.$v.category.$dirty && !this.$v.category.required)
        return ["Enter a valid name"];
    },
    validateRate() {
      if (this.$v.rate.$dirty && !this.$v.rate.required)
        return ["Enter a valid rate"];
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
        console.log("VALIDATION ERROR");
      } else {
        this.$emit("proceed", this.operation);
        this.handleReset();
      }
    },


  },
};
</script>

<style></style>
