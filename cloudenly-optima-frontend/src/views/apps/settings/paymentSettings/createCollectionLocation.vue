<template>
  <div>
    <back location="Association Location" class="mb-10 font-normal" />

    <div class="bg-white py-8 px-3 rounded">
      <div class="flex justify-between">
        <h1>Add Associated Account</h1>
      </div>

      <div class="my-2 py-5">
        <div class="w-1/3">
          <s-select
            v-model="collectionLocationData.locationId"
            label="Location:"
            :options="getLocations"
          />
        </div>

        <div class="mt-8">
          <s-select-chipped
            label="Payment Category"
            :options="getCategories"
            v-model="collectionLocationData.categoryIds"
            class="col-span-10"
          />
        </div>

        <div class="mt-8 w-1/3">
          <div class="mb-3">
            <label for=""> Collection Banks</label>
          </div>
          <select
            class="field w-full"
            @change="addItem"
            v-model="collectionBanks"
            name=""
            id=""
          >
            <option
              v-for="(bank, i) in getCollectionAccounts"
              :key="i"
              :value="bank"
            >
              {{ bank.bankName }} - {{ bank.accountNumber }}
            </option>
          </select>

          <div>
            <div
              class="col-span-12 grid grid-cols-12 mt-3 gap-8"
              :class="`col-gap-4 row-gap-3 gap-8`"
              v-if="value.length"
            >
              <div
                :class="`col-span-4`"
                class="
                  col-span-3
                  rounded
                  py-2
                  px-4
                  capitalize
                  flex
                  items-center
                  justify-between
                "
                v-for="(item, i) in value"
                :key="i"
                style="background: #eee"
              >
                <span> {{ item.bankName }} - {{ item.accountNumber }} </span>

                <feather-icon
                  icon="XIcon"
                  svgClasses="h-5 w-5 cursor-pointer"
                  @click="removeItem(i)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 w-1/3">
          <div class="mb-3">
            <label
              for="
          "
              >Default Collection</label
            >
          </div>
          <select class="field w-full" v-model="defaultAccount" name="" id="">
            <option
              v-for="(defaultBank, i) in value"
              :key="i"
              :value="defaultBank"
            >
              {{ defaultBank.bankName }} - {{ defaultBank.accountNumber }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button
          @click="$router.back()"
          class="my-8 px-10 py-3 bg-gray-100 text-primary rounded-full"
        >
          Cancel
        </button>

        <s-button
          @click="createCollectionLocationAssociation"
          :loading="loading"
          class="
            px-8
            mt-4
            py-5
            text-white
            border-none
            cursor-pointer
            bg-cloudenly-primary-main
            rounded-full
            flex-end
          "
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
      defaultAccount: "",
      value: [],
      collectionBanks: [],
      collectionLocationData: {
        orgId: this.$store.state.auth.auth.authData.orgId,
        appSlug: "optima",
        locationId: "",
        accounts: [],
        categoryIds: [],
      },
    };
  },

  methods: {
    addItem() {
      const result = this.getCollectionAccounts.find(
        (option) => option === this.collectionBanks
      );
      this.value = [...new Set([...this.value, result])];
    },

    removeItem(index) {
      console.log(index);
      this.value = this.value.filter((item, i) => i !== index);
    },

    createCollectionLocationAssociation() {
      this.collectionLocationData.categoryIds =
        this.collectionLocationData.categoryIds.map((resp) => {
          return resp.id;
        });

      let bankAccount = this.value.map((resp) => {
        return {
          collectionAccountId: resp.id,
          isDefault: false,
        };
      });

      let result = bankAccount.filter(
        (resp) => resp.collectionAccountId === this.defaultAccount.id
      );

      result.push({
        collectionAccountId: this.defaultAccount.id,
        isDefault: true,
      });

      this.collectionLocationData.accounts = result;
      console.log(this.collectionLocationData);
      this.$store
        .dispatch(
          "payment/collectionAssociation/postCollectionAccounts",
          this.collectionLocationData
        )
        .then((resp) => {
          // console.log(resp.data.message);
          this.$vs.notify({
            title: "New Association Account",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.loading = false;
          this.$router.back();
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$vs.notify({
            title: "New Association Account",
            text: err,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("payment/collectionAssociation", [
      "getLocationAccounts",
      "getCategories",
    ]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("payment/collection", ["getCollectionAccounts"]),

    getLocations() {
      return this.getAllOrganisationLocation.outlets;
    },
    // getPaymentCategories() {
    //   return this.getCategories;
    // },
    getBanks() {
      return this.getBankList;
    },
  },

  mounted() {
    this.$store.dispatch("payment/collectionAssociation/getLocationAccounts");
    this.$store.dispatch("payment/collectionAssociation/getCategories");
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$store.dispatch("payment/collection/getCollectionAccounts");
  },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #cccccc;
  border-radius: 2px;
  height: 32px;
  width: 100%;
}
</style>
