
<template>
  <div class="mt-5">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-5 py-8 flex items-center justify-between w-full bg-white"
        >
          <div class>
            <svg
              width="30"
              height="38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm-13.4 15v-3.4h10v3.4h-10zm0-10V19h13.4v-3.3H8.3zm3.1-10L12 5C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getMaterialRequestAnalysis.total }}
            </p>
            <p class>Total Requests</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-5 py-8 flex items-center justify-between w-full bg-white"
        >
          <div class>
            <svg
              width="30"
              height="38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 .7c-2 0-3.8.6-5 1.6H8.3A3.3 3.3 0 0 0 5 5.7H3.3A3.3 3.3 0 0 0 0 9v25c0 1.8 1.5 3.3 3.3 3.3h23.4c1.8 0 3.3-1.5 3.3-3.3V9c0-1.8-1.5-3.3-3.3-3.3H25c0-1.9-1.5-3.4-3.3-3.4H20c-1.2-1-3-1.6-5-1.6zM24.6 9c-.6 1-1.7 1.7-3 1.7H8.4C7.1 10.7 6 10 5.4 9h-2v25h23.3V9h-2.1z"
                fill="#FF4F79"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 5l-.6.7H8.3v1.6h13.4V5.7h-3.1L18 5C17.5 4.5 16.4 4 15 4c-1.4 0-2.5.5-3 1z"
                fill="#fff"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23 21v2H8v-2h15z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getMaterialRequestAnalysis.totalPending }}
            </p>
            <p class>Pending Requests</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-5 py-8 flex items-center justify-between w-full bg-white"
        >
          <div class>
            <svg
              width="30"
              height="38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm-10.3-5L12 5C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#4ECDC4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7 24.3L22 15l1.4 1.4-10.7 10.7L7 21.4 8.4 20l4.3 4.3z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getMaterialRequestAnalysis.totalClosed }}
            </p>
            <p class>Closed Requests</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from './purchaseOrderData'

export default {
  data() {
    return {
      // analyticsData: analyticsData,
    };
  },
  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("inventory/materialRequest", ["getMaterialRequestAnalysis"]),
  },

  mounted() {
    this.$store
      .dispatch("inventory/materialRequest/getMaterialRequestAnalysisData")

  },
};
</script>