<template>
  <div class="">
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

    <div v-if="getIsOthersInvoice">
      <div class="flex items-center align-items-center mb-3">
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
          <v-select placeholder="Filter Status" name="" id="" class="w-full">
          </v-select>
        </div>

        <div class="w-1/3 mr-2">
          <vs-input class="w-full" placeholder="Invoice No..." />
        </div>

        <div class="w-1/3">
          <!-- <section class="flex justify-end mb-2 mr-2">
                        <button class=" border-none px-3 rounded-sm  bg-cloudenly-primary-main py-2 text-white cursor-pointer"
                            @click="routeCrudRentalInvoice" type="button">Create Rental Invoice</button>
                    </section> -->
        </div>
      </div>

      <table
        class="table table-auto table-responsive  border-collapse w-full"
      >
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-4">CUSTOMER NAME</th>
            <th class="py-4">INVOICE</th>
            <th class="py-4">PHONE NO.</th>
            <th class="py-4">VALIDITY</th>
            <th class="py-4">BOQ</th>
            <th class="py-4">AMOUNT (VAT Incl)</th>
            <th class="py-4">STATUS</th>
            <th class="py-4">DATE</th>
            <th class="py-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr v-for="(invoice, index) in getOthersInvoice" :key="index">
              <td class="">{{ invoice.customer.name }}</td>
              <td class="">{{ invoice.invoiceNo }}</td>
              <td class="">{{ invoice.customer.phone }}</td>
              <td class="">
                {{ invoice.bidValidityDur }} {{ invoice.bidValidityType }}
              </td>
              <td class="">
                <button
                  type="button"
                  class="block px-2 py-1 text-sm text-center cursor-pointer border-none bg-cloudenly-primary-off text-cloudenly-primary-main rounded-lg"
                  @click="viewBoqs(invoice)"
                >
                  view
                </button>
              </td>
              <td class="">{{ invoice.grandTotal | currency }}</td>
              <td class="">{{ invoice.status }}</td>
              <td class="">{{ invoice.createdAt | date }}</td>
              <td class="">
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                  <vs-dropdown-menu>
                    <ul style="min-width: 12rem">
                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="routeCreateInvoice"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Preview</span>
                      </li>
                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="routeEditInvoice(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Edit Invoice</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="emailInvoice(invoice)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Send as Email</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="CreateWaybill(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Generate Waybill</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="createCreditNote(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Issue Credit Note</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="createCreditNote(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Export as PDF</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="createCreditNote(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Print</span>
                      </li>

                      <li
                        class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="createCreditNote(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        >
                        </feather-icon>
                        <span class="ml-2">Closed</span>
                      </li>
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
      <div class="flex items-center align-items-center mb-3">
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
          <v-select placeholder="Filter Status" name="" id="" class="w-full">
          </v-select>
        </div>

        <div class="w-1/3 mr-2">
          <vs-input class="w-full" placeholder="Invoice No..." />
        </div>

        <div class="w-1/3">
          <!-- <section class="flex justify-end mb-2 mr-2">
                        <button class=" border-none px-3 rounded-sm  bg-cloudenly-primary-main py-2 text-white cursor-pointer"
                            @click="routeCrudRentalInvoice" type="button">Create Rental Invoice</button>
                    </section> -->
        </div>
      </div>

      <table class="table table-auto table-responsive border-collapse w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-4">CUSTOMER NAME</th>
            <th class="py-4">INVOICE</th>
            <th class="py-4">PHONE NO.</th>
            <th class="py-4">VALIDITY</th>
            <th class="py-4">BOQ</th>
            <th class="py-4">AMOUNT (VAT Incl)</th>
            <th class="py-4">STATUS</th>
            <th class="py-4">DATE</th>
            <th class="py-4">ACTION</th>
          </tr>
        </thead>
      </table>

      <div
        class="border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
      >
        <div class="p-5">
          <div class="">
            <h3 class="m-0">
              You have not receieved any Invoice yet...
              <!-- <span @click="routeCreateProforma"
                            class="text-cloudenly-primary-main cursor-pointer pl-1">Click here to create one..</span> -->
            </h3>
            <p class="text-cloudenly-primary-main cursor-pointer">
              Learn more here...
            </p>
          </div>
        </div>
      </div>
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
    };
  },

  methods: {
    routeProforma() {
      this.$router.push({ name: "ProformaList" });
    },

    routeEditInvoice(val) {
      this.$router.push({ name: "EditInvoice", params: { id: val } });
    },

    routeSaleRFQ() {
      this.$router.push({ name: "SalesRequisition" });
    },

    routeSalesPurchaseOrder() {
      this.$router.push({ name: "SalesOrder" });
    },

    CreateWaybill(val) {
      this.$router.push({ name: "CreateWaybill", params: { id: val } });
    },

    createCreditNote(val) {
      this.$router.push({
        name: "CreateInvoiceCreditNote",
        params: { id: val },
      });
    },

    viewBoqs(val) {
      this.modal = true;
      this.boqsDetails = val;
    },
  },

  computed: {
    ...mapGetters("sales/Invoice", ["getIsOthersInvoice", "getOthersInvoice"]),
  },
  mounted() {
    this.$store
      .dispatch("sales/Invoice/getOthersInvoice")

  },
};
</script>

<style>
</style>