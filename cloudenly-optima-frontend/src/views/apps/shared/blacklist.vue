<template>
  <div style="font-size: 14px;">
    <back location="Blacklisted Contacts" class="mb-8" />

    <div class="bg-white px-6 py-12">
      <!-- options box -->
      <div class="flex items-center justify-between">
        <!-- search input -->
        <s-combo-box />

        <button
          class="bg-primary-optima-color text-white py-4 px-16"
          :class="{ 'cursor-not-allowed': whitelistButton }"
          style="border-radius: 50px"
          @click="whitelistCustomer()"
          type="button"
          v-if="selectedItems.length > 0"
        >
          Restore
        </button>
      </div>
    </div>
    <!-- End Actions Sections -->
    <vue-perfect-scrollbar>
      <s-table
        :headers="headers"
        :items="blackList"
        :has-checkbox="true"
        v-model="selectedItems"
      >
        <template v-slot:item="{ item }">
          <span v-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 16rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="whitelistCustomer(item.data.id)"
                  >
                    restore
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </span>
        </template>

        <template v-slot:table-empty-state-heading>
          You don't have any blacklisted customer(s)
        </template>

        <template v-slot:table-empty-state-subheading>{{ "" }}</template>

        <template v-slot:table-empty-state-actions>{{ "" }}</template>
      </s-table>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "BlackList",
  components: { VuePerfectScrollbar },
  data() {
    return {
      selectedItems: [],
      whitelistButton: false,
      headers: [
        { text: "Customer Name", value: "customerName" },
        { text: "Customer ID", value: "customerId" },
        { text: "Email", value: "email" },
        { text: "Date Blacklisted", value: "date" },
        { text: "Reason for Blaclist", value: "reason" },
        { text: "Actions", value: "id" },
      ],
    };
  },
  computed: {
    ...mapGetters("crm/contact", [
      "getBlacklistContact",
      "getSupplierBlacklist",
    ]),
    customerBlackList() {
      return this.getBlacklistContact.map((item) => ({
        customerName: item.name,
        customerId: item.code,
        email: item.email,
        date: moment(item.updatedAt).format("DD - MM - YYYY"),
        reason: item.suspendReason,
        id: item.id,
      }));
    },
    supplierBlackList() {
      return this.getSupplierBlacklist.map((item) => ({
        customerName: item.name,
        customerId: item.code,
        email: item.email,
        date: moment(item.updatedAt).format("DD - MM - YYYY"),
        reason: item.suspendReason,
        id: item.id,
      }));
    },
    blackList() {
      if (this.$route.query.type === "supplier") return this.supplierBlackList;
      return this.customerBlackList;
    },
  },
  methods: {
    async whitelistCustomer(id) {
      this.whitelistButton = true;
      try {
        let contactIds = [];

        if (id) {
          contactIds = [id];
        } else {
          contactIds = this.selectedItems.map((item) => item.id);
        }

        const data = {
          userInfo: this.$store.state.auth.auth.authData,
          payload: {
            contactIds,
            isSuspended: false,
          },
        };

        await this.$store.dispatch("crm/contact/bulkBlacklistCustomer", data);

        this.$vs.notify({
          title: "Contact",
          text: '"Contact(s) restored successfully',
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "Contact",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.whitelistButton = false;
      }
    },
  },

  mounted() {
    switch (this.$route.query.type) {
      case "supplier":
        this.$store.dispatch("crm/contact/getSupplierBlacklist");
        break;

      default:
        this.$store.dispatch("crm/contact/getBlacklistCustomer");
        break;
    }
  },
};
</script>
