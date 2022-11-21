<template>
  <div
    style="font-size: 14px"
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <delete-modal v-model="deleteModal" @proceed="deleteOutlet">
      <template v-slot:title> Delete Outlet </template>

      <template v-slot:text>
        Are you sure you want to delete this outlet?
      </template>
    </delete-modal>

    <div>
      <div class="bg-white flex justify-between items-center py-12 px-8">
        <s-combo-box />

        <button
          class="bg-primary-optima-color text-white py-3 px-12"
          style="border-radius: 50px; height: 36px"
          @click="$router.push({ name: 'createLocation' })"
        >
          Add New
        </button>
      </div>

      <div
        v-if="
          getLocationSettingsPrivileges.viewLocationDetails || getIsAccOwner
        "
      >
        <s-table :headers="headers" :items="filteredOutlets" :img="emptyState">
          <div slot="title">
            <p class="font-bold text-xl">No Added Locations...</p>
          </div>

          <div slot="body">
            <p>
              Add all locations where your organization operates and have
              physical addresses. indicate whate location type (warehouse,
              outlet, factory etc) and select each location’s manager.
            </p>
            <p class="mt-2 text-secondary-optima-color">Add A New Supplier</p>
          </div>
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
              {{ forkName(item.data.country, countryList) }}
            </span>

            <span v-else-if="item.state">
              {{ forkName(item.data.state, stateList) }}
            </span>

            <div v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 16rem">
                    <li
                      @click="editOutlet(item)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      Edit
                    </li>

                    <li
                      v-if="!item.data.isForInventory"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      Allocate to Optima
                    </li>

                    <li
                      @click="initDelete(item.data.id)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      v-if="!item.data.isDefaultOutlet"
                    >
                      Delete
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
    </div>
  </div>
</template>

<script>
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
import { forkName } from "@/utils/helpers";

import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DeleteModal from "@/views/components/actionModal.vue";
import emptyState from "@/assets/images/optimaAsset/settingEmptyState.svg";

export default {
  name: "Locations",
  components: {
    VuePerfectScrollbar,
    DeleteModal,
  },
  data() {
    return {
      img: emptyState,
      countryList,
      stateList,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      search: "",
      deleteModal: false,
      headers: [
        { text: "#", value: "employeesCount" },
        { text: "Location Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Manager", value: "manager" },
        { text: "Country", value: "country" },
        { text: "State", value: "state" },
        { text: "City", value: "city" },
        { text: "Address", value: "address" },
        { text: "Actions", value: "id" },
      ],
    };
  },

  methods: {
    editOutlet(item) {
      if (
        this.getIsAccOwner ||
        this.getLocationSettingsPrivileges.editLocation === true
      ) {
        this.$router.push({
          name: "location",
          params: { id: item.data.id },
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

    initDelete(val) {
      if (
        this.getIsAccOwner ||
        this.getLocationSettingsPrivileges.editLocation === true
      ) {
        this.outletIds = val;
        this.deleteModal = true;
      } else {
        this.$vs.notify({
          title: "Outlet",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    async deleteOutlet() {
      try {
        this.deleteButton = true;

        const { data } = await this.$store.dispatch("userOutlet/deleteOutlet", [
          this.outletIds,
        ]);

        this.deleteModal = false;
        this.$vs.notify({
          title: "Outlet ",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "Outlet ",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    forkName,
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getAllOrganisationLocation",
      "getOptimaUsers",
    ]),

    ...mapGetters("auth/roles", [
      "getLocationSettingsPrivileges",
      "getIsAccOwner",
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    filteredOutlets() {
      return this.getAllOrganisationLocation.outlets.filter((outlet) => {
        return outlet.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    this.$store
      .dispatch("userOutlet/getAllOrganisationLocations")
      .then(() => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
  },
};
</script>

<style></style>
