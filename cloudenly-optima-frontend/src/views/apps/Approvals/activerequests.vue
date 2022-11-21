<template>
  <div>
    <div class="bg-white p-10 rounded-md">
      <div class="max-w-sm mr-20">
        <div class="flex">
          <div >
            <s-combo-box />
          </div>
         <div class="ml-6">
            <select name="" id="select" class="select" @change="selectedRequest($event)">
            <option value="inprogress">In Progress</option>
            <option value="queue">My Queue</option>
            <option value="ongoing">Pending</option>
          </select>
         </div>
        </div>
      </div>
    </div>
    <div>
      <table class="table min-w-full mt-3">
        <thead class="bg-gray-300">
          <tr>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Initiator Name
            </th>
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
              Approval Progress
            </th> 
            <th
              class="py-4 px-8 tracking-wider text-base text-dark-optima-color"
            >
              Status
            </th>
            <th
              class="py-4 px-8 tracking-wider text-base text-dark-optima-color"
            >
              View
            </th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(approval, index) in getApproval" :key="index">
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              <div class="flex">
               
                

                <div class="flex-1 ml-2 p-1">
                  <span class="text-black text-base block"
                    ></span
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
                    >{{approval.fname}} {{approval.lname}}</span
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
              {{approval.requestName}}
            </td>
            <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
              "
            >
              {{approval.requests.updatedAt}}
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
                >{{ approval.requests.approvalPercentage }}%</span
              >
              <span class="ml-4 text-gray-700 text-base">completed</span>
              <div class="my-2 block" style="width: 400px">
                <s-progress
                  :progress="approval.requests.approvalPercentage"
                  background-color="#ededed"
                  :color="
                    approval.requests.approvalPercentage <= 25
                      ? 'red'
                      : approval.requests.approvalPercentage > 25 && approval.requests.approvalPercentage <= 49
                      ? 'yellow'
                      : approval.requests.approvalPercentage >= 50 && approval.requests.approvalPercentage <= 69
                      ? 'gold'
                      : 'green'
                  "
                  :height="8"
                />
              </div>
              <span class="text-gray-600 text-base"
                >{{ approval.requests.approversLeft }} approvers left</span
              >
            </td> 
             <td
              class="
                px-6
                whitespace-no-wrap
                border-solid border-gray-300 border-2
                
              "
            >
            <div class=" bg-yellow-200
                text-xl
                rounded-md
                mx-2
                p-3
                textcenter
                px-3
                text-yellow-600
                font-semibold
              "> {{approval.requests.status}}</div>
             
            </td>
            
            <td
              class="
                px-6
                py-3
                whitespace-no-wrap
                border-solid border-gray-300 border-2">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" @click="viewRequest(approval.requests.id)" class="svg">

              <rect y="0.5" width="24" height="24" rx="4" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3332 12.5C15.3332 14.3409 13.8408 15.8333 11.9999 15.8333C10.1589 15.8333 8.66657 14.3409 8.66657 12.5C8.66657 10.6591 10.1589 9.16667 11.9999 9.16667C13.8408 9.16667 15.3332 10.6591 15.3332 12.5ZM13.6666 12.5C13.6666 13.4205 12.9204 14.1667 11.9999 14.1667C11.0794 14.1667 10.3332 13.4205 10.3332 12.5C10.3332 11.5795 11.0794 10.8333 11.9999 10.8333C12.9204 10.8333 13.6666 11.5795 13.6666 12.5Z" fill="#507FDF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 5C16.6595 5 20.5747 8.18693 21.6849 12.5C20.5747 16.8131 16.6595 20 11.9999 20C7.3403 20 3.42505 16.8131 2.31494 12.5C3.42505 8.18693 7.3403 5 11.9999 5ZM11.9999 18.3333C8.27026 18.3333 5.10933 15.8818 4.04759 12.5C5.10933 9.11822 8.27026 6.66667 11.9999 6.66667C15.7295 6.66667 18.8905 9.11822 19.9522 12.5C18.8905 15.8818 15.7295 18.3333 11.9999 18.3333Z" fill="#507FDF"/>
            </svg>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
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
     <div v-if="getApproval= 'No Approval In Progress'" class="bg-white p-32 flex rounded-md items-center">
      <div class="m-auto">
        <img class="m-auto block" :src="empty" />
        <span class="text-black font-bold text-xl block my-5 text-center"
          >There are no approval  to you at the moment</span
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
  <!-- </div> -->
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
      value : 'inprogress',
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

    selectedRequest(e){
      let selected = e.target.value;  
      this.selected = e.target.value
      console.log(selected);
      console.log(this.selected);
      this.$store.dispatch("approval/getApprovals", this.selected);
    },
    viewRequest(val) {
      this.id = val;
      // console.log(val)
      this.$router.push({
        name: "ViewApprovalRequest",
        params: {
          id: val, //val.id ??
        },
      });
    },
    
    },

    
  
  computed: {
    ...mapGetters("approval", [ "getApprovals"
      
    ]),

    currentTabComponent() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/,/g, "");
    },
    getApproval() {
      return this.getApprovals.approvals;
    },
  },
  mounted() {
  
  //  this.$store.dispatch("approval/getApprovals", 'inprogress');
    }
    

};
</script>
<style scoped>
.svg {
  cursor: pointer;
}
.select{
  border: 1px solid #9BA0A7;
  height: 35px;
  width: 346px;
  border-radius: 3px;
}
</style>