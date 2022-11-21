import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const creditNoteUrl = {
  createCreditNoteUrl: "/optima/v1/creditDebitNote/create/creditNote",
  updateCreditNoteUrl: "optima/v1/creditDebitNote/update/",
  allCreditNoteUrl: "/optima/v1/creditDebitNote/",
  singleCreditNoteUrl: "/optima/v1/creditDebitNote/",
  getCreditNoteAnalysisUrl: "/optima/v1/creditDebitNote/analytics/",
  getCreditNoteSummaryUrl: "/optima/v1/creditDebitNote/analytics-summary/",
};

const state = {
  loading: false,
  error: false,
  isCreatedNoteCreated: false,
  errorMessage: "",
  successMessage: "",
  creditNote: [],
  singleCreditNote: {},
  creditNoteAnalysis: {
    totalAmount: 0,
    totalAmountRefunded: 0,
    totalAmountOutstanding: 0,
  },
  creditNoteSummary: {},
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getCreditNote: (state) => state.creditNote,
  getSingleCreditNote: (state) => state.singleCreditNote,
  getCreditNoteAnalysis: (state) => state.creditNoteAnalysis,
  getCreditNoteSummary: (state) => state.creditNoteSummary,
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutateErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  mutateSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  mutateAllCreditNote: (state, payload) => {
    state.creditNote = payload;
  },

  mutateIsCreditNoteCreate: (state, payload) => {
    state.creditNote = payload;
  },

  mutateSingleCreditNote: (state, payload) => {
    state.singleCreditNote = payload;
  },

  mutateCreditNoteAnalysis: (state, payload) => {
    state.creditNoteAnalysis = payload;
  },

  mutateCreditNoteSummary: (state, payload) => {
    state.creditNoteSummary = payload;
  },
};

const actions = {
  getAllCreditNote: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${creditNoteUrl.allCreditNoteUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/credit`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutateIsCreditNoteCreate", false);
          } else {
            commit("mutateIsCreditNoteCreate", true);
            commit("mutateAllCreditNote", resp.data);
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

  getSingleCreditNote: ({ commit }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${creditNoteUrl.singleCreditNoteUrl}${payload}`)
        .then((resp) => {
          commit("mutateSingleCreditNote", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createCreditNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .post(`${creditNoteUrl.createCreditNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllCreditNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateCreditNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(`${creditNoteUrl.createCreditNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllCreditNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteCreditNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(`${creditNoteUrl.createCreditNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllCreditNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCreditNoteAnalytics: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${creditNoteUrl.getCreditNoteAnalysisUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/credit`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateCreditNoteAnalysis", resp.data.financialAnalytics);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getCreditNoteSummary: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${creditNoteUrl.getCreditNoteSummaryUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/creditDebit`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateCreditNoteSummary", resp.data.analyticsSummary);
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

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
