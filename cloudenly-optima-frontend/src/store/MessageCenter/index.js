import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const measegeCenterUrl = {
  createMessageUrl: "/crm/v1/message/create",
  getMessageUrl: "/crm/v1/message/all/",
  getMessageIdUrl: "/crm/v1/message/one/",
  updateMessageUrl: "/crm/v1/message/update/",
  processMessageUrl: "/crm/v1/message/process",
  getReceiveMessageUrl: "/crm/v1/message/received/all/",
  getRecieveMessageIdUrl: "/crm/v1/message/received/one/",
  deleteMessageUrl: "/crm/v1/message/delete",
  deleteRecieveMessageUrl: "/crm/v1/message/received/delete",
  getMessageReqApprovalUrl: "/crm/v1/message/message-requiring-my-approval/",
};

const state = {
  loading: false,
  error: false,
  messages: [],
  recieveMessage: [],
  getreqAppMessage: [],
  trashMessages: [],
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  allMessages: (state) => state.messages,
  allRecieveMessage: (state) => state.recieveMessage,
  allReqAppMessage: (state) => state.getreqAppMessage,
  getTrashMessages: (state) => state.trashMessages,
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_allMessage: (state, payload) => {
    state.messages = payload;
  },

  mutate_recieveMessage: (state, payload) => {
    state.recieveMessage = payload;
  },

  mutate_reqApppMessage: (state, payload) => {
    state.getreqAppMessage = payload;
  },
  getErrorMessage: (state, payload) => {
    state.error = payload;
  },

  mutate_trashMessage: (state, payload) => {
    state.trashMessages = payload;
  },
};

const actions = {
  // draft a message
  createMessage: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${measegeCenterUrl.createMessageUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // draft and sent messages
  getAllMessage: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${measegeCenterUrl.getMessageUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_allMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          // commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getMessageById: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(`${url}${measegeCenterUrl.getMessageIdUrl}${payload.id}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          //    commit("mutate_allMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          // commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  updateMessage: ({ dispatch, rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${measegeCenterUrl.updateMessageUrl}${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // process message
  processMessage: ({ dispatch, rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${measegeCenterUrl.processMessageUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // inbox message
  getReceivedMessage: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${measegeCenterUrl.getReceiveMessageUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data);
          commit("mutate_recieveMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          // commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getRecieveMessageById: ({ dispatch, rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(`${url}${measegeCenterUrl.getRecieveMessageIdUrl}${payload.id}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getReceivedMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // delete sent message message
  deleteMessage: ({ dispatch, commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(`${url}${measegeCenterUrl.deleteMessageUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // delete inbox message
  deleteReceivedMessage: ({ dispatch, commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(`${url}${measegeCenterUrl.deleteRecieveMessageUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getReceivedMessage");
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getReqApproveMessage: ({ dispatch, commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${measegeCenterUrl.getMessageReqApprovalUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getReceivedMessage");
          commit("mutate_reqApppMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getDeleteMessages: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get()
        .then((resp) => {
          commit();
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
