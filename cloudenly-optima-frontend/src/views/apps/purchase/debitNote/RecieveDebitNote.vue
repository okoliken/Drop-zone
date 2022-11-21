<template>
    <div class="">

        <div class="mb-3 flex items-center">
            <div class="w-1/3 mr-5">
                <select v-model="search" class="w-full form-control-lg" placeholder="Select Supplier">

                </select>
            </div>
            <div class="w-1/3 mr-5">
                <select name="" id="" placeholder="Filter by Status" class="w-full form-control-lg">

                </select>
            </div>
            <div class="w-1/3">
                <input placeholder="search Invoice No..." class="w-full form-control-lg border border-solid" />
            </div>
            <div class="w-1/3">
                <div class="float-right">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                        <button class="inline-flex items-center     
                            py-1  px-4 mr-2 cursor-pointer bg-cloudenly-primary-main border-none rounded text-white ">
                            <span class=" mr-1 "> Generate New </span>
                            <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
                        </button>
                        <vs-dropdown-menu>
                            <ul style="min-width: 12rem">
                                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                    @click.prevent="routeNewDebitNote">
                                    <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                        class="ml-2">Create New</span>
                                </li>
                                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                    @click.prevent="routePurchaseInvoice">
                                    <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                        class="ml-2">Purchase Invoice</span>
                                </li>
                            </ul>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
            </div>
        </div>

        <table class=" table table-auto table-responsive w-full border-collapse">
            <thead class="bg-grey-lighter">
                <tr>
                    <th class=" text-center py-3">S/N</th>
                    <th class=" text-center py-3">DEBIT NO</th>
                    <th class=" text-center py-3"> CUSTOMER</th>
                    <th class=" text-center py-3">GRAND TOTAL</th>
                    <th class=" text-center py-3">BOQ</th>
                    <th class=" text-center py-3"> STATUS</th>
                    <th class=" text-center py-3"> ACTION</th>

                </tr>
            </thead>
            <tbody>

                <!-- <tr>
                    <td class=" py-3 pb-3 text-center">{{1}}</td>
                    <td class=" py-3 pb-3 text-center"> 3455</td>
                    <td class=" py-3 pb-3 text-center">Olamiposi Bounty</td>
                    <td class=" py-3 pb-3 text-center"> 30,000.00</td>
                    <td class=" py-3 pb-3 text-center"> <button type="button"
                            class="cursor-pointer bg-cloudenly-primary-main px-2 py-1 rounded border-0 text-white hover:text-white"
                            @click="viewBoqs(debitnote.boqs)">view</button> </td>
                    <td class=" py-3 pb-3 text-center font-semibold text-cloudenly-danger-main "> Draft</td>
                    <td class=" py-3 pb-3 text-center">
                        <vs-dropdown vs-custom-content vs-trigger-click>
                            <div class="text-center cursor-pointer">
                                <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                            </div>
                            <vs-dropdown-menu>
                                <ul style="min-width: 15rem">
                                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                        @click.prevent="editDebitNoteroute(debitnote.hash)">
                                        <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                            class="ml-2">Edit</span>
                                    </li>
                                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                        @click.prevent="editDebitNoteroute(debitnote.hash)">
                                        <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                            class="ml-2">View</span>
                                    </li>
                                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                                        @click.prevent="sendEmail(debitnote)">
                                        <feather-icon icon="MailIcon" svgClasses="w-4 h-4"></feather-icon> <span
                                            class="ml-2">Email to Supplier</span>
                                    </li>

                                </ul>

                            </vs-dropdown-menu>
                        </vs-dropdown>
                    </td>
                </tr> -->
                <!-- <tr v-for="(debitnote, index) in debitNotes" :key="index">
                    <td class=" text-center">{{index + 1}}</td>
                    <td class=" text-center"> {{debitnote.noteNumber}}</td>
                    <td class=" text-center">{{debitnote.network.name}}</td>
                    <td class=" text-center">{{debitnote.currency}} {{debitnote.grandTotal}}</td>
                    <td class=" text-center"> <button @click="viewBoqs(debitnote.boqs)"
                            class=" btn btn-xs btn-primary">view</button> </td>
                    <td class="text-center">
                        <Tag>Draft</Tag>
                    </td>
                    <td class="text-center">

                        <div class="dropdown ks-control">
                            <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="ks-icon la la-ellipsis-h"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                <a class="dropdown-item" href="#"
                                    @click.prevent="editDebitNoteroute(debitnote.hash)">Edit</a>
                                <a class="dropdown-item" @click.prevent="sendEmail(debitnote)" href="#">Email to
                                    Supplier</a>

                            </div>
                        </div>
                    </td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>



<script>
import allDebiteNote from "./allDebitnote";
import DebitAnaysis from "./debitAnalysis"
export default {
  components: {
    allDebiteNote,
    DebitAnaysis
  },
  data() {
    return {
      search: '',
      modal: false,
      showLoading: true,
      showAlert: false,
      showTable: false,
      debitNotes: '',
      userData: '',
      debitNotesReceived: '',
      boqsDetails: [],
    }
  },
  methods: {
    // routePurchaseInvoice(val) {
    //   this.$router.push({
    //     name: "DebitNoteInvoice"
    //   })

    //   this.$router.push({
    //     name: "PurchaseInvoice"
    //   })


    // },

    routeNewDebitNote() {
      this.$router.push({
        name: "CreateDebitNote"
      });

    },
    editDebitNoteroute(val) {
      console.log('hey')
      this.$router.push({
        name: "EditDebitNote",
        params: {
          id: val
        }
      })
    },

    viewBoqs(val) {
      this.modal = true
      this.boqsDetails = val
    },

    sendEmail(val) {
      const data = {
        title: val.noteDescription,
        business: val.name,
        total: val.grandTotal,
        noteId: val.id,
        email: val.network.email
      }
      this.$axios.post(this.$apiCloudenly + "credit-debit-note/send/debit", data, this.$simpleAuthHeader).then(resp => {
        console.log(resp.data.message)
        this.$swal(resp.data.message);
        this.$router.push({
          name: "DebitNoteList"
        })
      }).catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
