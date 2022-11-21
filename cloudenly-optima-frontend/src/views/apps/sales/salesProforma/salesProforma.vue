<template>
  <div class>
    <div>
      <p class="font-normal text-xl text-dark-optima-color">Sales Quotation</p>
    </div>
    <ProformaAnalysis  v-if="getIsAccOwner || getSalesQuotePrivileges.viewDashboard" class="mt-5" />
    <mysalesquotation />
  </div>
</template>



<script>
import {mapGetters} from 'vuex'
import ProformaAnalysis from "./salesProformaAnalysis";
import mysalesquotation from "./allProfroma";
import sentsalesquotation from "./sentProfroma";
import otherssalesquotation from "./otherProforma";

export default {
  components: {
    ProformaAnalysis,
    mysalesquotation,
    sentsalesquotation,
    otherssalesquotation,
  },
  data() {
    return {
      loading: false,
      search: "",
      all: [],
      allSent: [],
      userData: "",
      boqsDetails: [],
      modal: false,
      networks: "",

      currentTab: "My Sales Quotation",
      tabs: [
        "My Sales Quotation",
        "Sent Sales Quotation",
        "Others Sales Quotation",
      ],
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },

    ...mapGetters('auth/roles', ['getIsAccOwner' , 'getSalesQuotePrivileges'])

  },
  mounted() {},
};
</script>



<style lang="css" scoped>
.active {
  border: 4px solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-color: blue;
  color: blue;
}
</style>