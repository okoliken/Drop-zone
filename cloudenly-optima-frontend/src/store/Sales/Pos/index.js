import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const PosUrl = {
  createPosUrl: "/optima/v1/pos-sales/create",
  createItemUrl: "optima/v1/item/characteristic/value/create",
  allPosUrl: "/optima/v1/pos-sales/all",
  getStatPosUrl: "/optima/v1/pos-sales/stats",
  getSinglePosUrl: "/optima/v1/pos-sales/one",
  updatePosStatusUrl: "/optima/v1/pos-sales/change-status",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allPos: [],
  statPos: [],
  singlePos: '',
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  allPos: state => state.allPos,
  getSinglePos: state => state.singlePos,
  getIsRecurringInvoice: state => state.isRecurringInvoice,
  getRecurringInvoice: state => state.recurringInvoice,

  getIsRentalInvoice: state => state.isRentalInvoice,
  getRentalInvoice: state => state.rentalInvoice,

  getIsInvoice: state => state.isInvoice,
  getPosStat: state => state.statPos,
  getIsOthersInvoice: state => state.isOthersInvoice,
  getOthersInvoice: state => state.othersInvoice,
  getInvoiceAnalysisData: state => state.invoiceAnalysisData,
  getIsInvoiceCodeSetup: state => state.isInvoiceCodeSetup
};

const actions = {
  getAllPos: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${PosUrl.allPosUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_isPos", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },
  getPosStat: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${PosUrl.getStatPosUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_statPos", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },
  getSinglePos: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${PosUrl.getSinglePosUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("getSinglePos", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createPos: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${PosUrl.createPosUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          dispatch("getAllPos");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },
  completePosStatus: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      let data = {
        payload: {
          salesStatus: "completed"
        }
      };
      axios
        .patch(
          `${url}${PosUrl.updatePosStatusUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload.posSalesId}`,
          data,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getAllPos");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  holdPosStatus: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      let data = {
        payload: {
          salesStatus: "on-hold"
        }
      };
      axios
        .patch(
          `${url}${PosUrl.updatePosStatusUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload.posSalesId}`,
          data,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getAllPos");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createItemCharacteristics: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${PosUrl.createItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          dispatch("getPos");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  }
};

const mutations = {
  loading: state => {
    state.loading = true;
  },

  getPos: (state, payload) => {
    state.allPos = payload;
  },

  getSinglePos: (state, payload) => {
    state.singlePos = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },


  mutate_isPos: (state, payload) => {
    state.allPos = payload;
  },
  mutate_statPos: (state, payload) => {
    state.statPos = payload;
  },


  error: state => {
    state.error = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
