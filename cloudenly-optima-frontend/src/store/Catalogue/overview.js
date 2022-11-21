import axios from "axios";
import setEnv from "../../utils/setEnv";

const url = setEnv(process.env).quantumServiceURL;
const catalogueOverviewUrl = {

    getCatalogueByVariantsActionUrl: "/optima/v1/overview/catalogue/variant",
    getCatalogueByCategoryActionUrl: "/optima/v1/overview/catalogue/category",
    getCatalogueByBrandActionUrl: "/optima/v1/overview/catalogue/brand",
    getCatalogueByPurchaseActionUrl: "/optima/v1/overview/catalogue/purchase",
    getCatalogueBySaleActionUrl: "/optima/v1/overview/catalogue/sale",
    getCatalogueByInventoryActionUrl: "/optima/v1/overview/catalogue/inventory",

  
};

const state = {
    loading: false,
    error: false,

    catalogueByVariants: [],
    catalogueByCategory: [],
    catalogueByBrand: [],
    catalogueByPurchase: [],
    catalogueBySale: [],
    catalogueByInventory: [],

};

const getters = {
    getAllCatalogueByVariants: state => state.catalogueByVariants,
    getAllCatalogueByCategory: state => state.catalogueByCategory,
    getAllCatalogueByBrand: state => state.catalogueByBrand,
    getAllCatalogueByPurchase: state => state.catalogueByPurchase,
    getAllCatalogueBySale: state => state.catalogueBySale,
    getAllCatalogueByInventory: state => state.catalogueByInventory,

  
};

const mutations = {
    mutate_all_catalogue_variation: (state, payload) => (state.catalogueByVariants = payload),
    mutate_all_catalogue_category: (state, payload) => (state.catalogueByCategory = payload),
    mutate_all_catalogue_brand: (state, payload) => (state.catalogueByBrand = payload),
    mutate_all_catalogue_purchase: (state, payload) => (state.catalogueByPurchase = payload),
    mutate_all_catalogue_sale: (state, payload) => (state.catalogueBySale = payload),
    mutate_all_catalogue_inventory: (state, payload) => (state.catalogueByInventory = payload),
  
};

// Catalogue Overview

const actions = {

    getAllCatalogueByVariants: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueByVariantsActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
        );
        commit("mutate_all_catalogue_variation", data);
    },

    getAllCatalogueByCategory: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueByCategoryActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
        );
        commit("mutate_all_catalogue_category", data);
    },

    getAllCatalogueByBrand: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueByBrandActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
            headers: {
                Accept: "application/json",
                authorization: `${rootState.auth.auth.token}`
            }
        }
        );
        commit("mutate_all_catalogue_brand", data);
    },

    getAllCatalogueByPurchase: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueByPurchaseActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
            headers: {
                Accept: "application/json",
                authorization: `${rootState.auth.auth.token}`
            }
        }
        );
        commit("mutate_all_catalogue_purchase", data);
    },

    getAllCatalogueBySale: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueBySaleActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
            headers: {
                Accept: "application/json",
                authorization: `${rootState.auth.auth.token}`
            }
        }
        );
        commit("mutate_all_catalogue_sale", data);
    },

    getAllCatalogueByInventory: async ({ commit, rootState }) => {
        const { data } = await axios.get(
        `${url}${catalogueOverviewUrl.getCatalogueByInventoryActionUrl}?outletId=${rootState.auth.auth.authData.outletId}&orgId=${rootState.auth.auth.authData.orgId}`,
        {
            headers: {
                Accept: "application/json",
                authorization: `${rootState.auth.auth.token}`
            }
        }
        );
        commit("mutate_all_catalogue_inventory", data);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
