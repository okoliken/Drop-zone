
<template>
  <div
    style="font-size: 14px"
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <!-- View Outlet Inventory Section -->
    <Drawer :size="50" :visible="drawer" v-on:closeDrawer="drawer = false">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Inventories</p>
      </div>

      <div slot="body">
        <div
          v-if="
            getIsAccOwner || getOutletAndInventoryPrivileges.viewOutletInventory
          "
        >
          <div class>
            <div id="loadingOutlet" class="vs-con-loading__container">
              <div class="py-8 px-5 border shadow rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <p class="font-semibold">Outlet Information</p>

                    <div class="mt-8">
                      <p class="font-normal text-base">
                        Name : {{ selectedOutlet.name }}
                      </p>
                      <p class="font-normal text-base">
                        Location : {{ selectedOutlet.address }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="font-semibold">Outlet Manger</p>
                  </div>
                </div>
              </div>

              <div
                v-if="getAssignInventoryClass.length > 0"
                class="mt-5 shadow"
              >
                <table class="table min-w-full">
                  <thead class="bg-gray-300">
                    <tr>
                      <th
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        Inventory Name
                      </th>
                      <th
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        Created
                      </th>
                      <th
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border"
                      v-for="(inventory, index) in getAssignInventoryClass"
                      :key="index"
                    >
                      <td
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        {{ inventory.name }}
                      </td>
                      <td
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        {{ inventory.createdAt | date }}
                      </td>
                      <td
                        class="py-4 px-6 tracking-wider text-dark-optima-color"
                      >
                        {{ inventory.updatedAt | date }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="mt-5">
                <div class="shadow-lg py-5 px-5 rounded-full">
                  <h3 class="mb-0">
                    You have not assigned any inventory to this outlet.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <s-privilege />
        </div>
      </div>
    </Drawer>
    <!-- End View Outlet Section -->

    <div>
      <div class="bg-white flex justify-between items-center py-12 px-3">
        <s-combo-box v-model="search" />
        <button
          class="bg-primary-optima-color text-white py-3 px-12"
          style="border-radius: 50px; height: 36px"
          @click="$router.push({ name: 'createLocation' })"
        >
          New Outlet
        </button>
      </div>

      <div
        v-if="
          getIsAccOwner ||
          getInventorySettingPrivileges.viewOutlets ||
          getOutletAndInventoryPrivileges.viewOutletsRegister
        "
      >
        <s-table :headers="headers" :items="filteredOutlets">
          <template v-slot:item="{ item }">
            <span v-if="item.employeesCount">{{ item.index + 1 }}</span>

            <div v-else-if="item.manager">
              <span v-if="item.data.manager">
                {{ item.data.manager.fname }} {{ item.data.manager.lname }}
              </span>
              <span v-else>Nill</span>
            </div>

            <div v-else-if="item.type">
              <span v-if="item.data.type == null"> Nill</span>
              <span v-else> {{ item.data.type }}</span>
            </div>

            <span v-else-if="item.country">
              {{ parseLocation(item.data.country, countryList) }}
            </span>

            <span v-else-if="item.state">
              {{ parseLocation(item.data.state, stateList) }}
            </span>

            <div v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 12rem">
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="viewOutletInventory(item.data)"
                    >
                      View inventory
                    </li>
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="editOutlet(item.data)"
                    >
                      Edit Outlet
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
      <div class="mt-6">
        <s-pagination @pagination="pagination($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
import { parseLocation } from "@/utils/helpers";

import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Drawer from "@/views/components/Drawer/drawer";

export default {
  components: {
    VuePerfectScrollbar,
    Drawer,
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
      drawer: false,
      headers: [
        { text: "#", value: "employeesCount" },
        { text: "Outlet Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Outlet Manager", value: "manager" },
        { text: "Country", value: "country" },
        { text: "State", value: "state" },
        { text: "City", value: "city" },
        { text: "Address", value: "address" },
        { text: "Actions", value: "id" },
      ],
      selectedOutlet: { id: "", name: "", address: "" },
    };
  },

  methods: {
    parseLocation,
    async viewOutletInventory({ id, name, address }) {
      // if(this.getIsAccOwner || this.getInventorySettingPrivileges. )
      try {
        this.drawer = true;
        this.selectedOutlet = { id, name, address };
        // console.log(id)
        await this.$store.dispatch(
          "inventory/stock/viewOutletInventoryType",
          id
        );
      } catch (err) {
        console.log(err);
      }
    },
    editOutlet(val) {
      if (
        this.getIsAccOwner ||
        this.getLocationSettingsPrivileges.editLocation === true
      ) {
        this.$router.push({
          name: "location",
          params: { id: val.id },
        });
      } else {
        this.$vs.notify({
          title: "Outlet",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    
  },

  computed: {
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("inventory/stock", ["getAssignInventoryClass"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getInventorySettingPrivileges",
      "getOutletAndInventoryPrivileges",
      "getLocationSettingsPrivileges",
    ]),

    filteredOutlets() {
      return this.getAllOrganisationLocation.outlets.filter((outlet) => {
        return outlet.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async mounted() {
    await this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>

<style></style>
