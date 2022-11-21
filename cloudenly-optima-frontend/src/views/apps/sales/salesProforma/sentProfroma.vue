<template>
  <div class="mt-3">
    <vs-popup :active.sync="viewBoqModal" title="Sales Quotation Boqs Details">
      <div class="container">
        <table class="table table-auto table-respnsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">type</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 text-center">{{ boq.name }}</td>
              <td class="py-3 text-center">{{ boq.itemClass }}</td>
              <td class="py-3 text-center">{{ boq.unitOfMeasure }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <!-- End View Boq Section -->

    <div class="mb-3">
      <div class="flex items-center align-items-center mb-2">
        <div class="w-1/3 mr-2">
          <v-select
            v-model="search"
            placeholder="Select Customer"
            class="w-full"
          >
            <option value="" disabled selected>Filter customer</option>
          </v-select>
        </div>

        <div class="w-1/3 mr-2">
          <v-select name="" id="" class="w-full">
            <option value="" disabled selected>Filter Status</option>
            <option value="all">draft</option>
            <option value="sent">Sent</option>
            <option value="service">Unpaid</option>
            <option value="service">Paid</option>
            <option value="service">Overdue</option>
            <option value="service">Unsent</option>
          </v-select>
        </div>

        <div class="w-1/3 mr-2">
          <vs-input class="w-full" placeholder="Invoice No..." />
        </div>

        <div class="w-1/3 flex items-center justify-end">
          <div class="">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <button
                class="hover:text-white inline-flex items-center border-0 py-2 px-5 mr-2 cursor-pointer bg-cloudenly-primary-main rounded text-white"
              >
                <span class="mr-3 text-white"> Create Quote </span>
                <vs-icon
                  icon="arrow_drop_down "
                  class=""
                  size="20px text-white"
                ></vs-icon>
              </button>

              <vs-dropdown-menu>
                <ul style="min-width: 12rem">
                  <li
                    class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeCreateProforma"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Create New</span>
                  </li>

                  <li
                    class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeRFQ"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">From RFQ</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-responsive table-auto border-collapse w-full">
      <thead class="bg-grey-lighter">
        <tr>
          <th class="py-3 text-blue text-center">Customer Name</th>
          <th class="py-3 text-blue text-center">Invoice No</th>
          <th class="py-3 text-blue text-center">Phone Number</th>
          <th class="py-3 text-blue text-center">Validity</th>
          <th class="py-3 text-blue text-center">BOQ</th>
          <th class="py-3 text-blue text-center">Amount (VAT Incl)</th>
          <th class="py-3 text-blue text-center">Status</th>
          <th class="py-3 text-blue text-center">Date</th>
          <th class="py-3 text-blue text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-for="(quotation, index) in filterSentQuotation" :key="index">
            <td class="text-center">{{ quotation.customer.name }}</td>
            <td class="text-center">{{ quotation.invoiceNo }}</td>
            <td class="text-center">{{ quotation.customer.phone }}</td>
            <td class="text-center">
              {{ quotation.bidValidityDur }} {{ quotation.bidValidityType }}
            </td>
            <td class="text-center">
              <button @click="viewBoqs(quotation)" class="btn btn-xs btn-info">
                view
              </button>
            </td>
            <td class="text-center">{{ quotation.grandTotal | currency }}</td>
            <td class="text-center">
              <span class="font-semibold text-cloudenly-danger-main">{{
                quotation.status
              }}</span>
            </td>
            <td class="text-center">{{ quotation.date }}</td>
            <td class="text-center">
              <div class="dropdown ks-control">
                <a
                  class="btn btn-link ks-no-text ks-no-arrow"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="ks-icon la la-5x la-ellipsis-h"></span>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenu1"
                >
                  <a class="dropdown-item" href="#">View</a>
                  <a
                    @click.prevent="routeEditInvoice(quotation.hash)"
                    class="dropdown-item"
                    href="#"
                    >Edit</a
                  >
                  <a
                    @click.prevent="emailInvoice(quotation)"
                    class="dropdown-item"
                    href="#"
                  >
                    Send
                  </a>
                  <a
                    @click.prevent="generateInvoice(quotation)"
                    class="dropdown-item"
                    href="#"
                  >
                    Generate Invoice</a
                  >
                  <a
                    @click.prevent="issueWaybill(quotation.hash)"
                    class="dropdown-item"
                    href="#"
                  >
                    Issue Waybill</a
                  >
                  <a class="dropdown-item" href="#"> Export as PDF</a>
                  <a class="dropdown-item" href="#"> Print</a>
                  <a class="dropdown-item" href="#"> Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      search: "",
      viewBoqModal: false,
      boqsDetails: [],
      settings: {},
    };
  },

  methods: {
    routeCreateProforma() {
      this.$router.push({
        name: "CreateProforma",
      });
    },

    routeRFQ() {
      this.$router.push({
        name: "SalesRequisition",
      });
    },

    viewBoqs(val) {
      this.viewBoqModal = true;
      this.boqsDetails = val.quoteBoqs;
    },

    editQuotation(val) {
      this.$router.push({
        name: "EditProforma",
        params: {
          id: val,
        },
      });
    },

    generateInvoice(val) {
      this.$router.push({
        name: "GenrateInvoiceQuotation",
        params: {
          id: val,
        },
      });
    },

    processQuote(val) {
      console.log(val);
      // const data = {
      //     title: val.description,
      //     business: val.business,
      //     total: val.grandTotal,
      //     invoiceHash: val.hash
      // }
    },

    issueWaybill(val) {
      console.log(val);
    },

    openCloseQuotation(val) {
      console.log(val);
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: " Quotation",
        text: "Close Quotation",
        // accept: this.closedQuotation(val)
        acceptText: "Closed",
      });
    },

    closedQuotation() {},

    openProcessQuotation(val) {
      console.log(val);
      this.$vs.dialog({
        type: "confirm",
        color: "primary",
        title: "Process Quotation",
        text: "This Quotation may undergo Approval Process",
        // accept: this.processQuotation(val),
        acceptText: "Process",
      });
    },

    processQuotation(val) {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          quoteId: val,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("sales/Quotation/sendQuotation", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Quotation",
            text: "Quotation Processed",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Quotation",
            text: "quotation error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("sales/Quotation", ["getIsQuotation", "allQuotatation"]),

    filterSentQuotation() {
      return this.allQuotatation.filter((resp) => {
        return resp.status === "sent";
      });
    },
  },

  mounted() {
    this.$store.dispatch("sales/Quotation/getAllQuotation");
  },
};
</script>

<style>
</style>
