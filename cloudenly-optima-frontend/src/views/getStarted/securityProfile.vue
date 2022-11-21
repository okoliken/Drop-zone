<template>
  <s-modal :modal="true">
      <div class="block bg-white text-right">
        <button @click="$emit('skip')"  class=" p-4 m-3 text-2xl">skip</button>
      </div>
    <div class="security-profile flex items-center bg-white rounded p-6">
      <div class="w-6/12 px-12"></div>

      <div class="w-6/12 px-12">
        <h2 class="font-semibold mb-4" style="font-size: 18px">
          Security Policy
        </h2>

        <p class="leading-8 mb-8 text-justify">
          Setup your organization-wide security policy. Set password strength
          for all user accounts, enable or disable two-factor authentication and
          choose security questions to implement.
        </p>

        <div class="flex items-center mb-12">
          <button
            class="font-medium text-primary-optima-color"
            style="font-size: 16px"
            @click="$emit('setup')"
          >
            <b> Setup Now</b>
          </button>

          <div class="ml-8" style="color: gold">Pending</div>
        </div>

        <div class="flex items-center space-x-4">
          <s-button
            class="onboard-previous-btn-color px-8"
            @click="$emit('previous')"
          >
            Previous
          </s-button>

          <s-button
            class="bg-primary-optima-color text-white px-8"
            @click="$emit('proceed')"
          >
            Next
          </s-button>
        </div>

        <ol class="Stepper mt-20">
          <li class="Stepper__step passed"></li>

          <li class="Stepper__step active"></li>
          <li class="Stepper__step"></li>
          <li class="Stepper__step"></li>
        </ol>
      </div>
    </div>
  </s-modal>
</template>

<script>
import image_logo from "@/assets/images/optimaAsset/getStarted/logo.svg";

export default {
  name: "GetStartedUsersAndGroups",
  data() {
    return {
      image_logo,
    };
  },
};
</script>

<style>
.security-profile {
  background: url("../../assets/images/optimaAsset/getStarted/security_policy_bg.svg")
    no-repeat;
  background-size: cover;
  height: 500px;
  width: 900px;
}

.onboard-previous-btn-color{
  background-color:rgba(16,52,166,0.1) ;
  color: rgb(16,52,166);
}
</style>
