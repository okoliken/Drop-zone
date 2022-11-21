<template>
    <div class="bg-white px-8 py-8">

        <div class="text-gray-800">
            <span class="text-black text-xl font-bold mr-4">
                {{ title }}
            </span>
        </div>

        <div class="flex items-center justify-between rounded-md bg-white py-3">

            <div class="w-full border-r-2 border-gray-400">

                <div id="chart">
                    <apexchart type="bar" height="350" max-width="200" :options="chartOptions" :series="chartArray">
                    </apexchart>
                </div>

            </div>

            <div class="w-full px-8">

                <table class="w-full my-4 ">

                    <thead>
                        <tr class="text-gray-600">
                            <th class="w-1/3">Months</th>
                            <th class="w-1/3">{{ tableColumnTitle1 }}</th>
                            <th class="w-1/3">{{ tableColumnTitle2 }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="odd:bg-gray-200 h-10" v-for="(item, i) in tableArray" :key="i">
                            <td class="pl-2">
                                <span>{{ item.monthName }}</span>
                                -
                                <span v-if="item.year">{{ item.year.toString().substring(2) }}</span>
                            </td>
                            <td class="pl-2">
                                <span v-if="item.product >= 0">{{ item.product }}</span>
                                <span v-if="item.product == null">--</span>
                            </td>
                            <td class="pl-2">
                                <span v-if="item.service >= 0">{{ item.service }}</span>
                                <span v-if="item.service == null">--</span>
                            </td>
                        </tr>

                        <tr class="odd:bg-gray-200 h-10 ">
                            <td class="pl-2">Total</td>
                            <td class="pl-2">{{ total1 }}</td>
                            <td class="pl-2">{{ total2 }}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
import analyticsData from "./analysisData";
import apexchart from "vue-apexcharts";

export default {
    props: {
        title: String,
        tableArray: Array,
        chartArray: Array,
        tableColumnTitle1: String,
        tableColumnTitle2: String,
        total1: Number,
        total2: Number,

        chartOptions: {},
    },
    data() {
        return {
            analyticsData: analyticsData,
        };
    },
    components: {
        StatisticsCardLine,
        apexchart
    },

    computed: {
        ...mapGetters("catalogue/productItem", ["getItemAnalysisData"]),
    },

    mounted() {
        this.$store.dispatch(
            "catalogue/productItem/getItemAnalysisData"
        );
    },
};
</script>