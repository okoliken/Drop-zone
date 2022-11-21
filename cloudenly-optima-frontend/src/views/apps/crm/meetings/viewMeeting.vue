<template>
  <div style="font-size: 14px;">
    <back location="View and Edit Meeting" class="mb-8" />

    <div
      class="vs-con-loading__container bg-white px-6 pt-8 pb-10 rounded"
      id="div-with-loading"
    >
      <div class="flex items-center justify-between mb-12">
        <h2 class="font-semibold">View Scheduled Meeting</h2>

        <feather-icon
          icon="AlertCircleIcon"
          svgClasses="mr-3 h-6 w-6 cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-12 row-gap-12 gap-10">
        <div class="col-span-2 font-medium">Meeting Type:</div>
        <div class="col-span-3">{{ calendarEvent && calendarEvent.label }}</div>
        <div class="col-span-7">
          <span>Title:</span>
          <span class="ml-5 capitalize">{{ calendarEvent.title }}</span>
        </div>
        <div class="col-span-2">Meeting Starts:</div>
        <div class="col-span-10">
          {{ calendarEvent.startDate }}, {{ calendarEvent.startTime }}
        </div>
        <div class="col-span-2">Meeting Ends:</div>
        <div class="col-span-10">
          {{ calendarEvent.endDate }},
          {{ calendarEvent.endTime }}
        </div>
        <div class="col-span-2">Attendees:</div>
        <div class="col-span-10 grid grid-cols-12 gap-6">
          <div
            class="col-span-3 rounded py-2 px-4"
            style="background: #eee;"
            v-for="(attendee, i) in calendarEvent.meetingContacts"
            :key="i"
          >
            {{ attendee.name }}
          </div>
        </div>
        <div class="col-span-2">Venue:</div>
        <div class="col-span-10">{{ calendarEvent.venue }}</div>
        <div class="col-span-2">Agenda:</div>
        <div class="col-span-10">{{ calendarEvent.description }}</div>
        <div class="col-span-2">Comments:</div>
        <div class="col-span-10">{{ calendarEvent.comment }}</div>
      </div>

      <s-content-seperator class="mt-24 mb-10" />

      <!-- <button
        class="px-10 py-4 font-medium bg-primary-optima-color text-white"
        style="border-radius: 50px;"
        @click="
          $router.push(
            `/community/meeting/new/?type=edit&id=${$route.params.id}`
          )
        "
      >
        Edit This Schedule
      </button> -->

      <s-button
        class="px-8 bg-primary-optima-color text-white"
        @click="$router.back()"
      >
        Back
      </s-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Back from "@/components/Back.vue";
import moment from "moment";

export default {
  name: "ViewMeeting",
  components: { Back },
  computed: {
    ...mapState({ calendarEvent: (state) => state.calendar.calendarEvent }),
    $MOMENT() {
      return moment;
    },
  },
  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    await this.$store.dispatch("calendar/getOneMeeting", this.$route.params.id);
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>
