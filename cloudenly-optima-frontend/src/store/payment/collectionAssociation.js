import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
const paymentSettingUrl = {
  createLocationAccountUrl: "/payments/v1/collections/locations",
  getLocationActionUrl: "/payments/v1/collections/locations/list",
  getCategoriesActionUrl: "/payments/v1/collections/categories",
  getOneLocationActionUrl: "/payments/v1/collections/locations/{{id}}",
  updateLocationActionUrl: "/payments/v1/collections/locations/{{id}}",
  deleteLocationActionUrl: "/payments/v1/collections/locations/",
};
const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  // isCollectionAccountSetup: false,
  collectionLocations: [],
  categories: []
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getLocationAccounts: (state) => state.collectionLocations,
  getCategories: (state) => state.categories,
};

const actions = {
  postCollectionAccounts: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${paymentSettingUrl.createLocationAccountUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getLocationAccounts");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getLocationAccounts: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getLocationActionUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_locationAccounts", data.data);
  },

  getCategories: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${paymentSettingUrl.getCategoriesActionUrl}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_categories", data.data);
  },
 
  // eslint-disable-next-line no-unused-vars
  getOneLocationAccount: ({ commit, rootState }, payload) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${paymentSettingUrl.getOneLocationActionUrl}${payload}`, {
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
  updateLocationAccount: async ({ commit, rootState }, payload) => {
    commit("loading");
    await axios.patch(
      `${url}${paymentSettingUrl.updateLocationActionUrl}${payload.id}`,
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
  deleteLocationAccount: async ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    await axios.delete(
      `${url}${paymentSettingUrl.deleteLocationActionUrl}${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );

    dispatch("getLocationAccounts");
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_locationAccounts: (state, payload) => {
    state.collectionLocations = payload;
  },
  mutate_categories: (state, payload) => {
    state.categories = payload;
  },
  updateLocationAccount: (state, payload) => {
    state.collectionAccounts = payload;
  },
  delete_accounts: (state, payload) =>
    (state.collectionLocations = state.location_accounts.filter(
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
