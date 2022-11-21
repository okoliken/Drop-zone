<template>
  <div class="">
    <div class="px-3 py-10 bg-white">
      <div class="flex justify-between">
        <div class="">
          <s-combo-box/>
        </div>
        <div  class="">
          <s-select :width="300"/>
        </div>
      </div>
    </div>

    <div
      v-if="getIsAccOwner || getStockBalancePrivileges.viewInventoryRegister"
    >
      <div class="mt-2 bg-white">
        <table class="table min-w-full">
          <thead class="bg-gray-300">
            <tr>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Name
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Description
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Category
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                UofM
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Opening
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Issued
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Added
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Balance
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Total Value (₦)
              </th>
              
            </tr>
          </thead>
          <tbody class>
            <tr
              class=""
              v-for="(inventory, index) in getTotalInventory"
              :key="index"
            >
              <td
                class="
                  px-6
                  py-4
                  whitespace-no-wrap
                  border border-solid border-gray-200
                  truncate
                "
              >
                <span class>{{
                  inventory.variant && inventory.variant.variantName
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ inventory.variant && inventory.variant.item.description }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                <!-- {{ inventory.variant && inventory.variant.item.category.name }} -->
                {{ formatCat(inventory) }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{
                  inventory.variant &&
                    inventory.variant.retailPriceBooks[0].unitOfSale
                }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ inventory.total && inventory.total.openingStock }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ inventory.total && inventory.total.issuedStock }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ inventory.total && inventory.total.addedStock }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ inventory.total && inventory.total.stockBalance }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  whitespace-no-wrap
                  border border-gray-200
                  tracking-widest
                "
              >
                {{ inventory.total.remainingInventoryValue | formatCurrency }}
              </td>
              
            </tr>
          </tbody>
        </table>

        <!-- Pagination section -->
        <div
          class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
        >
          <div class="flex items-center">
            <p class="mr-2">Show :</p>
            <select name class="py-1 mr-2 border border-gray-400" id>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>

          <div class="flex items-center">
            <p class="mr-2">Show</p>
            <select name class="py-1 mr-2 border border-gray-400" id>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import image_close from "@/assets/images/optimaAsset/shared/close-red.svg";


export default {
  components: {},
  data() {
    return {
      image_close,
      search: "",
    };
  },

  computed: {
    ...mapGetters("inventory/stock", ["getTotalInventory"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getStockBalancePrivileges"])
  },

  methods: {
    formatCat(val) {
      if (val.variant && val.variant.item.category === null) {
        return "N/A";
      } else {
        return val.variant.item.category.name
          ? val.variant.item.category.name
          : "N/A";
      }
    }
  },

  mounted() {
    this.$store.dispatch("inventory/stock/getTotalInventory");
  }
};
</script>
<style scoped></style>
