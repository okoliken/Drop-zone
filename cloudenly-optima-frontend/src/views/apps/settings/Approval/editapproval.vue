<template>
  <div>
    <div class="flex py-5 px-3">
      <back class="" />
      <div class="text-gray-700">
        <span class="text-black text-xl font-bold mr-1"
          >Edit Approval Flow</span
        >
        Dashboard/Settings/ Approval Flow/ Edit Approval Flow
      </div>
    </div>

    <div class="m-3 bg-white p-8">
      <span class="block text-2xl py-3 font-bold">{{
        payload_data.workFlowName
      }}</span>
      <hr class="mt-3" />

      <div class="flex items-center mt-10">
        <div class="w-1/3">
          <s-text
            label="Workflow Name"
            placeholder="--Enter--"
            v-model="payload_data.workFlowName"
          />
        </div>
      </div>
      <!-- <span class="my-3 block text-lg leading-7"
        >Start by selecting a module, then a list of actions or forms within
        that module can be selected. You can select more than one actions/forms
        to configure for approval. You can only select multiple actions/forms
        within one module though.</span > -->

      <!-- <div class="flex gap-8 mb-8 mt-8">
        <s-select
          label="Select Module"
          v-model="modules.module"
          default-option="--Select--"
          :options="filterModules"
          :width="450"
        />
        <s-select
          :disabled="modules.module == ''"
          label="Select Sub module"
          selectKey="name"
          :options="filterSubModule"
          v-model="modules.sub_module"
          :default-option="
            modules.module == '' ? 'Select a module first...' : '--Select--'
          "
          :width="450"
        />
      </div> -->

      <!-- <template v-if="filterModuleActions.length > 0">
        <span class="block mt-4 text-lg"
          >Select a module to see associated actions/forms:</span
        >
        <div
          class="grid grid-cols-12 mt-1 border-b-2 pb-10 border-gray-500"
          style="min-height: 100px"
        >
          <div class="col-span-6">
            <span class="text-cloudenly-primary-mid text-lg block my-3"
              >Actions</span
            >
            <span
              class="my-2 block"
              v-for="(actions, index) in filterModuleActions"
              :key="index"
            >
              <s-checkbox
                v-model="modules.actions[actions.name]"
                :value="modules.actions[actions.name]"
                :size="20"
              >
                <template v-slot:after>
                  <span class="mx-2">{{ actions.name }}</span>
                </template>
              </s-checkbox>
            </span>
          </div>
          <div class="col-span-6 border-l-2 border-gray-500 pl-5">
          <span class="text-cloudenly-primary-mid">Forms</span>
        </div>
        </div>
      </template> -->

      <span class="block text-2xl mt-5 py-3 font-bold"
        >Location and Function Settings</span
      >
      <span class="my-3 block text-lg leading-7">
        Now select which locations this workflow is going to be configured for.
        This implies that the approval process will be in effect for only
        selected locations. This principle also applies to selected functions.
        This is very effective where approval flows vary based on location, or
        function (departments). Simply select all for each, if the workflow is
        the same organisation, regardless of users’ location or function.
      </span>

      <div class="flex gap-8 mb-4 mt-4 items-center">
        <div class="mr-16">
          <!-- <span class="absolute right-0 top-0">
            <s-checkbox v-model="locations.isAll" :value="locations.isAll">
              <template v-slot:after>
                <span class="mx-2">Select All Locations</span>
              </template>
            </s-checkbox>
          </span> -->
          <s-select
            v-model="payload_data.locationId"
            label="Location"
            selectKey="name"
            :options="getAllOrganisationLocation.outlets"
            default-option="--Select--"
            :width="430"
            @input="getLocationName"
            :disabled="true"
          />

          <!-- <s-text label="Location" :width="430" :disabled="true" v-model="payload_data.locationName" /> -->
        </div>

        <div class="">
          <!-- <span class="absolute right-0 top-0">
            <s-checkbox v-model="functions.isAll" :value="functions.isAll">
              <template v-slot:after>
                <span class="mx-2">Select All Functions</span>
              </template>
            </s-checkbox>
          </span> -->
          <s-select
            label="Function"
            v-model="payload_data.functionId"
            selectKey="name"
            :options="getOrgFunction"
            default-option="--Select--"
            :width="430"
            :disabled="true"
            @input="getFunctionName"
          />
        </div>
      </div>

      <hr class="mt-10" />

      <div class="mt-8">
        <span class="block text-2xl py-3 font-bold">Approval Workflow</span>
        <span class="my-3 mb-8 block text-lg leading-7">
          This is the final step. Select your preferred workflow and build your
          approval trail.
        </span>

        <span class="block text-cloudenly-primary-mid mt-5 mb-6"
          >Approval Type</span
        >
        <div class="grid grid-cols-2">
          <div class="border-dashed border-l-2">
            <div class="relative">
              <span class="absolute" style="left: -8px; top: -6px">
                <label class="flex items-center mr-8">
                  <input
                    type="radio"
                    v-model="approval_type"
                    class="mr-3"
                    value="manual"
                  />
                  <span class="text-xl">Manual</span>
                </label>
              </span>
            </div>
            <span class="block m-5 text-xl">
              Let me select the approvers directly, irrespective of my
              organization’s hierarchy.
            </span>
          </div>

          <div class="border-dashed border-l-2">
            <div class="relative">
              <span class="absolute" style="left: -8px; top: -6px">
                <label class="flex items-center mr-8">
                  <input
                    type="radio"
                    v-model="approval_type"
                    class="mr-3"
                    value="dynamic"
                  />
                  <span class="text-xl">Dynamic</span>
                </label>
              </span>
            </div>
            <span class="block m-5 text-xl">
              Use my organization hierarchy to build an approval structure.
            </span>
          </div>
        </div>

        <!--  -->
        <approvalflow
          :type="'EDIT-APPROVAL'"
          @manual-approvers="setDomains"
          @dynamic-approvers="setDynamicDomains"
          :isDynamic="isDynamic"
          :domains="payload_data.domains"
          :initiatingFunction="initFunction"
        />
      </div>
      <!-- <span class="block text-2xl py-3 font-bold mb-6"
        >Escalation Settings (Optional)</span
      >
      <span
        class="my-3 rounded-lg border-orange-300 border-solid p-3 bg-orange-100"
        style="border-width: 1px"
      >
        <button
          class="
            rounded-full
            text-orange-300
            border-orange-300 border-solid
            p-1
            h-6
            w-6
            mr-2
          "
          style="border-width: 1px"
        >
          !
        </button>
        <span class="text-xl"
          >*Selected setting does not need escalation as any one of the
          approvers can approve</span
        >
      </span>
      <span class="text-xl text-grey block my-10">
        Escalate approval when approvers are unavailable or have failed to
        approve within the set time limit.
      </span>
      <span class="text-xl text-grey block mt-6 mb-2">Time Limit:</span>
      <div class="flex gap-2 border-b-2 pb-20 border-gray-500">
        <s-text
          type="number"
          v-model="time_limit.duration"
          class="w-24"
          placeholder="0"
        />
        <s-select
          :options="time_limit.type"
          default-option="Hour(s)"
          :width="100"
        />
      </div> -->

      <div class="my-8">
        <button
          @click="$router.go(-1)"
          class="
            font-bold
            rounded-full
            px-10
            py-5
            text-primary-optima-color
            bg-blue-100
          "
        >
          Cancel
        </button>

        <button
          @click="updateApproval"
          class="
            float-right
            font-bold
            rounded-full
            px-10
            py-5
            bg-primary-optima-color
            text-white
          "
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import sSelect from "../../../../components/scellooComponents/v1/sSelect.vue";
import SText from "../../../../components/scellooComponents/v1/sText.vue";
import { mapGetters } from "vuex";
import approvalflow from "./approvalflow.vue";
// PLEASE NOTE payload_data is what we are submitting.
export default {
  components: { sSelect, SText, approvalflow },
  name: "NewApprovalFlow",
  data() {
    return {
      modules: {
        module: "",
        sub_module: "",
        actions: {},
      },
      ACTIONS: [],
      userInfo: {
        orgId: "",
        creatorId: "",
        outletId: "",
      },
      payload_data: {
        locations: [],
        approvalFunctions: [],
        domains: [],
        appSlug: "optima",
        actionId: "",
        actionSlug: "",
        locationId: "",
        locationName: "",
        functionId: "",
        functionName: "",
        workFlowName: "",
      },
      locations: {
        isAll: false,
        selected: "",
      },
      functions: {
        isAll: false,
        selected: "",
      },
      approval_type: "manual",
      time_limit: {
        duration: "",
        type: ["Day(s)", "Hour(s)", "Miniute(s)"],
      },
      initFunction: null,
    };
  },
  methods: {
    setDomains(val) {
      //   console.log("----->"+JSON.stringify(val,null,2))
      this.payload_data.domains = [];
      let value = {
        ...{
          functionName: this.payload_data.functionName,
          functionId: this.payload_data.functionId,
        },
        ...val,
      };
      this.payload_data.domains.push(value);
    },
    setDynamicDomains(value) {
      this.payload_data.domains = [];
      this.payload_data.domains = value;
    },
    sendInitiatinfUnction() {
      let initFunction = {
        id: this.payload_data.functionId,
        name: this.payload_data.functionName,
      };
      console.log("sending..." + JSON.stringify(initFunction, null, 2));
      this.initFunction = initFunction;
    },
    async updateApproval() {
      const data = {
        id: this.payload_data.id,
        data: {
          payload: {
            domains: this.payload_data.domains,
          },
        },
      };

      console.log("updating.....");
      console.log("Complete Data===>" + JSON.stringify(data.data, null, 2));

      try {
        await this.$store.dispatch("approval/updateApprovalFlow", data);
        if (process.env.NODE_ENV === "development") {
          console.log(JSON.stringify(data, null, 2));
        }
        console.log("Sucessfully updated workflow");
        this.$router.push({
          name: "approvalSetting",
        });

        // eslint-disable-next-line no-extra-semi
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(JSON.stringify(err, null, 2));
        }
      }
    },
    getFunctionName() {
      this.getOrgFunction.map((e) => {
        if (this.payload_data.functionId == e.id) {
          this.payload_data.functionName = e.name;
        }
      });
      this.sendInitiatinfUnction();
    },
    getLocationName() {
      this.getAllOrganisationLocation.outlets.map((e) => {
        if (this.payload_data.locationId == e.id) {
          this.payload_data.locationName = e.name;
        }
      });
    },
  },
  computed: {
    ...mapGetters("auth/auth", ["getUserData"]),
    ...mapGetters("approval", ["getAllApprovalModules"]),
    ...mapGetters("userOutlet", [
      "getAllOrganisationLocation",
      "getOrgFunction",
      "getAllOrganisationUsers",
    ]),
    ...mapGetters("approval", ["getOneApprovalFlow"]),
    filterModules() {
      try {
        return this.getAllApprovalModules.modules.map((e) => {
          return e.name;
        });
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
      }
    },
    filterSubModule() {
      var submodules = [];
      try {
        this.getAllApprovalModules.modules.map((m) => {
          if (m.name == this.modules.module) {
            submodules = m.submodules.map((sm) => {
              return sm;
            });
          }
        });
        return submodules;
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    filterModuleActions() {
      let moduleActions = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.modules.actions = {};
      try {
        this.getAllApprovalModules.modules.map((m) => {
          if (m.name == this.modules.module) {
            m.submodules.map((sm) => {
              if (sm.name == this.modules.sub_module) {
                moduleActions = sm.moduleActions.map((ma) => {
                  this.$set(this.modules.actions, ma.name, false);
                  return ma;
                });
              }
            });
          }
        });
        return moduleActions;
      } catch (err) {
        return [];
      }
    },
    isDynamic() {
      if (this.approval_type == "manual") {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    modules: {
      deep: true,
      handler(val) {
        //ALL DATA HERE ARE REACTIVE!!!
        //set module name
        this.$set(this.payload_data, "module", val.module);
        //set submodule
        this.$set(this.payload_data, "submodule", val.sub_module);
        //prepare module actions
        let actions = [];
        Object.keys(this.modules.actions).map((mA) => {
          this.filterModuleActions.map((ma) => {
            if (ma.name == mA && this.modules.actions[mA]) {
              actions.push({
                actionId: ma.subModuleid,
                name: ma.name,
                slug: ma.slug,
              });
            }
          });
        });
        //set module actions
        if (actions.length > 0) {
          // this.$set(this.payload_data, "actions", actions);
          this.ACTIONS = actions;
        }
      },
    },
    locations: {
      deep: true,
      immediate: true,
      handler(val) {
        //ALL DATA HERE ARE REACTIVE!!!
        if (val.isAll) {
          // if all location has been selected
          this.locations.selected = "";
          this.$set(
            this.payload_data,
            "locations",
            this.getAllOrganisationLocation.outlets.map((e) => {
              return { locationId: e.id, name: e.name };
            })
          );
        } else {
          delete this.payload_data.locations; //delete the locations data from object
        }
        if (val.selected !== "") {
          //it spilts out the location's id
          //filter out the location by it's id
          let location = [];
          this.getAllOrganisationLocation.outlets.map((e) => {
            if (e.id == val.selected)
              location.push({
                locationId: e.id,
                name: e.name,
              });
          });
          //recall our data object
          this.$set(this.payload_data, "locations", location);
        }
      },
    },
    functions: {
      deep: true,
      immediate: true,
      handler(val) {
        //ALL DATA HERE ARE REACTIVE!!!
        if (val.isAll) {
          // if all location has been selected
          this.functions.selected = "";
          this.$set(
            this.payload_data,
            "approvalFunctions",
            this.getOrgFunction.map((e) => {
              return { functionId: e.id, name: e.name, orgId: e.orgId };
            })
          );
        } else {
          // delete this.payload_data.approvalFunctions; //delete the locations data from object
        }
        if (val.selected !== "") {
          //it spilts out the location's id
          //filter out the location by it's id
          let functions = [];
          this.getOrgFunction.map((e) => {
            //  console.log(JSON.stringify(e));
            if (e.id == val.selected)
              functions.push({
                functionId: e.id,
                name: e.name,
                orgId: e.orgId,
              });
          });
          //recall our data object
          this.$set(this.payload_data, "approvalFunctions", functions);
        }
      },
    },
    isDynamic: {
      immediate: true,
      handler(val) {
        this.$set(this.payload_data, "isDynamic", val);
      },
    },
    payload_data: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        if (process.env.NODE_ENV === "development")
          console.log("playload updated.." + JSON.stringify(val, null, 2)); //this will be sent to the server
      },
    },

    getOneApprovalFlow: {
      deep: true,
      immediate: true,
      handler(val) {
        this.payload_data = val;
        console.log("approval flow:" + JSON.stringify(val, null, 2));
      },
    },
  },
  mounted() {
    this.id = this.$route.params.id;

    this.$store.dispatch("approval/getOneApprovalFlow", this.id);

    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$store.dispatch("userOutlet/getOrgFunction");
    //     this.userInfo.orgId = this.$store.state.auth.auth.authData.orgId
    //     this.userInfo.creatorId = this.$store.state.auth.auth.authData.creatorId
    //     this.userInfo.outletId = this.$store.state.auth.auth.authData.outletId
  },
};
</script>

<style>
</style>