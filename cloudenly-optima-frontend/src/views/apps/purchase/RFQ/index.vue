<template>
  <div>
    <back location="Request for Quote" />
    <request-quote-analysis
      class="mt-5"
      v-if="
        getIsAccOwner || getPurchaseRequestForQuoteOPrivileges.viewDashboard
      "
    />

    <request-quotes />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RequestQuoteAnalysis from "./requestQuoteAnalysis";
import RequestQuotes from "./myRequestQuotes";
// import othersrequest from "./otherRequest";

export default {
  components: {
    RequestQuoteAnalysis,
    RequestQuotes,
    // othersrequest,
  },

  data() {
    return {
      currentTab: "My Request",
      tabs: ["My Request", "Others Request"],
    };
  },

  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequestForQuoteOPrivileges",
    ]),
  },
};
</script>
