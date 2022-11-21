import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;



const purchaseOrderUrl = {
  getPurchaseOrderUrl: "/optima/v1/purchase-order/all",
  createPurchaseOrderUrlUrl: "/optima/v1/purchase-order/create",

  updatePurchaseOrderUrl: "/optima/v1/purchase-order/update/",
  singlePurchaseOrderUrl: "/optima/v1/purchase-order/one/",

  deletePurchaseOrderUrl: "/optima/v1/purchase-order/delete",
  sendPurchaseOrderUrl: "/optima/v1/purchase-order/process/",
  othersPurchaseOrderUrl: "/optima/v1/purchase-order/po-requiring-my-approval/",

  // request for quote code doc setting
  purchaseOrderCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/purchaseOrder",
  getPurchaseOrderCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/purchaseOrder/organization/",
  getGeneratedPurchaseOrderUrl:
    "/optima/v1/auto-generated-code/module-name/purchaseOrder/organization/",

  //  get purchaseOrderAnalysis
  purchaseOrderAnalysisUrl: "/optima/v1/purchase-order/count/organization/",
};

const state = {
  loading: false,
  error: false,
  isPurchaseCreated: false,
  isOtherPurchaseOrder: false,
  isPurchaseOrderCodeSetup: false,
  otherPurchaseOrder: [],
  errorMessage: "",
  successMessage: "",
  allPurchaseOrder: [],
  singlePurchaseOrder: null,
  purchaseOrderAnalysis: {
    total: 0,
    totalPending: 0,
    totalClosed: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getAllPurchaseOrder: (state) => state.allPurchaseOrder,
  isPurchaseOrderCreated: (state) => state.isPurchaseCreated,
  getSinglePurchaseOrder: (state) => state.singlePurchaseOrder,
  isOtherPurchaseOrder: (state) => state.isOtherPurchaseOrder,
  getAllOtherPurchaseOrder: (state) => state.otherPurchaseOrder,
  getPurchaseOrderData: (state) => state.purchaseOrderAnalysis,
  getIsPurchaseOrderCodeSetup: (state) => state.isPurchaseOrderCodeSetup,
};

const actions = {
  createPurchaseOrder: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${purchaseOrderUrl.createPurchaseOrderUrlUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllPurchaseOrder", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getAllPurchaseOrder: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${purchaseOrderUrl.getPurchaseOrderUrl}/?orgId=${payload.orgId}&oultetId=${payload.outletId}&creatorId=${payload.creatorId}&functionId=${payload.functionId}&status=${payload.status}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.purchaseOrder.length === 0) {
            commit("mutate_isPurchaseOrderCreated", false);
          } else {
            commit("mutate_isPurchaseOrderCreated", true);
            commit("mutate_purchaseOrder", resp.data.purchaseOrder);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("");
          reject(err);
        });
    });
  },

  updatePurchaseOrder: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${purchaseOrderUrl.updatePurchaseOrderUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllPurchaseOrder");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSinglePurchaseOrder: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${purchaseOrderUrl.singlePurchaseOrderUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_singlePurchaseOrder", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deletePurchaseOrder: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${purchaseOrderUrl.deletePurchaseOrderUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllPurchaseOrder");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOthersPurchaseOrder: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${purchaseOrderUrl.othersPurchaseOrderUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (
            resp.data.message ===
            "You have no purchase order requiring your approval."
          ) {
            commit("mutate_isOtherPurchaseOrder", false);
          } else {
            commit("mutate_isOtherPurchaseOrder", true);
            commit("mutate_otherPurchaseOrder", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("");
          reject(err);
        });
    });
  },

  sendPurchaseOrder: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${purchaseOrderUrl.sendPurchaseOrderUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllPurchaseOrder");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // request for quote doc code format setting
  createPurchaseOrderCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${purchaseOrderUrl.purchaseOrderCodeSettingUrl}`,
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
          reject(err);
        });
    });
  },

  getPurchaseOrderOrderCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${purchaseOrderUrl.getPurchaseOrderCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (
            resp.data.message ===
            "Code setting do not exist for this organization or module."
          ) {
            commit("mutate_isCodeSetup", false);
          } else {
            commit("mutate_isCodeSetup", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("mutate_isCodeSetup", false);
          reject(err);
        });
    });
  },

  getGeneratedPurchaseOrderCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${purchaseOrderUrl.getGeneratedPurchaseOrderUrl}${rootState.auth.auth.authData.orgId}`,
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
          reject(err);
        });
    });
  },

  getPurchaseOrderAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${purchaseOrderUrl.purchaseOrderAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_purchaseOrderData", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  error: (state) => {
    state.error = true;
  },

  mutate_isPurchaseOrderCreated: (state, payload) => {
    state.isPurchaseCreated = payload;
  },

  mutate_purchaseOrder: (state, payload) => {
    state.allPurchaseOrder = payload;
  },

  mutate_singlePurchaseOrder: (state, payload) => {
    state.singlePurchaseOrder = payload;
  },
  mutate_isOtherPurchaseOrder: (state, payload) => {
    state.isOtherPurchaseOrder = payload;
  },
  mutate_otherPurchaseOrder: (state, payload) => {
    state.otherPurchaseOrder = payload;
  },
  mutate_purchaseOrderData: (state, payload) => {
    state.purchaseOrderAnalysis = payload;
  },

  mutate_isCodeSetup: (state, payload) => {
    state.isPurchaseOrderCodeSetup = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
