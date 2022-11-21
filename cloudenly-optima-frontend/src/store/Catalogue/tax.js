import axios from "axios";
// import {forkName} from ''
import { forkName } from "@/utils/helpers";
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";

import setEnv from "../../utils/setEnv";

const url = setEnv(process.env).quantumServiceURL;

const taxUrl = {
  // Vat setup Route tax policy
  getOrgVat: "/optima/v1/tax/all/organization",
  getOutletTaxUrl: "/optima/v1/tax/one/organization/",
  createVatUrl: "/optima/v1/tax/create",
  deleteVatUrl: "/optima/v1/tax-policy/delete/",

  addTaxRateUrl: "/optima/v1/tax/add",
  updateTaxRateUrl: "/optima/v1/tax/",
  updateTaxPolicyUrl: "/optima/v1/tax-policy/",

  getAllOrgVatUrl: "/optima/v1/taxes/all/organization/",

  // delete line tax components
  deleteTaxUrl: "/optima/v1/tax/delete/",
};

const state = {
  loading: false,
  error: false,
  isOutletTaxSetup: false,
  isOrgTaxSetup: false,
  outletTax: [],
  allOrgVat: [],

  isTaxCreated: false,
};

const getters = {
  getIsOrgTaxSetup: (state) => state.isOrgTaxSetup,
  getAllOrgVat: (state) => state.allOrgVat,
  getIsOutletTaxSetup: (state) => state.isOutletTaxSetup,
  getOutletTax: (state) => state.outletTax,

  getIsCreatedTax: (state) => state.isTaxCreated,
};

const mutations = {
  loading: (state) => (state.loading = true),
  error: (state) => (state.error = true),
  mutate_isOutletTaxSetup: (state, payload) => {
    state.isOutletTaxSetup = payload;
  },
  mutate_outletTax: (state, payload) => {
    state.outletTax = payload;
  },
  mutate_isOrgTaxSetup: (state, payload) => {
    state.isOrgTaxSetup = payload;
  },
  mutate_orgTax: (state, payload) => {
    state.allOrgVat = payload;
  },

  mutate_isTaxCreated: (state, payload) => {
    state.isTaxCreated = payload;
  },
};

const actions = {
  // Tax Policy
  createTaxPolicy: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${taxUrl.createVatUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_isOutletTaxSetup", true);
           dispatch("getOutletVat")
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getAllOrgVat: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${taxUrl.getOrgVat}/${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isOrgTaxSetup", false);
          } else {
            commit("mutate_isOrgTaxSetup", true);
            commit("mutate_orgTax", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  },

  getAllOrgTaxes: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${taxUrl.getAllOrgVatUrl}${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isTaxCreated", false);
          } else {
            commit("mutate_isTaxCreated", true);
            // commit('mutate_orgTax', resp.data)
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  },

  getOutletVat: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      // console.log(rootState.auth.auth.loginOutlet)
      const state = forkName(
        `${rootState.auth.auth.loginOutlet.state}`,
        stateList
      );

      const country = forkName(
        `${rootState.auth.auth.loginOutlet.country}`,
        countryList
      );

      commit("loading");
      axios
        .get(
          `${url}${taxUrl.getOutletTaxUrl}${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}/country/${country}/state/${state}/city/null`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data) {
            commit("mutate_isOutletTaxSetup", true);
            commit("mutate_outletTax", resp.data);
          } else {
            commit("mutate_isOutletTaxSetup", false);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          reject(err);
        });
    });
  },

  // delete vat policy
  deleteTax: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${taxUrl.deleteVatUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllOrgVat");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addTaxRate: ({ rootState }, payload) => {
    const endpoint = `${url}${taxUrl.addTaxRateUrl}`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.post(endpoint, payload, { headers });
  },

  updateTaxRate: ({ rootState }, payload) => {
    const endpoint = `${url}${taxUrl.updateTaxRateUrl}${payload.id ||
      payload.payload.id}`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.patch(endpoint, payload, { headers });
  },

  updateTaxPolicy: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${taxUrl.updateTaxPolicyUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllOrgVat");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          reject(err);
        });
    });
  },

  // delete  tax rate
  deleteTaxRate: ({ rootState }, payload) => {
    const endpoint = `${url}${taxUrl.deleteTaxUrl}${payload}`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.delete(endpoint, { headers });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
