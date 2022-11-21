<template>
  <div class="font-normal" style="font-size: 14px">
    <back
      :location="`${$route.params.id ? 'Edit Designation' : 'New Designation'}`"
      class="mb-10"
    />

    <div
      v-if="
        getIsAccOwner || getOrganisationDesignationPrivileges.addNewDesignation
      "
    >
      <div
        class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 gap-10 rounded"
      >
        <h2 class="font-semibold col-span-12 mb-12">
          {{ $route.params.id ? "Edit Designation" : "New Designation" }}
        </h2>

        <div class="col-span-12">
          <h3 class="text-secondary-optima-color mb-6">
            Which of these two best describe the Designation?
          </h3>

          <div class="flex items-center">
            <label class="flex items-center mr-10">
              <input
                type="radio"
                class="mr-3"
                :value="true"
                v-model="designationDetails.isSupervisory"
              />
              Supervisory
            </label>

            <label class="flex items-center">
              <input
                type="radio"
                class="mr-3"
                :value="false"
                v-model="designationDetails.isSupervisory"
              />
              Non - Supervisory
            </label>
          </div>
        </div>

        <s-content-seperator class="my-12" />

        <h2 class="font-semibold col-span-12 mb-10">Designation Details</h2>

        <s-text
          label="Title:"
          :error="validateDesignationName"
          class="col-span-4 mb-12"
          v-model="$v.designationDetails.name.$model"
        />

        <s-select
          label="Function:"
          :options="getOrgFunction"
          :error="validateDesignationFunction"
          class="col-span-4 mb-12"
          v-model="$v.designationDetails.functionId.$model"
        />

        <s-select
          label="Job Level:"
          :options="getLevel"
          :error="validateDesignationJobLevel"
          class="col-span-4 mb-12"
          v-model="$v.designationDetails.levelId.$model"
        />

        <s-text
          label="Cost Center:"
          class="col-span-4 mb-12"
          disabled
          :value="selectedFunction.costCenter"
        />

        <s-select
          label="Reporting To:"
          :options="getDesignation"
          defaultOption="Nil"
          class="col-span-4 mb-12"
          v-model="designationDetails.reportingTo"
        />

        <!-- <s-select
        label="Dotted Reporting:"
        :options="getDesignation"
        class="col-span-4 mb-12"
        v-model="designationDetails.dottedReportingTo"
      /> -->

        <div class="col-span-4"></div>

        <s-content-seperator class="my-12" />
        <h2 class="font-semibold col-span-12 mb-10">Annual Salary Band</h2>

        <s-text
          label="Lower Salary Band:"
          type="number"
          class="col-span-4"
          prefixed
          :prefix-value="prefixValue"
          v-model="designationDetails.lowerAnnualSalaryBand"
        />

        <s-text
          label="Upper Salary Band:"
          type="number"
          class="col-span-4"
          prefixed
          :prefix-value="prefixValue"
          v-model="designationDetails.upperAnnualSalaryBand"
        />

        <div class="col-span-4"></div>

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
            @click="createDesignation"
            v-if="!$route.params.id"
          >
            Create Designation</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isUpdating"
            @click="updateDesignation"
            v-else
          >
            Update Designation</s-button
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

export default {
  name: "OrgDesignation",
  data() {
    return {
      isSubmitting: false,
      isUpdating: false,
      prefixValue: { type: "text", value: "₦" },
      designationDetails: {
        orgId: "",
        createdBy: "",
        name: "",
        isSupervisory: true,
        functionId: "",
        levelId: "",
        costCentre: "",
        reportingTo: null,
        dottedReportingTo: null,
        lowerAnnualSalaryBand: 0,
        upperAnnualSalaryBand: 0,
      },
    };
  },

  validations: {
    designationDetails: {
      name: { required },
      functionId: { required },
      levelId: { required },
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getOrgFunction",
      "getLevel",
      "getDesignation",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getOrganisationDesignationPrivileges",
    ]),

    selectedFunction() {
      let result;

      if (this.designationDetails.functionId) {
        result = this.getOrgFunction.find(
          ({ id }) => this.designationDetails.functionId === id
        );
      } else {
        result = "";
      }

      return result;
    },

    validateDesignationName() {
      if (
        this.$v.designationDetails.name.$dirty &&
        !this.$v.designationDetails.name.required
      )
        return ["Title is required"];
    },

    validateDesignationFunction() {
      if (
        this.$v.designationDetails.functionId.$dirty &&
        !this.$v.designationDetails.functionId.required
      )
        return ["Function is required"];
    },

    validateDesignationJobLevel() {
      if (
        this.$v.designationDetails.levelId.$dirty &&
        !this.$v.designationDetails.levelId.required
      )
        return ["Job level is required"];
    },
  },

  methods: {
    async createDesignation() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log("VALIDATION ERROR");
        } else {
          this.isSubmitting = true;

          const payload = {
            ...this.designationDetails,
          };

          payload.costCentre = this.selectedFunction.costCenter;

          // assign null to reporting to if empty string or null
          !payload.reportingTo && (payload.reportingTo = null);

          const { data } = await this.$store.dispatch(
            "userOutlet/createOrgDesignation",
            payload
          );

          this.isSubmitting = false;

          this.$vs.notify({
            title: "Designation",
            text: data.message,
            color: "primary",
            position: "top-right",
          });

          this.$router.push({ name: "organisationSetting" });
        }
      } catch (err) {
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Designation",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateDesignation() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log("VALIDATION ERROR");
        } else {
          this.isUpdating = true;

          const payload = {
            ...this.designationDetails,
          };

          payload.costCentre = this.selectedFunction.costCenter;

          // assign null to reporting to if empty string or null
          !payload.reportingTo && (payload.reportingTo = null);

          const { data } = await this.$store.dispatch(
            "userOutlet/updateDesignation",
            payload
          );

          this.isUpdating = false;

          this.$vs.notify({
            title: "Designation",
            text: data.message,
            color: "primary",
            position: "top-right",
          });

          this.$router.push({ name: "organisationSetting" });
        }
      } catch (err) {
        this.isUpdating = false;
        this.$vs.notify({
          title: "Designation",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  async mounted() {
    try {
      const { id } = this.$route.params;

      if (id) {
        const { data } = await this.$store.dispatch(
          "userOutlet/getSingleDesignation",
          id
        );

        this.designationDetails = data.designation;
      }
      this.$store.dispatch("userOutlet/getOrgFunction");
      this.$store.dispatch("userOutlet/getOrgLevels");
      this.$store.dispatch("userOutlet/getOrgDesignation");

      this.designationDetails.orgId =
        this.$store.state.auth.auth.authData.orgId;
      this.designationDetails.createdBy =
        this.$store.state.auth.auth.authData.creatorId;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>

<style></style>
