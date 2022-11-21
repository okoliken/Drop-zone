<template>
  <div class="mt-3 px-2">
    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
      <div class="">
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
              <td class="py-3 text-center">{{ boq.quantityReturned }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <div class="">
      <div class="">
        <div v-if="getAllContactMaterialReturn.length > 0">
          <table class="table table-auto border-collapse w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3">Return No</th>
                <th class="py-3">Return By</th>
                <th class="py-3">Department</th>
                <th class="py-3">Store Manager</th>
                <th class="py-3">Store Name</th>
                <th class="py-3">BOQ</th>
                <th class="py-3">Validity</th>
                <th class="py-3">Status</th>
                <th class="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(request, index) in getAllContactMaterialReturn"
                :key="index"
              >
                <td class="py-2 pl-3">{{ request.materialReturnNumber }}</td>
                <td class="py-2 pl-3">{{ request.returnedBy }}</td>
                <td class="py-2 pl-3">{{ request.returneeDepartment }}</td>
                <td class="py-2 pl-3">{{ request.storeManager }}</td>
                <td class="py-2 pl-3">{{ request.storeName }}</td>
                <td class="py-2 pl-3">
                  <button
                    @click="viewBoqs(request)"
                    class="text-white cursor-pointer px-2 rounded border-0 bg-cloudenly-primary-main"
                  >
                    View
                  </button>
                </td>
                <td class="py-2 pl-3">
                  {{ request.validityDur }} - {{ request.validityType }}
                </td>
                <td class="py-2 pl-3">Draft</td>

                <td class="py-2 pl-3">
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
                          @click.prevent="editMaterialReturn(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Edit Return </span>
                        </li>
                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="processMaterialReturn(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Process Return </span>
                        </li>

                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="deleteMaterialReturn(request.id)"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Delete Return </span>
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
          <table class="table table-auto border-collapse w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3">Return No</th>
                <th class="py-3">Return By</th>
                <th class="py-3">Department</th>
                <th class="py-3">Store Manager</th>
                <th class="py-3">Store Name</th>
                <th class="py-3">BOQ</th>
                <th class="py-3">Validity</th>
                <th class="py-3">Status</th>
                <th class="py-3">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <div
            class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 mb-2"
          >
            <div class="p-5">
              <div class="">
                <h3 class="m-0">
                  You have not send any material request to this customer..
                </h3>
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

export default {
  components: {},
  data() {
    return {
      showBoqModal: false,
      materialBoqs: [],
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

    processMaterialReturn(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      //

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
        .dispatch("inventory/materialReturn/sendMaterialReturn", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Material Return ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    deleteMaterialReturn(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      //

      let data = {
        userInfo: userInfo,
        payload: {
          materialRequestIds: [val],
        },
      };

      this.$store
        .dispatch("inventory/materialReturn/deleteMaterialReturn", {
          data: data,
        })
        .then((resp) => {
          this.$vs.notify({
            title: "Material Return ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Material Return ",
            text: "Request error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contactTransaction", ["getAllContactMaterialReturn"]),
  },

  mounted() {
    let data = this.$store.state.crm.contact.singleContact.email;
    this.$store.dispatch(
      "crm/contactTransaction/getContactMaterialReturn",
      data
    );
  },
};
</script>