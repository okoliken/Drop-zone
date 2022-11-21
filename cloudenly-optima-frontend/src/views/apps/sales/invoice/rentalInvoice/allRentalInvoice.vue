<template>
  <div>
    <!-- View BOQ -->
    <vs-popup :active.sync="modal" title=" sales Boqs Details">
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">type</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">quantity</th>
              <th class="py-3 text-center">Unit Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 text-center">{{ boq.name }}</td>
              <td class="py-3 text-center">{{ boq.itemClass }}</td>
              <td class="py-3 text-center">{{ boq.unitOfMeasure }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantity }}</td>
              <td class="py-3 text-center">{{ boq.unitPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>
    <!-- End View Boq Section -->

    <!-- delete quotation -->
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
              border-1 border-solid
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
                'bg-cloudenly-primary-mid': deleteButton,
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
              Close
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

    <!-- delete quotation -->

    <!-- process request -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Sales Invoice"
    >
      <div class="container">
        <div
          class="
            p-5
            border-1 border-solid
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
              'bg-cloudenly-primary-mid': processButton,
            }"
            @click="processInvoice"
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

    <div class="py-8 px-5 bg-white">
      <p class="font-bold text-dark-optima-color text-lg">Filter & Search</p>
      <div class="mt-5 flex items-center">
        <div class="w-1/3 mr-8">
          <s-combo-box />
        </div>

        <div class="w-1/5 mr-5">
          <select
            v-model="search"
            class="py-2 px-2 border-1 border-gray-400 w-full rounded"
          >
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
          <select
            v-model="status"
            class="py-2 px-2 border-1 border-gray-400 w-full rounded"
          >
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
        <button
          type="button"
          @click="routeCreateRentalInvoice"
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
        </button>
      </div>
    </div>
    <div v-if="getIsAccOwner || getSalesInvoicePrivileges.viewInvoiceRegister">
      <div class="mt-2 bg-white">
        <div v-if="getIsRentalInvoice">
          <table
            class="table table-auto table-responsive w-full border-collapse"
          >
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NAME
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
                <tr v-for="(invoice, index) in getRentalInvoice" :key="index">
                  <td
                    class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border-1 border-gray-200
                    "
                  >
                    {{ invoice.customer.name }}
                  </td>

                  <td
                    class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border-1 border-gray-200
                    "
                  >
                    {{ invoice.validityDur }} - {{ invoice.validityType }}
                  </td>
                  <td
                    class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border-1 border-gray-200
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
                      border-1 border-gray-200
                    "
                  >
                    {{ invoice.invoiceTotal | currency }}
                  </td>
                  <td
                    class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border-1 border-gray-200
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
                      border-1 border-gray-200
                    "
                  >
                    {{ invoice.createdAt | date }}
                  </td>
                  <td
                    class="
                      px-6
                      py-3
                      whitespace-no-wrap
                      border-1 border-gray-200
                    "
                  >
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul
                          v-if="invoice.status === 'sent'"
                          style="min-width: 12rem"
                        >
                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="routeCreateInvoice"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span >Preview</span>
                        </li> -->
                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="routeEditInvoice(invoice.id)"
                        >
                          
                          <span >Edit Invoice</span>
                        </li> -->

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="emailInvoice(invoice)"
                        >
                          
                          <span >Process</span>
                        </li> -->

                          <li
                            class="
                              flex
                              py-2
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click.prevent="CreateWaybill(invoice.id)"
                          >
                            <span>Generate Waybill</span>
                          </li>

                          <li
                            class="
                              flex
                              py-2
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                          >
                            <span>Issue Credit Note</span>
                          </li>

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          
                          <span >Export as PDF</span>
                        </li> -->

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          
                          <span >Print</span>
                        </li> -->

                          <!-- <li
                            class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openClosedModal(invoice.id)"
                          >
                            <span>Closed</span>
                          </li> -->
                        </ul>

                        <ul
                          v-if="invoice.status === 'draft'"
                          style="min-width: 12rem"
                        >
                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="routeCreateInvoice"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span >Preview</span>
                        </li> -->

                          <li
                            class="
                              flex
                              py-2
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click.prevent="routeEditInvoice(invoice.id)"
                          >
                            <span>Edit Invoice</span>
                          </li>

                          <li
                            class="
                              flex
                              py-2
                              px-2
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click.prevent="openProcessModal(invoice.id)"
                          >
                            <span>Process</span>
                          </li>

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="CreateWaybill(invoice.id)"
                        >
                         
                          <span >Generate Waybill</span>
                        </li> -->

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          
                          <span >Issue Credit Note</span>
                        </li> -->

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          
                          <span >Export as PDF</span>
                        </li> -->

                          <!-- <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          
                          <span >Print</span>
                        </li> -->
                          <!-- 
                          <li
                            class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openClosedModal(invoice.id)"
                          >
                            <span>Closed</span>
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
          <table
            class="table table-auto table-responsive w-full border-collapse"
          >
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NAME
                </th>
                <!-- <th class=" py-4 px-6 tracking-wider text-dark-optima-color "> INVOICE NO</th> -->
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  PHONE NO.
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
            class="
              mt-3
              bg-white
              border-solid
              border-t-0
              border-r-0
              border-b-0
              border-cloudenly-danger-main
              rounded
              border-4
              shadow
              mb-2
            "
          >
            <div class="p-5">
              <div class>
                <h3 class="m-0">
                  You have not create any invoice yet...
                  <span
                    @click="routeCreateRentalInvoice"
                    class="text-cloudenly-primary-main cursor-pointer pl-1"
                    >Click here to create one..</span
                  >
                </h3>
                <p class="text-cloudenly-primary-main cursor-pointer">
                  Learn more here...
                </p>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: false,
      search: "",
      boqsDetails: [],
      status: "",
      processModal: false,
      deleteModal: false,

      deleteButton: false,
      processButton: false,
    };
  },

  methods: {
    routeCreateRentalInvoice() {
      this.$router.push({
        name: "CrudRentalInvoice",
      });
    },

    routeSaleRFQ() {
      this.$router.push({
        name: "SalesRequisition",
      });
    },
    routeProforma() {
      this.$router.push({
        name: "ProformaQuote",
      });
    },

    routeSalesPurchaseOrder() {
      this.$router.push({
        name: "SalesOrder",
      });
    },

    CreateWaybill(val) {
      this.$router.push({
        name: "CreateWaybill",
        params: {
          id: val,
        },
      });
    },

    createCreditNote(val) {
      this.$router.push({
        name: "CreateInvoiceCreditNote",
        params: {
          id: val,
        },
      });
    },
    routeEditInvoice(val) {
      this.$router.push({
        name: "EditRentalInvoice",
        params: {
          id: val,
        },
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
          invoiceIds: [this.invoiceId],
        },
      };
      this.$store
        .dispatch("sales/Invoice/closeInvoice", data)
        .then((resp) => {
          this.deleteButton = false;
          (this.deleteModal = false),
            this.$vs.notify({
              title: "Invoice ",
              text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
          // console.log(resp);
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Invoice ",
            text: "Invoice Error",
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
    },

    openProcessModal(val) {
      (this.invoiceId = val), (this.processModal = true);
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
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("sales/Invoice/sendInvoice", data)
        .then((resp) => {
          console.log(resp.data);
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Invoice",
            text: "Invoice Processed",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.processButton = false;
          this.$vs.notify({
            title: "Invoice",
            text: "Invoice error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("sales/Invoice", ["getRentalInvoice", "getIsRentalInvoice"]),
    ...mapGetters("crm/contact", ["allContact", "allLoyalty", "getIsCustomer"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesInvoicePrivileges"]),
  },

  mounted() {
    this.$store.dispatch("sales/Invoice/getAllRentalInvoice");
  },
};
</script>

<style></style>
