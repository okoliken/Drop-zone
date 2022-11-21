/* eslint-disable no-unused-vars */
import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const calendarUrl = {
  getAllMeetingUrl: "/crm/v1/meetings/organization/",
  getOneMeetingUrl: "/crm/v1/meetings/",
  createMeeting: "/crm/v1/meetings ",
  updateMeeting: "/crm/v1/schedule-meeting/update/",
  deleteMeeting: "/crm/v1/schedule-meeting/delete",
};

export default {
  getMeeting({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${calendarUrl.getAllMeetingUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
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
      // console.log("---====>", data);
      commit("SET_MEETING", data);
    } catch (err) {
      console.log(err);
    }
  },

  createMeeting({ dispatch, rootState }, payload) {
    console.log(payload, "state");
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${calendarUrl.createMeeting}`, payload, {
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
          reject(err);
        });
    });
  },

  editCalendarEvent({ commit, dispatch, rootState }, payload) {
    // commit("EDIT_CALENDAR_EVENT", payload);
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
          dispatch("getMeeting");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
