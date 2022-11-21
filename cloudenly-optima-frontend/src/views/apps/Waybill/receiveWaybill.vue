<template>
  <div>
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
            class="px-5 py-2 text-white border-none cursor-pointer bg-cloudenly-primary-main rounded"
          >
            Close
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End View Boq Section -->

    <!-- delete request -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Request"
    >
      <div v-if="getIsAccOwner || getInventoryWaybillPrivileges.deleteWaybill">
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
    <!-- End Delete Requisition Section -->

    <div class="flex py-8 px-3 bg-white">
      <div class="w-1/3 mr-5">
        <input
          class="py-3 px-5 rounded-full w-full bg-gray-200"
          placeholder="Search..."
        />
      </div>

      <div class="w-1/3">
        <select />
      </div>

      <div class="w-1/3"></div>

      <div class="w-1/3"></div>
    </div>


    

    <div
      v-if="
        getIsAccOwner ||
         
          getInventoryWaybillPrivileges.viewIssuedAndReceivedWaybillRegisters
      "
    >
      <div class="bg-white mt-2">
        <div v-if="getIsReceiveWaybill">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NAME
                </th>

                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER EMAIL
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
               
              </tr>
            </thead>
            <tbody>
              <tr
                class="cursor-pointer hover:bg-grey-lightest border border-solid border-grey-lighter"
                v-for="(waybill, index) in getReceiveWaybill"
                :key="index"
              >
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.senderInfo.name }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.senderInfo.email }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  <span v-if="waybill.waybill === null">N/A</span>
                  <span v-else>{{ waybill.waybill.comment }}</span>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ waybill.createdAt | date }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="showBoqs(waybill.waybill.waybillBoqs)"
                    class="px-2 py-1 bg-cloudenly-primary-off text-sm cursor-pointer border-none rounded text-cloudenly-primary-main"
                  >
                    view
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    class="px-2 py-1 bg-cloudenly-warning-off text-sm border-none text-cloudenly-warning-main rounded"
                  >
                    Received
                  </button>
                </td>
                <!-- <td class="px-6 py-3 whitespace-no-wrap border">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <ul style="min-width: 12rem;">
                         <li
                        class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="generateGrn(waybill.id)" >
                        <span class="">Generate GRN</span>
                      </li>

                        <li
                          class="flex py-2 px-2 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="toggleDeleteWaybill(waybill.id)"
                        >
                          <span class="">Delete</span>
                        </li> 
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>  -->
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  CUSTOMER NAME
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
                <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  ACTION
                </th> -->
              </tr>
            </thead>
          </table>

          <div
            class="bg-white border-solid border-t-0 border-r-0 border-b-0"
          >
            <div class="p-5">
               <div class>
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div class="text-cloudenly-primary-main text-lg font-bold mb-5">
                    There are no Waybill received at the moment
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
      deleteModal: false,
      processModal: false,

      processButton: false,
      deleteButton: false,
    };
  },

  computed: {
    ...mapGetters("sales/Waybill", [
      "getReceiveWaybill",
      "getIsReceiveWaybill",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesWaybillPrivileges",
      "getInventoryWaybillPrivileges",
    ]),
  },

  methods: {
    toggleProcessWaybill(val) {
      this.waybillId = val;
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

    toggleDeleteWaybill(val) {
      (this.waybillId = val), (this.deleteModal = true);
    },

    deleteWaybill() {
      this.deleteButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          receivedWaybillIds: [this.waybillId],
        },
      };
      this.$store
        .dispatch("sales/Waybill/deleteReceiveWaybill", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          console.log(resp);
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
            text: err.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  mounted() {
    this.$store.dispatch("sales/Waybill/getReceiveWaybill");
  },
};
</script>

<style></style>
