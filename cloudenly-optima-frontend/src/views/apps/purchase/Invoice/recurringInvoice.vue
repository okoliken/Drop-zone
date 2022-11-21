<template>
  <div class="">
    <!-- view supplier boq -->
    <vs-popup
      :active.sync="boqModalView"
      title="Supplier Boqs Details"
      width="850"
    >
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">type</th>
              <th class="text-center">Unit</th>
              <th class="text-center">Description</th>
              <th class="text-center">quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="text-center">{{ boq.name }}</td>
              <td class="text-center">{{ boq.type }}</td>
              <td class="text-center">{{ boq.unit }}</td>
              <td class="text-center">{{ boq.description }}</td>
              <td class="text-center">{{ boq.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>
    <!-- end supplier boq -->

    <!-- delete recieved invoice -->

    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Invoice"
    >
      <div class="container">
        <div
          class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-danger-main bg-white"
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              >
              </feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this invoice</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            @click="deleteRecievedInvoice"
            class="px-5 py-2 mr-5 bg-cloudenly-danger-main border-none text-white cursor-pointer rounded"
          >
            Delete
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Section -->

    <div class="mb-2">
      <div class="flex">
        <div class="w-1/3 mr-5">
          <select
            name=""
            id=""
            placeholder="Filter by Status"
            class="w-full form-control-lg"
          >
            <option disabled selected value="Filter Status">
              Filter Supplier
            </option>
          </select>
        </div>

        <div class="w-1/3 mr-5">
          <select
            name=""
            id=""
            placeholder="Filter by Status"
            class="w-full form-control-lg"
          >
            <option disabled selected value="Filter Status">
              Filter Status
            </option>
          </select>
        </div>
        <div class="w-1/3">
          <input
            placeholder="search Invoice No..."
            class="w-full form-control-lg border border-solid"
          />
        </div>
        <div class=""></div>
      </div>
    </div>

    <div v-if="getIsInvoiceReciveStatus">
      <div class="bg-white">
        <table class="table table-auto border-collapse table-responsive w-full">
          <thead
            class="border border-solid border-t-0 border-r-0 border-l-0 border-b-3"
          >
            <tr>
              <th class="py-3">INVOICE NO</th>
              <th class="py-3">DESCRIPTION</th>
              <th class="py-3">VALIDITY PERIOD</th>
              <th class="py-3">BOQ</th>
              <th class="py-3">GRAND TOTAL</th>
              <th class="py-3">STATUS</th>
              <th class="py-3">DATE</th>
              <th class="py-3">ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr
              class="cursor-pointer"
              v-for="(invoice, index) in getRecieveInvoice"
              :key="index"
            >
              <td class="py-3 pb-3 pl-3">
                {{ invoice.invoice.invoiceNumber }}
              </td>
              <td class="py-3 pb-3 pl-3">{{ invoice.invoice.description }}</td>
              <td class="py-3 pb-3 pl-3">
                {{ invoice.invoice.validityDur }} -
                {{ invoice.inovice.validityType }}
              </td>
              <td class="py-3 pb-3 pl-3">
                <button
                  type="button"
                  @click="viewBoq(invoice)"
                  class="text-sm cursor-pointer outline-none bg-cloudenly-primary-main text-white rounded-lg border-0 py-1 px-1"
                >
                  View
                </button>
              </td>
              <td class="py-3 pb-3 pl-3">
                {{ invoice.invoice.invoiceTotal | currency }}
              </td>
              <td class="py-3 pb-3 pl-3">
                <span
                  class="text-sm t font-semibold text-cloudenly-danger-main p-1 rounded-lg"
                  >{{ invoice.status }}</span
                >
              </td>
              <td class="py-3 pb-3 pl-3">{{ invoice.createdAt | date }}</td>

              <td class="py-3 pb-3 pl-3">
                <vs-dropdown vs-custom-content vs-trigger-hover>
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="text-center h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                  <vs-dropdown-menu>
                    <ul style="min-width: 15rem">
                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2">Preview</span>
                      </li>

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="generateGRN(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2"> Generate GRN</span>
                      </li>

                      <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="generateDebitNote(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2"> Generate Debit Note</span>
                      </li>

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="makePayment(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2">Make Payment</span>
                      </li> -->

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="openCancelInvoice(invoice.id)"
                      >
                        <feather-icon
                          icon="CheckCircleIcon"
                          svgClasses="w-4 h-4"
                        ></feather-icon>
                        <span class="ml-2">Cancel</span>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else>
      <div class="mb-2">
        <table class="table table-auto border-collapse table-responsive w-full">
          <thead
            class="border border-solid border-t-0  border-r-0 border-l-0 border-b-3"
          >
            <tr>
              <th class="py-3">INVOICE NO</th>
              <th class="py-3">DESCRIPTION</th>
              <th class="py-3">VALIDITY PERIOD</th>
              <th class="py-3">BOQ</th>
              <th class="py-3">GRAND TOTAL</th>
              <th class="py-3">STATUS</th>
              <th class="py-3">DATE</th>
              <th class="py-3">ACTION</th>
            </tr>
          </thead>
        </table>
      </div>

      <div>
        <div
          class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
        >
          <div class="p-5">
            <div class="">
              <h3 class="m-0">
                None of your Supplier have sent you an Invoice ...
              </h3>
              <p class="text-cloudenly-primary-main cursor-pointer">
                Learn more here...
              </p>
            </div>
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
      search: "",
      boqModalView: false,
      boqsDetails: [],
      deleteModal: false,
      invoiceId: "",
    };
  },

  methods: {
    viewBoq(val) {
      console.log(val);
      this.modal = true;
      this.boqsDetails = val;
    },

    generateGRN(val) {
      console.log(val);
      this.$router.push({ name: "CreateInvoiceGrn", params: { id: val } });
    },

    makePayment(val) {
      this.$router.push({ name: "Payment", params: { id: val } });
    },

    generateDebitNote(val) {
      this.$router.push({
        name: "CreateInvoiceDebitNote",
        params: { id: val },
      });
    },

    openCancelInvoice(val) {
      this.invoiceId = val;
      this.deleteModal = true;
    },

    deleteReceivedInvoice() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          receivedInvoiceIds: [this.invoiceId],
        },
      };
      this.$store
        .dispatch("purchae/Invoice/deleteRecievedInvoice", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.deleteModal = false;
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("purchase/Invoice", [
      "getRecieveInvoice",
      "getIsInvoiceReciveStatus",
    ]),
  },

  mounted() {
    this.$store
      .dispatch("purchase/Invoice/getAllReceivedInvoice")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>