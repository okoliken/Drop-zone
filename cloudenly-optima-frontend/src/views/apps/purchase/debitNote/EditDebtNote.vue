
<template >
  <div class="container">
    <!-- <div class="ks-page-header"> -->
    <section class="ks-title">
      <h3>Edit Debit Note</h3>
    </section>
    <!-- </div> -->

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
              <h3><span aria-hidden="true">&times;</span></h3>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <div class="col-5">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search for product or service"
                />
              </div>
            </div>
            <table class="table table-bordered">
              <thead class="thead-default">
                <tr>
                  <!-- <th>#</th> -->
                  <th class="text-center">Item Name</th>
                  <th class="text-center">Item Code</th>
                  <th class="text-center">Item Description</th>
                  <th class="text-center">Unit Of Measure</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pricebook, index) in priceBooks" :key="index">
                  <td class="text-center">
                    {{ pricebook.variantInfo.variantName }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.variantInfo.variantCode }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.mainCatalog.description }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.mainCatalog.salesUOfM }}
                  </td>
                  <td class="text-center">
                    <button
                      @click="addProductBoqs(pricebook, index)"
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
              @click="addNewPurchaseBoq"
              class="btn btn-sm btn-success"
              data-dismiss="modal"
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade bd-example-service-modal-lg"
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
              <h3><span aria-hidden="true">&times;</span></h3>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <div class="col-5">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search for product or service"
                />
              </div>
            </div>
            <table class="table table-bordered">
              <thead class="thead-default">
                <tr>
                  <!-- <th>#</th> -->
                  <th class="text-center">Item Name</th>
                  <th class="text-center">Item Code</th>
                  <th class="text-center">Item Description</th>
                  <th class="text-center">Unit Of Measure</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pricebook, index) in priceBooks" :key="index">
                  <td class="text-center">
                    {{ pricebook.variantInfo.variantName }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.variantInfo.variantCode }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.mainCatalog.description }}
                  </td>
                  <td class="text-center">
                    {{ pricebook.mainCatalog.salesUOfM }}
                  </td>
                  <td class="text-center">
                    <button
                      @click="addServiceBoqs(pricebook, index)"
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
              @click="addNewServiceBoq"
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
    <!-- save,email, print button -->
    <div class="btn-group float-right">
      <button @click="saveCreditNote" type="button" class="btn btn-success">
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
          @click="sendDebitNote"
          type="btn btn-secondary "
          class="dropdown-item"
          href="#"
        >
          <strong>Save & Email</strong>
        </button>
      </div>
    </div>
    <!-- end Save button -->

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

    <br /><br /><br />

    <div id="printJs">
      <section>
        <div class="">
          <a
            data-toggle="collapse"
            data-target="#collapse"
            aria-expanded="false"
            aria-controls="collapse"
          >
            ISSUER DETAILS
          </a>
        </div>
      </section>

      <!-- <div class="collapse" id="collapse"> -->
      <div class="card card-block">
        <div class="row">
          <div class="col-6">
            <div class="col-6">
              <vue-dropzone id="drop" :options="dropzoneOptions">
                <div class="dropzone-custom-content">
                  <div class="subtitle">
                    <span> <i class="fa fa-3x fa-upload"></i> </span><br />
                    ...or click to Business Logo
                  </div>
                </div>
              </vue-dropzone>
            </div>
          </div>
          <div class="col-6 text-right">
            <section class="ownerDetail">
              <div class="card card-outline-secondary">
                <div class="card-block">
                  <h3 class="card-title">{{ businessData.name }}</h3>
                  <p class="card-text"></p>
                  <h5>{{ businessData.email }}</h5>
                  <p class="card-text"></p>
                  <h5>{{ businessData.phone }}</h5>
                </div>
              </div>
              <br />
            </section>
          </div>
        </div>
      </div>
      <!-- </div>  -->

      <!-- proforma  and customer Details -->
      <Card>
        <div class="container">
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
                    placeholder=" Search customer"
                    v-model="search"
                    class="form-control"
                    id=""
                  />
                  <CellGroup>
                    <Cell
                      v-for="(customer, index) in filterCustomer.slice(0, 3)"
                      :key="index"
                      :title="customer.name"
                      :label="customer.email"
                    >
                      <span
                        @click="addCustomer(customer)"
                        slot="extra"
                        class="btn-link"
                        >Add</span
                      >
                    </Cell>
                  </CellGroup>
                  <br />
                  <button
                    type="button"
                    class="btn btn-primary ks-rounded"
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
                      class="btn ks-rounded btn-primary"
                      @click="trigeredCustomer"
                    >
                      Add Customer
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            <div class="col-md-2"></div>

            <div class="col-md-6">
              <div class="form-group row">
                <label
                  for="example-text-input"
                  class="col-6 text-right col-form-label"
                >
                  Date
                </label>
                <div class="col-6">
                  <DatePicker v-model="DebitNoteData.date"></DatePicker>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="example-text-input"
                  class="col-6 text-right form-control-label"
                  >Currency</label
                >
                <div class="col-6">
                  <select class="form-control" v-model="DebitNoteData.currency">
                    <option value="#">Naira</option>
                    <option value="$">Dollar</option>
                    <option value="$">Pound</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="example-text-input"
                  class="col-6 text-right form-control-label"
                >
                  Reason for Credit Note</label
                >
                <div class="col-6">
                  <select
                    class="form-control"
                    v-model="DebitNoteData.reasonForNote"
                  >
                    <option value="#">Quantity ShortFall</option>
                    <option value="$">Defective Items</option>
                    <option value="$">Demaage Items</option>
                    <option value="$">Sales Return</option>
                    <option value="$">Incorrect Items</option>
                    <option value="others">Other</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="example-text-input"
                  class="col-6 text-right form-control-label"
                >
                  Description</label
                >
                <div class="col-6">
                  <textarea
                    class="form-control"
                    v-model="DebitNoteData.noteDescription"
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <!-- End profroma  and Customer Details -->

      <!-- Pricebook Boqs -->
      <br />
      <div id="container">
        <Collapse v-model="collapse1">
          <Panel name="1">
            Product Items
            <div slot="content" class="panel">
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
                    <!-- <th class=" text-center">SKu</th> -->
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
                  <tr v-for="(boq, index) in productBoqs" :key="index">
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
                        class="form-control"
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
                        @keyup="CaltotalLine(boq, index)"
                      />
                    </td>
                    <td style="width: 5%">
                      <input
                        v-model="boq.lineDiscount"
                        type="text"
                        class="form-control"
                        @keyup="CaltotalLine(boq, index)"
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
                        @click="deleteProduct(boq, index)"
                        class="btn btn-xs btn-danger fa fa-remove"
                      ></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </Collapse>

        <Collapse v-model="collapse2">
          <Panel name="1">
            Service Items

            <div slot="content" class="panel">
              <br />
              <button
                data-toggle="modal"
                data-target=".bd-example-service-modal-lg"
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
                    <!-- <th class=" text-center">SKu</th> -->
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
                  <tr v-for="(boq, index) in serviceBoqs" :key="index">
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
                        class="form-control"
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
                        @keyup="CaltotalLine(boq, index)"
                      />
                    </td>
                    <td style="width: 5%">
                      <input
                        v-model="boq.lineDiscount"
                        type="text"
                        class="form-control"
                        @keyup="CaltotalLine(boq, index)"
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
                        @click="deleteService(boq, index)"
                        class="btn btn-xs btn-danger fa fa-remove"
                      ></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </Collapse>

        <br />
        <div class="col-6 push-6">
          <table class="table table-bordered panel">
            <tbody class="">
              <tr style="border: 0px">
                <th style="width: 50%">
                  <h6><strong>Sub Total</strong></h6>
                </th>
                <th style="width: 20%"></th>
                <th style="width: 30%">{{ purchaseSubTotal }}</th>
              </tr>
              <tr>
                <th style="width: 50%">
                  <h6><strong>Global Discount</strong></h6>
                </th>
                <th style="width: 20%">
                  <input
                    type="text"
                    class="form-control"
                    v-model="DebitNoteData.globalDiscountRate"
                    name=""
                    id=""
                  />
                </th>
                <th style="width: 30%">{{ DebitNoteData.globalDiscount }}</th>
              </tr>
              <tr>
                <th style="width: 50%">
                  <h6><strong>Discounted Sub-Total</strong></h6>
                </th>
                <th style="width: 20%"></th>
                <th style="width: 30%">
                  {{ DebitNoteData.discountedSubTotal }}
                </th>
              </tr>

              <tr>
                <th style="width: 50%">
                  <h6><strong>VAT</strong></h6>
                </th>
                <th style="width: 20%">
                  <input
                    type="text"
                    v-model="DebitNoteData.vatRate"
                    class="form-control"
                  />
                </th>
                <th style="width: 30%">{{ DebitNoteData.vat }}</th>
              </tr>

              <tr>
                <th style="width: 50%">
                  <h6><strong>Grand Total</strong></h6>
                </th>
                <th style="width: 20%"></th>
                <th style="width: 30%">{{ DebitNoteData.grandTotal }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- <br><br> -->
      <!-- Footer-->
    </div>
  </div>
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
      collapse1: "1",
      collapse2: "1",
      singleCustomer: "",
      priceBooks: [],
      allCustomer: [],
      allBoqs: [],
      productBoqs: [],
      serviceBoqs: [],
      DebitNoteData: {
        owner: "",
        creator: "",
        business: "",
        noteDescription: "",
        invoiceNo: "",
        reasonForNote: "",
        networkHash: "",
        totalAmount: "",
        currency: "",
        grandTotal: "",
        subTotal: 0,
        globalDiscount: 0,
        discountedSubTotal: 0,
        vatRate: 5,
        globalDiscountRate: 0,
        serviceSubTotal: 0,
        vat: 0,
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
    addNewPurchaseBoq() {
      this.productBoqs.push({
        variantHash: "",
        variantSku: "",
        name: "",
        unitPrice: "",
        description: "",
        type: "",
        quantity: "",
        category: "",
        unit: "",
        lineDiscount: 0,
        lineTotal: 0,
        // discountLimit: "",
        // totalAmountBeforeDiscount: 0,
        // lineDiscountInPercentage: 0,
        // totalDiscountAmount: 0,
        // actualDiscount: "",
        // varianceFromDiscountLimit: "",
      });
    },

    addNewServiceBoq() {
      this.serviceBoqs.push({
        variantHash: "",
        variantSku: "",
        name: "",
        unitPrice: "",
        description: "",
        type: "",
        quantity: "",
        category: "",
        unit: "",
        lineDiscount: 0,
        lineTotal: 0,
        // discountLimit: "",
        // totalAmountBeforeDiscount: 0,
        // lineDiscountInPercentage: 0,
        // totalDiscountAmount: 0,
        // actualDiscount: "",
        // varianceFromDiscountLimit: "",
      });
    },
    addProductBoqs(val) {
      console.log(val);
      this.productBoqs.push({
        variantHash: val.itemHoldingInventory.variantHash,
        variantSku: val.variantInfo.variantCode,
        name: val.variantInfo.variantName,
        unitPrice: val.variantInfo.retailPrice,
        description: val.mainCatalog.description,
        type: val.variantInfo.group,
        quantity: 0,
        unit: val.mainCatalog.salesUOfM,
        lineDiscount: 0,
        lineTotal: 0,
        discountLimit: val.variantInfo.percentageDiscountLimit,
        totalAmountBeforeDiscount: 0,
        lineDiscountInPercentage: 0,
        totalDiscountAmount: 0,
        actualDiscount: 0,
        varianceFromDiscountLimit: 0,
      });
      // this.priceBooks.splice(index, 1);
      this.allBoqs.push(val);
    },

    addServiceBoqs(val) {
      this.serviceBoqs.push({
        variantHash: val.itemHoldingInventory.variantHash,
        variantSku: val.variantInfo.variantCode,
        name: val.variantInfo.variantName,
        unitPrice: val.variantInfo.retailPrice,
        description: val.mainCatalog.description,
        type: val.variantInfo.group,
        quantity: 0,
        unit: val.mainCatalog.salesUOfM,
        lineDiscount: 0,
        lineTotal: 0,
        discountLimit: val.variantInfo.percentageDiscountLimit,
        totalAmountBeforeDiscount: 0,
        lineDiscountInPercentage: 0,
        totalDiscountAmount: 0,
        actualDiscount: 0,
        varianceFromDiscountLimit: 0,
      });
      // this.priceBooks.splice(index, 1);
      this.allBoqs.push(val);
    },
    deleteProduct(val, index) {
      this.productBoqs.splice(index, 1);
    },

    deleteService(val, index) {
      this.serviceBoqs.splice(index, 1);
    },

    deleteNewSale(val, index) {
      // this.priceBooks.push(val);
      this.DebitNoteData.newSales.splice(index, 1);
    },
    addCustomer(val) {
      this.custSearchTriggered = false;
      this.customerCard = true;
      this.singleCustomer = val;
      this.DebitNoteData.networkHash = val.hash;
      // $("#myModal").modal("hide");
    },

    createNetwork() {
      this.$router.push({ name: "CreateStoreNetwork" });
    },

    CaltotalLine(val) {
      // console.log(index);
      const quantity = parseInt(val.quantity);
      const unitPrice = parseInt(val.unitPrice);
      const disc = parseInt(val.lineDiscount);
      const totalPrice = quantity * unitPrice;
      const discounted = (totalPrice * disc) / 100;
      val.lineTotal = totalPrice - discounted || 0;
      val.varianceFromDiscountLimit =
        parseInt(val.discountLimit) - parseInt(val.lineDiscount);
      val.actualDiscount = parseInt(val.lineDiscount);
      val.lineDiscountInPercentage = parseInt(val.lineDiscount);
      val.totalAmountBeforeDiscount = parseInt(val.unitPrice);
      val.totalDiscountAmount =
        (parseInt(val.lineDiscount) * parseInt(val.lineTotal)) / 100;
    },

    printProfoma() {
      printJs("printJs", "html");
    },

    sendDebitNote() {
      this.DebitNoteData.boqs = [...this.productBoqs, ...this.serviceBoqs];
      delete this.DebitNoteData.productBoqs;
      delete this.DebitNoteData.serviceBoqs;
      this.$axios
        .patch(
          `${this.$apiCloudenly}credit-debit-note/update/${this.DebitNoteData.hash}`,
          this.DebitNoteData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          if (resp.data) {
            const data = {
              title: this.DebitNoteData.description,
              business: this.businessData.name,
              total: this.DebitNoteData.grandTotal,
              noteHash: resp.data.hash,
              email: this.singleCustomer.email,
            };
            this.$axios
              .post(
                this.$apiCloudenly + "credit-debit-note/send/debit",
                data,
                this.$simpleAuthHeader
              )
              .then((resp) => {
                console.log(resp.data.message);
                this.$swal(resp.data.message);
                this.$router.push({ name: "DebitNoteList" });
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
    saveCreditNote() {
      this.DebitNoteData.boqs = [...this.productBoqs, ...this.serviceBoqs];
      delete this.DebitNoteData.productBoqs;
      delete this.DebitNoteData.serviceBoqs;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "credit-debit-note/update/" +
            this.DebitNoteData.hash,
          this.DebitNoteData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data.message);
          this.$swal(resp.data.message);
          this.$router.push({ name: "DebitNoteList" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    "DebitNoteData.subTotal": function () {
      this.DebitNoteData.globalDiscount =
        (parseInt(this.DebitNoteData.globalDiscountRate || 0) *
          parseInt(this.DebitNoteData.subTotal || 0)) /
        100;
      // console.log('This is the Global Discount', this.DebitNoteData.globalDiscount)

      this.DebitNoteData.discountedSubTotal =
        this.DebitNoteData.subTotal - this.DebitNoteData.globalDiscount;
      // console.log('discounted Total...', this.DebitNoteData.discountedSubTotal)

      this.DebitNoteData.vat =
        (parseInt(this.DebitNoteData.vatRate || 0) *
          parseInt(this.DebitNoteData.discountedSubTotal || 0)) /
        100;
      //  console.log('This is the Vat Amount', this.DebitNoteData.vat)

      this.DebitNoteData.grandTotal =
        parseInt(this.DebitNoteData.vat) +
        parseInt(this.DebitNoteData.discountedSubTotal);
      // console.log('This is the grand Total', this.DebitNoteData.grandTotal)
    },

    "DebitNoteData.globalDiscountRate": function () {
      this.DebitNoteData.globalDiscount =
        (parseInt(this.DebitNoteData.globalDiscountRate || 0) *
          parseInt(this.DebitNoteData.subTotal || 0)) /
        100;
      // console.log('This is the Global Discount', this.DebitNoteData.globalDiscount)

      this.DebitNoteData.discountedSubTotal =
        this.DebitNoteData.subTotal - this.DebitNoteData.globalDiscount;
      // console.log('discounted Total...', this.DebitNoteData.discountedSubTotal)

      this.DebitNoteData.vat =
        (parseInt(this.DebitNoteData.vatRate || 0) *
          parseInt(this.DebitNoteData.discountedSubTotal || 0)) /
        100;
      //  console.log('This is the Vat Amount', this.DebitNoteData.vat)

      this.DebitNoteData.grandTotal =
        parseInt(this.DebitNoteData.vat) +
        parseInt(this.DebitNoteData.discountedSubTotal);
      // console.log('This is the grand Total', this.DebitNoteData.grandTotal)
    },

    "DebitNoteData.vatRate": function () {
      this.DebitNoteData.globalDiscount =
        (parseInt(this.DebitNoteData.globalDiscountRate || 0) *
          parseInt(this.DebitNoteData.subTotal || 0)) /
        100;
      // console.log('This is the Global Discount', this.DebitNoteData.globalDiscount)

      this.DebitNoteData.discountedSubTotal =
        this.DebitNoteData.subTotal - this.DebitNoteData.globalDiscount;
      // console.log('discounted Total...', this.DebitNoteData.discountedSubTotal)

      this.DebitNoteData.vat =
        (parseInt(this.DebitNoteData.vatRate || 0) *
          parseInt(this.DebitNoteData.discountedSubTotal || 0)) /
        100;
      //  console.log('This is the Vat Amount', this.DebitNoteData.vat)

      this.DebitNoteData.grandTotal =
        parseInt(this.DebitNoteData.vat) +
        parseInt(this.DebitNoteData.discountedSubTotal);
      // console.log('This is the grand Total', this.DebitNoteData.grandTotal)
    },
  },

  computed: {
    // Filter Customer
    filterCustomer() {
      return this.allCustomer.filter((customer) => {
        return customer.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    filterPricebook() {
      return this.pricebook.filter((pricebook) => {
        return pricebook.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    purchaseSubTotal() {
      var purchasetotal = 0;
      for (var i = 0; i < this.productBoqs.length; i++) {
        purchasetotal = purchasetotal + parseInt(this.productBoqs[i].lineTotal);
      }

      var servicetotal = 0;
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < this.serviceBoqs.length; i++) {
        servicetotal = servicetotal + parseInt(this.serviceBoqs[i].lineTotal);
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.DebitNoteData.subTotal = parseInt(
        purchasetotal + servicetotal
      ));
    },

    // serviceSubTotal() {
    //   var total = 0;
    //   for (var i = 0; i < this.serviceBoqs.length; i++) {
    //     total = total + this.serviceBoqs[i].lineTotal;
    //   }
    //   return (this.DebitNoteData.serviceSubTotal = total);
    // }
  },

  mounted() {
    // $(".collapse").collapse("show");
    // get user data
    this.businessData = JSON.parse(localStorage.getItem("business"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const businessData = JSON.parse(localStorage.getItem("business"));
    this.DebitNoteData.owner = userData.owner;
    this.DebitNoteData.creator = userData.scellooId;
    this.DebitNoteData.business = businessData.businessId;
    this.DebitNoteData.outlet = userData.businessId;
    const id = this.$route.params.id;
    this.$axios
      .get(
        `${this.$apiCloudenly}credit-debit-note/${id}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log("debit Note", resp.data);
        this.DebitNoteData = resp.data;
        this.singleCustomer = resp.data.network;
        this.DebitNoteData.networkHash = resp.data.network.hash;
        (this.productBoqs = resp.data.productBoqs),
          (this.serviceBoqs = resp.data.serviceBoqs);
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
        this.priceBooks = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

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
/* .padd {
    margin: 0px !important;
    padding-top: 8px !important;
  }
  .modalButon{
              background-color:azure;
            }
  table {
    border-collapse: collapse;
  }
  .heading1 {
    background-color: azure !important;
    font-weight: bolder;
    font-size: 20px;
  }

  .ownerDetail {
    padding: 0px !important;
    margin: 0px !important;
    font-weight: bolder;
  }

  .boqHeader th {
    background: azure !important;
    font-size: 15px !important;
  }

  td {
    border-top: 0px !important;
    padding: 20px !important;
    margin: 10px !important;
  }

  textarea {
    width: 100% !important;
    box-sizing: border-box;
    border: 2px solid #ccc !important;
    border-radius: 4px !important;
    background-color: #f8f8f8 !important;
  }
  input[type="text"] {
    width: 100% !important;
    padding: 3px 4px !important;
    margin: 5px 0 !important;
    box-sizing: border-box !important;
    border: 2px solid #ccc !important;
    border-radius: 5px !important;
  }
  input[type="text"]:focus {
    border: 2px solid rgb(160, 160, 236) !important;
    border-radius: 4px !important;
  } */
</style>
