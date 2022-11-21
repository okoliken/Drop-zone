<template>
  <div class>
    <div class="py-8 px-5 bg-white shadow rounded">
      <div class="row mb-8">
        <div class="col-md-8">
          <div>
            <div class="form-group row no-gutters mb-2">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
              >
                Select Supplier
              </label>
            </div>

            <div class="w-full">
              <div class="flex items-center">
                <div class="mr-3 w-2/3">
                  <input
                    v-model="grnData.supplier.name"
                    class="py-3 px-2 border border-solid border-grey-light w-full rounded"
                    type="text"
                    name
                    id
                  />
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class>
            <div class="md:w-full mb-2">
              <label
                class="block mb-2 md:mb-0 font-bold text-sm"
                for="inline-full-name"
                >GRN Number</label
              >
            </div>
            <div class="md:w-full">
              <input
                placeholder="Enter GRN No"
                v-model="grnData.grnNumber"
                type="text"
                class="py-2 px-2 border border-solid border-grey rounded w-full"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class>
            <div class="md:w-full mb-2">
              <label
                class="block mb-1 md:mb-0 font-bold text-sm"
                for="inline-full-name"
                >Receipt No</label
              >
            </div>
            <div class="md:w-full">
              <input
                placeholder="Enter Receipt No"
                v-model="grnData.receiptNumber"
                type="text"
                class="py-2 px-2 border border-solid border-grey rounded w-full"
                name
                id
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group row no-gutters mb-2">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
              >Reason for GRN</label
            >
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea
                v-model="grnData.reasonForGrn"
                rows="4"
                cols="30"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                placeholder="Enter Reason"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group row no-gutters mb-2">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
              >Description</label
            >
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea
                v-model="grnData.description"
                rows="4"
                cols="30"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class>
            <label
              class="block md:text-left mb-2 text-sm font-bold"
              for="inline-full-name"
              >Date</label
            >
            <div class>
              <datepicker
                v-model="grnData.date"
                input-class="w-full py-2"
                placeholder="Select Date"
              ></datepicker>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="mb-3">
            <label
              class="block md:text-left mb-2 text-sm font-bold"
              for="inline-full-name"
              >Currency</label
            >
            <div class>
              <select
                v-model="grnData.currency"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
              >
                <option
                  v-for="(currency, index) in currencyList"
                  :key="index"
                  :value="currency"
                >
                  {{ currency }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shadow bg-white rounded">
      <table class="table w-full table-auto">
        <thead class="bg-grey-light">
          <tr>
            <th class="py-3">Item Name</th>
            <th class="py-3">SKU</th>
            <th class="py-3">Unit</th>
            <th class="py-3">Quantity Invoiced</th>
            <th class="py-3">Quantity Received</th>
            <th class="py-3">Quantity Outstanding</th>
            <th class="py-3">Purchase Price</th>
            <th class="py-3">GRN Amount</th>
            <th class="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(boq, index) in grnData.goodsReceivedNoteBoqs"
            :key="index"
          >
            <td class="py-2" style="width: 20%">
              <input
                type="text"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                v-model="boq.variantName"
                name
                id
              />
            </td>
            <td class="py-2">
              <input
                type="text"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                v-model="boq.customerVariantSku"
                name
                id
              />
            </td>
            <td class="py-2">
              <input
                type="text"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                v-model="boq.unitOfSale"
                name
                id
              />
            </td>
            <td class="py-2">
              <input
                type="text"
                @keyup="grnCal(boq)"
                v-model="boq.quantityInvoiced"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                name
                id
              />
            </td>
            <td class="py-2">
              <input
                type="text"
                @keyup="grnCal(boq)"
                v-model="boq.quantityReceived"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                name
                id
              />
            </td>
            <td>
              <input
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                v-model="boq.quantityOutstanding"
                readonly
                type="text"
                name
                id
              />
            </td>
            <td>
              <input
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                @keyup="grnCal(boq)"
                v-model="boq.purchasePrice"
                type="text"
                name
                id
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                readonly
                v-model="boq.amount"
                name
                id
              />
            </td>
            <td class="text-center">
              <feather-icon
                icon="TrashIcon"
                @click="deleteBoqs(index)"
                class="p-2 h-8 w-8 text-cloudenly-danger-main cursor-pointer text-red inline-flex"
              ></feather-icon>
            </td>
          </tr>

          <tr class="border border-solid border-grey-light">
            <td class="pt-5" style="width: 20%">
              <h4 class="text-center font-bold">Total</h4>
            </td>
            <td class="pt-5 text-center"></td>
            <td class="pt-5 text-center"></td>
            <td class="pt-5 text-center">
              {{ grnData.totalQuantityInvoiced }}
            </td>
            <td class="pt-5 text-center">
              {{ grnData.totalQuantityReceived }}
            </td>
            <td class="pt-5 text-center">
              {{ grnData.totalQuantityOutstanding }}
            </td>
            <td class="pt-5 text-center"></td>
            <td class="pt-5 text-center">
              {{ grnData.totalAmount | currency }}
            </td>
            <td class="pt-5 text-center"></td>
          </tr>
        </tbody>
      </table>

      <div class="float-right mt-3">
        <button
          :disabled="saveButton"
          :class="{
            'cursor-not-allowed': saveButton,
            'bg-cloudenly-primary-mid': saveButton,
          }"
          @click.prevent="saveGrn"
          class="py-3 px-5 mr-3 cursor-pointer bg-cloudenly-primary-main text-white text-xl border border-solid rounded-lg"
        >
          Save as Draft
        </button>

        <button
          class="py-3 px-5 mr-3 cursor-pointer bg-cloudenly-primary-main text-white text-xl border border-solid rounded-lg"
        >
          Process
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
import currencyList from "../../../../utils/currency";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      saveButton: false,
      processButton: false,
      currencyList: currencyList,

      singleSupplier: "",
      suppliers: [],
      grnData: {
        grnNumber: "",
        supplier: {
          contactId: "",
          supplierOrgId: "",
          name: "",
          address: "",
          contactName: "",
          phoneNumber: "",
        },
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
      },
    };
  },
  methods: {
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
      //   this.grnData.supplier = {
      //   contactId: this.supplier.contactId,
      //   supplierOrgId: this.supplier.supplierOrgId,
      //   name: this.supplier.name,
      //   address: this.supplier.address,
      //   email: this.supplier.email,
      //   contactName: this.supplier.contactName,
      //   phoneNumber:  this.supplier.phoneNumber
      // }

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
  },

  computed: {
    filterSupplier() {
      return this.suppliers.filter((supplier) => {
        return supplier.name.toLowerCase().includes(this.search.toLowerCase());
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

  mounted() {
    let id = this.$route.params.id;
    this.$store
      .dispatch("purchase/PurchaseOrder/getSinglePurchaseOrder", id)
      .then((resp) => {
        console.log(resp.data);
        this.grnData.supplier = {
          contactId: resp.data.supplier.contactId,
          supplierOrgId: resp.data.supplier.supplierOrgId,
          name: resp.data.supplier.name,
          address: resp.data.supplier.address,
          contactName: resp.data.supplier.contactName,
          phoneNumber: resp.data.supplier.phoneNumber,
        };
        this.grnData.currency = resp.data.currency;
        this.grnData.goodsReceivedNoteBoqs = resp.data.purchaseOrderBoqs.map(
          (resp) => {
            return {
              customerVariantSku: resp.name,
              customerVariantId: resp.customerVariantId,
              supplierVariantSku: resp.supplierVariantSku,
              supplierVariantId: resp.supplierVariantId,
              category: resp.category,
              variantName: resp.name,
              variantCode: resp.variantCode,
              description: resp.description,
              unitOfSale: resp.unitOfSale,
              quantityInvoiced: resp.quantity,
              quantityReceived: 0,
              quantityOutstanding: 0,
              purchasePrice: 0,
              amount: 0,
            };
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>
