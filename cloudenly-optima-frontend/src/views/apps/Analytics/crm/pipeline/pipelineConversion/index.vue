<template>
  <div class="bg-white pt-6 px-6 rounded">
    <div class="flex mb-10">
      <div>
        <h2 class="font-semibold mb-2">Pipeline Conversion</h2>

        <div style="font-size: 13px">Leads, Opportunity & Sales</div>
      </div>

      <s-select :height="27" class="ml-8" />

      <s-select :height="27" class="ml-3" />
    </div>

    <section class="flex items-center">
      <div class="w-7/12">
        <!-- still useful -->
        <!-- <div class="flex mb-12">
          <div>
            <div class="mb-4" style="font-size: 13px;">Total Leads</div>

            <div
              class="text-primary-optima-color font-semibold"
              style="font-size: 16px;"
            >
              235
            </div>
          </div>

          <div class="ml-12">
            <div class="mb-4" style="font-size: 13px;">
              Registered Internally
            </div>

            <div
              class="text-secondary-optima-color font-semibold"
              style="font-size: 16px;"
            >
              145
            </div>
          </div>

          <div class="ml-12">
            <div class="mb-4" style="font-size: 13px;">
              Registered By Partners
            </div>

            <div class="font-semibold" style="font-size: 16px; color: #F2994A;">
              90
            </div>
          </div>
        </div> -->
        <!-- <funnel /> -->

        <div id="vue-container">
          <div id="chartContainer" style="height: 200px; width: 60%"></div>
        </div>
      </div>

      <div
        class="flex items-center w-5/12 pl-6"
        style="border-left: 1px solid #ccc"
      >
        <div class="w-full grid grid-cols-2">
          <div
            class="col-span-1 h-32 flex items-center justify-center"
            style="border-right: 1px solid #ccc; border-bottom: 1px solid #ccc"
          >
            <span class="font-semibold">Pipeline Activity</span>
            <!-- <div>{{getAllCrmPipelineCount.pipelineLeadsCount}}</div> -->
          </div>

          <div
            class="col-span-1 flex items-center justify-center h-32"
            style="border-bottom: 1px solid #ccc"
          >
            <div class="mr-6">
              <img :src="image_leads" alt="leads" />
            </div>

            <div>
              <div class="mb-2">Leads</div>
              <div class="font-semibold text-right">
                {{ getAllCrmPipelineCount.pipelineLeadsCount }}
              </div>
            </div>
          </div>
          <div
            class="col-span-1 flex items-center justify-center h-32"
            style="border-right: 1px solid #ccc"
          >
            <div class="mr-6">
              <img :src="image_opportunity" alt="opportunities" />
            </div>

            <div>
              <div class="mb-2">Opportunities</div>
              <div class="font-semibold text-right">
                {{ getAllCrmPipelineCount.opportunitiesCount }}
              </div>
            </div>
          </div>

          <div class="col-span-1 flex items-center justify-center h-32">
            <div class="mr-6">
              <img :src="image_sales" alt="sales" />
            </div>

            <div>
              <div class="mb-2">Sales</div>
              <div class="font-semibold text-right">
                {{ getAllCrmPipelineCount.salesCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <conversion-ratio />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import funnel from "../svgFolder/funnel.vue";
import conversionRatio from "./components/conversionRatio";

import image_leads from "@/assets/images/optimaAsset/analytics/sales/pipeline/leads.svg";
import image_opportunity from "@/assets/images/optimaAsset/analytics/sales/pipeline/opportunity.svg";
import image_sales from "@/assets/images/optimaAsset/analytics/sales/pipeline/sales.svg";

var CanvasJS = require("../../../../../../../src/canvasjs.min.js");
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: "",
  components: { funnel, conversionRatio },
  data() {
    return {
      image_leads,
      image_opportunity,
      image_sales,
      chart: null,
    };
  },
  methods: {},
  computed: {
    ...mapGetters("analytics", ["getAllCrmPipelineCount"]),
    analytics() {
      return this.getAllCrmPipelineCount;
    },
  },

  mounted() {
    this.$store.dispatch("analytics/getPipelineCount").then((resp) => {
      this.chartOptions = {
        title: {
          text: "Sales Funnel",
        },
        data: [
          {
            type: "funnel",
            dataPoints: [
              { y: resp.data.pipelineLeadsCount, label: "Leads Count" },
              { y: resp.data.opportunitiesCount, label: "Opportunity Count" },
              { y: resp.data.salesCount, label: "Sales Count" },
            ],
          },
        ],
      };

      this.chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
      this.chart.render();
    });
  },
};
</script>

<style></style>
