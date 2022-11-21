<template>
  
  
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal" 
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold capitalize" v-if="isBrand">
          {{ operation }} Brand
        </h1>

        <h1 class="font-semibold capitalize" v-else> 
          {{ operation }} Category 
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
        :placeholder="`Enter ${isBrand ? 'brand' : 'category'} name`"
        :error="validateName"
        v-model="$v.name.$model"
      />

      <s-multi-select
        :label="`${!isBrand ? 'Brand' : 'Category'}`"
        :defaultOption="`Select ${!isBrand ? 'brand(s)' : 'category(s)'}`"
        :options="options"
        :width="280"
        v-model="items"
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
  name: "BrandModal",
  components: { SModal },
  props: {
    value: Boolean,
    initialName: String,
    initialItems: Array,
    options: Array,
    operation: String,
    isBrand: Boolean,
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
        return this.initialName;
      },
      set(val) {
        this.$emit("name", val);
      },
    },
    items: {
      get() {
        return this.initialItems;
      },
      set(val) {
        this.$emit("items", val); 
      },
    },
    validateName() {
      if (this.$v.name.$dirty && !this.$v.name.required)
        return ["Select a valid name"];
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
