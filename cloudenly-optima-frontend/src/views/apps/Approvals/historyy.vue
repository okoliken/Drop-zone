<template>
  <div>
    <div class=" bg-white p-10 rounded-md">
      <div class="max-w-sm mr-20">
        <div class="flex">
          <div class="relative w-full">
            <s-combo-box />
          </div>
        </div>
      </div>
    </div>
    <div >
      <table class="table min-w-full mt-3">
      <thead class="bg-gray-300">
        <tr>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Initiator
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Date submitted
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Requests
          </th>

          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Approval Progress
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Status
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.61111 0.888916C5.06076 0.888916 6.27884 1.88041 6.62421 3.22225H12.9444V4.7778H6.62421C6.27884 6.11965 5.06076 7.11114 3.61111 7.11114C1.89289 7.11114 0.5 5.71825 0.5 4.00003C0.5 2.28181 1.89289 0.888916 3.61111 0.888916ZM3.61111 5.55558C4.47022 5.55558 5.16667 4.85914 5.16667 4.00003C5.16667 3.14092 4.47022 2.44447 3.61111 2.44447C2.752 2.44447 2.05556 3.14092 2.05556 4.00003C2.05556 4.85914 2.752 5.55558 3.61111 5.55558Z"
                fill="#7B858F"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.3889 14.1111C9.93924 14.1111 8.72116 13.1196 8.37579 11.7778H2.05556V10.2222H8.37579C8.72116 8.88041 9.93924 7.88892 11.3889 7.88892C13.1071 7.88892 14.5 9.28181 14.5 11C14.5 12.7182 13.1071 14.1111 11.3889 14.1111ZM11.3889 12.5556C12.248 12.5556 12.9444 11.8591 12.9444 11C12.9444 10.1409 12.248 9.44447 11.3889 9.44447C10.5298 9.44447 9.83333 10.1409 9.83333 11C9.83333 11.8591 10.5298 12.5556 11.3889 12.5556Z"
                fill="#7B858F"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(approval, index) in getHistory" :key="index">
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
                <!-- <span class="text-black text-base block"
                  >{{ approval.requestName }},</span
                > -->
                <!-- <span
                  class="
                      text-gray-600
                      py-1
                      text-base
                      block
                      overflow-hidden overflow-ellipsis
                      whitespace-nowrap
                    "
                  >{{ approval.role }}</span
                > -->
              </div>
            </div>
          </td>
          <!-- <td
            class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
          >
            Date
          </td>
          <td
            class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
          >
            {{ approval.date }}
          </td> -->
          <td
            class="
                pl-6
                py-5
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
          >
            <span class="font-bold text-lg text-black"
              >{{ approval.status }}%</span
            >
            <span class="ml-4 text-gray-700 text-base">completed</span>
            <div class="my-2 block" style="width: 400px">
              <s-progress
                :progress="approval.status"
                background-color="#ededed"
                :color="
                  approval.status == Dissapproved
                    ? 'red'
                    : approval.status == Pending
                    ? 'yellow'
                    : approval.status == Approved
                    ? 'green'
                    : 'green'
                "
                :height="8"
              />
            </div>
            <!-- <span class="text-gray-600 text-base"
              >{{ approval.approversLeft }} approvers left</span
            > -->
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
              class="
                  bg-gray-200
                  text-xl
                  rounded-md
                  mx-2
                  p-3
                  px-5
                  text-black-600
                  font-semibold
                "
            >
              Respond
            </button>
          </td>
          <td
            class="
                px-6
                py-3
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
          >
            <svg
            @click="showProgress"
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3332 7.5C13.3332 9.34095 11.8408 10.8333 9.9999 10.8333C8.15895 10.8333 6.66657 9.34095 6.66657 7.5C6.66657 5.65905 8.15895 4.16667 9.9999 4.16667C11.8408 4.16667 13.3332 5.65905 13.3332 7.5ZM11.6666 7.5C11.6666 8.42047 10.9204 9.16667 9.9999 9.16667C9.07942 9.16667 8.33323 8.42047 8.33323 7.5C8.33323 6.57953 9.07942 5.83333 9.9999 5.83333C10.9204 5.83333 11.6666 6.57953 11.6666 7.5Z"
                fill="#507FDF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.9999 0C14.6595 0 18.5747 3.18693 19.6849 7.5C18.5747 11.8131 14.6595 15 9.9999 15C5.3403 15 1.42505 11.8131 0.314941 7.5C1.42505 3.18693 5.3403 0 9.9999 0ZM9.9999 13.3333C6.27026 13.3333 3.10933 10.8818 2.04759 7.5C3.10933 4.11822 6.27026 1.66667 9.9999 1.66667C13.7295 1.66667 16.8905 4.11822 17.9522 7.5C16.8905 10.8818 13.7295 13.3333 9.9999 13.3333Z"
                fill="#507FDF"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
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
    </div> -->
    </div>
    <div v-if="getHistory.length < 1" class="bg-white p-32 flex rounded-md items-center">
      <div class="m-auto">
        <img class="m-auto block" :src="empty" />
        <span class="text-black font-bold text-xl block my-5 text-center"
          >There are no approval history to you at the moment</span
        >
        <span
          class="block text-center text-xl text-gray-600 max-w-2xl leading-7"
        >
          When an employee initiates an action or submits a form/document that
          requires your approval, they show up here.
        </span>
      </div>
    </div>
    
  </div>

</template>
<script>
import totalrequests from "@/assets/images/approvals/totreq.svg";
import approvedrequests from "@/assets/images/approvals/appreq.svg";
import openrequests from "@/assets/images/approvals/openreq.svg";
import disapprequests from "@/assets/images/approvals/disappreq.svg";
import empty from "@/assets/images/approvals/empty.svg";
import sProgress from "../../../components/scellooComponents/v1/sProgress.vue";
import history from "./historyy";
import activerequests from "./activerequests";
import { mapGetters } from "vuex";

export default {
  components: { sProgress, history, activerequests },
  data() {
    return {
      message: '',
      tabs: ["Active Requests", "History"],
      currentTab: "Active Requests",
      totalrequests,
      approvedrequests,
      openrequests,
      disapprequests,
      empty,
      progressModal: false,

      Requests: {
        total: 16,
        approved: 10,
        open: 4,
        disapproved: 2,
      },
      approversInProgress: [
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Move contact from lead to sale ",
          approversLeft: 5,
          progress: 0,
          date: "2 min ago",
        },
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Purchase Requisition, #PR3360 ",
          approversLeft: 4,
          progress: 11,
          date: "2 hours ago",
        },
        {
          name: "Eniola Janet",
          image: totalrequests,
          role: " Sales Officer",
          request: "Sales Invoice, #INV0909",
          approversLeft: 2,
          progress: 53,
          date: "4 hours ago",
        },
        {
          name: "Daniel Arubuike",
          image: totalrequests,
          role: "Purchase Officer",
          request: "Purchase Order, #PO1270",
          approversLeft: 2,
          progress: 76,
          date: "Yesterday",
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
          status: "pending",
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

    // eslint-disable-next-line no-unused-vars
    viewProgress(val) {
      this.$router.push({
        name: "ViewApprovalInProgressRequest",
        params: {
          id: "4242", //val.id ??
        },
      });
    },
  },
  watch: {
    getHistory() {
      return this.getHistory.approvals;
    },
  },
  computed: {
    ...mapGetters("approval", [ "getHistory"]),
    currentTabComponent() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/,/g, "");
    },
    
  },
  mounted() {
    // this.$store.dispatch("approval/getApprovalRequestDetails");
    // this.$store.dispatch("approval/getApprovals");
    this.$store.dispatch("approval/getHistory");
  },
};
</script>
