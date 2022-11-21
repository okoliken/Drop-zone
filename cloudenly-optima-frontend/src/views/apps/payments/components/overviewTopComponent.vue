<template>
  <section
    class="grid grid-cols-11 col-gap-3 font-normal"
    style="font-size: 14px"
  >
    <!-- Account analysis -->
    <div class="bg-white col-span-4 p-6 rounded">
      <slot>
        <h2
          class="
            font-semibold
            border-dashed border-b-2 border-light-blue-500
            pb-3
            capitalize
          "
        >
          {{ item }}
        </h2>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex justify-between mt-4 mb-5"
        >
          <h3 :class="item.color">{{ item.title }} :</h3>

          <p class="font-medium" :class="item.color">
            {{ item.value }}
          </p>
        </div>
      </slot>
    </div>

    <!--Direct Debit Status analysis -->
    <div class="bg-white col-span-4 p-6 rounded">
      <slot>
        <h2
          class="
            text-primary-optima-color
            font-semibold
            border-dashed border-b-2 border-light-blue-500
            pb-3
            capitalize
          "
        >
          {{ status }}
        </h2>
        <div
          v-for="(item, index) in statusItem"
          :key="index"
          class="flex justify-between mt-4 mb-5"
        >
          <div class="capitalize">{{ item.title }} :</div>
          <div
            class="font-medium text-tetiary-optima-color capitalize"
            :class="item.color"
          >
            {{ item.value }}
          </div>
        </div>
      </slot>
    </div>

    <!-- payment analysis -->
    <div class="col-span-3 p-6 rounded" style="background: #f2f2f2">
      <slot>
        <h2
          class="
            text-dark-optima-color-lite
            font-semibold
            border-dashed border-b-2 border-light-blue-500
            pb-3
            capitalize
          "
        >
          {{ type }}
        </h2>

        <div
          v-for="(item, index) in types"
          :key="index"
          class="flex justify-between mt-3 mb-5"
        >
          <div class="capitalize">{{ item.title }} :</div>
          <div class="font-medium">
            {{ item.value }}
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: String,
    status: String,
    statusItem: Array,
    items: Array,
    type: String,
    types: Array,
  },
};
</script>

<style></style>
