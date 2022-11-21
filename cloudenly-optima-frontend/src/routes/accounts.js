const ChartOfAccount = () =>
  import("@/views/apps/Accounts/ChartOfAccounts/index.vue");

  const EditChartOfAccount= () =>
  import("@/views/apps/Accounts/ChartOfAccounts/editChartOfAccount.vue");


const NewChartOfAccounts = () =>
  import("@/views/apps/Accounts/ChartOfAccounts/createChartOfAccounts.vue");

const Category = () => 
  import("@/views/apps/Accounts/Category/index.vue");

const CreateCategory = () =>
  import("@/views/apps/Accounts/Category/createCategory.vue");

const ExpenditureCodesAndCostCentres = () =>
  import("@/views/apps/Accounts/ExpenditureCodesAndCostCentres"); 

const NewExpenditureCode = () =>
  import(
    "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/expenditureCode/createExpenditureCode.vue"
  );

const CostCentre = () =>
  import(
    "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/costCentres/index.vue"
  );

const NewCostCentre = () =>
  import(
    "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/costCentres/createCostCentre.vue"
  );

const EditCostCentre = () =>
  import(
    "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/costCentres/editCostCentre.vue"
  );

const NewExpenditureCostCentresAccounts = () =>
  import(
    "@/views/apps/Accounts/ExpenditureCodesAndCostCentres/expenditureCostCentresAccounts/createExpenditureCostCentreAccount.vue"
  );

const NewRevenueCostCentresAccounts = () => 
  import(
    "@/views/apps/Accounts/RevenueCostCentreAccount/createRevenueCostCentreAccount.vue"
  )

const ExpenditureRegister = () => 
   import (
      "@/views/apps/Accounts/ExpenditureRegister"
   );
const RevenueRegister = () => 
   import (
      "@/views/apps/Accounts/RevenueRegister"
   );

const SalesRegister = () => 
   import (
      "@/views/apps/Accounts/SalesRegister"
   );

const Tax = () => import("@/views/apps/Accounts/Tax.vue");

const IncomeStatement = () => 
  import("@/views/apps/Accounts/IncomeStatement");

const AccountsCreditAndDebit = () =>
  import("@/views/apps/Accounts/CreditAndDebit");

export default [
  {
    path: "/accounts/chart-of-accounts",
    name: "ChartOfAccounts",
    component: ChartOfAccount,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },
  {
    path: "/accounts/chart-of-accounts/new",
    name: "NewChartOfAccounts",
    component: NewChartOfAccounts,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },
  {
    path: "/accounts/edit-chart-of-accounts/:id",
    name: "editChartOfAccount",
    component: EditChartOfAccount,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics & Record",
        },
        {
          title: "Analytics & Record",
          active: true,
        },
      ],
      pageTitle: "Analytics & Record",
    },
  },
  {
    path: "/accounts/expenditure-codes-and-cost-centres",
    name: "ExpenditureCodesAndCostCentres",
    component: ExpenditureCodesAndCostCentres,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/Category/index.vue",
    name: "Category",
    component: Category,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/Category/createCategory.vue",
    name: "CreateCategory",
    component: CreateCategory,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/expenditure-codes-and-cost-centres/cost-centre",
    name: "CostCentre",
    component: CostCentre,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/expenditure-codes-and-cost-centres/cost-centre/new",
    name: "NewCostCentre",
    component: NewCostCentre,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/expenditure-codes-and-cost-centres/cost-centre/:id",
    name: "EditCostCentre",
    component: EditCostCentre,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/expenditure-codes-and-cost-centres/expenditure-code/new",
    name: "NewExpenditureCode",
    component: NewExpenditureCode,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:
      "/accounts/expenditure-codes-and-cost-centres/expenditure-cost-centres-accounts/new",
    name: "NewExpenditureCostCentresAccounts",
    component: NewExpenditureCostCentresAccounts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/revenue-codes-and-cost-centres/revenue-cost-centres-accounts/new",
    name: "NewRevenueCostCentresAccounts",
    component: NewRevenueCostCentresAccounts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/ExpenditureRegister",
    name: "ExpenditureRegister",
    component: ExpenditureRegister,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/RevenueRegister",
    name: "RevenueRegister",
    component: RevenueRegister,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/SalesRegister",
    name: "SalesRegister",
    component: SalesRegister,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/tax",
    name: "AccountsTax",
    component: Tax,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/IncomeStatement",
    name: "IncomeStatement",
    component: IncomeStatement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/accounts/credit&debit",
    name: "AccountsCreditAndDebit",
    component: AccountsCreditAndDebit,
    meta: {
      requiresAuth: true,
    },
  },
];
