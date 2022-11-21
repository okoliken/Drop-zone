import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const pipelineUrl = {
  setupPipelineUrl: "/crm/v1/pipeline/setting/manage",
  getSetupPipelineUrl: "/crm/v1/pipeline/setting/get/", //user Information
  getLeadUrl: "/crm/v1/pipeline/all/category/lead/",

  getOpportunityUrl: "/crm/v1/pipeline/all/category/opportunity/",
  getSalesUrl: "/crm/v1/pipeline/all/category/sale/",

  getPipelineAnalyticTotalUrl: "/crm/v1/pipeline/count/",
  getPipelineAnalyticsByDateUrl: "/crm/v1/pipeline/all/category/count/date/",

  // move pipeline
  movePipelineUrl: "/crm/v1/pipeline/move/manually",

  // update contact pipeline setting
  updateContactLeadStatusUrl: "/crm/v1/pipeline/status/",

  // pipeline search parameter
  leadSearchUrl: "/crm/v1/pipeline/all/category/lead/",
  opportunitySearchUrl: "/crm/v1/pipeline/all/category/opportunity/",
  saleSearchUrl: "/crm/v1/pipeline/all/category/sales/",

  //
  updatePipelineStatusUrl: "/crm/v1/pipeline/status/",

  // analysis url
  pipelineAnalysisUrl: "/crm/v1/pipeline/count/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isPipelineSetUp: false,
  setupPipeLine: [],
  leads: [],
  opportunity: [],
  sales: [],
  pipeLineAnalysisData: {
    totalVolume: 0,
    totalValue: 0,
    leadVolume: 0,
    opportunityVolume: 0,
    opportunityValue: 0,
    saleVolume: 0,
    saleValue: 0,
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getisPipelineSetup: (state) => state.isPipelineSetUp,
  getPipelineSetup: (state) => state.setupPipeLine,
  getLead: (state) => state.leads,
  getOpportunity: (state) => state.opportunity,
  getSales: (state) => state.sales,
  getPipelineAnalysisData: (state) => state.pipeLineAnalysisData,
};

const actions = {
  createPipelineSetup: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${pipelineUrl.setupPipelineUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("getSuccessMessage", resp.data.message);
          dispatch("getPipelineSetup");
          resolve(resp);
        })
        .catch((err) => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getPipelineSetup: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${pipelineUrl.getSetupPipelineUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getIsPipelineSetup", true);
          if (resp.data.settings) {
            commit("getPipeLineSetup", resp.data.settings);
          } else if (resp.data) {
            commit("getPipeLineSetup", resp.data);
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

  getLead: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${pipelineUrl.getLeadUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineLeads", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getOpportunity: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${pipelineUrl.getOpportunityUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineOpportunity", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getSales: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${pipelineUrl.getSalesUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineSales", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  pipelineMovement: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${pipelineUrl.movePipelineUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          dispatch("getLead");
          dispatch("getOpportunity");
          dispatch("getSales");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          // commit("error");
          // commit("getErrorMessage", err);
        });
    });
  },

  getTotalPipelineTotalData: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${pipelineUrl.getPipelineAnalyticTotalUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_pipelineAnalysisData", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSearchResultLeads: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${pipelineUrl.leadSearchUrl}${rootState.auth.auth.authData.orgId}/date/${payload.startDate}/${payload.endDate}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineLeads", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSearchResultOpportunity: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${pipelineUrl.opportunitySearchUrl}${rootState.auth.auth.authData.orgId}/date/${payload.startDate}/${payload.endDate}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineOpportunity", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSearchResultSales: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${pipelineUrl.saleSearchUrl}${rootState.auth.auth.authData.orgId}/date/${payload.startDate}/${payload.endDate}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("getPipelineSales", resp.data.contacts);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePipelineStatus: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${pipelineUrl.updatePipelineStatusUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getLead");
          dispatch("getOpportunity");
          dispatch("getSales");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // getPipelineAnalysisData: ({commit, rootState}) => {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${url}${pipelineUrl.getSalesUrl}${rootState.auth.auth.authData.orgId}`).then(resp => {
  //       commit('mutate_pipelineAnalysisData' , resp.data)
  //       resolve(resp)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // }
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  getIsPipelineSetup: (state, payload) => {
    state.isPipelineSetUp = payload;
  },

  getPipeLineSetup: (state, payload) => {
    state.setupPipeLine = payload;
  },

  getPipelineLeads: (state, payload) => {
    state.leads = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  getPipelineOpportunity: (state, payload) => {
    state.opportunity = payload;
  },

  getPipelineSales: (state, payload) => {
    state.sales = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },
  getIsLoyaltySetup: (state) => {
    state.isLoyaltySetup = true;
  },
  mutate_pipelineAnalysisData: (state, payload) =>
    (state.pipeLineAnalysisData = payload),

  error: (state) => {
    state.error = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
