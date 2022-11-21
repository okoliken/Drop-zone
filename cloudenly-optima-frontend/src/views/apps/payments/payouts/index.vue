<template>
  <div>
    <section class="bg-white p-6">
      <s-combo-box class="mb-8" />

      <div class="flex">
        <s-select
          :width="220"
          default-option="--Filter By Customer--"
          class="mr-3"
        />
        <s-select
          :width="220"
          default-option="--Filter By Status--"
          class="mr-3"
        />
        <s-text :width="220" type="date" />
      </div>
    </section>

    <s-table :headers="headers" :items="items">
      <template v-slot:item="{ item }">
        <button
          @click="
            $router.push({
              name: 'paymentsPayout',
              params: { id: item.data.id },
            })
          "
          v-if="item.receiptNo"
        >
          {{ item.data.receiptNo }}
        </button>

        <span
          class="font-semibold"
          :class="handleStatusColor(item.data.status)"
          v-else-if="item.status"
          >{{ item.data.status }}</span
        >

        <div v-else-if="item.id">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div class="text-center cursor-pointer">
              <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
            </div>

            <vs-dropdown-menu>
              <ul style="min-width: 12rem">
                <li
                  @click="initUpdate(item.data)"
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  View Approval Flow
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Invoice No.", value: "receiptNo" },
        { text: "Description", value: "description" },
        { text: "Receipt Date", value: "receiptDate" },
        { text: "Due Date", value: "dueDate" },
        { text: "Total Amount (₦)", value: "amount" },
        { text: "Balance Due (₦)", value: "balanceDue" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "id" },
      ],
      items: [
        {
          receiptNo: "344567",
          description: "Invoice for coca cola crates (12)",
          receiptDate: "29 - 04 - 2020",
          dueDate: "29 - 05 - 2020",
          amount: "256,000.00",
          balanceDue: "45,000",
          status: "Paid",
          id: "1",
        },
        {
          receiptNo: "344567",
          description: "Credit note for fanta crates (12)",
          receiptDate: "22 - 04 - 2020",
          dueDate: "22 - 06 - 2020",
          amount: "123,670.90",
          balanceDue: "46,000",
          status: "Partially Paid",
          id: "2",
        },
        {
          receiptNo: "344567",
          description: "Invoice for cocalcola crates (42)",
          receiptDate: "21 - 04 - 2020",
          dueDate: "21 - 07 - 2020",
          amount: "345,000.00",
          balanceDue: "321,000.00",
          status: "Unpaid",
          id: "3",
        },
        {
          receiptNo: "344567",
          description: "Invoice for fanta crates (52)",
          receiptDate: "20 - 04 - 2020",
          dueDate: "20 - 08 - 2020",
          amount: "1,234,990.65",
          balanceDue: "565,000.00",
          status: "Approved",
          id: "4",
        },
        {
          receiptNo: "344567",
          description: "Credit note Smoov crates (10)",
          receiptDate: "14 - 04 - 2020",
          dueDate: "14 - 09 - 2020",
          amount: "225,000.00",
          balanceDue: "75,000.00",
          status: "Pending Approval",
          id: "5",
        },
        {
          receiptNo: "344567",
          description: "Credit note  for sprite crates (12)",
          receiptDate: "12 - 04 - 2020",
          dueDate: "12 - 11 - 2020",
          amount: "875,900.00",
          balanceDue: "345,000.00",
          status: "Dissapproved",
          id: "6",
        },
      ],
    };
  },
  methods: {
    handleStatusColor(status) {
      if (status === "Paid") return "paid";
      if (status === "Partially Paid") return "text-danger-optima-color";
      if (status === "Unpaid") return "unpaid";
      if (status === "Pending Approval") return "pending";
      if (status === "Approved") return "text-tetiary-optima-color";
      return "text-dark-optima-color-lite";
    },
  },
};
</script>

<style>
.paid {
  color: #27ae60;
}
.unpaid {
  color: #f15846;
}
.pending {
  color: #f2c94c;
}
</style>
