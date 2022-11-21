
<template>
  <div>
    <div class="vx-row ">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-8 py-8 flex items-center justify-between w-full bg-white"
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
                d="M3.3.7h17.4L30 10v24c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V4C0 2.2 1.5.7 3.3.7zM16.7 4H3.3v30h23.4V14H20a3.3 3.3 0 0 1-3.3-3.3V4zm3.3.7v6h6l-6-6zM8.3 27.3V24h10v3.3h-10zm0-10v3.4h13.4v-3.4H8.3z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl mb-1">
              {{ getQuotationAnalysisData.total }}
            </p>
            <p class>Total Quotation</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-8 py-8 flex items-center justify-between w-full bg-white"
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
                d="M20.7.7H3.3A3.3 3.3 0 0 0 0 4v30c0 1.8 1.5 3.3 3.3 3.3h23.4c1.8 0 3.3-1.5 3.3-3.3V10L20.7.7zM3.3 4h13.4v6.7c0 1.8 1.5 3.3 3.3 3.3h6.7v20H3.3V4zM20 10.7v-6l6 6h-6zM12 23v4h1.7v-4h1.4l1.3 4h2.5v-4h1V22h-1v-1.2h1v-1.2h-1v-4h-1.8v4h-1.4l-1.3-4H12v4H11v1.2h1V22h-1V23h1zm2-3.5h-.4V18l.5 1.5zm.8 2.4h-1l-.1-1.2h.7l.4 1.2zm2.4 0h-.8l-.3-1.2h1V22zm0 2.6l-.4-1.5h.4v1.5z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl mb-1">
              {{ getQuotationAnalysisData.totalPending }}
            </p>
            <p class>Total Pending</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-8 py-8 flex items-center justify-between w-full bg-white"
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
                d="M20.7.7H3.3A3.3 3.3 0 0 0 0 4v30c0 1.8 1.5 3.3 3.3 3.3h23.4c1.8 0 3.3-1.5 3.3-3.3V10L20.7.7zM3.3 4h13.4v6.7c0 1.8 1.5 3.3 3.3 3.3h6.7v20H3.3V4zM20 10.7v-6l6 6h-6zm.5 7.1L13.3 25l-3.8-3.8-2.3 2.3 6.1 6.2 9.5-9.5-2.3-2.4z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl mb-1">
              {{ getQuotationAnalysisData.totalClosed }}
            </p>
            <p class>Total Closed</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import quotationData from "./quotationData";

export default {
  data() {
    return {
      quotationData: quotationData,
    };
  },
  components: {
    StatisticsCardLine,
  },
  computed: {
    ...mapGetters("sales/Quotation", ["getQuotationAnalysisData"]),
  },

  mounted() {
    this.$store.dispatch("sales/Quotation/getQuotationAnalysisData");
  },
};
</script>