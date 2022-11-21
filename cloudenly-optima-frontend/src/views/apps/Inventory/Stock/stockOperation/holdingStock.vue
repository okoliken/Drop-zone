<template>
  <div class>
    <!-- Storage Info Modal -->
    <s-modal :modal="storageInfoModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Storage Info
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <s-text
          label="Location:"
          :width="400"
          class="mb-8"
          placeholder="-- Autofilled --"
          disabled
        />
        <s-text
          label="Building #:"
          :width="400"
          class="mb-8"
          placeholder="-- Enter --"
        />
        <s-text
          label="Room #:"
          :width="400"
          class="mb-8"
          placeholder="-- Enter --"
        />
        <s-text
          label="Shelf #:"
          :width="400"
          class="mb-8"
          placeholder="-- Enter --"
           v-model="shelf"
        />
        <s-text
          label="Rack #:"
          :width="400"
          class="mb-8"
          placeholder="-- Enter --"
           v-model="rack"
        />
        <s-text
          label="Bin #:"
          :width="400"
          class="mb-8"
          placeholder="-- Enter --"
           v-model="bin"
        />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button  @click="updateInventoryItem" class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>

    <!-- Allocate Stock Modal -->
    <s-modal :modal="AllocateStockModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-2">
          <h1 class="font-semibold capitalize">
            Allocate Stock
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <s-text
          label="Item Name:"
          :width="400"
          class="mb-2"
          :placeholder="inventoryData.name"
          disabled
        />
        <s-text
          label="Item Code:"
          :width="400"
          class="mb-2"
          :placeholder="inventoryData.variantCode"
          disabled
        />
        <s-text
          label="Available Quantity:"
          :width="400"
          class="mb-2"
          placeholder="-- Autofilled --"
          disabled
        />
        <s-text
          label="Quantity to Allocate:"
          :width="400"
          class="my-2"
          v-model="quantityInput"
          placeholder="-- Enter --"
        />
        <p class="my-2">Inventory category:</p>

        <select
          v-model="allocateHash"
          class="py-2 px-2 border border-solid border-2 w-full border-gray-300 rounded-md"
          name
          id
        >
          <option
            v-for="(inventType, index) in getCurrentOutletInventories"
            :key="index"
            :value="inventType.id"
          >
            {{ inventType.name }}
          </option>
        </select>
        <h3 class="mx-auto mt-2 mb-2">New Storage Information (optional) ------</h3>
        <s-text
          label="Building #:"
          :width="400"
          class="mb-2"
          placeholder="-- Enter --"
        />
        <s-text
          label="Room #:"
          :width="400"
          class="mb-2"
          placeholder="-- Enter --"
        />
        <s-text
          label="Shelf #:"
          :width="400"
          class="mb-2"
          placeholder="-- Enter --"
  />
        <s-text
          label="Rack #:"
          :width="400"
          class="mb-2"
          placeholder="-- Enter --"
        />
        <s-text
          label="Bin #:"
          :width="400"
          class="mb-2"
          placeholder="-- Enter --"
        />

        <s-content-seperator class="my-4" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button @click="allocateToInventoryClass" class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Deactivate Item Modal -->
    <s-modal :modal="DeactivateItemModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Deactivate Item
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <s-text
          label="Item Name:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.name"
          disabled
        />
        <s-text
          label="Item Code:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.variantCode"
          disabled
        />
        <s-text
          label="Brand:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.brandName"
          disabled
        />
        <s-text
          label="UofM:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.uofm"
          disabled
        />
        <s-select
          label="Batch #:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />

        <s-text
          label="Expiry Date:"
          :width="400"
          class="mb-4"
          placeholder="-- Autoloaded --"
        />
        <s-text
          label="Supply Quantity:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-text
          label="Available Quantity:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-text
          label="Reason for Deactivation:"
          :width="400"
          :height="100"
          class="mb-4"
        />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Withdrawal Item Modal -->
    <s-modal :modal="withdrawalItemModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Withdraw Item
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <s-text
          label="Item Name:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.name"
          disabled
        />
        <s-text
          label="Item Code:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.variantCode"
          disabled
        />
        <s-text
          label="Brand:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.brandName"
          disabled
        />
        <s-text
          label="UofM:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.uofm"
          disabled
        />
        <s-text
          label="Batch #:"
          :width="400"
          class="mb-4"
          placeholder="-- Autoloaded --"
        />

        <s-text
          label="Expiry Date:"
          :width="400"
          class="mb-4"
          placeholder="-- Autoloaded --"
        />
        <s-text
          label="Available Quantity:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-text
          label="Quantity to Withdraw:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-select label="Reason for Deactivation:" :width="400" class="mb-4" />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Withdrawal Instruction Modal -->
    <s-modal :modal="withdrawalInstructionModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Withdrawal Instruction
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <s-text
          label="Item Name:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.name"
          disabled
        />
        <s-text
          label="Item Code:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.variantCode"
          disabled
        />
        <s-text
          label="Brand:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.brandName"
          disabled
        />
        <s-text
          label="UofM:"
          :width="400"
          class="mb-4"
          :placeholder="inventoryData.uofm"
          disabled
        />
        <s-text
          label="Batch #:"
          :width="400"
          class="mb-4"
          placeholder="-- Autoloaded --"
        />

        <s-text
          label="Expiry Date:"
          :width="400"
          class="mb-4"
          placeholder="-- Autoloaded --"
        />
        <s-text
          label="Supply Quantity:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-text
          label="Available Quantity:"
          :width="400"
          class="mb-4"
          placeholder="-- Enter --"
        />
        <s-select label="Reason for Withdrawal:" :width="400" class="mb-4" />

        <s-text
          :width="400"
          class="mb-4"
          placeholder="Notifications will be sent to all locations & categories"
          disabled
        />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Batch Info Modal -->
    <s-modal :modal="batchInfoModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 950px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Batch Info
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <div class=" bg-gray-200 p-4 rounded-md">
          <div class="flex justify-between mb-2">
            <p>Item Code:</p>
            <p>{{ inventoryData.variantCode }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>Item Name:</p>
            <p>{{ inventoryData.name }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>Brand:</p>
            <p>{{ inventoryData.brandName }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>UofM:</p>
            <p>{{ inventoryData.uofm }}</p>
            
          </div>
        </div>
        <div class="mt-4">
          <table class="w-full">
            <thead class="w-full">
              <tr class="bg-gray-200">
                <th class="px-6 py-4">Batch #</th>
                <th class="px-6 py-4">Expiry Date</th>
                <th class="px-6 py-4">Supplier</th>
                <th class="px-6 py-4">Supplier Date</th>
                <th class="px-6 py-4">Supply Qty</th>
                <th class="px-6 py-4">Balance</th>
                <th class="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-l-2 border-gray-200  px-6 py-4"
                >
                  <s-text :width="80" v-if="batchInfo" :placeholder="batchInfo.number" />
                </td>
                <td
                  class="px-4 border-b-2 border-r-2 border-l-2 border-gray-200  py-4"
                >
                  <s-text :width="100" v-if="batchInfo" :placeholder=" batchInfo.expiryDate | null" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" v-if="batchInfo" v-model="accountingYear" :placeholder="batchInfo.accountingYear" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" v-if="batchInfo" v-model="batchQuantity" :placeholder="batchInfo.quantity" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
              
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-select :width="100" v-model="batchStatus" :options="batchStatusList" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button @click="updateBatchInfo" class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Allocate stock bulk Modal -->
    <s-modal :modal="allocateStockBulkModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 950px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Allocate Stock
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <div class="mt-4">
          <s-select :width="900" label="Inventory Category" />
        </div>

        <div class="mt-4">
          <table class="w-full">
            <thead class="w-full">
              <tr class="bg-gray-200">
                <th class="px-6 py-4">Batch #</th>
                <th class="px-6 py-4">Expiry Date</th>
                <th class="px-6 py-4">Supplier</th>
                <th class="px-6 py-4">Supplier Date</th>
                <th class="px-6 py-4">Supply Qty</th>
                <th class="px-6 py-4">Balance</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr v-for="n in 2" :key="n.id">
                <td
                  class="border-b-2 border-r-2 border-l-2 border-gray-200  px-6 py-4"
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 border-b-2 border-r-2 border-l-2 border-gray-200  py-4"
                >
                  <s-text :width="100" placeholder="21-03-2019" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-select :width="80" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- Supply Info Modal -->
    <s-modal :modal="supplyInfoModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 950px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Supply Info
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <!-- {{supplyInfo}} -->
        <div class="flex  w-full">
          <div class=" bg-gray-200 p-4 w-1/2 mr-2 rounded-md">
            <div class="flex justify-between mb-4">
              <p>Item Code:</p>
              <p>{{ inventoryData.variantCode }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Item Name:</p>
              <p>{{ inventoryData.name }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Brand:</p>
              <p>{{ inventoryData.brandName }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>UofM:</p>
              <p>{{ inventoryData.uofm }}</p>
            </div>
          </div>
          <div class=" bg-gray-200 p-4 rounded-md w-1/2">
            <div class="flex justify-between mb-4">
              <p>Total Available stock:</p>
              <p>------</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Inventory Value:</p>
              <p>{{ inventoryData.value }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Inventory Unit Cost:</p>
              <!-- <p>{{ supplyInfo.unitCost }}</p> -->
            </div>
            <div class="flex justify-between mb-4">
              <!-- <p>UofM: </p>
          <p>Team Lead</p> -->
            </div>
          </div>
        </div>
        <div class="mt-4">
          <table class="w-full">
            <thead class="w-full">
              <tr class="bg-gray-200">
                <th class="px-6 py-4">Supplier Date</th>
                <th class="px-6 py-4">Supply Qty</th>
                <th class="px-6 py-4">Unit Cost</th>
                <th class="px-6 py-4">Supplier</th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr>
                <td
                  class="px-4 border-b-2 border-r-2 border-l-2 border-gray-200  py-4"
                >
                  <!-- <s-text :width="100" :placeholder="supplyInfo.createdAt" /> -->
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <!-- <s-text :width="80" :placeholder="supplyInfo.quantity" /> -->
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <!-- <s-text :width="80" :placeholder="supplyInfo.unitCost" /> -->
                </td>
                <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td>
                <!-- <td
                  class="px-4 py-4 border-b-2 border-r-2 border-l-2 border-gray-200 "
                >
                  <s-text :width="80" placeholder="---" />
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Save
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- View Info Modal -->
    <s-modal :modal="viewInfoModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 950px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            View Stock Balance
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <div class="flex  w-full">
          <div class=" bg-gray-200 p-4 w-1/2 mr-2 rounded-md">
            <div class="flex justify-between mb-4">
              <p>Inventory Name:</p>
              <p>{{ inventoryData.name }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Brand:</p>
              <p>{{ inventoryData.brandName }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Category:</p>
              <p>{{ inventoryData.itemCategory }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>UofM:</p>
              <p>{{ inventoryData.uofm }}</p>
            </div>
          </div>
          <div class=" bg-gray-200 p-4 rounded-md w-1/2">
            <div class="flex justify-between mb-4">
              <p>Item Code:</p>
              <p>{{ inventoryData.variantCode }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Variant Info:</p>
              <p>{{ inventoryData.variantInfo }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Balance:</p>
              <p>{{ inventoryData.stockbalance }}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p>Value (₦):</p>
              <p>{{ inventoryData.value }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h1 class="font-semibold capitalize">
            Description
          </h1>
          <p class="mt-2 leading-6">
            {{ inventoryData.description }}
          </p>
        </div>
        <s-content-seperator class="my-8" />
      </div>
    </s-modal>
    <!-- check availabilty modal -->
    <s-modal :modal="checkAvailabilityModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 450px; font-size: 14px;"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">
            Check Availability
          </h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>

        <div class=" bg-gray-200 p-4 rounded-md">
          <div class="flex justify-between mb-2">
            <p>Item Code:</p>
            <p>{{ inventoryData.variantCode }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>Item Name:</p>
            <div>{{ inventoryData.name }}</div>
          </div>
          <div class="flex justify-between mb-2">
            <p>Brand:</p>
            <p>{{ inventoryData.brandName }}</p>
          </div>
          <div class="flex justify-between mb-2">
            <p>UofM:</p>
            <p>{{ inventoryData.uofm }}</p>
          </div>
        </div>

        <div class="bg-gray-200 p-4 rounded-md mt-2">
          <div class="bg-white p-2">
            <div class="inline-flex">
              <div>
                <img
                  :src="require('@/assets/images/optimaAsset/location.svg')"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="ml-2">
                <p class="mb-2">Ikeja</p>
                <p>300 Packs N100/Pack</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-200 p-4 rounded-md mt-2">
          <div class="bg-white p-2">
            <div class="inline-flex">
              <div>
                <img
                  :src="require('@/assets/images/optimaAsset/location.svg')"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="ml-2">
                <p class="mb-2">Victoria Island</p>
                <p>102 Packs N100/Pack</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-200 p-4 rounded-md mt-2">
          <div class="bg-white p-2">
            <div class="inline-flex">
              <div>
                <img
                  :src="require('@/assets/images/optimaAsset/location.svg')"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="ml-2">
                <p class="mb-2">Lekki</p>
                <!-- {{checkAvailability}} -->
                <p>14 Packs N98/Pack</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </s-modal>
    <!-- Edit Item Section -->
    <Drawer :size="50" :visible="editDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h1 class>Edit Inventory Item</h1>
      </div>

      <div slot="body">
        <div class="border border-solid border-grey-lighter">
          <div class="py-3 px-3 bg-grey-lighter">
            <h2 class="mb-0">Item Information</h2>
          </div>

          <div class="py-3 px-3">
            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Variant Name</label>
                  <input
                    disabled
                    v-model="itemName.name"
                    type="text"
                    class="py-1 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Variant SKU</label>
                  <input
                    disabled
                    v-model="itemName.sku"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-solid border-grey-lighter">
          <div class="py-3 px-3 bg-grey-lighter">
            <h2 class="mb-0">Inventory Operation and Management Information</h2>
          </div>

          <div class="py-3 px-3">
            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Opening Stock</label>
                  <input
                    v-model="itemData.openingStock"
                    type="text"
                    readonly
                    disabled
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Reorder Level</label>
                  <input
                    v-model="itemData.reorderLevel"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Valuation Method</label>
                  <select
                    v-model="itemData.valuationMethod"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                  >
                    <option value="lifo">LIFO</option>
                    <option value="fifo">FIFO</option>
                    <option value="weightedAverage">Weighted Average</option>
                  </select>
                </div>
              </div>

              <div class="col-3"></div>
            </div>
          </div>
        </div>

        <div class="border border-solid border-grey-lighter">
          <div class="py-3 px-3 bg-grey-lighter">
            <h2 class="mb-0">Inventory Handling Information</h2>
          </div>

          <div class="py-3 px-3">
            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Item Dimension (LxWxH)</label>
                  <input
                    v-model="itemData.itemDimension"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for="exampleInputtext1">Item Weight</label>

                  <div class="flex items-center">
                    <div class="w-full">
                      <input
                        v-model="itemData.itemWeight"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                        id
                        aria-describedby="emailHelp"
                        placeholder
                      />
                    </div>

                    <div>
                      <select
                        name
                        id
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                      >
                        <option value="kg">kg</option>
                        <option value="gram">Gram</option>
                        <option value="Ouce">Pound</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Batch Number</label>
                  <input
                    v-model="itemData.batchNo"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Expiry Date</label>

                  <datepicker
                    v-model="itemData.expiryDate"
                    input-class="w-full"
                    placeholder="Select Date"
                  ></datepicker>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Package Number</label>
                  <input
                    v-model="itemData.packageNumber"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Package Dimensions (LxWxH)</label>
                  <div class="flex items-center">
                    <div class="w-full">
                      <input
                        v-model="itemData.packageDimension"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                        id
                        aria-describedby="emailHelp"
                        placeholder
                      />
                    </div>

                    <div>
                      <select
                        name
                        id
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                      >
                        <option value="kg">CM</option>
                        <option value="gram">MM</option>
                        <option value="Ouce">M</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Package Weight</label>

                  <div class="flex items-center">
                    <div class="w-full">
                      <input
                        v-model="itemData.packageWeight"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                        id
                        aria-describedby="emailHelp"
                        placeholder
                      />
                    </div>

                    <div>
                      <select
                        name
                        id
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                      >
                        <option value="kg">kg</option>
                        <option value="gram">Gram</option>
                        <option value="Ouce">Pound</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Item Qty. Per Package</label>
                  <input
                    v-model="itemData.itemQuantityPerPackage"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Pallet Number</label>
                  <input
                    v-model="itemData.palletNumber"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Pallet Dimension (LxWxH)</label>
                  <!-- <input v-model="itemData.palletWeight" type="text" class="py-2 px-2 border border-gray-400 rounded w-full" id=""
                  aria-describedby="emailHelp" placeholder="">-->

                  <div class="flex items-center">
                    <div class="w-full">
                      <input
                        v-model="itemData.palletDimension"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                        id
                        aria-describedby="emailHelp"
                        placeholder
                      />
                    </div>

                    <div>
                      <select
                        name
                        id
                        class="py-2 px-2 border border-gray-400 rounded w-full"
                      >
                        <option value="kg">CM</option>
                        <option value="gram">MM</option>
                        <option value="Ouce">M</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-solid border-grey-lighter">
          <div class="py-3 px-3 bg-grey-lighter">
            <h2 class="mb-0">Product Pack Sizes</h2>
          </div>

          <div class="py-3 px-3">
            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Pack Size Label</label>
                  <input
                    v-model="itemData.packSizeLabel"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Pack Size Quantity</label>
                  <input
                    v-model="itemData.packQuantity"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-solid border-grey-lighter">
          <div class="py-3 px-3 bg-grey-lighter">
            <h2 class="mb-0">Storage Information</h2>
          </div>

          <div class="py-3 px-3">
            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>BIN #</label>
                  <input
                    v-model="itemData.bin"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Rack #</label>
                  <input
                    v-model="itemData.rack"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Shelf #</label>
                  <input
                    v-model="itemData.shelf"
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>

              <div class="col-6">
                <div class>
                  <label for>Room</label>
                  <input
                    type="text"
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    id
                    aria-describedby="emailHelp"
                    placeholder
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class>
                  <label for>Warehouse</label>
                  <select
                    class="py-2 px-2 border border-gray-400 rounded w-full"
                    name
                    id
                  ></select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer">
        <div class="mt-5 mb-5 flex items-center justify-center">
          <button
            :disabled="updateItemButton"
            :class="{
              'cursor-not-allowed': updateItemButton,
              'bg-cloudenly-primary-mid': updateItemButton
            }"
            @click="updateInventoryItem"
            class="bg-cloudenly-primary-main px-10 py-3 border-none l rounded text-white hover:text-white cursor-pointer"
          >
            Update Item
          </button>
        </div>
      </div>
    </Drawer>
    <!-- End Edit Item Section -->

    <!-- Assign Inventory Item to Other Inventory Class -->
    <vs-popup
      class
      title="Allocate Inventory Item"
      :active.sync="allocateToInventoryClassModal"
    >
      <div class>
        <div class>
          <div class="p-5">
            <div class="">
              <p class="text-lg font-semibold mb-2">
                Holding Item Name: {{ inventoryData.name }}
              </p>
              <br />
              <p class="text-lg">
                Holding Item Quantity (Stock Balance) : {{ tempStockBalance }}
              </p>
            </div>
            <div class="mt-10">
              <div>
                <p class="text-xl font-semibold">Allocate Item</p>
              </div>
              <div class="mt-5">
                <div class="container">
                  <div v-if="getCurrentOutletInventories.length === 0" class>
                    <div class="shadow p-5">
                      <h2 class="mb-0">
                        You have not assign any inventory class to this outlet.
                        refer to inventory setting to assign inventory class
                      </h2>
                    </div>
                  </div>

                  <div v-else>
                    <div class="row no-gutters mb-5">
                      <label
                        for="example-text-input"
                        class="col-4 col-form-label mb-5"
                      >
                        <p class="font-bold mb-5">Select Inventory Class</p>
                      </label>
                      <div class="col-6">
                        <select
                          v-model="allocateHash"
                          class="py-2 px-2 border border-solid border-2 border-gray-400 w-full"
                          name
                          id
                        >
                          <option
                            v-for="(inventType,
                            index) in getCurrentOutletInventories"
                            :key="index"
                            :value="inventType.id"
                          >
                            {{ inventType.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div
                      v-if="inventoryData.stockBalance > 0"
                      class="row no-gutters"
                    >
                      <label
                        for="example-text-input"
                        class="col-4 col-form-label mb-5"
                      >
                        <p class="font-bold mb-5">Quantity to Allocate</p>
                      </label>
                      <div class="col-6">
                        <input
                          @keyup="calcHoldingStockBalance"
                          v-model="quantityInput"
                          class="py-2 px-2 border border-solid border-2 border-gray-400 w-full"
                          type="text"
                          id="example-text-input"
                        />
                      </div>
                    </div>

                    <div v-else>
                      <div class="row no-gutters">
                        <label
                          for="example-text-input"
                          class="col-4 col-form-label"
                        >
                          <h5>Allocate Manually</h5>
                        </label>
                        <div class="col-6">
                          <input
                            v-model="quantityInput"
                            class="py-2 px-1 border border-solid border-grey w-full rounded"
                            type="text"
                            id="example-text-input"
                          />
                        </div>
                      </div>
                    </div>

                    <vs-divider />

                    <div class="text-center">
                      <div class="center">
                        <button
                          class="px-5 py-3 text-lg bg-cloudenly-primary-main border-none cursor-pointer text-white rounded"
                          @click="allocateToInventoryClass"
                        >
                          Allocate Item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
    <!-- End Section -->

    <!-- Assign inventory Item to Outlet -->
    <vs-popup
      class
      title="Allocate Inventory Item to Outlet"
      :active.sync="locationModal"
    >
      <div class>
        <p class="text-lg">Holding Item Name: {{ inventoryData.name }}</p>
        <p class="text-lg mt-5">
          Holding Item Quantity(Stock Balance) :
          {{ inventoryData.stockBalance }}
        </p>
        <vs-divider></vs-divider>

        <div v-if="getOptimaOutlet.length === 1">
          <div class="shadow py-5">
            <h2 class="mb-0">
              You don't have any outlet created. Create one in outlet setting
            </h2>
          </div>
        </div>

        <div v-else class="mx-5">
          <div class="row mt-10">
            <label for class="col-4">
              <p class=" mb-5">Select Location:</p>
            </label>

            <div class="col-sm-8">
              <select
                v-model="outletId"
                class="py-1 px-1 border border-2 border-gray-400 w-full rounded"
                name
                id
              >
                <option
                  v-for="(outlet, index) in allOutletData"
                  :key="index"
                  :value="outlet.id"
                >
                  {{ outlet.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mt-16">
            <label for class="col-4">
              <p class="mb-5">Quantity :</p>
            </label>
            <div class="col-sm-8">
              <input
                v-model="quantity"
                type="text"
                placeholder="Enter Stock Quantity"
                class="py-2 px-2 border border-gray-400 border-2 w-full rounded"
                name
                id
              />
            </div>
          </div>

          <div class="flex justify-center mt-16">
            <button
              @click="allocateToOtherOutlet"
              type="button"
              class="px-5 py-3 rounded border-0 cursor-pointer bg-cloudenly-primary-main text-white"
            >
              Transfer to Outlet
            </button>
          </div>
        </div>
      </div>
    </vs-popup>
    <!-- End Section -->

    <!--  Add to Stock Section -->
    <Drawer :size="50" :visible="addStockDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Add Stock</p>
      </div>

      <div slot="body">
        <div class="py-10">
          <div class=" flex items-center justify-center w-full mb-8">
            <label for="" class=" mr-5">
              <h5>Quantity to Add</h5>
            </label>
            <div class="w-1/2">
              <input
                v-model="addingStockData.addedStock"
                class="py-2 px-1 border border-2 border-solid border-gray-400 w-full rounded"
                type="text"
                id=""
              />
            </div>
          </div>

          <div class="flex items-center justify-center w-full mb-8">
            <label for="" class=" mr-5">
              <h5>Purchase Price</h5>
            </label>
            <div class="w-1/2">
              <input
                v-model="addingStockData.purchasePrice"
                class="py-2 px-1 border border-solid border-2 border-gray-400 w-full rounded"
                type="text"
                id=""
              />
            </div>
          </div>

          <div class="flex items-center justify-center w-full mb-8">
            <label for="" class=" mr-5">
              <h5 class=" mb-5">Expiry Date</h5>
            </label>
            <div class="w-1/2">
              <div class="w-full">
                <datepicker
                  v-model="addingStockData.expiryDate"
                  input-class="w-full border-2 "
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center w-full mb-8">
            <label for="" class="mr-5">
              <h5>Batch No.</h5>
            </label>
            <div class="w-1/2">
              <input
                v-model="addingStockData.batchNo"
                class="py-2 px-1 border border-solid border-gray-400 border-2  w-full rounded"
                type="text"
                id=""
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              @click="addStock"
              :disabled="addButton"
              :class="{
                'cursor-not-allowed': addButton,
                'bg-cloudenly-primary-mid': addButton
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

    <!-- Stock Movement Drawer-->
    <Drawer :size="60" :visible="stockMovementDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Stock Movement</p>
      </div>

      <div slot="body"></div>
    </Drawer>
    <!-- End Stock Mo -->

    <div class="py-10 px-3 bg-white mb-2">
      <div class="flex justify-between">
        <s-combo-box />
        <s-select :width="300" />
      </div>
    </div>

    <div class="py-4 px-3 bg-white">
      <div class="flex justify-between">
        <div class="inline-flex">
          <s-text type="date" class="mr-3" :width="250" />
          <s-text type="date" :width="250" />
        </div>
        <div>
          <drop-down v-show="showAction">
            <div slot="title">
              <button
                class="flex bg-transparent  text-cloudenly-primary-main font-semibold  py-2 px-4"
                style="border:red 5px;"
              >
                Bulk Actions
                <feather-icon
                  icon="ChevronDownIcon"
                  svgClasses="w-5 h-5"
                ></feather-icon>
              </button>
            </div>

            <div slot="body">
              <div class="bg-white w-48">
                <ul>
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="openAllocateStockBulkModal"
                  >
                    Allocate to stock
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="materialRequest"
                  >
                    Material Request
                  </li>
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="materialReturn"
                  >
                    Material Return
                  </li>
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="waybill"
                  >
                    Waybill
                  </li>
                </ul>
              </div>
            </div>
          </drop-down>
        </div>
      </div>
    </div>

    <!-- <p
            v-if="
              getIsAccOwner || getStockBalancePrivileges.viewInventoryRegister
            "
            class="font-normal"
          >
            Total Value(Holding Inventory) :
            <span class="font-semibold">{{
              calTotalHoldingInventory | currency
            }}</span>
          </p> -->

    <div
      v-if="getIsAccOwner || getStockBalancePrivileges.viewInventoryRegister"
    >
      <div class=" bg-white">
        <div class="overflow-x-auto overflow-scroll">
          <table
            class="table table-responsive w-full table-auto border-collapse"
          >
            <thead class="bg-gray-300">
              <tr>
                <th class="py-3 px-6 tracking-wider">
                  <s-checkbox @change="selectAll" v-model="allSelected" />
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Name
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Description
                </th>
                <!-- <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Category
                </th> -->
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Opening
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Issued
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Added
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Balanced
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Total(₦)
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border border-solid border-grey-light border-l-0 border-r-0"
                v-for="(inventory, index) in getHoldingInventory"
                :key="index"
                @click="setTheVariantId(inventory)"
              >
                <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
                  <s-checkbox
                    :value="inventory"
                    v-model="selectedItems"
                  ></s-checkbox>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ formatVariantName(inventory) }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ formatDescription(inventory) }}
                </td>
                <!-- <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ formatCat(inventory) }}
                </td> -->
                <!-- <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                {{ formatUnit(inventory)  || 'N/A'}}
              </td> -->
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ inventory.openingStock }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ inventory.issuedStock }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ inventory.addedStock }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ inventory.stockBalance }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  {{ inventory.remainingInventoryValue | formatCurrency }}
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border border-gray-200">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <!-- <ul style="min-width: 18rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="holdingDataCal(inventory)"
                        >
                          <span class="ml-2">Allocate to Inventory Class</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openTransferOutletModal(inventory)"
                        >
                          <span class="ml-2">Transfer Stock to Outlet</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="openAddStock(inventory)"
                        >
                          <span class="ml-2"> Add Stock </span>
                        </li>
                      </ul> -->
                      <ul style="min-width: 16rem">
                        <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Edit Items
                      </li> -->

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openViewInfoModal(inventory)"
                        >
                          View
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openBatchInfoModal(inventory)"
                        >
                          Batch Info
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openSupplyInfoModal(inventory)"
                        >
                          Supply Info
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openStorageInfoModal(inventory)"
                        >
                          Storage Info
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openCheckAvailabityModal(inventory)"
                        >
                          Check Availabilty
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openAllocateStockModal(inventory)"
                        >
                          Allocate Stock
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="materialRequest"
                        >
                          Material Request
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="materialReturn"
                        >
                          Material Return
                        </li>
                        <!-- <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Analytics
                      </li> -->
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openDeactivateItemModal(inventory)"
                        >
                          Deactivate
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openWithdrawInttructionModal(inventory)"
                        >
                          Withdrawal Instruction
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openWithdrawalItemModal(inventory)"
                        >
                          Withdrawal Item
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination section -->
        <div
          class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
        >
          <div class="flex items-center">
            <p class="mr-2">Show :</p>
            <select name class="py-1 mr-2" id>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <p>Per Page</p>
          </div>

          <div class="flex items-center">
            <p class="mr-2">Show</p>
            <select name class="py-1 mr-2" id>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Datepicker from "vuejs-datepicker";
import image_close from "@/assets/images/optimaAsset/shared/close-red.svg";

export default {
  components: {
    Drawer,
    VuePerfectScrollbar,
    Datepicker
  },
  data() {
    return {
      selectedItems: [],
      batchQuantity:"",
      batchStatus:"",
      accountingYear:"",
      image_close,
      storageInfoModal: false,
      AllocateStockModal: false,
      DeactivateItemModal: false,
      withdrawalItemModal: false,
      withdrawalInstructionModal: false,
      checkAvailabilityModal: false,
      batchInfoModal: false,
      supplyInfoModal: false,
      viewInfoModal: false,
      allocateStockBulkModal: false,
      showAction: false,
      addingStockData: {
        addedStock: 0,
        purchasePrice: 0,
        expiryDate: "",
        batchNo: ""
      },

      editDrawer: false,
      search: "",
      stockMovementDrawer: false,
      itemData: {},
      inventoryItemId: "",
      locationModal: false,
      addStockDrawer: false,
      quantity: 0,
      removeModal: false,
      transferModal: false,
      allocateToInventoryClassModal: false,

      allSelected: false,
      drawer: false,
      allInventorys: [],
      inventData: [],
      InvenTypeHash: "",
      toggleView: true,
      reoderStockModal: false,
      loader: true,
      holdingInventory: [],
      inventoryType: [],
      quantityInput: "",
      allocateHash: "",
      tempStockBalance: "",
      reorderLoader: true,
      userData: "",
      inventoryData: "",
      outletId: "",
      bin:'',
      rack:'',
      shelf:'',

      inventoryVariantId: "",
      allOutletData: [],

      updateItemButton: false,
      itemName: {
        name: "",
        sku: ""
      },

      batchStatusList: [
        { name: "Active", id: "active" },
        { name: "Depleted", id: "depleted" },
        { name: "Deactivated", id: "deactivated" },
        { name: "Withdrawn", id: "withdrawn" },
      ],
      addButton: false
    };
  },

  methods: {
    close() {
      this.editDrawer = false;
      this.stockMovementDrawer = false;
      this.addStockDrawer = false;
      this.editDrawer = false;
    },
    openStorageInfoModal(val) {
      this.storageInfoModal = true;
      this.inventoryData = {
        variantId: val.variant.id
      };
      console.log("I got here 2", data);
      let data = {
        variantId: val.variant.id
      };
      this.$store
        .dispatch("inventory/stock/getInventoryInfoStorage", data)
        .then(resp => {
          console.log(resp, "I got here 3");
        })
        .catch(err => {
          console.log(err, "I got here 4");
        });
    },
    handleClose() {
      this.storageInfoModal = false;
      this.AllocateStockModal = false;
      this.DeactivateItemModal = false;
      this.withdrawalItemModal = false;
      this.withdrawalInstructionModal = false;
      this.checkAvailabilityModal = false;
      this.batchInfoModal = false;
      this.supplyInfoModal = false;
      this.viewInfoModal = false;
      this.allocateStockBulkModal = false;
    },
    openAllocateStockModal(val) {
      this.AllocateStockModal = true;
      this.inventoryData = {
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        totalAvailable: val.variant.itemUnitOfMeasures[0].standardUom
      };
    },
    openDeactivateItemModal(val) {
      this.DeactivateItemModal = true;
       this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        brandName: val.variant.item.brand.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
    },
    openWithdrawalItemModal(val) {
      this.withdrawalItemModal = true;
       this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        brandName: val.variant.item.brand.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
    },
    openWithdrawInttructionModal(val) {
      this.withdrawalInstructionModal = true;
       this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        brandName: val.variant.item.brand.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
    },
    openCheckAvailabityModal(val) {
      this.checkAvailabilityModal = true;
      this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        brandName: val.variant.item.brand.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
      let data = {
        variantId: val.variant.id
      };
      this.$store
        .dispatch("inventory/stock/getAvailability", data)
        .then(resp => {
          console.log(resp, "I got here 3");
        })
        .catch(err => {
          console.log(err, "I got here 4");
        });
    },
    openBatchInfoModal(val) {
      this.batchInfoModal = true;
      this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        brandName: val.variant.item.brand.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
      let data = {
        variantId: val.variant.id
      };
      this.$store
        .dispatch("inventory/stock/getInventoryInfoBatch", data)
        .then(resp => {
          console.log(resp, "I got here 4");
        })
        .catch(err => {
          console.log(err, "I got here 5");
        });
    },
    openSupplyInfoModal(val) {
      this.supplyInfoModal = true;
      console.log("I got here 1");
      this.inventoryData = {
        variantId: val.variant.id,
        variantCode: val.variant.variantCode,
        name: val.variant.variantName,
        totalQuantitySupplied: val.variant.totalQuantitySupplied,
        brandName: val.variant.item.brand.name,
        value: val.variant.defaultSupplierPrice,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
      console.log("I got here 2", data);
      let data = {
        variantId: val.variant.id
      };
      this.$store
        .dispatch("inventory/stock/getInventoryInfoSupply", data)
        .then(resp => {
          console.log(resp.data, "I got here 3");
        })
        .catch(err => {
          console.log(err, "I got here 4");
        });
    },
    openViewInfoModal(val) {
      console.log(val, "hi");
      this.inventoryData = {
        name: val.variant.variantName,
        stockbalance: val.stockBalance,
        variantId: val.variant.id,
        variantInfo: val.variant.variantProperty[0].key,
        variantCode: val.variant.variantCode,
        value: val.variant.defaultSupplierPrice,
        brandName: val.variant.item.brand.name,
        description: val.variant.item.description,
        itemCategory: val.variant.item.category.name,
        uofm: val.variant.itemUnitOfMeasures[0].standardUom
      };
      console.log(val);
      console.log(this.inventoryData, "hi");

      this.viewInfoModal = true;
    },
    openAllocateStockBulkModal() {
      this.allocateStockBulkModal = true;
    },
    materialRequest() {
      this.$router.push({
        name: "MaterialRequest"
      });
    },
    materialReturn() {
      this.$router.push({
        name: "MaterialReturn"
      });
    },
    waybill() {
      this.$router.push({
        name: "Waybill"
      });
    },

    selectAll() {
      this.inventData = [];
      if (!this.allSelected) {
        this.holdingInventory.map(inventory => {
          this.inventData.push(inventory.itemHoldingInventory);
        });
      }
    },

    holdingDataCal(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges
          .addItemInHoldingInventoryToAnotherInventoryClass == true
      ) {
        this.inventoryData = {
          name: val.variant.variantName,
          stockBalance: val.stockBalance,
          variantId: val.variant.id,
          id: val.id
        };

        this.tempStockBalance = this.inventoryData.stockBalance;
        this.allocateToInventoryClassModal = true;
      } else {
        this.$vs.notify({
          title: "Inventory",
          text: "You don't have have privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    openTransferOutletModal(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges
          .addItemInHoldingInventoryToAnotherOutlet === true
      ) {
        this.inventoryData = {
          name: val.variant.variantName,
          stockBalance: val.stockBalance,
          variantId: val.variantId,
          id: val.id
        };
        this.locationModal = true;
      } else {
        this.$vs.notify({
          title: "Inventory",
          text: "You don't have have privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    openAddStock(val) {
      if (
        this.getIsAccOwner ||
        this.getStockBalancePrivileges.addInventoryItem === true
      ) {
        this.allocateHash = val.id;
        (this.addingStockData = {
          addedStock: 0,
          purchasePrice: 0,
          expiryDate: "",
          batchNo: ""
        }),
          (this.addStockDrawer = true);
      } else {
        this.$vs.notify({
          title: "Inventory",
          text: "You don't have have privilege to perform this action",
          color: "danger",
          position: "top-right"
        });
      }
    },

    openRemoveModal() {
      this.removeModal = true;
    },

    openTransferModal() {
      this.transferModal = true;
    },

    calcHoldingStockBalance() {
      this.tempStockBalance =
        parseInt(this.inventoryData.itemHoldingInventory.stockBalance) -
        parseInt(this.quantityInput || 0);
    },

    openEditItem(val) {
      // console.log(val)
      this.itemName.name = val.variant.variantName;
      this.itemName.sku = val.variant.variantSku;
      this.inventoryItemId = val.id;
      this.itemData = val;
      this.editDrawer = true;
    },

    updateInventoryItem() {
      this.updateItemButton = true;
      // let userInfo = this.$store.state.auth.auth.authData;
      // delete this.itemData.variant;
      let editData = {
        id: this.inventoryItemId,
        data: {
          userInfo: userInfo,
          payload: this.itemData
        }
      };

      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId]
      };

      const inventoryPayload = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.inventoryItemId,
          itemId: this.itemData.variant.item.id,
          variantId: this.itemData.variant.id,
          retailPriceBooks: this.itemData.variant.retailPriceBooks,
          variant: {
            syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
            syncWithPurchaseCatalogue: this.variant.syncWithPurchaseCatalogue,
            syncWithInventory: this.variant.syncWithInventory,
            inventory: this.inventory
          }
        }
      };

      console.log(inventoryPayload);

      this.$store
        .dispatch("inventory/stock/updateInventoryItem", editData)
        .then(resp => {
          this.updateItemButton = false;
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.updateItemButton = false;
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    setTheVariantId(e) {
      this.inventoryVariantId = e.variant.id;
    },

    allocateToOtherOutlet() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          sendingInventoryTypeId: this.inventoryData.id,
          receivingOutletId: this.outletId,
          // variantId: this.inventoryData.variantId,
          variantId: this.inventoryVariantId,
          quantity: this.quantity
        }
      };

      this.$store
        .dispatch("inventory/stock/allocateToOutlet", data)
        .then(resp => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
          this.locationModal = false;
        })
        .catch(err => {
          // console.log(err.response);
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },
    updateBatchInfo() {
      let data = {
        variantId: this.inventoryVariantId,
        outletId: this.$store.state.auth.auth.authData.outletId,
        inventoryInformationType: "batch",
        payload: {
          quantity: this.batchQuantity,
          accountingYear:this.accountingYear,
          status:this.batchStatus
        }
      };

      this.$store
        .dispatch("inventory/stock/updateBatchInventory", data)
        .then(resp => {
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
          this.locationModal = false;
        })
        .catch(err => {
          // console.log(err.response);
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    allocateToInventoryClass() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          holdingInventoryId: this.inventoryData.id,
          inventoryTypeId: this.allocateHash,
          prospectiveIssuedStock: this.quantityInput
        }
      };

      this.$store
        .dispatch("inventory/stock/allocateToInventoryClass", data)
        .then(resp => {
          // console.log(resp.data);
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
          this.allocateToInventoryClassModal = false;
          (this.allocateHash = ""),
            (this.inventoryData = {}),
            (this.quantityInput = 0);
        })
        .catch(err => {
          console.log(err);
          this.$vs.notify({
            title: "Inventory Item",
            text: "Allocation Item Error",
            color: "danger",
            position: "top-right"
          });
        });
    },

    addStock() {
      this.addButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.allocateHash,
          addedStock: this.addingStockData.addedStock,
          purchasePrice: this.addingStockData.purchasePrice,
          expiryDate: this.addingStockData.expiryDate,
          batchNo: this.addingStockData.batchNo
        }
      };

      this.$store
        .dispatch("inventory/stock/addtoStock", data)
        .then(resp => {
          this.addButton = false;
          this.$vs.notify({
            title: "Inventory Item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
          this.addStockDrawer = false;
        })
        .catch(err => {
          this.addButton = false;
          this.$vs.notify({
            title: "Inventory Item",
            text: err.response.data.message,
            color: "danger  ",
            position: "top-right"
          });
        });
    },

    getStockMovement(val) {
      this.stockMovementDrawer = true;
      this.$store
        .dispatch("inventory/stock/getStockMovement", val)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },

    formatVariantName(val) {
      // console.log(val)
      if (val.variant === null) {
        return "N/A";
      } else {
        return val.variant.variantName;
      }
    },

    formatDescription(val) {
      if (val.variant === null) {
        return "N/A";
      } else {
        return val.variant.item.description;
      }
    },

    // formatCat(val) {
    //   if (val.variant && val.variant.item.category === null) {
    //     return "N/A";
    //   } else {
    //     return val.variant.item.category.name;
    //   }
    // },

    formatUnit(val) {
      // console.log(val.variant.itemUnitOfMeasures[0]);
      if (val.variant === null) return "N/A";

      return val.variant.itemUnitOfMeasures[0].unitOfPurchase || "N/A";
    }
  },

  watch: {
    selectedItems() {
      if (this.selectedItems.length > 0) {
        this.showAction = true;
      } else {
        this.showAction = false;
      }
    },
    inventData: function() {
      // console.log(this.inventData.length);
      if (this.inventData.length === 0) {
        this.toggleView = true;
      } else {
        this.toggleView = false;
      }
    }
  },

  computed: {
    ...mapGetters("inventory/stock", [
      "getHoldingInventory",
      "getAssignInventoryClass",
      "getCurrentOutletInventories",
      "getAvailability",
      "getInventoryInfoBatch",
      "getInventoryInfoSupply",
      "getInventoryInfoStorage"
    ]),
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getStockBalancePrivileges"]),

    // eslint-disable-next-line vue/return-in-computed-property
    calTotalHoldingInventory() {
      let totalHoldingInventoryValue = 0;
      this.getHoldingInventory;
      for (let index = 0; index < this.getHoldingInventory.length; index++) {
        totalHoldingInventoryValue =
          totalHoldingInventoryValue +
          this.getHoldingInventory[index].remainingInventoryValue;
      }
      return totalHoldingInventoryValue;
    },
    supplyInfo() {
      return this.getInventoryInfoSupply.data;
    },
    batchInfo() {
      return this.getInventoryInfoBatch.data;
    },
    checkAvailability() {
      return this.getAvailability.data;
    }
  },

  mounted() {
    const myOutletId = this.$store.state.auth.auth.authData.outletId;
    this.$store.dispatch("inventory/stock/getHoldingInventory");
    this.$store.dispatch("inventory/stock/getAvailability");
    this.$store.dispatch("inventory/stock/getInventoryInfoBatch");
    this.$store.dispatch("inventory/stock/getInventoryInfoSupply");
    this.$store.dispatch("inventory/stock/getInventoryInfoStorage");
    this.$store.dispatch("inventory/stock/getAllInventoryType");
    // GEt inventory class of a outlet
    this.$store.dispatch("inventory/stock/viewCurrentOutletInventoryType");

    // get Other Outlet
    this.allOutletData = this.getOptimaOutlet.filter(e => e.id !== myOutletId);
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
  }
};
</script>
<style scoped></style>
