<template>
  <div class>
    <!-- view item boq -->
    <s-modal :modal="viewBoqModal">
      <div v-if="getIsAccOwner || getSalesQuotePrivileges.viewBOQ">
        <div class="container bg-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold">View Bill of Quantity</p>
            </div>
            <div>
              <svg
                @click="viewBoqModal = false"
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
          </div>

          <div class="mt-5 mb-5">
            <table class="table table-auto table-responsive w-full">
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-3">Name</th>

                  <th class="py-3">Unit of Sales</th>
                  <th class="py-3">Description</th>
                  <th class="py-3">Quantity</th>
                  <th class="py-3">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                <tr class v-for="(boq, index) in boqsDetails" :key="index">
                  <td class="py-3 pl-3">{{ boq.name }}</td>
                  <td class="py-3 pl-3">{{ boq.unitOfMeasure }}</td>
                  <td class="py-3 pl-3">{{ boq.description }}</td>
                  <td class="py-3 pl-3">{{ boq.quantity }}</td>
                  <td class="py-3 pl-3">{{ boq.unitPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr class="mt-10 mb-5 text-gray-400" />

          <div class="flex justify-center">
            <s-button
              @click="viewBoqModal = false"
              class="bg-cloudenly-danger-main text-xl text-white px-10"
            >
              Close
            </s-button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </s-modal>
    <!-- End View Boq Section -->

    <!-- delete quotation -->
    <s-modal button-close-hidden :modal="deleteModal">
      <div
        class="w-full"
        v-if="getIsAccOwner || getSalesQuotePrivileges.deleteQuote"
      >
        <div class="">
          <div class="flex items-center">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main h-12 w-12"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <p class="text-xl font-bold mb-2">Warning</p>
              <p class="text-lg font-normal">
                You are about to delete this quotation
              </p>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-center">
            <button
              :disabled="deleteButton"
              :class="{
                'cursor-not-allowed': deleteButton,
                'bg-cloudenly-primary-mid': deleteButton,
              }"
              @click="closedQuotation"
              class="
                px-5
                py-3
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded-full
              "
            >
              Delete
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="deleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </s-modal>

    <!-- process request -->
    <s-modal button-close-hidden :modal="processModal">
      <div class="container bg-white">
        <div class="bg-white">
          <div class="flex items-center">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-primary-main h-12 w-12"
                icon="InfoIcon"
              ></feather-icon>
            </div>

            <div>
              <p class="font-bold text-xl">Process Info</p>
              <p class="mt-1">
                Please note that this quotation may undergo Approval Process
              </p>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-center bg-white">
            <button
              :disabled="processButton"
              :class="{
                'cursor-not-allowed': processButton,
                'bg-cloudenly-primary-mid': processButton,
              }"
              @click="processQuotation"
              class="
                px-5
                py-3
                mr-5
                bg-cloudenly-primary-main
                border-none
                text-white
                cursor-pointer
                rounded-full
              "
            >
              Process
            </button>
            <button
              class="bg-transparent px-5 py-2 cursor-pointer"
              @click="processModal = false"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </s-modal>
    <!-- End process Requisition Section -->

    <div class="mt-5 py-2 px-3 bg-white">
      <div class="py-5 px-5">
        <p class="font-bold text-dark-optima-color text-lg">Search & Filter</p>
      </div>

      <div class="flex items-center align-items-center mb-2 py-2 px-4">
        <div class="w-1/3 mr-5">
          <s-combo-box />
        </div>

        <div class="w-1/3 mr-5">
          <s-select></s-select>
        </div>

        <div class="w-1/3 flex items-center justify-end">
          <div class>
            <drop-down>
              <div slot="title">
                <button
                  type="button"
                  class="
                    py-4
                    px-6
                    pr-3
                    inline-flex
                    items-center
                    justify-between
                    bg-primary-optima-color
                    rounded-full
                  "
                >
                  <span class="mr-12 text-white inline-block text-lg"
                    >Create
                  </span>
                  <feather-icon
                    icon="ChevronDownIcon"
                    svgClasses="w-6 h-6 text-white"
                  ></feather-icon>
                </button>
              </div>

              <div slot="body">
                <div class="shadow-xs rounded bg-white p-3">
                  <ul class="w-48">
                    <li
                      class="
                        flex
                        py-3
                        text-lg
                        px-4
                        cursor-pointer
                        text-primary-optima-color
                        hover:bg-primary-optima-color
                        hover:text-white
                        rounded-lg
                        hover:shadow-lg
                      "
                      @click.prevent="routeCreateProforma"
                    >
                      <span class="hover:text-white"> New</span>
                    </li>

                    <li
                      class="
                        flex
                        py-3
                        text-lg
                        px-4
                        cursor-pointer
                        text-primary-optima-color
                        hover:bg-primary-optima-color
                        hover:text-white
                        rounded-lg
                        hover:shadow-lg
                      "
                      @click.prevent="routeRFQ"
                    >
                      <span class="">From RFQ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </drop-down>
          </div>
        </div>
      </div>
    </div>

    <div v-if="getIsAccOwner || getSalesQuotePrivileges.viewQuoteRegister">
      <div class="mt-3 bg-white">
        <s-table
          :emptyStateImg="img"
          :headers="headers"
          :items="getAllQuotation"
        >
          <div slot="title">
            <p class="font-bold text-xl">Sales Quotation</p>
          </div>

          <div slot="body">
            <p>
              All quotes sent to customers are listed here. For now you do not
              have any saved. When your customers send your organization an RFQ,
              you can generate a quote for them. You can also send a quote
              without receiving an RFQ.
            </p>
          </div>

          <template v-slot:item="{ item }">
            <div v-if="item.boq">
              <p
                @click="viewBoqs(item)"
                class="cursor-pointer text-cloudenly-primary-main"
              >
                view
              </p>
            </div>

            <div v-else-if="item.amount">
              <p>{{ item.data.amount | currency }}</p>
            </div>

            <div v-else-if="item.status">
              <span
                v-if="item.data.status === 'draft'"
                class="text-cloudenly-danger-main"
                >{{ item.data.status | capitalize }}</span
              >
              <span
                v-if="item.data.status === 'sent'"
                class="text-cloudenly-primary-main"
                >{{ item.data.status | capitalize }}</span
              >
            </div>

            <div v-else-if="item.created">
              <p>{{ item.data.created | date }}</p>
            </div>

            <div v-else-if="item.id">
              <drop-down>
                <div slot="title">
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      icon="MoreHorizontalIcon"
                      svgClasses="w-6 h-6"
                    ></feather-icon>
                  </div>
                </div>

                <div class="py-2 px-4 bg-white shadow-sm" slot="body">
                  <ul v-if="item.data.status === 'draft'" class="w-auto">
                    <!-- <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      <span class="">View</span>
                    </li> -->

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      @click.prevent="editQuotation(item.data.id)"
                    >
                      <span class="">Edit</span>
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
                      @click.prevent="openProcessQuotation(item.data.id)"
                    >
                      <span class="">Process Quote</span>
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
                    >
                      <span class="">Export as PDF</span>
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
                    >
                      <span class="">Print</span>
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
                      @click.prevent="openCloseQuotation(item.data.id)"
                    >
                      <span class="">Delete</span>
                    </li>
                  </ul>

                  <ul v-else class="w-auto">
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      @click.prevent="viewReceipt(item.data.id)"
                    >
                      <span class="">View</span>
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
                      @click.prevent="generateInvoice(item.data.id)"
                    >
                      <span class="">Generate Invoice</span>
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
                      @click.prevent="issueWaybill(item.data.id)"
                    >
                      <span class="">Issue Waybill</span>
                    </li>

                    <!-- <li
                      @click.prevent="viewReceipt(item.data.id)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      <span class="">Preview</span>
                    </li> -->

                    <!-- <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      <span class="">Export as PDF</span>
                    </li> -->
                    <!-- <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      <span class="">Print</span>
                    </li> -->
                    <!-- <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      @click.prevent="openCloseQuotation(item.data.id)"
                    >
                      <span class="">Delete</span>
                    </li> -->
                  </ul>
                </div>
              </drop-down>
            </div>
          </template>
        </s-table>

        <!-- Pagination section -->
        <div
          class="
            p-2
            px-4
            pb-8
            pt-8
            flex
            items-center
            flex-wrap flex-row
            justify-between
          "
        >
          <div class="flex items-center">
            <p class="mr-2">Show :</p>
            <select name class="py-1 mr-2 border border-solid border-grey" id>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>

          <div class="flex items-center">
            <p class="mr-2">Show</p>
            <select name class="py-1 mr-2 border border-solid border-grey" id>
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
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import emptyTableIcon from "@/assets/images/optimaAsset/quoteEmptyState.svg";

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      img: emptyTableIcon,
      search: "",
      status: "",
      viewBoqModal: false,
      boqsDetails: [],
      quotationId: null,
      settings: {},

      processModal: false,
      deleteModal: false,

      deleteButton: false,
      processButton: false,

      items: [],

      headers: [
        { text: "Quote No.", value: "quoteNumber" },
        { text: "Customer Name", value: "customerName" },
        { text: "Validity", value: "validity" },
        { text: "BOQ", value: "boq" },
        { text: "Amount (VAT Incl)", value: "amount" },
        { text: "Status", value: "status" },
        { text: "Created", value: "created" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    routeCreateProforma() {
      this.$router.push({
        name: "CreateProforma",
      });
    },

    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "quote",
          category: "sales",
        },
      });
    },

    routeRFQ() {
      if (
        this.getIsAccOwner ||
        this.getSalesQuotePrivileges.createQuote === true
      ) {
        this.$router.push({
          name: "SalesRequisition",
        });
      } else {
        this.$vs.notify({
          title: "Quotation",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    viewBoqs(val) {
      console.log(val);
      this.viewBoqModal = true;
      this.boqsDetails = val.data.boq;
    },
    editQuotation(val) {
      this.$router.push({
        name: "EditProforma",
        params: {
          id: val,
        },
      });
    },

    generateInvoice(val) {
      this.$router.push({
        name: "GenerateInvoiceQuotation",
        params: {
          id: val,
        },
      });
    },

    issueWaybill(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesQuotePrivileges.generateWaybill === true
      ) {
        this.$router.push({
          name: "generateWaybill",
          query: {
            module: "quote",
          },
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Waybill",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    issueDebitNote(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesQuotePrivileges.generateCreditNote === true
      ) {
        this.$router.push({
          name: "",
          query: {
            module: "quote",
          },
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Quotation",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    openCloseQuotation(val) {
      (this.quotationId = val), (this.deleteModal = true);
    },

    closedQuotation() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          quoteIds: [this.quotationId],
        },
      };

      this.$store
        .dispatch("sales/Quotation/closeQuotation", data)
        .then((resp) => {
          this.deleteButton = false;
          (this.deleteModal = false),
            this.$vs.notify({
              title: "Quotation ",
              text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Quotation ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
    },

    openProcessQuotation(val) {
      this.quotationId = val;
      this.processModal = true;
    },

    processQuotation() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          quoteId: this.quotationId,
          manualApproval: {
            isManualApproval: false,
            scellooId: null,
          },
        },
      };

      console.log(data);

      this.$store
        .dispatch("sales/Quotation/sendQuotation", data)
        .then((resp) => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Quotation",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.processButton = false;
          this.$vs.notify({
            title: "Quotation",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("sales/Quotation", ["getIsQuotation", "allQuotation"]),
    ...mapGetters("crm/contact", ["allContact", "allLoyalty", "getIsCustomer"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesQuotePrivileges"]),

    getAllQuotation() {
      return this.allQuotation.map((resp) => {
        return {
          customerName: resp.customer.name,
          quoteNumber: resp.quoteNumber,
          validity: `${resp.validityDur} - ${resp.validityType}`,
          boq: resp.quoteBoqs,
          amount: resp.quoteTotal,
          status: resp.status,
          created: resp.updatedAt,
          id: resp.id,
        };
      });
    },
  },

  created() {},

  mounted() {
    this.$store.dispatch("sales/Quotation/getAllQuotation");
    this.$store.dispatch("crm/contact/getAllContact");
  },
};
</script>

<style></style>
