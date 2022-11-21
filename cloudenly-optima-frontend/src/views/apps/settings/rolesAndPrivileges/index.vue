<template>
  <div>
    <back location="Roles and Privileges" class="mb-8" />

    <div v-if="getOrganisationOptimaRoles.length === 0">
      <emptyState />
    </div>

    <div v-else>
      <role-modal
        v-model="roleModal"
        :roles="getOrganisationOptimaRoles"
        :data="roleDetails"
        @proceed="handleClone($event)"
      />

      <div class="bg-white flex justify-between items-center py-12 px-5">
        <s-combo-box />

        <div class="flex items-center">
          <s-button
            class="px-8 bg-gray-300 mr-5 text-primary-optima-color"
            @click="$router.push({ name: 'createRoleAndPrivilege' })"
          >
            Manage Subscription
          </s-button>
          <s-button
            class="px-8 bg-primary-optima-color text-white"
            @click="$router.push({ name: 'createRoleAndPrivilege' })"
          >
            Create New Role
          </s-button>
        </div>
      </div>

      <div
        class="
          flex
          bg-white
          justify-between
          items-center
          px-6
          py-5
          font-normal
          mt-5
        "
      >
        <div class="flex items-center">
          <s-select
            defaultOption="--Filter By Outlet--"
            :width="250"
            class="mr-6"
          />

          <!-- <select @change="getFilterPr" v-model="filter.outlet"> 
            <option v-for='(outlet, i) in getAllOrganisationLocation' :key="i">
              <option>All Organisation </option>
              <option :value="outletId"> {{outlet.name}} </option>
            </option>
          </select> -->

          <s-select defaultOption="--Filter By--" :width="250" />
        </div>

        <div class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>

      <s-table
        id="div-with-loading"
        class="vs-con-loading__container mt-3"
        :headers="headers"
        :items="getOrganisationOptimaRoles"
      >
        <template v-slot:item="{ item }">
          <span v-if="item.updatedAt">{{ item.data.updatedAt | date }}</span>

          <div v-else-if="item.isDefault">
            <span v-if="item.data.isDefault">Default</span>
            <span v-else>Custom</span>
          </div>

          <span v-else-if="item.id">
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
                    @click="cloneRoleModal(item.data)"
                  >
                    Clone
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="handleEdit(item.data)"
                    v-if="!item.data.isDefault"
                  >
                    Edit
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="handleView(item.data)"
                  >
                    View
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </span>
        </template>
      </s-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoleModal from "./components/roleModal.vue";
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import emptyState from "./emptyState.vue";

export default {
  name: "RolesAndPrivileges",
  components: { RoleModal, sPhoto, emptyState },
  data() {
    return {
      image_dummy,
      roleModal: false,
      roleDetails: {
        name: "",
        referenceId: "",
      },
      headers: [
        { text: "Role Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Privileges", value: "isDefault" },
        { text: "Date Added", value: "updatedAt" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    cloneRoleModal(val) {
      console.log(val);
      this.roleDetails = {
        name: val.name,
        referenceId: val.id,
      };

      this.roleModal = true;
    },

    handleClone({ name: role, referenceId: id }) {
      this.$router.push({
        name: "roleAndPrivilege",
        params: { id },
        query: { role },
      });
    },

    handleEdit({ id, name, description }) {
      this.$router.push({
        name: "roleAndPrivilege",
        params: { id },
        query: { mode: "edit", role: name, description: description },
      });
    },

    handleView({ id, name, isDefault, description }) {
      this.$router.push({
        name: "roleAndPrivilege",
        params: { id },
        query: {
          mode: "view",
          role: name,
          isDefault,
          description: description,
        },
      });
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOrgRoles", "getOrganisationOptimaRoles"]),
    filterDefaultRole() {
      return this.getOrgRoles.filter((resp) => {
        return resp.isDefault === true;
      });
    },

    filterCustomRole() {
      return this.getOrgRoles.filter((resp) => {
        return resp.isDefault === false;
      });
    },
  },

  mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7,
    // });
    this.$store
      .dispatch("userOutlet/getOptimaOrgRoles")
      // eslint-disable-next-line no-unused-vars
      .then((resp) => {
        // console.log(resp.data);
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        console.log(err);
      });
    // new optima roles
    this.$store.dispatch("userOutlet/getNewOrgOptimaRoles");
  },
};
</script>

<style scoped lang="css"></style>
