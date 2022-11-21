
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'



import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import moduleAuth from "./auth/index";
import moduleCrm from "./CRM/index";
import moduleCatalogue from "./Catalogue/index";
import moduleInventory from "./Inventory/inventoryModule";
import modulePurchase from './Purchase/index';
import moduleSales from "./Sales/index"
import moduleCalendar from './calendar/moduleCalendar.js'
import moduleUserOutlet from "./users&outlet/index"
import moduleMessageCenter from "./MessageCenter/index"
import moduleApproval from './approval/index.js'
import modulePayment from "./payment/index"
import moduleAccounting from "./accounting/index"
import moduleAnalytics from "./analytics/index"

Vue.use(Vuex);


export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'optimaState',
      // getState: key => Cookies.getJSON(key),
      // setState: (key, state) => Cookies.set(key, state, { expires: 14 }),
      paths: ['auth']
    })
  ],
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    crm: moduleCrm,
    catalogue: moduleCatalogue,
    inventory: moduleInventory,
    purchase: modulePurchase,
    sales: moduleSales,
    calendar: moduleCalendar,
    userOutlet: moduleUserOutlet,
    messageCenter: moduleMessageCenter,
    approval: moduleApproval,
    payment: modulePayment,
    accounting: moduleAccounting,
    analytics : moduleAnalytics
  },
  strict: process.env.NODE_ENV !== "production"
});
