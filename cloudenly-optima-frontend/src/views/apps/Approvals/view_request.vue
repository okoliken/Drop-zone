<template>
  <div>
    <div class="flex py-5 px-3">
      <back class="" />
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-1">Approvals</span>
        .../Requests/ View Request
      </div>
    </div>

    <div class="bg-white p-5 rounded-md">
      <div class="w-auto inline-block bg-grey-lighter rounded-md p-5 my-5">
        <span class="font-bold text-gray-600 text-lg">Requests : </span>
        <span class="mr-56 text-black font-bold text-lg"
          >Move contact from lead to sales</span
        >
      </div>

      <div class="grid grid-cols-3">
        <div class="">
          <div class="py-5 my-3 flex items-center">
            <img
              :src="approver.image"
              class="w-24 h-24 object-cover"
              style="border-radius: 50%"
            />
            <div class="flex-1 ml-2 p-1">
              <span
                class="
                  text-gray-600
                  py-1
                  text-lg
                  block
                  overflow-hidden overflow-ellipsis
                  whitespace-nowrap
                "
                >Submitted By :</span
              >
              <span class="text-black text-xl"
                > .,</span
              >
              <span class="pl-1 text-blue-600 text-xl">.
              
              </span>
            </div>
          </div>

          <span
            class="
              text-gray-500
              mt-8
              mb-5
              py-2
              text-lg
              block
              overflow-hidden overflow-ellipsis
              whitespace-nowrap
            "
            >Date Submitted:

            <span class="ml-4 font-bold text-black">.</span>
          </span>
        </div>
        <div class="flex items-center">
          <button
            class="
              whitespace-nowrap
              py-4
              px-8
              font-semibold
              text-xl text-gray-600
              bg-grey-lighter
              rounded-md
            "
          >
            <img
              :src="msg"
              class="mx-2 inline-block w-auto h-5"
              alt=""
              srcset=""
            />
            Send Message
          </button>
        </div>

        <div class="">
          <span class="font-bold text-2xl text-black"
            >{{ approver.progress }}%</span
          >
          <span class="ml-4 text-gray-700 text-xl">completed</span>
          <div class="my-2 block" style="width: 400px">
            <s-progress
              :progress="approver.progress"
              background-color="#ededed"
              :color="
                approver.progress <= 25
                  ? 'red'
                  : approver.progress > 25 && approver.progress <= 49
                  ? 'yellow'
                  : approver.progress >= 50 && approver.progress <= 69
                  ? 'gold'
                  : 'green'
              "
              :height="13"
            />
          </div>
          <span class="text-gray-600 text-lg"
            >. </span
          >
        </div>
      </div>

      <div
        class="p-8 my-5 mx-auto relative"
        style="
          border-width: 1px 0px 1px 0px;
          border-style: solid;
          border-color: lightgrey;
        "
      >
        <span
          class="
            text-blue-600
            absolute
            bg-white
            p-3
            font-bold
            text-xl
            leading-7
          "
          style="top: -22px"
          >Contact details</span
        >
        <div class="mt-3">
          <div class="p-5 flex">
            <img
              :src="approver.image"
              class="w-32 h-32 object-cover"
              style="border-radius: 50%"
            />
            <div class="flex-1 ml-4">
              <div class="flex">
                <ul class="text-gray-600 text-lg font-semibold list-none">
                  <li class="py-3">Name:</li>
                  <li class="py-3">Date Added:</li>
                  <li class="py-3">Email:</li>
                  <li class="py-3">Phone:</li>
                </ul>
                <div class="ml-6">
                  <ul class="text-black text-lg font-semibold list-none">
                    <li class="py-3">Paulinus Akanji</li>
                    <li class="py-3">19 -05 -2020</li>
                    <li class="py-3">paulinus.akanji@gmail.com</li>
                    <li class="py-3">09055809495</li>
                  </ul>
                </div>
              </div>
              <button
                class="
                  whitespace-nowrap
                  py-4
                  px-8
                  mt-3
                  font-semibold
                  text-lg
                  bg-blue-100
                  text-blue-600
                  rounded-md
                "
              >
                Go to Contact’s Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 p-5">
        <div class="">
          <span class="block py-2 text-lg">Comment</span>
          <textarea
            class="field field--textarea mt-3 px-4 py-3"
            v-model="approverData.comment"
          />
        </div>
        <div class="flex items-end">
          <div class="w-full">
            <s-button
              @click="approve"
              class="
                bg-primary-optima-color
                py-2
                block
                float-right
                px-8
                text-xl text-white
              "
            >
              Approve
            </s-button>

            <s-button
              @click="disapprove"
              class="
                bg-red-600
                block
                py-2
                float-right
                px-8
                text-xl
                mr-16
                text-white
              "
            >
              Disapprove
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import totalrequests from "@/assets/images/approvals/totreq.svg";
import msg from "@/assets/images/approvals/msg.svg";
import sProgress from "../../../components/scellooComponents/v1/sProgress.vue";
export default {
  components: { sProgress },
  data() {
    return {
      totalrequests,
      msg,
      approver: {
        image: totalrequests,
        name: "Daniel Otis",
        role: "Sales and Marketing Manager",
        comment: "Heavy is the head that wears the crown",
        status: "approved",
        approversLeft: 2,
        progress: 5,
        date: "07 - 04 - 2020",
      },
      approverData: {
        requestId: "",
        hasApproved: "",
        sequenceOrder: "",
        sequenceNo: "",
        comment: "",
      },
    };
  },

  methods: {
    async approve() {
      try {
        this.loading = true;

        let payload = {
          requestId: this.requestId,
          hasApproved: true,
          sequenceOrder: "c6f17025-a2e6-46fc-a0ca-d1728cbd543a",
          sequenceNo: 1,
          comment: this.approverData.comment,
        };
        console.log("i got payload", payload);
        const { data } = await this.$store.dispatch(
          "approval/approveRequest",
          payload
        );
        console.log("helloguys", data);
        this.$vs.notify({
          title: "View Approval Requestt",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
        this.loading = false;
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$vs.notify({
          title: "View Approval Request",
          text: err,
          color: "danger",
          position: "top-right",
        });
      }
    },
    async disapprove() {
      try {
        this.loading = true;

        let payload = {
          requestId: this.requestId,
          hasApproved: false,
          sequenceOrder: "c6f17025-a2e6-46fc-a0ca-d1728cbd543a",
          sequenceNo: 4,
          comment: this.approverData.comment,
        };
        console.log("i got payload", payload);
        const { data } = await this.$store.dispatch(
          "approval/disapproveRequest",
          payload
        );
        console.log("helloguys", data);
        this.$vs.notify({
          title: "View Approval Requestt",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
        this.loading = false;
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$vs.notify({
          title: "View Approval Request",
          text: err,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("approval", ["getMyApprovalRequest"]),
    
  },
  mounted() {
    
    this.requestId = this.$route.params.id;
    this.$store.dispatch("approval/getMyApprovalRequest", this.requestId );
    
  
    console.log("request Id", this.requestId);
  },
};
</script>

<style>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 60px;
  width: 100%;
  outline-style: none;
  max-width: 500px;
}
</style>
