<template>
  <div>
    <back location="New Collection Account" class="mb-10 font-normal" />

    <section
      id="div-with-loading"
      class="vs-con-loading__container bg-white px-10 py-8 mt-4"
    >
      <h1 class="mb-8" style="font-size: 14px">Add Collection Account</h1>

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
          class="my-8 px-10 py-3 bg-gray-100 text-primary rounded-full"
        >
          Cancel
        </button>
        <s-button
          @click="createCollection()"
          :loading="loading"
          class="my-8 px-10 py-3 bg-primary text-white rounded-full"
        >
          Save
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
        accountName: "",
        bankName: "",
        bankCode: "",
        applicableToAllOutlets: null,
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
      this.bank.name = result.name;
      this.bank.code = result.code;
      this.bank.id = result.id;
      this.collectionData.bankName = result.name;
      this.collectionData.bankCode = result.code;
    },

    async createCollection() {
      try {
        this.loading = true;
        const { data } = await this.$store.dispatch("payment/collection/postCollectionAccounts",
          this.collectionData
        );
        console.log(data);
        this.$vs.notify({
          title: "New Collection Account",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
        this.loading = false;
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.loading = false;

        this.$vs.notify({
          title: "New Collection Account",
          text: err,
          color: "danger",
          position: "top-right",
        });
        
      }
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

        const {data} = await this.$store.dispatch(
          "payment/paymentSetting/getVerifyAccNumber",
          payload
        );
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        this.collectionData.accountName = data.data.account_name
      } catch (error) {
        this.collectionData.accountName = ""
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
  },

  mounted() {
    this.$store.dispatch("payment/paymentSetting/getListOfBank");
  },
};
</script>

<style scoped> 


</style>
