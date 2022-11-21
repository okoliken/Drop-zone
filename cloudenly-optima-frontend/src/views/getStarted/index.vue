<template>
  <div class="font-normal" style="font-size: 14px">
    <h1 class="mb-8 font-semibold" style="font-size: 16px">Onboarding</h1>

    <div class="px-24">
      <welcome
        v-show="currentSlide.position === 0"
        @proceed="currentSlide.position++"
        @skip="skipOnboarding"
      />

      <account-profile
        v-show="currentSlide.position === 1"
        @proceed="currentSlide.position++"
        @previous="currentSlide.position--"
        @skip="skipOnboarding"
        @setup="
          $router.push({
            name: 'accountProfile',
            query: { from: 'getStarted' },
          })
        "
      />

      <security-profile
        v-show="currentSlide.position === 2"
        @proceed="currentSlide.position++"
        @previous="currentSlide.position--"
        @skip="skipOnboarding"
        @setup="
          $router.push({
            name: 'securityPolicy',
            query: { from: 'getStarted' },
          })
        "
      />

      <users-and-groups
        v-show="currentSlide.position === 3"
        @proceed="currentSlide.position++"
        @previous="currentSlide.position--"
        @skip="skipOnboarding"
        @setup="
          $router.push({
            name: 'usersAndGroups',
            query: { from: 'getStarted' },
          })
        "
      />

      <locations-and-taxes
        v-show="currentSlide.position === 4"
        @proceed="currentSlide.position++"
        @previous="currentSlide.position--"
        @skip="skipOnboarding"
        @setup="
          $router.push({
            name: 'locationsAndTaxes',
            query: { from: 'getStarted' },
          })
        "
      />

      <complete
        @proceed="$router.push({ name: 'CrmRegistration' })"
        v-show="currentSlide.position === 5"
      />
    </div>
  </div>
</template>

<script>
import welcome from "./welcome.vue";
import accountProfile from "./accountProfile.vue";
import securityProfile from "./securityProfile.vue";
import usersAndGroups from "./usersAndGroups.vue";
import locationsAndTaxes from "./locationsAndTaxes.vue";
import complete from "./complete.vue";

export default {
  name: "GetStarted",
  components: {
    welcome,
    accountProfile,
    securityProfile,
    usersAndGroups,
    locationsAndTaxes,
    complete,
  },
  data() {
    return {
      currentSlide: {
        position: 0,
        status: false,
      },
    };
  },

  mounted() {
    if (this.$store.state.auth.roles.accOwnerPrivileges === false) {
      this.$router.push({ name: "CrmRegistration" });
    }
  },
  methods: {
    skipOnboarding() {
      this.$router.push({ name: "CrmRegistration" });
      // this.currentSlide.position = 5
    },
  },
};
</script>

<style></style>
