<template>
  <div>
    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
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
      <div
        v-if="
          getIsAccOwner || getMaterialRequestPrivileges.deleteMaterialRequest
        "
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
                'bg-cloudenly-primary-mid': deleteButton
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
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>

    <!-- process request -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Material Request"
    >
      <div
        v-if="
          getIsAccOwner || getMaterialRequestPrivileges.processMaterialRequest
        "
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
                'bg-cloudenly-primary-mid': processButton
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
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End process Requisition Section -->

    <div class="flex items-center py-10 px-4 bg-white">
      <div class="w-full ">
        <button
          @click="createMaterialRequest"
          type="button"
          class="text-white px-5 py-3 rounded-full bg-primary-optima-color float-right"
        >
          Create New
        </button>
      </div>
    </div>
    <div class="py-3 bg-white w-full mt-2">
      <div class="flex justify-between">
        <div class="flex p-3">
          <s-combo-box />
          <s-select :width="250" class="ml-3" />
        </div>
        <div>
          <div>
            <vs-dropdown vs-custom-content vs-trigger-click>
              <button
                class="
                      hover:text-white
                      inline-flex
                      items-center
                      py-4
                      px-5
                      mr-2
                      cursor-pointer
                      bg-white
                      rounded-md
                      border-1 border-cloudenly-primary-main 
                      text-cloudenly-primary-main
                    "
              >
                <span class="mr-3 text-cloudenly-primary-main"
                  >Bulk Selection</span
                >
                <vs-icon
                  icon="arrow_drop_down "
                  class
                  size="20px text-cloudenly-primary-main"
                ></vs-icon>
              </button>

              <vs-dropdown-menu>
                <!-- <ul style="min-width: 12rem">
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
                      >
                        <span class="ml-2">Options test </span>
                      </li>
                    </ul> -->
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div v-if="getIsAccOwner || getMaterialRequestPrivileges.viewRegisters">
      <div class="mt-3 bg-white">
        <div v-if="getIsMaterialRequest">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date Processed
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Return #
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Requester
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Entity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item count
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BoQ
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
                class="border border-solid border-grey-lighter border-l-0 border-r-0 font-normal"
                v-for="(request, index) in getAllMaterialRequest"
                :key="index"
              >
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.materialRequestNumber }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.title }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.requestedBy }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ request.functionMakingRequest }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{
                    request.requestedOutlet &&
                      request.requestedOutlet.requestedoutletManagerName
                  }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{
                    request.requestedOutlet &&
                      request.requestedOutlet.requestedOutletName
                  }}
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

                  <span
                    v-if="request.status === 'sent'"
                    class="text-cloudenly-primary-main"
                    >Sent</span
                  >

                  <span
                    v-if="request.status === 'draft'"
                    class="text-cloudenly-success-main"
                    >Draft</span
                  >
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <div v-if="request.status === 'draft'">
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
                            @click.prevent="editMaterialRequest(request.id)"
                          >
                            <span class="ml-2">Edit Request</span>
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleProcessModal(request.id)"
                          >
                            <span class="ml-2">Process Request</span>
                          </li>

                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleDeleteModal(request.id)"
                          >
                            <span class="ml-2">Delete Request</span>
                          </li>
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                  <div v-else></div>
                </td>
              </tr>
            </tbody>
          </table>
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

        <div v-else>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date Processed
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Return #
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Requester
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Entity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item count
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BoQ
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
            <div class="p-5">
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div
                    class="text-cloudenly-primary-main text-lg font-bold mb-5 "
                  >
                    There are no Material Request at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates a Material Request or submits a
                    form /
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
                    @click="createMaterialRequest"
                  >
                    Create new
                  </div>
                </div>
              </div>
            </div>
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
      search: "",
      showBoqModal: false,
      materialBoqs: [],
      processModal: false,
      deleteModal: false,

      processButton: false,
      deleteButton: false,
      materialRequestId: ""
    };
  },

  methods: {
    createMaterialRequest() {
      this.$router.push({
        name: "CreateMaterialRequest"
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
            scellooId: null
          }
        }
      };

      this.$store
        .dispatch("inventory/materialRequest/sendMaterialRequest", data)
        .then(resp => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.processButton = false;
          this.$vs.notify({
            title: "Material Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
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
          materialRequestIds: [this.materialRequestId]
        }
      };
      this.$store
        .dispatch("inventory/materialRequest/deleteMaterialRequest", data)
        .then(resp => {
          this.deleteModal = false;
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          console.log(err);
          this.deleteModal = true;

          this.$vs.notify({
            title: "Material Request ",
            text: "Request error",
            color: "danger",
            position: "top-right"
          });
        });
    },

    generateDebitNote() {
      if (
        this.getIsAccOwner ||
        this.getMaterialRequestPrivileges.genrateDebitNote
      ) {
        this.$router.push({
          name: ""
        });
      } else {
        this.$vs.notify({
          title: "Material Request ",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    }
  },

  computed: {
    ...mapGetters("inventory/materialRequest", [
      "getAllMaterialRequest",
      "getIsMaterialRequest"
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getMaterialRequestPrivileges"
    ])
  },

  mounted() {
    this.$store.dispatch("inventory/materialRequest/getAllMaterialRequest");
  }
};
</script>

<style></style>
