<template>
  <div>
    <div
      @click="toggleList"
      v-show="showFirst"
      class="flex items-center justify-center cursor-pointer hover:bg-grey-lighter rounded"
    >
      <div
        @click="toggleList"
        class="flex justify-content-center bg-blue-lightest items-center"
      >
        <span
          @click="toggleList"
          class="cursor-pointer text-cloudenly-primary-main"
        >
          <feather-icon
            icon="PlusCircleIcon"
            class="p-2 text-blue inline-flex"
          ></feather-icon>
        </span>
        <span
          @click="toggleList"
          class="cursor-pointer text-cloudenly-primary-main"
        >
          Add Item/Service
        </span>
      </div>
    </div>

    <div
      v-if="showList"
      class="-my-10 border border-solid p-2 w-auto relative border-grey-light rounded-lg shadow bg-white" >
      <div v-click-outside="hide">

        <div class="flex mx-auto justify-between bg-grey-lighter p-2 rounded">
          <div class="w-1/3">
            <input
              placeholder="Search for items in catalogue name"
              class="py-3 px-2 border border-solid border-grey rounded w-full"
              v-model="search"
            />
          </div>
        </div>

        <div class="mt-2 my-10" v-if="getIfPurchaseVariantCreated">

          <ul>
            <li
              class="flex py-1 px-2 mb-2 rounded shadow hover:bg-grey-lighter"
              v-for="(item, index) in $options.filters.limitArray(filteredItems,(length = 8))"
              :key="index" >

              <div class="w-1/3">
                <span class="font-semibold leading-loose">{{
                  item.variantName
                }}</span>
                <br />

                <span v-if="item.item === null" class="text-sm"
                  >Item Description:- N/A</span
                >
                <span v-else class="text-sm"
                  >Item Description:- {{ item.description }}</span
                >

                <br />
                <span class="text-sm"
                  >item type:- {{ item.productOrService }}</span
                >
              </div>

              <div class="w-1/3">
                <div class="mt-8">
                  <span class>Stock Balance : {{ item.stockBalance }}</span>
                  <br />

                  <div v-if="item.item === null"></div>

                  <div v-else>
                    <span
                      class="text-cloudenly-warning-main"
                      v-if="item.item.taxType === null"
                      >Tax Type : N/A</span
                    >
                    <span
                      class="text-cloudenly-warning-main"
                      v-if="item.item.taxType === 'taxExclusive'"
                      >Tax Type : Tax Exclusive</span
                    >
                    <span
                      class="text-cloudenly-warning-main"
                      v-if="item.item.taxType === 'taxInclusive'"
                      >Tax Type : Tax Inclusive</span
                    >
                    <span
                      class="text-cloudenly-warning-main"
                      v-if="item.item.taxType === 'taxExempt'"
                      >Tax Type : Tax Exempt</span
                    >
                  </div>
                </div>
              </div>

              <div class="w-1/3">
                <div class="mt-5">

                  <div v-if="item.wholesalePriceBooks || item.retailPriceBooks">
                    <div v-if="item.wholesalePriceBooks">
                      
                      <div
                        v-if="item.wholesalePriceBooks[0].promoDiscountRate > 0">
                        <div class="flex justify-end">
                          <span class="rounded-full text-cloudenly-danger-main"
                            >Item on promo</span
                          >
                        </div>

                        <div class="flex items-center justify-end">
                          <button
                            @click="addItem(item, 'promoPrice')"
                            class="mr-5 bg-cloudenly-primary-mid border-none py-2 px-1 rounded text-white text-sm cursor-pointer"
                          >
                            use promo price
                          </button>
                          <button
                            @click="addItem(item, 'normalPrice')"
                            class="bg-cloudenly-primary-main border-none py-2 px-1 rounded text-white text-sm cursor-pointer"
                          >
                            use regular price
                          </button>
                        </div>
                      </div>

                      <div class v-else>
                        <div class="flex justify-end">
                          <button
                            @click="addItem(item, 'normalPrice')"
                            class="bg-cloudenly-primary-main border-none py-2 px-3 rounded text-white text-sm cursor-pointer"
                          >
                            add item
                          </button>
                        </div>
                      </div>
                    </div>

                    <div v-else>
                      <div
                        v-if="item.retailPriceBooks[0].promoDiscountRate > 0"
                      >
                        <div class="flex justify-end">
                          <span class="rounded-full text-cloudenly-danger-main"
                            >Item on promo</span
                          >
                        </div>

                        <div class="flex items-center justify-end">
                          <button
                            @click="addItem(item, 'promoPrice')"
                            class="mr-5 bg-cloudenly-primary-mid border-none py-1 px-1 rounded text-white text-sm cursor-pointer"
                          >
                            use promo price
                          </button>
                          <button
                            @click="addItem(item, 'normalPrice')"
                            class="bg-cloudenly-primary-main border-none py-1 px-1 rounded text-white text-sm cursor-pointer"
                          >
                            use regular price
                          </button>
                        </div>
                      </div>

                      <div class v-else>
                        <div class="flex justify-end">
                          <button
                            @click="addItem(item, 'normalPrice')"
                            class="bg-cloudenly-primary-main border-none py-1 px-3 rounded text-white text-sm cursor-pointer"
                          >
                            add item
                          </button>
                        </div>
                      </div>
                    </div>


                  </div>

                  <div v-else>
                    <div class="py-5 text-warning">
                      Sorry this customer does not have any price reference...
                    </div>
                  </div>


                </div>
              </div>
            </li>
          </ul>


        </div>



        <div v-else>
          <div class="flex justify-center justify-content-center p-10">
            <div class>
              <div class="mb-5">
                <p class="text-xl">Please select your customer first</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      showFirst: true,
      showList: false,
      wholeSale: false,
      retail: true,
    };
  },

  computed: {
    ...mapGetters("crm/contact", ["getContactInvoiceItems"]),

    filteredItems() {
      return this.getContactInvoiceItems.filter((items) => {
        return items.variantName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },

    getIfPurchaseVariantCreated() {
      if (this.getContactInvoiceItems.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    toggleList() {
      this.showList = true;
    },

    hide() {
      this.showList = false;
    },

    outside: function () {
      this.showList = false;
    },

    addItem(val, type) {
      this.$emit("addItem", val, type);
      this.showList = false;
    },

    routeCreateProductItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "purchase",
          group: "product",
        },
      });
    },

    routeCreateServiceItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "purchase",
          group: "service",
        },
      });
    },
  },

  directives: {
    ClickOutside,
  },

  mounted() {
    this.popupItem = this.$el;
  },
};
</script>

<style>
</style>
