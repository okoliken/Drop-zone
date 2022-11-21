<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex items-center justify-between w-full mb-10">
        <h2 class="font-medium" style="font-size: 15px;">
          Pending Transactions •
          <span class="text-secondary-optima-color capitalize">{{
            payload.name
          }}</span>
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="modal = false"
        />
      </div>

      <div v-for="i in 2" :key="i">
        <div class="flex items-center justify-between mb-4">
          <div class="font-medium">Invoice #EN-110EM</div>

          <div class="flex items-center">
            <small class="font-normal">12th October, 2020</small>
            <small class="ml-4 font-normal">09:23 AM</small>
          </div>
        </div>

        <div class="flex items-center justify-between mb-6">
          <div class="font-medium">₦340,650.90</div>
          <div>
            • Status: <span class="text-danger-optima-color">Unpaid</span>
          </div>
          <div>
            • Validity: <span class="text-secondary-optima-color">2 Weeks</span>
          </div>
        </div>

        <div class="flex items-center">
          <button class="text-primary-optima-color font-medium">
            Open Invoice
          </button>

          <button class="ml-5 text-secondary-optima-color font-medium">
            • Send a Reminder
          </button>
        </div>

        <div
          class="my-5"
          style="height: 40px; border-left: 1px solid #eee;"
          v-if="i !== 2"
        />
      </div>

      <s-content-seperator class="mb-8 mt-20" />

      <div class="flex justify-end">
        <s-button
          class="px-8 bg-primary-optima-color text-white"
          @click="modal = false"
        >
          Close
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "PendingTransactionsModal",
  components: { SModal },
  props: {
    value: Boolean,
    payload: Object,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
    };
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
};
</script>

<style></style>
