<template>
  <div style="font-size: 14px">
    <!-- loyalty Setting -->
    <vs-popup
      :button-close-hidden="true"
      title=" New Loyalty Scheme"
      :active.sync="openPopUpLoyalty"
    >
      <div class="py-5">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span class="strong">Loyalty Name</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <input
              v-model="loyaltyData.loyaltyCategory"
              class="py-2 px-2 border-2 border-gray-400 rounded w-full"
            />
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span class="strong">Discount Rate (%)</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <input
              type="number"
              class="py-2 px-2 border-2 border-gray-400 rounded w-full"
              v-model="loyaltyData.discountRate"
            />
          </div>
        </div>
        <div class="pt-5 flex items-center justify-between">
          <button
            class="px-8 py-4 rounded-full"
            style="background: #f3f6f9; color: #1034a6"
            @click="openPopUpLoyalty = false"
          >
            Cancel
          </button>
          <button
            @click="saveNewLoyalty"
            :class="{ 'cursor-not-allowed': saveLoyaltyButton }"
            class="
              px-6
              py-4
              mr-12
              rounded-full
              bg-primary-optima-color
              text-white
            "
          >
            Save Loyalty
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Loyalty Setting -->

    <!-- second section -->

    <back location="Create New Promotion" class="mb-8" />

    <div class="bg-white">
      <div v-if="getIsAccOwner || getPromotionPrivileges.createNewPromotion">
        <div class="bg-white px-6 pt-8 pb-10 rounded">
          <div class="flex items-center justify-between mb-10">
            <h2 class="font-semibold">Promo Details</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="mr-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <div class="grid grid-cols-12 col-gap-16 gap-10">
            <s-text
              label="Promo Name:"
              placeholder="Enter Promo Name"
              class="col-span-4 mb-12"
              v-model="promoDetails.name"
            />

            <s-text
              label="Promo Reference Code:"
              placeholder="Enter Promo Code"
              class="col-span-4"
              v-model="promoDetails.promoCode"
            />
            <!-- <s-text label="Justification:" placeholder="" class="col-span-4" /> -->

            <s-text
              label="Start Date:"
              type="date"
              class="col-span-4 mb-12"
              v-model="promoDetails.startDate"
            />

            <s-text
              label="End Date:"
              type="date"
              class="col-span-4"
              v-model="promoDetails.endDate"
            />
            <s-select-chipped
              label="Target Outles(s):"
              :options="outlets"
              class="col-span-4"
              v-model="promoDetails.outletsIds"
            />
            <s-select-chipped
              label="Target Groups:"
              :options="targetAudiences"
              class="col-span-4"
              v-model="promoDetails.contactCategories"
            />

            <s-text
              label="Promo Rate (%):"
              type="number"
              class="col-span-4"
              v-model="promoDetails.discount"
            />

            <div class="col-span-4">
              <s-select-chipped
                label="Sub-Target Group"
                :options="allLoyalty"
                v-model="promoDetails.loyaltyIds"
              />
            </div>
            <!-- <div v-else class="text-base text-primary-optima-color cursor-pointer text-nowrap" @click="createLoyaltyModal">Set Up loyalty</div> -->
            <div class="col-span-12">
              <div class="mb-3">
                <label class="form-label inline-block mb-2">Description:</label>
                <textarea
                  v-model="promoDetails.description"
                  class="
                    form-control
                    block
                    w-full
                    px-3
                    py-6
                    text-base
                    font-normal
                    border-1 border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                  "
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="-- Enter --"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="col-span-12 mb-12">
            <h2 class="font-semibold">Promo item(s)</h2>
          </div>

          <!-- <table class="col-span-12">
            <thead>
              <th class="" style="padding: 0; font-size: 12px">#</th>
              <th
                class="text-sm font-normal"
                style="padding: 0; font-size: 12px; color: #507fdf"
                v-for="(header, i) in headers"
                :key="i"
              >
                {{ header }}
              </th>
            </thead>

            <tbody v-if="!promoDetails.promoBoqs.length">
              <tr class="h-16">
                <td>1</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr
                v-for="(item, i) in promoDetails.promoBoqs"
                :key="i"
                class="h-20"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.category }}</td>
                <td>
                  <input
                    type="number"
                    class="py-2 px-4 rounded"
                    style="border: 1px solid; height: 32px; width: 100px"
                    v-model="item.promoDiscount"
                  />
                </td>
                <td>
                  <feather-icon
                    @click="deleteItem(index)"
                    icon="Trash2Icon"
                    class="text-cloudenly-danger-main w-5 cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>  -->

          <div class="col-span-12 mt-16 mb-5">
            <button
              class="text-primary-optima-color font-medium float-right"
              @click="hide = !hide"
            >
              {{ !hide ? "Hide" : "Add an Item/Service" }}
            </button>
          </div>

          <s-content-seperator class="mb-12" />

          <div class="col-span-12 font-normal" v-if="!hide">
            <div class="flex items-center">
              <s-combo-box />

              <div class="ml-12">
                {{ getAllVariant.length }} Items in Catalogue
              </div>
            </div>

            <div class="mt-8 mb-8">Selected Products (0):</div>

            <div class="mb-5">All Products</div>

            <div style="height: 270px; overflow-y: scroll">
              <div
                class="grid grid-cols-12 mb-8"
                v-for="(item, i) in getAllVariant"
                :key="i"
              >
                <div class="col-span-6">
                  <div class="font-semibold mb-2">
                    {{ i + 1 }}. {{ item.variantName }}
                  </div>
                  <div class="flex items-center">
                    <span>Item description: {{ item.item.description }}</span>
                    <span class="ml-8"
                      >Item type: {{ item.productOrService }}</span
                    >
                  </div>
                </div>

                <div class="col-span-3 flex items-center">
                  <span>{{ item.stockBalance }} &nbsp;</span>in stock
                </div>

                <div class="col-span-3 ">
                  <button
                    class="text-primary-optima-color"
                    @click="addItem(item)"
                    v-if="item.stockBalance"
                  >
                    Add this Item
                  </button>

                  <div style="color: #9ba0a7" v-else>Item Out of Stock</div>
                </div>
              </div>
            </div>
          </div>
          <h1 class="mt-10">Promo Category</h1>
          <div class="col-span-12 mt-8">
            <s-tabs
              :tabs="tabs"
              :activeTab="currentTab"
              @currentTab="currentTab = $event"
            />

            <component
              v-bind:is="currentTabComponent"
              :promoBoqs="promoDetails.promoBoqs"
            />
          </div>
        </div>

        <div class="flex justify-between py-4">
          <button
            class="px-8 mx-6 py-4 rounded-full"
            style="background: #f3f6f9; color: #1034a6"
            @click="createDraft,routeBack()"
          >
            Cancel
          </button>

          <div class="flex items-center">
            <button
              class="
                px-8
                py-4
                mr-12
                rounded-full
                bg-primary-optima-color
                text-white
              "
              @click="createPromo"
            >
              <feather-icon
                v-show="draftButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
              />
              Save
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/Products.vue";
import Service from "../loyalty&promotion/Service.vue";
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

import AddItem from "../../../components/AddItemWidget/catalogue";
import alertPrivilege from "../../../components/Alert/AlertPrevilege";
import Back from "@/components/Back.vue";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import totalQuotes from "@/assets/images/optimaAsset/icon_total_quote.svg";
import unpaidInvoice from "@/assets/images/optimaAsset/icon_unpaid_invoice.svg";
import approvedQuote from "@/assets/images/optimaAsset/icon_approved_quote_value.svg";

export default {
  name: "CreatePromotion",
  components: {
    Service,
    Product,
    Datepicker,
    AddItem,
    alertPrivilege,
    Back,
    StatisticsCardLine
  },
  data() {
    return {
      currentTab: "Product",
      tabs: ["Product", "Service"],
      showPromoDetail: true,
      showPromoInfo: true,
      loyaltyData: {
        loyaltyCategory: "",
        discountRate: 0
      },
      totalQuotes,
      unpaidInvoice,
      approvedQuote,
      hide: true,
      saveButton: false,
      draftButton: false,
      saveLoyaltyButton: false,
      isItem: false,
      openPopUpLoyalty: false,
      promoDetails: {
        name: "",
        description: "",
        discount: "",
        loyaltyIds: [],
        outletsIds: [],
        contactCategories: "",
        promoCode: "",
        promoBoqs: [],
        status: "inactive",
        isDraft: false,
        startDate: moment().format("YYYY-MM-DD"),
        endDate: ""
      },

      newData: {
        id: "",
        loyaltyCategory: "Not Applicable (N/A)",
        discountRate: ""
      },

      targetAudiences: [
        { name: "leads", id: "leads" },
        { name: "opportunities", id: "opportunities" },
        { name: "Retail Customers", id: "retailCustomers" },
        { name: "Wholesale Customers", id: "wholesaleCustomers" },
        { name: "all", id: "all" },
        { name: "single", id: "single" }
      ],
      headers: ["Item Name", "Item Category", "Promo Discount (%)", "Actions"],
      selectedCatalogueItems: []
    };
  },

  computed: {
    currentTabComponent() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase();
    },
    ...mapGetters("crm/loyalty", ["allLoyalty", "getIsLoyaltySetup"]),
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getPromotionPrivileges"]),

    disabledDatesTo() {
      return {
        to: new Date(this.promoDetails.startDate)
      };
    },
    

    outlets() {
      return this.getAllOrganisationLocation.outlets;
    },
    getAllLoyalty() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.allLoyalty.push(this.newData);
      return this.allLoyalty.map(resp => {
        return {
          id: resp.id,
          loyaltyCategory: resp.loyaltyCategory
        };
      });
    }
  },
  methods: {
    routeBack() {
      this.$router.back();
    },
     createLoyaltyModal() {
      this.$router.push ({
        name: "CreateLoyalty"
      })
    },

    saveNewLoyalty() {
      // function to create Loyalty
      this.saveLoyaltyButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let Data = {
        userInfo: userInfo,
        payload: this.loyaltyData
      };
      this.$store
        .dispatch("crm/loyalty/createNewLoyalty", Data)
        .then(resp => {
          console.log(resp.data);
          if (resp.data) {
            this.saveLoyaltyButton = false;
            this.openPopUpLoyalty = false;
          }
        })
        .catch(err => {
          this.saveLoyaltyButton = false;
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.error,
            color: "danger",
            position: "top-right"
          });
        });
    },

    addItem(val) {
      console.log(val);
      if (val.item.category == null) {
        this.promoDetails.promoBoqs.push({
          variantId: val.id,
          name: val.variantName,
          category: "",
          image: val.image,
          discount: this.discount,
          promoCode: this.promoDetails.promoCode
        });
      } else {
        this.promoDetails.promoBoqs.push({
          variantId: val.id,
          name: val.variantName,
          category: val.item.category.name || "",
          image: val.image,
          discount: this.promoDetails.discount
        });
        console.log(this.discount, "hi");
      }

      this.$vs.notify({
        title: "Item",
        text: "Item added ",
        color: "primary",
        position: "top-right"
      });
    },

    deleteItem(val) {
      this.promoDetails.promoBoqs.splice(val, 1);
    },

    createPromo(scope) {
      // if( this.promoDetails.promoBoqs.length == 0){
      // this.$vs.notify({
      //         title: "Promotion",
      //         text: 'Add an Item',
      //         color: "danger",
      //         position: "top-right",
      //       });
      // }else{
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          // this.draftButton = true;
          this.promoDetails.isDraft = false;
          this.promoDetails.outletsIds = this.promoDetails.outletsIds.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.loyaltyIds = this.promoDetails.loyaltyIds.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.contactCategories = this.promoDetails.contactCategories.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.discount = parseInt(this.promoDetails.discount);
          let userInfo = this.$store.state.auth.auth.authData;
          let newUserInfo = {
            orgId: userInfo.orgId,
            outletId: userInfo.outletId,
            creatorId: userInfo.creatorId
          };

          let data = {
            payload: this.promoDetails,
            userInfo: newUserInfo
          };

          console.log(data); 

          this.$store
            .dispatch("crm/promotions/createPromotion", data) 
            .then(resp => {
              this.draftButton = false;
              this.$router.push({ name: "LoyaltyPromotion" });
              this.$vs.notify({
                title: "Promotion",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.draftButton = false;
              this.$vs.notify({
                title: "Promotion",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          console.log("hello");
        }
      });
    },
    createDraft(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          this.promoDetails.isDraft = true;
          this.promoDetails.outletsIds = this.promoDetails.outletsIds.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.loyaltyIds = this.promoDetails.loyaltyIds.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.contactCategories = this.promoDetails.contactCategories.map(
            resp => {
              return resp.id;
            }
          );
          this.promoDetails.discount = parseInt(this.promoDetails.discount);
          let userInfo = this.$store.state.auth.auth.authData;
          let newUserInfo = {
            orgId: userInfo.orgId,
            outletId: userInfo.outletId,
            creatorId: userInfo.creatorId
          };

          let data = {
            payload: this.promoDetails,
            userInfo: newUserInfo
          };

          console.log(data);

          this.$store
            .dispatch("crm/promotions/createDraftPromotion", data)
            .then(resp => {
              this.draftButton = false;
              this.$router.push({ name: "LoyaltyPromotion" });
              this.$vs.notify({
                title: "Promotion",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.draftButton = false;
              this.$vs.notify({
                title: "Promotion",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        }
      });
    },
    sharePromotion(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp && this.promoDetails.promoBoqs.length > 0) {
          this.saveButton = true;
          let userInfo = this.$store.state.auth.auth.authData;
          let newUserInfo = {
            orgId: userInfo.orgId,
            outletId: userInfo.outletId,
            creatorId: userInfo.creatorId,
            outletIds: [userInfo.outletId]
          };
          let data = {
            userInfo: newUserInfo,
            payload: this.promoDetails
          };
          this.$store
            .dispatch("crm/promotions/sharePromotion", data)
            .then(resp => {
              this.saveButton = false;
              this.$router.push({ name: "LoyaltyPromotion" });
              this.$vs.notify({
                title: "Promotion",
                text: resp.data.status,
                color: "primary",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.saveButton = false;
              this.$vs.notify({
                title: "Promotion",
                text: err.response.data.error,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          // console.log("hello");
        }
      });
    }
  },

  mounted() {
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.$store.dispatch("catalogue/getAllCatalogueVariant");
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  }
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #ccc;
  border-radius: 3px;
  height: 32px;

  &::placeholder {
    color: #9ba0a7;
  }
}

.important {
  width: 500px !important;
}
</style>
