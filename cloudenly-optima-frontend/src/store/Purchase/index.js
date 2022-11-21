import Requisition from "./Requisition/index";
import RequestQuote from './Requestquote/index';
import PurchaseOrder from './purchaseOrder/index';
import Quotation from './Quotation/index.js'
import Invoice from  './Invoice/index'
import DebitNote from "./DebitNote/index"



const state = {

};

const getters = {

}

const actions = {


};



const mutations = {


};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
    Requisition,
    RequestQuote,
    PurchaseOrder,
    Quotation,
    Invoice,
    DebitNote
    }
};


