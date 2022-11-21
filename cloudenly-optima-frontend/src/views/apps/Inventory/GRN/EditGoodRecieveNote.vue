<template>
  <div class="">
    <back location="Good Received Note - Edit " class="mb-8" />

    <!-- process grn -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process GRN"
    >
      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.editGRN">
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
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End process grm section -->

    <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.editGRN">
      <div class="py-8 px-5 bg-white rounded">
        <div class="row flex w-full mb-10">
          <div class="col-md-4 w-1/3 mr-8">
            <div>
              <div class="no-gutters mb-5">
                <label for="" class="col-sm-8 font-bold"> Supplier</label>
              </div>

              <div class="w-full">
                <select
                  v-model="supplier"
                  class="
                    py-2
                    px-2
                    w-full
                    border border-solid border-2 border-gray-400
                    rounded
                  "
                  name=""
                  id=""
                >
                  <option
                    v-for="(supplier, index) in getSupplierContact"
                    :key="index"
                    :value="supplier"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-4 w-1/3 mr-8">
            <label for="">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <span class="font-semibold">GRN Number</span>
                </div>
                <div>
                  <!-- <span
                    v-if="getIsGrnCodeSetup"
                    class="text-cloudenly-primary-main cursor-pointer"
                    @click="routeNumbering"
                    >Setup code number</span
                  > -->
                </div>
              </div>

              <input
                placeholder="Enter GRN No"
                v-model="grnData.grnNumber"
                type="text"
                class="
                  py-2
                  px-2
                  rounded
                  border border-solid border-2 border-gray-400
                  w-full
                "
                name
                id
              />
            </label>
          </div>

          <div class="col-4 w-1/3">
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
          <div class="col-4 w-1/3 mr-8">
            <label for="">
              <div class="mb-5">
                <span class="font-semibold">Reference No</span>
              </div>

              <input
                placeholder="Enter Reference No"
                v-model="grnData.receiptNumber"
                type="text"
                class="
                  py-2
                  px-2
                  rounded
                  border border-solid border-2 border-gray-400
                  w-full
                "
                name
                id
              />
            </label>
          </div>

          <div class="col-4 w-1/3 mr-8">
            <label for="">
              <div class="mb-5">
                <span class="font-semibold">Currency</span>
              </div>

              <select
                v-model="grnData.currency"
                class="
                  py-1
                  px-2
                  rounded
                  border border-2 border-solid border-gray-400
                  w-full
                "
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

          <div class="col-4 w-1/3">
            <label for="">
              <div class="mb-5">
                <span class="font-semibold">Reason</span>
              </div>

              <textarea
                v-model="grnData.reasonForGrn"
                rows="4"
                cols="30"
                class="
                  py-2
                  px-2
                  rounded
                  border border-solid border-2 border-gray-400
                  w-full
                "
                placeholder="Enter Reason"
              ></textarea>
            </label>
          </div>
        </div>

        <div class="row flex w-full mb-10">
          <div class="col-4 w-1/3 mr-8">
            <label for="">
              <div class="mb-5">
                <span class="font-semibold">Description</span>
              </div>

              <textarea
                v-model="grnData.description"
                rows="4"
                cols="30"
                class="
                  py-2
                  px-2
                  rounded
                  border border-solid border-2 border-gray-400
                  w-full
                "
                placeholder="Enter Description"
              ></textarea>
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
                <th
                  class="
                    py-4
                    px-6
                    tracking-wider
                    whitespace-nowrap
                    text-dark-optima-color
                  "
                >
                  Quantity Invoiced
                </th>
                <th
                  class="
                    py-4
                    px-6
                    tracking-wider
                    whitespace-nowrap
                    text-dark-optima-color
                  "
                >
                  Quantity Received
                </th>
                <th
                  class="
                    py-4
                    px-6
                    tracking-wider
                    whitespace-nowrap
                    text-dark-optima-color
                  "
                >
                  Quantity Outstanding
                </th>
                <th
                  class="
                    py-4
                    px-6
                    tracking-wider
                    whitespace-nowrap
                    text-dark-optima-color
                  "
                >
                  Purchase Price
                </th>
                <th
                  class="
                    py-4
                    px-6
                    tracking-wider
                    whitespace-nowrap
                    text-dark-optima-color
                  "
                >
                  GRN Amount
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
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
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    v-model="boq.variantName"
                    disabled
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <input
                    type="text"
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    v-model="boq.supplierVariantSku"
                    disabled
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <input
                    type="text"
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
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
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <input
                    type="text"
                    @keyup="grnCal(boq)"
                    v-model="boq.quantityReceived"
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <input
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    v-model="boq.quantityOutstanding"
                    readonly
                    type="text"
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <input
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
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
                    class="
                      py-2
                      px-2
                      rounded
                      border border-2 border-solid border-gray-300
                      w-full
                    "
                    readonly
                    v-model="boq.amount"
                    name=""
                    id=""
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <feather-icon
                    icon="TrashIcon"
                    @click="deleteBoqs(index)"
                    class="
                      p-2
                      h-8
                      w-8
                      text-cloudenly-danger-main
                      cursor-pointer
                      text-red
                      inline-flex
                    "
                  ></feather-icon>
                </td>
              </tr>
            </tbody>
          </table>

          <AddItemPurchase v-on:addItem="addItem" />

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
                @click="routeBack"
                class="
                  px-5
                  inline-flex
                  items-center
                  rounded-full
                  py-4
                  bg-gray-200
                  text-primary-optima-color
                "
              >
                cancel
              </button>

              <div>
                <button
                  :disabled="updateButton"
                  :class="{
                    'cursor-not-allowed': updateButton,
                    'bg-cloudenly-primary-mid': updateButton,
                  }"
                  @click.prevent="updateGoodsReceivedNote"
                  class="
                    px-5
                    mr-10
                    inline-flex
                    items-center
                    rounded-full
                    py-4
                    bg-cloudenly-primary-main
                    text-white
                  "
                >
                  Update
                </button>

                <!-- <button
                  @click="processModal = true"
                  class="
                    px-5
                    rounded-full
                    py-4
                    bg-primary-optima-color
                    text-white
                  "
                >
                  Save & Process
                </button> -->
              </div>
            </div>
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
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import AddItemPurchase from "../../../components/AddItemWidget/catalogue";
import currencyList from "../../../../utils/currency"; 

export default {
  components: {
    Datepicker,
    AddItemPurchase,
  },
  data() {
    return {
      supplier: "",
      currencyList: currencyList,
      updateButton: false,
      processButton: false,
      processModal: false,
      grnData: {
        grnNumber: "",
        originObject: "goodReceivedNote",
        originId: null,
        supplier: "",
        description: "",
        currency: "",
        receiptNumber: "",
        goodsOrderedBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
        reasonForGrn: "",
        totalQuantityInvoiced: "",
        totalQuantityReceived: "",
        totalQuantityOutstanding: "",
        totalAmount: "",
        goodsReceivedNoteBoqs: [],
      },
    };
  },

  methods: {
    routeBack() {
      this.$router.push({
        name: "GoodReceiveNote",
      });
    },
    returnCategory(val) {
      var category = val ? val.name : "";
      // console.log(category);
      return category;
    },

    addItem(val) {
      this.grnData.goodsReceivedNoteBoqs.push({
        customerVariantSku: val.variantSku,
        customerVariantId: val.id,
        supplierVariantSku: val.variantSku,
        supplierVariantId: val.id,
        category: this.returnCategory(val.item.category),
        variantName: val.variantName,
        variantCode: val.variantCode,
        description: val.item.description,
        unitOfSale: val.retailPriceBooks[0].unitOfSale,
        quantityInvoiced: 0,
        quantityReceived: 0,
        quantityOutstanding: 0,
        purchasePrice: 0,
        amount: 0,
      });
    },

    deleteBoqs(val) {
      this.grnData.goodsReceivedNoteBoqs.splice(val, 1);
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

    updateGoodsReceivedNote() {
      this.updateButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      this.grnData.supplier = {
        contactId: this.supplier.contactId,
        supplierOrgId: this.supplier.supplierOrgId,
        name: this.supplier.name,
        address: this.supplier.address,
        email: this.supplier.email,
        contactName: this.supplier.contactName,
        phoneNumber: this.supplier.phoneNumber,
      };

      let data = {
        userInfo: userInfo,
        payload: this.grnData,
      };

      this.$store
        .dispatch("inventory/grn/updateGrn", data)
        .then((resp) => {
          this.updateButton = false;
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
          this.updateButton = false;
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
      this.grnData.supplier = {
        contactId: this.supplier.contactId,
        supplierOrgId: this.supplier.supplierOrgId,
        name: this.supplier.name,
        address: this.supplier.address,
        email: this.supplier.email,
        contactName: this.supplier.contactName,
        phoneNumber: this.supplier.phoneNumber,
      };

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
  },

  watch: {
    "grnData.goodsReceivedNoteBoqs": function () {
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
    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("inventory/grn", ["getIsGrnCodeSetup"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getGoodReceiveNotePrivileges",
    ]),
  },

  mounted() {
    let id = this.$route.params.id;
    this.$store
      .dispatch("inventory/grn/getSingleGrn", id)
      .then((resp) => {
        console.log(resp.data);
        this.grnData = resp.data.goodsReceivedNote;
        this.supplier = resp.data.goodsReceivedNote.supplier;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store.dispatch("crm/contact/getAllSupplierContact");
  },
};
</script>

<style>
</style>
