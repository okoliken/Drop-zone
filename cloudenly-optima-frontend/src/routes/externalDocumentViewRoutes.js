const ViewReceiptsNoAuth = () => import("@/views/apps/previewDocs/viewDocsNoAuth.vue");

export default [
    
      {
        path: "/view-document/:id/external-view",
        name: "ViewReceiptNoAuth",
        component: ViewReceiptsNoAuth,
      },    

]