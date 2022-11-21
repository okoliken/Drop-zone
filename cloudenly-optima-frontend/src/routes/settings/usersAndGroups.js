const usersAndGroups = () => import("@/views/apps/settings/usersAndGroups");

const user = () =>
  import("@/views/apps/settings/usersAndGroups/users/user.vue");

const group = () =>
  import("@/views/apps/settings/usersAndGroups/groups/group.vue");

const groupView = () =>
  import("@/views/apps/settings/usersAndGroups/groups/groupView.vue");

export default [
  {
    path: "/settings/users-and-groups",
    name: "usersAndGroups",
    component: usersAndGroups,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/users-and-groups/user/new",
    name: "createUser",
    component: user,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/users-and-groups/user/:id",
    name: "editUser",
    component: user,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/users-and-groups/group/new",
    name: "createGroup",
    component: group,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/users-and-groups/group/:id",
    name: "editGroup",
    component: group,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/settings/users-and-groups/group/:id/view",
    name: "viewGroup",
    component: groupView,
    meta: {
      requiresAuth: true,
    },
  },
];
