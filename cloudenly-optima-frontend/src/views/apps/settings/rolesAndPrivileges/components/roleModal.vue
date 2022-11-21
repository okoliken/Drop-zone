<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold">Create Role</h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleReset"
        />
      </div>

      <s-text
        label="Name"
        :width="280"
        class="mb-8"
        placeholder="Enter role name"
        :error="validateName"
        v-model="$v.roleDetails.name.$model"
      />

      <s-select
        label="Reference"
        defaultOption="Select reference role"
        :options="roles"
        :width="280"
        :error="validateReference"
        v-model="$v.roleDetails.referenceId.$model"
      />

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
          @click="handleProceed"
        >
          Continue
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
  name: "RoleModal",
  components: { SModal },
  props: {
    value: Boolean,
    roles: Array,
    data: Object,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
      isSubmitting: false,
      //   roleDetails: {
      //     name: "",
      //     referenceId: "",
      //   },
    };
  },
  validations: {
    roleDetails: {
      name: { required },
      referenceId: { required },
    },
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
    roleDetails() {
      return this.data;
    },
    // roleDetails: {
    //   get() {
    //     return this.data;
    //   },
    //   set(val) {
    //     console.log("===------>>", val);
    //   },
    // },
    validateReference() {
      if (
        this.$v.roleDetails.referenceId.$dirty &&
        !this.$v.roleDetails.referenceId.required
      )
        return ["Select a valid reference"];
    },
    validateName() {
      if (this.$v.roleDetails.name.$dirty && !this.$v.roleDetails.name.required)
        return ["Select a valid name"];
    },
  },
  methods: {
    handleReset() {
      this.modal = false;

      this.roleDetails = {
        name: "",
        referenceId: "",
      };

      this.$v.$reset();
    },
    handleProceed() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // TODO use something like sentry to track errors like these
        // console.log("VALIDATION ERROR");
      } else {
        this.$emit("proceed", this.roleDetails);
        this.handleReset();
      }
    },
  },
};
</script>

<style></style>
