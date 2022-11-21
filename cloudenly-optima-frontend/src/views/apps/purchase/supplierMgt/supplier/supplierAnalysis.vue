<template>
  <div class="bg-white px-6 pt-8 pb-10 font-normal">
    <h2 class="mb-10 font-semibold" style="font-size: 15px">My Suppliers</h2>

    <div class="grid grid-cols-12">
      <div class="col-span-4 flex items-center pl-10">
        <div class="mr-10">
          <img :src="suppliers" alt="global network" class="h-10 w-10" />
        </div>
        <div>
          <h3 class="mb-2" style="font-size: 15px">Suppliers</h3>
          <div class="text-lg text-right font-semibold" style="font-size: 18px">
            {{ getContactAnalyticData.supplier.totalSuppliers }}
          </div>
        </div>
      </div>

      <div
        class="col-span-4 flex items-center pl-10"
        style="border-left: 1px solid #eee"
      >
        <div class="mr-10">
          <img
            :src="organisationSector"
            alt="global network"
            class="h-10 w-10"
          />
        </div>
        <div>
          <h3 class="mb-2" style="font-size: 15px">
            Sectors
          </h3>
          <div class="text-lg font-semibold text-right" style="font-size: 18px">
            {{ getContactAnalyticData.supplier.totalIndustrySector }}
          </div>
        </div>
      </div>

      <div
        class="col-span-4 flex items-center pl-10"
        style="border-left: 1px solid #eee"
      >
        <div class="mr-10">
          <img :src="specialize" alt="global network" class="h-10 w-10" />
        </div>
        <div>
          <h3 class="mb-2" style="font-size: 15px">
            Specializations
          </h3>
          <div class="text-lg font-semibold text-right" style="font-size: 18px">
            {{ getContactAnalyticData.supplier.totalSpecialization }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./supplierData";
import suppliers from "@/assets/images/optimaAsset/icon_suppliers.svg";
import organisationSector from "@/assets/images/optimaAsset/icon-organization-sector.svg";
import specialize from "@/assets/images/optimaAsset/icon_specialize.svg";

export default {
  data() {
    return {
      analyticsData: analyticsData,
      suppliers,
      organisationSector,
      specialize,
    };
  },
  components: {
    StatisticsCardLine,
  },

  computed: {
    ...mapGetters("crm/contact", ["getContactAnalyticData"]),
  },

  mounted() {
    this.$store.dispatch("crm/contact/getContactAnalyticsData");
  },
};
</script>
