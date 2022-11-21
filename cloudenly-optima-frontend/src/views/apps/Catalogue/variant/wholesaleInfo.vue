<template>
  <div>
    <!-- {{getUpdateVariantItemInfo.wholesalePriceBooks}} -->

    <div class="flex items-center justify-between">
      <table class="table w-full table-responsive table-bordered">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="font-bold text-center">Default</th>
            <th class="font-bold text-center">Unit of Sales</th>
            <th class="font-bold text-center">Qty per Unit</th>
            <th class="font-bold text-center">Unit Purchase Price</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Recommended Wholesale Price</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Sales Margin(%)</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Sales Margin(NGN)</th>
            <th class="font-bold text-center">Wholesale Price (Fully Discounted)</th>
            <th class="font-bold text-center">Sales margin (%)</th>
            <th class="font-bold text-center">Sales margin(NGN)</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class
            v-for="(wholesale, index) in getUpdateVariantItemInfo.wholesalePriceBooks"
            :key="index"
          >
            <td class="pl-5 pt-2">
              <input
                class="h-5 leading-tight w-5 bg-cloudenly-primary-main text-cloudenly-primary-main"
                type="radio"
                v-model="wholesale.defaultPrice"
                name="wholesale"
                @click="toggleRadioButtonWholeSale(index)"
                :value="true"
              />
            </td>
            <td class="pt-2">
              <select
                disabled
                readonly
                v-model="wholesale.unitOfSale"
                name
                class="w-full rounded border border-solid border-grey py-2"
                id
              >
                <option
                  v-for="(unit, index) in unitOFMeasurementData"
                  :key="index"
                  :value="unit.value"
                >{{unit.name}}</option>
              </select>
            </td>

            <td class="pt-2">
              <input
                disabled
                readonly
                v-model="wholesale.quantityPerUnit"
                @keyup="calSaleWholeSaleIno(wholesale)"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                readonly
                disabled
                v-model="wholesale.unitPurchasePrice"
                @keyup="calSaleWholeSaleIno(wholesale)"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>
            <td class="pt-2">
              <input
                v-model="wholesale.recommendedWholesalePrice"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="wholesale.saleMarginAmount"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="wholesale.saleMarginPercentage"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="wholesale.discountedWholesalePrice"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="wholesale.discountedSaleMarginAmount"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="wholesale.discountedSaleMarginPercentage"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>
            <td class="pt-2"></td>
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
      wholesalePriceBooks: []
    };
  },

  computed: {
    ...mapGetters("catalogue", ["getUpdateVariantItemInfo"])
  }
};
</script>

<style>
</style>