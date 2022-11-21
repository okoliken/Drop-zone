<template>
    <div class="">

        <vs-popup :active.sync="viewBoqModal" title="Sales Quotation Boqs Details">
            <div class="container">
                <table class=" table table-auto table-respnsive w-full ">
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


     <div v-if="getIsOtherQuotation">   
        <div class=" mb-3">
            <div class="flex items-center  align-items-center mb-2">
                <div class=" w-1/3 mr-2">
                    <vs-select v-model="search" placeholder="Select Customer" class=" w-full">
                        <option value="" disabled selected>Filter customer</option>
                        <!-- <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }} -->
                        <!-- </option> -->
                    </vs-select>
                    
                </div>
                <div class="w-1/3 mr-2">
                    <vs-select name="" id="" class=" w-full">
                        <option value="" disabled selected>Filter Status</option>
                        <option value="all"> draft</option>
                        <option value="sent"> Sent</option>
                        <option value="service"> Unpaid</option>
                        <option value="service"> Paid</option>
                        <option value="service"> Overdue</option>
                        <option value="service"> Unsent</option>
                    </vs-select>
                </div>

                <div class="w-1/3 mr-2">
                    <vs-input class="w-full" placeholder="Invoice No..." />

                </div>

                <div class="w-1/3 flex items-center justify-end">

                 <!-- <vs-select name="" id="" class="">
                        <option value="" disabled selected>Filter Status</option>
                        <option value="all"> draft</option>
                        <option value="sent"> Sent</option>
                        <option value="service"> Unpaid</option>
                        <option value="service"> Paid</option>
                        <option value="service"> Overdue</option>
                        <option value="service"> Unsent</option>
                    </vs-select> -->
                    <div class="">
                        <vs-dropdown vs-custom-content vs-trigger-click>
                            <button class="inline-flex items-center     
                              border-0 py-2 px-5 mr-5 cursor-pointer  border border-solid rounded  border-cloudenly-primary-mid">
                                <span class=" mr-5 "> Create </span>
                                <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
                            </button>
                            <vs-dropdown-menu>
                                <ul style="min-width: 12rem">
                                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                        @click.prevent="routeCreateProforma">
                                        <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                            class="ml-2">Create New</span>
                                    </li>

                                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                        @click.prevent="routeRFQ">
                                        <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                            class="ml-2">From RFQ</span>
                                    </li>


                                </ul>
                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <VuePerfectScrollbar class="h-84" :settings="settings">
            <table class="table table-auto table-responsive w-full border-collapse">
                <thead class=" bg-grey-lighter">
                    <tr>
                        <!-- <th class=" py-3 "> QUOTATION NO</th> -->
                        <th class=" py-3 ">CUSTOMER NAME</th>
                        <th class=" py-3 ">PHONE NO</th>
                        <th class=" py-3 ">VALIDITY</th>
                        <th class=" py-3 ">BOQ</th>
                        <th class=" py-3 ">AMOUNT (VAT Incl)</th>
                        <th class=" py-3 ">STATUS</th>
                        <th class=" py-3 ">DATE</th>
                        <th class=" py-3  text-center">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <template>
                        <tr v-for="(quotation,index) in getOtherQuotation " :key="index">
                            <td class="py-3 pb-3 pl-3">{{quotation.customer.name}}</td>
                            <td class="py-3 pb-3 pl-3">{{quotation.customer.phoneNumber}}</td>
                            <td class="py-3 pb-3 pl-3"> {{quotation.validityDur}} - {{quotation.validityType}}</td>
                            <td class="py-3 pb-3 pl-3"> <button @click="viewBoqs(quotation)"
                                    class=" cursor-pointer hover:text-white btn rounded-lg py-0 bg-cloudenly-primary-main text-white">view</button>
                            </td>
                            <td class="py-3 pb-3 pl-3">{{quotation.quoteTotal | currency}}</td>
                            <td class="py-3 pb-3 pl-3"> <span class=" font-semibold text-cloudenly-danger-main">Draft</span>
                            </td>
                            <td class="py-3 pb-3 pl-3"> {{quotation.createdAt | date}}</td>
                            <td class="py-3 pb-3 pl-3 text-center">
                                <vs-dropdown vs-custom-content vs-trigger-click>
                                    <div class="text-center cursor-pointer">
                                        <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                                    </div>
                                    <vs-dropdown-menu>
                                        <ul style="min-width: 12rem">
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">View</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                @click.prevent="editQuotation(quotation.id)">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">Edit</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                @click.prevent="openProcessQuotation(quotation.id)">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">Process Quote </span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                @click.prevent="generateInvoice(quotation.id)">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">Generate Invoice</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                @click.prevent="issueWaybill(quotation.id)">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">Issue Waybill</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                                    class="ml-2">Export as PDF</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                                    class="ml-2">Print</span>
                                            </li>
                                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                                @click.prevent="openCloseQuotation(requisition)">
                                                <feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4"></feather-icon>
                                                <span class="ml-2">Close</span>
                                            </li>
                                        </ul>
                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </VuePerfectScrollbar>

    </div>

    <div v-else>
         <div class=" mb-3">
            <div class="flex items-center  align-items-center mb-2">
                <div class=" w-1/3 mr-2">
                    <v-select v-model="search" placeholder="Select Customer" class=" w-full">
                        <option value="" disabled selected>Filter customer</option>
                        <!-- <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }} -->
                        <!-- </option> -->
                    </v-select>
                    
                </div>
                <div class="w-1/3 mr-2">
                    <v-select name="" id="" class=" w-full">
                        <option value="" disabled selected>Filter Status</option>
                        <option value="all"> draft</option>
                        <option value="sent"> Sent</option>
                        <option value="service"> Unpaid</option>
                        <option value="service"> Paid</option>
                        <option value="service"> Overdue</option>
                        <option value="service"> Unsent</option>
                    </v-select>
                </div>

                <div class="w-1/3 mr-2">
                    <vs-input class="w-full" placeholder="Invoice No..." />

                </div>

                <div class="w-1/3 flex items-center justify-end">

               
                    
                </div>
            </div>
        </div>
         <table class="table table-auto table-responsive w-full border-collapse">
                <thead class=" bg-grey-lighter">
                    <tr>
                        <!-- <th class=" py-3 "> QUOTATION NO</th> -->
                        <th class=" py-3 ">CUSTOMER NAME</th>
                        <th class=" py-3 ">PHONE NO</th>
                        <th class=" py-3 ">VALIDITY</th>
                        <th class=" py-3 ">BOQ</th>
                        <th class=" py-3 ">AMOUNT (VAT Incl)</th>
                        <th class=" py-3 ">STATUS</th>
                        <th class=" py-3 ">DATE</th>
                        <th class=" py-3  text-center">ACTION</th>
                    </tr>
                </thead>
              </table>

            <div class=" border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2">
               <div class="p-5">
                <div class="">
                    <h3 class="m-0">
                        You have not create any Quotation yet...
                        <span @click="routeCreateProforma"
                            class="text-cloudenly-primary-main cursor-pointer pl-1">Click here to create one..</span>
                    </h3>
                    <p class=" text-cloudenly-primary-main cursor-pointer">Learn more here...</p>
                </div>
            </div>
        </div>
    </div>



    </div>
</template>

<script>
import {mapGetters} from  'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    export default {
    components : {
        VuePerfectScrollbar
    },
    data() {
        return {
            search: '',
            viewBoqModal: false,
            boqsDetails: []
        }
    },

    methods: {
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

        viewBoqs(val) {
            this.viewBoqModal = true;
            this.boqsDetails = val.quoteBoqs
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
                name: 'GenrateInvoiceQuotation',
                params: {
                    id: val
                }
            })
        },

        processQuote(val) {
            console.log(val)
            // const data = {
            //     title: val.description,
            //     business: val.business,
            //     total: val.grandTotal,
            //     invoiceHash: val.hash
            // }

        },

        issueWaybill(val) {
            console.log(val)
        },

        openCloseQuotation(val) {
            console.log(val)
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: ' Quotation',
                text: 'Close Quotation',
                // accept: this.closedQuotation(val)
                acceptText: 'Closed'
            })
        },

        closedQuotation() {

        },


        openProcessQuotation(val) {
            console.log(val)
            this.$vs.dialog({
                type: 'confirm',
                color: 'primary',
                title: 'Process Quotation',
                text: 'This Quotation may undergo Approval Process',
                // accept: this.processQuotation(val),
                acceptText: 'Process'
            })
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
        ...mapGetters('sales/Quotation', [ 'getIsOtherQuotation', 'getOtherQuotation'])
    },

     mounted() {
         this.$store.dispatch('sales/Quotation/getOthersQuotation')
     },
    }
</script>

<style>

</style>