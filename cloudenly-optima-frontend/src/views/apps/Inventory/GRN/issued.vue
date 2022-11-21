<template>
  <div>
    <!-- delete good received note -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete  Goods Received Note"
    >
      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.deleteGRN">
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
                <p>You are about to delete this goods receive notes</p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              :disabled="deleteButton"
              :class="{
                'cursor-not-allowed': deleteButton,
                'bg-cloudenly-primary-mid': deleteButton,
              }"
              @click="deleteGrn"
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
    <!-- End Section -->

    <!-- process good receive note -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Share with Supplier"
    >
      <div
        v-if="
          getIsAccOwner ||
          getGoodReceiveNotePrivileges.processGRN ||
          getGoodReceiveNotePrivileges.issueGRN
        "
      >
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
              border-cloudenly-primary-main
              bg-white
            "
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
                  Please note that this good received notes may undergo Approval
                  Process
                </p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              :disabled="processButton"
              :class="{
                'cursor-not-allowed': processButton,
                'bg-cloudenly-primary-mid': processButton,
              }"
              @click="processGRN"
              class="
                px-5
                py-2
                mr-5
                bg-cloudenly-primary-main
                border-none
                text-white
                cursor-pointer
                rounded
              "
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
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End good received note Section -->

    <!-- share request -->
    <vs-popup
      button-close-hidden
      :active.sync="shareModal"
      title="Share Good  Received Note"
    >
      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.shareGRN">
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
              border-cloudenly-primary-main
              bg-white
            "
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
                <h1 class="m-0">Share Info</h1>
                <p>
                  Please note are about to share this good received note with
                  this supplier
                </p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              @click="shareModal = false"
              class="
                px-5
                py-2
                mr-5
                bg-cloudenly-primary-main
                border-none
                text-white
                cursor-pointer
                rounded
              "
            >
              Share
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="shareModal = false"
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

    <!-- view boq  modal -->
    <vs-popup
      button-close-hidden
      :active.sync="viewBoqModal"
      title=" View Boqs"
    >
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Quantity Invoiced</th>
              <th class="py-3 text-center">Quantity Received</th>
              <th class="py-3 text-center">Quantity Outstanding</th>
              <th class="py-3 text-center">Amount (#)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <td class="py-3 text-center">{{ boq.unitOfSale }}</td>
              <td class="py-3 text-center">{{ boq.quantityInvoiced }}</td>
              <td class="py-3 text-center">{{ boq.quantityReceived }}</td>
              <td class="py-3 text-center">{{ boq.quantityOutstanding }}</td>
              <td class="py-3 text-center">
                {{ boq.purchasePrice | formatCurrency }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-3 flex items-center justify-center">
          <button
            class="
              border-none
              bg-primary-optima-color
              rounded-full
              text-white
              px-8
              py-3
              cursor-pointer
            "
            @click="viewBoqModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Section -->

    <div class>
      <div class="flex items-center py-8 bg-white px-3">
        <div class="w-1/3 mr-10">
          <input
            type="text"
            name
            placeholder="Search"
            class="px-5 py-3    23 rounded-full bg-gray-200 w-full border"
            id
          />
        </div>

        <div class="w-1/3">
          <s-select
            name
            class="py-2 px-2 border border-gray-400 w-1/2 rounded"
            id
            placeholder="Filter By Status"
          >
            
          </s-select>
        </div>

        <div class="w-1/3">
          <div class="float-right">
            <drop-down>
              <div slot="title">
                <button
                  class="
                    inline-flex
                    items-center
                    py-2
                    px-5
                    mr-3
                    cursor-pointer
                    bg-cloudenly-primary-main
                    text-white
                    rounded-full
                    border-cloudenly-primary-mid
                  "
                >
                  <span class="mr-3">Generate GRN</span>
                  <vs-icon icon="arrow_drop_down " class size="25px"></vs-icon>
                </button>
              </div>

              <div slot="body" class="bg-white shadow">
                <ul style="min-width: 15rem">
                  <li
                    @click.prevent="createNewGRN"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="ml-2"> Create New </span>
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
                    <span class="ml-2">New Supply</span>
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
                    <span class="ml-2" @click="routeMaterialReturnGRN">From Material Return</span>
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
                    <span class="ml-2" @click="routeMaterialRequestGRN">From Material Request</span>
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
                    @click="routeWaybillGRN"
                  >
                    <span class="ml-2">Waybill</span>
                  </li>
                  <li
                    @click.prevent="routerPurchaseQuote"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="ml-2">Quote</span>
                  </li>

                  <li
                    @click.prevent="routerListInvoice"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="ml-2">Invoice</span>
                  </li>

                  <li
                    @click.prevent="routerListPR"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="ml-2">Purchase Order</span>
                  </li>
                </ul>
              </div>
            </drop-down>
          </div>
        </div>
      </div>

      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.viewRegisters">
        <div class="mt-2 bg-white">
          <div class v-if="getIsGrn">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    GRN No.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Supplier
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Description
                  </th>
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Reference No.
                  </th> -->
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Qty Invoiced
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Qty Outstanding
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Qty Received
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Amount
                  </th>

                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    View
                  </th> -->

                  <th class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap">
                    Status
                  </th>
                  <th
                    class="py-4 px-6 tracking-wider text-dark-optima-color whitespace-nowrap"
                    style="width: 1%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="
                    border border-solid border-grey-light border-l-0 border-r-0
                  "
                  v-for="(grn, index) in getallGrn"
                  :key="index"
                >
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.grnNumber }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.supplier.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.description }}
                  </td>
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.supplier.reference }}
                  </td> -->
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.totalQuantityInvoiced }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.totalQuantityOutstanding }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.totalQuantityReceived }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border whitespace-nowrap">
                    {{ grn.totalAmount | currency }}
                  </td>

                  <!-- <td class="px-6 py-3 whitespace-no-wrap border whitespace-nowrap">
                    <button
                      type="button"
                      class="
                        block
                        px-2
                        py-1
                        text-sm text-center
                        cursor-pointer
                        border-none
                        bg-cloudenly-primary-off
                        text-cloudenly-primary-main
                        rounded-lg
                      "
                      @click="viewBoqs(grn)"
                    >
                      view
                    </button>
                  </td> -->

                  <td class="px-6 py-6 whitespace-no-wrap border">
                    <span
                      v-if="grn.status === 'draft'"
                      class=" py-4 rounded-md px-6 bg-cloudenly-primary-off
                        text-cloudenly-primary-main"
                      >{{ grn.status | capitalize }}</span
                    >
                    <span
                      v-if="grn.status === 'sent'"
                      class=" bg-green-100 py-4 px-6 rounded-md  text-tetiary-optima-color"
                      >{{ grn.status | capitalize }}</span
                    >
                    <span
                      v-if="grn.status === 'pendingApproval'"
                      class="py-4 px-2 rounded-md  bg-cloudenly-warning-off text-cloudenly-warning-main"
                      >Pending</span
                    >
                  </td>
                  <td class="px-6 py-6 whitespace-no-wrap border">
                    <vs-dropdown
                      vs-custom-content
                      vs-trigger-click
                      v-if="grn.status === 'draft'"
                    >
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <li
                            v-if="grn.status === 'draft'"
                            class="
                              flex
                              py-4
                              px-4
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="routeEditGRN(grn.id)"
                          >
                            <span class="ml-2">Edit </span>
                          </li>
                          <li
                            v-if="grn.status === 'draft'"
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                            "
                            @click.prevent="toggleProcess(grn)"
                          >
                            <span class="ml-2">Process GRN</span>
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
                            <span class="ml-2">View</span>
                          </li>

                          <!-- <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="shareModal = true"
                        >
                          <span class="ml-2">Share with Supplier</span>
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
                            @click.prevent="toggleDelete(grn.id)"
                          >
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

          <div v-else class>
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    GRN NO.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    SUPPLIER
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    DESCRIPTION
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    QTY INVOICED
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    QTY OUTSTANDING
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    QTY RECEIVED
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    AMOUNT
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    STATUS
                  </th>
                  <th
                    class="py-4 px-6 tracking-wider text-dark-optima-color"
                    style="width: 1%"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
            </table>

            <div class>
              <div
                
              >
                 <div class>
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div class="text-cloudenly-primary-main text-lg font-bold mb-5">
                    There are no Good Received note at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates an action or submits a form /
                    <br />
                    document, they show up here
                  </div>
                  <div
                    class="mt-10 bg-cloudenly-primary-main 
                    px-8
                    py-4
                    text-white text-center
                    cursor-pointer
                    rounded-full
                    w-2/4"
                    @click="createNewGRN"
                  >
                    Create new
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

          <!-- Pagination section -->
          <div
            class="
              p-2
              mt-5
              flex
              items-center
              flex-wrap flex-row
              justify-between
            "
          >
            <div class="flex items-center">
              <p class="mr-2">Show :</p>
              <select name class="py-1 mr-2" id>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p>Per Page</p>
            </div>

            <div class="flex items-center">
              <p class="mr-2">Show</p>
              <select name class="py-1 mr-2" id>
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
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

// import GoodReceiveNoteAnalysis from "./GoodReceiveNoteAnalysis"
export default {
  components: {
    // GoodReceiveNoteAnalysis
  },
  data() {
    return {
       illustration,
      allGoodRecieveNote: "",
      search: "",
      grnData: "",
      grnId: "",
      showBoqModal: false,
      grnBoqs: [],
      inventoryTypeId: null,

      deleteModal: false,
      deleteButton: false,

      shareModal: false,

      processModal: false,
      processButton: false,
      viewBoqModal: false,

      boqsDetails: [],
    };
  },

  methods: {
    routeEditGRN(val) {
      this.$router.push({ name: "EditGoodReceiveNote", params: { id: val } });
    },

    createNewGRN() {
      this.$router.push({ name: "CreateGoodReceiveNote" });
    },

    viewBoqs(val) {
      this.boqsDetails = val.goodsReceivedNoteBoqs;
      this.viewBoqModal = true;
    },
    routeMaterialRequestGRN() {
      this.$router.push({
        name: "MaterialRequestGRN"
      });
      },
    routeMaterialReturnGRN() {
      this.$router.push({
        name: "MaterialReturnGRN"
      });
      },
    routeWaybillGRN() {
      this.$router.push({
        name: "WaybillGRN"
      });
      },
    routerListPR() {
      if (
        this.getIsAccOwner ||
        this.getGoodReceiveNotePrivileges.issueGRN === true
      ) {
        this.$router.push({ name: "PurchaseOrders" });
      } else {
        this.$vs.notify({
          title: "Good Receive Note",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    routerPurchaseQuote() {
      if (
        this.getIsAccOwner ||
        this.getGoodReceiveNotePrivileges.issueGRN === true
      ) {
        this.$router.push({ name: "PurchaseProforma" });
      } else {
        this.$vs.notify({
          title: "Good Receive Note",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    routerListInvoice() {
      if (
        this.getIsAccOwner ||
        this.getGoodReceiveNotePrivileges.issueGRN === true
      ) {
        this.$router.push({ name: "PurchaseInvoice" });
      } else {
        this.$vs.notify({
          title: "Good Receive Note",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    toggleProcess(val) {
      (this.grnId = val.id), (this.inventoryTypeId = val.inventoryTypeId);
      this.processModal = true;
    },

    processGRN() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo,
        payload: {
          grnId: this.grnId,
          inventoryTypeId: this.inventoryTypeId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("inventory/grn/sendGrn", data)
        .then((resp) => {
          (this.processButton = false), (this.processModal = false);
          this.$vs.notify({
            title: "Good Receive Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          (this.processButton = false),
            this.$vs.notify({
              title: "Good Receive Note",
              text: err.response.data.message,
              color: "danger",
              position: "top-right",
            });
        });
    },

    toggleDelete(val) {
      this.grnId = val;
      this.deleteModal = true;
    },

    deleteGrn() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          goodsReceivedNoteIds: [this.grnId],
        },
      };

      this.$store
        .dispatch("inventory/grn/deleteGrn", data)
        .then((resp) => {
          // console.log(resp.data);
          (this.deleteButton = false), (this.deleteModal = false);
          this.$vs.notify({
            title: "Good Receive Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          (this.deleteButton = false),
            this.$vs.notify({
              title: "Good Receive Note",
              text: err.response.data.message,
              color: "danger",
              position: "top-right",
            });
        });
    },

    generateDebitNote() {
      if (
        this.getIsAccOwner ||
        this.getGoodReceiveNotePrivileges.genrateDebitNote === true
      ) {
        this.$router.push({ name: "" });
      } else {
        this.$vs.notify({
          title: "Good Receive Note",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("inventory/grn", ["getIsGrn", "getallGrn"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getGoodReceiveNotePrivileges",
    ]),
  },

  mounted() {
    this.$store.dispatch("inventory/grn/getAllGrn");
  },
};
</script> 

<style>
</style>
