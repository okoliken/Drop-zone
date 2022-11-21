<template>
  <div>
    <div>
      <p class="font-bold text-xl text-dark-optima-color">Purchase Order</p>
    </div>

    <!-- <SalesPurchaseOrderAnalysis
      v-if="getIsAccOwner || getSalesPurchaseOrderPrivileges.viewDashboard"
      class="mt-5"
    /> -->
    <!-- View order boq -->
    <vs-popup :active.sync="modal" title="BOQ">
      <div v-if="getIsAccOwner || getSalesPurchaseOrderPrivileges.viewBOQ">
        <div class="container">
          <table class="table w-full table-auto table-responsive">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3 text-center">Name</th>
                <th class="py-3 text-center">Type</th>
                <th class="py-3 text-center">Description</th>
                <th class="py-3 text-center">Quantity</th>
                <th class="py-3 text-center">Unit Price</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in boqsDetails" :key="index">
                <td class="py-3 text-center">{{ item.name }}</td>
                <td class="py-3 text-center">{{ item.itemClass }}</td>
                <td class="py-3 text-center">{{ item.description }}</td>
                <td class="py-3 text-center">{{ item.quantity }}</td>
                <td class="py-3 text-center">
                  {{ item.unitPrice | currency }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Order boq -->

    <!-- delete receive purchase order -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Purchase Order"
    >
      <div v-if="getIsAccOwner || getSalesPurchaseOrderPrivileges.deletePO">
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
                <p>You are about to delete this purchase order</p>
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
              @click="deletePurchaseOrder"
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
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Delete Purchase Order Section -->

    <div class="mt-3">
      <div class="bg-white py-2">
        <div class="py-5 px-5">
          <p class="font-bold text-dark-optima-color text-lg">
            Search & Filter
          </p>
        </div>

        <div class="py-2 px-5 flex items-center align-items-center">
          <div class="w-1/3 mr-5">
            <input
              class="py-3 px-5 rounded-full w-full bg-gray-200"
              placeholder="Search..."
            />
          </div>

          <div class="w-1/3">
            <select
              name
              class="py-1 px-2 border-2 border-gray-400 w-1/2 rounded"
              id
              placeholder="Filter By Status"
            >
              <option value disabled selected>Filter by Status</option>
              <option value="all">draft</option>
              <option value="sent">Sent</option>
              <option value="overdue">Overdue</option>
              <option value="service">Unsent</option>
            </select>
          </div>

          <div class="w-1/3"></div>
        </div>
      </div>

      <div
        v-if="getIsAccOwner || getSalesPurchaseOrderPrivileges.viewPORegister"
      >
        <div class="bg-white mt-3">
          <div v-if="getIsSaleOrderStatus">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    ORDER NO.
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    TITLE
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    EXPECTED DELIVERY DATE
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    ORDER AMT
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    CUSTOMER NAME
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
              <tbody>
                <tr v-for="(order, index) in getSaleOrder" :key="index">
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ order.purchaseOrder.orderNumber }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ order.purchaseOrder.description }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ order.purchaseOrder.expectedDeliveryDate | date }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ order.purchaseOrder.total | currency }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span v-if="order.senderInfo === null">N/A</span>
                    <span v-else>{{ order.senderInfo.name }}</span>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <button
                      type="button"
                      class="border-none px-2 text-sm py-1 bg-cloudenly-primary-main rounded-full text-white cursor-pointer"
                      @click="viewBoqs(order.purchaseOrder.purchaseOrderBoqs)"
                    >
                      view
                    </button>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span class="font-semibold text-cloudenly-danger-main">{{
                      order.status
                    }}</span>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <!-- <li
                        @click="viewOrder(order.id)"
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      >
                        <span>View</span>
                      </li> -->
                          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                        <span>Print</span>
                      </li> -->
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="generateInvoice(order)"
                          >
                            <span>Generate Invoice</span>
                          </li>

                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="generateWaybill(order)"
                          >
                            <span>Generate Waybill</span>
                          </li>

                          <!-- Might need to be brought back later -->
                          <!-- <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleDeleteModal(order)"
                          >
                            <span>Delete</span>
                          </li> -->
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else>
            <table
              class="table table-auto table-responsive w-full border-collapse mt-3"
            >
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-3 text-center" style="width: 12%">ORDER NO.</th>
                  <th class="py-3 text-center">DESCRIPTION</th>
                  <th class="py-3 text-center">VALIDITY</th>
                  <th class="py-3 text-center">ORDER AMT</th>
                  <th class="py-3 text-center">CUSTOMER NAME</th>
                  <th class="py-3 text-center">BOQS</th>
                  <th class="py-3 text-center">STATUS</th>
                  <th class="py-3 text-center">ACTION</th>
                </tr>
              </thead>
            </table>
            <div
              class="border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
            >
              <div class="p-3">
                <div class>
                  <h3 class="m-0">
                    None of your Customer have sent you a Purchase Order..
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
            class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
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
import SalesPurchaseOrderAnalysis from "./salesPurchaseOrderAnalysis";
export default {
  components: {
    SalesPurchaseOrderAnalysis,
  },
  data() {
    return {
      search: "",
      modal: false,
      loading: true,
      boqsDetails: [],
      deleteButton: false,
      deleteModal: false,
      id: null,
    };
  },
  methods: {
    viewBoqs(val) {
      this.boqsDetails = val;
      this.modal = true;
    },

    viewOrder(val) {
      this.$router.push({
        name: "ViewSalesPurchaseOrder",
        params: { id: val },
      });
    },

    generateInvoice(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesPurchaseOrderPrivileges.generateWaybill === true
      ) {
        this.$router.push({
          name: "GenerateInvoicePurchaseOrder",
          params: { id: val.id },
        });
      } else {
        this.$vs.notify({
          title: "Purchase Order",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generateWaybill(val) {
      if (
        this.getIsAccOwner ||
        this.getSalesPurchaseOrderPrivileges.generateWaybill === true
      ) {
        this.$router.push({
          name: "generateWaybill",
          query: {
            module: "saleOrder",
          },
          params: { id: val.id },
        });
      } else {
        this.$vs.notify({
          title: "Purchase Order",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generateCreditNote(val) {
      if (this.getIsAccOwner || this.getSalesPurchaseOrderPrivileges === true) {
        this.$router.push({
          name: "",
          query: {
            module: "saleOrder",
          },
          params: { id: val.id },
        });
      } else {
        this.$vs.notify({
          title: "Purchase Order",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    toggleDeleteModal(val) {
      console.log(val);
      // this.id = val.purchaseOrder.id;
      this.id = val.id;
      this.deleteModal = true;
    },

    deletePurchaseOrder() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          receivedPurchaseOrderIds: [this.id],
        },
      };
      this.$store
        .dispatch("sales/SaleOrder/deleteSalesOrder", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Purchase Order",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Purchase Order",
            text: err.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    changePurchaseOrderStatus() {
      this.deleteButton = true;
      this.$store
        .dispatch("sales/SaleOrder/getChangeSaleOrderStatus", this.id)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Purchase Order",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Purchase Order",
            text: err.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("sales/SaleOrder", ["getIsSaleOrderStatus", "getSaleOrder"]),
    ...mapGetters("crm/contact", ["allContact", "allLoyalty", "getIsCustomer"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesPurchaseOrderPrivileges",
    ]),
  },

  mounted() {
    this.$store.dispatch("sales/SaleOrder/getAllSaleOrder");
    this.$store.dispatch("crm/contact/getAllContact");
  },
};
</script>

<style></style>
