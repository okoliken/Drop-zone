<template>
  <div class="mt-6">
    <!-- updated BOQ modal -->
    <s-modal :modal="boqModal">
      <div
        class="w-full"
        v-if="getIsAccOwner || getPurchaseRequisitionPrivileges.viewBOQ"
      >
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Bill of Quantity</h1>
          <div @click="boqModal = false" class="cursor-pointer">
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

        <table class="table table-auto table-responsive w-full border-collapse">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">Names</th>
              <th class="py-3">Type</th>
              <th class="py-3">Unit of Purchase</th>
              <th class="py-3">Description</th>
              <th class="py-3">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td class="py-3 pl-3">{{ boq.variantName }}</td>
              <td class="py-3 pl-3">{{ boq.type }}</td>
              <td class="py-3 pl-3">{{ boq.unitOfMeasure }}</td>
              <td class="py-3 pl-3">{{ boq.description }}</td>
              <td class="py-3 pl-3">{{ boq.quantityRequested }}</td>
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
            @click="boqModal = false"
          >
            Close
          </s-button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </s-modal>

    <!-- end updated BOQ modal -->

    <!-- Updated view supplier modal -->
    <s-modal :modal="supplierModal">
      <div
        class="w-full"
        v-if="
          getIsAccOwner ||
          getPurchaseRequisitionPrivileges.viewProposedSuppliers
        "
      >
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Proposed Supplier(s)</h1>
          <div @click="supplierModal = false" class="cursor-pointer">
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

        <table class="table table-auto w-full border-collapse">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">Name</th>
              <th class="py-3">Phone</th>
              <th class="py-3">Email</th>
              <th class="py-3">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in supplierDetails" :key="index">
              <td class="pl-3 py-3">{{ boq.name }}</td>
              <td class="pl-3 py-3">{{ boq.phoneNumber }}</td>
              <td class="pl-3 py-3">{{ boq.email }}</td>
              <td class="pl-3 py-3">{{ boq.address }}</td>
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
            @click="supplierModal = false"
          >
            Close
          </s-button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </s-modal>

    <!-- End of view supplier modal -->

    <!-- delete requisition -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Requisition"
    >
      <div v-if="getIsAccOwner || getPurchaseRequisitionPrivileges.deletePR">
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
                <p>You are about to Delete this purchase Requisition</p>
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
              @click="deleteRequisition"
              class="
                px-10
                py-3
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
              Close
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
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
                Please note that this Requisition may undergo Approval Process
              </p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            @click="processRequisition"
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
    <!-- End process Requisition Section -->

    <div class="bg-white px-6 py-5 font-normal mt-5">
      <div class="flex justify-between items-center">
        <s-combo-box />

        <button
          class="
            py-3
            px-6
            bg-primary-optima-color
            text-white
            font-normal
            flex
            items-center
            justify-center
          "
          style="border-radius: 50px"
          @click="createRequisition"
        >
          <feather-icon
            svgClasses="text-white"
            class="h-6 w-6"
            icon="PlusIcon"
          ></feather-icon>
          <span class="ml-3"> Create New </span>
        </button>
      </div>
    </div>

    <div
      class="
        flex
        bg-white
        justify-between
        items-center
        px-6
        py-5
        font-normal
        mt-3
      "
    >
      <div class="flex items-center">
        <s-select
          defaultOption="--Filter By Outlet--"
          :width="250"
          class="mr-6"
        />

        <!-- <select @change="getFilterPr" v-model="filter.outlet"> 
            <option v-for='(outlet, i) in getAllOrganisationLocation' :key="i">
              <option>All Organisation </option>
              <option :value="outletId"> {{outlet.name}} </option>
            </option>
          </select> -->

        <s-select defaultOption="--Filter By--" :width="250" />
      </div>

      <div class="cursor-pointer">
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
      v-if="getIsAccOwner || getPurchaseRequisitionPrivileges.viewPRRegister"
    >
      <VuePerfectScrollbar :settings="settings">
        <s-table
          :headers="headers"
          :items="getAllRequisition"
          :emptyStateImg="img"
          class="mt-3"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Purchase Requisitions Yet...</p>
          </div>

          <div slot="body">
            <p>
              All Purchase Requisitions are listed here. For now you do not have
              any saved. Click on the link below to make a Purchase requisition
              to your organization.
            </p>
            <p class="mt-2 text-secondary-optima-color">
              Create New Purchase Requisition
            </p>
          </div>

          <template v-slot:item="{ item }">
            <button
              class="text-secondary-optima-color font-medium"
              v-if="item.purchaseRequisitionSuppliers"
              @click="viewSupplier(item.data)"
            >
              View
            </button>

            <button
              class="text-primary-optima-color font-medium"
              v-else-if="item.purchaseRequisitionBoqs"
              @click="viewBoqs(item.data)"
            >
              View
            </button>

            <span v-else-if="item.createdAt">{{
              item.data.createdAt | date
            }}</span>
            <span v-else-if="item.dateRequired">{{
              item.data.dateRequired | date
            }}</span>

            <div v-else-if="item.status">
              <span
                v-if="item.data.status === 'sent'"
                class="text-danger-optima-color"
                >Sent</span
              >
              <span
                v-else-if="item.data.status === 'pendingApproval'"
                class="text-primary-optima-color"
                >Pending Approval</span
              >

              <span v-else class="text-tetiary-optima-color">{{
                item.data.status | capitalize
              }}</span>
            </div>

            <span v-else-if="item.id">
              <drop-down>
                <div slot="title">
                  <div class="text-center cursor-pointer">
                    <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                  </div>
                </div>

                <div class="py-2 px-2 bg-white shadow-sm" slot="body">
                  <ul
                    v-if="item.data.status === 'draft'"
                    style="min-width: 10rem"
                  >
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="$router.push({ name: 'viewPurchaseRequisition' })"
                    >
                      <span>View</span>
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click.prevent="routeEditPr(item.data.id)"
                    >
                      <span>Edit</span>
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="$router.push({ name: 'viewPurchaseRequisition' })"
                    >
                      <span>View</span>
                    </li>
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click.prevent="openProcessRequisitionModal(item.data.id)"
                    >
                      <span>Process PR</span>
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click.prevent="openDeleteRequisitionModal(item.data.id)"
                    >
                      <span>Delete</span>
                    </li>
                  </ul>

                  <ul
                    v-else-if="item.data.status === 'sent'"
                    style="min-width: 10rem"
                  >
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="$router.push({ name: 'viewPurchaseRequisition' })"
                    >
                      <span>View</span>
                    </li>
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click.prevent="generateRFQ(item.data.id)"
                    >
                      <span>Generate RFQ</span>
                    </li>
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click.prevent="generatePurchaseOrder(item.data.id)"
                    >
                      <span>Generate PO</span>
                    </li>
                  </ul>

                  <ul
                    v-if="item.data.status === 'pendingApproval'"
                    style="min-width: 10rem"
                  >
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="$router.push({ name: 'viewPurchaseRequisition' })"
                    >
                      <span>View</span>
                    </li>
                  </ul>
                </div>
              </drop-down>
            </span>
          </template>
        </s-table>
      </VuePerfectScrollbar>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import emptyTableIcon from "@/assets/images/optimaAsset/purchaseRequisitionEmptyState.svg";

export default {
  components: {
    VuePerfectScrollbar,
  },

  data() {
    return {
      settings: {
        VuePerfectScrollbar,
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      img: emptyTableIcon,
      boqsDetails: [],
      supplierDetails: [],
      search: "",
      boqModal: false,
      supplierModal: false,
      showAdvance: false,
      toggleAdvance: false,
      deleteModal: false,
      processModal: false,
      RequisitionId: "",

      deleteButton: false,
      headers: [
        { text: "PR Number", value: "purchaseRequisitionNumber" },
        { text: "PR Title", value: "title" },
        // { text: "Requisitioner", value: "requisitorId" },
        // { text: "Functions", value: "functionId" },
        { text: "Category", value: "requestCategory" },
        { text: "Supplier(s)", value: "purchaseRequisitionSuppliers" },
        { text: "BOQ", value: "purchaseRequisitionBoqs" },
        { text: "Date Requested", value: "dateRequired" },
        // { text: "Date Created", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Action", value: "id" },
      ],

      filterData: {
        orgId: this.$store.state.auth.auth.authData.orgId,
        outletId: "",
        functionId: "",
        creatorId: "",
        status: "",
      },
    };
  },

  methods: {
    async pagination(data) {
      await this.$store.dispatch("crm/contact/getAllContact", data);
    },
    viewBoqs(val) {
      this.boqModal = true;
      this.boqsDetails = val.purchaseRequisitionBoqs;
    },

    viewSupplier(val) {
      this.supplierModal = true;
      this.supplierDetails = val.purchaseRequisitionSuppliers;
    },

    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "purchaseRequisition",
          category: "purchase",
        },
      });
    },

    createRequisition() {
      this.$router.push({
        name: "createPurchaseRequisition",
      });
    },

    routeEditPr(val) {
      this.$router.push({
        name: "createPurchaseRequisition",
        query: {
          id: val,
        },
      });
    },

    generateRFQ(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseRequisitionPrivileges.generateRFQ === true
      ) {
        this.$router.push({
          name: "RequestQuote",
          params: { id: val },
          query: { type: "generate" },
        });
      } else {
        this.$vs.notify({
          title: "Requisition",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    generatePurchaseOrder(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseRequisitionPrivileges.generatePO === true
      ) {
        this.$router.push({
          name: "PurchaseOrder",
          params: { id: val },
          query: { type: "generate" },
        });
      } else {
        this.$vs.notify({
          title: "Requisition ",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    printRequisition(data) {
      this.$router.push({ name: "PrintRequisition", params: { id: data.id } });
    },

    viewRequisition(data) {
      this.$router.push({
        name: "PreviewPurchaseRequisition",
        params: { id: data.id },
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
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          purchaseRequisitionIds: [this.RequisitionId],
        },
      };
      this.$store
        .dispatch("purchase/Requisition/deleteRequisition", data)
        .then((resp) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Requisition ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.deleteModal = false;
        })
        .catch((err) => {
          this.deleteButton = false;
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
          // console.log(resp.data);
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
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    getFilterPr() {
      //TODO :  I am to implement a loading state
      this.$store.dispatch(
        "purchase/Requisition/getAllRequisition",
        this.filterData
      );
    },
  },

  computed: {
    ...mapGetters("purchase/Requisition", [
      "getAllRequisition",
      "isRequisitionCreated",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequisitionPrivileges",
    ]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
  },

  created() {},

  mounted() {
    const data = {
      orgId: this.$store.state.auth.auth.authData.orgId,
      outletId: this.$store.state.auth.auth.authData.outletId,
      functionId: "",
      creatorId: this.$store.state.auth.auth.authData.creatorId,
      status: "",
    };
    this.$store.dispatch("purchase/Requisition/getAllRequisition", data);
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>

<style scoped></style>