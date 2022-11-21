import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
// const url = "http://localhost:5003/cloudenly";

const materialRequestUrl = {
  getAllMaterialReturnUrl: "/optima/v1/material-return/all/",
  createMaterialReturnUrl: "/optima/v1/material-return/create",
  updateMaterialRequestUrl: "/optima/v1/material-return/update/",
  deleteMaterialReturnUrl: "/optima/v1/material-return/delete",
  sendMaterialReturnUrl: "/optima/v1/material-return/process/",
  receivedMaterialReturnUrl: "/optima/v1/material-return/received/all/",
  getSingleMaterialReturnUrl: "/optima/v1/material-return/one/",

  // material code setting
  materialReturnCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/materialReturn",
  getMaterialReturnCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/materialReturn/organization/",
  getGeneratedMaterialReturnUrl:
    "/optima/v1/auto-generated-code/module-name/materialReturn/organization/",

  // material analysis data
  materialReturnAnalysisUrl: "/optima/v1/material-return/count/organization/",
  materialReturnReceiveAnalysisUrl:
    "/optima/v1/material-return-receive/count/organization/",
};

// /optima/v1/material-request/delete
const state = {
  loading: false,
  error: false,
  isMaterialReturn: false,
  isReceiveMaterialReturn: false,
  allMaterialReturn: [],
  receiveMaterialReturn: [],

  materialAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },

  materialReturnAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },
};

const getters = {
  getAllMaterialReturn: (state) => state.allMaterialReturn,
  getIsMaterialReturn: (state) => state.isMaterialReturn,
  getReceiveMaterialReturn: (state) => state.receiveMaterialReturn,
  isReceiveMaterialReturn: (state) => state.isReceiveMaterialReturn,

  // material analysis data
  getMaterialReturnAnalysis: (state) => state.materialAnalysisData,
  getMaterialReturnRecAnalysisState: (state) =>
    state.materialReturnAnalysisData,
};

const mutations = {
  mutate_loading: (state) => {
    state.loading = true;
  },

  mutate_error: (state) => {
    state.error = true;
  },

  mutate_material_Return: (state, payload) => {
    state.allMaterialReturn = payload;
  },

  mutate_isMaterialReturn: (state, payload) => {
    state.isMaterialReturn = payload;
  },

  mutate_isReceiveMaterialReturn: (state, payload) => {
    state.isReceiveMaterialReturn = payload;
  },

  mutate_receiveMaterialReturn: (state, payload) => {
    state.receiveMaterialReturn = payload;
  },

  mutate_materialReturnData: (state, payload) => {
    state.materialAnalysisData = payload;
  },

  mutate_materialReturnReceiveData: (state, payload) => {
    state.materialReturnAnalysisData = payload;
  },
};

const actions = {
  getAllMaterialReturn: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getAllMaterialReturnUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp)
          if (resp.data.materialReturn.length === 0) {
            commit("mutate_isMaterialReturn", false);
          } else {
            commit("mutate_isMaterialReturn", true);
            commit("mutate_material_Return", resp.data.materialReturn);
          }

          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  createMaterialReturn: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${materialRequestUrl.createMaterialReturnUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllMaterialReturn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSingleMaterialReturn: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getSingleMaterialReturnUrl}${payload}`,
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
          console.log(err);
          reject(err);
        });
    });
  },

  deleteMaterialReturn: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${materialRequestUrl.deleteMaterialReturnUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllMaterialReturn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  updateMaterialReturn: ({ rootState, dispatch }, payload) => {
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
          dispatch("getAllMaterialReturn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  sendMaterialReturn: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${materialRequestUrl.sendMaterialReturnUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllMaterialReturn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  ReceivedMaterialReturn: ({ commit, rootState, dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.receivedMaterialReturnUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isReceiveMaterialReturn", false);
          } else {
            commit("mutate_isReceiveMaterialReturn", true);
            commit("mutate_receiveMaterialReturn", resp.data);
          }
          dispatch("getMaterialReturnReceiveDataAnalysisData");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // material return code setting
  createMaterialReturnCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${materialRequestUrl.materialReturnCodeSettingUrl}`,
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

  getMaterialReturnCode: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.getMaterialReturnCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
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

  getGeneratedMaterialReturnCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${materialRequestUrl.getGeneratedMaterialReturnUrl}${rootState.auth.auth.authData.orgId}`,
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

  // get material return analysis data
  getMaterialReturnAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.materialReturnAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_materialReturnData", resp.data);

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getMaterialReturnReceiveDataAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${materialRequestUrl.materialReturnReceiveAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_materialReturnReceiveData", resp.data);
          // console.log(resp.data)
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
  actions,
  mutations,
};
