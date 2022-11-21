/* eslint-disable no-undef */

import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const quotationUrl = {
  creatQuotationUrl: "/optima/v1/quote/create",
  allQuotationUrl: "/optima/v1/quote/all",
  getOneQuotationUrl: "/optima/v1/quote/one/",
  updateQuotationUrl: "/optima/v1/quote/update/", 
  closeQuotationUrl: "/optima/v1/quote/delete/",
  processQuotationUrl: "/optima/v1/quote/process",
  otherQuotationUrl: "/optima/v1/quote/quote-requiring-my-approval/",

  // quotation code setting
  quotationCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/quote",
  getQuotationCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/quote/organization/",
  getGeneratedQuotationUrl:
    "/optima/v1/auto-generated-code/module-name/quote/organization/",

  // quotationAnalysis data
  getQuotationDataAnalysisUrl: "/optima/v1/quote/count/organization/",

  // receive quote analysis
  getReceiveQuotationDataAnalysisUrl:
    "/optima/v1/quote/received/count/organization/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allQuotation: [],
  singleQuotation: null,
  isQuotation: false,
  isSentQuotation: false,
  isQuotationCodeSetup: false,
  sentQuotation: [],
  isOtherQuotation: false,
  otherQuotation: [],
  quotationAnalysisData: {
    total: 0,
    totalPending: 0,
    totalClosed: 0,
  },

  receivedQuotationAnalysisData: {
    total: 0,
    totalPending: 0,
    totalClosed: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  allQuotation: (state) => state.allQuotation,
  singleQuotation: (state) => state.singleQuotation,
  getIsQuotation: (state) => state.isQuotation,
  getisSentQuotation: (state) => state.isSentQuotation,
  getSentQuotation: (state) => state.sentQuotation,
  getIsOtherQuotation: (state) => state.isOtherQuotation,
  getOtherQuotation: (state) => state.otherQuotation,
  getQuotationAnalysisData: (state) => state.quotationAnalysisData,
  getReceivedQuotationAnalysisData: (state) =>
    state.receivedQuotationAnalysisData,

  getIsQuotationCodeSetup: (state) => state.isQuotationCodeSetup,
};

const actions = {
  getAllQuotation: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${quotationUrl.allQuotationUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.quote.length === 0) {
            commit("mutate_isQuotation", false);
          } else {
            commit("mutate_isQuotation", true);
            commit("getQuotation", resp.data.quote);
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

  createQuotation: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${quotationUrl.creatQuotationUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllQuotation");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getSingleQuotation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${quotationUrl.getOneQuotationUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_singleQuotation", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateQuotation: ({ commit, rootState, dispatch }, payload) => {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${quotationUrl.updateQuotationUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllQuotation");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  closeQuotation: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(`${url}${quotationUrl.closeQuotationUrl}`, { 
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllQuotation");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  sendQuotation: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${quotationUrl.processQuotationUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllQuotation");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getOthersQuotation: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.otherQuotationUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (
            resp.data.message === "You have no quote requiring your approval."
          ) {
            commit("mutate_isOtherQuotation", false);
          } else {
            commit("mutate_isOtherQuotation", true);
            commit("mutate_otherQuotation", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // quotation setting
  createQuotationCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${quotationUrl.quotationCodeSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getQuotationCode");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getQuotationCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.getQuotationCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (
            resp.data.message ===
            "Code setting do not exist for this organization or module."
          ) {
            commit("mutate_quotationCode", false);
          } else {
            commit("mutate_quotationCode", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGeneratedQuotationCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${quotationUrl.getGeneratedQuotationUrl}${rootState.auth.auth.authData.orgId}`,
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
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getQuotationAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.getQuotationDataAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_quotationAnalysisData", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getReceiveQuotationAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${quotationUrl.getReceiveQuotationDataAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_quotationAnalysisData", resp.data);
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

  getQuotation: (state, payload) => {
    state.allQuotation = payload;
  },

  mutate_singleQuotation: (state, payload) => {
    state.singleQuotation = payload;
  },

  mutate_otherQuotation: (state, payload) => {
    state.otherQuotation = payload;
  },

  mutate_isOtherQuotation: (state, payload) => {
    state.isOtherQuotation = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  mutate_isQuotation: (state, payload) => {
    state.isQuotation = payload;
  },

  error: (state) => {
    state.error = true;
  },

  mutate_quotationAnalysisData: (state, payload) => {
    state.quotationAnalysisData = payload;
  },

  mutate_receivedQuotationAnalysisData: (state, payload) => {
    state.receivedQuotationAnalysisData = payload;
  },

  mutate_quotationCode: (state, payload) => {
    state.isQuotationCodeSetup = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
