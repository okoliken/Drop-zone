// purchase
const purchaseSettings = () =>
  import("@/views/apps/settings/salesAndPurchase/purchase");

// sales
const salesSettings = () =>
  import("@/views/apps/settings/salesAndPurchase/sales");

export default [
  // purchase  section
  {
    path: "/settings/purchase",
    name: "purchaseSettings",
    component: purchaseSettings,
  },

  //sales section
  {
    path: "/settings/sales",
    name: "salesSettings",
    component: salesSettings,
  },
];
