/* eslint-disable no-unused-vars */
import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const subscriptionUrl = {
  getSubscriptionUrl: "",
};
const state = {
  isPlan: false,
  plan: null,
  subscriptionModule: null,
};

const getters = {
  getIsPlan: (state) => state.isPlan,
  getPlan: (state) => state.plan,
  getSubscription: (state) => state.subscriptionModule,
};

const mutations = {
  mutate_isPlan: (state, payload) => {
    state.isPlan = payload;
  },

  mutate_plan: (state, payload) => {
    state.plan = payload;
  },

  mutate_subscriptionModule: (state, payload) => {
    state.subscriptionModule = payload;
  },

  mutate_logoutSubscription: (state) => {
    (state.isPlan = false),
      (state.plan = null),
      (state.subscriptionModule = null);
  },
};

const actions = {
  set_isPlan: ({ commit }, payload) => {
    commit("mutate_isPlan", payload);
  },

  set_plan: ({ commit, dispatch }, payload) => {
    if (payload) {
      dispatch("set_isPlan", true);
      commit("mutate_plan", payload);
    } else {
      dispatch("set_isPlan", false);
      commit("mutate_plan", null);
    }
  },

  set_subscriptionModule: ({ commit, dispatch }, payload) => {
    if (payload) {
      dispatch("set_isPlan", true);
      commit("mutate_subscriptionModule", payload);
    } else {
      dispatch("set_isPlan", false);
      commit("mutate_subscriptionModule", null);
    }
  },

  get_subscriptionPlan: ({ dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${subscriptionUrl.getSubscriptionUrl}`)
        .then((resp) => {
          dispatch("set_plan", resp.data);
          dispatch("set_subscriptionModule", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  set_logoutSubscription: ({ commit }) => {
    [commit("mutate_logoutSubscription")];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
