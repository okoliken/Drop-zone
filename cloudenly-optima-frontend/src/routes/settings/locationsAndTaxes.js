const locationsAndTaxes = () =>
  import("@/views/apps/settings/locationsAndTaxes");

const outlet = () =>
  import("@/views/apps/settings/locationsAndTaxes/locations/location.vue");

const tax = () =>
  import("@/views/apps/settings/locationsAndTaxes/taxes/tax.vue");

export default [
  {
    path: "/settings/locations-and-taxes",
    name: "locationsAndTaxes",
    component: locationsAndTaxes,
  },

  {
    path: "/settings/outlets/create",
    name: "createLocation",
    component: outlet,
  },

  {
    path: "/settings/outlets/:id",
    name: "location",
    component: outlet,
  },

  {
    path: "/settings/taxs/create",
    name: "createTax",
    component: tax,
  },

  {
    path: "/settings/tax/:id",
    name: "tax",
    component: tax,
  },
];
