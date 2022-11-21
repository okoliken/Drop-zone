import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const saleOrderUrl = {
  allReceiveSalesOrderUrl: "/optima/v1/purchase-order/received/all/",
  deleteReceiveSaleOrderUrl: "/optima/v1/purchase-order/received/delete",
  receiveSalesOrderDataUrl:
    "/optima/v1/purchase-order/received/count/organization/",
  singleSaleOrderReceiveUrl: "/optima/v1/purchase-order/received/one/",
  changePurchaseOrderStatusUrl:
    "/optima/v1/purchase-order/change-received-status/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isSaleOrderStatus: false,
  allSaleOrder: [],
  salesOrderData: {
    total: 0,
    totalPending: 0,
    totalCancelled: 0,
    totalExecuted: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getSaleOrder: (state) => state.allSaleOrder,
  getIsSaleOrderStatus: (state) => state.isSaleOrderStatus,
  getSalesOrderData: (state) => state.salesOrderData,
};

const actions = {
  getAllSaleOrder: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${saleOrderUrl.allReceiveSalesOrderUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isSalesOrderStatus", false);
          } else {
            commit("mutate_isSalesOrderStatus", true);
            commit("mutate_sale_order", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  deleteSalesOrder: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${saleOrderUrl.deleteReceiveSaleOrderUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllSaleOrder");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleSaleOrder: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(`${url}${saleOrderUrl.singleSaleOrderReceiveUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getChangeSaleOrderStatus: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${saleOrderUrl.changePurchaseOrderStatusUrl}${payload}/status/executed`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
          dispatch("getAllSaleOrder");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSaleOrderAnalysis: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${saleOrderUrl.receiveSalesOrderDataUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_saleOrderAnalysis", resp.data);
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

  mutate_sale_order: (state, payload) => {
    state.allSaleOrder = payload;
  },
  mutate_isSalesOrderStatus: (state, payload) => {
    state.isSaleOrderStatus = payload;
  },

  mutate_saleOrderAnalysis: (state, payload) =>
    (state.salesOrderData = payload),

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  error: (state, payload) => {
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
