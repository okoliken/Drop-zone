// Setting Modules

const analyticsCrm = () => import("@/views/apps/Analytics/crm");
const analyticsPurchases = () => import("@/views/apps/Analytics/purchase");
const analyticsSales = () => import("@/views/apps/Analytics/sales/index.vue");
const analyticsInventory = () => import("@/views/apps/Analytics/inventory");

export default [
  // CRM Analytics
  {
    path: "/analytics/crm",
    name: "analyticsCrm",
    component: analyticsCrm,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },

  // Purchase Analytics
  {
    path: "/analytics/purchase",
    name: "analyticsPurchases",
    component: analyticsPurchases,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },

  // Sales Analytics
  {
    path: "/analytics/sales",
    name: "analyticsSales",
    component: analyticsSales,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },

  // Inventory Analytics
  {
    path: "/analytics/inventory",
    name: "analyticsInventory",
    component: analyticsInventory,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },
];
