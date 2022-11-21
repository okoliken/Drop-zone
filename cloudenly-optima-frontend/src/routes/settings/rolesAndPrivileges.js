const rolesAndPrivileges = () =>
  import("@/views/apps/settings/rolesAndPrivileges");

const roleAndPrivilege = () =>
  import("@/views/apps/settings/rolesAndPrivileges/roleAndPrivilege.vue");

export default [
  {
    path: "/settings/roles-and-privileges",
    name: "rolesAndPrivileges",
    component: rolesAndPrivileges,
  },

  {
    path: "/settings/roles-and-privileges/new",
    name: "createRoleAndPrivilege",
    component: roleAndPrivilege,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/roles-and-privileges/:id",
    name: "roleAndPrivilege",
    component: roleAndPrivilege,
    meta: {
      requiresAuth: true,
    },
  },
];
