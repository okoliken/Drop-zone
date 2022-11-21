<template>
  <div>
    <back location="View Product" />

    <div class="py-5 px-5 bg-white mt-5">
      <div class="mt-5">
        <p class="font-semibold">Product Details</p>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between">
          <div class="w-1/3 mr-8">
            <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Name</label>
              </div>
              <div class="w-1/2">
                <input
                  @blur="autoGenerateSKU"
                  :disabled="editPrimaryVariant"
                  v-model="mainVariant.name"
                  type="text"
                  class="
                    py-2
                    px-2
                    border
                    rounded
                    w-full
                    border-2 border-gray-400
                  "
                />
              </div>
            </div>
          </div>

          <div class="w-1/3 mr-16">
            <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Brand</label>
              </div>
              <div class="w-1/2">
                <input
                  v-if="editPrimaryVariant"
                  disabled
                  v-model="mainVariant.brand.name"
                  type="text"
                  class="
                    py-2
                    px-2
                    border
                    rounded
                    w-full
                    border-2 border-gray-400
                  "
                />

                <select
                  v-else
                  v-model="mainVariant.brandId"
                  class="py-2 border border-2 border-gray-400 rounded w-full" 
                  name
                  id
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
          </div>

          <div class="w-1/3 mr-16">
            <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Category</label>
              </div>
              <div class="w-1/2">
                <input
                  v-if="editPrimaryVariant"
                  disabled
                  v-model="mainVariant.category.name"
                  type="text"
                  class="
                    py-2
                    px-2
                    border
                    rounded
                    w-full
                    border-2 border-gray-400
                  "
                />

                <select
                  v-else
                  v-model="mainVariant.categoryId"
                  class="py-2 border border-gray-400 border-2 rounded w-full"
                  name
                  id
                >
                  <option
                    v-for="(category, index) in getallItemCategory"
                    :key="index"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-16">
          <div class="w-1/3 mr-8">
            <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Description</label>
              </div>
              <div class="w-1/2">
                <input
                  :disabled="editPrimaryVariant"
                  v-model="mainVariant.description"
                  type="text"
                  class="
                    py-2
                    px-2
                    border
                    rounded
                    w-full
                    border-2 border-gray-400
                  "
                />
              </div>
            </div>
          </div>

          <div class="w-1/3 mr-16">
            <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Sku</label>
              </div>
              <div class="w-1/2">
                <input
                  v-model="mainVariant.sku"
                  type="text"
                  class="
                    py-2
                    px-2
                    border
                    rounded
                    w-full
                    border-2 border-gray-400
                  "
                />
              </div>
            </div>
          </div>

          <div class="w-1/3 mr-16">
            <!-- <div class="flex items-center">
              <div class="w-1/3">
                <label for class>Brand</label>
              </div>
              <div class="w-1/2">
                <input
                  :disabled="editPrimaryVariant"
                  v-model="mainVariant.brand.name"
                  type="text"
                  class="py-2 px-2 border rounded w-full border-2 border-gray-400"
                />
              </div>
            </div>-->
          </div>
        </div>
      </div>

      <div class="flex flex-row-reverse px-5">
        <div>
          <button
            v-if="editPrimaryVariant"
            @click="toggleEdit"
            href="#"
            class="flex items-center text-cloudenly-primary-main"
          >
            <span>
              <feather-icon
                svgClasses="h-5 w-5 mr-1"
                icon="EditIcon"
              ></feather-icon>
              Edit Primary Variant
            </span>
          </button>

          <button
            @click="updatePrimaryVariant"
            v-else
            href="#"
            class="
              flex
              items-center
              bg-primary-optima-color
              rounded-full
              py-4
              px-5
              text-white
            "
            :class="{
              'cursor-not-allowed': updateButton,
              'bg-cloudenly-primary-off': updateButton,
            }"
          >
            <span> Update Primary Variant </span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="p-8 bg-white">
        <div class>
          <p class="font-semibold">Variant</p>
        </div>

        <div class="flex items-center justify-between mt-8">
          <p class="text-dark-optima-color">
            Total Variant :
            <span class="font-semibold">{{ mainVariant.variants.length }}</span>
          </p>

          <a class="flex items-center" @click.prevent="createNewVariant" href>
            <span>
              <feather-icon
                svgClasses="h-5 w-5 mr-1"
                icon="PlusCircleIcon"
              ></feather-icon>
            </span>
            <span>Add Another Variant</span>
          </a>
        </div>
      </div>

      <div class="mt-2">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-gray-300">
            <tr>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Name
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Brand
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Description
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Manufacture Part No
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Variant SKU
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white"
              v-for="(variant, index) in mainVariant.variants"
              :key="index"
            >
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                <div class="flex items-center">
                  <img v-if="variant.image" :src="variant.image" class="h-16 w-16 rounded-full object-cover mr-3" alt="" srcset="" />
                  <div class="">
                    {{ variant.variantName }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ mainVariant.brand.name }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ mainVariant.description }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ variant.manufacturerPartNumber }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ variant.variantSku }}
              </td>

              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                <vs-dropdown
                  v-if="
                    getIsAccOwner ||
                    getPurchaseCataloguePrivileges.viewItemRegister
                  "
                  vs-custom-content
                  vs-trigger-click
                >
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                  <vs-dropdown-menu>
                    <ul style="min-width: 10rem">
                      <li
                        @click="routeViewVariant(variant)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <feather-icon
                          icon="CheckSquareIcon "
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2"> View</span>
                      </li>

                      <li
                        @click="routeEditVariantCatalogue(variant)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary hover:text-white
                        "
                      >
                        <feather-icon
                          icon="CheckSquareIcon "
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2">Edit</span>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


        <!-- <div class="flex items-center">
          <p class="mr-2">Show :</p>
          <select name class="py-2 px-2 mr-2 border" id>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <p>Per Page</p>
        </div>

        <div class="flex items-center">
          <p class="mr-2">Showing Page</p>
          <feather-icon
            icon="ChevronLeftIcon"
            svgClasses="border h-6 w-6 cursor-pointer mr-3"
          ></feather-icon>
          <p>1</p>
          <feather-icon
            icon="ChevronRightIcon"
            svgClasses="border h-6 w-6 cursor-pointer ml-3"
          ></feather-icon>
        </div> -->


      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Drawer from "../../components/Drawer/drawer";
// import updateVariant from "./variant/updateVariantInfo";

export default {
  components: {
    Drawer,
  },
  data() {
    return {
      editPrimaryVariant: true,
      mainVariant: "",
      itemId: "",
      drawer: false,
      variant: "",
      outletIds: [],
      updateButton: false,
    };
  },

  methods: {
    close() {
      this.drawer = false;
    },

    toggleEdit() {
      this.editPrimaryVariant = false;
    },

    routeEditVariantCatalogue(val) {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          variantId: val.id,
          itemId: this.itemId,
          type : "edit-item"
        },
      });
    },
    routeViewVariant(val) {
      this.$router.push({
        name: "ViewVariantInformation",
        query: {
          variantId: val.id,
          itemId: this.itemId,
        },
      });
    },

    createNewVariant() {
      this.$router.push({
        name: "CreateCatalogue",
        params: {
          id: this.mainVariant.id,
        },
        query: {
          type: "add-variant",
           id: this.mainVariant.id,
        }
      });
    },

    autoGenerateSKU() {
      // let data = {
      //   userInfo: this.$store.state.auth.auth.authData,
      //   payload: {
      //     moduleName: "sku",
      //     productName: this.mainVariant.name,
      //     yearOfBirth: null,
      //     contactName: null,
      //   },
      // };
      // this.$store
      //   .dispatch("catalogue/getGenerateSkuCode", data)
      //   .then((resp) => {
      //     this.mainVariant.sku = resp.data.code;
      //   })
      //   .catch((err) => {
      //     // eslint-disable-next-line no-console
      //     console.log(err);
      //   });
    },

    updatePrimaryVariant() {
      this.updateButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: this.mainVariant.outletIds,
      };

      let data = {
        id: this.mainVariant.id,
        categoryId: this.mainVariant.categoryId,
        name: this.mainVariant.name,
        sku: this.mainVariant.sku,
        brandId: this.mainVariant.brandId,
        description: this.mainVariant.description,
        currency: this.mainVariant.currency,
        barcode: this.mainVariant.barcode, 
      };

      let payload = {
        userInfo: userInfo,
        payload: data,
      };

      this.$store
        .dispatch("catalogue/updateItemInformation", payload)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              id: this.itemId,
            };
            this.$store
              .dispatch("catalogue/getItemVariant", data2)
              .then((resp) => {
                this.mainVariant = resp.data.item;
              });
          }
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
          this.editPrimaryVariant = true;
          this.updateButton = false;
        })
        .catch((err) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
        });
    },
  },

  computed: {
    ...mapGetters("catalogue", [
      "getItemVariant",
      "getallBrand",
      "getallItemCategory",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseCataloguePrivileges",
    ]),
  },

  watch: {
    mainVariant: function () {
      console.log("hello");
      if (this.mainVariant.category && this.mainVariant.brand === null) {
        this.mainVariant.category.name = "";
        this.mainVariant.brand.name = "";
      } else {
        return (this.mainVariant.category.name =
          this.mainVariant.category.name);
      }
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getAllBrand");
    this.$store.dispatch("catalogue/getAllItemCategory");
    this.itemId = this.$route.params.id;

    let payload = {
      id: this.itemId,
    };
    this.$store
      .dispatch("catalogue/getItemVariant", payload)
      .then((resp) => {
        console.log(resp.data.item);
        this.mainVariant = resp.data.item;

      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },
};
</script>
<style scoped>
</style>