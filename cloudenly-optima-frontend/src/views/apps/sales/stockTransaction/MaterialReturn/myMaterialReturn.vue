<template>
  <div class="bg-white">
    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
      <div class="container">
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">UofM</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in materialBoqs" :key="index">
              <td class="py-3 text-center">{{boq.variantName}}</td>
              <td class="py-3 text-center">{{boq.unitOfSale}}</td>
              <td class="py-3 text-center">{{boq.description}}</td>
              <td class="py-3 text-center">{{boq.quantityReturned}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <!-- delete quotation -->
    <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Material Return">
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
              <p>You are about to delete this material return</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{'cursor-not-allowed' : deleteButton , 'bg-cloudenly-primary-mid' : deleteButton}"
            @click="deleteMaterialReturn"
            class="px-5 py-2 mr-5 bg-cloudenly-danger-main border-none text-white cursor-pointer rounded"
          >Close</button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >cancel</button>
        </div>
      </div>
    </vs-popup>

    <!-- process request -->
    <vs-popup button-close-hidden :active.sync="processModal" title="Process Material Return">
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
              <p>Please note that this material return may undergo Approval Process</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="processButton"
            :class="{'cursor-not-allowed' : processButton , 'bg-cloudenly-primary-mid' : processButton}"
            @click="processMaterialReturn"
            class="px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
          >Process</button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="processModal = false"
          >cancel</button>
        </div>
      </div>
    </vs-popup>
    <!-- End process Requisition Section -->

    <div class>
      <div class>
        <div class="flex items-center py-2 px-4">
          <div class="w-1/3 mr-5">
            <input class="py-3 px-5 rounded-full w-full bg-gray-200" placeholder="Search..." />
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
              @click="createMaterialReturn"
              type="button"
              class="text-white px-6 py-3 rounded-full bg-primary-optima-color float-right"
            >Create New</button>
          </div>
        </div>

        <div class="mt-">
          <div v-if="getIsMaterialReturn">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr>
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">Return No</th> -->
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Return By</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Store Manager</th>
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">Store Name</th> -->
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">BOQ</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Validity</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Status</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border border-solid border-grey-lighter border-r-0 border-l-0"
                  v-for="(matReturn, index) in  getallMaterialReturn"
                  :key="index"
                >
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">{{matReturn.materialReturnNumber}}</td> -->
                  <td class="px-6 py-3 whitespace-no-wrap border">{{matReturn.contact.name}}</td>
                  <td class="px-6 py-3 whitespace-no-wrap border">{{matReturn.storeManager}}</td>
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">{{matReturn.storeName}}</td> -->
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <button
                      @click="viewBoqs(matReturn)"
                      class="text-white cursor-pointer px-2 rounded border-0 bg-cloudenly-primary-main"
                    >View</button>
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">{{matReturn.validityDur}} - {{matReturn.validityType}}</td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <span class="text-cloudenly-warning-main">{{matReturn.status}}</span>
                  </td>

                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon class="h-6 w-6" icon="ChevronDownIcon"></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="editMaterialReturn(matReturn.id)"
                          >
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                            <span class="ml-2">Edit Return</span>
                          </li>
                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleProcessModal(matReturn.id)"
                          >
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                            <span class="ml-2">Process Return</span>
                          </li>

                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click="toggleDeleteModal(matReturn.id)"
                          >
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                            <span class="ml-2">Delete Return</span>
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
            <table class="table table-responsive w-full border-collapse">
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-3">Request No</th>
                  <th class="py-3">Request By</th>
                  <th class="py-3">Store Manager</th>
                  <th class="py-3">Store Name</th>
                  <th class="py-3">BOQ</th>
                  <th class="py-3">Validity</th>
                  <th class="py-3">Status</th>
                  <th class="py-3">Action</th>
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
                      You have not create any Material Return...
                      <span
                        @click="createMaterialReturn"
                        class="text-cloudenly-primary-main cursor-pointer pl-1"
                      >
                        Click
                        here to create your first here
                      </span>
                    </h3>
                    <p class="text-cloudenly-primary-main cursor-pointer">Learn more here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination section -->
          <div class="p-2 mt-5 flex items-center flex-wrap flex-row justify-between">
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
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      showBoqModal: false,
      materialBoqs: [],

      processModal: false,
      deleteModal: false,

      processButton: false,
      deleteButton: false,
      materialReturnId: "",
    };
  },
  methods: {
    createMaterialReturn() {
      this.$router.push({
        name: "CreateMaterialReturn",
      });
    },

    viewBoqs(val) {
      this.materialBoqs = val.materialReturnBoqs;
      this.showBoqModal = true;
    },

    editMaterialReturn(val) {
      this.$router.push({
        name: "EditMaterialReturn",
        params: {
          id: val,
        },
      });
    },

    toggleProcessModal(val) {
      this.materialReturnId = val;
      this.processModal = true;
    },

    processMaterialReturn() {
      this.processButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          materialReturnId: this.materialReturnId,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("inventory/materialReturn/sendMaterialReturn", data)
        .then((resp) => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.processButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    toggleDeleteModal(val) {
      this.materialReturnId = val;
      this.deleteModal = true;
    },

    deleteMaterialReturn() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          materialReturnId: [this.materialReturnId],
        },
      };

      this.$store
        .dispatch("inventory/materialReturn/deleteMaterialReturn", {
          data: data,
        })
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Material Return",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("inventory/materialReturn", [
      "getIsMaterialReturn",
      "getallMaterialReturn",
    ]),
  },

  mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    let data = {
      userInfo: userInfo,
    };
    this.$store
      .dispatch("inventory/materialReturn/getAllMaterialReturn", data)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>