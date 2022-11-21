<template>
  <div class>
    <h2 class="mb-10 font-semibold" style="font-size: 15px">Quotes</h2>

    <PurchaseProformaAnalysis
      v-if="getIsAccOwner || getPurchaseQuotePrivileges.viewDashboard"
    />

    <!-- delete Proforma quote -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Quotation "
    >
      <div v-if="getIsAccOwner || getPurchaseQuotePrivileges.deleteQuote">
        <div class="container">
          <div
            class="
              p-5
              border border-solid
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
                <p>You are about to Delete this Quotation</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              @click="deleteReceivedQuotation"
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
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Delete Proforma Section -->

    <!-- BOQ modal -->
    <s-modal :modal="modal">
      <div class="w-full" v-if="getIsAccOwner || getPurchaseQuotePrivileges.viewQuoteRegister">
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Bill of Quantity</h1>
          <div @click="modal = false" class="cursor-pointer">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM8.99999 16.8636C13.0668 16.8636 16.3636 13.5668 16.3636 9.49999C16.3636 5.43317 13.0668 2.13636 8.99999 2.13636C4.93317 2.13636 1.63636 5.43317 1.63636 9.49999C1.63636 13.5668 4.93317 16.8636 8.99999 16.8636ZM6.30583 13.3515L9.00001 10.6573L11.6942 13.3515L12.8513 12.1944L10.1571 9.5002L12.8513 6.80601L11.6942 5.64893L9.00001 8.34311L6.30583 5.64893L5.14874 6.80601L7.84293 9.5002L5.14874 12.1944L6.30583 13.3515Z"
                fill="#F15846"
              />
            </svg>
          </div>
        </div>

        <table
            class="table table-auto table-responsive w-full border-collapse"
          >
            <thead class="bg-grey-light">
              <tr>
                <th class="py-2">Name</th>
                <th class="py-2">Type</th>
                <th class="py-2">Unit</th>
                <th class="py-2">Description</th>
                <th class="py-2">Quantity</th>
                <th class="py-2">Unit Price</th>
              </tr>
            </thead>

            <tbody>
              <tr class="" v-for="(boq, index) in boqsDetails" :key="index">
                <td class="py-2 pl-3">{{ boq.name }}</td>
                <td class="py-2 pl-3">{{ boq.itemClass }}</td>
                <td class="py-2 pl-3">{{ boq.unitOfMeasure }}</td>
                <td class="py-2 pl-3">{{ boq.description }}</td>
                <td class="py-2 pl-3">{{ boq.quantity }}</td>
                <td class="py-2 pl-3">{{ boq.unitPrice }}</td>
              </tr>
            </tbody>
          </table>
        <hr class="text-gray-400 mt-10 mb-10" />
        <div class="mt-10 flex justify-end">
          <s-button
            class="
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              bg-cloudenly-primary-main
              rounded-full
            "
             @click="modal = false"
          >
            Close
          </s-button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>      
    </s-modal>
    <!-- End BOQ modal -->

    <div v-if="getIsAccOwner || getPurchaseQuotePrivileges.viewQuoteRegister">
      <div class="w-full mt-5 bg-white">
        <!-- <div class="py-5 px-5">
        <div class="flex">
          <div class="w-1/4 mr-5">
            <select
              placeholder="select supplier"
              name
              class="py-3 px-2 rounded-lg border border-solid border-grey w-full"
              id
            >
              <option disabled selected value="Select Supplier"
                >Select Supplier</option
              >
            </select>
          </div>

          <div class="w-1/4 mr-5">
            <select
              placeholder="Filter Status"
              name
              class="py-3 px-2 rounded-lg border border-solid border-grey w-full"
              id
            >
              <option disabled selected value="Select Supplier"
                >Filter by Status</option
              >
            </select>
          </div>

          <div class="w-1/4 mr-5">
            <input
              class="py-3 px-3 rounded-lg border border-solid border-grey w-full"
              placeholder="Search Quotation No"
            />
          </div>

          <div class="w-1/4">
            <datepicker
              input-class="w-full"
              placeholder="Select Date"
            ></datepicker>
          </div>
        </div>
      </div> -->

        <div class="bg-white px-6 pt-8 pb-10 font-normal mt-5">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <s-combo-box />

            </div>
          </div>
        </div>

        <div class="flex bg-white justify-between items-center px-6 pt-4 pb-10 font-normal mt-3">
        <div class="flex items-center">
          <s-select defaultOption="--Filter By Location--" :width="250" class="mr-6"/>

          <!-- <select @change="getFilterPr" v-model="filter.outlet"> 
            <option v-for='(outlet, i) in getAllOrganisationLocation' :key="i">
              <option>All Organisation </option>
              <option :value="outletId"> {{outlet.name}} </option>
            </option>
          </select> -->
          <s-select defaultOption="--Filter--" :width="250" />
        </div>
        <div  class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>

        <s-table :headers="headers" :items="quotationList" :emptyStateImg="img">
          <div slot="title">
            <p class="font-bold text-xl">No Quotes received Yet...</p>
          </div>

          <div slot="body">
            <p>
              All quotes received from suppliers are listed here. For now you do
              not have any saved. You can ask your supplier for an official
              quote of items/services. They get listed here once the supplier
              sends them
            </p>
          </div>
          <template v-slot:item="{ item }">
            <span v-if="item.validityDur">
              {{ item.data.validityDur }} {{ item.data.validityType }}
            </span>

            <span v-else-if="item.quoteTotal">{{
              item.data.quoteTotal | currency
            }}</span>

            <button
              class="text-secondary-optima-color font-medium"
              type="button"
              v-else-if="item.quote"
              @click="viewBoq(item.data.quote)"
            >
              View
            </button>

            <span v-else-if="item.createdAt">
              {{ item.data.createdAt | date }}
            </span>

            <span class="text-danger-optima-color" v-else-if="item.status">{{
              item.data.status
            }}</span>

            <div v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 13rem">
                    <li
                    @click="viewPurchaseQuote(item.data.id)"
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  >
                    View Quote
                  </li>

                    <!-- <li
                      @click.prevent="generatePurchaseOrder(quote.id)"
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                          <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                          <span class="ml-2">Generate PO</span>
                        </li>-->

                    <!-- <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="generatePayment(item.data.id)"
                    >
                      Make Payment
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
                      @click.prevent="generateGRN(item.data.id)"
                    >
                      Generate GRN
                    </li>

                    <!-- <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="openCancelQuote(item.data.id)"
                    >
                      Delete
                    </li> -->
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </template>
        </s-table>
        <div class="mt-6">
      <s-pagination @pagination="pagination($event)" /> 
    </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import PurchaseProformaAnalysis from "./purchaseProformaAnalysis";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import emptyTableIcon from "@/assets/images/optimaAsset/quoteEmptyState.svg";

// import AlertPrevilege from '../../../components/Alert/AlertPrevilege.vue';

export default {
  components: {
    PurchaseProformaAnalysis,
    Datepicker,
    // AlertPrevilege,
  },
  data() {
    return {
      img: emptyTableIcon,
      loading: false,
      search: "",
      allProforma: [],
      modal: false,
      boqsDetails: [],
      deleteModal: false,
      quotationId: "",
      headers: [
        { text: "Supplier Name", value: "name" },
        { text: "Quote No.", value: "quoteNumber" },
        { text: "Validity", value: "validityDur" },
        { text: "Amount (₦)", value: "quoteTotal" },
        { text: "BOQ", value: "quote" },
        { text: "Date Recieved", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
     async pagination(data) {
      await this.$store.dispatch("crm/contact/getAllContact", data);
    },
    viewBoq(val) {
      console.log(val.quoteBoqs);
      this.modal = true;
      this.boqsDetails = val.quoteBoqs;
    },

    viewPurchaseQuote(val) {
      this.$router.push({
        name: "ViewPurchaseProforma",
        params: {
          id: val,
        },
      });
    },

    generatePurchaseOrder(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseQuotePrivileges.generatePO === true
      ) {
        this.$router.push({
          name: "GeneratePurchaseOrderProforma",
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Quote ",
          text: "You are not eligible to perform this function",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generateGRN(id) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseQuotePrivileges.generateGoodsReceivedNote === true
      ) {
        this.$router.push({
          name: "sharedGoodReceivedNote",
          params: {
            id: id,
          },
          query: {
            type: "quote",
          },
        });
      } else {
        this.$vs.notify({
          title: "Quote ",
          text: "You are not eligible to perform this function",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generatePayment(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseQuotePrivileges.makePayment === true
      ) {
        this.$router.push({ name: "Payment", params: { id: val } });
      } else {
        this.$vs.notify({
          title: "Quote Payment ",
          text: "You are not eligible to perform this function",
          color: "danger",
          position: "top-right",
        });
      }
    },

    openCancelQuote(val) {
      this.quotationId = val;
      this.deleteModal = true;
    },

    deleteReceivedQuotation() {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          receivedQuoteIds: [this.quotationId],
        },
      };
      this.$store
        .dispatch("purchase/Quotation/deleteReceivedQuotation", { data: data })
        .then((resp) => {
          this.$vs.notify({
            title: "Quote ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.deleteModal = false;
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Quote ",
            text: err.resp.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    updateSenderInfo(val) {
      if (val === null) {
        return "N/A";
      } else {
        return val.name;
      }
    },

    generateDebitNote(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseQuotePrivileges.generateDebitNote === true
      ) {
        this.$router.push({
          name: "",
          params: {
            id: val,
          },
        });
      } else {
        this.$vs.notify({
          title: "Quote ",
          text: "You are not eligible to perform this function",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    filterProforma() {
      return this.allProforma.filter((proforma) => {
        return proforma.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    ...mapGetters("purchase/Quotation", [
      "getReceivedQuotation",
      "getIsQuotationReceivedStatus",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseQuotePrivileges",
    ]),

    quotationList() {
      return this.getReceivedQuotation.map((item) => ({
        name: this.updateSenderInfo(item.senderInfo),
        quoteNumber: item.quote.quoteNumber,
        validityDur: item.quote.validityDur,
        validityType: item.quote.validityType,
        quoteTotal: item.quote.quoteTotal,
        createdAt: item.quote.createdAt,
        status: item.status,
        id: item.id,
        quote: item.quote,
      }));
    },
  },

  mounted() {
    this.$store.dispatch("purchase/Quotation/getAllReceivedQuotation");
  },
};
</script>

<style></style>
