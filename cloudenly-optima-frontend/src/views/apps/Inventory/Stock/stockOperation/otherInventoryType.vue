/* eslint-disable vue/return-in-computed-property */
<template>
  <div>
    <!-- Add Stock to Inventory -->
    <!-- <vs-popup class="" title="Add Stock" :active.sync="addStockDrawer">
      <div class="container">
        <div class="form-group row no-gutters">
          <label for="example-text-input" class="col-4 col-form-label">
            <h5> Quantity to Add </h5>
          </label>
          <div class="col-6">
            <input v-model="quantity" class="form-control" type="text" id="example-text-input">
          </div>
        </div>

        <div class=" flex items-center justify-center">
          <button @click="addToStock" class="px-10 py-2 cursor-pointer"> Add Stock</button>
        </div>
      </div>
    </vs-popup>-->
    <!-- End Add to Stock Section -->

    <!--  Add to Stock Section -->
    <Drawer :size="50" :visible="addStockDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-xl">Add Stock</p>
      </div>

      <div slot="body">
        <div class="container">
          <div class="form-group row no-gutters mb-4">
            <label
              for="example-text-input"
              class="col-4 col-form-label text-right mr-5"
            >
              <p>Quantity to Add</p>
            </label>
            <div class="col-6">
              <input
                v-model="addingStockData.addedStock"
                class="py-2 px-1 border border-solid border-grey rounded w-full"
                type="text"
                id="example-text-input"
              />
            </div>
          </div>

          <div class="form-group row no-gutters mb-4">
            <label
              for="example-text-input"
              class="col-4 col-form-label text-right mr-5"
            >
              <p>Purchase Price</p>
            </label>
            <div class="col-6">
              <input
                v-model="addingStockData.purchasePrice"
                class="py-2 px-1 border border-solid border-grey rounded w-full"
                type="text"
                id="example-text-input"
              />
            </div>
          </div>

          <div class="form-group row no-gutters mb-4">
            <label
              for="example-text-input"
              class="col-4 col-form-label text-right mr-5"
            >
              <p>Expiry Date</p>
            </label>
            <div class="col-6">
              <div class="w-full">
                <datepicker
                  v-model="addingStockData.expiryDate"
                  input-class=" w-full  "
                />
              </div>
            </div>
          </div>

          <div class="form-group row no-gutters mb-4">
            <label
              for="example-text-input"
              class="col-4 col-form-label text-right mr-5"
            >
              <p>Batch No.</p>
            </label>
            <div class="col-6">
              <input
                v-model="addingStockData.batchNo"
                class="py-2 px-1 border border-solid border-grey rounded w-full"
                type="text"
                id="example-text-input"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              @click="addToStock"
              :disabled="addButton"
              :class="{
                'cursor-not-allowed': addButton,
                'bg-cloudenly-primary-mid': addButton,
              }"
              class="px-10 py-2 cursor-pointer bg-cloudenly-primary-main border-none text-white rounded"
            >
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End Add to Stock Section -->

    <!-- Issue Stock to Inventory -->
    <vs-popup class title="Issue Stock" :active.sync="issueStockModal">
      <div class="container">
        <div class="form-group row no-gutters">
          <label for="example-text-input" class="col-4 col-form-label">
            <p>Quantity to Issue</p>
          </label>
          <div class="col-6">
            <input
              v-model="quantity"
              class="py-2 px-1 border border-solid border-grey w-full rounded"
              type="text"
              id="example-text-input"
            />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button @click="issueStock" class="px-10 py-2 cursor-pointer">
            Issue Stock
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Issue to Stock Section -->

    <!-- Set Reorder Level Inventory -->
    <vs-popup class title="Issue Stock" :active.sync="reOrderLevelModal">
      <div class="container">
        <div class="form-group row no-gutters">
          <label for="example-text-input" class="col-4 col-form-label">
            <p>Reorder Level Quantity</p>
          </label>
          <div class="col-6">
            <input
              v-model="quantity"
              class="py-2 px-1 border border-solid border-grey w-full rounded"
              type="text"
              id="example-text-input"
            />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button @click="setReOrderLevel" class="px-10 py-2 cursor-pointer">
            Set Reorder Level
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Reorder Level Section -->

    <!-- Remove Inventory -->
    <vs-popup class title="Issue Stock" :active.sync="removeItemModal">
      <div class="container">
        <div class="form-group row no-gutters">
          <label for="example-text-input" class="col-4 col-form-label">
            <p>Reason</p>
          </label>
          <div class="col-6">
            <input
              v-model="reason"
              class="py-2 px-1 border border-solid border-grey w-full rounded"
              type="text"
              id="example-text-input"
            />
          </div>
        </div>

        <div class="form-group row no-gutters">
          <label for="example-text-input" class="col-4 col-form-label">
            <p>Comment</p>
          </label>
          <div class="col-6">
            <textarea
              v-model="comment"
              class="py-2 px-1 border border-solid border-grey w-full rounded"
              type="text"
              id="example-text-input"
            />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            @click="removeInventory"
            class="px-8 py-3 cursor-pointer bg-primary-optima-color text-white rounded"
          >
            Process Remove
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Remove  Section -->

    <!-- Reclassify Drawer -->
    <Drawer :size="40" :visible="reclassifyDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Reclassify Inventory</p>
      </div>

      <div slot="body">
        <div class="p-3 bg-cloudenly-success-mid rounded-lg">
          <p>
            Reclassify Inventory Item is Changing the Inventory Class of item to
            Another Item
          </p>
        </div>
        <hr />


        <div class="mb-5 mt-5">
          <div class="flex items-center">
            <label class="font-bold mr-10" for>Inventory Type</label>
            <select
              v-model="inventoryTypeId"
              class="w-2/3 py-2 px-1 border border-solid border-grey rounded"
            >
              <option
                v-for="(inventory, index) in getCurrentOutletInventories"
                :key="index"
                :value="inventory.id"
              >
                {{ inventory.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-1- flex items-center justify-center">
          <button
            @click="reclassifyItem"
            class="px-4 py-2 border-none bg-cloudenly-primary-main text-white hover:text-white cursor-pointer"
          >
            Save Setup
          </button>
        </div>
      </div>
    </Drawer>
    <!-- End Reclassity Drawer -->

    <!-- Deactive Drawer -->
    <Drawer :size="40" :visible="deactivateItemDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">
          Deactivate Inventory Item
        </p>
      </div>

      <div slot="body">
        <div class="p-3 bg-cloudenly-success-mid rounded-lg">
          <p>Deactivate Inventory Item.</p>
        </div>
        <hr />

        <div class="container">
          <div class="md:flex md:items-center mb-3">
            <div class="md:w-1/3">
              <label class="block mb-1 md:mb-0" for="inline-full-name"
                >Quantity</label
              >
            </div>
            <div class="md:w-2/3">
              <vs-input v-model="quantity" class="w-full" />
            </div>
          </div>

          <div class="md:flex md:items-center mb-3">
            <div class="md:w-1/3">
              <label class="block mb-1 md:mb-0" for="inline-full-name"
                >Reason</label
              >
            </div>
            <div class="md:w-2/3">
              <vs-input v-model="reason" class="w-full" />
            </div>
          </div>

          <div class="md:flex md:items-center mb-3">
            <div class="md:w-1/3">
              <label class="block mb-1 md:mb-0" for="inline-full-name"
                >Comment</label
              >
            </div>
            <div class="md:w-2/3">
              <textarea
                v-model="comment"
                class="py-2 px-1 border border-solid border-grey w-full rounded"
              />
            </div>
          </div>
        </div>

        <div class="mt-10 flex items-center justify-center">
          <button
            @click="deactivateItem"
            class="px-4 py-2 border-none bg-cloudenly-primary-main text-white hover:text-white cursor-pointer"
          >
            Save Setup
          </button>
        </div>
      </div>
    </Drawer>
    <!-- End Deactive Drawer -->

    <div class="px-3 py-10 bg-white">
      <div class="flex items-center">
        <div class="w-1/3">
          <input
            placeholder="Search Inventory..."
            class="py-4 px-5 bg-gray-200 rounded-full w-full"
          />
        </div>
        <div class="w-1/3 mr-5"></div>

        <div class="w-1/3 text-right">
          <p
            v-if="
              getIsAccOwner || getStockBalancePrivileges.viewInventoryRegister
            "
            class="font-normal"
          >
            Total Value ( {{ currentTab.name }} ):
            <span class="font-semibold">
              {{ getOtherInventoryData.totalInventoryValue | currency }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="getIsAccOwner || getStockBalancePrivileges.viewInventoryRegister"
    >
      <div
        id="div-with-loading"
        class="vs-con-loading__container mt-2 bg-white"
      >
        <div v-if="getTotalInventory.length > 0">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Name
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Description
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Category
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Opening Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Issued Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Added Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Stock Balance
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Reorder Level
                </th>

                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Total (₦)
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border border-solid border-grey-light border-r-0 border-l-0"
                v-for="(inventory, index) in getTotalInventory"
                :key="index"
                @click="setInventoryId(inventory)"
              >
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.variant.variantName }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.variant.item.description }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.variant.item.category.name }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.openingStock }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.issuedStock }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.addedStock }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.stockBalance }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.inventory.reorderLevel }}
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ inventory.remainingInventoryValue | formatCurrency }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="ChevronDownIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openAddStockDrawer(inventory)"
                        >
                          <span class="ml-2">Add Stock</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openIssueStockModal(inventory)"
                        >
                          <span class="ml-2">Issue Stock</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openReorderLevelModal(inventory)"
                        >
                          <span class="ml-2">Reorder Level</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openReclassify(inventory)"
                        >
                          <span class="ml-2">Reclassify Item</span>
                        </li>

                        <!-- <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openRemoveItemModal(inventory)"
                        >
                          <span class="ml-2">Remove Stock</span>
                        </li> -->

                        <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="openDeactive(inventory)"
                      >
                        
                        <span class="ml-2">Deactivate Stock</span>
                      </li> -->

                        <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      >
                        
                        <span class="ml-2">Stock Movement</span>
                      </li> -->
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Name
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Description
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Category
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Opening Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Issued Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Added Stock
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Stock Balance
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Reorder Level
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Total (₦)
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
          </table>

          <div class="flex mt-5">
            <div class="mx-auto">
              <img
                src="../../../../../assets/images/optimaAsset/product.svg"
                alt
              />
              <p class="mt-5 font-semibold text-cloudenly-primary-main">
                You don't have any items in this inventory class
              </p>
            </div>
          </div>
        </div>

        <!-- Pagination section -->
        <div
          class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
        >
          <div class="flex items-center">
            <p class="mr-2">Show :</p>
            <select name class="border mr-2" id>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>

          <div class="flex items-center">
            <p class="mr-2">Show</p>
            <select name class="border mr-2" id>
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
import Drawer from "../../../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Drawer,
    Datepicker,
  },

  props: {
    currentTab: Object,
  },
  data() {
    return {
      mainInventoryId: "",
      inventoryId: "",
      addStockDrawer: false,
      issueStockModal: false,
      reOrderLevelModal: false,
      removeItemModal: false,
      reclassifyDrawer: false,
      deactivateItemDrawer: false,
      quantity: "",
      id: "",
      reason: "",
      comment: "",
      inventoryTypeId: "",

      addingStockData: {
        addedStock: 0,
        purchasePrice: 0,
        expiryDate: "",
        batchNo: "",
      },

      addButton: false,
    };
  },

  methods: {
    setInventoryId(e) {
      // this.inventoryId = e.inventory.id
      this.mainInventoryId = e.inventory.id;
      // console.log(e.inventory.id)
      // console.log(this.id)
    },

    onChangeInventoryType() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        id: this.currentTab.id,
        userInfo: userInfo,
      };
      this.$store
        .dispatch("inventory/stock/getOtherInventoryItem", data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openAddStockDrawer(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges.addInventoryItem === true
      ) {
        this.id = val.inventory.id;
        (this.addingStockData = {
          addedStock: 0,
          purchasePrice: 0,
          expiryDate: "",
          batchNo: "",
        }),
          (this.addStockDrawer = true);
      } else {
        this.$vs.notify({
          title: "Inventory Item",
          text: "You Don't have privilege to perform this action",
          color: "danger  ",
          position: "top-right",
        });
      }
    },

    addToStock() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.id,
          addedStock: this.addingStockData.addedStock,
          purchasePrice: this.addingStockData.purchasePrice,
          expiryDate: this.addingStockData.expiryDate,
          batchNo: this.addingStockData.batchNo,
        },
      };
      this.$store
        .dispatch("inventory/stock/addtoStock", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.addStockDrawer = false;
          this.onChangeInventoryType();
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger  ",
            position: "top-right",
          });
        });
    },

    openIssueStockModal(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges.addInventoryItem === true
      ) {
        this.id = val.inventory.id;
        this.issueStockModal = true;
      } else {
        this.$vs.notify({
          title: "Inventory Item",
          text: "You Don't have privilege to perform this action",
          color: "danger  ",
          position: "top-right",
        });
      }
    },

    issueStock() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.id,
          issuedStock: this.quantity,
        },
      };

      this.$store
        .dispatch("inventory/stock/issueStock", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.issueStockModal = false;
          this.onChangeInventoryType();
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger  ",
            position: "top-right",
          });
        });
    },

    openReorderLevelModal(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges.addInventoryItem === true
      ) {
        this.id = val.inventory.id;
        this.reOrderLevelModal = true;
      } else {
        this.$vs.notify({
          title: "Inventory Item",
          text: "You Don't have privilege to perform this action",
          color: "danger  ",
          position: "top-right",
        });
      }
    },

    setReOrderLevel() {
      let userInfo = this.$store.state.auth.auth.authData;
      //
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.id,
          reorderLevel: this.quantity,
        },
      };
      this.$store
        .dispatch("inventory/stock/setReoderLevel", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Inventory Item",
            text: "Reorder level set successfully",
            color: "primary",
            position: "top-right",
          });
          this.reOrderLevelModal = false;
          this.onChangeInventoryType();
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Inventory Item",
            text: "Reorder level error",
            color: "danger  ",
            position: "top-right",
          });
        });
    },

    openRemoveItemModal(val) {
      console.log(val);
      this.id = val.inventory.id;
      this.removeItemModal = true;
    },

    removeInventory() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.id,
          isRemoved: true,
          reason: this.reason,
          comment: this.comment,
        },
      };
      this.$store
        .dispatch("inventory/stock/removeInventoryItem", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.removeItemModal = false;
          this.onChangeInventoryType();
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger  ",
            position: "top-right",
          });
        });
    },

    close() {
      this.reclassifyDrawer = false;
      this.deactivateItemDrawer = false;
      this.addStockDrawer = false;
    },

    openReclassify(val) {
      this.id = val.id;
      this.reclassifyDrawer = true;
    },

    reclassifyItem() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryTypeId: this.inventoryTypeId,
          // inventoryId: this.id,
          inventoryId: this.mainInventoryId,
        },
      };

      this.$store
        .dispatch("inventory/stock/reclassifyItem", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.close();
          this.onChangeInventoryType();
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    closeDeactive() {
      this.deactivateItemDrawer = false;
    },

    openDeactive(val) {
      this.id = val.id;
      this.deactivateItemDrawer = true;
    },

    deactivateItem() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.id,
          isActivated: false,
          quantity: this.quantity,
          reason: this.reason,
          comment: this.comment,
        },
      };
      this.$store
        .dispatch("inventory/stock/deactiveItem", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.closeDeactive();
          this.onChangeInventoryType();
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("inventory/stock", [
      "getisOutetInventorySetup",
      "getAssignInventoryClass",
      "getInventoryType",
      "getOtherInventoryData",
      "getCurrentOutletInventories"
    ]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getStockBalancePrivileges"]),

    calTotalHoldingInventory() {
      let totalOtherInventoryValue = 0;
      this.getOtherInventoryData;
      for (let index = 0; index < this.getOtherInventoryData.length; index++) {
        totalOtherInventoryValue =
          totalOtherInventoryValue +
          this.getOtherInventoryData[index].remainingInventoryValue;
      }
      return totalOtherInventoryValue;
    },

    getTotalInventory() {
      let inventory = this.getOtherInventoryData.result.map((resp) => {
        return resp.total;
      });
      return inventory;
    },
  },

  async mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    let data = {
      id: this.currentTab.id,
      userInfo: userInfo,
    };

    // eslint-disable-next-line vue/no-async-in-computed-properties
    await this.$store
      .dispatch("inventory/stock/getOtherInventoryItem", data)
      .then((resp) => {
        // console.log(resp)
        if (resp.data) {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        }
      })
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        this.$vs.notify({
          title: "Inventory Type Error",
          position: "top-right",
          color: "danger",
          text: err.response.data.message,
          fixed: false,
        });
      });

    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 1,
    // });

    // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>
<style scoped>
</style>
 