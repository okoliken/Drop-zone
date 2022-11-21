<template>
  <div>
    <div class="grid grid-cols-4 bg-white rounded-md p-8 gap-3">
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="totalrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">. </span>
          <span class="text-xl text-gray-600 block">Total Requests</span>
        </div>
      </div>
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="approvedrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">.</span>
          <span class="text-xl text-black block">Approved Requets</span>
        </div>
      </div>
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="openrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1"> .</span>
          <span class="font-semibold text-xl text-black block"
            >Open Requests</span
          >
        </div>
      </div>
      <div class="p-3 flex items-center">
        <img class="w-16 h-16" :src="disapprequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1"> .</span>
          <span class="font-semibold text-xl text-black block"
            >Disapproved Requests</span
          >
        </div>
      </div>
    </div>

    <div class="my-4 bg-white p-10 rounded-md">
      <div class="max-w-sm mr-20">
        <div class="flex">
          <div class="relative w-full">
            <s-combo-box />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="mb-4" v-if="approverRequests.length > 0">
      <div
        class="bg-white rounded-md p-5 my-3 flex"
        v-for="(request, index) in getRequests"
        :key="index"
      >
        <img
          :src="totalrequests"
          class="w-24 h-24 object-cover"
          style="border-radius: 50%"
        />
        <div class="flex-1 ml-2 p-1">
          <span class="text-black text-xl">{{request.initiatorName}}</span>
          <span class="pl-1 text-blue-600 text-xl">{{request.function }}</span>
          <span class="block text-gray-600 my-2 text-xl"
            >submitted: <span class="text-gray-700">2 mins ago</span></span
          >

          <div class="mt-4">
            <span class="text-xl text-gray-600">Request: </span>
            <span class="text-xl text-black"
              >{{request.requestName}}</span
            >
            <button
              class="
                bg-blue-100
                text-xl
                mx-3
                p-3
                px-4
                rounded-md
                text-primary-optima-color
                font-semibold
              "
              @click="viewRequest(request)"
            >
              View
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="showResponse"
            style="border-radius: 30px"
            class="
              text-primary-optima-color
              bg-blue-100
              text-xl
              mx-3
              p-5
              px-8
              font-semibold
            "
          >
            Respond
          </button>
        </div>
      </div>
    </div> -->

    <div class="mt-5 bg-white" v-if="getRequest.length > 0">
      <table class="table min-w-full">
        <thead class="bg-gray-300">
          <tr>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Request Name
            </th>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Date submitted
            </th>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Requests
            </th>

            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Approval Progress
            </th>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(approval, index) in getRequest" :key="index">
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              <div class="bg-white flex">
                <!-- image -->
                <img />

                <div class="flex-1 ml-2 p-1">
                  <span class="text-black text-base block">{{
                    approval.requestName
                  }}</span>
                  <span
                    class="
                      text-gray-600
                      py-1
                      text-base
                      block
                      overflow-hidden overflow-ellipsis
                      whitespace-nowrap
                    "
                    >{{ approval.function }}</span
                  >
                </div>
              </div>
            </td>
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              {{ approval.dateSubmitted }}
            </td>
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              {{ approval.requestName }}
            </td>
            <td
              class="
                pl-6
                py-5
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              <span class="font-bold text-lg text-black"
                >{{ approval.approvalPercentage }}%</span
              >
              <span class="ml-4 text-gray-700 text-base">completed</span>
              <div class="my-2 block" style="width: 400px">
                <s-progress
                  :progress="approval.approvalPercentage"
                  background-color="#ededed"
                  :color="
                    approval.approvalPercentages <= 25
                      ? 'red'
                      : approval.approvalPercentage > 25 &&
                        approval.approvalPercentage <= 49
                      ? 'yellow'
                      : approval.approvalPercentage >= 50 &&
                        approval.approvalPercentage <= 69
                      ? 'gold'
                      : 'green'
                  "
                  :height="8"
                />
              </div>
              <span class="text-gray-600 text-base"
                >{{ approval.approversLeft }} approvers left</span
              >
            </td>
            <td
              class="
                px-6
                py-3
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              <button
                @click="progressModal(approval.requestId)"
                class="
                  bg-red-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-5
                  text-red-600
                  font-semibold
                "
              >
                View Progress
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
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

    <div v-else class="bg-white p-32 flex rounded-md items-center">
      <div class="m-auto">
        <img class="m-auto block" :src="empty" />
        <span class="text-black font-bold text-xl block my-5 text-center"
          >There are no approval requests to you at the moment</span
        >
        <span
          class="block text-center text-xl text-gray-600 max-w-2xl leading-7"
        >
          When an employee initiates an action or submits a form/document that
          requires your approval, they show up here.
        </span>
      </div>
    </div>
    <!-- POP-UP FOR RESPOND/VIEW REQUEST -->
    <!-- <vs-popup :active.sync="responseModal" title="Approval Trail"> -->
    <s-modal :modal="modal">
      <div v-if="getMyApprovalRequest.message ==='No Approval In Progress'">
          No approval
        </div>
      <div v-else>
        <hr class="mt-3" />
        <p class="mt-4 text-lg m-2 leading-relaxed">
          Track approval progress here. See who has approved and what stage the
          approval flow is currently in...
        </p>

        <hr class="mt-3 hr1" />
        <div
          class="bg-white p-5 my-3 flex"
          style="border-bottom: 1px solid lightgrey"
        >
          <img />
          <div class="flex-1 ml-2 p-1">
            <span class="text-black text-xl block">Daniel Oluwa</span>
            <div class="text-base mt-2">Sales Manager, Sales & Marketing.</div>
            <div class="text-base mt-2" >20-01-2021, 12:28 PM.</div>
            <div class="text-base mt-2" > <span class="text-grey"> Comment:</span> Some attached comment appears here from the approver.</div>
          </div>
          <div class="flex items-center">
            <button
              class="
                bg-green-200
                text-xl
                rounded-md
                mx-2
                p-3
                px-3
                text-green-700
                font-semibold
              "
            >
              Approved
            </button>
            <button
              class="
                bg-red-200
                text-xl
                rounded-md
                mx-2
                p-3
                px-3
                text-red-600
                font-semibold
              "
            >
              Disapproved
            </button>
            <button
              class="
                bg-yellow-200
                text-xl
                rounded-md
                mx-2
                p-3
                px-5
                text-yellow-600
                font-semibold
              "
            >
              Pending
            </button>

            <!-- <div class="flex flex-col gap-2">
              <button
                class="
                  bg-blue-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-3
                  text-blue-700
                  font-semibold
                "
              >
                Approve
              </button>
              <button
                class="
                  bg-red-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-3
                  text-red-600
                  font-semibold
                "
              >
                Disapprove
              </button>
            </div> -->
          </div>
        </div>

        <div class="p-5 mt-10">
          <button
            @click="closeProgress"
            class="
              text-xl
              font-bold
              rounded-full
              px-10
              py-5
              text-primary-optima-color
              bg-blue-100
            "
          >
            Close
          </button>

          <!-- <button
            class="
              text-xl
              float-right
              font-bold
              rounded-full
              px-10
              py-5
              bg-primary-optima-color
              text-white
            "
          >
            Submit
          </button> -->
        </div>
        
      </div>
    </s-modal>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import totalrequests from "@/assets/images/approvals/totreq.svg";
import approvedrequests from "@/assets/images/approvals/appreq.svg";
import openrequests from "@/assets/images/approvals/openreq.svg";
import disapprequests from "@/assets/images/approvals/disappreq.svg";
import empty from "@/assets/images/approvals/empty.svg";
import sProgress from "../../../components/scellooComponents/v1/sProgress.vue";
export default {
  components: { sProgress },
  data() {
    return {
      totalrequests,
      approvedrequests,
      openrequests,
      disapprequests,
      empty,
      modal: false,
      // progressModal: false,
      // responseModal: false,
      editApproverStatusIndex: null,
      approverRequests: [{}],
      getRequests: [
        {
          image: totalrequests,
          approversLeft: 5,
          progress: 17,
          date: "2 min ago",
          status: "inprogress",
        },
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Purchase Requisition, #PR3360 ",
          approversLeft: 0,
          progress: 100,
          date: "2 hours ago",
          status: "approved",
        },
        {
          name: "Eniola Janet",
          image: totalrequests,
          role: " Sales Officer",
          request: "Sales Invoice, #INV0909",
          approversLeft: 2,
          progress: 48,
          date: "4 hours ago",
          status: "approved",
        },
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Purchase Order, #PO1270",
          approversLeft: 2,
          progress: 76,
          date: "Yesterday",
          status: "disapproved",
        },
      ],
      approversProgress: [
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "Heavy is the head that wears the crown",
          status: "approved",
        },
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "",
          status: "inprogress",
        },
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "",
          status: "disapproved",
        },
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "",
          status: "notstarted",
        },
      ],
      approverResponses: [
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "Heavy is the head that wears the crown",
          status: "approved",
        },
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "",
          status: "pending",
        },
        {
          image: totalrequests,
          name: "Daniel Otis",
          role: "Sales and Marketing Manager",
          comment: "",
          status: "disapproved",
        },
      ],
    };
  },
  methods: {
    progressModal(val) {
      this.id = val;
      this.$store.dispatch("approval/getMyApprovalRequest", this.id);
       console.log("request Id", this.id);
      this.modal = true;
    },
    closeProgress() {
      this.modal = false;
    },
    // eslint-disable-next-line no-unused-vars
    // showProgress(val) {
    //   this.responseModal = true;
    // },

    // viewRequest(val) {
    //   this.$router.push({
    //     name: "ViewApprovalRequest",
    //     params: {
    //       id: val,
    //     },
    //   });
    // },
    // eslint-disable-next-line no-unused-vars
    // showProgress(val) {
    //   this.progressModal = true;
    // },
    // eslint-disable-next-line no-unused-vars
    // closeProgress(val) {
    //   this.responseModal = false;
    // },

    // eslint-disable-next-line no-unused-vars
    // viewProgress(val) {
    //   this.$router.push({
    //     name: "ViewApprovalInProgressRequest",
    //     params: {
    //       id: "4242", //val.id ??
    //     },
    //   });
    // },
  },
  // watch: {
  //   responseModal() {
  //     this.editApproverStatusIndex = null;
  //   },
  // },
  computed: {
    ...mapGetters("approval", ["getApprovalRequest", "getMyApprovalRequest"]),
    getRequest() {
      return this.getApprovalRequest.approvals;
    },
    // getProgres() {
    //   return this.getProgress.approvals;
    // },
  },
  mounted() {
    this.$store.dispatch("approval/getApprovalRequest");
    // this.requestId = this.val;
    // this.$store.dispatch("approval/getMyApprovalRequest", this.id);
   
    // this.$store.dispatch("approval/getApprovals");
    // this.$store.dispatch("approval/getProgress");
  },
};
</script>

<style>
.hr1 {
  border-top: 1px dashed gray;
}
</style>
