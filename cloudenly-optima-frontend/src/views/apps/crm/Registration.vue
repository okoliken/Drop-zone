<template>
  <div>
    <h1 class="font-bold mb-8">Customer Registration</h1>

    <CustomerAnalysis
      v-if="getCrmRegistrationPrivileges.viewDashboard || getIsAccOwner"
    />
    <Registration />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CustomerAnalysis from "./analysis/customerAnalysis";
import Registration from "./crmRegistration/registration";
export default {
  components: {
    CustomerAnalysis,
    Registration,
  },

  computed: {
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCrmRegistrationPrivileges",
    ]),
  },
};
</script>

<style></style>
