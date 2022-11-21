// sales Catalogue
// const SalesCatalogue = () => import("../views/apps/sales/salecatalogue/salesCatalogue.vue");
// const CreateSalesItem = () => import("../views/apps/sales/salecatalogue/createSalesItem.vue");


//Sales Requisition Rfq
const SalesRequisition = () => import("../views/apps/sales/salesRequisition/salesRequisition.vue");
const ViewSalesRequisition = () => import("@/views/apps/previewDocs/receivedDocs.vue");



 
// Sales Request for Quote
// const PurchaseRequestQuote = () => import("../views/apps/purchase/RFQ/requestQuote.vue")


// Sales Proforma
const ProformaQuote = () => import("../views/apps/sales/salesProforma/salesProforma.vue");
const CreateProforma = () =>  import("../views/apps/sales/salesProforma/CreateProforma");
const EditProforma = () => import("../views/apps/sales/salesProforma/EditProforma")



// const ProformaList = () => import("../views/apps/Sales/Proforma/ProformaList")
// const ProformaRegister = () => import("../views/apps/Sales/Proforma/ProformaRegister");
// const PurchaseProforma = () => import("../views/apps/Sales/Proforma/PurchaseProforma")
const GenerateQuoteRFQ = () => import("../views/apps/sales/salesProforma/generateQuote_RFQ")



// Purchase Order
const SalesPurchaseOrder = () => import("../views/apps/sales/salesPurchaseOrder/salesPurchaseOrder.vue");
const ViewSalesPurchaseOrder = () => import("../views/apps/sales/salesPurchaseOrder/viewSalesOrder.vue")


// Sales Invoice
const Invoice = () => import("../views/apps/sales/invoice/saleInvoice/allInvoice")

// const SaleInvoice = () => import("../views/apps/sales/invoice/saleInvoice/salesInvoice.vue");
const CreateInvoice =  () => import("../views/apps/sales/invoice/saleInvoice/crudInvoice");
const EditInvoice = () => import("../views/apps/sales/invoice/saleInvoice/EditInvoice");
const GenerateInvoiceQuotation = () => import("../views/apps/sales/invoice/saleInvoice/generateInvoiceFromProforma.vue");

const GenerateInvoiceRFQ = () => import( "../views/apps/sales/invoice/saleInvoice/GenerateInvoice_RFQ");
const GenerateInvoicePurchaseOrder = () => import( "../views/apps/sales/invoice/saleInvoice/PurchaseOrderInvoice.vue");



//  create recurring invoice
const CrudRecurringInvoice = () => import("../views/apps/sales/invoice/recurringInvoice/createRecurringInvoice.vue");
const EditRecurringInvoice = () => import("../views/apps/sales/invoice/recurringInvoice/EditRecurringInvoice.vue");



// sales Rental Invoice 
const CrudRentalInvoice = () => import("../views/apps/sales/invoice/rentalInvoice/CreateRentalInvoice.vue");
const EditRentalInvoice = () => import("../views/apps/sales/invoice/rentalInvoice/EditRentalInvoice.vue")

//material request and return from waybil
const WaybillMaterialRequest = () => import("../views/apps/Waybill/waybillMaterialRequest.vue")
const WaybillMaterialReturn = () => import("../views/apps/Waybill/waybillMaterialReturn.vue")
const UseWaybillMaterialRequest = () => import("../views/apps/Waybill/useMaterialRequestWaybill.vue")
const UseWaybillMaterialReturn = () => import("../views/apps/Waybill/useMaterialReturnWaybill.vue");


// Waybill
// const  Waybill = () => import("../views/apps/sales/Waybill/Waybill.vue");
// const CreateWaybill = () => import("../views/apps/sales/Waybill/CreateWaybill");
// const GenerateWaybillQuotation = () => import("../views/apps/sales/Waybill/CreateWaybillQuotation")
// const GenerateWaybillInvoice = () => import("../views/apps/sales/Waybill/createWaybillInvoice")
// const CreateWaybillPO = () => import("../views/apps/sales/Waybill/CreateWaybill_PO")
// const EditWaybill = () => import("../views/apps/sales/Waybill/editWaybill")



// Credit Note
const CreditNote = () => import("../views/apps/sales/CreditNote/CreditNoteList.vue");
const CreateCreditNote = () => import("../views/apps/sales/CreditNote/CreateCreditNote");
// const EditCreditNote = () => import("../views/apps/sales/CreditNote/EditCreditNote")
// const CreditNoteInvoice = () => import("../views/apps/sales/CreditNote/CreditNoteInvoice")
const CreateInvoiceCreditNote = () => import("../views/apps/sales/CreditNote/CreateInvoiceCreditNote")

// discount and sales markup
// const MarkupDiscount = () => import("../views/apps/sales/markupDiscount/MarkupDiscount.vue")
// const EditMarkupDiscount = () => import("../views/apps/sales/markupDiscount/EditMarkupDiscount.vue")

// POS sales register
const POSSalesRegister = () => import("../views/apps/sales/POSSalesRegister/POSSalesRegister.vue")
const CreateNewSale = () => import("../views/apps/sales/POSSalesRegister/createNewSale.vue")
const ViewSalesRegister = () =>
  import("../views/apps/sales/POSSalesRegister/viewSalesRegister.vue");

// stock transaction

const StockTransaction = () => import("../views/apps/sales/stockTransaction/stockTransaction.vue")


export default [
  // sales Requisition

  {
    path: "/sales/sales-request/list",
    name: "SalesRequisition",
    component: SalesRequisition,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "Sales Quotation",
          active: true
        }
      ],
      pageTitle: "Sales RFQ"
    }
  },

  {
    path: "/sales/sales-request/:id/view-sale-request",
    name: "ViewSalesRequisition",
    component: ViewSalesRequisition,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "View Sales Quotation",
          active: true
        }
      ],
      pageTitle: "Sales RFQ"
    }
  },

  // Sales Proforma/Quotation
  {
    path: "/sales/sales-proforma/list",
    name: "ProformaQuote",
    component: ProformaQuote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "Sales Quotation",
          active: true
        }
      ],
      pageTitle: "Sales Quotation"
    }
  },

  {
    path: "/sales/sales-proforma/list/create-quotation",
    name: "CreateProforma",
    component: CreateProforma,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "Sales Quotation",
          active: true
        }
      ],
      pageTitle: "Sales Quotation"
    }
  },

  {
    path: "sales/sales-proforma/:id/edit-quotation",
    name: "EditProforma",
    component: EditProforma,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "Edit Quotation",
          active: true
        }
      ],

      pageTitle: "Edit Quotation"
    }
  },

  // generate quote from request for Quote
  {
    path: "sales/sales-proforma/:id/generate-quotation",
    name: "GenerateQuoteRFQ",
    component: GenerateQuoteRFQ,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Quotation"
        },
        {
          title: "RFQ Sales Quotation",
          active: true
        }
      ],

      pageTitle: "Generate Quotation"
    }
  },

  // Sales Purchase Order
  {
    path: "/sales/sales-purchase-order/list",
    name: "SalesPurchaseOrder",
    component: SalesPurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Order"
        },
        {
          title: "Sales Order",
          active: true
        }
      ],
      pageTitle: "Purchase Order (Sales)"
    }
  },

  {
    path: "/sales/sales-purchase-order/:id/view",
    name: "ViewSalesPurchaseOrder",
    component: ViewSalesPurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Order"
        },
        {
          title: "Sales Order",
          active: true
        }
      ],
      pageTitle: "Sales Order(View)"
    }
  },

  // Sales Invoice

  {
    path: "/sales/sales-invoice/list",
    name: "Invoice",
    component: Invoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "Sales Invoice",
          active: true
        }
      ],
      pageTitle: "Sales Invoice"
    }
  },

  {
    path: "/sales/sales-invoice/create",
    name: "CreateInvoice",
    component: CreateInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "Create Invoice",
          active: true
        }
      ],
      pageTitle: "Create Invoice"
    }
  },

  {
    path: "/sales/sales-invoice/:id/edit",
    name: "EditInvoice",
    component: EditInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "Edit Invoice",
          active: true
        }
      ],
      pageTitle: "Edit Invoice"
    }
  },

  // generate invoice from rfq
  {
    path: "/sales/sales-invoice/:id/generate-rfq",
    name: "GenerateInvoiceRFQ",
    component: GenerateInvoiceRFQ,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "Create RFQ Invoice",
          active: true
        }
      ],
      pageTitle: "Generate Invoice"
    }
  },

  // generate invoice from sales purchase order
  {
    path: "/sales/sales-invoice/:id/generate-purchase-order",
    name: "GenerateInvoicePurchaseOrder",
    component: GenerateInvoicePurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "Create Purchase Order Invoice",
          active: true
        }
      ],
      pageTitle: "Generate Invoice"
    }
  },

  // generate Invoice from Quotation
  {
    path: "/sales/sales-invoice/:id/generate-quotation",
    name: "GenerateInvoiceQuotation",
    component: GenerateInvoiceQuotation,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Sales Invoice"
        },
        {
          title: "CreateInvoice",
          active: true
        }
      ],
      pageTitle: "Generate Invoice"
    }
  },

  // recurring invoice section
  {
    path: "/sales/sales-invoice/recurring/create",
    name: "CrudRecurringInvoice",
    component: CrudRecurringInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Recurring Invoice"
        },
        {
          title: "Create Recurring Invoice",
          active: true
        }
      ],
      pageTitle: "Create Recurring Invoice"
    }
  },

  // EditRecurringInvoice

  {
    path: "/sales/sales-invoice/recurring/:id/edit-recurring-invoice",
    name: "EditRecurringInvoice",
    component: EditRecurringInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Recurring Invoice"
        },
        {
          title: "Create Recurring Invoice",
          active: true
        }
      ],
      pageTitle: "Edit Recurring Invoice"
    }
  },
  //  Rental Invoice section
  {
    path: "/sales/sales-invoice/rental/create",
    name: "CrudRentalInvoice",
    component: CrudRentalInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Rental Invoice"
        },
        {
          title: "Create Rental Invoice",
          active: true
        }
      ],
      pageTitle: "Create Rental Invoice"
    }
  },

  {
    path: "/sales/sales-invoice/rental/:id/update",
    name: "EditRentalInvoice",
    component: EditRentalInvoice,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Rental Invoice"
        },
        {
          title: "Create Rental Invoice",
          active: true
        }
      ],
      pageTitle: "Create Rental Invoice"
    }
  },


  {
    path: "/sales/pos-sales-register/",
    name: "POSSalesRegister",
    component: POSSalesRegister,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "POS Sales Register"
        },
        {
          title: "POS Sales Register",
          active: true
        }
      ],
      pageTitle: "POS Sales Register"
    }
  },
  {
    path: "/sales/createNewSale/",
    name: "createNewSale",
    component: CreateNewSale,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sales/view-sales-register/:id/",
    name: "viewSalesRegister",
    component: ViewSalesRegister,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "View Sales Register"
        },
        {
          title: "Sales Order",
          active: true
        }
      ],
      pageTitle: "View Sales Register"
    }
  },

  // // waybill
  // {
  //   path: "/sales/sales-waybill/list",
  //   name: "Waybill",
  //   component: Waybill,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Waybill"
  //   }
  // },

  // Generate Waybill

  // {
  //   path: "/sales/sales-waybill/:id/generate-waybill",
  //   name: "CreateWaybill",
  //   component: CreateWaybill,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Generate Waybill"
  //   }
  // },

  // {
  //   path: "/sales/sales-waybill/:id/generate-waybill/purchase-order",
  //   name: "CreateWaybillPO",
  //   component: CreateWaybillPO,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Generate Waybill"
  //   }
  // },

  // Generate Waybill from quotation

  // {
  //   path: "/sales/sales-waybill/:id/quotation-generate-waybill",
  //   name: "GenerateWaybillQuotation",
  //   component: GenerateWaybillQuotation ,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Generate Waybill"
  //   }
  // },

  // // Generate Waybill from invoice
  // {
  //   path: "/sales/sales-waybill/:id/invoice-generate-waybill",
  //   name: "GenerateWaybillInvoice",
  //   component: GenerateWaybillInvoice ,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Generate Waybill"
  //   }
  // },

  // // Edit Waybill
  // {
  //   path: "/sales/sales-waybill/:id/edit-generate-waybill",
  //   name: "EditWaybill",
  //   component: EditWaybill,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/"
  //       },
  //       {
  //         title: "Waybill"
  //       },
  //       {
  //         title: "Waybill",
  //         active: true
  //       }
  //     ],
  //     pageTitle: "Edit Waybill"
  //   }
  // },

  // Credit Note
  {
    path: "/sales/sales-credit-note/list",
    name: "CreditNote",
    component: CreditNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Credit Note"
        },
        {
          title: "Credit Note",
          active: true
        }
      ],
      pageTitle: "Credit Note"
    }
  },

  {
    path: "/sales/sales-credit-note/create",
    name: "CreateCreditNote",
    component: CreateCreditNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Credit Note"
        },
        {
          title: "Create Credit Note",
          active: true
        }
      ],
      pageTitle: "Create Credit Note"
    }
  },

  {
    path: "/sales/sales-credit-note/:id/create=from-invoice",
    name: "CreateInvoiceCreditNote",
    component: CreateInvoiceCreditNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Credit Note"
        },
        {
          title: "Create Credit Note",
          active: true
        }
      ],
      pageTitle: "Create Credit Note"
    }
  },

  {
    path: "/sales/inventory/stock/transaction",
    name: "StockTransaction",
    component: StockTransaction,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Stock Transaction"
        },
        {
          title: "Stock Transaction",
          active: true
        }
      ],
      pageTitle: "Stock Transaction"
    }
  },
  //list for material return and request
  {
    path: "/sales/material-request/list",
    name: "WaybillMaterialRequest",
    component: WaybillMaterialRequest,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Material Request"
        },
        {
          title: "Material Request",
          active: true
        }
      ],
      pageTitle: "Material Request"
    }
  },
  {
    path: "/sales/material-return/list",
    name: "WaybillMaterialReturn",
    component: WaybillMaterialReturn,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Material Return"
        },
        {
          title: "Material Return",
          active: true
        }
      ],
      pageTitle: "Material Return"
    }
  },
  {
    path: "/sales/material-return/generate",
    name: "UseWaybillMaterialReturn",
    component: UseWaybillMaterialReturn,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Material Return"
        },
        {
          title: "Material Return",
          active: true
        }
      ],
      pageTitle: "Material Return"
    }
  },
  {
    path: "/sales/material-request/generate",
    name: "UseWaybillMaterialRequest",
    component: UseWaybillMaterialRequest,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Material Return"
        },
        {
          title: "Material Return",
          active: true
        }
      ],
      pageTitle: "Material Return"
    }
  }
];  