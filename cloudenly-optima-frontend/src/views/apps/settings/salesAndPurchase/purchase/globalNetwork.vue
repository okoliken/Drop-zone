<template>
  <div class="font-normal" style="font-size: 14px;">
    <h2 class="font-semibold bg-white p-6 mb-3">
      Global Network
    </h2>

    <div class="bg-white px-6 py-8 flex flex-col">
      <s-checkbox class="mb-8" v-model="globalNetwork.makeProfilePublic">
        <template v-slot:after>
          <span class="pl-5">Allow community to view my profile</span>
        </template>
      </s-checkbox>

      <s-checkbox class="mb-8" v-model="globalNetwork.makeOutletsPublic">
        <template v-slot:after>
          <span class="pl-5">Allow community to view my outlets</span>
        </template>
      </s-checkbox>

      <s-checkbox class="mb-16" v-model="globalNetwork.enableAddToSupplier">
        <template v-slot:after>
          <span class="pl-5"
            >Allow community to add me to supplier's network</span
          >
        </template>
      </s-checkbox>

      <!-- action buttons section -->
      <s-content-seperator class="mb-8" />

      <div class="flex">
        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="isUpdating"
          @click="handleUpdate"
        >
          Apply Update
        </s-button>

        <!-- <button class="px-8 py-4" style="border-radius: 50px; color: #5E646D;">
          Clear Changes
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: "PurchaseSettingsGlobalNetwork",
  data() {
    return {
      globalNetwork: {
        id: null,
        makeProfilePublic: false,
        makeOutletsPublic: false,
        enableAddToSupplier: false,
      },
      isUpdating: false,
    };
  },
  methods: {
    async handleUpdate() {
      try {
        this.isUpdating = true;

        const { data } = await this.$store.dispatch(
          "auth/auth/updateOrganisationProfile",
          {
            org: this.globalNetwork,
          }
        );

        this.isUpdating = false;

        this.$vs.notify({
          title: "Global Network",
          text: "Global network successfully updated",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);

        this.$vs.notify({
          title: "Global Network",
          text: "Global network update was unsuccessful",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  async mounted() {
    const { data } = await this.$store.dispatch(
      "userOutlet/getOrganisationProfile"
    );

    this.globalNetwork.id = data.org.id;
    this.globalNetwork.makeProfilePublic = data.org.makeProfilePublic;
    this.globalNetwork.makeOutletsPublic = data.org.makeOutletsPublic;
    this.globalNetwork.enableAddToSupplier = data.org.enableAddToSupplier;
  },
};
</script>

<style></style>
