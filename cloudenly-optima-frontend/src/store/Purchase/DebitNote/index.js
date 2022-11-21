import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const debitNoteUrl = {
  createDebitNoteUrl: "/optima/v1/creditDebitNote/create/debitNote",
  updateDebitNoteUrl: "optima/v1/creditDebitNote/update/",
  allDebitNoteUrl: "/optima/v1/creditDebitNote/",
  singleDebitNoteUrl: "/optima/v1/creditDebitNote/",
  getDebitNoteAnalysisUrl: "/optima/v1/creditDebitNote/analytics/",
  getDebitNoteSummaryUrl: "/optima/v1/creditDebitNote/analytics-summary/",
};

const state = {
  loading: false,
  error: false,
  isDebitNoteCreated: false,
  errorMessage: "",
  successMessage: "",
  debitNote: [],
  singleDebitNote: {},
  debitNoteAnalysis: {
    totalAmount: 0,
    totalAmountRefunded: 0,
    totalAmountOutstanding: 0,
  },
  debitNoteSummary: {},
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getDebitNote: (state) => state.debitNote,
  getSingleDebitNote: (state) => state.singleDebitNote,
  getDebitNoteAnalysis: (state) => state.debitNoteAnalysis,
  getDebitNoteSummary: (state) => state.debitNoteSummary,
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

  mutateAllDebitNote: (state, payload) => {
    state.debitNote = payload;
  },

  mutateIsDebitNoteCreate: (state, payload) => {
    state.isDebitNoteCreated = payload;
  },

  mutateSingleDebitNote: (state, payload) => {
    state.singleDebitNote = payload;
  },

  mutateDebitNoteAnalysis: (state, payload) => {
    state.debitNoteAnalysis = payload;
  },

  mutateDebitNoteSummary: (state, payload) => {
    state.debitNoteSummary = payload;
  },
};

const actions = {
  getAllDebitNote: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${debitNoteUrl.allDebitNoteUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/DebitNote`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutateIsDebitNoteCreate", false);
          } else {
            commit("mutateIsDebitNoteCreate", true);
            commit("mutateAllDebitNote", resp.data);
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

  getSingleDebitNote: ({ commit }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${debitNoteUrl.singleDebitNoteUrl}${payload}`)
        .then((resp) => {
          commit("mutateSingleDebitNote", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createDebitNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .post(`${debitNoteUrl.createDebitNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllDebitNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateDebitNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(`${debitNoteUrl.createDebitNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllDebitNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteDebitNote: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(`${debitNoteUrl.createDebitNoteUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllDebitNote");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getDebitNoteAnalytics: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${debitNoteUrl.getDebitNoteAnalysisUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/DebitNote`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateDebitNoteAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getDebitNoteSummary: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${debitNoteUrl.getDebitNoteSummaryUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/creditDebit`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateDebitNoteSummary", resp.data.analyticsSummary);
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
