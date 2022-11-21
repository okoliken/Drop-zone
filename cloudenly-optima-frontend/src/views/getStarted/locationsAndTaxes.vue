<template>
  <s-modal :modal="true">
      <div class="block bg-white text-right">
        <button @click="$emit('skip')"  class=" p-4 m-3 text-2xl">skip</button>
      </div>
    <div class="location-tax flex items-center bg-white rounded p-6">
      <div class="w-6/12 px-12"></div>

      <div class="w-6/12 px-12">
        <h2 class="font-semibold mb-4" style="font-size: 18px">
          Location and Taxes
        </h2>

        <p class="leading-8 mb-8 text-justify">
          Setup your business locations, and taxes based on these locations.
          Taxes are different based on locations and will be automatically
          applied when carrying out sales. Specify whether said locations are
          tax exclusive or exclusive
        </p>

        <div class="flex items-center mb-12">
          <button
            class="font-medium text-primary-optima-color"
            style="font-size: 16px"
            @click="$emit('setup')"
          >
            <b>Setup Now</b>
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

          <li class="Stepper__step passed"></li>
          <li class="Stepper__step passed"></li>
          <li class="Stepper__step active"></li>
        </ol>
      </div>
    </div>
  </s-modal>
</template>

<script>
import image_logo from "@/assets/images/optimaAsset/getStarted/logo.svg";

export default {
  name: "GetStartedLocationsAndTaxes",
  data() {
    return {
      image_logo,
    };
  },
};
</script>

<style>
.location-tax {
  background: url("../../assets/images/optimaAsset/getStarted/location_tax_bg.svg")
    no-repeat;
  background-size: cover;
  height: 500px;
  width: 900px;
}
</style>
