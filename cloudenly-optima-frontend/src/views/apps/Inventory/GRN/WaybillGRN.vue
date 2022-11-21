<template>
  <div>
    <back location="GRN - Waybill " class="mb-8" />
    <div class="bg-white px-5">
      <h1 class="pb-5 pt-4">
        Generate GRN from:
      </h1>
      <div class="flex justify-between w-3/4 pb-5">
        <s-combo-box />
        <s-select :width="200" />
        <s-text type="date" :width="250" />
      </div>
      <div class="bg-white py-6"  v-if="waybillWithoutDraft.length > 0">
        <table
          class="w-full px-5 py-5 bg-white"
         
        >
          <thead class="px-5">
            <tr class="px-5 bg-gray-200">
              <th class="py-3 text-center font-bold text-base">Item Name</th>
              <th class="py-3 text-center font-bold text-base">Description</th>
              <th class="py-3 text-center font-bold text-base">Email</th>
              <th class="py-3 text-center font-bold text-base">Waybill Number</th>
              <th class="py-3 text-center font-bold text-base">
               Reference
              </th>
              <th class="py-3 text-center font-bold text-base">
                Qty Requested
              </th>
              <th class="py-3 text-center font-bold text-base">Action</th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="waybill in waybillWithoutDraft" :key="waybill">
              <td class="border-1 border-gray-400   text-center py-2">
                  {{ waybill.customer ? waybill.customer.name : "Nil" }}
              </td>
              <td class="border-1 text-center border-gray-400 py-2">
               {{waybill.invoice? waybill.invoice.description  : "Nil" }}
              </td>
              <td class="border-1 border-gray-400 text-center py-2">
                {{ waybill.customer ? waybill.customer.email : "Nil" }}
              </td>
              <td class="border-1 text-center border-gray-400 py-2">
               {{ waybill.waybillNumber }}
              </td>
              <td class="border-1 text-center border-gray-400 py-2">
              {{ waybill.reference }}
              </td>
              <td
                class="border-1 text-center border-gray-400 py-2 cursor-pointer text-primary-optima-color"
              >
                view
              </td>
              <td
                class="border-1 text-center border-gray-400 py-2 cursor-pointer text-primary-optima-color"
                @click="routeToUseWaybill"
              >
                Use this
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
         <table class="w-full px-5 py-5 bg-white" >
          <thead class="px-5">
            <tr class="px-5 bg-gray-200">
              <th class="py-3 text-center font-bold text-base">Item Name</th>
              <th class="py-3 text-center font-bold text-base">Description</th>
              <th class="py-3 text-center font-bold text-base">Email</th>
              <th class="py-3 text-center font-bold text-base">UofM</th>
              <th class="py-3 text-center font-bold text-base">
                Available Quantity
              </th>
              <th class="py-3 text-center font-bold text-base">
                Qty Requested
              </th>
              <th class="py-3 text-center font-bold text-base">Action</th>
            </tr>
          </thead>
        </table>
        <div>
          <div class="p-5">
            <div class>
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div
                    class="text-cloudenly-primary-main text-lg font-bold mb-5"
                  >
                    There are no Good received note at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates an action or submits a form /
                    <br />
                    document, they show up here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";


export default {
  data() {
    return {
      illustration
    };
  },
  methods: {
    routeToUseWaybill() {
      this.$router.push({ name: "UseWaybillGRN" });
    }
  },
  computed: {
    ...mapGetters("sales/Waybill", ["allWaybill"]),
    waybillWithoutDraft() {
      return this.allWaybill.filter(waybill => {
        return !waybill.draft;
      });
    }
  },
  mounted() {
    this.$store.dispatch("sales/Waybill/getAllWaybill");
  }
};
</script>
