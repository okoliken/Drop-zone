<template>
  <div>
    <section class="bg-white items-center flex py-8 px-3 justify-between">
      <div class="flex">
        <s-combo-box />

        <s-select
          :width="220"
          default-option="--Filter By Outlets--"
          class="ml-5 mr-5"
        />
        <s-select
          :width="220"
          default-option="--Filter By Categories--"
          class="mr-5"
        />
      </div>

      <div>
        <button
          @click="createPayment"
          class="bg-primary text-white py-3 px-10 rounded-full mr-5"
        >
          <span class="font-semibold text-xl">+</span> New Account
        </button>
      </div>
    </section>
    <s-table :headers="headers" :items="items">
      <div slot="title"><p class="text-xl font-bold">Payment</p></div>
      <div slot="body">
        <p>You have not create any payment accounts</p>
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
      headers: [
        { text: "Account Name", value: "accountName" },
        { text: "Account Number", value: "accountNumber" },
        { text: "Outlets(s)", value: "outlets" },
        { text: "Payment Category(ies)", value: "paymentCategory" },
        { text: "Actions", value: "id" },
      ],
      items: [
        // {
        //   accountName: "Scelloo Limited",
        //   accountNumber: "0222315465 WEMA Bank",
        //   outlets: "All Outlets Selected",
        //   paymentCategory: "Supplier Invoices",
        //   id: "1",
        // },
        // {
        //   accountName: "Scelloo Limited",
        //   accountNumber: "01561136325 Polaris Bank",
        //   outlets: "Ajah Warehouse, Ikeja Warehouse",
        //   paymentCategory: "Supplier Invoices",
        //   id: "2",
        // },
        // {
        //   accountName: "Scelloo Limited",
        //   accountNumber: "0041275073 Access Bank",
        //   outlets:
        //     "Ikoyi Retail Centre, Aba Production Plant, Ikoyi Service Centre",
        //   paymentCategory: "Supplier Invoices",
        //   id: "3",
        // },
      ],
    };
  },

  methods: {
    createPayment() {
      this.$router.push({
        name: "newPayment",
      });
    },
  },
};
</script>

<style></style>
