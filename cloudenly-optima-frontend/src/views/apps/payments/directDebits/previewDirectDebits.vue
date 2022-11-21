<template>
  <div>
    <back location="Supplier List" class="mb-10 font-normal" />
    <section
      class="grid grid-cols-12 col-gap-3 font-normal"
      style="font-size: 14px;"
    >
      <div
        class="bg-white col-span-12 border-dashed border-b-2 border-light-blue-500 px-6 pt-6 pb-3 rounded"
      >
        <div class="flex justify-between">
          <h2 class="text-primary-optima-color font-semibold capitalize">
            Transaction Details
          </h2>
          <div class="flex text-primary-optima-color font-semibold  capitalize">
            <p class="px-2 text-green-400">Success 2/3</p>
            <p class="px-2 text-danger">Failed 1/3</p>
          </div>
        </div>
      </div>

      <!-- Account analysis -->
      <div class="bg-white col-span-4 px-6 pb-6 pt-2 rounded">
        <slot>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Transaction Date:</h3>

            <p class="font-medium">
              07 - 12 - 2020
            </p>
          </div>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Paystack Ref. #:</h3>

            <p class="font-medium">
              13234648911561651564
            </p>
          </div>
        </slot>
      </div>

      <!--Direct Debit Status analysis -->
      <div class="bg-white col-span-4 px-6 pb-6 pt-2 rounded">
        <slot>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Pay Description:</h3>

            <p class="font-medium">
              12 KG Gas cylinders x2
            </p>
          </div>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Pay Batch #:</h3>

            <p class="font-medium">
              110
            </p>
          </div>
        </slot>
      </div>

      <div class="bg-white col-span-4 px-6 pb-6 pt-2 rounded">
        <slot>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Total Payment Amount:</h3>

            <p class="font-medium">
              ₦ 369,990.05
            </p>
          </div>
          <div class="flex justify-between mt-4 mb-5">
            <h3>Total Direct Debit Amount:</h3>

            <p class="font-medium">
              ₦ 372,090.05
            </p>
          </div>
        </slot>
      </div>
    </section>
    <searchComponent />
    <tableComponent :headers="headers" :items="items" :view="view" />
  </div>
</template>

<script>
import searchComponent from "../components/searchComponent";
import tableComponent from "../components/tableComponent";
// import { mapGetters } from "vuex";
// import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from "./analysisData";

export default {
  components: {
    searchComponent,
    tableComponent,
  },

  data() {
    return {
      view: "View Invoice",
      // item: "cloundely acccount",
      // status: "direct debit status",
      // type: "Payments",
      // accounts: [
      //   {
      //     title: "Account",
      //     value: "Kashkap Nigeria",
      //     color: "text-primary-optima-color",
      //   },
      //   {
      //     title: "Account ID",
      //     value: "KN-198UJ-XXL",
      //     color: "text-primary-optima-color",
      //   },
      // ],
      // statusItem: [
      //   {
      //     title: "success",
      //     value: "5 Successful",
      //     color: "text-tetiary-optima-color",
      //   },
      //   {
      //     title: "failure",
      //     value: "1 failed",
      //     color: "text-danger-optima-color",
      //   },
      // ],
      // types: [
      //   {
      //     title: "invoices",
      //     value: "3",
      //     //   color: "text-tetiary-optima-color",
      //   },
      //   {
      //     title: "total Amount",
      //     value: "₦ 18,157,500.85",
      //     //   color: "text-danger-optima-color",
      //   },
      // ],
      headers: [
        { text: "Supplier Name", value: "supplierName" },
        { text: "Supplier ID", value: "supplierID" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Invoice Ref. #", value: "invoiceRef" },
        { text: "Invoice Description", value: "invoiceDescription" },
        { text: "Invoice Amount", value: "invoiceAmount" },
        { text: "Status", value: "status" },
        { text: "Settlement Date", value: "settlementDate" },
        { text: "Session ID", value: "sessionID" },
        { text: "Actions", value: "id" },
      ],
      items: [
        {
          supplierName: "Dangote Cement",
          supplierID: "DC-1209089XX",
          email: "info@dangote.cement",
          phone: "08055803226",
          invoiceRef: "154265326598645646",
          invoiceDescription: "Paper back utilities, 800 KG",
          invoiceAmount: "₦ 152,000.00",
          status: "Success",
          settlementDate: "12 - 12 - 2020",
          sessionID: "SS-09089",
          id: "1",
        },
        {
          supplierName: "Dangote Cement",
          supplierID: "DC-1209089XX",
          email: "info@dangote.cement",
          phone: "08055803226",
          invoiceRef: "154265326598645646",
          invoiceDescription: "Paper back utilities, 800 KG",
          invoiceAmount: "₦ 152,000.00",
          status: "Success",
          settlementDate: "12 - 12 - 2020",
          sessionID: "SS-09089",
          id: "2",
        },
        {
          supplierName: "Dangote Cement",
          supplierID: "DC-1209089XX",
          email: "info@dangote.cement",
          phone: "08055803226",
          invoiceRef: "154265326598645646",
          invoiceDescription: "Paper back utilities, 800 KG",
          invoiceAmount: "₦ 152,000.00",
          status: "Success",
          settlementDate: "12 - 12 - 2020",
          sessionID: "SS-09089",
          id: "3",
        },
      ],
    };
  },

  computed: {
    // ...mapGetters("catalogue", ["getCatalogAnalysisData"]),
  },
  mounted() {
    // this.$store.dispatch("catalogue/getCatalogueAnalyticsData");
  },
};
</script>
