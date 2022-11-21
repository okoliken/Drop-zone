<template>
  <s-modal :modal="true">
    <div class="block bg-white text-right">
      <button @click="$emit('skip')" class="p-4 m-3 text-2xl">skip</button>
    </div>
    <div class="welcome flex items-center bg-white rounded px-12">
      <div class="w-6/12 px-12"></div>

      <div class="w-6/12 px-12">
        <h2 class="font-semibold mb-2" style="font-size: 18px">
          Welcome to Cloudenly’s
        </h2>

        <div class="mb-6">
          <img :src="image_logo" alt="logo" />
        </div>

        <p class="leading-8 mb-3 text-justify">
          Deliver a superior customer experience and operational efficiency with
          integrated customer relationship management, commerce, and accounting
          software. Adapt quickly, extend the business reach, and reduce cost.
        </p>

        <p class="leading-8 mb-8 text-justify">
          To be able to start off on the right footing, there are a few settings
          you need to complete. These are necessary for first time use.
        </p>

        <s-button
          class="bg-primary-optima-color text-white px-6"
          @click="$emit('proceed')"
        >
          Continue
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import image_logo from "@/assets/images/optimaAsset/getStarted/logo.svg";

export default {
  name: "GetStartedWelcome",
  data() {
    return {
      image_logo,
    };
  },
};
</script>

<style scoped>
.welcome {
  background: url("../../assets/images/optimaAsset/getStarted/welcome_bg.svg")
    no-repeat;
  background-size: cover;
  height: 500px;
  width: 900px;
  box-shadow: 0px 4px 10px rgba(17, 21, 25, 0.1);
}
</style>
