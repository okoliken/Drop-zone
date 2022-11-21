import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const RequestQuoteUrl = {
  getPurchaseRequestQuoteUrl: "/optima/v1/request-for-quote/all",

  createPurchaseRequestQuoteUrl: "/optima/v1/request-for-quote/create",
  updatePurchaseRequestQuoteUrl: "/optima/v1/request-for-quote/update/",
  singleRequestQuoteUrl: "/optima/v1/request-for-quote/one/",
  deleteRequestQuoteUrl: "/optima/v1/request-for-quote/delete",
  sendRequestQuoteUrl: "/optima/v1/request-for-quote/process",

  otherRequestUrl: "/optima/v1/request-for-quote/rfq-requiring-my-approval",
  deleteReceivedRequestUrl: "/optima/v1/request-for-quote/received/delete/",

  // request for quote code doc setting
  requestForQuoteCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/requestForQuote",
  getRequestCodeCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/requestForQuote/organization/",
  getGeneratedRequestCodeUrl:
    "/optima/v1/auto-generated-code/module-name/requestForQuote/organization/",

  // request for quote analysis
  getAnalysisUrl: "/optima/v1/request-for-quote/count/organization/",
};

const state = {
  loading: false,
  error: false,
  isRequestQuote: false,
  isRequestCodeSetup: false,
  errorMessage: "",
  successMessage: "",
  allRequestQuote: [],
  singleRequestQuote: [],
  isOtherRequestQuote: false,
  otherRequestQuote: [],
  requestQuoteAnalysis: {
    total: 0,
    totalPending: 0,
    totalClosed: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getAllRequestQuote: (state) => state.allRequestQuote,
  isRequestQuoteCreated: (state) => state.isRequestQuote,
  getSingleRequestQuote: (state) => state.singleRequestQuote,
  isOtherRequestQuote: (state) => state.isOtherRequestQuote,
  getOtherRequestQuote: (state) => state.otherRequestQuote,
  getRequestQuoteAnalysis: (state) => state.requestQuoteAnalysis,
  getIsRequestCodeSetup: (state) => state.isRequestCodeSetup,
};

const actions = {
  createRequestQuote: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${RequestQuoteUrl.createPurchaseRequestQuoteUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllRequestQuote");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getAllRequestQuote: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${RequestQuoteUrl.getPurchaseRequestQuoteUrl}/?orgId=${payload.orgId}&oultetId=${payload.outletId}&creatorId=${payload.creatorId}&functionId=${payload.functionId}&status=${payload.status}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.requestForQuote.length === 0) {
            commit("mutate_isRequestQuoteCreated", false);
          } else {
            commit("mutate_isRequestQuoteCreated", true);
            commit("mutate_purchaseRequestQuote", resp.data.requestForQuote);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("");
          reject(err);
        });
    });
  },

  getOtherRequestQuote: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${RequestQuoteUrl.otherRequestUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/?pageNo=1&noOfRows=25`,
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
            "You have no request for quote requiring your approval."
          ) {
            commit("mutate_isOtherRequestQuote", false);
          } else {
            commit("mutate_isOtherRequestQuote", true);
            commit("mutate_othetRequestQuote", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("");
          reject(err);
        });
    });
  },

  updateRequestQuote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${RequestQuoteUrl.updatePurchaseRequestQuoteUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllRequestQuote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleRequestQuote: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${RequestQuoteUrl.singleRequestQuoteUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
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

  deleteRequestQuote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${RequestQuoteUrl.deleteRequestQuoteUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllRequestQuote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  sendRequestQuote: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${RequestQuoteUrl.sendRequestQuoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("");
          dispatch("getAllRequestQuote");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteRecieveRequestQuote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${RequestQuoteUrl.deleteReceivedRequestUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOtherRequestQuote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  approveRequestforQuote: ({ dispatch }) => {
    dispatch();
  },

  // request for quote doc code format setting
  createRequestQuoteCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${RequestQuoteUrl.requestForQuoteCodeSettingUrl}`,
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
          dispatch("getRequestQuoteCode");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getRequestQuoteCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${RequestQuoteUrl.getRequestCodeCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp)
          if (
            resp.data.message ===
            "Code setting do not exist for this organization or module."
          ) {
            commit("mutate_isCodeSetup", false);
          } else {
            commit("mutate_isCodeSetup", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGeneratedRequestForQuoteCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${RequestQuoteUrl.getGeneratedRequestCodeUrl}${rootState.auth.auth.authData.orgId}`,
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

  getRequestuoteAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${RequestQuoteUrl.getAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_requestQuoteAnalysis", resp.data);
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

  error: (state) => {
    state.error = true;
  },

  mutate_isRequestQuoteCreated: (state, payload) => {
    state.isRequestQuote = payload;
  },

  mutate_purchaseRequestQuote: (state, payload) => {
    state.allRequestQuote = payload;
  },

  mutate_singlePurchaseRequestQuote: (state, payload) => {
    state.singleRequestQuote = payload;
  },

  mutate_isOtherRequestQuote: (state, payload) => {
    state.isOtherRequestQuote = payload;
  },

  mutate_othetRequestQuote: (state, payload) => {
    state.otherRequestQuote = payload;
  },

  mutate_requestQuoteAnalysis: (state, payload) => {
    state.requestQuoteAnalysis = payload;
  },

  mutate_isCodeSetup: (state, payload) => {
    state.isRequestCodeSetup = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
