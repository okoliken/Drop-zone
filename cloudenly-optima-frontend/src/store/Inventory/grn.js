/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const grnUrl = {
  getAllGrnUrl: "/optima/v1/grn/all/",
  createGrnUrl: "/optima/v1/grn/create",
  updateGrnUrl: "/optima/v1/grn/update/",
  deleteGrnUrl: "/optima/v1/grn/delete",
  sendGrnUrl: "/optima/v1/grn/process/",
  singleGrnUrl: "/optima/v1/grn/one/",
  receiveGrnUrl: "/optima/v1/grn/received/all/",
  approvalGrnUrl: "/optima/v1/grn/grn-requiring-my-approval/",

  // good receive note code setting
  grnCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/goodReceivedNote",
  getGrnCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/goodReceivedNote/organization/",
  getGeneratedGrnUrl:
    "/optima/v1/auto-generated-code/module-name/goodReceivedNote/organization/",

  // grn analysis data
  grnAnalysisUrl: "/optima/v1/grn/count/organization/",

  // received grn analysis data
  receivedGrnAnalysisDataUrl: "",
};

const state = {
  loading: false,
  error: false,
  isGrn: false,
  isReceiveGrn: false,
  isGrnCodeSetup: false,

  allGrn: [],
  allReceiveGrn: [],
  isApproval: false,
  approvalGrn: [],
  grnAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },

  receivedGrnAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },
};

const getters = {
  getallGrn: (state) => state.allGrn,
  getIsGrn: (state) => state.isGrn,
  getReceiveGrn: (state) => state.allReceiveGrn,
  getIsReceiveGrn: (state) => state.isReceiveGrn,
  getIsApprovalGrn: (state) => state.isApproval,
  getApprovalGrn: (state) => state.approvalGrn,
  getGrnAnalysisData: (state) => state.grnAnalysisData,
  getIsGrnCodeSetup: (state) => state.isGrnCodeSetup,
  getReceivedGrnAnalysisData: (state) => state.receivedGrnAnalysisData,
};

const mutations = {
  mutate_loading: (state) => {
    state.loading = true;
  },

  mutate_error: (state) => {
    state.error = true;
  },
  mutate_grn: (state, payload) => {
    state.allGrn = payload;
  },

  mutate_isGrn: (state, payload) => {
    state.isGrn = payload;
  },

  mutate_isReceiveGrn: (state, payload) => {
    state.isReceiveGrn = payload;
  },

  mutate_receiveGrn: (state, payload) => {
    state.allReceiveGrn = payload;
  },
  mutate_grnData: (state, payload) => {
    state.grnAnalysisData = payload;
  },
  mutate_isApproval: (state, payload) => {
    state.isApproval = payload;
  },
  mutate_ApprovalGrn: (state, payload) => {
    state.approvalGrn = payload;
  },
  mutate_isGrnCodeSetup: (state, payload) => (state.isGrnCodeSetup = payload),
  mutate_receivedGrnAnalysisData: (state, payload) =>
    (state.receivedGrnAnalysisData = payload),
};

const actions = {
  getAllGrn: ({ commit, rootState, dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${grnUrl.getAllGrnUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.goodsReceivedNote.length === 0) {
            commit("mutate_isGrn", false);
          } else {
            commit("mutate_isGrn", true);
            commit("mutate_grn", resp.data.goodsReceivedNote);
          }
          dispatch("getGrnAnalysisData");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSingleGrn: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${grnUrl.singleGrnUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createGrn: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${grnUrl.createGrnUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllGrn");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteGrn: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${grnUrl.deleteGrnUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllGrn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  updateGrn: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${grnUrl.updateGrnUrl}${payload.payload.id}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllGrn", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  sendGrn: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${grnUrl.sendGrnUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("loading");
          dispatch("getAllGrn");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getGrnApproval: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${grnUrl.approvalGrnUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isApproval", false);
          } else {
            commit("mutate_isApproval", true);
            commit("mutate_ApprovalGrn", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Received GRN

  ReceivedGrn: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${grnUrl.receiveGrnUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data.length);
          if (resp.data.length === 0) {
            commit("mutate_isReceiveGrn", false);
          } else {
            commit("mutate_isReceiveGrn", true);
            commit("mutate_receiveGrn", resp.data);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  deleteReceivedGrn: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .delete()
        .then((resp) => {
          resolve(resp);
        })
        .then((err) => {
          reject(err);
        });
    });
  },

  // grn code setting

  createGrnCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${grnUrl.grnCodeSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getGrnCode");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGrnCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${grnUrl.getGrnCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
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
            commit("mutate_isGrnCodeSetup", false);
          } else {
            commit("mutate_isGrnCodeSetup", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGeneratedGrnCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${grnUrl.getGeneratedGrnUrl}${rootState.auth.auth.authData.orgId}`,
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

  // get waybill analysis data
  getGrnAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${grnUrl.grnAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_grnData", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // get waybill analysis data
  getReceivedGrnAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${grnUrl.receivedGrnAnalysisDataUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_receivedGrnAnalysisData", resp.data);
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
