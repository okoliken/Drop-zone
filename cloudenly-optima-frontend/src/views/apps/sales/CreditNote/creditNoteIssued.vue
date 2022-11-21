<template>
  <div class>
    <div class="pt-10 px-8 bg-white">
      <p class="text-xl font-bold">Filter</p>
      <div class="flex mt-8">
        <div class="w-1/5 mr-5">
          <div class="mb-3">
            <label for="date" class="font-semibold">Date Issued:</label>
          </div>
  
          <div class="flex items-center">
            <span class="border border-gray-400 py-2 px-3">
              <svg
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="date-icon"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.8 3.2H3.2v-.8H1.6v2.4h12.8V2.4h-1.6v.8h-1.6v-.8H4.8v.8zm9.6 3.2H1.6v8h12.8v-8zM11.2.8H4.8V0H3.2v.8H1.6C.7.8 0 1.5 0 2.4v12c0 .9.7 1.6 1.6 1.6h12.8c.9 0 1.6-.7 1.6-1.6v-12c0-.9-.7-1.6-1.6-1.6h-1.6V0h-1.6v.8zM5.6 9.6H4V8h1.6v1.6zm1.6 0h1.6V8H7.2v1.6zm4.8 0h-1.6V8H12v1.6zm-8 3.2h1.6v-1.6H4v1.6zm4.8 0H7.2v-1.6h1.6v1.6z"
                  fill="#070707"
                />
              </svg>
            </span>
            <datepicker 
              
            ></datepicker>
          </div>
        </div>

        <div class="w-1/5 mt-6 ml-10">
          <div class="relative">
          <select name="" id="" class="select">
            <option selected>Issued To:</option>
          </select>
        </div>
        </div>

  

        <div class="w-1/5 mt-6 ml-10">
          <div class="relative  ml-3">
          <select name="" id="" class="select">
            <option selected>Status:</option>
          </select>
        </div>
        </div>
      </div>
    </div>

    
    <div class="pt-8 px-5 bg-white flex items-center justify-between">
      <div class="w-1/3">
      <s-combo-box  />
      </div>

      <div>
        <drop-down>
          <div slot="title">
            <button
              class="inline-flex items-center py-3 px-5 rounded-full bg-primary-optima-color text-white"
            >
              <span class="mr-2"> Issue Credit Note</span>
              <feather-icon
                icon="ChevronDownIcon"
                svgClasses="h-6 w-6 "
              ></feather-icon>
            </button>
          </div>
          <div slot="body">
            <div class="rounded-md bg-white w-48 shadow-xs text-center py-2">
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  @click.prevent="routeInvoice"
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-blue-700 hover:bg-gray-100 hover:text-blue-900 focus:outline-none focus:bg-gray-100 focus:text-blue-900"
                  role="menuitem"
                >
                  Sales Invoice</a
                >

                <a
                  @click.prevent="routeWaybill"
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-blue-700 hover:bg-gray-100 hover:text-blue-900 focus:outline-none focus:bg-gray-100 focus:text-blue-900"
                  role="menuitem"
                  >Waybill Issued</a
                >
              </div>
            </div>
          </div>
        </drop-down>
      </div>
    </div>

    <div class="pt-8 bg-white">
      <table class="table pt-8 min-w-full">
        <thead>
          <tr>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              #
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Issued To
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Note Id
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Date Issued
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              State
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Amount Due (₦)
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              BOQ
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Refund (₦)
            </th>
            <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
              Outstanding (₦)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(credit, index) in getCreditNote" :key="index">
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
              <span class="text-primary"> </span>
            </td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
            <td
              class="px-6 py-3 whitespace-no-wrap border border-gray-200"
            ></td>
          </tr>

          <tr class="">
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100">Total</td>
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100"></td>
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100"></td>
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100"></td>
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100"></td>
            <td
              class="px-6 py-3 whitespace-no-wrap bg-gray-100 border border-gray-200 font-bold text-cloudenly-primary-main"
            >
              {{ getCreditNoteAnalysis.totalAmount | currency }}
            </td>
            <td class="px-6 py-3 whitespace-no-wrap bg-gray-100"></td>
            <td
              class="px-6 py-3 whitespace-no-wrap bg-gray-100 border border-gray-200 font-bold text-cloudenly-primary-main"
            >
              {{ getCreditNoteAnalysis.totalAmountRefunded | currency }}
            </td>
            <td
              class="px-6 py-3 whitespace-no-wrap bg-gray-100 border border-gray-200 font-bold text-cloudenly-primary-main"
            >
              {{ getCreditNoteAnalysis.totalAmountOutstanding | currency }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination section -->
    <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
      <div class="flex items-center">
        <p class="mr-2">Show :</p>
        <select name class="py-1 mr-2" id>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p>Per Page</p>
      </div>

      <div class="flex items-center">
        <p class="mr-2">Show</p>
        <select name class="py-1 mr-2" id>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p>Per Page</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker,
  },

  methods: {
    routeCreditNote() {
      this.$router.push({
        name: "CreateCreditNote",
      });
    },
    routeInvoice() {
      this.$router.push({
        name: "Invoice",
      });
    },

    routeWaybill() {
      this.$router.push({
        name: "Waybill",
      });
    },
  },

  computed: {
    ...mapGetters("sales/CreditNote", [
      "getCreditNoteAnalysis",
      "getCreditNote",
    ]),
  },

  mounted() {
    this.$store.dispatch("sales/CreditNote/getAllCreditNote");

    this.$store.dispatch("sales/CreditNote/getCreditNoteAnalytics");
  },
};
</script>

<style scoped>
.select{
  width: 250px !important;
  height:32px !important;
  border:0.5px solid  !important ;
  border-color: #CCCCCC !important;
  border-radius: 4px;
}

.date-icon{
  position: absolute;
  margin-top: -8px;
}


</style>>

