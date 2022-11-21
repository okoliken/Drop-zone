import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const InvoiceUrl = {
  allInvoiceReceivedUrl: "/optima/v1/invoice/received/all/",
  deleteReceivedUrl: "/optima/v1/invoice/received/delete/",
  singleInvoiceReceivedUrl: "/optima/v1/invoice/received/one/",
  receivedInvoiceAnalyticsUrl:
    "/optima/v1/invoice/received/count/organization/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allReceiveInvoice: [],
  isInvoiceReceived: false,
  receivedInvoiceAnalytics: {
    total: 0,
    totalPending: 0,
    totalCancelled: 0,
    totalExecuted: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getReceivedInvoice: (state) => state.allReceiveInvoice,
  getIsInvoiceReceivedStatus: (state) => state.isInvoiceReceived,
  getReceivedInvoiceAnalytics: (state) => state.receivedInvoiceAnalytics,
};

const actions = {
  getAllReceivedInvoice: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.allInvoiceReceivedUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isInvoiceReceived", false);
          } else {
            commit("mutate_isInvoiceReceived", true);
            commit("mutate_ReceivedInvoice", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getSingleInvoiceReceived: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.singleInvoiceReceivedUrl}${payload}/organization/${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteReceivedInvoice: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${InvoiceUrl.deleteReceivedUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllReceivedInvoice");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllReceivedInvoiceAnalytics: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.receivedInvoiceAnalyticsUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_receivedInvoiceAnalytics", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_ReceivedInvoice: (state, payload) => {
    state.allReceiveInvoice = payload;
  },
  mutate_isInvoiceReceived: (state, payload) => {
    state.isInvoiceReceived = payload;
  },

  mutate_receivedInvoiceAnalytics: (state, payload) => {
    state.receivedInvoiceAnalytics = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  error: (state, payload) => {
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
