<template>
  <div class="font-normal text-dark-optima-color" style="font-size: 14px">
   

    <div class="grid grid-cols-12 col-gap-8">
      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="totalQuotes" alt="global network" class="h-10 w-10" />
        </div>

        <div class="flex flex-col">
          <h3 class="mb-3 font-semibold">
            {{ getPurchaseOrderData.total }}
          </h3>

          <div>Total Purchase Order</div> 
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 px-6 py-12 rounded"
      >
        <div>
          <img :src="unpaidInvoice" alt="quote" class="h-10 w-10" />
        </div>

        <div class="flex flex-col">
          <h3 class="mb-3 font-semibold">
            {{ getPurchaseOrderData.totalPending }}
          </h3>

          <div class="text-lg text-right">Total Pending POs</div>
        </div>
      </div>

      <div
        class="col-span-4 bg-white flex items-center space-x-4 n px-6 py-12 rounded"
      >
        <div>
          <img :src="approvedQuote" alt="approved quotes" class="h-10 w-10" />
        </div>

        <div class="flex flex-col">
          <h3 class="mb-3 font-semibold">
            {{ getPurchaseOrderData.totalClosed }}
          </h3>

          <div class="text-lg text-right">Total Approved POs</div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; 
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./purchaseOrderData";

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
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("purchase/PurchaseOrder", ["getPurchaseOrderData"]),
  },

  mounted() {
    this.$store.dispatch("purchase/PurchaseOrder/getPurchaseOrderAnalysisData");
  },
};
</script>
