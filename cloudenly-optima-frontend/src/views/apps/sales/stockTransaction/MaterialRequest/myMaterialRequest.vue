<template>
  <div class="bg-white">
    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
      <div class="container">
        <table class="table table-auto w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in materialBoqs" :key="index">
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <td class="py-3 text-center">{{ boq.unitOfSale }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantityRequested }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <!-- delete quotation -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Material Request"
    >
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
              <p>You are about to delete this material request</p>
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
            @click="deleteMaterialRequest"
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
    </vs-popup>

    <!-- process request -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Material Request"
    >
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
              'bg-cloudenly-primary-mid': processButton,
            }"
            @click="processMaterialRequest"
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

    <div class>
      <div class="flex items-center py-2 px-4">
        <div class="w-1/3 mr-5">
          <input
            class="py-3 px-5 rounded-full w-full bg-gray-200"
            placeholder="Search..."
          />
        </div>

        <div class="w-1/3">
          <select
            name
            class="py-1 px-2 border border-gray-400 w-1/2 rounded"
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

        <div class="w-1/3">
          <button
            @click="createMaterialRequest"
            type="button"
            class="text-white px-6 py-3 rounded-full bg-primary-optima-color float-right"
          >
            Create New
          </button>
        </div>
      </div>

      <div class="mt-3">
        <div class v-if="getIsMaterialRequest">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Request By
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Department
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Store Manager
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Store Name
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BOQ
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border border-solid border-grey-lighter border-l-0 border-r-0"
                v-for="(request, index) in getAllMaterialRequest"
                :key="index"
              >
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.requestedBy }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.requesterDepartment }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.storeManager }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.storeName }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="viewBoqs(request)"
                    class="text-white cursor-pointer px-2 rounded border-0 bg-cloudenly-primary-main"
                  >
                    View
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.validityDur }} - {{ request.validityType }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <span
                    v-if="request.status === 'pendingApproval'"
                    class="text-cloudenly-danger-main"
                    >Pending Approval</span
                  >
                  <span v-else class="text-cloudenly-danger-main">{{
                    request.status
                  }}</span>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="ChevronDownIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="editMaterialRequest(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Edit Request</span>
                        </li>
                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="toggleProcessModal(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Process Request</span>
                        </li>

                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="toggleDeleteModal(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Delete Request</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Request No
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Request By
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Department
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Store Manager
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Store Name
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BOQ
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
          </table>

          <div class>
            <div
              class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2 mt-2"
            >
              <div class="p-5">
                <div class>
                  <h3 class="m-0">
                    You have not create any Material Request...
                    <span
                      @click="createMaterialRequest"
                      class="text-cloudenly-primary-main cursor-pointer pl-1"
                    >
                      Click here to create your first here
                    </span>
                  </h3>
                  <p class="text-cloudenly-primary-main cursor-pointer">
                    Learn more here...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination section -->
        <div
          class="p-2 mt-5 px-4 flex items-center flex-wrap flex-row justify-between"
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
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      search: "",
      showBoqModal: false,
      materialBoqs: [],
      processModal: false,
      deleteModal: false,

      processButton: false,
      deleteButton: false,
      materialRequestId: "",
    };
  },

  methods: {
    createMaterialRequest() {
      this.$router.push({
        name: "CreateMaterialRequest",
      });
    },

    viewBoqs(val) {
      this.materialBoqs = val.materialRequestBoqs;
      this.showBoqModal = true;
    },

    editMaterialRequest(val) {
      this.$router.push({ name: "EditMaterialRequest", params: { id: val } });
    },

    toggleProcessModal(val) {
      this.materialRequestId = val;
      this.processModal = true;
    },

    processMaterialRequest() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          materialRequestId: this.materialRequestId,
          manualApproval: {
            isManualApproval: false,
            scellooId: null,
          },
        },
      };

      this.$store
        .dispatch("inventory/materialRequest/sendMaterialRequest", data)
        .then((resp) => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.processButton = false;
          this.$vs.notify({
            title: "Material Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    toggleDeleteModal(val) {
      this.materialRequestId = val;
      this.deleteModal = true;
    },

    deleteMaterialRequest() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          materialRequestIds: [this.materialRequestId],
        },
      };
      this.$store
        .dispatch("inventory/materialRequest/deleteMaterialRequest", {
          data: data,
        })
        .then((resp) => {
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Material Request ",
            text: "Request error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("inventory/materialRequest", [
      "getAllMaterialRequest",
      "getIsMaterialRequest",
    ]),
  },
  mounted() {
    this.$store.dispatch("inventory/materialRequest/getAllMaterialRequest");
  },
};
</script>

<style>
</style>