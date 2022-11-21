/* eslint-disable no-undef */
import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
// const url = "http://localhost:5003/cloudenly";

const inventoryUrl = {
  createInventoryTypeUrl: "/optima/v1/inventory/type/create",
  getAllInventoryTypeUrl: "/optima/v1/inventory/type/all",
  updateInventoryTypeUrl: "/optima/v1/inventory/type/update",
  deleteInventoryTypeUrl: "/optima/v1/inventory/type/delete",

  setInventoryTypeUrl: "/optima/v1/inventory/setting/set",
  getSetInventoryTypeUrl: "/optima/v1/inventory/setting/get",

  // update Inventory Item
  updateInventoryItemUrl: "/optima/v1/inventory/update/",
  updateBatchItemUrl: "/optima/v1/item/inventory/info/update",

  //Inventory Operations
  holdingInventoryUrl: "/optima/v1/inventory/all/holding-inventory",
  removeInventoryUrl: "/optima/v1/inventory/removed-inventory-item/all/",

  //
  setRemoveInventoryItemUrl: "/optima/v1/inventory/remove-from-inventory",
  addToStockUrl: "/optima/v1/inventory/add/add-to-inventory",
  issueToStockUrl: "/optima/v1/inventory/issue",
  setReOrderLevelUrl: "/optima/v1/inventory/set-reorder-level",

  reclassifyItemUrl: "/optima/v1/inventory/reclassify",
  deActiveItemUrl: "/optima/v1/inventory/deactivate-inventory-item",

  allocateToOutletUrl: "/optima/v1/inventory/reallocate-item-to-another-outlet",
  allocateToInventoryClassUrl:
    "/optima/v1/inventory/transfer/holding-to-another-type",

  otherInventoryTypeUrl: "/optima/v1/inventory/inventory-type-total-value/",

  totalInventoryUrl: "/optima/v1/inventory/total/",

  getStockGetMovementUrl: "/optima/v1/inventory/stock-movement/",

  //Top Analytics
  stockAnalyticsDataUrl: "/optima/v1/inventory/analytics/",
  getOtherInventoryValueUrl: "",

  // get inventory information
  getInventoryInfoUrl:
    "/optima/v1/item/inventory/info?variantId=",
  checkAvailabilityUrl:
    "/optima/v1/item/variant/inventory/check",
  // inventory valuation setting
  getAllInventoryValuationMethodUrl: "/optima/v1/inventory/settings/1",
  getOrgInventoryValuationMethodUrl: "/optima/v1/inventory/settings/",
  createOrgValuationMethodValueUrl: "/optima/v1/inventory/settings/create",
  updateOrgValuationMethodValueUrl: "/optima/v1/inventory/settings/update"


};

const state = {
  loading: false,

  error: false,
  successMessage: "",
  errorMessage: "",
  totalInventory: [],
  holdingInventory: [],
  removedInventory: [],
  distributedInventory: [],
  isOutletInventorySetup: false,
  inventoryType: [],
  assignInventoryClass: [],
  inventoryInfoBatch: [],
  inventoryInfoSupply: [],
  inventoryInfoStorage: [],
  checkAvailability: '',

  OutletInventoryType: [
    {
      name: "Total Inventory",
      id: null,
      slug: null,
      updatedAt: null,
      createdAt: null,
    },

    {
      name: "Holding Inventory",
      id: null,
      slug: null,
      updatedAt: null,
      createdAt: null,
    },
  ],

  otherInventoryData: [],

  stockAnalyticsData: {
    itemCategoriesCount: 0,
    itemCount: 0,
  },
  totalInventoryValue: 0,
  currentOutletInventories: [],
  otherInventoryStockValue: {},

  //inventory valuation method 

  allInventoryValuation: [],
  orgInventoryValuation: {},
};

const getters = {
  getTotalInventory: state => state.totalInventory,
  getHoldingInventory: state => state.holdingInventory,
  getRemovedInventory: state => state.removedInventory,
  getDistributedInventory: state => state.distributedInventory,

  getSetInventoryType: state => state.setInventoryType,
  // Inventory Info
  getInventoryInfoBatch: state => state.inventoryInfoBatch,
  getInventoryInfoSupply: state => state.inventoryInfoSupply,
  getInventoryInfoStorage: state => state.inventoryInfoStorage,
  getAvailability: state => state.checkAvailability,

  getIsOutletInventorySetup: state => state.isOutletInventorySetup,

  getSetOutletInventory: state => state.OutletInventoryType,

  getInventoryType: state => state.inventoryType,
  getCurrentOutletInventories: state => state.currentOutletInventories,

  getOutletInventorySet: state => state.OutletInventoryType,

  getRemoveInventory: state => state.removedInventory,
  getOtherInventoryData: state => state.otherInventoryData,
  getAssignInventoryClass: state => state.assignInventoryClass,

  getStockAnalyticsData: state => state.stockAnalyticsData,
  getTotalInventoryValue: state => state.totalInventoryValue,
  getOtherInventoryValue: state => state.otherInventoryStockValue,

  // getter for inventory valuation
  getAllInventoryValuation: state => state.allInventoryValuation,
  getOrgInventoryValuation: state => state.orgInventoryValuation
};

const mutations = {
  mutateLoading: (state) => (state.loading = true),
  mutateError: (state) => (state.error = true),
  mutateSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },
  mutateErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },
  mutateTotalInventory: (state, payload) => {
    state.totalInventory = payload;
  },
  mutateHoldingInventory: (state, payload) => {
    state.holdingInventory = payload;
  },
  mutateDistributedInventory: (state, payload) => {
    state.distributedInventory = payload;
  },
  mutateRemovedInventory: (state, payload) => {
    state.removedInventory = payload;
  },
  mutateIsOutletInventorySet: (state, payload) => {
    state.isOutletInventorySetup = payload;
  },
  mutateInventoryType: (state, payload) => {
    state.inventoryType = payload;
  },
  mutateOutletInventoryType: (state, payload) => {
    // state.OutletInventoryType.push(payload);
    state.OutletInventoryType = payload;
  },
  mutate_holdingInventory: (state, payload) => {
    state.holdingInventory = payload;
  },
  // Inventory Info
  mutate_InventoryInfoBatch: (state, payload) => {
    state.inventoryInfoBatch = payload;
  },
  mutate_InventoryInfoSupply: (state, payload) => {
    state.inventoryInfoSupply = payload;
  },
  mutate_InventoryInfoStorage: (state, payload) => {
    state.inventoryInfoStorage = payload;
  },
  mutate_checkAvailability: (state, payload) => {
    state.checkAvailability = payload;
  },
  mutate_otherInventoryData: (state, payload) => {
    state.otherInventoryData = payload;
  },
  mutateAssignInventory: (state, payload) => {
    state.assignInventoryClass = payload;
  },
  mutate_stockAnalyticsData: (state, payload) => {
    state.stockAnalyticsData = payload;
  },
  mutate_totalInventoryValue: (state, payload) => {
    state.totalInventoryValue = payload;
  },
  mutate_currentOutletInventories: (state, payload) => {
    state.currentOutletInventories = payload;
  },

  // inventory valuation method section
  mutate_allInventoryValuation: (state, payload) => {
    state.allInventoryValuation = payload
  },
  mutate_getOrgInventoryValuation: (state, payload) => {
    state.orgInventoryValuation = payload
  }
};

const actions = {
  createInventoryType: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .post(`${url}${inventoryUrl.createInventoryTypeUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("mutateSuccessMessage", resp.data.message);
          dispatch("getAllInventoryType", payload);
          dispatch("viewCurrentOutletInventoryType");
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  getAllInventoryType: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .get(
          `${url}${inventoryUrl.getAllInventoryTypeUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          // console.log(resp.data)
          commit("mutateSuccessMessage", resp.data.message);
          commit("mutateInventoryType", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  updateInventoryType: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .patch(
          `${url}${inventoryUrl.updateInventoryTypeUrl}/${payload.payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutateSuccessMessage", resp.data.message);
          dispatch("getAllInventoryType");
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  deleteInventoryType: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`
      };

      commit("mutateLoading");
      axios({
        url: `${url}${inventoryUrl.deleteInventoryTypeUrl}`,
        method: "delete",
        ...payload,
        headers
      })
        .then(resp => {
          // console.log(resp.data);
          commit("mutateSuccessMessage", resp.data.message);
          dispatch("getAllInventoryType");
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  setOutletInventory: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .post(`${url}${inventoryUrl.setInventoryTypeUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("mutateSuccessMessage", resp.data.message);
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
  updateBatchInventory: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .post(`${url}${inventoryUrl.updateBatchItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("mutateSuccessMessage", resp.data.message);
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  // get current outlet inventory class
  getOutletInventoryType: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .get(
          `${url}${inventoryUrl.getSetInventoryTypeUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          if (
            resp.data.message ===
            "You have not assigned any inventory to this outlet."
          ) {
            let newData = [
              {
                name: "Total Inventory",
                id: null,
                slug: null
              },

              {
                name: "Holding Inventory",
                id: null,
                slug: null
              }
            ];
            commit("mutateOutletInventoryType", newData);

            commit("mutateSuccessMessage", resp.data.message);
            commit("mutateIsOutletInventorySet", false);
          } else {
            commit("mutateIsOutletInventorySet", true);
            let newData = [
              {
                name: "Total Inventory",
                id: null,
                slug: null
              },

              {
                name: "Holding Inventory",
                id: null,
                slug: null
              },
              ...resp.data
            ];

            // console.log(newData);
            commit("mutateOutletInventoryType", newData);
            commit("mutateSuccessMessage", resp.data.message);
            resolve(resp);
          }
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  viewOutletInventoryType: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .get(
          `${url}${inventoryUrl.getSetInventoryTypeUrl}/${rootState.auth.auth.authData.orgId}/${payload}`,
          // `${url}${inventoryUrl.getSetInventoryTypeUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutateAssignInventory", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    })


  },

  viewCurrentOutletInventoryType: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .get(
          `${url}${inventoryUrl.getSetInventoryTypeUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_currentOutletInventories", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getHoldingInventory: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.holdingInventoryUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_holdingInventory", resp.data);
          // console.log(resp.data)
          // dispatch("viewOutletInventoryType")
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
  getInventoryInfoBatch: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getInventoryInfoUrl}${payload.variantId}&outletId=${rootState.auth.auth.authData.outletId}&inventoryInformationType=batch`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_InventoryInfoBatch", resp.data);
          // console.log(resp.data)
          resolve(resp.data);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
  getInventoryInfoStorage: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getInventoryInfoUrl}${payload.variantId}&outletId=${rootState.auth.auth.authData.outletId}&inventoryInformationType=storage`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_InventoryInfoStorage", resp.data);
          // console.log(resp.data)
          resolve(resp.data);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
  getInventoryInfoSupply: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getInventoryInfoUrl}${payload.variantId}&outletId=${rootState.auth.auth.authData.outletId}&inventoryInformationType=supply`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_InventoryInfoSupply", resp.data);
          // console.log(resp.data)
          resolve(resp.data);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
  getAvailability: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.checkAvailabilityUrl}/${payload.variantId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_checkAvailability", resp.data);
          console.log(resp.data)
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  getRemovedInventory: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.removeInventoryUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutateRemovedInventory", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  getOtherInventoryItem: ({ commit, rootState }, payload) => {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.otherInventoryTypeUrl}${payload.id}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_otherInventoryData", resp.data);
          // console.log(resp.data)
          // console.log(payload.id)
          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  addtoStock: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.addToStockUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          dispatch("getHoldingInventory");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  issueStock: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.issueToStockUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  setReoderLevel: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.setReOrderLevelUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  removeInventoryItem: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.setRemoveInventoryItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  allocateToInventoryClass: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.allocateToInventoryClassUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          dispatch("getHoldingInventory", payload);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  allocateToOutlet: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.allocateToOutletUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          dispatch("getHoldingInventory");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getTotalInventory: ({ commit, rootState, dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.totalInventoryUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          // dispatch("viewOutletInventoryType")
          dispatch("viewCurrentOutletInventoryType");
          commit("mutateTotalInventory", resp.data.result);
          commit("mutate_totalInventoryValue", resp.data.totalInventoryValue);

          resolve(resp);
        })
        .catch(err => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  reclassifyItem: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.reclassifyItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  deactiveItem: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${inventoryUrl.deActiveItemUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        })
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getStockMovement: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getStockGetMovementUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateInventoryItem: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${inventoryUrl.updateInventoryItemUrl}${payload.id}`,
          payload.data,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getHoldingInventory");
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getStockAnalyticsData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.stockAnalyticsDataUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_stockAnalyticsData", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },




  //inventory valuation method setting
  getInventoryValuationMethod: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getAllInventoryValuationMethodUrl}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_allInventoryValuation", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },


  getOrgInventoryValuationMethodSet: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${inventoryUrl.getOrgInventoryValuationMethodUrl}${rootState.auth.auth.authData.orgId}/1`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_getOrgInventoryValuation", resp.data.message);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },



  createOrgInventoryValuationMethod: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .post(`${url}${inventoryUrl.createOrgValuationMethodValueUrl}/${rootState.auth.auth.authData.orgId}/1`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data.message);
          dispatch("getAllInventoryType", payload);
          dispatch("viewCurrentOutletInventoryType");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },

  updateOrgInventoryValuationMethod: ({ commit, rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("mutateLoading");
      axios
        .patch(`${url}${inventoryUrl.updateOrgValuationMethodValueUrl}/${rootState.auth.auth.authData.orgId}/1/${payload.type}`, payload.data, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutateSuccessMessage", resp.data.message);
          dispatch("getAllInventoryType", payload);
          dispatch("viewCurrentOutletInventoryType");
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateError");
          commit("mutateErrorMessage", err.message);
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
