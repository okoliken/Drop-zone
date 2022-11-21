<template>
  <div class="bg-white">
    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
      <div class="container">
        <table class="table table-auto table-respnsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <!-- <th class=" py-3 text-center">type</th> -->
              <th class="py-3 text-center">Unit</th>
              <th class="py-3 text-center">Description</th>
              <th class="py-3 text-center">Quantity Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in materialBoqs" :key="index">
              <td class="py-3 text-center">{{ boq.variantName }}</td>
              <!-- <td class=" py-3 text-center">{{boq.type}}</td> -->
              <td class="py-3 text-center">{{ boq.unitOfSale }}</td>
              <td class="py-3 text-center">{{ boq.description }}</td>
              <td class="py-3 text-center">{{ boq.quantityRequested }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

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
      <div v-if="getIsMaterialRequest">
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
          <tbody>
            <tr v-for="(request, index) in getallMaterialRequest" :key="index">
              <td class="px-6 py-3 whitespace-no-wrap border">
                {{ request.materialRequestNumber }}
              </td>
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
              <td class="px-6 py-3 whitespace-no-wrap border">Draft</td>
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
                        @click.prevent="deletematerialRequest(request.id)"
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

      <div v-else class>
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
        <div class="flex justify-center mb-20">
          <div role="alert" class="w-1/2">
            <div
              class="bg-cloudenly-primary-main text-white font-bold rounded-t px-4 py-2"
            >
              <span class="text-2xl">Material Request ...</span>
            </div>
            <div
              class="border border-solid border-t-0 border-r-0 border-l-0 border-b-4 border-cloudely-danger-mid rounded-b bg-cloudenly-primary-off px-4 py-3 text-red-700"
            >
              <div class="mt-4 mb-4">
                <p class>You have not create any Material Request</p>
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
</template>


<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      allMaterialReturnLists: "",
      bussinesData: "",
      search: "",
      showBoqModal: false,
      materialBoqs: [],
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

    processMaterialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      //

      let data = {
        userInfo: userInfo,
        paylaod: {
          materialRequestId: val,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("inventory/materialRequest/sendMaterialRequest", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Material Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    deletematerialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      //

      let data = {
        userInfo: userInfo,
        paylaod: {
          materialRequestIds: [val],
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
      "getallMaterialRequest",
      "getIsMaterialRequest",
      "getReceiveMaterialReturn",
      "getIsRecieveMaterialRequest",
    ]),
  },
  mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    //
    let data = {
      userInfo: userInfo,
    };
    this.$store
      .dispatch("inventory/materialRequest/getAllMaterialRequest", data)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$store
      .dispatch("inventory/materialRequest/ReceivedMaterialRequest", data)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>