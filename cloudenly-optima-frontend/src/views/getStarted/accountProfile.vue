<template>
  <s-modal :modal="true">
      <div class="block bg-white text-right">
        <button @click="$emit('skip')"  class=" p-4 m-3 text-2xl">skip</button>
      </div>
    <div class="account-profile flex items-center bg-white rounded p-6">
      <div class="w-6/12 px-12"></div>

      <div class="w-6/12 px-12">
        <h2 class="font-bold mb-4" style="font-size: 18px">Account Profile</h2>

        <p class="leading-8 mb-8 text-justify">
          Setup your profile and organization’s details. This is where your
          personal and organization’s information is. This includes name of
          organization, industry sector and specialization, registration number
          and address, among others.
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
            class="bg-primary-optima-color text-white px-8"
            @click="$emit('proceed')"
          >
            Next
          </s-button>
        </div>

        <ol class="Stepper mt-20">
          <li class="Stepper__step active"></li>

          <li class="Stepper__step"></li>
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
  name: "GetStartedWelcome",
  data() {
    return {
      image_logo,
    };
  },
};
</script>

<style lang="scss">
@use 'sass:math';
.account-profile {
  background: url("../../assets/images/optimaAsset/getStarted/account_owner_bg.svg")
    no-repeat;
  background-size: cover;
  height: 500px;
  width: 900px;
}

$stepperSize: 250px;
$circleWidth: 30px;

$stepNumberSize: 12px;
$stepTitleSize: 5px;

$stepNumber: 4;

$primaryColor: rgb(16, 52, 156);
$lightGrey: rgb(233, 233, 233);

.Stepper {
  width: $stepperSize;
  display: flex;
  flex-flow: row;
  position: relative;
  counter-reset: step-count;

  li {
    position: absolute;
    top: 0;
    &:nth-child(1) {
      left: 0%;
    }
    &:nth-child(2) {
      left: calc(43%);
    }
    &:nth-child(3) {
      left: calc(85%);
    }
    &:nth-child(4) {
      left: 125%;
    }

    // LINE BETWEEN CIRCLE
    &:not(:last-child):before {
      position: absolute;
      top: math.div($circleWidth, 2);
      left: $circleWidth;
      content: "";
      height: 2.5px;
      width: math.div($stepperSize, $stepNumber) + math.div($circleWidth, 2);
      background: $lightGrey;
    }

    // NUMBER WITH CIRCLE
    &:after {
      content: counter(step-count);
      counter-increment: step-count;
      position: absolute;
      top: 0;
      width: $circleWidth;
      height: $circleWidth;
      display: block;
      border-radius: 50%;
      line-height: $circleWidth;
      text-align: center;
      font-weight: 800;
      font-size: $stepNumberSize;
      background: white;
      color: #999;
      border-style: solid;
      border-width: 0px 0px 0px 3px;
      border-color: $lightGrey;
    }

    &.active {
      h3 {
        color: $primaryColor;
        font-weight: 700;
      }
      &:after {
        color: white;
        border-color: $primaryColor;
        background: $primaryColor;
      }
    }

    &.passed {
      &:before {
        background: $primaryColor;
      }
      &:after {
        color: $primaryColor;
        border-style: solid;
        border-width: 1px;
        border-color: $primaryColor;
      }
    }
  }
}
</style>
