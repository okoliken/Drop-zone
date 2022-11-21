/* eslint-disable no-unused-vars */
<template>
  <div class="">
    <div class="ks-page-header">
      <section class="ks-title">
        <h3>Create Supplier Purchase Order</h3>
      </section>
    </div>
    <br /><br /><br /><br />
    <div class="ks-body" id="printPurchaseOrder">
      <div class="container panel">
        <br />
        <div class="row">
          <div class="col-4">
            <br />
            <div class="text-left" v-show="customerCard">
              <h4>Suppleir Info:</h4>
              <br />
              <h5><span>Name</span>: {{ singleSupplier.name }}</h5>
              <br />
              <h5><span>Address</span>: {{ singleSupplier.address }}</h5>
              <br />
              <h5><span>Email</span>: {{ singleSupplier.email }}</h5>
              <br />
              <h5><span>Phone Number</span>: {{ singleSupplier.phone }}</h5>
              <br />

              <button @click="showCustomer" class="btn-link">
                choose a different supplier
              </button>
            </div>

            <div class="col-6" v-show="custSearchTriggered">
              <Card style="width: 350px">
                <input
                  type="search"
                  name=""
                  placeholder=" Search Supplier"
                  v-model="search"
                  class="form-control"
                  id=""
                />
                <CellGroup>
                  <Cell
                    v-for="(supplier, index) in filterSupplier.slice(0, 3)"
                    :key="index"
                    :title="supplier.name"
                    :label="supplier.email"
                  >
                    <span
                      @click="addCustomer(supplier)"
                      slot="extra"
                      class="btn-link"
                      >Add</span
                    >
                  </Cell>
                </CellGroup>
                <br />
                <button
                  @click="routeNetwork"
                  type="button"
                  class="btn btn-sm btn-link"
                >
                  Add new supplier
                </button>
              </Card>
            </div>
            <div class="col-6" v-show="showFirst">
              <Card style="width: 350px">
                <div class="text-center">
                  <h6>
                    <span class="fa fa-5x fa-user"></span>
                  </h6>
                  <button
                    type="button"
                    class="btn ks-rounded btn-sm btn-primary"
                    @click="trigeredCustomer"
                  >
                    Select Supplier
                  </button>
                </div>
              </Card>
            </div>
            <br />
          </div>

          <div class="col-4">
            <br />
            <div class="form-group row no-gutters">
              <label
                for="default-input"
                class="text-center col-sm-4 form-control-label"
                >Date</label
              >
              <div class="col-sm-8">
                <DatePicker
                  v-model="purchaseOrderData.date"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="Select date"
                  size="large"
                ></DatePicker>
              </div>
            </div>

            <div class="form-group row">
              <label
                for="default-input"
                class="text-center col-sm-4 form-control-label"
                >Validity
              </label>
              <div class="col-sm-8">
                <div class="row gutters">
                  <div class="col-6 padding-0">
                    <input
                      type="text"
                      class="form-control"
                      v-model="purchaseOrderData.bidValidityDur"
                      name=""
                      id=""
                    />
                  </div>
                  <div class="col-6 padding-0">
                    <select
                      v-model="purchaseOrderData.bidValidityType"
                      class="form-control"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="Month">Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>

          <div class="col-4">
            <br />
            <div class="form-group row no-gutters">
              <label
                for="default-input-rounded"
                class="col-sm-4 form-control-label"
                >Order Currency</label
              >
              <div class="col-sm-8">
                <select
                  v-model="purchaseOrderData.currency"
                  class="form-control"
                >
                  <option value="#">Naira</option>
                  <option value="$">Dollar</option>
                </select>
              </div>
            </div>

            <div class="form-group row no-gutters">
              <label
                for="default-input-rounded"
                class="col-sm-4 form-control-label"
                >Order Terms</label
              >
              <div class="col-sm-8">
                <textarea
                  v-model="purchaseOrderData.paymentTerms"
                  class="form-control"
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>

            <div class="form-group row no-gutters">
              <label
                for="default-input-rounded"
                class="col-sm-8 form-control-label"
                >Shipping Address</label
              >
            </div>

            <div class="form-group row no-gutters">
              <div class="col-md-12">
                <textarea
                  v-model="purchaseOrderData.shippingAddress"
                  rows="4"
                  co
                  ls="30"
                  class="form-control"
                  placeholder="Enter Shipping Address"
                ></textarea>
                <!-- <textarea name="name" rows="8" cols="80"></textarea>  -->
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      <br />
      <section class="container-fluid">
        <Collapse v-model="collapse1">
          <Panel name="1">
            Product Items
            <div slot="content">
              <div class="card">
                <table class="table">
                  <thead class="thead-default">
                    <tr>
                      <th class="text-center">Item Name</th>
                      <th class="text-center">Part Number</th>
                      <th class="text-center">Description</th>
                      <!-- <th class=" text-center">Requisition No</th> -->
                      <th class="text-center">UofM</th>
                      <th class="text-center">Unit Price</th>
                      <th class="text-center">Quantity</th>
                      <!-- <th class=" text-center">Discount</th> -->
                      <th class="text-center">Line Total</th>
                      <th class="text-center" style="width: 1%">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(requisition, index) in productBoq" :key="index">
                      <td class="" style="width: 20%">
                        <select
                          name=""
                          id=""
                          @change="onchage(requisition, index)"
                          v-model="prInventory[index].inventory"
                          class="form-control"
                        >
                          <option
                            :value="inventory"
                            v-for="(
                              inventory, index
                            ) in purchaseProductCatalogue"
                            :key="index"
                          >
                            {{ inventory.variant.variantName }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="requisition.partNumber"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="requisition.description"
                          name=""
                          id=""
                        />
                      </td>
                      <!-- <td> <input type="text" readonly v-model="requisition.requisitionNumber" class=" form-control" name="" id=""> </td> -->
                      <td>
                        <input
                          type="text"
                          readonly
                          v-model="requisition.unit"
                          class="form-control"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          @keyup="calLineTotal(requisition, index)"
                          type="text"
                          v-model="requisition.unitPrice"
                          class="form-control"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          @keyup="calLineTotal(requisition, index)"
                          class="form-control"
                          v-model="requisition.quantityRequested"
                          type="text"
                          name=""
                          id=""
                        />
                      </td>
                      <!-- <td> <input @keyup ="calLineTotal(requisition, index)" class=" form-control" v-model="requisition.discount" type="text" name="" id=""></td> -->
                      <td>
                        <input
                          class="form-control"
                          readonly
                          v-model="requisition.lineTotal"
                          type="text"
                          name=""
                          id=""
                        />
                      </td>
                      <td class="text-center">
                        <button
                          @click="deletePurcahseBoq(index)"
                          class="fa fa-1x fa-trash btn-sm btn-danger"
                        ></button>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <!-- <td> </td> -->
                      <td></td>
                      <th class="text-center">Sub Total</th>
                      <!-- <td></td> -->
                      <td class="text-center">
                        {{ purchaseOrderData.subTotal }}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <!-- <button @click="addProductBoq" class="btn-link "> <i class=" fa fa-1x fa-plus"></i> Add Another Item</button> -->
              </div>
            </div>
          </Panel>

          <Panel name="2">
            Service Items
            <div slot="content">
              <div class="card">
                <table class="table">
                  <thead class="thead-default">
                    <tr>
                      <th class="text-center">Item Name</th>
                      <th class="text-center">Part Number</th>
                      <th class="text-center">Description</th>
                      <!-- <th class=" text-center">Requisition No</th> -->
                      <th class="text-center">UofM</th>
                      <th class="text-center">Unit Price</th>

                      <th class="text-center">Quantity</th>
                      <!-- <th class=" text-center">Discount</th> -->
                      <th class="text-center">Line Total</th>
                      <th class="text-center" style="width: 1%">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(requisition, index) in serviceBoq" :key="index">
                      <td class="" style="width: 20%">
                        <select
                          name=""
                          id=""
                          @change="onchageService(requisition, index)"
                          v-model="prServiceInventory[index].inventory"
                          class="form-control"
                        >
                          <option
                            :value="inventory"
                            v-for="(
                              inventory, index
                            ) in purchaseServiceCatalogue"
                            :key="index"
                          >
                            {{ inventory.variant.variantName }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="requisition.partNumber"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          readonly
                          v-model="requisition.description"
                          name=""
                          id=""
                        />
                      </td>
                      <!-- <td> <input type="text" readonly v-model="requisition.requisitionNumber" class=" form-control" name="" id=""> </td> -->
                      <td>
                        <input
                          type="text"
                          readonly
                          v-model="requisition.unit"
                          class="form-control"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          @keyup="calServiceineTotal(requisition, index)"
                          type="text"
                          v-model="requisition.unitPrice"
                          class="form-control"
                          name=""
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          @keyup="calServiceineTotal(requisition, index)"
                          class="form-control"
                          v-model="requisition.quantityRequested"
                          type="text"
                          name=""
                          id=""
                        />
                      </td>
                      <!-- <td> <input @keyup ="calLineTotal(requisition, index)" class=" form-control" v-model="requisition.discount" type="text" name="" id=""></td> -->
                      <td>
                        <input
                          class="form-control"
                          readonly
                          v-model="requisition.lineTotal"
                          type="text"
                          name=""
                          id=""
                        />
                      </td>
                      <td class="text-center">
                        <button
                          @click="deleteServiceBoq(index, requisition)"
                          class="fa fa-1x fa-trash btn-sm btn-danger"
                        ></button>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <!-- <td> </td> -->
                      <td></td>
                      <th class="text-center">Sub Total</th>
                      <!-- <td></td> -->
                      <td class="text-center">
                        {{ purchaseOrderData.serviceSubTotal }}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <!-- <button @click="addServicePurhaseOrder" class="btn-link "> <i class=" fa fa-1x fa-plus"></i> Add Another Item</button> -->
              </div>
            </div>
          </Panel>
        </Collapse>

        <br />

        <div class="">
          <div class="col-6 push-6">
            <table class="table table-bordered panel">
              <tbody class="">
                <tr>
                  <!-- <td>  </td>
                                    <td></td>
                                    <td></td> -->
                  <!-- <td style="width: 20%"></td> -->
                  <td class="text-center" style="width: 30%">
                    <h6><strong> VAT </strong></h6>
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="purchaseOrderData.vatRate"
                      class="form-control"
                      name=""
                      value=""
                    />
                  </td>
                  <!-- <td></td> -->
                  <!-- <td></td> -->
                  <td class="text-center" style="width: 40%">
                    {{ purchaseOrderData.vat }}
                  </td>
                </tr>

                <tr>
                  <!-- <td>  </td>
                                    <td></td>
                                    <td></td> -->
                  <!-- <td style="width: 20%"></td> -->
                  <td class="text-center" style="width: 30%">
                    <h6><strong> Order Total</strong></h6>
                  </td>
                  <td></td>
                  <!-- <td></td> -->
                  <!-- <td></td> -->
                  <td class="text-center" style="width: 40%">
                    {{ purchaseOrderData.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <div class="container">
          <Button @click="savePurchaseOrder" type="info" :loading="loading">
            <span v-if="!loading">Save</span>
            <span v-else>Saving...</span>
          </Button>

          <Button @click="sendEmail" type="warning" :loading="loading1">
            <span v-if="!loading1">Send</span>
            <span v-else>Sending...</span>
          </Button>
          <Button type="success" @click="printPurchaseOrder"> Print</Button>
        </div>
      </section>
      <br />
    </div>
  </div>
</template>

<script>
import printJs from "print-js";
export default {
  data() {
    return {
      search: "",
      collapse1: "1",
      userData: "",
      loading: false,
      loading1: false,
      showFirst: true,
      custSearchTriggered: false,
      customerCard: false,
      cusButton: false,
      supplierButton: true,
      singleSupplier: "",
      suppliers: [],
      serviceBoq: [],
      productBoq: [],
      purchaseServiceCatalogue: [],
      purchaseProductCatalogue: [],
      purchaseOrderData: {
        owner: "",
        creator: "",
        business: "",
        outlet: "",
        revisionNumber: "",
        supplier: "",
        currency: "",
        paymentTerms: "",
        shippingAddress: "",
        vatRate: 5,
        subTotal: 0,
        serviceSubTotal: 0,
        vat: 0,
        total: 0,
        boqs: [],
      },
      supplierDetails: "",
      prInventory: [{ inventory: "" }],

      prServiceInventory: [{ inventory: "" }],
      bussinesData: "",
    };
  },
  methods: {
    routeNetwork() {
      this.$router.push({ name: "CreateCommunity" });
    },

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

    addCustomer(val) {
      this.custSearchTriggered = false;
      this.customerCard = true;
      this.singleSupplier = val;
      this.purchaseOrderData.supplier = val.hash;
      // $("#myModal").modal("hide");
    },
    addProductBoq() {
      this.productBoq.push({
        partNumber: "",
        variantHash: "",
        name: "",
        description: "",
        requisitionNumber: "",
        unit: "",
        discount: "",
        lineTotal: "",
        paymentTerms: "",
      });
      this.prInventory.push({
        inventory: {
          partNumber: "",
          variantHash: "",
          name: "",
          description: "",
          requisitionNumber: "",
          unit: "",
          discount: "",
          lineTotal: "",
          paymentTerms: "",
        },
      });
    },

    addServicePurhaseOrder() {
      console.log("hello all");
      this.serviceBoq.push({
        partNumber: "",
        variantHash: "",
        name: "",
        description: "",
        requisitionNumber: "",
        unit: "",
        discount: "",
        lineTotal: "",
        paymentTerms: "",
      });
      this.prServiceInventory.push({
        inventory: {
          partNumber: "",
          variantHash: "",
          name: "",
          description: "",
          requisitionNumber: "",
          unit: "",
          discount: "",
          lineTotal: "",
          paymentTerms: "",
        },
      });
    },

    onchage(requisation, index) {
      console.log("this is inventory", this.prInventory[index].inventory);
      requisation.name = this.prInventory[index].inventory.variant.variantName;
      requisation.code = this.prInventory[index].inventory.variant.variantSku;
      requisation.unit = this.prInventory[index].inventory.product.purchaseUOfM;
      requisation.partNumber = this.prInventory[
        index
      ].inventory.variant.manufacturerPartNumber;
      requisation.description = this.prInventory[
        index
      ].inventory.product.description;
      (requisation.variantHash = this.prInventory[
        index
      ].inventory.variant.catalogHash),
        (requisation.quantityRequested = "");
      requisation.unitPrice = this.prInventory[
        index
      ].inventory.variant.purchaseUnitPrice;
      (requisation.discount = ""), (requisation.lineTotal = "");
      // requisation.category = this.prInventory[index].inventory.variantInfo.category;
      // requisation.variantName = this.prInventory[index].inventory.variantInfo.variantName,
      // requisation.description = ".",
      // requisation.unitOfMeasure = "",
      requisation.type = this.prInventory[index].inventory.variant.group;
      // requisation.quantityRequested = ""
    },

    onchageService(requisation, index) {
      console.log(
        "this is inventory",
        this.prServiceInventory[index].inventory
      );
      requisation.name = this.prServiceInventory[
        index
      ].inventory.variant.variantName;
      requisation.code = this.prServiceInventory[
        index
      ].inventory.variant.variantSku;
      requisation.unit = this.prServiceInventory[
        index
      ].inventory.product.purchaseUOfM;
      requisation.partNumber = this.prServiceInventory[
        index
      ].inventory.variant.manufacturerPartNumber;
      requisation.description = this.prServiceInventory[
        index
      ].inventory.product.description;
      (requisation.variantHash = this.prServiceInventory[
        index
      ].inventory.variant.catalogHash),
        (requisation.quantityRequested = "");
      requisation.unitPrice = this.prServiceInventory[
        index
      ].inventory.variant.purchaseUnitPrice;
      (requisation.discount = ""), (requisation.lineTotal = "");
      // requisation.category = this.prServiceInventory[index].inventory.variant.category;
      // requisation.variantName = this.prServiceInventory[index].inventory.variantInfo.variantName,
      // requisation.description = ".",
      // requisation.unitOfMeasure = "",
      requisation.type = this.prServiceInventory[index].inventory.variant.group;
      // requisation.quantityRequested = ""
    },

    deletePurcahseBoq(val) {
      this.productBoq.splice(val, 1);
      this.prInventory.splice(val, 1);
    },

    deleteServiceBoq(val) {
      this.serviceBoq.splice(val, 1);
      this.prServiceInventory.splice(val, 1);
    },

    printPurchaseOrder() {
      printJs("printPurchaseOrder", "html");
    },

    calLineTotal(val) {
      const quantity = parseInt(val.quantityRequested);
      const unitPrice = parseInt(val.unitPrice);
      const disc = parseInt(val.discount);
      const totalPrice = quantity * unitPrice;
      // eslint-disable-next-line no-unused-vars
      const discounted = (totalPrice * disc) / 100;
      val.lineTotal = quantity * unitPrice;
      // val.lineTotal = totalPrice - discounted || 0;

      var total = 0;
      for (var i = 0; i < this.productBoq.length; i++) {
        total = total + this.productBoq[i].lineTotal;
      }
      return (this.purchaseOrderData.subTotal = total);
      // val.varianceFromDiscountLimit =
      //   parseInt(val.discountLimit) - parseInt(val.lineDiscount);
      // val.actualDiscount = parseInt(val.lineDiscount);
      // val.lineDiscountInPercentage = parseInt(val.lineDiscount);
      // val.totalAmountBeforeDiscount = parseInt(val.unitPrice);
      // val.totalDiscountAmount =
      // parseInt(val.lineDiscount) * parseInt(val.lineTotal) / 100;
    },

    calServiceineTotal(val) {
      const quantity = parseInt(val.quantityRequested);
      const unitPrice = parseInt(val.unitPrice);
      const disc = parseInt(val.discount);
      const totalPrice = quantity * unitPrice;
      // eslint-disable-next-line no-unused-vars
      const discounted = (totalPrice * disc) / 100;
      val.lineTotal = quantity * unitPrice;
      // val.lineTotal = totalPrice - discounted || 0;

      var total = 0;
      for (var i = 0; i < this.serviceBoq.length; i++) {
        total = total + this.serviceBoq[i].lineTotal;
      }
      return (this.purchaseOrderData.serviceSubTotal = total);
      // val.varianceFromDiscountLimit =
      //   parseInt(val.discountLimit) - parseInt(val.lineDiscount);
      // val.actualDiscount = parseInt(val.lineDiscount);
      // val.lineDiscountInPercentage = parseInt(val.lineDiscount);
      // val.totalAmountBeforeDiscount = parseInt(val.unitPrice);
      // val.totalDiscountAmount =
      // parseInt(val.lineDiscount) * parseInt(val.lineTotal) / 100;
    },
    savePurchaseOrder() {
      this.loading = true;
      // console.log(this.purchaseOrderData);
      this.purchaseOrderData.boqs = [...this.productBoq, ...this.serviceBoq];
      this.$axios
        .post(
          `${this.$apiCloudenly}purchase-order`,
          this.purchaseOrderData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          this.$swal(resp.data.message);
          this.loading = false;
          this.$router.push({ name: "PurchaseOrderList" });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    sendEmail() {
      this.loading1 = true;
      this.$axios
        .post(
          `${this.$apiCloudenly}purchase-order`,
          this.purchaseOrderData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          if (resp.data) {
            const data = {
              title: this.purchaseOrderData.description,
              purchaseOrderHash: this.userData.name,
              // purchaseRequisitionHash: resp.data.hash,
              // email: this.singleSupplier.email
            };
            this.$axios
              .post(
                `${this.$apiCloudenly}purchase-order/send`,
                data,
                this.$simpleAuthHeader
              )
              .then((resp) => {
                this.$Notice.success({
                  title: "Success",
                  desc: resp.data.message,
                });
                this.$router.push({ name: "PurchaseOrderList" });
                this.loading = false;
              })
              .catch((err) => {
                console.log(err);
                this.loading = false;
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
  computed: {
    subTotalCal() {
      var total = 0;
      for (var i = 0; i < this.purchaseOrderData.boqs.length; i++) {
        total = total + this.purchaseOrderData.boqs[i].lineTotal;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.purchaseOrderData.subTotal = total);
    },

    filterSupplier() {
      return this.suppliers.filter((suppleier) => {
        return suppleier.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  watch: {
    "purchaseOrderData.subTotal": function () {
      const total =
        parseInt(this.purchaseOrderData.serviceSubTotal || 0) +
        parseInt(this.purchaseOrderData.subTotal || 0);
      this.purchaseOrderData.vat =
        (parseInt(this.purchaseOrderData.vatRate || 0) * parseInt(total)) / 100;
      this.purchaseOrderData.total =
        parseInt(total) + parseInt(this.purchaseOrderData.vat);
    },

    "purchaseOrderData.serviceSubTotal": function () {
      const total =
        parseInt(this.purchaseOrderData.serviceSubTotal || 0) +
        parseInt(this.purchaseOrderData.subTotal || 0);
      this.purchaseOrderData.vat =
        (parseInt(this.purchaseOrderData.vatRate || 0) * parseInt(total)) / 100;
      this.purchaseOrderData.total =
        parseInt(total) + parseInt(this.purchaseOrderData.vat);
    },

    "purchaseOrderData.vatRate": function () {
      const total =
        parseInt(this.purchaseOrderData.serviceSubTotal || 0) +
        parseInt(this.purchaseOrderData.subTotal || 0);
      this.purchaseOrderData.vat =
        (parseInt(this.purchaseOrderData.vatRate || 0) * parseInt(total)) / 100;
      this.purchaseOrderData.total =
        parseInt(total) + parseInt(this.purchaseOrderData.vat);
    },
  },

  mounted() {
    this.bussinesData = this.$store.state.userData;
    console.log(this.$store.state.SupplierStore.supplierData);
    this.purchaseOrderData.business = this.bussinesData.businessId;
    this.purchaseOrderData.outlet = this.bussinesData.businessId;
    this.purchaseOrderData.owner = this.bussinesData.owner;
    this.purchaseOrderData.creator = this.bussinesData.owner;
    this.userData = JSON.parse(localStorage.getItem("business"));
    // get all  customer  of  supplier

    this.$axios
      .get(
        `${this.$apiCloudenly}network/all/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        this.suppliers = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    //   get list of all service purchase  catalogue
    this.$axios
      .get(
        `${this.$apiCloudenly}consolidated-catalog/variant/purchases/service/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log("pr Service", resp.data);
        this.purchaseServiceCatalogue = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    //   get list of all product purchase  catalogue
    this.$axios
      .get(
        `${this.$apiCloudenly}consolidated-catalog/variant/purchases/product/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log("pr", resp.data);
        this.purchaseProductCatalogue = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.padding-0 {
  padding-right: 1;
  padding-left: 1;
}
</style>
