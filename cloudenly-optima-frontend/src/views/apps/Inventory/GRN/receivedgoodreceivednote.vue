<template>
  <div>
    <vs-popup title="GRN Details" :active.sync="showBoqModal">
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in grnBoqs" :key="index">
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <td class="py-3 text-center">{{ boq.unitOfSale }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantityRequested }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <!-- delete grn -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete  Goods Received Note"
    >
      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.deleteGRN">
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
                'bg-cloudenly-primary-mid': deleteButton
              }"
              @click="deleteGrn"
              class="px-5 py-2 mr-5 bg-cloudenly-danger-main border-none text-white cursor-pointer rounded"
            >
              Close
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

    <!-- process grn -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Goods Received Note"
    >
      <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.processGRN">
        <div class="container">
          <div
            class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white"
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
                  Please note that this material request may undergo Approval
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
                'bg-cloudenly-primary-mid': processButton
              }"
              @click="processGRN"
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
      </div>
      <div>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End process  Section -->

    <div class="bg-white mt-2">
      <div class="flex px-3 py-5">
        <div class="w-1/3 mr-10">
          <input
            type="text"
            name
            placeholder="Search"
            class="px-5 py-2 rounded-full bg-gray-200 w-full border"
            id
          />
        </div>

        <div class="w-1/3">
          <select
            name
            id
            class="py-2 px-2 border border-gray-400 w-1/2 rounded"
          >
            <option value disabled selected>Filter GRN</option>
            <option value="all">All</option>
            <option value="product">Process</option>
            <option value="service">Unprocessed</option>
          </select>
        </div>

        <div class="w-1/3"></div>
      </div>

      <div class="mt-2 bg-white">
        <div v-if="getIsAccOwner || getGoodReceiveNotePrivileges.viewRegisters">
          <div v-if="getIsReceiveGrn">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th
                    class="py-4 px-6 tracking-wider text-dark-optima-color"
                    style="width: 12%"
                  >
                    GRN NO.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Supplier
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Description
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Qty Invoiced
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Qty Outstanding
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Qty Received
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Amount
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Status
                  </th>
                  <th
                    class="py-4 px-6 tracking-wider text-dark-optima-color"
                    style="width: 1%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border border-solid border-grey-light"
                  v-for="(grn, index) in getReceiveGrn"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.grnNumber }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <!-- {{ grn.senderInfo.name }} -->
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.description }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.totalQuantityInvoiced }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.totalQuantityOutstanding }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.totalQuantityReceived }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ grn.goodsReceivedNote.totalAmount }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span class="text-cloudenly-warning-main">{{
                      grn.status
                    }}</span>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleProcess(grn.id)"
                          >
                            <span class="ml-2">Process GRN</span>
                          </li>

                          <!-- <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleDelete(grn.id)"
                          >
                            <span class="ml-2">Delete</span>
                          </li> -->
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class>
            <table
              class="table table-auto border-collapse table-responsive w-full"
            >
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-3" style="width: 1%">S/N</th>
                  <th class="py-3" style="width: 12%">GRN NO.</th>
                  <th class="py-3">DESCRIPTION</th>
                  <th class="py-3">REASON</th>
                  <th class="py-3">QTY INVOICED</th>
                  <th class="py-3">QTY OUTSTANDING</th>
                  <th class="py-3">QTY RECEIVED</th>
                  <th class="py-3">AMOUNT</th>
                  <th class="py-3">STATUS</th>
                  <th class="py-3" style="width: 1%">ACTION</th>
                </tr>
              </thead>
            </table>

            <div>
              <div class="p-5">
                <div class>
                  <div
                    class="bg-white p-56 flex items-center space-x-20 justify-center"
                  >
                    <div><img :src="illustration" alt="illustration" /></div>
                    <div class="">
                      <div
                        class="text-cloudenly-primary-main text-lg font-bold mb-5"
                      >
                        There are no Good received note at the moment
                      </div>
                      <div class="leading-tight">
                        When a customer initiates an action or submits a form /
                        <br />
                        document, they show up here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination section -->
          <div
            class="p-2 mt-5 flex items-center flex-wrap flex-row justify-between"
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

        <div v-else>
          <s-privilege />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

export default {
  components: {},
  data() {
    return {
      illustration,
      allGoodRecieveNote: "",
      search: "",
      grnData: "",
      grnId: "",
      showBoqModal: false,
      grnBoqs: [],

      deleteModal: false,
      deleteButton: false,

      processModal: false,
      processButton: false
    };
  },
  methods: {
    routeEditGRN(val) {
      this.$router.push({ name: "EditGoodReceiveNote", params: { id: val } });
    },

    createNewGRN() {
      this.$router.push({ name: "CreateGoodReceiveNote" });
    },

    openModal(val) {
      this.grnData = val;
      this.showModal = true;
    },

    routerListPR() {
      this.$router.push({ name: "PurchaseOrder" });
    },

    routerListWaybill() {
      this.$router.push({ name: "Waybill" });
    },

    routerListInvoice() {
      this.$router.push({ name: "PurchaseInvoice" });
    },

    toggleProcess(val) {
      (this.grnId = val), (this.processModal = true);
    },

    processGRN() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          grnId: this.grnId,
          manualApproval: {
            isManualApproval: false,
            scellooId: ""
          }
        }
      };

      this.$store
        .dispatch("inventory/grn/sendGrn", data)
        .then(resp => {
          (this.processButton = false), (this.processModal = false);
          this.$vs.notify({
            title: "Good Receive Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          (this.processButton = false),
            this.$vs.notify({
              title: "Good Receive Note",
              text: err.response.data.message,
              color: "danger",
              position: "top-right"
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
          receivedGoodsReceivedNoteIds: [this.grnId]
        }
      };

      this.$store
        .dispatch("inventory/grn/deleteGrn", { data: data })
        .then(resp => {
          console.log(resp.data);
          (this.deleteButton = false), (this.deleteModal = false);
          this.$vs.notify({
            title: "Good Receive Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          (this.deleteButton = false),
            this.$vs.notify({
              title: "Good Receive Note",
              text: err.response.data.message,
              color: "danger",
              position: "top-right"
            });
        });
    }
  },

  computed: {
    ...mapGetters("inventory/grn", ["getIsReceiveGrn", "getReceiveGrn"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getGoodReceiveNotePrivileges"
    ])
  },

  mounted() {
    this.$store.dispatch("inventory/grn/ReceivedGrn");
  }
};
</script>

<style></style>
