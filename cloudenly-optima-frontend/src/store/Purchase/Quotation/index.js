import axios from "axios";
// eslint-disable-next-line no-undef
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const quotationUrl = {
  allQuotationReceivedUrl: "/optima/v1/quote/received/all/",
  deleteReceivedQuotationUrl: "/optima/v1/quote/received/delete/",
  singleQuotationReceivedUrl: "/optima/v1/quote/received/one/",
  QuotationReceivedAnalysisUrl: "/optima/v1/quote/received/count/organization/",
};

// /quote/received/count/organization/:orgId/outlet/:outletId/creator/:creatorId/:email

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allReceiveQuotation: [],
  singleQuotation: null,
  isQuotationReceived: false,
  receivedQuotationAnalysis: {
    total: 0,
    totalCancelled: 0,
    totalExecuted: 0,
    totalPending: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  singleQuotation: (state) => state.singleQuotation,
  getReceivedQuotation: (state) => state.allReceiveQuotation,
  getIsQuotationReceivedStatus: (state) => state.isQuotationReceived,
  getQuotationReceivedAnalysis: (state) => state.receivedQuotationAnalysis,
};

const actions = {
  getAllReceivedQuotation: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${quotationUrl.allQuotationReceivedUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data , 'from the store')
          if (resp.data.length === 0) {
            commit("mutate_isQuotationReceived", false);
          } else {
            commit("mutate_isQuotationReceived", true);
            commit("mutate_ReceivedQuotation", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");

          commit("mutate_isQuotationReceived", false);

          commit("getErrorMessage", err);
        });
    });
  },

  getSingleQuotation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.singleQuotationReceivedUrl}${payload}/organization/${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_singleQuotation", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteReceivedQuotation: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${quotationUrl.deleteReceivedQuotationUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllReceivedQuotation");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getQuotationReceivedAnalysis: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.QuotationReceivedAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_QuotationReceivedAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_ReceivedQuotation: (state, payload) => {
    state.allReceiveQuotation = payload;
  },

  mutate_singleQuotation: (state, payload) => {
    state.singleQuotation = payload;
  },

  mutate_isQuotationReceived: (state, payload) => {
    state.isQuotationReceived = payload;
  },

  mutate_QuotationReceivedAnalysis: (state, payload) => {
    state.receivedQuotationAnalysis = payload;
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
