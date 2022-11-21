<template>
  <div class="bg-white px-8 py-8">
    <div>
      <div class="flex justify-between items-center my-4">

        <div class="flex items-center ">
          <div class="text-lg pr-6 ">01 January, {{ currentYear }}</div>
          <div class="text-black font-bold text-lg pr-6 ">to</div>
          <div class="border-1 rounded border-gray-400 px-6 py-2">{{ currentDate }}</div>
        </div>

        <div class="border-1 rounded border-gray-400 px-1 py-1">
          <select name="location" class="approval-flows__options ">
            <option value="" selected>Select Overview</option>
            <option value="">Catalogue by No. of Item Groupings</option>
            <option value="">Catalogue by No. of Sales Items</option>
            <option value="">No. of Catalogue Items in Inventory Balances</option>
          </select>
        </div>
      </div>
    </div>

    <!-- seperator -->
    <div class="border-dashed border-b-2 border-light-grey-500 w-full my-4 text-gray-400"></div>

    <div class="flex items-center justify-between rounded-md bg-white py-3">

      <div class="w-full border-dashed border-r-2 border-gray-400 px-2">
        <div class="border-1 rounded border-gray-500 px-3 py-3">Number in Catalogue (Current)</div>

        <div class="flex items-center justify-between shadow-md mt-3 px-4 py-6">

          <div class="w-1/2 flex items-center justify-start bg-white rounded border-r-2 border-gray-400"
            style="height: 50px">
            <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-l1.svg" style="height: 35px" />
            <div class="ml-2">
              <div class="text-lg text-left font-semibold mb-2" style="color: #1034A6;">
                {{ variantProduct }}
              </div>
              <div class="text-left">Item Variants (product)</div>
            </div>
          </div>

          <div class="w-1/2 flex items-center justify-start bg-white rounded ml-2" style="height: 70px">
            <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-l2.svg" style="height: 35px" />
            <div class="ml-2">
              <div class="text-lg text-left font-semibold mb-2" style="color: #F15846;">
                {{ variantService }}
              </div>
              <div class="text-left">Item Variants (Services)</div>
            </div>
          </div>

        </div>

        <div class="flex items-center justify-between shadow-md mt-3 px-4 py-6">

          <div class="w-1/2 flex items-center justify-start bg-white rounded border-r-2 border-gray-400"
            style="height: 50px">
            <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-l3.svg" style="height: 35px" />
            <div class="ml-2">
              <div class="text-lg text-left font-semibold mb-2" style="color: #4ECDC4;">
                {{ itemCategory }}
              </div>
              <div class="text-left">Item Categories</div>
            </div>
          </div>

          <div class="w-1/2 flex items-center justify-start bg-white rounded ml-2" style="height: 70px">
            <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-l4.svg" style="height: 35px" />
            <div class="ml-2">
              <div class="text-lg text-left font-semibold mb-2" style="color: #507FDF;">
                {{ itemGroups }}
              </div>
              <div class="text-left">Item Groups</div>
            </div>
          </div>

        </div>

      </div>



      <div class="flex w-full border-none">
        <div class="w-full px-3">
          <div class="border-1 border-gray-500 px-3 py-3">Number in Catalogue (Current)</div>

          <div class="flex items-center justify-between shadow-md mt-3 px-4 py-6">

            <div class="w-1/2 flex items-center justify-start bg-white rounded border-r-2 border-gray-400"
              style="height: 50px">
              <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-r1.svg" style="height: 35px" />
              <div class="ml-2">
                <div class="text-lg text-left font-semibold mb-2" style="color: #4ECDC4;">
                  {{ purchaseProducts }}
                </div>
                <div class="text-left">Purchase Items (Products)</div>
              </div>
            </div>

            <div class="w-1/2 flex items-center justify-start bg-white rounded ml-2" style="height: 70px">
              <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-r2.svg" style="height: 35px" />
              <div class="ml-2">
                <div class="text-lg text-left font-semibold mb-2" style="color: #507FDF;">
                  {{ purchaseService }}
                </div>
                <div class="text-left">Purchase Items (Services)</div>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between shadow-md mt-3 px-4 py-6">

            <div class="w-1/2 flex items-center justify-start bg-white rounded border-r-2 border-gray-400"
              style="height: 50px">
              <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-r3.svg" style="height: 35px" />
              <div class="ml-2">
                <div class="text-lg text-left font-semibold mb-2" style="color: #1034A6;">
                  {{ salesProducts }}
                </div>
                <div class="text-left">Sales Items (Products)</div>
              </div>
            </div>

            <div class="w-1/2 flex items-center justify-start bg-white rounded ml-2" style="height: 70px">
              <img src="../../../assets/images/optimaAsset/catalogue/catalogue-icon-r4.svg" style="height: 35px" />
              <div class="ml-2">
                <div class="text-lg text-left font-semibold mb-2" style="color: #F15846;">
                  {{ salesService }}
                </div>
                <div class="text-left">Sales Items (Services)</div>
              </div>
            </div>

          </div>

        </div>


      </div>

    </div>


  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    variantProduct: Number,
    variantService: Number,
    itemCategory: Number,
    itemGroups: Number,
    purchaseProducts: Number,
    purchaseService: Number,
    salesProducts: Number,
    salesService: Number,
  },
  data() {
    return {
      currentYear: moment().format("YYYY"),
      currentDate: moment().format("DD MMMM YYYY")
    };
  },
  components: {
  },

  computed: {

  },

  mounted() {

  },
};
</script>