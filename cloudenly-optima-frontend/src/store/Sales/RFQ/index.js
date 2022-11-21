import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const requestUrl = {
  allReceiveRequestUrl: "/optima/v1/request-for-quote/received/all/",
  deleteReceiveRequestUrl: "/optima/v1/request-for-quote/received/delete/",
  receiveRequestAnalysisUrl:
    "/optima/v1/request-for-quote/received/count/organization/",
  singleReceivedRequestUrl: "/optima/v1/request-for-quote/received/one/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isSalesRequestStatus: false,
  allReceiveRequest: [],
  singleRequest: null,
  salesRequestData: {
    total: 0,
    totalPending: 0,
    totalCancelled: 0,
    totalExecuted: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getReceiveRequest: (state) => state.allReceiveRequest,
  getIsSalesRequestStatus: (state) => state.isSalesRequestStatus,
  getReceiveAnalysisData: (state) => state.salesRequestData,
};

const actions = {
  getAllReceiveRequest: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${requestUrl.allReceiveRequestUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isSalesRequestStatus", false);
          } else {
            commit("mutate_isSalesRequestStatus", true);
            commit("mutate_ReceiveRequest", resp.data);
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

  deleteReceiveRequest: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${requestUrl.deleteReceiveRequestUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllReceiveRequest");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getReceiveRequestAnalysis: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${requestUrl.receiveRequestAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}/`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_receiveAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getSingleReceivedRequestQuote: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${requestUrl.singleReceivedRequestUrl}${payload}/organization/${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_singlePurchaseRequestQuote", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_ReceiveRequest: (state, payload) => {
    state.allReceiveRequest = payload;
  },
  mutate_isSalesRequestStatus: (state, payload) => {
    state.isSalesRequestStatus = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },
  mutate_singlePurchaseRequestQuote: (state, payload) => {
    state.singleRequest = payload;
  },

  mutate_receiveAnalysis: (state, payload) =>
    (state.salesRequestData = payload),

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
