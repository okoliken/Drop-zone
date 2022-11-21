<template>
  <div>
    <div
      class="flex items-center justify-between rounded-md bg-white px-8 py-6"
    >
      <div
        class="
          flex
          items-center
          w-full
          mx-8
          border-2 border-l-0 border-t-0 border-b-0
        "
      >
        <div class="mr-10">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              rx="28"
              fill="#507FDF"
              fill-opacity="0.15"
            />
            <path
              d="M28 10.8889L14 17.1111V26.4444C14 35.0778 19.9733 43.1511 28 45.1111C36.0267 43.1511 42 35.0778 42 26.4444V17.1111L28 10.8889Z"
              fill="#1034A6"
            />
          </svg>
        </div>

        <div>
          <p class="font-semibold text-xl text-cloudenly-primary-main mb-5">
            {{ getPosStat.completedSales }}
          </p>
          <p class>Completed Sales</p>
        </div>
      </div>

      <div
        class="
          flex
          items-center
          w-full
          mx-8
          border-2 border-l-0 border-t-0 border-b-0
        "
      >
        <div class="mr-10">
          <svg
            width="57"
            height="56"
            viewBox="0 0 57 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.333374"
              width="56"
              height="56"
              rx="28"
              fill="#E3D888"
              fill-opacity="0.15"
            />
            <path
              d="M25.2223 35.7778L19 29.5556L21.1934 27.3622L25.2223 31.3756L35.4734 21.1244L37.6667 23.3333L25.2223 35.7778ZM28.3334 10.8889L14.3334 17.1111V26.4444C14.3334 35.0778 20.3067 43.1511 28.3334 45.1111C36.36 43.1511 42.3334 35.0778 42.3334 26.4444V17.1111L28.3334 10.8889Z"
              fill="#E3D888"
            />
          </svg>
        </div>

        <div>
          <p class="font-semibold text-orange-300 text-xl mb-5">
            {{ getPosStat.sales }}
          </p>
          <p class>Sales</p>
        </div>
      </div>

      <div class="flex items-center w-full mx-5 border-none">
        <div class="mr-10">
          <svg
            width="57"
            height="56"
            viewBox="0 0 57 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.666748"
              width="56"
              height="56"
              rx="28"
              fill="#9BA0A7"
              fill-opacity="0.15"
            />
            <path
              d="M39.4667 38.566L42.5913 41.7509L40.5083 43.8491L37.3535 40.6943L34.1535 43.8943L32.0252 41.7509L35.2101 38.566L32.0252 35.3358L34.1083 33.2377L37.3083 36.4377L40.5083 33.2377L42.6667 35.3962L39.4667 38.566ZM28.2517 11.3962L41.8366 17.434V26.4906C41.8366 27.8491 41.6856 29.1774 41.3988 30.4906C40.1353 29.8359 38.7313 29.4992 37.3083 29.5094C34.9063 29.5094 32.6027 30.4636 30.9043 32.1621C29.2058 33.8605 28.2517 36.1641 28.2517 38.566C28.2517 40.6189 28.9309 42.5208 30.0932 44.0302L28.2517 44.6038C20.463 42.7019 14.6667 34.8679 14.6667 26.4906V17.434L28.2517 11.3962Z"
              fill="#5E646D"
            />
          </svg>
        </div>

        <div class="py-5">
          <p class="font-semibold text-xl mb-5">
            ₦ {{ getPosStat.totlSalesAmount | formatCurrency }}
          </p>
          <p class>Total Transaction Volume</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      getPosStat: {
        completedSales: 0,
        sales: 0,
        totlSalesAmount: 0
      }
    };
  },

  computed: {
    ...mapGetters("sales/Pos", ["getPosStat"]),
  },
  mounted() {
    this.$store.dispatch("sales/Pos/getPosStat");
  },
};
</script>

<style>
</style>