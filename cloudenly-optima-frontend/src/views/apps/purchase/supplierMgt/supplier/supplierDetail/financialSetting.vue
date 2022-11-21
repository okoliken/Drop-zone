<template>
  <div>
    <div class="bg-white font-semibold p-6 mb-3 rounded">
      Accounts & Financial Information
    </div>

    <div class="bg-white py-8 px-6">
      <h2 class="font-medium col-span-12">Financial Information</h2>
      <div v-if="getIsAccOwner || getSupplierPrivileges.viewFinancialSetting">
        <div class="grid grid-cols-12 col-gap-16 row-gap-10">
          <div class="col-span-12 flex items-center">
            <span class="text-secondary-optima-color font-medium">Tax ID:</span>
            <span class="ml-8">{{ finance.taxId || "PA-12012-BM" }}</span>
          </div>

          <s-text
            label="Account Name:"
            class="col-span-4"
            v-model="finance.accountName"
          />

          <s-text
            label="Bank Name:"
            class="col-span-4"
            v-model="finance.bankName"
          />

          <s-text
            label="Account Number:"
            class="col-span-4"
            v-model="finance.accountNumber"
          />

          <!-- seperator -->
          <s-content-seperator class="mt-2" />

          <h2 class="font-medium col-span-12" style="color: #6f8de9">
            Account Balance
          </h2>

          <!-- outflow -->
          <div class="col-span-4">
            <div class="flex items-center mb-6">
              <img :src="image_up" alt="up arrow" class="mr-4" />

              <h3
                class="font-medium text-tetiary-optima-color"
                style="color: #f15846"
              >
                Account Outflow
              </h3>
            </div>

            <div class="flex items-center mb-10">
              <span class="w-6/12">Account Payable:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>

            <div class="flex items-center mb-10">
              <span class="w-6/12">Debit Balance:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>

            <div class="flex items-center">
              <span class="w-6/12">Total Outflow:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>
          </div>

          <!-- inflow -->
          <div class="col-span-4">
            <div class="flex items-center mb-6">
              <img :src="image_down" alt="down arrow" class="mr-4" />

              <h3 class="font-medium text-tetiary-optima-color">
                Account Inflow
              </h3>
            </div>

            <div class="flex items-center mb-10">
              <span class="w-6/12">Account Payable:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>

            <div class="flex items-center mb-10">
              <span class="w-6/12">Credit Balance:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>

            <div class="flex items-center">
              <span class="w-6/12">Total Outflow:</span>

              <span class="w-6/12">₦ 121,230.00</span>
            </div>
          </div>

          <!-- net balance -->
          <div class="col-span-4">
            <div class="flex items-center mb-6">
              <img :src="image_up" alt="up arrow" />
              <img :src="image_down" alt="down arrow" class="mr-4" />

              <h3 class="font-medium">Net Balance</h3>
            </div>

            <div class="flex items-center mb-10">
              <span class="w-6/12">Net Account:</span>

              <span class="w-6/12 text-tetiary-optima-color">₦ 30,000</span>
            </div>

            <div class="flex items-center">
              <span class="w-6/12">Total Balance:</span>

              <span class="w-6/12">₦ 25,960.00</span>
            </div>
          </div>

          <!-- seperator -->
          <s-content-seperator class="mb-10 mt-2" />
        </div>

        <s-button
        v-if="getIsAccOwner || getSupplierPrivileges.edit&UpdateFinancialSetting"
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="updateFinanceSetting"
        >
          Apply Changes
        </s-button>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import image_down from "@/assets/images/optimaAsset/supplier/settings/down.svg";
import image_up from "@/assets/images/optimaAsset/supplier/settings/up.svg";

export default {
  data() {
    return {
      isSubmitting: false,
      image_down,
      image_up,
      finance: {
        taxId: "",
        registrationNumber: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
      },
    };
  },
  methods: {
    updateFinanceSetting() {
      this.isSubmitting = true;
      const userInfo = this.$store.state.auth.auth.authData;
      const payload = {
        id: this.singleContact.id,
        userInfo: userInfo,
        data: {
          payload: {
            ...this.finance,
          },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          // console.log(resp.data)
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Contact Finance Setting",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Contact Finance Setting",
            text: "An error occured while updating financial settings",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.$store.dispatch("crm/contact/getSingleContact", id);

    this.finance = JSON.parse(
      JSON.stringify({ ...this.finance, ...this.singleContact })
    );
  },
};
</script>

<style></style>
