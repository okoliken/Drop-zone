<template>
    <div class="mt-3">

        <div class="container mb-3">
            <div class="flex">
                <div class="col-6 mr-5">
                    <vs-alert active="true">
                        Sub Total (Amount VAT Incl)
                        <h5>$25000. 00</h5>

                    </vs-alert>

                </div>
                <div class="col-6">
                    <vs-alert active="true">

                        Sub Total (Amount VAT Incl)

                        <h5>$25000. 00</h5>


                    </vs-alert>
                </div>
            </div>
        </div>

        <div class="container mb-3">
            <div class="flex">
                <div class="col-3">
                    <vs-select v-model="search" placeholder="Select Customer" class="mr-5">
                        <option value="" disabled selected>Filter customer</option>
                        <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }}
                        </option>
                    </vs-select>
                </div>
                <div class="col-3">
                    <vs-select name="" id="" class="mr-5">
                        <option value="" disabled selected>Filter Status</option>
                        <option value="all"> draft</option>
                        <option value="sent"> Sent</option>
                        <option value="service"> Unpaid</option>
                        <option value="service"> Paid</option>
                        <option value="service"> Overdue</option>
                        <option value="service"> Unsent</option>
                    </vs-select>
                </div>
                <div class="col-3">
                    <vs-input class="mr-5" placeholder="Invoice No..." />
                </div>

                <div class="col-3">
                    <vs-select name="" id="" class="mr-5">
                        <option value="" disabled selected>Filter Status</option>
                        <option value="all"> draft</option>
                        <option value="sent"> Sent</option>
                        <option value="service"> Unpaid</option>
                        <option value="service"> Paid</option>
                        <option value="service"> Overdue</option>
                        <option value="service"> Unsent</option>
                    </vs-select>
                </div>
            </div>
        </div>

        <table class="table  w-full">
            <thead class="bg-grey-lighter">
                <tr>
                    <th class="py-3 text-blue text-center"> Customer Name</th>
                    <th class="py-3 text-blue text-center"> Invoice No</th>
                    <th class="py-3 text-blue text-center">Phone Number</th>
                    <th class="py-3 text-blue text-center">Validity</th>
                    <th class="py-3 text-blue text-center">BOQ</th>
                    <th class="py-3 text-blue text-center">Amount (VAT Incl)</th>
                    <th class="py-3 text-blue text-center">Status</th>
                    <th class="py-3 text-blue text-center">Date</th>
                    <th class="py-3 text-blue text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template>
                    <tr v-for="(invoice,index) in filteredUsers " :key="index">
                        <td class=" text-center">{{invoice.customer.name}}</td>
                        <td class=" text-center">{{invoice.invoiceNo}}</td>
                        <td class=" text-center">{{invoice.customer. phone}}</td>
                        <td class=" text-center"> {{invoice.bidValidityDur}} {{invoice.bidValidityType}}</td>
                        <td class=" text-center"> <button @click="viewBoqs(invoice)"
                                class=" btn btn-xs btn-info">view</button> </td>
                        <td class=" text-center">{{invoice.grandTotal}}</td>
                        <td class=" text-center">
                            <Poptip trigger="hover" word-wrap width="100"
                                content="Quotation you created but you have not sent fot Approval">
                                <Tag color="orange">Draft</Tag>

                            </Poptip>
                        </td>
                        <td class=" text-center"> {{invoice.date}}</td>
                        <td class=" text-center">
                            <div class="dropdown ks-control">
                                <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <span class="ks-icon la la-5x la-ellipsis-h"></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                    <a class="dropdown-item" href="#">View</a>
                                    <a @click.prevent="routeEditInvoice(invoice.hash)" class="dropdown-item"
                                        href="#">Edit</a>
                                    <a @click.prevent="emailInvoice(invoice)" class="dropdown-item" href="#"> Send </a>
                                    <a @click.prevent="generateInvoice(invoice)" class="dropdown-item" href="#">
                                        Generate
                                        Invoice</a>
                                    <a @click.prevent="issueWaybill(invoice.hash)" class="dropdown-item" href="#"> Issue
                                        Waybill</a>
                                    <a class="dropdown-item" href="#"> Export as PDF</a>
                                    <a class="dropdown-item" href="#"> Print</a>
                                    <a class="dropdown-item" href="#"> Delete</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>