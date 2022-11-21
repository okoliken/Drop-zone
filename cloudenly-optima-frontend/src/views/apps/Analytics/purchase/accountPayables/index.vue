<template>
  <div class="grid grid-cols-12">
    <data-filter class="col-span-12 mb-3" />

    <div
      class="bg-white col-span-12 grid grid-cols-12 px-6 pt-6 rounded rounded-b-none"
      style="height: 400px;"
    >
      <div class="col-span-6 flex flex-col justify-between pr-6">
        <div class="flex items-center justify-between">
          <h2 class="font-bold">Account Payables</h2>

          <div class="flex items-center">
            <s-select :width="150" :height="27" defaultOption="Lekki Outlet" />
            <s-select
              :width="120"
              :height="27"
              default-option="Top 3"
              class="ml-6"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="w-5/12">
             <apexcharts
                type="donut"
                width="400"
                :options="chartOption"
                :series="serie"
              />
          </div>

          <div class="w-7/12 flex flex-col justify-center pl-8 font-normal">
            <div
              class="flex items-center"
              :class="{ 'mb-8': i !== 3 }"
              v-for="(item, i) in accountPayables"
              :key="i"
            >
              <div
                class="rounded-full mr-5"
                style="height: 8px; width: 8px;"
                :style="`background-color: ${item.color}`"
              ></div>
              {{ item.text }}: ₦{{ item.amount }}

              <span class="font-bold ml-2"> {{ item.percentage }}%</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end font-normal">
          <div>
            <div class="mb-2">Total Payables :</div>
            <div class="font-bold" style="font-size: 24px;">0.00</div>
          </div>
        </div>
      </div>

      <div
        class="col-span-6 flex flex-col justify-between pl-10"
        style="border-left: 1px solid #eee;"
      >
        <h2 class="mb-10 text-secondary-optima-color">Nearest Due Payables</h2>

        <table class="w-full font-normal">
          <thead style="padding: 0;">
            <tr style="border-bottom: 2px solid #eee; height: 32px;">
              <th style="padding: 0; width: 8%;">#</th>
              <th class="font-normal" style="padding: 0; font-size: 12px;">
                Debtors
              </th>
              <th class="font-normal" style="padding: 0; font-size: 12px;">
                Due Date
              </th>
              <th class="font-normal" style="padding: 0; font-size: 12px;">
                Amount Due (₦)
              </th>
            </tr>
          </thead>

          <tbody>
            <tr style="height: 50px;">
              <td>1.</td>
              <td>123 Company</td>
              <td>12/04/2020</td>
              <td>3400</td>
            </tr>

            <tr style="height: 50px;">
              <td>2.</td>
              <td>49ner Suppliers</td>
              <td>11/04/2020</td>
              <td>3400</td>
            </tr>

            <tr style="height: 50px;">
              <td>3.</td>
              <td>Titokker Goods</td>
              <td>10/04/2020</td>
              <td>2345</td>
            </tr>
          </tbody>
        </table>

        <div class="font-normal">
          <s-content-seperator class="mb-8" />

          <div class="mb-2">Total Balance Due:</div>
          <div class="font-bold" style="font-size: 24px;">0.00</div>
        </div>
      </div>

      <!-- <s-content-seperator /> -->
      <div
        class="col-span-12 w-full"
        style="border-bottom: 2px solid #eee;"
      ></div>
    </div>

    <payables-donut-charts class="col-span-12" />

    <div class="col-span-12 mt-3">
      <payables-breakdown />

      <s-table :headers="headers" :items="items" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import apexcharts from "vue-apexcharts";
import numberOfSuppliers from "./numberOfSuppliers";
import DataFilter from "../../components/dataFilter.vue";
import PayablesBreakdown from "./components/payablesBreakdown.vue";
import PayablesDonutCharts from "./components/payablesDonutCharts.vue";

export default {
  name: "AnalyticsPurchasesAccountPayables",
  components: {
    apexcharts ,
    DataFilter,
    PayablesBreakdown,
    PayablesDonutCharts,
  },
  data() {
    return {
      numberOfSuppliers,
      headers: [
        { text: "Invoice Number", value: "invoiceNumber" },
        { text: "Supplier", value: "supplier" },
        { text: "Payment Terms", value: "paymentTerms" },
        { text: "Total Amount", value: "total" },
        { text: "Next Due Date", value: "dueDate" },
        { text: "Balance Due", value: "balance" },
        { text: "Days Overdue", value: "overdue" },
      ],
      items: [
        
      ],
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true
              }
            }
          }
        }
      },
      labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
    };
  },
    computed:{
      ...mapGetters("analytics", ["getAllPurchaseAccountPayableCount"]),
      chartOption(){
        if(this.getAllPurchaseAccountPayableCount.nearestDuePayablesData === undefined || this.getAllPurchaseAccountPayableCount.nearestDuePayablesData.length === 0){
          return{
              chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      noData: {
            text: "No Data..."
          },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true
              }
            }
          }
        }
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
          }
        } else{
          let data = this.getAllPurchaseAccountPayableCount.nearestDuePayablesData
          return{
              chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true
              }
            }
          }
        }
      },
      noData: {
            text: "No Data..."
          },
      labels: data,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
          }
        }
      },
    serie(){
      if(this.getAllPurchaseAccountPayableCount.nearestDuePayablesData === undefined || this.getAllPurchaseAccountPayableCount.nearestDuePayablesData.length === 0){
        return[]
      }else{
        let data = this.getAllPurchaseAccountPayableCount.nearestDuePayablesData 
        return data
      }
    }
  },
  mounted() {
    this.$store.dispatch("analytics/getAllPurchaseAccountPayableCount")}
};
</script>

<style></style>
