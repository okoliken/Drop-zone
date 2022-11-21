<template>
  <div class>
    <!-- Edit Main Variant Section -->
    <vs-popup
      button-close-hidden
      title="Edit Variant"
      :active.sync="editMainVariantModal"
    >
      <div class="container">
        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Name :</p>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="mainVariant.name"
              placeholder=" Enter Category Name"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
              name
              id
            />
          </div>
        </div>

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Brand :</p>
          </label>
          <div class="col-7">
            <select
              v-model="mainVariant.brandId"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
            >
              <option
                v-for="(brand, index) in getallBrand"
                :key="index"
                :value="brand.id"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Category :</p>
          </label>
          <div class="col-7">
            <select
              v-model="mainVariant.categoryId"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
            >
              <option
                v-for="(cat, index) in getallItemCategory"
                :key="index"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Description :</p>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="mainVariant.description"
              placeholder
              class="py-2 px-2 border border-solid border-grey rounded w-full"
              name
              id
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          :disabled="updateMainVariantButton"
          :class="{
            'cursor-not-allowed': updateMainVariantButton,
            'bg-cloudenly-primary-mid': updateMainVariantButton,
          }"
          @click="updateMainVariant"
          type="button"
          class="
            px-5
            py-2
            mr-2
            rounded
            text-white
            border-none
            cursor-pointer
            bg-cloudenly-primary-main
          "
        >
          Save changes
        </button>

        <button
          @click="editMainVariantModal = false"
          type="button"
          class="px-5 py-2 rounded border-none cursor-pointer bg-transparent"
        >
          Cancel
        </button>
      </div>
    </vs-popup>
    <!-- End Edit Main Variant Section -->

    <!-- Export catalogue -->
    <vs-popup
      button-close-hidden
      title="Export your Catalogue"
      :active.sync="exportCatalogueModal"
    >
      <div v-if="getIsAccOwner || getSalesCataloguePrivileges.exportCatalogue">
        <div class="container">
          <div
            class="
              bg-white
              border-solid
              border-t-0
              border-r-0
              border-b-0
              border-cloudenly-danger-main
              rounded
              border-4
              mb-2
            "
          >
            <div class="p-5">
              <div class>
                <h3 class="m-0">
                  You are about to export your Items Catalogue..
                  <span class="text-cloudenly-primary-main cursor-pointer pl-1"
                    >Note: File Format is in CSV..</span
                  >
                </h3>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center mt-8">
            <button
              @click="exportCatalogue"
              :disabled="exportButton"
              :class="{
                'bg-cloudenly-primary-mid': exportButton,
                'cursor-not-allowed': exportButton,
              }"
              class="
                py-2
                px-10
                mr-5
                cursor-pointer
                border border-solid
                rounded
                text-white
                bg-cloudenly-primary-main
              "
            >
              Export
            </button>
            <button
              class="
                py-2
                px-5
                cursor-pointer
                bg-transparent
                border border-solid
                rounded
              "
              @click="exportCatalogueModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Export catalogue -->

  

    <div
      v-if="getIsAccOwner || getSalesCataloguePrivileges.viewItemRegister"
      class="mt-3"
    >
      <div v-if="filterItem.length > 0" class="bg-white">
        <table class="table min-w-full">
          <thead class="bg-gray-300">
            <tr class>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Name
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Category
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Brand
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Description
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Availability
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Last Updated
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filterItem"
              :key="index"
              class="
                cursor-pointer
                
                hover:bg-grey-lighter
                border border-solid border-grey-lighter
                font-normal
              "
            >
              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                <div class="flex">
                  <div>
                    <svg
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g filter="url(#filter0_dd)">
                        <rect
                          x="8"
                          y="4"
                          width="36"
                          height="36"
                          rx="18"
                          fill="url(#pattern0)"
                        />
                        <rect
                          x="8.5"
                          y="4.5"
                          width="35"
                          height="35"
                          rx="17.5"
                          stroke="black"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_dd"
                          x="0"
                          y="0"
                          width="52"
                          height="52"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="4" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.180392 0 0 0 0 0.160784 0 0 0 0 0.305882 0 0 0 0.08 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="1" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.180392 0 0 0 0 0.160784 0 0 0 0 0.305882 0 0 0 0.02 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="effect1_dropShadow"
                            result="effect2_dropShadow"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect2_dropShadow"
                            result="shape"
                          />
                        </filter>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlink:href="#image0"
                            transform="translate(-0.25) scale(0.003125)"
                          />
                        </pattern>
                        <image
                          id="image0"
                          width="480"
                          height="320"
                          xlink:href="data:image/jpeg;base64,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"
                        />
                      </defs>
                    </svg>
                  </div>
                  <div class="mt-4">{{ item.name }}</div>
                </div>
              </td>
              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                {{ item.category | formatCat }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ item.brand | formatCat }}
              </td>
              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                {{ item.description }}
              </td>
              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                <div v-if="item.inventoryQuantity === 0">
                  <span class="text-cloudenly-danger-main"
                    >{{ item.inventoryQuantity }} in
                    {{ item.variantNumber }} variant</span
                  >
                </div>

                <div v-else>
                  <span style="color: #4ecdc4">{{
                    item.inventoryQuantity
                  }}</span>
                  in {{ item.variantNumber }} variant
                </div>
              </td>

              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                {{ item.updatedAt | date }}
              </td>
              <td
                class="
                  px-6
                  py-3
                  whitespace-no-wrap
                  border border-gray-200
                  text-center
                "
              >
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                  <vs-dropdown-menu>
                    <ul style="min-width: 15rem">
                       <li
                        @click="routeViewVariant(item)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <span> View </span>
                      </li>


                       <li
                        @click="routeViewVariant(item)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <span> Edit </span>
                      </li>
                      <li
                        @click="routeCreateVariant(item.id)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <span> Add Variant </span>
                      </li>
                     
                      <!-- <li
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <span> Delete </span>
                      </li> -->
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center mx-auto py-20">
          <div class="mr-8">
            <img src="../../../assets/images/optimaAsset/product.svg" alt />
          </div>

          <div class="">
            <p class="font-semibold mb-3 text-primary-optima-color">
              There are no purchase catalogue at the moment
            </p>
            <p class="mb-3">
              Create new or import/export with the options below.
            </p>

            <div class="items-center justify-between">
              <button
                @click.prevent="routeCreateItem"
                class="
                  mr-8
                  py-5
                  px-10
                  rounded-full
                  bg-primary-optima-color
                  text-white
                "
                href="#"
              >
                Create New
              </button>

              <button
                class="
                  py-5
                  px-10
                  rounded-full
                  bg-gray-200
                  text-primary-optima-color
                "
                @click.prevent="routeImportCatalogue"
                href="#"
              >
                Import a Product
              </button>
            </div>
          </div>
        </div>

      <!-- Pagination section -->
      <div
        class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
      >
        <div class="flex items-center">
          <p class="mr-2">Show :</p>
          <select name class="py-1 mr-2" id>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>Per Page</p>
        </div>

        <div class="flex items-center">
          <p class="mr-2">Show</p>
          <select name class="py-1 mr-2" id>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>Per Page</p>
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar,
  },

  data() {
    return {
      showAdvance: false,
      isSelected: false,
      exportButton: false,
      search: "",
      items: [],
      allItems: [],
      showAction: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },

      editMainVariantModal: false,
      mainVariant: "",
      exportCatalogueModal: false,
      updateMainVariantButton: false,
    };
  },

  computed: {
    ...mapGetters("catalogue", [
      "getallBrand",
      "getallItemCategory",
      "getallSaleProduct",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesCataloguePrivileges",
    ]),

     filterItem() {
      return this.getallSaleProduct.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },


  },

  methods: {
    exportCatalogue() {
      this.exportCatalogueModal = false;
      this.exportButton = true;
      this.$store
        .dispatch("catalogue/exportCatalogue")
        .then((resp) => {
          this.exportCatalogueModal = false;
          this.exportButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
          });
        })
        .catch((err) => {
          this.exportButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: err.response.data.message,
          });
        });
    },

    routeImportCatalogue() {
      this.$router.push({ name: "ImportCatalogue" });
    },

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

    selectAll() {
      this.items = [];
      if (!this.isSelected) {
        this.getallSaleProduct.map((item) => {
          this.items.push(item);
        });
      }
    },

    routeCreateVariant(val) {
      this.$router.push({
        name: "CreateItemVariant",
        params: { 
          id: val,
        },
      });
    },

    routeViewVariant(val) {
      this.$router.push({
        name: "ViewVariant",
        params: {
          id: val.id,
        },
      });
    },

    editMainVariant(val) {
      (this.editMainVariantModal = true),
        (this.mainVariant = {
          id: val.id,
          name: val.name,
          brand: val.brand.name,
          category: val.category,
          description: val.description,
          sku: val.sku,
          currency: val.currency,
        });
    },

    updateMainVariant() {
      let userInfo = this.$store.state.auth.auth.authData;
      let id = this.mainVariant.id;
      let data = {
        id: id,
        userInfo: userInfo,
        payload: this.mainVariant,
      };
      // console.log(data)
      this.$store
        .dispatch("catalogue/updateMainVaraint", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: "Item Updated",
          });
          this.editMainVariantModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "danger",
            text: "Item Error",
          });
        });
    },
  },

  mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    this.$store.dispatch("catalogue/getAllSalesProduct", userInfo);
    this.$store.dispatch("catalogue/getAllBrand");
    this.$store.dispatch("catalogue/getAllItemCategory");
  },

  watch: {
    items: function () {
      if (this.items.length === 0) {
        this.showAction = false;
      } else {
        this.showAction = true;
      }
    },
  },
};
</script>

<style></style>
