<template>
  <div>
    <div class="mt-10 flex space-x-3 items-center">
      <div>
        <label class="text-base" for="">Amount to Collect: </label>
        <s-select :width="100" default-option="NGN" class="mt-3" />
      </div>
      <div class="mt-6">
        <s-text placeholder="--Enter--" :width="350" class="-ml-6" />
      </div>
      <div>
        <label class="text-base mx-6" for="">Payment Type: </label>
        <s-select :width="400" :options="paymentType" class="mt-3 mx-6" />
      </div>
      <div>
        <label class="text-base mx-6" for="">POS ID : </label>
        <s-text :width="400" :options="paymentType" class="mt-3 mx-6" />
      </div>
    </div>
    <div class="mt-10 flex space-x-3 items-center">
      <div>
        <label class="text-base" for="">Amount to Collect: </label>
        <s-select :width="100" default-option="NGN" class="mt-3" />
      </div>
      <div class="mt-6">
        <s-text placeholder="--Enter--" :width="350" class="-ml-6" />
      </div>
      <div>
        <label class="text-base mx-6" for="">Payment Type: </label>
        <s-select :width="400" :options="paymentType" class="mt-3 mx-6" />
      </div>
      <div>
        <label class="text-base mx-6" for="">POS ID : </label>
        <s-text :width="400" :options="paymentType" class="mt-3 mx-6" />
      </div>
    </div>
    <!-- <div class="flex justify-end mx-4 -mt-10 ">
      <p class=" text-cloudenly-primary-main cursor-pointer">Add</p>
    </div> -->

    <div class="mt-6 flex space-x-3">
      <p class=" text-cloudenly-primary-main font-semibold mt-4">TOTAL:</p>
      <p class=" text-cloudenly-primary-main font-semibold mx-6 mt-4">0.00</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "splitPayment",
  props: {
    amount:{
      type: String,
      required: false
    },
    payment:{
      type: String,
      required: false
    },
  },
  data() {
    return {
      paymentType: [
        { name: "POS", id: "pos" },
        { name: "Cash", id: "cash" }
      ]
    };
  },
};
</script>
