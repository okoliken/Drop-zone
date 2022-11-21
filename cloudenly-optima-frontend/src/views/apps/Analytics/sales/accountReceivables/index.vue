<template>
  <div class="grid grid-cols-12">
    <data-filter class="col-span-12 mb-3" />

    <div
      class="bg-white col-span-12 grid grid-cols-12 px-6 pt-6  rounded rounded-b-none"
      style="height: 400px;"
    >
      <div class="col-span-6 flex flex-col justify-between pr-6">
        <div class="flex items-center justify-between">
          <h2 class="font-bold">Account Payables</h2>

          <div class="flex items-center">
            <s-select :width="150" :height="27" defaultOption="Due in 7 Days" />
            <s-select
              :width="120"
              :height="27"
              default-option="Top 3"
              class="ml-6"
            />
          </div>
        </div>

        <div class="flex">
          <div class="w-5/12">
            <div id="chart" >
              <apexchart
                type="donut"
                width="450"
                :options="chartOption"
                :series="serie"
              ></apexchart>
            </div>
          </div>
        </div>
        <div class="flex justify-end font-normal">
          <div>
            <div class="mb-2">Total Account Payables Volume:</div>
            <div class="font-bold" style="font-size: 24px;">
              {{ getAccountReceiveable.totalReceivables | currency }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-span-6 flex flex-col justify-between pl-10"
        style="border-left: 1px solid #eee;"
      >
     
        <h2 class=" text-secondary-optima-color">Nearest Due Payables</h2>
<!-- {{ nearestPayable }} -->
        <table class="w-full font-normal">
          <thead style="padding: 0;">
            <tr style="border-bottom: 2px solid #eee; height: 32px;">
              <!-- <th style="padding: 0; width: 8%;">#</th> -->
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
            <tr style="height: 50px;" v-for="account in nearestPayable" :key="account.id">
              <td> {{ account.customerName.name }} </td>
              <td>{{account.validityDate | date}}</td>
              <td>{{account.amountDue | currency}}</td>
            </tr>
          </tbody>
        </table>

        <div class="font-normal">
          <s-content-seperator class="mb-8" />

          <!-- <div class="mb-2">Total Balance Due:</div>
          <div class="font-bold" style="font-size: 24px;">{{ getSalesAccountReceivable.amountDue }}</div> -->
        </div>
      </div>

      <!-- <s-content-seperator /> -->
      <div
        class="col-span-12 w-full"
        style="border-bottom: 2px solid #eee;"
      ></div>
    </div>

    <payables-donut-charts class="col-span-12 py-2" />

    <div class="col-span-12 mt-3">
      <payables-breakdown />

      <s-table :headers="headers" :items="breakdown">
        
      </s-table>
    </div>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import numberOfSuppliers from "./numberOfSuppliers";
import DataFilter from "../../components/dataFilter.vue";
import PayablesBreakdown from "./components/payablesBreakdown.vue";
import PayablesDonutCharts from "./components/payablesDonutCharts.vue";
import { mapGetters } from "vuex";

export default {
  name: "AnalyticsPurchasesAccountPayables",
  components: {
    apexchart,

    DataFilter,
    PayablesBreakdown,
    PayablesDonutCharts
  },
  data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          // width: 380,
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
      },
      numberOfSuppliers,
      headers: [
        { text: "Invoice Number", value: "invoiceNumber" },
        { text: "Supplier", value: "name" },
        { text: "Payment Terms", value: "paymentTerms" },
        { text: "Total Amount", value: "total" },
        { text: "Next Due Date", value: "dueDate" },
        { text: "Balance Due", value: "balance" },
        { text: "Days Overdue", value: "overdue" }
      ]
      
    };
  },
  computed: {
    ...mapGetters("analytics", [
      "getAccountReceiveable",
      "getNearestAccountReceivable",
      "getAccountReceivableSummary",
      "getSalesAccountReceivable"
    ]),
    serie() {
      if (this.getAccountReceiveable.accountReceivablesSummary === undefined) {
        return [];
      } else {
        let data = this.getAccountReceiveable.accountReceivablesSummary.map(
          resp => {
            return resp.amountTotal;
          }
        );
        console.log(data);
        return data;
      }
    },
    chartOption() {
      if (this.getAccountReceiveable.accountReceivablesSummary === undefined) {
        return {
          chart: {
            width: 400,
            type: "donut"
          },
          // stroke: {
          //   width: 0
          // },
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
        };
      } else {
        let data = this.getAccountReceiveable.accountReceivablesSummary.map(
          resp => {
            return resp.customerName;
          }
        );
        console.log(data);
        return {
          chart: {
            width: 450,
            type: "donut"
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
        };
      }
    },
    breakdown() {
      return this.getNearestAccountReceivable.breakdowns.map(resp => {
        return {
          invoiceNumber: resp.invoiceNumber,
          name: resp.customerName.name,
          paymentTerms: resp.paymentTerms,
          total: resp.invoiceTotal,
         dueDate: resp.validityDate,
         balance: resp.amountDue,
         overdue: resp.daysOverdue,
        };
      });
    },
    nearestPayable(){
      return this.getSalesAccountReceivable
    }
  },
  async mounted() {
    await this.$store.dispatch("analytics/getAccountReceiveable");
    await this.$store.dispatch("analytics/getNearestAccountReceivable");
    await this.$store.dispatch("analytics/getAccountReceivableSummary");
    await this.$store.dispatch("analytics/getSalesAccountReceivable");
  }
};
</script>

<style></style>
