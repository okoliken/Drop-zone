<template>
  <div>
    <!-- view boqs -->
      <s-modal :modal="modal">
      <div class="w-full" v-if="getIsAccOwner || getPurchaseOrderPrivileges.viewBOQ">
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

    <!-- delete request -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Purchase Order"
    >
      <div v-if="getIsAccOwner || getPurchaseOrderPrivileges.deletePO">
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
                <p>You are about to delete this purchase order</p>
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
              @click="deleteOrder"
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
    <!-- End Delete Requisition Section -->

    <!-- process order -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Purchase Order"
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
                Please note that this purchase order may undergo Approval
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
            @click="processPurchaseOrder"
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
    </vs-popup>
    <!-- End process order Section -->

    <div class="bg-white px-6 pt-8 pb-10 font-normal">
      <div class="flex justify-between items-center"> 
        <div class="flex items-center">
          <s-combo-box  v-model="search"/>
        </div>

        <drop-down>
          <div slot="title">
            <button
              class="
                flex
                items-center
                px-6
                bg-primary-optima-color
                text-white
                font-medium
              "
              style="border-radius: 50px; height: 36px"
            >
              Create New
              <feather-icon
                icon="ChevronDownIcon"
                svgClasses="ml-5 h-6 w-6 cursor-pointer"
              />
            </button>
          </div>

          <div slot="body">
            <div class="p-2 bg-white">
              <ul style="min-width: 12rem">
                <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click="createPurchaseOrder"
                >
                  New
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
                  @click="routePR"
                >
                  From PR
                </li>
              </ul>
            </div>
          </div>
        </drop-down>

        
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

    <div v-if="getIsAccOwner || getPurchaseOrderPrivileges.viewPORegister">
      <vue-perfect-scrollbar :settings="settings">
        <s-table
          :headers="headers"
          :items="filterPO" 
          :emptyStateImg="img"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Purchase Orders Yet...</p>
          </div>

          <div slot="body">
            <p>
              All purchase made by your organizations are accompanied with
              purchase orders which are listed here. For now you do not have any
              saved. Click on the link below to create a new PO. They can be
              created from waybills, invoices or manually entered.
            </p>
            <p class="text-secondary-optima-color mt-2">
              Create New Purchase Order
            </p>
          </div>
          <template v-slot:item="{ item }">   
            
            <button
              class="text-secondary-optima-color font-medium"
              v-if="item.purchaseOrderBoqs"
              @click="viewBoqs(item.data.purchaseOrderBoqs)"
            >
              View
            </button>

            <span class="leading-loose" v-else-if="item.total">
              {{ item.data.total | formatCurrency }}
            </span>

            <span v-else-if="item.createdAt">{{ item.data.createdAt | date }}</span>

            <span v-else-if=" item.expectedDeliveryDate ">
              {{ item.data.expectedDeliveryDate | date }}
            </span>

            <span v-else-if="item.supplier">
              {{ item.data.supplier.name }}
            </span>

            <div v-else-if="item.status">
              <span
                v-if="item.data.status === 'draft'"
                class="text-danger-optima-color"
                >{{ item.data.status | capitalize }}</span
              >
              <span
                v-if="item.data.status === 'sent'"
                class="text-tetiary-optima-color"
                >Approved</span
              >
            </div>

            <span v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon
                    class="h-6 w-6"
                    icon="MoreHorizontalIcon"
                  ></feather-icon>
                </div>
                <vs-dropdown-menu>
                  <!-- //TODO Add Print and View purchase order functionality to the dropdown -->
                  <ul
                    v-if="item.data.status === 'sent'"
                    style="min-width: 12rem"
                  >
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="viewReceipt(item.data.id)"
                    >
                      <span>Preview</span>
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
                      @click.prevent="generateGRN(item.data.id)"
                    >
                      <span>Generate GRN</span>
                    </li>

                    <!-- <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="toggleDeleteOrder(item.data.id)"
                    >
                      <span>Delete</span>
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
                      @click.prevent="EditPurchaseOrder(item.data.id)"
                    >
                      <span>Edit Order</span>
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
                      @click.prevent="toggleProcess(item.data.id)"
                    >
                      <span>Process Order</span>
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
                      @click.prevent="toggleDeleteOrder(item.data.id)"
                    >
                      <span>Delete</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </span>
          </template>
        </s-table>
      </vue-perfect-scrollbar>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PurchaseOrderAnalysis from "./purchaseOrderAnalysis";
import { mapGetters } from "vuex";
import emptyTableIcon from "@/assets/images/optimaAsset/purchaseOrderEmptyState.svg";

export default {
  components: {
    PurchaseOrderAnalysis,
    VuePerfectScrollbar,
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      img: emptyTableIcon,
      search: "",
      boqsDetails: [],
      orderId: "",
      modal: false,
      processModal: false,
      deleteModal: false,

      processButton: false,
      deleteButton: false,
      headers: [
        { text: "PO No.", value: "orderNumber" },
        { text: "PO Title", value: "title" },
        { text: "Shipping Method", value: "shippingMethod" },
        { text: "Exp.Del.Date", value: "expectedDeliveryDate" },
        { text: "Amt (₦) (VAT Incl.)", value: "total" },
        { text: "Supplier", value: "supplier" },
        { text: "BOQ", value: "purchaseOrderBoqs" },
        { text: "Status", value: "status" },
        { text: "Date Created", value: "createdAt" },
        { text: "Action", value: "id" }, 
      ],
    };
  },

  methods: {
     async pagination(data) {
      await this.$store.dispatch("crm/contact/getAllContact", data);
    },
    viewBoqs(val) {
      this.boqsDetails = val;
      this.modal = true;
    },

    createPurchaseOrder() {
      this.$router.push({
        name: "CreatePurchaseOrder",
      });
    },

    EditPurchaseOrder(val) {
      this.$router.push({
        name: "PurchaseOrder",
        params: { id: val },
        query: { type: "edit" },
      });
    },

    routeProforma() {
      this.$router.push({
        name: "PurchaseProforma",
      });
    },

    routePR() {
      if (
        this.getIsAccOwner ||
        this.getPurchaseOrderPrivileges.createPO === true
      ) {
        this.$router.push({
          name: "purchaseRequisitions",
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

    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "purchaseorder",
          category: "purchase",
        },
      });
    },

    generateGRN(id) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseOrderPrivileges.generateGoodsReceivedNote === true
      ) {
        this.$router.push({
          name: "sharedGoodReceivedNote",
          params: { id },
          query: { type: "po" },
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

    generateDebitNote(id) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseOrderPrivileges.generateDebitNote === true
      ) {
        this.$router.push({
          name: "",
          params: { id },
          query: { type: "po" },
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

    viewPurchaseOrder(val) {
      this.$router.push({
        name: "PurchaseOrder",
        params: { id: val },
        query: { type: "view" },
      });
    },

    toggleProcess(val) {
      console.log(val);
      (this.orderId = val), (this.processModal = true);
    },

    processPurchaseOrder() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          purchaseOrderId: this.orderId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("purchase/PurchaseOrder/sendPurchaseOrder", data)
        .then((resp) => {
          (this.processModal = false), (this.processButton = false);
          this.$vs.notify({
            title: "Purchase Order",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.processButton = false;

          console.log(err);
          this.$vs.notify({
            title: "Purchase Order ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    toggleDeleteOrder(val) {
      (this.orderId = val), (this.deleteModal = true);
    },

    deleteOrder() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          purchaseOrderIds: [this.orderId],
        },
      };
      this.$store
        .dispatch("purchase/PurchaseOrder/deletePurchaseOrder", data)
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
          console.log(err);
          this.$vs.notify({
            title: "Purchase Order ",
            text: "Order Error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("purchase/PurchaseOrder", [
      "isPurchaseOrderCreated",
      "getAllPurchaseOrder",      
    ]),
    filterPO(){
       return this.getAllPurchaseOrder.filter((coa) => {
        return coa.title.toLowerCase().includes(this.search.toLowerCase());
      })
    },
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseOrderPrivileges",
    ]),
  },

  mounted() {
    const data = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        outletId: this.$store.state.auth.auth.authData.outletId,
        functionId: "",
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        status: ""
    }

    
    this.$store.dispatch("purchase/PurchaseOrder/getAllPurchaseOrder", data);
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$store.dispatch("accounting/settings/getOneCostCentre");
    
  },
  // watch: {for debuging purpose
  //   getAllPurchaseOrder(val) {
  //     console.log(JSON.stringify(val, null, 2));
  //   },
  // },
};
</script>

<style scoped></style>
