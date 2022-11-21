import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const paymentSettingUrl = {
  initializeTransactionUrl: "/payments/v1/collections/transactions",
  verifyTransactionUrl: "/payments/v1/collections/transactions/verify",
  getTransactionsUrl: "/payments/v1/collections/transactions/list/",
  getOneTransactionUrl: "/payments/v1/collections/transactions/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  OrgTransactions: [],
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getOrgTransactions: (state) => state.OrgTransactions,
};

const actions = {
  intializeTransaction: async ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    await axios.post(
      `${url}${paymentSettingUrl.initializeTransactionUrl}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    dispatch("getTransactions");
  },
  verifyTransaction: async ({ commit, rootState, dispatch }, payload) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.verifyTransactionUrl}${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    dispatch("getTransactions");
    commit("mutate_OrgTransactions", data.data);
  },

  getTransactions: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getTransactionsUrl}${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_OrgTransactions", data.data);
  },
  getOneTransaction: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getOneTransactionUrl}${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_OrgTransactions", data.data);
  },
};
const mutations = {
  loading: (state) => {
    state.loading = true;
  },
  mutate_OrgTransactions: (state, payload) => {
    state.OrgTransactions = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
