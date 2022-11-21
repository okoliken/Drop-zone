/* eslint-disable no-undef */
import axios from "axios";
import tax from "./tax";
import itemCharacteristics from "./itemCharateristics";
import pricebook from "./pricebook";
import markupDiscount from "./markupDiscount";
import serviceItem from "./serviceItem";
import productItem from "./productItem";
import overview from "./overview";
const FileDownload = require("js-file-download");

// eslint-disable-next-line no-unused-vars
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// const url = "http://localhost:5003/cloudenly";

const catalogueUrl = {
  // Create Item
  crateCatalogueUrl: "/optima/v1/item/create",

  // create main item information
  createItemInformationUrl: "/optima/v1/item/item-information/create",

  getItemInformationUrl: "/optima/v1/get-item-information/",

  updateItemInformationUrl: "/optima/v1/item-general-information/update/",

  // create variant supplier
  createItemVariantSupplierUrl: "/optima/v1/item/variant-supplier/create",

  // create sales information
  createItemSalesInformationUrl: "/optima/v1/item/item-sale-information/create",

  // create inventory information
  createItemInventoryUrl: "/optima/v1/item/inventory-item/create",

  // create sub Item variant information //
  createItemVariantInformationUrl: "/optima/v1/item/variant/create",

  // get variant information
  getItemVariantInformationUrl: "/optima/v1/item/get-variant-information/",

  // get variant purchase information
  getItemVariantPurchaseInformationUrl: "/optima/v1/item/get/variant-supplier",

  // get variant sales information
  getItemVariantSalesInformationUrl:
    "/optima/v1/item/get-variant-sale-inventory-information/",

  // /item/get-variant-sale-inventory-information/:variantId/:orgId/:itemId

  // get variant inventory information
  getItemVariantInventoryInformationUrl:
    "/optima/v1/item/get-variant-sale-inventory-information/",

  // Get Main Purchase Item Route
  getPurchaseProductUrl: "/optima/v1/item/all/purchase/product",
  getPurchaseServiceUrl: "/optima/v1/item/all/purchase/service",

  // update variant item information
  updateVariantItemInformationUrl: "/optima/v1/variant/update/",

  // update variant purchase information
  updateVariantPurchaseInfoUrl: "/optima/v1/item/variant-supplier/update",

  // update variant sale information

  updateVariantSalesInfoUrl: "/optima/v1/item-sale-information/update/",

  // update inventory information section
  updateInventoryInformationUrl: "/optima/v1/item/inventory-item/update",

  // Get Main Sales Item Route
  getSalesProductUrl: "/optima/v1/item/all/sale/product",
  getSalesServiceUrl: "/optima/v1/item/all/sale/service",

  // Get Sale variant Route
  saleProductVariantUrl: "/optima/v1/variant/all/sale/product",
  saleServiceVariantUrl: "/optima/v1/variant/all/sale/service",

  salesRetailVariantPricebookUrl: "",
  salesWholesalesVariantPricebookUrl: "",

  // Get Purchase Variant Route
  purchaseProductVariantUrl: "/optima/v1/variant/all/purchase/product",
  purchaseServiceVariantUrl: "/optima/v1/variant/all/purchase/service",

  // Item Category Route
  createItemCategoryUrl: "/optima/v1/category/create",
  getItemCategoryUrl: "/optima/v1/category/all",
  updateCategoryUrl: "/optima/v1/category/update",
  deleteCategoryUrl: "/optima/v1/category/delete/",
  CategoryBrandUrl: "/optima/v1/brand-category/category/id/",

  // Item Brand Route
  createBrandUrl: "/optima/v1/brand/create",
  getBrandUrl: "/optima/v1/brand/all",
  updateBrandUrl: "/optima/v1/brand/update/",
  deleteBrandUrl: "/optima/v1/brand/delete/",
  brandCategoryUrl: "/optima/v1/brand-category/brand/id/",

  // sales target agent
  getAgentTargetUrl:
    "/cloudenly/accounting/v1/settings/analytics/sales-target/agent/all",
  getAgentOneTargetUrl:
    "cloudenly/accounting/v1/settings/analytics/sales-target/agent/one/:orgId/:agentId",
  createOneAgentUrl:
    "cloudenly/accounting/v1/settings/analytics/sales-target/agent/one/:orgId/:agentId",

  // sales target outlet
  getOutletTargetUrl:
    "/cloudenly/accounting/v1/settings/analytics/sales-target/outlet/all",
  getOneOutletTargetUrl:
    "/cloudenly/accounting/v1/settings/analytics/sales-target/outlet/one/:orgId/:outletId",
  createOutletUrl:
    "cloudenly/accounting/v1/settings/analytics/sales-target/outlet/one",

  // view item variant Route
  viewVariantUrl: "/optima/v1/item/one/variant",

  // update main variant
  updateMainVariantUrl: "/optima/v1/item/update/",

  // setup discount section
  // discountRateUrl: "/optima/v1/item/set-margin-and-discount-limit",
  // getDiscountRateUrl: "/optima/v1/item/get-margin-and-discount-limit/",

  // setup Item Description section
  createItemDescriptionUrl: "/optima/v1/item/characteristic/create",
  getItemDescriptionUrl: "",
  updateItemDescriptionUrl: "",
  deleteItemDescriptionUrl: "",

  // Add Variant to Variant
  addVariantToItemUrl: "/optima/v1/item/variant/create",

  // all variant
  getAllItemVariantUrl: "/optima/v1/variant/all/organization/",

  // Supplier Pricebook
  getSupplierPricebookUrl: "/optima/v1/item/get-supplier-pricebook/product",

  // sku code format setup
  skuCodeSettingUrl: "/optima/v1/auto-generated-code-setting/module-name/sku",
  getSkuCodeSetupUrl:
    "/optima/v1/auto-generated-code-setting/module-name/sku/organization/",
  generateSkuCodeUrl:
    "/optima/v1/auto-generated-code/module-name/sku/organization/",

  // get catalogue analysis
  catalogueAnalysisUrl: "/optima/v1/item/count/organization/",

  exportCatalogueUrl: "/optima/v1/item/download/sale/organization/",
  exportFormatUrl: "/optima/v1/item/download/format/",
  importCatalogueUrl: "/optima/v1/item/upload/sale/organization/"
};

const state = {
  loading: false,
  error: false,

  isItem: false,

  // discount: {},
  errorMessage: "",
  successMessage: "",

  salesProduct: [],
  salesServices: [],

  purchaseProduct: [],
  purchaseServices: [],

  purchaseProductVariant: [],
  purchaseServiceVariant: [],

  saleProductVariant: [],
  saleServiceVariant: [],

  allVariant: [],
  itemVariant: [],

  itemCategory: [],
  brandItem: [],

  outletTarget: [],
  getOneOutlet: [],
  agentTarget: [],
  getOneAgent: [],

  itemDescription: [],

  supplierPricebook: [],
  isSkuSetup: false,
  // orgDiscountMarkup: [],

  // item analysis section
  catalogueAnalysisData: {
    totalNumberOfPurchaseVariant: 0,
    totalNumberOfPurchaseService: 0,
    totalNumberOfPurchaseProduct: 0,
    totalNumberOfSaleVariant: 0,
    totalNumberOfSaleService: 0,
    totalNumberOfSaleProduct: 0,
  },

  updateVariantItemInfo: {},
};

const getters = {
  // this for sale main variant
  getallSaleProduct: (state) => state.salesProduct,
  getallSaleService: (state) => state.salesServices,
  getallSales: (state) => [...state.salesProduct, ...state.salesServices],

  // this for purchase main variant
  getallPurchaseProduct: (state) => state.purchaseProduct,
  getallPurchaseService: (state) => state.purchaseServices,
  getallPurchase: (state) => [
    ...state.productsProduct,
    ...state.productsServices,
  ],

  // this for purchase variant items
  getAllPurchaseProductVariant: (state) => state.purchaseProductVariant,
  getAllPurchaseServiceVariant: (state) => state.purchaseServiceVariant,
  getAllPurchaseVariant: (state) => [
    ...state.purchaseProductVariant,
    ...state.purchaseServiceVariant,
  ],

  // this for sales varaint items
  getAllSaleProductVariant: (state) => state.saleProductVariant,
  getAllSaleServiceVariant: (state) => state.saleServiceVariant,
  getAllSaleVariant: (state) => [
    ...state.saleProductVariant,
    ...state.saleServiceVariant,
  ],

  getAllVariant: (state) => state.allVariant,
  getAllBrand: (state) => state.brandItem,
  getAllItemCategory: (state) => state.itemCategory,
  getalloutletTarget: (state) => state.outletTarget,
  getallagenttarget: (state) => state.agentTarget,
  // getOneaAgent: (state) => state.agentTarget,

  isItemSetup: (state) => state.isItem,

  getItemVariant: (state) => state.itemVariant,

  // getIsDiscountSetup: (state) => state.isDiscountSetup,
  // getDiscountRate: (state) => state.discount,
  getItemDescription: (state) => state.itemDescription,

  // get supplier pricebook
  getSupplierPriceBook: (state) => state.supplierPricebook,
  getIsSkuSetup: (state) => state.isSkuSetup,

  // catalogue analysis
  getCatalogAnalysisData: (state) => state.catalogueAnalysisData,

  getUpdateVariantItemInfo: (state) => state.updateVariantItemInfo,
};

const mutations = {
  loading: (state) => {
    state.loading = true;
  },

  mutateSalesProduct: (state, payload) => {
    state.salesProduct = payload;
  },

  mutateSalesService: (state, payload) => {
    state.salesServices = payload;
  },

  mutatePurchaseProduct: (state, payload) => {
    state.purchaseProduct = payload;
  },

  mutatePurchaseService: (state, payload) => {
    state.purchaseServices = payload;
  },

  mutate_saleProductVariant: (state, payload) => {
    state.saleProductVariant = payload;
  },

  mutate_saleServiceVariant: (state, payload) => {
    state.saleServiceVariant = payload;
  },

  mutate_purchaseProductVariant: (state, payload) => {
    state.purchaseProductVariant = payload;
  },

  mutate_purchaseServiceVaraint: (state, payload) => {
    state.purchaseServiceVariant = payload;
  },

  mutateErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },

  mutateError: (state) => {
    state.error = true;
  },

  mutateSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  mutateBrand: (state, payload) => {
    state.brandItem = payload;
  },

  mutateOutletTarget: (state, payload) => {
    state.outletTarget = payload;
  },

  mutateAgentTarget: (state, payload) => {
    state.agentTarget = payload;
  },

  mutateItemCategory: (state, payload) => {
    state.itemCategory = payload;
  },

  isItemSetUp: (state) => {
    state.isItem = true;
  },

  mutate_itemVariant: (state, payload) => {
    state.itemVariant = payload;
  },

  mutate_allVariant: (state, payload) => {
    state.allVariant = payload;
  },

  mutate_item_description: (state, paylaod) => {
    state.itemDescription = paylaod;
  },

  mutate_supplierPricebook: (state, payload) => {
    state.supplierPricebook = payload;
  },

  mutate_isSkuSetup: (state, payload) => {
    state.isSkuSetup = payload;
  },

  mutate_catalogueAnalysis: (state, payload) => {
    state.catalogueAnalysisData = payload;
  },

  mutate_updateVariantItemInfo: (state, payload) =>
    (state.updateVariantItemInfo = payload),
};

const actions = {
  createCatalogue: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${catalogueUrl.crateCatalogueUrl}/${payload.queryInfo.module}/${payload.queryInfo.group}`,
          payload.dataPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          dispatch("getAllPurchaseProduct");
          dispatch("getAllPurchaseService");
          dispatch("getAllSalesProduct");
          dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // create item information
  createItemInformationCatalogue: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${catalogueUrl.createItemInformationUrl}/${payload.queryInfo.module}/${payload.queryInfo.group}`,
          payload.dataPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          // dispatch("getAllPurchaseProduct");
          // dispatch("getAllPurchaseService");
          // dispatch("getAllSalesProduct");
          // dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  //get Item Information
  getItemInformation: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getItemInformationUrl}${payload.itemId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  updateItemInformation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${catalogueUrl.updateItemInformationUrl}${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          // dispatch("getAllPurchaseProduct");
          // dispatch("getAllPurchaseService");
          // dispatch("getAllSalesProduct");
          // dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // create purchase information
  createSupplierVariant: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${catalogueUrl.createItemVariantSupplierUrl}`,
          payload.variantSupplierPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          // dispatch("getAllPurchaseProduct");
          // dispatch("getAllPurchaseService");
          // dispatch("getAllSalesProduct");
          // dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // create sale information
  createSaleInformation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${catalogueUrl.createItemSalesInformationUrl}`,
          payload.salesPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          // dispatch("getAllPurchaseProduct");
          // dispatch("getAllPurchaseService");
          // dispatch("getAllSalesProduct");
          // dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // create inventory information
  createInventoryItem: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(
          `${url}${catalogueUrl.createItemInventoryUrl}`,
          payload.inventoryPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          // dispatch("getAllPurchaseProduct");
          // dispatch("getAllPurchaseService");
          // dispatch("getAllSalesProduct");
          // dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // create sub variant item information
  createSubItemVariantInformation: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${catalogueUrl.createItemVariantInformationUrl}/${payload.queryInfo}`,
          payload.dataPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // get variant information
  getItemVariantInformation: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getItemVariantInformationUrl}${payload.variantId}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // get purchase variant information
  getPurchaseVariantInformation: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getItemVariantPurchaseInformationUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload.variantId}/${payload.itemId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // get sale and inventory variant information

  getSalesVariantInformation: ({ commit, rootState }, payload) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getItemVariantSalesInformationUrl}${payload.variantId}/${rootState.auth.auth.authData.orgId}/${payload.itemId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // update variant item information
  updateItemVariantInformation: ({ commit, rootState }, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${catalogueUrl.updateVariantItemInformationUrl}${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // update purchase information section   updateVariantPurchaseInfoUrl

  updateVariantPurchaseInformation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(`${url}${catalogueUrl.updateVariantPurchaseInfoUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  //update sales information section

  // eslint-disable-next-line no-unused-vars
  updateVariantSalesInformation: ({ commit, rootState }, payload) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${catalogueUrl.updateVariantSalesInfoUrl}${payload.queryInfo.itemId}/${payload.queryInfo.variantId}`,
          payload.salesPayload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // update Inventory information  updateInventoryInformationUrl
  updateInventoryInformation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(`${url}${catalogueUrl.updateInventoryInformationUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getAllPurchaseProduct: ({ commit, rootState }) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getPurchaseProductUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutatePurchaseProduct", resp.data.item);
          commit("isItemSetUp");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getAllPurchaseService: ({ commit, rootState }) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getPurchaseServiceUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          commit("mutatePurchaseService", resp.data.item);
          commit("isItemSetUp");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getAllSalesProduct: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${catalogueUrl.getSalesProductUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSalesProduct", resp.data.item);
          commit("isItemSetUp");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getAllSalesServices: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${catalogueUrl.getSalesServiceUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateSalesService", resp.data.item);
          commit("isItemSetUp");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // Sale Variant Section
  getSalesProductItemVariant: ({ commit, rootState, dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.saleProductVariantUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_saleProductVariant", resp.data);
          dispatch("getSalesServiceItemVariant");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSalesServiceItemVariant: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.saleServiceVariantUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_saleServiceVariant", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Purchase Variant Section

  getAllPurchaseVariant: ({ dispatch }) => {
    dispatch("getPurchaseProductItemVariant");
    dispatch("getPurchaseServiceItemVariant");
  },

  getPurchaseProductItemVariant: ({ commit, dispatch, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.purchaseProductVariantUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          commit("mutate_purchaseProductVariant", resp.data);
          dispatch("getPurchaseServiceItemVariant");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPurchaseServiceItemVariant: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.purchaseServiceVariantUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          //  console.log(resp.data)
          commit("mutate_purchaseServiceVaraint", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // All Variant
  getAllCatalogueVariant: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getAllItemVariantUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_allVariant", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  //  Brand Section
  getAllBrand: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${catalogueUrl.getBrandUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          commit("mutateBrand", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },


  updateBrand: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${catalogueUrl.updateBrandUrl}${payload.id}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllBrand");
          resolve(resp);
        })
        .catch((err) => {
          // console.log(err)
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  deleteBrand: ({ dispatch, rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${catalogueUrl.deleteBrandUrl}${payload.id}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllBrand");
          resolve(resp);
        })
        .catch((err) => {
          // console.log(err)
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getBrandCategory: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${catalogueUrl.brandCategoryUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // End Brand Section

  //  get outlet target 
  getAllOutletTarget: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `http://18.169.96.80:5010${catalogueUrl.getOutletTargetUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          commit("mutateOutletTarget", resp.data.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  // agent target
  getAllAgentTarget: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `http://18.169.96.80:5010${catalogueUrl.getAgentTargetUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          commit("mutateAgentTarget", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },


  createBrand: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${catalogueUrl.createBrandUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          dispatch("getAllBrand", payload);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },


  //  Item Category Section
  getAllItemCategory: ({ commit, rootState }) => {
    commit("loading");
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getItemCategoryUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateItemCategory", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  createItemCategory: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${catalogueUrl.createItemCategoryUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data);
          dispatch("getAllItemCategory", payload);
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  updateCategory: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${catalogueUrl.updateCategoryUrl}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllItemCategory");
          resolve(resp);
        })
        .catch((err) => {
          // console.log(err)
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  deleteCategory: ({ dispatch, commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${catalogueUrl.deleteCategoryUrl}${payload.id}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllItemCategory");
          resolve(resp);
        })
        .catch((err) => {
          // console.log(err)
          commit("mutateError");
          commit("mutateErrorMessage", err);
          reject(err);
        });
    });
  },

  getCategoryBrand: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${catalogueUrl.CategoryBrandUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //End Item Category Section

  //  variant section
  getItemVariant: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.viewVariantUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_itemVariant", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateMainVariant: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${catalogueUrl.updateMainVariantUrl}${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllPurchaseProduct");
          dispatch("getAllPurchaseService");
          dispatch("getAllSalesProduct");
          dispatch("getAllSalesServices");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSupplierPricebook: ({ commit, rootState }, payload) => {
    new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getSupplierPricebookUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_supplierPricebook", resp.data);
          resolve(resp);
        })
        .then((err) => {
          reject(err);
        });
    });
  },

  // sku code  setting
  createSkuCode: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${catalogueUrl.skuCodeSettingUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getSkuCode");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSkuCode: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.getSkuCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data)
          if (
            resp.data.message ===
            "Code setting do not exist for this organization or module."
          ) {
            commit("mutate_isSkuSetup", false);
          } else {
            commit("mutate_isSkuSetup", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("mutate_isSkuSetup", false);
          reject(err);
        });
    });
  },

  getGenerateSkuCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${catalogueUrl.generateSkuCodeUrl}${rootState.auth.auth.authData.orgId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // get catalogue analysis data
  getCatalogueAnalyticsData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.catalogueAnalysisUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp)
          commit("mutate_catalogueAnalysis", resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  exportCatalogue: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.exportCatalogueUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          },
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          FileDownload(resp.data, "catalogue.csv");
          commit("mutate_catalogueAnalysis", resp.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  exportTemplateCatalogue: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${catalogueUrl.exportFormatUrl}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          },
          {
            responseType: "blob",
          }
        )
        .then((resp) => {
          FileDownload(resp.data, "catalogue.csv");

          commit("mutate_catalogueAnalysis", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  importCatalogue: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${url.importCatalogueUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  setVariantItemInfo: ({ commit }, payload) => {
    commit("mutate_updateVariantItemInfo", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    tax,
    itemCharacteristics,
    pricebook,
    markupDiscount,
    serviceItem,
    productItem,
    overview
  },
};
