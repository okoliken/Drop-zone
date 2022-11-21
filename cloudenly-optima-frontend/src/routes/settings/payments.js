const paymentSettings = () =>
  import("@/views/apps/settings/paymentSettings/index.vue");

// const newPayment = () =>import("@/views/apps/settings/paymentSettings/newPayment.vue");

const newCollection = () =>
  import("@/views/apps/settings/paymentSettings/newCollection.vue");

const editCollection = () =>
  import("@/views/apps/settings/paymentSettings/editCollection.vue");

const createAssociationLocation = () =>
  import("@/views/apps/settings/paymentSettings/createCollectionLocation.vue");

export default [
  {
    path: "/payments/settings",
    name: "paymentSettings",
    component: paymentSettings,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Settings",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  {
    path: "/payments/settings/new-collection",
    name: "newCollection",
    component: newCollection,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "new collection",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },
  {
    path: "/payments/settings/edit-collection/:id",
    name: "editCollection",
    component: editCollection,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "new collection",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  {
    path: "/payments/settings/collection-association-location",
    name: "createAssociationLocation",
    component: createAssociationLocation,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "New Payment",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },
];
