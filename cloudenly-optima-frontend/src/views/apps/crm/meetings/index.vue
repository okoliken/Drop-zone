<template>
  <div style="font-size: 14px">
    <h1 class="mb-8">Meetings</h1>

    <div
      class="vs-con-loading__container bg-white px-6 pt-8 pb-10"
      id="div-with-loading"
    >
      <div class="grid grid-cols-12">
        <div class="col-span-7">
          <h2 class="pb-4 font-semibold" style="border-bottom: 2px solid #eee">
            {{ getCurrentDate }}
          </h2>

          <div class="mt-8 mb-6">Today’s Schedules</div>

          <div style="overflow-y: auto">
            <div
              v-if="getIsAccOwner || getMeetingPrivileges.viewMeetingSchedules"
              class="w-9/12 grid grid-cols-12 gap-8"
              style="max-height: 400px"
            >
              <div
                class="
                  col-span-6
                  flex flex-col
                  justify-center
                  px-5
                  rounded
                  cursor-pointer
                "
                style="
                  height: 70px;
                  border: 0.5px solid #6f8de9;
                  border-left: 4px solid;
                "
                v-for="(event, i) in calendarEvents"
                :key="i"
                @click="$router.push(`/community/meeting/${event.id}`)"
              >
                <div class="mb-4 text-xs">
                  {{ event.startTime }} - {{ event.endTime }}
                </div>
                <div>{{ event.title }}</div>
              </div>
            </div>

            <div v-else>
              <div>
                <s-privilege />
              </div>
            </div>
          </div>
        </div>

        <!-- section 2 -->
        <div class="col-span-5 pl-8">
          <calendar class="rounded" style="background: #f3f6f9" />

          <div
            class="mt-6 pt-5 mb-6 font-medium"
            style="border-top: 1px solid #eee"
          >
            Category
          </div>

          <div class="flex items-center justify-between w-8/12">
            <div
              class="flex items-center"
              v-for="(type, i) in meetingTypes"
              :key="i"
            >
              <div
                class="rounded-full mr-2"
                :style="`width: 10px; height: 10px; background: ${type.color};`"
              ></div>
              <div>{{ type.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <s-button
        v-if="getIsAccOwner || getMeetingPrivileges.createNewMeeting"
        class="px-8 bg-primary-optima-color text-white"
        @click="$router.push({ name: 'NewMeeting' })"
      >
        <feather-icon icon="PlusIcon" svgClasses="h-5 w-5 cursor-pointer" />

        <span class="ml-3">Schedule Meeting</span>
      </s-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import Datepicker from "vuejs-datepicker";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import Drawer from "@/views/components/Drawer/drawer";
import Calendar from "./components/calendar.vue";

export default {
  name: "Meeting",
  data() {
    return {
      type: ["product demo", "seminar", "workshop", "presentation", "others"],
      loading: false,
      disabledFrom: false,

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      scheduleMetingButton: false,
      attendances: [],
      contacts: [],
      meetingData: {
        contactIds: [],
        title: "",
        description: "",
        venue: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        comment: "",
        label: "",
      },

      activePromptAddEvent: false,
      activePromptEditEvent: false,
      usersId: [],
      meetingTypes: [
        { color: "#6F8DE9", name: "Business" },
        { color: "#4ECDC4", name: "Work" },
        { color: "#FF4F79", name: "Personal" },
      ],
    };
  },
  computed: {
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("userOutlet", ["getIsUserCreated", "getOptimaUsers"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getMeetingPrivileges"]),

    calendarEvents() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.myEvent = this.$store.state.calendar.calendarEvents.map((resp) => {
        return {
          id: resp.id,
          title: resp.title,
          start: resp.startDate,
          end: resp.endDate,
          desc: resp.description,
          label: resp.label,
          startTime: resp.startTime,
          endTime: resp.endTime,
          comment: resp.comment,
          contactIds: resp.contacts,
          venue: resp.venue,
          cssClass: "event-cloudenly-warning-main",
        };
      });
      return this.myEvent;
    },

    getCurrentDate() {
      return moment().format("dddd Do MMMM YYYY");
    },

    validForm() {
      return (
        this.meetingData.title != "" &&
        this.meetingData.startDate != "" &&
        this.meetingData.endDate != "" &&
        Date.parse(this.meetingData.endDate) -
          Date.parse(this.meetingData.startDate) >=
          0
      );
    },

    disabledDatesTo() {
      return {
        to: new Date(this.meetingData.startDate),
      };
    },

    // eslint-disable-next-line vue/return-in-computed-property
    disabledDatesFrom() {
      // return {
      //   from: new Date(this.end),
      // };
    },

    calendarLabels() {
      return this.$store.state.calendar.calendarLabels;
    },

    labelColor() {
      // 	return (label) => {
      // 	if (label == "business") return "cloudenly-success-main"
      // 	else if (label == "work") return "cloudenly-warning-main"
      // 	if (label == "personal") return "cloudenly-danger-main"
      // 	if (label == "none") return "cloudenly-primary-main"
      // }

      return (label) => {
        if (label == "business") return "success";
        else if (label == "work") return "warning";
        if (label == "personal") return "danger";
        if (label == "none") return "primary";
      };
    },
  },

  methods: {
    addMeeting(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.activePromptAddEvent = true;
          this.scheduleMetingButton = true;
          const userInfo = this.$store.state.auth.auth.authData;
          let meetingContact = this.contacts.concat(this.attendances);
          this.meetingData.meetingContacts = meetingContact.map((resp) => {
            return {
              contactId: resp.id,
              name: resp.name || `${resp.fname} ${resp.lname}`,
              email: resp.email,
              address: resp.address,
              phone: resp.phone,
            };
          });
          const data = {
            userInfo: userInfo,
            payload: this.meetingData,
          };

          this.$store
            .dispatch("calendar/createMeeting", data)
            .then((resp) => {
              console.log(resp);
              this.activePromptAddEvent = false;
              this.scheduleMetingButton = false;

              this.userEmail = [];
              (this.meetingData = {
                contactIds: [],
                title: "",
                description: "",
                venue: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                comment: "",
                label: "",
              }),
                this.$vs.notify({
                  title: "Meeting",
                  text: resp.data.message,
                  color: "success",
                  position: "top-right",
                });
            })
            .catch((err) => {
              console.log(err);
              this.scheduleMetingButton = false;
              this.userEmail = [];
              this.$vs.notify({
                title: "Meeting",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        } else {
          console.log("hello");
        }
      });
    },

    close() {
      this.activePromptAddEvent = false;
      this.activePromptEditEvent = false;
      this.clearFields();
    },

    clearFields() {
      this.title = this.end = this.desc = "";
      this.id = 0;
      this.labelLocal = "none";
      this.meetingData = {
        contactIds: [],
        title: "",
        description: "",
        venue: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        comment: "",
        label: "",
      };
    },

    addNewEventDialog(date) {
      this.clearFields();
      this.meetingData.startDate = date;
      this.meetingData.endDate = date;
      this.activePromptAddEvent = true;
    },

    openAddNewEvent(date) {
      console.log(date);
      this.meetingData = {
        contactIds: [],
        title: "",
        description: "",
        venue: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        comment: "",
        label: "",
      };
      this.addNewEventDialog(date);
    },

    promptAddNewEvent(date) {
      this.meetingData = {
        contactIds: [],
        title: "",
        description: "",
        venue: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        comment: "",
        label: "",
      };
      this.addNewEventDialog(date);
    },

    openEditEvent(event) {
      // console.log(event)
      const e = this.$store.getters["calendar/eventById"](event.id);
      console.log(e);
      this.meetingData = {
        id: e.id,
        contactIds: e.contactIds,
        title: e.title,
        description: e.description,
        venue: e.venue,
        startDate: e.startDate,
        endDate: e.endDate,
        startTime: e.startTime,
        endTime: e.endTime,
        comment: e.comment,
        label: e.label,
      };
      this.activePromptEditEvent = true;
    },

    editEvent() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.meetingData,
      };
      // const obj = { id: this.id, title: this.title, start: this.start, end: this.end, label: this.labelLocal, desc: this.desc }
      // obj.cssClass = "event-" + this.labelColor(this.labelLocal)
      this.$store
        .dispatch("calendar/editCalendarEvent", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Meeting",
            text: resp.data.message,
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Meeting",
            text: "Meeting Update Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    removeEvent() {
      this.$store.dispatch("calendar/removeCalendarEvent", this.id);
    },
  },

  components: {
    "full-calendar": require("vue-fullcalendar"),
    Datepicker,
    VuePerfectScrollbar,
    Drawer,
    Calendar,
  },

  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    await this.$store.dispatch("calendar/getMeeting");
    await this.$store.dispatch("crm/contact/getAllContact");
    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/calendar.scss";
</style>
