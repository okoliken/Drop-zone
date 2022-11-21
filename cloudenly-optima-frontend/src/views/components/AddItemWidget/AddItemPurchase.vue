<template>
  <div class="">
    <div
      c
      @click="toggleList"
      v-show="showFirst"
      class="flex items-center bg-white justify-center cursor-pointer hover:bg-grey-lighter rounded"
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
          Add Items or Service</span
        >
      </div>
    </div>

    <div
      v-if="showList"
      class="-my-10 border border-solid z-50 p-2 w-auto relative border-grey rounded-lg shadow bg-white"
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
        </div>

        <div class="mt-2" v-if="getIfPurchaseVaraintCreated">
          <vs-list-item
            v-for="(item, index) in $options.filters.limitArray(
              filtredItems,
              (length = 3)
            )"
            :key="index"
            @click.native="addItem(item)"
            class="hover:bg-grey-light cursor-pointer rounded"
            :title="item.variantName"
            :subtitle="`Item Description: ${item.item.description}`"
          >
            <p class="font-extrabold">
              <span class="text-cloudenly-primary-main">Stock Balance</span>:{{
                item.stockBalance
              }}
            </p>
          </vs-list-item>
        </div>

        <div v-else>
          <div class="flex justify-center justify-content-center mt-10">
            <div class="">
              <div class="mb-5">
                <p class="text-xl">
                  You not have any product or service items in your catalogue
                </p>
              </div>

              <div class="mx-auto pl-16 pb-5">
                <button
                  @click="routeCreateProductItem"
                  type="button"
                  class="py-3 px-5 mr-5 rounded-full bg-transparent border border-solid cursor-pointer hover:border-cloudenly-primary-main hover:text-cloudenly-primary-main"
                >
                  Add Product Item
                </button>

                <button
                  @click="routeCreateServiceItem"
                  type="button"
                  class="py-3 px-5 mr-5 rounded-full bg-transparent border border-solid cursor-pointer hover:border-cloudenly-primary-main hover:text-cloudenly-primary-main"
                >
                  Add Service Item
                </button>
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
    ...mapGetters("catalogue", ["getAllPurchaseVaraint"]),

    filtredItems() {
      return this.getAllPurchaseVaraint.filter((items) => {
        return items.variantName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },

    getIfPurchaseVaraintCreated() {
      if (this.getAllPurchaseVaraint.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    toggleList() {
      this.showList = true;
      // console.log(this.showList);
    },

    outside: function () {
      this.showList = false;
    },

    addItem(val) {
      this.$emit("addItem", val);
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
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getAllPurchaseVariant");
  },
};
</script>

<style></style>
