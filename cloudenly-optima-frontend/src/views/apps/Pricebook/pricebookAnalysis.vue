<template>
  <div class="flex items-center justify-between  bg-white px-8 py-8">
    
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
        <img
          class="
            p-3
            inline-flex
            rounded-full
            bg-cloudenly-primary-off
            h-16
            w-16
          "
          src="../../../assets/images/optimaAsset/svg products.svg"
          alt
          srcset
        />
      </div>

      <div>
        <p class="font-semibold text-xl">
          {{ getCatalogAnalysisData.totalNumberOfPurchaseVariant }}
        </p>
        <p class>Total No. of Items</p>
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
        <img
          class="
            p-3
            inline-flex
            rounded-full
            opacity-100
            bg-cloudenly-danger-off
            h-16
            w-16
          "
          src="../../../assets/images/optimaAsset/pdt item svg.svg"
          alt
          srcset
        />
      </div>

      <div>
        <p class="font-semibold text-xl">
          {{ getCatalogAnalysisData.totalNumberOfPurchaseProduct }}
        </p>
        <p class>No. of Product Items</p>
      </div>
    </div>

    <div class="flex items-center w-full mx-5 border-none">
      <div class="mr-10">
        <img
          class="
            p-3
            inline-flex
            rounded-full
            bg-cloudenly-success-off
            h-16
            w-16
          "
          src="../../../assets/images/optimaAsset/service item svg.svg"
          alt
          srcset
        />
      </div>

      <div>
        <p class="font-semibold text-xl">
          {{ getCatalogAnalysisData.totalNumberOfPurchaseService }}
        </p>
        <p class>No. of Service Items</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from "./analysisData";

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
    ...mapGetters("catalogue", ["getCatalogAnalysisData"]),
  },
  mounted() {
    this.$store.dispatch("catalogue/getCatalogueAnalyticsData");
  },
};
</script>