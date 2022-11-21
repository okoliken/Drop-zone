<template>
  <div>
    <SupplierAnalysis />

    <vs-divider class="" >Supplier Pricebook Details</vs-divider>

    <section class="mb-3">
      <div class="flex items-center justify-between ">

        <div class="">
          <address class="float-right">
            <p class="">Supplier Name : <span class=" font-bold text-cloudenly-danger-main">
                {{singleContact.name}}</span></p>
          </address>
        </div>



        <!-- <div class=" flex items-center" v-show="showSupplierPricebook">
          <p class=" font-semibold pt-2  pr-2"> Action</p>
          <vs-dropdown vs-custom-content vs-trigger-click>
            <button class="btn btn-primary border cursor-pointer rounded-full dropdown-toggle" type="button"
              id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <vs-dropdown-menu>
              <ul style="min-width: 10rem">
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"> <span class="ml-2">
                    Purchase Order</span></li>
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"> <span class="ml-2"> Self
                    Invoice</span></li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div> -->

      </div>

    </section>

    <div class="">

      <section v-if="showSupplierPricebook" class=" bg-white  ">
        <table class="table table-auto table-responsive w-full border-collapse">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">
                <vs-checkbox>
                </vs-checkbox>
              </th>
              <th class="py-3 text-bold">Name</th>
              <th class="py-3 text-bold">Type</th>
              <th class="py-3 text-bold">Variant Code</th>
              <th class="py-3 text-bold">Description</th>
              <th class="py-3 text-bold">UofM</th>
              <th class="py-3 text-bold">Category</th>
              <th class="py-3 text-bold">Wholesale Price</th>
              <th class="py-3 text-bold">Retail Price</th>
              <th class="py-3 text-bold">Supplier Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(pricebook, index) in getSupplierPriceBook" :key="index">
              <td>
                <vs-checkbox class="pl-3">
                </vs-checkbox>
              </td>
              <td class=" pt-3 pb-3">{{pricebook.variant.variantName}}</td>
              <td class=" pt-3 pb-3">{{pricebook.variant.variantName}}</td>
              <td class=" pt-3 pb-3">{{pricebook.variant.variantSku}}</td>
              <td class=" pt-3 pb-3">{{pricebook.item.description}}</td>
              <td class=" pt-3 pb-3">{{pricebook.item.salesUOfM}}</td>
              <td class=" pt-3 pb-3"> {{pricebook.variant.wholesalePrice}}</td>
              <td class=" pt-3 pb-3">{{pricebook.variant.retailPrice}}</td>
              <td class=" pt-3 pb-3">{{pricebook.supplierItemInfo.price}}</td>
              <td class=" pt-3 pb-3">{{pricebook.supplierItemInfo.price}}</td>

            </tr>


          </tbody>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </section>


      <section  class=" bg-white " v-else>

        <table class="table table-auto table-responsive w-full mb-2 border-collapse">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">
                <vs-checkbox>
                </vs-checkbox>
              </th>
              <th class="py-3 text-bold">Name</th>
              <th class="py-3 text-bold">Type</th>
              <th class="py-3 text-bold">Variant Code</th>
              <th class="py-3 text-bold">Description</th>
              <th class="py-3 text-bold">UofM</th>
              <th class="py-3 text-bold">Category</th>
              <th class="py-3 text-bold">Wholesale Price</th>
              <th class="py-3 text-bold">Retail Price</th>
              <th class="py-3 text-bold">Supplier Price</th>
            </tr>
          </thead>
        </table>

          <div class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow-lg mt-2">
                <div class="p-5">
                    <div class="">
                        <p class="m-0 font-bold">
                            This supplier have not been profile to your open network, profile the supplier in your supplier setting ...
                           
                        </p>
                        <p class=" text-cloudenly-primary-main cursor-pointer">Learn more here...</p>
                    </div>
                </div>
          </div>

      </section>

    </div>

  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import SupplierAnalysis from "../supplierAnalysis"

export default {
  components: {
    SupplierAnalysis
  },
  data() {
    return {
      showSupplierPricebook: false,
    }
  },
  methods: {
    

  },

  computed: {
    ...mapGetters('crm/contact', ['singleContact']),
    ...mapGetters('catalogue', ['getSupplierPriceBook'])
  },

  watch: {
    
  },

  mounted() {
    this.$vs.loading({
         container: '#div-with-loading',
         scale: 0.7
     })
   this.$store.dispatch('crm/contact/getSingleContact', this.$route.params.id)
     if(this.$route.query.contactOrgId === null){
        this.showSupplierPricebook = false
     } else{
       this.showSupplierPricebook = true
       this.$store.dispatch('catalogue/getSupplierPricebook', this.$route.query.contactOrgId).then(resp => {
         console.log(resp)
       })
   } 
  }
}
</script>

<style scoped>


</style>
