<template>
  <div>
    <div v-if="getIsLoyaltySetup">
      <!-- <div> -->
      <back location="Loyalty" />

      <div class="mt-12">
        <analysis />
      </div>
      <!-- Register Section -->
      <loyaltyRegister />
    </div>
    <div v-else class="">
      <emptyState @click="createLoyaltyModal" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import emptyState from "./emptyState.vue";
import analysis from "./analysis.vue";
import loyaltyRegister from "./loyaltyRegister.vue";
export default {
  components: {
    emptyState,
    analysis,
    loyaltyRegister,
  },

  data() {
    return {
      search: "",
      loyaltySearch: "",
      yes: false,
      createModal: false,
    };
  },

  methods: {
    createLoyaltyModal() {
      this.$router.push({
        name: "crmSettings",
      });
    },
  },

  computed: {
    ...mapGetters("crm/loyalty", ["getIsLoyaltySetup"]),
  },

  mounted() {
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
  },
};
</script>

<style>
</style>