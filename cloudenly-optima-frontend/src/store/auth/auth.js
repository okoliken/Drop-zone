/* eslint-disable no-unused-vars */

import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// console.log(process.env)
const userUrl = {
  getOutletUrl: "/org/user/outlets/",
  updateOrgSettingUrl: "/org/settings",
  updatePasswordUrl: "/auth/change-password",
};
const state = {
  isAuth: false,
  token: null,
  authData: null,
  userData: null,
  orgData: null,
  orgApps: null,
  defaultUserOutlet: null,
  userOutlets: null,
  humanarData: null,
  driveData: null,
  messagingData: null,
  loginOutlet: null,
  twoFactorStatus: undefined,
  activeSecurityQuestions: undefined,
};

const getters = {
  getIsAuth: (state) => state.isAuth,
  getToken: (state) => state.token,
  getAuthData: (state) => state.authData,
  getUserData: (state) => state.userData,
  getOrgData: (state) => state.orgData,
  getUserOutlets: (state) => state.userOutlets,
  getDefaultUsersOutlet: (state) => state.defaultUserOutlet,
  getLoginOutlet: (state) => state.loginOutlet,
  twoFactorStatus: (state) => state.twoFactorStatus,
  getOrgApps: (state) => state.orgApps,
};

const mutations = {
  mutate_token: (state, payload) => {
    state.token = payload;
  },

  mutate_isAuth: (state, payload) => {
    state.isAuth = payload;
  },

  mutate_authData: (state, payload) => {
    state.authData = payload;
  },

  mutate_userData: (state, payload) => {
    state.userData = payload;
  },

  mutate_orgData: (state, payload) => {
    state.orgData = payload;
  },

  mutate_userOutlets: (state, payload) => {
    state.userOutlets = payload;
  },

  mutate_humanarData: (state, payload) => {
    state.humanarData = payload;
  },

  mutate_driveData: (state, payload) => {
    state.driveData = payload;
  },

  mutate_messageData: (state, payload) => {
    state.messagingData = payload;
  },

  mutate_userDefaultOutlet: (state, payload) => {
    state.defaultUserOutlet = payload;
  },

  mutate_userLoginOutlet: (state, payload) => {
    state.loginOutlet = payload;
  },

  mutate_logout: (state) => {
    (state.isAuth = false),
      (state.token = null),
      (state.authData = null),
      (state.userData = null),
      (state.orgData = null),
      (state.outlet = null),
      (state.userOutlets = null);
  },

  SET_TWOFACTOR_STATUS: (state, payload) => {
    state.twoFactorStatus = payload;
  },
  SET_ACTIVE_SECURITY_QUESTIONS: (state, payload) => {
    state.activeSecurityQuestions = payload;
  },
  SET_ORG_APPS: (state, payload) => {
    state.orgApps = payload;
  },
};

const actions = {
  set_isAuth: ({ commit }, payload) => {
    commit("mutate_isAuth", payload);
  },

  set_token: ({ commit, dispatch }, payload) => {
    if (payload) {
      dispatch("set_isAuth", true);
      commit("mutate_token", payload);
    } else {
      dispatch("set_isAuth", false);
      commit("mutate_token", null);
    }
  },

  set_authentication: ({ commit }, payload) => {
    commit("mutate_authData", payload);
  },

  set_orgData: ({ commit }, payload) => {
    commit("mutate_orgData", payload);
  },

  set_userData: ({ commit }, payload) => {
    commit("mutate_userData", payload);
  },

  set_userOutlets: ({ commit }, payload) => {
    commit("mutate_userOutlets", payload);
  },

  setHumanarData: ({ commit }, payload) => {
    commit("mutate_humanarData", payload);
  },

  setDriveData: ({ commit }, payload) => {
    commit("mutate_driveData", payload);
  },

  setMessagingData: ({ commit }, payload) => {
    commit("mutate_messageData", payload);
  },

  get_userOutlets: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${userUrl.getOutletUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_userOutlets", resp.data.outlets);
          let defaultUserOutlet = resp.data.outlets.find((resp) => {
            return (resp.isDefaultOutlet = true);
          });
          commit("mutate_userDefaultOutlet", defaultUserOutlet);
          commit("mutate_userLoginOutlet", defaultUserOutlet);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  setDefaultUserOutlet: ({ commit }, payload) => {
    commit("mutate_userDefaultOutlet", payload);
  },

  setLoginOutlet: ({ commit }, payload) => {
    commit("mutate_userLoginOutlet", payload);
  },

  updateOrganisationProfile: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${userUrl.updateOrgSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  updatePassword: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${userUrl.updatePasswordUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getTwoFactorStatus: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/org/${rootState.auth.auth.orgData.id}/security/2fa/status`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("SET_TWOFACTOR_STATUS", resp.data.isSetup);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  sendTwoFactor: ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/2fa/setup/otp`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };
    return axios.post(endpoint, payload, headers);
  },

  enableTwoFactor: ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/2fa/setup`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.post(endpoint, payload, headers);
  },

  disableTwofactor: ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/2fa/status/off`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.post(endpoint, payload, headers);
  },

  getSecurityQuestionsStatus: ({ rootState }) => {
    const endpoint = `${url}/org/${rootState.auth.auth.orgData.id}/security/questions/status`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.get(endpoint, headers);
  },

  enableSecurityQuestions: ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/questions/enable`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.patch(endpoint, payload, headers);
  },

  disableSecurityQuestions: ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/questions/disable`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.patch(endpoint, payload, headers);
  },

  getSecurityQuestions: ({ rootState }) => {
    const endpoint = `${url}/org/${rootState.auth.auth.orgData.id}/security/questions`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.get(endpoint, headers);
  },

  getActiveSecurityQuestions: async ({ commit, rootState }) => {
    try {
      const endpoint = `${url}/org/${rootState.auth.auth.orgData.id}/security/questions/active`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.get(endpoint, headers);
      commit("SET_ACTIVE_SECURITY_QUESTIONS", data.questions);
    } catch (err) {
      console.log(err);
    }
  },

  updateActiveSecurityQuestions: async ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/questions/active`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.patch(endpoint, payload, headers);
  },

  updateSecurityQuestionAnswer: async ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/questions/answers`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.patch(endpoint, payload, headers);
  },

  addSecurityQuestions: async ({ rootState }, payload) => {
    const endpoint = `${url}/org/security/questions`;

    const headers = {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    };

    return axios.post(endpoint, payload, headers);
  },

  createPasswordPolicy: ({ commit, rootState }, payload) => {
    const endpoint = `${url}/org/security/passwords/policy`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.patch(endpoint, payload, { headers });
  },

  getPasswordPolicy: ({ commit, rootState }) => {
    const endpoint = `${url}/org/${rootState.auth.auth.orgData.id}/security/passwords/policy`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.get(endpoint, { headers });
  },

  updateOrgEmail: ({ rootState }, payload) => {
    const endpoint = `${url}/org/update/email`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.patch(endpoint, payload, { headers });
  },

  updateOrgPhoneNo: ({ rootState }, payload) => {
    const endpoint = `${url}/org/update/phone`;

    const headers = {
      Accept: "application/json",
      authorization: `${rootState.auth.auth.token}`,
    };

    return axios.patch(endpoint, payload, { headers });
  },
  





  set_logout: async ({ commit, rootState }) => {
    try {
      const endpoint = `${url}/auth/logout`;

      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };

      await axios.post(endpoint, null, { headers });
      commit("mutate_logout");
    } catch (err) {
      console(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
