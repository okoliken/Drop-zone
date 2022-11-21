/* eslint-disable no-unused-vars */
<template>
  <div class="mb-12 font-normal">
    <!-- process Requisition -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Requisition"
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
                Please note that this purchase requisition may undergo approval
                process
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
            @click="processRequisition"
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

    <!-- setup request for pr code -->
    <Drawer :size="45" :visible="prDrawer" v-on:closeDrawer="close">
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
                border border-solid-2 border-gray-200-lighter
                rounded-lg
              "
            >
              <div class="p-3 pt-10">
                <div class="flex items-center mb-5">
                  <div class="w-1/4 mr-5 text-right">Prefix</div>

                  <div class="w-1/3 mr-5">
                    <select
                      v-model="prefix.type"
                      name
                      id
                      class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        placeholder="eg: PR"
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                      class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        placeholder="eg: PR"
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                      class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                        placeholder="eg: PR"
                        class="py-1 px-1 w-full border-2 border-gray-200"
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
                      class="py-1 px-1 w-full border-2 border-gray-200"
                    >
                      <option disabled selected value>
                        Select preferred Code Separator
                      </option>
                      <option value="hyphen">Hyphen</option>
                      <option value="slash">Slash</option>
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
                <div class="mr-3">preview</div>

                <div
                  id="div-with-loading-preview"
                  class="py-3 vs-con-loading__container"
                >
                  <span
                    class="
                      px-3
                      py-2
                      my-5
                      border border-solid
                      bg-gray-lighter
                      font-bold-2
                      border-gray-200
                    "
                    >{{ previewFormat | capitalize }}</span
                  >
                </div>
              </div>

              <div class="flex pb-10 mb-10 mt-3">
                <div class="mx-auto">
                  <button
                    :disabled="saveButton"
                    @click="saveRequisitionCode"
                    :class="{
                      'cursor-not-allowed': saveButton,
                      'bg-cloudenly-primary-mid': saveButton,
                    }"
                    class="
                      px-4
                      py-2
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
        getPurchaseRequisitionPrivileges.createNewPR ||
        getPurchaseRequisitionPrivileges.editPR
      "
    >
      <div id="div-with-loading" class="vs-con-loading__container">
        <back location="Purchase Requisition - New" class="mb-8" />

        <div class="bg-white px-6 pt-6 pb-10 rounded">
          <div class="flex items-center justify-between mb-10">
            <h2 class="font-semibold">Create New Purchase Requisition</h2>
            <div
              v-my-tooltip.top-start="
                'Kindly fill up the details below to create a new PR'
              "
            >
              <feather-icon
                icon="AlertCircleIcon"
                svgClasses="mr-3 h-6 w-6 cursor-pointer"
              />
            </div>
          </div>

          <div class="grid grid-cols-12 col-gap-16 gap-10">
            <s-select
              label="Supplier Name:"
              :options="getSupplierContact"
              class="col-span-4 mb-5"
              v-model="prData.suppliers"
            />

            <div class="col-span-4">
              <div class="mb-3 flex items-center justify-between">
                <label class="block" for="inline-full-name">PR Number : </label>
              </div>
              <s-text v-model="prData.purchaseRequisitionNumber" />
            </div>

            <s-select
              label="Item Type Requested:"
              :options="requestTypes"
              class="col-span-4"
              v-model="prData.requestCategory"
            />

            <s-select
              label="PR Currency:"
              :options="currencyList"
              class="col-span-4 mb-5"
              v-model="prData.currency"
            />

            <s-text
              label="PR Title:"
              class="col-span-4"
              v-model="prData.title"
            />

            <s-text
              label="PR Description:"
              class="col-span-4"
              v-model="prData.description"
            />

            <s-text
              label="Issued Date:"
              type="date"
              class="col-span-4"
              v-model="prData.dateRequired"
            />

            <!-- requisitioner  -->
            <div class="col-span-12">
              <div class="accordion" id="accordionExample">
                <div
                  class="
                    accordion-item
                    bg-white
                    border border-1
                    rounded-sm
                    border-gray-500
                  "
                >
                  <h2 class="accordion-header mb-0" id="headingTwo">
                    <button
                      class="
                        accordion-button
                        collapsed
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                        text-base text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        font-semibold
                        transition
                        focus:outline-none
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Requisitioner
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="w-full flex">
                        <div class="w-1/3 mr-3">
                          <s-text class="text" label="Name:" disabled />
                          <s-text
                            label="Phone Number:"
                            type="number"
                            class="my-4"
                            disabled
                          />
                        </div>
                        <div class="w-1/3 mr-3">
                          <s-text label="Function:" disabled />
                          <s-text
                            label="Email:"
                            type="email"
                            class="my-4"
                            disabled
                          />
                        </div>
                        <div class="w-1/3 mr-3">
                          <s-text label="Title:" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item bg-white">
                  <h2 class="accordion-header mb-0" id="headingThree">
                    <button
                      class="
                        accordion-button
                        collapsed
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                        text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        font-semibold
                        transition
                        focus:outline-none
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Purchasing Function
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="w-full flex">
                        <div class="w-1/3 mr-3 mt-4">
                          <s-select label="Function:" />
                          <s-text
                            label="Email:"
                            type="email"
                            disabled
                            class="my-4"
                          />
                        </div>
                        <div class="w-1/3 mr-3 mt-4">
                          <s-select label="Contact Person:" />
                        </div>
                        <div class="w-1/3 mt-4">
                          <s-text label="Phone Number:" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of requisitioner -->

            <s-content-seperator class="mt-8 mb-8" />

            <div class="col-span-12 mb-8 flex justify-between items-center">
              <h2 class="font-semibold">PR item(s)</h2>
              <button
                class="text-primary-optima-color font-medium"
                @click="hide = !hide"
              >
                {{ !hide ? "Hide" : "Add an Item / Service" }}
              </button>
            </div>

            <div class="col-span-12">
              <custom-table
                :headers="headers"
                :requisitionData="requisitionData"
                :deleteProductBoq="deleteProductBoq"
              />
            </div>

            <s-content-seperator class="mb-8" />

            <div class="col-span-12 font-normal" v-if="!hide">
              <div>
                <div class="flex items-center">
                  <s-combo-box />

                  <div class="ml-12">
                    {{ getAllPurchaseVariant.length }} Items in Catalogue
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
                        <span
                          >Item description: {{ item.item.description }}</span
                        >
                        <span class="ml-8"
                          >Item type: {{ item.productOrService }}</span
                        >
                      </div>
                    </div>

                    <div class="col-span-3 flex items-center">
                      <span
                        class="leading-loose mr-3"
                        :class="[
                          !item.stockBalance
                            ? 'text-danger-optima-color'
                            : 'text-tetiary-optima-color',
                        ]"
                      >
                        {{ item.stockBalance }} &nbsp;</span
                      >
                      in stock
                    </div>

                    <div class="col-span-3 flex items-center">
                      <button
                        class="text-primary-optima-color"
                        @click="addItem(item)"
                      >
                        Add this Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <s-content-seperator class="my-12" />
            </div>
          </div>

          <s-content-seperator class="my-12" />

          <label class="flex flex-col">
            Comments:
            <textarea
              class="mt-5 px-4 py-2"
              style="
                border: 1px solid #ccc;
                border-radius: 3px;
                height: 100px;
                width: 100%;
              "
            />
          </label>

          <div class="flex justify-between mt-8">
            <button
              class="px-8 py-4"
              style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
              @click="$router.back()"
            >
              Cancel
            </button>

            <div class="flex items-center" v-if="!$route.query.id">
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
                @click="saveRequisition"
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
                  v-show="saveButton"
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
              @click="updateRequisition"
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

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import AddItemPurchase from "../../../../components/AddItemWidget/catalogue";
import trash from "@/assets/images/optimaAsset/trash.svg";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import currencyList from "@/utils/currency";
import Drawer from "../../../../components/Drawer/drawer";
import customTable from "./components/customTable.vue";
import { formatDate } from "../../../../../utils/formatDate";

export default {
  components: {
    Datepicker,
    trash,
    AddItemPurchase,
    VuePerfectScrollbar,
    Drawer,
    customTable,
  },

  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      hide: true,
      processButton: false,
      draftButton: false,
      isUpdating: false,
      currencyList: currencyList,
      checkForBudget: false,
      processModal: false,
      selectedSupplier: [],
      requisitionData: [],
      prData: {
        purchaseRequisitionNumber: "",
        description: "",
        currency: "Nigerian Naira",
        dateRequired: "",
        title: "",
        reasonForRequisition: "",
        suppliers: [],
        budgetTitle: "",
        budgetType: "",
        budgetCycle: "",
        budgetItem: "",
        requestCategory: "",
        requestSubCategory: "",
        purchaseRequisitionBoqs: [],
      },
      prDrawer: false,
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

      requestTypes: ["Product", "Service", "Product & Service"],
      headers: [
        "Item Name",
        "Item Code",
        "Unit of Purchase",
        // "Unit Purchase Price",
        "Stock Balance",
        "Quantity Requested",
        "Expenditure Category",
        "Actions",
      ],
    };
  },

  computed: {
    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("purchase/Requisition", ["getRequisitionCodeCreated"]),
    ...mapGetters("catalogue", ["getAllPurchaseVariant", "getAllVariant"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequisitionPrivileges",
    ]),
    ...mapGetters("accounting/settings/", ["getAccListFromExpOrRevCostCentre"]),
  },

  methods: {
    close() {
      this.prDrawer = false;
    },

    deleteSelectedSupplier(val) {
      this.selectedSupplier.splice(val, 1);
    },

    deleteProductBoq(index) {
      this.requisitionData = this.requisitionData.filter((_, i) => i !== index);
    },

    addItem(val) {
      // console.log(val);
      this.requisitionData.push({
        functionOrGroupId: this.$store.state.auth.auth.userData?.functionId,
        customerVariantSku: val.variantSku,
        customerVariantId: val.id,
        supplierVariantSku: val.variantSku,
        supplierVariantId: val.id,
        variantName: val.variantName,
        variantCode: val.variantCode,
        description: val.item.description,
        unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
        type: val.productOrService,
        quantityRequested: 1,
        accountId: null,
        stockBalance: val.stockBalance,
        // reOrderLevel: val.reOrderLevel // This is not available on the payload
      });
    },

    selectSupplier(val) {
      this.selectedSupplier = val;
    },

    saveRequisition() {
      this.draftButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      this.prData.purchaseRequisitionBoqs = this.requisitionData;
      this.prData.suppliers = this.prData.suppliers.map((resp) => {
        // console.log("---------->", resp);
        return {
          supplierOrgId: resp.contactOrgId,
          contactId: resp.id,
          name: resp.name,
          address: resp.address,
          contactName: resp.contactPerson,
          phoneNumber: resp.phone,
          email: resp.email,
        };
      });

      let data = {
        userInfo: userInfo,
        payload: this.prData,
      };

      this.$store
        .dispatch("purchase/Requisition/crateRequisition", data)
        .then((resp) => {
          this.draftButton = false;
          this.$router.push({
            name: "purchaseRequisitions",
          });
          this.$vs.notify({
            title: "Requisition ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.draftButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Requisition ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processRequisition() {
      this.processButton = true;
      this.processModal = false;

      let userInfo = this.$store.state.auth.auth.authData;
      this.prData.purchaseRequisitionBoqs = this.requisitionData;
      this.prData.suppliers = this.prData.suppliers.map((resp) => {
        return {
          supplierOrgId: resp.contactOrgId,
          contactId: resp.id,
          name: resp.name,
          address: resp.address,
          contactName: resp.contactName,
          phoneNumber: resp.phone,
          email: resp.email,
        };
      });

      let data = {
        userInfo: userInfo,
        payload: this.prData,
      };

      this.$store
        .dispatch("purchase/Requisition/crateRequisition", data)
        .then((resp) => {
          if (resp.data) {
            this.processModal = false;
            let data2 = {
              userInfo: userInfo,
              payload: {
                purchaseRequisitionId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("purchase/Requisition/sendRequisition", data2)
              .then((resp) => {
                console.log(resp.data);
                this.processButton = false;
                this.processModal = false;
                this.$vs.notify({
                  title: "Requisition Process ",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
            this.processModal = false;
            this.$router.push({
              name: "purchaseRequisitions",
            });
          }
        })
        .catch((err) => {
          this.processButton = false;
          this.$vs.notify({
            title: "Requisition ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    routeNumbering() {
      this.$router.push({
        name: "documentCode",
      });
    },

    routeBack() {
      this.$router.push({
        name: "PurchaseRequisition",
      });
    },

    saveRequisitionCode() {
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
        .dispatch(
          "purchase/Requisition/createPurchaseRequisitionCode",
          dataPayload
        )
        .then((resp) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Requisition Code",
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
            title: "Requisition Code",
            text: "Code Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    updateRequisition() {
      this.isUpdating = true;
      let userInfo = this.$store.state.auth.auth.authData;
      delete userInfo.orgName;
      delete this.prData.purchaseRequisitionSuppliers;
      this.prData.purchaseRequisitionBoqs = this.requisitionData;

      let data = {
        userInfo: userInfo,
        payload: this.prData,
      };

      this.$store
        .dispatch("purchase/Requisition/updateRequisition", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Requisition",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });

          console.log({
            data,
            response: resp.data,
          });
          this.isUpdating = false;
          this.$router.push({
            name: "purchaseRequisitions",
          });
        })
        .catch((err) => {
          this.isUpdating = false;
          this.$vs.notify({
            title: "Requisition",
            text: err.response.data.message,
            color: "Danger",
            position: "top-right",
          });
          console.log(err);
        });
    },

    previewCode() {
      this.$vs.loading({
        container: "#div-with-loading-preview",
        scale: 0.5,
      });

      let userInfo = this.$store.state.auth.auth.authData;
      this.$store
        .dispatch("purchase/Requisition/getPurchaseRequisitionCode")
        .then((resp) => {
          if (resp.data.setting) {
            let format = resp.data.setting.codeFormat;
            (this.suffix = format.suffix),
              (this.prefix = format.prefix),
              (this.roots = format.roots[0]);
            this.separator = format.separator;
            let data = {
              userInfo: userInfo,
              payload: {
                moduleName: "PR",
                yearOfBirth: null,
                contactName: null,
              },
            };
            this.$store
              .dispatch(
                "purchase/Requisition/getGeneratedRequisitionCode",
                data
              )
              .then((resp) => {
                this.prData.purchaseRequisitionNumber = "";
                this.previewFormat = resp.data.code;
                this.message = "";
                this.$vs.loading.close(
                  "#div-with-loading-preview > .con-vs-loading"
                );
              });
          } else {
            this.$vs.loading.close(
              "#div-with-loading-preview > .con-vs-loading"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        });
    },
  },

  async mounted() {
    try {
      const { id } = this.$route.query;

      await this.$store.dispatch("crm/contact/getAllSupplierContact");
      await this.$store.dispatch(
        "purchase/Requisition/getPurchaseRequisitionCode"
      );
      await this.$store.dispatch("catalogue/getAllPurchaseVariant");
      await this.$store.dispatch("catalogue/getAllCatalogueVariant");
      this.$store.dispatch(
        "accounting/settings/getAccListFromExpOrRevCostCentre",
        "expenditure"
      );

      if (id) {
        const { data } = await this.$store.dispatch(
          "purchase/Requisition/getSingleRequisition",
          id
        );

        this.prData = { ...this.prData, ...data.purchaseRequisition };
        this.prData.dateRequired = formatDate(
          new Date(data.purchaseRequisition.dateRequired).toDateString()
        );
        this.prData.suppliers = [
          ...this.prData.suppliers,
          ...data.purchaseRequisition.purchaseRequisitionSuppliers,
        ];

        this.requisitionData = [
          ...this.requisitionData,
          ...data.purchaseRequisition.purchaseRequisitionBoqs,
        ];
      } else {
        // const { data } = await this.$store.dispatch(
        //   "purchase/Requisition/getGeneratedRequisitionCode",
        //   payload
        // );
        // this.prData.purchaseRequisitionNumber = data.code;
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
