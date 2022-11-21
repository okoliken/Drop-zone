<template>
  <div class="">
    <div class="mt-8">
      <span class="text-cloudenly-primary-mid font-black mt-10"
        >Approval Flow</span
      >
    </div>

    <!-- MAnual....we are now showing oonly one view for both (manual and dynamic) -->
    <!-- <div v-if="!isDynamic">
      <span class="block mt-5 text-xl">
        Does this action/form need to be approved by all approvers or just one
        approver needs to approve ?
      </span>
      <div class="flex my-4">
        <label class="flex items-center mr-8">
          <input
            type="radio"
            v-model="MANUAL.isEveryone"
            class="mr-3"
            :value="true"
          />
          <span class="text-base">Yes, everyone needs to approve.</span>
        </label>
        <label class="flex items-center mr-8">
          <input
            type="radio"
            v-model="MANUAL.isEveryone"
            class=""
            :value="false"
          />
          <span class="text-base"
            >No, action/form needs only a single approval to be
            confirmed.*</span
          >
        </label>
      </div>
      <div class="my-8 grid grid-cols-3 gap-3 py-4">
        <approver
          @user="getPickedManualApprover($event, index)"
          :availableUsers="getAllOrganisationUsers"
          @remove="MANUAL.possibleApprovers.splice(index, 1)"
          :index="index"
          v-for="(approvers, index) in MANUAL.possibleApprovers"
          :key="index"
        />
        <button
          @click="MANUAL.possibleApprovers.push({})"
          style="min-height: 200px; border: 1px solid lightgrey"
          class="
            m-5
            text-xl text-center text-primary-optima-color
            font-semibold
            p-4
            rounded-lg
            shadow-sm
          "
        >
          <span class="border-cloudenly-primary-main text-2xl font-bold"
            >+</span
          >
          Add Approver
        </button>
      </div>
      <span class="block text-xl"
        >Anyone in this group can approve. Action/Form will only need one
        approval to be confirmed.</span
      >
    </div> -->

    <!-- DYNAMIC  -->
    <div class="block">
      <span class="block mt-5 font-normal text-xl leading-7">
        The system builds your approval workflow based on your organization's
        hierarchy. Start by selecting the workflow type, single functional or
        multifunctional. You can restrict approvals to only certain users (by
        job level), remove certain users from the approval flow and set who are
        authorized signatories.
      </span>

      <!-- <span class="block mt-6 font-light text-black">
        Restrict approvers to selected job levels (optional):
      </span> -->

      <!-- Job level section supposed to be for dynamic only  -->
      <!-- <div class="overflow-auto whitespace-nowrap mt-4">
        <span
          class="mr-3 rounded-md px-5 py-2 inline-block border-solid"
          v-for="(level, index) in availableJobLevels"
          :key="index"
          :style="{
            borderWidth: '1px',
            borderColor: level.selected ? 'rgba(16, 52, 166)' : 'lightgrey',
          }"
        >
          <span class="">
            <s-checkbox
              :size="20"
              :value="level.selected"
              v-model="level.selected"
            >
              <template v-slot:after>
                <span
                  class="mx-2"
                  :style="{
                    color: level.selected ? 'rgba(16, 52, 166)' : 'grey',
                  }"
                  >{{ level.desc }}</span
                >
              </template>
            </s-checkbox>
          </span>
        </span>
      </div> -->
      <!-- End Job level section-->

      <div class="mt-6">
        <span class="block text-xl">
          Select Approving Functions and approvers:
        </span>
      </div>
      <span class="block mt-5 text-xl leading-7">
        For the initiating function, approval will be in line with the reporting
        structure within the organization. You need to choose the approvers for
        the next approving functional domain, should it go beyond the initiating
        function.
      </span>
      <!-- 
      <button 
     v-if="type != 'EDIT-APPROVAL'"
        class="
          bg-gray-100
          pl-3
          pr-32
          py-4
          text-xl
          block
          mt-5
          border-gray-400 
        
          rounded-md
          border-solid
          text-primary-optima-color
        "
        style="borderwidth: 1px"
      >
         Initiating Function
      </button> -->

      <span class="text-xl text-black mt-8 block">initiating function:</span>

      <div class="mb-10" :key="i" v-for="(approval, i) in DYNAMIC.domain">
        <div class="my-5">
          <div>
            <button
              v-if="i == 0 && DYNAMIC.domain[0].functionName != ''"
              class="
                text-left text-lg
                capitalize
                border-grey
                pl-3
                py-4
                rounded-md
                border-solid
              "
              style="
                border-width: 1px;
                background-color: #eeeeee;
                min-width: 280px;
              "
            >
              {{ approval.functionName }}
            </button>

            <select
              v-if="i !== 0"
              class="py-2 px-2 border border-2 border-gray-300 w-1/4 rounded"
              @change="getFunction(approval, i)"
              v-model="approval.functionName"
              name=""
              id=""
            >
              <option
                v-for="(functions, i) in getOrgFunction"
                :value="functions.name"
                :key="i"
              >
                {{ functions.name }}
              </option>
            </select>
          </div>

          <div class="mt-4">
            <span class="text-xl mt-8 text-black block pb-3">
              Does this action/form need to be approved by all approvers or just
              one approver needs to approve ?
            </span>

            <div class="py-1 flex items-center mt-4">
              <label class="flex items-center text-lg mr-8">
                <input
                  type="radio"
                  class="mr-3"
                  :value="true"
                  v-model="approval.isApprovalForAll"
                />
                Yes, everyone needs to approve.
              </label>

              <label class="flex items-center text-lg mr-8">
                <input
                  type="radio"
                  class="mr-3"
                  :value="false"
                  v-model="approval.isApprovalForAll"
                />
                No, action/form needs only a single approval to be confirmed.
              </label>
            </div>
          </div>
        </div>

        <div
          class="
            whitespace-nowrap
            block
            overflow-x-auto overflow-y-visible
            flex
          "
          style="z-index: 10"
        >
          <approver
            :user="approval.approvers[index]"
            @user="getPickedDynamicApprover($event, index, i)"
            :availableUsers="getAllOrganisationUsers"
            @remove="approval.approvers.splice($event, 1)"
            v-for="(user, index) in approval.approvers"
            :key="index"
            :index="index"
          />

          <div class="inline-block">
            <button
              @click="addApproval(i)"
              style="min-height: 200px; width: 300px"
              class="
                m-5
                text-xl text-center text-primary-optima-color
                font-semibold
                p-4
                rounded-lg
                shadow-sm
              "
            >
              <span class="border-cloudenly-primary-main text-2xl font-bold"
                >+</span
              >
              Add Approver
            </button>
          </div>
        </div>
      </div>

      <!-- Select next approving domain -->
      <div>
        <button
          @click="addDomain"
          v-if="DYNAMIC.domain.length != 0"
          class="
            text-xl
            my-2
            text-center text-primary-optima-color
            font-semibold
          "
        >
          <span class="border-cloudenly-primary-main text-2xl font-bold"
            >+</span
          >
          Add a Functional Domain
        </button>

        <span class="block mt-5 text-xl leading-7">
          Approval Flow is configured in an ascending order, i.e. Highest number
          being the last approver. Please confirm that you have arranged your
          approvers accordingly before proceeding.
        </span>
      </div>
      <!-- End select next approving domain section -->
    </div>
  </div>
</template>

<script>
import approver from "./component/approver.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    approver,
  },
  props: {
    isDynamic: { default: false }, //obsolete
    initiatingFunction: { default: null },
    type: { default: "NEW-APPROVAL" },
    domains: { default: null },
  },
  data() {
    return {
      // MANUAL: {  obsolote
      //   isEveryone: false,
      //   possibleApprovers: [],
      // },
      DYNAMIC: {
        domain: [
          {
            functionName: "",
            functionId: "",
            isApprovalForAll: true,
            approvers: [],
          },
        ],
      },
      availableUsers: [],
      // availableJobLevels: [ obsolote
      //   {
      //     desc: "Job Level 6",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 5",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 4",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 3",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 3H",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 2",
      //     selected: false,
      //   },
      //   {
      //     desc: "Job Level 1",
      //     selected: false,
      //   },
      // ],
    };
  },
  methods: {
    // getPickedManualApprover(user, index, parentIndex) {
    //   this.MANUAL.possibleApprovers.splice(index, 1, {
    //     userId: user.userId,
    //     sequence: user.sequence + 1,
    //   });
    // },
    getPickedDynamicApprover(user, index, parentIndex) {
      //console.log(user, 'Here')
      this.DYNAMIC.domain[parentIndex].approvers.splice(index, 1, {
        userId: user.userId,
        sequence: user.sequence + 1,
      });
    },
    addDomain() {
      this.DYNAMIC.domain.push({
        functionName: "",
        functionId: "",
        isApprovalForAll: true,
        approvers: [],
      });
    },
    getFunction(val, index) {
      this.getOrgFunction.map((e) => {
        if (e.name == val.functionName) {
          this.DYNAMIC.domain[index].functionId = e.id;
        }
      });
    },
    addApproval(index) {
      // console.log('hello', index)
      if (this.DYNAMIC.domain[0].functionName == "") {
        this.$vs.notify({
          title: "Initiating Function Required!",
          text: "Please select a Function",
          color: "danger",
          position: "top-right",
        });
        return;
      }

      this.DYNAMIC.domain[index].approvers.push({
        // userId: "",
        // sequence: index,
      });
    },
  },
  computed: {
    ...mapGetters("userOutlet", ["getAllOrganisationUsers"]),
    ...mapGetters("userOutlet", ["getOrgFunction", "getAllOrganisationUsers"]),
    // selectedJobLevels() {
    //   var levels = [];
    //   // eslint-disable-next-line no-unused-vars
    //   this.DYNAMIC.availableJobLevels.map((e, index) => {
    //     if (e.selected) {
    //       levels.push(e);
    //     }
    //   });
    //   return levels;
    // },
  },
  watch: {
    getAllOrganisationUsers(val) {
      this.availableUsers = val;
      //   console.log(JSON.stringify(val,null,3))
    },
    "MANUAL.possibleApprovers": {
      deep: true,
      handler(val) {
        this.$emit("manual-approvers", {
          isApprovalForAll: this.MANUAL.isEveryone,
          approvers: val,
        });
      },
    },
    // "MANUAL.isEveryone"(val) {
    //   this.$emit("manual-approvers", {
    //     isApprovalForAll: val,
    //     approvers: this.MANUAL.possibleApprovers,
    //   });
    // },
    DYNAMIC: {
      deep: true,
      immediate: true,
      handler(val) {
        //  console.log(JSON.stringify(val, null, 2));
        // console.log('changed...'+JSON.stringify(val,null,2));
        this.$emit("dynamic-approvers", val.domain);
      },
    },
    initiatingFunction: {
      deep: true,
      immediate: true,
      handler(val) {
        // console.log("initial gra gra..."+JSON.stringify(val));
        //     this.DYNAMIC.domain[parentIndex].approvers.splice(index, 1, {
        //   userId: user.userId,
        //   sequence: user.sequence + 1,
        // });
        this.DYNAMIC.domain[0].functionName = val.name;
        this.DYNAMIC.domain[0].functionId = val.id;

        //     this.DYNAMIC.domain.push({
        //   functionName: "",
        //   functionId: "",
        //   isApprovalForAll: true,
        //   approvers: [],
        // });
      },
    },
    domains: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val !== null) {
          this.DYNAMIC.domain = val;
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch("userOutlet/getOrganisationUsers");
  },
};
</script>

<style>
</style>