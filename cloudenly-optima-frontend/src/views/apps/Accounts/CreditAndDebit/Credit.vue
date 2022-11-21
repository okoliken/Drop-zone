<template>
  <div>
    <!-- search and filter options -->
    <div class="flex bg-white pl-6 pt-8 pb-10 mb-2">
      <!-- <div class="w-7/12 grid grid-cols-12 row-gap-8 col-gap-12 gap-10">
        <h2 class="col-span-12">Filters</h2>

        <s-text label="From:" class="col-span-6" />
        <s-text label="To:" class="col-span-6" />
        <s-text label="From:" class="col-span-6" />
        <s-text label="Transaction Type:" class="col-span-6" />

        <div class="col-span-12">
          <s-combo-box class="mt-8" />
        </div>
      </div> -->

      <!-- <div class="w-5/12 flex items-center justify-center">
        <div
          class="rounded-full flex flex-col items-center justify-center"
          style="border: 15px solid #6F8DE9;; height: 200px; width: 200px;"
        >
          <h1 class="font-semibold text-2xl mb-3">172,720</h1>
          <div class="mb-3">+3.5%</div>
          <div>Net Account Position (₦)</div>
        </div>
      </div> -->

       <s-combo-box class="mt-8" />
    </div>

    <div class="bg-white py-8 flex justify-between items-center">
        <!-- 1 -->
        <div class=" flex items-center">
          <div class="mx-3">
            <label class=" items-center ">
                <input
                  type="radio"
                  name="select1"
                  class="mr-2"
                />
           </label>
           </div>
           <div class="mr-0">
          <select name="location" class="approval-flows__options ">
            <option value="" >Default - Year to Date</option>
            <option value="">This Month</option>
            <option value="">Last Month</option>
            <option value="" selected>Last 3 Months</option>
            <option value="">Last 6 Months</option>
            <option value="">Last 9 Months</option>
            <option value="">Last 12 Months</option>
            <option value="">Last 18 Months</option>
            <option value="">This Year</option>
            <option value="">Last Year</option>
          </select>
        </div>
        <div class="mx-3">
            <label class=" items-center ">
                <input
                  type="radio"
                  name="select1"
                  class="mr-2"
                />
           </label>
           </div>
           <div class=" items-center mr-0">
              <div class="mx-3 text-black">From:</div>  
        </div>
          <s-text :width="220" type="date" />
        
           <div class=" items-center mr-0">
              <div class="mx-3 text-black">To:</div>  
         
        </div>
          <select name="location" class="approval-flows__options ">
            <option value="" selected>--Transaction Type--</option>
            <option value="">One</option>
            <option value="">Two</option>
            <option value="">Three</option>
          </select>
        
        </div>
        
      </div>

    <div id="div-with-loading" class="vs-con-loading__container mt-4 bg-white">
      <s-table :headers="headers" :items="[]">
        <div slot="title">
          <p class="text-xl font-bold">Credit</p>
        </div>
        <div slot="body">
          <p>Everything related to credit appears here....</p>
        </div>
      </s-table>
    </div>
  </div>
</template>

<script>
import EmptyState from "@/components/EmptyState.vue";
export default {
  name: "CreditAccount",
  components: {
    EmptyState,
  },
  data() {
    return {
      headers: [
        { text: "Transaction Type" },
        { text: "Debtors" },
        { text: "Transaction Date" },
        { text: "Transaction ID" },
        { text: "Transaction Amount (₦)" },
        { text: "Receipts to Date (₦)" },
        { text: "Outstanding Amount (₦)" },
      ],

      items: [
        {
          transactionType: "Account Receivable",
          from: "Intel Plus",
          transactionDate: "12 - 01 - 2020",
          transactionId: "INTEL12012020",
          amount: "201,200",
          receipts: "154,000",
          outstanding: "47,200",
        },
      ],
    };
  },
};
</script>

<style scoped>
.approval-flows__options{ 
    border: 1px solid #ccc;
		border-radius: 5px;
		height: 32px;
		width: 200px;
}
.input-border{
    border: 1px solid #ccc;
    height: 32px;
		width: 200px;
    border-radius: 5px;
}
</style>
