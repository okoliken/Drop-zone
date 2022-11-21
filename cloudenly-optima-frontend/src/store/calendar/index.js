import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const calendarUrl = {
  getAllMeetingUrl: "/crm/v1/schedule-meeting/all",
  getOneMeetingUrl: "/crm/v1/meetings/",
  createMeetingUrl: "/crm/v1/meetings",
  updateMeeting: "/crm/v1/schedule-meeting/update/",
  deleteMeeting: "/crm/v1/schedule-meeting/delete",
};

const state = {
  calendarEvents: [
    {
      id: 1,
      title: "event1",
      start: "2018-12-02",
      end: "2018-12-02",
      desc: "demo event",
      cssClass: "event-danger",
      label: "personal",
    },
  ],

  calendarEvent: {
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

  calendarLabels: [
    { text: "Business", value: "business", color: "cloudenly-success-main" },
    { text: "Work", value: "work", color: "cloudenly-warning-main" },
    { text: "Personal", value: "personal", color: "cloudenly-danger-main" },
  ],
};

const getters = {
  eventById: (state) => (eventId) => {
    return state.calendarEvents.filter((event) => event.id == eventId)[0];
  },
};

const mutations = {
  GET_MEETINGS(state, payload) {
    state.calendarEvents = payload;
  },

  SET_MEETING(state, payload) {
    state.calenderEvent = payload;
  },

  ADD_EVENT_TO_CALENDAR(state, event) {
    const length = state.calendarEvents.length;
    let lastIndex = 0;
    if (length) {
      lastIndex = state.calendarEvents[length - 1].id;
    }
    event.id = lastIndex + 1;
    const newEvent = Object.assign({}, event);
    state.calendarEvents.push(newEvent);
  },

  EDIT_CALENDAR_EVENT(state, event) {
    const eventIndex = state.calendarEvents.findIndex((e) => e.id == event.id);
    state.calendarEvents[eventIndex].title = event.title;
    state.calendarEvents[eventIndex].start = event.start;
    state.calendarEvents[eventIndex].end = event.end;
    state.calendarEvents[eventIndex].desc = event.desc;
    state.calendarEvents[eventIndex].cssClass = event.cssClass;
    state.calendarEvents[eventIndex].label = event.label;
  },

  REMOVE_CALENDAR_EVENT(state, eventId) {
    const eventIndex = state.calendarEvents.findIndex((e) => e.id == eventId);
    state.calendarEvents.splice(eventIndex, 1);
  },
};

const actions = {
  getMeeting({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${calendarUrl.getAllMeetingUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("GET_MEETINGS", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getOneMeeting({ commit, rootState }, payload) {
    try {
      const { data } = await axios.get(
        `${url}${calendarUrl.getOneMeetingUrl}${payload}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        }
      );
      console.log("---====>", data);
      commit("SET_MEETING", data);
    } catch (err) {
      console.log(err);
    }
  },

  createMeeting({ dispatch, rootState }, payload) {
    return new Promise((resolve, reject) => {
      console.log(calendarUrl.createMeetingUrl);
      axios
        .post(`${url}${calendarUrl.createMeetingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getMeeting");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  editCalendarEvent({ commit, dispatch, rootState }, payload) {
    commit("EDIT_CALENDAR_EVENT", payload);
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${calendarUrl.updateMeeting}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
          dispatch("getMeeting");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteCalanderEvent({ commit, dispatch, rootState }, payload) {
    commit("EDIT_CALENDAR_EVENT", payload);
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${calendarUrl.deleteMeeting}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getMeeting", payload);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  removeCalendarEvent({ commit }, eventId) {
    commit("REMOVE_CALENDAR_EVENT", eventId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
