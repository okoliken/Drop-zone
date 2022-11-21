<template>
  <div class="bg-white p-6 rounded">
    <div class="flex mb-12">
      <div>
        <div class="flex mb-2">
          <h2 class="font-semibold">Meetings</h2>

          <feather-icon
            icon="AlertCircleIcon"
            svgClasses="ml-3 h-6 w-6 cursor-pointer"
          />
        </div>

        <div style="font-size: 13px;">Meeting Purpose</div>
      </div>

      <s-select :options="['Presentations' , 'Seminars' , 'Product Workshop']" :height="27" class="ml-6" />
    </div>

    <div class="flex">
      <div
        class="w-4/12 flex flex-col items-center pr-6"
        style="border-right: 1px solid #ccc;"
      >
        <donut class="mb-6" />

        <div class="flex items-center mb-4">
          <span>Pending Presentations:</span>
          <span class="ml-2 font-semibold">08</span>
        </div>

        <div>Goodwill Foundation, Pleier Plaza & 4 Others</div>
      </div>

      <div class="w-8/12 pl-10">
        <bar-chart-alt />
      </div>
    </div>
  </div>
</template>

<script>
import donut from "../svgFolder/donut.vue";
import barChartAlt from "../svgFolder/barChartAlt.vue";

export default {
  components: { donut, barChartAlt },
};
</script>

<style></style>
