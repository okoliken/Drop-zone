<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px"
    >
      <div class="flex items-center justify-between w-full mb-5">
        <h2 class="font-medium" style="font-size: 15px">
          Add to Loyalty Scheme
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleReset"
        />
      </div>

      <p class="mb-10">* You have selected {{ payload.length }} contact(s)</p>

      <div class="flex">
        <s-select
          label="Select Loyalty Scheme:"
          :options="allLoyalty"
          :width="280"
          select-key="loyaltyCategory"
          :error="validateLoyalty"
          v-model="$v.loyaltyId.$model"
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
          @click="handleLoyalty"
        >
          Add
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "LoyaltyModal",
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
      loyaltyId: "",
      isSubmitting: false,
    };
  },
  validations: {
    loyaltyId: { required },
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

    validateLoyalty() {
      if (this.$v.loyaltyId.$dirty && !this.$v.loyaltyId.required)
        return ["Select a valid loyalty scheme"];
    },
  },
  methods: {
    handleReset() {
      this.modal = false;
      this.loyaltyId = "";
      this.$emit("reset");
      this.$v.$reset();
    },

    async handleLoyalty() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log(this.loyaltyId)
          console.log("VALIDATION ERROR");
        } else {
          const { authData: userInfo } = this.$store.state.auth.auth;

          this.isSubmitting = true;

         
          const payload = {
            userInfo,
            payload: {
              contactIds: this.payload.map((item) => item.id),
              loyaltySchemeId: this.loyaltyId,
            },
          };

          console.log(payload);

          const { data } = await this.$store.dispatch(
            "crm/contact/bulkSetLoyaltyCustomer",
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
        }
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
