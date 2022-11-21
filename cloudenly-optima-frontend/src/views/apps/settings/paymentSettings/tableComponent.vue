<template>
  <div>
    <slot
      class="
        bg-white
        flex flex-col
        items-center
        justify-center
        py-10
        empty-state
      "
    >
      <vs-popup button-close-hidden :active.sync="modal" title="">
        <div class="container">
          <div class="flex justify-between">
            <h1 class="text-red-500">Remove Account?</h1>
            <p
              role="button"
              @click="modal = false"
              class="bg-gray-200 rounded-full text-lg font-bold px-2 py-2"
            >
              x
            </p>
          </div>
          <p>
            Are you sure you want to remove this account? This action cannot be
            undone.
          </p>

          <hr class="text-gray-400 my-5" />

          <div class="mt-3 mx-10 flex justify-between">
            <button
              @click="modal = false"
              class="
                px-5
                py-2
                text-primary
                border-none
                cursor-pointer
                bg-gray-400
                rounded-full
              "
            >
              Cancel
            </button>

            <button
              class="
                px-5
                py-2
                text-white
                border-none
                cursor-pointer
                bg-red-500
                rounded-full
              "
            >
              Proceed
            </button>
          </div>
        </div>
      </vs-popup>

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
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    View & Edit
                  </li>
                  <li
                    @click="initUpdate(item.data)"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    Deactivate Account
                  </li>

                  <li
                    @click="deleteAccount"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    Delete Account
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
  data() {
    return {
      modal: false,
    };
  },
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
    deleteAccount() {
      this.modal = true;
    },
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
