import axios from "axios"
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const waybillUrl = {
  createWaybillUrl: "/optima/v1/waybill/create",
  sendWaybill: "/optima/v1/waybill/process/",
  allWaybillUrl: "/optima/v1/waybill/all",
  updateWaybillUrl: "/optima/v1/waybill/update/",
  deleteWaybillUrl: "/optima/v1/waybill/delete",
  processWaybillUrl: "/optima/v1/waybill/process/",
  othersWaybillUrl: "/optima/v1/waybill/waybill-requiring-my-approval",
  receiveWaybillUrl: "/optima/v1/waybill/received/all/",
  deleteReceiveWaybill: "/optima/v1/waybill/received/delete",
  singleWaybillUrl: "/optima/v1/waybill/one/",

  // generated waybill code
  waybillCodeSettingUrl: "/optima/v1/auto-generated-code-setting/module-name/waybill",
  getWaybillCodeSetupUrl: "/optima/v1/auto-generated-code-setting/module-name/waybill/organization/",
  getGeneratedWaybillUrl: "/optima/v1/auto-generated-code/module-name/waybill/organization/",

  // waybill analysis section
  waybillAnalysisUrl: "/optima/v1/waybill/count/organization/",
  // Received waybill Analysis
  receivedWaybillAnalysisUrl: "/optima/v1/waybill/received/count/organization/",
}

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isWaybill: false,
  allWaybill: [],
  singleWaybill: null,
  isOthersWaybill: false,
  othersWaybill: [],
  isReceiveWaybill: false,
  receiveWaybill: [],
  waybillAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },

  receiveWaybillAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },

  isWaybillCode: false,
}

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  getIsWaybill: state => state.isWaybill,
  allWaybill: state => state.allWaybill,
  singleWaybill: state => state.singleWaybill,
  getIsOtherWaybill: state => state.isOthersWaybill,
  getOthersWaybill: state => state.othersWaybill,
  getWaybillData: state => state.waybillAnalysisData,
  getReceiveWaybillData: state => state.receiveWaybillAnalysisData,

  getIsReceiveWaybill: state => state.isReceiveWaybill,
  getReceiveWaybill: state => state.receiveWaybill,
  getIsWaybillCode: state => state.isWaybillCode,
}

const actions = {
  getAllWaybill: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading")
      axios
        .get(
          `${url}${waybillUrl.allWaybillUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then(resp => {
          if (resp.data.waybill.length === 0) {
            commit("mutateIsWaybill", false)
          } else {
            commit("mutateIsWaybill", true)
            commit("mutate_get_waybill", resp.data.waybill)
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
          commit("error")
          commit("getErrorMessage", err)
        })
    })
  },

  getSingleWaybill: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${waybillUrl.singleWaybillUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          commit("mutate_singleWaybill", resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createWaybill: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading")
      axios
        .post(`${url}${waybillUrl.createWaybillUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          dispatch("getAllWaybill", payload)
          resolve(resp)
        })
        .catch(err => {
          commit("error")
          commit("getErrorMessage", err)
          reject(err)
        })
    })
  },

  deleteWaybill: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${waybillUrl.deleteWaybillUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then(resp => {
          dispatch("getAllWaybill")
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateWaybill: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${waybillUrl.updateWaybillUrl}${payload.payload.id}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          dispatch("getAllWaybill")
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  processWaybill: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${waybillUrl.processWaybillUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          dispatch("getAllWaybill")
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getReceiveWaybill: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${waybillUrl.receiveWaybillUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${rootState.auth.auth.orgData.email}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then(resp => {
          if (resp.data.length === 0) {
            commit("mutateIsReceiveWaybill", false)
          } else {
            commit("mutateIsReceiveWaybill", true)
            commit("mutate_receiveWaybill", resp.data)
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteReceiveWaybill: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${waybillUrl.deleteReceiveWaybill}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then(resp => {
          dispatch("getReceiveWaybill")
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get waybill approval
  getOtherWaybill: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading")
      axios
        .get(
          `${url}${waybillUrl.othersWaybillUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then(resp => {
          commit("mutate_get_waybill", resp.data.waybill)
          if (resp.data.message === "You have no waybill requiring your approval.") {
            commit("mutateIsOthersWaybill", false)
          } else {
            commit("mutateIsOthersWaybill", true)
            commit("mutateOtherWaybill", resp.data)
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
          commit("error")
          commit("getErrorMessage", err)
        })
    })
  },

  // waybill code setting
  createWaybillCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${waybillUrl.waybillCodeSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          dispatch("getWaybillCode")
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getWaybillCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${waybillUrl.getWaybillCodeSetupUrl}${rootState.auth.auth.authData.orgId}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          if (resp.data.message === "Code setting do not exist for this organization or module.") {
            commit("mutate_isWaybillCode", false)
          } else {
            commit("mutate_isWaybillCode", true)
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getGeneratedWaybillCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${waybillUrl.getGeneratedWaybillUrl}${rootState.auth.auth.authData.orgId}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get waybill analysis data
  getWaybillAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${waybillUrl.waybillAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then(resp => {
          commit("mutate_waybillData", resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // get waybill analysis data
  getReceiveWaybillAnalysisData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${waybillUrl.receivedWaybillAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then(resp => {
          commit("mutate_receiveWaybillData", resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}

const mutations = {
  loading: state => {
    state.loading = true
  },

  mutate_get_waybill: (state, payload) => {
    state.allWaybill = payload
  },

  mutate_singleWaybill: (state, payload) => {
    state.singleWaybill = payload
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload
  },

  mutateIsWaybill: (state, payload) => {
    state.isWaybill = payload
  },

  mutateIsOthersWaybill: (state, payload) => {
    state.isOthersWaybill = payload
  },

  mutate_waybillData: (state, payload) => {
    state.waybillAnalysisData = payload
  },

  mutate_receiveWaybillData: (state, payload) => {
    state.receiveWaybillAnalysisData = payload
  },

  mutateOtherWaybill: (state, payload) => {
    state.othersWaybill = payload
  },

  mutateIsReceiveWaybill: (state, payload) => {
    state.isReceiveWaybill = payload
  },

  mutate_receiveWaybill: (state, payload) => {
    state.receiveWaybill = payload
  },
  mutate_isWaybillCode: (state, payload) => (state.isWaybillCode = payload),

  error: state => {
    state.error = true
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
