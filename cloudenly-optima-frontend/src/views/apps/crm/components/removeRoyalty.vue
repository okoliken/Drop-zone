<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white py-3 font-normal"
      style="width: 450px; font-size: 14px"
    >
      <div class="flex items-center justify-between w-full mb-5">
        <h2 class="font-medium" style="font-size: 15px">
          Remove From Loyalty Scheme
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleReset"
        />
      </div>

      <div class="flex">
        <!-- <s-select
          label="Select Loyalty Scheme:"
          :options="allLoyalty"
          :width="280"
          select-key="loyaltyCategory"
          :error="validateLoyalty"
          v-model="$v.loyaltyId.$model"
        /> -->
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
          @click="handleRemoveLoyalty"
        >
          Remove
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
// import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "RemoveLoyaltyModal",
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
      isSubmitting: false,
    };
  },

  computed: {
    ...mapGetters("crm/loyalty", ["allLoyalty"]),

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
      this.$emit("reset");
      //   this.$v.$reset();
    },

    async handleRemoveLoyalty() {
      console.log(this.payload, "this is the payload");

      try {
        const { authData: userInfo } = this.$store.state.auth.auth;
        this.isSubmitting = true;
        const payload = {
          userInfo,
          payload: {
            loyaltyId: this.payload.loyaltySchemeId,
            contacts: [
              {
                customerId: this.payload.id,
                name: this.payload.name,
                email:  this.payload.email,
                contactCategory: this.payload.customerPriceReference,
              },
            ],
          },
        };

        console.log(payload)
        const { data } = await this.$store.dispatch(
          "crm/loyalty/removeContactFromLoyalty",
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
      }
    },
  },
  mounted() {
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
  },
};
</script>

<style></style>
