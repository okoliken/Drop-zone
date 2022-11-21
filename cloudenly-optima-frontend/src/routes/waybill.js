const Waybill = () => import("../views/apps/Waybill/index.vue");
const generateWaybill = () => import("../views/apps/Waybill/generateWaybill.vue");
const EditWaybill = () => import("../views/apps/Waybill/editWaybill.vue")


export default [
    {
        path: "/waybill",
        name: "Waybill",
        component: Waybill,
        meta: {
          requiresAuth: true,
        //   breadcrumb: [
        //     {
        //       title: "Dashboard",
        //       url: "/"
        //     },
        //     {
        //       title: "Sales Quotation"
        //     },
        //     {
        //       title: "Sales Quotation",
        //       active: true
        //     }
        //   ],
        //   pageTitle: "Sales RFQ"
        }
      },


      {
        path: "/waybill/:id/generate-waybill",
        name: "generateWaybill",
        component: generateWaybill,
        meta: {
          requiresAuth: true,
        //   breadcrumb: [
        //     {
        //       title: "Dashboard",
        //       url: "/"
        //     },
        //     {
        //       title: "Sales Quotation"
        //     },
        //     {
        //       title: "Sales Quotation",
        //       active: true
        //     }
        //   ],
        //   pageTitle: "Sales RFQ"
        }
      },


      {
        path: "/waybill/:id/edit-waybill",
        name: "EditWaybill",
        component: EditWaybill,
        meta: {
          requiresAuth: true,
        //   breadcrumb: [
        //     {
        //       title: "Dashboard",
        //       url: "/"
        //     },
        //     {
        //       title: "Sales Quotation"
        //     },
        //     {
        //       title: "Sales Quotation",
        //       active: true
        //     }
        //   ],
        //   pageTitle: "Sales RFQ"
        }
      },
]