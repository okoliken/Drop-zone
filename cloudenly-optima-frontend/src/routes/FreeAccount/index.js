// Setting Modules

const FreeAccountDashboard = () => import("../../views/apps/FreeAccount/Dashboard.vue");




export default [
    // Settings Modules
    {
        path: '/app-free/dashboard',
        name: 'FreeAccountDashboard',
        component: FreeAccountDashboard,
        meta: {
            // requiresAuth: true, 
            // breadcrumb: [
            //   {
            //     title: "Dashboard",
            //     url: "/"
            //   },
            //   {
            //     title: "Analytics & Record"
            //   },
            //   {
            //     title: "Analytics & Record",
            //     active: true
            //   }
            // ],
            // pageTitle: "Analytics & Record"
          }
    },
];
