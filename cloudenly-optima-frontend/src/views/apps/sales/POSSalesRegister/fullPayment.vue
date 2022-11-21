<template>
  <div>
    <div class="mt-10 flex space-x-3 items-center">
        <div>
          <label class="text-base" for="">Amount Due: </label>
          <s-select :width="100" default-option="NGN" class="mt-3" />
        </div>
        <div class="mt-6">
          <s-text
            placeholder="--Enter--"
            :width="350"
            class=""
            v-model="amount"
          />
        </div>
        <div>
          <label class="text-base" for="">Payment Type: </label>
          <s-select
            :width="400"
            class="mt-3"
            :options="paymentTypes"
          />
        </div>
      </div>
  </div>
</template>

<script>
import sSelect from '../../../../components/scellooComponents/v1/sSelect.vue';
export default {
  components: { sSelect },
  name: 'FullPayment',
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
      paymentTypes: [
          { name: "POS", id: "pos" },
          { name: "Cash", id: "cash" },
      ],
    }
  },

}

</script>
