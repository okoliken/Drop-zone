<template>
  <div class="mt-5">
    <div class="mx-auto">
      <s-tabs
        :tabs="filterModules"
        :activeTab="selected.module"
        @currentTab="selected.module = $event"
      />

      <!-- <component :is="currentTabComponent" /> -->

      <div class="">
        <div class="bg-white rounded-md">
          <div class="flex p-5 px-8">
            <span
              class="flex pr-5 items-center border-r-2 border-gray-400 py-1"
            >
              <img :src="submodule" class="mr-5 w-5" alt="hello" /> Sub module
            </span>
            <div class="ml-8 flex-1 grid grid-cols-5">
              <label
                class="flex items-center my-3 mr-8"
                v-for="(submodule, index) in filterSubModule"
                :key="index"
              >
                <input
                  type="radio"
                  class="mr-3"
                  :value="submodule.name"
                  v-model="selected.submodule"
                />
                {{ submodule.name }}
              </label>
            </div>
          </div>

          <div class="flex p-5 px-8">
            <div class="max-w-sm mr-20">
              <div class="flex">
                <div class="relative w-full">
                  <s-combo-box />
                </div>
              </div>

              <div></div>
            </div>

            <span class="block ml-5">
              <s-select
                selectKey="name"
                value="name"
                :options="getAllOrganisationLocation.outlets"
                v-model="filter.location"
                default-option="--Filter by Location--"
                :width="200"
              />
            </span>
            <span class="ml-6">
              <s-select default-option="--Filter by Function--" :width="200" />
            </span>
          </div>
        </div>

        <div class="mt-5 bg-white">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Previleges (Actions/Forms)
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Approval Type
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Approvers
                </th>

                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Location(s)
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Function(s)
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class v-for="(approval, index) in approvals" :key="index">
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ approval.action.name }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  {{ approval.isDynamic ? "Dynamic" : "Manual" }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="viewApprovers(approval)"
                    class="
                      px-2
                      text-sm
                      py-1
                      border-none
                      text-white
                      rounded
                      bg-cloudenly-primary-main
                      cursor-pointer
                    "
                  >
                    view
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="viewLocations(approval)"
                    class="
                      px-2
                      text-sm
                      py-1
                      border-none
                      text-white
                      rounded
                      bg-cloudenly-primary-main
                      cursor-pointer
                    "
                  >
                    view
                  </button>
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <button
                    @click="viewFunctions(approval)"
                    class="
                      px-2
                      text-sm
                      py-1
                      border-none
                      text-white
                      rounded
                      bg-cloudenly-primary-main
                      cursor-pointer
                    "
                  >
                    view
                  </button>
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>

                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li
                          @click="viewApproval(approval)"
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary
                            hover:text-white
                          "
                        >
                          <span class="ml-2">View</span>
                        </li>
                        <li
                          @click="editApproval(approval)"
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary
                            hover:text-white
                          "
                        >
                          <span class="ml-2">Edit</span>
                        </li>
                        <li
                          @click="deleteApproval(approval)"
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary
                            hover:text-white
                          "
                        >
                          <span class="ml-2">Delete</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="
              p-2
              py-5
              flex
              items-center
              flex-wrap flex-row
              justify-between
            "
          >
            <div class="flex items-center">
              <p class="mr-2">Show :</p>
              <select name class="py-1 px-2 mr-2 border" id>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <p>Per Page</p>
            </div>

            <div class="flex items-center">
              <p class="mr-2">Showing Page</p>
              <feather-icon
                icon="ChevronLeftIcon"
                svgClasses="border h-6 w-6 cursor-pointer mr-3"
              ></feather-icon>
              <p>1</p>
              <feather-icon
                icon="ChevronRightIcon"
                svgClasses="border h-6 w-6 cursor-pointer ml-3"
              ></feather-icon>
              <div>of 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vs-popup :active.sync="viewApproversModal" title="Approvers">
      <ul>
        <li class="p-2" v-for="(approver, i) in showData.approvers" :key="i">
          {{ approver.name }}
        </li>
      </ul>
    </vs-popup>

    <vs-popup :active.sync="viewLocationsModal" title="Location(s)">
      <ul>
        <li class="p-2" v-for="(location, i) in showData.locations" :key="i">
          {{ location.name }}
        </li>
      </ul>
    </vs-popup>

    <vs-popup :active.sync="viewFunctionsModal" title="Function(s)">
      <ul>
        <li class="p-2" v-for="(funcxion, i) in showData.functions" :key="i">
          {{ funcxion.name }}
        </li>
      </ul>
    </vs-popup>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapGetters } from "vuex";

import submodule from "@/assets/images/submodule_icon.svg";
export default {
  name: "ApprovalFlow",
  data() {
    return {
      submodule,
      viewApproversModal: false,
      viewLocationsModal: false,
      viewFunctionsModal: false,
      showData: {},
      approvals: [],

      selected: {
        module: "",
        submodule: "",
      },
      filter: {
        location: "",
        function: "",
      },
    };
  },
  methods: {
    routeNewApproval() {
      this.$router.push({
        name: "newApproval",
      });
    },
    viewApprovers(val) {
      this.viewApproversModal = true;
      this.showData = val;
    },
    viewLocations(val) {
      this.viewLocationsModal = true;
      this.showData = val;
    },
    viewFunctions(val) {
      this.viewFunctionsModal = true;
      this.showData = val;
    },

    editApproval(val) {
      this.$router.push({
        name: "editApproval",
        params: {
          id: val.id,
        },
      });
    },
    // eslint-disable-next-line no-unused-vars
    deleteApproval(val) {},
    // eslint-disable-next-line no-unused-vars
    viewApproval(val) {},
  },
  computed: {
    ...mapGetters("approval", ["getAllApprovalModules", "getCreatedApprovals"]),
    ...mapGetters("userOutlet", [
      "getAllOrganisationLocation",
      "getOrgFunction",
      "getAllOrganisationUsers",
    ]),

    filterModules() {
      try {
        return this.getAllApprovalModules.modules.map((e) => {
          return e.name;
        });
      } catch (err) {
        // if (process.env.NODE_ENV === "development") {
        //   console.log(err);
        // }
      }
    },

    filterSubModule() {
      var submodules = [];
      try {
        this.getAllApprovalModules.modules.map((m) => {
          if (m.name == this.selected.module) {
            submodules = m.submodules.map((sm) => {
              return sm;
            });
          }
        });
        return submodules;
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
  },

  watch: {
    selected: {
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.approvals = [];
        if (val.submodule != "")
          this.$store.dispatch("approval/getCreatedApprovals", {
            module: val.module,
            submodule: val.submodule,
          });
      },
    },
    filter: {
      deep: true,
      immediate: true,
      handler(val) {
        // let currapprovals = this.approvals;
        if (val.location != "" && val.location !== "--Filter by Location--") {
          this.getAllOrganisationLocation.outlets.map((e) => {
            if (e.id == val.location) {
              // eslint-disable-next-line no-unused-vars
              // eslint-disable-next-line no-undef
              // eslint-disable-next-line no-unused-vars
              // eslint-disable-next-line no-undef
              // eslint-disable-next-line no-unused-vars
              // eslint-disable-next-line no-undef
              currapprovals.map((e) => {});
            }
          });
        }
      },
    },

    getCreatedApprovals: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        console.log(JSON.stringify(val, null, 2));
        this.approvals = val.map((e, i) => {
          let approverx = [];
          try {
            if (e.domains[0].approvers !== undefined) {
              approverx = e.domains[0].approvers;
            }
          } catch (err) {
            console.log(i + err);
          }
          return {
            action: e.actions[0],
            approval_type: e.isDynamic ? "Dynamic" : "Manual",
            locations: e.locations,
            functions: e.approvalFunctions,
            approvers: approverx,
            id: e.id,
          };
        });
      },
    },
  },

  async mounted() {
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$store.dispatch("userOutlet/getOrgFunction");

    await this.$store.dispatch("approval/getModules");
    this.selected.module = this.filterModules[0]; // pre select first module
  },
};
</script>

<style>
</style>