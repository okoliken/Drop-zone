import axios from "axios";
import setEnv from "../../utils/setEnv";
const url = setEnv(process.env).quantumServiceURL;

const rolesUrl = {
  getUserRoleUrl: "/roles/",
};

const state = {
  isRole: false,
  userRole: null,
  userModulesPrivileges: [],
  accOwnerPrivileges: false,
};

const getters = {
  getIsUserRole: (state) => state.isRole,
  getUserRoles: (state) => state.userRole,
  getIsAccOwner: (state) => state.accOwnerPrivileges,
  getUserModulesPrivileges: (state) => state.userModulesPrivileges,

  getCrmRegistrationPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmRegistrationPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "customerRegistration") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmRegistrationPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmRegistrationPrivileges;
    }
  },

  getCustomerManagementPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmManagementPrivileges = {};

      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "customerEngagement") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmManagementPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmManagementPrivileges;
    }
  },

  getCustomerPipelinePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmPipelinePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "pipelineManagement") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmPipelinePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmPipelinePrivileges;
    }
  },

  getPromotionPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmPromotionsPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "promotion") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmPromotionsPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmPromotionsPrivileges;
    }
  },

  getMeetingPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmMeetingPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "meeting") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmMeetingPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmMeetingPrivileges;
    }
  },

  getCrmSettingPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let crmSettingPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "crm") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "cRMSettings") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                crmSettingPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return crmSettingPrivileges;
    }
  },

  //purchase section

  getPurchaseCataloguePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseCataloguePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "catalogue") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseCataloguePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseCataloguePrivileges;
    }
  },

  getSupplierPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let supplierPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "supplier") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                supplierPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return supplierPrivileges;
    }
  },

  getPurchaseInvoicePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseInvoicePrivilege = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "invoice") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseInvoicePrivilege[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseInvoicePrivilege;
    }
  },

  getPurchaseRequisitionPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseRequisitionPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "purchaseRequistions") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseRequisitionPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseRequisitionPrivileges;
    }
  },

  getPurchaseRequestForQuoteOPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseRequestForQuotePrivileges = {};

      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "requestForQuote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseRequestForQuotePrivileges[resp.slug] =
                  resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseRequestForQuotePrivileges;
    }
  },

  getPurchaseQuotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseQuotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "quote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseQuotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseQuotePrivileges;
    }
  },

  getPurchaseOrderPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseOrderPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "purchaseOrder") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseOrderPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseOrderPrivileges;
    }
  },

  getPurchaseDebitNotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseDebitNotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "debitNote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseDebitNotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseDebitNotePrivileges;
    }
  },

  getPurchaseSettingsPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let purchaseSettingsPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "purchase") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "purchaseSettings") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                purchaseSettingsPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return purchaseSettingsPrivileges;
    }
  },

  // sales privilege section

  getSalesQuotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesQuotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "quote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesQuotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesQuotePrivileges;
    }
  },

  getSalesRequestForQuotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesRequestForQuotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "requestForQuote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesRequestForQuotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesRequestForQuotePrivileges;
    }
  },

  getSalesPricebookPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesPricebookPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "pricebook") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesPricebookPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesPricebookPrivileges;
    }
  },

  getSalesCataloguePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesCataloguePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "catalogue") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesCataloguePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesCataloguePrivileges;
    }
  },

  getSalesWaybillPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesWaybillPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "waybill") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesWaybillPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesWaybillPrivileges;
    }
  },

  getSalesCreditNotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesCreditNotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "CreditNote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesCreditNotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesCreditNotePrivileges;
    }
  },

  getSalesSettingsPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesSettingsPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "salesSettings") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesSettingsPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesSettingsPrivileges;
    }
  },

  getSalesPurchaseOrderPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesPurchaseOrderPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "purchaseOrder") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesPurchaseOrderPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesPurchaseOrderPrivileges;
    }
  },

  getSalesInvoicePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let salesInvoicePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "sales") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "invoice") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                salesInvoicePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return salesInvoicePrivileges;
    }
  },

  //inventory section
  getInventorySettingPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let inventorySettingPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "inventorySettings") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                inventorySettingPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return inventorySettingPrivileges;
    }
  },

  getGoodReceiveNotePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let goodReceivedNotePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "goodsReceivedNote") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                goodReceivedNotePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return goodReceivedNotePrivileges;
    }
  },

  getOutletAndInventoryPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let outletInventoryPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "outlets&Inventory") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                outletInventoryPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return outletInventoryPrivileges;
    }
  },

  getInventoryWaybillPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let waybillPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "waybill") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                waybillPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return waybillPrivileges;
    }
  },

  getMaterialReturnPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let materialReturnPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "materialReturn") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                materialReturnPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return materialReturnPrivileges;
    }
  },

  getMaterialRequestPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let materialRequestPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "materialReturn") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                materialRequestPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return materialRequestPrivileges;
    }
  },

  getStockBalancePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let stockBalancePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "inventoryManagement") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "stockBalance") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                stockBalancePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return stockBalancePrivileges;
    }
  },

  // organisation information privilege

  getAccOwnerRootAdminPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let accOwnerRootAdminPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "accountOwner") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "rootAdmin") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                accOwnerRootAdminPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return accOwnerRootAdminPrivileges;
    }
  },

  getAccOwnerOrganisationInformationPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let accOwnerOrgInformationPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "accountOwner") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "organisationInformation") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                accOwnerOrgInformationPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return accOwnerOrgInformationPrivileges;
    }
  },

  //users and groups setting privileges
  getUsersPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let usersPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "usersAndGroups") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "users") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                usersPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return usersPrivileges;
    }
  },


  getGroupsPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let groupsPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "usersAndGroups") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "groups") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                groupsPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return groupsPrivileges;
    }
  },


  getDeactivatedPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let deactivatePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "usersAndGroups") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "deactivated") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                deactivatePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return deactivatePrivileges;
    }
  },

  //location and taxes privileges

  getTaxSettingsPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let taxPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "locationAndTax") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "tax") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                taxPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return taxPrivileges;
    } 
  },

  getLocationSettingsPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let locationPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "locationAndTax") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "location") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                locationPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return locationPrivileges;
    }
  },

  // organisation hierarchy privilege

  getOrganisationPeoplePrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let peoplePrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "organizationSettings") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "people") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                peoplePrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return peoplePrivileges;
    }
  },

  getOrganisationDesignationPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let designationPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "organizationSettings") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "designation") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                designationPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return designationPrivileges;
    }
  },

  getJobLevelPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let jobLevelPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "organizationSettings") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "jobLevels") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                jobLevelPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return jobLevelPrivileges;
    }
  },

  getFunctionPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let functionPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "organizationSettings") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "function") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                functionPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return functionPrivileges;
    }
  },

  //security privilege
  getSecurityPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let securityPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "security") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "securityQuestion") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                securityPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return securityPrivileges;
    }
  },


  getTwoFactorAuthenticationPrivileges: (state) => {
    if (state.userModulesPrivileges.length === 0) {
      return false;
    } else {
      let twoFactorAuthenticationPrivileges = {};
      state.userModulesPrivileges.find((resp) => {
        if (resp.slug === "security") {
          let module = resp;
          module.submodules.find((resp) => {
            if (resp.slug === "twoFactorAuthentication") {
              let subModule = resp;
              subModule.privileges.forEach((resp) => {
                twoFactorAuthenticationPrivileges[resp.slug] = resp.hasPrivilege;
              });
            }
          });
        }
      });
      return twoFactorAuthenticationPrivileges;
    }
  },

};

const mutations = {
  mutate_isUserRole: (state, payload) => {
    state.isRole = payload;
  },

  mutate_userRole: (state, payload) => {
    state.userRole = payload;
  },

  mutate_userModulesPrivileges: (state, payload) => {
    state.userModulesPrivileges = payload || [];
  },

  mutate_acc_owner: (state, payload) => {
    state.accOwnerPrivileges = payload;
  },

  mutate_logout: (state) => {
    (state.isRole = false),
      (state.userRole = null),
      (state.userModulesPrivileges = []);
  },
};

const actions = {
  setForRootUser: ({ commit }, payload) => {
    commit("mutate_isUserRole", false);
    commit("mutate_userRole", payload.role);
    commit("mutate_acc_owner", true);
    commit("mutate_userModulesPrivileges", []);
  },

  setUserRolePrivilege: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}${rolesUrl.getUserRoleUrl}${rootState.auth.auth.userData.optimaRole}/privileges`,
          {
            headers: {
              Accept: "application/json",
              authorization: `${rootState.auth.auth.token}`,
            },
          }
        )
        .then((resp) => {
          if (resp.data) {
            // console.log(resp.data)
            let userRole = {
              name: resp.data.name,
              isSuperAdmin: false,
              isDefault: false,
              hasOptima: true,
            };
            // console.log(userRole)
            commit("mutate_isUserRole", true);
            commit("mutate_userRole", userRole);
            commit("mutate_acc_owner", false);
            commit("mutate_userModulesPrivileges", resp.data.modules || []);
          }
          resolve(resp);
        })
        .catch((err) => {
          commit("mutate_isUserRole", false);
          console.log(err);
          reject(err);
        });
    });
  },

  set_logoutPlan: ({ commit }) => {
    commit("mutate_logout");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
