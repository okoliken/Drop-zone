// stock
const InventorySetup = () => import("../views/apps/Inventory/outletsAndInventoryClasses");

// const CreateInventoryOutlet = () => import("../views/apps/Inventory/Stock/stockSetup/createOutlet");

const ManageStock = () => import("../views/apps/Inventory/Stock/stockOperation/stockOperation.vue");
const StockMovement = () => import("../views/apps/Inventory/Stock/StockQuantity.vue");
const StockWithdraw = () => import("../views/apps/Inventory/Stock/stockOperation/stockWithdraw");

//create new inventory class
const CreateInventoryClass = () =>
  import("../views/apps/Inventory/outletsAndInventoryClasses/createNewClass.vue");

// Material Request
const MaterialRequest = () =>
  import("../views/apps/Inventory/MaterialRequest/MaterialRequestList.vue");
const CreateMaterialRequest = () =>
  import("../views/apps/Inventory/MaterialRequest/MaterialRequest.vue");
const EditMaterialRequest = () =>
  import("../views/apps/Inventory/MaterialRequest/EditMaterialRequest.vue");

const MaterialReturn = () =>import("../views/apps/Inventory/MaterialReturn/MaterialReturnList.vue");
const CreateMaterialReturn = () => import("../views/apps/Inventory/MaterialReturn/MaterialReturn.vue");
const EditMaterialReturn = () => import("../views/apps/Inventory/MaterialReturn/EditMaterialReturn");

// Good Received Note Section
const GoodReceiveNote = () => import("../views/apps/Inventory/GRN/goodReceiveNote");
const CreateGoodReceiveNote = () => import("../views/apps/Inventory/GRN/CreateGoodReceiveNote");
const EditGoodReceiveNote = () => import("../views/apps/Inventory/GRN/EditGoodRecieveNote");

//generate from stock balance
const MaterialRequestGRN = () => import("../views/apps/Inventory/GRN/MaterialRequestGRN");
const MaterialReturnGRN = () => import("../views/apps/Inventory/GRN/MaterialReturnGRN");
const WaybillGRN = () => import("../views/apps/Inventory/GRN/WaybillGRN");
const UseWaybillGRN = () => import("../views/apps/Inventory/GRN/UseWaybillGRN");
const UseMaterialReturnGRN = () => import("../views/apps/Inventory/GRN/UseMaterialReturnGRN");
const UseMaterialRequestGRN = () => import("../views/apps/Inventory/GRN/UseMaterialRequestGRN");


//generate from waybill


const CreateInvoiceGrn = () => import("../views/apps/Inventory/GRN/CreateInvoiceGrn");
const CreateQuotationGrn = () => import("../views/apps/Inventory/GRN/createQuotationGrn");

const CreateGrnPurchaseOrder = () => import("../views/apps/Inventory/GRN/createGrnPo.vue");
const CreateWaybillGrn = () => import("../views/apps/Inventory/GRN/CreateWaybillGrn.vue");

// Job Order Section

// const JobOrder = () => import("../views/apps/Inventory/JobOrder/jobOrder.vue");

// const PurchaseRequisition = () => import("@/views/apps/purchase/purchaseRequisitions/purchaseRequisition");

export default [
  {
    path: "/inventory/inventory-setup",
    name: "InventorySetup",
    component: InventorySetup,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },

        {
          title: " Setup",
          active: true
        }
      ],
      pageTitle: "Outlets & Inventory"
    }
  },

  {
    path: "Inventory/new-inventory-class",
    name: "CreateNewClass",
    component: CreateInventoryClass,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },

        {
          title: " Setup",
          active: true
        }
      ],
      pageTitle: "Create New Class"
    }
  },

  // {
  //   path: "/inventory/inventory-setup/create-outlet",
  //   name: "CreateInventoryOutlet",
  //   component: CreateInventoryOutlet,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/",
  //       },

  //       {
  //         title: " Setup",
  //         active: true,
  //       },
  //     ],
  //     pageTitle: "Outlets & Inventory",
  //   },
  // },

  {
    path: "/inventory/inventory-manage",
    name: "ManageStock",
    component: ManageStock,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Inventory Management"
        },
        {
          title: "Inventory Management",
          active: true
        }
      ],
      pageTitle: "Inventory Management"
    }
  },

  {
    path: "/inventory/inventory-movement",
    name: "StockMovement",
    component: StockMovement,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Inventory Movement"
        },
        {
          title: "Inventory Movement",
          active: true
        }
      ],
      pageTitle: "Inventory Movement"
    }
  },

  {
    path: "/inventory/inventory-withdraw",
    name: "StockWithdraw",
    component: StockWithdraw,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Inventory Withdraw"
        },
        {
          title: "Inventory Withdraw",
          active: true
        }
      ],
      pageTitle: "Inventory Withdraw"
    }
  },

  // Material Return

  {
    path: "/inventory/material-return",
    name: "MaterialReturn",
    component: MaterialReturn,
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
    path: "/inventory/material-return-grn",
    name: "UseMaterialReturnGRN",
    component: UseMaterialReturnGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Use Material Return GRN"
        },
        {
          title: "Use Material Return GRN",
          active: true
        }
      ],
      pageTitle: "Use Material Return GRN"
    }
  },
  {
    path: "/inventory/material-request-grn",
    name: "UseMaterialRequestGRN",
    component: UseMaterialRequestGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Use Material Request GRN"
        },
        {
          title: "Use Material Request GRN",
          active: true
        }
      ],
      pageTitle: "Use Material Request GRN"
    }
  },
  {
    path: "/inventory/waybill-grn",
    name: "UseWaybillGRN",
    component: UseWaybillGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Use Waybill GRN"
        },
        {
          title: "Use Waybill GRN",
          active: true
        }
      ],
      pageTitle: "Use Waybill GRN"
    }
  },

  {
    path: "/inventory/material-return/create",
    name: "CreateMaterialReturn",
    component: CreateMaterialReturn,
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
          title: "Create Material Return",
          active: true
        }
      ],
      pageTitle: "Create Material Return"
    }
  },

  {
    path: "/inventory/material-return/:id/edit-material-return",
    name: "EditMaterialReturn",
    component: EditMaterialReturn,
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
          title: "Edit Material Return",
          active: true
        }
      ],
      pageTitle: "Edit Material Return"
    }
  },

  // Material Request
  {
    path: "/inventory/material-request",
    name: "MaterialRequest",
    component: MaterialRequest,
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
    path: "/inventory/material-request/create",
    name: "CreateMaterialRequest",
    component: CreateMaterialRequest,
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
    path: "/inventory/material-request/:id/edit-material-request",
    name: "EditMaterialRequest",
    component: EditMaterialRequest,
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
      pageTitle: "Edit Material Request"
    }
  },
  // Good Recieved Note

  {
    path: "/inventory/good-received-notes",
    name: "GoodReceiveNote",
    component: GoodReceiveNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "GRN",
          active: true
        }
      ],
      pageTitle: "Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/create",
    name: "CreateGoodReceiveNote",
    component: CreateGoodReceiveNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Create GRN",
          active: true
        }
      ],
      pageTitle: " Create Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/:id/edit",
    name: "EditGoodReceiveNote",
    component: EditGoodReceiveNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Create GRN",
          active: true
        }
      ],
      pageTitle: " Create Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/material-request",
    name: "MaterialRequestGRN",
    component: MaterialRequestGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Material Request",
          active: true
        }
      ],
      pageTitle: " Material Request GRN"
    }
  },
  {
    path: "/inventory/good-received-notes/material-return",
    name: "MaterialReturnGRN",
    component: MaterialReturnGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Material Return",
          active: true
        }
      ],
      pageTitle: " Material Return"
    }
  },
  {
    path: "/inventory/good-received-notes/waybill",
    name: "WaybillGRN",
    component: WaybillGRN,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Waybilll",
          active: true
        }
      ],
      pageTitle: " Waybill"
    }
  },
  {
    path: "/inventory/good-received-notes/:id/generate-purchase-order",
    name: "CreateGrnPurchaseOrder",
    component: CreateGrnPurchaseOrder,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Generate GRN (Purchase Order)",
          active: true
        }
      ],
      pageTitle: " Generate Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/:id/generate-purchase-invoice",
    name: "CreateInvoiceGrn",
    component: CreateInvoiceGrn,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Generate GRN (Invoice)",
          active: true
        }
      ],
      pageTitle: " Generate Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/:id/generate-purchase-quotation",
    name: "CreateQuotationGrn",
    component: CreateQuotationGrn,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Generate GRN (Quotation)",
          active: true
        }
      ],
      pageTitle: " Generate Good Received Note"
    }
  },

  {
    path: "/inventory/good-received-notes/:id/generate-waybill",
    name: "CreateWaybillGrn",
    component: CreateWaybillGrn,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "GRN"
        },
        {
          title: "Generate GRN (Waybill)",
          active: true
        }
      ],
      pageTitle: " Generate Good Received Note"
    }
  }

  // job Order

  // {
  //   path: "/inventory/job-order",
  //   name: "JobOrder",
  //   component: JobOrder,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/",
  //       },
  //       {
  //         title: "Job Order",
  //       },
  //       {
  //         title: "Job Order",
  //         active: true,
  //       },
  //     ],
  //     pageTitle: "Job Order",
  //   },
  // },
  //   {
  //     path: "/inventory/purchase/requisition",
  //     name: "PurchaseRequisition",
  //     component: PurchaseRequisition,
  //     meta: {
  //       requiresAuth: true,
  //       breadcrumb: [
  //         {
  //           title: "Dashboard",
  //           url: "/",
  //         },
  //         {
  //           title: "Inventory",
  //         },
  //         {
  //           title: "Purchase Requisition",
  //           active: true,
  //         },
  //       ],
  //       pageTitle: "Purchase Requisition",
  //     },
  //   },
];
// stock
// const InventorySetup = () => import("../views/apps/Inventory/outletsAndInventoryClasses");

// // const CreateInventoryOutlet = () => import("../views/apps/Inventory/Stock/stockSetup/createOutlet");

// const ManageStock = () => import("../views/apps/Inventory/Stock/stockOperation/stockOperation.vue");
// const StockMovement = () => import("../views/apps/Inventory/Stock/StockQuantity.vue");
// const StockWithdraw = () => import("../views/apps/Inventory/Stock/stockOperation/stockWithdraw");



// // Material Request
// const MaterialRequest = () =>
//   import("../views/apps/Inventory/MaterialRequest/MaterialRequestList.vue");
// const CreateMaterialRequest = () =>
//   import("../views/apps/Inventory/MaterialRequest/MaterialRequest.vue");
// const EditMaterialRequest = () =>
//   import("../views/apps/Inventory/MaterialRequest/EditMaterialRequest.vue");

// const MaterialReturn = () =>import("../views/apps/Inventory/MaterialReturn/MaterialReturnList.vue");
// const CreateMaterialReturn = () => import("../views/apps/Inventory/MaterialReturn/MaterialReturn.vue");
// const EditMaterialReturn = () => import("../views/apps/Inventory/MaterialReturn/EditMaterialReturn");

// // Good Received Note Section
// const GoodReceiveNote = () => import("../views/apps/Inventory/GRN/goodReceiveNote");
// const CreateGoodReceiveNote = () => import("../views/apps/Inventory/GRN/CreateGoodReceiveNote");
// const EditGoodReceiveNote = () => import("../views/apps/Inventory/GRN/EditGoodRecieveNote");

// const CreateInvoiceGrn = () => import("../views/apps/Inventory/GRN/CreateInvoiceGrn");
// const CreateQuotationGrn = () => import("../views/apps/Inventory/GRN/createQuotationGrn");

// const CreateGrnPurchaseOrder = () => import("../views/apps/Inventory/GRN/createGrnPo.vue");
// const CreateWaybillGrn = () => import("../views/apps/Inventory/GRN/CreateWaybillGrn.vue");

// // Job Order Section

// // const JobOrder = () => import("../views/apps/Inventory/JobOrder/jobOrder.vue");

// // const PurchaseRequisition = () => import("@/views/apps/purchase/purchaseRequisitions/purchaseRequisition");

// export default [

//   {
//     path: "/inventory/inventory-setup",
//     name: "InventorySetup",
//     component: InventorySetup,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },

//         {
//           title: " Setup",
//           active: true,
//         },
//       ],
//       pageTitle: "Outlets & Inventory",
//     },
//   },

//   // {
//   //   path: "/inventory/inventory-setup/create-outlet",
//   //   name: "CreateInventoryOutlet",
//   //   component: CreateInventoryOutlet,
//   //   meta: {
//   //     requiresAuth: true,
//   //     breadcrumb: [
//   //       {
//   //         title: "Dashboard",
//   //         url: "/",
//   //       },

//   //       {
//   //         title: " Setup",
//   //         active: true,
//   //       },
//   //     ],
//   //     pageTitle: "Outlets & Inventory",
//   //   },
//   // },

//   {
//     path: "/inventory/inventory-manage",
//     name: "ManageStock",
//     component: ManageStock,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Inventory Management",
//         },
//         {
//           title: "Inventory Management",
//           active: true,
//         },
//       ],
//       pageTitle: "Inventory Management",
//     },
//   },

  
//   {
//     path: "/inventory/inventory-movement",
//     name: "StockMovement",
//     component: StockMovement,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Inventory Movement",
//         },
//         {
//           title: "Inventory Movement",
//           active: true,
//         },
//       ],
//       pageTitle: "Inventory Movement",
//     },
//   },

//   {
//     path: "/inventory/inventory-withdraw",
//     name: "StockWithdraw",
//     component: StockWithdraw,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Inventory Withdraw",
//         },
//         {
//           title: "Inventory Withdraw",
//           active: true,
//         },
//       ],
//       pageTitle: "Inventory Withdraw",
//     },
//   },

//   // Material Return

//   {
//     path: "/inventory/material-return",
//     name: "MaterialReturn",
//     component: MaterialReturn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Return",
//         },
//         {
//           title: "Material Return",
//           active: true,
//         },
//       ],
//       pageTitle: "Material Return",
//     },
//   },

//   {
//     path: "/inventory/material-return/create",
//     name: "CreateMaterialReturn",
//     component: CreateMaterialReturn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Return",
//         },
//         {
//           title: "Create Material Return",
//           active: true,
//         },
//       ],
//       pageTitle: "Create Material Return",
//     },
//   },

//   {
//     path: "/inventory/material-return/:id/edit-material-return",
//     name: "EditMaterialReturn",
//     component: EditMaterialReturn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Return",
//         },
//         {
//           title: "Edit Material Return",
//           active: true,
//         },
//       ],
//       pageTitle: "Edit Material Return",
//     },
//   },

//   // Material Request
//   {
//     path: "/inventory/material-request",
//     name: "MaterialRequest",
//     component: MaterialRequest,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Request",
//         },
//         {
//           title: "Material Request",
//           active: true,
//         },
//       ],
//       pageTitle: "Material Request",
//     },
//   },

//   {
//     path: "/inventory/material-request/create",
//     name: "CreateMaterialRequest",
//     component: CreateMaterialRequest,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Request",
//         },
//         {
//           title: "Material Request",
//           active: true,
//         },
//       ],
//       pageTitle: "Material Request",
//     },
//   },

//   {
//     path: "/inventory/material-request/:id/edit-material-request",
//     name: "EditMaterialRequest",
//     component: EditMaterialRequest,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "Material Request",
//         },
//         {
//           title: "Material Request",
//           active: true,
//         },
//       ],
//       pageTitle: "Edit Material Request",
//     },
//   },
//   // Good Recieved Note

//   {
//     path: "/inventory/good-received-notes",
//     name: "GoodReceiveNote",
//     component: GoodReceiveNote,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "GRN",
//           active: true,
//         },
//       ],
//       pageTitle: "Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/create",
//     name: "CreateGoodReceiveNote",
//     component: CreateGoodReceiveNote,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Create GRN",
//           active: true,
//         },
//       ],
//       pageTitle: " Create Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/:id/edit",
//     name: "EditGoodReceiveNote",
//     component: EditGoodReceiveNote,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Create GRN",
//           active: true,
//         },
//       ],
//       pageTitle: " Create Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/:id/generate-purchase-order",
//     name: "CreateGrnPurchaseOrder",
//     component: CreateGrnPurchaseOrder,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Generate GRN (Purchase Order)",
//           active: true,
//         },
//       ],
//       pageTitle: " Generate Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/:id/generate-purchase-invoice",
//     name: "CreateInvoiceGrn",
//     component: CreateInvoiceGrn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Generate GRN (Invoice)",
//           active: true,
//         },
//       ],
//       pageTitle: " Generate Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/:id/generate-purchase-quotation",
//     name: "CreateQuotationGrn",
//     component: CreateQuotationGrn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Generate GRN (Quotation)",
//           active: true,
//         },
//       ],
//       pageTitle: " Generate Good Received Note",
//     },
//   },

//   {
//     path: "/inventory/good-received-notes/:id/generate-waybill",
//     name: "CreateWaybillGrn",
//     component: CreateWaybillGrn,
//     meta: {
//       requiresAuth: true,
//       breadcrumb: [
//         {
//           title: "Dashboard",
//           url: "/",
//         },
//         {
//           title: "GRN",
//         },
//         {
//           title: "Generate GRN (Waybill)",
//           active: true,
//         },
//       ],
//       pageTitle: " Generate Good Received Note",
//     },
//   },

//   // job Order

//   // {
//   //   path: "/inventory/job-order",
//   //   name: "JobOrder",
//   //   component: JobOrder,
//   //   meta: {
//   //     requiresAuth: true,
//   //     breadcrumb: [
//   //       {
//   //         title: "Dashboard",
//   //         url: "/",
//   //       },
//   //       {
//   //         title: "Job Order",
//   //       },
//   //       {
//   //         title: "Job Order",
//   //         active: true,
//   //       },
//   //     ],
//   //     pageTitle: "Job Order",
//   //   },
//   // },
// //   {
// //     path: "/inventory/purchase/requisition",
// //     name: "PurchaseRequisition",
// //     component: PurchaseRequisition,
// //     meta: {
// //       requiresAuth: true,
// //       breadcrumb: [
// //         {
// //           title: "Dashboard",
// //           url: "/",
// //         },
// //         {
// //           title: "Inventory",
// //         },
// //         {
// //           title: "Purchase Requisition",
// //           active: true,
// //         },
// //       ],
// //       pageTitle: "Purchase Requisition",
// //     },
// //   },
// ];
