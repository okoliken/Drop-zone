<template>
  <div class="font-normal" style="font-size: 14px">
    <back
      :location="`${$route.params.id ? 'Edit Location' : 'New Outlets'}`"
      class="mb-8"
    />

    <div
      v-if="
        getIsAccOwner ||
          getInventorySettingPrivileges.createOutlets ||
          getInventorySettingPrivileges.editOutlets || getLocationSettingsPrivileges.createLocation
      "
    >
      <div
        class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 gap-10 rounded"
      >
        <h2 class="font-semibold col-span-12 mb-12">
          {{ $route.params.id ? "Edit Location" : "Create New Outlets" }}
        </h2>

        <s-text
          label="Location Name:"
          class="col-span-4 mb-12"
          v-model="$v.outlet.name.$model"
          :error="validateLocationName"
        />

        <s-select
          label="Type:"
          :options="outletTypes"
          class="col-span-4"
          v-model="$v.outlet.type.$model"
          :error="validateLocationType"
        />

        <s-select
          label="Manager:"
          :options="getOptimaUsers"
          class="col-span-4"
          v-model="outlet.manager"
        >
          <template v-slot:option="{ option }">
            <option :value="option.data.id">
              {{ option.data.fname }} {{ option.data.lname }}
            </option>
          </template>
        </s-select>

        <s-select
          label="Country:"
          :options="countryList"
          class="col-span-4"
          v-model="$v.outlet.country.$model"
          :error="validateLocationCountry"
          @input="outlet.state = ''"
        />

        <s-select
          label="State:"
          :options="stateList"
          class="col-span-4"
          v-model="$v.outlet.state.$model"
          :error="validateLocationState"
          v-if="outlet.country === 'NGA'"
        />

        <s-text
          label="State:"
          class="col-span-4 mb-12"
          placeholder="Enter a state"
          v-model="$v.outlet.state.$model"
          :error="validateLocationState"
          v-else
        />

        <s-text label="City:" class="col-span-4 mb-12" v-model="outlet.city" />

        <s-text
          label="Address:"
          class="col-span-4 mb-12"
          v-model="outlet.address"
        />

        <s-text
          label="Postal/Zip Code:"
          class="col-span-4 mb-12"
          v-model="outlet.zipcode"
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
            @click="createOutlet"
            v-if="!$route.params.id"
          >
            Create</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isUpdating"
            @click="updateOutlet"
            v-else
          >
            Update</s-button
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
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";

export default {
  name: "Location",
  data() {
    return {
      loading: false,
      countryList,
      stateList,
      isSubmitting: false,
      isUpdating: false,
      outlet: {
        isForOffice: false,
        isForInventory: true,
        orgId: null,
        name: "",
        type: null,
        manager: null,
        country: "",
        state: "",
        city: "",
        address: "",
        zipcode: null,
        latitude: null,
        longitude: null,
      },
      outletTypes: [
        "Office",
        "Warehouse/Distribution Centre",
        "Factory",
        "Production Center",
        "Terminal",
        "Sales and Services",
        "Others",
      ],
    };
  },

  validations: {
    outlet: {
      name: { required },
      type: { required },
      country: { required },
      state: { required },
    },
  },

  methods: {
    async createOutlet() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // console.log("VALIDATION ERROR");
        } else {
          this.isSubmitting = true;

          this.outlet.orgId = this.$store.state.auth.auth.authData.orgId;

          const { data } = await this.$store.dispatch(
            "userOutlet/createOutlet",
            this.outlet
          );

          this.$vs.notify({
            title: "Location",
            text: "Outlet Successfully created",
            color: "success",
            position: "top-right",
          });

          this.isSubmitting = false;

          this.$router.back();
        }
      } catch (err) {
        this.isSubmitting = false;

        this.$vs.notify({
          title: "Location",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateOutlet() {
      try {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.isUpdating = true;

          await this.$store.dispatch("userOutlet/updateOutlet", this.outlet); 
          this.$vs.notify({
            title: "Location",
            text: "Outlet Successfully updated",
            color: "primary",
            position: "top-right",
          });

          this.isUpdating = false;

          this.$router.push({ name: "locationsAndTaxes" });
        }
      } catch (err) {
        this.isUpdating = false;

        this.$vs.notify({
          title: "Location",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOptimaUsers"]),
    validateLocationName() {
      if (this.$v.outlet.name.$dirty && !this.$v.outlet.name.required)
        return ["Location name is required"];
    },
    validateLocationType() {
      if (this.$v.outlet.type.$dirty && !this.$v.outlet.type.required)
        return ["Location type is required"];
    },
    validateLocationCountry() {
      if (this.$v.outlet.country.$dirty && !this.$v.outlet.country.required)
        return ["Location country is required"];
    },
    validateLocationState() {
      if (this.$v.outlet.state.$dirty && !this.$v.outlet.state.required)
        return ["Location state is required"];
    },

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getInventorySettingPrivileges",
      "getLocationSettingsPrivileges"
    ]),
  },

  async mounted() {
    const { id } = this.$route.params;

    if (id) {
      await this.$store.dispatch("userOutlet/getSingleOutlet", id);

      this.outlet = {
        ...this.outlet,
        ...this.$store.state.userOutlet.singleOutlet,
      };

      this.outlet.manager = this.$store.state.userOutlet.singleOutlet.manager?.id;
    }

    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
  },
};
</script>

<style></style>
