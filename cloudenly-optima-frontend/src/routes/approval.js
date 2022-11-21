// Setting Modules

const ApprovalRequests = () => import("@/views/apps/Approvals/requests.vue");

const ApprovalInProgresss = () => import("@/views/apps/Approvals/myapprovals.vue");

const ApprovalHistory = () => import("@/views/apps/Approvals/history.vue");

const viewApprovalRequest = () => import("@/views/apps/Approvals/view_request.vue");

const viewApprovalInProgressRequest = () => import("@/views/apps/Approvals/view_inprogress_request.vue");
// import Guards from "./routeGuards";

export default [

  {
    path: "/approval/requests",
    name: "ApprovalRequests",
    component: ApprovalRequests,
    meta: {
      requiresAuth: true,
      breadcrumb: [{
          title: "Approval Requests",
          active: true
        },
        {
          title: "Requests",
          url: "/"
        },

      ],
      pageTitle: "Approval Requests"
    }
  },
  {
    path: "/approval/myapprovals",
    name: "ApprovalInProgress",
    component: ApprovalInProgresss,
    meta: {
      requiresAuth: true,
      breadcrumb: [{
          title: "Approvals Inprogress",
          active: true
        },
        {
          title: "Inprogress",
          url: "/"
        },

      ],
      pageTitle: "Approval Inprogress"
    }
  },
  {
    path: "/approval/history",
    name: "ApprovalHistory",
    component: ApprovalHistory,
    meta: {
      requiresAuth: true,
      breadcrumb: [{
          title: "Approvals History",
          active: true
        },
        {
          title: "History",
          url: "/"
        },

      ],
      pageTitle: "Approvals History"
    }
  },
  {
    path: "/approval/requests/:id",
    name: "ViewApprovalRequest",
    component: viewApprovalRequest,
    meta: {
      requiresAuth: true,
      breadcrumb: [{
          title: "Approval Request",
          active: true
        },
        {
          title: "History",
          url: "/"
        },

      ],
      pageTitle: "Approval Request"
    }
  },
  {
    path: "/approval/inprogress/:id",
    name: "ViewApprovalInProgressRequest",
    component: viewApprovalInProgressRequest,
    meta: {
      requiresAuth: true,
      breadcrumb: [{
          title: "Approvals Inprogress",
          active: true
        },
        {
          title: "Inprogress",
          url: "/"
        },

      ],
      pageTitle: "Approval Inprogress"
    }
  },
];