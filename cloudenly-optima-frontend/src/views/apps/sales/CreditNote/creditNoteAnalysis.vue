
<template>
  <div class="bg-white p-3 shadow-sm">
    <div class="mt-3">
      <!-- {{getCreditNoteSummary}} -->
      <table>
        <tbody>
          <tr>
            <td class="px-6 py-3">
              <span class="font-semibold text-dark-optima-color mr-3">Account Owner:</span>
              {{ orgData.alias }}
            </td>
            <td></td>
          </tr>

          <tr>
            <td class="px-6 py-3 text-dark-optima-color font-semibold">Total Credit Noted Issued:</td>
            <td>{{ getCreditNoteSummary.totalCreditNotes }}</td>

            <td class="px-6 py-3 text-dark-optima-color font-semibold">Total Outstanding Credits:</td>
            <td>₦ 0</td>
          </tr>

          <tr>
            <td class="px-6 py-3 text-dark-optima-color font-semibold">Total Debit Note Received:</td>
            <td>{{ getCreditNoteSummary.totalDebitNotes }}</td>

            <td class="px-6 py-3 text-dark-optima-color font-semibold">Total Outstanding debits:</td>
            <td>₦ 0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      orgData: {},
    };
  },
  components: {},

  computed: {
    ...mapGetters("sales/CreditNote", ["getCreditNoteSummary"]),
  },

  mounted() {
    this.orgData = this.$store.state.auth.auth.orgData;
    this.$store
      .dispatch("sales/CreditNote/getCreditNoteSummary")
      .then((resp) => {
        console.log("analysis summary", resp.data.analyticsSummary);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>