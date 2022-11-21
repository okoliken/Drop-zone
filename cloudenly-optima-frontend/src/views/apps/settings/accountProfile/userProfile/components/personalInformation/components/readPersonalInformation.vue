<template>
  <div class="bg-white grid grid-cols-12 row-gap-10 gap-10 p-6 rounded">
    <h2 class="col-span-12 font-semibold">Personal Information</h2>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">First Name:</div>
      <div class="col-span-8 capitalize">
        {{ userProfile.fname }}
      </div>
    </div>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">Middle Name:</div>
      <div class="col-span-8 capitalize">
        {{ userProfile.mname }}
      </div>
    </div>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">Last Name:</div>
      <div class="col-span-8 capitalize">
        {{ userProfile.lname }}
      </div>
    </div>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">Gender:</div>
      <div class="col-span-8 capitalize">
        {{ userProfile.gender }}
      </div>
    </div>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">Email Address:</div>
      <div class="col-span-8 capitalize">
        {{ userProfile.email }}
      </div>
    </div>

    <div class="col-span-4 grid grid-cols-12">
      <div class="col-span-4 font-medium">Phone Number:</div>
      <div class="col-span-8">
        {{ userProfile.phoneNo }}
      </div>
    </div>

    <div class="col-span-12 mt-10">
      <s-button
        class="px-8 bg-primary-optima-color text-white"
        @click="$emit('editable')"
      >
        Update
      </s-button>
    </div>

    <s-content-seperator />
  </div>
</template>

<script>
export default {
  name: "AccountProfileUserProfilePersonalInformationView",
  props: { userProfile: Object },
};
</script>

<style></style>
