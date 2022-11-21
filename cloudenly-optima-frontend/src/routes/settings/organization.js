const organization = () => import("@/views/apps/settings/organisation");

const organizationStructure = () => import("@/views/apps/settings/organisation/structure.vue");

const organizationFunction = () =>
  import("@/views/apps/settings/organisation/function/function.vue");

const organizationJobLevel = () =>
  import("@/views/apps/settings/organisation/JobLevel/JobLevel.vue");

  const viewOrganizationJobLevel = () =>
  import("@/views/apps/settings/organisation/JobLevel/ViewJobLevel.vue");

const organizationDesignation = () =>
  import("@/views/apps/settings/organisation/Designation/Designation.vue");

  const viewOrganizationDesignation = () =>
  import("@/views/apps/settings/organisation/Designation/ViewDesignation.vue");

const organizationPeople = () =>
  import("@/views/apps/settings/organisation/People/people.vue");

  const viewOrganizationPeople = () =>
  import("@/views/apps/settings/organisation/People/ViewPeople.vue");

export default [
  {
    path: "/settings/organisation",
    name: "organisationSetting",
    component: organization,
  },

  {
    path: "/settings/organisation/structure",
    name: "OrgStructure",
    component: organizationStructure,
  },

  {
    path: "/settings/organisation/create/function",
    name: "CreateOrgFunction",
    component: organizationFunction,
  },

  {
    path: "/settings/organisation/function/:id",
    name: "OrgFunction",
    component: organizationFunction,
  },

  {
    path: "/settings/organisation/create/job-level",
    name: "CreateOrgJobLevel",
    component: organizationJobLevel,
  },

  {
    path: "/settings/organisation/job-level/:id",
    name: "OrgJobLevel",
    component: organizationJobLevel,
  },

  {
    path: "/settings/organisation/job-level/:id/view",
    name: "viewOrganizationJobLevel",
    component: viewOrganizationJobLevel,
  },


  {
    path: "/settings/organisation/create/designation",
    name: "CreateOrgDesignation",
    component: organizationDesignation,
  },

  {
    path: "/settings/organisation/designation/:id/view",
    name: "viewOrganizationDesignation",
    component: viewOrganizationDesignation,
  },

  {
    path: "/settings/organisation/designation/:id",
    name: "OrgDesignation",
    component: organizationDesignation,
  },

  {
    path: "/settings/organisation/create/people",
    name: "CreateOrgPeople",
    component: organizationPeople,
  },

  {
    path: "/settings/organisation/people/:id",
    name: "OrgPeople",
    component: organizationPeople,
  },

  {
    path: "/settings/organisation/people/:id/view",
    name: "ViewOrgPeople",
    component: viewOrganizationPeople,
  },
];
