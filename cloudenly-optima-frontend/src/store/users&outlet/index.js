/* eslint-disable no-dupe-keys */
/*eslint-env node*/
import axios from "axios";

// /org/all/optima/accounts/
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// new roles and privileges implementation

const userOutletUrl = {
  getOutletIdUrl: "/org/",
  createOutletUrl: "/org/",
  deleteOutletUrl: "/org/outlet/delete",
  editOutletUrl: "/org/outlet/update",

  // users
  allOrgUsersUrl: "/user/",
  createUserUrl: "/user/",
  getUserUrl: "/org/",
  getUserCreationDataUrl: "/user/",

  // Functions
  getFunctionUrl: "/org/",
  createFunctionUrl: "/org/functions",
  orgFunctionsDataUrl: "/org/",

  // Levels
  getLevelUrl: "",
  createLevelUrl: "",

  // Roles and Privileges
  getRolesUrl: "",
  createRolesUrl: "",
  getSingleRolePrivileges: "/roles/",

  // Level
  getLevelUrl: "",
  createLevelUrl: "/org/",

  // optima account holder
  globalNetworkUrl: "/org/all/optima/accounts",

  // organisation profile url
  getOrganisationUrl: "/org",
  updateOrganisationProfile: "",
};

const state = {
  loading: false,
  error: false,
  isOutletCreated: false,
  isOptimaUserCreated: false,
  isOrgUserCreated: false,
  isFunctionSetup: false,
  isLevelSetup: false,
  level: [],
  levelCategory: [],

  hierarchy: [],

  isDesignationCreated: false,
  designations: [],

  organisationLocations: {
    outlets : [],
    meta : ""
  },
  optimaOutlets: [],

  organisationUsers: [],
  optimaUsers: [],

  orgFunction: [],
  orgRoles: [],
  defineOptimaRoles: [],
  singleRolePrivilege: [],

  allGlobalNetwork: {
    total: 0,
    pageSize: 0,
    accounts: [],
  },

  industriesWithSubindustries: [],

  organisationProfile: {},

  // organisation people
  orgPeople: [],

  orgFunctionHierarchy: [],

  orgLevelTag: [],
  orgLevelCategory: [],
  orgStructure: {},
  users: [],
  inactiveUsers: [],
  activeUsers: [],
  groups: {
    functional: [],
    management: [],
    project: [],
  },
  group: {},
  singleOutlet: {},

  // New Optima Roles and privileges

  organisationOptimaRoles: [],
  organisationOptimaRolesPrivileges: [],
};

const getters = {
  getIsOutletCreated: (state) => state.isOutletCreated,
  getIsOptimaUserCreated: (state) => state.isOptimaUserCreated,
  getIsOrgUserCreated: (state) => state.isOrgUserCreated,

  getOutlets: (state) => state.outlets,
  getUsers: (state) => state.users,
  getInactiveUsers: (state) =>
    state.users.map((item) => ({
      id: item.id,
      name: `${item.fname} ${item.lname}`,
      reason: item.deactivationReason || "Nil",
      date: item.updatedAt,
    })),

  getAllOrganisationLocation: (state) => state.organisationLocations,  // outlet api

  getOptimaOutlet: (state) => state.optimaOutlets, // outlet api

  getAllOrganisationUsers: (state) => state.organisationUsers, 

  getOptimaUsers: (state) => state.optimaUsers,

  getOrgFunction: (state) => state.orgFunction,
  getIsFunctionSetUp: (state) => state.isFunctionSetup,

  getIsLevelSetup: (state) => state.isLevelSetup,
  getLevel: (state) => state.level,

  getHierarchy: (state) => state.hierarchy,
  getOrgRoles: (state) => state.orgRoles,
  getDefineOptimaRoles: (state) => state.defineOptimaRoles,
  getSingleRolePrivilege: (state) => state.singleRolePrivilege,
  getOrganisationProfile: (state) => state.organisationProfile,
  getGlobalNetwork: (state) => state.allGlobalNetwork,

  // designation section
  getDesignation: (state) => state.designations,
  getIsDesignationCreated: (state) => state.isDesignationCreated,

  getOrganisationPeople: (state) => state.orgPeople,

  //  get organisation function hierarchy
  getFunctionHierarchy: (state) => state.orgFunctionHierarchy,
  getOrgLevelTags: (state) => state.orgLevelTag,

  getOrgLevelCategory: (state) => state.orgLevelCategory,
  getFunctionalGroups: (state) => state.groups.functional,
  getManagementGroups: (state) => state.groups.management,
  getProjectGroups: (state) => state.groups.project,
  getGroup: (state) => state.group,
  getIndustriesWithSubindustries: (state) => state.industriesWithSubindustries,

  // new roles and priviledges
  getOrganisationOptimaRoles: (state) => state.organisationOptimaRoles,
  getOrganisationOptimaRolesPrivileges: (state) =>
    state.organisationOptimaRolesPrivileges,
};

const actions = {

  getAllOrganisationLocations: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.getOutletIdUrl}${rootState.auth.auth.authData.orgId}/outlet`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_org_location", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  getOptimaOrganisationOutlet: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.getOutletIdUrl}${rootState.auth.auth.authData.orgId}/outlets/optima`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
          commit("mutate_optima_outlet", resp.data.outlets);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  async getSingleOutlet({ commit, rootState }, payload) {
    try {
      const endpoint = `/org/outlets/id/${payload}`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.get(`${url}${endpoint}`, headers);

      commit("SET_SINGLE_OUTLET", data.outlet);
    } catch (err) {
      console.log(err);
    }
  },

  createOutlet: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${userOutletUrl.createOutletUrl}${rootState.auth.auth.authData.orgId}/outlet`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getAllOrganisationLocations");
          dispatch("getOptimaOrganisationOutlet");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteOutlet: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}${userOutletUrl.deleteOutletUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getAllOrganisationLocations");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOutlet: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}${userOutletUrl.editOutletUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOptimaOrganisationOutlet");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOptimaOrgUsers: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/org/${rootState.auth.auth.authData.orgId}/users`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // console.log(resp.data, "===> user")
          commit("mutate_optima_users", resp.data.users);
          if (resp.data.users.length === 0) {
            commit("mutate_isOptimaUserCreated", false);
          } else {
            commit("mutate_isOptimaUserCreated", true);
            commit("mutate_org_users", resp.data.users);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOrganisationUsers: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      const endpoint = `${url}${userOutletUrl.allOrgUsersUrl}${rootState.auth.auth.authData.orgId}`;

      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };
      axios
        .get(endpoint, { headers })
        .then((resp) => {
          commit("mutate_org_users", resp.data);
          if (resp.data.length === 0) {
            commit("mutate_isOrgUserCreated", false);
          } else {
            commit("mutate_isOrgUserCreated", true);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUsers: async ({ commit, rootState }, payload = { isActive: true }) => {
    try {
      // const defaultAttributes = "attributes=optimaRole,id,isRoot,fname,lname,email,isEmployee,createdAt,photo,isActive,updatedAt,deactivationReason";
      const defaultAttributes =
        "attributes=id,isRoot,fname,lname,email,isEmployee,createdAt,photo,isActive,updatedAt,deactivationReason";

      const endpoint = `${url}${userOutletUrl.allOrgUsersUrl}${rootState.auth.auth.authData.orgId}?${defaultAttributes}&isActive=${payload.isActive}`;

      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };

      const { data } = await axios.get(endpoint, { headers });

      commit("SET_USERS", data);

      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getSingleUser: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/users/${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createUser: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgUsers"), resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createOrgPeople: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/people`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgUsers"), resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // deleteUser: ({dispatch, rootState}, payload) => {
  //   return new Promise((resolve, reject) => {
  //     axios.delete(`${url}/org/levels`,
  //     {
  //       headers : {
  //      Accept: "application/json",
  //      authorization : `${rootState.auth.auth.token}`
  //      },
  //      data: payload
  //     }).then(resp => {
  //      dispatch('getOrgLevels')
  //      resolve(resp)
  //    }).catch(err => {
  //      reject(err)
  //    })
  //   })
  // },

  updateUser: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}/user/${payload.id || payload.userId}/update`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          if (payload.isActive) {
            dispatch("getUsers", { isActive: false });
          } else {
            dispatch("getUsers");
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOrgFunction: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.getFunctionUrl}${rootState.auth.auth.authData.orgId}/functions`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.functions.length === 0) {
            commit("mutate_isFunctionSetup", false);
          } else {
            commit("mutate_isFunctionSetup", true);
            commit("mutate_orgFunction", resp.data.functions);
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleOrgFunction: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${userOutletUrl.getFunctionUrl}functions/${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createFunction: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${userOutletUrl.createFunctionUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgFunction");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteFunction: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/org/functions/${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgFunction");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateFunction: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}/org/functions`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgFunction");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOptimaOrgRoles: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/roles/optima/${rootState.auth.auth.authData.orgId}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_orgRoles", resp.data.roles);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // this route not found
  getFunctionData: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/functions/create/details`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.functions.length === 0) {
            commit("mutate_isFunctionSetup", false);
          } else {
            commit("mutate_isFunctionSetup", true);
          }
          commit("mutate_Level", resp.data.levels);
          commit("mutate_hierarchy", resp.data.hierarchies);
          commit("mutate_orgFunction", resp.data.functions);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserCreationData: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.getUserCreationDataUrl}${rootState.auth.auth.authData.orgId}/creation-data`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getDefinePrivilege: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/roles/privileges/list`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_defineOptimaRole", resp.data.optima);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getRolePrivilegeId: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/roles/${payload}/privileges/optima`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // console.log(resp.data);
          commit("mutate_singleRolePrivilege", resp.data.rolePrivileges);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createRoles: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/roles/optima`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateRole: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}/roles/privileges/optima/update`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // get all optima account
  getGlobalNetwork: async ({ commit, rootState }, payload) => {
    try {
      const endpoint = `${url}${
        userOutletUrl.globalNetworkUrl
      }?page=${payload?.currentPage || 1}&count=${payload?.perPage || 10}`;

      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };

      const { data } = await axios.get(endpoint, { headers }); //{data.accounts} specialization  is undefined here thereby affecting globalSupplierNetwork.vue data rendering
      commit("SET_GLOBAL_NETWORK", data);
    } catch (err) {
      console.log(err);
    }
  },

  // get all optima account
  getOrganisationProfile: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.getOrganisationUrl}/${rootState.auth.auth.authData.orgId}/settings`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_organisationProfile", resp.data.org);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOrganisationProfile: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${url}${userOutletUrl.getOrganisationUrl}/${rootState.auth.auth.authData.orgId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          },
          payload
        )
        .then((resp) => {
          resolve(resp);
          dispatch("");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // get levels
  getOrgLevels: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/levels`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isLevelSetup", false);
          } else {
            commit("mutate_isLevelSetup", true);
            commit("mutate_Level", resp.data.levels);
          }

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createOrgLevel: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${userOutletUrl.orgFunctionsDataUrl}levels`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgLevels");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleJobLevel: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${userOutletUrl.orgFunctionsDataUrl}levels/${payload}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          if (resp.data.length === 0) {
            commit("mutate_isLevelSetup", false);
          } else {
            commit("mutate_isLevelSetup", true);
            commit("mutate_Level", resp.data.levels);
          }

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateJobLevel: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}/org/levels`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgLevels");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteJobLevel: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/org/levels`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getOrgLevels");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getJobLevelCategory: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${userOutletUrl.orgFunctionsDataUrl}levels/categories`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_orgLevelCategory", resp.data.categories);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getJobTag: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/levels/tags`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_jobTag", resp.data.tags);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createJobTag: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/levels`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getJobTag");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //designation section
  getOrgDesignation: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/designations`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data.designations.length === 0) {
            commit("mutate_isDesignation", false);
          } else {
            commit("mutate_isDesignation", true);
            commit("mutate_designation", resp.data.designations);
          }

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleDesignation: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}designations/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createOrgDesignation: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}${userOutletUrl.orgFunctionsDataUrl}designations`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          dispatch("getOrgDesignation");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteDesignation: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/org/designations`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
          data: payload,
        })
        .then((resp) => {
          dispatch("getOrgDesignation");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateDesignation: ({ rootState, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${url}/org/designations`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          dispatch("getOrgDesignation");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // functional hierarchy section
  getFunctionHierarchy: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${userOutletUrl.orgFunctionsDataUrl}${rootState.auth.auth.authData.orgId}/hierarchies`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          commit("mutate_functionHierarchy", resp.data.hierarchies);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOrgStructure: async ({ commit, rootState }) => {
    try {
      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.get(
        `${url}/org/${rootState.auth.auth.authData.orgId}/functions/structure`,
        headers
      );

      commit("SET_ORG_STRUCTURE", data.orgStructure[0]);
    } catch (err) {
      console.log(err);
    }
  },

  getGroups: async ({ commit, rootState }, payload) => {
    const orgId = rootState.auth.auth.authData.orgId;

    const getEndpoint = () => {
      if (payload)
        return `${url}/org/${orgId}/groups?type=${payload.type}&status=${payload.status}`;
      return `${url}/org/${orgId}/groups/functional`;
    };

    try {
      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };

      const { data } = await axios.get(getEndpoint(), { headers });

      commit("SET_GROUPS", { type: payload && payload.type, data });
    } catch (err) {
      console.log(err);
    }
  },

  createGroup: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      return await axios.post(endpoint, payload, headers);
    } catch (err) {
      console.log(err);
    }
  },

  updateGroup: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      return await axios.patch(endpoint, payload, headers);
    } catch (err) {
      console.log(err);
    }
  },

  deleteGroup: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups/${payload}`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      return await axios.delete(endpoint, headers);
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  getGroupWithMembers: async ({ commit, rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups/${payload}/members`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.get(endpoint, headers);
      commit("SET_GROUP", data.group);
    } catch (err) {
      console.log(err);
    }
  },

  updateGroupMemberStatus: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups/member/admin-status`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.patch(endpoint, payload, headers);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  removeGroupMember: async ({ rootState }, payload) => {
    try {
      console.log("payload", payload);
      const endpoint = `${url}/org/groups/members/${payload}`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.delete(endpoint, headers);

      return data;
    } catch (err) {
      console.log(err);
    }
  },

  addMembersToGroup: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/org/groups/members`;

      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };

      const { data } = await axios.post(endpoint, payload, headers);

      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getIndustriesWithSubindustries: async ({ commit, rootState }) => {
    try {
      const endpoint = `${url}/utilities/industries/subIndustries`;

      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };

      const { data } = await axios.get(endpoint, { headers });
      commit("SET_INDUSTRIES_WITH_SUB_INDUSTRIES", data.industries);
    } catch (err) {
      console.log(err);
    }
  },

  // new roles and privileges
  //get organisation optima roles
  getNewOrgOptimaRoles: async ({ commit, rootState }) => {
    try {
      const endpoint = `${url}/roles/${rootState.auth.auth.authData.orgId}/optima`;
      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };
      const { data } = await axios.get(endpoint, { headers });
      //  console.log(data.roles)
      commit("SET_OPTIMA_ROLES", data.roles);
    } catch (error) {
      console.log(error);
    }
  },

  //get app optima modules and privileges
  getAppsRolesAndPrivileges: async ({ commit, rootState }) => {
    try {
      const endpoint = `${url}/apps/optima/privileges`;
      const headers = {
        Accept: "application/json",
        authorization: `${rootState.auth.auth.token}`,
      };
      const { data } = await axios.get(endpoint, { headers });
      // console.log(data.modules);
      commit("SET_OPTIMA_ROLES_PRIVILEGES", data.modules);
    } catch (error) {
      console.log(error);
    }
  },

  //create a new Roles
  createNewOptimaRoles: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/roles`;
      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };
      return await axios.post(endpoint, payload, headers);
    } catch (err) {
      console.log(err);
    }
  },

  updateNewOptimaRoles: async ({ rootState }, payload) => {
    try {
      const endpoint = `${url}/roles`;
      const headers = {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      };
      const { data } = await axios.patch(endpoint, payload, headers);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getOptimaUserRoleWithPrivileges: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/roles/${payload}/privileges`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // console.log(resp.data.modules);
          commit("mutate_singleRolePrivilege", resp.data.modules);
          commit("SET_OPTIMA_ROLES_PRIVILEGES", resp.data.modules);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const mutations = {
  mutate_org_location: (state, payload) =>
    (state.organisationLocations = payload),
  mutate_optima_outlet: (state, payload) => (state.optimaOutlets = payload),
  SET_SINGLE_OUTLET: (state, payload) => (state.singleOutlet = payload),
  mutate_optima_users: (state, payload) => (state.optimaUsers = payload),
  mutate_org_users: (state, payload) => (state.organisationUsers = payload),

  mutate_isOptimaUserCreated: (state, payload) =>
    (state.isOptimaUserCreated = payload),
  mutate_isOrgUserCreated: (state, payload) =>
    (state.isOrgUserCreated = payload),

  mutate_isFunctionSetup: (state, payload) => (state.isFunctionSetup = payload),
  mutate_orgFunction: (state, payload) => (state.orgFunction = payload),
  mutate_isLevelSetup: (state, payload) => (state.isLevelSetup = payload),
  mutate_Level: (state, payload) => (state.level = payload),
  mutate_jobTag: (state, payload) => (state.orgLevelTag = payload),
  mutate_hierarchy: (state, payload) => (state.hierarchy = payload),
  mutate_orgRoles: (state, payload) => (state.orgRoles = payload),
  mutate_defineOptimaRole: (state, payload) =>
    (state.defineOptimaRoles = payload),
  mutate_singleRolePrivilege: (state, payload) =>
    (state.singleRolePrivilege = payload),
  mutate_organisationProfile: (state, payload) =>
    (state.getOrganisationProfile = payload),

  // designation
  mutate_designation: (state, payload) => (state.designations = payload),
  mutate_isDesignation: (state, payload) =>
    (state.isDesignationCreated = payload),

  // function hierarchy

  mutate_functionHierarchy: (state, payload) =>
    (state.orgFunctionHierarchy = payload),

  mutate_orgLevelCategory: (state, payload) =>
    (state.orgLevelCategory = payload),

  SET_USERS: (state, payload) => (state.users = payload),

  SET_ORG_STRUCTURE: (state, payload) => (state.orgStructure = payload),

  SET_GROUPS: (state, { type, data }) => {
    if (type === "management") {
      state.groups.management = data.groups;
    } else if (type === "project") {
      state.groups.project = data.groups;
    } else {
      state.groups.functional = data.functions;
    }
  },
  SET_GROUP: (state, payload) => (state.group = payload),
  SET_GLOBAL_NETWORK: (state, payload) => {
    state.allGlobalNetwork = {
      total: payload.links.meta.total,
      pageSize: payload.links.meta.lastPage,
      accounts: payload.accounts,
    };
  },
  SET_INDUSTRIES_WITH_SUB_INDUSTRIES: (state, payload) => {
    state.industriesWithSubindustries = payload;
  },

  SET_OPTIMA_ROLES: (state, payload) => {
    state.organisationOptimaRoles = payload;
  },

  SET_OPTIMA_ROLES_PRIVILEGES: (state, payload) => {
    state.organisationOptimaRolesPrivileges = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
