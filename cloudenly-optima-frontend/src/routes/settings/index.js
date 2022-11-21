import rolesAndPrivileges from "./rolesAndPrivileges";
import usersAndGroups from "./usersAndGroups";
import accountProfile from "./accountProfile";
import securityPolicy from "./securityPolicy";
import salesAndPurchase from "./salesAndPurchase";
import crm from "./crm";
import locationsAndTaxes from "./locationsAndTaxes";
import organization from "./organization";
import outletsAndInventoryClasses from "./outletsAndInventoryClasses";
import payments from "./payments";

import accountingSettings from "./accounting";


import approval from "./approval.js"

// Setting Modules
const settingsHome = () => import("@/views/apps/settings");

// document code
const documentCode = () => import("@/views/apps/settings/docCode");


// eslint-disable-next-line no-unused-vars
import accountSetting from './accountSetting'

export default [


  {
    path: "/settings",
    name: "settingsHome",
    component: settingsHome,
  },

  // account profile
  ...accountProfile,

  // security policy
  ...securityPolicy,

  //organization hierarchy
  ...organization,

  //  users and groups
  ...usersAndGroups,

  // Roles and Privileges
  ...rolesAndPrivileges,

  // outlet settings
  ...locationsAndTaxes,

  // crm module section
  ...crm,

  ...salesAndPurchase,

  // Inventory module Setting
  ...outletsAndInventoryClasses,

  ...payments,
  ...accountingSettings,
  ...approval,

  {
    path: "/settings/document/code",
    name: "documentCode",
    component: documentCode,
  },

];
