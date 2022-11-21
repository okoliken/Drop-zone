<template>
  <div style="font-size: 14px">
    <!-- delete request -->
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Function"
    >
      <div class="container">
        <div class="py-3 bg-white">
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
              <p>You are about to delete this function</p>
            </div>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{
              'cursor-not-allowed': deleteButton,
              'bg-cloudenly-primary-mid': deleteButton,
            }"
            @click="deleteFunction"
            class="
              px-5
              py-2
              mr-5
              bg-cloudenly-danger-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
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
    </vs-popup>
    <!-- End Delete Requisition Section -->

    <div class="flex items-center justify-between px-6 py-12 bg-white">
      <s-combo-box />

      <div>
        <button
          class="bg-primary-optima-color text-white px-8 mr-10"
          style="height: 36px; border-radius: 50px"
          @click="$router.push({ name: 'CreateOrgFunction' })"
        >
          New Function
        </button>

        <button
          v-show="getIsAccOwner || getFunctionPrivileges.viewOrgStructure"
          class="px-8"
          style="height: 36px; border-radius: 50px; background-color: #f3f6f9"
          @click="$router.push({ name: 'OrgStructure' })"
        >
          View Org. Structure
        </button>
      </div>
    </div>

    <div v-if="getIsAccOwner || getFunctionPrivileges.viewRegister">
      <s-table :headers="headers" :items="getOrgFunction" :img="emptyState">
        <div slot="title">
            <p class="font-bold text-xl"> No saved functions yet...</p>
          </div>

          <div slot="body">
            <p>
              Functions, together with job level, designations and people, are
              used to build your organizations hierarchy
            </p>
      
          </div>
        <template v-slot:item="{ item }">
          <span v-if="item.hierarchy">
            {{ item.data.hierarchy ? item.data.hierarchy.name : "Nil" }}
          </span>

          <span v-else-if="item.reportsTo">
            {{ item.data.reportsTo ? item.data.reportsTo.name : "Nil" }}
          </span>

          <span v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 8rem">
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="routeEdit(item)"
                  >
                    Edit
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="showDeleteModal(item.data.id)"
                  >
                    Delete
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </span>
        </template>
      </s-table>
    </div>
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapGetters } from "vuex";
import emptyTableIcon from "@/assets/images/optimaAsset/settingEmptyState.svg";


export default {
  name: "Functions",
  data() {
    return {
      img: emptyTableIcon,
      deleteModal: false,
      deleteButton: false,
      functionId: "",

      headers: [
        { text: "Function Name", value: "name" },
        { text: "Hierarchy", value: "hierarchy" },
        { text: "Cost Center Number", value: "costCenter" },
        { text: "Supervisory Function", value: "reportsTo" },
        // { text: "KPA Summary", value: "" },
        { text: "Action", value: "id" },
      ],
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getOrgFunction", "getIsFunctionSetUp"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getFunctionPrivileges"]),
    filteredFunctions() {
      return this.getOrgFunction.filter((functions) => {
        return functions.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    showDeleteModal(id) {
      if (
        this.getIsAccOwner ||
        this.getFunctionPrivileges.deleteFunction === true
      ) {
        this.functionId = id;
        this.deleteModal = true;
      } else {
        this.$vs.notify({
          title: "Function",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    async deleteFunction() {
      try {
        this.deleteButton = true;

        const { data } = await this.$store.dispatch(
          "userOutlet/deleteFunction",
          this.functionId
        );

        this.deleteButton = false;
        this.deleteModal = false;
        this.$vs.notify({
          title: "Function",
          text: "Function deleted successfully",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        // console.log(err);
        this.deleteButton = false;
        this.$vs.notify({
          title: "Function",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    routeEdit(item) {
      if (
        this.getIsAccOwner ||
        this.getFunctionPrivileges.editFunction === true
      ) {
        this.$router.push({
          name: "OrgFunction",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "Function",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  async mounted() {
    try {
      await this.$store.dispatch("userOutlet/getOrgFunction");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>

<style></style>
