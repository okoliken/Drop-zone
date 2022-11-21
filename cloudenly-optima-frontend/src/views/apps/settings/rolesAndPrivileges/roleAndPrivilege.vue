<template>
  <div class="font-normal" style="font-size: 14px">
    <back
      :location="`${$route.query.mode || 'Create New'} Role`"
      class="mb-8"
    />

    <!-- Drawer for Add module -->
    <Drawer v-on:closeDrawer="close" :visible="addModuleDrawer" :size="35">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Add Modules</p>
      </div>

      <div slot="body">
        <!-- <div>
            <div>
              <p class="text-cloudenly-primary-main text-md">Add Modules</p>
            </div>

            <svg
              width="454"
              height="1"
              viewBox="0 0 454 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="0.5"
                x2="453.5"
                y2="0.5"
                stroke="#878E99"
                stroke-linecap="round"
                stroke-dasharray="4 4"
              />
            </svg>

          </div> -->

        <div
          class="col-span-12 grid grid-cols-12 mt-3 gap-8"
          v-if="getOrganisationOptimaRolesPrivileges.length"
        >
          <div
            class="col-span-12 rounded py-2"
            v-for="(item, i) in getOrganisationOptimaRolesPrivileges"
            :key="i"
          >
            <div
              class="
                flex
                items-center
                justify-between
                py-3
                bg-gray-200
                w-full
                px-5
                rounded-sm
              "
            >
              <div class="flex items-center">
                <div>
                  <span class="mr-3 inline-block">
                    <svg
                      width="24"
                      height="27"
                      viewBox="0 0 24 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.3334 25.6114V22.9447C22.3334 21.5302 21.7715 20.1736 20.7713 19.1734C19.7711 18.1732 18.4146 17.6113 17.0001 17.6113H6.33335C4.91886 17.6113 3.5623 18.1732 2.5621 19.1734C1.56191 20.1736 1 21.5302 1 22.9447V25.6114"
                        stroke="#1034A6"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.6664 12.278C14.6119 12.278 16.9997 9.89021 16.9997 6.94468C16.9997 3.99915 14.6119 1.61133 11.6664 1.61133C8.72083 1.61133 6.33301 3.99915 6.33301 6.94468C6.33301 9.89021 8.72083 12.278 11.6664 12.278Z"
                        stroke="#1034A6"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div>
                  <div>
                    <span class="inline-block"> {{ item.name }} </span>
                  </div>
                  <span class="text-sm">All Privileges</span>
                </div>
              </div>

              <div>
                <s-checkbox></s-checkbox>
              </div>
            </div>
          </div>
        </div>

        <div slot="footer">
          <div class="py-3 px-2 flex items-center justify-between">
            <button
              class="
                py-3
                px-5
                rounded-full
                bg-gray-400
                text-primary-optima-color
              "
            >
              Cancel
            </button>
            <button
              class="py-3 px-8 bg-primary-optima-color text-white rounded-full"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End Add Modules Drawer -->

    <div
      class="bg-white p-6 grid grid-cols-12 col-gap-20 row-gap-8 gap-10 rounded"
    >
      <h2 class="col-span-12 font-semibold">Role Details</h2>

      <s-text
        label="Role Name"
        class="col-span-6"
        placeholder="Enter role name"
        :disabled="$route.query.mode === 'view'"
        v-model="roleName"
      />

      <s-text
        label="Description"
        class="col-span-6"
        placeholder="Enter a description"
        :disabled="$route.query.mode === 'view'"
        v-model="roleDescription"
      />

      <s-content-seperator />
    </div>

    <div class="py-5 px-5 mt-3 bg-white flex justify-between items-center">
      <div class="w-1/2">
        <h3 class="font-semibold">Access control</h3>

        <p class="mt-4">
          Select which modules and associated actions/forms to grant access
          to.Select which modules and associated actions/forms to grant access
          to.
        </p>
      </div>

      <div class="w-1/2">
        <div class="flex items-center justify-end">
          <button
            @click="addModuleDrawer = true"
            class="flex items-center mr-5"
          >
            <span class="mr-2">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 23.5557C5.92487 23.5557 1 18.6308 1 12.5557C1 6.48053 5.92487 1.55566 12 1.55566C18.0751 1.55566 23 6.48053 23 12.5557C23 18.6308 18.0751 23.5557 12 23.5557ZM12 21.5557C16.9706 21.5557 21 17.5262 21 12.5557C21 7.5851 16.9706 3.55566 12 3.55566C7.02944 3.55566 3 7.5851 3 12.5557C3 17.5262 7.02944 21.5557 12 21.5557ZM17 11.5557H13V7.55566H11V11.5557H7V13.5557H11V17.5557H13V13.5557H17V11.5557Z"
                  fill="#4ECDC4"
                />
              </svg>
            </span>
            <span> Add Modules </span>
          </button>

          <span class="mr-5">
            <svg
              width="1"
              height="25"
              viewBox="0 0 1 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="1.05566"
                x2="0.499999"
                y2="24.0557"
                stroke="#507FDF"
                stroke-linecap="round"
              />
            </svg>
          </span>

          <button @click="addPrivilegesDrawer = true" class="flex items-center">
            <span class="mr-2">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.555664" width="24" height="24" rx="5" fill="white" />
                <path d="M13 7.55566H7V5.55566H13V7.55566Z" fill="#507FDF" />
                <path d="M13 11.5557H7V9.55566H13V11.5557Z" fill="#507FDF" />
                <path d="M7 15.5557H13V13.5557H7V15.5557Z" fill="#507FDF" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 19.5557V1.55566H17V5.55566H21V23.5557H7V19.5557H3ZM15 17.5557V3.55566H5V17.5557H15ZM17 7.55566V19.5557H9V21.5557H19V7.55566H17Z"
                  fill="#507FDF"
                />
              </svg>
            </span>
            <span> Import Privileges </span>
          </button>
        </div>
      </div>
    </div>

    <div class="">
      <div>
        <ul class="">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            @click="currentTab = tab"
            :class="setTabCssProperties(tab)"
            class="
              flex
              items-center
              text-lg
              font-normal
              cursor-pointer
              px-6
              py-4
              rounded-b-0
              flex-no-wrap
              whitespace-no-wrap
            " >
            {{ selectKey ? tab[selectKey] : tab }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Drawer from "../../../components/Drawer/drawer";
// import roleAndPrivilege from "./roleAndPrivilege";

export default {
  name: "RoleAndPrivilege",
  components: {
    Drawer,
  },
  data() {
    return {
      loading: true,
      addModuleDrawer: false,
      addPrivilegesDrawer: false,
      roleName: "",
      roleDescription: "",
      currentTab: {},
      isSubmitting: false,
      isUpdating: false,
      selectedPrivileges: [],

      subModuleCurrentTab: {},
    };
  },

  watch: {
    getRoleAndPrivilege() {
      console.log("I changed");
      if (this.$route.params.id) {
        this.getOrganisationOptimaRolesPrivileges.forEach((items) => {
          items.submodules.forEach((item) => {
            item.privileges.forEach((privilege) => {
              if (privilege.hasPrivilege) {
                this.selectedPrivileges.push(privilege.id);
                this.selectedPrivileges = [...new Set(this.selectedPrivileges)];
              }
            });
          });
        });
        console.log(this.selectedPrivileges, "at watch");
      }
    },

    // selectedPrivileges: function() {
    //   console.log('hello')
    //    if (this.$route.params.id) {
    //     this.getOrganisationOptimaRolesPrivileges.forEach((items) => {
    //       items.submodules.forEach((item) => {
    //         item.privileges.forEach((privilege) => {
    //           if (privilege.hasPrivilege) {
    //             this.selectedPrivileges.push(privilege.id);
    //             this.selectedPrivileges = [...new Set(this.selectedPrivileges)];
    //           }
    //         });
    //       });
    //     });
    //     console.log(this.selectedPrivileges, "at watch");
    //   }
    // }
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getDefineOptimaRoles",
      "getSingleRolePrivilege",
      "getOrganisationOptimaRolesPrivileges",
    ]),

    currentTabComponent() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.subModuleCurrentTab = this.currentTab.submodules[0];
      // console.log(this.selectedPrivileges)
      return this.currentTab;
    },

    getRoleAndPrivilege() {
      // if (!this.$route.params.id) return roleAndPrivilege;
      // return this.getSingleRolePrivilege;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentTab = this.getOrganisationOptimaRolesPrivileges[0];
      return this.getOrganisationOptimaRolesPrivileges;
    },
  },

  methods: {
    handleSelectAll(value) {
      console.log(value);
      if (value) {
        this.subModuleCurrentTab.privileges =
          this.subModuleCurrentTab.privileges.map((item) => ({
            ...item,
            hasPrivilege: true,
          }));
      } else {
        this.subModuleCurrentTab.privileges =
          this.subModuleCurrentTab.privileges.map((item) => ({
            ...item,
            hasPrivilege: false,
          }));
      }
      console.log(this.subModuleCurrentTab.privileges);
    },

    handleEdit() {
      this.$router.push({
        name: "roleAndPrivilege",
        query: { role: this.roleName, mode: "edit" },
        params: { id: this.$route.params.id },
      });
    },

    createRole() {
      this.isSubmitting = true;
      const data = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        name: this.roleName,
        description: this.roleDescription,
        appSlug: "optima",
        rolePrivileges: this.selectedPrivileges.map((resp) => {
          return {
            privilegeId: resp,
          };
        }),
      };
      // console.log(data);

      this.$store
        .dispatch("userOutlet/createNewOptimaRoles", data)
        .then((resp) => {
          this.isSubmitting = false;

          this.$vs.notify({
            title: "Role",
            text: resp.data.message || "Successfully created role",
            color: "primary",
            position: "top-right",
          });

          this.$router.push({
            name: "rolesAndPrivileges",
          });
        })
        .catch((err) => {
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Role",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    updateRole() {
      this.isUpdating = true;

      const data = {
        roleId: this.$route.params.id,
        name: this.roleName,
        description: this.roleDescription,
        rolePrivileges: this.selectedPrivileges.map((resp) => {
          return {
            privilegeId: resp,
          };
        }),
      };

      // console.log(data)

      this.$store
        .dispatch("userOutlet/updateNewOptimaRoles", data)
        .then((resp) => {
          this.isUpdating = false;
          this.$router.push({
            name: "rolesAndPrivileges",
          });
          this.$vs.notify({
            title: "Role",
            text: resp.data.message || "Successfully updated role",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.isUpdating = false;
          this.$vs.notify({
            title: "Role",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    close() {
      this.addModuleDrawer = false;
      this.addPrivilegesDrawer = false;
    },
  },

  async mounted() {
    const { id } = this.$route.params;

    this.roleName = this.$route.query.role || "";
    this.roleDescription = this.$route.query.description || "";

    if (id) {
      const { data } = await this.$store.dispatch(
        "userOutlet/getOptimaUserRoleWithPrivileges",
        id
      );

      if (data.modules) {
        data.modules.forEach((items) => {
          // console.log(items);
          items.submodules.forEach((item) => {
            item.privileges.forEach((privilege) => {
              if (privilege.hasPrivilege) {
                this.selectedPrivileges.push(privilege.id);
                this.selectedPrivileges = [...new Set(this.selectedPrivileges)];
              }
            });
          });
        });
        console.log(this.selectedPrivileges);
      }
    } else {
      this.$store.dispatch("userOutlet/getAppsRolesAndPrivileges");
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.active {
  /* border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue; */
  background-color: white;
  color: blue;
}
</style>
