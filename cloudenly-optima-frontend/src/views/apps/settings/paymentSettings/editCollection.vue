<template>
  <div>
    <back location="Edit Collection Account" class="mb-10 font-normal" />

    <section
      id="div-with-loading"
      class="vs-con-loading__container bg-white px-10 py-8 mt-4"
    >
      <h1 class="mb-8" style="font-size: 14px">Edit Collection Account</h1>

      <div class="mt-10 flex w-full">
        <div class="w-1/3 mr-8">
          <s-text
            v-model="collectionData.businessName"
            label="Business Name"
            disabled
          />
        </div>

        <div class="w-1/3">
          <s-select
            label="Banks:"
            default-option="--Select Banks--"
            class="mx-10 w-full"
            :options="getBankList"
            @input="selectBank()"
            :value="bank.name"
            v-model="bank.name"
            select-id="name"
          />
        </div>
      </div>

      <div class="mt-16 flex w-full">
        <div class="w-1/3 mr-16">
          <s-text
            @blur="verifyAccountNumber"
            v-model="collectionData.accountNumber"
            label="Account Number"
          />
        </div>

        <div class="w-1/3">
          <s-text
            disabled
            v-model="collectionData.accountName"
            label="Account Name"
          />
        </div>
      </div>
    </section>

    <hr class="text-gray-400" />

    <div class="bg-white mt-2 pt-5 px-10 py-8">
      <div class="flex justify-between">
        <button
          @click="$router.back()"
          class="my-8 px-10 py-3 text-xl bg-gray-100 text-primary rounded-full"
        >
          Cancel
        </button>
        <s-button
          @click="updateCollection()"
          :loading="loading"
          class="my-8 px-10 py-3 bg-primary text-white rounded-full text-xl"
        >
          Update
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,

      bank: {
        id: "",
        name: "",
        code: "",
      },

      collectionData: {
        orgId: this.$store.state.auth.auth.authData.orgId,
        businessName: this.$store.state.auth.auth.orgData.name,
        accountNumber: "",
        bankName: "",
        bankCode: "",
        applicableToAllOutlets: false,
        applicableOutletIds: [],
        paymentCategorySlugs: [],
        metaData: {
          description: "",
        },
      },
    };
  },

  methods: {
    selectBank() {
      let bankList = this.getBankList;
      const result = bankList.find((item) => item.name === this.bank.name);
      // console.log(result);
      this.bank.name = result.name;
      this.bank.code = result.code;
      this.bank.id = result.id;
      this.collectionData.bankName = result.name;
      this.collectionData.bankCode = result.code;
    },

    updateCollection() {
      this.loading = true;

      this.$store
        .dispatch(
          "payment/collection/updateCollectionAccount",
          this.collectionData
        )
        .then(() => {
          this.$vs.notify({
            title: "Update Account",
            text: "success",
            position: "top-right",
          });
          this.loading = false;
          this.$router.back();
        })
        .catch((error) => {
          this.loading = false;
          this.$vs.notify({
            title: "Update Account",
            text: error.message,
            position: "top-right",
          });
        });
    },

    async verifyAccountNumber() {
      // eslint-disable-next-line no-empty
      try {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 1,
        });

        let payload = {
          bankCode: this.bank.code,
          accountNumber: this.collectionData.accountNumber,
        };

        const { data } = await this.$store.dispatch(
          "payment/paymentSetting/getVerifyAccNumber",
          payload
        );
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        this.collectionData.accountName = data.data.account_name;
      } catch (error) {
        this.collectionData.accountName = "";
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        this.$vs.notify({
          title: "Payment",
          text: "Wrong Account Number or bank",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("payment/paymentSetting", ["getBankList"]),
    user() {
      return this.$store.state.auth.auth.userData;
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.$store.dispatch("payment/paymentSetting/getListOfBank");
    this.$store
      .dispatch("payment/collection/getOneCollectionAccount", this.id)
      .then((resp) => {
        this.bank.name = resp.data.data.bankName;
        this.bank.code = resp.data.data.bankCode;
        this.collectionData = resp.data.data;
      });
  },
};
</script>

<style></style>
