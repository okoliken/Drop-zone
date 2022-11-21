<template>

<div>
    <div class="grid grid-cols-12 col-gap-8">
      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="totalQuotes" alt="global network" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          <div style="font-size: 14px;">
            Total No. of Quotes
          </div>
          <h3 class="mb-2  font-semibold" style="font-size: 16px;">
            {{ getQuotationReceivedAnalysis.total}}
          </h3>
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="approvedQuote" alt="approved quotes" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          
          <div class="text-lg text-right" style="font-size: 14px;">
            Total Quote Executed
          </div>
          <h3 class="mb-2 font-semibold flex" style="font-size: 16px;">
            {{ getQuotationReceivedAnalysis.totalExecuted}}
          </h3>
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="quote" alt="quote" class="h-10 w-10" />
        </div>

        <div class="flex flex-col-reverse">
          <div class="text-lg text-right" style="font-size: 14px;">
            Total Pending Processing
          </div>
          <h3 class="mb-2 font-semibold" style="font-size: 16px;">
            {{ getQuotationReceivedAnalysis.totalPending}}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./purchaseProformaData";

import totalQuotes from "@/assets/images/optimaAsset/icon_total_quote.svg";
import quote from "@/assets/images/optimaAsset/icon_quote_value.svg";
import approvedQuote from "@/assets/images/optimaAsset/icon_approved_quote_value.svg";

export default {
  data() {
    return {
      analyticsData: analyticsData,
      totalQuotes,
      quote,
      approvedQuote,
    };
  },
  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("purchase/Quotation", ["getQuotationReceivedAnalysis"]),
  },

  mounted() {
    this.$store.dispatch("purchase/Quotation/getQuotationReceivedAnalysis");
  },
};
</script>
