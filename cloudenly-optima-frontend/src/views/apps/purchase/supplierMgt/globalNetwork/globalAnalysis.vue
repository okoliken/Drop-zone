<template>
  <div class="bg-white px-6 pt-8 pb-10 font-normal">
    <h2 class="mb-10 font-semibold" style="font-size: 15px">Global Network</h2>

    <div class="grid grid-cols-12">
      <div class="col-span-4 flex justify-start items-center pl-10">
        <div class="mr-6">
          <img
            :src="purchaseGlobalNetworkGlobe"
            alt="global network"
            class="h-10 w-10"
          />
        </div>
        <div class="flex flex-col-reverse items-start">
          <h3 class="mb-2" style="font-size: 15px">Number of Global Network</h3>
          <div class="text-lg py-2 text-right font-semibold" style="font-size: 18px">
            {{ data.total || "Loading..." }}
          </div>
        </div>
      </div>

      <div
        class="col-span-4 flex items-center pl-10"
        style="border-left: 1px solid #eee"
      >
        <div class="mr-6">
          <img
            :src="organisationSector"
            alt="global network"
            class="h-10 w-10"
          />
        </div>
        <div class="flex flex-col-reverse items-start">
          <h3 class="mb-2" style="font-size: 15px">
           Number of Supplier Sectors
          </h3>
          <div class="text-lg py-2 font-semibold text-right" style="font-size: 18px">
            6
          </div>
        </div>
      </div>

      <div
        class="col-span-4 flex items-center pl-10"
        style="border-left: 1px solid #eee"
      >
        <div class="mr-6">
          <img :src="specialize" alt="global network" class="h-10 w-10" />
        </div>
        <div class="flex flex-col-reverse items-start">
          <h3 class="mb-2" style="font-size: 15px">
            Specializations
          </h3>
          <div class="text-lg py-2 font-semibold text-right" style="font-size: 18px">
            3
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./globalNetworkData";

import purchaseGlobalNetworkGlobe from "@/assets/images/optimaAsset/purchase-global-network-globe.svg";
import organisationSector from "@/assets/images/optimaAsset/icon-organization-sector.svg";
import specialize from "@/assets/images/optimaAsset/icon_specialize.svg";

export default {
  props: ["data"],
  data() {
    return {
      analyticsData: analyticsData,
      purchaseGlobalNetworkGlobe,
      organisationSector,
      specialize,
    };
  },
  components: {
    StatisticsCardLine,
  },
};
</script>
