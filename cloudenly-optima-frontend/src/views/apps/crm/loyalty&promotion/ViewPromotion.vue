<template>
  <div>
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
              class="py-2 px-2 border border-grey rounded w-full"
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
              class="py-2 px-2 border border-grey rounded w-full"
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
            :class="{ 'cursor-not-allowed': saveLoyaltyButtonFalse }"
            class="px-6 py-4 mr-12 rounded-full bg-primary-optima-color text-white"
          >
            Save Loyalty
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Loyalty Setting -->

    <!-- second section -->

    <div v-if="getIsAccOwner || getPromotionPrivileges.updatePromotion">
      <back location="View Promotion" class="mb-8" />

      <div class="bg-white px-6 pt-8 pb-10 rounded">
        <div class="flex items-center justify-between mb-10">
          <h2 class="font-semibold">Promo Details</h2>

          <feather-icon
            icon="AlertCircleIcon"
            svgClasses="mr-3 h-6 w-6 cursor-pointer"
          />
        </div>

        <div class="grid grid-cols-12 col-gap-10">
          <s-text
            label="Promo Name:"
            placeholder="Enter Promo Name"
            class="col-span-4 mb-12 mx-2"
            v-model="promoDetails.name"
            disabled
          />

          <s-text
            label="Promo Reference Code:"
            placeholder="Enter Promo Code"
            class="col-span-4 mx-2"
            v-model="promoDetails.promoCode"
            disabled
          />
         

          <s-text
            disabled
            label="Start Date:"
            type="date"
            class="col-span-4 mb-12 mx-2"
            v-model="promoDetails.startDate"
          />

          <s-text
            disabled
            label="End Date:"
            type="date"
            class="col-span-4 mx-2"
            v-model="promoDetails.endDate"
          />
          <div class="col-span-4 mx-2">
            <label>Target Groups:</label>
            <select disabled class="field mt-2" />
            <div class="flex">
              <ul v-for="item in promoDetails.outletIds" :key="item">
              <li class="ml-2  bg-gray-200 p-4 mt-2">{{ item.name }}</li>
            </ul>
            </div>
          </div>
          <div class="col-span-4 mx-2">
            <label>Sub-Target Groups:</label>
            <select class="field mt-2"></select>
            <div class="flex">
              <ul v-for="item in promoDetails.contactCategories" :key="item">
              <li class="ml-2 bg-gray-200 p-3 mt-2">{{ item }}</li>
            </ul>
            </div>
          </div>

          <div class="col-span-4 mx-2 mt-4">
            <label>Sub-Target Groups:</label>

            <select class="field mt-2"></select>
            <div class="flex ">
              <ul v-for="item in promoDetails.loyaltyIds" :key="item.id" >
              <li class="ml-2  bg-gray-200 p-4 mt-2">{{ item.name }}</li>
            </ul>
            </div>
          </div>

          <s-text
            disabled
            label="Promo Rate (%):"
            type="number"
            class="col-span-4 mx-2 my-4"
            v-model="promoDetails.discount"
          />


          <div></div>
          <div class="col-span-12">
            <div class="mb-12 ">
              <label class="form-label inline-block mt-4 ">Description:</label>
              <textarea
                disabled
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
                    m-0"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="-- Enter --"
              ></textarea>
            </div>
          </div>
          <!-- </div> -->

          <s-content-seperator class="mt-12 mb-12" />

          <div class="col-span-12 mb-12">
            <h2 class="font-semibold">Promo item(s)</h2>
          </div>

          <table class="col-span-12">
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

            <tbody v-if="!promoBoqs.length">
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
          </table>

          <div class="col-span-12 mt-16 mb-5">
            <button
              class="text-primary-optima-color font-medium"
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

            <!-- variant list -->
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

                <div class="col-span-3 flex items-center">
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

          <s-content-seperator class="my-12" v-if="!hide" />
        </div>

        <!-- <div class="flex justify-between">
          <button
            class="px-8 py-4 rounded-full"
            style="background: #f3f6f9; color: #1034a6"
            @click="$router.back()"
          >
            Cancel
          </button>

          <div class="flex items-center">
            <button
              class="px-6 py-4 mr-12 rounded-full bg-primary-optima-color text-white"
              @click="updatePromotion"
            >
              <feather-icon
                v-show="updateButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
              />
              Update
            </button>
          </div>
        </div> -->
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";

import AddItem from "../../../components/AddItemWidget/catalogue";
import alertPrivilege from "../../../components/Alert/AlertPrevilege";
import Back from "@/components/Back.vue";
import moment from "moment";
import { formatDate } from "../../../../utils/formatDate";
export default {
  components: {
    Datepicker,
    AddItem,
    alertPrivilege,
    Back
  },
  data() {
    return {
      showPromoDetail: true,
      showPromoInfo: true,
      loyaltyData: {
        loyaltyCategory: "",
        discountRate: 0
      },

      updateButton: false,
      saveLoyaltyButtonFalse: false,
      hide: true,
      openPopUpLoyalty: false,
      promoBoqs: [],
      promoDetails: {
        name: "",
        description: "",
        discount: "",
        loyaltyIds: [],
        outletsIds: [],
        contactCategories: "",
        promoCode: "",
        incomingPromoBoqs: [],
        outgoingPromoBoqs: [],
        updatedPromoBoqs: [],
        status: "inactive",
        isDraft: false,
        startDate: moment().format("YYYY-MM-DD"),
        endDate: ""
      },
      targetAudiences: [
        { name: "Retail", id: "retail" },
        { name: "Wholesale", id: "wholesale" },
        { name: "All", id: "all" }
      ],
      headers: ["Item Name", "Item Category", "Promo Discount (%)", "Actions"],
      selectedCatalogueItems: []
    };
  },

  computed: {
    ...mapGetters("crm/loyalty", ["allLoyalty", "getisLoyaltySetup"]),
    ...mapGetters("crm/promotions", ["getOnePromo"]),
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getPromotionPrivileges"]),
    outlets() {
      return this.getAllOrganisationLocation.outlets;
    }
  },

  methods: {
    routeBack() {
      //  this.$router.back();
      this.$router.push({
        name: "LoyaltyPromotion"
      });
    },
    saveNewLoyalty() {
      // function to create Loyalty
      let userInfo = this.$store.state.auth.auth.authData;
      let Data = {
        userInfo: userInfo,
        payload: this.loyaltyData
      };
      console.log(Data);
      this.$store
        .dispatch("crm/loyalty/createNewLoyalty", Data)
        .then(resp => {
          console.log(resp.data);
          this.openPopUpLoyalty = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addItem(val) {
      // console.log(val)
      if (val.item.category == null) {
        this.promoBoqs.push({
          variantId: val.id,
          name: val.variantName,
          category: "",
          image: val.image,
          promoDiscount: this.promoDetails.promoDiscount
        });
      } else {
        this.promoBoqs.push({
          variantId: val.id,
          name: val.variantName,
          category: val.item.category.name || "",
          image: val.image,
          promoDiscount: this.promoDetails.promoDiscount
        });
      }

      this.$vs.notify({
        title: "Item",
        text: "Item added ",
        color: "primary",
        position: "top-right"
      });
    },

    deleteItem(val) {
      this.promoBoqs.splice(val, 1);
    },

    updatePromotion() {
      this.updateButton = true;
      // let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        // userInfo: userInfo,
        payload: {
          id: this.promoDetails.id,
          name: this.promoDetails.name,
          description: this.promoDetails.description,
          discount: this.promoDetails.discount,
          loyaltyIds: this.promoDetails.loyaltyIds,
          outletsIds: this.promoDetails.outletsIds,
          contactCategories: this.promoDetails.contactCategories,
          promoCode: this.promoDetails.promoCode,
          incomingPromoBoqs: this.promoBoqs,
          outgoingPromoBoqs: this.promoBoqs,
          upcomingPromoBoqs: this.promoBoqs,
          startDate: this.promoDetails.startDate,
          status: this.promoDetails.status,
          isDraft: true,
          endDate: this.promoDetails.endDate
        }
      };
      this.$store
        .dispatch("crm/promotions/updatePromotion", data)
        .then(resp => {
          this.updateButton = false;
          this.$router.push({ name: "LoyaltyPromotion" });
          this.$vs.notify({
            title: "Promotion",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  },

  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("crm/promotions/getSinglePromotion", id).then(resp => {
      this.promoDetails = resp.data.data;
      this.promoDetails.startDate = formatDate(
        new Date(this.promoDetails.startDate).toDateString()
      );
      this.promoDetails.endDate = formatDate(
        new Date(this.promoDetails.endDate).toDateString()
      );
    });
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.$store.dispatch("catalogue/getAllCatalogueVariant");
  }
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #ccc;
  border-radius: 3px;
  height: 32px;
  width: 370px;

  &::placeholder {
    color: #9ba0a7;
  }
}
</style>
