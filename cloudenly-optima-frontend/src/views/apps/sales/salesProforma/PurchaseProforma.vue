
<template >
  <div class="container">
    <div class="ks-page-header">
      <section class="ks-title">
        <h3>Proforma</h3>
      </section>
    </div>

    <!-- End Modal -->

    <!-- Pricebook Modal -->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">
              Add Item to Invoice
            </h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <div class="col-5">
                <input
                  type="text"
                  v-model="search"
                  class="form-control"
                  placeholder="Search for product or service"
                />
              </div>
            </div>
            <table class="table">
              <thead class="thead-default">
                <tr>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th>Item Description</th>
                  <th>Unit Of Measure</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(pricebook, index) in filterInventory.slice(0, 5)"
                  :key="index"
                >
                  <td>{{ pricebook.variantInfo.variantName }}</td>
                  <td>{{ pricebook.variantInfo.variantSku }}</td>
                  <td>{{ pricebook.description }}</td>
                  <td>{{ pricebook.unit }}</td>
                  <td>
                    <button
                      @click="addProforma(pricebook, index)"
                      class="btn btn-sm btn-crusta"
                      type="button"
                    >
                      Add item
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="addBoq"
              class="btn btn-sm btn-success"
              data-dismiss="modal"
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Pricebook -->

    <!-- save New Customer Modal -->
    <div
      class="modal fade"
      id="myCustomer"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Add New Customer</h1>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row no-gutters">
              <label for="example-text-input" class="col-4 col-form-label">
                <h5>Customer Name:</h5>
              </label>
              <div class="col-8 no-gutters">
                <input type="text" class="form-control" name="" id="" />
              </div>
            </div>

            <div class="form-group row no-gutters">
              <label for="example-text-input" class="col-4 col-form-label">
                <h5>Customer Email:</h5>
              </label>
              <div class="col-8 no-gutters">
                <input type="text" class="form-control" name="" id="" />
              </div>
            </div>

            <div class="form-group row no-gutters">
              <label for="example-text-input" class="col-4 col-form-label">
                <h5>Customer Phone:</h5>
              </label>
              <div class="col-8 no-gutters">
                <input type="text" class="form-control" name="" id="" />
              </div>
            </div>

            <div class="form-group row no-gutters">
              <label for="example-text-input" class="col-4 col-form-label">
                <h5>Customer Address:</h5>
              </label>
              <div class="col-8 no-gutters">
                <input type="text" class="form-control" name="" id="" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal new Customer -->

    <div class="container" id="printJs">
      <br /><br /><br />
      <!-- save,email, print button -->
      <div class="btn-group float-right">
        <button @click="updateProforma" type="button" class="btn btn-success">
          <strong>Update & Continue</strong>
        </button>
        <button
          type="button"
          class="btn btn-success dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <button
            @click="printProfoma"
            type="btn btn-secondary "
            class="dropdown-item"
            href="#"
          >
            <strong>Print</strong>
          </button>
          <button
            @click="sendProformaEmail"
            type="btn btn-secondary "
            class="dropdown-item"
            href="#"
          >
            <strong>Save & Email</strong>
          </button>
        </div>
      </div>
      <!-- end Save button -->
      <section>
        <div class="card-header">Business Address and Contact Details</div>
      </section>
      <div class="panel">
        <br />
        <div class="row container">
          <div class="col-3">
            <vue-dropzone id="drop" :options="dropzoneOptions">
              <div class="dropzone-custom-content">
                <div class="subtitle">
                  <span> <i class="fa fa-3x fa-upload"></i> </span><br />
                  ...or click to Business Logo
                </div>
              </div>
            </vue-dropzone>
          </div>
          <div class="col-4"></div>
          <div class="col-5 text-right">
            <section class="ownerDetail">
              <div class="card card-outline-primary">
                <div class="card-block">
                  <h3 class="card-title">{{ businessData.name }}</h3>
                  <p class="card-text"></p>
                  <h5>{{ businessData.email }}</h5>
                  <p class="card-text"></p>
                  <h5>{{ businessData.phone }}</h5>
                </div>
              </div>
              <br />
              <div class="form-group row no-gutters">
                <div class="col-12">
                  <input
                    v-model="proformaInvoiceData.description"
                    placeholder=" Proforma Title"
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div class="container panel">
          <br />
          <div class="row">
            <div class="col-4">
              <div v-show="customerCard">
                <h4><strong>Bill To: </strong></h4>
                <br />
                <h5>
                  <span>Name</span>: <strong> {{ singleCustomer.name }}</strong>
                </h5>
                <br />
                <h5>
                  <span>Address</span>:
                  <strong>{{ singleCustomer.address }}</strong>
                </h5>
                <br />
                <h5>
                  <span>Email</span>:
                  <strong>{{ singleCustomer.email }}</strong>
                </h5>
                <br />
                <h5>
                  <span>Phone Number</span>:
                  <strong>{{ singleCustomer.phone }}</strong>
                </h5>
                <br />
                <button @click="showCustomer" class="btn-link">
                  choose a different customer
                </button>
              </div>

              <div v-show="custSearchTriggered">
                <Card style="width: 350px">
                  <input
                    type="search"
                    name=""
                    placeholder=" Search Customer"
                    v-model="search"
                    class="form-control"
                    id=""
                  />
                  <ul
                    class="list-group list-group-flush"
                    v-for="(customer, index) in filterCustomer.slice(0, 3)"
                    :key="index"
                  >
                    <li class="list-group-item">
                      <a
                        @click.prevent="addCustomer(customer, event)"
                        href="#"
                        >{{ customer.name }}</a
                      >
                    </li>
                  </ul>
                  <br />
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#myCustomer"
                  >
                    Add new Customer
                  </button>
                </Card>
              </div>
              <div v-show="showFirst">
                <Card style="width: 350px">
                  <div class="text-center">
                    <h6>
                      <span class="fa fa-5x fa-user"></span>
                    </h6>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="trigeredCustomer"
                    >
                      Add Customer
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            <div class="col-4">
              <div class="form-group row no-gutters">
                <label for="example-text-input" class="col-6 col-form-label"
                  ><strong> Proforma Validity Type </strong></label
                >
                <div class="col-6">
                  <select
                    class="form-control"
                    v-model="proformaInvoiceData.bidValidityType"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="Month">Months</option>
                  </select>
                </div>
              </div>

              <div class="form-group row no-gutters">
                <label for="example-text-input" class="col-6 col-form-label"
                  ><strong> Proforma Date</strong></label
                >
                <div class="col-6">
                  <DatePicker v-model="proformaInvoiceData.date"></DatePicker>
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="form-group row no-gutters">
                <label for="example-text-input" class="col-6 col-form-label"
                  ><strong> Proforma Currency </strong></label
                >
                <div class="col-6">
                  <select
                    class="form-control"
                    v-model="proformaInvoiceData.currency"
                  >
                    <option value="#">Naira</option>
                    <option value="$">Dollar</option>
                    <option value="$">Pound</option>
                  </select>
                </div>
              </div>

              <div class="form-group row no-gutters">
                <label for="example-text-input" class="col-6 col-form-label"
                  ><strong> Proforma Period </strong></label
                >
                <div class="col-6">
                  <input
                    type="text"
                    v-model="proformaInvoiceData.bidValidityDur"
                    class="form-control"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- End profroma  and Customer Details -->
      </div>

      <!-- proforma  and customer Details -->

      <!-- Pricebook Boqs -->
      <div id="container">
        <div class="card">
          <section class=" ">
            <br />
            <button
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              class="btn btn-sm btn-info fa fa-1x fa-plus float-right"
              type="button"
            >
              ADD ITEM
            </button>
            <table style="width: 100%" class="table">
              <thead class="boqHeader">
                <tr class="">
                  <!-- <th> #</th> -->
                  <th class="text-center">Item Name</th>
                  <!-- <th class=" text-center">Item Code</th> -->
                  <th class="text-center">Item Description</th>
                  <th class="text-center">Unit</th>
                  <th class="text-center">Unit Price</th>
                  <th class="text-center ks-solid">Quantity</th>
                  <th class="text-center">Line Discount(%)</th>
                  <th class="text-center">Line Total</th>
                  <th class="text-center">action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(boq, index) in proformaInvoiceData.boqs"
                  :key="index"
                >
                  <td style="width: 15%">
                    <input
                      v-model="boq.name"
                      type="text"
                      class="form-control"
                    />
                  </td>
                  <!-- <td style="width:15%">  <input v-model="boq.code" type="text" class=" form-control" >  </td> -->
                  <td style="width: 20%">
                    <textarea
                      name=""
                      v-model="boq.description"
                      id=""
                      cols="3"
                      rows="3"
                    ></textarea>
                  </td>
                  <td style="width: 10%">
                    <input
                      v-model="boq.unit"
                      type="text"
                      class="form-control"
                    />
                  </td>
                  <td style="width: 15%">
                    <input
                      v-model="boq.unitPrice"
                      type="text"
                      class="form-control"
                    />
                  </td>
                  <td style="width: 5%">
                    <input
                      v-model="boq.quantity"
                      type="text"
                      class="form-control"
                      @input="lineTotal(boq, index)"
                      @keyup="lineTotal(boq, index)"
                    />
                  </td>
                  <td style="width: 5%">
                    <input
                      v-model="boq.lineDiscount"
                      type="text"
                      class="form-control"
                      @input="lineTotal(boq, index)"
                      @keyup="lineTotal(boq, index)"
                    />
                  </td>
                  <td style="width: 15%">
                    <input
                      v-model="boq.lineTotal"
                      type="text"
                      class="form-control"
                      readonly
                    />
                  </td>
                  <td class="text-center">
                    <button
                      @click="deleteProfoma(boq, index)"
                      class="btn btn-xs btn-danger fa fa-trash"
                    ></button>
                    <!-- <Button class="btn btn-crusta" @click="deleteProfoma(boq, index) " type="error" shape="circle" icon="trash-b"></Button> -->
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="col-6 push-6 card">
              <table class="table table-hover table-bordered">
                <tbody class="">
                  <tr style="border: 0px">
                    <th style="width: 50%">
                      <h6><strong>Sub Total</strong></h6>
                    </th>
                    <th style="width: 20%"></th>
                    <th style="width: 30%">{{ subTotalCal }}</th>
                  </tr>

                  <tr>
                    <th style="width: 50%">
                      <h6><strong>Global Discount</strong></h6>
                    </th>
                    <th style="width: 20%">
                      <input
                        type="text"
                        class="form-control"
                        v-model="proformaInvoiceData.globalDiscountRate"
                        name=""
                        id=""
                      />
                    </th>
                    <th style="width: 30%">
                      {{ proformaInvoiceData.globalDiscount }}
                    </th>
                  </tr>
                  <tr>
                    <th style="width: 50%">
                      <h6><strong>Discounted Sub-Total</strong></h6>
                    </th>
                    <th style="width: 20%"></th>
                    <th style="width: 30%">
                      {{ proformaInvoiceData.discountedSubTotal }}
                    </th>
                  </tr>

                  <tr>
                    <th style="width: 50%">
                      <h6><strong>VAT</strong></h6>
                    </th>
                    <th style="width: 20%">
                      <input
                        type="text"
                        v-model="proformaInvoiceData.vatRate"
                        class="form-control"
                      />
                    </th>
                    <th style="width: 30%">
                      {{ proformaInvoiceData.vatAmount }}
                    </th>
                  </tr>

                  <tr>
                    <th style="width: 50%">
                      <h6><strong>Grand Total</strong></h6>
                    </th>
                    <th style="width: 20%"></th>
                    <th style="width: 30%">
                      {{ proformaInvoiceData.grandTotal }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <!-- <br><br> -->
      <!-- Footer-->
      <div class="card">
        <div class="card-header heading1">Invoice Footer</div>
        <div class="card-block">
          <textarea placeholder=" Enter Thanks you note " rows="3"></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- </div>
  </div> -->
</template>

<script>
import printJs from "print-js";
import Datepicker from "vuejs-datepicker";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    Datepicker,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        // thumbnailWidth: 120,
        addRemoveLinks: true,
      },

      businessData: "",
      showFirst: false,
      custSearchTriggered: false,
      loading: false,
      customerCard: true,
      cusButton: false,
      storeId: "",
      allStores: [],
      supplier: "",
      search: "",
      singleCustomer: "",
      allinventory: [],
      allCustomer: [],
      allBoqs: [],
      proformaInvoiceData: {
        status: "Unpaid",
        logo: "",
        owner: "",
        creator: "",
        business: "",
        identity: "",
        description: "",
        invoiceNo: "",
        customer: "",
        bidValidityType: "",
        bidValidityDur: 30,
        reference: "GSGSEYEYE",
        totalAmount: 500,
        salesChannel: "",
        currency: "",
        date: "",
        percentageInvoiced: 25,
        grandTotal: "25",
        subTotal: 25,
        globalDiscount: 25,
        discountedSubtotal: 25,
        vatRate: 5,
        globalDiscountRate: "",
        vatAmount: 250,
        recurringInvoice: true,
        // comment: "We upgrading to invoice 2.0",
        boqs: [],
      },
      searchValue: "",
    };
  },

  methods: {
    trigeredCustomer() {
      this.custSearchTriggered = true;
      this.showFirst = false;
    },

    showCustomer() {
      //  showCustomer = false
      this.showFirst = false;
      this.custSearchTriggered = true;
      this.customerCard = false;
    },
    addBoq() {
      this.proformaInvoiceData.boqs.push({
        // code: "",
        // name: "",
        // unitPrice: "",
        // description: "",
        // type: "",
        // quantity: "",
        // unit: "",
        // lineDiscount: "",
        // lineTotal: "",
        // discountLimit: "",
        // totalAmountBeforeDiscount: 0,
        // lineDiscountInPercentage: 0,
        // totalDiscountAmount: 0,
        // actualDiscount: "",
        // varianceFromDiscountLimit: "",
        // isNew:"true"

        customerCode: "",
        supplierCode: "",
        category: "",
        name: "",
        description: "",
        unit: "",
        type: "",
        quantity: "",
        unitPrice: "",
        lineDiscount: "",
        totalAmountBeforeDiscount: "",
        lineDiscountInPercentage: "",
        totalDiscountAmount: "",
        discountLimit: "",
        actualDiscount: "",
        varianceFromDiscountLimit: "",
        lineTotal: "",
        isNew: "true",
      });
    },
    addProforma(val, index) {
      this.proformaInvoiceData.boqs.push({
        // itemCode: val.itemCode,
        // type:"sales",
        // quantity: "",
        // unitOfMeasurement: val.unit,
        // unitPrice: "",
        // lineDiscount: "",
        // lineTotal: "",
        // discountLimit: val.discountLimit,
        // totalAmountBeforeDiscount: 0,
        // lineDiscountInPercentage: 0,
        // totalDiscountAmount: 0,
        // actualDiscount: '',
        // varianceFromDiscountLimit: '',
        customerCode: val.variantInfo.variantCode,
        supplierCode: val.variantInfo.variantSku,
        category: "",
        name: val.variantInfo.variantName,
        description: "",
        unit: "",
        type: val.variantInfo.group,
        quantity: "",
        unitPrice: val.variantInfo.retailPrice,
        lineDiscount: "",
        totalAmountBeforeDiscount: "",
        lineDiscountInPercentage: "",
        totalDiscountAmount: "",
        discountLimit: val.variantInfo.percentageDiscountLimit,
        actualDiscount: "",
        varianceFromDiscountLimit: "",
        lineTotal: "",
      });
      this.priceBooks.splice(index, 1);
    },

    sendProformaEmail() {
      // this.$axios
      //   .post(
      //     this.$apiCloudenly + "invoice-proforma/proforma",
      //     this.proformaInvoiceData,
      //     this.$simpleAuthHeader
      //   )
      //   .then((resp) => {
      //     if (resp.data) {
      //       const data = {
      //         title: this.proformaInvoiceData.description,
      //         business: this.proformaInvoiceData.business,
      //         total: this.proformaInvoiceData.grandTotal,
      //         invoiceId: resp.data.id,
      //         email: this.singleCustomer.email,
      //       };
      //       this.$axios
      //         .post(this.$apiCloudenly + "invoice-proforma/send")
      //         .then((resp) => {
      //           this.$swal(resp.data.message);
      //           this.$router.push({ name: "ProformaList" });
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //         });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    deleteProfoma(val, index) {
      this.priceBooks.push(val);
      this.proformaInvoiceData.boqs.splice(index, 1);
    },
    addCustomer() {
      this.cusButton = false;
      this.customerCard = true;
      this.proformaInvoiceData.customer = this.singleCustomer.identity;
      // $("#myModal").modal("hide");
    },
    createNetwork() {
      this.$router.push({ name: "CreateStoreNetwork" });
    },

    lineTotal(val, index) {
      console.log(index);
      const quantity = parseInt(val.quantity);
      const unitPrice = parseInt(val.unitPrice);
      const disc = parseInt(val.lineDiscount);
      const totalPrice = quantity * unitPrice;
      const discounted = (totalPrice * disc) / 100;
      val.lineTotal = totalPrice - discounted || 0;
      val.varianceFromDiscountLimit =
        parseInt(val.discountLimit) - parseInt(val.lineDiscount);
      val.actualDiscount = val.lineDiscount;
      val.lineDiscountInPercentage = val.lineDiscount;
      val.totalAmountBeforeDiscount = val.unitPrice;
      val.totalDiscountAmount =
        (parseInt(val.lineDiscount) * parseInt(val.lineTotal)) / 100;
    },

    printProfoma() {
      printJs("printJs", "html");
    },
    updateProforma() {
      this.proformaInvoiceData.customer = this.proformaInvoiceData.customer.hash;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "invoice-proforma/update/" +
            this.proformaInvoiceData.hash,
          this.proformaInvoiceData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp);
          this.$Notice.success({
            title: "Updated",
            desc: resp.data.message,
          });
          this.$router.push({ name: "ProformaList" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    emailProforma() {
      this.$axios
        .patch(
          this.$apiCloudenly +
            "invoice-proforma/update" +
            this.proformaInvoiceData.id,
          this.proformaInvoiceData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          if (resp.data) {
            const data = {
              title: this.proformaInvoiceData.description,
              business: this.proformaInvoiceData.business,
              total: this.proformaInvoiceData.grandTotal,
              invoiceId: this.proformaInvoiceData.id,
              email: this.proformaInvoiceData.customer.name,
            };
            this.$axios
              .post(
                `${this.$apiCloudenly}invoice-proforma/send`,
                data,
                this.$simpleAuthHeader
              )
              .then((resp) => {
                this.$swal(resp.data.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    "proformaInvoiceData.lineTotal": function () {
      console.log("we are here four you");
      var total = 0;
      for (var i = 0; i < this.proformaInvoiceData.boqs.length; i++) {
        total = total + this.proformaInvoiceData.boqs[i].lineTotal;
      }
      return (this.proformaInvoiceData.subTotal = total);
    },
  },

  computed: {
    filterCustomer() {
      return this.allCustomer.filter((customer) => {
        return customer.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filterInventory() {
      return this.allinventory.filter((inventory) => {
        return inventory.variantInfo.variantName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
    subTotalCal() {
      var total = 0;
      for (var i = 0; i < this.proformaInvoiceData.boqs.length; i++) {
        total = total + this.proformaInvoiceData.boqs[i].lineTotal;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.proformaInvoiceData.subTotal = total);
    },
    globalDiscountedCalc() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.proformaInvoiceData.globalDiscounted =
        (this.proformaInvoiceData.globalDiscountRate *
          this.proformaInvoiceData.subTotal) /
        100);
    },
    discountedSubTotalCalc() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.proformaInvoiceData.discountedSubTotal =
        this.proformaInvoiceData.subTotal -
        this.proformaInvoiceData.globalDiscounted);
    },
    totalVatCal() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.proformaInvoiceData.vatAmount =
        (this.proformaInvoiceData.vatRate *
          this.proformaInvoiceData.discountedSubTotal) /
        100);
    },
    grandTotalcalc() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.proformaInvoiceData.grandTotal =
        parseInt(this.proformaInvoiceData.vatAmount) +
        parseInt(this.proformaInvoiceData.discountedSubTotal));
    },
  },

  mounted() {
    // $(".collapse").collapse("show");
    // get user data
    // this.businessData = JSON.parse(localStorage.getItem("busines1s"));
    this.businessData = JSON.parse(localStorage.getItem("business"));
    // const userData = JSON.parse(localStorage.getItem("userData"));
    const id = this.$route.params.id;
    console.log(id);
    this.$axios
      .get(
        `${this.$apiCloudenly}invoice-proforma/${id}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log("invoice", resp.data);
        this.proformaInvoiceData = resp.data;
        this.singleCustomer = resp.data.customer;
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get(
        `${this.$apiCloudenly}consolidated-catalog/holding-inventory/${this.businessData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log(resp.data);
        this.allinventory = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    // this.$axios
    //  .get(`${this.$apiCloudenly}inventory/all/${this.businessData.businessId}`, this.$simpleAuthHeader)
    //  .then(resp => {
    //    console.log("we at pricebook", resp.data);
    //    this.allinventory = resp.data;
    //  })
    //  .catch(err => {
    //    console.log(err);
    //  });

    // get all network community
    this.$axios
      .get(
        `${this.$apiCloudenly}network/all/${this.businessData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log("get all customer", resp.data);
        this.allCustomer = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#inner {
  width: 70%;
  margin: 0 auto;
}

#container {
  border: 2px solid;
  border-radius: 5px;
}
textarea {
  width: 100% !important;
  box-sizing: border-box;
  border: 2px solid #ccc !important;
  border-radius: 4px !important;
  background-color: #f8f8f8 !important;
  resize: none;
}
input[type="text"] {
  width: 100% !important;
  padding: 5px 4px !important;
  margin: 5px 0 !important;
  box-sizing: border-box !important;
  border: 2px solid #ccc !important;
  border-radius: 4px !important;
}
input[type="text"]:focus {
  border: 3px solid #555 !important;
}
</style>
