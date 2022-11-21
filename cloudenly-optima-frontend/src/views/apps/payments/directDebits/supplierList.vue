<template>
  <div>
    <div class="mb-8 flex" style="font-size: 14px">
      <h1>Supplier List</h1>
      <p class="ml-6">... / Payments / Direct Debits  / Supplier List</p>
    </div>
    <div class="bg-white  py-8 px-4">
      <div class="flex justify-between">
        <div class="text-lg text-primary-optima-color">
          Transaction Details
        </div>
        <div class="mr-6 flex">
          <div
            class=" border-r-2 mx-2 border-gray-400 border-l-0 border-t-0 border-b-0"
          >
            <span class="text-green-400">Success </span> 2/3
          </div>
          <div><span class="text-red-400"> Failed </span> 1/3</div>
        </div>
      </div>
      <svg
      class="mt-4"
        width="1082"
        height="1"
        viewBox="0 0 1082 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="-2.18557e-08"
          y1="0.750122"
          x2="1082"
          y2="0.750027"
          stroke="#9BA0A7"
          stroke-width="0.5"
          stroke-dasharray="10 5"
        />
      </svg>
      <div class="w-full flex mt-8 justify-between">
        <div class="">
          <div class="flex ">
          <div class="text-lg">Transaction Date:</div>
          <div class="ml-6 mr-3">07 - 12 - 2020</div>
        </div>
        <div class="flex mt-8">
          <div class="text-lg">Paystack Ref. #:</div>
          <div class="ml-6">13234648911561651564</div>
        </div>
        </div>
        <div class="">
          <div class="flex ">
          <div class="text-lg text-center">Pay Description:</div>
          <div class="ml-6 mr-3">12 KG Gas cylinders x2</div>
        </div>
        <div class="flex mt-8">
          <div class="text-lg">Batch Count #:</div>
          <div class="ml-6">110</div>
        </div>
        </div>
       <div class="">
          <div class="flex ">
          <div class="text-lg">Total Payment Amount:</div>
          <div class="ml-6 mr-3">₦ 369,990.05</div>
        </div>
        <div class="flex mt-8">
          <div class="text-lg">Total Direct Debit Amount:</div>
          <div class="ml-6">₦ 372,090.05</div>
        </div>
        </div>
      </div>
    </div>

    <searchComponent />
    <div>
      <s-table :headers="headers" :items="items" :view="view">
        <div slot="title">
          <p class=" text-xl font-bold">Direct Debit</p>
        </div>

        <div slot="body">
          <p class="">No direct debit payment listed</p>
        </div>

        <template v-slot:item="{ item }">
          <button
            @click="
              $router.push({
                name: 'Collection',
                params: { id: item.data.id },
              })
            "
            v-if="item.transDate"
          >
            {{ item.data.id }}
          </button>

          <div v-else-if="item.id">
            <drop-down>
              <div slot="title">
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>
              </div>

              <div class="py-2 px-2 bg-white shadow-sm" slot="body">
                <ul class="w-auto">
                  <li
                    class="
                    flex
                    py-2
                    px-4
                    rounded-sm
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  >
                    View Invoice
                  </li>
                  <li
                    class="
                    flex
                    py-2
                    px-4
                    rounded-sm
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  >
                    Re-Initiate Transaction
                  </li>
                </ul>
              </div>
            </drop-down>
          </div>
        </template>
      </s-table>
    </div>
  </div>
</template>

<script>
import searchComponent from "../components/searchComponent";
import tableComponent from "../components/tableComponent";
export default {
  components: {
    tableComponent,
    searchComponent,
  },

  data() {
    return {
      view: "view Supplier",
      item: "cloundely acccount",
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
        { text: "Supplier's Name", value: "name" },
        { text: "Supplier ID", value: "paymentRef" },
        { text: "Account Number", value: "number" },
        { text: "Phone", value: "pnumber" },
        { text: "Invoice Ref. #", value: "totalInvoiceAmount" },

        { text: "Actions", value: "id" },
      ],
      items: [
        {
          name: "Dangote Cementinfo@dangote",
          paymentRef: "154265326598645646",
          number: "0000",
          pnumber: "112",
          totalInvoiceAmount: "₦ 7,117,500.65",
          id: "1",
        },
      ],
    };
  },
};
</script>

<style scoped>
.paid {
  color: #27ae60;
}
.unpaid {
  color: #f15846;
}
.pending {
  color: #f2c94c;
}
</style>
