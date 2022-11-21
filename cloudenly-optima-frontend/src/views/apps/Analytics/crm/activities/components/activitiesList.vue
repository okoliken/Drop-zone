<template>
  <section class="grid grid-cols-4 col-gap-3">
    <!-- messaging -->
    <div
      class="col-span-1 shadow p-6 bg-secondary-optima-color rounded text-white"
      style="font-size: 12px;"
    >
      <h2 class="font-semibold text-white mb-2" style="font-size: 16px;">
        Messaging
      </h2>

      <div class="font-semibold flex justify-end mb-4" style="font-size: 36px;">
        <div>145</div>
      </div>

      <div class="mb-3 text-right">Tickets: 25 | Announcements: 13</div>

      <div class="text-right mb-2">Events: 4 | Groups: 10</div>

      <feather-icon
        icon="AlertCircleIcon"
        svgClasses="h-6 w-6 cursor-pointer"
      />
    </div>

    <!-- leads -->
    <div
      class="col-span-1 shadow p-6 rounded text-white"
      style="background-color: #F2994A; font-size: 12px;"
    >
      <h2 class="font-semibold text-white mb-2" style="font-size: 16px;">
        Leads
      </h2>

      <div class="font-semibold flex justify-end mb-4" style="font-size: 36px;">
        <div>300</div>
      </div>

      <div class="mb-3 text-right">
        New: <span class="font-semibold">50</span> | Qualified:
        <span class="font-semibold">{{ getAllCrmActivityCount.leads.qualifiedCount }}</span>
      </div>

      <div class="text-right mb-2">
        Unqualified: <span class="font-semibold">{{getAllCrmActivityCount.leads.unqualifiedCount}}</span> | Converted:
        <span class="font-semibold">{{getAllCrmActivityCount.leads.convertedCount}}</span>
      </div>

      <feather-icon
        icon="AlertCircleIcon"
        svgClasses="h-6 w-6 cursor-pointer"
      />
    </div>

    <!-- promotions -->
    <div
      class="col-span-1 shadow p-6 bg-tetiary-optima-color rounded text-white"
      style="font-size: 12px;"
    >
      <h2 class="font-semibold text-white mb-2" style="font-size: 16px;">
        Promotions
      </h2>

      <div class="font-semibold flex justify-end mb-4" style="font-size: 36px;">
        <div>{{getAllCrmActivityCount.promotions.promoCount}}</div>
      </div>

      <div class="mb-3 text-right">
        New: <span class="font-semibold">{{getAllCrmActivityCount.promotions.newPromoCount}}</span> | Active:
        <span class="font-semibold">{{getAllCrmActivityCount.promotions.activePromoCount}}</span>
      </div>

      <div class="text-right mb-2">
        Inactive: <span class="font-semibold">{{getAllCrmActivityCount.promotions.inactivePromoCount}}</span> | Draft:
        <span class="font-semibold">{{getAllCrmActivityCount.promotions.draftPromoCount}}</span>
      </div>

      <feather-icon
        icon="AlertCircleIcon"
        svgClasses="h-6 w-6 cursor-pointer"
      />
    </div>

    <!-- others -->
    <div
      class="col-span-1 shadow p-6 rounded"
      style="font-size: 12px; background: #F2F2F2;"
    >
      <h2 class="font-semibold mb-2" style="font-size: 16px;">
        Others
      </h2>

      <div class="font-semibold flex justify-end mb-4" style="font-size: 36px;">
        <div>201</div>
      </div>

      <div class="mb-3 text-right">
        Pending Transactions: <span class="font-semibold">{{getAllCrmActivityCount.others.pendingTransactionsCount.totalPendingTransactionsCount}}</span> | Invoices:
        <span class="font-semibold">{{getAllCrmActivityCount.others.invoiceCount.totalInvoiceCount}}</span>
      </div>

      <div class="text-right mb-2">
        Quotes: <span class="font-semibold">{{getAllCrmActivityCount.others.quotesCount.totalQuotesCount}}</span> | Discounts:
        <span class="font-semibold">{{getAllCrmActivityCount.others.discountCount.totalDiscountsCount}}</span>
      </div>

      <feather-icon
        icon="AlertCircleIcon"
        svgClasses="h-6 w-6 cursor-pointer"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   computed:{
      ...mapGetters("analytics", ["getAllCrmActivityCount", "getAllCrmActivityTotalPendingTransactionCount"]),
  },
  mounted() {
    this.$store.dispatch("analytics/getAllCrmActivityCount","analytics/getAllCrmActivityTotalPendingTransactionCount" )},
    // this.$store.dispatch("analytics/getAllCrmActivityTotalPendingTransactionCount")}
};

</script>

<style>
.shadow {
  box-shadow: 0px 4px 10px rgba(17, 21, 25, 0.1);
}
</style>
