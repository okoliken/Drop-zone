<template>
  <div>
    
    <div id="chart">
      <apexcharts
        type="pie"
        width="580"
        :options="chartOption"
        :series="serie"
      />
    </div>
  </div>
</template>

<script>
import apexcharts from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  components: { apexcharts },
  data: () => ({
    series: [44, 55, 13, 43, 22],
    chartOptions: {
      chart: {
        width: 580,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      
    }
  }),

  computed: {
    ...mapGetters("analytics", ["getAllCrmLeadCount"]),
    serie() {
      if (this.getAllCrmLeadCount.leadsPercentCountByIndustry === undefined) {
        return [];
      }else{
        let data = this.getAllCrmLeadCount.leadsPercentCountByIndustry.map((resp)=>{
          return resp.industryLeadPercentage
        })
        // console.log(data)
        return  data
        
        
      }
    },
    chartOption() {
      if (this.getAllCrmLeadCount.leadsPercentCountByIndustry === undefined) {
        return {
      chart: {
        width: 580,
        type: "pie"
      },
      labels: [],
      
    };
      }else{
        let data = this.getAllCrmLeadCount.leadsPercentCountByIndustry.map((resp)=>{
          return resp.industryName
        })
        // console.log(data)
        return {
      chart: {
        width: 580,
        type: "pie"
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
    }
  }
};
</script>

<style></style>
