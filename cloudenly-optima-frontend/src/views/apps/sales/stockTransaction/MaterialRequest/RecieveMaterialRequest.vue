<template>
  <div>
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

    <div class="mt-3">
      <div class="shadow bg-white">
        <div class="flex items-center py-2 px-4">
          <div class="w-1/3">
            <input
              type="text"
              class="py-3 px-2 border border-solid border-grey-light rounded w-full"
              placeholder="Search "
              name=""
              id=""
            />
          </div>

          <div class="w-1/3"></div>

          <div class="w-1/3"></div>
        </div>

        <div v-if="getIsRecieveMaterialRequest">
          <table
            class="table table-responsive table-auto border-collapse w-full"
          >
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-4">Request No</th>
                <th class="py-4">Request By</th>
                <th class="py-4">Department</th>
                <th class="py-4">Store Manager</th>
                <th class="py-4">Store Name</th>
                <th class="py-4">BOQ</th>
                <th class="py-4">Validity</th>
                <th class="py-4">Status</th>
                <th class="py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border border-solid border-grey-lighter"
                v-for="(request, index) in getReceiveMaterialRequest"
                :key="index"
              >
                <td class="py-4 pl-3">{{ request.materialRequestNumber }}</td>
                <td class="py-4 pl-3">{{ request.requestedBy }}</td>
                <td class="py-4 pl-3">{{ request.requesterDepartment }}</td>
                <td class="py-4 pl-3">{{ request.storeManager }}</td>
                <td class="py-4 pl-3">{{ request.storeName }}</td>
                <td class="py-4 pl-3">
                  <button
                    @click="viewBoqs(request)"
                    class="text-white cursor-pointer px-2 rounded border-0 bg-cloudenly-primary-main"
                  >
                    View
                  </button>
                </td>
                <td class="py-4 pl-3">
                  {{ request.validityDur }} - {{ request.validityType }}
                </td>
                <td class="py-4 pl-3">Draft</td>
                <td class="pl-5">
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
                          <span class="ml-2">Edit Request </span>
                        </li>
                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="processMaterialRequest(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Process Request </span>
                        </li>

                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="deleteMaterialRequest(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Delete Request </span>
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
          <table
            class="table table-responsive table-auto border-collapse w-full"
          >
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3">Request No</th>
                <th class="py-3">Request By</th>
                <th class="py-3">Department</th>
                <th class="py-3">Store Manager</th>
                <th class="py-3">Store Name</th>
                <th class="py-3">BOQ</th>
                <th class="py-3">Validity</th>
                <th class="py-3">Status</th>
                <th class="py-3">Action</th>
              </tr>
            </thead>
          </table>
          <div class="">
            <div
              class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2 mt-2"
            >
              <div class="p-5">
                <div class="">
                  <h3 class="m-0">
                    You have not received any Material Request...
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
          class="p-2 mt-5 flex items-center flex-wrap flex-row justify-between"
        >
          <div class="flex items-center">
            <p class="mr-2">Show :</p>
            <select name="" class="py-1 mr-2" id="">
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>

          <div class="flex items-center">
            <p class="mr-2">Show</p>
            <select name="" class="py-1 mr-2" id="">
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
      this.$router.push({
        name: "EditMaterialRequest",
        params: {
          id: val,
        },
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

    deleteMaterialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
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
      "getReceiveMaterialRequest",
      "getIsRecieveMaterialRequest",
    ]),
  },

  mounted() {
    this.$store
      .dispatch("inventory/materialRequest/ReceivedMaterialRequest")
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