<template>
  <div>
   
 <!-- view supplier boq -->
    <s-modal :modal="boqModalView">
      <div class="w-full" v-if="getIsAccOwner || getPurchaseInvoicePrivileges.viewBOQ">
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Bill of Quantity</h1>
          <div @click="boqModalView = false" class="cursor-pointer">
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

        <table class="min-w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-4 px-3 font-medium">Name</th>
                <th class="py-4 px-3 font-medium">type</th>
                <th class="py-4 px-3 font-medium">Unit</th>
                <th class="py-4 px-3 font-medium">Description</th>
                <th class="py-4 px-3 font-medium">Quantity</th>
                <th class="py-4 px-3 font-medium">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(boq, index) in boqsDetails" :key="index">
                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.name }}
                </td>
                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.itemClass }}
                </td>
                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.unitOfMeasure }}
                </td>
                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.description }}
                </td>

                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.quantity }}
                </td>

                <td class="px-3 py-3 border-b border-gray-200">
                  {{ boq.unitPrice }}
                </td>
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
             @click="boqModalView = false"
          >
            Close
          </s-button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>      
    </s-modal>
 <!-- end view supplier boq -->

    <!-- delete receive invoice -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Invoice"
    >
      <div v-if="getIsAccOwner || getPurchaseInvoicePrivileges.deleteInvoice">
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
                <p>You are about to cancel this invoice</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              @click="deleteReceivedInvoice"
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
              Closed
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
    <!-- End Section -->

    <div class="grid grid-cols-12 col-gap-8 mb-3">
      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="totalQuotes" alt="global network" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          <div style="font-size: 14px;">
            Total No. of Invoices
          </div>
          <h3 class="mb-2  font-semibold" style="font-size: 16px;">
            6
            </h3>
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="approvedQuote" alt="approved quotes" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          
          <div class="text-lg text-right" style="font-size: 14px;">
            Total Processed
          </div>
          <h3 class="mb-2 font-semibold flex" style="font-size: 16px;">
            12
          </h3>
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="quote" alt="quote" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          <div class="text-lg text-right" style="font-size: 14px;">
            Total Pending Processing
          </div>
          <h3 class="mb-2 font-semibold" style="font-size: 16px;">
            2
          </h3>
        </div>
      </div>
    </div>

         <div class="bg-white px-6 pt-10 pb-10 font-normal mt-5">
      <div class="flex justify-between items-center">
        <s-combo-box v-model="search" :value="search"/>
      </div>
    </div>

    <div class="flex bg-white justify-between items-center px-6 pt-4 pb-10 font-normal mt-3">
        <div class="flex items-center">
          <s-select defaultOption="--Filter By Outlet--" :width="250" class="mr-6"/>

          <!-- <select @change="getFilterPr" v-model="filter.outlet"> 
            <option v-for='(outlet, i) in getAllOrganisationLocation' :key="i">
              <option>All Organisation </option>
              <option :value="outletId"> {{outlet.name}} </option>
            </option>
          </select> -->

          <s-select defaultOption="--Filter By--" :width="250" />
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

    <div
      v-if="getIsAccOwner || getPurchaseInvoicePrivileges.viewInvoiceRegister"
    >
      <s-table :headers="headers" :items="invoiceList" :emptyStateImg="img">
        <div slot="title">
            <p class="font-bold text-xl">No Invoices received Yet...</p>
          </div>

          <div slot="body">
            <p>
              All invoices received from suppliers are listed here.
              For now you do not have any saved. When you are topay for
              items/services your supplier will issue your organization an invoice.
            </p>
          </div>
        <template v-slot:item="{ item }">
          <span v-if="item.validityDur">
            {{ item.data.validityDur }} {{ item.data.validityType }}
          </span>

          <span v-else-if="item.senderInfo">{{
            item.data.senderInfo ? item.data.senderInfo.name : "Nil"
          }}</span>

          <span class="leading-loose" v-else-if="item.invoiceTotal">
            {{ item.data.invoiceTotal | currency}}
          </span>

          <button
            type="button"
            @click="viewBoq(item.data)"
            class="font-medium text-secondary-optima-color"
            v-else-if="item.invoice"
          >
            View
          </button>

          <div v-else-if="item.status">
            <span
              v-if="item.data.status === 'pending'"
              class="text-danger-optima-color"
              >{{ item.data.status | capitalize }}</span
            >
            <span
              v-if="item.data.status === 'cancelled'"
              class="text-tetiary-optima-color"
              >Cancelled</span
            >
          </div>

          <span v-else-if="item.createdAt">{{
            item.data.createdAt | date
          }}</span>

          <div v-else-if="item.id">
            <vs-dropdown
              v-if="item.data.status === 'pending'"
              vs-custom-content
              vs-trigger-click
            >
              <div class="text-center cursor-pointer">
                <feather-icon
                  class="text-center h-6 w-6"
                  icon="MoreHorizontalIcon"
                />
              </div>

              <vs-dropdown-menu>
                <!-- // TODO  Add preview sale invoice received ---- preview invoice -->
                <ul style="min-width: 15rem">
                  <!-- <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="routeViewInvoice(item.data.id)"
                  >
                    View
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
                    @click.prevent="viewReceipt(item.data.id)"
                  >
                    View
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
                    @click="generateGRN(item.data.id)"
                  >
                    Generate GRN
                  </li>

                  <!-- <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="generateDebitNote(item.data.id)"
                  >
                    Generate Debit Note
                  </li> -->

                  <!-- <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="makePayment(item.data.id)"
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
                    @click="openCancelInvoice(item.data.id)"
                  >
                    Cancel
                  </li>
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
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import emptyTableIcon from "@/assets/images/purchaseInvoiceEmptyState.svg";
import totalQuotes from "@/assets/images/optimaAsset/icon_total_quote.svg";
import quote from "@/assets/images/optimaAsset/icon_quote_value.svg";
import approvedQuote from "@/assets/images/optimaAsset/icon_approved_quote_value.svg";


export default {
  data() {
    return {
      totalQuotes,
      quote,
      approvedQuote,
      img: emptyTableIcon,
      search: "",
      boqModalView: false,
      boqsDetails: [],
      deleteModal: false,
      invoiceId: "",
      headers: [
        { text: "Supplier Name", value: "senderInfo" },
        { text: "Invoice No.", value: "invoiceNumber" },
        { text: "Validity", value: "validityDur" },
        { text: "Amount (₦)", value: "invoiceTotal" },
        { text: "BOQ", value: "invoice" },
        { text: "Date Received", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    viewBoq(val) {
      this.boqModalView = true;
      this.boqsDetails = val.invoice.invoiceBoqs;
    },

    generateGRN(id) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseInvoicePrivileges.generateGoodsReceivedNote === true
      ) {
        this.$router.push({
          name: "sharedGoodReceivedNote",
          params: { id },
          query: { type: "invoice" },
        });
      } else {
        this.$vs.notify({
          title: "Purchase Invoice ",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    routeViewInvoice(val) {
      this.$router.push({ name: "ViewPurchaseInvoice", params: { id: val } });
    },
    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "invoice",
          category: "invoice",
        },
      });
    },

    makePayment(val) {
      if (
        this.getIsAccOwner |
        (this.getPurchaseInvoicePrivileges.makePayment === true)
      ) {
        this.$router.push({ name: "viewReceipt", params: { id: val } });
      } else {
        this.$vs.notify({
          title: "Purchase Invoice ",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generateDebitNote(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseInvoicePrivileges.generateDebitNote === true
      ) {
        this.$router.push({
          name: "CreateDebitNote",
          params: { id: val },
        });
      } else {
        this.$vs.notify({
          title: "Purchase Invoice ",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
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
        .dispatch("purchase/Invoice/deleteReceivedInvoice", data)
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
          console.log(err);
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
      "getReceivedInvoice",
      "getIsInvoiceReceivedStatus",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseInvoicePrivileges",
    ]),
    invoiceList() {
      return this.getReceivedInvoice.map((item) => ({
        senderInfo: item.senderInfo,
        invoiceNumber: item.invoice.invoiceNumber,
        validityDur: item.invoice.validityDur,
        validityType: item.invoice.validityType,
        invoiceTotal: item.invoice.invoiceTotal,
        status: item.status,
        createdAt: item.createdAt,
        invoice: item.invoice,
        id: item.id,
      }));
    },
    // filterInvoice(){
    //    return this.invoiceList.filter((resp) => {
    //     return resp.senderInfo.toLowerCase().includes(this.search.toLowerCase());
    //   });
    // },
  },

  mounted() {
    this.$store.dispatch("purchase/Invoice/getAllReceivedInvoice");
  },
};
</script>

<style scoped></style>
