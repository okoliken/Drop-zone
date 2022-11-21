
<template>
    <div class="bg-white p-3 shadow-sm">
      <!-- {{getDebitNoteSummary}} -->
       <div class="mt-3">
         <table>
           <tbody>

              <tr>
               <td class=" px-6 py-3 "> <span class=" font-semibold mr-3">Account Owner:</span>   {{ orgData.alias }} </td>
               <td>  </td>

             </tr>

             <tr>
               <td class=" px-6 py-3 font-semibold">Total Debit Noted Issued:</td>
               <td>{{getDebitNoteSummary.totalDebitNotes}}</td>

                <td class=" px-6 py-3 font-semibold">Total Outstanding Debits   :</td>
               <td>  ₦ 259,090.25</td>

             </tr>


              <tr>
               <td class=" px-6 py-3 font-semibold">Total Credit Note Received:</td>
               <td>14</td>

                <td class=" px-6 py-3 font-semibold">Total Outstanding Credit:</td>
               <td>₦ 299,023.00</td>

             </tr>
           </tbody>
         </table>
       </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatisticsCardLine from "@/components/statistics-cards/StaticCard.vue";
// import analyticsData from './requestQuoteData'

export default {
  data() {
    return {
       orgData: {},
     
    };
  },
  components: {
    StatisticsCardLine
  },

  computed: {
    ...mapGetters("purchase/DebitNote", ["getDebitNoteSummary"])
  },

  mounted() {
    this.orgData = this.$store.state.auth.auth.orgData;
    // console.log(this.orgData)
    this.$store.dispatch("purchase/DebitNote/getDebitNoteSummary").then(resp => {
      console.log(resp.data)
    })
  }
};
</script> 