<template>
  <div class="bg-white">
    <div class="bg-white p-56 flex items-center space-x-20 justify-center">
      <div><img :src="illustration" alt="illustration" /></div>
      <div class="">
        <div class="text-cloudenly-primary-main text-base mb-5">
          There are no POS sales at the moment
        </div>
        <div class="text">
          When a customer initiates an action or submits a form / <br />
          document, they show up here
     </div>
        <div
          class="
            mt-10
            bg-cloudenly-primary-main
            px-8
            py-4
            text-white text-center
            cursor-pointer
            rounded-full
            w-2/4
          "
          @click="$router.push({ name: 'createNewSale' })"
        >
          Create new
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

export default {
  data() {
    return {
      illustration,
    };
  },
};
</script>

<style>
</style>