<template>
  <div id="div-with-loading" class="vs-con-loading__container mx-5 mt-8 mb-10">
    <div class="flex items-center mb-3">
      <div class="w-1/3">
        <input
          v-model="search"
          class="w-full py-3 px-2 border border-solid border-grey-light rounded"
          placeholder="Search Service Name..."
        />
      </div>

      <div class="w-2/3 float-right">
        <div class="flex items-center justify-end">
          <vs-dropdown
            v-show="showActionButton"
            vs-custom-content
            vs-trigger-click
          >
            <button
              class="inline-flex items-center border-0 py-2 px-3 cursor-pointer bg-cloudenly-primary-main rounded text-white"
            >
              <span class="mr-3"> Actions </span>
              <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
            </button>
            <vs-dropdown-menu>
              <ul style="min-width: 10rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <feather-icon
                    icon="CheckCircleIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Issue Invoice</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>

    <div v-if="getContactServicePricebook.length > 0" class="overflow-x-auto">
      <table
        v-if="singleContact.contactCategory === 'wholesale'"
        class="table w-full table-auto table-responsive border-collapse"
      >
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3 text-blue text-center">
              <vs-checkbox></vs-checkbox>
            </th>
            <th class="py-3">ITEM NAME</th>

            <th class="py-3">LOYALTY(%)</th>
            <th class="py-3">CUSTOMER PRICE (Unit)</th>
            <th class="py-3">CUSTOMER SAVING PRICE (Unit)</th>
            <th class="py-3">DATE UPDATED</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer"
            v-for="(contactPricebook, index) in getContactServicePricebook"
            :key="index"
          >
            <td class="pb-3 pt-2 pl-2">
              <vs-checkbox> </vs-checkbox>
            </td>
            <td class="pb-3 pt-2 pl-2">{{ contactPricebook.variantName }}</td>
            <td class="pb-3 pt-2 pl-2">
              <span v-if="singleContact.loyaltyScheme === null"> N/A</span>
              <span v-else>{{ singleContact.loyaltyScheme.discountRate }}</span>
            </td>
            <td class="pb-3 pt-2 pl-2">
              {{
                contactPricebook.wholesalePriceBook.customerPurchasePriceRWPUnit
              }}
            </td>

            <td class="pb-3 pt-2 pl-2">
              {{ contactPricebook.wholesalePriceBook.customerSavingOnRWPUnit }}
            </td>

            <td class="pb-3 pt-2 pl-2">
              {{ contactPricebook.updatedAt | date }}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        v-else
        class="table w-full table-auto table-responsive border-collapse"
      >
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3">
              <vs-checkbox></vs-checkbox>
            </th>

            <th class="py-3">ITEM NAME</th>
            <th class="py-3">LOYALTY(%)</th>
            <th class="py-3">CUSTOMER PRICE (Unit)</th>
            <th class="py-3">CUSTOMER SAVING (Unit)</th>
            <th class="py-3">DATE UPDATE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(contactPricebook, index) in getContactServicePricebook"
            :key="index"
          >
            <td class="py-3 pl-3"><vs-checkbox> </vs-checkbox></td>
            <td class="py-3 ">{{ contactPricebook.variantName }}</td>
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
              {{ contactPricebook.retailPriceBook.customerSavingOnRRPUnit }}
            </td>
            <td class="py-3 pl-3">{{ contactPricebook.updatedAt | date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <div
        class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-warning-main rounded border-4 shadow mb-2 mt-5"
      >
        <div class="p-2 py-3">
          <div class="pl-3">
            <p class="text-cloudenly-primary-main text-xl">
              You don't have any service item catalogue
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
      showActionButton: false,
    };
  },

  computed: {
    ...mapGetters("crm/contact", [
      "getContactServicePricebook",
      "singleContact",
    ]),
  },

  methods: {
    routeCreateItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "sale",
          group: "service",
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
    console.log(id);
    this.$store
      .dispatch("crm/contact/getContactServicePricebook", id)
      .then((resp) => {
        if(resp.data) {
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
  padding-right: 3rem !important;
}
</style>
