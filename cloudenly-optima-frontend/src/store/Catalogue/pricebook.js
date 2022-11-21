import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const priceBookUrl = {
  getWholesalePricebookUrl: "/optima/v1/item-variant-wholesale-pricebook/",
  getRetailPricebookUrl: "/optima/v1/item-variant-retail-pricebook/",
};

const state = {
  loading: false,
  error: false,
  productPriceBook: [],
  servicePriceBook: [],
};

const getters = {
  getProductPricebook: (state) => state.productPriceBook,
  getServicePricebook: (state) => state.servicePriceBook,
};

const mutations = {
  mutateProductPricebook: (state, payload) => {
    state.productPriceBook = payload;
  },

  mutateServicePricebook: (state, payload) => {
    state.servicePriceBook = payload;
  },
};

const actions = {
  getAllProductRetailPricebook: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${priceBookUrl.getRetailPricebookUrl}${payload}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data.message)
          commit("mutateProductPricebook", resp.data.message);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllProductWholesalePricebook: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${priceBookUrl.getWholesalePricebookUrl}${payload}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateProductPricebook", resp.data.message);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllServiceRetailPricebook: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${priceBookUrl.getRetailPricebookUrl}${payload}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateServicePricebook", resp.data.message);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllServiceWholesalePricebook: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${priceBookUrl.getWholesalePricebookUrl}${payload}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateServicePricebook", resp.data.message);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
