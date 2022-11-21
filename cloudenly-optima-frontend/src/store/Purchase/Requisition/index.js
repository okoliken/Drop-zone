import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// http://localhost:5003/cloudenly/optima/v1/purchase-requisition/all/?orgId=92e421b5-[…]torId=djsfaokljdfioajeoirjfD&functionId=kadjfkaj&status=draft

// http://localhost:5003/cloudenly/optima/v1/purchase-requisition/all/?orgId=value&oultetId=value&creatorId=value&functionId=value&status=value

const requisitionUrl = {
  getPurchaseRequisitionUrl: "/optima/v1/purchase-requisition/all",
  createPurchaseRequisitionUrl: "/optima/v1/purchase-requisition/create",
  updatePurchaseRequisitionUrl: "/optima/v1/purchase-requisition/update/",
  singleRequisitionUrl: "/optima/v1/purchase-requisition/one/",
  deleteRequisitionUrl: "/optima/v1/purchase-requisition/delete",
  sendPurchaseRequisitionUrl: "/optima/v1/purchase-requisition/process",
  otherPurchaseRequisitionUrl:
    "/optima/v1/purchase-requisition/pr-requiring-my-approval",

  // purchase requisition code setting
  purchaseRequisitionCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/purchaseRequisition",
  getPurchaseRequisitionCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/purchaseRequisition/organization/",
  getGeneratedRequisitionCodeUrl:
    "/optima/v1/auto-generated-code/module-name/purchaseRequisition/organization/",

  // purchase requisition analysis

  getAnalysisUrl: "/optima/v1/purchase-requisition/count/organization/",
};

const state = {
  loading: false,
  error: false,
  isRequisition: false,
  isOtherRequisition: false,
  errorMessage: "",
  successMessage: "",
  allRequisition: [],
  singleRequisition: [],
  otherRequisition: [],
  requisitionAnalysis: {
    total: 0,
    totalPending: 0,
    totalClosed: 0,
  },
  isRequisitionCodeCreated: false,
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getAllRequisition: (state) => state.allRequisition,
  isRequisitionCreated: (state) => state.isRequisition,
  singleRequisition: (state) => state.singleRequisition,
  isOtherRequisition: (state) => state.isOtherRequisition,
  getOtherRequisition: (state) => state.otherRequisition,
  getRequisitionAnalysis: (state) => state.requisitionAnalysis,
  getRequisitionCodeCreated: (state) => state.isRequisitionCodeCreated,
};

const actions = {
  crateRequisition: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${requisitionUrl.createPurchaseRequisitionUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllRequisition");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getAllRequisition: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${requisitionUrl.getPurchaseRequisitionUrl}/?orgId=${payload.orgId}&outletId=${payload.outletId}&creatorId=${payload.creatorId}&functionId=${payload.functionId}&status=${payload.status}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.purchaseRequisition.length === 0) {
            commit("mutate_isRequisitionCreated", false);
          } else {
            commit("mutate_isRequisitionCreated", true);
            commit("mutate_purchaseRequisition", resp.data.purchaseRequisition);
          }
          dispatch("getRequisitionAnalysisData");
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

  // get requisition requiring approval
  getOtherRequisition: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${requisitionUrl.otherPurchaseRequisitionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/?pageNo=1&noOfRows=25`,
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
            "You have no purchase requisition requiring your approval."
          ) {
            commit("mutate_isOtherRequisition", false);
          } else {
            commit("mutate_isOtherRequisition", true);
            commit("mutate_otherRequisition", resp.data);
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

  updateRequisition: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${requisitionUrl.updatePurchaseRequisitionUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllRequisition", payload);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleRequisition: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${requisitionUrl.singleRequisitionUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_singlePurchaseRequisition", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteRequisition: ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${requisitionUrl.deleteRequisitionUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllRequisition");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  sendRequisition: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${requisitionUrl.sendPurchaseRequisitionUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("");
          dispatch("getAllRequisition");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // purchase Requisition setting code
  createPurchaseRequisitionCode: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${requisitionUrl.purchaseRequisitionCodeSettingUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          let data = {
            userInfo: rootState.auth.auth.authData,
            payload: {
              moduleName: "PR",
              yearOfBirth: null,
              contactName: null,
            },
          };
          dispatch("getPurchaseRequisitionCode");
          dispatch("getGeneratedRequisitionCode", data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPurchaseRequisitionCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${requisitionUrl.getPurchaseRequisitionCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
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
            commit("mutate_requisitionCode", false);
          } else {
            commit("mutate_requisitionCode", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("mutate_requisitionCode", false);
          reject(err);
        });
    });
  },

  getGeneratedRequisitionCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${requisitionUrl.getGeneratedRequisitionCodeUrl}${rootState.auth.auth.authData.orgId}`,
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

  //get purchase requisition analysis data
  getRequisitionAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${requisitionUrl.getAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_requisitionAnalysis", resp.data);
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

  mutate_isRequisitionCreated: (state, payload) => {
    state.isRequisition = payload;
  },

  mutate_purchaseRequisition: (state, payload) => {
    state.allRequisition = payload;
  },

  mutate_singlePurchaseRequisition: (state, payload) => {
    state.singleRequisition = payload;
  },

  mutate_isOtherRequisition: (state, payload) => {
    state.isOtherRequisition = payload;
  },

  mutate_otherRequisition: (state, payload) => {
    state.otherRequisition = payload;
  },

  mutate_requisitionAnalysis: (state, payload) => {
    state.requisitionAnalysis = payload;
  },

  mutate_requisitionCode: (state, payload) => {
    state.isRequisitionCodeCreated = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
