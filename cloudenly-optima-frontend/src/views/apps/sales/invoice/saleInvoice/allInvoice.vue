<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Sales Invoice</p>
    </div>

    <invoice-analysis
      v-if="getIsAccOwner || getSalesInvoicePrivileges.viewDashboard"
      class="mt-5"
    />
    <div class>
      <!-- View BOQ -->
      <vs-popup :active.sync="modal" title="BOQ">
        <div class="container">
          <table class="table table-auto table-responsive w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3 text-center">Name</th>
                <th class="py-3 text-center">Type</th>
                <th class="py-3 text-center">Unit</th>
                <th class="py-3 text-center">Description</th>
                <th class="py-3 text-center">Quantity</th>
                <th class="py-3 text-center">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(boq, index) in boqsDetails" :key="index">
                <td class="py-3 text-center">{{ boq.name }}</td>
                <td class="py-3 text-center">{{ boq.itemClass }}</td>
                <td class="py-3 text-center">{{ boq.unitOfMeasure }}</td>
                <td class="psy-3 text-center">{{ boq.description }}</td>
                <td class="py-3 text-center">{{ boq.quantity }}</td>
                <td class="py-3 text-center">{{ boq.unitPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </vs-popup>
      <!-- End View Boq Section -->

      <!-- delete invoice -->
      <vs-popup
        button-close-hidden
        :active.sync="deleteModal"
        title="Delete Sales Invoice"
      >
        <div v-if="getIsAccOwner || getSalesInvoicePrivileges.deleteInvoice">
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
              border-cloudenly-danger-main
              bg-white
            "
            >
              <div class="flex items-center mx-1">
                <div class="mr-5">
                  <feather-icon
                    svgClasses="text-cloudenly-danger-main"
                    class="h-8 w-8"
                    icon="AlertCircleIcon"
                  ></feather-icon>
                </div>

                <div>
                  <h1 class="m-0">warning</h1>
                  <p>You are about to delete this Invoice</p>
                </div>
              </div>
            </div>

            <div class="mt-3 flex items-center justify-center">
              <button
                :disabled="deleteButton"
                :class="{
                  'cursor-not-allowed': deleteButton,
                  'bg-cloudenly-primary-mid': deleteButton
                }"
                @click="closedInvoice"
                class="
                px-5
                py-2
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded
              "
              >
                Delete
              </button>
              <button
                class="border-none bg-transparent px-5 py-2 cursor-pointer"
                @click="deleteModal = false"
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
      <!-- delete invoice -->

      <!-- process Invoice -->
      <vs-popup
        button-close-hidden
        :active.sync="processModal"
        title="Process Sales Invoice"
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
                  Please note that this invoice for Invoice may undergo approval
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
                'bg-cloudenly-primary-mid': processButton
              }"
              @click="processInvoice"
              class="
              px-5
              py-3
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
      <!-- End process invoice Section -->

      <div class="py-8 px-5 bg-white my-5">
        <p class="font-bold text-dark-optima-color text-lg">Search & Filter</p>
        <div class="mt-5 flex items-center">
          <div class="w-1/3 mr-8">
            <s-combo-box />
          </div>

          <div class="w-1/5 mr-5">
            <select class="py-2 px-2 border-2 border-gray-400 w-full rounded">
              <option value disabled selected>Filter by Customer</option>

              <option
                v-for="network in allContact"
                :value="network.name"
                :key="network.id"
              >
                {{ network.name }}
              </option>
            </select>
          </div>

          <div class="w-1/5">
            <select class="py-2 px-2 border-2 border-gray-400 w-full rounded">
              <option value disabled selected>Filter by Status</option>
              <option value="all">draft</option>
              <option value="sent">Sent</option>
              <option value="service">Unpaid</option>
              <option value="service">Paid</option>
              <option value="service">Overdue</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <drop-down>
            <div slot="title">
              <button
                type="button"
                class="
                hover:text-white
                inline-flex
                items-center
                border-0
                py-3
                px-5
                mr-2
                cursor-pointer
                bg-cloudenly-primary-main
                rounded-full
                text-white
              "
              >
                <span class="mr-3 text-white">Create Invoice</span>
                <feather-icon
                  icon="ChevronDownIcon"
                  svgClasses="w-6 h-6 text-white "
                ></feather-icon>
              </button>
            </div>

            <div slot="body">
              <ul class="bg-white" style="min-width: 15rem">
                <li
                  class="
                  flex
                  py-2
                  px-4
                  cursor-pointer
                  hover:bg-primary hover:text-white
                "
                  @click.prevent="routeCreateInvoice"
                >
                  <span class="ml-2">Create New</span>
                </li>
                <li
                  class="
                  flex
                  py-2
                  px-4
                  cursor-pointer
                  hover:bg-primary hover:text-white
                "
                  @click.prevent="routeSaleRFQ"
                >
                  <span class="ml-2">Sales RFQ</span>
                </li>

                <li
                  class="
                  flex
                  py-2
                  px-4
                  cursor-pointer
                  hover:bg-primary hover:text-white
                "
                  @click.prevent="routeProforma"
                >
                  <span class="ml-2">Sales Quotation</span>
                </li>

                <li
                  class="
                  flex
                  py-2
                  px-4
                  cursor-pointer
                  hover:bg-primary hover:text-white
                "
                  @click.prevent="routeSalesPurchaseOrder"
                >
                  <span class="ml-2">Sales Purchase Order</span>
                </li>
              </ul>
            </div>
          </drop-down>
        </div>
      </div>

      <div
        v-if="getIsAccOwner || getSalesInvoicePrivileges.viewInvoiceRegister"
      >
        <div class="mt-2 bg-white">
          <div v-if="getIsInvoice">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Invoice No.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Customer Name
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Validity
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    BOQ
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Amount (VAT Incl)
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Status
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Date
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <template>
                  <tr
                    class
                    v-for="(invoice, index) in getAllStandardInvoice"
                    :key="index"
                  >
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      {{ invoice.invoiceNumber }}
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      {{ invoice.customer.name }}
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      {{ invoice.validityDur }} - {{ invoice.validityType }}
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      <button
                        type="button"
                        class="
                        block
                        px-2
                        py-1
                        text-sm text-center
                        cursor-pointer
                        border-none
                        bg-cloudenly-primary-off
                        text-cloudenly-primary-main
                        rounded-lg
                      "
                        @click="viewBoqs(invoice)"
                      >
                        view
                      </button>
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      {{ invoice.invoiceTotal | currency }}
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      <span
                        v-if="invoice.status === 'draft'"
                        class="text-cloudenly-danger-main"
                        >{{ invoice.status | capitalize }}</span
                      >
                      <span
                        v-if="invoice.status === 'sent'"
                        class="text-cloudenly-primary-main"
                        >{{ invoice.status | capitalize }}</span
                      >

                      <span
                        v-if="invoice.status === 'pendingApproval'"
                        class="text-cloudenly-danger-main"
                        >{{ invoice.status | capitalize }}</span
                      >
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      {{ invoice.createdAt | date }}
                    </td>
                    <td
                      class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border border-gray-200 border-1
                    "
                    >
                      <vs-dropdown vs-custom-content vs-trigger-click>
                        <div class="text-center cursor-pointer">
                          <feather-icon
                            class="h-6 w-6"
                            icon="MoreHorizontalIcon"
                          ></feather-icon>
                        </div>

                        <vs-dropdown-menu v-if="invoice.status === 'sent'">
                          <ul style="min-width: 12rem">
                            <li
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                              @click.prevent="CreateWaybill(invoice.id)"
                            >
                              <span class="">Issue Waybill</span>
                            </li>

                            <li
                              @click="routeCreditNote(invoice.id)"
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            >
                              <span class="">Issue Credit Note</span>
                            </li>

                            <li
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                              @click="viewReceipt(invoice.id)"
                            >
                              <span class="">Preview</span>
                            </li>

                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                          >
                            <span>Export as PDF</span>
                          </li> -->
                            <!-- 
                          <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                          >
                            <span>Print</span>
                          </li> -->

                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="openClosedModal(invoice.id)"
                          >
                            <span class="">Delete</span>
                          </li> -->
                          </ul>
                        </vs-dropdown-menu>

                        <vs-dropdown-menu v-else>
                          <ul style="min-width: 12rem">
                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click="viewReceipt(invoice.id)"
                          >
                            <span>Preview</span> 
                          </li> -->
                            <li
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                              @click.prevent="routeEditInvoice(invoice.id)"
                            >
                              <span class="">Edit Invoice</span>
                            </li>

                            <li
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                              @click.prevent="openProcessModal(invoice.id)"
                            >
                              <span class="">Process</span>
                            </li>

                            <li
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                              @click.prevent="CreateWaybill(invoice.id)"
                            >
                              <span>Issue Waybill</span>
                            </li>

                            <li
                              @click="routeCreditNote(invoice.id)"
                              class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            >
                              <span class="">Issue Credit Note</span>
                            </li>

                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                          >
                            <span class="">Export as PDF</span>
                          </li> -->

                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                          >
                            <span class="">Print</span>
                          </li> -->

                            <!-- <li
                            class="
                              flex
                              py-3
                              px-2
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="openClosedModal(invoice.id)"
                          >
                            <span class="">Delete</span>
                          </li> -->
                          </ul>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div v-else>
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Customer Name
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Phone No.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Validity
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    BOQ
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Amount (VAT Incl)
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Status
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Date
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

            <div
            >
              <div class="p-5">
                <div class="p-5">
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div
                    class="text-cloudenly-primary-main text-lg font-bold mb-5 "
                  >
                    There are no Material Request at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates a Material Request or submits a
                    form /
                    <br />
                    document, they show up here
                  </div>
                  <div
                    class="mt-10 bg-cloudenly-primary-main 
                        px-8
                        py-4
                        text-white text-center
                        cursor-pointer
                        rounded-full
                        w-2/4"
                    @click="routeCreateInvoice"
                  >
                    Create new
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

          <!-- Pagination section -->
          <div
            class="
            p-2
            px-3
            pb-8
            pt-8
            flex
            items-center
            flex-wrap flex-row
            justify-between
          "
          >
            <div class="flex items-center">
              <p class="mr-2">Show :</p>
              <select name class="py-1 mr-2 border-1 border-gray-400" id>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p>Per Page</p>
            </div>

            <div class="flex items-center">
              <p class="mr-2">Show</p>
              <select name class="py-1 mr-2 border-1 border-gray-400" id>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p>Per Page</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import InvoiceAnalysis from "../invoiceAnalysis";

export default {
 components: {
    InvoiceAnalysis,
    
  },
  data() {
    return {
      modal: false,
      search: "",
      status: "",
      boqsDetails: [],

      processModal: false,
      deleteModal: false,

      deleteButton: false,
      processButton: false,
      filterData: {
        orgId: this.$store.state.auth.auth.authData.orgId,
        outletId: "",
        functionId: "",
        creatorId: "",
        status: ""
      }
    };
  },

  methods: {
    routeCreateInvoice() {
      this.$router.push({
        name: "CreateInvoice"
      });
    },

    routeCreditNote(val) {
      this.$router.push({
        name: "CreateInvoiceCreditNote",
        params: {
          id: val
        }
      });
    },

    routeSaleRFQ() {
      if (
        this.getIsAccOwner ||
        this.getSalesInvoicePrivileges.createInvoice === true
      ) {
        this.$router.push({
          name: "SalesRequisition"
        });
      } else {
        this.$vs.notify({
          title: "Invoice ",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val
        },
        query: {
          type: "invoice",
          category: "sales"
        }
      });
    },

    routeProforma() {
      if (
        this.getIsAccOwner ||
        this.getSalesInvoicePrivileges.createInvoice === true
      ) {
        this.$router.push({
          name: "ProformaQuote"
        });
      } else {
        this.$vs.notify({
          title: "Invoice ",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    routeSalesPurchaseOrder() {
      if (
        this.getIsAccOwner ||
        this.getSalesInvoicePrivileges.createInvoice === true
      ) {
        this.$router.push({
          name: "SalesPurchaseOrder"
        });
      } else {
        this.$vs.notify({
          title: "Invoice ",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    CreateWaybill(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesInvoicePrivileges.generateWaybill === true
      ) {
        this.$router.push({
          name: "generateWaybill",
          query: {
            module: "invoice"
          },
          params: {
            id: val
          }
        });
      } else {
        this.$vs.notify({
          title: "Invoice ",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    createCreditNote(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesInvoicePrivileges.generateCreditNote === true
      ) {
        this.$router.push({
          name: "CreateInvoiceCreditNote",
          params: {
            id: val
          }
        });
      } else {
        this.$vs.notify({
          title: "Invoice ",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    routeEditInvoice(val) {
      this.$router.push({
        name: "EditInvoice",
        params: {
          id: val
        }
      });
    },

    viewBoqs(val) {
      this.modal = true;
      this.boqsDetails = val.invoiceBoqs;
    },

    openClosedModal(val) {
      this.invoiceId = val;
      this.deleteModal = true;
    },

    closedInvoice() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          invoiceIds: [this.invoiceId]
        }
      };
      this.$store
        .dispatch("sales/Invoice/closeInvoice", data)
        .then(resp => {
          this.deleteButton = false;
          (this.deleteModal = false),
            this.$vs.notify({
              title: "Invoice ",
              text: resp.data.message,
              color: "primary",
              position: "top-right"
            });
          // console.log(resp);
        })
        .catch(err => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Invoice ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    openProcessModal(val) {
      this.invoiceId = val;
      this.processModal = true;
    },

    processInvoice() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          invoiceId: this.invoiceId,
          manualApproval: {
            isManualApproval: false,
            scellooId: ""
          }
        }
      };

      this.$store
        .dispatch("sales/Invoice/sendInvoice", data)
        .then(resp => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Invoice",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          console.log(err);
          this.processButton = false;
          this.$vs.notify({
            title: "Invoice",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  },

  computed: {
    ...mapGetters("sales/Invoice", ["allInvoice", "getIsInvoice"]),
    ...mapGetters("crm/contact", ["allContact", "allLoyalty", "getIsCustomer"]),
    getAllStandardInvoice() {
      return this.allInvoice.filter(resp => {
        return resp.recurringInvoice == false;
      });
    },
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesInvoicePrivileges"])
  },

  mounted() {
    this.$store.dispatch("sales/Invoice/getAllInvoice", this.filterData);
    this.$store.dispatch("crm/contact/getAllContact");
  }
};
</script>

<style></style>
