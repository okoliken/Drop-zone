const ViewReceipts = () => import("@/views/apps/previewDocs/viewDocs.vue");


export default [
    {
        path: "/view-receipt/:id/",
        name: "ViewReceipts",
        component: ViewReceipts,
        meta: {
          requiresAuth: true,
          breadcrumb: [
            {
              title: "Dashboard",
              url: "/",
            },
            {
              title: "View Receipt",
              active:true
            }
          ],
          pageTitle: " View Receipt",
        },
      },

]