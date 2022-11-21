
const CatalogueList = () => import("../views/apps/Catalogue/index")
const CreateEditServiceItem = () => import("../views/apps/Catalogue/createEditServiceItem")
const CreateEditProductItem = () => import("../views/apps/Catalogue/createEditProductItem.vue")

export default [

  //New catalogue
  {
    path: "/catalogue/item",
    name: "CatalogueList",
    component: CatalogueList,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Catalogue"
        },
        {
          title: "Catalogue",
          active: true
        }
      ],
      pageTitle: "Catalogue"
    }
  },

  {
    path: "/catalogue/item/service/create-edit",
    name: "CreateEditServiceItem",
    component: CreateEditServiceItem,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Catalogue"
        },
        {
          title: "Catalogue",
          active: true
        }
      ],
      pageTitle: "Catalogue"
    }
  },

  {
    path: "/catalogue/item/product/create-edit",
    name: "CreateEditProductItem",
    component: CreateEditProductItem,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Catalogue"
        },
        {
          title: "Catalogue",
          active: true
        }
      ],
      pageTitle: "Catalogue"
    }
  },

]

