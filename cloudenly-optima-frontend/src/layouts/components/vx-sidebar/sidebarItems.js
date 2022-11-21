export default [
  {
    url: "/dashboard/analytics",
    name: "Dashboard",
    slug: "dashboardAnalytics",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },

  {
    url: "null",
    name: "Analytics",
    slug: "analytics",
    icon: "BarChart2Icon",
    i18n: "Analytics",
    submenu: [
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

  {
    url: null,
    name: "CRM",
    slug: "",
    icon: "UsersIcon",
    i18n: "CRM",
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
        url: "/community/loyalty-promotion",
        name: "Promotions",
        slug: "",
        i18n: "Promotions",
      },

      {
        url: "/community/meeting",
        name: "Meeting",
        slug: "Meeting",
        i18n: "Meeting",
      },

      // {
      //   url: "/community/support",
      //   name: "Support & Helpdesk",
      //   slug: "",
      //   i18n: "Support & Helpdesk"
      // },
    ],
  },

  {
    url: null,
    name: "Purchase",
    slug: "PurchaseCatalogue",
    icon: "LayoutIcon",
    i18n: "Purchase",
    submenu: [
      {
        url: "/purchase/supplier/list",
        name: "Supplier",
        slug: "Suppliermanagement",
        i18n: "Supplier",
      },

      {
        url: "/catalogue/purchases/list/product&service",
        name: "Catalogue",
        slug: "PurchaseCatalogue",
        i18n: "Catalogue",
      },

      {
        url: "/purchase/purchase-requisitions",
        name: "PurchaseRequisition",
        slug: "PurchaseRequisition",
        i18n: "Purchase Requisition(PR)",
      },

      {
        url: "/purchase/purchase-request-quote",
        name: "PurchaseRequestQuote",
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

      {
        url: "/purchase/debit/note",
        name: "Debit Note",
        slug: "DebitNote",
        i18n: "Debit Note",
      },
    ],
  },

  {
    url: null,
    name: "Sales",
    slug: "SalesCatalogue",
    icon: "LayoutIcon",
    i18n: "Sales",
    submenu: [
      {
        url: "/catalogue/sales/list/product&service",
        name: "Catalogue",
        slug: "SaleCatalogue",
        i18n: "Catalogue",
      },

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
        name: "Sales Order",
        slug: "SalesOrder",
        i18n: "Sales Order",
      },

      {
        url: "/sales/sales-invoice/list",
        name: "Invoice",
        slug: "SalesInvoice",
        i18n: "Invoice",
      },

      {
        url: "/sales/sales-waybill/list",
        name: "Waybill",
        slug: "Waybill",
        i18n: "Waybill",
      },

      {
        url: "/sales/sales-credit-note/list",
        name: "Credit Note",
        slug: "CreditNote",
        i18n: "Credit Note",
      },

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
    icon: "CreditCardIcon",
    i18n: "Inventory",
    submenu: [
      {
        url: "/inventory/inventory-setup",
        name: "Outlets & Inventory Classes",
        slug: "InventorySetup",
        i18n: "Outlets & Inventory Classes",
      },
      {
        url: "/inventory/inventory-manage",
        name: "Stock Balance",
        slug: "ManageStock",
        i18n: "Stock Balance",
      },

      {
        url: "/inventory/waybill",
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
      //   url: "/inventory/job-order",
      //   name: "Job Order",
      //   slug: "JobOrder",
      //   i18n: "Job Order",
      // },

      // {
      //   url: "",
      //   name: "Pick List/Waybill",
      //   slug: "",
      //   i18n: "Pick List/Waybill",
      // },
    ],
  },

  // {
  //   url: null,
  //   name: "Production",
  //   slug: "",
  //   icon: "FileIcon",
  //   i18n: "Production",
  //   submenu: [
  //     {
  //       url: "",
  //       name: "Material Requirement Planing",
  //       slug: "",
  //       i18n: "Material Requirement Planing",
  //     },

  //     {
  //       url: "",
  //       name: "Job Order",
  //       slug: "",
  //       i18n: "Job Order",
  //     },
  //     {
  //       url: "",
  //       name: "Material Assembly",
  //       slug: "",
  //       i18n: "Material Assembly",
  //     },

  //     {
  //       url: "",
  //       name: "Material Requisition",
  //       slug: "",
  //       i18n: "Material Requisition",
  //     },

  //     {
  //       url: "",
  //       name: "Material Return",
  //       slug: "",
  //       i18n: "Material Return",
  //     },

  //     {
  //       url: "",
  //       name: "Production Closeout",
  //       slug: "",
  //       i18n: "Production Closeout",
  //     },
  //   ],
  // },

  // {
  //   url: "/finance/finance-management",
  //   name: "Finance",
  //   slug: "FinanceSideBar",
  //   icon: "BriefcaseIcon",
  //   i18n: "Finance",
  // },

  {
    url: "/payment/list",
    name: "Payment",
    icon: "PocketIcon",
    slug: "PaymentList",
    i18n: "Payment",
  },

  {
    url: null,
    name: "Accounts", 
    slug: "",
    icon: "FileIcon",
    i18n: "Accounts",
    submenu: [
      {
        url: "/accounts/chart-of-accounts",
        name: "Chart Of Accounts",
        slug: "",
        i18n: "Chart Of Accounts",
      },
      {
        url: "/accounts/expenditure-codes-and-cost-centres",
        name: "Expenditure Codes and Cost Centres",
        slug: "",
        i18n: "Expenditure Codes and Cost Centres",
      },
      // {
      //   url: "/accounts/SalesRegister",
      //   name: "Sales Register",
      //   slug: "",
      //   i18n: "Sales Register",
      // },
      {
        url: "/accounts/tax",
        name: "Tax",
        slug: "",
        i18n: "Tax",
      },
      {
        url: "/accounts/credit&debit",
        name: "Credit and Debit Accounts",
        slug: "",
        i18n: "Credit and Debit Accounts",
      },
    ],
  },

  {
    url: "/approval",
    name: "Approval Center",
    slug: "Approval",
    icon: "AnchorIcon",
    i18n: "Approval Center",
  },

  // {
  //   url: "/community/message-center",
  //   name: "Messaging Center",
  //   slug: "Approval",
  //   icon: "MessageCircleIcon",
  //   i18n: "Messaging Center",
  // },

  {
    url: "/analytics&records",
    name: "Analytics & Reports",
    slug: "Analytics",
    icon: "ActivityIcon",
    i18n: "Analytics & Report",
  },
  
];
