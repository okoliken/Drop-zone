<template>
  <div class="grid grid-cols-12 row-gap-10 bg-white p-6 rounded mt-3">
    <h2 class="col-span-12 font-semibold">Security Settings</h2>

    <password class="col-span-4" />

    <!-- <security-questions class="col-span-4" />

    <twofactor class="col-span-4" /> -->

    <s-content-seperator  class="mt-8"/>
  </div>
</template>

<script>
import password from "./components/password.vue";
import securityQuestions from "./components/securityQuestions.vue";
import twofactor from "./components/twofactor.vue";

export default {
  name: "AccountProfileUserProfileSecuritySettings",
  components: { password, securityQuestions, twofactor },
};
</script>

<style></style>
