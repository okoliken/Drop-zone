// CRM Registration
const CrmRegistration = () => import("../views/apps/crm/Registration.vue");

const CreateContact = () =>
  import("../views/apps/crm/community/CreateCommunity.vue");

const ViewContact = () => import("../views/apps/crm/contact/viewContact.vue");


const deliveryAddresses = () =>
  import("@/views/apps/crm/contact/deliveryAddresses.vue");

// Crm Contact Engagement
const CrmApp = () => import("../views/apps/crm/crmapp");

// import Contact
const importContact = () => import("../views/apps/crm/importContact.vue");

const importSupplier = () => import("../views/apps/crm/importSupplier.vue");

// Pipeline Management
const PipelineManagement = () => import("../views/apps/crm/pipeline");

const PipelineSettings = () => import("@/views/apps/crm/pipeline/settings.vue");

const PipelineMovement = () => import("@/views/apps/crm/pipeline/movement.vue");

// Loyalty and Promotion
const LoyaltyPromotion = () => import("../views/apps/crm/loyaltyPromotion");

const CreatePromotion = () =>
  import("../views/apps/crm/loyalty&promotion/createPromotion.vue");

const EditPromotion = () =>
  import("../views/apps/crm/loyalty&promotion/EditPromotion.vue");

const ViewPromotion = () =>
  import("../views/apps/crm/loyalty&promotion/ViewPromotion.vue");

const PromotionRegister = () =>
  import("../views/apps/crm/loyalty&promotion/promoRegister.vue");


const PromoAnalytics = () =>
  import("../views/apps/crm/loyalty&promotion/PromoAnalytics.vue");

// Message Center
const MessageCenter = () =>
  import("../views/apps/messagecenter/messageCenter.vue"); 

// calendar and Meeting
const Meetings = () => import("@/views/apps/crm/meetings");

const Meeting = () => import("../views/apps/crm/meetings/meeting.vue");

const ViewMeeting = () => import("@/views/apps/crm/meetings/viewMeeting.vue");

//Loyalty
const Loyalty = () => import("../views/apps/crm/Loyalty/index.vue");
// const CreateLoyalty = () => import("../views/apps/crm/Loyalty/createLoyalty.vue");
const EditLoyalty = () => import("../views/apps/crm/Loyalty/editLoyalty.vue");



export default [
  // crm Modules

  {
    path: "/cloudenly/registration",
    name: "CrmRegistration",
    component: CrmRegistration,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "CRM"
        },
        {
          title: "Customer Registration",
          active: true
        }
      ],
      pageTitle: "CRM"
    }
  },

  {
    path: "/cloudenly/registration/create",
    name: "CreateContact",
    component: CreateContact,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "CRM"
        },
        {
          title: "Create Customer ",
          active: true
        }
      ],
      pageTitle: "CRM"
    }
  },

  {
    path: "/cloudenly/contact/import",
    name: "importContact",
    component: importContact,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "CRM"
        },
        {
          title: "Import Customer ",
          active: true
        }
      ],
      pageTitle: "CRM"
    }
  },

  {
    path: "/cloudenly/supplier/import",
    name: "importSupplier",
    component: importSupplier,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "CRM"
        },
        {
          title: "Import Supplier ",
          active: true
        }
      ],
      pageTitle: "CRM"
    }
  },

  {
    path: "/cloudenly/:id/contact",
    name: "ViewContact",
    component: ViewContact,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "View Contact"
        },
        {
          title: "View Contact",
          active: true
        }
      ],
      pageTitle: "Contact"
    }
  },

  {
    path: "/cloudenly/:id/delivery-addresses",
    name: "DeliveryAddresses",
    component: deliveryAddresses,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "View Contact"
        },
        {
          title: "View Contact",
          active: true
        }
      ],
      pageTitle: "Contact"
    }
  },

  {
    path: "/cloudenly/crm",
    name: "CrmApp",
    component: CrmApp,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "CRM"
        },
        {
          title: "Customer Engagement",
          active: true
        }
      ],
      pageTitle: "CRM"
    }
  },

  // Pipeline Management
  {
    path: "/community/pipeline-management",
    name: "PipelineManagement",
    component: PipelineManagement,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Pipeline Management"
        },
        {
          title: "Pipeline Management",
          active: true
        }
      ],
      pageTitle: "Pipeline Management"
    }
  },
  {
    path: "/community/pipeline-management/settings",
    name: "PipelineSettings",
    component: PipelineSettings,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Pipeline Management"
        },
        {
          title: "Pipeline Management",
          active: true
        }
      ],
      pageTitle: "Pipeline Management"
    }
  },
  {
    path: "/community/pipeline-management/movement",
    name: "PipelineMovement",
    component: PipelineMovement,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Pipeline Management"
        },
        {
          title: "Pipeline Management",
          active: true
        }
      ],
      pageTitle: "Pipeline Management"
    }
  },

  // loyalty and Promotion
  {
    path: "/community/loyalty-promotion",
    name: "LoyaltyPromotion",
    component: LoyaltyPromotion,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Loyalty & Promotion"
        },
        {
          title: "Loyalty & Promotion",
          active: true
        }
      ],
      pageTitle: "Loyalty & Promotion"
    }
  },

  {
    path: "/community/create/loyalty-promotion",
    name: "CreatePromotion",
    component: CreatePromotion,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Create Promotion"
        },
        {
          title: " Promotion",
          active: true
        }
      ],
      pageTitle: "Promotion"
    }
  },
  {
    path: "/community/loyalty-promotion/promo-analytics",
    name: "PromoAnalytics",
    component: PromoAnalytics,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Promo Analytics"
        },
        {
          title: " Promotion",
          active: true
        }
      ],
      pageTitle: "Promotion"
    }
  },

  {
    path: "/community/loyalty-promotion/promo-register",
    name: "PromoRegister",
    component: PromotionRegister,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Promo Register"
        },
        {
          title: " Promotion",
          active: true
        }
      ],
      pageTitle: "Promotion"
    }
  },

  {
    path: "/community/:id/edit-promotion",
    name: "EditPromotion",
    component: EditPromotion,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Edit Promotion"
        },
        {
          title: " Promotion",
          active: true
        }
      ],
      pageTitle: "Promotion"
    }
  },

  {
    path: "/community/:id/view-promotion",
    name: "ViewPromotion",
    component: ViewPromotion,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "View Promotion"
        },
        {
          title: " Promotion",
          active: true
        }
      ],
      pageTitle: "Promotion"
    }
  },

  // Message Center
  {
    path: "/community/message-center",
    name: "MessageCenter",
    component: MessageCenter,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Message Center"
        },
        {
          title: "Message Center",
          active: true
        }
      ],
      pageTitle: "Message Center"
    }
  },

  // meetings routes
  {
    path: "/community/meeting",
    name: "Meeting",
    component: Meetings,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Meeting"
        },
        {
          title: "Meetings",
          active: true
        }
      ],
      pageTitle: "Meeting"
    }
  },
  {
    path: "/community/meeting/new",
    name: "NewMeeting",
    component: Meeting,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Meeting"
        },
        {
          title: "Meetings",
          active: true
        }
      ],
      pageTitle: "Meeting"
    }
  },
  {
    path: "/community/meeting/:id",
    name: "ViewMeeting",
    component: ViewMeeting,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/"
        },
        {
          title: "Meeting"
        },
        {
          title: "Meetings",
          active: true
        }
      ],
      pageTitle: "Meeting",
    },
  },

   // Loyalty section
   {
    path: "/community/loyalty",
    name: "Loyalty",
    component: Loyalty,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Message Center",
        },
        {
          title: "Message Center",
          active: true,
        },
      ],
      pageTitle: "Message Center",
    },
  },

  // {
  //   path: "/community/loyalty/create",
  //   name: "CreateLoyalty",
  //   component: CreateLoyalty,
  //   meta: {
  //     requiresAuth: true,
  //     breadcrumb: [
  //       {
  //         title: "Dashboard",
  //         url: "/",
  //       },
  //       {
  //         title: "Message Center",
  //       },
  //       {
  //         title: "Message Center",
  //         active: true,
  //       },
  //     ],
  //     pageTitle: "Create Loyalty",
  //   },
  // },

  {
    path: "/community/loyalty/edit/:id",
    name: "EditLoyalty",
    component: EditLoyalty,
    meta: {
      requiresAuth: true,
      breadcrumb: [
      
      ],
      pageTitle: "Edit Loyalty",
    },
  },



];
