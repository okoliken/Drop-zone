<template>
  <div class="bg-white px-2 py-2">
    <h2 class="font-semibold">Organization Details</h2>
    <div
      class=""
      v-if="
        getIsAccOwner ||
          getAccOwnerOrganisationInformationPrivileges.viewInformation
      "
    >
      <section
        class="grid grid-cols-12 row-gap-10  gap-10 bg-white p-6 font-normal rounded"
      >
        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Type of Company:</div>
          <div class="col-span-7">
            {{ forkName(orgProfile.type, companyTypes, "slug") }}
          </div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Registration Number:</div>
          <div class="col-span-7">{{ orgProfile.rcNumber }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Email Address:</div>
          <div class="col-span-7">{{ orgProfile.email }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Contact Number:</div>
          <div class="col-span-7">{{ orgProfile.phoneNo }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Industry:</div>
          <div class="col-span-7">
            <!-- {{ orgProfile.industry.name | truncate(30) }} -->
            {{ industrySector | truncate(30) }}
          </div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">
            Specialization{{ specializations.length ? "s" : "" }}:
          </div>
          <div class="col-span-7">{{ specializations.length }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Country:</div>
          <div class="col-span-7">
            {{ forkName(orgLocation.country, countries) }}
          </div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">State:</div>
          <div class="col-span-7">
            {{ forkName(orgLocation.state, states) }}
          </div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">City:</div>
          <div class="col-span-7">{{ orgLocation.city }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Address:</div>
          <div class="col-span-7">{{ orgLocation.address }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Website:</div>
          <div class="col-span-7">{{ orgProfile.website }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Business Coverage:</div>
          <div class="col-span-7">{{ orgProfile.businessCoverage }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Time Zone:</div>
          <div class="col-span-7">{{ orgProfile.timeZone }}</div>
        </div>

        <div class="col-span-6 grid grid-cols-12">
          <div class="col-span-5 font-medium">Language:</div>
          <div class="col-span-7">{{ orgProfile.language }}</div>
        </div>

        <div class="col-span-12 mt-10">
          <s-button
            class="px-8 bg-primary-optima-color text-white"
            @click="$emit('editable')"
          >
            Update
          </s-button>
        </div>

        <s-content-seperator />
      </section>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { forkName } from "@/utils/helpers";
import { mapGetters } from "vuex";
export default {
  name: "AccountProfileOrgProfileView",
  props: {
    orgProfile: Object,
    orgLocation: Object,
    companyTypes: Array,
    countries: Array,
    states: Array,
    specializations: Array,
  },
  methods: { forkName },

  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getAccOwnerRootAdminPrivileges",
      "getAccOwnerOrganisationInformationPrivileges",
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    industrySector() {
      // disable vue/return-in-computed-property
      // eslint-disable-next-line vue/return-in-computed-property
      if (this.orgProfile.industry === null) {
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line vue/return-in-computed-property
        return "N/A";
      } else {
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line vue/return-in-computed-property
        return this.orgProfile.industry.name;
      }
    },
  },
};
</script>

<style></style>
