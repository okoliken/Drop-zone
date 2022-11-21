<template>
  <div>
    <slot
      class="bg-white flex flex-col items-center justify-center py-10 empty-state"
    >
      <!-- <table class="table-auto  w-full mb-10">
        <thead class="bg-gray-300">
          <tr>
            <th v-for="(header, index) of headers" :key="index">
              {{ header.text }}
            </th>
          </tr>
        </thead>
      </table> -->
      <s-table
        :headers="headers"
        :items="items"
        :view="view"
        class="w-full overflow-x-auto"
      >
        <template v-slot:item="{ item }">
          <button
            @click="
              $router.push({
                name: 'directDebitCollection',
                params: { id: item.data.id },
              })
            "
            v-if="item.transDate"
          >
            {{ item.data.transDate }}
          </button>

          <span
            class="font-semibold"
            :class="handleDirectDebitStatus(item.data.directDebitStatus)"
            v-else-if="item.directDebitStatus"
            >{{ item.data.directDebitStatus }}</span
          >

          <span
            class="font-semibold"
            :class="handleSettlementStatus(item.data.settlementStatus)"
            v-else-if="item.settlementStatus"
            >{{ item.data.settlementStatus }}</span
          >

          <span
            class="font-semibold"
            :class="handleCollectionStatus(item.data.status)"
            v-else-if="item.status"
            >{{ item.data.status }}</span
          >

          <div v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 16rem">
                  <li
                    @click="initUpdate(item.data.id)"
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  >
                    {{ view }}
                  </li>
                  <li
                    @click="initUpdate(item.data)"
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  >
                    Re-Initiate Transaction
                  </li>
                  <li
                    @click="initUpdate(item.data)"
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  >
                    Get Support
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </template>
      </s-table>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    headers: Array,
    items: Array,
    view: String,
  },

  methods: {
    handleDirectDebitStatus(directDebitStatus) {
      if (directDebitStatus === "Success") {
        return "text-tetiary-optima-color";
      } else if (directDebitStatus === "Failed") {
        return "text-danger-optima-color";
      } else {
        return "text-primary-optima-color-lite";
      }
      // if (directDebitStatus === "Success") return "success";
      // if (directDebitStatus === "Failed") return "failed";
      // if (directDebitStatus === "Pending") return "pending";
    },

    handleSettlementStatus(settlementStatus) {
      // if (settlementStatus === "Success") return "success";
      // if (settlementStatus === "Failed") return "failed";
      // if (settlementStatus === "Pending") return "pending";
      if (settlementStatus === "Success") {
        return "text-tetiary-optima-color";
      } else if (settlementStatus === "Failed") {
        return "text-danger-optima-color";
      } else {
        return "text-dark-optima-color-lite";
      }
    },

    handleCollectionStatus(status) {
      if (status === "Full Payment") {
        return "text-danger-optima-color";
      } else if (status === "Pending Payment") {
        return "text-tetiary-optima-color";
      } else {
        return "text-dark-optima-color-lite";
      }
      // if (status === "Pending Payment") return "text-danger-optima-color";
      // if (status === "Pending Payment") return "pendingPayment";
      // if (status === "Partial Payment") return "partialPayment";
    },

    initUpdate(val) {
      this.$router.push({
        name: "previewDirectDebits",
        params: {
          id: val,
        },
      });
    },
    //  initUpdate(val){
    //   this.$router.push({
    //     path: `/payments/direct-debit/${val.id}`,
    //     params: {
    //       items: val,
    //     },
    //   });
    // },
  },
};
</script>

<style>
.success {
  color: #27ae60;
}
.failed {
  color: #f15846;
}
.pending {
  color: #f2c94c;
}
</style>
