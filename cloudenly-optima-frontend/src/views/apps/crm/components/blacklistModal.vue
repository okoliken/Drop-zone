<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex items-center justify-between w-full mb-5">
        <h2 class="font-medium" style="font-size: 15px;">
          Add to Blacklist
        </h2>
        <img
          :src="image_close"   
          alt="close"
          class="cursor-pointer text-red-600"
          @click="handleReset"
        />
      </div>

      <p class="mb-10" v-if="payload.length === 1">
        * Do you want to blacklist: ({{ payload[0].name }}) 
      </p>

      <p class="mb-10" v-else>
        * You have selected {{ payload.length }} customer(s) to be blacklisted
      </p>

      <div class="flex">
        <s-text
          label="Reason for Blacklisting:"
          placeholder="Enter Reason"
          v-model="suspendReason"  
        />
      </div>

      <s-content-seperator class="my-8" />

      <div class="flex justify-between">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          @click="handleReset"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="blacklistCustomer"
        >
          Blacklist
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "BlacklistModal",
  components: { SModal },
  props: {
    value: Boolean,
    payload: Array,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
      suspendReason: "",
      isSubmitting: false,
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
  methods: {
    handleReset() {
      this.modal = false;
      this.suspendReason = "";
      this.$emit("reset");
    },

    async blacklistCustomer() {
      try {
        this.isSubmitting = true;
        const { authData: userInfo } = this.$store.state.auth.auth;

        const payload = {
          userInfo,
          payload: {
            contactIds: this.payload.map((item) => item.id),
            isSuspended: true,
            suspendReason: this.suspendReason,
          },
        };

        const { data } = await this.$store.dispatch(
          "crm/contact/bulkBlacklistCustomer",
          payload
        );

        this.isSubmitting = false;
        this.$vs.notify({
          title: "Contact",
          text: data.message,
          color: "primary",
          position: "top-right",
        });

        this.handleReset();
      } catch (err) {
        console.log(err);

        this.isSubmitting = false;
        this.$vs.notify({
          title: "Contact",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });

        this.handleReset();
      }
    },
  },
};
</script>

<style></style>
