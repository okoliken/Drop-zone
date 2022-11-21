<template>
  <div>
    <!-- View BOQ -->
    <vs-popup :active.sync="boqModal" title=" Purchase Boqs Details">
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
              <td class="py-3 text-center">{{ boq.quantityRequested }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>
    <!-- End View Boq Section -->

    <!-- View Supplier -->

    <vs-popup :active.sync="supplierModal" title=" Requisition Supplier">
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

    <!-- delete requisition -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Requisition"
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
              <p>You are about to Delete this purchase Requisition</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            @click="deleteRequisition"
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

    <!-- process requisition -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Requisition"
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
                Please note that this Requisition may undergo Approval Process
              </p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            @click="processRequisition"
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

    <div class="rounded-lg mt-3 py-2 px-1">
      <div class="vx-row mb-3">
        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="vx-auto-suggest">
            <div class="flex items-center relative">
              <input
                type="text"
                class="py-3 w-full form-control-lg 5 border-solid bg-grey-lighter border-grey-light rounded border-0"
                placeholder="Search  Requisition Title"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <a
              @click="createRequisition"
              class="py-2 px-5 inline-block bg-cloudenly-primary-mid hover:text-white text-white rounded cursor-pointer"
            >
              Create Requisition
            </a>
          </div>
        </div>
      </div>

      <div v-if="isOtherRequisition">
        <VuePerfectScrollbar class="h-84" :settings="settings">
          <div class="bg-grey-lightest shadow-lg mt-2 rounded">
            <table
              class="table table-auto table-responsive border-collapse w-full"
            >
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-4">PR NO</th>
                  <th class="py-4">PR TITLE</th>
                  <th class="py-4">REQUESTED BY</th>
                  <th class="py-4">CATEGORY</th>
                  <th class="py-4">SUPPLIER(S)</th>
                  <th class="py-4">BOQ</th>
                  <th class="py-4">DATE REQUIRED</th>
                  <th class="py-4">STATUS</th>
                  <th class="py-4 text-center">ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="cursor-pointer hover:bg-grey-lighter hover:shadow-lg"
                  v-for="(requisition, index) in getOtherRequisition"
                  :key="index"
                >
                  <td class="py-3 pl-3 text-center">
                    {{ requisition.purchaseRequisitionNumber }}
                  </td>
                  <td class="py-3 pl-3 text-center">{{ requisition.title }}</td>
                  <td class="py-3 pl-3 text-center">N/A</td>
                  <td class="py-3 pl-3 text-center"></td>
                  <td class="py-3 pl-4 text-center">
                    <button
                      type="button"
                      class="block px-2 py-1 text-sm text-center cursor-pointer border-none bg-cloudenly-warning-off text-cloudenly-warning-main rounded-lg"
                      @click="viewSupplier(requisition)"
                    >
                      view
                    </button>
                  </td>
                  <td class="text-center">
                    <button
                      type="button"
                      class="block px-2 py-1 text-sm text-center cursor-pointer border-none bg-cloudenly-primary-off text-cloudenly-primary-main rounded-lg"
                      @click="viewBoqs(requisition)"
                    >
                      view
                    </button>
                  </td>

                  <td class="py-3 pl-3 text-center">
                    {{ requisition.subRequestCategory }}
                  </td>

                  <td class="py-3 pl-3 text-center">
                    <span
                      class="text-sm font-semibold text-cloudenly-danger-main"
                      >{{ requisition.status }}</span
                    >
                  </td>

                  <td class="text-center">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 16rem">
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="routeEditPr(requisition.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Edit</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="viewRequisation(requisition.hash)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">View</span>
                          </li>

                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="
                              approveRequisition(requisition.hash)
                            "
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Approve Requisition</span>
                          </li>

                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="
                              openProcessRequisitionModal(requisition.id)
                            "
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Process PR</span>
                          </li>
                          <!-- <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="generateRFQ(requisition.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Generate RFQ</span>
                          </li> -->
                          <li
                            class="f lex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="
                              generatePurchaseOrder(requisition.id)
                            "
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Generate PO</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="
                              openDeleteRequisitionModal(requisition.id)
                            "
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Delete</span>
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
        <div class="">
          <table
            class="table table-auto table-responsive w-full border-collapse"
          >
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-4">PR NO</th>
                <th class="py-4">PR TITLE</th>
                <th class="py-4">REQUESTED BY</th>
                <th class="py-4">CATEGORY</th>
                <th class="py-4">SUPPLIER(S)</th>
                <th class="py-4">BOQ</th>
                <th class="py-4">DATE REQUIRED</th>
                <th class="py-4">STATUS</th>
                <th class="py-4 text-center">ACTION</th>
              </tr>
            </thead>
          </table>
        </div>
        <div
          class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
        >
          <div class="p-5">
            <div class="">
              <h3 class="m-0">
                You have no purchase requisition requiring your approval.
                <!-- <span @click="createRequisition"
                                class="text-cloudenly-primary-main cursor-pointer pl-1">Click here to create one..</span> -->
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
  components: {},
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      search: "",
      businessData: "",
      userData: "",
      boqsDetails: [],
      supplierDetails: [],
      showAdvance: false,
      toggleAdvance: false,
      boqModal: false,
      processModal: false,
      deleteModal: false,
      supplierModal: false,
    };
  },
  methods: {
    viewBoqs(val) {
      console.log(val);
      this.modal = true;
      this.boqsDetails = val;
    },

    viewSupplier(val) {
      this.supplierModal = true;
      this.supplierDetails = val.purchaseRequisitionSuppliers;
    },

    createRequisition() {
      this.$router.push({
        name: "CreatePurchaseRequisition",
      });
    },
    routeEditPr(val) {
      this.$router.push({
        name: "EditPurchaseRequisition",
        params: {
          id: val,
        },
      });
    },

    approveRequisition() {
      // this method approve requisition
    },

    // generateRFQ(val) {
    //   this.$router.push({
    //     name: "GenerateRequestQuotePr",
    //     params: { id: val },
    //   });
    // },

    generatePurchaseOrder(val) {
      this.$router.push({
        name: "GeneratePurchaseOrderPr",
        params: {
          id: val,
        },
      });
    },

    printrequisition(data) {
      this.$router.push({
        name: "PrintRequisition",
        params: { id: data.hash },
      });
    },

    viewRequisation(data) {
      this.$router.push({
        name: "PreviewPurchaseRequisition",
        params: { id: data.hash },
      });
    },

    openDeleteRequisitionModal(val) {
      this.RequisitionId = val;

      this.deleteModal = true;
    },

    openProcessRequisitionModal(val) {
      this.RequisitionId = val;
      this.processModal = true;
    },

    deleteRequisition() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          purchaseRequisitionIds: [this.RequisitionId],
        },
      };
      this.$store
        .dispatch("purchase/Requisition/deletRequistion", { data: data })
        .then((resp) => {
          this.$vs.notify({
            title: "Requisition ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.deleteModal = false;
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Requisition ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processRequisition() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          purchaseRequisitionId: this.RequisitionId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("purchase/Requisition/sendRequisition", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Requisition  ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.processModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Requisition ",
            text: "Requisition Error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("purchase/Requisition", [
      "isOtherRequisition",
      "getOtherRequisition",
    ]),
  },

  mounted() {
    this.$store
      .dispatch("purchase/Requisition/getOtherRequisition")
      
  },
};
</script>

<style scoped>
</style>
