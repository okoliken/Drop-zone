<template>
  <div class="">
    <div class="mt-3">
      <!-- View BOQ -->
      <vs-popup :active.sync="viewBoqModal" title=" Purchase Boqs Details">
        <div class="container">
          <table class="table table-auto table-respnsive w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3 text-center">Name</th>
                <th class="py-3 text-center">type</th>
                <th class="py-3 text-center">Unit</th>
                <th class="py-3 text-center">Description</th>
                <th class="py-3 text-center">quantity Requested</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(boq, index) in boqsDetails" :key="index">
                <td class="py-3 text-center">{{ boq.variantName }}</td>
                <td class="py-3 text-center">{{ boq.type }}</td>
                <td class="py-3 text-center">{{ boq.unitOfMeasure }}</td>
                <td class="py-3 text-center">{{ boq.description }}</td>
                <td class="py-3 text-center">{{ boq.orderQuantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </vs-popup>
      <!-- End View Boq Section -->

      <!-- View Supplier -->
      <vs-popup :active.sync="supplierModal" title=" Supplier List">
        <div class="container">
          <table class="table table-auto table-respnsive w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3 text-center">Name</th>
                <th class="py-3 text-center">Contact Name</th>
                <th class="py-3 text-center">Phone</th>
                <th class="py-3 text-center">Email</th>
                <th class="py-3 text-center">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(boq, index) in supplierDetails" :key="index">
                <td class="py-3 text-center">{{ boq.name }}</td>
                <td class="py-3 text-center">{{ boq.contactName }}</td>
                <td class="py-3 text-center">{{ boq.phoneNumber }}</td>
                <td class="py-3 text-center">{{ boq.email }}</td>
                <td class="py-3 text-center">{{ boq.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </vs-popup>
      <!-- End View Supplier Section -->

      <!-- delete request -->
      <vs-popup
        button-close-hidden
        :active.sync="deleteModal"
        title="Delete Request"
      >
        <div class="container">
          <div
            class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-danger-main bg-white shadow-lg"
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
                <p>You are about to Delete this request for quote</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              @click="deleteRequestForQuote"
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
      <!-- End Delete Requisition Section -->

      <!-- process request -->
      <vs-popup
        button-close-hidden
        :active.sync="processModal"
        title="Process Request"
      >
        <div class="container">
          <div
            class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white shadow-lg"
          >
            <div class="flex items-center mx-1">
              <div class="mr-5">
                <feather-icon
                  svgClasses="text-cloudenly-primary-main"
                  class="h-8 w-8"
                  icon="InfoIcon"
                ></feather-icon>
              </div>

              <div>
                <h1 class="m-0">Process Info</h1>
                <p>
                  Please note that this Request for Quote may undergo Approval
                  Process
                </p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              @click="processRequestQuote"
              class="px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
            >
              Process
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="processModal = false"
            >
              cancel
            </button>
          </div>
        </div>
      </vs-popup>
      <!-- End process Requisition Section -->

      <div class="vx-row mb-3">
        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="vx-auto-suggest">
            <div class="flex items-center relative">
              <input
                type="text"
                @focus="showAdvance = false"
                class="w-full form-control-lg  border-solid border-grey-light bg-grey-lighter rounded border-0"
                placeholder="Search Request Title"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <button
                class="inline-flex items-center  py-2 px-5 mr-3 cursor-pointer bg-cloudenly-primary-main text-white border border-solid rounded border-cloudenly-primary-mid"
              >
                <span class="mr-3"> Create RFQ </span>
                <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
              </button>
              <vs-dropdown-menu>
                <ul style="min-width: 12rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="createQuote"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Create New</span>
                  </li>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routePR"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Create from PR</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>

      <div v-if="isOtherRequestQuote">
        <VuePerfectScrollbar class="h-84" :settings="settings">
          <div class="border border-solid border-grey-light rounded bg-white">
            <table
              class="table table-auto table-responsive w-full border-collapse"
            >
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-2 text-bold text-center" style="width: 12%">
                    RFQ NO.
                  </th>
                  <th class="py-2 text-bold text-center" style="width: 12%">
                    RFQ TITLE
                  </th>
                  <th class="py-2 text-bold text-center">CURRENCY</th>
                  <th class="py-2 text-bold text-center">SUPPLIER(S)</th>
                  <th class="py-2 text-bold text-center">BID METHOD</th>
                  <th class="py-2 text-bold text-center">DEADLINE</th>
                  <th class="py-2 text-bold text-center">BOQ</th>
                  <th class="py-2 text-bold text-center">STATUS</th>
                  <th class="py-2 text-bold text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="cursor-pointer hover:bg-grey-lighter"
                  v-for="(requestQuote, index) in getOtherRequestQUote"
                  :key="index"
                >
                  <td class="py-2 pb-2 text-center">
                    {{ requestQuote.requestForQuoteNumber }}
                  </td>
                  <td class="py-2 pb-2 text-center">
                    {{ requestQuote.title }}
                  </td>
                  <td class="py-2 pb-2 text-center">
                    {{ requestQuote.currency }}
                  </td>
                  <td class="py-2 pb-2 text-center">
                    <button
                      type="button"
                      class="block px-2 py-1 text-sm text-center cursor-pointer border-none bg-cloudenly-warning-off text-cloudenly-warning-main rounded-lg"
                      @click="viewSupplier(requestQuote)"
                    >
                      view
                    </button>
                  </td>

                  <td class="py-2 pb-2 text-center">
                    {{ requestQuote.bidMethod }}
                  </td>

                  <td class="py-2 pb-2 text-center">
                    {{ requestQuote.submissionDeadline | date }}
                  </td>
                  <td class="py-2 pb-2 text-center">
                    <button
                      type="button"
                      class="block px-2 py-1 text-sm text-center cursor-pointer border-none bg-cloudenly-primary-off text-cloudenly-primary-main rounded-lg"
                      @click="viewBoqs(requestQuote)"
                    >
                      view
                    </button>
                  </td>

                  <td class="py-2 pb-2 text-center">
                    <span class="font-semibold text-cloudenly-danger-main"
                      >Draft</span
                    >
                  </td>

                  <td class="py-2 pb-2 text-center">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 8rem">
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="editQuotation(requestQuote.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Edit</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="viewQuotation(requestQuote.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">View</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="printQuotation(requestQuote)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Print</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openProcessModal(requestQuote.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Process/Approve </span>
                          </li>

                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openDeleteModal(requestQuote.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Close </span>
                          </li>
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </VuePerfectScrollbar>
      </div>

      <div v-else>
        <div>
          <table
            class="table table-auto table-responsive w-full border-collapse"
          >
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3" style="width: 12%">RFQ NO.</th>
                <th class="py-3" style="width: 12%">RFQ TITLE</th>
                <th class="py-3" style="width: 12%">REQUEST BY</th>
                <th class="py-3">CURRENCY</th>
                <th class="py-3">SUPPLIER(S)</th>
                <th class="py-3">BID METHOD</th>
                <th class="py-3">DEADLINE</th>
                <th class="py-3">BOQ</th>
                <th class="py-3">STATUS</th>
                <th class="py-3">ACTION</th>
              </tr>
            </thead>
          </table>
        </div>
        '
        <div
          class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
        >
          <div class="p-5">
            <div class="">
              <h3 class="m-0">You have not recieved any Request...</h3>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      search: "",
      value: "",
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      viewBoqModal: false,
      boqsDetails: null,
      toggleAdvance: false,
      showAdvance: false,
      supplierDetails: [],
      deleteModal: false,
      processModal: false,
      requestId: "",
    };
  },

  computed: {
    ...mapGetters("purchase/RequestQuote", [
      "isOtherRequestQuote",
      "getOtherRequestQUote",
    ]),
  },
  created() {},
  methods: {
    viewSupplier(val) {
      this.supplierModal = true;
      this.supplierDetails = val.requestQuoteSuppliers;
    },

    viewBoqs(val) {
      console.log(val);
      this.viewBoqModal = true;
      this.boqsDetails = val;
    },

    createQuote() {
      this.$router.push({
        name: "CreateRequestQuote",
      });
    },

    viewQuotation(data) {
      this.$router.push({
        name: "PreviewRequestQuote",
        params: {
          id: data.id,
        },
      });
    },

    printQuotation(data) {
      this.$router.push({
        name: "PrintRequestQuote",
        params: {
          id: data.id,
        },
      });
    },

    editQuotation(val) {
      this.$router.push({
        name: "EditRequestQuote",
        params: {
          id: val,
        },
      });
    },

    routePR() {
      this.$router.push({
        name: "PurchaseRequisition",
      });
    },

    openProcessModal(val) {
      (this.requestId = val), (this.processModal = true);
    },

    openDeleteModal(val) {
      this.requestId = val;
      this.deleteModal = true;
    },

    processRequestQuote() {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          requestForQuoteId: this.requestId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("purchase/RequestQuote/sendRequestQuote", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Request",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.processModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Request ",
            text: "Request Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    deleteRequestForQuote() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          requestForQuoteIds: [this.requestId],
        },
      };
      this.$store
        .dispatch("purchase/RequestQuote/deleteRecieveRequestQuote", {
          data: data,
        })
        .then((resp) => {
          this.$vs.notify({
            title: "Request ",
            text:  resp.data.message,
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

  mounted() {
    this.$store
      .dispatch("purchase/RequestQuote/getOtherRequestQuote")
      .then((resp) => {
        //
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>