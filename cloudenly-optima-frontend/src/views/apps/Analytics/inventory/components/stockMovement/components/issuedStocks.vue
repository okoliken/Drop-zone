<template>
  <div class="grid grid-cols-12 bg-white p-6 rounded">
    <div class="col-span-12 flex justify-between mb-6">
      <div class="flex">
        <div class="flex flex-col mr-16">
          <div class="flex items-center mb-2">
            <h2 class="font-semibold">Stock Movement</h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="ml-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <small>Issued Stock</small>
        </div>

        <s-select :height="27" class="mr-3" />
        <s-select :height="27" class="mr-3" />
        <s-select :height="27" />
      </div>

      <div>Showing last 30 Days</div>
    </div>

    <div class="col-span-7 flex flex-col justify-center pr-6">
      <div
        class="flex items-center"
        :class="{ 'mb-8': i !== 5 }"
        v-for="(item, i) in movements"
        :key="i"
      >
        <div class="w-5/12">{{ item.text }}</div>

        <div class="w-7/12 flex items-center">
          <div class="h-8" style="width: 85%;">
            <div
              class="h-full w-full pl-2 text-white flex items-center bg-secondary-optima-color"
            >
              100
            </div>
          </div>

          <div class="flex justify-end" style="width: 15%;">100%</div>
        </div>
      </div>
    </div>

    <div
      class="col-span-5 grid grid-cols-12 row-gap-6 pl-6"
      style="border-left: 1px solid #ccc;"
    >
      <div class="col-span-12 flex flex-col mb-6">
        <small class="mb-2">Added Stock (Total Stock)</small>

        <div>
          <span class="font-semibold" style="font-size: 15px;">345</span> (of
          2,341) -
          <span class="text-primary-optima-color font-semibold"
            >₦ 220,002.00</span
          >
        </div>
      </div>

      <div
        class="flex flex-col col-span-6"
        v-for="(item, i) in movements"
        :key="i"
      >
        <small class="mb-2 font-normal">{{ item.text }}</small>

        <div class="font-semibold" style="font-size: 16px;">
          ₦ {{ item.value }}
          <span
            class="text-tetiary-optima-color font-normal"
            style="font-size: 14px;"
            >{{ item.tick }}%</span
          >
        </div>
      </div>

      <div class="col-span-12 grid grid-cols-12 mt-8">
        <h3 class="col-span-12 text-secondary-optima-color font-medium mb-2">
          In-Process
        </h3>

        <div class="flex flex-col col-span-6">
          <small class="mb-2 font-normal">Purchase Orders</small>

          <div class="font-semibold" style="font-size: 16px;">
            ₦ 59,400.54
            <span
              class="text-tetiary-optima-color font-normal"
              style="font-size: 14px;"
              >+1.23%</span
            >
          </div>
        </div>

        <div class="flex flex-col col-span-6">
          <small class="mb-2 font-normal">Unreceipted Waybills</small>

          <div class="font-semibold" style="font-size: 16px;">
            ₦ 59,400.54
            <span
              class="text-tetiary-optima-color font-normal"
              style="font-size: 14px;"
              >+1.23%</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 flex justify-end mt-12">
      <s-button class="bg-primary-optima-color font-medium text-white px-6"
        >View More</s-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AnalyticsInventoryStockMovementIssuedStocks",
  data() {
    return {
      movements: [
        {
          text: "Good Received Notes",
          percentages: 92,
          value: "59,400.54",
          tick: "+1.23"
        },
        {
          text: "Material Returns",
          percentages: 92,
          value: "6,600.06",
          tick: "-0.50"
        },
        {
          text: "Purchase Orders",
          percentages: 92,
          value: "44,000.00",
          tick: "-0.30"
        },
        {
          text: "Material Requests",
          percentages: 92,
          value: "44,000.40",
          tick: "+0.01"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("analytics", ["getAllStockMovement"])
  },
  mounted() {
    this.$store.dispatch("analytics/getAllStockMovement");
  }
};
</script>

<style></style>
