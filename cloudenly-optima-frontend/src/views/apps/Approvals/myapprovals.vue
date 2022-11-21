<template>
  <div>
    <div class="flex py-5 px-3">
      <back class="" />
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-1">Approvals</span>
        .../my Approvals
      </div>
    </div>

    <div class="grid grid-cols-4 bg-white rounded-md p-8 gap-3">
      <div
        class="p-3 flex items-center"
        style="border-right: 2px solid lightgrey"
      >
        <img class="w-16 h-16" :src="totalrequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">
            .
          </span>
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
          <span class="font-bold text-2xl block text-black pb-1">.</span>
          <span class="font-semibold text-xl text-black block"
            >Open Requests</span
          >
        </div>
      </div>
      <div class="p-3 flex items-center">
        <img class="w-16 h-16" :src="disapprequests" />
        <div class="flex-1 mx-3 items-center">
          <span class="font-bold text-2xl block text-black pb-1">.</span>
          <span class="font-semibold text-xl text-black block"
            >Disapproved Requests</span
          >
        </div>
      </div>
    </div>
    <div class="col-span-12 mt-5">
      <s-tabs
        :tabs="tabs"
        :activeTab="currentTab"
        @currentTab="currentTab = $event"
      />

      <component v-bind:is="currentTabComponent" />
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
import  history from "./historyy";
import activerequests from "./activerequests";
import { mapGetters } from "vuex";

export default {
  components: { sProgress, activerequests, history},
  data() {
    return {
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
    // showProgress(val) {
    //   this.progressModal = true;
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
  watch: {},
  computed: {
    ...mapGetters("approval", []),
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
  },
};
</script>

<style>
</style>