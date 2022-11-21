<template>
  <div>
    <div class="flex space-x-8 items-center mb-6">
      <div class="cursor-pointer" @click="routeBack">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.82843 10.5L10.1213 16.7929L8.70711 18.2071L0 9.50001L8.70711 0.792908L10.1213 2.20712L3.82843 8.50001H18.4142V10.5H3.82843Z"
            fill="#070707"
          />
        </svg>
      </div>
      <div class="text-lg" @click="routeBack">Back</div>
      <div class="font-bold text-dark text-lg">View Sale</div>
    </div>
    <div class="bg-white px-5 py-5">
      <div class="flex items-center space-x-2 justify-between">
        <div>
          <label class="text-base" for=""
            >Reference:
            <s-text
            disabled
              placeholder="--Enter--"
            :width="245"
              class="mt-3"
              v-model="getOne.reference"
          /></label>
        </div>
        <div>
          <!-- <div class="flex justify-between items-center">
            <label class="text-base" for="">Customer: </label>
            <div class="text-base cursor-pointer text-cloudenly-primary-main">
              Add
            </div>
          </div> -->

           <label class="text-base" for=""
            >Customer:
            <s-text
              disabled
              v-model="getOne.customerName"
              placeholder="--Enter--"
              label=""
              :width="245"
              class="mt-3"
          /></label>
        </div>
        <div>
          <label class="text-base" for=""
            >Sales Date:
            <s-text
              disabled
              v-model="getOne.salesDate"
              placeholder="--Enter--"
              label=""
              :width="245"
              class="mt-3"
          /></label>
        </div>
        <div>
           <label class="text-base" for=""
            >Type:
            <s-text
              disabled
              v-model="getOne.salesType"
              placeholder="--Enter--"
              label=""
              :width="245"
              class="mt-3"
          /></label>
        </div>
      </div>
      <div class="mt-8 flex items-center justify-between">
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
        <div
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
          Add
        </div>
      </div>
      <div class="flex justify-between mt-8">
        <div>
          <s-combo-box />
        </div>

        <div class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>
      <div class="">
        <AddItemWidget v-on:addItem="addItem" />
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
                {{ boq.quantity }}
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
      </div>

      <div class="flex justify-between  mt-8">
        <div class="space-x-3 flex items-start">
          <div class="border-1 px-4 py-5 border-gray-400">
            Coupon | Promocode
          </div>
          <div>
            <s-select
              :width="180"
              :height="47"
              default-option="XRT098JI"
              class=""
            />
            <p class="mt-4 text-base text-red-400">
              A Coupon/Promo discout of <br />
              20% applies
            </p>
          </div>
        </div>

        <div>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr
                class="border-1  border-gray-500"
                v-for="(boq, index) in selectedItem"
                :key="index"
              >
                <th
                  class="py-4 col-span-2 px-6 tracking-wider text-dark-optima-color"
                >
                  Total Discount
                </th>
                <td
                  colspan="4"
                  class="py-4 border-1  border-gray-500 px-6 tracking-wider text-dark-optima-color"
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
                font-normal bg-gray-300
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
      <div class="mt-10 mb-10">
        <div class="flex space-x-4 px-3 font-bold">
          <p
            class="text-cloudenly-primary-main cursor-pointer hover:bg-gray-500 py-2"
          >
            Full Payment
          </p>
          <p class="py-2 hover:bg-gray-500 cursor-pointer">Split Payment</p>
        </div>

        <hr class="text-gray-400 " />
      </div>

      <div class="mt-10 flex space-x-3 items-center">
        <div>
          <label class="text-base" for="">Amount Due: </label>
          <s-text :width="100" disabled v-model="getOne.posSalesPaymentDetails[0].paymentCurrency" class="mt-3" />
        </div>
        <div class="mt-6">
          <s-text
            disabled
            placeholder="--Enter--"
            :width="350"
            v-model="getOne.posSalesPaymentDetails[0].amount"
            class=""
          />
        </div>
        <div>
          <label class="text-base" for=""
            >Customer:
            <s-text
              disabled
              v-model="getOne.customerName"
              placeholder="--Enter--"
              label=""
              :width="245"
              class="mt-3"
          /></label>
          <!-- <label class="text-base" for="">Customer: </label>
          <s-select
            :options="allContact"
            v-model="posDetails.customerName"
            :width="400"
            default-option="--Search or create new--"
            class="mt-3"
          /> -->
        </div>
      </div>
      <div class="flex justify-between items-center mt-16 mb-6">
        <div
          class="text-cloudenly-primary-main font-bold cursor-pointer"
          @click="doOnHoldPosSales()"
        >
          Keep on-hold
        </div>
        <div class="flex space-x-5">
          <div
            class="cursor-pointer px-8 py-3 rounded-full bg-cloudenly-primary-off text-cloudenly-primary-main" @click="cancelNewSale"
          >
            Cancel
          </div>
          <div
            @click="doCompletePosSales"
            class="cursor-pointer text-white rounded-full px-8 py-3 bg-cloudenly-primary-main"
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

export default {
  name: "createNewSale",
  components: {
    AddItemWidget
  },
  data() {
    return {
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
    cancelNewSale(){
      this.$router.push({
        name: "POSSalesRegister"
      });
    },
    outside: function() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    close() {
      this.invoiceDrawer = false;
    },
    routeBack() {
      this.$router.back();
    },
    hide() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
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
    doOnHoldPosSales() {
      this.$validator.validateAll().then(resp => {
        if (resp) {
          let payload = {
            posSalesId : this.$route.params.id,
            salesStatus: "on-hold"
          };

          console.log(payload, "update");

          this.$store
            .dispatch("sales/Pos/holdPosStatus", payload)
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
                text: 'error',
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          console.log("hello");
        }
      });
    },
    doCompletePosSales() {
      this.$validator.validateAll().then(resp => {
        if (resp) {
          let payload = {
            posSalesId : this.$route.params.id,
            salesStatus: "completed"
          };

          console.log(payload, "update");

          this.$store
            .dispatch("sales/Pos/completePosStatus", payload)
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
                text: 'error',
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
              invoiceTaxPolicyRates: val.taxes.map(resp => {
                return {
                  name: resp.name,
                  amount: resp.amount
                };
              }),
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
    ...mapGetters("catalogue", ["getAllVat"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("sales/Pos", ["getSinglePos"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),
    ...mapGetters("sales/Invoice", ["getIsInvoiceCodeSetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesInvoicePrivileges"]),
    ...mapGetters("payment/collection", ["getCollectionAccounts"]),

    contactName() {
      return this.allContact.Customer;
    },
    getOne(){
      return this.getSinglePos
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
    let id = this.$route.params.id;

    this.$store.dispatch("sales/Pos/getSinglePos", id).then(resp => {
      this.posDetails = resp.data.data;
      console.log(resp.data.data,  'h')
    });
    this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    this.$store.dispatch("crm/loyalty/getDefaultLoyalty");
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
  }
};
</script>
