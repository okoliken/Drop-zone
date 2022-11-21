<template>
  <div
    class="grid grid-cols-12 row-gap-12 col-gap-16 gap-10 bg-white p-6 rounded"
  >
    <h2 class="font-semibold col-span-12">
      Personal Information
      <span class="text-secondary-optima-color ml-3" style="font-size: 13px"
        >Edit</span
      >
    </h2>

    <s-text
      label="First Name:"
      class="col-span-4"
      v-model="userProfile.fname"
    />

    <s-text
      label="Middle Name:"
      class="col-span-4"
      v-model="userProfile.mname"
    />

    <s-text label="Last Name:" class="col-span-4" v-model="userProfile.lname" />

    <s-select
      label="Gender:"
      :options="genderList"
      class="col-span-4"
      v-model="userProfile.gender"
    />

    <s-text
      label="Email Address:"
      class="col-span-4"
      v-model="userProfile.email"
    />

    <s-text
      label="Phone Number:"
      class="col-span-4"
      v-model="userProfile.phoneNo"
    />

    <div class="col-span-12 mt-10 flex items-center">
      <s-button
        class="px-8 bg-primary-optima-color text-white"
        :loading="isSubmitting"
        @click="handleSave"
      >
        Save
      </s-button>

      <s-button
        class="font-medium ml-8"
        style="color: #5e646d"
        @click="$emit('editable')"
      >
        Cancel
      </s-button>
    </div>

    <s-content-seperator />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: "AccountProfileUserProfilePersonalInformationUpdate",
  props: {
    initialUserProfile: Object,
  },
  data() {
    return {
      userProfile: { ...this.initialUserProfile },
      genderList: ["Male", "Female"],
      isSubmitting: false,
    };
  },
  methods: {
    async handleSave() {
      // console.log(this.userProfile);

      try {
        this.isSubmitting = true;

        const { data } = await this.$store.dispatch(
          "userOutlet/updateUser",
          this.userProfile
        );

        this.isSubmitting = false;

        this.$vs.notify({
          title: "User",
          text: "Profile Updated",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);

        this.$vs.notify({
          title: "User",
          text: err.response.data.message,
          color: "primary",
          position: "top-right",
        });
      }
    },
  },
};
</script>

<style></style>
