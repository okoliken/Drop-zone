
const FinanceDashboard = () => import("../views/apps/Finance/financeDashBoard.vue");

// Buddget Module

const BudgetSetup = () => import("../views/apps/Finance/Budget/app/setup/BudgetSetUp.vue");
const BudgetDashBoard = () => import("../views/apps/Finance/Budget/app/dashboard/BudgetDashBoard.vue");
const BudgetRegister = () => import("../views/apps/Finance/Budget/app/dashboard/BudgetRegister")


// const BudgetDetails = () => import("../app/components/Finance/Budget/app/setup/BudgetDetails")
// const BudgetDashBoard = () => import("../app/components/Finance/Budget/app/dashboard/BudgetDashBoard")
// const BudgetRegister = () => import("../app/components/Finance/Budget/app/dashboard/BudgetRegister")



// project

const Project = () => import("../views/apps/Finance/Project/project.vue");
const ProjectReport = () => import("../views/apps/Finance/Project/ProjectRegister.vue");
const CertificateOfCompletion = () => import("../views/apps/Finance/Project/CerticicateOfCompletion");





// Asset Modules
const AssetRegister = () => import("../views/apps/Finance/Assest/AssetRegister")
const Asset = () => import("../views/apps/Finance/Assest/Asset")
const AssetSetting = () => import("../views/apps/Finance/Assest/AssestSetup.vue")
const CreateAsset = () => import("../views/apps/Finance/Assest/CreateAsset")
const AssestDepreciation = () => import("../views/apps/Finance/Assest/AssestDepreciation")
const AssetReport = () => import('../views/apps/Finance/Assest/AssetReport')
const ViewAssetReport = () => import("../views/apps/Finance/Assest/ViewAssetReport")
const ManageAsset = () => import("../views/apps/Finance/Assest/ManageAsset")
const AssetTitleTransfer = () => import("../views/apps/Finance/Assest/AssetTitleTransfer")


// Expenditure Modules

const CashAdvanceRegister = () => import("../views/apps/Finance/Expenditure/CashAdvanceRegister");
const CashAdvance = () => import("../views/apps/Finance/Expenditure/CashAdvance");
const CashAdvanceRetirementRegister = () => import("../views/apps/Finance/Expenditure/CashAdvanceRetirementRegister");
const CashAdvanceRetirement = () => import("../views/apps/Finance/Expenditure/CashAdvanceRetirement");
const ExpensesClaim = () => import("../views/apps/Finance/Expenditure/ExpenseClaim");
const ExpensesClaimRegister = () => import("../views/apps/Finance/Expenditure/ExpenseClaimRegister");
const ExpenditureRegister = () => import("../views/apps/Finance/Expenditure/ExpenditureRegister");


const AccountPayables = () => import("../views/apps/Finance/Accounts/AccountPayables");
const AccountRecievables = () => import("../views/apps/Finance/Accounts/AccountRecievables");


// const LOAN
const DepositandLoan = () => import("../views/apps/Finance/Accounts/DepositandLoan");

export default [
  {
    path: "/finance/finance-management",
    name: "FinanceDashboard",
    component: FinanceDashboard
  },

  // budget setup

  {
    path: "/finance/finance-management/setup",
    name: "BudgetSetup",
    component: BudgetSetup
  },

  {
    path: "/finance/finance-management/dashboard",
    name: "BudgetDashBoard",
    component: BudgetDashBoard
  },
  {
    path: "/finance/finance-management/register",
    name: "BudgetRegister",
    component: BudgetRegister
  },

  // project

  {
    path: "/finance/finance-management/project",
    name: "Project",
    component: Project
  },

  {
    path: "/finance/finance-management/project-report",
    name: "ProjectReport",
    component: ProjectReport
  },

  {
    path: "/finance/finance-management/project-certificate-of-completion",
    name: "CertificateOfCompletion",
    component: CertificateOfCompletion
  },

  // Expenditure Modules

  {
    path: "/finance/sales/expenditure/cash_advance/register",
    name: "CashAdvanceRegister",
    component: CashAdvanceRegister
  },

  {
    path: "/finance/sales/expenditure/cash_advance/create",
    name: "CashAdvance",
    component: CashAdvance
  },

  // Cash Advanced Retirement

  {
    path: "/finance/sales/expenditure/cash_advance_retirement/register",
    name: "CashAdvanceRetirementRegister",
    component: CashAdvanceRetirementRegister
  },

  //  {
  //    path: "/finance/sales/expenditure/cash_advance_retirement/create",
  //    name: "CashAdvanceRetirement",
  //    component: CashAdvanceRetirement,
  //    meta: {
  //      sidebar: 'Sidebar',
  //      navbar: 'AuthNavbar',
  //      page:{
  //        sidebar: "MainFinanceSideBar"
  //      }
  //    },
  //    beforeEnter: Guards.ifAuthenticated
  //  },

  {
    path: "/finance/sales/expenditure/cash_advance_retirement/:id/create",
    name: "CashAdvanceRetirement",
    component: CashAdvanceRetirement
  },

  //  Expenses Claim Modules

  {
    path: "/finance/sales/expenditure/expenses_claim/register",
    name: "ExpensesClaimRegister",
    component: ExpensesClaimRegister
  },

  {
    path: "/finance/sales/expenditure/expenses_claim/create",
    name: "ExpensesClaim",
    component: ExpensesClaim
  },

  {
    path: "/finance/sales/expenditure/register",
    name: "ExpenditureRegister",
    component: ExpenditureRegister
  },

  // Assets Management

  {
    path: "/finance/sales/assets/register",
    name: "AssetRegister",
    component: AssetRegister
  },

  {
    path: "/finance/sales/assets",
    name: "Asset",
    component: Asset
  },

  {
    path: "/finance/sales/assets/setup",
    name: "AssetSetting",
    component: AssetSetting
  },

  {
    path: "/finance/sales/assets/create",
    name: "CreateAsset",
    component: CreateAsset
  },

  {
    path: "/finance/sales/assets/run_asset/Depreciation",
    name: "AssestDepreciation",
    component: AssestDepreciation
  },

  {
    path: "/finance/sales/assets/management",
    name: "ManageAsset",
    component: ManageAsset
  },

  {
    path: "/finance/sales/assets/run_asset/report",
    name: "AssetReport",
    component: AssetReport
  },

  {
    path: "/finance/sales/assets/:id/report",
    name: "ViewAssetReport",
    component: ViewAssetReport
  },

  {
    path: "/finance/sales/assets/:id/title_transfer",
    name: "AssetTitleTransfer",
    component: AssetTitleTransfer
  },

  // Account

  {
    path: "/finance/sales/account/account_payables",
    name: "AccountPayables",
    component: AccountPayables
  },

  {
    path: "/finance/sales/account/account_recievables",
    name: "AccountRecievables",
    component: AccountRecievables
  },

  // deposit and loan
  {
    path: "/finance/sales/account/deposits_loans",
    name: "DepositandLoan",
    component: DepositandLoan,
    
  }
];