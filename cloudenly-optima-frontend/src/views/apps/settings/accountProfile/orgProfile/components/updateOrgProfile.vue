/* eslint-disable no-unused-vars */
<template>
  <div>
    <div
      v-if="
        getIsAccOwner ||
          getAccOwnerOrganisationInformationPrivileges.updateInformation ||
          getAccOwnerOrganisationInformationPrivileges.editInformation
      "
    >
      <section
        class="font-normal grid grid-cols-12 row-gap-12 col-gap-16 gap-10 bg-white p-6 rounded"
        v-if="!loading"
      >
        <!-- get email modal -->
        <multi-modal v-model="modals.email" @proceed="sendTwofactor($event)">
          <template v-slot:title>
            {{
              changeType === "phone"
                ? "Change organization’s phone number?"
                : "Change organization’s email address?"
            }}
          </template>

          <template v-slot:body>
            Please enter the root admin's email address to proceed.
          </template>
        </multi-modal>

        <!-- get otp modal -->
        <otp-modal v-model="modals.otp" @proceed="handleOtp($event)">
          <template v-slot:title> One Time Password (OTP) </template>

          <template v-slot:body>
            Enter the confirmation code sent to your email address to continue.
          </template>
        </otp-modal>

        <!-- get new email or password modal -->
        <multi-modal
          v-model="modals.new"
          :placeholder="
            changeType === 'phone'
              ? 'Enter new phone number'
              : 'Enter new email address'
          "
          @proceed="updateEmailAddressOrPhoneNumber($event)"
        >
          <template v-slot:title>
            {{
              changeType === "phone"
                ? "Organization’s new phone number?"
                : "organization’s new email address?"
            }}
          </template>

          <template v-slot:body>
            {{
              changeType === "phone"
                ? "Please enter new phone number to complete"
                : "Please enter new email to complete"
            }}
          </template>
        </multi-modal>

        <h2 class="font-semibold col-span-12">
          Organization Details
          <span class="text-secondary-optima-color ml-3" style="font-size: 13px"
            >Edit</span
          >
        </h2>

        <s-select
          label="Type of Company:"
          :options="companyTypes"
          select-id="slug"
          class="col-span-4"
          v-model="orgProfile.type"
        />

        <s-text
          label="Registration Number:"
          class="col-span-4"
          v-model="orgProfile.rcNumber"
        />

        <s-text class="col-span-4" disabled v-model="orgProfile.email">
          <template v-slot:label>
            <label
              for="field"
              class="mb-3 w-full flex items-center justify-between"
            >
              Email Address

              <button
                class="text-secondary-optima-color"
                @click="initChange('email')"
              >
                Change
              </button>
            </label>
          </template>
        </s-text>

        <s-text class="col-span-4" disabled v-model="orgProfile.phoneNo">
          <template v-slot:label>
            <label
              for="field"
              class="mb-3 w-full flex items-center justify-between"
            >
              Contact Number

              <button
                class="text-secondary-optima-color"
                @click="initChange('phone')"
              >
                Change
              </button>
            </label>
          </template>
        </s-text>

        <s-select
          label="Industry Category:"
          :options="getIndustriesWithSubindustries"
          class="col-span-4"
          v-model="orgProfile.industryCategory"
        />

        <s-multi-select
          label="Specialization"
          :options="subIndustries"
          view="modal"
          class="col-span-4"
          v-model="specializations"
        />

        <s-select
          label="Country:"
          class="col-span-4"
          :options="countries"
          v-model="orgLocation.country"
        />

        <s-select
          label="State:"
          :options="states"
          class="col-span-4"
          v-model="orgLocation.state"
        />

        <s-text label="City" class="col-span-4" v-model="orgLocation.city" />

        <s-text
          label="Address"
          class="col-span-4"
          v-model="orgLocation.address"
        />

        <s-text
          label="Website:"
          class="col-span-4"
          v-model="orgProfile.website"
        />

        <s-text
          label="Business Coverage:"
          class="col-span-4"
          v-model="orgProfile.businessCoverage"
        />

        <s-select
          label="Time Zone:"
          :options="timezone"
          class="col-span-4"
          v-model="orgProfile.timeZone"
        />

        <s-select
          label="Language:"
          class="col-span-4"
          :options="language"
          v-model="orgProfile.language"
        />

        <s-content-seperator class="mt-2" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$emit('editable')"
          >
            Cancel
          </s-button>

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="updateOrganisation"
          >
            Save Changes
          </s-button>
        </div>
      </section>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from "vuex";
import language from "@/utils/language";
import timezone from "@/utils/timezone";

import multiModal from "@/views/apps/settings/components/multiModal.vue";
import otpModal from "@/views/apps/settings/components/otpModal.vue";

export default {
  name: "AccountProfileOrgProfileUpdate",
  components: { multiModal, otpModal },
  props: {
    initialOrgProfile: Object,
    initialOrgLocation: Object,
    initialSpecialization: Array,
    companyTypes: Array,
    countries: Array,
    states: Array,
  },
  data() {
    return {
      orgProfile: this.initialOrgProfile,
      orgLocation: this.initialOrgLocation,
      specializations: this.initialSpecialization,
      language,
      timezone,
      isSubmitting: false,
      loading: true,
      modals: {
        email: false,
        otp: false,
        new: false,
      },
      changeType: "",
      otpToken: "",
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getIndustriesWithSubindustries"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getAccOwnerRootAdminPrivileges",
      "getAccOwnerOrganisationInformationPrivileges",
    ]),
    subIndustries() {
      const result = this.getIndustriesWithSubindustries.find(
        ({ id }) => id === this.orgProfile.industryCategory
      );
      return result ? result.subIndustries : [];
    },
  },
  methods: {
    initChange(type) {
      this.changeType = type;
      this.modals.email = true;
    },

    async sendTwofactor(email) {
      try {
        const { data } = await this.$store.dispatch("auth/auth/sendTwoFactor", {
          userId: this.$store.state.auth.auth.authData.creatorId,
          email,
        });

        this.$vs.notify({
          title: "Two factor",
          text: data.message,
          color: "primary",
          position: "top-right",
        });

        this.modals.otp = true;
      } catch (err) {
        console.log(err);

        this.$vs.notify({
          title: "Two factor",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    handleOtp(token) {
      this.otpToken = token;
      this.modals.new = true;
    },

    async updateEmailAddressOrPhoneNumber(value) {
      try {
        const payload = {
          userId: this.$store.state.auth.auth.authData.creatorId,
          token: this.otpToken,
        };

        let response;

        if (this.changeType === "email") {
          payload.email = value;

          response = await this.$store.dispatch(
            "auth/auth/updateOrgEmail",
            payload
          );

          this.orgProfile.email = response.data.email;
        } else {
          payload.phoneNo = value;

          response = await this.$store.dispatch(
            "auth/auth/updateOrgPhoneNo",
            payload
          );

          this.orgProfile.phoneNo = response.data.phoneNo;
        }

        this.$vs.notify({
          title: this.changeType === "phone" ? "Phone" : "Email",
          text: response.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
      }
    },

    async updateOrganisation() {
      try {
        this.isSubmitting = true;

        const payload = {
          org: this.orgProfile,
          location: this.orgLocation,
          specializations: this.specializations.map((item) => ({
            orgId: this.$store.state.auth.auth.authData.orgId,
            subIndustryId: item.id,
          })),
        };

        const { data } = await this.$store.dispatch(
          "auth/auth/updateOrganisationProfile",
          payload
        );

        this.isSubmitting = false;

        this.$vs.notify({
          title: "Organisation",
          text: "Profile Updated",
          color: "primary",
          position: "top-right",
        });

        this.editable = false;
      } catch (err) {
        console.log(err);

        this.isSubmitting = false;
        this.$vs.notify({
          title: "Organisation",
          text: err.response.data.message,
          color: "error",
          position: "top-right",
        });
      }
    },
  },

  async mounted() {
    await this.$store.dispatch("userOutlet/getIndustriesWithSubindustries");
    this.loading = false;
  },
};

//  Industry Category is returing Agriculture as
//  default here because the industry catergory {{this.orgProfile.industryCategory}}
//  gotten from vuexstore/api is 2 which is Agriculture so. I stand to be corrected
</script>

<style></style>
