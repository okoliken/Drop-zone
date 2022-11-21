<template>
  <div class="font-normal" style="font-size: 14px">
    <back
      :location="`${$route.params.id ? 'Edit' : 'Create New'} User`"
      class="mb-10"
    />

    <div v-if="loading">Loading...</div>
    <div
      v-if="
        getIsAccOwner ||
          getUsersPrivileges.createUsers ||
          getUsersPrivileges.editUsers
      "
    >
      <div
        class="grid grid-cols-12 row-gap-12 col-gap-16 gap-10 bg-white px-6 py-8"
      >
        <h2 class="font-semibold col-span-12">User Details</h2>

        <div class="col-span-12 flex items-center">
          <s-photo
            :defaultPhoto="image_dummy"
            url="http://18.135.196.19:5001/document-management/upload/profile-photo"
            v-model="userDetails.photo"
          />
        </div>

        <s-text
          label="First Name:"
          class="col-span-4"
          :error="validateUserFname"
          v-model="$v.userDetails.fname.$model"
        />

        <s-text
          label="Middle Name:"
          class="col-span-4"
          v-model="userDetails.mname"
        />

        <s-text
          label="Last Name:"
          class="col-span-4"
          :error="validateUserLname"
          v-model="$v.userDetails.lname.$model"
        />

        <s-text
          label="Work Email:"
          class="col-span-4"
          :error="validateUserEmail"
          v-model="$v.userDetails.email.$model"
        />

        <s-text
          label="Phone Number:"
          class="col-span-4"
          v-model="userDetails.phoneNo"
        />

        <s-select
          label="Employment Type:"
          :options="employmentTypes"
          class="col-span-4"
          v-model="userDetails.employmentType"
        />

        <s-multi-select
          label="Outlets:"
          :options="getOptimaOutlet"
          class="col-span-4"
          v-model="userDetails.userOutlets"
        />

        <!-- <s-select
          label="Default Outlet:"
          :defaultOption="$v.primaryOutlet.$model"
          :options="userDetails.userOutlets"
          :error="validatePrimaryOutlet"
          class="col-span-4"
          v-model="$v.primaryOutlet.$model"
          :hasDefault="true"
          defaultOptionId="primaryOutlet"
        /> -->
        <div class="col-span-4">
          <label for="default outlet">
            <div class="mb-3">Default Outlet</div>
            <select
              error="validatePrimaryOutlet"
              class="border border-gray-400 w-full py-1 px-1 rounded"
              v-model="$v.primaryOutlet.$model"
              name=""
              id=""
            >
              <option
                v-for="(out, i) in userDetails.userOutlets"
                :key="i"
                :value="out.id"
              >
                {{ out.name }}
              </option>
            </select>
          </label>
          <small class="mt-2" style="color: #dc3545"
            >{{ validatePrimaryOutlet }}</small
          >
        </div>

        <s-content-seperator />

        <h2 class="font-semibold col-span-12">User Role</h2>

        <s-select
          label="Role:"
          :options="getOrganisationOptimaRoles"
          :error="validateUserRole"
          class="col-span-4"
          v-model="$v.userDetails.optimaRole.$model"
        />

        <div class="col-span-4">
          <div class="mt-3">
            <button
              class="mt-8 text-primary-optima-color"
              @click="$router.push({ name: 'createRoleAndPrivilege' })"
            >
              create new role
            </button>
          </div>
        </div>

        <s-content-seperator />

        <h2 class="font-semibold col-span-12">Additional Details</h2>

        <s-select
          label="Function:"
          :options="getOrgFunction"
          default-option="Nil"
          class="col-span-4"
          v-model="userDetails.functionId"
        />

        <s-select
          label="Designation:"
          :options="getDesignation"
          default-option="Nil"
          class="col-span-4"
          v-model="userDetails.designation"
        />

        <s-text
          label="User Level:"
          class="col-span-4"
          disabled
          :value="getLevel.name || ''"
        />

        <s-select
          label="Reporting Line:"
          :options="getOptimaUsers"
          default-option="Nil"
          class="col-span-4"
          v-model="userDetails.reportingTo"
        >
          <template v-slot:option="{ option }">
            <option :value="option.data.id">
              {{ option.data.fname }} {{ option.data.lname }}
            </option>
          </template>
        </s-select>

        <s-content-seperator class="mt-2" />

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
            @click="handleUser"
            v-if="!$route.params.id"
          >
            Create User</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="handleUser('update')"
            v-else
          >
            Update User</s-button
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
import { required } from "vuelidate/lib/validators";
import employmentTypes from "@/utils/employmentTypes";

import SPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
//import Drawer from "../../../components/Drawer/drawer";

export default {
  name: "User",
  components: {
    SPhoto,
  },
  data() {
    return {
      image_dummy,
      loading: true,
      isSubmitting: false,
      employmentTypes,
      primaryOutlet: "",
      userDetails: {
        photo: null,
        title: null,
        fname: "",
        lname: "",
        mname: null,
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        iso2: "",
        dialCode: "",
        functionId: null,
        level: null,
        designation: null,
        reportingTo: null,
        authPassword: null,
        optimaRole: null,
        hrRole: null,
        createdBy: null,
        updatedBy: null,
        userOutlets: [],
        employmentType: "",
        role: {
          appSlug: "optima",
          roleId: null,
        },
      },

      functions: {
        name: "",
        costCenter: "",
        hierarchy: null,
        reportingTo: null,
      },
    };
  },

  validations: {
    userDetails: {
      fname: { required },
      lname: { required },
      email: { required },
      optimaRole: { required },
    },
    primaryOutlet: { required },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getOptimaOutlet",
      "getOptimaUsers",
      "getOrgFunction",
      "getIsFunctionSetUp",
      "getOrgRoles",
      "getDesignation",
      "getIsDesignationCreated",
      "getOrganisationOptimaRoles",
    ]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getUsersPrivileges"]),

    getLevel() {
      if (this.userDetails.designation)
        return this.getDesignation.find(
          ({ id }) => id === this.userDetails.designation
        ).level;

      return "";
    },

    validateUserFname() {
      if (
        this.$v.userDetails.fname.$dirty &&
        !this.$v.userDetails.fname.required
      )
        return ["First name is required"];
    },
    validateUserLname() {
      if (
        this.$v.userDetails.lname.$dirty &&
        !this.$v.userDetails.lname.required
      )
        return ["Last name is required"];
    },

    validateUserEmail() {
      if (
        this.$v.userDetails.email.$dirty &&
        !this.$v.userDetails.email.required
      )
        return ["Email is required"];
    },

    validateUserRole() {
      if (
        this.$v.userDetails.optimaRole.$dirty &&
        !this.$v.userDetails.optimaRole.required
      )
        return ["Role is required"];
    },

    validatePrimaryOutlet() {
      if (this.$v.primaryOutlet.$dirty && !this.$v.primaryOutlet.required)
        return "Primary outlet is required (add outlets)";
    },
  },

  methods: {
    setPrimaryOutlet(outlets, primaryOutlet) {
      return outlets.map((item) => {
        if (item.id === primaryOutlet) {
          return {
            outletId: item.id,
            isDefaultOutlet: true,
          };
        } else {
          return {
            outletId: item.id,
            isDefaultOutlet: false,
          };
        }
      });
    },

    async handleUser(operation = "create") {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // eslint-disable-next-line no-console
          console.log("VALIDATION ERROR");
        } else {
          this.isSubmitting = true;
          const userDetails = { ...this.userDetails };
          // this.user.userOutlets = this.selectedOutlet;

          // assign null to optima role if empty string
          !userDetails.optimaRole && (userDetails.optimaRole = null);

          // assign null to function if empty string
          !userDetails.functionId && (userDetails.functionId = null);

          // assign null to designation if empty string
          !userDetails.designation && (userDetails.designation = null);

          // assign null to reporting to if empty string
          !userDetails.reportingTo && (userDetails.reportingTo = null);

          // setPrimaryOutlet
          userDetails.userOutlets = this.setPrimaryOutlet(
            userDetails.userOutlets,
            this.primaryOutlet
          );

          let response;

          if (operation === "create") {
            userDetails.orgId = this.$store.state.auth.auth.authData.orgId;

            userDetails.role = {
              appSlug: "optima",
              roleId: userDetails.optimaRole,
            };

            response = await this.$store.dispatch(
              "userOutlet/createUser",
              userDetails
            );
          } else {
            userDetails.userId = this.$route.params.id;
            userDetails.role = {
              appSlug: "optima",
              roleId: userDetails.optimaRole,
            };
            response = await this.$store.dispatch(
              "userOutlet/updateUser",
              userDetails
            );
          }
          this.$vs.notify({
            title: "User",
            text: response.data.message || "User updated successfully",
            color: "primary",
            position: "top-right",
          });
          this.isSubmitting = false;
          this.$router.push({ name: "usersAndGroups" });
        }
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

    createFunction() {
      let data = {
        ...this.functions,
      };
      this.$store
        .dispatch("userOutlet/createFunction", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Function",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.close();
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Function",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
  async mounted() {
    const { id } = this.$route.params;

    if (id) {
      const { data } = await this.$store.dispatch("userOutlet/getSingleUser", id
      );

      // console.log({ data });

      this.userDetails = { ...this.userDetails, ...data.user};

      // console.log(data)
      this.userDetails.userOutlets = data.user.outlets.map((item) => ({
        id: item.id,
        name: item.name,
        manager: item.manager,
        isDefaultOutlet: item.user_outlets.isDefaultOutlet,
      }));

      const result = this.userDetails.userOutlets.find(
        (item) => item.isDefaultOutlet
      );

      // changed this from id to name
      result ? (this.primaryOutlet = result.id) : "";
    }

    // console.log(this.primaryOutlet)

    // await this.$store.dispatch("userOutlet/getOptimaOrgRoles");
    await this.$store.dispatch("userOutlet/getOrgFunction");
    await this.$store.dispatch("userOutlet/getOrgDesignation");
    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    await this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    await this.$store.dispatch("userOutlet/getNewOrgOptimaRoles");

    this.loading = false;
  },
};
</script>

<style></style>
