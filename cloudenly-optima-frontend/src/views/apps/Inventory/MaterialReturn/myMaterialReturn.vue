<template>
  <div>
    <!-- view boqs detail -->
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
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <td class="py-3 text-center">{{ boq.unitOfSale }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantityReturned }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <!-- End section -->

    <!-- delete quotation -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Material Return"
    >
      <div
        v-if="getIsAccOwner || getMaterialReturnPrivileges.deleteMaterialReturn"
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
                <p>You are about to delete this material return</p>
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
              @click="deleteMaterialReturn"
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
      <div>
        <alert-privilege />
      </div>
    </vs-popup>

    <!-- process request -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Material Return"
    >
      <div
        v-if="
          getIsAccOwner || getMaterialReturnPrivileges.processMaterialReturn
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
                  Please note that this material return may undergo Approval
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
              @click="processMaterialReturn"
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
              @click="createMaterialReturn"
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
    <div v-if="getIsAccOwner || getMaterialReturnPrivileges.viewRegisters">
      <div class="bg-white mt-3">
        <div class="" v-if="getIsMaterialReturn">
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
                class="border border-solid border-grey-lighter border-r-0 border-l-0"
                v-for="(matReturn, index) in getAllMaterialReturn"
                :key="index"
              >
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.materialReturnNumber }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.materialReturnNumber }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.materialReturnNumber }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.materialReturnNumber }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.title }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.contact.name }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.storeManagerName }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="viewBoqs(matReturn)"
                    class="text-white cursor-pointer px-2 py-2 rounded-lg border-0 bg-cloudenly-primary-main"
                  >
                    View
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ matReturn.dateOfReturn | date }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <span
                    v-if="matReturn.status === 'draft'"
                    class="text-cloudenly-warning-main"
                    >{{ matReturn.status }}</span
                  >
                  <span
                    v-if="matReturn.status === 'sent'"
                    class="text-cloudenly-success-main"
                    >{{ matReturn.status }}</span
                  >
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  <div v-if="matReturn.status === 'sent'"></div>

                  <vs-dropdown v-else vs-custom-content vs-trigger-click>
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
                          @click.prevent="editMaterialReturn(matReturn.id)"
                        >
                          <span class="">Edit Return</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="toggleProcessModal(matReturn.id)"
                        >
                          <span class="">Process Return</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="toggleDeleteModal(matReturn.id)"
                        >
                          <span class="">Delete Return</span>
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
          <!-- empty state -->
            <div
              class="bg-white p-56 flex items-center space-x-20 justify-center"
            >
              <div><img :src="illustration" alt="illustration" /></div>
              <div class="">
                <div class="text-cloudenly-primary-main text-lg font-bold mb-5">
                  There are no Material Return at the moment
                </div>
                <div class="leading-tight">
                  When a customer initiates an action or submits a form / <br />
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
                  @click="createMaterialReturn"
                >
                  Create new
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
      showBoqModal: false,
      materialBoqs: [],
      processModal: false,
      deleteModal: false,
      processButton: false,
      deleteButton: false,
      materialReturnId: ""
    };
  },
  methods: {
    createMaterialReturn() {
      this.$router.push({
        name: "CreateMaterialReturn"
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
          id: val
        }
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
            scellooId: ""
          }
        }
      };

      this.$store
        .dispatch("inventory/materialReturn/sendMaterialReturn", data)
        .then(resp => {
          this.processButton = false;
          this.processModal = false;
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.processButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
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
          materialReturnId: [this.materialReturnId]
        }
      };

      this.$store
        .dispatch("inventory/materialReturn/deleteMaterialReturn", data)
        .then(resp => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Material Return",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    generateDebitNote() {},

    generateCreditNote() {}
  },

  computed: {
    ...mapGetters("inventory/materialReturn", [
      "getIsMaterialReturn",
      "getAllMaterialReturn"
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getMaterialReturnPrivileges"
    ])
  },

  mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    let data = {
      userInfo: userInfo
    };
    this.$store.dispatch("inventory/materialReturn/getAllMaterialReturn", data);
  }
};
</script>
