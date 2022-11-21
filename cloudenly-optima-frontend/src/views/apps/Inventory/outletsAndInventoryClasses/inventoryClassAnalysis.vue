<template>
  <div class="bg-white p-5 rounded">
    <div>
      <p class="text-xl text-dark-optima-color">Overview</p>
     
     <!-- {{getInventoryType}} -->
    </div>

    <div class="vx-row items-center mt-5">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-8 py-5 flex items-center w-full border-2 border-l-0 border-b-0 border-t-0"
        >
          <div class="mr-8">
            <svg
              width="56"
              height="56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity=".1" cx="28" cy="28" r="28" fill="#507FDF" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40 21.2c1.3.7 1.3 2.5 0 3.2l-1.8 1 1.8 1c1.3.7 1.3 2.5 0 3.2l-1.8 1 1.8 1c1.3.7 1.3 2.5 0 3.2l-10.5 5.8c-.9.5-2.1.5-3 0L16 34.8c-1.3-.7-1.3-2.5 0-3.2l1.8-1-1.8-1c-1.3-.7-1.3-2.5 0-3.2l1.8-1-1.8-1c-1.3-.7-1.3-2.5 0-3.2l10.5-5.8c.9-.5 2.1-.5 3 0L40 21.2zm-10.5 9l6-3.3 2 1.1-2 1.1-2.6 1.5-4.7 2.6h-.4L23 30.6l-2.6-1.5-2-1.1 2-1.1 6 3.3c.9.5 2.1.5 3 0zm-9 1.9l-2 1.1 9.3 5.2h.4l9.3-5.2-2-1.1-6 3.3c-.9.5-2.1.5-3 0l-6-3.3zm7.3-14.5h.4l9.3 5.2-9.3 5.2h-.4l-9.3-5.2 9.3-5.2z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl text-cloudenly-primary-main mb-2">
              {{getInventoryType.length}}
            </p>
            <p class="mb-1 font-normal">Inventory Name</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="px-5 py-5 flex items-center w-full border-2 border-l-0 border-b-0 border-t-0"
        >
          <div class="mr-8">
            <svg
              width="54"
              height="54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity=".1" cx="27" cy="27" r="27" fill="#FF4F79" />
              <path
                d="M13.2 31.3a.5.5 0 0 0 .4.3h1.6V42a.5.5 0 0 0 .5.5h22.6a.5.5 0 0 0 .5-.5V31.6h1.6a.5.5 0 0 0 .4-.8l-2-2.6a.5.5 0 0 0-.5-.2H15.7a.5.5 0 0 0-.4.2l-2 2.6a.5.5 0 0 0-.1.5zm3 10.1v-9.8H26a.5.5 0 0 0 .4-.2l1.1-1.4v11.4H16.2zm21.6 0h-9.3V30l1.2 1.4a.5.5 0 0 0 .4.2h7.7v9.8zm.3-12.3l1.2 1.5h-9l-1.2-1.5h9zm-22.2 0h11l-1.2 1.5h-11l1.2-1.5zM38.8 21.9a.5.5 0 0 0 .4-.2l1.5-1.5a.5.5 0 0 0 0-.8L39.2 18a.5.5 0 0 0-.7 0l-1.6 1.5a.5.5 0 0 0 0 .8l1.6 1.5a.5.5 0 0 0 .3.2zm0-3l.8.9-.8.8-.8-.8.8-.8zM16.9 15.5a.5.5 0 0 0 .7 0L19 14a.5.5 0 0 0 0-.7l-1.5-1.6a.5.5 0 0 0-.7 0l-1.6 1.6a.5.5 0 0 0 0 .7l1.6 1.5zm.3-2.7l.8.8-.8.8-.8-.8.8-.8zM31.1 24H23a1.5 1.5 0 1 0 1.4 1h4.3a1.5 1.5 0 1 0 3-.1 1.5 1.5 0 0 0 .1-3l1-4.6.4-1.6h1.1a.5.5 0 1 0 0-1h-1.5a.5.5 0 0 0-.5.3l-.5 1.7H22a.5.5 0 0 0-.5.6l1 5.2a.5.5 0 0 0 .5.4H31a.5.5 0 0 1 0 1zm.1-4.7H30l.1-1.6h1.5l-.3 1.6zm-4.7 1V22h-1l-.2-1.6h1.2zm-1.3-1l-.2-1.6h1.5v1.6h-1.3zm2.3 1h1.2l-.1 1.6h-1v-1.6zm0-1v-1.6H29l-.2 1.6h-1.3zM24 17.7l.1 1.6h-1.3l-.3-1.6H24zm-1 2.6h1.2l.2 1.6h-1l-.4-1.6zm6.6 1.6l.2-1.6H31l-.3 1.6h-1zm-6.2 3.6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm6.7.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl mb-2">{{getStockAnalyticsData.itemCategoriesCount}}</p>
            <p class="mb-1 font-normal">Item Category</p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div class="px-5 py-8 flex items-center w-full">
          <div class="mr-10">
            <svg
              width="52"
              height="52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity=".1" cx="26" cy="26" r="26" fill="#4ECDC4" />
              <path
                d="M32.4 23.5l-.6-.6-.7.7 1 1a.5.5 0 0 0 .7 0l1.9-2-.7-.7-1.6 1.6zM32.4 27.4l-.6-.7-.7.7 1 1a.5.5 0 0 0 .7 0l1.9-2-.7-.6-1.6 1.6zM32.4 31.7l-.6-.6-.7.7 1 1a.5.5 0 0 0 .7 0l1.9-2-.7-.7-1.6 1.6z"
                fill="#4ECDC4"
              />
              <path
                d="M38.2 20.3h-3.4v-4.8a1.5 1.5 0 0 0-1.4-1.5h-4.8v-.4A1.5 1.5 0 0 0 27 12h-1v-.5a.5.5 0 0 0-.4-.5h-3.9a.5.5 0 0 0-.5.5v.5h-1a1.5 1.5 0 0 0-1.4 1.5v.4h-4.8a1.5 1.5 0 0 0-1.5 1.5v23.2a1.5 1.5 0 0 0 1.5 1.4h19.3a1.5 1.5 0 0 0 1.4-1.4v-3.9h3.4a1.5 1.5 0 0 0 1.5-1.4V21.8a1.5 1.5 0 0 0-1.5-1.5zm-12-7.2h1a.5.5 0 0 1 .4.5v.4h-1.5v-1zm0 2h7.2a.5.5 0 0 1 .5.4v4.8h-.5V16a.5.5 0 0 0-.5-.5h-6.8V15zm-4-3h3V16a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.4-.5V12zm-.8 4.4a1.5 1.5 0 0 0 1.4 1h1.9a1.5 1.5 0 0 0 1.4-1h6.3v3.8h-2a1.5 1.5 0 0 0-1.4 1.5v11.6a1.5 1.5 0 0 0 1.5 1.4h2v2.9H15V16.5h6.4zm-1.5-3a.5.5 0 0 1 .5-.4h1v1h-1.5v-.5zm14 25.2a.5.5 0 0 1-.5.4H14a.5.5 0 0 1-.5-.4V15.5a.5.5 0 0 1 .5-.5h7.2v.5h-6.7a.5.5 0 0 0-.5.5v22.2a.5.5 0 0 0 .5.5h18.3a.5.5 0 0 0 .5-.5v-3.4h.5v3.9zm4.8-5.3a.5.5 0 0 1-.5.4h-7.7a.5.5 0 0 1-.5-.4V21.8a.5.5 0 0 1 .5-.5h7.7a.5.5 0 0 1 .5.5v11.6z"
                fill="#4ECDC4"
              />
              <path
                d="M34.8 23.2h3v1h-3v-1zM34.8 27h3v1h-3v-1zM34.8 31.4h3v1h-3v-1zM23.3 21.3H26a.5.5 0 0 0 .5-.5v-.5h1.5v-1h-1.5V19a.5.5 0 0 0-.5-.5h-2.8a.5.5 0 0 0-.5.5v.5h-3v-.5a.5.5 0 0 0-.4-.5h-3a.5.5 0 0 0-.4.5v1.9a.5.5 0 0 0 .5.5h1v2h-1a.5.5 0 0 0-.5.4v2a.5.5 0 0 0 .5.4h1v2h-1a.5.5 0 0 0-.5.4v2a.5.5 0 0 0 .5.4h1v2h-1a.5.5 0 0 0-.5.5v1.9a.5.5 0 0 0 .5.5h2.9a.5.5 0 0 0 .5-.5v-.5h2.9v.5a.5.5 0 0 0 .5.5H26a.5.5 0 0 0 .5-.5v-.5h1.5v-1h-1.5v-.4a.5.5 0 0 0-.5-.5h-2.8a.5.5 0 0 0-.5.5v.4h-3v-.4a.5.5 0 0 0-.4-.5h-1v-2h1a.5.5 0 0 0 .5-.4v-2a.5.5 0 0 0-.5-.5h-1v-1.9h1a.5.5 0 0 0 .5-.5v-.5h2.9v.5a.5.5 0 0 0 .5.5h1v2h-1a.5.5 0 0 0-.5.4v2a.5.5 0 0 0 .5.4H26a.5.5 0 0 0 .5-.4V30h1.5v-1h-1.5v-.5a.5.5 0 0 0-.5-.5h-1v-1.9h1a.5.5 0 0 0 .5-.5v-.5h1.5v-1h-1.5v-.4a.5.5 0 0 0-.5-.5h-2.8a.5.5 0 0 0-.5.5v.5h-3v-.5a.5.5 0 0 0-.4-.5h-1v-2h1a.5.5 0 0 0 .5-.4v-.5h2.9v.5a.5.5 0 0 0 .5.5zm.4-2h2v1h-2v-1zm0 14.5h2v1h-2v-1zm2-4.8v1h-2v-1h2zm-2-4.8h2v1h-2v-1zM19 33.8v1h-2v-1h2zm0-4.8v1h-2v-1h2zm0-4.8v1h-2v-1h2zm0-3.9h-2v-1h2v1z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl mb-2">{{getStockAnalyticsData.itemCount}}</p>
            <p class="mb-1 font-normal">Total Inventory Items</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("inventory/stock", ["getInventoryType" , "getStockAnalyticsData"]),
  },

  mounted() {
    this.$store.dispatch('inventory/stock/getStockAnalyticsData')

  }
};
</script>

<style></style>
