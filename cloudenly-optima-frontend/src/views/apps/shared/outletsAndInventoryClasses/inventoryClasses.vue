<template>
  <div
    style="font-size: 14px"
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <delete-modal v-model="modals.deleteClass" @proceed="deleteInventoryClass">
      <template v-slot:title> Delete Inventory Class </template>

      <template v-slot:text>
        Are you sure you want to delete this inventory class?
      </template>

      <hr class="text-gray-400 mt-10 mb-10" />

      <div class="mt-8 flex items-center justify-center">
            <button
              class="
                px-5
                py-3
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded-full
              "
            >
              Delete
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="this.odal = false"
            >
              Cancel
            </button>
          </div>
    </delete-modal>

    <info-modal
      v-model="modals.assignToOutlet"
      type="info"
      @proceed="assignToOutlet"
    >
      <template v-slot:title> Assign Inventory to Outlet </template>

      <template v-slot:text>
        Are you sure you want to assign to this outlet?
      </template>
    </info-modal>

    <inventory-class-modal
      v-model="modals.newClass"
      :options="getOptimaOutlet"
      @proceed="createInventoryClass($event)"
    />

    <update-class-modal
      v-model="modals.editClass"
      :inventoryName="inventoryClass.name"
      @inventory-name="inventoryClass.name = $event"
      @proceed="updateInventoryClass"
      @close="reset"
    />

    <assign-to-other-outlet-modal
      v-model="modals.assignToOtherOutlet"
      :outlets="getOptimaOutlet"
      @close="reset"
      @proceed="assignToOtherOutletInventory($event)"
      @submit="assignToOutlet($event)"
    />

    <div>
      <div class="bg-white flex justify-between items-center py-12 px-8">
        <s-combo-box />

        <div class="flex items-center justify-end">
          <div class="flex items-center">
            <div class="mr-10" v-show="selectedItems.length">
              <drop-down>
                <div slot="title">
                  <button class="flex" style="color: #1034a6">
                    Bulk Actions
                    <feather-icon
                      icon="ChevronDownIcon"
                      svgClasses="w-5 h-5 ml-5"
                    />
                  </button>
                </div>

                <div class="bg-white" slot="body">
                  <ul class="p-1 shadow" style="min-width: 17rem">
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(null, 'assignCurrent', 'bulk')"
                    >
                      Assign to current outlet
                    </li>

                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(null, 'assignOther', 'bulk')"
                    >
                      Assign to other outlets
                    </li>
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(null, 'delete', 'bulk')"
                    >
                      Delete Inventory
                    </li>
                  </ul>
                </div>
              </drop-down>
            </div>

            <s-button
              class="px-8 bg-primary-optima-color text-white"
              @click="routeToCreateNew"
            >
              New Class</s-button
            >
          </div>
        </div>
      </div>

      <div
        v-if="
          getIsAccOwner ||
            getInventorySettingPrivileges.viewInventoryClasses ||
            getOutletAndInventoryPrivileges.viewInventoryRegister
        "
      >
        <s-table
          :headers="headers"
          :items="getInventoryType"
          has-checkbox
          v-model="selectedItems"
        >
          <template v-slot:item="{ item }">
            <span v-if="item.createdAt">{{ item.data.createdAt | date }}</span>
            <span v-else-if="item.updatedAt">{{
              item.data.updatedAt | date
            }}</span>

            <div v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 16rem">
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="initUpdate(item.data)"
                      v-if="item.data.usage !== 'global'"
                    >
                      Edit
                    </li>

                    <!-- <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(item.data, 'assignCurrent')"
                    >
                      Assign to current outlet
                    </li> -->

                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(item.data, 'assignOther')"
                    >
                      Assign to Outlet
                    </li>
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="init(item.data, 'delete')"
                    >
                      Delete Inventory
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </template>
        </s-table>
      </div>

      <div v-else>
        <s-privilege />
      </div>

      <!-- Pagination section -->
    <div class="mt-6">
      <s-pagination @pagination="pagination($event)" />
    </div>
    </div>
  </div>
</template>

<script>
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
// eslint-disable-next-line no-unused-vars
import { parseLocation } from "@/utils/helpers";

import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DeleteModal from "@/views/components/actionModal.vue";
import InfoModal from "@/views/components/actionModal.vue";
import InventoryClassModal from "./components/inventoryClassModal.vue";
import UpdateClassModal from "./components/updateClassModal.vue";
import AssignToOtherOutletModal from "./components/assignToOtherOutletModal.vue";

export default {
  components: {
    VuePerfectScrollbar,
    DeleteModal,
    InfoModal,
    InventoryClassModal,
    UpdateClassModal,
    AssignToOtherOutletModal,
  },
  data() {
    return {
      countryList,
      stateList,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      search: "",
      operation: "create",
      headers: [
        { text: "Inventory Name", value: "name" },
        // { text: "Assigned To (Outlet)", value: "type" },
        { text: "Date Created", value: "createdAt" },
        { text: "Last Modified", value: "updatedAt" },
        { text: "Actions", value: "id" }, 
      ],
      modals: {
        newClass: false,
        editClass: false,
        deleteClass: false,
        assignToOutlet: false,
        assignToOtherOutlet: false,
      },
      inventoryClass: {
        id: "",
        name: "",
        outlets: [],
      },
      selectedItems: [],
      currentOutletInventoryClass: [],
      oldInventoryClass: [],
    };
  },

  methods: {
    openNewClassModal() {
      if (
        this.getIsAccOwner ||
        this.getInventorySettingPrivileges.createNewInventoryClasses === true
      ) {
        this.modals.newClass = true;
      } else {
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
        });
      }
    },
    routeToCreateNew(){
      this.$router.push({
        name: 'CreateNewClass',
      })
    },
    reset() {
      this.selectedItems = [];
      this.inventoryClass = {
        id: "",
        name: "",
        outlets: [],
      };
    },

    init(data, operation, type) {
      // check if operation is bulk type or single and resets selected items
      !type && (this.selectedItems = []);

      if (operation === "delete") {
        if (
          this.getIsAccOwner ||
          this.getInventorySettingPrivileges.deleteInventoryClasses === true
        ) {
          this.modals.deleteClass = true;
        } else {
          this.$vs.notify({
            title: "Inventory",
            position: "top-right",
            color: "danger",
            text: "You don't have privilege to perform this action",
          });
        }
      } else if (operation === "assignCurrent") {
        if (
          this.getIsAccOwner ||
          this.getInventorySettingPrivileges
            .assignInventoryClassesToCurrentOutlet === true
        ) {
          this.modals.assignToOutlet = true;
        } else {
          this.$vs.notify({
            title: "Inventory",
            position: "top-right",
            color: "danger",
            text: "You don't have privilege to perform this action",
          });
        }
      } else {
        if (
          this.getIsAccOwner ||
          this.getInventorySettingPrivileges
            .assignInventoryClassesToOtherOutlets === true
        ) {
          this.modals.assignToOtherOutlet = true;
        } else {
          this.$vs.notify({
            title: "Inventory",
            position: "top-right",
            color: "danger",
            text: "You don't have privilege to perform this action",
          });
        }
      }

      data && this.selectedItems.push(data);
    },

    initUpdate({ name, id }) {
      this.modals.editClass = true;
      this.inventoryClass.id = id;
      this.inventoryClass.name = name;
    },

    async deleteInventoryClass() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const data = {
          userInfo: userInfo,
          payload: {
            inventoryTypeIds: this.selectedItems.map((item) => item.id),
          },
        };

        const { data: response } = await this.$store.dispatch(
          "inventory/stock/deleteInventoryType",
          {
            data,
          }
        );

        this.reset();

        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: response.message,
          fixed: false,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.reset();
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "danger",
          text: "Error",
          fixed: false,
        });
      }
    },

    async createInventoryClass({ name, outlets }) {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            name,
            outletIds: outlets.map((item) => item.id),
          },
        };

        const { data } = await this.$store.dispatch(
          "inventory/stock/createInventoryType",
          payload
        );

        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: "error",
          fixed: false,
        });
      }
    },

    async updateInventoryClass() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            id: this.inventoryClass.id,
            name: this.inventoryClass.name,
          },
        };

        const { data } = await this.$store.dispatch(
          "inventory/stock/updateInventoryType",
          payload
        );

        this.reset();

        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "danger",
          text: "Error",
        });
      }
    },

    async assignToOutlet(identifier) {
      try {
        const userInfo = this.$store.state.auth.auth.authData;
        let inventoryClass = this.selectedItems.map((item) => item.id);
        let combineInventoryClass = inventoryClass.concat(
          this.currentOutletInventoryClass
        );
        const payload = {
          userInfo: {
            orgId: userInfo.orgId,
            outletId: identifier ? identifier : userInfo.outletId,
            creatorId: userInfo.creatorId,
          },
          payload: {
            inventorySetting: combineInventoryClass,
          },
        };

        const { data } = await this.$store.dispatch(
          "inventory/stock/setOutletInventory",
          payload
        );

        this.reset();
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "danger",
          text: err.data.message,
        });
      }
    },

    async assignToOtherOutletInventory(identifier) {
      try {
        const userInfo = this.$store.state.auth.auth.authData;
        let { data } = await this.$store.dispatch(
          "inventory/stock/viewOutletInventoryType",
          identifier
        );

        if (data.length != undefined) {
          this.oldInventoryClass = data.map((resp) => {
            return resp.id;
          });
        } else {
          this.oldInventoryClass = [];
        }

        let inventoryClass = this.selectedItems.map((item) => item.id);

        let combineInventoryClass = inventoryClass.concat(
          this.oldInventoryClass
        );

        const payload = {
          userInfo: {
            orgId: userInfo.orgId,
            outletId: identifier,
            creatorId: userInfo.creatorId,
          },
          payload: {
            inventorySetting: combineInventoryClass,
          },
        };

        const result = await this.$store.dispatch(
          "inventory/stock/setOutletInventory",
          payload
        );
        this.reset();
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: result.data.message,
        });
      } catch (err) {
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "danger",
          text: err.data.message,
        });
      }
    },
  },

  computed: {
    ...mapGetters("inventory/stock", ["getInventoryType"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getInventorySettingPrivileges",
      "getOutletAndInventoryPrivileges",
    ]),
  },

  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    await this.$store.dispatch("inventory/stock/getAllInventoryType");
    await this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");

    this.$store
      .dispatch("inventory/stock/viewCurrentOutletInventoryType")
      .then((resp) => {
        this.currentOutletInventoryClass = resp.data.map((resp) => {
          return resp.id;
        });
      });

    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>
