<template>
  <div>
    <div class="bg-white py-8 px-3">
    <div>
      <h1 class="font-medium mt-10 text-xl ml-3">
        You can activate the Virtual NUBAN Account, the Direct Debit or both to
        manage your payments.
      </h1>
      <paymentTabs class="mt-8" />
    </div>
    </div>
  </div>
</template>
<script>
import paymentTabs from "./paymentTabs.vue";

export default {
  components:{
    paymentTabs
  }
}
</script>