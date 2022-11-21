<template>
  <div>
    <!-- {{getUpdateVariantItemInfo.retailPriceBooks}} -->

    <div class="flex items-center justify-between">
      <table class="table w-full table-responsive table-bordered">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="font-bold text-center">Default</th>
            <th class="font-bold text-center">Unit of Sales</th>
            <th class="font-bold text-center">Qty per Unit</th>
            <th class="font-bold text-center">Unit Purchase Price (NGN)</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Recommended Retail Price(NGN)</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Sales Margin(NGN)</th>
            <th class="font-bold text-center bg-cloudenly-warning-off">Sales Margin(%)</th>
            <th class="font-bold text-center">Retail Price (Fully Discounted)</th>
            <th class="font-bold text-center">Sales margin(NGN)</th>
            <th class="font-bold text-center">Sales margin (%)</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class
            v-for="(retail, index) in getUpdateVariantItemInfo.retailPriceBooks"
            :key="index"
          >
            <td class="pl-5 pt-2">
              <input
                class="h-5 leading-tight w-5 bg-cloudenly-primary-main text-cloudenly-primary-main"
                type="radio"
                v-model="retail.defaultPrice"
                name="retail"
                @click="toggleRadioButtonRetail(index)"
                :value="true"
              />
            </td>
            <td class="pt-2">
              <select
                readonly
                disabled
                v-model="retail.unitOfSale"
                name
                class="w-full rounded border border-solid border-grey bg-grey-lightest py-2"
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
                readonly
                disabled
                v-model="retail.quantityPerUnit"
                @keyup="calSaleRetailInfo(retail)"
                class="w-full rounded border border-solid border-grey bg-grey-lightest py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                readonly
                disabled
                v-model="retail.unitPurchasePrice"
                @keyup="calSaleRetailInfo(retail)"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="retail.recommendedRetailPrice"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="retail.saleMarginAmount"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="retail.saleMarginPercentage"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="retail.discountedRetailPrice"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                disabled
                v-model="retail.discountedSaleMarginAmount"
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>

            <td class="pt-2">
              <input
                v-model="retail.discountedSaleMarginPercentage"
                disabled
                class="w-full rounded border border-solid border-grey py-2 px-2"
                type="text"
                name
                id
              />
            </td>
          </tr>
        </tbody>
      </table>

     
    </div>

     <div class=" mt-10 flex ">
        <div class=" mx-auto">
           <button class=" px-10 py-4 text-xl cursor-pointer border-none" >Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      retailPriceBooks: []
    };
  },

  computed: {
    ...mapGetters("catalogue", ["getUpdateVariantItemInfo"])
  }
};
</script>

<style>
</style>