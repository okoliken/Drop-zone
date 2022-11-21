<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold capitalize">
          Assign Inventory to Outlet
        </h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>
      <div class="my-6 inline-flex">
        <div>
          <span class="text-base">  <input type="radio" v-model="selectedOutlet" value="currentOutlet" class="cursor-pointer bg-cloudenly-primary-main" /> Assign To Current Outlet</span>
        </div>
        <div class="ml-6">
          <span class=" text-base"><input type="radio" v-model="selectedOutlet" value="newOutlet" class="cursor-pointer bg-cloudenly-primary-main" /> Assign to Other Outlet(s)</span>
        </div>
      </div>

      <s-select v-if="selectedOutlet === 'newOutlet'"
        label="Outlet Name"
        :width="280"
        :options="outlets"
        :error="validateName"
        class="mb-8"
        v-model="$v.name.$model"
      />
      <s-text v-else
        label="Current Outlet"
        :width="280"
        class="mb-8"
        v-model="currentOutlet[0].name"
        disabled
      />

      <s-content-seperator class="my-8" />

      <div class="flex justify-between"  v-if="selectedOutlet === 'newOutlet'">
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
          Yes, Proceed
        </s-button>
       
      </div>
      
      <div class="flex justify-between"  v-else>
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="handleClose"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white capitalize"
          @click="handleSubmit"
        >
          Yes, Proceed
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
  name: "AssignToOtherOutletModal",
  components: { SModal },
  props: {
    value: Boolean,
    outlets: Array
  },
  model: {
    event: "modified"
  },
  data() {
    return {
      image_close,
      name: "",
      selectedOutlet:'newOutlet'
    };
  },
  validations: {
    name: { required }
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      }
    },
    validateName() {
      if (this.$v.name.$dirty && !this.$v.name.required)
        return ["Enter a valid name"];
    },
    currentOutlet(){
      return this.$store.state.auth.auth.userData.outlets
    }
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
        // eslint-disable-next-line no-console
        console.log("VALIDATION ERROR");
      } else {
        this.$emit("proceed", this.name);
        this.handleReset();
      }
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // TODO use something like sentry to track errors like these
        // eslint-disable-next-line no-console
        console.log("VALIDATION ERROR");
      } else {
        this.$emit("submit");
        this.handleReset();
      }
    }
  },
};
</script>

<style></style>
