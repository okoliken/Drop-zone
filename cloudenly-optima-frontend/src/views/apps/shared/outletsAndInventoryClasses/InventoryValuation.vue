<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-irregular-whitespace */
<template>
  <div>
    <div class="mt-8">
      <div class="bg-gray-300 rounded-md py-4 px-2 w-full">
        <span class="mb-1 block">
          The accounting method that you adopt for determining your inventory
          costs can have a direct impact on your key financial statements. We
          have provided
        </span>
        <span>
          a summary explanation below, however, we advice that you consult your
          accountant before choosing an inventory valuation method.</span
        >
      </div>
    </div>

    <div class="mt-10 bg-white py-5 px-3">
      <div
        v-for="(valuation, index) in valuations"
        :key="index"
        class="flex items-center w-full py-4"
      >
        <div class="mr-4">
          <input
            v-model="orgValuation"
            :value="valuation.id"
            class="py-3"
            type="radio"
            name=""
            id=""
          />
        </div>
        <div>
          <span
            v-if="valuation.code === 'average'"
            class="font-normal leading-relaxed"
          >
            The weighted average cost method takes into account the weighted
            average of all units available within a period and then uses that
            average cost to determine the value of COGS and ending inventory.
          </span>

          <span
            v-else-if="valuation.code === 'fifo'"
            class="font-normal leading-relaxed"
          >
            The First-In, First-Out (FIFO)method assumes that the oldest unit of
            inventory is sold first. In essence, your COGS will be calculated
            based on First-In, while the ending inventory value is calculated
            based on Last-In
          </span>

          <span
            v-else-if="valuation.code === 'lifo'"
            class="font-normal leading-relaxed"
          >
            The Last-In, First-Out (LIFO) method assumes that the last unit to
            arrive in inventory is sold first. In essence, your COGS will be
            calculated based on Last-In, while the ending inventory value is
            calculated based on First-In
          </span>

          <span
            v-else-if="valuation.code === 'replacement'"
            class="font-normal leading-relaxed"
          >
            The replacement cost method assigns value based on the amount your
            business will spend to replace that inventory item after sale. This,
            of course, means that the value assigned changes over time depending
            on supplier pricing at the time of replacement.
          </span>
        </div>
      </div>

      <div class="flex justify-between">
        <s-button
          @click="$router.back()"
          class="px-8 bg-light-optima-color text-primary-optima-color"
        >
          Cancel
        </s-button>

        <s-button
          v-if="newSetting === true"
          @click="setOrgValuation"
          :loading="saveButton"
          class="px-8 bg-primary-optima-color text-white"
        >
          Apply
        </s-button>

        <s-button
          v-else
          @click="updateOrgValuation"
          :loading="updateButton"
          class="px-8 bg-primary-optima-color text-white"
        >
          update
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valuations: [],
      orgValuation: "",
      saveButton: false,
      updateButton: false,
      newSetting: true,
      inventorySettingTypeId: "",
    };
  },

  computed: {
    ...mapGetters("inventory/stock", [
      "getAllInventoryValuation",
      "getOrgInventoryValuation",
    ]),
  },

  methods: {
    setOrgValuation() {
      this.saveButton = true;
      console.log(this.orgValuation);
      this.$store
        .dispatch("inventory/stock/createOrgInventoryValuationMethod", {
          selected: {
            id: [this.orgValuation],
          },
        })
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Inventory Valuation",
            position: "top-right",
            color: "primary",
            text: "Created Successfully",
            fixed: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.saveButton = false;
          this.$vs.notify({
            title: "valuation Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    updateOrgValuation() {
      const payload = {
        type: this.inventorySettingTypeId,
        data: {
          selected: {
            id: [this.orgValuation],
          },
        },
      };
      this.updateButton = true;
      this.$store
        .dispatch("inventory/stock/updateOrgInventoryValuationMethod", payload)
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Inventory Valuation",
            position: "top-right",
            color: "primary",
            text: "Update Successfully",
            fixed: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.updateButton = false;
          this.$vs.notify({
            title: "valuation Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
  },

  mounted() {
    // this.$store.dispatch("inventory/stock/getInventoryValuationMethod");
    this.$store
      .dispatch("inventory/stock/getOrgInventoryValuationMethodSet")
      .then((resp) => {
        // console.log(resp.data.message.data[0].inventorySettingTypeId);
        this.valuations = resp.data.message.options;
        this.orgValuation =
          resp.data.message.data[0].setting.selected.id[0] || "";
        if (this.orgValuation === "") {
          this.newSetting = true;
        } else {
          this.inventorySettingTypeId =
            resp.data.message.data[0].inventorySettingTypeId;
          this.newSetting = false;
        }
      });
  },
};
</script>

<style>
</style>