<template>
  <div style="font-size: 14px">
    <back
      :location="`${isMeetingEdit ? 'Edit Meeting' : 'Schedule New Meeting'}`"
      class="mb-8"
    />

    <div
      class="vs-con-loading__container bg-white px-6 pt-8 pb-10 rounded"
      id="div-with-loading"
    >
      <div class="flex items-center justify-between mb-12">
        <h2 class="font-semibold">New Meeting </h2>

        <feather-icon
          icon="AlertCircleIcon"
          svgClasses="mr-3 h-6 w-6 cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-12 col-gap-16 row-gap-12 gap-10">
        <s-select
          label="Meeting Type:"
          class="col-span-4"
          defaultOption="select an option"
          :options="types"
          v-model="meetingData.label"
        />

        <s-text label="Title:" class="col-span-4" v-model="meetingData.title" />

        <div class="col-span-4"></div>

        <s-text
          label="Start Date:"
          class="col-span-4"
          type="date"
          v-model="meetingData.startDate"
        />

        <s-text
          label="Start Time:"
          type="time"
          class="col-span-4"
          v-model="meetingData.startTime"
        />

        <div class="col-span-4"></div>

        <s-text
          label="End Date:"
          type="date"
          class="col-span-4"
          v-model="meetingData.endDate"
        />

        <s-text
          label="End Time:"
          type="time"
          class="col-span-4"
          v-model="meetingData.endTime"
        />

        <div class="col-span-4"></div>

        <s-select
          label="External Attendees:"
          :options="allContact"
          class="col-span-4"
          @change="addContacts($event)"
        />

        <div class="col-span-8"></div>

        <!-- chipbox -->
        <div class="col-span-12 grid grid-cols-12 gap-8" v-if="contacts.length">
          <div
            class="
              col-span-3
              rounded
              py-3
              px-4
              capitalize
              flex
              items-center
              justify-between
            "
            v-for="(contact, i) in contacts"
            :key="i"
            style="background: #eee"
          >
            <span>
              {{ contact.name }}
              <!-- {{ contact.id }} -->
            </span>

            <feather-icon
              icon="XIcon"
              svgClasses="h-5 w-5 cursor-pointer"
              @click="removeItem(i, 'contacts')"
            />
          </div>
        </div>

        <s-select
          label="Internal Attendees:"
          :options="getOptimaUsers"
          select-key="fname"
          class="col-span-4"
          @change="addAttendances($event)"
        />

        <div class="col-span-8"></div>

        <!-- chipbox -->
        <div
          class="col-span-12 grid grid-cols-12 gap-8"
          v-if="attendances.length"
        >
          <div
            class="
              col-span-3
              flex
              items-center
              justify-between
              px-4
              py-2
              rounded
            "
            style="background: #eee"
            v-for="(attendance, i) in attendances"
            :key="i"
          >
            <span> {{ attendance.fname }} {{ attendance.lname }} </span>

            <feather-icon
              icon="XIcon"
              svgClasses="h-5 w-5 cursor-pointer"
              @click="removeItem(i, 'attendances')"
            />
          </div>
        </div>

        <s-text label="Venue:" class="col-span-4" v-model="meetingData.venue" />

        <s-text
          label="Agenda:"
          class="col-span-4"
          v-model="meetingData.description"
        />

        <s-text
          label="Comment:"
          class="col-span-4"
          v-model="meetingData.comment"
        />

        <!-- seperator -->
        <s-content-seperator class="mb-10 mt-2" />
      </div>

      <div class="flex justify-between">
        <s-button
          class="
            px-8
            bg-light-optima-color
            text-primary-optima-color
            font-medium
          "
          @click="$router.back()"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="submitting"
          @click="handleMeeting"
        >
          Save
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Back from "@/components/Back.vue";
import _ from "lodash";

export default {
  name: "Meeting",
  components: { Back },
  data() {
    return {
      submitting: false,
      types: ["product demo", "seminar", "workshop", "presentation", "others"],
      attendances: [],
      contacts: [],
      meetingData: {
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
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getOptimaUsers"]),
    ...mapGetters("crm/contact", ["allContact", "contact"]),
    isMeetingSchedule() {
      return this.$route.query.type === "schedule";
    },
    isMeetingEdit() {
      return this.$route.query.type === "edit";
    },
  },
  methods: {

    handleMeeting() {
      if (this.isMeetingEdit) {
        this.updateMeeting();
      } else {
        this.addMeeting();
      }
    },

    async addMeeting() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;
        const meetingContact = this.contacts.concat(this.attendances);
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

        this.submitting = true;

        const resp = await this.$store.dispatch("calendar/createMeeting", data);

        this.submitting = false;

        this.$vs.notify({
          title: "Meeting",
          text: resp.data.message,
          color: "primary",
          position: "top-right",
        });

        this.$router.push({ name: "Meeting" });
      } catch (err) {
        console.log(Error);
        this.submitting = false;

        this.$vs.notify({
          title: "Meeting",
          text: err.response.data.message || "Meeting Fail",
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateMeeting() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const data = {
          userInfo: userInfo,
          payload: this.meetingData,
        };

        this.submitting = true;

        await this.$store.dispatch("calendar/editCalendarEvent", data);

        this.submitting = false;

        this.$vs.notify({
          title: "Meeting",
          // eslint-disable-next-line no-undef
          text: resp.data.message || "Meeting updated successfully",
          color: "success",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        this.$vs.notify({
          title: "Meeting",
          text: err.response.data.message || "Please fill all fields properly",
          color: "danger",
          position: "top-right",
        });
      }
    },
    isDuplicate(id, array) {
      return array.find((item) => item.id === id);
    },
    // eslint-disable-next-line no-unused-vars
    addAttendances(id, array) {
      if (!id || this.isDuplicate(id, this.attendances)) {
        alert("another person please");
      } else {
        const result = this.getOptimaUsers.find((item) => item.id === id);
        this.attendances.push(result);
      }
    },
    addContacts(id) {
      if (this.isDuplicate(id, this.contacts)) {
        alert("another person please");
      } else {
        const result = this.allContact.find((item) => item.id === id);
        this.contacts.push(result);
      }
    },
    removeItem(index, array) {
      this[array] = this[array].filter((_, i) => i !== index);
    },
    resetMeeting() {
      this.meetingData = {
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
  },
  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    await this.$store.dispatch("crm/contact/getAllContact");

    await this.$store.dispatch("crm/contact/allContact");

    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");

    if (this.isMeetingEdit) {
      await this.$store.dispatch(
        "calendar/getOneMeeting",
        this.$route.query.id
      );

      this.meetingData = _.cloneDeep(this.$store.state.calendar.calendarEvent);
    } else if (this.isMeetingSchedule) {
      const idList = this.$route.query.id.split(",");
      idList.forEach((id) => {
        this.contact.forEach((item) => {
          if (item.id === id) {
            this.contacts.push(item);
          }
        });
        // console.log(this.contacts)
      });
    }

    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>
