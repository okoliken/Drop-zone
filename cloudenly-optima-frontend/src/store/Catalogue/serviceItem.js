import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const serviceItemUrl = {
  createServiceItemUrl: "/optima/v1/item/service/create",
  getServiceItemUrl: "/optima/v1/item/service",
  updateServiceItemUrl: "/optima/v1/item/service/update",

  deactivateServiceItemUrl: "/optima/v1/item/service/deactivate/",

  deleteServiceItemUrl: "/optima/v1/item/service/delete/",
  itemSourceUrl: "/optima/v1/item/source"
};

const state = {
  loading: false,
  error: false,
  isServiceItemCreated: false,
  serviceItem: [],
  itemSource: []
};

const getters = {
  getServiceItem: state => state.serviceItem,
  getItemSource: state => state.itemSource
};

const mutations = {
  loading: state => (state.loading = true),
  error: state => (state.error = true),
  isServiceItemCreated: state => (state.isServiceItemCreated = true),
  setServiceItem: (state, payload) => (state.serviceItem = payload),
  setItemSource: (state, payload) => (state.itemSource = payload)
};

const actions = {
  getItemSourceAction: ({ commit, rootState }) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${serviceItemUrl.itemSourceUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          resolve(resp);
          commit("setItemSource", resp.data.data);
        })
        .catch(err => {
          commit("error");
          reject(err);
        });
    });
  },

  createServiceItemAction: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${serviceItemUrl.createServiceItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("isServiceItemCreated", true);
          dispatch("getServiceItemAction");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getItemServiceActionOrganization: ({ commit, rootState }) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${serviceItemUrl.getServiceItemUrl}?orgId=${rootState.auth.auth.authData.orgId}&limit=10&skip=0`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("setServiceItem", resp.data);
        })
        .catch(err => {
          commit("error");
          reject(err);
        });
    });
  },

  getItemServiceActionOutlet: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${serviceItemUrl.getServiceItemUrl}?outletId=${payload}&limit=10&skip=0`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("setServiceItem", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          reject(err);
        });
    });
  },

  updateServiceItemAction: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${serviceItemUrl.updateServiceItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          resolve(resp);
          dispatch("getServiceItemAction");
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  deactivateServiceItemAction: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${serviceItemUrl.deactivateServiceItemUrl}${payload.outletId}/${payload.serviceId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getItemServiceActionOrganization");
        })
        .catch(err => {
          console.log(err);
          // commit("mutateError");
          // commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  deleteServiceItemAction: ({ commit, dispatch, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(
          `${url}${serviceItemUrl.deleteServiceItemUrl}${payload.orgId}/${payload.outletId}/${payload.serviceId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getServiceItemAction");
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
