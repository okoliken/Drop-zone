<template>
  <div id="div-with-loading" class="vs-con-loading__container mx-5 mt-8 mb-10">
    <div v-if="getContactProductPricebook.length > 0" class="">
      <table
        v-if="singleContact.contactCategory === 'wholesale'"
        class="table w-full table-auto table-responsive border-collapse"
      >
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3"><vs-checkbox></vs-checkbox></th>
            <th class="py-3 w-64">ITEM NAME</th>
            <th class="py-3">LOYALTY (%)</th>
            <th class="py-3">CUSTOMER PRICE (Unit)</th>
            <th class="py-3">CUSTOMER PRICE (Pack)</th>
            <th class="py-3">DATE UPDATED</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            class="
              cursor-pointer
              border border-solid border-grey-lighter border-l-0 border-r-0
            "
            v-for="(contactPricebook, index) in getContactProductPricebook"
            :key="index"
          >
            <td class="py-3 pl-3">
              <vs-checkbox> </vs-checkbox>
            </td>
            <td class="py-3 pl-3 w-64">{{ contactPricebook.variantName }}</td>
            <td class="py-3 pl-3">
              <span v-if="singleContact.loyaltyScheme === null">N/A</span>
              <span v-else>{{ singleContact.loyaltyScheme.discountRate }}</span>
            </td>
            <td class="py-3 pl-3">
              {{
                contactPricebook.wholesalePriceBook.customerPurchasePriceRWPUnit
              }}
            </td>
            <td class="py-3 pl-3">
              {{
                contactPricebook.wholesalePriceBook.customerPurchasePriceRWPPack
              }}
            </td>
            <td class="py-3 pl-3">{{ contactPricebook.updatedAt | date }}</td>
          </tr>
        </tbody>
      </table>

      <table
        v-else
        class="table w-full table-auto border-collapse table-responsive"
      >
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3">
              <vs-checkbox></vs-checkbox>
            </th>
            <th class="py-3">ITEM NAME</th>
            <th class="py-3">LOYALTY (%)</th>
            <th class="py-3">CUSTOMER PRICE (Unit)</th>
            <th class="py-3">CUSTOMER PRICE (Pack)</th>
            <th class="py-3">DATE UPDATED</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="
              cursor-pointer
              border border-solid border-grey-lighter border-l-0 border-r-0
            "
            v-for="(contactPricebook, index) in getContactProductPricebook"
            :key="index"
          >
            <td class="py-3 pl-3">
              <vs-checkbox> </vs-checkbox>
            </td>
            <td class="py-3 pl-3">{{ contactPricebook.variantName }}</td>
            <td class="py-3 pl-3">
              <span v-if="singleContact.loyaltyScheme === null"> N/A</span>
              <span v-else>{{ singleContact.loyaltyScheme.discountRate }}</span>
            </td>
            <td class="py-3 pl-3">
              {{
                contactPricebook.retailPriceBook.customerPurchasePriceRRPUnit
              }}
            </td>
            <td class="py-3 pl-3">
              {{ contactPricebook.retailPriceBook.customerSavingOnRRPPack }}
            </td>
            <td class="py-3 pl-3">{{ contactPricebook.updatedAt | date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <div
        class="
          bg-white
          border-solid
          border-t-0
          border-r-0
          border-b-0
          border-cloudenly-warning-main
          rounded
          border-4
          shadow
          mb-2
          mt-5
        "
      >
        <div class="p-2 py-3">
          <div class="pl-3">
            <p class="text-cloudenly-primary-main text-xl">
              You don't have any product item catalogue
              <span
                @click="routeCreateItem"
                class="text-cloudenly-danger-main cursor-pointer"
                >Click here to setup..</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      search: "",
      contactLoyalty: {},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      showActionButton: false,
    };
  },

  computed: {
    ...mapGetters("crm/contact", [
      "getContactProductPricebook",
      "singleContact",  
    ]),
  },

  methods: {
    routeCreateItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "sale",
          group: "product",
          type: "new-item",
        },
      });
    },
  },

  mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.8,
    });

    let id = this.singleContact.id;
    this.$store
      .dispatch("crm/contact/getContactProductPricebook", id)
      .then((resp) => {
        if (resp.data) {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        }
      })
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        this.$vs.notify({
          title: "Pricebook",
          text: err.response.data.message,
          color: "Danger",
          position: "top-right",
        });
      });
  },
};
</script>

<style scoped>
table th {
  white-space: nowrap !important;
  padding-right: 2rem !important;
}
</style>
