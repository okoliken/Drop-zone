/* eslint-disable no-case-declarations */
<template>
  <div class="mb-12">
    <div class="px-3 py-8 bg-white ">
      <div class="row mb-5">
        <div class="col-8">
          <div class>
            <div class="form-group row no-gutters mb-0 pb-0">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
              >Select Supplier</label>
            </div>

            <div class="w-2/3">
              <v-select disabled
                v-model="purchaseOrderData.supplier"
                label="name"
                :options="getSupplierContact"
              ></v-select>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <div class="md:w-full">
              <label class="block mb-1 md:mb-0 font-bold text-sm" for="inline-full-name">PO Title</label>
            </div>
            <div class="md:w-full">
              <input readonly
                placeholder="Enter PO title"
                v-model="purchaseOrderData.title"
                type="text"
                class="form-control w-full"
                name
                id
              />
            </div>
          </div>
        </div>

        <!-- <div class="col-2 ">
          <div class="">
            <div class="md:w-full">
              <label class="block  mb-1 md:mb-0  font-bold text-sm " for="inline-full-name">PO Number</label>
            </div>
            <div class=" md:w-full">
              <input placeholder="Enter PO No" v-model="purchaseOrderData.purchaseOrderNumber" type="text"
                class="form-control w-full" name="" id="">
            </div>
          </div>
        </div>-->
      </div>

      <div class="row mb-5">
        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
            >Shipping Address</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea disabled
                v-model="purchaseOrderData.shippingAddress"
                rows="4"
                cols="30"
                class="form-control"
                placeholder="Enter Shipping Address"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
            >
              PO
              Description
            </label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea disabled
                v-model="purchaseOrderData.description"
                rows="4"
                cols="30"
                class="form-control"
                placeholder="Enter PO Description"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="mb-5">
            <label class="block md:text-left mb-1 md:mb-0 text-sm font-bold" for="inline-full-name">
              Expected Delivery
              Date
            </label>
            <div class>
              <datepicker disabled
                v-model="purchaseOrderData.expectedDeliveryDate"
                input-class="w-full py-2"
                placeholder="Select Date"
              ></datepicker>
            </div>
          </div>

          <div class>
            <label class="block md:text-left mb- md:mb-0 text-sm font-bold" for="inline-full-name">
              Shipping
              Method
            </label>
            <div class="w-full">
              <select disabled v-model="purchaseOrderData.shippingMethod" class="form-control">
                <option value="Air Freight">Air Freight</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Inland Transport">Inland Transport</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="mb-8">
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
            >Shipping Condition</label>
            <div class>
              <select disabled
                v-model="purchaseOrderData.shippingCondition"
                class="form-control w-full"
                placeholder="Select Category"
              >
                <option
                  value=" EXW – Ex Works (named place of delivery)"
                >EXW – Ex Works (named place of delivery)</option>
                <option
                  value="FCA – Free Carrier (named place of delivery)"
                >FCA – Free Carrier (named place of delivery)</option>
                <option
                  value=" CPT – Carriage Paid To (named place of destination)"
                >CPT – Carriage Paid To (named place of destination)</option>
                <option
                  value="CIP – Carriage and Insurance Paid to (named place of destination)"
                >CIP – Carriage and Insurance Paid to (named place of destination)</option>
                <option
                  value=" DAT – Delivered At Terminal (named terminal at port or place of destination)"
                >DAT – Delivered At Terminal (named terminal at port or place of destination)</option>
                <option
                  value="DAP – Delivered At Place (named place of destination)"
                >DAP – Delivered At Place (named place of destination)</option>
                <option
                  value="DDP – Delivered Duty Paid (named place of destination)"
                >DDP – Delivered Duty Paid (named place of destination)</option>
                <option
                  value="FAS – Free Alongside Ship (named port of shipment)"
                >FAS – Free Alongside Ship (named port of shipment)</option>
                <option
                  value="FOB – Free on Board (named port of shipment)"
                >FOB – Free on Board (named port of shipment)</option>
                <option
                  value=" CFR – Cost and Freight (named port of destination)"
                >CFR – Cost and Freight (named port of destination)</option>
                <option
                  value="CIF – Cost, Insurance & Freight (named port of destination)"
                >CIF – Cost, Insurance & Freight (named port of destination)</option>
              </select>
            </div>
          </div>

          <div class>
            <div class="md:w-full">
              <label class="block mb-1 md:mb-0 font-bold text-sm" for="inline-full-name">PO Currency</label>
            </div>
            <div class="md:w-full">
              <select disabled class="form-control" v-model="purchaseOrderData.currency">
                <option value="Naira">Naira</option>
                <option value="Dollar">Dollar</option>
                <option value="Pound">Pound</option>
                <option
                  v-for="(currency, index) in currencyList"
                  :key="index"
                  :value="currency"
                >{{currency}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
            >
              Payment
              Terms
            </label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea disabled
                v-model="purchaseOrderData.paymentTerms"
                rows="2"
                cols="30"
                class="form-control"
                placeholder="Enter Payment Terms"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <label class="block md:text-left mb-1 md:mb-0 text-sm font-bold" for="inline-full-name">
              Delivery
              Address
            </label>
            <div class>
              <textarea disabled
                v-model="purchaseOrderData.deliveryAddress"
                rows="2"
                cols="30"
                class="form-control"
                placeholder="Enter Delivery Address"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
            >Other Terms</label>
            <div class>
              <textarea disabled
                v-model="purchaseOrderData.otherTerms"
                rows="2"
                cols="30"
                class="form-control"
                placeholder="Enter Terms"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="  bg-white">
      <div class="p-3 pl-5 ">
        <div class="flex items-center">
          <p class="text-cloudenly-primary-main mr-3">Unit Price</p>
          <vs-radio disabled
            @click="toggleTaxPolicyType"
            class="mr-3"
            v-model="taxType"
            vs-value="taxExclusive"
          >Tax Exclusive</vs-radio>
          <vs-radio disabled
            @click="toggleTaxPolicyType"
            class="mr-3"
            v-model="taxType"
            vs-value="taxInclusive"
          >Tax Inclusive</vs-radio>
          <vs-radio disabled @click="toggleTaxPolicyType" v-model="taxType" vs-value="taxExempt">Tax Exempt</vs-radio>
        </div>
      </div>
      <table class="table w-full table-auto table-responsive">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3">ITEM NAME</th>
            <th class="py-3">DESCRIPTION</th>
            <th class="py-3">UofM</th>
            <th class="py-3">UNIT PRICE</th>
            <th class="py-3">QUANTITY</th>
            <th class="py-3">LINE TOTAL</th>
            <th class="py-3">TOTAL TAX</th>
            <th class="py-3" style="width: 1%">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in purchaseOrderData.purchaseOrderBoqs" :key="index">
            <td class style="width: 20%">
              <input type="text" class="form-control" readonly v-model="order.name" name id />
            </td>

            <td>
              <input type="text" class="form-control" readonly v-model="order.description" name id />
            </td>
            <td>
              <input type="text" readonly v-model="order.unitOfSale" class="form-control" name id />
            </td>
            <td>
              <input
                readonly
                @keyup="calLineTotal(order, index)"
                type="text"
                v-model="order.unitPrice"
                class="form-control"
                name
                id
              />
            </td>
            <td>
              <input
               readonly
                @keyup="calLineTotal(order, index)"
                v-model="order.quantity"
                class="form-control"
              />
            </td>

            <td>
              <input
                disabled
                class="form-control"
                readonly
                v-model="order.lineTotal"
                type="text"
                name
                id
              />
            </td>

            <td>
              <input
                class="disabled form-control"
                readonly
                v-model="order.totalLineTaxAmount"
                type="text"
                name
                id
              />
            </td>

            <td class="text-center">
              <feather-icon
                icon="TrashIcon"
                @click="deleteItem(index)"
                class="p-2 cursor-pointer text-cloudenly-danger-main h-10 w-10 inline-flex"
              ></feather-icon>
            </td>
          </tr>
        </tbody>
      </table>
      <div class>
        <Catalogue v-on:addItem="addItem" />
      </div>
    </section>

    <div class=" bg-white">
      <div class="row px-2">
        <div class="col-7">
          <!-- Note Section -->
          <div class="bg-grey-lighter w-full mt-3">
            <vs-textarea disabled v-model="purchaseOrderData.comment" placeholder="Terms and Conditions"></vs-textarea>
          </div>
        </div>

        <div class="col-5">
          <div class="flex justify-end pl-4">
            <table class="table table-responsive w-full">
              <tbody class>
                <tr class="pb-5">
                  <td class="text-center">
                    <p class="pt-3 font-semibold text-left">Sub Total</p>
                  </td>

                  <td></td>
                  <td class="text-center pt-4 font-semibold">{{ calSubTotal | currency}}</td>
                </tr>

                <tr class="pb-5">
                  <td class="text-center">
                    <p class="pt-3 font-semibold text-left">Delivery Charges</p>
                  </td>

                  <td>
                    <input
                    readonly
                      @keyup="calculateTaxDeliveryCharges"
                      v-model="purchaseOrderData.deliveryCharges"
                      type="text"
                      class="form-control"
                    />
                  </td>

                  <td
                    class="text-center pt-4 font-semibold"
                  >{{purchaseOrderData.deliveryCharges | currency}}</td>
                </tr>

                <tr class="pb-5">
                  <td class="text-center">
                    <p class="pt-3 font-semibold text-left">Tax</p>
                  </td>

                  <td>
                    <!-- <input type="text" class=" form-control "> -->
                  </td>

                  <td
                    class="text-center pt-4 font-semibold"
                    style="width: 40%"
                  >{{calTotalTax | currency}}</td>
                </tr>

                <tr class="pb-5">
                  <td class="text-center">
                    <p class="pt-3 font-semibold text-left">Order Total</p>
                  </td>
                  <td></td>
                  <td
                    class="text-center pt-4 font-semibold"
                    style="width: 40%"
                  >{{calTotalOrder | currency}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class=" flex justify-end mb-10 mt-5">
      <button
        @click="cancelPo"
        class="inline-flex items-center text-xl  py-2 px-5 mr-3 cursor-pointer  border border-solid rounded "
      >
        Cancel
      </button>

      <button
        @click="editPo"
        class="inline-flex text-xl items-center py-2 px-10  cursor-pointer bg-cloudenly-primary-main text-white border border-solid rounded"
      >
       Edit
      </button>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import Catalogue from "../../../components/AddItemWidget/catalogue";
import Datepicker from "vuejs-datepicker";
import currencyList from "../../../../utils/currency";

export default {
  components: {
    Catalogue,
    Datepicker
  },

  data() {
    return {
      search: "",
      updateButton: false,
      currencyList: currencyList,
      singleSupplier: "",
      suppliers: [],
      taxType: "taxExclusive",
      purchaseOrderData: {
        orderNumber: "",
        title: "",
        description: "",
        supplier: "",
        currency: "",
        expectedDeliveryDate: "",
        shippingMethod: "",
        shippingCondition: "",
        shippingAddress: "",
        paymentTerms: "",
        otherTerms: "",
        unitPrice: "",
        subTotal: "",
        deliveryCharges: 0,
        deliveryTaxAmount: 0,
        tax: 0,
        totalTaxPolicyRate: 0,
        taxType: "taxExclusive",
        total: 0,
        comment: "",
        purchaseOrderBoqs: []
      }
    };
  },

  methods: {
    deleteItem(val) {
      this.purchaseOrderData.purchaseOrderBoqs.splice(val, 1);
    },

    cancelPo() {
      this.$router.push({ name: "PurchaseOrder" });
    },
    editPo() {
      this.$router.push({
        name: "EditPurchaseOrder",
        params: { id: this.purchaseOrderData.id }
      });
    },

    addItem(val) {
      //  console.log(val)
      this.purchaseOrderData.purchaseOrderBoqs.push({
        itemClass: val.type,
        partNumber: val.partNumber,
        customerVariantId: null,
        supplierVariantId: null,
        name: val.variantName,
        description: val.item.description,
        quantity: 0,
        unitOfSale: val.retailPriceBook.unitOfSaleUnit,
        unitPrice: 0,
        lineTotal: 0,
        unitPriceTaxInclusive: 0,
        unitPriceTaxExclusive: 0,
        lineTotalTaxExclusive: 0,
        lineTotalTaxInclusive: 0,
        totalLineTaxAmount: 0
      });
    },

    calLineTotal(val) {
      let taxPolicy = this.taxType;
      let lineQuantity = parseInt(val.quantity);
      let unitLinePrice = parseInt(val.unitPrice);
      // let lineDiscount = parseInt(val.discountRate);

      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          console.log(typeof this.purchaseOrderData.totalTaxPolicyRate);
          val.lineTotal = parseInt(lineQuantity) * parseInt(unitLinePrice);
          val.totalLineTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate * val.lineTotal) / 100;
          break;
        case "taxInclusive":
          val.lineTotal = parseInt(lineQuantity) * parseInt(unitLinePrice);
          val.totalLineTaxAmount =
            (parseInt(this.purchaseOrderData.totalTaxPolicyRate) *
              val.lineTotal) /
            100;

          break;

        case "taxExempt":
          val.lineTotal = parseInt(lineQuantity) * parseInt(unitLinePrice);
          val.totalLineTaxAmount = 0;
          break;

        default:
          break;
      }
    },

    calculateTaxDeliveryCharges() {
      let taxPolicy = this.taxType;
      let deliveryCharge = parseInt(this.purchaseOrderData.deliveryCharges);
      switch (taxPolicy) {
        case "taxExclusive":
          console.log(this.purchaseOrderData.totalTaxPolicyRate);
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate * deliveryCharge) / 100;
          break;

        case "taxInclusive":
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate * deliveryCharge) / 100;
          break;

        case "taxExempt":
          this.purchaseOrderData.deliveryTaxAmount = 0;

          break;
        default:
          break;
      }
    },

    toggleTaxPolicyType() {
      let taxPolicy = this.taxType;
      switch (taxPolicy) {
        case "taxExclusive":
          this.purchaseOrderData.purchaseOrderBoqs.map(resp => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal: parseInt(resp.quantity) * parseInt(resp.unitPrice),
              totalLineTaxAmount:
                (parseInt(this.purchaseOrderData.totalTaxPolicyRate) *
                  parseInt(resp.quantity) *
                  parseInt(resp.unitPrice)) /
                100
            };
          });
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate *
              parseInt(this.purchaseOrderData.deliveryCharges)) /
            100;

          break;
        case "taxInclusive":
          this.purchaseOrderData.purchaseOrderBoqs.map(resp => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal: parseInt(resp.quantity) * parseInt(resp.unitPrice),
              totalLineTaxAmount:
                (parseInt(this.purchaseOrderData.totalTaxPolicyRate) *
                  parseInt(resp.quantity) *
                  parseInt(resp.unitPrice)) /
                100
            };
          });
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate *
              parseInt(this.purchaseOrderData.deliveryCharges)) /
            100;

          break;

        case "taxExempt":
          this.purchaseOrderData.purchaseOrderBoqs.map(resp => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal: parseInt(resp.quantity) * parseInt(resp.unitPrice),
              totalLineTaxAmount: 0
            };
          });
          this.purchaseOrderData.deliveryTaxAmount = 0;

          break;
        default:
          break;
      }
    },

    updatePurchaseOrder() {
      this.updateButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      delete this.purchaseOrderData.orgInfo;
      this.purchaseOrderData.supplier = {
        contactId: this.purchaseOrderData.supplier.id,
        supplierOrgId: this.purchaseOrderData.supplier.contactOrgId,
        name: this.purchaseOrderData.supplier.name,
        address: this.purchaseOrderData.supplier.address,
        contactName: this.purchaseOrderData.supplier.contactPerson,
        phoneNumber: this.purchaseOrderData.supplier.phone,
        email: this.purchaseOrderData.supplier.email
      };
      let data = {
        userInfo: userInfo,
        payload: {
          ...this.purchaseOrderData
        }
      };
      this.$store
        .dispatch("purchase/PurchaseOrder/updatePurchaseOrder", data)
        .then(resp => {
          this.updateButton = false;
          this.$router.push({ name: "PurchaseOrder" });

          this.$vs.notify({
            title: "Purchase Order ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          // console.log(err)
          this.updateButton = false;

          this.$vs.notify({
            title: "Purchase Order ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    processPurchaseOrder() {
      let userInfo = this.$store.state.auth.auth.authData;
      this.purchaseOrderData.supplier = {
        contactId: this.purchaseOrderData.supplier.id,
        supplierOrgId: this.purchaseOrderData.supplier.contactOrgId,
        name: this.purchaseOrderData.supplier.name,
        address: this.purchaseOrderData.supplier.address,
        contactName: this.purchaseOrderData.supplier.contactPerson,
        phoneNumber: this.purchaseOrderData.supplier.phone,
        email: this.purchaseOrderData.supplier.email
      };
      let data = {
        userInfo: userInfo,
        payload: {
          ...this.purchaseOrderData
        }
      };

      this.$store
        .dispatch("purchase/purchaseOrder/cratePurchaseOrder", data)
        .then(resp => {
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                purchaseOrderId: resp.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: ""
                }
              }
            };
            this.$store
              .dispatch("purchase/purchaseOrder/sendPurchaseOrder", data2)
              .then(resp => {
                console.log();
                this.$vs.notify({
                  title: "Purchase Order",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right"
                });
              });
          }
        })
        .catch(err => {
          this.$vs.notify({
            title: "Purchase Order ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  },

  computed: {
    filterSupplier() {
      return this.suppliers.filter(supplier => {
        return supplier.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    ...mapGetters("crm/contact", ["getSupplierContact"]),

    // eslint-disable-next-line vue/return-in-computed-property
    calSubTotal() {
      let total = 0;
      for (
        var i = 0;
        i < this.purchaseOrderData.purchaseOrderBoqs.length;
        i++
      ) {
        total =
          total +
          parseInt(this.purchaseOrderData.purchaseOrderBoqs[i].lineTotal);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.purchaseOrderData.subTotal = total);
    },

    calTotalTax() {
      let total = 0;
      for (
        var i = 0;
        i < this.purchaseOrderData.purchaseOrderBoqs.length;
        i++
      ) {
        total =
          total +
          parseInt(
            this.purchaseOrderData.purchaseOrderBoqs[i].totalLineTaxAmount
          );
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.purchaseOrderData.tax =
        parseInt(total) + parseInt(this.purchaseOrderData.deliveryTaxAmount));
    },

    calTotalOrder() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.purchaseOrderData.total =
        parseInt(this.purchaseOrderData.subTotal) +
        parseInt(this.purchaseOrderData.deliveryCharges) +
        parseInt(this.purchaseOrderData.tax);
      return this.purchaseOrderData.total;
    }
  },

  watch: {},

  mounted() {
    let id = this.$route.params.id;
    console.log(id);
    this.$store
      .dispatch("purchase/PurchaseOrder/getSinglePurchaseOrder", id)
      .then(resp => {
        this.purchaseOrderData = resp.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("catalogue/tax/getOutletVat")
      .then(resp => {
        this.allVat = resp.data.taxes;
        let total = 0;
        for (let i = 0; i < this.allVat.length; i++) {
          total = total + Number(this.allVat[i].amount);
        }
        this.purchaseOrderData.totalTaxPolicyRate = total;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store.dispatch("crm/contact/getAllSupplierContact");
  }
};
</script>



<style scoped>
</style>
