import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const itemDiscountUrl = {
  createRetailDiscountSetupUrl:
    "/optima/v1/item/set-margin-and-discount-limit/retail",
  getRetailDiscountSetupUrl:
    "/optima/v1/item/get-margin-and-discount-limit/retail",
  updateRetailDiscountSetupUrl:
    "/optima/v1/item/set-margin-and-discount-limit/retail",
  // deleteRetailDiscountSetupUrl: "",

  createWholesaleDiscountSetupUrl:
    "/optima/v1/item/set-margin-and-discount-limit/wholesale",
  getWholesaleDiscountSetupUrl:
    "/optima/v1/item/get-margin-and-discount-limit/wholesale",
  updateWholesaleDiscountSetupUrl:
    "/optima/v1/item/set-margin-and-discount-limit/wholesale",
  // deleteWholesaleDiscountSetupUrl: "",
};

const state = {
  loading: false,
  error: false,
  isRetailDiscountSetup: false,
  isWholesaleDiscountSetup: false,
  retailDiscountSetup: {},
  wholesaleDiscountSetup: {},
};

const getters = {
  getIsRetailDiscountSetup: (state) => state.isRetailDiscountSetup,
  getIsWholesaleDiscountSetup: (state) => state.isWholesaleDiscountSetup,
  getRetailDiscountSetup: (state) => state.retail.retailDiscountSetup,
  getWholesaleDiscountSetup: (state) => state.retail.wholesaleDiscountSetup,
};

const mutations = {
  loading: (state) => (state.loading = true),
  error: (state) => (state.error = true),
  mutate_retailDiscount: (state, payload) =>
    (state.retailDiscountSetup = payload),
  mutate_wholesaleDiscount: (state, payload) =>
    (state.wholesaleDiscountSetup = payload),
};

const actions = {
  getRetailDiscount: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${itemDiscountUrl.getRetailDiscountSetupUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_retailDiscount", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createRetailDiscount: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${itemDiscountUrl.createRetailDiscountSetupUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getRetailDiscount");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateRetailDiscount: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${itemDiscountUrl.updateRetailDiscountSetupUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getRetailDiscount");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getWholesaleDiscount: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${itemDiscountUrl.getWholesaleDiscountSetupUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_wholesaleDiscount", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createWholesaleDiscount: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${itemDiscountUrl.createWholesaleDiscountSetupUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getWholesaleDiscount");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateWholesaleDiscount: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${itemDiscountUrl.updateWholesaleDiscountSetupUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getWholesaleDiscount");
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
