import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const crmTransactionUrl = {
  // contact transaction highlight

  contactTransactionHighlightUrl:
    "/optima/v1/invoice/volume/customer/organization/",

  // contact transaction module
  requestForQuoteUrl:
    "/optima/v1/request-for-quote/contact-transaction/organization/",
  purchaseOrderUrl:
    "/optima/v1/purchase-order/contact-transaction/organization/",
  creditNoteUrl: "/optima/v1/credit-note/contact-transaction/organization/",
  debitNoteUrl: "/optima/v1/debit-note/contact-transaction/organization/",
  goodReceivedNoteUrl: "/optima/v1/grn/contact-transaction/organization/",

  loanUrl: "/optima/v1/request-for-quote/contact-transaction/organization/",
  depositUrl: "/optima/v1/request-for-quote/contact-transaction/organization/",

  materialReturnUrl:
    "/optima/v1//material-return/contact-transaction/customer/organization/",
  wayBillUrl: "/optima/v1/waybill/contact-transaction/customer/organization/",
  quotationUrl: "/optima/v1/quote/contact-transaction/customer/organization/",
  invoiceUrl: "/optima/v1/invoice/contact-transaction/customer/organization/"
};

// /optima/v1/quote/contact-transaction/customer/organization/69b34395-39d5-4389-b403-54ad3bdc5690/org-email/ebenezer.ugo@scelloo.com/customer-email/ebenezer.ugo@scelloo.com

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  contactRequestForQuote: [],
  contactPurchaseOrder: [],
  contactQuotation: [],
  contactInvoice: [],
  contactCreditNote: [],
  contactDebitNote: [],
  contactWaybill: [],
  contactGRN: [],
  contactMaterialReturn: [],
  contactLoan: [],
  contactDeposit: [],

  contactTransactionHighlight: {
    numberOfTransaction: 0,
    transactionVolume: 0,
    totalPayableOrReceivable: 0
  }
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  getAllContactRequestForQuote: state => state.contactRequestForQuote,
  getAllContactPurchaseOrder: state => state.contactPurchaseOrder,
  getAllContactQuotation: state => state.contactQuotation,
  getAllContactInvoice: state => state.contactInvoice,
  getAllContactCreditNote: state => state.contactCreditNote,
  getAllContactDebitNote: state => state.contactDebitNote,
  getAllContactWaybill: state => state.contactWaybill,
  getAllContactGRN: state => state.contactGRN,
  getAllContactMaterialReturn: state => state.contactMaterialReturn,
  getAllContactLoan: state => state.contactLoan,
  getAllContactDeposit: state => state.contactDeposit,

  getContactTransHighlightData: state => state.contactTransactionHighlight
};

const actions = {
  getContactTransactRequestForQuote: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmTransactionUrl.requestForQuoteUrl}${rootState.auth.auth.authData.orgId}/customer-email/${payload.email}/customer-organization/`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactRequestForQuote", resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactTransactPurchaseOrder: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      commit("loading");
      axios
        .get(
          `${url}${crmTransactionUrl.purchaseOrderUrl}${rootState.auth.auth.authData.orgId}/customer-email/${payload.email}/customer-organization/`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactPurchaseOrder", resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactQuotation: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.quotationUrl}${rootState.auth.auth.authData.orgId}/org-email/${rootState.auth.auth.orgData.email}/customer-email/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactQuotation", resp.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactInvoice: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.invoiceUrl}${rootState.auth.auth.authData.orgId}/org-email/${rootState.auth.auth.orgData.email}/customer-email/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactInvoice", resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactWaybill: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.wayBillUrl}${rootState.auth.auth.authData.orgId}/org-email/${rootState.auth.auth.orgData.email}/customer-email/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactWaybill", resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactMaterialReturn: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.materialReturnUrl}${rootState.auth.auth.authData.orgId}/org-email/${rootState.auth.auth.orgData.email}/customer-email/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
          commit("mutate_contactMaterialReturn", resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactGrn: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.goodReceivedNoteUrl}${rootState.auth.auth.authData.orgId}/customer-email/${payload.email}/customer-organization/`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_contactGRN", resp.data.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getContactTransHighlight: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${crmTransactionUrl.contactTransactionHighlightUrl}${rootState.auth.auth.authData.orgId}/org-email/${rootState.auth.auth.orgData.email}/contact-email/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          // console.log(resp.data)
          commit("mutate_contactTransaction", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  loading: state => (state.loading = true),
  mutate_contactRequestForQuote: (state, payload) =>
    (state.contactRequestForQuote = payload),
  mutate_contactPurchaseOrder: (state, payload) =>
    (state.contactPurchaseOrder = payload),
  mutate_contactQuotation: (state, payload) =>
    (state.contactQuotation = payload),
  mutate_contactInvoice: (state, payload) => (state.contactInvoice = payload),
  mutate_contactCreditNote: (state, payload) =>
    (state.contactCreditNote = payload),
  mutate_contactDebitNote: (state, payload) =>
    (state.contactDebitNote = payload),
  mutate_contactWaybill: (state, payload) => (state.contactWaybill = payload),
  mutate_contactGRN: (state, payload) => (state.contactGRN = payload),
  mutate_contactMaterialReturn: (state, payload) =>
    (state.contactMaterialReturn = payload),
  mutate_contactLoan: (state, payload) => (state.contactLoan = payload),
  mutate_contactDeposit: (state, payload) => (state.contactDeposit = payload),

  mutate_contactTransaction: (state, payload) =>
    (state.contactTransactionHighlight = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
