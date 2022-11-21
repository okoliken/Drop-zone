import axios from "axios";
import setEnv from "../../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const InvoiceUrl = {
  creatInvoiceUrl: "/optima/v1/invoice/create",
  allInvoiceUrl: "/optima/v1/invoice/all",
  getSingleInvoiceUrl: "/optima/v1/invoice/one/",
  processInvoiceUrl: "/optima/v1/invoice/process/",
  closeInvoiceUrl: "/optima/v1/invoice/delete/",
  updateInvoiceUrl: "/optima/v1/invoice/update/",
  othersInvoiceUrl: "/optima/v1/invoice/invoice-requiring-my-approval/",

  // invoice code setting
  invoiceCodeSettingUrl:
    "/optima/v1/auto-generated-code-setting/module-name/invoice",
  getInvoiceCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/invoice/organization/",
  getGeneratedInvoiceCode:
    "/optima/v1/auto-generated-code/module-name/invoice/organization/",

  //  Invoice Analysis Data

  getInvoiceAnalysisUrl: "/optima/v1/invoice/count/organization/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allInvoice: [],
  singleInvoice: null,
  isRecurringInvoice: false,
  recurringInvoice: [],
  isRentalInvoice: false,
  rentalInvoice: [],
  isInvoice: false,
  isOthersInvoice: false,
  isInvoiceCodeSetup: false,
  othersInvoice: [],
  invoiceAnalysisData: {
    total: 0,
    totalPending: 0,
    totalApproved: 0,
    totalDisapproved: 0,
    totalClosed: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  allInvoice: (state) => state.allInvoice,
  singleInvoice: (state) => state.singleInvoice,
  getIsRecurringInvoice: (state) => state.isRecurringInvoice,
  getRecurringInvoice: (state) => state.recurringInvoice,

  getIsRentalInvoice: (state) => state.isRentalInvoice,
  getRentalInvoice: (state) => state.rentalInvoice,

  getIsInvoice: (state) => state.isInvoice,
  getIsOthersInvoice: (state) => state.isOthersInvoice,
  getOthersInvoice: (state) => state.othersInvoice,
  getInvoiceAnalysisData: (state) => state.invoiceAnalysisData,
  getIsInvoiceCodeSetup: (state) => state.isInvoiceCodeSetup,
};

const actions = {
  getAllInvoice: ({commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.allInvoiceUrl}/?orgId=${payload.orgId}&oultetId=${payload.outletId}&creatorId=${payload.creatorId}&functionId=${payload.functionId}&status=${payload.status}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.invoice.length === 0) {
            commit("mutate_isInvoice", false);
          } else {
            commit("mutate_isInvoice", true);
            commit("getInvoice", resp.data.invoice);
          }
          dispatch("getInvoiceAnalysisData");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getAllRentalInvoice: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.allInvoiceUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}?type=rental`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.invoice.length === 0) {
            commit("mutate_isRentalInvoice", false);
          } else {
            commit("mutate_isRentalInvoice", true);
            commit("mutate_rentalInvoice", resp.data.invoice);
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

  getAllRecurringInvoice: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.allInvoiceUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}?type=recurring`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.invoice.length === 0) {
            commit("mutate_isRecurringInvoice", false);
          } else {
            commit("mutate_isRecurringInvoice", true);
            commit("mutate_recurringInvoice", resp.data.invoice);
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

  getSingleInvoice: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${InvoiceUrl.getSingleInvoiceUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("getSingleInvoice", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createInvoice: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${InvoiceUrl.creatInvoiceUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getInvoice");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  updateInvoice: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${InvoiceUrl.updateInvoiceUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllInvoice");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  sendInvoice: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${InvoiceUrl.processInvoiceUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllInvoice");
          dispatch("getAllRentalInvoice");
          dispatch("getAllRecurringInvoice");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          reject(err);
        });
    });
  },

  getOthersInvoice: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${InvoiceUrl.othersInvoiceUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (
            resp.data.message === "You have no invoice requiring your approval."
          ) {
            commit("mutate_isOthersInvoice", false);
          } else {
            commit("mutate_isOthersInvoice", true);
            commit("mutate_othersInvoice", resp.data.invoice);
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

  closeInvoice: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(`${url}${InvoiceUrl.closeInvoiceUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllInvoice");
          dispatch("getAllRentalInvoice");
          dispatch("getAllRecurringInvoice");

          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // invoice code setting
  createInvoiceCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${InvoiceUrl.invoiceCodeSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getInvoiceCode");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getInvoiceCode: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${InvoiceUrl.getInvoiceCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
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
            commit("mutate_invoiceCodeSetup", false);
          } else {
            commit("mutate_invoiceCodeSetup", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGeneratedInvoiceCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${InvoiceUrl.getGeneratedInvoiceCode}${rootState.auth.auth.authData.orgId}`,
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

  // invoice analysis data section

  getInvoiceAnalysisData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${InvoiceUrl.getInvoiceAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_invoiceAnalysis", resp.data);
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

  getInvoice: (state, payload) => {
    state.allInvoice = payload;
  },

  getSingleInvoice: (state, payload) => {
    state.singleInvoice = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  mutate_isOthersInvoice: (state, payload) => {
    state.isOthersInvoice = payload;
  },

  mutate_othersInvoice: (state, payload) => {
    state.othersInvoice = payload;
  },

  mutate_isInvoice: (state, payload) => {
    state.isInvoice = payload;
  },

  mutate_invoiceAnalysis: (state, payload) => {
    state.invoiceAnalysisData = payload;
  },

  error: (state) => {
    state.error = true;
  },

  mutate_invoiceCodeSetup: (state, payload) => {
    state.isInvoiceCodeSetup = payload;
  },

  mutate_recurringInvoice: (state, payload) => {
    state.recurringInvoice = payload;
  },

  mutate_isRecurringInvoice: (state, payload) => {
    state.isRecurringInvoice = payload;
  },

  mutate_isRentalInvoice: (state, payload) => {
    state.isRentalInvoice = payload;
  },

  mutate_rentalInvoice: (state, payload) => {
    state.rentalInvoice = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
