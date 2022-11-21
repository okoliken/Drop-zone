<template>
  <div>
    <data-filter class="mb-3" />

    <section class="bg-white p-6 flex rounded mb-3">
      <s-select defaultOption="By Outlet"  :options="['By Outlets']" :width="200" />
      <s-select  defaultOption="Ikoyo Outlet Center"  :options="['Ikoyi Outlet Center']" :width="200" class="ml-3" />
    </section>

    <activities-list class="mb-3" />

    <meeting-count class="mb-3" />

    <meeting-purpose />
  </div>
</template>

<script>
import dataFilter from "../../components/dataFilter.vue";
import activitiesList from "./components/activitiesList.vue";
import meetingCount from "./components/meetingCount.vue";
import meetingPurpose from "./components/meetingPurpose.vue";

export default {
  name: "AnalyticsCrmActivities",
  components: { dataFilter, activitiesList, meetingCount, meetingPurpose },
};
</script>

<style></style>
