<template>
  <div>
    <section class="bg-white px-2 py-8 flex justify-between h-44 mt-4">
      <s-modal :modal="modal">
        <div class="container bg-white py-8 px-3 rounded">
          <div class="flex justify-between">
            <h1>Exchange Rate</h1>
            <svg
              role="button"
              @click="modal = false"
              class="cursor-pointer"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99999 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 8.99999C16.3636 4.93317 13.0668 1.63636 8.99999 1.63636C4.93317 1.63636 1.63636 4.93317 1.63636 8.99999C1.63636 13.0668 4.93317 16.3636 8.99999 16.3636ZM6.30583 12.8513L9.00001 10.1571L11.6942 12.8513L12.8513 11.6942L10.1571 9.00001L12.8513 6.30583L11.6942 5.14874L9.00001 7.84293L6.30583 5.14874L5.14874 6.30583L7.84293 9.00001L5.14874 11.6942L6.30583 12.8513Z"
                fill="#070707"
              />
            </svg>
          </div>

          <div class="my-2 py-5">
            <s-select
              label="Outlets:"
              :width="520"
              default-option="--Select Outlets--"
              class="ml-10 mr-5 my-5"
            />
            <s-select
              label="Base Currency:"
              :width="520"
              default-option="Nigerian Naira (NGN)"
              class="ml-10 mr-5 my-5"
            />
            <s-select
              label="Currency:"
              :width="520"
              default-option="Chinese Yen (CY)"
              class="ml-10 mr-5 my-5"
            />
            <s-select
              label="Exchange Rate:"
              :width="520"
              default-option="65"
              class="ml-10 mr-5 my-5"
            />

            <div
              class="text-center bg-gray-200 w-11/12 ml-10 mr-5 my-2 px-5 py-5"
            >
              1 CY ~= 65 NGN
            </div>
          </div>
          <hr class="mx-10 text-gray-400" />
          <div class="mt-3 mx-10 flex justify-between">
            <button
              @click="modal = false"
              class="
                px-5
                py-2
                text-primary
                border-none
                cursor-pointer
                bg-gray-400
                rounded-full
              "
            >
              Cancel
            </button>

            <button
              @click="saveExchangeRate"
              class="
                px-5
                py-2
                text-white
                border-none
                cursor-pointer
                bg-cloudenly-primary-main
                rounded-full
              "
            >
              Save
            </button>
          </div>
        </div>
      </s-modal>

      <div class="flex">
        <s-select
          :width="220"
          default-option="Nigerian Naira (NGN)"
          class="ml-5 mr-5"
        />
        <s-select
          :width="220"
          default-option="--Filter By Outlets--"
          class="mr-5"
        />
      </div>
      <div>
        <button
          @click="showExchangeRate"
          class="bg-primary text-white py-3 px-10 rounded-full mr-5"
        >
          + New Exchange Rate
        </button>
      </div>
    </section>

    <s-table :headers="headers" :items="items">
       <div slot="title"><p class="text-xl font-bold">Currency Exchange</p></div>
      <div slot="body">
        <p>You have not created any currency exchange</p>
      </div>
    </s-table>
  </div>
</template>

<script>
import searchComponent from "./searchComponent";
import tableComponent from "./tableComponent";
export default {
  components: {
    searchComponent,
    tableComponent,
  },
  data() {
    return {
      modal: false,
      headers: [
        { text: "Currency", value: "currency" },
        { text: "Conversion", value: "conversion" },
        { text: "Exchange Rate", value: "exchangeRate" },
        { text: "Outlets(s)", value: "outlets" },
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Last Updated By", value: "lastUpdatedBy" },
        { text: "Actions", value: "id" },
      ],
      items: [
        // {
        //   currency: "Chinese Yen(CY)",
        //   conversion: "NGN to CY",
        //   exchangeRate: "65",
        //   outlets: "All Outlets Selected",
        //   lastUpdated: "12 - 02 - 2021",
        //   lastUpdatedBy: "Olamide Oluwale",
        //   id: "1",
        // },
        // {
        //   currency: "United States Dollars (USD)",
        //   conversion: "NGN to USD",
        //   exchangeRate: "488",
        //   outlets: "All Outlets Selected",
        //   lastUpdated: "15 - 01 - 2021",
        //   lastUpdatedBy: "Onochie Peace",
        //   id: "2",
        // },
        // {
        //   currency: "Great Britain Pound (GBP)",
        //   conversion: "NGN to GBP",
        //   exchangeRate: "576",
        //   outlets: "All Outlets Selected",
        //   lastUpdated: "19 - 02 - 2021",
        //   lastUpdatedBy: "Okonkwo Ebuka",
        //   id: "3",
        // },
      ],
    };
  },

  methods: {
    showExchangeRate() {
      this.modal = true;
    },
    saveExchangeRate() {
      console.log("exchangeRate");
    },
  },
};
</script>

<style></style>
