<template>
  <div>
    <back location="New Expenditure Item" class="mb-8" />

    <div class="bg-white px-6 pt-8 pb-10 mb-2">
      <div class="flex">
        <div class="w-8/12 grid grid-cols-12 row-gap-12 col-gap-20 pr-16">
          <label class="col-span-6 flex flex-col">
            Expenditure Item:
            <select class="field mt-3">
              <option value="">Select an option</option>
            </select>
          </label>

          <label class="col-span-6 flex flex-col">
            Expenditure Category:
            <select class="field mt-3">
              <option value="">Select an option</option>
            </select>
          </label>

          <label class="col-span-12 flex flex-col">
            Description:
            <textarea class="field field--textarea mt-3 px-4 py-3" />
          </label>

          <label class="col-span-6 flex flex-col">
            Expenditure Code:
            <input type="text" class="field mt-3 px-4 py-2" />
          </label>

          <label class="col-span-6 flex flex-col">
            Account Sub-Group:
            <input type="text" class="field mt-3 px-4 py-2" />
          </label>
        </div>

        <div class="w-4/12">
          <div class="info-box px-5">
            <h2
              class="pt-5 pb-4 mb-4 font-semibold"
              style="border-bottom: 0.2px solid #9BA0A7;"
            >
              Expenditure Items
            </h2>
            <p class="mb-10 leading-6">
              All expenses are automatically added to the expenditure codes
              table. Here you add an asset which forms part of your
              organization’s expenditures.
            </p>
            <div class="flex justify-between pb-6">
              <button>Ok, I Understand</button>
            </div>
          </div>
        </div>
      </div>

      <!-- seperator -->
      <div
        class="w-full mt-40 mb-10"
        style="height: 1px; background: #9BA0A7;"
      ></div>

      <div class="flex justify-between">
        <button
          class="px-8 py-4"
          style="background: #F3F6F9;
          border-radius: 50px; color: #1034A6;"
        >
          Cancel
        </button>

        <button
          class="px-10 py-4"
          style="background: #F3F6F9;
          border-radius: 50px; color: #5E646D;"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";

export default {
  name: "NewExpenditureCode",
  components: { Back },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 32px;
}

.field--textarea {
  height: 72px;
}

.info-box {
  background: rgba(111, 141, 233, 0.15);
  border-radius: 3px;
}
</style>
