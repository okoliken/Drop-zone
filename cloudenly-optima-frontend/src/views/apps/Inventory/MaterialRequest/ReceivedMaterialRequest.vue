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

    <div class="">
      <div  class="flex items-center py-10 px-4 bg-white">
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

        <div class="mt-2 bg-white">
          <div v-if="getIsReceiveMaterialRequest">
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
                    Function Making Request
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Store Manager
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Store Name
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    BOQkkk
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Validity
                  </th>
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Status
                  </th> -->
                  <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Action
                  </th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border border-solid border-grey-lighter"
                  v-for="(request, index) in getReceiveMaterialRequest"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialRequest.materialRequestNumber }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialRequest.requestedBy }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialRequest.functionMakingRequest }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{
                      request.materialRequest.requestedOutlet &&
                        request.materialRequest.requestedOutlet
                          .requestedoutletManagerName
                    }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{
                      request.materialRequest.requestedOutlet &&
                        request.materialRequest.requestedOutlet
                          .requestedOutletName
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
                    {{ request.materialRequest.validityDur }} -
                    {{ request.materialRequest.validityType }}
                  </td>
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">Draft</td> -->
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">
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
                            @click.prevent="processMaterialRequest(request.id)"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Process Request</span>
                          </li>

                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="deleteMaterialRequest(request.id)"
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
                  </td> -->
                </tr>
              </tbody>
            </table>
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
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div class="text-cloudenly-primary-main text-lg font-bold mb-5">
                    There are no Material Request at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates an action or submits a form /
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
      materialBoqs: []
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
      this.$router.push({
        name: "EditMaterialRequest",
        params: {
          id: val
        }
      });
    },

    processMaterialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          materialRequestId: val,
          manualApproval: {
            isManualApproval: false,
            scellooId: ""
          }
        }
      };

      this.$store
        .dispatch("inventory/materialRequest/sendMaterialRequest", data)
        .then(resp => {
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Material Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    deleteMaterialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          materialRequestIds: [val]
        }
      };
      this.$store
        .dispatch("inventory/materialRequest/deleteMaterialRequest", {
          data: data
        })
        .then(resp => {
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          console.log(err);
          this.$vs.notify({
            title: "Material Request ",
            text: "Request error",
            color: "danger",
            position: "top-right"
          });
        });
    }
  },

  computed: {
    ...mapGetters("inventory/materialRequest", [
      "getReceiveMaterialRequest",
      "getIsReceiveMaterialRequest"
    ])
  },

  mounted() {
    this.$store
      .dispatch("inventory/materialRequest/ReceivedMaterialRequest")
      .then(resp => {
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
