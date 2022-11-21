<template>
  <div>
    <!-- current tab / refresh data -->
    <div class="flex py-5 px-3 mb-2 justify-between">
      <div class="text-gray-600">
        <span class="text-black text-xl font-bold mr-4">
          Credits and Debits
        </span>
        Accounts / Credits and Debits
      </div>
      <div class="has-tooltip mr-12">
        <span
          class="
            tooltip
            rounded
            shadow-lg
            p-1
            w-40
            bg-gray-100
            text-blue-700
            -mt-8
          "
          >Refresh Data</span
        >
        <img :src="refresh" alt="refresh" />
      </div>
    </div>

    <div class="flex bg-white py-5 mb-5 mt-6">
      <div class="w-1/4 mx-4">
        <div class="text-cloudenly-primary-main">Total Outstanding</div>
        <div
          class="
            border-dashed border-b-2 border-light-blue-500
            w-full
            my-4
            text-gray-400
          "
        ></div>
        <div class="flex justify-between">
          <div>
            <div class="mb-2">Credit</div>
            <div class="text-black font-bold">₦2,157,667.00</div>
            <div class="mt-5 text-red-600">+3.2%</div>
          </div>
          <div></div>
          <div>
            <img :src="redGraph" alt="redGraph" />
          </div>
        </div>
      </div>

      <div class="w-1/4 mx-8">
        <div class="flex items-center justify-end">
          <div class="mr-5">Since:</div>
          <div class="mr-0">
            <select
              name="location"
              class="approval-flows__options text-blue-400"
            >
              <option value="">Default - Year to Date</option>
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
        </div>

        <div
          class="
            border-dashed border-b-2 border-light-blue-500
            w-full
            my-3
            text-gray-400
          "
        ></div>
        <div class="flex justify-between">
          <div>
            <div class="mb-2">Debit</div>
            <div class="text-black font-bold">₦3,519,080.00</div>
            <div class="mt-5 text-blue-400">-0.7%</div>
          </div>
          <div></div>
          <div>
            <img :src="blueGraph" alt="bluegraph" />
          </div>
        </div>
      </div>

      <div class="w-2/4 flex-grow-1 mx-8">
        <div class="flex items-center justify-between">
          <div class="text-blue-500">Account Position (YTD)</div>
          <div class="cursor-pointer">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 8.5C0 13.1944 3.80558 17 8.5 17C13.1944 17 17 13.1944 17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5ZM15.453 8.49979C15.453 12.3407 12.3394 15.4543 8.49849 15.4543C4.6576 15.4543 1.54395 12.3407 1.54395 8.49979C1.54395 4.6589 4.6576 1.54524 8.49849 1.54524C12.3394 1.54524 15.453 4.6589 15.453 8.49979ZM8.50408 13.1363C9.02585 13.1363 9.44884 12.7135 9.44884 12.1919C9.44884 11.6703 9.02585 11.2475 8.50408 11.2475C7.98231 11.2475 7.55933 11.6703 7.55933 12.1919C7.55933 12.7135 7.98231 13.1363 8.50408 13.1363ZM9.45312 4.63638H7.56361V10.303H9.45312V4.63638Z"
                fill="#070707"
              />
            </svg>
          </div>
        </div>

        <div
          class="
            border-dashed border-b-2 border-light-blue-500
            w-full
            my-4
            text-gray-400
          "
        ></div>
        <div class="flex justify-between mx-5 mt-5">
              <div>
                <div class="mb-2">Credit Total</div>
               <div class="text-black font-bold">₦42,160,069.00</div>
              </div>
          <div>
              <div class="mb-2">Debit Total</div>
              <div class="text-black font-bold">₦24,789,700.00</div></div>
          <div>
              <div class="mb-2">Credit Total</div>
               <div class="font-bold text-green-400 text-xl">₦17,370,369.00</div>
          </div>
        </div>
      </div>
    </div>

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <!-- tab content -->

    <component :is="currentTabComponent" />

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
        <p class="mr-2">Showing Page</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.67671 5.49953L6 9.82282L5.16164 10.6612L0 5.49953L5.16164 0.337891L6 1.17625L1.67671 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-4">1</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.32329 5.49953L0 9.82282L0.838357 10.6612L6 5.49953L0.838357 0.337891L0 1.17625L4.32329 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-2">of</p>
        <div>1</div>
      </div>
    </div>
  </div>
</template>

<script>
import creditAccount from "./Credit.vue";
import debitAccount from "./Debit.vue";
import refresh from "@/assets/images/optimaAsset/refresh.svg";
import blueGraph from "@/assets/images/optimaAsset/blueGraph.svg";
import redGraph from "@/assets/images/optimaAsset/redGraph.svg";

export default {
  name: "CreditAndDebit",
  components: { creditAccount, debitAccount },
  data() {
    return {
      refresh,
      blueGraph,
      redGraph,
      currentTab: "Credit Account",
      tabs: ["Credit Account", "Debit Account"],
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

<style></style>
