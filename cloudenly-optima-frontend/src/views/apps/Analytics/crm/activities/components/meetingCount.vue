<template>
  <div class="bg-white p-6 rounded">

    <div class="mb-12">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex mb-2">
            <h2 class="font-semibold">Meetings</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <div style="font-size: 13px">Meeting Count</div>
        </div>

        <div>
          <p class=" text-gray-500">Showing Last 6 Months</p>
        </div>
      </div>
    </div>

    <div class=" flex justify-end mb-3"> 
     <p class=" text-primary-optima-color">All Contacts</p>
    </div>

    <bar-chart cla ss="mb-12" />

    <div class="flex items-center">
      <div class="flex flex-col">
        <span class="mb-2" style="font-size: 13px">All</span>
        <span
          class="text-primary-optima-color font-semibold"
          style="font-size: 16px"
          >{{getAllCrmActivityCount.meetings.meetingCount}}</span
        >
      </div>

      <div class="flex flex-col ml-10">
        <span class="mb-2" style="font-size: 13px">Ended</span>
        <span
          class="text-secondary-optima-color font-semibold"
          style="font-size: 16px"
          >{{getAllCrmActivityCount.meetings.endedMeetingCount}}</span
        >
      </div>

      <div class="flex flex-col ml-10">
        <span class="mb-2" style="font-size: 13px">Pending</span>

        <div class="flex items-end font-semibold" style="font-size: 16px">
          <span>{{getAllCrmActivityCount.meetings.pendingMeetingCount}}</span>

          <span class="font-normal ml-2" style="font-size: 13px"
            >Axxar, Peter Ekong + 3 Others</span
          >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import barChart from "../svgFolder/barChart.vue";

export default {
  components: { barChart },
    computed:{
      ...mapGetters("analytics", ["getAllCrmActivityCount", "getAllCrmActivityTotalPendingTransactionCount"]),
  },
  mounted() {
    this.$store.dispatch("analytics/getAllCrmActivityCount","analytics/getAllCrmActivityTotalPendingTransactionCount" )},
    // this.$store.dispatch("analytics/getAllCrmActivityTotalPendingTransactionCount")}
};

</script>

<style></style>
