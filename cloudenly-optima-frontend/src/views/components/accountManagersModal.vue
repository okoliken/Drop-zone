<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex items-center justify-between w-full mb-2">
        <h2 class="font-medium" style="font-size: 15px;">
          Account Managers
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="modal = false"
        />
      </div>

      <p>All users assigned to this customer</p>

      <div class="text-center py-20" v-if="!managers.length">
        <div class="italic mb-5">No users assigned to this customer yet...</div>

        <button
          class="font-medium text-primary-optima-color"
          @click="$emit('proceed')"
        >
          Go to Settings
        </button>
      </div>

      <div class="pt-8 pb-12" v-else>
        <div class="flex mb-10" v-for="(manager, i) in managers" :key="i">
          <div class="mr-3">{{ i + 1 }}.</div>

          <div>
            <div class="mb-3 text-secondary-optima-color font-medium">
              {{ manager.fname }} {{ manager.lname }}
            </div>
            <div>
              {{ manager.phoneNo || "N/A" }} • {{ manager.email || "N/A" }}
            </div>
          </div>
        </div>
      </div>

      <s-content-seperator class="mb-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="modal = false"
        >
          Close
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          @click="$emit('proceed')"
        >
          Settings
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "AccountManagersModal",
  components: { SModal },
  props: {
    value: Boolean,
    payload: Array,
    managers: {
      type: Array,
      default: () => [],
    },
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
