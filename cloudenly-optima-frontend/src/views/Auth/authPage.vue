<template>
  <div class>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>

    <!-- <div id="anim-load">
      <lottie-player
        src="https://assets7.lottiefiles.com/private_files/lf30_P1OXeY.json"
        background="transparent"
        speed="1"
        loop
        autoplay
      ></lottie-player>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import accOwnerPrivilege from "../../store/auth/privilegeData";
import setEnv from "../../utils/setEnv";
export default {

  
  async mounted() {
    if (!this.$route.query.linchpin) {
      localStorage.clear();
      this.$store.dispatch("auth/set_logout");
      const url = setEnv(process.env).cloudenlyURL;
      window.location.href = url;
    } else {
      
      let baseUrl = setEnv(process.env).quantumServiceURL;
      let dataToken = this.$route.query.linchpin;
      const headers = {
        authorization: dataToken,
      };

      const { data } = await axios.get(`${baseUrl}/auth/refresh_linchpin`, {
        headers,
      });

      this.$store.dispatch("auth/auth/set_token", data.token); // set user token to state

      let humanarData = this.$route.query.linchpin;
      let driveData = this.$route.query.linchpin;
      let globalMessageData = this.$route.query.linchpin;

      let token = data.token;
      let userData = data.user;
      let orgData = data.org;
      let userOutlets = data.outlets;
      let defaultOutlet = userOutlets.filter((resp) => {
        return (resp.isDefaultOutlet = true);
      });
      let loginOutlet = userOutlets.find((resp) => resp.isDefaultOutlet);

      let authData = {
        outletId: loginOutlet.id,
        creatorId: userData.id,
        orgId: orgData.id,
        functionId: userData.functionId,
        orgInfo: {
          name: orgData.name,
          address: loginOutlet.address,
          email: orgData.email,
          phoneNumber: orgData.phoneNo,
          orgId: orgData.id,
        },
      }; // This is the IAM data for micro service

      const orgApp = data.orgApps.find((item) => item.appSlug === "optima");
      if (!orgApp.subscription || !orgApp.subscription.status) {
        location.assign(`${process.env.VUE_APP_CLOUDENLY}/auth/login`);
        return;
      }

      // eslint-disable-next-line no-empty

      switch (orgApp.subscription.status) {
        // eslint-disable-next-line no-case-declarations
        case "free":
          this.$store.dispatch("auth/auth/set_token", token); // set user token to state
          this.$store.dispatch("auth/auth/set_authentication", authData); // set auth parameters
          this.$store.dispatch("auth/auth/set_orgData", orgData); // set organization data
          this.$store.commit("auth/auth/SET_ORG_APPS", data.orgApps);
          this.$store.dispatch("auth/auth/set_userData", userData); // set user profile data
          this.$store.dispatch("auth/auth/set_userOutlets", userOutlets); // set user outlet data
          this.$store.dispatch("auth/auth/setDefaultUserOutlet", defaultOutlet); // set user default outlet
          this.$store.dispatch("auth/auth/setLoginOutlet", loginOutlet); // set user login outlet
          this.$store.dispatch("auth/auth/setHumanarData", humanarData); // set humanar auth data
          this.$store.dispatch("auth/auth/setDriveData", driveData); // set drive auth data
          this.$store.dispatch("auth/auth/setMessagingData", globalMessageData); // set global message auth data

          if (userData.isRoot === true) {
            this.$store.dispatch(
              "auth/roles/setForRootUser",
              accOwnerPrivilege
            );
            this.$router.push({ name: "dashboardAnalytics" });
          } else {
            this.$store
              .dispatch("auth/roles/setUserRolePrivilege")
              .then((resp) => {
                if (resp) this.$router.push({ name: "dashboardAnalytics" });
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
              });
          }

          break;

        case "trial":
          this.$store.dispatch("auth/auth/set_token", token); // set user token to state
          this.$store.dispatch("auth/auth/set_authentication", authData); // set auth parameters
          this.$store.dispatch("auth/auth/set_orgData", orgData); // set organization data
          this.$store.commit("auth/auth/SET_ORG_APPS", data.orgApps);
          this.$store.dispatch("auth/auth/set_userData", userData); // set user profile data
          this.$store.dispatch("auth/auth/set_userOutlets", userOutlets); // set user outlet data
          this.$store.dispatch("auth/auth/setDefaultUserOutlet", defaultOutlet); // set user outlet data
          this.$store.dispatch("auth/auth/setLoginOutlet", loginOutlet); // set user login outlet
          this.$store.dispatch("auth/auth/setHumanarData", humanarData); // set humanar auth data
          this.$store.dispatch("auth/auth/setDriveData", driveData); // set drive auth data
          this.$store.dispatch("auth/auth/setMessagingData", globalMessageData); // set global message auth data
          // sections roles and privileges

          if (userData.isRoot === true) {
            this.$store.dispatch(
              "auth/roles/setForRootUser",
              accOwnerPrivilege
            );
            this.$router.push({ name: "dashboardAnalytics" });
          } else {
            this.$store
              .dispatch("auth/roles/setUserRolePrivilege")
              // eslint-disable-next-line no-unused-vars
              .then((resp) => {
                // console.log(resp)
                if (resp) this.$router.push({ name: "dashboardAnalytics" });
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
              });
          }

          break;

        // eslint-disable-next-line no-case-declarations
        case "paid":
          this.$store.dispatch("auth/auth/set_token", token); // set user token to state
          this.$store.dispatch("auth/auth/set_authentication", authData); // set auth parameters
          this.$store.dispatch("auth/auth/set_orgData", orgData); // set organization data
          this.$store.commit("auth/auth/SET_ORG_APPS", data.orgApps);
          this.$store.dispatch("auth/auth/set_userData", userData); // set user profile data
          this.$store.dispatch("auth/auth/set_userOutlets", userOutlets); // set user outlet data
          this.$store.dispatch("auth/auth/setDefaultUserOutlet", defaultOutlet); // set user outlet data
          this.$store.dispatch("auth/auth/setLoginOutlet", loginOutlet); // set user login outlet
          this.$store.dispatch("auth/auth/setHumanarData", humanarData); // set humanar auth data
          this.$store.dispatch("auth/auth/setDriveData", driveData); // set drive auth data
          this.$store.dispatch("auth/auth/setMessagingData", globalMessageData); // set global message auth data
          // sections roles and privileges
          // console.log(userData.isRoot)
          if (userData.isRoot === true) {
            this.$store.dispatch(
              "auth/roles/setForRootUser",
              accOwnerPrivilege
            );

            this.$router.push({ name: "dashboardAnalytics" });
          } else {
            this.$store
              .dispatch("auth/roles/setUserRolePrivilege")
              // eslint-disable-next-line no-unused-vars
              .then((resp) => {
                // console.log(resp)
                if (resp) this.$router.push({ name: "dashboardAnalytics" });
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
              });
          }
          break;
      }
    }
  },
};
</script>

<style scoped>
#anim-load {
  margin: auto;
  width: 50%;
  height: auto;
}
</style>
