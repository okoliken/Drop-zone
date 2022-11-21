import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;
const analyticsCenterUrl = {
  getAllCrmLeadCountActionUrl: "/crm/v1/analytics/crm/leads",
  getAllCrmPipelineCountActionUrl: "/crm/v1/analytics/crm/pipeline",
  getAllCrmActivityCountActionUrl: "/crm/v1/analytics/crm/activity",
  getAllCrmActivityTotalPendingTransactionActionUrl:
    "/crm/v1//analytics/crm/activities/total-pending-transaction-count",
  getAllPurchaseSupplyCountActionUrl: "/crm/v1/analytics/purchase/suppliers",
  getAllPurchasePocyleCountActionUrl:
    "/crm/v1/analytics/purchase/po-cycle-time",
  getAllPurchaseLeadCountActionUrl: "/crm/v1/analytics/purchase/lead-time",
  getAllPurchaseAccountPayableCountActionUrl:
    "/crm/v1/analytics/purchase/account-payables",
  // Inventory Analytics
  // getAllStockMovementActionUrl:
  //   "/crm/v1/analytics/inventory/stock-movement",
  getAllInventoryDistributionActionUrl:
    "/cloudenly/accounting/v1/analytics/inventory-distribution",
  getAllStockMovementActionUrl:
    "/optima/v1/analytics/inventory/stock-movement",
  getAllInventoryTurnoverUrl:
    "/cloudenly/accounting/v1/analytics/inventory-turnover",
  getAllInventoryBreakdownUrl:
    "/cloudenly/accounting/v1/analytics/inventory-breakdown",

  getAllQueryUsingDropdownActionUrl:
    "/crm/v1/analytics/crm/leads/by-source/total-leads-count/",
  getAllPurchaseCostmanagementActionUrl:
    "/optima/v1/analytics/purchase/cost-management",

  getAllPurchaseTrendActionUrl: "/optima/v1/analytics/purchase/trend",
  // Sales Analytics
  getRevenueTargetAgentUrl:
    "/cloudenly/accounting/v1/analytics/sales/revenue-vs-target/agent",
  getRevenueTargetOutletUrl:
    "/cloudenly/accounting/v1/analytics/sales/revenue-vs-target/outlet",
  getAccountReceivablesUrl:
    "/optima/v1/analytics/sales/account-receivables/account-receivables",
  getSalesRevenueUrl:
    "/cloudenly/accounting/v1/analytics/sales/products-category",
  getTopSalesUrl:
    "/cloudenly/accounting/v1/analytics/sales/top-products-category",
  getAgentListUrl: "/optima/accounting/v1/analytics/sales/agents-list",
  getAgentPerformanceUrl:
    "/optima/accounting/v1/analytics/sales/agents-performance/:agentId",
  getAccountReceivableSummaryUrl:
    "/optima/v1/analytics/sales/account-receivables/account-receivables",
  getNearestAccountReceivableUrl:
    "/optima/v1/analytics/sales/account-receivables/nearest-account-receivables-breakdown",
  getSalesAccountReceivablesUrl:
    "/optima/v1/analytics/sales/account-receivables/nearest-account-receivables"
};

const state = {
  loading: false,
  error: false,
  crmLeadCount: [],
  crmPipelineCount: [],
  crmActivityCount: [],
  crmActivityTotalPendingTransactionCount: [],
  purchaseSupplyCount: [],
  purchasePocycleCount: [],
  purchaseLeadCount: [],
  purchaseAccountPayableCount: [],
  // inventory analytics
  inventoryDistributionCount: [],
  inventoryDistribution: [],
  stockMovement: [],
  inventoryTurnover: [],
  inventoryBreakdown: [],
  
  queryUsingDropdown: [],
  queryUsingDatepicker: [],
  leadRegisterAndCount: [],
  newLeadCount: [],
  leadCountByIndustries: [],
  highestAndLowestLeadsCount: [],
  industryLeadPercentCountByindustries: [],
  industryLeadsAndCountsOnly: [],
  pipelineTotalLeadCount: [],
  pipelineTotalOpportunityCount: [],
  alllead: [],
  costmanagement : [],
  purchasetrend: [],
  // sales analytics
  revenueTargetAgent: [],
  revenueTargetOutlet: [],
  accountReceivables:[],
  salesRevenue: [],
  agentList: [],
  agentPerformance:[],
  accountReceivableSummary: [],
  nearestAccountReceivable: [],
  salesAccountReceivable : [],
  topsales: []

};

const getters = {
  getAllCrmLeadCount: state => state.crmLeadCount,
  getAllCrmPipelineCount: state => state.crmPipelineCount,
  getAllCrmActivityCount: state => state.crmActivityCount,
  getAllCrmActivityTotalPendingTransactionCount: state =>
    state.crmActivityTotalPendingTransactionCount,
  getAllPurchaseSupplyCount: state => state.purchaseSupplyCount,
  getAllPurchasePocycleCount: state => state.purchasePocycleCount,
  getAllPurchaseLeadCount: state => state.purchaseLeadCount,
  getAllPurchaseAccountPayableCount: state => state.purchaseAccountPayableCount,
  // Inventory analysis

  // getAllInventoryDistributionCount: state => state.invoiceCount,
  getAllInventoryDistribution: state => state.inventoryDistribution,
  getAllStockMovement: state => state.stockMovement,
  getAllInventoryTurnover: state => state.inventoryTurnover,
  getAllInventoryBreakdown: state => state.inventoryBreakdown,

  // getAllStock: state => state.invoiceCount,
  getAllQueryUsingDropdown: state => state.queryUsingDropdown,
  getAllQueryUsingDatepicker: state => state.queryUsingDatepicker,
  getAllLeadRegisterAndCount: state => state.leadRegisterAndCount,
  getNewLeadCount: state => state.newLeadCount,
  getAllLeadCountByIndustries: state => state.leadCountByIndustries,
  getHighestAndLowestLeadCountByIndustries: state =>
    state.highestAndLowestLeadsCount,
  getIndustryLeadPercentAndCountByIndustries: () =>
    state.industryLeadPercentCountByindustries,
  getIndustryLeadPercentAndCountOnly: state => state.industryLeadsAndCountsOnly,
  getPipelineTotalLeadCount: state => state.pipelineTotalLeadCount,
  getPipelineTotalOpportunityCount: state =>
    state.pipelineTotalOpportunityCount,
  getAllLead: state => state.alllead,
  getAllPurchaseCostmanagement: state => state.costmanagement,
  getAllPurchaseTrend: state => state.purchasetrend,
  // sales Analytics
  getRevenueTargetAgent: state => state.revenueTargetAgent,
  getRevenueTargetOutlet: state => state.revenueTargetOutlet,
  getAccountReceiveable: state => state.accountReceivables,
  getSalesRevenue: state => state.salesRevenue,
  getAgentList: state => state.agentList,
  getPerformance: state => state.agentPerformance,
  getAccountReceivableSummary: state => state.accountReceivableSummary,
  getNearestAccountReceivable: state => state.nearestAccountReceivable,
  getSalesAccountReceivable: state => state.salesAccountReceivable,
  getTopSales: state => state.topsales
};

const mutations = {
  mutate_all_crm_lead_count: (state, payload) => (state.crmLeadCount = payload),
  mutate_all_crm_pipeline_count: (state, payload) =>
    (state.crmPipelineCount = payload),
  mutate_all_crm_activity_count: (state, payload) =>
    (state.crmActivityCount = payload),
  mutate_all_crm_activity_total_pending_transaction_count: (state, payload) =>
    (state.crmActivityCount = payload),
  mutate_all_purchase_count: (state, payload) =>
    (state.purchaseSupplyCount = payload),
  mutate_all_purchase_pocycle_count: (state, payload) =>
    (state.purchasePocycleCount = payload),
  mutate_all_purchase_lead_count: (state, payload) =>
    (state.purchaseLeadCount = payload),
  mutate_all_purchase_account_payable_count: (state, payload) =>
    (state.purchaseAccountPayableCount = payload),
  // inventory
  mutate_all_inventory_distribution_count: (state, payload) =>
    (state.inventoryDistributionCount = payload),
  mutate_all_inventory_distribution: (state, payload) =>
    (state.inventoryDistribution = payload),
  mutate_all_stock_movement: (state, payload) =>
    (state.stockMovement = payload),
  mutate_all_inventory_turnover: (state, payload) =>
    (state.inventoryTurnover = payload),
  mutate_all_inventory_breakdown: (state, payload) =>
    (state.inventoryBreakdown = payload),

  
  

  mutate_all_query_using_dropdown: (state, payload) =>
    (state.queryUsingDropdown = payload),
  mutate_all_query_using_datepicker: (state, payload) => {
    state.queryUsingDatepicker = payload;
  },
  all_lead: (state, payload) => {
    state.alllead = payload;
  },

  mutate_all_lead_and_register_count: (state, payload) => {
    state.leadRegisterAndCount = payload;
  },

  mutate_new_lead_count: (state, payload) => {
    state.newLeadCounts = payload;
  },
  mutate_leaad_count_by_industries: (state, payload) => {
    state.leadCountByIndustries = payload;
  },
  mutate_highest_and_lowest_lead_count: (state, payload) => {
    state.highestAndLowestLeadsCount = payload;
  },
  mutate_industry_lead_percentcount_by_industries: (state, payload) => {
    state.industryLeadPercentCountByindustries = payload;
  },
  mutate_industry_lead_percentcount_only: (state, payload) => {
    state.industryLeadsAndCountsOnly = payload;
  },
  mutate_pipeline_total_lead_count: (state, payload) => {
    state.pipelineTotalLeadCount = payload;
  },
  mutate_pipeline_total_opportunity_count: (state, payload) => {
    state.pipelineTotalOpportunityCount = payload;
  },
  mutate_purchase_costmanagement: (state, payload) => {
    state.costmanagement = payload;
  },
  mutate_purchase_trend: (state, payload) => {
    state.purchasetrend = payload;
  },
  // sales analytics
  mutate_revenue_target_agent: (state, payload) => {
    state.revenueTargetAgent = payload;
  },
  mutate_revenue_target_outlet: (state, payload) => {
    state.revenueTargetOutlet = payload;
  },
  mutate_account_receivable: (state, payload) => {
    state.accountReceivables = payload;
  },
  mutate_sales_revenue: (state, payload) => {
    state.salesRevenue = payload;
  },
  mutate_agent_list: (state, payload) => {
    state.agentList = payload;
  },
  mutate_agent_performance: (state, payload) => {
    state.agentPerformance = payload;
  },
  mutate_account_receivable_summary: (state, payload) => {
    state.accountReceivableSummary = payload;
  },
  mutate_nearest_account_receivable: (state, payload) => {
    state.nearestAccountReceivable = payload;
  },
  mutate_sales_account_receivable: (state, payload) => {
    state.salesAccountReceivable = payload;
  },
  mutate_topsales: (state, payload) => {
    state.topsales = payload;
  }
};

// Crm analytics

const actions = {
  getAllCrmLeadCount: async ({ commit, rootState }, payload) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllCrmLeadCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}?howLongInNumber=${payload}&oneOfDaysWeeksMonthsYears=${payload}&startHere=${payload}&endHere=${payload}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_crm_lead_count", data);
  },

  getAllCrmPipelineCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllCrmPipelineCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_crm_pipeline_count", data);
  },

  getAllCrmActivityCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllCrmActivityCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_crm_activity_count", data);
  },

  getAllCrmActivityTotalPendingTransactionCount: async ({
    commit,
    rootState
  }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllCrmActivityTotalPendingTransactionActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_crm_activity_total_pending_transaction_count", data);
  },

  // Purchase Analytics
  getAllPurchaseSupplyCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllPurchaseSupplyCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_purchase_count", data);
  },
  getAllPurchasePocycleCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllPurchasePocyleCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_purchase_pocycle_count", data);
  },
  getAllPurchaseLeadCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllPurchaseLeadCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_purchase_lead_count", data);
  },
  getAllPurchaseAccountPayableCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllPurchaseAccountPayableCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_purchase_account_payable_count", data);
  },
  getAllPurchaseCostmanagement: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllPurchaseCostmanagementActionUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_purchase_costmanagement", data);
  },

  getAllPurchaseTrend: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.132.188.41:7000${analyticsCenterUrl.getAllPurchaseTrendActionUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_purchase_trend", data);
  },

  // Inventory Analytics

  // inventory distribution
  getAllInventoryDistribution: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getAllInventoryDistributionActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_inventory_distribution", data);
  },

  //stock movement
  getAllStockMovement: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllStockMovementActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_stock_movement", data);
  },
  // inventory turnover
  getAllInventoryTurnover: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getAllInventoryTurnoverUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_inventory_turnover", data);
  },

  getAllInventoryBreakdown: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getAllInventoryBreakdownUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_inventory_breakdown", data);
  },

  getAllCrmTotalLeadsCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAllCrmLeadCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_crm_lead_count", data);
    console.log(data);
  },

  getAllQueryUsingDropdown: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${analyticsCenterUrl.getAllQueryUsingDropdownActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}?filterType=fixed&howLongInNumber=2&oneOfDaysWeeksMonthsYears=months`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_all_query_using_dropdown", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getAllQueryUsingDatepicker: ({ rootState, commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${analyticsCenterUrl.getAllQueryUsingDropdownActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}filterType=customrange&startDate=2000-12-12&endDate=2021-12-12`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          commit("mutate_all_query_using_datepicker", resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getAllLeadRegisterAndCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-source/lead-registrars/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_all_lead_and_register_count", data);
  },
  // new endpoint
  getAllLead: async ({ commit, rootState }) => {
    console.log(rootState, "here");
    const { data } = await axios.get(
      `http://18.132.188.41:7000/cloudenly/crm/v1/analytics/crm/lead/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("all_lead", data);
  },
  getNewLeadCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-source/new-leads-count/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_new_lead_count", data);
  },
  getAllLeadCountByIndustries: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-industry/total-leads-count/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_leaad_count_by_industries", data);
  },
  getHighestAndLowestLeadCountByIndustries: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-industry/highest-lowest-lead-counts/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_highest_and_lowest_lead_count", data);
  },
  getIndustryLeadPercentAndCountByIndustries: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-industry/industry-leads-percent-counts/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_industry_lead_percentcount_by_industries", data);
  },
  getIndustryLeadPercentAndCountOnly: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/leads/by-industry/industry-leads-and-counts/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit(" mutate_industry_lead_percentcount_only", data);
  },
  getPipelineTotalLeadCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/pipeline/total-leads-count/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit(" mutate_pipeline_total_lead_count", data);
  },
  getPipelineTotalOpportunityCount: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `localhost:5002/cloudenly/crm/v1/analytics/crm/pipeline/total-opportunity-count/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.orgId.outletId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit(" mutate_pipeline_total_lead_count", data);
  },

  getPipelineCount: ({ rootState }) => {
    return new Promise((resolve, reject) => {
      // commit("loading");
      axios
        .get(
          `${url}${analyticsCenterUrl.getAllCrmPipelineCountActionUrl}/${rootState.auth.auth.authData.orgId}/${rootState.auth.auth.authData.outletId}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // Sales Analytics
  getRevenueTargetAgent: async ({ commit, rootState }) => {
    console.log("I got here");
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getRevenueTargetAgentUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_revenue_target_agent", data);
    console.log(data, "here");
  },
  getRevenueTargetOutlet: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getRevenueTargetOutletUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_revenue_target_outlet", data);
    console.log(data);
  },
  getAccountReceiveable: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAccountReceivablesUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_account_receivable", data);
    console.log(data);
  },
  getSalesRevenue: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getSalesRevenueUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_sales_revenue", data);
    console.log(data);
  },
  getTopSales: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getTopSalesUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_topsales", data);
    console.log(data);
  },
  getAgentList: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getAgentListUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_agent_list", data);
    console.log(data);
  },
  getPerformance: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `http://18.169.96.80:5010${analyticsCenterUrl.getAgentPerformanceUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_agent_performance", data);
    console.log(data);
  },
  getAccountReceivableSummary: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getAccountReceivableSummaryUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_account_receivable_summary", data);
    console.log(data);
  },
  getNearestAccountReceivable: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getNearestAccountReceivableUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_nearest_account_receivable", data);
    console.log(data);
  },
  getSalesAccountReceivable: async ({ commit, rootState }) => {
    const { data } = await axios.get(
      `${url}${analyticsCenterUrl.getSalesAccountReceivablesUrl}/${rootState.auth.auth.authData.orgId}`,
      {
        headers: {
          Accept: "application/json",
          authorization: `${rootState.auth.auth.token}`
        }
      }
    );
    commit("mutate_sales_account_receivable", data.data);
    console.log(data.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
