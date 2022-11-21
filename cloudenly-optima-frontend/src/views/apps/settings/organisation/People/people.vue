<template>
  <div style="font-size: 14px">
    <back
      :location="`${$route.params.id ? 'Edit (People)' : 'Add New (People)'}`"
      class="mb-10"
    />
    <div
      v-if="getIsAccOwner || getOrganisationPeoplePrivileges.createNewPeople"
    >
      <div
        class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 gap-10 rounded"
      >
        <h2 class="col-span-12 mb-12">
          {{ $route.params.id ? "Edit" : "Add New" }}
        </h2>

        <div class="col-span-12 mb-12">
          <s-photo
            :defaultPhoto="profileImg"
            url="http://18.135.196.19:5001/document-management/upload/profile-photo"
            v-model="user.photo"
          />
        </div>

        <h2 class="col-span-12 mb-10">Personal Information</h2>

        <s-text
          label="First Name:"
          class="col-span-4 mb-12"
          v-model="user.fname"
        />

        <s-text label="Middle:" class="col-span-4" v-model="user.mname" />

        <s-text label="Last Name:" class="col-span-4" v-model="user.lname" />

        <s-text
          :disabled="$route.params.id"
          label="Work Email:"
          class="col-span-4"
          v-model="user.email"
        />

        <s-text label="Phone:" class="col-span-4" v-model="user.phoneNo" />

        <s-content-seperator class="my-12" />

        <h2 class="col-span-12 mb-12">User Information</h2>

        <s-select
          label="Role:"
          :options="getOrganisationOptimaRoles"
          class="col-span-4"
          v-model="user.optimaRole"
        />

        <s-select
          label="Function:"
          default-option="Nil"
          :options="getOrgFunction"
          class="col-span-4"
          v-model="user.functionId"
        />

        <s-select
          label="Designation:"
          default-option="Nil"
          :options="getDesignation"
          class="col-span-4 mb-12"
          v-model="user.designation"
        />

        <s-text
          label="User Level:"
          disabled
          class="col-span-4"
          :value="userLevel.name"
        />

        <s-select
          label="Reporting:"
          default-option="Nil"
          :options="getOptimaUsers"
          select-key="fname"
          class="col-span-4"
          v-model="user.reportingTo"
        />

        <s-content-seperator class="my-12" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
          >
            Cancel</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="handlePeople"
            v-if="!$route.params.id"
          >
            Save</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="handlePeople('update')"
            v-else
          >
            Save Changes</s-button
          >
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import Drawer from "../../../../components/Drawer/drawer";

import profileImg from "@/assets/images/optimaAsset/profile_img.png";

export default {
  components: {
    Drawer,
    SPhoto,
  },
  data() {
    return {
      profileImg,
      isSubmitting: false,

      user: {
        orgId: "",
        photo: null,
        fname: null, 
        lname: null,
        mname: null,
        phoneNo: null,
        email: null,
        dialCode: "234",
        optimaRole: null,
        functionId: null,
        designation: null,
        level: null,
        reportingTo: null,
        // createdBy: "",
        // updatedBy: "",
      },

      // functions: {
      //   name: "",
      //   costCenter: "",
      //   hierarchy: null,
      //   reportingTo: null,
      // },
    };
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getOptimaOutlet",
      "getOptimaUsers",
      "getOrgFunction",
      "getLevel",
      "getHierarchy",
      "getOrgRoles",
      "getDesignation",
      "getOrganisationOptimaRoles",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getOrganisationPeoplePrivileges",
    ]),

    userLevel() {
      let result;

      if (this.user.designation) {
        result = this.getDesignation.find(
          ({ id }) => id === this.user.designation
        ).level;
      } else {
        result = "";
      }

      return result;
    },
  },
  methods: {
    async handlePeople(operation = "create") {
      try {
        this.isSubmitting = true;
        const payload = { ...this.user };
        !payload.optimaRole && (payload.optimaRole = null);
        !payload.functionId && (payload.functionId = null);
        !payload.designation && (payload.designation = null);
        this.userLevel ? (payload.level = this.userLevel.id) : null;
        !payload.reportingTo && (payload.reportingTo = null);

        let response;

        if (operation === "create") {
          response = await this.$store.dispatch(
            "userOutlet/createOrgPeople",
            payload
          );
        } else {
          response = await this.$store.dispatch(
            "userOutlet/updateUser",
            payload
          );
        }

        this.isSubmitting = false;

        this.$router.push({ name: "organisationSetting" });

        this.$vs.notify({
          title: "User",
          text: response.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.isSubmitting = false;
        this.$vs.notify({
          title: "User",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    // *** TODO: implement create function functionality

    // createFunction() {
    //   const data = {
    //     ...this.functions,
    //   };

    //   this.$store
    //     .dispatch("userOutlet/createFunction", data)
    //     .then((resp) => {
    //       this.$vs.notify({
    //         title: "Function",
    //         text: resp.data.message,
    //         color: "primary",
    //         position: "top-right",
    //       });
    //       this.close();
    //     })
    //     .catch((err) => {
    //       this.$vs.notify({
    //         title: "Function",
    //         text: err.response.data.message,
    //         color: "danger",
    //         position: "top-right",
    //       });
    //     });
    // },
  },

  async mounted() {
    try {
      await this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
      await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
      await this.$store.dispatch("userOutlet/getOrgLevels");
      // await this.$store.dispatch("userOutlet/getOptimaOrgRoles");
      await this.$store.dispatch("userOutlet/getNewOrgOptimaRoles");

      await this.$store.dispatch("userOutlet/getOrgFunction");
      await this.$store.dispatch("userOutlet/getOrgDesignation");

      const { id } = this.$route.params;

      if (id) {
        const { data } = await this.$store.dispatch(
          "userOutlet/getSingleUser",id
        
        );
          // { userIds: [id] }
        this.user = { ...data.user};
        // console.log(this.user)
      }

      this.user.orgId = this.$store.state.auth.auth.authData.orgId;
      //this.user.createdBy = this.$store.state.auth.auth.authData.creatorId;
      //this.user.updatedBy = this.$store.state.auth.auth.authData.creatorId;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>
