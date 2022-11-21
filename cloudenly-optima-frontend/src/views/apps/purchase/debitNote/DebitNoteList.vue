<template>
<div>
  <div class="ks-page-header">
    <section class="ks-title">
      <h3>Debit Notes</h3>
      <div class="btn-group  ">
        <button type="button" class="btn  btn-primary ks-rounded btn-rounded ">Generate Debit Note</button>
        <button type="button" class="btn ks-rounded btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <!-- <a @click.prevent="routeCreateDeposit" class="dropdown-item" href="#">Deposit  </a> -->
          <a @click.prevent="routeNewDebitNote" class="dropdown-item" href="#">Create New </a>
          <a @click.prevent="routePurchaseInvoice" class="dropdown-item" href="#"> Purchase Invoice </a>
        </div>
      </div>
    </section>
  </div>

  <br><br><br><br>
  <div class="ks-body">
    <div class=" container">
      <button class=" btn btn-lg ks-rounded btn-secondary ks-light " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Filter
      </button>
      <br><br>
      <div class="collapse panel" id="collapseExample">
        <div class="container bg-offwhite panel-body">
          <div class="row ">
            <div class="col-1">

            </div>
            <div class="col-5 ">
              <Input v-model="search" size="large" search enter-button placeholder="" />
              <br>
              <div class="">
                <select name="" id="" class=" form-control">
                  <option value="" disabled selected>Filter Debit Note</option>
                  <option value="all"> All</option>
                  <option value="product"> Sent</option>
                  <option value="service"> Draft</option>
                </select>
              </div>

              <br>
              <div class="">
                <div class="row">
                  <div class="col-6">
                    <DatePicker type="date" placeholder="Date From" style="width: 200px"></DatePicker>

                  </div>

                  <div class="col-6">
                    <DatePicker type="date" placeholder="Date To" style="width: 200px"></DatePicker>

                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>

      </div>
    </div>



    <Modal v-model="modal" title="BOQS Details" width=1000>

      <table class=" table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>type</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Description</th>
            <th>quantity </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(boq, index) in boqsDetails" :key="index">
            <td>{{boq.name}}</td>
            <td>{{boq.type}}</td>
            <td> {{boq.unit}}</td>
            <td> {{boq.category}}</td>
            <td> {{boq.description}}</td>
            <td> {{boq.quantity}}</td>
          </tr>
        </tbody>
      </table>
    </Modal>

    <!-- <div class="container"  v-show="showLoading">
                    <div class="container panel">
                        <br>
                        <div class="row">
                          <div class="col-6">
                            <Alert show-icon>
                              Debit Note Amount
                              <Icon type="md-analytics" slot="icon"></Icon>
                              <template slot="desc"> <h5>$25000. 00</h5></template>
                            </Alert>
                          </div>
                          <div class="col-6">
                            <Alert show-icon>
                              Sub Total (Grand Total)
                              <Icon type="md-analytics" slot="icon"></Icon>
                              <template slot="desc"> <h5>$25000. 00</h5></template>
                          </Alert>
                          </div>
                        </div>
                      </div>
                    <table class="panel table">
                        <thead class="">
                            <tr>
                             <th class=" text-center" style="width: 1%">S/N</th>
                           <th class=" text-center" style="width: 12%">Debit No</th>
                           <th class=" text-center"> Customer</th>
                           <th class=" text-center">Grand Total</th>
                           <th class=" text-center">BoQ</th>
                           <th class=" text-center" style="width: 1%"> Status</th>
                           <th class=" text-center" style="width: 1%"> Action</th>
                        </tr>
                        </thead>
                    </table>
                        <div class=" row" >
                                <div class="col-sm-4"></div>
                                <br>
                                <div class="col-lg-4 push-1">
                            <fulfilling-bouncing-circle-spinner
                                :animation-duration="2000"
                                :size="50"
                                color="blue"
                            />
                            </div>
                        <br><br><br><br>
                    </div>
                </div>

                 <div class="container "   v-show="showAlert">
                    <div class=" panel">
                        <br>
                        <div class="row">
                          <div class="col-6">
                            <Alert show-icon>
                              Debit Note Amount
                              <Icon type="md-analytics" slot="icon"></Icon>
                              <template slot="desc"> <h5>$25000. 00</h5></template>
                            </Alert>
                          </div>
                          <div class="col-6">
                            <Alert show-icon>
                              Sub Total (Grand Total)
                              <Icon type="md-analytics" slot="icon"></Icon>
                              <template slot="desc"> <h5>$25000. 00</h5></template>
                          </Alert>
                          </div>
                        </div>
                      </div>
                  <table class="panel table">
                     <thead class="">
                        <tr>
                          <th class=" text-center" style="width: 1%">S/N</th>
                           <th class=" text-center" style="width: 12%">Debit No</th>
                           <th class=" text-center"> Customer</th>
                           <th class=" text-center">Grand Total</th>
                           <th class=" text-center">BoQ</th>
                           <th class=" text-center" style="width: 1%"> Status</th>
                           <th class=" text-center" style="width: 1%"> Action</th>
                       </tr>
                    </thead>
                 </table>
                   <div>
                        <Alert >
                                <h5>  You dont have any Debit Note yet!!
                                  <button  @click="routePurchaseInvoice" class="btn-link "> <i class=" fa fa-1x fa-plus"></i> Create Debit Note</button></h5>
                        </Alert>
                   </div>
              </div> -->

    <br>

    <div class="container">
      <Tabs :animated ="false">
        <TabPane label="All Debit Note">
          <div class=" panel">
            <br>
            <div class="row">
              <div class="col-6">
                <Alert show-icon>
                  Debit Note Amount
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
              <div class="col-6">
                <Alert show-icon>
                  Sub Total (Grand Total)
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
            </div>
          </div>
          <table class="panel table table-bordered">
            <thead class=" thead-default">
              <tr>
                <th class=" text-center" style="width: 1%">S/N</th>
                <th class=" text-center" style="width: 12%">Debit No</th>
                <th class=" text-center"> Customer</th>
                <th class=" text-center">Grand Total</th>
                <th class=" text-center">BoQ</th>
                <th class=" text-center" style="width: 1%"> Status</th>
                <th class=" text-center" style="width: 1%"> Action</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(debitnote, index) in debitNotes" :key="index">
                <td class=" text-center">{{index + 1}}</td>
                <td class=" text-center"> {{debitnote.noteNumber}}</td>
                <td class=" text-center">{{debitnote.network.name}}</td>
                <td class=" text-center">{{debitnote.currency}} {{debitnote.grandTotal}}</td>
                <td class=" text-center"> <button @click="viewBoqs(debitnote.boqs)" class=" btn btn-xs btn-primary">view</button> </td>
                <td class=" text-center">
                  <Tag >Draft</Tag>
                </td>
                <td class="text-center">

                  <div class="dropdown ks-control">
                    <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="ks-icon la la-ellipsis-h"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                      <a class="dropdown-item" href="#" @click.prevent="editDebitNoteroute(debitnote.hash)">Edit</a>
                      <a class="dropdown-item" @click.prevent="sendEmail(debitnote)" href="#">Email to Supplier</a>

                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>

        <TabPane label="Sent Debit Note">
          <div class=" panel">
            <br>
            <div class="row">
              <div class="col-6">
                <Alert show-icon>
                  Debit Note Amount
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
              <div class="col-6">
                <Alert show-icon>
                  Sub Total (Grand Total)
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
            </div>
          </div>
          <table class="panel table table-bordered">
            <thead class=" thead-default">
              <tr>
                <th class=" text-center" style="width: 1%">S/N</th>
                <th class=" text-center" style="width: 12%">Debit No</th>
                <th class=" text-center"> Customer</th>
                <th class=" text-center">Grand Total</th>
                <th class=" text-center">BoQ</th>
                <th class=" text-center" style="width: 1%"> Status</th>
                <th class=" text-center" style="width: 1%"> Action</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(debitnote, index) in debitNotes" :key="index">
                <td class=" text-center">{{index + 1}}</td>
                <td class=" text-center"> {{debitnote.noteNumber}}</td>
                <td class=" text-center">{{debitnote.network.name}}</td>
                <td class=" text-center">{{debitnote.currency}} {{debitnote.grandTotal}}</td>
                <td class=" text-center"> <button @click="viewBoqs(debitnote.boqs)" class=" btn btn-xs btn-primary">view</button> </td>
                <td class=" text-center">
                  <Tag >Draft</Tag>
                </td>
                <td class="text-center">

                  <div class="dropdown ks-control">
                    <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="ks-icon la la-ellipsis-h"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                      <a class="dropdown-item" href="#" @click.prevent="editDebitNoteroute(debitnote.hash)">Edit</a>
                      <a class="dropdown-item" @click.prevent="sendEmail(debitnote)" href="#">Email to Supplier</a>
                      <!-- <a class="dropdown-item" @click.prevent="openModal(debitnote.id)" href="#">Share</a>
                                    <a class="dropdown-item" @click.prevent="" href="#"> Add Loyalty</a> -->
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>

        <TabPane label="Received Debit Note">
          <div class=" panel">
            <br>
            <div class="row">
              <div class="col-6">
                <Alert show-icon>
                  Debit Note Amount
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
              <div class="col-6">
                <Alert show-icon>
                  Sub Total (Grand Total)
                  <Icon type="md-analytics" slot="icon"></Icon>
                  <template slot="desc">
                    <h5>$25000. 00</h5>
                  </template>
                </Alert>
              </div>
            </div>
          </div>
          <table class="panel table table-bordered">
            <thead class=" thead-default">
              <tr>
                <th class=" text-center" style="width: 1%">S/N</th>
                <th class=" text-center" style="width: 12%">Debit No</th>
                <th class=" text-center"> Customer</th>
                <th class=" text-center">Grand Total</th>
                <th class=" text-center">BoQ</th>
                <th class=" text-center" style="width: 1%"> Status</th>
                <th class=" text-center" style="width: 1%"> Action</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(debitnote, index) in debitNotesReceived" :key="index">
                <td class=" text-center">{{index + 1}}</td>
                <td class=" text-center"> {{debitnote.noteNumber}}</td>
                <td class=" text-center">{{debitnote.network.name}}</td>
                <td class=" text-center">{{debitnote.currency}} {{debitnote.grandTotal}}</td>
                <td class=" text-center"> <button @click="viewBoqs(debitnote.boqs)" class=" btn btn-xs btn-primary">view</button> </td>
                <td class=" text-center">
                  <Tag >Draft</Tag>
                </td>
                <td class="text-center">

                  <div class="dropdown ks-control">
                    <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="ks-icon la la-ellipsis-h"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                      <a class="dropdown-item" href="#" @click.prevent="editDebitNoteroute(debitnote.hash)">Edit</a>
                      <a class="dropdown-item" @click.prevent="sendEmail(debitnote)" href="#">Email to Supplier</a>
                      <!-- <a class="dropdown-item" @click.prevent="openModal(debitnote.id)" href="#">Share</a>
                                    <a class="dropdown-item" @click.prevent="" href="#"> Add Loyalty</a> -->
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
      </Tabs>
    </div>
  </div>
</div>
</template>


<script>
import {
  FulfillingBouncingCircleSpinner
} from 'epic-spinners'
export default {
  components: {
    FulfillingBouncingCircleSpinner
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
    routePurchaseInvoice() {
      // this.$router.push({
      //   name: "DebitNoteInvoice"
      // })

      this.$router.push({
        name: "PurchaseInvoice"
      })


    },

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
    this.userData = this.$store.state.userData
    //   get all Debit Note....
    this.$axios.get(`${this.$apiCloudenly}credit-debit-note/all/debit/${this.userData.businessId}/${this.userData.businessId}`, this.$simpleAuthHeader).then(resp => {
      console.log(resp.data)
      if (resp.data.length === 0) {
        // this.debitNotes = ''
        this.showLoading = false,
          this.showAlert = true
      } else {
        this.debitNotes = resp.data
        this.showLoading = false
        this.showTable = true
      }
    }).catch((err) => {
      console.log(err)
      this.showLoading = false,
        this.showAlert = true
    })

    this.$axios.get(`${this.$apiCloudenly}credit-debit-note/received/all/debit/${this.userData.businessId}`, this.$simpleAuthHeader).then(resp => {
      console.log(resp.data)
      if (resp.data.length === 0) {
        // this.debitNotes = ''
        this.showLoading = false,
          this.showAlert = true
      } else {
        this.debitNotesReceived = resp.data
        this.showLoading = false
        this.showTable = true
      }
    }).catch((err) => {
      console.log(err)
      this.showLoading = false,
        this.showAlert = true
    })
  }
}
</script>

<style>

</style>
