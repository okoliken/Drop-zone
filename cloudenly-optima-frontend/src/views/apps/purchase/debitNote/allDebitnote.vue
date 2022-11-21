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
                <input placeholder="search Invoice No..." class="w-full form-control-lg border border-solid border-grey" />
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
