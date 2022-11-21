<template>
  <div style="font-size: 14px">
    <!-- delete Designation -->
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
              >
              </feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this designation</p>
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
            @click="deleteDesignation"
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
    <!-- End Delete Designation Section -->

    <div class="flex items-center justify-between px-6 py-12 bg-white">
      <s-combo-box />

      <button
        class="bg-primary-optima-color text-white px-8"
        style="height: 36px; border-radius: 50px"
        @click="$router.push({ name: 'CreateOrgDesignation' })"
      >
        New Designation
      </button>
    </div>

    <div
      v-if="getIsAccOwner || getOrganisationDesignationPrivileges.viewRegister"
    >
      <s-table :headers="headers" :items="getDesignation" :img="emptyState">
        <div slot="title">
            <p class="font-bold text-xl">No saved Designations yet....</p>
          </div>

          <div slot="body">
            <p>
            Functions, together with job level, designations and people, are
            used to build your organizations hierarchy
            </p>
            
          </div>
        <template v-slot:item="{ item }">
          <span v-if="item.createdAt">{{ item.index + 1 }}</span>

          <span v-else-if="item.level">{{
            item.data.level ? item.data.level.name : "Nil"
          }}</span>

          <span v-else-if="item.orgFunction">{{
            item.data.orgFunction.name
          }}</span>

          <span v-else-if="item.reportsTo">{{
            item.data.reportsTo ? item.data.reportsTo.name : "Nil"
          }}</span>

          <div v-else-if="item.lowerAnnualSalaryBand">
            <span>
              {{ item.data.lowerAnnualSalaryBand | currency }}
            </span>

            <span> - </span>

            <span>
              {{ item.data.upperAnnualSalaryBand | currency }}
            </span>
          </div>

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
                    @click="viewDesignation(item)" 
                  >
                    View
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
                    @click="editDesignation(item)"
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
import { mapGetters } from "vuex";
import emptyTableIcon from "@/assets/images/optimaAsset/settingEmptyState.svg";

export default {
  name: "Designation",
  data() {
    return {
      img:emptyTableIcon,
      deleteModal: false,
      deleteButton: false,
      headers: [
        { text: "#", value: "createdAt" },
        { text: "Title", value: "name" },
        { text: "Job Level", value: "level" },
        { text: "Function", value: "orgFunction" },
        { text: "Reporting to", value: "reportsTo" },
        // { text: "Annual Salary Band (₦)", value: "lowerAnnualSalaryBand" },
        { text: "Actions", value: "id" },
      ],
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getDesignation"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getOrganisationDesignationPrivileges",
    ]),
  },
  methods: {
    showDeleteModal(id) {
      if (
        this.getIsAccOwner ||
        this.getOrganisationDesignationPrivileges.deleteDesignation === true
      ) {
        this.deleteModal = true;
        this.designationId = id;
      } else {
        this.$vs.notify({
          title: "Designation",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    deleteDesignation() {
      this.deleteButton = true;
      const payload = [this.designationId];
      this.$store
        .dispatch("userOutlet/deleteDesignation", payload)
        .then((resp) => {
          this.deleteButton = false;
          (this.deleteModal = false),
            this.$vs.notify({
              title: "Designation",
              text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Designation",
            text: err.response.data.message,
            color: "primary",
            position: "top-right",
          });
        });
    },

    editDesignation(item) {
      if (
        this.getIsAccOwner ||
        this.getOrganisationDesignationPrivileges.editDesignation === true
      ) {
        this.$router.push({
          name: "OrgDesignation",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "Designation",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    viewDesignation(item){
      if (
        this.getIsAccOwner ||
        this.getOrganisationDesignationPrivileges.editDesignation === true
      ) {
        this.$router.push({
          name: "viewOrganizationDesignation",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "viewOrganizationDesignation",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
    
  },

  async mounted() {
    try {
      await this.$store.dispatch("userOutlet/getOrgDesignation");
      await this.$store.dispatch("userOutlet/getOrgFunction");
      await this.$store.dispatch("userOutlet/getOrgLevels");
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>

<style></style>
