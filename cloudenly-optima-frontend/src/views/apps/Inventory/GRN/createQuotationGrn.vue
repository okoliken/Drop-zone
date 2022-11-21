<template>
  <div class="">
    <back location="Good Received Note - Generate Quote" class="mb-8" />

    <!-- process grn -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process GRN"
    >
      <div class="container">
        <div
          class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white"
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
                Please note that this goods receive notes may undergo approval
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
            @click="processGRN"
            class="px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
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
    <!-- End process grm section -->

    <!-- grn code format section -->
    <Drawer :size="45" :visible="grnDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h2>GRN Code Setup</h2>
      </div>

      <div slot="body">
        <div class="bg-white py-10 px-8">
          <div class="grid grid-cols-12 gap-10">
            <!-- prefix section starts here -->
            <s-select
              label="Prefix"
              :options="optionList"
              class="col-span-4"
              v-model="prefix.type"
              @input="resetValues('prefix')"
            />

            <div class="col-span-4 flex items-end">
              <div class="w-full" v-if="prefix.type === 'randomCode'">
                <s-select
                  :options="randomCodes"
                  class="w-full"
                  v-model="prefix.typeFormat"
                />
              </div>

              <div
                class="w-full"
                v-else-if="prefix.type === 'issuingAuthority'"
              >
                <s-text
                  class="w-full"
                  placeholder="Enter name or abbreviation"
                  v-model="prefix.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="prefix.type === 'currentYear'">
                <s-select
                  :options="currentYearList"
                  class="w-full"
                  v-model="prefix.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="prefix.type === 'moduleName'">
                <s-text v-model="prefix.typeFormat" />
              </div>
            </div>

            <div class="col-span-4"></div>
            <!-- prefix section ends here -->

            <!-- base section starts here -->
            <s-select
              label="Base"
              :options="optionList"
              class="col-span-4"
              v-model="roots.type"
              @input="resetValues('randomCode')"
            />

            <div class="col-span-4 flex items-end">
              <div class="w-full" v-if="roots.type === 'randomCode'">
                <s-select
                  :options="randomCodes"
                  class="w-full"
                  v-model="roots.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="roots.type === 'issuingAuthority'">
                <s-text
                  class="w-full"
                  placeholder="Enter name or abbreviation"
                  v-model="roots.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="roots.type === 'currentYear'">
                <s-select
                  :options="currentYearList"
                  class="w-full"
                  v-model="roots.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="roots.type === 'moduleName'">
                <s-text v-model="roots.typeFormat" />
              </div>
            </div>

            <div class="col-span-4"></div>
            <!-- base section ends here -->

            <!-- suffix section starts here -->
            <s-select
              label="Suffix"
              :options="optionList"
              class="col-span-4"
              v-model="suffix.type"
              @input="resetValues('suffix')"
            />

            <div class="col-span-4 flex items-end">
              <div class="w-full" v-if="suffix.type === 'randomCode'">
                <s-select
                  :options="randomCodes"
                  class="w-full"
                  v-model="suffix.typeFormat"
                />
              </div>

              <div
                class="w-full"
                v-else-if="suffix.type === 'issuingAuthority'"
              >
                <s-text
                  class="w-full"
                  placeholder="Enter name or abbreviation"
                  v-model="suffix.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="suffix.type === 'currentYear'">
                <s-select
                  :options="currentYearList"
                  class="w-full"
                  v-model="suffix.typeFormat"
                />
              </div>

              <div class="w-full" v-else-if="suffix.type === 'yearOfBirth'">
                <s-select
                  :options="currentYearList"
                  class="w-full"
                  v-model="suffix.typeFormat"
                />
              </div>
            </div>

            <div class="col-span-4"></div>
            <!-- suffix section ends here -->

            <s-select
              label="Seperator"
              :options="seperatorList"
              class="col-span-4"
              v-model="separator.type"
            />

            <div class="col-span-8 flex items-end">
              <div class="flex items-center w-full">
                <span class="w-2/12">ID Preview:</span>

                <span
                  class="flex items-center justify-center px-8 rounded"
                  style="height: 32px; background-color: #eee"
                  >{{ previewFormat || "XX-XX-XXXX" }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- action buttons section -->
        <div class="grid grid-cols-12 bg-white pb-10 px-8">
          <s-content-seperator class="mb-10 mt-3" />

          <div class="col-span-12 flex">
            <button
              class="bg-primary-optima-color text-white px-10 py-4 flex items-center mr-8"
              :disabled="isSubmitting"
              :class="{ 'cursor-not-allowed': isSubmitting }"
              style="border-radius: 50px"
              @click="saveGrnCode"
            >
              <feather-icon
                v-show="isSubmitting"
                svgClasses="animate-spin h-5 w-5 mr-3"
                icon="CircleIcon"
                class="mr-3"
              />

              Apply Update
            </button>

            <!-- <button class="px-8 py-4" style="border-radius: 50px; color: #5E646D;">
          Clear Changes
        </button> -->
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End Section -->

    <div class="py-8 px-5 bg-white rounded">
      <div class="row flex w-full mb-10">
        <div class="col-md-4">
          <div>
            <div class="no-gutters mb-2">
              <label for="" class="col-sm-8 font-bold"> Supplier</label>
            </div>

            <div class="w-full">
              <div
                class="border border-solid border-grey-lighter py-3 px-3 rounded-lg shadow"
              >
                <h1 class="font-normal mb-3">
                  Name : {{ grnData.supplier.name }}
                </h1>
                <h1 class="font-normal">
                  Email : {{ grnData.supplier.email }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4">
          <label for="">
            <div class="flex items-center justify-between mb-5">
              <div>
                <span class="font-semibold">GRN Number</span>
              </div>
              <div>
                <span
                  v-if="getIsGrnCodeSetup"
                  class="text-cloudenly-primary-main cursor-pointer"
                  @click="grnDrawer = true"
                  >Setup code number</span
                >
              </div>
            </div>

            <input
              :disabled="getIsGrnCodeSetup"
              placeholder="Enter GRN No"
              v-model="grnData.grnNumber"
              type="text"
              class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
              name
              id
            />
          </label>
        </div>

        <div class="col-4">
          <label for="">
            <div class="flex items-center justify-between mb-5">
              <div>
                <span class="font-semibold">Date:</span>
              </div>
              <div></div>
            </div>

            <datepicker
              v-model="grnData.date"
              input-class="w-full py-2"
              placeholder="Select Date"
            ></datepicker>
          </label>
        </div>
      </div>

      <div class="row flex w-full mb-5">
        <div class="col-4">
          <label for="">
            <div class="mb-5">
              <span class="font-semibold">Reference No</span>
            </div>

            <input
              placeholder="Enter Reference No"
              v-model="grnData.receiptNumber"
              type="text"
              class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
              name
              id
            />
          </label>
        </div>

        <div class="col-4">
          <label for="">
            <div class="mb-5">
              <span class="font-semibold">Currency</span>
            </div>

            <select
              v-model="grnData.currency"
              class="py-1 px-2 rounded border border-solid border-gray-300 w-full"
            >
              <option
                v-for="(currency, index) in currencyList"
                :key="index"
                :value="currency"
              >
                {{ currency }}
              </option>
            </select>
          </label>
        </div>

        <div class="col-4">
          <label for="">
            <div class="mb-5">
              <span class="font-semibold">Reason</span>
            </div>

            <textarea
              v-model="grnData.reasonForGrn"
              rows="4"
              cols="30"
              class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
              placeholder="Enter Reason"
            ></textarea>
          </label>
        </div>
      </div>

      <div class="row flex w-full mb-10">
        <div class="col-4">
          <label for="">
            <div class="mb-5">
              <span class="font-semibold">Description</span>
            </div>

            <textarea
              v-model="grnData.description"
              rows="4"
              cols="30"
              class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
              placeholder="Enter Description"
            ></textarea>
          </label>
        </div>

        <div class="col-4">
          <label for="">
            <div class="mb-5">
              <span class="">Inventory </span>
            </div>

            <select
              v-model="grnData.inventoryTypeId"
              class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
              name=""
              id=""
            >
              <option
                v-for="(inventory, index) in inventoryClasses"
                :key="index"
                :value="inventory.id"
              >
                {{ inventory.name }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div class="">
        <hr />
        <table class="table min-w-full">
          <thead class="bg-gray-300">
            <tr>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Item Name
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                SKU
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Unit
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Quantity Invoiced
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Quantity Received
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Quantity Outstanding
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Purchase Price
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                GRN Amount
              </th>
              <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(boq, index) in grnData.goodsReceivedNoteBoqs"
              :key="index"
            >
              <td
                class="px-6 py-3 whitespace-no-wrap border"
                style="width: 20%"
              >
                <input
                  type="text"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  v-model="boq.variantName"
                  disabled
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  type="text"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  v-model="boq.supplierVariantSku"
                  disabled
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  type="text"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  v-model="boq.unitOfSale"
                  disabled
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  type="text"
                  @keyup="grnCal(boq)"
                  v-model="boq.quantityInvoiced"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  type="text"
                  @keyup="grnCal(boq)"
                  v-model="boq.quantityReceived"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  v-model="boq.quantityOutstanding"
                  readonly
                  type="text"
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  @keyup="grnCal(boq)"
                  v-model="boq.purchasePrice"
                  type="text"
                  name=""
                  id=""
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border">
                <input
                  type="text"
                  class="py-2 px-2 rounded border border-solid border-gray-300 w-full"
                  readonly
                  v-model="boq.amount"
                  name=""
                  id=""
                />
              </td>
            </tr>
          </tbody>
        </table>

        <hr class="mt-10" />

        <div class="flex justify-end mt-10">
          <table>
            <tbody>
              <tr>
                <td class="px-10 py-3 whitespace-no-wrap">
                  Total Invoiced Quantity :
                </td>
                <td class="px-10 py-3 whitespace-no-wrap">
                  {{ grnData.totalQuantityInvoiced }}
                </td>
              </tr>

              <tr>
                <td class="px-10 py-3 whitespace-no-wrap">
                  Total Received Quantity :
                </td>
                <td class="px-10 py-3 whitespace-no-wrap">
                  {{ grnData.totalQuantityReceived }}
                </td>
              </tr>

              <tr>
                <td class="px-10 py-3 whitespace-no-wrap">
                  Total Outstanding Quantity :
                </td>
                <td class="px-10 py-3 whitespace-no-wrap">
                  {{ grnData.totalQuantityOutstanding }}
                </td>
              </tr>

              <tr>
                <td class="px-10 py-3 whitespace-no-wrap">
                  Total GRN Amount :
                </td>
                <td class="px-10 py-3 whitespace-no-wrap">
                  {{ grnData.totalAmount | currency }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr class="mt-10" />

        <div class="mt-10">
          <div class="flex items-center justify-between">
            <button
              @click="cancelGrn"
              class="px-5 inline-flex items-center rounded-full py-4 bg-gray-200 text-primary-optima-color"
            >
              cancel
            </button>

            <div>
              <!-- <button
                :disabled="saveButton"
                :class="{
                  'cursor-not-allowed': saveButton,
                  'bg-cloudenly-primary-mid': saveButton,
                }"
                @click.prevent="saveGrn"
                class="px-5 mr-10 inline-flex items-center rounded-full py-4 bg-gray-200 text-primary-optima-color"
              >
                Save as Draft
              </button> -->

              <button
                @click="processModal = true"
                class="px-5 rounded-full py-4 bg-primary-optima-color text-white"
              >
                Save & Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import AddItemPurchase from "../../../components/AddItemWidget/AddItemPurchase";
import currencyList from "../../../../utils/currency";

import Drawer from "../../../components/Drawer/drawer";
import { mapGetters } from "vuex";

export default {
  components: {
    Datepicker,
    AddItemPurchase,
    Drawer,
  },
  data() {
    return {
      supplier: "",
      currencyList: currencyList,
      supplierModal: false,
      processModal: false,
      processButton: false,
      grnDrawer: false,
      grnData: {
        originObject: "",
        originId: "",
        grnNumber: "",
        supplier: "",
        description: "",
        currency: "",
        receiptNumber: "",
        goodsOrderedBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
        reasonForGrn: "",
        totalQuantityInvoiced: 0,
        totalQuantityReceived: 0,
        totalQuantityOutstanding: 0,
        totalAmount: 0,
        goodsReceivedNoteBoqs: [],
        inventoryTypeId: "",
      },

      saveButton: false,

      inventoryClasses: [],

      message: "",
      isSubmitting: false,
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

      optionList: [
        { name: "Issuing Authority", id: "issuingAuthority" },
        { name: "Random Code", id: "randomCode" },
        { name: "Current Date", id: "currentDate" },
        { name: "Module Name", id: "moduleName" },
        { name: "Current Year", id: "currentYear" },
      ],
      randomCodes: [
        { name: "Alphabet", id: "alphabet" },
        { name: "Numeric", id: "numeric" },
        { name: "Alphanumeric", id: "alphanumeric" },
      ],
      currentYearList: [
        { name: "YY", id: "yy" },
        { name: "YYYY", id: "yyyy" },
      ],
      seperatorList: [
        { name: "Slash", id: "slash" },
        { name: "Hyphen", id: "hyphen" },
      ],
    };
  },

  methods: {
    cancelGrn() {
      this.$router.back();
    },
    close() {
      this.grnDrawer = false;
    },

    grnCal(val) {
      val.quantityOutstanding =
        parseInt(val.quantityInvoiced || 0) -
        parseInt(val.quantityReceived || 0);
      val.amount =
        parseInt(val.purchasePrice || 0) * parseInt(val.quantityReceived || 0);
      let InvoiceBoqtotal = 0;
      let invoiceBoqRecieved = 0;
      let invoiceBoqOutstanding = 0;
      let TotalAmount = 0;
      for (var i = 0; i < this.grnData.goodsReceivedNoteBoqs.length; i++) {
        InvoiceBoqtotal =
          InvoiceBoqtotal +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].quantityInvoiced || 0);
        invoiceBoqRecieved =
          invoiceBoqRecieved +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].quantityReceived || 0);
        invoiceBoqOutstanding =
          invoiceBoqOutstanding +
          parseInt(
            this.grnData.goodsReceivedNoteBoqs[i].quantityOutstanding || 0
          );
        TotalAmount =
          TotalAmount +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].amount || 0);
      }
      this.grnData.totalQuantityInvoiced = InvoiceBoqtotal;
      this.grnData.totalQuantityReceived = invoiceBoqRecieved;
      this.grnData.totalQuantityOutstanding = invoiceBoqOutstanding;
      this.grnData.totalAmount = TotalAmount;
    },

    saveGrn() {
      this.saveButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      // this.grnData.supplier = {
      //   contactId: this.supplier.contactId,
      //   supplierOrgId: this.supplier.supplierOrgId,
      //   name: this.supplier.name,
      //   address: this.supplier.address,
      //   email: this.supplier.email,
      //   contactName: this.supplier.contactName,
      //   phoneNumber: this.supplier.phoneNumber,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.grnData,
      };
      this.$store
        .dispatch("inventory/grn/createGrn", data)
        .then((resp) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Good Received Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.$router.push({
            name: "GoodReceiveNote",
          });
        })
        .catch((err) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Good Received Note",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processGRN() {
      this.processButton = true;
      this.processModal = false;
      let userInfo = this.$store.state.auth.auth.authData;
      // this.grnData.supplier = {
      //   contactId: this.supplier.contactId,
      //   supplierOrgId: this.supplier.supplierOrgId,
      //   name: this.supplier.name,
      //   address: this.supplier.address,
      //   email: this.supplier.email,
      //   contactName: this.supplier.contactName,
      //   phoneNumber: this.supplier.phoneNumber,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.grnData,
      };

      this.processModal = false;

      this.$store
        .dispatch("inventory/grn/createGrn", data)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                grnId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("inventory/grn/sendGrn", data2)
              .then((resp) => {
                console.log(resp.data);
                this.processButton = false;
                this.$vs.notify({
                  title: "Good Received Note ",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
            this.processModal = false;
            this.$router.push({
              name: "GoodReceiveNote",
            });
          }
        })
        .catch((err) => {
          this.processButton = false;
          this.processModal = true;
          this.$vs.notify({
            title: "Good received note ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    resetValues(obj) {
      this[obj].typeFormat = "";
    },

    saveGrnCode() {
      this.isSubmitting = true;
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
        .dispatch("inventory/grn/createGrnCode", dataPayload)
        .then((resp) => {
          if (resp.data) {
            this.isSubmitting = false;
            let data = {
              userInfo: userInfo,
              payload: {
                moduleName: "GRN",
                yearOfBirth: null,
                contactName: null,
              },
            };

            this.$store
              .dispatch("inventory/grn/getGeneratedGrnCode", data)
              .then((resp) => {
                this.previewFormat = resp.data.code;
                this.grnData.grnNumber = resp.data.code;
                this.$vs.notify({
                  title: "GRN Code",
                  text: "code updated",
                  color: "primary",
                  position: "top-right",
                });
              });
          }
        })
        .catch((err) => {
          this.isSubmitting = false;
          console.log(err);
          this.$vs.notify({
            title: "GRN Code",
            text: "Code Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    // previewCode() {
    //   this.$vs.loading({
    //     container: "#div-with-loading-preview",
    //     scale: 0.5,
    //   });
    //   let userInfo = this.$store.state.auth.auth.authData;
    //   // delete userInfo.orgInfo;
    //   this.$store
    //     .dispatch("inventory/grn/getGrnCode")
    //     .then((resp) => {
    //       let format = resp.data.setting.codeFormat;
    //       (this.suffix = format.suffix),
    //         (this.prefix = format.prefix),
    //         (this.roots = format.roots[0]);
    //       this.separator = format.separator;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   let data = {
    //     userInfo: userInfo,
    //     payload: {
    //       moduleName: "GRN",
    //       yearOfBirth: null,
    //       contactName: null,
    //     },
    //   };
    //   this.$store
    //     .dispatch("inventory/grn/getGeneratedGrnCode", data)
    //     .then((resp) => {
    //       this.message = "";
    //       this.previewFormat = resp.data.code;
    //       this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
    //     });
    // },
  },

  watch: {
    "grnData.goodsReceivedNoteBoqs": function() {
      let InvoiceBoqtotal = 0;
      let invoiceBoqRecieved = 0;
      let invoiceBoqOutstanding = 0;
      let TotalAmount = 0;
      for (var i = 0; i < this.grnData.goodsReceivedNoteBoqs.length; i++) {
        InvoiceBoqtotal =
          InvoiceBoqtotal +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].quantityInvoiced || 0);
        invoiceBoqRecieved =
          invoiceBoqRecieved +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].quantityReceived || 0);
        invoiceBoqOutstanding =
          invoiceBoqOutstanding +
          parseInt(
            this.grnData.goodsReceivedNoteBoqs[i].quantityOutstanding || 0
          );
        TotalAmount =
          TotalAmount +
          parseInt(this.grnData.goodsReceivedNoteBoqs[i].amount || 0);
      }
      this.grnData.totalQuantityInvoiced = InvoiceBoqtotal;
      this.grnData.totalQuantityReceived = invoiceBoqRecieved;
      this.grnData.totalQuantityOutstanding = invoiceBoqOutstanding;
      this.grnData.totalAmount = TotalAmount;
    },
  },

  computed: {
    ...mapGetters("inventory/grn", ["getIsGrnCodeSetup"]),
  },

  mounted() {
    let id = this.$route.params.id;

    this.$store
      .dispatch("purchase/Quotation/getSingleQuotationReceived", id)
      .then((resp) => {
        // console.log(resp.data)
        this.grnData.receiptNumber = resp.data.quote.quoteNumber;
        this.grnData.originObject = "quote";
        this.grnData.originId = resp.data.quote.id;
        this.grnData.currency = resp.data.quote.currency;
        this.grnData.date = resp.data.quote.date;
        this.grnData.description = resp.data.quote.comment;

        this.grnData.goodsReceivedNoteBoqs = resp.data.quote.quoteBoqs.map(
          (resp) => {
            return {
              customerVariantSku: resp.customerVariantSku,
              customerVariantId: resp.customerVariantId,
              supplierVariantSku: resp.supplierVariantSku,
              supplierVariantId: resp.supplierVariantId,
              category: resp.category,
              variantName: resp.name,
              variantCode: resp.variantCode,
              description: resp.description,
              unitOfSale: resp.unitOfMeasure,
              quantityInvoiced: resp.quantity,
              quantityReceived: 0,
              quantityOutstanding: 0,
              purchasePrice: resp.unitPrice || 0,
              amount: 0,
            };
          }
        );

        this.grnData.supplier = {
          contactId: resp.data.senderInfo.contactId,
          supplierOrgId: resp.data.senderInfo.supplierOrgId,
          name: resp.data.senderInfo.name,
          address: resp.data.senderInfo.address,
          email: resp.data.senderInfo.email,
          contactName: resp.data.senderInfo.contactName,
          phoneNumber: resp.data.senderInfo.phoneNumber,
        };
      });
    let userInfo = this.$store.state.auth.auth.authData;

    this.$store
      .dispatch("inventory/grn/getGrnCode")
      .then((resp) => {
        if (resp.data.setting) {
          let format = resp.data.setting.codeFormat;
          (this.suffix = format.suffix),
            (this.prefix = format.prefix),
            (this.roots = format.roots[0]);
          this.separator = format.separator;
        } else {
          this.message = resp.data.message;
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        }
      })
      .catch((err) => {
        console.log(err);
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });

    let data = {
      userInfo: userInfo,
      payload: {
        moduleName: "GRN",
        yearOfBirth: null,
        contactName: null,
      },
    };
    this.$store
      .dispatch("inventory/grn/getGeneratedGrnCode", data)
      .then((resp) => {
        console.log(resp.data);
        this.grnData.grnNumber = resp.data.code;
      });

    this.$store
      .dispatch("inventory/stock/viewCurrentOutletInventoryType")
      .then((resp) => {
        console.log(resp.data);
        this.inventoryClasses = resp.data;
      });
  },
};
</script>

<style></style>
