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
  OrgCollectionTransaction: [],
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getOrganisationTCollection: (state) => state.OrgCollectionTransaction,
};

const actions = {
  initializeTransaction: async ({ commit, rootState, dispatch }, payload) => {
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
    commit("mutate_OrgTransCollection", data.data);
  },

  getOrganisationTransactions: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getTransactionsUrl}${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_OrgTransCollection", data.data);
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
    commit("mutate_OrgTransCollection", data.data);
  },
};
const mutations = {
  loading: (state) => {
    state.loading = true;
  },
  mutate_OrgTransCollection: (state, payload) => {
    state.OrgCollectionTransaction = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
