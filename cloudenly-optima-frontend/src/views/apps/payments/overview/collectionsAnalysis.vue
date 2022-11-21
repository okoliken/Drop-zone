<template>
  <div>
    <!-- <div class="flex justify-between rounded-md bg-white px-8 py-6">
      <div
        class="w-8/12 mx-8 border-r-2 border-gray-400 border-l-0 border-t-0 border-b-0"
      >
        <p class="pr-3 pb-10">Collections</p>
        <div class="flex justify-between">
          <div class="flex justify-between">
            <div class="number text-blue-700 font-semibold pr-5">
              14
            </div>
            <div class="py-1">
              <p class="py-1 text-gray-500">Total Collections</p>
              <p>₦ 10,734,598.25</p>
            </div>
          </div>
          <div class="flex justify-between pr-5">
            <p class="number font-semibold pr-5">0</p>
            <div class="py-1">
              <p class="py-1 text-gray-500">Today</p>
              <p>₦ 0.00</p>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <p class="bg-gray-200 text-center py-3 mr-5">
            Due Today
          </p>
          <div class="text-center py-5" v-if="todayInfo.length == 0">
            No Collections Due today
          </div>
          <div
            v-for="info in todayInfo"
            :key="info.id"
            class="flex justify-between my-8 mr-5"
          >
            <p>{{ info.time }}</p>
            <p class="w-5/12 border-dashed border-b-2 border-gray-400"></p>
            <p>₦ {{ info.amount }}</p>
          </div>

          <p class="bg-gray-200 text-center mt-2 py-3 mr-5">Previous</p>
          <div
            v-for="info in prevInfo"
            :key="info.id"
            class="flex justify-between my-8 mr-5"
          >
            <p>{{ info.time }}</p>
            <p class="w-5/12 border-dashed border-b-2 border-gray-400"></p>
            <p>₦ {{ info.amount }}</p>
          </div>
        </div>
      </div>

      <div class="w-full border-none">
        <collectionChart />
      </div>
    </div> -->
  </div>
</template>

<script>
import collectionChart from "./collectionChart";
export default {
  components: {
    collectionChart,
  },
  data() {
    return {
      todayInfo: [],
      prevInfo: [
        {
          time: "Last 7 Days",
          amount: "77,005.08",
        },
        {
          time: "Last 30 Days",
          amount: "₦ 1,090,001.97",
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
