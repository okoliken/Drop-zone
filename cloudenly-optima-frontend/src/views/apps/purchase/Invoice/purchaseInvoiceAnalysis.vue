<template>
  <div>
    <div class="font-normal text-dark-optima-color">
     

      <div class="grid grid-cols-12 col-gap-8">
        <div
          class="col-span-4 bg-white flex items-center justify-between px-6 py-10 rounded"
        >
          <div>
            <img :src="totalQuotes" alt="global network" class="h-10 w-10" />
          </div>

          <div>
            <h3 class="mb-2 text-right font-semibold" style="font-size: 16px;">
              {{ getReceivedInvoiceAnalytics.total }}
            </h3>
            <div style="font-size: 14px;">
              Total Purchase Invoices
            </div>
          </div>
        </div>

        <div
          class="col-span-4 bg-white flex items-center justify-between px-6 py-10 rounded"
        >
          <div>
            <img :src="unpaidInvoice" alt="quote" class="h-10 w-10" />
          </div>

          <div>
            <h3 class="mb-2 font-semibold text-right" style="font-size: 16px;">
              {{ getReceivedInvoiceAnalytics.totalPending }}
            </h3>
            <div class="text-lg text-right" style="font-size: 14px;">
              Total Pending Invoices
            </div>
          </div>
        </div>

        <div
          class="col-span-4 bg-white flex items-center justify-between px-6 py-10 rounded"
        >
          <div>
            <img :src="approvedQuote" alt="approved quotes" class="h-10 w-10" />
          </div>

          <div>
            <h3 class="mb-2 text-right font-semibold" style="font-size: 16px;">
              {{ getReceivedInvoiceAnalytics.totalExecuted }}
            </h3>
            <div class="text-lg text-right" style="font-size: 14px;">
              Total Executed
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StaticCard from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./purchaseInvoiceData";

import totalQuotes from "@/assets/images/optimaAsset/icon_total_quote.svg";
import unpaidInvoice from "@/assets/images/optimaAsset/icon_unpaid_invoice.svg";
import approvedQuote from "@/assets/images/optimaAsset/icon_approved_quote_value.svg";

export default {
  data() {
    return {
      analyticsData: analyticsData,
      totalQuotes,
      unpaidInvoice,
      approvedQuote,
    };
  },
  components: {
    StaticCard,
  },

  computed: {
    ...mapGetters("purchase/Invoice", ["getReceivedInvoiceAnalytics"]),
  },

  mounted() {
    this.$store.dispatch("purchase/Invoice/getAllReceivedInvoiceAnalytics");
  },
};
</script>
