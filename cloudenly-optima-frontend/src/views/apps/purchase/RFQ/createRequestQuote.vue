<template>
  <div class="mb-12">
    <!-- process request -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Request"
    >
      <div class="container">
        <div
          class="
            p-5
            border border-solid
            rounded
            border-l-4
            border-r-0
            border-b-0
            border-t-0
            border-cloudenly-primary-main
            bg-white
          "
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-primary-main"
                class="h-8 w-8"
                icon="InfoIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">Process Info</h1>
              <p>
                Please note that this Request for Quote may undergo Approval
                Process
              </p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="processButton"
            :class="{
              'cursor-not-allowed': processButton,
              'bg-cloudenly-primary-mid': processButton,
            }"
            @click="processRequestForQuote"
            class="
              px-5
              py-2
              mr-5
              bg-cloudenly-primary-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
          >
            Process
          </button>

          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="processModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End process Requisition Section -->

    <!-- setup request for quote code -->
    <Drawer :size="45" :visible="rfqDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h2>Request for Quote Code Setup</h2>
      </div>

      <div slot="body">
        <div>
          <div class="mb-8">
            <div class>
              <p class="p-3 mb-0">
                A code will be generated for any request for quote you save....
              </p>
              <p class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer">
                Learn more here...
              </p>
            </div>
          </div>

          <div id="div-with-loading" class="mx-5 vs-con-loading__container">
            <div
              class="
                mb-8
                mx-16
                ml-16
                border border-solid border-grey-lighter
                rounded-lg
              "
            >
              <div class="p-3">
                <div class="flex items-center mb-5">
                  <div class="w-1/4 mr-5 text-right">Prefix</div>

                  <div class="w-1/3 mr-5">
                    <select
                      v-model="prefix.type"
                      name
                      id
                      class="py-2 rounded px-1 w-full border border-grey"
                    >
                      <option value="randomCode">Random Code</option>
                      <option value="currentDate">Current Date</option>
                      <option value="currentYear">Current Year</option>
                      <option value="moduleName">Module Name</option>
                    </select>
                  </div>

                  <div class="w-1/3">
                    <div v-if="prefix.type === 'randomCode'">
                      <select
                        v-model="prefix.typeFormat"
                        name
                        id
                        class="py-2 rounded px-1 w-full border border-grey"
                      >
                        <option value selected>Select Code Format</option>
                        <option value="alphabet">Alphabet</option>
                        <option value="numeric">Numeric</option>
                        <option value="alphanumeric">Alphanumeric</option>
                      </select>
                    </div>

                    <div v-else-if="prefix.type === 'currentYear'">
                      <select
                        v-model="prefix.typeFormat"
                        name
                        class="py-2 rounded px-1 w-full border border-grey"
                        id
                      >
                        <option value="yy">YY</option>
                        <option value="yyyy">YYYY</option>
                      </select>
                    </div>

                    <div v-else-if="prefix.type === 'moduleName'">
                      <input
                        v-model="prefix.typeFormat"
                        type="text"
                        placeholder="eg: RFQ"
                        class="py-2 rounded px-1 w-full border border-grey"
                        name
                        id
                      />
                    </div>
                    <div v-else></div>
                  </div>
                </div>

                <div class="flex items-center mb-5">
                  <div class="w-1/4 mr-5 text-right">Base</div>

                  <div class="w-1/3 mr-5">
                    <select
                      v-model="roots.type"
                      name
                      id
                      class="py-2 rounded px-1 w-full border border-grey"
                    >
                      <option value="randomCode">Random Code</option>
                      <option value="currentDate">Current Date</option>
                      <option value="currentYear">Current Year</option>
                      <option value="moduleName">Module Name</option>
                    </select>
                  </div>

                  <div class="w-1/3">
                    <div v-if="roots.type === 'randomCode'">
                      <select
                        v-model="roots.typeFormat"
                        name
                        id
                        class="py-2 rounded px-1 w-full border border-grey"
                      >
                        <option value selected>Select Code Format</option>
                        <option value="alphabet">Alphabet</option>
                        <option value="numeric">Numeric</option>
                        <option value="alphanumeric">Alphanumeric</option>
                      </select>
                    </div>

                    <div v-else-if="roots.type === 'currentYear'">
                      <select
                        v-model="roots.typeFormat"
                        name
                        class="py-2 rounded px-1 w-full border border-grey"
                        id
                      >
                        <option value="yy">YY</option>
                        <option value="yyyy">YYYY</option>
                      </select>
                    </div>

                    <div v-else-if="roots.type === 'moduleName'">
                      <input
                        v-model="roots.typeFormat"
                        type="text"
                        placeholder="eg: RFQ"
                        class="py-2 rounded px-1 w-full border border-grey"
                        name
                        id
                      />
                    </div>
                    <div v-else></div>
                  </div>
                </div>

                <div class="flex items-center mb-5">
                  <div class="w-1/4 mr-5 text-right">Suffix</div>

                  <div class="w-1/3 mr-5">
                    <select
                      v-model="suffix.type"
                      name
                      id
                      class="py-2 rounded px-1 w-full border border-grey"
                    >
                      <option value="randomCode">Random Code</option>
                      <option value="currentDate">Current Date</option>
                      <option value="currentYear">Current Year</option>
                      <option value="moduleName">Module Name</option>
                    </select>
                  </div>

                  <div class="w-1/3">
                    <div v-if="suffix.type === 'randomCode'">
                      <select
                        v-model="suffix.typeFormat"
                        name
                        id
                        class="py-2 rounded px-1 w-full border border-grey"
                      >
                        <option value selected>Select Code Format</option>
                        <option value="alphabet">Alphabet</option>
                        <option value="numeric">Numeric</option>
                        <option value="alphanumeric">Alphanumeric</option>
                      </select>
                    </div>

                    <div v-else-if="suffix.type === 'currentYear'">
                      <select
                        v-model="suffix.typeFormat"
                        name
                        class="py-2 rounded px-1 w-full border border-grey"
                        id
                      >
                        <option disabled selected value>
                          Select year format
                        </option>
                        <option value="yy">YY</option>
                        <option value="yyyy">YYYY</option>
                      </select>
                    </div>

                    <div v-else-if="suffix.type === 'moduleName'">
                      <input
                        v-model="suffix.typeFormat"
                        type="text"
                        placeholder="eg: RFQ"
                        class="py-2 rounded px-1 w-full border border-grey"
                        name
                        id
                      />
                    </div>
                    <div v-else></div>
                  </div>
                </div>

                <div class="flex items-center mb-5">
                  <div class="w-1/4 mr-5 text-right">Separator</div>

                  <div class="w-1/3">
                    <select
                      v-model="separator.type"
                      id
                      class="py-2 rounded px-1 w-full border border-grey"
                    >
                      <option disabled selected value>
                        Select preferred Code Separator
                      </option>
                      <option value="slash">Slash</option>
                      <option value="hyphen">Hyphen</option>
                      <!-- <option value="">No Separator</option> -->
                    </select>
                  </div>

                  <div class="w-1/3"></div>
                </div>
              </div>

              <div class="flex justify-center">
                <p class="text-lg font-medium text-cloudenly-warning-main">
                  {{ message }}
                </p>
              </div>

              <div class="flex items-center justify-center">
                <div class="mr-3 text-xl">preview</div>

                <div
                  id="div-with-loading-preview"
                  class="py-3 vs-con-loading__container"
                >
                  <span
                    class="
                      px-3
                      py-1
                      my-5
                      border border-solid
                      bg-grey-lighter
                      font-bold
                      text-xl
                      border-grey
                    "
                    >{{ previewFormat | capitalize }}</span
                  >
                </div>
              </div>

              <div class="flex pb-10 mb-10 mt-10">
                <div class="mx-auto">
                  <button
                    :disabled="saveButton"
                    @click="saveRequestForQuoteCode"
                    :class="{
                      'cursor-not-allowed': saveButton,
                      'bg-cloudenly-primary-mid': saveButton,
                    }"
                    class="
                      px-10
                      py-3
                      text-xl
                      border-none
                      bg-cloudenly-primary-main
                      rounded
                      text-white
                      cursor-pointer
                    "
                    type="button"
                  >
                    Save & Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End section -->

    <!-- main section -->
    <div id="div-with-loading" class="vs-con-loading__container">
      <back location="Request for Quote - New" class="mb-8" />

      <div class="bg-white px-6 pt-8 pb-10 rounded">
        <div class="flex items-center justify-between mb-10">
          <h2 class="font-semibold">Create New Request for Quote</h2>
          <!-- <div
            v-my-tooltip.top-start="
              'Kindly fill up the details below to create a new RFQ'
            "
          >
            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="mr-3 h-6 w-6 cursor-pointer"
            />
          </div> -->
        </div>

        <div class="grid grid-cols-12 col-gap-16 gap-10">
          <s-select-chipped
            label="Supplier Name:"
            :options="getSupplierContact"
            class="col-span-12 mb-12"
            v-model="quotationData.suppliers"
          />

          <s-select
            label="Bid Method:"
            :options="bidMethodList"
            class="col-span-4 mb-12"
            v-model="quotationData.bidMethod"
          />

          <s-text
            label="Submission Deadline:"
            type="date"
            class="col-span-4"
            v-model="quotationData.submissionDeadline"
          />

          <s-select
            label="RFQ Currency:"
            :options="currencyList"
            class="col-span-4"
            v-model="quotationData.currency"
          />

          <s-text
            label="RFQ Title:"
            class="col-span-4 mb-12"
            v-model="quotationData.title"
          />

          <s-text
            label="RFQ Description:"
            class="col-span-4"
            v-model="quotationData.description"
          />

          <s-text
            class="col-span-4"
            disabled
            v-model="quotationData.requestForQuoteNumber"
          >
            <template v-slot:label>
              <div class="flex justify-between mb-3">
                <span>RFQ Number:</span
                ><button
                  class="text-primary-optima-color"
                  @click="rfqDrawer = true"
                >
                  Setup code number
                </button>
              </div>
            </template>
          </s-text>

          <s-text
            label="Delivery Address(es):"
            class="col-span-4"
            v-model="quotationData.deliveryAddress"
          />

          <s-text
            label="Expected Delivery Date:"
            type="date"
            class="col-span-4"
            v-model="quotationData.expectedDeliveryDate"
          />

          <s-text label="Authorized By:" class="col-span-4 mb-12" />

          <s-content-seperator class="mt-12 mb-12" />

          <div class="col-span-12 mb-12">
            <h2 class="font-semibold">PR item(s)</h2>
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

            <tbody v-if="!quotationData.requestForQuoteBoqs.length">
              <tr class="h-16">
                <td>1</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr
                v-for="(item, i) in quotationData.requestForQuoteBoqs"
                :key="i"
                class="h-20"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ item.variantName }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.customerVariantSku }}</td>
                <td>{{ item.unitOfMeasure }}</td>
                <td>{{ item.stockBalance }}</td>
                <td>
                  <input
                    type="number"
                    class="py-2 px-4 rounded"
                    style="border: 1px solid; height: 32px; width: 100px"
                    v-model="item.orderQuantity"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    class="py-2 px-4 rounded"
                    style="border: 1px solid; height: 32px; width: 100px"
                    v-model="item.orderQuantity"
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
                  <span
                    :class="[
                      !item.stockBalance
                        ? 'text-danger-optima-color'
                        : 'text-tetiary-optima-color',
                    ]"
                    >{{ item.stockBalance }} &nbsp;</span
                  >in stock
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

        <label class="flex flex-col">
          Terms and Conditions:

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="mt-5 p-3"
            style="
              border: 1px solid #eee;
              border-radius: 3px;
              height: 100px;
              width: 320px;
            "
          />
        </label>

        <s-content-seperator class="my-12" />

        <div class="flex justify-between">
          <button
            class="px-8 py-4"
            style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
            @click="$router.back()"
          >
            Cancel
          </button>

          <div class="flex items-center" v-if="!$route.params.id">
            <button
              class="
                flex
                items-center
                px-6
                py-4
                mr-12
                text-primary-optima-color
              "
              :class="{ 'cursor-not-allowed': draftButton }"
              style="background: #f3f6f9; border-radius: 50px"
              @click="saveRequestForQuote"
            >
              <feather-icon
                v-show="draftButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
              />
              Save as draft
            </button>

            <button
              class="px-6 py-4 bg-primary-optima-color flex items-center"
              style="border-radius: 50px; color: #f3f6f9"
              @click="processModal = true"
            >
              <feather-icon
                v-show="processButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
                class="mr-3"
              />

              Save & Process
            </button>
          </div>

          <button
            class="px-6 py-4 bg-primary-optima-color flex items-center"
            style="border-radius: 50px; color: #f3f6f9"
            @click="updateQuotation"
            v-else
          >
            <feather-icon
              v-show="isUpdating"
              svgClasses="animate-spin h-5 w-5 mr-3"
              icon="CircleIcon"
              class="mr-3"
            />

            Update Requisition
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Drawer from "../../../components/Drawer/drawer";
import AddSupplier from "../../../components/AddSupllierWidget/AddSupplier";
import AddItemPurchase from "../../../components/AddItemWidget/catalogue";
import Datepicker from "vuejs-datepicker";
import currencyList from "../../../../utils/currency";

export default {
  components: {
    AddSupplier,
    AddItemPurchase,
    Datepicker,
    Drawer,
  },

  data() {
    return {
      hide: true,
      search: "",
      rfqDrawer: false,
      processButton: false,
      draftButton: false,
      isUpdating: false,
      processModal: false,
      currencyList: currencyList,
      quotationData: {
        title: "",
        requestForQuoteNumber: "",
        submissionDeadline: "",
        description: "",
        currency: "Nigerian Naira",
        sourcingChannel: "Single source",
        bidMethod: "",
        deliveryAddress: "",
        paymentTerms: "",
        suppliers: [],
        requestForQuoteBoqs: [],
        // date: '',
        // requisitionerDepartment: "",
        // requisitionerDivision: "",
        // requisitionerGroup: "",
        // shippingAddress: "",
        // reasonForRequisition: "",
        // bidValidityType: "",
        // bidValidityDur: "",
        // outletName: '',
        // location: '',
        // outletManager: "",
        // supplier: "1",
        // signature: "",
        // logo: "",
        // budgetSource: "",
        // budgetTitle: "",
        // financialYear: "",
        // purchaseCategory: "",
        // purchaseSubCategory: "",
        // costCenterCode: "",
      },
      selectedSupplier: "",
      message: "",
      saveButton: false,
      previewFormat: null,
      prefix: {
        type: "",
        typeFormat: null,
      },

      suffix: {
        type: "",
        typeFormat: null,
      },

      roots: {
        type: "",
        typeFormat: null,
      },

      separator: {
        type: "slash",
      },

      bidMethodList: ["Competitive", "Non Competitive"],

      headers: [
        "Item Name",
        "Item Class",
        "Description",
        "SKU",
        "Unit of Purchase",
        "Stock Balance",
        "Order Quantity",
        "Action",
      ],
    };
  },
  methods: {
    routeNetwork() {
      this.$router.push({
        name: "CreateCommunity",
      });
    },

    routeNumbering() {
      this.$router.push({
        name: "documentCode",
      });
    },

    close() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          moduleName: "RFQ",
          yearOfBirth: null,
          contactName: null,
        },
      };

      this.$store.dispatch("crm/contact/getAllSupplierContact");

      this.$store
        .dispatch("purchase/RequestQuote/getGeneratedRequestForQuoteCode", data)
        .then((resp) => {
          this.quotationData.requestForQuoteNumber = resp.data.code;
        });
      this.$store.dispatch("purchase/RequestQuote/getRequestQuoteCode");
      this.rfqDrawer = false;
    },

    routeBack() {
      this.$router.back();
    },

    selectSupplier(val) {
      this.selectedSupplier = val;
    },

    addItem(val) {
      console.log(val);
      this.quotationData.requestForQuoteBoqs.push({
        customerVariantSku: val.variantSku,
        customerVariantId: val.id,
        supplierVariantSku: val.variantSku,
        supplierVariantId: val.id,
        variantName: val.variantName,
        variantCode: val.variantCode,
        itemClass: val.productOrService,
        description: val.item.description,
        unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
        type: val.productOrService,
        orderQuantity: 1,
        stockBalance: val.stockBalance,
        // reOrderLevel: val.reOrderLevel   // This is not available on val object
      });
    },

    deleteItem(index) {
      this.quotationData.requestForQuoteBoqs.splice(index, 1);
    },

    saveRequestForQuote() {
      this.draftButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      this.quotationData.suppliers = this.quotationData.suppliers.map(
        (resp) => {
          return {
            supplierOrgId: resp.contactOrgId,
            contactId: resp.id,
            name: resp.name,
            address: resp.address,
            contactName: resp.contactPerson,
            phoneNumber: resp.phone,
            email: resp.email,
          };
        }
      );

      let data = {
        userInfo: userInfo,
        payload: this.quotationData,
      };
      console.log(data);
      this.$store
        .dispatch("purchase/RequestQuote/createRequestQuote", data)
        .then((resp) => {
          this.draftButton = false;
          this.$vs.notify({
            title: "Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.$router.back();

          // this.$router.push({
          //   name: "PurchaseRequestQuotes",
          // });
        })
        .catch((err) => {
          this.draftButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Request",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processRequestForQuote() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      this.quotationData.suppliers = this.quotationData.suppliers.map(
        (resp) => {
          return {
            supplierOrgId: resp.contactOrgId,
            contactId: resp.id,
            name: resp.name,
            address: resp.address,
            contactName: resp.contactName,
            phoneNumber: resp.phoneNumber,
            email: resp.email,
          };
        }
      );

      let data = {
        userInfo: userInfo,
        payload: this.quotationData,
      };
      this.processModal = false;
      this.$store
        .dispatch("purchase/RequestQuote/createRequestQuote", data)
        .then((resp) => {
          console.log(resp);
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                requestForQuoteId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("purchase/RequestQuote/sendRequestQuote", data2)
              .then((resp) => {
                this.processModal = false;
                this.processButton = false;
                this.$vs.notify({
                  title: "Request",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });

            this.$router.push({
              name: "PurchaseRequestQuotes",
            });
          }
        })
        .catch((err) => {
          this.processButton = false;
          this.processModal = true;
          this.$vs.notify({
            title: "Request",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    saveRequestForQuoteCode() {
      this.saveButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let dataPayload = {
        userInfo: userInfo,
        payload: {
          setting: {
            codeFormat: {
              prefix: this.prefix,
              roots: [this.roots],
              suffix: this.suffix,
              separator: this.separator,
            },
          },
        },
      };
      this.$store
        .dispatch("purchase/RequestQuote/createRequestQuoteCode", dataPayload)
        .then((resp) => {
          console.log(resp);
          this.saveButton = false;
          this.$vs.notify({
            title: "Request Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.previewCode();
        })
        .catch((err) => {
          this.saveButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Request Code",
            text: "Code Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    previewCode() {
      this.$vs.loading({
        container: "#div-with-loading-preview",
        scale: 0.5,
      });
      let userInfo = this.$store.state.auth.auth.authData;
      delete userInfo.orgInfo;
      this.$store
        .dispatch("purchase/RequestQuote/getRequestQuoteCode")
        .then((resp) => {
          this.message = "";
          let format = resp.data.setting.codeFormat;
          (this.suffix = format.suffix),
            (this.prefix = format.prefix),
            (this.roots = format.roots[0]);
          this.separator = format.separator;
        })
        .catch((err) => {
          console.log(err);
        });

      let data = {
        userInfo: userInfo,
        payload: {
          moduleName: "RFQ",
          yearOfBirth: null,
          contactName: null,
        },
      };
      this.$store
        .dispatch("purchase/RequestQuote/getGeneratedRequestForQuoteCode", data)
        .then((resp) => {
          console.log(resp);
          this.quotationData.requestForQuoteNumber = resp.data.code;
          this.previewFormat = resp.data.code;
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        });
    },

    updateQuotation() {
      this.isUpdating = true;

      this.quotationData.suppliers =
        this.quotationData.requestForQuoteSuppliers.map((resp) => {
          return {
            supplierOrgId: resp.contactOrgId,
            contactId: resp.id,
            name: resp.name,
            address: resp.address,
            contactName: resp.contactName,
            phoneNumber: resp.phoneNumber,
            email: resp.email,
          };
        });
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.quotationData,
      };
      this.$store
        .dispatch("purchase/RequestQuote/updateRequestQuote", data)
        .then((resp) => {
          console.log(resp);
          this.$vs.notify({
            title: "Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.isUpdating = false;
          this.$router.push({
            name: "PurchaseRequestQuote",
          });
        })
        .catch((err) => {
          this.isUpdating = false;
          this.$vs.notify({
            title: "Request",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("purchase/RequestQuote", ["getIsRequestCodeSetup"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
  },

  async mounted() {
    try {
      const { id } = this.$route.params;
      const { authData } = this.$store.state.auth.auth;

      this.quotationData.deliveryAddress =
        this.$store.state.auth.auth.authData.orgInfo.address;

      const payload = {
        userInfo: authData,
        payload: {
          moduleName: "RFQ",
          yearOfBirth: null,
          contactName: null,
        },
      };

      await this.$store.dispatch("crm/contact/getAllSupplierContact");
      await this.$store.dispatch("catalogue/getAllPurchaseVariant");
      await this.$store.dispatch("catalogue/getAllCatalogueVariant");

      if (id) {
        const { data } = await this.$store.dispatch(
          "purchase/RequestQuote/getSingleRequestQuote",
          id
        );
        // console.log("===---->>", data);
        this.quotationData = { ...this.quotationData, ...data.requestForQuote };
        this.quotationData.suppliers =
          data.requestForQuote.requestForQuoteSuppliers;
      } else {
        const { data } = await this.$store.dispatch(
          "purchase/RequestQuote/getGeneratedRequestForQuoteCode",
          payload
        );
        this.quotationData.requestForQuoteNumber = data.code;
        await this.$store.dispatch("purchase/RequestQuote/getRequestQuoteCode");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.tooltip {
  display: none;
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;
}

.tooltip .tooltip-content {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip.tooltip-open-transitionend {
  display: block;
}

.tooltip.tooltip-after-open {
  opacity: 1;
}
</style>
