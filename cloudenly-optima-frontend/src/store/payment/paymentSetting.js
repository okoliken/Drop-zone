import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const paymentSettingUrl = {
  bankListUrl: "/payments/v1/banks",
  verifyAccountNumberUrl: "/payments/v1/banks/verify/",
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  bankList: [],
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  getBankList: (state) => state.bankList,
};

const actions = {
  getListOfBank: async ({ commit, rootState }) => {
    const { data } = await axios.get(`${url}${paymentSettingUrl.bankListUrl}`, {
      headers: {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      },
    });
    let newData = data.data
    newData.pop()
    commit("mutate_bankList", newData);
  },

  getVerifyAccNumber: async ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
       .get(
         `${url}${paymentSettingUrl.verifyAccountNumberUrl}${payload.bankCode}/${payload.accountNumber}`,
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
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutate_bankList: (state, payload) => {
    state.bankList = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
