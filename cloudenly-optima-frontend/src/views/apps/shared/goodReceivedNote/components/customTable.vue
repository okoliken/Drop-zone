<template>
  <table class="col-span-12">
    <thead>
      <th style="padding: 0; font-size: 12px; width: 5%">#</th>

      <th
        class="text-sm font-normal"
        style="padding: 0; font-size: 12px; color: #507fdf"
        v-for="(header, i) in headers"
        :key="i"
      >
        {{ header.text }}
      </th>
    </thead>

    <tbody v-if="!goodsReceivedNoteBoqs.length">
      <tr class="h-16">
        <td>1</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
        <td>---</td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr v-for="(item, i) in goodsReceivedNoteBoqs" :key="i" class="h-20">
        <td>{{ Number(i) + 1 }}</td>
        <td>{{ item.variantName }}</td>
        <td>
          <select
            style="border: 1px solid #ccc; height: 32px; width: 100px"
            class="py-2 px-2 border border-gray-200 rounded w-full"
            name=""
            id=""
            v-model="item.customerVariantId"
          >
            <option
              v-for="(item, index) in getAllVariant"
              :key="index"
              :value="item.id"
            >
              {{ item.variantName }}
            </option>
          </select>
        </td>
        <td>{{ item.unitOfSale }}</td>
        <td>
          <input
            type="number"
            disabled
            class="py-2 px-4 rounded"
            style="border: 1px solid #ccc; height: 32px; width: 100px"
            v-model.number="item.quantityInvoiced"
          />
        </td>

        <td>
          <input
            type="number"
            class="table__input py-2 px-4 rounded"
            :class="{ 'input-error': error }"
            v-model.number="item.quantityReceived"
            @input="handleComputation(item)"
          />
        </td>

        <td>
          <input
            type="number"
            disabled
            class="py-2 px-4 rounded"
            style="border: 1px solid #ccc; height: 32px; width: 100px"
            v-model.number="item.quantityOutstanding"
          />
        </td>

        <td>{{ item.purchasePrice | currency }}</td>
        <td>{{ item.amount | currency }}</td>
        <td>
          <select
            style="border: 1px solid #ccc; height: 32px; width: 100px"
            class="py-2 px-2 border border-gray-200 rounded w-full"
            name=""
            id=""
            v-model="item.inventoryTypeId"
          >
            <option selected value="26e3ee7d-3302-4e34-85a5-007b36881cb0">
              Holding inventory
            </option>
            <option
              v-for="(inventory, index) in getCurrentOutletInventories"
              :key="index"
              :value="inventory.id"
            >
              {{ inventory.name }}
            </option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    headers: Array,
    items: Array,
    // computeQuantityOutstanding: Function,
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("inventory/stock", ["getCurrentOutletInventories"]),
    goodsReceivedNoteBoqs() {
      return [...JSON.parse(JSON.stringify(this.items))];
    },
  },
  methods: {
    // to compute quantity outstanding and grn amount
    handleComputation(item) {
      item.quantityOutstanding = this.computeQuantityOutstanding(item);

      if (!item.quantityReceived) {
        this.error = true;
      } else {
        this.error = false;
      }

      if (Math.sign(item.quantityOutstanding) === -1) {
        alert("quantity received cannot be higher than invoiced");
        item.quantityReceived = item.quantityInvoiced;
        item.quantityOutstanding = this.computeQuantityOutstanding(item);
      }

     if (Math.sign(item.quantityReceived) < 0) {
        alert("quantity received cannot be less than 0");
        item.quantityReceived = 0;
        item.quantityOutstanding = this.computeQuantityOutstanding(item);
      }

      item.amount = item.purchasePrice * item.quantityReceived;

      this.$emit("boqs", this.goodsReceivedNoteBoqs);
    },

    computeQuantityOutstanding({ quantityInvoiced, quantityReceived }) {
      return Number(quantityInvoiced) - Number(quantityReceived);
    },
  },

  mounted() {
    this.$store.dispatch("inventory/stock/viewCurrentOutletInventoryType");

    this.$store.dispatch("catalogue/getAllCatalogueVariant")
  },
};
</script>

<style lang="scss">
.table {
  &__input {
    border: 1px solid #ccc;
    height: 32px;
    width: 100px;
  }
}
.input-error {
  border: 1px solid #dc3545;
}
</style>
