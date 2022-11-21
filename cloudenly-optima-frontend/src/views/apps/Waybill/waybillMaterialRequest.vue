<template>
  <div>
    <back location=" Material Request " class="mb-8" />
    <div class="bg-white px-5">
    <h1 class="pb-5 pt-4">
      Generate GRN from:
    </h1>
    <div class="flex justify-between w-3/4 pb-5">
      <s-combo-box />
      <s-select :width="200"/>
      <s-text type="date"  :width="250" />
    </div>
    <div class="bg-white py-6">
      <table class="w-full px-5 py-5 bg-white" v-if="getAllMaterialRequest.length>1">
        <thead class="px-5">
          <tr class="px-5 bg-gray-200">
            <th class="py-3 text-center font-bold text-base">Item Name</th>
            <th  class="py-3 text-center font-bold text-base" >Description</th>
            <th  class="py-3 text-center font-bold text-base">Sku</th>
            <th  class="py-3 text-center font-bold text-base">UofM</th>
            <th  class="py-3 text-center font-bold text-base">Available Quantity</th>
            <th  class="py-3 text-center font-bold text-base">Qty Requested</th>
            <th  class="py-3 text-center font-bold text-base">Action</th>
          </tr>
        </thead>
        <tbody class="" >
          <tr v-for="(request, index)  in getAllMaterialRequest" :key="index">
            <td class="border-1 border-gray-400   text-center py-2">
              Kashkap Inc
            </td>
            <td class="border-1 text-center border-gray-400 py-2">
              CN/0108020
            </td>
            <td class="border-1 border-gray-400 text-center py-2">
              12-0-2013
            </td>
            <td class="border-1 text-center border-gray-400 py-2">
              1 Month
            </td>
            <td class="border-1 text-center border-gray-400 py-2">
              1,234,000
            </td>
            <td class="border-1 text-center border-gray-400 py-2 cursor-pointer text-primary-optima-color">
              view
            </td>
            <td class="border-1 text-center border-gray-400 py-2 cursor-pointer text-primary-optima-color" @click="routeToUseMaterialRequest">Use this</td>
          </tr>
        </tbody>
      </table>
      <table class="w-full px-5 py-5 bg-white" v-else>
        <thead class="px-5">
          <tr class="px-5 bg-gray-200">
            <th class="py-3 text-center font-bold text-base">Item Name</th>
            <th  class="py-3 text-center font-bold text-base" >Description</th>
            <th  class="py-3 text-center font-bold text-base">Sku</th>
            <th  class="py-3 text-center font-bold text-base">UofM</th>
            <th  class="py-3 text-center font-bold text-base">Available Quantity</th>
            <th  class="py-3 text-center font-bold text-base">Qty Requested</th>
            <th  class="py-3 text-center font-bold text-base">Action</th>
          </tr>
        </thead>
        <!-- <tbody class="" > -->
          </table>
          <div class="p-5">
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div
                    class="text-cloudenly-primary-main text-lg font-bold mb-5 "
                  >
                    There are no Material Request at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates a Material Request or submits a
                    form /
                    <br />
                    document, they show up here
                  </div>
                  <div
                    class="mt-10 bg-cloudenly-primary-main 
                        px-8
                        py-4
                        text-white text-center
                        cursor-pointer
                        rounded-full
                        w-2/4"
                    @click="createMaterialRequest"
                  >
                    Create new
                  </div>
                </div>
              </div>
            </div>
        <!-- </tbody> -->
      
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

export default{
  data(){
    return {
      illustration
    }
  },
  computed: {
      ...mapGetters("inventory/materialRequest", ["getAllMaterialRequest"]),
  },
  methods:{
    routeToUseMaterialRequest(){
      this.$router.push({ name: "UseWaybillMaterialRequest" });
    },
     createMaterialRequest() {
      this.$router.push({
        name: "CreateMaterialRequest"
      });
    },
  },
  mounted() {
    this.$store.dispatch("inventory/materialRequest/getAllMaterialRequest");
    // this.$store.dispatch("crm/contact/getAllContact");
  }
}
</script>