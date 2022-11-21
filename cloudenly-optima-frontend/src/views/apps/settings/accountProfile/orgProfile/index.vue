<template>
  <div
    id="div-with-loading"
    class="vs-con-loading__container"
    style="font-size: 14px">
    <section class="bg-white flex items-center justify-between mb-3 px-6 py-6">
      <div class="flex items-center">

        <s-photo
          :defaultPhoto="image_dummy"
          :title="'Logo'"
          :showUpload="editable"
          url="http://18.135.196.19:5001/document-management/upload/profile-photo"
          v-model="orgProfile.logoUrl"
        >
          <span class="mb-8 font-semibold">{{ orgProfile.name }}</span>
        </s-photo>
      </div>

     

      <button
        class="flex items-center"
        @click="$router.push({ name: 'organisationSetting' })"
      >
        <img :src="image_settings" alt="organization hierarchy" class="mr-3" />
        Organization Hierarchy
      </button>
    </section>

    <read-org-profile
      :org-profile="orgProfile"
      :org-location="orgLocation"
      :company-types="companyTypes"
      :countries="countries"
      :states="states"
      :specializations="specializations"
      @editable="editable = true"
      v-if="!editable"
    />

    <update-org-profile
      :initial-org-profile="orgProfile"
      :initial-org-location="orgLocation"
      :initial-specialization="specializations"
      :company-types="companyTypes"
      :countries="countries"
      :states="states"
      @editable="editable = false"
      v-else
    />

    <!-- <security-settings/> -->

    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countries from "@/utils/country";
import states from "@/utils/nigeriaState";

import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import readOrgProfile from "./components/readOrgProfile.vue";
import updateOrgProfile from "./components/updateOrgProfile.vue";
//import { delete } from "vue/types/umd";

import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
import image_settings from "@/assets/images/optimaAsset/navbar/settings.svg";
import securitySettings from './components/securitySettings.vue';
export default {
  components: {
    sPhoto,
    readOrgProfile,
    updateOrgProfile,
    securitySettings
  },
  data() {
    return {
      image_dummy,
      image_settings,
      countries,
      states,
      editable: false,
      loading: true,
      orgProfile: {
        id: null,
        alias: null,
        logoUrl: null,
        profile: null,
        name: null,
        dialCode: null,
        phoneNo: null,
        email: null,
        zipcode: null,
        iso2: null,
        orgSize: null,
        industry: { id: "", name: "" },
        industryCategory: "1",
        makeProfilePublic: true,
        makeOutletsPublic: false,
        enableAddToSupplier: true,
        locationDisplay: null,
        type: null,
        rcNumber: null,
        website: null,
        businessCoverage: null,
        address: null,
        specializations: null,
        timeZone: null,
        language: null,
      },
      orgLocation: {
        id: "",
        name: "Head Office",
        type: "new",
        country: "",
        address: "",
        state: null,
        city: null,
        lga: null,
        street: "",
        buildingNo: "",
        zipcode: "",
        manager: "",
        isForOffice: false,
        isForInventory: true,
        latitude: null,
        longitude: null,
      },
      specializations: [],
      companyTypes: [
        {
          slug: "solo",
          name: "Sole Proprietorship",
        },
        {
          slug: "LTD",
          name: "Private Limited Company(LTD)",
        },
        {
          slug: "PLC",
          name: "Public Limited Company(PLC)",
        },
        {
          slug: "LBG",
          name: "Limited by Guarantee",
        },
        {
          slug: "ULC",
          name: "Unlimited Company",
        },
      ],
    };
  },

  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getAccOwnerRootAdminPrivileges",
      "getAccOwnerOrganisationInformationPrivileges"
    ]),

    orgSpecialization() {
      return this.orgProfile.specializations.map((resp) => {
        return resp.name;
      });
    },

    orgSector() {
      return this.industrySector.find((resp) => {
        return resp.id === this.orgProfile.industryCategory;
      });
    },
  },

  async created() {

    try {
      //   this.$vs.loading({
      //     container: "#div-with-loading",
      //     scale: 0.7,
      //   });

      const { data } = await this.$store.dispatch(
        "userOutlet/getOrganisationProfile"
      );
      this.orgProfile = { ...this.orgProfile, ...data.org };

      this.orgLocation = { ...this.orgLocation, ...data.org.defaultOutlet };
      this.specializations = [
        ...this.specializations,
        ...data.org.specializations,
      ];

      delete this.orgProfile.defaultOutlet;

      this.loading = false;
      // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    } catch (err) {
      console.log(err);
      // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    }
  },
};
</script>

<style scoped lang="css">
/* * {
  font-size: 1rem;
} */
</style>
