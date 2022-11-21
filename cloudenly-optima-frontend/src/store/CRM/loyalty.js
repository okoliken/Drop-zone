import axios from "axios"; //api calls network request

import setEnv from "../../utils/setEnv";


const url = 'http://18.132.188.41:5011'; // set env variable

// const url 
const url2 = setEnv(process.env).quantumServiceURL;
const crmUrl = {
  getDefaultLoyaltyUrl: "/crm/v1/loyalty-scheme/default", //route

  allLoyaltyUrl: "/crm/v1/loyalty-scheme/all",
  createLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/one",
  getAllLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/all",
  getOneLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/one/",
  deactivateLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/deactivate/one/",
  migrateLoyaltyUrl: "/cloudenly/loyalty/migrate/one/",
  updateLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/one/",
  deleteLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/one/",
  addMemberToLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/contacts/add",
  loyaltyStatsUrl: "/cloudenly/loyalty/v1/loyalty/stats",
  updateLoyaltySchemeUrl: "/cloudenly/loyalty/v1/settings/loyalty",
  getContactUrl: "/crm/v1/contact/get-contact-without-loyalty-id",

  removeLoyaltyUrl: "/cloudenly/loyalty/v1/loyalty/contacts/remove",

};


const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  isLoyaltySetup: false,
  defaultLoyalty: [],
  allLoyalty: [],
  singleLoyalty: {},
  loyaltyStat: [],
  contact: [],
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  getIsLoyaltySetup: state => state.isLoyaltySetup,
  allDefaultLoyalty: state => state.defaultLoyalty,


  allLoyalty: state => state.allLoyalty,
  getSingleLoyalty: state => state.singleLoyalty,
  getLoyaltyStat: state => state.loyaltyStat,
  getContact: state => state.contact,
};


const actions = {

  getDefaultLoyalty: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(`${url}${crmUrl.getDefaultLoyaltyUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("getDefaultLoyalty", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getLoyaltyStat: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${crmUrl.loyaltyStatsUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    console.log(data)
    commit("mutate_stats", data);
  },

  getContact: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url2}${crmUrl.getContactUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_contact", data.data);
  },

  getAllLoyalty: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getAllLoyaltyUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("muatateIsLoyaltySetup", true);
          commit("mutate_all_loyalty", resp.data.data); // resp.data === backend
          resolve(resp);
        })
        .catch(err => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getSingleLoyalty: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getOneLoyaltyUrl}${rootState.auth.auth.authData.orgId}/${id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          // console.log(resp.data);
          commit("mutate_single_loyalty", resp.data);
          // commit("getIsLoyaltySetup", true);
          // commit("mutate_Loyalty", resp.data); // resp.data === backend
          resolve(resp);
        })
        .catch(err => {
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  createLoyalty: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${crmUrl.createLoyaltyUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  updateLoyaltyScheme: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${crmUrl.updateLoyaltySchemeUrl}/${rootState.auth.auth.authData.orgId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  deactivateLoyalty: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${crmUrl.deactivateLoyaltyUrl}${payload.orgId}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  migrateLoyalty: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(`${url}${crmUrl.migrateLoyaltyUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  updateLoyalty: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${crmUrl.updateLoyaltyUrl}${rootState.auth.auth.authData.orgId}/${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  deleteLoyalty: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .delete(`${url}${crmUrl.deleteLoyaltyUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          },
          data: payload
        })
        .then(resp => {
          commit("getSuccessMessage", resp.data);
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  removeContactFromLoyalty: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${crmUrl.removeLoyaltyUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload.payload.loyaltyId}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          },
          data: payload,
        })
        .then(resp => {
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  addContactToLoyalty: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${crmUrl.addMemberToLoyaltyUrl}/${payload.userInfo.orgId}/${payload.userInfo.outletId}/${payload.payload.loyaltyId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getAllLoyalty");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {

  loading: state => {
    state.loading = true;
  },

  mutate_all_loyalty: (state, payload) => {
    state.allLoyalty = payload;
  },

  mutate_single_loyalty: (state, payload) => {
    state.singleLoyalty = payload;
  },

  getDefaultLoyalty: (state, payload) => {
    state.defaultLoyalty = payload;
  },

  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  mutate_stats: (state, payload) => {
    state.loyaltyStat = payload;
  },

  mutate_contact: (state, payload) => {
    state.contact = payload;
  },

  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },
  muatateIsLoyaltySetup: (state, payload) => {
    state.isLoyaltySetup = payload;
  },

  error: state => {
    state.error = true;
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


