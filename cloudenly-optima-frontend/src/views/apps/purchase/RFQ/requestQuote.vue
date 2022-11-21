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
    <div
      v-if="
        getIsAccOwner ||
        getPurchaseRequestForQuoteOPrivileges.createRFQ ||
        getPurchaseRequestForQuoteOPrivileges.editRFQ
      "
    >
      <div id="div-with-loading" class="vs-con-loading__container">
        <back
          :location="`Request for Quote - ${routeQuery.type || 'New'}`"
          class="mb-8 capitalize"
        />

        <div class="bg-white px-6 pt-8 pb-10 rounded">
          <div class="flex items-center justify-between mb-10">
            <h2 class="font-semibold capitalize">
              {{ `${routeQuery.type || "Create New"} Request for Quote` }}
            </h2>
          </div>

          <!-- sourcing channel -->
          <div class="flex items-center mb-12">
            <span class="mr-8">Sourcing Channel:</span>

            <label class="flex items-center">
              Single
              <input
                @change="updateData"
                type="radio"
                value="Single source"
                class="ml-3"
                v-model="quotationData.sourcingChannel"
              />
            </label>

            <label class="flex items-center ml-8">
              Multiple
              <input
                @change="updateData"
                type="radio"
                value="Multi source"
                class="ml-3"
                v-model="quotationData.sourcingChannel"
              />
            </label>
          </div>

          <div class="grid grid-cols-12 col-gap-16 gap-10">
            <div
              v-if="quotationData.sourcingChannel === 'Multi source'"
              class="col-span-12 mb-5"
            >
              <s-select-chipped
                label="Suppliers:"
                :options="getSupplierContact"
                class="col-span-4"
                v-model="quotationData.suppliers"
              />
            </div>

            <div
              class="col-span-4"
              v-if="quotationData.sourcingChannel === 'Single source'"
            >
              <label for="">
                <span class="block text-cloudenly-grey-dark mb-3">
                  Select Supplier
                </span>

                <select
                  v-model="SingleSuppliers"
                  class="
                    col-span-4
                    border-1 border-gray-400
                    rounded-sm
                    w-full
                    py-2
                  "
                  name=""
                  id=""
                >
                  <!-- <option value="">Supplier Name</option>
                  <option value="">select an option</option> -->
                  <option
                    v-for="(supplier, index) in getSupplierContact"
                    :key="index"
                    :value="supplier"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </label>
            </div>

            <s-text
              label="RFQ Title:"
              class="col-span-4 mb-3"
              v-model="quotationData.title"
            />

            <s-text
              label="RFQ Description:"
              class="col-span-4"
              v-model="quotationData.description"
            />

            <s-text
              class="col-span-4"
              v-model="quotationData.requestForQuoteNumber"
            >
              <template v-slot:label>
                <div class="flex w-full justify-between mb-3">
                  <div>
                    <span
                      class="font-semibold block text-cloudenly-grey-dark mb-3"
                      >RFQ Number:</span
                    >
                  </div>
                </div>
              </template>
            </s-text>

            <s-select
              label="Bid Method:"
              :options="bidMethodList"
              class="col-span-4"
              v-model="quotationData.bidMethod"
            />

            <s-text
              label="Submission Deadline:"
              type="date"
              class="col-span-4"
              v-model="quotationData.submissionDeadline"
            />

            <div class="col-span-4">
              <label for="">
                <span class="font-semibold block text-cloudenly-grey-dark mb-3">
                  Issued Date :
                </span>
                <input
                  class="
                    col-span-4
                    border-1 border-gray-400
                    w-full
                    py-2
                    px-1
                    rounded-lg
                  "
                  v-model="quotationData.issueDate"
                  type="date"
                  :max="quotationData.submissionDeadline"
                />
              </label>
            </div>

            <s-select
              label="RFQ Currency:"
              :options="currencyList"
              class="col-span-4"
              v-model="quotationData.currency"
            />

            <s-text
              label="Authorizing By:"
              class="col-span-4"
              disabled
              v-model="quotationData.authorizedBy"
            />

            <label class="col-span-4" for="">
              <span class="font-semibold block text-cloudenly-grey-dark mb-3">
                Delivery Address:
              </span>
              <select class="w-full" name="address" id="">
                <option
                  v-for="(
                    location, index
                  ) in getAllOrganisationLocation.outlets"
                  :key="index"
                  value="location.id"
                >
                  {{ location.name }}
                </option>
              </select>
            </label>

            <div class="col-span-4">
              <label for="">
                <span class="font-semibold block text-cloudenly-grey-dark mb-3">
                  Expected Delivery Date
                </span>
                <input
                  class="
                    col-span-4
                    border-1 border-gray-400
                    w-full
                    py-2
                    px-1
                    rounded-lg
                  "
                  v-model="quotationData.expectedDeliveryDate"
                  type="date"
                  :max="quotationData.submissionDeadline"
                />
              </label>
            </div>

            <s-content-seperator class="mt-8 mb-8" />

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
                    <!-- <input
                      type="number"
                      class="py-2 px-4 rounded"
                      style="border: 1px solid; height: 32px; width: 100px"
                      v-model="item.accountId"
                    /> -->

                    <select
                      style="border: 1px solid; height: 32px; width: 100px"
                      v-model="item.accountId"
                    >
                      <option
                        v-for="item in getAccListFromExpOrRevCostCentre"
                        :value="item.id"
                        :key="item.id"
                      >
                        {{ item.accountName }}
                      </option>
                    </select>
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
                    >
                      Add this Item
                    </button>

                    <!-- <div style="color: #9ba0a7" v-else>Item Out of Stock</div> -->
                  </div>
                </div>
              </div>
            </div>

            <s-content-seperator class="my-12" v-if="!hide" />
          </div>

          <label class="">
            Terms and Conditions:

            <textarea
              v-model="quotationData.paymentTerms"
              class="mt-5 px-3 py-2 w-full"
              style="border: 1px solid #ccc; border-radius: 3px; height: 100px"
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

            <div
              class="flex items-center"
              v-if="
                !$route.params.id ||
                ($route.params.id && routeQuery.type === 'generate')
              "
            >
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
              v-if="routeQuery.type === 'edit'"
              class="px-6 py-4 bg-primary-optima-color flex items-center"
              style="border-radius: 50px; color: #f3f6f9"
              @click="updateQuotation"
            >
              <feather-icon
                v-show="isUpdating"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
                class="mr-3"
              />

              Update Request
            </button>
          </div>
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
      disabled: false,
      search: "",
      rfqDrawer: false,
      processButton: false,
      draftButton: false,
      isUpdating: false,
      processModal: false,
      currencyList: currencyList,
      SingleSuppliers: "",
      quotationData: {
        title: "",
        requestForQuoteNumber: "",
        submissionDeadline: "",
        description: "",
        currency: "Nigerian Naira",
        sourcingChannel: "Single source",
        bidMethod: "Non Competitive",
        deliveryAddress: "",
        paymentTerms: "",
        expectedDeliveryDate: new Date(),
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
        "Expenditure Category",
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
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          // this.quotationData.requestForQuoteNumber = resp.data.code;
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
      this.quotationData.requestForQuoteBoqs.push({
        functionOrGroupId: this.$store.state.auth.auth.userData?.functionId,
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
        accountId: null,
      });
    },

    deleteItem(index) {
      this.quotationData.requestForQuoteBoqs.splice(index, 1);
    },

    saveRequestForQuote() {
      this.draftButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      delete userInfo.orgName;

      if (this.quotationData.sourcingChannel === "Single source") {
        this.quotationData.suppliers = [this.SingleSuppliers];
      }
      // console.log(this.quotationData.suppliers , 'This is here supplier')
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

          this.$router.push({
            name: "PurchaseRequestQuotes",
          });
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
            phoneNumber: resp.phone,
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
          // console.log(resp);
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
          // this.quotationData.requestForQuoteNumber = resp.data.code;
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
            name: "PurchaseRequestQuotes",
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

    updateData() {
      if (this.quotationData.sourcingChannel === "Multi Source") {
        this.quotationData.bidMethod = "Competitive";
      } else {
        this.quotationData.bidMethod = "Non Competitive";
      }
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("purchase/RequestQuote", ["getIsRequestCodeSetup"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequestForQuoteOPrivileges",
    ]),
    ...mapGetters("accounting/settings/", ["getAccListFromExpOrRevCostCentre"]),
    routeQuery() {
      return this.$route.query;
    },
  },

  async mounted() {
    try {
      const { id } = this.$route.params;
      await this.$store.dispatch("crm/contact/getAllSupplierContact");
      await this.$store.dispatch("catalogue/getAllCatalogueVariant");

      await this.$store.dispatch("userOutlet/getAllOrganisationLocations");

      await this.$store.dispatch(
        "accounting/settings/getAccListFromExpOrRevCostCentre",
        "expenditure"
      );
      this.quotationData.deliveryAddress =
        this.$store.state.auth.auth.loginOutlet.address;
      if (this.routeQuery.type === "generate") {
        const { data } = await this.$store.dispatch(
          "purchase/Requisition/getSingleRequisition",
          id
        );

        this.quotationData = {
          ...this.quotationData,
          ...data.purchaseRequisition,
        };

        this.quotationData.originId = data.purchaseRequisition.id;
        this.quotationData.originObject = data.purchaseRequisition.originObject;
        this.quotationData.suppliers =
          data.purchaseRequisition.purchaseRequisitionSuppliers;
        this.quotationData.requestForQuoteBoqs =
          data.purchaseRequisition.purchaseRequisitionBoqs.map((item) => {
            return {
              customerVariantSku: item.customerVariantSku,
              customerVariantId: item.customerVariantId,
              supplierVariantSku: item.supplierVariantSku,
              supplierVariantId: item.supplierVariantId,
              variantName: item.variantName,
              variantCode: item.variantCode,
              itemClass: item.type,
              description: item.description,
              unitOfMeasure: item.unitOfMeasure,
              type: item.type,
              orderQuantity: item.quantityRequested,
              stockBalance: item.stockBalance,
              reOrderLevel: item.reOrderLevel,
            };
          });

        // this.quotationData.requestForQuoteNumber = response.code;
        await this.$store.dispatch("purchase/RequestQuote/getRequestQuoteCode");
      } else {
        if (id) {
          const { data } = await this.$store.dispatch(
            "purchase/RequestQuote/getSingleRequestQuote",
            id
          );
          this.quotationData = {
            ...this.quotationData,
            ...data.requestForQuote,
          };

          this.quotationData.suppliers =
            data.requestForQuote.requestForQuoteSuppliers;
        } else {
          await this.$store.dispatch(
            "purchase/RequestQuote/getRequestQuoteCode"
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
