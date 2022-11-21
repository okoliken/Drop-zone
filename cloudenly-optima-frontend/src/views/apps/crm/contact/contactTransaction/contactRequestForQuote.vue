<template>
  <div>
      <div class=" rounded bg-white">
            <table class="table table-auto table-responsive w-full border-collapse ">
              <thead class="bg-grey-lighter">
                <tr>
                  <th class=" py-3 " style="width: 12%">RFQ NO.</th>
                  <th class=" py-3 " style="width: 12%">RFQ TITLE</th>
                  <th class=" py-3 ">CURRENCY</th>
                  <th class=" py-3 ">SUPPLIER(S)</th>
                  <th class=" py-3 "> BID METHOD </th>
                  <th class=" py-3 "> DEADLINE</th>
                  <th class=" py-3 ">BOQ</th>
                  <th class=" py-3 ">STATUS</th>
                  <th class=" py-3 ">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr class="cursor-pointer hover:bg-grey-lighter" v-for="(requestQuote, index) in getAllRequestQuote"
                  :key="index">
                  <td class=" py-2 pb-2 pl-3 ">{{requestQuote.requestForQuoteNumber}}</td>
                  <td class=" py-2 pb-2 pl-3 ">{{requestQuote.title}}</td>
                  <td class=" py-2 pb-2 pl-3 ">{{requestQuote.currency}}</td>
                  <td class=" py-2 pb-2 pl-3 "> 
                     <button type="button" class="block
                     px-2 py-1 
                       
                      text-sm text-center cursor-pointer 
                      border-none 
                      bg-cloudenly-warning-off  text-cloudenly-warning-main rounded-lg "
                      @click="viewSupplier(requestQuote)">view </button>
                  </td>
                  <td class=" py-2 pb-2 pl-3 ">{{requestQuote.bidMethod}}</td>
                  <td class=" py-2 pb-2 pl-3 ">
                    <span v-if="requestQuote.submissionDeadline === null"> N/A</span>
                    <span v-else>{{requestQuote.submissionDeadline | date }}</span>
                  </td>
                  <td class=" py-2 pb-2 pl-3 ">
                    <button type="button"
                      class="text-sm cursor-pointer outline-none bg-cloudenly-success-main  text-white rounded-lg border-0 py-1 px-1"
                      @click="viewBoqs(requestQuote)">view</button>
                  </td>

                  <td class=" py-2 pb-2 pl-3 ">
                    <span class="font-semibold text-cloudenly-danger-main">{{requestQuote.status}}</span>
                  </td>

                  <td class=" py-2 pb-2 pl-3 ">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 12rem">
                          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="editQuotation(requestQuote.id)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                              class="ml-2">Edit Request</span>
                          </li>
                          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="viewQuotation(requestQuote.id)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                              class="ml-2">View Request</span>
                          </li>
                          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="printQuotation(requestQuote)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                              class="ml-2">Print Request</span>
                          </li>
                          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openProcessModal(requestQuote.id)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                              class="ml-2">Process Request </span>
                          </li>

                          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="openDeleteModal(requestQuote.id)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                              class="ml-2">Delete Request </span>
                          </li>
                        </ul>

                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {


    

    computed: {
      ...mapGetters('crm/contactTransaction', ['getAllContactRequstForQuote'])
    },

    mounted() {
     let data = {
         email : this.$store.state.crm.contact.singleContact.email,
         contactOrgId: this.$store.state.crm.contact.singleContact.contactOrgId
     }
    //  console.log(data)
      this.$store.dispatch('crm/contactTransaction/getcontactTransactRequestForQuote', data).then(resp => {
          console.log(resp)
      }).catch(err => {
          console.log(err)
      })
    }
}
</script>

<style>
 
</style>