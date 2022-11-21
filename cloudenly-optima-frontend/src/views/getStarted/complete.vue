<template>
  <s-modal :modal="true">
    <div class="welcome flex items-center bg-white rounded p-6">
      <div class="w-6/12 px-12"></div>

      <div class="w-6/12 px-12">
        <h2 class="font-semibold mb-4" style="font-size: 18px">
          First Time Setup Complete
        </h2>

        <p class="leading-8 mb-16 text-justify">
          You are all set now! Remember you still have more settings to complete
          for full functionalities to be effective. You can head over to
          settings (on the top navigaation) to complete them at your own
          convenience. For now, yu can start using Optima or take a mini tour to
          explain a few things around here.
        </p>

        <div class="flex justify-between items-center">
          <s-button
            class="bg-primary-optima-color text-white px-8"
            @click="$emit('proceed')"
          >
            Finish Setup
          </s-button>

          <!-- <button
          class="text-primary-optima-color font-medium"
          @click="$router.push({ name: 'CrmRegistration' })"
        >
          Start Mini Tour
        </button> -->
        </div>
      </div>
    </div>
  </s-modal>
</template>

<script>
import image_logo from "@/assets/images/optimaAsset/getStarted/logo.svg";

export default {
  name: "GetStartedCompleteSetup",
  data() {
    return {
      image_logo,
    };
  },
};
</script>

<style>
.welcome {
  background: url("../../assets/images/optimaAsset/getStarted/welcome_bg.svg")
    no-repeat;
  background-size: cover;
  height: 500px;
  width: 900px;
}
</style>
