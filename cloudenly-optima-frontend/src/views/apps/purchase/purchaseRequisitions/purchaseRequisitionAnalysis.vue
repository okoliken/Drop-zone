<template>
  <div class="font-normal text-dark-optima-color" style="font-size: 14px">
    <div class="grid grid-cols-12 col-gap-8">
      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-start
          px-12
          py-10
          rounded
        "
      >
        <div>
          <img :src="prTotal" alt="global network" class="h-10 w-10 mr-5" />
        </div>

        <div>
          <h3 class="mb-3 text-left font-semibold">
            {{ getRequisitionAnalysis.total }}
          </h3>

          <div style="font-size: 14px">Total Requisitions</div>
        </div>
      </div>

      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-start
          px-12
          py-10
          rounded
        "
      >
        <div>
          <img :src="purchases" alt="quote" class="mr-5 h-10 w-10" />
        </div>

        <div>
          <h3 class="mb-3 font-semibold text-left">
            {{ getRequisitionAnalysis.totalPending }}
          </h3>

          <div class="text-lg text-right">Pending Requisitions</div>
        </div>
      </div>

      <div
        class="
          col-span-4
          bg-white
          flex
          items-center
          justify-start
          px-12
          py-10
          rounded
        "
      >
        <div>
          <img :src="prApproved" alt="approved quotes" class="mr-5 h-10 w-10" />
        </div>

        <div>
          <h3 class="mb-3 text-left font-semibold">
            {{ getRequisitionAnalysis.totalClosed }}
          </h3>

          <div class="text-lg text-right" style="font-size: 14px">
            Approved Requisitions
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import purchases from "@/assets/images/optimaAsset/icon_purchases.svg";
import prApproved from "@/assets/images/optimaAsset/icon_pr_approved.svg";
import prTotal from "@/assets/images/optimaAsset/icon_pr_total.svg";

export default {
  data() {
    return {
      purchases,
      prApproved,
      prTotal,
    };
  },
  components: {},

  computed: {
    ...mapGetters("purchase/Requisition", ["getRequisitionAnalysis"]),
  },

  mounted() {
    this.$store.dispatch("purchase/Requisition/getRequisitionAnalysisData");
  },
};
</script>
