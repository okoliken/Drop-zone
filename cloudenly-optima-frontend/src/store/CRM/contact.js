import axios from "axios";
const FileDownload = require("js-file-download");
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const crmUrl = {
  getallContact: "/crm/v1/contact/all/customer",
  getSupplierContactUrl: "/crm/v1/contact/all/supplier",
  updateContactUrl: "/crm/v1/contact/update",
  createNetWorkUrl: "/crm/v1/contact/add",
  singleNetworkUrl: "/crm/v1/contact/one",
  getContactUrl:
    "/crm/v1/contact/get-contact-without-loyalty-id",

  // contact graph analysis
  contactAnalysisUrl: "/crm/v1/contact/graph/",

  // is contact code setup
  getContactCodeSetupUrl: "/crm/v1/contact/setting/code/",
  createContactCodeUrl: "/crm/v1/contact/setting/code/save",
  getGenerateContactCodeUrl: "/crm/v1/generate-code",

  // expose pricebook
  exposePricebookUrl: "/crm/v1/contact/expose/pricebook",

  // Restriction Settings
  setRestrictionUrl: "/crm/v1/contact/restriction-setting/save",
  getRestrictionUrl: "/crm/v1/contact/restriction-setting/",

  // To get contact pricebook
  getContactProductPricebookUrl:
    "/optima/v1/item/get-customer-pricebook/product/",
  getContactServicePricebookUrl:
    "/optima/v1/item/get-customer-pricebook/service/",

  // bulk crm action
  blacklistCustomerUrl: "/crm/v1/contact/suspend",
  setLoyaltyCustomerUrl: "/crm/v1/loyalty-scheme/bulk/update",
  getallBlacklistUrl: "/crm/v1/contact/suspended/all/customer/",
  getSupplierBlackListUrl: "/crm/v1/contact/suspended/all/supplier/",

  // Get Optima Account
  getBusinessUrl: "/org/all/optima/accounts/",

  // Setting:  Set Preferred Location for Crm Contact
  setContactLocationUrl: "/crm/v1/contact/setting/location/save",
  getContactLocationUrl: "/crm/v1/contact/setting/location/",

  // import & export crm
  importCustomerCrmUrl: "/crm/v1/contact/upload/customer/",
  exportCustomerCrmUrl: "/crm/v1/contact/download/customer/",

  // import & Export Supplier
  importSupplierUrl: "/crm/v1/contact/download/supplier/",
  exportSupplierUrl: "/crm/v1/contact/download/supplier/",

  // dual category customer to supplier
  customerToSupplierUrl: "/crm/v1/contact/category/supplier/contact/",

  // dual category customer to supplier
  supplierToCustomerUrl: "/crm/v1/contact/category/customer/contact/",

  // get if a contact is a dual category
  getContactIsDualCategoryUrl: "/crm/v1/contact/one/category/",

  // get analytics data for contact
  getContactAnalyticsUrl: "/crm/v1/contact/total/organization/",

  templateCsvUrl: "/crm/v1/contact/download/format",

  contactInvoiceItemUrl:
    "/optima/v1/item/get-customer-pricebook-with-promo/organization/",
};

const state = {
  loading: false,
  error: false,
  isCodeSetup: false,
  isCustomer: false,
  isSupplier: false,

  errorMessage: "",
  successMessage: "",

  allContact: [],
  contact: [],
  contacts: [],

  singleContact: {
    id: "",
    category: "",
    kind: "",
    contactCategory: null,
    code: "",
    contactOrgId: "",
    name: "",
    gender: "",
    profile: "",
    industrySector: "",
    productServiceInterest: "",
    address: "",
    location: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    contactPerson: "",
    phone: "",
    email: "",
    birthday: "",
    taxSettings: "",
    taxId: "",
    registrationNumber: "",
    discountList: false,
    bankName: null,
    accountName: null,
    accountNumber: null,
    sendPromoAlert: true,
    isSuspended: false,
    loyaltySchemeId: "",
    loyaltyCommencementDate: "",
    isSuspendedFromLoyalty: false,
    makeNetworkPublic: true,
    exposePricebook: false,
    variantsDiscount: null,
    isRestricted: true,
    accountManager: [],
    accountManagers: [],
    manageException: [],
    createdDate: "",
    createdAt: "",
    updatedAt: "",
    loyaltyScheme: {},
  },

  allSupplierContact: [],
  contactGraph: [],
  contactCode: [],
  contactProductPricebook: [],
  contactServicePricebook: [],
  blacklistCustomer: [],
  supplierBlackList: [],
  contactInvoiceItems: [],
  contactLocation: {},
  contactAnalyticData: {
    customer: {
      totalBlacklistedContacts: 0,
      totalContacts: 0,
      totalCustomers: 0,
      totalLeads: 0,
      totalWhitelistedContacts: 0,
    },
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    supplier: {
      totalSuppliers: 0,
      totalIndustrySector: 0,
      totalSpecialization: 0,
      totalBlacklistedSuppliers: 0,
      totalWhitelistedSuppliers: 0,
    },
  },
};

const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,

  allContact: (state) => state.allContact,
  contact: (state) => state.contact,
  getContact: (state) => state.contacts,

  singleContact: (state) => state.singleContact,
  getSupplierContact: (state) => state.allSupplierContact,
  getContactGraph: (state) => state.contactGraph,
  getYearContactGraph: (state) => {

    if (!state.contactGraph.series) {
      return [
        {
          name: "current year",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    } else {
      let data = state.contactGraph.series[0]
      return [
        {
          name: "current year",
          data: data.data
        }
      ]
    }

  },

  getLastYearContactGraph: (state) => {

    if (!state.contactGraph.series) {
      return [
        {
          name: "Last year",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    } else {
      let data = state.contactGraph.series[1]
      return [
        {
          name: "Last year",
          data: data.data
        }
      ]
    }

  },
  getIsCodeSetup: (state) => state.isCodeSetup,
  getCode: (state) => state.contactCode,
  getContactProductPricebook: (state) => state.contactProductPricebook,
  getContactServicePricebook: (state) => state.contactServicePricebook,
  getBlacklistContact: (state) => state.blacklistCustomer,
  getSupplierBlacklist: (state) => state.supplierBlackList,
  getIsCustomer: (state) => state.isCustomer,
  getIsSupplier: (state) => state.isSupplier,
  getLocationSet: (state) => state.contactLocation,
  getContactAnalyticData: (state) => state.contactAnalyticData,
  getContactInvoiceItems: (state) => state.contactInvoiceItems,
};

const mutations = {
  loading: state => {
    state.loading = true;
  },

  getallContact: (state, payload) => {
    state.allContact = payload;
  },

  getallSupplierContact: (state, payload) => {
    state.allSupplierContact = payload;
  },

  getSingleContact: (state, payload) => {
    state.singleContact = payload;
  },

  edit_contact: (state, payload) => {
    state.singleContact[payload.key] = payload.value;
  },
  getErrorMessage: (state, payload) => {
    state.errorMessage = payload;
  },
  mutate_contact: (state, payload) => {
    state.contacts = payload;
  },
  getSuccessMessage: (state, payload) => {
    state.successMessage = payload;
  },

  mutateContactGraph: (state, payload) => {
    state.contactGraph = payload;
  },

  mutateIsContactCodeSetup: (state, payload) => {
    state.isCodeSetup = payload;
  },

  mutateContactCode: (state, payload) => {
    state.contactCode = payload;
  },

  mutateContactProductPricebook: (state, payload) => {
    state.contactProductPricebook = payload;
  },

  mutateContactServicePricebook: (state, payload) => {
    state.contactServicePricebook = payload;
  },

  mutate_blacklist_contact: (state, payload) => {
    state.blacklistCustomer = payload;
  },

  mutate_blacklist_supplier: (state, payload) => {
    state.supplierBlackList = payload;
  },

  error: state => {
    state.error = true;
  },

  mutate_isCustomer: (state, payload) => {
    state.isCustomer = payload;
  },

  mutate_isSupplier: (state, payload) => (state.isSupplier = payload),

  mutate_contactLocation: (state, payload) => (state.contactLocation = payload),

  mutate_contactAnalytic: (state, payload) =>
    (state.contactAnalyticData = payload),

  mutate_contactInvoiceItem: (state, payload) =>
    (state.contactInvoiceItems = payload),

  mutate_contacts: (state, payload) => (state.contact = payload)
};

const actions = {
  createNewContact: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${crmUrl.createNetWorkUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // commit("getSuccessMessage", resp.data.response.message);
          dispatch("getAllContact");
          dispatch("getAllSupplierContact");
          resolve(resp);
        })
        .catch((err) => {
          // console.log(err)
          // commit("error");
          // commit("getErrorMessage", err);
          reject(err);
        });
    });
  },
  getContact: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${crmUrl.getContactUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_contacts", data);
  },

  getAllContact: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getallContact}/${rootState.auth.auth.authData.orgId
          }/${rootState.auth.auth.authData.creatorId
          }/?pageNo=${payload?.currentPage || 1}&noOfRows=${payload?.perPage ||
          10}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getContactAnalysis");
          dispatch("getContactAnalyticsData");
          if (resp.data.contacts.length === 0) {
            commit("mutate_isCustomer", false);
          } else {
            commit("mutate_isCustomer", true);
            dispatch("getContactAnalysis");
            commit("getallContact", resp.data.contacts);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  allContact: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getallContact}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.contacts.length === 0) {
            commit("mutate_isCustomer", false);
          } else {
            commit("mutate_isCustomer", true);
            commit("mutate_contact", resp.data.contacts);
          }
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getAllSupplierContact: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getSupplierContactUrl}/${rootState.auth.auth.authData.orgId
          }/${rootState.auth.auth.authData.creatorId
          }/?pageNo=${payload?.currentPage || 1}&noOfRows=${payload?.perPage ||
          20}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.contacts.length === 0) {
            commit("mutate_isSupplier", false);
          } else {
            commit("mutate_isSupplier", true);
            commit("getallSupplierContact", resp.data.contacts);
            resolve(resp);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          commit("error");
          commit("getErrorMessage", err);
        });
    });
  },

  getContactAnalysis: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.contactAnalysisUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateContactGraph", resp.data.yearPlot);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getSingleContact: async ({ commit, rootState }, payload) => {
    try {
      const resp = await axios.get(
        `${url}${crmUrl.singleNetworkUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${payload}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        }
      );
      commit("getSingleContact", resp.data.contact);
    } catch (err) {
      console.log(err);
      commit("error");
      commit("getErrorMessage", err);
      // reject(err);
    }
  },

  updateContact: ({ commit, rootState, dispatch }, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(`${url}${crmUrl.updateContactUrl}/${payload.id}`, payload.data, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getSingleContact", payload.id);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  // contact code section

  checkCodeIsSetup: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getContactCodeSetupUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data.setting)
          if (resp.data.setting) {
            commit("mutateContactCode", resp.data);
            commit("mutateIsContactCodeSetup", true);
          } else {
            commit("mutateIsContactCodeSetup", false);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("mutateIsContactCodeSetup", false);

          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  createCode: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${crmUrl.createContactCodeUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("checkCodeIsSetup");
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          reject(err);
        });
    });
  },

  getGenerateContactCode: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${crmUrl.getGenerateContactCodeUrl}`, payload, {
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

  exposePricebook: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .patch(
          `${url}${crmUrl.exposePricebookUrl}/${payload.id}`,
          payload.data,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getSingleContact", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  setRestriction: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .post(`${url}${crmUrl.setRestrictionUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getContactRestriction", payload.payload.contactId);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getContactRestriction: ({ commit, dispatch, rootState }, payload) => {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(`${url}${crmUrl.getRestrictionUrl}${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getSingleContact", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getContactProductPricebook: ({ commit, dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getContactProductPricebookUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateContactProductPricebook", resp.data);
          dispatch("getContactServicePricebook", payload);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  getContactServicePricebook: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmUrl.getContactServicePricebookUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutateContactServicePricebook", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          commit("error");
          commit("getErrorMessage", err);
          reject(err);
        });
    });
  },

  bulkBlacklistCustomer: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}${crmUrl.blacklistCustomerUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllContact");
          dispatch("getBlacklistCustomer");
          dispatch("getSupplierBlacklist");
          dispatch("getAllSupplierContact");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  bulkSetLoyaltyCustomer: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${crmUrl.setLoyaltyCustomerUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getAllContact", payload);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getBlacklistCustomer: ({ dispatch, rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getallBlacklistUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_blacklist_contact", resp.data.contacts);
          dispatch("getAllContact");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSupplierBlacklist: ({ dispatch, commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getSupplierBlackListUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_blacklist_supplier", resp.data.contacts);
          dispatch("getAllContact");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getBusinessData: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${crmUrl.getBusinessUrl}${payload}`, {
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

  // Setting for contact preference Location Setting
  getContactSetLocation: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getContactLocationUrl}${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_contactLocation", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  saveContactLocation: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${crmUrl.setContactLocationUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getContactSetLocation");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  importContact: ({ dispatch, rootState }, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${crmUrl.importCustomerCrmUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((resp) => {
          dispatch("getAllContact");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  exportContact: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.exportCustomerCrmUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
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
          FileDownload(resp.data, "customer.csv");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  importSupplier: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${crmUrl.importSupplierUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllContact");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  exportSupplier: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.exportSupplierUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}`,
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
          FileDownload(resp.data, "supplier.csv");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getContactAnalyticsData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getContactAnalyticsUrl}${rootState.auth.auth.authData.orgId}/creator/${rootState.auth.auth.authData.creatorId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_contactAnalytic", resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCsvTemplate: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.templateCsvUrl}`,
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
          FileDownload(resp.data, "template.csv");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getContactInvoiceItemAction: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.contactInvoiceItemUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}/contact/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data[0])
          commit("mutate_contactInvoiceItem", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getContactUpdateInvoiceItemAction: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.contactInvoiceItemUrl}${rootState.auth.auth.authData.orgId}/outlet/${rootState.auth.auth.authData.outletId}/creator/${rootState.auth.auth.authData.creatorId}/contact/${payload.contactId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_contactInvoiceItem", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateCustomerToSupplier: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${crmUrl.customerToSupplierUrl}${payload}`, {
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

  updateSupplierToCustomer: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${crmUrl.supplierToCustomerUrl}${payload}`, {
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

  getContactIsDualCategory: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmUrl.getContactIsDualCategoryUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.creatorId}/${payload}`,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
