<template>
  <div>
    <back location="Create New Sale" />

    <!-- Add New Modal -->
    <s-modal :modal="addNewModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Add New
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="close"
          />
        </div>
        <s-text
          label="Name:"
          :width="400"
          class="mb-4"
          v-model="network.name"
          placeholder="-- Enter --"
        />
        <s-text
          label="Email:"
          :width="400"
          class="mb-4"
          v-model="network.email"
          placeholder="-- Enter --"
        />
        <s-text
          label="Phone Number:"
          :width="400"
          placeholder="-- Enter --"
          class="mb-4"
          v-model="network.phoneNumber"
        />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="close"
          >
            Cancel
          </s-button>

          <s-button
            class="px-8 bg-primary-optima-color text-white capitalize"
            @click="saveNewCustomer"
          >
            Save
          </s-button>
        </div>
      </div>
    </s-modal>

    <div class="bg-white px-5 py-10 mt-8">
      <div class="flex items-center space-x-6 justify-between">
        <div class="w-1/3">
          <label class="text-base w-full" for=""
            >Reference:
            <s-text
              placeholder="--Enter--"
              class="mt-3 w-full"
              v-model="posDetails.reference"
          /></label>
        </div>

        <div class="w-1/3">
          <div class="w-full">
            <div class="flex justify-between items-center">
              <label class="text-base" for="">Customer: </label>
              <div
                class="text-base cursor-pointer text-cloudenly-primary-main"
                @click="openAddNewModal"
              >
                Add New
              </div>
            </div>

            <s-select
              v-model="selectedCustomer"
              :options="allContact"
              default-option="--Search or create new--"
              class="mt-3 w-full"
            />
          </div>
        </div>

        <div class="w-1/3">
          <label class="text-base w-full" for=""
            >Sales Date:
            <s-text
              type="date"
              v-model="posDetails.salesDate"
              placeholder="--Enter--"
              label=""
              class="mt-3 w-full"
          /></label>
        </div>
        <div>
          <s-select
            v-model="posDetails.salesType"
            label="Type:"
            :width="245"
            default-option="--Select--"
            class=""
            :options="type"
          />
        </div>
      </div>

      <div class="mt-16 flex items-center justify-between">
        <div
          class="
            border-blue-200
            rounded-md
            text-cloudenly-primary-main
            py-4
            px-8
            border-1
            cursor-pointer
          "
        >
          QR Code
        </div>
        <!-- <div
          @click="addItem"
          class="
            flex
            items-center
            rounded-full
            py-3
            px-8
            cursor-pointer
            bg-cloudenly-primary-main
            text-white
          "
        >
          <span class="mr-2"
            ><svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 18C4.52944 18 0.5 13.9706 0.5 9C0.5 4.02944 4.52944 0 9.5 0C14.4706 0 18.5 4.02944 18.5 9C18.5 13.9706 14.4706 18 9.5 18ZM9.50086 16.3646C13.5677 16.3646 16.8645 13.0678 16.8645 9.00095C16.8645 4.93413 13.5677 1.63732 9.50086 1.63732C5.43403 1.63732 2.13722 4.93413 2.13722 9.00095C2.13722 13.0678 5.43403 16.3646 9.50086 16.3646ZM13.59 8.18077H10.3173V4.90805H8.6809V8.18077H5.40817V9.81714H8.6809V13.0899H10.3173V9.81714H13.59V8.18077Z"
                fill="white"
              />
            </svg>
          </span>
          Add Item / Service
        </div> -->
      </div>
      <div class="col-span-12 mt-16 mb-5">
        <button
          class="text-primary-optima-color font-medium float-right mt-4"
          @click="hideItem = !hideItem"
        >
          {{ !hideItem ? "Hide" : "Add an Item/Service" }}
        </button>
      </div>

      <s-content-seperator class="mb-12" />

      <div class="col-span-12 font-normal" v-if="!hideItem">
        <div class="flex items-center">
          <s-combo-box />

          <div class="ml-12">{{ getAllVariant.length }} Items in Catalogue</div>
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
                <span class="ml-8">Item type: {{ item.productOrService }}</span>
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

      <div class="mt-8">
        <table class="table min-w-full">
          <thead class="bg-gray-300">
            <tr class="border-1 border-gray-500">
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Item Name
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Quantity
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Unit Price
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Line Discount
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Line Total
              </th>
              <th
                colspan="3"
                class="py-4 px-3 tracking-wider text-dark-optima-color"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(boq, index) in selectedItem"
              :key="index"
              class="
                hover:bg-grey-lightest
                border-1 border-gray-500
                font-normal
              "
            >
              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ boq.name }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                <s-text v-model="boq.quantity" @keyup="calcLineTotal(boq)" />
              </td>

              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                ₦ {{ boq.unitPrice | formatCurrency }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ boq.lineDiscountAmount }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ boq.lineDiscountAmount | formatCurrency }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                <svg
                  @click="deleteItem(index)"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8889 2.44445V1.66667C10.8889 0.807561 10.1924 0.111115 9.33333 0.111115H4.66667C3.80756 0.111115 3.11111 0.80756 3.11111 1.66667V2.44445H0.777778C0.348223 2.44445 0 2.79267 0 3.22223C0 3.65178 0.348223 4 0.777778 4H1.55556V12.5556C1.55556 13.8442 2.60022 14.8889 3.88889 14.8889H10.1111C11.3998 14.8889 12.4444 13.8442 12.4444 12.5556V4H13.2222C13.6518 4 14 3.65178 14 3.22223C14 2.79267 13.6518 2.44445 13.2222 2.44445H10.8889ZM9.33333 1.66667H4.66667V2.44445H9.33333V1.66667ZM10.8889 4H3.11111V12.5556C3.11111 12.9851 3.45933 13.3333 3.88889 13.3333H10.1111C10.5407 13.3333 10.8889 12.9851 10.8889 12.5556V4Z"
                    fill="#F15846"
                  />
                  <path
                    d="M4.66667 5.55556H6.22222V11.7778H4.66667V5.55556Z"
                    fill="#F15846"
                  />
                  <path
                    d="M7.77778 5.55556H9.33333V11.7778H7.77778V5.55556Z"
                    fill="#F15846"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white" v-if="!selectedItem.length">
          <div class="bg-white p-8 flex items-center  justify-center">
            <div><img :src="illustration" alt="illustration" /></div>
            <div class="">
              <div class="text-cloudenly-primary-main text-base mb-5">
                No item was selected at the moment
              </div>
              <div class="text">
                Please select or add an item from the catalogue above then <br />
                the items added will show up here
              </div>
              <div
                class="
            mt-10
            bg-cloudenly-primary-main
            px-8
            py-4
            text-white text-center
            cursor-pointer
            rounded-full
            w-2/4
          "
            @click="hideItem = !hideItem"
              >
              Add Item
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8" v-if="selectedItem.length > 0">
        <div class="space-x-3 flex items-start">
          <div class="border-1 px-4 py-5 border-gray-400">
            Coupon | Promo Code
          </div>
          <div>
            <s-select
              :width="180"
              :height="47"
              default-option="XRT098JI"
              class=""
            />
            <p class="mt-4 text-base text-red-400">
              A Coupon/Promo Discount of <br />
              20% applies
            </p>
          </div>
        </div>

        <div>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr
                class="border-1 border-gray-500"
                v-for="(boq, index) in selectedItem"
                :key="index"
              >
                <th
                  class="
                    py-4
                    col-span-2
                    px-6
                    tracking-wider
                    text-dark-optima-color
                  "
                >
                  Total Discount
                </th>
                <td
                  colspan="4"
                  class="
                    py-4
                    border-1 border-gray-500
                    px-6
                    tracking-wider
                    text-dark-optima-color
                  "
                >
                  <!-- {{boq.discountRate}} -->
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                colspan="2"
                class="
                  hover:bg-grey-lightest
                  border-1 border-gray-500
                  font-normal
                "
              >
                <td
                  class="
                    content-center
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  Sub Total
                </td>
                <td
                  class="
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ calTotalSubLineTotalDiscountAmount | currency }}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr
                colspan="2"
                class="
                  hover:bg-grey-lightest
                  border-1 border-gray-500
                  font-normal
                "
              >
                <td
                  class="
                    content-center
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  Total Tax
                </td>
                <td
                  class="
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  <!-- {{ boq.totalTax | formatCurrency }} -->
                </td>
              </tr>
            </tbody>
            <tbody class="">
              <tr
                colspan="2"
                class="
                  hover:bg-grey-lightest
                  border-1 border-gray-500
                  font-normal
                  bg-gray-300
                "
              >
                <td
                  class="
                    content-center
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  Shipping Cost
                </td>
                <td
                  class="
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                  "
                >
                  7,748.67
                </td>
              </tr>
              <tr
                colspan="2"
                class="
                  hover:bg-grey-lightest
                  border-1 border-gray-500
                  font-normal
                "
              >
                <td
                  class="
                    content-center
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                    text-cloudenly-primary-main
                    font-bold
                  "
                >
                  Grand Cost
                </td>
                <td
                  class="
                    px-6
                    py-4
                    border-1 border-gray-500
                    whitespace-no-wrap
                    border
                    text-cloudenly-primary-main
                    font-bold
                  "
                >
                  7,748.67
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-span-12 mt-8">
        <s-tabs
          :tabs="tabs"
          :activeTab="currentTab"
          @currentTab="currentTab = $event"
        />

        <component v-bind:is="currentTabComponent"  :amount="posDetails.paymentArr.amount" :payment="posDetails.paymentArr.paymentMethod" />
      </div>
      <!-- <div class="mt-10 mb-10">
        <div class="flex space-x-4 px-3 font-bold">
          <p
            class="
              text-cloudenly-primary-main
              cursor-pointer
              hover:bg-gray-500
              py-2
            "
          >
            Full Payment
          </p>
          <p class="py-2 hover:bg-gray-500 cursor-pointer">Split Payment</p>
        </div>

        <hr class="text-gray-400" />
      </div>

      <div class="mt-10 flex space-x-3 items-center">
        <div>
          <label class="text-base" for="">Amount Due: </label>
          <s-select :width="100" default-option="NGN" class="mt-3" />
        </div>
        <div class="mt-6">
          <s-text
            placeholder="--Enter--"
            :width="350"
            v-model="posDetails.paymentArr.amount"
            class=""
          />
        </div>
        <div>
          <label class="text-base" for="">Customer: </label>
          <s-select
            :options="allContact"
            v-model="posDetails.customerName"
            :width="400"
            default-option="--Search or create new--"
            class="mt-3"
          />
        </div>
      </div>-->

      <div class="flex justify-between items-center mt-16 mb-6">
        <div class="text-cloudenly-primary-main cursor-pointer font-bold">Keep on-hold</div>
        <div class="flex space-x-5">
          <div
            class="
              cursor-pointer
              px-8
              py-3
              rounded-full
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
            "
            @click="cancelNewSale"
          >
            Cancel
          </div>
          <div
            @click="createPos"
            class="
              cursor-pointer
              text-white
              rounded-full
              px-8
              py-3
              bg-cloudenly-primary-main
            "
          >
            Complete Sales
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddItemWidget from "../../../components/AddItemWidget/customerPricebook";
import fullPayment from "./fullPayment.vue";
import splitPayment from "./splitPayment.vue";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";
import image_close from "@/assets/images/optimaAsset/shared/close-red.svg";

export default {
  name: "createNewSale",
  components: {
    AddItemWidget,
    fullPayment,
    splitPayment
  },
  data() {
    return {
      image_close,
      illustration,
      currentTab: "Full Payment",
      tabs: ["Full Payment", "Split Payment"],
      type: [
        { name: "Delivery", id: "delivery" },
        { name: "Store pick up", id: "store" }
      ],
      hideItem: true,
      addNewModal: false,
      network: {
        name: "",
        email: "",
        phoneNumber: ""
      },
      selectedCustomer: [],
      selectedItem: [],
      posDetails: {
        customerName: "",
        customerId: "",
        reference: "",
        salesDate: "",
        salesStatus: "completed",
        salesType: "delivery",
        paymentMode: "multiple",
        posBOQs: [
          {
            name: "",
            description: "",
            itemClass: "",
            quantity: 20,
            unitPrice: 50,
            discountRate: 2,
            lineDiscountAmount: 200,
            discountedLineTotal: 9800,
            lineTotal: 10000
          }
        ],
        paymentArr: [
          {
            paymentMethod: "POS",
            paymentCurrency: "NGN",
            amount: 2000
          }
        ]
      },
      characteristicsValue: {
        characteristicsId: "",
        value: ""
      }
    };
  },
  methods: {
    outside: function() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    close() {
      this.invoiceDrawer = false;
      this.addNewModal = false;
    },
    openAddNewModal() {
      this.addNewModal = true;
    },
    routeBack() {
      this.$router.back();
    },

    hide() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },
    cancelNewSale() {
      this.$router.push({
        name: "POSSalesRegister"
      });
    },
    routeNumbering() {
      this.$router.push({
        name: "documentCode"
      });
    },
    deleteItem(index) {
      this.selectedItem.splice(index, 1);
    },
    returnCategory(val) {
      if (val.item && val.item.category === null) {
        return "N/A";
      } else {
        return val.item.category.name;
      }
    },
    saveNewCustomer(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          this.saveCustomerButton = true;
          this.isDisable = true;
          let userAuth = this.$store.state.auth.auth.authData;
          userAuth.registeredBy = `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`;
          const dataPayload = {
            userInfo: {
              ...userAuth
            },

            payload: {
              ...this.network
            }
          };

          this.$store
            .dispatch("crm/contact/createNewContact", dataPayload)
            .then(resp => {
              this.$vs.notify({
                title: "Contact",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
              this.customerModal = false;
              this.saveCustomerButton = false;
              this.isDisable = false;
            })
            .catch(err => {
              this.saveCustomerButton = false;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          this.$vs.notify({
            title: "Incomplete Input Field",
            position: "top-center",
            color: "danger"
          });
        }
      });
    },

    createPos(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          let userInfo = this.$store.state.auth.auth.authData;
          let newUserInfo = {
            orgId: userInfo.orgId,
            outletId: userInfo.outletId,
            creatorId: userInfo.creatorId
          };
          this.posDetails.posBOQs = this.selectedItem;
          this.posDetails.customerName = this.selectedCustomer.name;
          this.posDetails.customerId = this.selectedCustomer;

          let data = {
            payload: this.posDetails,
            userInfo: newUserInfo
          };

          console.log(data);

          this.$store
            .dispatch("sales/Pos/createPos", data)
            .then(resp => {
              this.$vs.notify({
                title: "Pos",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.draftButton = false;
              this.$vs.notify({
                title: "Pos",
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
    addItem(val, type) {
      console.log(val);
      if (this.selectedCustomer === null) {
        this.$vs.dialog({
          color: "warning",
          title: `Alert`,
          text:
            "You have not selected any customer. please select customer or create new"
          // cancel:this.acceptAlert
        });
      } else {
        // console.log(val, type);
        if (val.hasOwnProperty("retailPriceBooks")) {
          // eslint-disable-next-line no-empty
          if (type === "promoPrice") {
            this.selectedItem.push({
              priceBooks: val.retailPriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.retailPriceBooks[0].unitOfSale,

              description: val.item.description,
              discountRate: val.retailPriceBooks[0].promoDiscountRate,
              unitPrice: val.retailPriceBooks[0].recommendedRetailPrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              invoiceBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              invoiceTaxPolicyRates: val.taxes.map(resp => {
                return {
                  name: resp.name,
                  amount: resp.amount
                };
              }),
              totalTaxes: val.totalTaxes
            });
            // eslint-disable-next-line no-empty
          } else {
            this.selectedItem.push({
              priceBooks: val.retailPriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,
              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
              description: val.item.description,
              discountRate: val.retailPriceBooks[0].loyaltyDiscountRate,
              unitPrice: val.retailPriceBooks[0].recommendedRetailPrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              invoiceBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              // Check this later
              // invoiceTaxPolicyRates: val.taxes.map((resp) => {
              //   return {
              //     name: resp.name,
              //     amount: resp.amount,
              //   };
              // }),
              totalTaxes: val.totalTaxes
            });
          }
          // eslint-disable-next-line no-empty
        } else {
          if (type === "promoPrice") {
            this.selectedItem.push({
              priceBooks: val.wholesalePriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.wholesalePriceBooks[0].unitOfSale,

              description: val.item.description,
              discountRate: val.wholesalePriceBooks[0].promoDiscountRate,
              unitPrice:
                val.wholesalePriceBooks[0].recommendedWholesalePrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              invoiceBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              invoiceTaxPolicyRates: val.taxes.map(resp => {
                return {
                  name: resp.name,
                  amount: resp.amount
                };
              }),
              totalTaxes: val.totalTaxes
            });
          } else {
            this.selectedItem.push({
              priceBooks: val.wholesalePriceBooks, // to be removed
              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.wholesalePriceBooks[0].unitOfSale,

              description: val.item.description,
              discountRate: val.wholesalePriceBooks[0].loyaltyDiscountRate,
              unitPrice:
                val.wholesalePriceBooks[0].recommendedWholesalePrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              invoiceBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              invoiceTaxPolicyRates: val.taxes.map(resp => {
                return {
                  name: resp.name,
                  amount: resp.amount
                };
              }),
              totalTaxes: val.totalTaxes
            });
          }
        }
      }
    },
    // calculate ta on shipping cost
    calShippingCharge() {
      // console.log('hello here', this.spingChargeTaxPolicy)
      let shippingChargeTaxPolicy = this.posDetails.shippingChargeTaxPolicy;
      this.isDeliveryTaxOpen = false;
      switch (shippingChargeTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (let i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal =
              exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;

          this.posDetails.totalTaxOnShippingCharge =
            (Number.parseFloat(this.posDetails.shippingCharge) *
              exclusiveTotalTaxes) /
            100;
          this.posDetails.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            resp => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number.parseFloat(resp.amount) *
                    this.invoiceData.shippingCharge) /
                  100
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          let InclusiveTaxes = this.allVat.taxes;
          let inclusiveTotal = 0;
          for (let i = 0; i < InclusiveTaxes.length; i++) {
            inclusiveTotal =
              inclusiveTotal + Number.parseFloat(InclusiveTaxes[i].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.invoiceData.shippingCharge) /
            (1 + inclusiveTotalTaxes / 100);

          this.invoiceData.totalTaxOnShippingCharge =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) /
            100;

          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            resp => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) *
                    Number.parseFloat(lineTotalExcludingTax)) /
                  100
              };
            }
          );

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          this.invoiceData.totalTaxOnShippingCharge = 0;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            resp => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.invoiceData.shippingCharge) / 100
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        default:
          this.invoiceData.totalTaxOnShippingCharge = 0;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            resp => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.invoiceData.shippingCharge) / 100
              };
            }
          );

          break;
      }
    },
    calcLineTotal(val) {
      let taxPolicy = val.taxType;
      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          // console.log(val, "at tax exclusive");
          const exclusiveQuantity = Number.parseFloat(val.quantity || 0);
          const exclusiveUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const exclusiveDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            exclusiveUnitPrice * (1 - exclusiveDiscRate / 100);
          val.lineDiscountAmount =
            (exclusiveQuantity * exclusiveUnitPrice * exclusiveDiscRate) / 100;

          val.discountedLineTotal = val.discountedUnitRate * exclusiveQuantity;
          (val.totalTax =
            (Number.parseFloat(val.totalTaxes || 0) * val.discountedLineTotal) /
            100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax =
            val.discountedLineTotal + val.totalTax / exclusiveQuantity;

          // This is to calculate tax component on each item
          // val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
          //   return {
          //     taxId: resp.id,
          //     name: resp.name,
          //     label: resp.label,
          //     rate: resp.amount,
          //     amount:
          //       (Number.parseFloat(resp.amount) *
          //         Number.parseFloat(val.discountedLineTotal)) /
          //       100,
          //   };
          // });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          // Engine for Inclusive Engine
          console.log(val, "at tax inclusive");

          const inclusiveQuantity = Number.parseFloat(val.quantity || 0);
          const inclusiveUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const inclusiveDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            inclusiveUnitPrice * (1 - inclusiveDiscRate / 100);
          val.lineDiscountAmount =
            (inclusiveQuantity * inclusiveUnitPrice * inclusiveDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * inclusiveQuantity;

          let lineTotalExcludingTax =
            val.discountedLineTotal / (1 + val.totalTaxes / 100);
          val.lineTotalExcludingTax = lineTotalExcludingTax.toFixed();

          let totalTax = (val.totalTaxes * val.lineTotalExcludingTax) / 100;
          val.totalTax = totalTax.toFixed();

          // val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
          //   return {
          //     taxId: resp.id,
          //     name: resp.name,
          //     label: resp.label,
          //     rate: resp.amount,
          //     amount: (resp.amount * val.lineTotalExcludingTax) / 100,
          //   };
          // });

          val.unitRateExcludingTax =
            val.lineTotalExcludingTax / inclusiveQuantity;
          val.unitRateIncludingTax =
            val.totalTaxAmount + val.lineTotalExcludingTax / inclusiveQuantity;

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          // Engine for Tax Exempt
          console.log(val, "at tax exempt");
          const taxExemptQuantity = Number.parseFloat(val.quantity || 0);
          const taxExemptUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const taxExemptDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            taxExemptUnitPrice * (1 - taxExemptDiscRate / 100);
          val.lineDiscountAmount =
            (taxExemptQuantity * taxExemptUnitPrice * taxExemptDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * taxExemptQuantity;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax =
            val.discountedLineTotal + 0 / exclusiveQuantity;

          // This is to calculate tax component on each item
          // val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
          //   return {
          //     taxId: resp.id,
          //     name: resp.name,
          //     label: resp.label,
          //     rate: resp.amount,
          //     amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
          //   };
          // });

          break;

        // eslint-disable-next-line no-case-declarations
        case null:
          // Engine for null
          console.log(val, "at tax null");
          const nullQuantity = Number.parseFloat(val.quantity || 0);
          const nullUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const nullDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate = nullUnitPrice * (1 - nullDiscRate / 100);
          val.lineDiscountAmount =
            (nullQuantity * nullUnitPrice * nullDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * nullQuantity;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + 0 / nullQuantity;

          // This is to calculate tax component on each item
          // val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
          //   return {
          //     taxId: resp.id,
          //     name: resp.name,
          //     label: resp.label,
          //     rate: resp.amount,
          //     amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
          //   };
          // });

          break;

        // eslint-disable-next-line no-case-declarations
        default:
          console.log(val, "at tax default");
          const defaultQty = Number.parseFloat(val.quantity || 0);
          const defaultUnitPrice = Number.parseFloat(val.unitPrice);
          const defaultRateDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            defaultUnitPrice * (1 - defaultRateDiscRate / 100);
          val.lineDiscountAmount =
            (defaultQty * defaultUnitPrice * defaultRateDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * defaultQty;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + 0 / defaultQty;

          // This is to calculate tax component on each item
          // val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
          //   return {
          //     taxId: resp.id,
          //     name: resp.name,
          //     label: resp.label,
          //     rate: resp.amount,
          //     amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
          //   };
          // });
          break;
      }
    },
    createItem(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          let userInfo = this.$store.state.auth.auth.authData;
          let newUserInfo = {
            outletId: userInfo.outletId,
            creatorId: userInfo.creatorId,
            orgId: userInfo.orgId,
            funtionId: userInfo.funtionId,
            orgInfo: {
              name: "",
              address: "",
              email: "",
              phoneNumber: "",
              orgId: ""
            }
          };

          let data = {
            payload: this.posDetails,
            userInfo: newUserInfo
          };

          console.log(data);

          this.$store
            .dispatch("pos/sales/createItemCharacteristics", data)
            .then(resp => {
              this.$vs.notify({
                title: "Pos",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.draftButton = false;
              this.$vs.notify({
                title: "Pos",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          console.log("hello");
        }
      });
    }
  },
  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),
    ...mapGetters("sales/Invoice", ["getIsInvoiceCodeSetup"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesInvoicePrivileges"]),
    ...mapGetters("payment/collection", ["getCollectionAccounts"]),

    contactName() {
      return this.allContact.Customer;
    },

    calTotalSubLineTotalDiscountAmount() {
      let totalSubLineTotalDiscountAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalDiscountAmount =
          totalSubLineTotalDiscountAmount +
          Number.parseFloat(this.selectedItem[i].lineDiscountAmount);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.posDetails.discountedLineTotal = totalSubLineTotalDiscountAmount);
    },

    calTotalSubLineTotalExcludingTax() {
      let totalSubLineTotalExcludingTax = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalExcludingTax =
          totalSubLineTotalExcludingTax +
          Number.parseFloat(this.selectedItem[i].lineTotalExcludingTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalSubLineTotalExcludingTax = totalSubLineTotalExcludingTax;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.invoiceData.totalSubLineTotalExcludingTax;
      // return (this.invoiceData.totalExTaxAmount = totalExTax);
    },

    calTotalSubLineTotalTaxAmount() {
      let totalSubLineTotalTaxAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalTaxAmount =
          totalSubLineTotalTaxAmount +
          Number.parseFloat(this.selectedItem[i].totalTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.taxSubTotal = totalSubLineTotalTaxAmount;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.totalSubLineTotalTax = totalSubLineTotalTaxAmount);
    },

    calTotalSalesTax() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.salesTaxTotal =
        Number.parseFloat(this.invoiceData.totalSubLineTotalTax || 0) +
        Number.parseFloat(this.invoiceData.totalTaxOnShippingCharge || 0) -
        Number.parseFloat(this.invoiceData.totalTaxOnSpecialDiscount || 0);
      return this.invoiceData.salesTaxTotal;
    },

    // invoice total
    calSalesInvoiceTotal() {
      let total =
        Number.parseFloat(this.invoiceData.totalSubLineTotalExcludingTax || 0) +
        Number.parseFloat(this.invoiceData.shippingCharge || 0) -
        Number.parseFloat(this.invoiceData.specialDiscount || 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.invoiceTotal =
        Number.parseFloat(total) +
        Number.parseFloat(this.invoiceData.salesTaxTotal));
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // return this.invoiceData.totalSaleInvoice = Number.parseFloat(total) + Number.parseFloat(this.invoiceData.salesTaxTotal)
    },

    // total customer discount
    calTotalCustomerDiscount() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalCustomerDiscount =
        Number.parseFloat(
          this.invoiceData.totalSubLineTotalDiscountAmount | 0
        ) + Number.parseFloat(this.invoiceData.specialDiscount | 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalDiscount = this.invoiceData.totalCustomerDiscount;
      return this.invoiceData.totalCustomerDiscount;
    },

    calTotalTaxPolicy() {
      let taxrateTotal = {};
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalTaxRate = [];
      let tax = this.selectedItem.map(resp => {
        return resp.invoiceBoqTaxes;
      });

      tax.push(this.invoiceData.invoiceSpecialDiscountTaxes);
      tax.push(this.invoiceData.invoiceShippingChargeTaxes);

      // flatten all tax array of object
      var taxeRateComponent = [].concat.apply([], tax);
      taxeRateComponent.forEach(result => {
        if (taxrateTotal.hasOwnProperty(result.name)) {
          taxrateTotal[result.name] = taxrateTotal[result.name] + result.amount;
        } else {
          taxrateTotal[result.name] = result.amount;
        }
      });

      for (var resp in taxrateTotal) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalTaxRate.push({
          // taxId: resp.id,
          name: resp,
          amount: taxrateTotal[resp]
        });
      }

      return this.totalTaxRate;
    }
  },
  mounted() {
    this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    this.$store.dispatch("crm/loyalty/getDefaultLoyalty");
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.$store.dispatch("catalogue/getAllCatalogueVariant");
  }
};
</script>
