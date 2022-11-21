<template>
  <div class>
    <div class="mb-3">
      <div class="flex">
        <div class="w-1/3 mr-5"></div>

        <div class="w-1/3"></div>

        <div class="w-1/3">
          <input
            placeholder="Search Inventory Items..."
            class="form-control-lg w-full border border-solid border-grey-light"
          />
        </div>
      </div>
    </div>

    <div class>
      <table class="table w-full table-auto">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3 text-blue text-center">Inventory Class</th>
            <th class="py-3 text-blue text-center">Item Name</th>
            <th class="py-3 text-blue text-center">Item Code</th>
            <th class="py-3 text-blue text-center">Description</th>
            <th class="py-3 text-blue text-center">UofM</th>
            <th class="py-3 text-blue text-center">Quantity</th>
            <th class="py-3 text-blue text-center">Unit Price</th>
            <th class="py-3 text-blue text-center">Stock Balance</th>
            <th class="py-3 text-blue text-center">Inventory Value</th>
            <th class="py-3 text-blue text-center">Category</th>
            <th class="py-3 text-blue text-center" style=" width: 4%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inventory, index ) in  getRemoveInventory" :key="index">
            <td class="text-center">{{inventory.name}}</td>
            <td class="text-center">{{inventory.unit}}</td>
            <td class="text-center">{{inventory.sellingPrice}}</td>
            <td class="text-center">{{inventory.openingStock}}</td>
            <td class="text-center">{{inventory.issuedQuantity}}</td>
            <td class="text-center">{{inventory.addedQuantity}}</td>
            <td class="text-center">{{inventory.closingStock}}</td>
            <td class="text-center">{{inventory.closingStock}}</td>
            <td class="text-center">{{inventory.reorderLevel}}</td>

            <td class="text-center">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                </div>
                <vs-dropdown-menu>
                  <ul style="min-width: 15rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                      <span class="ml-2">Return to Inventory</span>
                    </li>

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                      <span class="ml-2">Reactivate for Sales</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>

              <div class="dropdown ks-control">
                <button
                  class="ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-small"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ivu-icon ivu-icon-md-more fsz-20"></i>
                  </span>
                </button>
                <div class="dropdown-menu dropdown-menu-right sc-dropdown-menu show">
                  <button
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    class="dropdown-item"
                  >
                    Return to
                    Inventory
                  </button>
                  <button class="dropdown-item">Reactivate for Sales</button>
                  <button class="dropdown-item">Edit Stock Balance</button>
                </div>
              </div>
            </td>
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
      search: "",
      drawer: false,
      allWithdrawInvenentory: [],
      addStockModal: false,
      reoderStockModal: false,
      loader: true,
      reorderLoader: true,

      userData: "",
      inventoryData: ""
    };
  },

  methods: {},

  computed: {
    ...mapGetters("inventory/stock", [
      "getRemoveInventory",
      "getOutletInventory"
    ])
  },

  mounted() {
    this.$store
      .dispatch("inventory/stock/getRemovedInventory")
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
</style>

