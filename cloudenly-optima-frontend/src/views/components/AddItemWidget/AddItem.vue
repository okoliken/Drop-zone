<template>
  <div class="">
    <div
      @click="toggleList"
      v-show="showFirst"
      class=" flex items-center   cursor-pointer hover:bg-grey-lighter rounded"
    >
      <div
        @click="toggleList"
        class="flex justify-content-center bg-blue-lightest items-center"
      >
        <span
          @click="toggleList"
          class=" cursor-pointer text-cloudenly-primary-main"
        >
          <feather-icon
            icon="PlusCircleIcon"
            class="p-2  text-blue inline-flex"
          ></feather-icon>
        </span>
        <span
          @click="toggleList"
          class="cursor-pointer text-cloudenly-primary-main"
        >
          Add product and/or service</span
        >
      </div>
    </div>

    <div
      v-if="showList"
      class=" -my-10 border border-solid z-50 p-2 w-auto relative  border-grey rounded-lg shadow bg-white"
    >
      <div v-click-outside="outside">
        <div class="flex mx-auto justify-between bg-grey-light p-2 rounded">
          <div class="w-1/3">
            <vs-input
              icon="search"
              placeholder="Search for items in catalogue name"
              class="w-full"
              v-model="search"
            />
          </div>
          <!-- <div class="flex items-center">
                       <vs-checkbox v-model="retail">Use Retail Price</vs-checkbox>
                       <vs-checkbox disabled>Use Wholesales Price</vs-checkbox>
                   </div> -->
        </div>

        <div class="mt-2" v-if="isItemSetup">
          <vs-list-item
            v-for="(item, index) in $options.filters.limitArray(
              filteredItems,
              5
            )"
            :key="index"
            @click.native="addItem(item)"
            class=" hover:bg-grey-light
                        cursor-pointer rounded"
            :title="item.variantName"
            :subtitle="
              `Item Description: ${item.item.description} -  Stock Balance: ${item.stockBalance}`
            "
          >
            <p># {{ item.retailPriceBook.purchasePriceUnit }}</p>
          </vs-list-item>
        </div>

        <div v-else>
          <div
            class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-warning-main rounded border-4 shadow mb-2 mt-5"
          >
            <div class="p-2">
              <div class="pl-3">
                <p class="text-cloudenly-primary-main ">
                  You don't have any Item Setup
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
    </div>
  </div>
</template>

<script>
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
    ...mapGetters("catalogue", ["getAllSaleVaraint", "isItemSetup"]),

    filteredItems() {
      return this.getAllSaleVaraint.filter((items) => {
        return items.variantName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getSalesProductItemVariant");
  },

  methods: {
    toggleList() {
      this.showList = true;
    },

    outside: function() {
      this.showList = false;
    },

    addItem(val) {
      this.$emit("addItem", val);
      this.showList = false;
    },

    routeCreateItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "sale",
          group: "product",
        },
      });
    },
  },

  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },
};
</script>

<style></style>
