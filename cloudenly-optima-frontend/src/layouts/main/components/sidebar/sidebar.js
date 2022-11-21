/* eslint-disable no-unused-vars */
import image_dashboard from "@/assets/images/optimaAsset/sidebar/dashboard.svg";
import image_customer_management from "@/assets/images/optimaAsset/sidebar/customer_management.svg";
import image_purchases from "@/assets/images/optimaAsset/sidebar/purchases.svg";
import image_sales from "@/assets/images/optimaAsset/sidebar/sales.svg";
import image_payments from "@/assets/images/optimaAsset/sidebar/payments.svg";

import image_inventory from "@/assets/images/optimaAsset/sidebar/inventory.svg";
import image_accounts from "@/assets/images/optimaAsset/sidebar/accounts.svg";
import image_analytics from "@/assets/images/optimaAsset/sidebar/analytics.svg";

import image_approval_center from "@/assets/images/optimaAsset/sidebar/approval_center.svg";
import image_catalogue from "@/assets/images/optimaAsset/sidebar/catalogue.svg";


// import image_production from "@/assets/images/optimaAsset/sidebar/production.svg";

export default [

  {
    url: "/dashboard/analytics",
    name: "Dashboard",
    slug: "dashboardAnalytics",
    icon: image_dashboard,
    i18n: "Dashboard",
  },




  {
    url: null,
    name: "CRM",
    slug: "crm",
    icon: image_customer_management,
    i18n: "CRM",
    hide: true,
    submenu: [
      {
        url: "/cloudenly/registration",
        name: "Customer Registration",
        slug: "",
        i18n: "Customer Registration",
      },

      {
        url: "/cloudenly/crm",
        name: "Customer Engagement",
        slug: "crmApp",
        i18n: "Customer Engagement",
      },

      {
        url: "/community/pipeline-management",
        name: "Pipeline Management",
        slug: "",
        i18n: "Pipeline Management",
      },

      {
        url: "/community/loyalty",
        name: "Loyalty",
        slug: "",
        i18n: "Loyalty",
      },
    ],
  },


  {
    url: null,
    name: "Catalogue",
    slug: "PurchaseCatalogue",
    icon: image_catalogue,
    i18n: "Catalogue",
    hide: true,
    submenu: [
      {
        url: "/catalogue/item",
        name: "Catalogue Overview",
        slug: "",
        i18n: "Catalogue Overview",
      },

    ],
  },


  {
    url: null,
    name: "Purchase",
    slug: "PurchaseCatalogue",
    icon: image_purchases,
    i18n: "Purchase",
    hide: true,
    submenu: [
      {
        url: "/purchase/supplier/list",
        name: "Supplier",
        slug: "SupplierManagement",
        i18n: "Supplier",
      },

      // {
      //   url: "/catalogue/purchases/list/product&service",
      //   name: "Catalogue",
      //   slug: "PurchaseCatalogue",
      //   i18n: "Catalogue",
      // },

      {
        url: "/purchase/purchase-requisitions",
        name: "Purchase Requisition",
        slug: "PurchaseRequisition",
        i18n: "Purchase Requisition(PR)",
      },

      {
        url: "/purchase/purchase-request-quote",
        name: "Request for Quote",
        slug: "PurchaseRequestQuote",
        i18n: "Request for Quote (RFQ)",
      },

      {
        url: "/purchase/purchase-proforma/list",
        name: "Quote",
        slug: "PurchaseProforma",
        i18n: "Quote",
      },

      {
        url: "/purchase/purchase-orders",
        name: "Purchase Order",
        slug: "PurchaseOrder",
        i18n: "Purchase Order (PO)",
      },

      {
        url: "/purchase/purchase-invoice/list",
        name: "Invoice",
        slug: "PurchaseInvoice",
        i18n: "Invoice",
      },

      //   {
      //     url: "/purchase/debit/note",
      //     name: "Debit Note",
      //     slug: "DebitNote",
      //     i18n: "Debit Note",
      //   },
    ],
  },

  {
    url: null,
    name: "Sales",
    slug: "SalesCatalogue",
    icon: image_sales,
    i18n: "Sales",
    hide: true,
    submenu: [


      {
        url: "/catalogue/pricebook",
        name: "Pricebook",
        slug: "Pricebook",
        icon: "BookOpenIcon",
        i18n: "Pricebook",
      },

      {
        url: "/sales/sales-request/list",
        name: "Request for Quote",
        slug: "SalesRequisition",
        i18n: "Request for Quote (RFQ)",
      },

       {
        url: "/sales/sales-proforma/list",
        name: "Quote",
        slug: "ProformaQuote",
        i18n: "Quote",
      },


      {
        url: "/sales/sales-purchase-order/list",
        name: "Purchase Order",
        slug: "PurchaseOrder",
        i18n: "Purchase Order (PO)",
      },

      {
        url: "/sales/sales-invoice/list",
        name: "Invoice",
        slug: "SalesInvoice",
        i18n: "Invoice",
      },

      {
        url: "/sales/pos-sales-register/",
        name: "POS Sales ",
        slug: "POS_SalesRegister",
        i18n: "POS_SalesRegister",
      },


      {
        url: "",
        name: "Sales Order",
        slug: "SalesOrder",
        i18n: "Sales Order",
      },


      {
        url: "/waybill",
        name: "Waybill",
        slug: "Waybill",
        i18n: "Waybill",
      },


      {
        url: "/community/loyalty-promotion",
        name: "Promotions",
        slug: "Promotions",
        i18n: "Promotions",
      },




      // {
      //   url: "/sales/sales-credit-note/list",
      //   name: "Credit Note",
      //   slug: "CreditNote",
      //   i18n: "Credit Note",
      // },


      // {
      //   url: "/sales/inventory/stock/transaction",
      //   name: "Stock Transaction",
      //   slug: "",
      //   i18n: "Stock Transaction",
      // },
    ],
  },

  {
    url: null,
    name: "Inventory",
    slug: "",
    icon: image_inventory,
    i18n: "Inventory",
    hide: true,
    submenu: [
      // {
      //   url: "/inventory/inventory-setup",
      //   name: "Outlets & Inventories",
      //   slug: "InventorySetup",
      //   i18n: "Outlets & Inventories",
      // },
      {
        url: "/inventory/inventory-manage",
        name: "Stock Balance",
        slug: "ManageStock",
        i18n: "Stock Balance",
      },

      {
        url: "/waybill",
        name: "Waybill",
        slug: "Waybill",
        i18n: "Waybill",
      },

      {
        url: "/inventory/good-received-notes",
        name: "Goods Received Note",
        slug: "GoodReceiveNote",
        i18n: "Goods Received Note",
      },

      {
        url: "/inventory/material-request",
        name: "Material Request",
        slug: "MaterialRequest",
        i18n: "Material Request",
      },

      {
        url: "/inventory/material-return",
        name: "Material Return",
        slug: "MaterialReturn",
        i18n: "Material Return",
      },

      // {
      //   url: "/inventory/stock/transaction",
      //   name: "Stock Transaction",
      //   slug: "",
      //   i18n: "Stock Transaction",
      // },

      // {
      //   url: "/inventory/inventory-withdraw",
      //   name: "Stock Withdraw",
      //   slug: "StockWithdraw",
      //   i18n: "Stock Withdraw",
      // },

      // {
      //   url: "",
      //   name: "Pick List/Waybill",
      //   slug: "",
      //   i18n: "Pick List/Waybill",
      // },
    ],
  },

  {
    url: null,
    name: "Payments",
    slug: "payments",
    icon: image_payments,
    i18n: "Payments",
    hide: true,
    submenu: [
      {
        url: "/payments/overview",
        name: "Dashboard",
        slug: "paymentsOverview",
        i18n: "paymentsOverview",
      },

      {
        url: "/payments/direct-debits",
        name: "Payment",
        slug: "directDebits",
        i18n: "directDebits",
      },
      {
        url: "/payments/supplier-list",
        name: "Supplier Lists",
        slug: "supplierLists",
        i18n: "supplierLists",
      },

      {
        url: "/payments/collections",
        name: "Collections",
        slug: "collections",
        i18n: "collections",
      },
    ],
  },

  {
    url: null,
    name: "Accounts",
    slug: "Accounts",
    icon: image_accounts,
    i18n: "Accounts",
    hide: true,
    submenu: [
      {
        url: "/accounts/chart-of-accounts",
        name: "Chart Of Accounts",
        slug: "",
        i18n: "Chart Of Accounts",
      },
      {
        url: "/accounts/ExpenditureRegister",
        name: "Expenditure Register",
        slug: "",
        i18n: "Expenditure Register",
      },
      {
        url: "/accounts/RevenueRegister",
        name: "Revenue Register",
        slug: "",
        i18n: "Revenue Register",
      },
      {
        url: "/accounts/SalesRegister",
        name: "Sales Register",
        slug: "",
        i18n: "Sales Register",
      },
      {
        url: "/accounts/incomeStatement",
        name: "Income Statement",
        slug: "",
        i18n: "Income Statement",
      },
      {
        url: "/accounts/tax",
        name: "Tax",
        slug: "",
        i18n: "Tax",
      },
      // {
      //   url: "/accounts/credit&debit",
      //   name: "Credit and Debits",
      //   slug: "",
      //   i18n: "Credit and Debits",
      // },
    ],
  },



  {
    url: null,
    name: "Approval",
    slug: "Approval",
    icon: image_approval_center,
    i18n: "Approval",
    hide: true,
    submenu: [
      {
        url: "/approval/requests",
        name: "My Requests",
        slug: "requests",
        i18n: "Requests",
      },
      {
        url: "/approval/myapprovals",
        name: "My Approvals",
        slug: "inprogress",
        i18n: "In progress",
      },

    ],
  },


  {
    url: null,
    name: "Analytics",
    slug: "analytics",
    icon: image_analytics,
    i18n: "Analytics",
    hide: true,
    submenu: [
      {
        url: "/analytics/crm",
        name: "CRM",
        slug: "crm",
        i18n: "crm",
      },

      {
        url: "/analytics/purchase",
        name: "Purchase",
        slug: "purchase",
        i18n: "Purchase",
      },

      {
        url: "/analytics/sales",
        name: "Sales",
        slug: "sales",
        i18n: "Sales",
      },

      {
        url: "/analytics/inventory",
        name: "Inventory",
        slug: "inventory",
        i18n: "Inventory",
      },
    ],
  },
];
