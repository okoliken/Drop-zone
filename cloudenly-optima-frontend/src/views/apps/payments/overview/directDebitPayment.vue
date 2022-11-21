<template>
  <div>
    <!-- <div class="flex justify-between rounded-md bg-white px-8 py-6">
      <div
        class="w-8/12 mx-8 border-r-2 border-gray-400 border-l-0 border-t-0 border-b-0"
      >
        <p class="pr-3 pb-10">Direct Debits</p>
        <div class="flex justify-between">
          <div class="flex justify-between">
            <div class="number text-blue-700 font-semibold pr-5">
              57
            </div>
            <div class="py-1">
              <p class="py-1 text-gray-500">Total Payments</p>
              <p>₦ 29,234,560.55</p>
            </div>
          </div>
          <div class="flex justify-between pr-5">
            <p class="number font-semibold pr-5">7</p>
            <div class="py-1">
              <p class="py-1 text-gray-500">Today</p>
              <p>₦ 2,509,060.55</p>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <p class="bg-gray-200 text-center py-3 mr-5">Today</p>
          <div
            v-for="info in todayInfo"
            :key="info.id"
            class="flex justify-between my-8 mr-5"
          >
            <p>{{ info.time }}</p>
            <p class="w-5/12 border-dashed border-b-2 border-gray-400"></p>
            <p>{{ info.amount }}</p>
          </div>

          <p class="bg-gray-200 text-center py-3 mr-5">Previous</p>
          <div
            v-for="info in prevInfo"
            :key="info.id"
            class="flex justify-between my-8 mr-5"
          >
            <p>{{ info.time }}</p>
            <p class="w-5/12 border-dashed border-b-2 border-gray-400"></p>
            <p>{{ info.amount }}</p>
          </div>
        </div>
      </div>

      <div class="w-full border-none">
        <paymentChart />
      </div>
    </div> -->
  </div>
</template>

<script>
import paymentChart from "./paymentChart";
export default {
  components: {
    paymentChart,
  },
  data() {
    return {
      todayInfo: [
        {
          time: "09:00 AM",
          amount: "₦412,900.75",
        },
        {
          time: "12:34 PM",
          amount: " ₦ 1,907,868.90",
        },
      ],
      prevInfo: [
        {
          time: "Last 7 Days",
          amount: "₦ 1,077,115.58",
        },
        {
          time: "Last 30 Days",
          amount: "₦ 677,868.90",
        },
      ],
    };
  },
};
</script>

<style scoped>
.number {
  font-size: 3em;
}
</style>
