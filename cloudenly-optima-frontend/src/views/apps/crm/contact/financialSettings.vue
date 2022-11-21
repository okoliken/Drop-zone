<template>
  <div>
    <div class="bg-white font-semibold p-6 mb-5">Financial Information</div>

    <div
      v-if="
        getIsAccOwner || getCustomerManagementPrivileges.viewFinancialSetting
      "
    >
      <div class="bg-white py-8 px-6">
        <div class="grid grid-cols-12 col-gap-16 row-gap-10 gap-10">
          <h2 class="font-medium col-span-12">Financial Information</h2>

          <s-text
            label="Account Name:"
            class="col-span-4"
            v-model="singleContact.accountName"
          />

          <s-text
            label="Bank Name:"
            class="col-span-4"
            v-model="singleContact.bankName"
          />

          <s-text
            label="Account Number:"
            class="col-span-4"
            v-model="singleContact.accountNumber"
          />

          <s-text
            label="Tax ID:"
            class="col-span-4"
            v-model="singleContact.taxId"
          />

          <!-- seperator -->
          <s-content-seperator class="mt-2" />

          <h2 class="font-medium col-span-12" style="color: #6f8de9">
            Account Balance
          </h2>

          <div class="col-span-3 font-medium">Credit Balance:</div>
          <div class="col-span-9">₦ 121,230.00</div>
          <div class="col-span-3 font-medium">Debit Balance:</div>
          <div class="col-span-9">₦ 12,980.00</div>
          <div class="col-span-3 font-medium">Loan Balance:</div>
          <div class="col-span-9">₦ 0.00</div>
          <div class="col-span-3 font-medium">Deposit Balance:</div>
          <div class="col-span-9">₦ 1,207,895.00</div>

          <!-- seperator -->
          <s-content-seperator class="mb-10 mt-2" />
        </div>

        <button
          v-show="
            getIsAccOwner ||
              getCustomerManagementPrivileges.updateFinancialSetting
          "
          class="px-10 py-4 font-medium bg-primary-optima-color text-white"
          style="border-radius: 50px"
          @click="updateFinanceSetting"
        >
          Apply Changes
        </button>
      </div>
    </div>

    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      updateButton: false,
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
      console.log("hello");
      this.updateButton = true;
      console.log(this.singleContact);
      let userInfo = this.$store.state.auth.auth.authData;
      let payload = {
        id: this.singleContact.id,
        userInfo: userInfo,
        data: {
          payload: {
            ...this.singleContact,
          },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.updateButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    editValue(e, val) {
      // console.log(e, val)
      let payload = {
        value: e,
        key: val,
      };
      this.$store.commit("crm/contact/edit_contact", payload);
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerManagementPrivileges",
    ]),
  },
};
</script>

<style></style>
