<template>
  <div>
    <div class="flex items-center mb-6">
      <feather-icon
        @click="$router.back()"
        icon="ArrowLeftIcon"
        svgClasses="mr-3 h-6 w-6 cursor-pointer"
      />

      <span class="border-2 border-black border-t-0 border-b-0 border-l-0 pr-4">
        <p>back</p>
      </span>
      <p class="ml-3 font-semibold">Chart of Accounts - Add</p>
    </div>

    <div class="bg-white px-6 pt-8 pb-10">
      <div class="flex items-center justify-between mb-10">
        <h2 class="font-semibold">Add New</h2>

        <feather-icon
          icon="AlertCircleIcon"
          svgClasses="mr-3 h-6 w-6 cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-12 col-gap-16 gap-10">
        <label class="col-span-4 flex flex-col">
          Account Category:
          <select class="field mt-3">
            <option value="">Select an option</option>
          </select>
        </label>

        <label class="col-span-4 flex flex-col">
          Group:
          <select class="field mt-3">
            <option value="">Select an option</option>
          </select>
        </label>

        <label class="col-span-4 flex flex-col">
          Sub-Group:
          <select class="field mt-3">
            <option value="">Select an option</option>
          </select>
        </label>

        <!-- seperator -->
        <div
          class="col-span-12 w-full mt-16 mb-12"
          style="height: 1px; background: #9BA0A7;"
        ></div>

        <label class="col-span-4 flex flex-col">
          Account Name:
          <select class="field mt-3">
            <option value="">Select an option</option>
          </select>
        </label>

        <label class="col-span-4 flex flex-col">
          Account Description:
          <input type="text" class="field mt-3 px-4 py-2" />
        </label>

        <label class="col-span-4 flex flex-col">
          Code:
          <input type="text" class="field mt-3 px-4 py-2" />
        </label>

        <!-- seperator -->
        <div
          class="col-span-12 w-full mt-16 mb-12"
          style="height: 1px; background: #9BA0A7;"
        ></div>

        <label class="col-span-4 flex flex-col">
          Financial Report:
          <select class="field mt-3">
            <option value="">Select an option</option>
          </select>
        </label>

        <label class="col-span-8 flex flex-col">
          Sub-Group Description:
          <textarea class="field field--textarea mt-3 px-4 py-3" />
        </label>

        <!-- seperator -->
        <div
          class="col-span-12 w-full mt-16 mb-12"
          style="height: 1px; background: #9BA0A7;"
        ></div>
      </div>

      <div class="flex justify-between">
        <button
          class="px-8 py-4"
          style="background: #F3F6F9; border-radius: 50px; color: #1034A6;"
        >
          Cancel
        </button>
        <button
          class="px-10 py-4"
          style="background: #F3F6F9; border-radius: 50px; color: #5E646D;"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewChartsOfAccounts"
};
</script>

<style>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 32px;
}

.field--textarea {
  height: 72px;
}
</style>
