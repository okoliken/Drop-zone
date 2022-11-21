const crmSettings = () => import("@/views/apps/settings/crm");

export default [
  {
    path: "/settings/crm/setting",
    name: "crmSettings",
    component: crmSettings,
  },
];
