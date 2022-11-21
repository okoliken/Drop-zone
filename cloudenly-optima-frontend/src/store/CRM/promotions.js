import axios from "axios";

// import setEnv from "../../utils/setEnv";
// const url = setEnv(process.env).quantumServiceURL;
const url = 'http://18.132.188.41:5011';

const promotionUrl = {
  getPromotionUrl: "/cloudenly/loyalty/v1/promos/all/", 
  getSinglePromotionUrl: "/cloudenly/loyalty/v1/promos/one/",
  createPromotionUrl: "/cloudenly/loyalty/v1/promos/one",
  deletePromotionUrl: "/cloudenly/loyalty/v1/promos/one/",
  updatePromotionUrl: "/cloudenly/loyalty/v1/promos/one/",
  sharePromotionUrl: "/cloudenly/loyalty/v1/promos/share",
  createDraftPromoUrl: "/cloudenly/loyalty/v1/promos/draft/",
  processPromoUrl: "/cloudenly/loyalty/v1/promos/process-draft/",
  suspendPromoUrl: "/cloudenly/loyalty/v1/promos/suspend/",
  resumePromoUrl: "/cloudenly/loyalty/v1/promos/resume/",
  restartPromoUrl: "/cloudenly/loyalty/v1/promos/restart/",
  statsPromoUrl: "/cloudenly/loyalty/v1/promos/stats/"
};

const state = {
  isLoading: false,
  isErorr: false,
  isPromotionSetup: false,
  promotions: [],
  promotionStat: [],
  onePromo :[]
};

const getters = {
  getisPromotionSetup: state => state.isPromotionSetup,
  getPromotions: state => state.promotions,
  getPromotionStat: state => state.promotionStat,
  getOnePromo: state => state.onePromo
};

const actions = {
  createPromotion: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("isLoading");
      axios
        .post(`${url}${promotionUrl.createPromotionUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("mutate_isPromotionSetup");
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          commit("isError"), console.log(err);
          reject(err);
        });
    });
  },

  createDraftPromotion: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("isLoading");
      axios
        .post(`${url}${promotionUrl.createDraftPromoUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          commit("isError"), console.log(err);
          reject(err);
        });
    });
  },

  getPromotion: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("isLoading");
      axios
        .get(
          `${url}${promotionUrl.getPromotionUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_promotion", resp.data.data);
          // if (state.promotions.length > 0) {
          commit("mutate_isPromotionSetup");
          // }
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          commit("isError");
          reject(err);
        });
    });
  },

  getPromotionStat: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${promotionUrl.statsPromoUrl}${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_stats", data.data);
  },

  getSinglePromotion: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("isLoading");
      axios
        .get(
          `${url}${promotionUrl.getSinglePromotionUrl}${rootState.auth.auth.authData.orgId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit( "mutate_onePromo", resp.data.promo); 
          // if (state.promotions.length > 0) {
          commit("mutate_isPromotionSetup");
          // }
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          commit("isError");
          reject(err);
        });
    });
  },
  suspendPromotion: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${promotionUrl.suspendPromoUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getPromotion");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  resumePromotion: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${promotionUrl.resumePromoUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,

          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          dispatch("getPromotion");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  restartPromotion: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      let data = {
        payload: {
          startDate: payload.startDate,
          endDate: payload.endDate
        }
      };
      axios
        .patch(
          `${url}${promotionUrl.restartPromoUrl}${rootState.auth.auth.authData.orgId}/${payload.promoId}`,
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
          dispatch("getPromotion");
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deletePromotion: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      axios
        .delete(
          `${url}${promotionUrl.deletePromotionUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            },
            data: payload
          }
        )
        .then(resp => {
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),

  updatePromotion: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${promotionUrl.updatePromotionUrl}${rootState.auth.auth.authData.orgId}/${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),

  sharePromotion: ({ dispatch, rootState }, payload) => {
    console.log(payload);

    return new Promise((resolve, reject) => {
      let data = {
        contactCategory: payload.contactCategories,
        loyaltyId: payload.loyaltyIds
      };
      
      axios
        .post(
          `${url}${promotionUrl.sharePromotionUrl}/${rootState.auth.auth.authData.orgId}/${payload.promoId}`,
          data,

          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  processPromotion: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${promotionUrl.processPromoUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,

          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getPromotion");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  mutate_promotion: (state, payload) => {
    state.promotions = payload;
  },
  mutate_stats: (state, payload) => {
    state.promotionStat = payload;
  },
  mutate_isPromotionSetup: state => {
    state.isPromotionSetup = true;
  },
  mutate_onePromo: state => {
    state.onePromo = true;
  },

  isLoading: state => (state.isLoading = true),
  isError: state => (state.isErorr = true)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
