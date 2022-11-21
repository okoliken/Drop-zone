<template>
  <div class="bg-white p-6 rounded">
    <div class="flex mb-10">
      <div>
        <h2 class="font-semibold mb-2">Number of Leads</h2>

        <div style="font-size: 13px">Leads By Industry</div>
      </div>

      <s-select :height="27" class="ml-8" />

      <s-select :height="27" class="ml-3" />
    </div>

    <section class="flex">
      <div class="w-7/12 pr-16">
        <div class="flex items-center justify-between mb-12">
          <div>
            <pie-chart />
          </div>

          <div>
            <div
              class="flex items-center"
              :class="{ 'mb-10': i !== leadIndustryChart.length - 1 }"
              v-for="(item, i) in leadIndustryChart"
              :key="i"
            >
              <div
                class="h-2 w-2 rounded-full mr-3"
                :style="`background: ${item.color}`"
              ></div>

              <span
                >{{ item.name }} - {{ item.percentage }}%,
                {{ item.value }} </span
              >
            </div>
          </div>
        </div>

        <div class="flex">
          <div>
            <div class="mb-4" style="font-size: 13px">Total Industries</div>

            <div
              class="text-primary-optima-color font-semibold"
              style="font-size: 16px"
            >
              {{analytics.leadsCountByIndustry}}
            </div>
          </div>

          <div class="ml-12">
            <div class="mb-4" style="font-size: 13px">Highest Lead Count</div>

            <div class="flex items-center">
              <span
                class="text-secondary-optima-color font-semibold"
                style="font-size: 16px"
              >
               {{analytics.minMaxLeadCountByIndustry.industryWithHighestLeadCount.count}}
              </span>

              <span class="ml-2">from {{analytics.minMaxLeadCountByIndustry.industryWithHighestLeadCount.industrySector}}</span>
            </div>
          </div>

          <div class="ml-12">
            <div class="mb-4" style="font-size: 13px">Lowest Lead Count</div>

            <div class="flex items-center">
              <span
                class="font-semibold"
                style="font-size: 16px; color: #bb6bd9"
              >
                {{analytics.minMaxLeadCountByIndustry.industryWithLowestLeadCount.count}}
              </span>

              <span class="ml-2">from {{analytics.minMaxLeadCountByIndustry.industryWithLowestLeadCount.industrySector}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-5/12 pl-10" style="border-left: 1px solid #ccc">
        <div
          class="flex justify-between px-3 py-3 mb-3 font-medium"
          style="border-bottom: 1px solid #eee; font-size: 13px"
        >
          <span>Industry</span>

          <span>Leads</span>
        </div>

        <div
          class="flex justify-between px-3 py-2 rounded mx-3 mb-3"
          style="background: #eee"
          v-for="(industry, i) in industriesCount"
          :key="i"
        >
          <span>{{ industry.industrySector}}</span>

          <span class="font-medium">{{industry.count }}</span>
        </div>

        <div
          class="flex justify-end items-center px-3 pt-5 font-medium mt-8"
          style="border-top: 1px solid #eee; font-size: 13px"
        >
          <!-- <s-button :height="30" class="bg-primary-optima-color text-white px-5"
            >View All</s-button
          > -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import pieChart from "./svgFolder/pieChart.vue";

export default {
  name: "",
  components: { pieChart },
  data() {
    return {
     
    };
  },
  computed :{
    ...mapGetters('analytics', ["getAllCrmLeadCount"]),
    analytics(){
        return this.getAllCrmLeadCount;
      },
        industriesCount(){
        return this.getAllCrmLeadCount.leadsAndCountByIndustry
      }
  },
  mounted() {
    this.$store.dispatch("analytics/getAllCrmLeadCount")}
};

</script>

<style></style>
