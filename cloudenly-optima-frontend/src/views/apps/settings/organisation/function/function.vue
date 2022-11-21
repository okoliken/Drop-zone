<template>
  <div class="font-normal" style="font-size: 14px">
    <back location=" Functions" class="mb-10" />

    <div v-if="getIsAccOwner || getFunctionPrivileges.createFunction">
      <div
        class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 gap-10 rounded"
      >
        <h2 class="font-semibold col-span-12 mb-12">{{type}} Function</h2>

        <s-text
          label="Function Name:"
          class="col-span-4 mb-12"
          v-model="$v.functionDetails.name.$model"
          :error="validateFunctionName"
        />

        <s-select
          label="Hierarchy:"
          :options="getFunctionHierarchy"
          class="col-span-4"
          v-model="$v.functionDetails.hierarchyId.$model"
          :error="validateFunctionHierachy"
        />

        <s-text
          label="Cost Centre Number:"
          class="col-span-4"
          v-model="$v.functionDetails.costCenter.$model"
          :error="validateFunctionCostCenter"
        />

        <s-select
          label="Supervisory Function:"
          :options="getOrgFunction"
          default-option="Nil"
          :default-option-id="null"
          class="col-span-4"
          v-model="functionDetails.reportingTo"
        />

        <s-content-seperator class="my-12" />

        <h2 class="font-semibold col-span-12 mb-10">KPA Summary</h2>

        <div class="col-span-12">
          <table class="w-full">
            <thead>
              <th
                class="w-7/12 text-secondary-optima-color"
                style="font-size: 13px; padding: 0"
              >
                KPA Description
              </th>

              <th
                class="w-5/12 text-secondary-optima-color"
                style="font-size: 13px; padding: 0"
              >
                Actions
              </th>
            </thead>

            <!-- empty table body state -->
            <tbody v-if="!functionDetails.kpis.length">
              <tr>
                <td class="flex items-end h-full py-4">
                  <span>---</span>
                </td>
              </tr>
            </tbody>

            <!-- table body with state -->
            <tbody v-else>
              <tr
                style="height: 60px"
                v-for="(kpi, i) in functionDetails.kpis"
                :key="i"
              >
                <td class="flex items-end h-full my-5">
                  <s-text
                    class="w-7/12"
                    v-model="kpi.name"
                    :disabled="!kpi.editable"
                  />
                </td>

                <td style="height: 100%">
                  <div class="flex items-end" style="height: 100%">
                    <button
                      class="text-primary-optima-color font-medium mr-4"
                      @click="kpi.editable = false"
                      v-if="kpi.editable"
                    >
                      Save
                    </button>

                    <button
                      class="text-primary-optima-color font-medium mr-4"
                      @click="kpi.editable = true"
                      v-else
                    >
                      Edit
                    </button>

                    <button
                      class="font-medium text-dark-optima-color-lite"
                      @click="removeKpi(i)"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            class="text-primary-optima-color font-medium mt-8"
            @click="addKpi"
          >
            Add New
          </button>
        </div>

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
            @click="createOrgFunction"
            v-if="!$route.params.id"
          >
            Create Function</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isUpdating"
            @click="updateOrgFunction"
            v-else
          >
            Update Function</s-button
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
/* eslint-disable no-unused-vars */

import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CreateOrgFunction",
  data() {
    return {
      isSubmitting: false,
      isUpdating: false,
      type : "New",
      functionDetails: {
        orgId: "",
        name: "",
        costCenter: "",
        hierarchyId: "",
        createdBy: "",
        reportingTo: null,
        kpis: [],
      },
    };
  },
  validations: {
    functionDetails: {
      name: { required },
      costCenter: { required },
      hierarchyId: { required },
    },
  },
  computed: {
    ...mapGetters("userOutlet", ["getOrgFunction", "getFunctionHierarchy"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getFunctionPrivileges"]),

    validateFunctionName() {
      if (
        this.$v.functionDetails.name.$dirty &&
        !this.$v.functionDetails.name.required
      )
        return ["Function name is required"];
    },
    validateFunctionCostCenter() {
      if (
        this.$v.functionDetails.costCenter.$dirty &&
        !this.$v.functionDetails.costCenter.required
      )
        return ["Cost center is required"];
    },
    validateFunctionHierachy() {
      if (
        this.$v.functionDetails.hierarchyId.$dirty &&
        !this.$v.functionDetails.hierarchyId.required
      )
        return ["Hierachy is required"];
    },
  },
  methods: {
    async createOrgFunction() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log("VALIDATION ERROR");
        } else {
          const functionDetails = { ...this.functionDetails };

          functionDetails.kpis = functionDetails.kpis
            .filter(({ editable }) => editable !== true)
            .map(({ name }) => ({ name }));

          // assign null to supervisory function if empty string
          !functionDetails.reportingTo && (functionDetails.reportingTo = null);

          this.isSubmitting = true;

          await this.$store.dispatch(
            "userOutlet/createFunction",
            functionDetails
          );

          this.isSubmitting = false;

          this.$vs.notify({
            title: "Function",
            text: "Function successfully created",
            color: "primary",
            position: "top-right",
          });

          this.$router.push({ name: "organisationSetting" });
        }
      } catch (err) {
        // console.log(err);
        this.isSubmitting = false;

        this.$vs.notify({
          title: "Function",
          text: err.response.data.errors[0].msg,
          color: "danger",
          position: "top-right",
        });
      }
    },
    async updateOrgFunction() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log("VALIDATION ERROR");
        } else {
          const functionDetails = {
            functionId: this.functionDetails.id,
            ...this.functionDetails,
          };

          functionDetails.kpis = functionDetails.kpis
            .filter(({ editable }) => editable !== true)
            .map(({ name }) => ({ functionId: this.functionDetails.id, name }));

          // assign null to supervisory function if empty string
          !functionDetails.reportingTo && (functionDetails.reportingTo = null);

          this.isUpdating = true;

          await this.$store.dispatch(
            "userOutlet/updateFunction",
            functionDetails
          );

          this.isUpdating = false;

          this.$vs.notify({
            title: "Function",
            text: "Function successfully updated",
            color: "primary",
            position: "top-right",
          });

          this.$router.push({ name: "organisationSetting" });
        }
      } catch (err) {
        // console.log(err);
        this.isSubmitting = false;

        this.$vs.notify({
          title: "Function",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },
    addKpi() {
      this.functionDetails.kpis.push({ name: "", editable: true });
    },
    removeKpi(index) {
      this.functionDetails.kpis = this.functionDetails.kpis.filter(
        (_, i) => i !== index
      );
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("userOutlet/getFunctionHierarchy");
      await this.$store.dispatch("userOutlet/getOrgFunction");

      const { id } = this.$route.params;

      if (id) {
        this.type = 'Edit'
        const { data } = await this.$store.dispatch(
          "userOutlet/getSingleOrgFunction",
          id
        );

        this.functionDetails = { ...data.orgFunction };
        this.functionDetails.kpis = this.functionDetails.kpis.map(
          ({ id, name }) => ({
            id,
            name,
            editable: false,
          })
        );
      } else {
        this.type = 'New' 
        this.functionDetails.orgId = this.$store.state.auth.auth.authData.orgId;
        this.functionDetails.createdBy =
          this.$store.state.auth.auth.authData.creatorId;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>

<style></style>
