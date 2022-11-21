import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const productItemUrl = {
    getProductGroupItemUrl: "/optima/v1/item/all/sale/",
    getProductItemDetailUrl: "/optima/v1/item/all/sale/detail",
    itemAnalysisUrl: "/optima/v1/item/catalogue/count"
};


const state = {
    loading: false,
    error: false,
    isProductItemCreated: false,
    productGroupItem: [],
    productDetailsItem: [],
    analysisData: {},

};

const getters = {
    getProductGroupItem: state => state.productGroupItem,
    getProductDetailItem: state => state.productDetailsItem,
    getItemAnalysisData: state => state.analysisData,

};


const mutations = {
    loading: (state) => (state.loading = true),
    error: (state) => (state.error = true),
    isProductItemCreated: (state) => (state.isProductItemCreated = true),
    setProductGroupItem: (state, payload) => (state.productGroupItem = payload),
    setProductDetailItem: (state, payload) => (state.productDetailsItem = payload),
    setItemAnalysisData: (state, payload) => (state.analysisData = payload),
};

const actions = {

    getProductGroupActionOrganization: ({ commit, rootState }) => {
        commit("loading");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${url}${productItemUrl.getProductGroupItemUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
                    {
                        headers: {
                            Accept: "application/json",
                            authorization: `${rootState.auth.auth.token}`,
                        },
                    }
                )
                .then((resp) => {
                    resolve(resp);
                    // console.log(resp.data.item, 'here now')
                    commit("setProductGroupItem", resp.data.item);

                
                })
                .catch((err) => {
                    commit("error");
                    reject(err);
                });
        });
    },

    getProductDetailsActionOrganization: ({ commit, rootState }) => {
        commit("loading");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${url}${productItemUrl.getProductItemDetailUrl}?orgId=${rootState.auth.auth.authData.orgId}&outletId=${rootState.auth.auth.authData.outletId}&pageNo=1&noOfRows=20`,
                    {
                        headers: {
                            Accept: "application/json", 
                            authorization: `${rootState.auth.auth.token}`,
                        },
                    }
                )
                .then((resp) => {
                    resolve(resp);
                    // console.log(resp.data.variants)
                    commit("setProductDetailItem", resp.data.variants);              
                })
                .catch((err) => {
                    commit("error");
                    reject(err);
                });
        });
    },


    getItemAnalysisData: ({ commit, rootState }) => {
        commit("loading");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${url}${productItemUrl.itemAnalysisUrl}?orgId=${rootState.auth.auth.authData.orgId}&outletId=${rootState.auth.auth.authData.outletId}`,
                    {
                        headers: {
                            Accept: "application/json", 
                            authorization: `${rootState.auth.auth.token}`,
                        },
                    }
                )
                .then((resp) => {
                    resolve(resp);
                    commit("setItemAnalysisData", resp.data);              
                })
                .catch((err) => {
                    commit("error");
                    reject(err);
                });
        });
    },


};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
