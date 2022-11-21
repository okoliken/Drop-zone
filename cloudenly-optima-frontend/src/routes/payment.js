const payments = () =>
    import ("@/views/apps/payments");

// const newPayment = () =>
//     import ("@/views/apps/payments/overview/paymentSettings/newPayment.vue")

const overview = () =>
    import ("@/views/apps/payments/overview");

// const paymentSettings = () =>
//     import ("@/views/apps/payments/overview/paymentSettings/index.vue");

const collections = () =>
    import ("@/views/apps/payments/collections");
 
// const newCollection = () =>
//     import ("@/views/apps/payments/overview/paymentSettings/newCollection.vue")

const directDebits = () =>
    import ("@/views/apps/payments/directDebits");
const supplierList = () =>
    import ("@/views/apps/payments/directDebits/supplierList");

const previewDirectDebits = () =>
    import ("@/views/apps/payments/directDebits/previewDirectDebits.vue")

const payout = () =>
    import ("@/views/apps/payments/payouts/payout.vue");

// const collection = () =>
//     import ("@/views/apps/payments/collection/collection.vue");

// const PaymentList = () =>
//     import ("../views/apps/payment/paymentList.vue");

// const PaymentReceipt = () =>
//     import ("../views/apps/payment/paymentReceipt");

// const Payment = () =>
//     import ("../views/apps/payment/payment");

// const Receipt = () =>
//     import ("../views/apps/payment/Receipt");

export default [
  {
    path: "/payments/payouts-and-collections",
    name: "payments",
    component: payments,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Payment",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  {
    path: "/payments/payout/:id",
    name: "paymentsPayout",
    component: payout,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Payment",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  // {
  //     path: "/payments/collection/:id",
  //     name: "paymentsCollection",
  //     component: collection,
  //     meta: {
  //         requiresAuth: true,
  //         breadcrumb: [{
  //                 title: "Dashboard",
  //                 url: "/",
  //             },
  //             {
  //                 title: "Payment",
  //             },
  //             {
  //                 title: "Payment",
  //                 active: true,
  //             },
  //         ],
  //         pageTitle: "Payment List",
  //     },
  // },

  // {
  //     path: "/payment/list",
  //     name: "PaymentList",
  //     component: PaymentList,
  //     meta: {
  //         requiresAuth: true,
  //         breadcrumb: [{
  //                 title: "Dashboard",
  //                 url: "/",
  //             },
  //             {
  //                 title: "Payment",
  //             },
  //             {
  //                 title: "Payment",
  //                 active: true,
  //             },
  //         ],
  //         pageTitle: "Payment List",
  //     },
  // },

  {
    path: "/payments/overview",
    name: "overview",
    component: overview,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Overview",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  {
    path: "/payments/direct-debits",
    name: "direct debits",
    component: directDebits,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Direct Debits",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },
  {
    path: "/payments/direct-debits/supplier-list",
    name: "supplierList",
    component: supplierList,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Supplier List",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  {
    path: "/payments/direct-debits/:id/supplier",
    name: "previewDirectDebits",
    component: previewDirectDebits,
    meta: {
      requiresAuth: true,
      //   breadcrumb: [
      //     {
      //       title: "Dashboard",
      //       url: "/"
      //     },
      //     {
      //       title: "Sales Quotation"
      //     },
      //     {
      //       title: "Sales Quotation",
      //       active: true
      //     }
      //   ],
      //   pageTitle: "Sales RFQ"
    },
  },

  {
    path: "/payments/collections",
    name: "collections",
    component: collections,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Collections",
        },
        {
          title: "Payment",
          active: true,
        },
      ],
      pageTitle: "Payment List",
    },
  },

  // {
  //     path: "/sales&purchase/payment/receipt",
  //     name: "PaymentReceipt",
  //     component: PaymentReceipt,
  //     meta: {
  //         requiresAuth: true,
  //     },
  // },

  // {
  //     path: "/sales&purchase/:id/payment",
  //     name: "Payment",
  //     component: Payment,
  //     meta: {
  //         requiresAuth: true,
  //     },
  // },

  // {
  //     path: "/sales&purchase/:id/receipt",
  //     name: "Receipt",
  //     component: Receipt,
  //     meta: {
  //         requiresAuth: true,
  //     },
  // },
];