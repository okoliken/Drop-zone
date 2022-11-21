<template>
  <table class="w-full">
    <thead>
      <th class="" style="padding: 0; font-size: 12px">#</th>
      <th
        class="text-sm font-normal"
        style="padding: 0; font-size: 12px; color: #507fdf"
        v-for="(header, i) in headers"
        :key="i"
      >
        {{ header }}
      </th>
    </thead>

    <tbody v-show="!requisitionData.length">
      <tr>
        <td class="py-4">1</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
        <td class="py-4">---</td>
      </tr>
    </tbody>

    <tbody v-show="requisitionData.length">
      <tr v-for="(item, i) in requisitionData" :key="i">
        <td class="py-4">{{ i + 1 }}</td>

        <td class="py-4">{{ item.variantName }}</td>

        <td class="py-4">{{ item.supplierVariantSku }}</td>

        <td class="py-4">{{ item.unitOfMeasure }}</td>

        <td class="py-4">{{ item.stockBalance }}</td>

        <td class="py-4">
          <input
            type="number"
            class="py-2 px-4 rounded"
            style="border: 1px solid; height: 32px; width: 100px" 
            v-model="item.quantityRequested"
          />
        </td>

         <td class="py-4">
          <!-- <input
            type="number"
            class="py-2 px-4 rounded"
            style="border: 1px solid; height: 32px; width: 100px"
            v-model="item.accountId"
          /> -->

          <select  style="border: 1px solid; height: 32px; width: 100px" v-model="item.accountId">
              <option v-for="item in getAccListFromExpOrRevCostCentre" :value="item.id"
                              :key="item.id">{{
                          item.accountName
                        }}</option>
          </select>
        </td>

        <td class="py-4">
          <feather-icon
            @click="deleteProductBoq(i)"
            icon="Trash2Icon"
            class="text-cloudenly-danger-main w-5 cursor-pointer"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props: {
    headers: Array,
    requisitionData: Array,
    deleteProductBoq: {
      type: Function,
    },
  },
  computed:{
    ...mapGetters("accounting/settings/", ["getAccListFromExpOrRevCostCentre"]),
  },

  async mounted() {
    await this.$store.dispatch("accounting/settings/getAccListFromExpOrRevCostCentre");
  }
};
</script>

<style></style>
