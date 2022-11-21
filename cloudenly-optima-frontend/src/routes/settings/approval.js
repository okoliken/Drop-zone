const approvalSetting = () =>
  import("@/views/apps/settings/Approval/index.vue");
const newApproval = () =>
  import("@/views/apps/settings/Approval/newapproval.vue");
  const editApproval = () =>
  import("@/views/apps/settings/Approval/editapproval.vue");
  const viewApproval = () =>
  import("@/views/apps/settings/Approval/viewApproval.vue");


export default [
  {
    path: "/approval/settings",
    name: "approvalSetting",
    component: approvalSetting,
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
          title: "Approval",
          active: true,
        },
      ],
      pageTitle: "Approval List",
    },
  },

  {
    path: "/approval/new",
    name: "newApproval",
    component: newApproval,
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
          title: "Approval",
          active: true,
        },
      ],
      pageTitle: "Approval List",
    },
  },
  {
    path: "/approval/view/:id",
    name: "viewApproval",
    component: viewApproval,
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
          title: "Approval",
          active: true,
        },
      ],
      pageTitle: "Approval List",
    },
  },
  {
    path: "/approval/edit/:id",
    name: "editApproval",
    component: editApproval,
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
          title: "Approval",
          active: true,
        },
      ],
      pageTitle: "Approval List",
    },
  },
];
