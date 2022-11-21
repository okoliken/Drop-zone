import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
// const url = 'http://localhost:5003/cloudenly'
const MarkupDiscountUrl = {
  getAllMarkupDiscountUrl: "/optima/v1/markup-discount/all",
  getOneMarkupDiscountUrl: "/optima/v1/markup-discount/one",
  createMarkupDiscountUrl: "/optima/v1/markup-discount/create",
  deleteMarkupDiscountUrl: "/optima/v1/markup-discount/one",
  updateMarkupDiscountUrl: "/optima/v1/markup-discount/one"
};

const state = {
  loading: false,
  error: false,
  isMarkupDiscountSetup: false,
  allMarkupDiscount: [],
  serviceMarkupDiscount: [],
  retailMarkupDiscount : [],
  wholesaleMarkupDiscount : [],
  outletDiscount: []

};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  getIsMarkupDiscountSetup: state => state.isMarkupDiscountSetup,
  getAllMarkupDiscount: state => state.allMarkupDiscount,
  getOneMarkupDiscount: state => state.allMarkupDiscount,
  getServiceMarkupDiscount : state => state.serviceMarkupDiscount,
  getRetailMarkupDiscount : state => state.retailMarkupDiscount,
  getWholesaleMarkupDiscount :  state => state.wholesaleMarkupDiscount,
  getOutletDiscountMarkup :  state => state.outletDiscount,



};

const mutations = {
  loading: state => {
    state.loading = true;
  },
  mutate_error: (state, payload) => {
    state.error = payload;
  },
  mutate_allMarkupDiscount: (state, payload) => {
    state.allMarkupDiscount = payload;
  },
  mutate_allServiceMarkupDiscount: (state, payload) => {
    state.serviceMarkupDiscount = payload;
  },
  mutate_isMarkupDiscountSetup: state => {
    state.isMarkupDiscountSetup = true;
  },
  mutate_oneMarkupDiscount: (state, payload) => {
    state.allMarkupDiscount = payload;
  }
};

const actions = {

  getAllMarkupDiscount: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${MarkupDiscountUrl.getAllMarkupDiscountUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_allMarkupDiscount", resp.data.data);
          commit("mutate_isMarkupDiscountSetup");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },


  getAllServiceMarkupDiscountAction: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${MarkupDiscountUrl.getAllMarkupDiscountUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_allServiceMarkupDiscount", resp.data.data);
          commit("mutate_isMarkupDiscountSetup");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },



  getOneMarkupDiscount: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${MarkupDiscountUrl.getOneMarkupDiscountUrl}/${rootState.auth.auth.authData.orgId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_allMarkupDiscount", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createMarkupDiscount: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${MarkupDiscountUrl.createMarkupDiscountUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          dispatch("getAllMarkupDiscount");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  deleteMarkupDiscount: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      // console.log(payload)
      axios
        .delete(
          `${url}${MarkupDiscountUrl.deleteMarkupDiscountUrl}/${rootState.auth.auth.authData.orgId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getAllMarkupDiscount");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),

  updateMarkupDiscount: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      console.log(payload.id, 'test payload id')
      axios
        .patch(
          `${url}${MarkupDiscountUrl.updateMarkupDiscountUrl}/${rootState.auth.auth.authData.orgId}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getAllMarkupDiscount");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),


    
  getOutletServiceMarkupDiscount: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${MarkupDiscountUrl.getOneMarkupDiscountUrl}?orgId=${rootState.auth.auth.authData.orgId}&itemType=service*saleType=null&outletId=${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          // commit("mutate_allMarkupDiscount", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
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
  mutations
};


