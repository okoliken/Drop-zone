import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// const url = "http://localhost:5003/cloudenly";


const itemCharacteristic = {
  createItemCharacteristicUrl: "/optima/v1/item/characteristic/create",
  getItemCharacteristicUrl: "/optima/v1/item/characteristic/",
  deleteItemCharacteristicUrl: "/optima/v1/item/characteristic/delete",
  updateItemCharacteristicUrl: "/optima/v1/item/characteristic/update/",
};

const state = {
  loading: false,
  error: false,
  isItemCharacteristic: false,
  itemCharacteristics: [],
};

const getters = {
  getIsItemCharacteristicsCreated: (state) => state.isItemCharacteristic,
  getItemCharacteristic: (state) => state.itemCharacteristics,
};

const mutations = {
  loading: (state) => (state.loading = true),
  error: (state) => (state.error = true),
  mutate_isItemCharacteristic: (state, payload) =>
    (state.isItemCharacteristic = payload),
  mutate_ItemCharacteristic: (state, payload) =>
    (state.itemCharacteristics = payload),
};

const actions = {
  createItemCharacteristics: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${itemCharacteristic.createItemCharacteristicUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
          dispatch("getItemCharacteristic");
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getItemCharacteristic: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${itemCharacteristic.getItemCharacteristicUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isItemCharacteristic", false);
          } else {
            commit("mutate_isItemCharacteristic", true);
            commit("mutate_ItemCharacteristic", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  },

  deleteItemCharacteristicUrl: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${url}${itemCharacteristic.deleteItemCharacteristicUrl}${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
            data: payload,
          }
        )
        .then((resp) => {
          dispatch("updateItemCharacteristicUrl");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateItemCharacteristicUrl: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${itemCharacteristic.updateTaxRateUrl}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
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
