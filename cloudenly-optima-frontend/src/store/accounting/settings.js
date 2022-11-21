import axios from "axios";
// import setEnv from "../../utils/setEnv"
// const url = setEnv(process.env).quantumServiceURL
const url = "http://18.169.96.80:5010/cloudenly";

// cloudenly/accounting/v1/chart-of-accounts/
// cloudenly/accounting/v1/cost-centres/all
const accountingUrl = {
  //chart of Account
  getAllChartOfAccountsUrl: "/accounting/v1/chart-of-accounts/all/",
  createChartOfAccountUrl: "/accounting/v1/chart-of-accounts/one/",
  deleteChartOfAccountUrl: "/accounting/v1/chart-of-accounts/one/",
  //Cost Center
  getAllCostCentreUrl: "/accounting/v1/cost-centres/all/",
  deleteCostCentreUrl: "/accounting/v1/cost-centres/one/",
  oneCostCentreUrl: "/accounting/v1/cost-centres/one/",
  createCostCentreUrl: "/accounting/v1/cost-centres/one/",

  getAllExpenditureCodeUrl: "/accounting/v1/expenditure-or-revenue-codes/all/",
  getAllRevenueCodesUrl: "/accounting/v1/expenditure-or-revenue-codes/all/",

  //Category section
  getAllCategoriesUrl: "/accounting/v1/categories/all/",
  deleteCategoriesUrl: "/accounting/v1/categories/one/",
  createCategoryUrl: "/accounting/v1/categories/one/",

  createExpenditureCostCenterUrl:
    "/accounting/v1/expenditure-or-revenue-cost-centre-account/one/",
  createRevenueCostCenterUrl:
    "/accounting/v1/expenditure-or-revenue-cost-centre-account/one/",
  getOneCategoryUrl: "/accounting/v1/categories/one/",
  createOneCategoryUrl: "/accounting/v1/expenditure-or-revenue-codes/one/",
  getSubGroupUrl: "/accounting/v1/sub-groups/all/",
  getFinReportUrl: "/accounting/v1/financial-reports/",
  getAllExpenditureRegisterUrl:
    "/accounting/v1/expenditure-or-revenue-registers/all/",
  getAllRevenueRegisterUrl:
    "/accounting/v1/expenditure-or-revenue-registers/all/",

  //expenditure or revenue cost center account
  createExpenditureOrRevenueCostCenterAccountUrl:
    "/accounting/v1/expenditure-or-revenue-cost-centre-account/one",
  getExpenditureOrRevenueCostCenterAccountUrl:
    "/accounting/v1/expenditure-or-revenue-cost-centre-account/all/",
  getAccountListFromExpOrRevCostCentreUrl:
    "/accounting/v1/expenditure-or-revenue-cost-centre-account-list/",

  // Income statement
  getAllIncomeStatementUrl: "/accounting/v1/statement/all/"
};

const state = {
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
  allChartOfAccounts: [],
  allExpenditureCodes: [],
  allExpenditureRegister: [],
  oneCategory: [],
  allRevenueRegister: [],
  allCostCentres: [],
  oneCostCentre: {},
  oneCostCentreId: "",
  allRevenueCodes: [],
  allCategories: [],
  oneChartOfAccount: [],
  expenditureCostCenterAccount: [],
  revenueCostCenterAccount: [],
  accListFromExpOrRevCostCentre: [],
  allIncomeStatements: []
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  getAllChartOfAccounts: state => state.allChartOfAccounts,
  getAllExpenditureCodes: state => state.allExpenditureCodes,
  getAllCostCentres: state => state.allCostCentres,
  getOneCostCentre: state => state.oneCostCentre,
  oneCostCentreId: state => state.oneCostCentreId,
  getAllRevenueCodes: state => state.allRevenueCodes,
  getAllExpenditureRegister: state => state.allExpenditureRegister,
  getAllRevenueRegister: state => state.allRevenueRegister,
  getAllCategories: state => state.allCategories,
  getOneCategory: state => state.allCategories,
  getAllExpenditureCostCenterAccount: state =>
    state.expenditureCostCenterAccount,
  getAllRevenueCostCenterAccount: state => state.revenueCostCenterAccount,
  getAccListFromExpOrRevCostCentre: state =>
    state.accListFromExpOrRevCostCentre,
  getAllIncomeStatements: state => state.allIncomeStatements
};

const mutations = {
  loading: state => {
    state.loading = true;
  },
  mutate_error: (state, payload) => {
    state.error = payload;
  },
  mutate_allChartOfAccounts: (state, payload) => {
    state.allChartOfAccounts = payload;
  },
  mutate_allExpenditureCodes: (state, payload) => {
    state.allExpenditureCodes = payload;
  },
  mutate_allCostCentres: (state, payload) => {
    state.allCostCentres = payload;
  },
  mutate_allExpenditureRegister: (state, payload) => {
    state.allExpenditureRegister = payload;
  },
  mutate_allRevenueRegister: (state, payload) => {
    state.allRevenueRegister = payload;
  },
  mutate_allRevenueCodes: (state, payload) => {
    state.allRevenueCodes = payload;
  },
  mutate_oneCostCentre: (state, payload) => {
    state.oneCostCentre = payload;
  },
  mutate_oneCostCentreId: (state, payload) => {
    state.oneCostCentreId = payload;
  },
  mutate_allCategories: (state, payload) => {
    state.allCategories = payload;
  },
  mutate_oneCategory: (state, payload) => {
    state.oneCategory = payload;
  },
  mutate_oneChartOfAccount: (state, payload) => {
    state.oneChartOfAccount = payload;
  },
  mutate_expenditureCostCenter: (state, payload) => {
    state.expenditureCostCenterAccount = payload;
  },
  mutate_revenueCostCenter: (state, payload) => {
    state.revenueCostCenterAccount = payload;
  },
  mutate_accListFromExpOrRevCostCentre: (state, payload) => {
    state.accListFromExpOrRevCostCentre = payload;
  },
  mutate_allIncomeStatements: (state, payload) => {
    state.allIncomeStatements = payload;
  }
};

const actions = {

  getAllChartOfAccounts: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllChartOfAccountsUrl}${rootState.auth.auth.authData.orgId}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      // console.log(data , "chart of account here")
      commit("mutate_allChartOfAccounts", data.accounts);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  // add to COA
  createChartOfAccount: async ({ dispatch, rootState }, payload) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        `${url}${accountingUrl.createChartOfAccountUrl}`,
        payload,

        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      console.log(data);
      await dispatch("getAllChartOfAccounts");
    } catch (error) {
      console.log(error.response.data);
    }
  },

  deleteChartOfAccount: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      console.log(payload.id, "test payload");
      axios
        .delete(
          `${url}${accountingUrl.deleteChartOfAccountUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getAllChartOfAccounts");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),

  getAllExpenditureCodes: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllExpenditureCodeUrl}${rootState.auth.auth.authData.orgId}/expenditure`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );

      commit("mutate_allExpenditureCodes", data.expenditureOrRevenueCodes);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  getAllExpenditureRegister: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllExpenditureRegisterUrl}${rootState.auth.auth.authData.orgId}/expenditure`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      commit(
        "mutate_allExpenditureRegister",
        data.expendituresOrRevenueRegisters
      );
    } catch (error) {
      console.log(error.response.data);
    }
  },

  getAllRevenueRegister: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllRevenueRegisterUrl}${rootState.auth.auth.authData.orgId}/revenue`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      commit("mutate_allRevenueRegister", data.expendituresOrRevenueRegisters);
      console.log(data, "revenue register");
    } catch (error) {
      console.log(error.response.data);
    }
  },

  getAllRevenueCodes: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllRevenueCodesUrl}${rootState.auth.auth.authData.orgId}/revenue`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      commit("mutate_allRevenueCodes", data.expenditureOrRevenueCodes);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  getAllCategories: async ({ commit, rootState }) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getAllCategoriesUrl}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      commit("mutate_allCategories", data.categories);
    } catch (error) {
      console.log(error.response.data);
    }
  },

 
  getOneCategory: async ({ commit, rootState }, id) => {
    try {
      const { data } = await axios.get(
        `${url}${accountingUrl.getOneCategoryUrl}${rootState.auth.auth.authData.orgId}/${id}`,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      commit("mutate_allCategories", data.categories);
      commit("mutate_oneCategory", data.categories);
    } catch (error) {
      console.log(error.response.data);
    }
  },

  createOneCategory: async ({ commit, dispatch, rootState }, payload) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        `${url}${accountingUrl.createOneCategoryUrl}`,
        payload,
        {
          headers: {
            Accept: "application/json",
            authorization: `${rootState.auth.auth.token}`
          }
        }
      );
      dispatch("getAllCategories");
      commit("mutate_error", false);
    } catch (error) {
      console.log(error.response.data);
      commit("mutate_error", true);
    }
  },

  deleteCategory: ({ dispatch, rootState }, payload) =>
    new Promise((resolve, reject) => {
      console.log(payload.id, "test payload id");
      axios
        .delete(
          `${url}${accountingUrl.deleteCategoriesUrl}${rootState.auth.auth.authData.orgId}/${payload.id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`
            }
          }
        )
        .then(resp => {
          dispatch("getAllCategories");
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),

	getAllCostCentres: async ({ commit, rootState }) => {
		try {
			const { data } = await axios.get(
				`${url}${accountingUrl.getAllCostCentreUrl}${rootState.auth.auth.authData.orgId}`,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			// console.log(data.costCentres, 'Cost centre here');
			commit('mutate_allCostCentres', data.costCentres);
		} catch (error) {
			console.log(error.response.data);
		}
	},

	createCostCentre: async ({ dispatch, rootState }, payload) => {
		return new Promise((resolve, reject) => {
			// console.log(payload, 'test payload')
			axios
				.post(`${url}${accountingUrl.oneCostCentreUrl}`, payload,  {
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				})
				.then((resp) => {
					resolve(resp);
					dispatch('getAllCostCentres');
					
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	getOneCostCentre: async ({ commit, dispatch, rootState }) => {
		const { orgId } = rootState.auth.auth.authData;
		const { functionId } = rootState.auth.auth.userData;
		// try {
		await axios
			.get(`${url}${accountingUrl.oneCostCentreUrl}${orgId}/${functionId}`, {
				headers: {
					Accept: 'application/json',
					authorization: `${rootState.auth.auth.token}`,
				},
			})
			.then(({ data }) => {
				commit('mutate_oneCostCentre', data.costCentre);
				// commit("mutate_oneCostCentreId", data.costCentre.id);
			})
			.then(() => {
				dispatch('getAllExpCostCentres');
			})
			.catch((err) => console.log(err.response.data));
	},

	// delete cost centers
	deleteCostCenter: ({ dispatch, rootState }, payload) =>
		new Promise((resolve, reject) => {
			console.log(payload, 'test payload for delete ')
			const { orgId } = rootState.auth.auth.authData;
			axios
				.delete(`${url}${accountingUrl.deleteCostCentreUrl}${orgId}/${payload.id}`, {
					headers: {
						Accept: "application/json",
						authorization: `${rootState.auth.auth.token}`,
					},

				})
				.then((resp) => {
					dispatch("getAllCostCentres");
					resolve(resp);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		}),

	createExpenditureCostCenter: async ({ dispatch, rootState }, payload) => {
		console.log(payload);
		try {
			await axios.post(
				`${url}${accountingUrl.createExpenditureCostCenterUrl}`,
				payload,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			dispatch('getAllExpCostCentres');
		} catch (error) {
			console.log(error.response.data);
		}
	},

	createRevenueCostCenter: async ({ dispatch, rootState }, payload) => {
		console.log(payload);
		try {
			await axios.post(
				`${url}${accountingUrl.createRevenueCostCenterUrl}`,
				payload,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			dispatch('getAllRevenueCostCentres');
		} catch (error) {
			console.log(error.response.data);
		}
	},

	getSubGroup: ({ rootState }) => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${url}${accountingUrl.getSubGroupUrl}${rootState.auth.auth.authData.orgId}`,
					{
						headers: {
							Accept: 'application/json',
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

	getFinReport: ({ rootState }) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}${accountingUrl.getFinReportUrl}`, {
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token.orgId}`,
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

	createExpenditureOrRevenueAccount: async ({ rootState }, payload) => {
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${url}${accountingUrl.createExpenditureOrRevenueCostCenterAccountUrl}`,
					payload,
					{
						headers: {
							Accept: 'application/json',
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

	getExpenditureOrRevenueCostCenterAccount: async (
		{ commit, rootState },
		payload
	) => {
		try {
			const { data } = await axios.get(
				`${url}${accountingUrl.getExpenditureOrRevenueCostCenterAccountUrl}${rootState.auth.auth.authData.orgId}/${payload}`,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			if (payload === 'expenditure') {
				commit('mutate_expenditureCostCenter', data.expRevCostCentreAccs);
			} else {
				commit('mutate_revenueCostCenter', data.expRevCostCentreAccs);
			}
		} catch (error) {
			console.log(error.response.data);
		}
	},

	// getAccListFromExpOrRevCostCentre: async ({ commit, rootState }) => {
	// 	const { orgId } = rootState.auth.auth.authData;
	// // console.log(rootState.auth.auth.userData, 'user data')
	// 	const { functionId } = rootState.auth.auth.userData;
	// console.log(functionId)
	// 	// try {
	// 	await axios
	// 		.get(
	// 			`${url}${accountingUrl.getAccountListFromExpOrRevCostCentreUrl}${orgId}/${functionId}/expenditure`,
	// 			{
	// 				headers: {
	// 					Accept: 'application/json',
	// 					authorization: `${rootState.auth.auth.token}`,
	// 				},
	// 			}
	// 		)
	// 		.then(({ data }) => {
	// 			commit('mutate_accListFromExpOrRevCostCentre', data.allAccounts);

	// 		})

	// 		.catch((err) => console.log(err.response.data));
	// },


	getAccListFromExpOrRevCostCentre: async ({ commit, rootState }, payload) => {
		const { orgId } = rootState.auth.auth.authData;
		const { functionId } = rootState.auth.auth.userData;
		try {
			const { data } = await axios.get(
				`${url}${accountingUrl.getAccountListFromExpOrRevCostCentreUrl}${orgId}/${functionId}/${payload}`,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			// console.log(data, "data test")

			if (payload === 'expenditure') {

				commit('mutate_allExpenditureCodes', data.allAccounts);
			} else {
				commit('mutate_allRevenueRegister', data.allAccounts);
			}

		} catch (error) {
			console.log(error.response.data);
		}
	},
	getAllIncomeStatements: async ({ commit, rootState }) => {
		try {
			const { data } = await axios.get(
				`${url}${accountingUrl.getAllIncomeStatementUrl}${rootState.auth.auth.authData.orgId}`,
				{
					headers: {
						Accept: 'application/json',
						authorization: `${rootState.auth.auth.token}`,
					},
				}
			);
			commit('mutate_allIncomeStatements', data);
		} catch (error) {
			console.log(error.response.data);
		}
	},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
