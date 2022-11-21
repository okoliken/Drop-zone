<template>
  <div>
    <!-- password modal -->
    <s-modal :modal="modal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px;"
      >
        <div class="flex items-center justify-between mb-10">
          <h2 class="font-semibold" style="font-size: 15px;">
            Update Password
          </h2>

          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>

        <s-text
          autocomplete="off"
          label="Old Password:"
          class="mb-8"
          type="password"
          placeholder="Enter password"
          :error="validatePreviousPassword"
          v-model="$v.password.previousPassword.$model"
        />

        <s-text
          label="New Password:"
          class="mb-8"
          type="password"
          placeholder="Enter password"
          :error="validateNewPassword"
          v-model="$v.password.newPassword.$model"
        />

        <s-text
          label="Confirm Password:"
          class="mb-8"
          type="password"
          placeholder="Enter password"
          :error="passwordMismatchValidation"
          v-model="password.confirmPassword"
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
            @click="updatePassword"
          >
            Confirm
          </s-button>
        </div>
      </div>
    </s-modal>

    <div class="flex items-center py-8">
      <span class="mr-5">Password:</span>
      <span>•••••••••••••••</span>
    </div>

    <button
      class="text-primary-optima-color font-medium mt-6"
      :style="`${isSubmitting && 'color: #9BA0A7;'}`"
      @click="modal = true"
    >
      {{ isSubmitting ? "Updating..." : "Update" }}
    </button>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "AccountProfileUserProfileSecuritySettingsPassword",
  data() {
    return {
      image_close,
      modal: false,
      isSubmitting: false,
      password: {
        previousPassword: "",
        newPassword: "",
        confirmPassword: "",
        userId: this.$store.state.auth.auth.authData.creatorId,
      },
    };
  },
  validations: {
    password: {
      previousPassword: { required },
      newPassword: { required },
    },
  },
  computed: {
    passwordMismatchValidation() {
      return this.password.newPassword !== this.password.confirmPassword
        ? ["Passwords don't match"]
        : [];
    },
    validatePreviousPassword() {
      if (
        this.$v.password.previousPassword.$dirty &&
        !this.$v.password.previousPassword.required
      )
        return ["Previous password should not be empty"];
    },
    validateNewPassword() {
      if (
        this.$v.password.newPassword.$dirty &&
        !this.$v.password.newPassword.required
      )
        return ["Previous password should not be empty"];
    },
  },
  methods: {
    handleClose() {
      this.modal = false;
      this.resetPassword();
    },
    resetPassword() {
      this.password = {
        previousPassword: "",
        newPassword: "",
        confirmPassword: "",
        userId: this.$store.state.auth.auth.authData.creatorId,
      };

      this.$v.$reset();
    },
    async updatePassword() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          console.log("VALIDATION ERROR");
        } else {
          this.modal = false;
          this.isSubmitting = true;

          await this.$store.dispatch("auth/auth/updatePassword", this.password);

          this.isSubmitting = false;

          this.resetPassword();

          this.$vs.notify({
            title: "Password",
            text: "Password changed successfully",
            color: "primary",
            position: "top-right",
          });
        }
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;
        this.resetPassword();

        this.$vs.notify({
          title: "Password",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
};
</script>

<style></style>
