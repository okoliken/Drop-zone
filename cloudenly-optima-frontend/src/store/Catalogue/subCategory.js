import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const subCategoryUrl = {
    createSubCategoryUrl: "/optima/v1/sub-category/create/",
    getSubCategoryUrl: "/optima/v1/sub-category/all/",
};

const state = {
    loading: false,
    error: false,
    getSubCategory: [],
};

const getters = {
    getSubCategory: state => state.getSubCategory,
};

const mutations = {
    loading: (state) => (state.loading = true),
    error: (state) => (state.error = true),
    mutate_subCategory: (state, payload) => (state.getSubCategory = payload),
};

const actions = {
    getSubCategory: ({ rootState, commit }) => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${url}${subCategoryUrl.getSubCategoryUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
                    {
                        headers: {
                            Accept: "application/json",
                            authorization: `${rootState.auth.auth.token}`,
                        },
                    }
                )
                .then((resp) => {
                    commit("mutate_retailDiscount", resp.data);
                    resolve(resp);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    createSubCategory: ({ rootState, dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${url}${subCategoryUrl.createSubCategoryUrl}/`,
                    payload,
                    {
                        headers: {
                            Accept: "application/json",
                            authorization: `${rootState.auth.auth.token}`,
                        },
                    }
                )
                .then((resp) => {
                    dispatch("getRetailDiscount");
                    resolve(resp);
                })
                .catch((err) => {
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
