<template>
  <div class="mb-3">
    <overviewTopComponent
      :item="item"
      :items="accounts"
      :status="status"
      :statusItem="statusItem"
      :type="type"
      :types="types"
    />
    <!-- <searchComponent />
    <tableComponent :headers="headers" :items="items" /> -->
  </div>
</template>

<script>
import overviewTopComponent from "../components/overviewTopComponent";
import searchComponent from "../components/searchComponent";
import tableComponent from "../components/tableComponent";
export default {
  components: {
    overviewTopComponent,
    tableComponent,
    searchComponent,
  },

  data() {
    return {
      item: "top creditor",
      status: "direct debit status",
      type: "Payments",
      accounts: [
        {
          title: "Account",
          value: "Kashkap Nigeria",
          color: "text-primary-optima-color",
        },
        {
          title: "Account ID",
          value: "KN-198UJ-XXL",
          color: "text-primary-optima-color",
        },
      ],
      statusItem: [
        {
          title: "success",
          value: "5 Successful",
          color: "text-tetiary-optima-color",
        },
        {
          title: "failure",
          value: "1 failed",
          color: "text-danger-optima-color",
        },
      ],
      types: [
        {
          title: "invoices",
          value: "3",
          //   color: "text-tetiary-optima-color",
        },
        {
          title: "total Amount",
          value: "₦ 18,157,500.85",
          //   color: "text-danger-optima-color",
        },
      ],
      headers: [
        { text: "Trans. Date", value: "transDate" },
        { text: "Payment Ref. #", value: "paymentRef" },
        { text: "Pay Description", value: "payDescription" },
        { text: "Pay Batch #", value: "payBatch" },
        { text: "Total Invoice Amount (₦)", value: "totalInvoiceAmount" },
        { text: "Direct Debit Charges", value: "directDebitCharges" },
        { text: "Settlement Charges", value: "settlementCharges" },
        { text: "Total Direct Debit Amount", value: "totalDirectDebitAmount" },
        { text: "Direct Debit Status", value: "directDebitStatus" },
        { text: "Settlement Status", value: "settlementStatus" },
        { text: "Actions", value: "id" },
      ],
      items: [
        {
          transDate: "12 - 12 - 2020",
          paymentRef: "154265326598645646",
          payDescription: "Paper back utilities, 800 KG",
          payBatch: "112",
          totalInvoiceAmount: "₦ 7,117,500.65",
          directDebitCharges: "₦ 1,500.00",
          settlementCharges: "₦ 500.00",
          totalDirectDebitAmount: "₦ 7,119,000.65",
          directDebitStatus: "Failed",
          settlementStatus: "Partial",
          id: "1",
        },
        {
          transDate: "07 - 12 - 2020",
          paymentRef: "13234648911561651564",
          payDescription: "12 KG Gas cylinders x2",
          payBatch: "110",
          totalInvoiceAmount: "₦ 369,990.05",
          directDebitCharges: "₦ 1,000.00",
          settlementCharges: "₦ 100.00",
          totalDirectDebitAmount: "₦ 371,090.05",
          directDebitStatus: "Failed",
          settlementStatus: "Failed",
          id: "2",
        },
        {
          transDate: "01 - 11 - 2020",
          paymentRef: "3261491354616849456",
          payDescription: "14 Tonnes steel pipes",
          payBatch: "85",
          totalInvoiceAmount: "₦ 9,984,500.25",
          directDebitCharges: "₦ 1,500.00",
          settlementCharges: "₦ 250.00",
          totalDirectDebitAmount: "₦ 9,986,250.25",
          directDebitStatus: "Success",
          settlementStatus: "Success",
          id: "3",
        },
      ],
    };
  },
};
</script>
