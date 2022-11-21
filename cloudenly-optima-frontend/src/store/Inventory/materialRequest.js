/* eslint-disable no-undef */
import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
// const url = "http://localhost:5003/cloudenly";

const materialRequestUrl = {
  getAllMaterialRequestUrl: "/optima/v1/material-request/all/",
  createMaterialRequestUrl: "/optima/v1/material-request/create",
  getSingleMaterialRequestUrl: "/optima/v1/material-request/one/",
  updateMaterialRequestUrl: "/optima/v1/material-request/update/",
  deleteMaterialRequestUrl: "/optima/v1/material-request/delete",
  sendMaterialRequestUrl: "/optima/v1/material-request/process",
  receiveMaterialRequestUrl: "/optima/v1/material-request/received/all/",

  // material request code setting
  materialRequestCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/materialRequest",
  getMaterialRequestCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/materialRequest/organization/",
  getGeneratedMaterialRequestUrl:
    "/optima/v1/auto-generated-code/module-name/materialRequest/organization/",

  // material request analysis data
  materialRequestAnalysisUrl: "/optima/v1/material-request/count/organization/",
  receivedMaterialRequestAnalysisUrl:
    "/optima/v1/material-request/received/count/organization/",
};

const state = {
  loading: false,
  error: false,
  isMaterialRequest: false,
  isReceiveMaterialRequest: false,
  allMaterialRequest: [],
  receiveMaterialRequest: [],
  materialRequestAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },
  materialRequestReceivedAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },
};

const getters = {
  getAllMaterialRequest: (state) => state.allMaterialRequest,
  getIsMaterialRequest: (state) => state.isMaterialRequest,
  getReceiveMaterialRequest: (state) => state.receiveMaterialRequest,
  getMaterialRequestAnalysis: (state) => state.materialRequestAnalysisData,
  getIsReceiveMaterialRequest: (state) => state.isReceiveMaterialRequest,

  getReceivedMaterialRequestAnalysis: (state) =>
    state.materialRequestReceivedAnalysisData,
};

const mutations = {
  mutate_loading: (state) => {
    state.loading = true;
  },

  mutate_error: (state) => {
    state.error = true;
  },
  mutate_material_request: (state, payload) => {
    state.allMaterialRequest = payload;
  },

  mutate_isMaterialRequest: (state, payload) => {
    state.isMaterialRequest = payload;
  },

  mutate_isReceivedMaterialRequest: (state, payload) => {
    state.isReceiveMaterialRequest = payload;
  },

  mutate_receivedMaterialRequest: (state, payload) => {
    state.receiveMaterialRequest = payload;
  },

  mutate_materialRequestAnalysis: (state, payload) => {
    state.materialRequestAnalysisData = payload;
  },
  mutate_receivedMaterialRequestAnalysis: (state, payload) => {
    state.materialRequestReceivedAnalysisData = payload;
  },
};

const actions = {
  getAllMaterialRequest: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getAllMaterialRequestUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.materialRequest.length === 0) {
            commit("mutate_isMaterialRequest", false);
          } else {
            commit("mutate_isMaterialRequest", true);
            commit("mutate_material_request", resp.data.materialRequest);
          }

          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  createMaterialRequest: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${materialRequestUrl.createMaterialRequestUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // console.log(resp)
          commit("loading");
          dispatch("getAllMaterialRequest");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteMaterialRequest: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${materialRequestUrl.deleteMaterialRequestUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllMaterialRequest", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSingleMaterialRequest: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getSingleMaterialRequestUrl}${payload}`,
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

  updateMaterialRequest: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${materialRequestUrl.updateMaterialRequestUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("loading");
          dispatch("getAllMaterialRequest");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  sendMaterialRequest: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${materialRequestUrl.sendMaterialRequestUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllMaterialRequest", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  ReceivedMaterialRequest: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.receiveMaterialRequestUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isReceivedMaterialRequest", false);
          } else {
            commit("mutate_isReceivedMaterialRequest", true);
            commit("mutate_receivedMaterialRequest", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // material return code setting
  createMaterialRequestCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${materialRequestUrl.materialRequestCodeSettingUrl}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getMaterialReturnCode");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getMaterialRequestCode: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getMaterialRequestCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
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

  getGeneratedMaterialRequestCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${materialRequestUrl.getGeneratedMaterialRequestUrl}${rootState.auth.auth.authData.orgId}`,
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

  // end code section

  // get material request analysis data
  getMaterialRequestAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.materialRequestAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_materialRequestAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getReceivedMaterialRequestAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.receivedMaterialRequestAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_receivedMaterialRequestAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
