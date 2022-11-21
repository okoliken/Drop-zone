import paymentSetting from "./paymentSetting"
import collection from "./collection"
import collectionTransactions from "./collectionTransactions"
import collectionAssociation  from "./collectionAssociation";

const state = {};

const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    paymentSetting,
    collection,
    collectionTransactions,
    collectionAssociation,
  },
};
