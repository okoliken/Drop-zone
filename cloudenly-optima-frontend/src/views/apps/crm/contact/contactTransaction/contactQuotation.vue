<template>
    <div class="mt-3 px-2">

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


         <!-- delete quotation -->
        <!-- <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Sales Quotation">
            <div class="container">
                <div
                    class=" p-5 border border-solid rounded  border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-danger-main bg-white ">
                    <div class=" flex items-center mx-1">
                        <div class=" mr-5">
                            <feather-icon svgClasses="text-cloudenly-danger-main" class=" h-8 w-8"
                                icon="AlertCircleIcon">
                            </feather-icon>
                        </div>

                        <div>
                            <h1 class=" m-0">warning</h1>
                            <p>You are about to delete this quotation</p>
                        </div>
                    </div>
                </div>

                <div class="mt-3 flex items-center justify-center ">
                    <button :disabled=deleteButton
                        :class="{'cursor-not-allowed' : deleteButton , 'bg-cloudenly-primary-mid' : deleteButton}"
                        @click="closedQuotation"
                        class=" px-5 py-2 mr-5 bg-cloudenly-danger-main border-none text-white cursor-pointer rounded">Close</button>
                    <button class=" border-none bg-transparent px-5 py-2 cursor-pointer"
                        @click="deleteModal = false">cancel</button>
                </div>
            </div>
        </vs-popup> -->

        <!-- end delete quotation -->

       <!-- Process Requisition -->
          <!-- <vs-popup button-close-hidden :active.sync="processModal" title="Process Sales Quotation">
            <div class="container">
                <div
                    class=" p-5 border border-solid rounded  border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white  ">
                    <div class=" flex items-center mx-1">
                        <div class=" mr-5">
                            <feather-icon svgClasses="text-cloudenly-primary-main" class=" h-8 w-8" icon="InfoIcon">
                            </feather-icon>
                        </div>

                        <div>
                            <h1 class=" m-0">Process Info</h1>
                            <p>Please note that this quotation for Quotation may undergo Approval Process</p>
                        </div>
                    </div>
                </div>

                <div class="mt-3 flex items-center justify-center ">
                    <button :disabled=processButton
                        :class="{'cursor-not-allowed' : processButton , 'bg-cloudenly-primary-mid' : processButton}"
                        @click="processQuotation"
                        class=" px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded">Process</button>
                    <button class=" border-none bg-transparent px-5 py-2 cursor-pointer"
                        @click="processModal = false">cancel</button>
                </div>
            </div>
        </vs-popup> -->
        <!-- End process Requisition Section -->

        <div class=" mb-3">
            <div class=" w-1/3">
                <input type="text" name="" class="py-3 px-2 rounded-lg  border border-solid border-grey w-full"
                    placeholder=" search " id="">
            </div>
        </div>

        <div class="">

            <div v-if="getAllContactQuotation.length > 0">
                <table class="table table-auto table-responsive w-full border-collapse">
                    <thead class="bg-grey-lighter">
                        <tr>
                            <!-- <th class=" py-3 text-xl font-normal "> QUOTATION NO</th> -->
                            <th class=" py-3 text-xl font-normal ">S/N</th>
                            <th class=" py-3 text-xl font-normal ">VALIDITY</th>
                            <th class=" py-3 text-xl font-normal ">BOQ</th>
                            <th class=" py-3 text-xl font-normal ">AMOUNT (VAT Incl)</th>
                            <th class=" py-3 text-xl font-normal ">STATUS</th>
                            <th class=" py-3 text-xl font-normal ">DATE</th>
                            <th class=" py-3 text-xl font-normal ">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr class=" border border-solid border-r-0 border-l-0 border-grey-light" v-for="(quotation,index) in getAllContactQuotation " :key="index">
                                <td class="py-3  pl-3">{{index + 1}}</td>
                                <td class="py-3  pl-3"> {{quotation.quote.validityDur}} - {{quotation.quote.validityType}}</td>
                                 <td class="py-4 pb-3 pl-3">
                                    <button type="button" class="block
                                        px-2 py-1 
                                        text-sm text-center cursor-pointer 
                                        border-none 
                                        bg-cloudenly-primary-off  text-cloudenly-primary-main rounded-lg "
                                        @click="viewBoqQuotation(quotation)">view
                                    </button>
                                </td>
                                <td class="py-4 pb-3 pl-3"> {{quotation.quote.quoteTotal | currency}}</td>
                                <td class="py-4 pb-3 pl-3"> <span class=" font-semibold text-cloudenly-danger-main">{{quotation.quote.status}}</span> </td>
                                <td class="py-4 pb-3 pl-3"> {{quotation.createdAt | date}}</td>
                                <td class="py-4 pb-3 pl-3">
                                    <!-- <vs-dropdown vs-custom-content vs-trigger-click>
                                        <div class="text-center cursor-pointer">
                                            <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                                        </div>
                                        <vs-dropdown-menu>
                                            <ul style="min-width: 16rem">
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">View</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="editQuotation(quotation.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Edit</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="openProcessQuotation(quotation.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Process Quote </span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="generateInvoice(quotation.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Generate Invoice</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="issueWaybill(quotation.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Issue Waybill</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon> <span class="ml-2">Export as PDF</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon> <span class="ml-2">Print</span>
                                                </li>
                                                <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                    @click.prevent="openCloseQuotation(quotation.id)">
                                                    <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4">
                                                    </feather-icon>
                                                    <span class="ml-2">Close</span>
                                                </li>
                                            </ul>
                                        </vs-dropdown-menu>
                                    </vs-dropdown> -->
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
                            <th class=" py-4 "> QUOTATION NO</th>
                            <th class=" py-4 ">VALIDITY</th>
                            <th class=" py-4 ">BOQ</th>
                            <th class=" py-4 ">AMOUNT (VAT Incl)</th>
                            <th class=" py-4 ">STATUS</th>
                            <th class=" py-4 ">DATE</th>
                            <th class=" py-4 ">ACTION</th>
                        </tr>
                    </thead>
                </table>

                <div
                    class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4  shadow  mb-2">
                    <div class="p-5">
                        <div class="">
                            <h3 class="m-0"> You have not send any quotation to this customer..</h3>

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
            search: '',
            viewBoqModal: false,
            boqsDetails: [],

            quotationId : null,
           
            processModal: false,
            deleteModal : false,

            deleteButton: false,
            processButton:false,
        }
    },

    method:  {

         routeCreateProforma() {
            this.$router.push({
                name: 'CreateProforma'
            })
        },

        routeRFQ() {
            this.$router.push({
                name: "SalesRequisition"
            })
        },

        viewBoqQuotation(val) {
            this.viewBoqModal = true;
            this.boqsDetails = val.quote.quoteBoqs
        },


        editQuotation(val) {
            this.$router.push({
                name: 'EditProforma',
                params: {
                    id: val
                }
            })
        },

        generateInvoice(val) {
            this.$router.push({
                name: 'GenerateInvoiceQuotation',
                params: {
                    id: val
                }
            })
        },

        issueWaybill(val) {
            console.log(val)
            this.$router.push({
                name: 'GenerateWaybillQuotation',
                params: {
                    id: val
               }
            })
        },

         openCloseQuotation(val) {
           this.quotationId = val,
           this.deleteModal = true
        },

        closedQuotation() {
            this.deleteButton = true
            let userInfo = this.$store.state.auth.auth.authData
            let data = {
                userInfo: userInfo,
                payload: {
                    quoteIds: [this.quotationId]
                }
            }
            this.$store.dispatch('sales/Quotation/closeQuotation', {data: data}).then(resp => {
              this.deleteButton = false
              this.deleteModal = false,
               this.$vs.notify(
                {
                title:'Quotation ',
                text:'Quotation Delete', 
                color: 'primary',
                position:'top-right'}) 
              console.log(resp)
            }).catch(err => {
                this.deleteButton = false
                 this.$vs.notify(
                {
                title:'Quotation ',
                text:'Quotation Error', 
                color: 'danger',
                position:'top-right'}) 
                console.log(err)
          })
        },

        openProcessQuotation(val) {
            this.quotationId = val
            this.processModal = true
        },



        processQuotation(val) {
            let userInfo = this.$store.state.auth.auth.authData
            
            let data = {
                userInfo: userInfo,
                payload: {
                    quoteId: val,
                    manualApproval: {
                        isManualApproval: false,
                        scellooId: ""
                    }
                }
            }

            this.$store.dispatch('sales/Quotation/sendQuotation', data).then(resp => {
                console.log(resp.data)
                this.$vs.notify({
                    title: 'Quotation',
                    text: 'Quotation Processed',
                    color: 'primary',
                    position: 'top-right'
                })
            }).catch(err => {
                console.log(err)
                this.$vs.notify({
                    title: 'Quotation',
                    text: 'quotation error',
                    color: 'danger',
                    position: 'top-right'
                })
            })
        }
    },

    computed: {
        ...mapGetters('crm/contactTransaction', ['getAllContactQuotation'])
    },

    mounted() {
        let data = this.$store.state.crm.contact.singleContact.email
        this.$store.dispatch('crm/contactTransaction/getContactQuotation', data)
    }
}
</script>   

<style>

</style>

