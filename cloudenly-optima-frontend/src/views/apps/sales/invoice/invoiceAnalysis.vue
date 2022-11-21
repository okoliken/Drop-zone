

<template>
  <div>
    <!-- ROW 2 -->
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
                d="M3.3.7h17.4L30 10v24c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V4C0 2.2 1.5.7 3.3.7zM16.7 4H3.3v30h23.4V14H20a3.3 3.3 0 0 1-3.3-3.3V4zm3.3.7v6h6l-6-6zM8.3 27.3V24h10v3.3h-10zm0-10v3.4h13.4v-3.4H8.3z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getInvoiceAnalysisData.total }}
            </p>
            <p class>Total Sales</p>
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
                d="M20.7.7H3.3A3.3 3.3 0 0 0 0 4v30c0 1.8 1.5 3.3 3.3 3.3h23.4c1.8 0 3.3-1.5 3.3-3.3V10L20.7.7zm-4 3.3H3.3v30h23.4V14H20a3.3 3.3 0 0 1-3.3-3.3V4zm9.3 6.7l-6-6v6h6zm-11 4.2c1.4 0 2.5.4 3.3 1 .8.8 1.3 1.8 1.3 3 0 1.3-.4 2.2-1.2 2.9-.8.6-1.8 1-3.1 1v1.4h-3v-3.5h1.1c1 0 1.7-.1 2.2-.4.5-.2.8-.7.8-1.3 0-.4-.1-.8-.4-1-.2-.3-.5-.4-1-.4-.4 0-.8.1-1 .4-.3.2-.4.6-.4 1h-3c0-.7 0-1.4.4-2 .4-.7.9-1.2 1.6-1.5.7-.4 1.5-.6 2.5-.6zm-1.2 14.3a2 2 0 0 1-1.4-.5c-.3-.4-.5-.8-.5-1.3s.2-1 .5-1.3a2 2 0 0 1 1.4-.5c.6 0 1 .2 1.4.5.4.4.5.8.5 1.3s-.1 1-.5 1.3a2 2 0 0 1-1.4.5z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getInvoiceAnalysisData.totalPending }}
            </p>
            <p class>Total Pending</p>
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
                d="M20.7.7H3.3A3.3 3.3 0 0 0 0 4v30c0 1.8 1.5 3.3 3.3 3.3h23.4c1.8 0 3.3-1.5 3.3-3.3V10L20.7.7zM3.3 4h13.4v6.7c0 1.8 1.5 3.3 3.3 3.3h6.7v20H3.3V4zM20 10.7v-6l6 6h-6zm.5 7.1L13.3 25l-3.8-3.8-2.3 2.3 6.1 6.2 9.5-9.5-2.3-2.4z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">
              {{ getInvoiceAnalysisData.totalClosed }}
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
import StaticCard from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./invoiceData";

export default {
  data() {
    return {
      analyticsData: analyticsData,
    };
  },
  components: {
    StaticCard,
  },

  computed: {
    ...mapGetters("sales/Invoice", ["getInvoiceAnalysisData"]),
  },

  mounted() {
    this.$store.dispatch("sales/Invoice/getInvoiceAnalysisData");
  },
};
</script>
