<template>
  <div class>
    <!-- View BOQ -->
    <vs-popup button-close-hidden :active.sync="modal" title="BOQ">
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">Type</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <td class="py-3 text-center">{{ boq.type }}</td>
              <td class="py-3 text-center">{{ boq.unitOfMeasure }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantity }}</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-5 flex justify-center">
          <button
            @click="modal = false"
            class="
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              bg-cloudenly-primary-main
              rounded
            "
          >
            Close
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End View Boq Section -->

    <!-- delete waybill -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Request"
    >
      <div v-if="getIsAccOwner || getInventoryWaybillPrivileges.deleteWaybill">
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
                <p>You are about to delete this waybill</p>
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
              @click="deleteWaybill"
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
    <!-- End Delete waybill Section -->

    <!-- process waybill -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Request"
    >
      <div v-if="getIsAccOwner || getInventoryWaybillPrivileges.processWaybill">
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
                  Please note that this waybill may undergo Approval Process
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
              @click="processWaybill"
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
    <!-- End process waybill Section -->

    <div class="flex py-8 px-3 bg-white">
      <div class="w-1/3 mr-5">
        <input
          class="py-3 px-5 rounded-full w-full bg-gray-200"
          placeholder="Search..."
        />
      </div>

      <div class="w-1/3">
        <s-select />
      </div>

      <div class="w-1/3"></div>

      <div class="w-1/3">
        <div class="float-right">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <button
              class="
                hover:text-white
                inline-flex
                items-center
                border-0
                py-4
                px-5
                mr-2
                cursor-pointer
                bg-cloudenly-primary-main
                rounded-full
                text-white
              "
            >
              <span class="mr-3 text-white">Generate Waybill</span>
              <vs-icon
                icon="arrow_drop_down "
                class
                size="20px text-white"
              ></vs-icon>
            </button>

            <vs-dropdown-menu>
              <ul style="min-width: 12rem">
                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeSalesInvoice"
                >
                  <span class="ml-2"> Sales Invoice </span>
                </li>

                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeQuotation"
                >
                  <span class="ml-2">From Sales Quote </span>
                </li>

                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeSaleOrder"
                >
                  <span class="ml-2">From Sales Order </span>
                </li>
                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeSaleOrder"
                >
                  <span class="ml-2">From Purchase Order </span>
                </li>
                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeSalesMaterialReturn"
                >
                  <span class="ml-2">Material Return </span></li>
                <li
                  class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click.prevent="routeSalesMaterialRequest"
                >
                  <span class="ml-2">Material Request </span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>


  

    <div
      v-if="
        getIsAccOwner ||getInventoryWaybillPrivileges.viewIssuedAndReceivedWaybillRegisters
      " >
      <div class="bg-white mt-2">
        <div class v-if="getIsWaybill">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Issue To.
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Customer Email
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Waybill No.
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Reference
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date Issue
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BOQS
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="
                  cursor-pointer
                  hover:bg-grey-lightest
                  border border-solid border-grey-lighter border-r-0 border-l-0
                  font-normal
                "
                v-for="(waybill, index) in allWaybill"
                :key="index"
              >
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.customer ? waybill.customer.name : "Nil" }}
                  <!-- {{ waybill.customer }} -->
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.customer ? waybill.customer.email : "Nil" }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.waybillNumber }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  <span>{{ waybill.reference }}</span>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.createdAt | date }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="showBoqs(waybill.waybillBoqs)"
                    class="
                      px-2
                      py-1
                      text-sm
                      bg-cloudenly-primary-off
                      cursor-pointer
                      border-none
                      rounded
                      text-cloudenly-primary-main
                    "
                  >
                    view
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <span
                    class="text-cloudenly-success-main"
                    v-if="waybill.status === 'sent'"
                    >{{ waybill.status }}</span
                  >
                  <span class="text-cloudenly-danger-main" v-else>{{
                    waybill.status
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
                      <ul
                        v-if="waybill.status === 'sent'"
                        style="min-width: 12rem"
                      >
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
                          <span
                            class="ml-2"
                            @click.prevent="viewReceipt(waybill.id)"
                            >View</span
                          >
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
                          <span
                            class="ml-2"
                            >Edit</span
                          >
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
                          <span class="ml-2">Issue Credit Note</span>
                        </li> 

                        <!-- <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="toggleDeleteWaybill(waybill.id)"
                        >
                          <span class="ml-2">Delete</span>
                        </li> -->
                      </ul>

                      <ul v-else style="min-width: 12rem">
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary
                            hover:text-white
                          "
                          @click.prevent="editWaybill(waybill.id)"
                        >
                          <span class="ml-2">Edit</span>
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
                          @click.prevent="toggleProcessWaybill(waybill)"
                        >
                          <span class="ml-2">Process</span>
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
                          @click.prevent="toggleDeleteWaybill(waybill.id)"
                        >
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

        <div class="px-3" v-else>
          <table
            class="table table-auto table-responsive border-collapse w-full"
          >
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NAME
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NO.
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  INVOICE NO.
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  DESCRIPTION
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  DATE ISSUE
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BOQS
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  STATUS
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  ACTION
                </th>
              </tr>
            </thead>
          </table>

          <div
            
          >
            <div class="p-5">
              <div class>
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div class="text-cloudenly-primary-main text-lg font-bold mb-5">
                    There are no Waybill at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates an action or submits a form /
                    <br />
                    document, they show up here
                  </div>
                  <!-- <div
                    class="mt-10 bg-cloudenly-primary-main 
                    px-8
                    py-4
                    text-white text-center
                    cursor-pointer
                    rounded-full
                    w-2/4"
                    @click="createMaterialRequest"
                  >
                    Create new
                  </div> -->
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
            px-3
            py-5
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
</template>

<script>
import { mapGetters } from "vuex";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

export default {
  components: {},
  data() {
    return {
      illustration,
      modal: false,
      boqsDetails: [],
      search: "",
      waybillId: "",
      inventoryTypeId: "",
      deleteModal: false,
      processModal: false,

      processButton: false,
      deleteButton: false,
    };
  },

  computed: {
    ...mapGetters("sales/Waybill", ["allWaybill", "getIsWaybill"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesWaybillPrivileges",
      "getInventoryWaybillPrivileges",
    ]),
  },

  methods: {
    editWaybill(val) {
      this.$router.push({
        name: "EditWaybill",
        params: {
          id: val,
        },
      });
    },

    routeSalesInvoice() {
      if (
        this.getIsAccOwner ||
        this.getInventoryWaybillPrivileges.issueWaybill === true
      ) {
        this.$router.push({
          name: "Invoice",
        });
      } else {
        this.$vs.notify({
          title: "Waybill",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "waybill",
          category: "sales", 
        },
      });
    },

    routeQuotation() {
      if (
        this.getIsAccOwner ||
        this.getInventoryWaybillPrivileges.issueWaybill === true
      ) {
        this.$router.push({
          name: "ProformaQuote",
        });
      } else {
        this.$vs.notify({
          title: "Waybill",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    routeSalesMaterialReturn(){
      this.$router.push({
          name: "WaybillMaterialReturn",
        });
    },
    routeSalesMaterialRequest(){
      this.$router.push({
          name: "WaybillMaterialRequest",
        });
    },

    routeSaleOrder() {
      if (
        this.getIsAccOwner ||
        this.getInventoryWaybillPrivileges.issueWaybill === true
      ) {
        this.$router.push({
          name: "SalesPurchaseOrder",
        });
      } else {
        this.$vs.notify({
          title: "Waybill",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    routeGenerateCreditNote() {
      if (
        this.getIsAccOwner ||
        this.getInventoryWaybillPrivileges.generateCreditNote === true
      ) {
        this.$router.push({
          name: "",
        });
      } else {
        this.$vs.notify({
          title: "Waybill",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    toggleProcessWaybill(val) {
      this.waybillId = val.id;
      this.inventoryTypeId = val.inventoryTypeId;
      this.processModal = true;
    },

    generateGrn(val) {
      this.$router.push({
        name: "CreateWaybillGrn",
        params: {
          id: val,
        },
      });
    },

    showBoqs(val) {
      this.modal = true;
      this.boqsDetails = val;
    },

    processWaybill() {
      this.processButton = true;

      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          waybillId: this.waybillId,
          inventoryTypeId: this.inventoryTypeId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("sales/Waybill/processWaybill", data)
        .then((resp) => {
          console.log(resp);
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Waybill",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.processModal = false;
          this.processButton = false;

          this.$vs.notify({
            title: "Waybill",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    toggleDeleteWaybill(val) {
      (this.waybillId = val), (this.deleteModal = true);
    },

    deleteWaybill() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          waybillIds: [this.waybillId],
        },
      };
      this.$store
        .dispatch("sales/Waybill/deleteWaybill", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Waybill",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Waybill",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  mounted() {
    this.$store.dispatch("sales/Waybill/getAllWaybill");
  },
};
</script>

<style></style>
