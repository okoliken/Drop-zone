import contact from "./contact";
import loyalty from "./loyalty";
import promotions from './promotions'
import pipeline from "./pipeline"
import contactTransaction from './contactTransaction'
import message from './messaging'
import markupDiscount from '../Catalogue/markupDiscount'

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
     contact,
     loyalty,
     promotions,
     pipeline,
     contactTransaction,
     message,
     markupDiscount
    }
};



