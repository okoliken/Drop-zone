<template>
  <div class="mb-12">
    <div class=" px-5 bg-white    rounded py-5">
      <div class="row mb-2">


        <div class="col-8">
          <div>
            <div class="form-group row no-gutters mb-0 pb-0">
              <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold ">Select
                Supplier</label>
            </div>


            <div class="w-2/3">


              <v-select name="supplier" placeholder="Select Supplier" class="w-full" label="name"
                v-model="quotationData.requestForQuoteSuppliers" multiple :options="getSupplierContact">
              </v-select>



            </div>
          </div>
        </div>


        <div class="col-2 ">

          <div class="">
            <div class="md:w-full">
              <label class="block  mb-1 md:mb-0  font-bold text-sm  " for="inline-full-name">RFQ Number</label>
            </div>
            <div class=" md:w-full">
              <input placeholder="Enter Requisition No" v-model="quotationData.requestForQuoteNumber" type="text"
                class="form-control w-full" name="" id="">

            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="">
            <div class="md:w-full">
              <label class="block  mb-1 md:mb-0  font-bold text-sm  " for="inline-full-name">RFQ Currency</label>
            </div>
            <div class=" md:w-full">
              <select class=" form-control" v-model="quotationData.currency">
                <!-- <option value="#"> Naira</option>
                <option value="$"> Dollar</option>
                <option value="$"> Pound</option> -->
                <option v-for="(currency, index) in currencyList" :key="index" :value="currency"> {{currency}}</option>
              </select>
            </div>
          </div>

        </div>

      </div>



      <div class="row">

        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold  ">RFQ
              Title</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea v-model="quotationData.title" rows="4" cols="30" class="form-control"
                placeholder="Enter RFQ Title"></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold ">RFQ
              Description</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea v-model="quotationData.description" rows="4" cols="30" class="form-control"
                placeholder="Enter RFQ Description"></textarea>
            </div>
          </div>
        </div>


        <div class="col-2">


          <div class="mb-2">
            <label class="block md:text-left mb-1 md:mb-0 text-sm  font-bold" for="inline-full-name">Expected Delivery
              Date</label>
            <div class=" ">
              <datepicker v-model="quotationData.expectedDeliveryDate" input-class="w-full py-2"
                placeholder="Select Date">
              </datepicker>
            </div>
          </div>


          <div class="">

            <label class="block md:text-left mb- md:mb-0 text-sm  font-bold" for="inline-full-name">Submission
              Deadline</label>
            <div class="md:full">
              <datepicker input-class="" v-model="quotationData.submissionDeadline" placeholder="Select Date">
              </datepicker>
            </div>

          </div>


        </div>

        <div class="col-2">

          <div class="mb-3">

            <label class="block md:text-left mb-1 md:mb-0 text-sm  font-bold" for="inline-full-name">Bid Method</label>
            <div class=" ">
              <select class=" form-control w-full" placeholder="Select Category" v-model="quotationData.bidMethod">
                <option value="Competitive">Competitive</option>
                <option value="Non Competitive">Non Competitive</option>
              </select>
            </div>

          </div>


          <div class="">
            <label class="block md:text-left mb-1 md:mb-0 text-sm  font-bold" for="inline-full-name">Sourcing
              Channel</label>
            <div class=" ">
              <select class=" form-control w-full" placeholder="Select Category"
                v-model="quotationData.sourcingChannel">
                <option value="Single source">Single-Source</option>
                <option value="Multi source">Multi-Source</option>
              </select>
            </div>
          </div>


        </div>

      </div>


      <div class="row ">


        <div class="col-4">

          <div class="form-group row no-gutters mb-0 pb-0">
            <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold ">Payment
              Terms</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea v-model="quotationData.paymentTerms" rows="2" cols="30" class="form-control"
                placeholder="Enter Payment Terms"></textarea>
            </div>
          </div>


        </div>

        <div class="col-4">
          <div class="">
            <label class="block md:text-left mb-1 md:mb-0 text-sm  font-bold" for="inline-full-name">Delivery
              Address</label>
            <div class=" ">

              <textarea v-model="quotationData.deliveryAddress" rows="2" cols="30" class="form-control"
                placeholder="Enter Delivery Address"></textarea>


            </div>
          </div>
        </div>


        <div class="col-2">



        </div>


        <div class="col-2">
          <!-- {{quotationData.requestForQuoteBoqs.length}} -->
        </div>

      </div>
    </div>


    <section class="">
      <div class="  bg-white rounded ">
        <table class="table  w-full table-auto table-responsive border-collapse">
          <thead class=" bg-grey-lighter ">
            <tr class="">
              <th class="text-center py-4">ITEM NAME</th>
              <!-- <th class="text-center py-4">ITEM CLASS</th> -->
              <th class="text-center py-4">DESCRIPTION</th>
              <th class="text-center py-4">SKU</th>
              <th class="text-center py-4">UofM</th>
              <th class="text-center py-4">STOCK BALANCE </th>
              <!-- <th class="text-center py-4">RE-ORDER LEVEL</th> -->
              <th class="text-center py-4">ORDER QTY</th>
              <th class="text-center py-4" style="width: 1%"> DEL</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(requisition, index) in  quotationData.requestForQuoteBoqs" :key="index">
              <td class="w-1/4">
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full " v-model="requisition.variantName" name="" id="" />
              </td>
              <!-- <td>
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full " v-model="requisition.type" name="" id="" />
              </td> -->
              <td>
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full " v-model="requisition.description" name="" id="" />
              </td>
              <td>
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full" v-model="requisition.customerVariantSku" name="" id="" />
              </td>
              <td>
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full" v-model="requisition.unitOfMeasure" name="" id="" />
              </td>

              <td>
                <input disabled class=" py-2 px-2 mt-2 border border-solid border-grey rounded w-full" v-model="requisition.stockBalance" name="" id="" />
              </td>
              <!-- <td>
                <input v-model="requisition.reorderLevel" class="py-2 px-2 mt-2 border border-solid border-grey rounded w-full " disabled />
              </td> -->
              <td>
                <input v-model="requisition.orderQuantity" class="py-2 px-2 mt-2 border border-solid border-grey rounded w-full " placeholder="Enter Quantity" />

              </td>
              <td class="text-center">
                <feather-icon icon="TrashIcon" @click="deleteItem(index)"
                  class="p-2 h-8 w-8 text-cloudenly-danger-main  cursor-pointer text-red  inline-flex"></feather-icon>
              </td>
            </tr>
          </tbody>
        </table>

        <div class=" mt-3">
           <AddItemPurchase v-on:addItem="addItem" />
        </div>
      </div>

      <div class="flex items-center justify-between w-full mt-3">
        
        <div class="w-1/2">
          <textarea class="bg-white form-control w-full" cols="15" rows="5" placeholder="Terms and Condition"> </textarea>
        </div>

          
      <div class="">

         <button  @click="routeBack"
          class="inline-flex items-center    
          border-0 py-3 text-xl px-5 mr-5 cursor-pointer bg-transparent   rounded ">
          Cancel
        </button>
        <button :disabled=updateButton :class="{'cursor-not-allowed' : updateButton , 'bg-cloudenly-primary-mid' : updateButton }"
         @click="updateQuotation"
          class="inline-flex items-center    
           py-3 text-xl px-5 mr-2 cursor-pointer bg-cloudenly-primary-main text-white border border-solid rounded  border-cloudenly-primary-mid">
          Update Request
        </button>
      </div>

      </div>



     


    </section>



  </div>
</template>

<script>
import AddSupplier from "../../../components/AddSupllierWidget/AddSupplier"
import AddItemPurchase from "../../../components/AddItemWidget/catalogue"
import Datepicker from "vuejs-datepicker";
import currencyList from '../../../../utils/currency'
import {mapGetters} from "vuex"

export default {
  components: {
    AddSupplier,
    AddItemPurchase,
    Datepicker
  },
  data() {
    return {
      search: '',
      currencyList: currencyList,
      suppliers: [],
      updateButton: false,
      quotationData: {
        title: "",
        requestForQuoteNumber: "",
        submissionDeadline: "",
        description: "",
        currency: "",
        sourcingChannel: "",
        bidMethod: "",
        deliveryAddress: "",
        paymentTerms: "",
        suppliers: [],
        requestForQuoteBoqs: [],
        // date: '',
        // requisitionerDepartment: "",
        // requisitionerDivision: "",
        // requisitionerGroup: "",
        // shippingAddress: "",
        // reasonForRequisition: "",
        // bidValidityType: "",
        // bidValidityDur: "",
        // outletName: '',
        // location: '',
        // outletManager: "",
        // supplier: "1",
        // signature: "",
        // logo: "",
        // budgetSource: "",
        // budgetTitle: "",
        // financialYear: "",
        // purchaseCategory: "",
        // purchaseSubCategory: "",
        // costCenterCode: "",
      },
    }
  },
  methods: {
    routeNetwork() {
      this.$router.push({
        name: "CreateCommunity"
      })
    },

    routeBack() {
      this.$router.back()
    },

    selectSupplier(val) {
      this.selectedSupplier = val
    },

    addItem(val) {
      console.log(val)
      this.quotationData.requestForQuoteBoqs.push(
        {
        customerVariantSku: val.variantSku,
        customerVariantId: val.itemId,
        supplierVariantSku: val.variantSku,
        supplierVariantId:  null,
        variantName: val.variantName,
        variantCode: val.variantCode,
        itemClass: null,
        description: val.item.description,
        unitOfMeasure: val.retailUnitOfMeasure,
        type: val.productOrService, 
        orderQuantity: 0,
        stockBalance: val.stockBalance,
        reOrderLevel: val.reOrderLevel
      })
      console.log(this.quotationData.requestForQuoteBoqs)
    },
   
  
    updateQuotation() {
      this.updateButton = true

      this.quotationData.suppliers = this.quotationData.requestForQuoteSuppliers.map(resp => {
        return {
          "supplierOrgId": resp.contactOrgId,
          "contactId": resp.id,
          "name": resp.name,
          "address": resp.address,
          "contactName": resp.contactName,
          "phoneNumber": resp.phoneNumber,
          "email": resp.email
        }
      })
      let userInfo = this.$store.state.auth.auth.authData
      let data = {
        userInfo: userInfo,
        payload: this.quotationData
      }
      this.$store.dispatch('purchase/RequestQuote/updateRequestQuote', data).then(resp => {
        console.log(resp)
        this.$vs.notify({
          title: 'Request ',
          text: resp.data.message,
          color: 'primary',
          position: 'top-right'
        })
        this.updateButton = false
        this.$router.push({
          name: "PurchaseRequestQuote"
        })
      }).catch(err => {
        this.updateButton = false        
        this.$vs.notify({
          title: 'Request',
          text: err.response.data.message,
          color: 'danger',
          position: 'top-right'
        })
      })
    }
  },

  computed: {
    ...mapGetters('crm/contact',['getSupplierContact']),
    
  },



  mounted() {
    let quoteId = this.$route.params.id
    this.$store.dispatch('purchase/RequestQuote/getSingleRequestQuote', quoteId).then(resp => {
      console.log(resp.data.requestForQuote)
      this.quotationData = resp.data.requestForQuote
      // this.quotationData.requestForQuoteBoqs = resp.data.requestForQuoteBoqs
      // this.quotationData.suppliers = resp.data.requestForQuote.requestForQuoteSuppliers


    }).catch(err => {
      console.log(err)
    })

    this.$store.dispatch('crm/contact/getAllSupplierContact')

  }
}
</script>

<style>

</style>
