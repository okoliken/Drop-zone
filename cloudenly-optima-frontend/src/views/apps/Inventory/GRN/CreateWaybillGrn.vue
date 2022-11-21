<template>
  <div class="">

    <div class="py-8 px-5  bg-white border  border-solid border-grey-light shadow rounded ">

      <div class="row mb-8">

        <div class="col-md-8">
          <div>
            <div class="form-group row no-gutters mb-2">
              <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold ">Select
                Supplier</label>
            </div>


            <div class="w-full">
              <div class=" flex items-center">

                <div class="mr-3 w-2/3 ">
                  <select v-model="supplier" name="" class=" form-control-lg w-full border border-solid" id="">
                    <option v-for="(supplier, index) in getSupplierContact" :key="index" :value="supplier">
                      {{supplier.name}}</option>
                  </select>
                </div>

                <div>
                  <!-- <button @click="supplierModal = true"
                    class=" px-10 py-2 border-none bg-cloudenly-primary-main text-white rounded text-xl cursor-pointer">Add
                    New</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-2 ">

          <div class="">
            <div class="md:w-full mb-2">
              <label class="block  mb-2 md:mb-0  font-bold text-sm  " for="inline-full-name">GRN Number</label>
            </div>
            <div class=" md:w-full">
              <input placeholder="Enter GRN No" v-model="grnData.grnNumber" type="text" class="form-control w-full"
                name="" id="">

            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="">
            <div class="md:w-full mb-2">
              <label class="block  mb-1 md:mb-0  font-bold text-sm  " for="inline-full-name"> Receipt No</label>
            </div>
            <div class=" md:w-full">
              <input placeholder="Enter Receipt No" v-model="grnData.receiptNumber" type="text"
                class="form-control w-full" name="" id="">
            </div>
          </div>

        </div>

      </div>



      <div class="row">

        <div class="col-4">
          <div class="form-group row no-gutters mb-2">
            <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold  ">
              Reason for GRN</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea v-model="grnData.reasonForGrn" rows="4" cols="30" class="form-control"
                placeholder="Enter Reason"></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group row no-gutters mb-2">
            <label for="default-input-rounded" class=" col-sm-8 text-sm form-control-label font-bold ">
              Description</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea v-model="grnData.description" rows="4" cols="30" class="form-control"
                placeholder="Enter Description"></textarea>
            </div>
          </div>
        </div>


        <div class="col-2">
          <div class="">
            <label class="block md:text-left mb-2  text-sm  font-bold" for="inline-full-name"> Date</label>
            <div class=" ">
              <datepicker v-model="grnData.date" input-class="w-full py-2" placeholder="Select Date">
              </datepicker>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="mb-3">
            <label class="block md:text-left mb-2  text-sm  font-bold" for="inline-full-name">Currency</label>
            <div class=" ">
              <select v-model="grnData.currency" class="form-control">
                <option v-for="(currency, index) in currencyList" :key="index" :value="currency"> {{currency}} </option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class=" shadow bg-white rounded ">
      <table class=" table w-full table-auto  ">
        <thead class="bg-grey-light">
          <tr>
            <th class="py-3">Item Name</th>
            <th class="py-3">SKU</th>
            <th class="py-3">Unit</th>
            <th class="py-3">Quantity Invoiced</th>
            <th class="py-3">Quantity Received</th>
            <th class="py-3">Quantity Outstanding</th>
            <th class="py-3">Purchase Price</th>
            <th class="py-3"> GRN Amount</th>
            <th class="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(boq, index) in  grnData.goodsReceivedNoteBoqs" :key="index">
            <td class=" py-4" style="width: 20%">
              <input type="text" class=" form-control" v-model="boq.variantName" name="" id="">
            </td>
            <td class=" py-4"> <input type="text" class=" form-control" v-model="boq.customerVariantSku" name="" id="">
            </td>
            <td class=" py-4"> <input type="text" class=" form-control" v-model="boq.unitOfSale" name="" id=""></td>
            <td class=" py-4"> <input type="text" @keyup="grnCal(boq)" v-model="boq.quantityInvoiced"
                class=" form-control" name="" id=""> </td>
            <td class=" py-4"> <input type="text" @keyup="grnCal(boq)" v-model="boq.quantityReceived"
                class=" form-control" name="" id=""></td>
            <td> <input class=" form-control" v-model="boq.quantityOutstanding" readonly type="text" name="" id=""></td>
            <td> <input class=" form-control" @keyup="grnCal(boq)" v-model="boq.purchasePrice" type="text" name=""
                id=""></td>
            <td class="text-center"> <input type="text" class="form-control" readonly v-model="boq.amount" name=""
                id=""></td>
            <td class=" text-center">
              <feather-icon icon="TrashIcon" @click="deleteBoqs(index)"
                class="p-2 h-8 w-8 text-cloudenly-danger-main  cursor-pointer text-red  inline-flex"></feather-icon>
            </td>
          </tr>

          <tr class="border border-solid border-grey-light ">
            <td class=" pt-5 " style="width: 20%">
              <h4 class=" text-center font-bold">Total</h4>
            </td>
            <td class=" pt-5  text-center "> </td>
            <td class=" pt-5  text-center "> </td>
            <td class=" pt-5  text-center "> {{grnData.totalQuantityInvoiced}}</td>
            <td class=" pt-5  text-center "> {{grnData.totalQuantityReceived}}</td>
            <td class=" pt-5  text-center "> {{grnData.totalQuantityOutstanding }} </td>
            <td class=" pt-5  text-center "> </td>
            <td class=" pt-5  text-center "> {{grnData.totalAmount |  currency}} </td>
            <td class=" pt-5  text-center "> </td>
          </tr>
        </tbody>
      </table>


      <!-- <AddItemPurchase v-on:addItem="addItem" /> -->


      <div class=" float-right mt-3">

        <button :disabled=saveButton
          :class="{'cursor-not-allowed' : saveButton, 'bg-cloudenly-primary-mid' : saveButton}" @click.prevent="saveGrn"
          class="py-3 px-5  mr-3 cursor-pointer bg-cloudenly-primary-main text-white text-xl  border border-solid rounded-lg ">
          Save as Draft
        </button>


        <button
          class=" py-3 px-5  mr-3 cursor-pointer bg-cloudenly-primary-main text-white text-xl  border border-solid rounded-lg ">
          Process
        </button>



      </div>
    </div>

  </div>

</template>
<script>
import currencyList from "../../../../utils/currency"
import Datepicker from "vuejs-datepicker";

    export default {
      components: {
        Datepicker
      },
      data() {
        return {
          search: "",
          userData: "",
          currencyList: currencyList,
          showFirst: false,
          custSearchTriggered: false,
          customerCard: true,
          cusButton: false,
          supplierButton: true,
          singleSupplier: "",
          suppliers: [],

          saveButton : false,
          processButton : false,

          grnData: {
             id: 3,
             owner: "",
             creator: "",
             business: "",
             grnNumber: "",
             grnDescription: "",
             grnCurrency: "",
             recieptNo: "",
             goodsOrderedBy: "",
             reasonForGrn: "",
             totalQuantityInvoiced: '',
             totalQuantityReceived: '',
             totalQuantityOutstanding: '',
             totalAmount: "",
             goodsReceivedNoteBoqs: []
          },

          supplierDetails: '',
          inventories : [],
          prInventory: [{ inventory: "" }],
          bussinesData: '',

        };
      },
      methods: {

       deletePRBoqs(val){
          this.grnData.boqs.splice(val,1)
          this.prInventory.splice(val,1)
        },


        deleteRequisation(index, val) {
          console.log(index, val);
          this.allInventory.push(val);
          this.grnData.boqs.splice(index, 1);
        },

        grnCal(val){
          //  val.quantityOutstanding = parseInt( val.quantity | 0) - parseInt(val.quantityRecieved | 0)
          //  val.amount = parseInt( val.purchasePrice  | 0) * parseInt( val.quantityRecieved | 0)

            val.quantityOutstanding = parseInt(val.quantity || 0) - parseInt(val.quantityRecieved || 0);
          val.amount = parseInt(val.purchasePrice || 0) * parseInt(val.quantityRecieved || 0);
          let InvoiceBoqtotal = 0;
          let invoiceBoqRecieved = 0;
          let invoiceBoqOutstanding = 0;
          let TotalAmount = 0;
          for (var i = 0; i < this.grnData.boqs.length; i++) {
            InvoiceBoqtotal = InvoiceBoqtotal +  parseInt(this.grnData.boqs[i].quantity || 0);
            invoiceBoqRecieved =  invoiceBoqRecieved +  parseInt(this.grnData.boqs[i].quantityRecieved || 0);
            invoiceBoqOutstanding =invoiceBoqOutstanding + parseInt(this.grnData.boqs[i].quantityOutstanding || 0);
            TotalAmount = TotalAmount + parseInt(this.grnData.boqs[i].amount || 0);
          }
          this.grnData.totalQuantityInvoiced = InvoiceBoqtotal;
          this.grnData.totalQuantityRecieved = invoiceBoqRecieved;
          this.grnData.totalQuantityOutstanding = invoiceBoqOutstanding;
          this.grnData.totalAmount = TotalAmount;
       },


       saveGrn(){
         this.grnData.boqs = this.grnData.boqs.map(resp => {
           return {
              customerVariantSku: resp.customerVariantSku,
              customerVariantHash: resp.customerVariantHash,
              supplierVariantSku: resp.supplierVariantSku,
              supplierVariantHash: resp.supplierVariantHash,
              category: resp.category,
              name: resp.name,
              description: resp.description,
              unit: resp.unit,
              quantityInvoiced: resp.quantity,
              quantityReceived: resp.quantityReceived,
              quantityOutstanding: resp.quantityOutstanding,
              purchasePrice: resp.lineTotal,
              amount: resp.amount
           }
         })
         this.grnData.owner = this.bussinesData.owner
         this.grnData.creator = this.bussinesData.owner
         this.grnData.business = this.bussinesData.businessId
         this.grnData.outlet = this.bussinesData.businessId
          this.$axios.post(`${this.$apiCloudenly}grn`, this.grnData , this.$simpleAuthHeader).then((resp) => {
              this.$Notice.success({
                    title: 'Success',
                    desc: resp.data.message
                });
              this.$router.push({name: "GoodReceiveNoteList"})
          }).catch((err) => {
              console.log(err)
          });
      },


      },
      computed: {
        filterSupplier() {
          return this.suppliers.filter(supplier => {
            return supplier.name.toLowerCase().includes(this.search.toLowerCase());
          });
        },
       
      },
      mounted() {
        
       const id =  this.$route.params.id
      //  console.log(id)
       this.$store.dispatch('sales/Waybill/getSingleWaybill', id).then(resp => {
         console.log(resp.data.waybill)
       }).catch(err => {
         console.log(err)
       })
      }
    };
</script>

<style>
</style>
