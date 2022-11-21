<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
        <div class="px-5 py-8 flex items-center justify-between w-full bg-white">
          <div class>
            <svg width="30" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm-13.4 15v-3.4h10v3.4h-10zm0-10V19h13.4v-3.3H8.3zm3.1-10L12 5C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">{{getSalesOrderData.total}}</p>
            <p class>Total Order</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
        <div class="px-5 py-8 flex items-center justify-between w-full bg-white">
          <div class>
            <svg width="30" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm0 13.3v-3.3H8.3V24h13.4zM11.4 5.7L12 5C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">{{getSalesOrderData.totalPending}}</p>
            <p class>Order Pending</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
        <div class="px-5 py-8 flex items-center justify-between w-full bg-white">
          <div class>
            <svg width="30" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm-1.2 5.5l-7.2 7.1-3.8-3.8-2.3 2.3 6.1 6.2 9.5-9.5-2.3-2.3zm-9-10.5l.4-.6C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#5E646D"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">{{getSalesOrderData.totalCancelled}}</p>
            <p class>Order Closed</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
        <div class="px-5 py-8 flex items-center justify-between w-full bg-white">
          <div class>
            <svg width="30" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.3c1.2-1 3-1.6 5-1.6s3.8.6 5 1.6h1.7c1.8 0 3.3 1.5 3.3 3.4h1.7C28.5 5.7 30 7.2 30 9v25c0 1.8-1.5 3.3-3.3 3.3H3.3A3.3 3.3 0 0 1 0 34V9c0-1.8 1.5-3.3 3.3-3.3H5c0-1.9 1.5-3.4 3.3-3.4H10zm11.7 8.4c1.2 0 2.3-.7 2.9-1.7h2v25H3.4V9h2.1c.6 1 1.7 1.7 3 1.7h13.3zm-6.4 12.6l7.2-7.1 2.3 2.3-9.5 9.5-2.5-2.5-2.5 2.5-6.1-6.2 2.3-2.3 3.8 3.8.2-.1-1.3-1.4 2.3-2.3 1.3 1.3 4.7-4.6 2.3 2.3-4.6 4.7.1.1zM11.4 5.7L12 5C12.5 4.5 13.6 4 15 4c1.4 0 2.5.5 3 1l.6.7h3v1.6H8.4V5.7H11.4z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl">{{getSalesOrderData.totalExecuted}}</p>
            <p class>Order Executed</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from "./salesPurchaseOrderData";

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
    ...mapGetters("sales/SaleOrder", ["getSalesOrderData"]),
  },
  mounted() {
    this.$store.dispatch("sales/SaleOrder/getSaleOrderAnalysis")
  },
};
</script>