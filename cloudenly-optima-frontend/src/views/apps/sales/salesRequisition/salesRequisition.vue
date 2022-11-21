<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">
        Request for Quote (RFQ)
      </p>
    </div>

    <!-- <SalesRequisitionAnalysis
      v-if="getIsAccOwner || getSalesRequestForQuotePrivileges.viewDashboard"
      class="mt-8"
    /> -->

    <vs-popup :active.sync="viewBoqModal" title="BOQ">
      <div v-if="getIsAccOwner || getSalesRequestForQuotePrivileges.viewBOQ">
        <table class="table table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">Name</th>
              <th class="py-3">Type</th>
              <th class="py-3">Unit of Sale</th>
              <th class="py-3">Description</th>
              <th class="py-3">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 pl-3">{{ boq.variantName }}</td>
              <td class="py-3 pl-3">{{ boq.type }}</td>
              <td class="py-3 pl-3">{{ boq.unitOfMeasure }}</td>
              <td class="py-3 pl-3">{{ boq.description }}</td>
              <td class="py-3 pl-3">{{ boq.orderQuantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>

    <!-- delete request -->
    <!-- <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Request">
      <div class="container">
        <div
          class="p-5 border-2 border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-danger-main bg-white"
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this request for quote</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{'cursor-not-allowed' : deleteButton, 'bg-cloudenly-danger-mid':deleteButton}"
            @click="deleteRequestForQuote"
            class="px-5 py-2 mr-5 bg-cloudenly-danger-main border-none text-white cursor-pointer rounded"
          >Delete</button>

          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >cancel</button>
        </div>
      </div>
    </vs-popup>-->
    <!-- End Delete Requisition Section -->
    <!-- cancel request -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Cancel Request"
    >
      <div v-if="getIsAccOwner || getSalesRequestForQuotePrivileges.deleteRFQ">
        <div class="container">
          <div
            class="
              p-5
              border-2 border-solid
              rounded
              border-l-4
              border-r-0
              border-b-0
              border-t-0
              border-cloudenly-danger-main
              bg-white
            "
          >
            <div class="flex items-center mx-1">
              <div class="mr-5">
                <feather-icon
                  svgClasses="text-cloudenly-danger-main"
                  class="h-8 w-8"
                  icon="AlertCircleIcon"
                ></feather-icon>
              </div>

              <div>
                <h1 class="m-0">warning</h1>
                <p>You are about to cancel this request for quote</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              :disabled="deleteButton"
              :class="{
                'cursor-not-allowed': deleteButton,
                'bg-cloudenly-danger-mid': deleteButton,
              }"
              @click="deleteRequestForQuote"
              class="
                px-5
                py-2
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded
              "
            >
              Cancel
            </button>

            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="deleteModal = false"
            >
              close
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End  Section -->

    <div class="mt-8">
      <div class="bg-white py-2">
        <div class="py-5 px-5">
          <p class="font-bold text-dark-optima-color text-lg">
            Search & Filter
          </p>
        </div>

        <div class="py-2 px-5 flex items-center align-items-center">
          <div class="w-1/3 mr-5">
            
            <s-combo-box />
          </div>

          <div class="w-1/3">
            
            <s-select />
          </div>

          <div class="w-1/3"></div>
        </div>
      </div>

      <div
        v-if="
          getIsAccOwner || getSalesRequestForQuotePrivileges.viewRFQRegister
        "
      >
        <div class="bg-white mt-3">
          <div v-if="getIsSalesRequestStatus">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    RFQ No.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    RFQ TITLE
                  </th>
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    REFERENCE No.
                  </th> -->

                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    CUSTOMER
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    BID METHOD
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    DEADLINE
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    BOQ
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    STATUS
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class
                  v-for="(requisition, index) in getReceiveRequest"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ requisition.requestForQuote.requestForQuoteNumber }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ requisition.requestForQuote.title }}
                  </td>

                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ requisition.requestForQuote.reference }}
                  </td> -->

                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span v-if="requisition.senderInfo === null">N/A</span>
                    <span v-else>{{ requisition.senderInfo.name }}</span>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ requisition.requestForQuote.bidMethod }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ requisition.requestForQuote.submissionDeadline | date }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <button
                      class="
                        px-2
                        text-sm
                        py-1
                        border-none
                        text-white
                        rounded
                        bg-cloudenly-primary-main
                        cursor-pointer
                      "
                      @click="viewBoqs(requisition)"
                    >
                      view
                    </button>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span class="text-cloudenly-warning-main">{{
                      requisition.status
                    }}</span>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>

                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <!-- <li
                            @click="viewSaleRequest(requisition.id)"
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                          >
                            <span class="ml-2">View</span>
                          </li> -->

                          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                        <span class="ml-2">Print</span>
                        </li>-->

                          <li
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="generateQuoteRFQ(requisition.id)"
                          >
                            <span class="ml-2">Generate Quote</span>
                          </li>

                          <li
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="generateInvoiceRFQ(requisition.id)"
                          >
                            <span class="ml-2">Generate Invoice</span>
                          </li>

                          <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="openCancelRequest(requisition.id)"
                      >
                        <span class="ml-2">Delete Request</span>
                        </li>-->

                          <!-- <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openCancelRequest(requisition.id)"
                          >
                            <span class="ml-2">Delete Request</span>
                          </li> -->
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="mt-5">
            <div class="mb-3">
              <table
                class="table table-auto table-responsive border-collapse w-full"
              >
                <thead class="bg-gray-300">
                  <tr>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      S/N
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      RFQ NO
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      RFQ TITTLE
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      CURRENCY
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      BUYER
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      BID METHOD
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      SUBMISSION DEADLINE
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      BOQ
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      STATUS
                    </th>
                    <th
                      class="
                        py-4
                        px-6
                        tracking-wider
                        font-semibold
                        text-dark-optima-color
                      "
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div
              class="
                border-solid
                border-t-0
                border-r-0
                border-b-0
                border-cloudenly-danger-main
                rounded
                border-4
                shadow
                mb-2
              "
            >
              <div class="p-3">
                <div class>
                  <h3 class="m-0">
                    None of your Customers has sent you a Request for
                    Quotation..
                  </h3>
                  <p class="text-cloudenly-primary-main cursor-pointer">
                    Learn more here...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination section -->
          <div
            class="
              p-2
              py-5
              flex
              items-center
              flex-wrap flex-row
              justify-between
            "
          >
            <div class="flex items-center">
              <p class="mr-2">Show :</p>
              <select name class="mr-2 border-2 border-gray-400" id>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p>Per Page</p>
            </div>

            <div class="flex items-center">
              <p class="mr-2">Show</p>
              <select name class="mr-2 border-2 border-gray-400" id>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p>Per Page</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SComboBox from '../../../../components/scellooComponents/v1/sComboBox.vue';
import SalesRequisitionAnalysis from "./salesRequisitionAnalysis";
export default {
  components: {
    SalesRequisitionAnalysis,
  },
  data() {
    SComboBox
    return {
      viewBoqModal: false,
      loading: true,
      boqsDetails: [],
      quote: [],
      requestId: "",
      deleteModal: false,
      deleteButton: false,
    };
  },
  methods: {
    viewBoqs(val) {
      this.viewBoqModal = true;
      this.boqsDetails = val.requestForQuote.requestForQuoteBoqs;
    },

    viewSaleRequest(val) {
      this.$router.push({
        name: "ViewSalesRequisition",
        params: {
          id: val,
        },
      });
    },

    generateQuoteRFQ(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesRequestForQuotePrivileges.generateQuote === true
      ) {
        this.$router.push({
          name: "GenerateQuoteRFQ",
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Request",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generateInvoiceRFQ(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesRequestForQuotePrivileges.generateQuote === true
      ) {
        this.$router.push({
          name: "GenerateInvoiceRFQ",
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Request",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    openCancelRequest(val) {
      (this.requestId = val), (this.deleteModal = true);
    },

    deleteRequestForQuote() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          receivedRequestForQuoteIds: [this.requestId],
        },
      };
      this.$store
        .dispatch("sales/Request/deleteReceiveRequest", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Request",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Request",
            text: err.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("sales/Request", [
      "getReceiveRequest",
      "getIsSalesRequestStatus",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesRequestForQuotePrivileges",
    ]),
  },

  mounted() {
    this.$store.dispatch("sales/Request/getAllReceiveRequest");
  },
};
</script>

<style scoped>
.table-head {
  opacity: 0.15;
  /* font-size: ; */
}
</style>
