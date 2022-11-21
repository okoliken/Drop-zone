<template>
    <div class=" mt-3 px-2">

        <vs-popup :active.sync="viewBoqModal" title="Sales Quotation Boqs Details">
            <div class="container">
                <table class=" table table-auto table-responsive w-full ">
                    <thead class="bg-grey-lighter">
                        <tr>
                            <th class=" py-3 text-center">Name</th>
                            <th class=" py-3 text-center">type</th>
                            <th class=" py-3 text-center">Unit</th>
                            <th class=" py-3 text-center">Description</th>
                            <th class=" py-3 text-center">quantity Requested</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(boq, index) in boqsDetails" :key="index">
                            <td class=" py-3 text-center">{{boq.name}}</td>
                            <td class=" py-3 text-center">{{boq.itemClass}}</td>
                            <td class=" py-3 text-center"> {{boq.unitOfMeasure}}</td>
                            <td class=" py-3 text-center"> {{boq.description}}</td>
                            <td class=" py-3 text-center"> {{boq.quantity}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </vs-popup>
        <!-- End View Boq Section -->

        <div class=" mb-3">
            <div class=" w-1/3">
                <input type="text" name="" class="py-3 px-2 rounded-lg  border border-solid border-grey w-full"
                    placeholder=" search " id="">
            </div>
        </div>


        <div class="">

            <div v-if="getAllContactInvoice.length > 0">
                <table class="table table-auto table-responsive w-full border-collapse ">
                    <thead class=" bg-grey-lighter">
                        <tr>
                            <th class=" py-4 "> INVOICE NO</th>
                            <th class=" py-4 ">Validity</th>
                            <th class=" py-4 ">BOQ</th>
                            <th class=" py-4 ">Amount (VAT Incl)</th>
                            <th class=" py-4 ">Status</th>
                            <th class=" py-4 ">Date</th>
                            <th class="py-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr v-for="(invoice,index) in getAllContactInvoice " :key="index">
                                <td class=" py-3 pl-3 "> {{invoice.id}}</td>
                                <td class=" py-3 pl-3 "> {{invoice.validityDur}} - {{invoice.validityType}}</td>
                                <td class=" py-3 pl-3 ">
                                    <button type="button" class="block
                                        px-2 py-1 
                                        text-sm text-center cursor-pointer 
                                        border-none 
                                        bg-cloudenly-primary-off  text-cloudenly-primary-main rounded-lg "
                                        @click="viewBoqs(invoice)">view
                                     </button>

                                </td>
                                <td class=" py-3 pl-3 ">{{invoice.invoiceTotal | currency}}</td>
                                <td class=" py-3 pl-3 ">{{invoice.status}}</td>
                                <td class=" py-3 pl-3 "> {{invoice.createdAt | date}}</td>
                                <td class="py-3 pl-3 ">
                                    <vs-dropdown vs-custom-content vs-trigger-click>
                                        <div class="text-center cursor-pointer">
                                            <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                                        </div>
                                        <vs-dropdown-menu>
                                            <ul style="min-width: 12rem">
                                                <li class="flex py-1 px-2  cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="routeCreateInvoice">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Preview</span>
                                                </li>
                                                <li class="flex py-1 px-2  cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="routeEditInvoice(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Edit Invoice</span>
                                                </li>


                                                <li class="flex py-1 px-2  cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="emailInvoice(invoice)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Send as Email</span>
                                                </li>

                                                <li class="flex py-1 px-2  cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="CreateWaybill(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Generate Waybill</span>
                                                </li>


                                                <li class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="createCreditNote(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Issue Credit Note</span>
                                                </li>


                                                <li class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="createCreditNote(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Export as PDF</span>
                                                </li>


                                                <li class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="createCreditNote(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Print</span>
                                                </li>


                                                <li class="flex py-1 px-2 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="createCreditNote(invoice.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Closed</span>
                                                </li>

                                            </ul>
                                        </vs-dropdown-menu>
                                    </vs-dropdown>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <table class=" table table-auto border-collapse w-full ">
                    <thead class=" bg-grey-lighter">
                        <tr>
                            <th class="py-3"> INVOICE NO</th>
                            <th class="py-3">Validity</th>
                            <th class="py-3">BOQ</th>
                            <th class="py-3">Amount (VAT Incl)</th>
                            <th class="py-3">Status</th>
                            <th class="py-3">Date</th>
                            <th class="py-3 ">Actions</th>
                        </tr>
                    </thead>
                </table>

                <div
                    class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow  mb-2">
                    <div class="p-5">
                        <div class="">
                            <h3 class="m-0"> You have not send any invoice to this customer..</h3>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {

    data() {
        return {
            viewBoqModal: false,
            boqsDetails: []
        }
    },

    method:  {
        
      routeCreateInvoice() {
        this.$router.push({ name: "CreateInvoice" });
      },

      routeSaleRFQ(){
        this.$router.push({name: "SalesRequisition"})
      },
      routeProforma(){
        this.$router.push({ name: "ProformaQuote" });
      },

      routeSalesPurchaseOrder(){
        this.$router.push({name: "SalesOrder"})
      },

      CreateWaybill(val){
           this.$router.push({name: "CreateWaybill" , params : {id: val}})
       },

       createCreditNote(val){
         this.$router.push({name: "CreateInvoiceCreditNote" , params : {id: val}})

       },
      routeEditInvoice(val){
        this.$router.push({name: "EditInvoice", params: {id: val}})
      },
      
     

      viewBoqs(val){
        this.modal = true
        this.boqsDetails  = val.invoiceBoqs
      },


    },
    computed: {
        ...mapGetters('crm/contactTransaction', ['getAllContactInvoice'])
    },
    mounted() {
        let data = this.$store.state.crm.contact.singleContact.email
        this.$store.dispatch('crm/contactTransaction/getContactInvoice', data)
    }
}
</script>   

<style>

</style>