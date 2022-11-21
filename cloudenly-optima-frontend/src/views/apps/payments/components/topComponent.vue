<template>
  <section
    class="grid grid-cols-11 col-gap-3 font-normal"
    style="font-size: 14px;"
  >
    <!-- Account analysis -->
    <div class="bg-white col-span-4 p-6 rounded">
      <slot>
        <h2
          class="text-primary-optima-color font-semibold border-dashed border-b-2 border-light-blue-500 pb-3 capitalize"
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
          class="text-primary-optima-color font-semibold border-dashed border-b-2 border-light-blue-500 pb-3 capitalize"
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
    <div class="col-span-3 p-6 rounded" style="background: #F2F2F2;">
      <slot>
        <h2
          class="flex justify-between text-dark-optima-color-lite font-semibold border-dashed border-b-2 border-light-blue-500 pb-3 capitalize"
        >
          <p class="">{{ type }}</p>
          <small v-if="showDueDate" class="flex">
            Due Today
            <span class="text-md p-2"
              ><svg
                width="7"
                height="4"
                viewBox="0 0 7 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 3.5L0.468911 0.5L6.53109 0.5L3.5 3.5Z"
                  fill="#070707"
                /></svg
            ></span>
          </small>
        </h2>
        <!-- <div
          class="flex py-2 my-5 text-lg font-bold text-blue-400 border-dashed border-b-2 border-gray-400 border-l-0 border-t-0 border-r-0"
        > -->

        <!-- </div> -->

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
    showDueDate: Boolean,
  },
};
</script>

<style></style>
