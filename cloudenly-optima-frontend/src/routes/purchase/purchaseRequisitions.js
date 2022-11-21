const purchaseRequisitions = () => import("@/views/apps/purchase/purchaseRequisitions");
const purchaseRequisition = () => import("@/views/apps/purchase/purchaseRequisitions/purchaseRequisition");
const viewRequisition = () => import("@/views/apps/purchase/purchaseRequisitions/purchaseRequisition/viewRequisition.vue");


export default [

  
  {
    path: "/purchase/purchase-requisitions",
    name: "purchaseRequisitions",
    component: purchaseRequisitions,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Purchase Requisition",
        },
        {
          title: "Purchase Requisition",
          active: true,
        },
      ],
      pageTitle: "Purchase Requisition",
    },
  },

  {
    path: "/purchase/purchase-requisition/create",
    name: "createPurchaseRequisition",
    component: purchaseRequisition,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Create Requisition",
        },
        {
          title: "Create Requisition",
          active: true,
        },
      ],
      pageTitle: "Create Requisition",
    },
  },

  //   this route will handle view or edit actions
  {
    path: "/purchase/purchase-requisition/id",
    name: "purchaseRequisition",
    component: purchaseRequisition,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Create Requisition",
        },
        {
          title: "Create Requisition",
          active: true,
        },
      ],
      pageTitle: "Create Requisition",
    },
  },

  {
    path: "/purchase/purchase-requisition/view",
    name: "viewPurchaseRequisition",
    component: viewRequisition,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "View Requisition",
        },
        {
          title: "View Requisition",
          active: true,
        },
      ],
      pageTitle: "View Requisition",
    },
  },



];
