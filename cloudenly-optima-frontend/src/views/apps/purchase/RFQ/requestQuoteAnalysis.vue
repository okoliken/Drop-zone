<template>
  <div class="font-normal">
    <div class="grid grid-cols-12 col-gap-8">
      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-between
          px-6
          py-10
          rounded
        "
      >
        <div>
          <img :src="totalQuotes" alt="global network" class="h-10 w-10" />
        </div>

        <div>
          <h3 class="mb-3 text-right font-semibold">
            {{ getRequestQuoteAnalysis.total }}
          </h3>

          <div>Total RFQ</div>
        </div>
      </div>

      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-between
          px-6
          py-10
          rounded
        "
      >
        <div>
          <img :src="pendingRfq" alt="quote" class="h-10 w-10" />
        </div>

        <div>
          <h3 class="mb-3 font-semibold text-right">
            {{ getRequestQuoteAnalysis.totalPending }}
          </h3>

          <div class="text-lg text-right">Pending RFQs</div>
        </div>
      </div>

      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-between
          px-6
          py-10
          rounded
        "
      >
        <div>
          <img :src="approvedQuote" alt="approved quotes" class="h-10 w-10" />
        </div>

        <div>
          <h3 class="mb-3 text-right font-semibold">
            {{ getRequestQuoteAnalysis.totalClosed }}
          </h3>

          <div class="text-lg text-right">Closed RFQs</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";

import totalQuotes from "@/assets/images/optimaAsset/icon_total_quote.svg";
import pendingRfq from "@/assets/images/optimaAsset/icon_pending_rfqs.svg";
import approvedQuote from "@/assets/images/optimaAsset/icon_approved_quote_value.svg";

export default {
  data() {
    return {
      totalQuotes,
      pendingRfq,
      approvedQuote,
    };
  },
  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("purchase/RequestQuote", ["getRequestQuoteAnalysis"]),
  },

  mounted() {
    this.$store.dispatch("purchase/RequestQuote/getRequestuoteAnalysisData");
  },
};
</script>
