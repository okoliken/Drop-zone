<template>
  <div class="grid grid-cols-12 col-gap-8" style="font-size: 14px">
    <h1 class="col-span-12 font-bold mb-8">Customer Engagement</h1>

    <!-- Engagements' Cards -->
    <div class="col-span-4 flex items-center justify-between bg-white px-8 rounded mr-4" style="height: 115px">
      <img :src="contacts" alt="contacts" style="height: 30px" />
      <div>
        <div class="text-lg text-right font-semibold mb-2">
          {{getContactAnalyticData.customer.totalContacts}}
        </div>
        <div class="text-right">Number of Contacts</div>
      </div>
    </div>

    <div class="col-span-4 flex items-center justify-between bg-white px-8 rounded mr-4" style="height: 115px">
      <img :src="customerManagement" alt="contacts" style="height: 30px" />
      <div>
        <div class="text-lg text-right font-semibold mb-2">
          {{getContactAnalyticData.customer.totalWhitelistedContacts}}
        </div>
        <div class="text-right">Number of Customers</div>
      </div>
    </div>

    <div class="col-span-4 flex items-center justify-between bg-white px-8 rounded" style="height: 115px">
      <img :src="blacklist" alt="contacts" style="height: 30px" />
      <div>
        <div class="text-lg text-right font-semibold mb-2">
          {{getContactAnalyticData.customer.totalBlacklistedContacts}}
        </div>
        <div class="text-right">Number of Blacklisted Contacts</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import blacklist from "@/assets/images/optimaAsset/blacklist.svg";
import contacts from "@/assets/images/optimaAsset/contacts.svg";
import customerManagement from "@/assets/images/optimaAsset/customerManagement.svg";

export default {
  data() {
    return { blacklist, contacts, customerManagement }; 
  },

  computed: {
    ...mapGetters("crm/contact", ["getContactAnalyticData"]),
  },

  mounted() {
    this.$store
      .dispatch("crm/contact/getContactAnalyticsData")
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
