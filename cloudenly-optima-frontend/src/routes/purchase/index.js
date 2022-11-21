// supplier mgt
const SupplierManagement = () =>
  import("@/views/apps/purchase/supplierMgt/index.vue");
const supplierPriceDetail = () =>
  import(
    "@/views/apps/purchase/supplierMgt/supplier/SupplierPricebook/supplierPriceDetails.vue"
  );
const createSupplier = () =>
  import("@/views/apps/purchase/supplierMgt/supplier/addSupplier.vue");

const supplierDetail = () =>
  import(
    "@/views/apps/purchase/supplierMgt/supplier/supplierDetail/viewSupplier.vue"
  );

//Purchase Requisition
import purchaseRequisitions from "./purchaseRequisitions";


// Purchase Request for Quotation
const PurchaseRequestQuotes = () => import("@/views/apps/purchase/RFQ");
const PurchaseRequestQuote = () =>import("@/views/apps/purchase/RFQ/requestQuote.vue");
// const GenerateRequestQuotePr = () =>import("@/views/apps/purchase/RFQ/GenerateQuote_Pr.vue");
const viewRequestQuote = () => import("@/views/apps/purchase/RFQ/ViewRequestQuote.vue");

// Purchase Order
const PurchaseOrders = () => import("@/views/apps/purchase/purchaseOrder");
const PurchaseOrder = () =>
  import("@/views/apps/purchase/purchaseOrder/purchaseOrder");

const GeneratePurchaseOrderPr = () =>
  import("@/views/apps/purchase/purchaseOrder/GeneratePO_Pr");
const SupplierPurchaseOrder = () =>
  import("@/views/apps/purchase/purchaseOrder/SupplierPurchaseOrder");
const viewPurchaseOrder = () =>
  import("@/views/apps/purchase/purchaseOrder/viewPurchaseOrder.vue");

// Purchase Proforma
const PurchaseProforma = () =>
  import("@/views/apps/purchase/ProformaQuote/purchaseProforma.vue");
const ViewPurchaseProforma = () =>
  import("@/views/apps/purchase/ProformaQuote/viewRecieveProforma");

// Purchase Invoice
const PurchaseInvoice = () =>
  import("@/views/apps/purchase/Invoice/purchaseInvoice.vue");
const PurchaseRecurringInvoice = () =>
  import("@/views/apps/purchase/Invoice/recurringInvoice.vue");
const ViewPurchaseInvoice = () =>
  import("@/views/apps/purchase/Invoice/viewReceivedInvoice.vue");

// Debit Note
const DebitNote = () => import("@/views/apps/purchase/debitNote/debitNote.vue");
const CreateDebitNote = () =>
  import("@/views/apps/purchase/debitNote/CreateDebitNote");

// const DebitNoteInvoice = () => import("@/app/components/SoloDashboard/Purchase/DebitNote/DebitNoteInvoice.vue")
// const CreateInvoiceDebitNote = () => import("@/app/components/SoloDashboard/Purchase/DebitNote/CreateInvoiceDebitNote")
// const EditDebitNote = () => import("@/app/components/SoloDashboard/Purchase/DebitNote/EditDebtNote")

export default [
  // suppler Mgt

  {
    path: "/purchase/supplier/list",
    name: "SupplierManagement",
    component: SupplierManagement,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "SRM",
        },
        {
          title: "Supplier Engagement",
          active: true,
        },
      ],
      // pageTitle: "SRM"
    },
  },

  {
    path: "/purchase/supplier/add",
    name: "createSupplier",
    component: createSupplier,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "SRM",
        },
        {
          title: "Create Supplier",
          active: true,
        },
      ],
      // pageTitle: "SRM"
    },
  },

  {
    path: "/purchase/:id/supplier",
    name: "supplierDetail",
    component: supplierDetail,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "SRM",
        },
        {
          title: "Supplier ",
          active: true,
        },
      ],
      // pageTitle: "SRM"
    },
  },

  {
    path: "/purchase/supplier-pricebook/:id/price-details",
    name: "supplierPriceDetail",
    component: supplierPriceDetail,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Supplier Pricebook",
        },
        {
          title: "Supplier Detail",
          active: true,
        },
      ],
      pageTitle: "Supplier Price Detail",
    },
  },

  // Purchase Requisition
  ...purchaseRequisitions,

  // {
  //   path: "/purchase/purchase-requisition/:id/preview",
  //   name: "PreviewPurchaseRequisition",
  //   component: PreviewPurchaseRequisition,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/",
  //       },
  //       {
  //         title: "Requisition",
  //       },
  //       {
  //         title: "View Requisition",
  //         active: true,
  //       },
  //     ],
  //     pageTitle: "View Requisition",
  //   },
  // },

  // Request for Quote
  {
    path: "/purchase/purchase-request-quote",
    name: "PurchaseRequestQuotes",
    component: PurchaseRequestQuotes,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Quotation",
        },
        {
          title: " Request for Quotation",
          active: true,
        },
      ],
      pageTitle: "RFQ",
    },
  },

  {
    path: "/purchase/purchase-request-quote/create",
    name: "CreateRequestQuote",
    component: PurchaseRequestQuote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Create Quotation",
        },
        {
          title: " Create Quotation",
          active: true,
        },
      ],
      pageTitle: "RFQ",
    },
  },

  {
    path: "/purchase/purchase-request-quote/:id",
    name: "RequestQuote",
    component: PurchaseRequestQuote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Update Quotation",
        },
        {
          title: " Update Quotation",
          active: true,
        },
      ],
      pageTitle: "Update Quotation",
    },
  },

  {
    path: "/purchase/purchase-request-quote/:id/view",
    name: "viewRequestQuote",
    component: viewRequestQuote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Request for Quote",
        },
        {
          title: " View RFQ",
          active: true,
        },
      ],
      pageTitle: "View RFQ",
    },
  },

  // {
  //   path: "/purchase/purchase-request-quote/:id/generate-rfq-pr",
  //   name: "GenerateRequestQuotePr",
  //   component: GenerateRequestQuotePr,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/",
  //       },
  //       {
  //         title: "Request for Quote",
  //       },
  //       {
  //         title: " Generate RFQ",
  //         active: true,
  //       },
  //     ],
  //     pageTitle: "Generate RFQ",
  //   },
  // },

  

  // Purchase Proforma
  {
    path: "/purchase/purchase-proforma/list",
    name: "PurchaseProforma",
    component: PurchaseProforma,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Supplier Quote",
        },
        {
          title: "Supplier Quote",
          active: true,
        },
      ],
      pageTitle: "Supplier Quote",
    },
  },

  {
    path: "/purchase/purchase-proforma/:id/received",
    name: "ViewPurchaseProforma",
    component: ViewPurchaseProforma,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Supplier Quote",
        },
        {
          title: "View Supplier Quote",
          active: true,
        },
      ],
      pageTitle: "Supplier Quote",
    },
  },

  // Purchase Order
  {
    path: "/purchase/purchase-orders",
    name: "PurchaseOrders",
    component: PurchaseOrders,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "Purchase Order",
          active: true,
        },
      ],
      pageTitle: "Purchase Order",
    },
  },

  {
    path: "/purchase/purchase-order/create",
    name: "CreatePurchaseOrder",
    component: PurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "Create Purchase Order",
          active: true,
        },
      ],
      pageTitle: " Create Purchase Order",
    },
  },

  {
    path: "/purchase/purchase-order/:id",
    name: "PurchaseOrder",
    component: PurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "Update Purchase Order",
          active: true,
        },
      ],
      pageTitle: " Update Purchase Order",
    },
  },

  {
    path: "/purchase/purchase-order/:id/generate-purchase-order/pr",
    name: "GeneratePurchaseOrderPr",
    component: GeneratePurchaseOrderPr,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "Generate Purchase Order (PR)",
          active: true,
        },
      ],
      pageTitle: " Generate Purchase Order",
    },
  },

  {
    path:
      "/purchase/purchase-order/:id/generate-purchase-order/supplier_pricebook",
    name: "SupplierPurchaseOrder",
    component: SupplierPurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "Generate Purchase Order (Pricebook)",
          active: true,
        },
      ],
      pageTitle: " Generate Purchase Order",
    },
  },

  {
    path: "/purchase/purchase-order/:id/preview",
    name: "viewPurchaseOrder",
    component: viewPurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Order",
        },
        {
          title: "View Purchase Order",
          active: true,
        },
      ],
      pageTitle: "View Purchase Order",
    },
  },

  // Purchase Invoice
  {
    path: "/purchase/purchase-invoice/list",
    name: "PurchaseInvoice",
    component: PurchaseInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Invoice",
        },
        {
          title: "Purchase Invoice",
          active: true,
        },
      ],
      pageTitle: "Purchase Invoice",
    },
  },

  // Purchase Recurring Invoice
  {
    path: "/purchase/purchase-invoice/recurring/list",
    name: "PurchaseRecurringInvoice",
    component: PurchaseRecurringInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Recurring Invoice",
        },
        {
          title: "Recurring Invoice",
          active: true,
        },
      ],
      pageTitle: "Recurring Invoice",
    },
  },

  {
    path: "/purchase/purchase-invoice/:id/preview",
    name: "ViewPurchaseInvoice",
    component: ViewPurchaseInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "View Invoice",
        },
        {
          title: "View Invoice",
          active: true,
        },
      ],
      pageTitle: " Purchase Invoice",
    },
  },

  // Debit Note
  {
    path: "/purchase/debit/note",
    name: "DebitNote",
    component: DebitNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "DebitNote",
        },
        {
          title: "DebitNote",
          active: true,
        },
      ],
      pageTitle: "DebitNote",
    },
  },

  {
    path: "/purchase/debit/note/create/:id",
    name: "CreateDebitNote",
    component: CreateDebitNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "DebitNote",
        },
        {
          title: "Create DebitNote",
          active: true,
        },
      ],
      pageTitle: "Create DebitNote",
    },
  },
];
