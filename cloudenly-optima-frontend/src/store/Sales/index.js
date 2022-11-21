import Quotation from "./Quotation/index";
import Invoice from "./Invoice/index";
import Waybill from "./waybill/index";
import Request from "./RFQ/index";
import SaleOrder from "./saleOrder/index";
import CreditNote from "./CreditNote/index";
import Pos from "./Pos"

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
    Quotation,
    Invoice,
    Waybill,
    Request,
    SaleOrder,
    CreditNote,
    Pos
  },
};
