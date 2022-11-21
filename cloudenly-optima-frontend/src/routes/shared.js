// Crm Contact Engagement Blacklist
const BlackList = () => import("@/views/apps/shared/blacklist.vue");
const goodReceivedNote = () => import("@/views/apps/shared/goodReceivedNote");

export default [
  {
    path: "/blacklist",
    name: "BlackList",
    component: BlackList,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "CRM",
        },
        {
          title: "Customer Engagement",
          active: true,
        },
      ],
      pageTitle: "CRM",
    },
  },
  {
    path: "/blacklist/:id",
    name: "BlackListById",
    component: BlackList,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "CRM",
        },
        {
          title: "Customer Engagement",
          active: true,
        },
      ],
      pageTitle: "CRM",
    },
  },
  {
    path: "/shared/good-received-note/:id",
    name: "sharedGoodReceivedNote",
    component: goodReceivedNote,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "CRM",
        },
        {
          title: "Customer Engagement",
          active: true,
        },
      ],
      pageTitle: "CRM",
    },
  },
];
