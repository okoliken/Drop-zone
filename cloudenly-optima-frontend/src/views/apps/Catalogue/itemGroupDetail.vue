<template>
  <div class="bg-white">
    <div class="py-5">
      <div
        v-if="getIsAccOwner || getSalesCataloguePrivileges.viewItemRegister"
        class="mt-3"
      >
        <div v-if="filterItem.length > 0" class="bg-white">
          <div class="flex items-center justify-between w-full px-3 mt-2 mb-2">
            <div class="flex items-center w-2/3">
              <div class="mr-3 w-1/2">
                <select
                  class="w-full py-2 border border-1 border-gray-400 rounded-lg"
                >
                  <option>All</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>

              <div
                class="
                  1/4
                  flex
                  items-center
                  border border-1
                  rounded-lg
                  border-gray-400
                  px-2
                "
              >
                <svg
                  class="mx-4"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.79941 3.69988H3.19946V2.89901H1.60018V5.30054H14.3997V2.89901H12.7994V3.69988H11.1995V2.89901H4.79941V3.69988ZM14.3997 6.90048H1.60018V14.8986H14.3997V6.90048ZM11.1995 1.30054H4.79941V0.5H3.19946V1.30054H1.59994C0.716318 1.30054 0 2.01686 0 2.90048V14.9C0 15.7837 0.716318 16.5 1.59994 16.5H14.3995C15.2831 16.5 15.9994 15.7837 15.9994 14.9V2.90048C15.9994 2.01686 15.2831 1.30054 14.3995 1.30054H12.7994V0.5H11.1995V1.30054ZM5.59994 10.0998H4V8.49988H5.59994V10.0998ZM7.19946 10.0998H8.79941V8.49988H7.19946V10.0998ZM11.9998 10.0998H10.3998V8.49988H11.9998V10.0998ZM4 13.299H5.59994V11.6991H4V13.299ZM8.79941 13.299H7.19946V11.6991H8.79941V13.299Z"
                    fill="#070707"
                  />
                </svg>

                <svg
                  class="mr-3"
                  width="1"
                  height="37"
                  viewBox="0 0 1 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.25"
                    y1="0.75"
                    x2="0.249999"
                    y2="36.25"
                    stroke="#9BA0A7"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class="p-0 border-0 m-0"
                  placeholder="*To Date"
                  type="date"
                  name="date"
                  id=""
                />
              </div>
              <div class="ml-3 w-1/4">
                <select
                  class="py-2 border border-1 border-gray-400 rounded-lg"
                  name=""
                  id=""
                >
                  <option value="">2022</option>
                </select>
              </div>

              <div class="flex items-center ml-5">
                <div
                  class="
                    1/4
                    flex
                    items-center
                    border border-1
                    rounded-lg
                    border-gray-400
                    px-2
                  "
                >
                  <svg
                    class="mx-4"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.79941 3.69988H3.19946V2.89901H1.60018V5.30054H14.3997V2.89901H12.7994V3.69988H11.1995V2.89901H4.79941V3.69988ZM14.3997 6.90048H1.60018V14.8986H14.3997V6.90048ZM11.1995 1.30054H4.79941V0.5H3.19946V1.30054H1.59994C0.716318 1.30054 0 2.01686 0 2.90048V14.9C0 15.7837 0.716318 16.5 1.59994 16.5H14.3995C15.2831 16.5 15.9994 15.7837 15.9994 14.9V2.90048C15.9994 2.01686 15.2831 1.30054 14.3995 1.30054H12.7994V0.5H11.1995V1.30054ZM5.59994 10.0998H4V8.49988H5.59994V10.0998ZM7.19946 10.0998H8.79941V8.49988H7.19946V10.0998ZM11.9998 10.0998H10.3998V8.49988H11.9998V10.0998ZM4 13.299H5.59994V11.6991H4V13.299ZM8.79941 13.299H7.19946V11.6991H8.79941V13.299Z"
                      fill="#070707"
                    />
                  </svg>

                  <svg
                    class="mr-3"
                    width="1"
                    height="37"
                    viewBox="0 0 1 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.25"
                      y1="0.75"
                      x2="0.249999"
                      y2="36.25"
                      stroke="#9BA0A7"
                      stroke-width="0.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <input
                    class="p-0 border-0 m-0"
                    placeholder="*To Date"
                    type="date"
                    name="date"
                    id=""
                  />
                </div>
                <div class="ml-3 w-1/4">
                  <select
                    class="py-2 border border-1 border-gray-400 rounded-lg"
                    name=""
                    id=""
                  >
                    <option value="">2022</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <svg
                width="1"
                height="19"
                viewBox="0 0 1 19"
                fill="none"
                p="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  y1="0.25"
                  x2="0.249999"
                  y2="18.75"
                  stroke="#9BA0A7"
                  stroke-width="0.5"
                  stroke-linecap="round"
                />
              </svg>

              <div class="ml-5 mr-5">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 3.84297L5.6 9.95479V16.5L10.4 14.781V9.95479L16 3.84297V2.02796C16 1.18409 15.2837 0.5 14.4 0.5H1.6C0.716344 0.5 0 1.18409 0 2.02796V3.84297ZM14.4011 2.02803V2.79205H1.6011V2.02803H14.4011ZM2.56415 4.32001H13.4381L9.23819 8.90372H6.76401L2.56415 4.32001ZM7.2011 10.4317V14.2952L8.8011 13.7223V10.4317H7.2011Z"
                    fill="#070707"
                  />
                </svg>
              </div>

              <svg
                width="1"
                height="19"
                viewBox="0 0 1 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  y1="0.25"
                  x2="0.249999"
                  y2="18.75"
                  stroke="#9BA0A7"
                  stroke-width="0.5"
                  stroke-linecap="round"
                />
              </svg>

              <div class="ml-3">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.06464 2.5H17.0646C17.5951 2.5 18.1038 2.71071 18.4788 3.08579C18.8539 3.46086 19.0646 3.96957 19.0646 4.5V11.58C17.5601 11.3272 16.0157 11.6561 14.7446 12.5H11.0646V16.5H12.1446C12.0346 17.18 12.0346 17.85 12.1446 18.5H3.06464C2.5342 18.5 2.0255 18.2893 1.65042 17.9142C1.27535 17.5391 1.06464 17.0304 1.06464 16.5V4.5C1.06464 3.4 1.96464 2.5 3.06464 2.5ZM3.06464 6.5V10.5H9.06464V6.5H3.06464ZM11.0646 6.5V10.5H17.0646V6.5H11.0646ZM3.06464 12.5V16.5H9.06464V12.5H3.06464ZM22.8446 18.82L21.7746 18C21.7946 17.83 21.8146 17.67 21.8146 17.5C21.8146 17.33 21.8046 17.17 21.7746 17L22.8346 16.18C22.8796 16.1415 22.91 16.0887 22.9209 16.0306C22.9318 15.9724 22.9226 15.9122 22.8946 15.86L21.8946 14.13C21.8346 14 21.7046 14 21.5646 14L20.3446 14.5C20.0646 14.32 19.8046 14.15 19.4946 14.03L19.3046 12.71C19.2946 12.59 19.1846 12.5 19.0646 12.5H17.0646C16.9446 12.5 16.8346 12.59 16.8146 12.71L16.6246 14.03C16.3246 14.16 16.0346 14.32 15.7746 14.5L14.5346 14C14.4246 14 14.2946 14 14.2246 14.13L13.2246 15.86C13.1646 15.97 13.1846 16.1 13.2846 16.18L14.3446 17C14.3047 17.3321 14.3047 17.6679 14.3446 18L13.2846 18.82C13.2397 18.8585 13.2093 18.9113 13.1983 18.9694C13.1874 19.0276 13.1967 19.0878 13.2246 19.14L14.2246 20.87C14.2846 21 14.4146 21 14.5346 21L15.7746 20.5C16.0346 20.68 16.3146 20.85 16.6246 20.97L16.8146 22.29C16.8346 22.41 16.9346 22.5 17.0646 22.5H19.0646C19.1846 22.5 19.2946 22.41 19.3146 22.29L19.5046 20.97C19.8046 20.84 20.0646 20.68 20.3446 20.5L21.5646 21C21.7046 21 21.8346 21 21.9046 20.87L22.9046 19.14C22.9326 19.0878 22.9418 19.0276 22.9309 18.9694C22.92 18.9113 22.8896 18.8585 22.8446 18.82ZM18.0646 19C17.2346 19 16.5646 18.33 16.5646 17.5C16.5646 16.67 17.2446 16 18.0646 16C18.8846 16 19.5646 16.67 19.5646 17.5C19.5646 18.33 18.9046 19 18.0646 19Z"
                    fill="#14171F"
                  />
                </svg>
              </div>
            </div>
          </div>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr class>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item Code
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Brand
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Description
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
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <div class="flex">
                    <div class="mt-4">{{ item.variantName }}</div>
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ item.variantCode }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ item.brand | formatCat }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ item.description }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
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
                  <!-- <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      
                    </vs-dropdown-menu>
                  </vs-dropdown> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="flex items-center justify-center mx-auto py-20">
          <div class="mr-8">
            <img src="../../../assets/images/optimaAsset/product.svg" alt />
          </div>

          <div class="">
            <p class="font-semibold mb-3 text-primary-optima-color">
              There are no purchase catalogue at the moment
            </p>
            <p class="mb-3">
              Create new or import with the options below.
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
        <div class="p-2 py-5">
          <s-pagination></s-pagination>
        </div>
        <!-- End Pagination -->
      </div>

      <div v-else>
        <s-privilege />
      </div>
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
    ...mapGetters("catalogue/productItem", ["getProductDetailItem"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesCataloguePrivileges",
    ]),

    filterItem() {
      return this.getProductDetailItem.filter((resp) => {
        return resp.variantName
          .toLowerCase()
          .includes(this.search.toLowerCase());
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
        name: "CreateEditProductItem",
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
  },

  mounted() {
    this.$store.dispatch(
      "catalogue/productItem/getProductDetailsActionOrganization"
    );
  },
};
</script>

<style>
</style>