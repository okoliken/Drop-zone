import Vue from "vue";
import Router from "vue-router";
const AuthPage = () => import("@/views/Auth/authPage.vue");
import store from "@/store/store";

// Settings Router
import Settings from "./settings/index";

// Approval Router
import Approval from "./approval";

// CRM Router
import Crm from "./crm";

// Catalogue and Pricebook

import Catalogue from "./catalogue";

// Purchase Router
import Purchase from "./purchase";

// Sales Router
import Sales from "./sales";

// Inventory Router
import Inventory from "./inventory";

// Payment Router
import Payment from "./payment";

// printPages Router
// import PrintPages from "./printRoutes";

import Pricebook from "./pricebook";

// analytics and report
import Analytics from "./analytics";

// accounts
import Accounts from "./accounts";

// shared pages
import shared from "./shared";


import Waybill from "./waybill";

// import ViewReceipts from "./ViewReceipts"; 

import ExternalDocumentViewRoute from "./externalDocumentViewRoutes";

import Document from "./document"



Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: "/",
      name: "AuthPage",
      component: AuthPage,
      meta: {
        requiresAuth: false,
      },
    },

     //---------
    //External Cloudenly Page
    //---------

    {
      path: "/cloudenly",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      meta: {
        requiresAuth: false,
      },
      children: [...ExternalDocumentViewRoute],
    },

    // End view external Document


    {
      path: "/cloudenly",
      component: () => import("../layouts/main"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/dashboard/get-started",
          name: "getStarted",
          component: () => import("@/views/getStarted"),
          meta: {
            requiresAuth: true,
          },
        },

        {
          path: "/dashboard/analytics",
          name: "dashboardAnalytics",
          component: () => import("../views/DashboardAnalytics.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        ...Approval,
        ...Crm,
        ...Catalogue,
        ...Purchase,
        ...Sales,
        ...Inventory,
        ...Payment,
        ...Pricebook,
        ...Analytics,
        ...Accounts,
        ...shared,
        ...Settings,
        ...Waybill,
        // ...ViewReceipts,
        ...Document

      ],
    },

    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const isAuthRequire = to.matched.some(record => record.meta.requiresAuth)
  const authData = store.state.auth.auth.isAuth;
  if (authData === false) {
    // localStorage.clear();
    // let url = process.env.VUE_APP_QUANTUM_LOGIN;
    // window.location.href = url;
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
