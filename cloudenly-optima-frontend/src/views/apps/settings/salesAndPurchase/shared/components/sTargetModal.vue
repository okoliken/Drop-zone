<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal" 
      style="width: 620px; font-size: 14px;">
      <div class="flex justify-between items-center mb-10">

        <h1 class="font-semibold capitalize" > 
          {{ operation }} target
        </h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>

      <div class="flex justify-between">
           <div class="mb-10">
        <label class="block mb-3 font-medium">Month:</label>
       <s-text :width="280" type="date" />
    </div>
   
    
      <div>
           <label class="block mb-3 font-medium">Outlet:</label>
            <s-multi-select
                :label="Month"
                :defaultOption="`-- Enter / Select Outlet --`"
                :options="options"
                :width="280"
                v-model="items"
      />
      </div>
      </div>

      <div class="flex justify-between">
          <div class="text-black">
               <s-text
                label="Min. Sales Volume (₦)"
                :width="280"
                class="mb-8 "
                :placeholder="`-- Enter --`"
                v-model="$v.name.$model"
            />
          </div>

           <div class="text-black">
               <s-text
                label="Sales Target (₦)"
                :width="280"
                class="mb-8 ml-8"
                :placeholder="`-- Enter --`"
                v-model="$v.name.$model"
            />
          </div>
          <div>

          </div>
      </div>

      <!--  -->

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
