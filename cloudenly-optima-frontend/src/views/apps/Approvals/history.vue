<template>
  <div>
    <div class="flex py-5 px-3">
      <back class="" />
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-1">Approvals</span
        >.../History
      </div>
    </div>

    <div class="grid grid-cols-4 bg-white rounded-md p-8 gap-3">
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="totalrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">{{
            getApprovalRequestDetails.TotalRequest
          }}</span>
          <span class="text-xl text-gray-600 block">Total Requests</span>
        </div>
      </div>
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="approvedrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">{{getApprovalRequestDetails.ApprovedRequest}}</span>
          <span class="text-xl text-black block">Approved Requests</span>
        </div>
      </div>
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="openrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">{{
            getApprovalRequestDetails.OpenRequest
          }}</span>
          <span class="font-semibold text-xl text-black block"
            >Open Requests</span
          >
        </div>
      </div>
      <div class="p-3 flex items-center">
        <img class="w-16 h-16" :src="disapprequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">{{
          getApprovalRequestDetails.DisapprovedRequests
          }}</span>
          <span class="font-semibold text-xl text-black block"
            >Disapproved Requests</span
          >
        </div>
      </div>
    </div>

    <div class="my-4 bg-white p-10 rounded-md">
      <div class="flex p-3 px-8 items-center">
        <div class="max-w-sm mr-20">
          <div class="flex">
            <div class="relative w-full">
              <s-combo-box />
            </div>
          </div>

          <div></div>
        </div>

        <span class="ml-6">
          <s-select default-option="--Filter by Module--" :width="250" />
        </span>
        <span class="ml-6">
          <s-select default-option="--Filter by Status--" :width="250" />
        </span>
        <span class="ml-6">
          <s-select default-option="--Filter by Date--" :width="250" />
        </span>
      </div>
    </div>

    <div class="mt-5 bg-white" v-if="approversInProgress.length > 0">
      <table class="table min-w-full">
        <thead class="bg-gray-300">
          <tr>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Initiator
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
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(approval, index) in approversInProgress" :key="index">
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              <div class="bg-white flex">
                <img
                  :src="approval.image"
                  class="w-12 h-12 object-cover"
                  style="border-radius: 50%"
                />
                <div class="flex-1 ml-2 p-1">
                  <span class="text-black text-base block"
                    >{{ approval.name }},</span
                  >
                  <span
                    class="
                      text-gray-600
                      py-1
                      text-base
                      block
                      overflow-hidden overflow-ellipsis
                      whitespace-nowrap
                    "
                    >{{ approval.role }}</span
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
              {{ approval.date }}
            </td>
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              {{ approval.request }}
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
                >{{ approval.progress }}%</span
              >
              <span class="ml-4 text-gray-700 text-base">completed</span>
              <div class="my-2 block" style="width: 400px">
                <s-progress
                  :progress="approval.progress"
                  background-color="#ededed"
                  :color="
                    approval.progress <= 25
                      ? 'red'
                      : approval.progress > 25 && approval.progress <= 49
                      ? 'yellow'
                      : approval.progress >= 50 && approval.progress <= 69
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
                v-if="approval.status == 'approved'"
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
                v-else-if="approval.status == 'disapproved'"
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
                v-else-if="approval.status == 'inprogress'"
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
                In Progress
              </button>
              <button
                v-else-if="approval.status == 'notstarted'"
                class="
                  bg-gray-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-5
                  text-gray-600
                  font-semibold
                "
              >
                Not Started
              </button>
            </td>

            <td
              class="
                px-6
                py-3
                whitespace-no-wrap
                text-center
                border-solid border-gray-300 border-2
              "
            >
              <vs-dropdown vs-custom-content vs-trigger-click>
                <feather-icon
                  class="h-6 w-6"
                  icon="MoreHorizontalIcon"
                ></feather-icon>

                <vs-dropdown-menu>
                  <ul style="min-width: 15rem">
                    <li
                      @click="showProgress(approval)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                    >
                      <span class="ml-2">View Progress</span>
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
                    >
                      <span class="ml-2">Send Reminder</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
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
          >All approval show up here.</span
        >
        <span
          class="block text-center text-xl text-gray-600 leading-7 max-w-2xl"
        >
          This will be your list of past and current approvals.
        </span>
      </div>
    </div>

    <vs-popup :active.sync="progressModal" title="">
      <div class="overflow-auto" style="max-height: 90vh">
        <div
          v-for="(approver, index) in approversProgress"
          :key="index"
          class="bg-white py-6 my-1"
          style="border-bottom: 2px solid lightgrey"
        >
          <div
            class="py-5 px-5 flex"
            :style="`border-left:3px solid ${
              approver.status == 'pending'
                ? 'yellow'
                : approver.status == 'approved'
                ? 'green'
                : approver.status == 'disapproved'
                ? 'red'
                : 'grey'
            }`"
          >
            <img
              :src="approver.image"
              class="w-16 h-16 object-cover"
              style="border-radius: 50%"
            />
            <div class="flex-1 ml-2 p-1">
              <span class="text-black text-xl block">{{ approver.name }},</span>
              <span
                class="
                  text-gray-500
                  py-1
                  text-lg
                  block
                  overflow-hidden overflow-ellipsis
                  whitespace-nowrap
                "
                >{{ approver.role }}</span
              >
              <span class="block text-gray-600 text-lg leading-5">
                Comment:
                <span class="text-gray-800">{{
                  approver.status == "pending" ||
                  approver.status == "not-started"
                    ? "--No Comment--"
                    : approver.comment
                }}</span>
              </span>
            </div>
            <div class="flex items-center">
              <button
                v-if="approver.status == 'approved'"
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
                v-else-if="approver.status == 'disapproved'"
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
                v-else-if="approver.status == 'inprogress'"
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
                In Progress
              </button>
              <button
                v-else-if="approver.status == 'notstarted'"
                class="
                  bg-gray-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-5
                  text-gray-600
                  font-semibold
                "
              >
                Not Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import totalrequests from "@/assets/images/approvals/totreq.svg";
import approvedrequests from "@/assets/images/approvals/appreq.svg";
import openrequests from "@/assets/images/approvals/openreq.svg";
import disapprequests from "@/assets/images/approvals/disappreq.svg";
import empty from "@/assets/images/approvals/empty.svg";
import sProgress from "../../../components/scellooComponents/v1/sProgress.vue";
import { mapGetters } from "vuex";
export default {
  components: { sProgress },
  data() {
    return {
      totalrequests,
      approvedrequests,
      openrequests,
      disapprequests,
      empty,
      progressModal: false,
      approversInProgress: [
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Move contact from lead to sale ",
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
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    showProgress(val) {
      this.progressModal = true;
    },
  },
  watch: {},
  computed:{
      ...mapGetters("approval", ["getApprovalRequestDetails", "getApprovals"]),
  },
  mounted() {
    this.$store.dispatch("approval/getApprovalRequestDetails")
    this.$store.dispatch("approval/getApprovals")
  },
};
</script>

<style>
</style>