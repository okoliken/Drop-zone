<template>
  <div
    id="div-with-loading"
    class="vs-con-loading__container bg-white grid grid-cols-12 row-gap-10 gap-10 px-6 pt-8 pb-10 rounded"
  >
    <h1 class="col-span-12 font-semibold">Pipeline Movement</h1>

    <div class="col-span-4 font-medium">Pipeline Conversion</div>

    <div class="col-span-8 font-medium">Status Transition Event</div>

    <div class="col-span-4 flex items-center">
      Convert from Lead to Opportunity:
    </div>

    <div
      class="col-span-8 grid grid-cols-12 gap-6 py-3 px-4 rounded"
      style="border: 1px solid #eee"
      v-if="settings.leadToOpportunity.conditions.length"
    >
      <div
        class="col-span-6 rounded py-2 px-4"
        style="background: #eee"
        v-for="(item, i) in settings.leadToOpportunity.conditions"
        :key="i"
      >
        {{ item.description }}
      </div>
    </div>

    <div class="col-span-4 flex items-center">Convert from Lead to Sales:</div>

    <div
      class="col-span-8 grid grid-cols-12 gap-6 py-3 px-4 rounded"
      style="border: 1px solid #eee; word-wrap: break-word"
      v-if="settings.leadToSale.conditions.length"
    >
      <div
        class="col-span-6 rounded py-2 px-4"
        style="background: #eee"
        v-for="(item, i) in settings.leadToSale.conditions"
        :key="i"
      >
        {{ item.description }}
      </div>
    </div>

    <div class="col-span-4 flex items-center">
      Convert from Opportunity to Sales:
    </div>

    <div
      class="col-span-8 grid grid-cols-12 gap-6 py-3 px-4 rounded"
      style="border: 1px solid #eee"
      v-if="settings.opportunityToSale.conditions.length"
    >
      <div
        class="col-span-6 rounded py-2 px-4"
        style="background: #eee"
        v-for="(item, i) in settings.opportunityToSale.conditions"
        :key="i"
      >
        {{ item.description }}
      </div>
    </div>

    <s-content-seperator />

    <div class="col-span-12">
      <button
        v-if="getIsAccOwner || getCrmSettingPrivileges.editPipelineMovement"
        class="text-white bg-primary-optima-color py-4 px-8"
        style="border-radius: 50px"
        @click="$emit('update')"
      >
        Update Settings
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PipelineMovementComponent",
  data() {
    return {
      settings: {
        leadToOpportunity: {
          title: "Move customer from lead to opportunity",
          conditions: [],
        },
        leadToSale: {
          title: "Move customer from lead to sale",
          conditions: [],
        },
        opportunityToSale: {
          title: "Move customer from opportunity to sale",
          conditions: [],
        },
      },
    };
  },
  computed: {
    ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"]),
  },
  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    const { data } = await this.$store.dispatch(
      "crm/pipeline/getPipelineSetup"
    );

    this.settings = data.settings;
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>
