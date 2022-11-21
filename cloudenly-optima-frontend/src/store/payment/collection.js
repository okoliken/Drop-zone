import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;


const paymentSettingUrl = {
  createCollectionAccountUrl: "/payments/v1/collections/accounts",
  getCollectionActionUrl: "/payments/v1/collections/accounts/list/",
  getOneCollectionActionUrl: "/payments/v1/collections/accounts/",
  updateCollectionActionUrl: "/payments/v1/collections/accounts/",
  deleteCollectionActionUrl: "/payments/v1/collections/accounts/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isCollectionAccountSetup: false,
  collectionAccounts: [],
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getCollectionAccounts: (state) => state.collectionAccounts,
};

const actions = {
  postCollectionAccounts: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${paymentSettingUrl.createCollectionAccountUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getCollectionAccounts");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCollectionAccounts: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getCollectionActionUrl}${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_collectionAccounts", data.data);
    commit("mutate_isCollectionAccountSetup", true);
    
  },
  //  Get one Account
  // eslint-disable-next-line no-unused-vars
  getOneCollectionAccount: ({ commit, rootState }, payload) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${paymentSettingUrl.getOneCollectionActionUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        });
    });
  },

  // Update collection Account
  updateCollectionAccount: async ({ commit, rootState }, payload) => {
    commit("loading");
    await axios.patch(
      `${url}${paymentSettingUrl.updateCollectionActionUrl}${payload.id}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
  },
  // Delete Collection Account
  deleteCollectionAccount: async ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    await axios.delete(
      `${url}${paymentSettingUrl.deleteCollectionActionUrl}${payload.id}`,

      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );

    dispatch("getCollectionAccounts");
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_isCollectionAccountSetup: (state, payload) => {
    state.isCollectionAccountSetup = payload;
  },
  mutate_collectionAccounts: (state, payload) => {
    state.collectionAccounts = payload;
  },
  updateCollectionAccount: (state, payload) => {
    state.collectionAccounts = payload;
  },
  delete_accounts: (state, payload) =>
    (state.collectionAccounts = state.collection_accounts.filter(
      (account) => account.payload !== payload
    )),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
