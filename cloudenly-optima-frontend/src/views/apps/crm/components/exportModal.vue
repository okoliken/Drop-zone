<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex justify-between items-center mb-5">
        <h1 class="font-semibold">Export Your Contact</h1>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="modal = false"
        />
      </div>

      <p class="leading-6">
        You are about to export your contact register. <br />Note that the File
        Format is CSV
      </p>

      <s-content-seperator class="my-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="modal = false"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="exportContacts"
        >
          Export
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "ExportModal",
  components: { SModal },
  props: {
    value: Boolean,
    payload: Array,
  },
  data() {
    return {
      image_close,
      isSubmitting: false,
    };
  },
  model: {
    event: "modified",
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
  methods: {
    async exportContacts() {
      try {
        this.isSubmitting = true;
        const { data } = await this.$store.dispatch(
          "crm/contact/exportContact"
        );
        if (data) {
          this.isSubmitting = false;
          this.modal = false;
        } else {
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Contact",
            text: data.message,
            color: "danger",
            position: "top-right",
          });

          this.modal = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
