
import axios from "axios";

import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

// console.log(url , "At approval")

const approvalCenterUrl = {
  getListOfApprovalTaskUrl: "/approval/v1/task/all",
  setApprovalTaskUrl: "/approval/v1/approval/create",
  getSingleApprovalTaskUrl: "/approval/v1/approval/task/all/",
  createApprovalTaskUrl: "/approval/v1/approval/create",
  getModules: "/api/v1/modules",
  getApprovalRequestDetailsActionUrl:"http://35.176.72.183:5003/approval/myapprovalsdetails/",
};

const state = {
  loading: false,
  error: false,
  isApprovalTask: false,
  allApprovalTask: [
    {
      id: "76b8971b-f381-47d4-b5cd-ad1c47b4cb18",
      module: "optima",
      subModule: "sale",
      name: "Create/Issue Sales Invoice",
    },
    {
      id: "fddbdf05-0228-4619-ad01-66084fed9393",
      module: "optima",
      subModule: "sale",
      name: "Discount Invoice/Proforma",
    },
    {
      id: "af318d0b-e717-4568-ac12-fc3f11343160",
      module: "optima",
      subModule: "sale",
      name: "Execute PO",
    },
    {
      id: "8563f6a8-90b1-49bf-bbb1-5662717ccdcc",
      module: "optima",
      subModule: "sale",
      name: "Execute Contract",
    },
    {
      id: "79159131-7fd5-4a8a-9b2a-ff3eb5f898a2",
      module: "optima",
      subModule: "sale",
      name: "Create/Issue Credit Note",
    },
    {
      id: "b737b74c-a52e-4665-9bc1-0e3907cb4e19",
      module: "optima",
      subModule: "sale",
      name: "Create/Issue Waybill",
    },
    {
      id: "e025fbfc-08a3-4a83-9252-88c163f53e5d",
      module: "optima",
      subModule: "sale",
      name: "Apply Credit",
    },
    {
      id: "2c0bf59e-ff9d-4266-9577-80873866505c",
      module: "optima",
      subModule: "sale",
      name: "Create/Issue Payment Receipt",
    },
    {
      id: "dedf1243-f8d5-4afd-ad5c-5e91a41b16f1",
      module: "optima",
      subModule: "inventory",
      name: "Create/Issue Waybill",
    },
    {
      id: "d16eb774-e6c3-4759-a520-02b2551b45e4",
      module: "optima",
      subModule: "inventory",
      name: "Create/Issue Good Received Note",
    },
    {
      id: "a3349dab-f8a1-4eed-829e-37c0fda319fd",
      module: "optima",
      subModule: "inventory",
      name: "Create/issue Material Requisition",
    },
    {
      id: "b502d358-8649-4796-b0a9-8916b4237821",
      module: "optima",
      subModule: "inventory",
      name: "Create/Issue Material Return",
    },
    {
      id: "2059d416-63c6-4a39-9c77-b23d4eaa082c",
      module: "optima",
      subModule: "inventory",
      name: "Initiate Inventory Item Transfer",
    },
    {
      id: "981419df-9900-4899-9d79-165163f9c5a6",
      module: "optima",
      subModule: "inventory",
      name: "Initiate Inventory Item Movement",
    },
    {
      id: "bc0d5354-f0fd-4777-ba41-10ba18249c4d",
      module: "optima",
      subModule: "inventory",
      name: "Create Outlet",
    },
  ],
  allApprovalModules: [],
  createdApprovals: [],
  approvalRequest: [],
  myRequest: [],
  approvals: [],
  myprogress: [],
  history: [],
  eventsAndWorkflow: [],
  allApprovalFlow: [],
  oneApproval:[]

};

const getters = {
  getAllApprovalTaskList: (state) => state.allApprovalTask,
  getIsApprovalTask: (state) => state.isApprovalTask,
  getAllApprovalModules: (state) => state.allApprovalModules,
  getCreatedApprovals: (state) => state.createdApprovals,
  getApprovalRequest: (state) => state.approvalRequest,
  getMyApprovalRequest: (state) => state.myRequest,

  getApprovals: (state) => state.approvals,
  getProgress: (state) => state.myprogress,
  getHistory: (state) => state.history,
  getApprovalEventsWorkflow: (state) => state.eventsAndWorkflow,
  getAllApprovalFlow: (state) => state.allApprovalFlow,
  getOneApprovalFlow: (state) => state.oneApproval,
};

const mutations = {
  mutate_all_approval_task: (state, payload) =>
    (state.allApprovalTask = payload),
  mutate_is_approval_task: (state, payload) => (state.isApprovalTask = payload),
  mutate_all_approval_modules: (state, payload) => {
    state.allApprovalModules = payload;
  },

  mutate_created_approvals: (state, payload) => {
    state.createdApprovals = payload;
  },

  mutate_approvalRequest: (state, payload) => {
    state.approvalRequest = payload;
  },
  mutate_myRequest: (state, payload) => {
    state.myRequest = payload;
  },
  mutate_approvals: (state, payload) => {
    state.approvals = payload;
  },
  mutate_mutate_approvalStatus: (state, payload) => {
    state.approvalStatus = payload;
  },
  mutate_mutate_approvalProgress: (state, payload) => {
    state.myprogress = payload;
  },
  mutate_mutate_approvalHistory: (state, payload) => {
    state.history = payload;
  },
  mutate_mutate_events_workflow: (state, payload) => {
    state.eventsAndWorkflow = payload;
  },
  mutate_mutate_workflow: (state, payload) => {
    state.allApprovalFlow = payload;
  },
  mutate_mutate_one_aproval: (state, payload) => {
    state.oneApproval = payload;
  },
};

const actions = {

  getAllApprovalTask: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${approvalCenterUrl.getListOfApprovalTaskUrl}`, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          commit("mutate_all_approval_task", resp.data.tasks);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleApprovalTask: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${approvalCenterUrl.getSingleApprovalTaskUrl}${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}/${rootState.auth.auth.authData.creatorId}/${payload}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // commit('')
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getApprovalRequest: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approvals/v1/myrequests/${rootState.auth.auth.authData.creatorId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_approvalRequest", data);
    console.log(data);
  },
  // get my request pass request id
  getMyApprovalRequest: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approvals/v1/myrequests/${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit(" mutate_myRequest", data);
    console.log(payload);
  },

  getApprovals: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approvals/v1/myapprovals/${rootState.auth.auth.authData.creatorId}?filter=${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_approvals", data);
  },

  // update approval flow
  updateApprovalFlow: async ({ commit, rootState }, payload) => {
    commit("loading");
    await axios.patch(
      `http://18.132.188.41:7000/approvals/v1/update/${payload.id}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
  },
  // Delete Approval Flow
  deleteApprovalFlow: async ({ commit, rootState, dispatch }, payload) => {
    commit("loading");
    await axios.delete(
      `http://18.132.188.41:7000/approvals/v1/delete/${payload.id}`,

      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );

    dispatch("getAllApprovalFlow");
  },
  // Get events and workflow
  getApprovalEventsWorkflow: async ({ rootState, commit }) => {
    const { data } = await axios.get(
      `${url}/approvals/v1/actions/optima/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    // console.log(data , "here is the data")
    commit("mutate_mutate_events_workflow", data);
  },

  // Get all approval flow pass action id
  getAllApprovalFlow: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `${url}/approvals/v1/all/${rootState.auth.auth.authData.orgId}/${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    // console.log(data , "workflow here")
    commit("mutate_mutate_workflow", data);
  },

  // Get one approval flow pass approval id
  getOneApprovalFlow: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approvals/v1/one/${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    console.log(data);
    commit("mutate_mutate_one_aproval", data);
  },

  // check  workflow
  checkWorkflow: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approvals/v1/actions/validate`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit(" mutate_mutate_events_workflow", data);
  },

  getProgress: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approval/inprogress/${rootState.auth.auth.authData.creatorId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_mutate_approvalProgress", data);
  },

  getHistory: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approval/history/${rootState.auth.auth.authData.creatorId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_mutate_approvalHistory", data);
  },
  
  getApprovalStatus: async ({ commit, rootState, requestId }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000/approval/status/${requestId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`,
        },
      }
    );
    commit("mutate_approvalStatus", data.data);
  },

  approveRequest: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://35.176.72.183:5003/approval/approve`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getApprovals");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  disapproveRequest: ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://35.176.72.183:5003/approval/reject`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          resolve(resp);
          dispatch("getApprovals");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createApprovalTask: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${approvalCenterUrl.createApprovalTaskUrl}`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // commit('')
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // eslint-disable-next-line no-unused-vars   http://35.176.72.183:5003/approval/create
  // eslint-disable-next-line no-unused-vars
  getModules: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/api/v1/modules`, null, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // commit('')

          if (process.env.NODE_ENV === "development") {
            // console.log(JSON.stringify(resp.data,null,2));
          }

          commit("mutate_all_approval_modules", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createApproval: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/approvals/v1/create`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          console.log(JSON.stringify(resp, null, 2));
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editApproval: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/approval/edit`, payload, {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`,
          },
        })
        .then((resp) => {
          // commit('')
          console.log(JSON.stringify(resp, null, 2));
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCreatedApprovals: ({ rootState, commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/approval/all/${rootState.auth.auth.authData.creatorId}?module=${payload.module}&submodule=${payload.submodule}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          // commit('')

          if (process.env.NODE_ENV === "development") {
            console.log(JSON.stringify(resp.data.approval, null, 2));
            // console.log(JSON.stringify(resp.data,null,2));
          }

          commit("mutate_created_approvals", resp.data.approval);
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  
};
