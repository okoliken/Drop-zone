<template>
  <div>
    <div class="flex items-center w-full bg-white py-8">
      <div class="w-1/3">
        <div class="flex items-center">
          <div class="w-1/3 mr-5">
            <div class="flex text-right justify-end">
              <svg
                width="56"
                height="57"
                viewBox="0 0 56 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width="56"
                  height="56"
                  rx="28"
                  fill="#507FDF"
                  fill-opacity="0.15"
                />
                <path
                  d="M28 11.3889L14 17.6111V26.9444C14 35.5778 19.9733 43.6511 28 45.6111C36.0267 43.6511 42 35.5778 42 26.9444V17.6111L28 11.3889Z"
                  fill="#1034A6"
                />
              </svg>
            </div>
          </div>
          <div class="w-2/3">
            <h1 class="text-3xl text-primary-optima-color font-semibold mb-3">
              {{ topLoyalty[1].contacts }}
            </h1>
            <p class="text-gray-600 mb-3"> {{ topLoyalty[1].name }}</p>
          </div>
          <div>
            <svg
              width="2"
              height="53"
              viewBox="0 0 2 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.833374"
                y1="2.18556e-08"
                x2="0.833372"
                y2="53"
                stroke="#9BA0A7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex items-center">
          <div class="w-1/3 mr-5">
            <div class="flex text-right justify-end">
              <svg
                width="57"
                height="57"
                viewBox="0 0 57 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.333374"
                  y="0.5"
                  width="56"
                  height="56"
                  rx="28"
                  fill="#E3D888"
                  fill-opacity="0.15"
                />
                <path
                  d="M25.2223 36.2778L19 30.0556L21.1934 27.8622L25.2223 31.8756L35.4734 21.6244L37.6667 23.8333L25.2223 36.2778ZM28.3334 11.3889L14.3334 17.6111V26.9444C14.3334 35.5778 20.3067 43.6511 28.3334 45.6111C36.36 43.6511 42.3334 35.5778 42.3334 26.9444V17.6111L28.3334 11.3889Z"
                  fill="#E3D888"
                />
              </svg>
            </div>
          </div>
          <div class="w-2/3">
            <h1 class="text-3xl text-yellow-600 font-semibold mb-3">
              {{ topLoyalty[0].contacts }}
            </h1>
            <p class="text-gray-600 mb-3"> {{ topLoyalty[0].name }}</p>
          </div>
          <div>
            <svg
              width="2"
              height="53"
              viewBox="0 0 2 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.833374"
                y1="2.18556e-08"
                x2="0.833372"
                y2="53"
                stroke="#9BA0A7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex items-center">
          <div class="w-1/3 mr-5">
            <div class="flex text-right justify-end">
              <svg
                width="57"
                height="57"
                viewBox="0 0 57 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.666687"
                  y="0.5"
                  width="56"
                  height="56"
                  rx="28"
                  fill="#9BA0A7"
                  fill-opacity="0.15"
                />
                <path
                  d="M39.4667 39.066L42.5912 42.2509L40.5082 44.3491L37.3535 41.1943L34.1535 44.3943L32.0252 42.2509L35.2101 39.066L32.0252 35.8358L34.1082 33.7377L37.3082 36.9377L40.5082 33.7377L42.6667 35.8962L39.4667 39.066ZM28.2516 11.8962L41.8365 17.934V26.9906C41.8365 28.3491 41.6856 29.6774 41.3988 30.9906C40.1352 30.3359 38.7312 29.9992 37.3082 30.0094C34.9062 30.0094 32.6027 30.9636 30.9042 32.6621C29.2058 34.3605 28.2516 36.6641 28.2516 39.066C28.2516 41.1189 28.9308 43.0208 30.0931 44.5302L28.2516 45.1038C20.4629 43.2019 14.6667 35.3679 14.6667 26.9906V17.934L28.2516 11.8962Z"
                  fill="#9BA0A7"
                />
              </svg>
            </div>
          </div>
          <div class="w-2/3">
            <h1 class="text-3xl text-gray-500 font-semibold mb-3">
              {{ otherLoyalty[0].contacts }}
            </h1>
            <p class="text-gray-600 mb-3">others</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("crm/loyalty", ["getLoyaltyStat", "getLoyaltyStat"]),
    otherLoyalty() {
      return this.getLoyaltyStat.otherLoyalty;
    },
    topLoyalty() {
      return this.getLoyaltyStat.topLoyalty;
    },
  },

  mounted() {
    this.$store.dispatch("crm/loyalty/getLoyaltyStat").then((resp) => {
      console.log(resp);
    });
  },
};
</script>

<style></style>


