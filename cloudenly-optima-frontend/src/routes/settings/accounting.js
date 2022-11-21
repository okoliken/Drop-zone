const accountingSetting = () => import("@/views/apps/settings/accounting/index");

export default [
    {
        path: "/account/settings",
        name: "accountingSetting",
        component: accountingSetting,
        meta: {
            
        },
    }
]