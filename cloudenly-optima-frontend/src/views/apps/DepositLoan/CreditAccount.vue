<template>
<div class=" ">
 <div class="ks-page-header">

  <section class="ks-title">
      <h3>Credit Account</h3>
      </section>
        </div>
    <div class="ks-body">
        <br><br> <br><br>
        <div class="container">
          <div class="row">
             <div class="col-lg-4">
            <div class="card panel panel-default ks-bg-light-gray ks-solid">
                <div class="card-block">
                    <div class="payment-simple-amount-item-description">
                      <h5>
                      Credit Total Amount <span class="ks-progress-type">: </span>
                      </h5>
                    </div>
                </div>
            </div>
         </div>

         <div class="col-lg-4">
          <div class="card panel panel-default ks-bg-light-gray ks-solid">
                <div class="card-block">
                    <div class="payment-simple-amount-item-description">
                      <h5>
                      Invoice Receivable <span class="ks-progress-type">:</span>
                      </h5>
                    </div>
                </div>
            </div>
         </div>


          <div class="col-lg-4">
          <div class="card panel panel-default ks-bg-light-gray ks-solid">
                <div class="card-block">
                    <!-- <h4 class="card-title ">Total Pricebook Items</h4> -->
                    <div class="payment-simple-amount-item-description">
                      <h5>
                       Deposit and Loan<span class="ks-progress-type">: </span>
                      </h5>
                    </div>
                </div>
            </div>
         </div>
          </div>
        </div>
      <br><br>
     <div class="container">
      <Tabs :animated="false">
        <TabPane label="Invoice Receivables">
            <div class="panel">
              <br>
              <div class="container">
                <div class="row">
                  <div class="col-3">
                      <select v-model="search"  placeholder="Select Customer" class=" form-control" >
                        <option value="" disabled selected>Filter customer</option>
                        <option > </option>
                     </select>
                    </div>
                      <div class="col-3">
                          <select name="" id="" class="  form-control">
                            <option value="" disabled selected>Filter Status</option>
                            <option value="all"> draft</option>
                            <option value="sent"> Sent</option>
                            <option value="service"> Unpaid</option>
                            <option value="service"> Paid</option>
                            <option value="service"> Overdue</option>
                            <option value="service"> Unsent</option>
                        </select>
                      </div>
                       <div class="col-3">
                        <Input  style="width: 250px"   search enter-button    placeholder="Invoice No..." />
                      </div>
                     <div class="col-3">
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
                 <br>

                 <div class="container">
                    <div class="row">
                      <div class="col-6">
                        <Alert show-icon>
                          Sub Total (Amount VAT Incl)
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
              <table class="table table-bordered table-striped  table-hover">
                <thead class="thead-default">
                <tr>
                  <!-- <th class=" text-center"> category</th> -->
                  <th class=" text-center"> Customer Name</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">Transaction Date</th>
                  <th class=" text-center">Invoice No</th>
                  <th class=" text-center">Invoice Amount</th>
                  <th class=" text-center">Amount Paid </th>
                  <th class=" text-center">Payment date </th>
                  <th class=" text-center">Invoice Receivable Balance</th>
                  <!-- <th class=" text-center">Date</th> -->
                </tr>
                </thead>
                <tbody>
                <template>
                  <tr v-for="(invoice,index) in creditAcount.invoiceReceivable " :key="index">
                        <!-- <td class=" text-center">Invoice Receivable</td> -->
                        <td class=" text-center">{{invoice.customer.name}}</td>
                        <td class=" text-center">{{invoice.invoice. description}}</td>
                        <td class=" text-center"> {{invoice.invoice.createdAt}}</td>
                        <td class=" text-center"> {{invoice.invoice.invoiceNo}} </td>
                        <td class=" text-center"> <Tag color="success">{{invoice.invoice.currency}}{{invoice.invoice.grandTotal}}</Tag></td>
                        <td class=" text-center"> {{invoice.payment.invoiceAmountPaid}}</td>
                        <td class=" text-center"> {{invoice.payment.paymentDate}}</td>
                        <td class=" text-center"> {{invoice.payment.invoiceReceivableBalance}}</td>
                        <!-- <td class=" text-center"> {{invoice.payment.invoiceReceivableBalance}}</td> -->
                    </tr>
                  </template>
              </tbody>
            </table>
            </div>
            <!-- <br><br><br><br><br><br> -->
        </TabPane>

         <TabPane label=" Debit Note ">
             <div class="panel">
              <br>
              <div   class="container">
                <div class="row">
                  <div class="col-3">
                      <select v-model="search"  placeholder="Select Customer" class=" form-control" >
                        <option value="" disabled selected>Filter customer</option>
                        <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }}</option>
                     </select>
                    </div>
                      <div class="col-3">
                          <select name="" id="" class="  form-control">
                            <option value="" disabled selected>Filter Status</option>
                            <option value="all"> draft</option>
                            <option value="sent"> Sent</option>
                            <option value="service"> Unpaid</option>
                            <option value="service"> Paid</option>
                            <option value="service"> Overdue</option>
                            <option value="service"> Unsent</option>
                        </select>
                      </div>
                       <div class="col-3">
                        <Input  style="width: 250px"   search enter-button    placeholder="Invoice No..." />
                      </div>
                     <div class="col-3">
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
                 <br>
                 <div class="container">
                    <div class="row">
                      <div class="col-6">
                        <Alert show-icon>
                          Sub Total (Amount VAT Incl)
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
              <table class="table table-bordered table-striped  table-hover">
                <thead class="thead-default">
                <tr>
                  <th class=" text-center"> Receiver Name</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">Transaction Date</th>
                  <th class=" text-center">Debit Note No</th>
                  <th class=" text-center">Debit Amount</th>
                  <th class=" text-center">Amount Applied</th>
                  <th class=" text-center">Date Applied</th>
                  <th class=" text-center">Debit Note Balance</th>
                  <!-- <th class=" text-center">Date</th> -->
                </tr>
                </thead>
                <tbody>
                  <template>
                    <tr v-for="(debitNote,index) in creditAcount.debitNoteReceivable " :key="index">
                          <td class=" text-center">{{debitNote.receiverName.name}}</td>
                          <td class=" text-center">{{debitNote.debitNote.description}}</td>
                          <td class=" text-center"> {{debitNote.debitNote.createdAt}}</td>
                          <td class=" text-center"> {{debitNote.debitNote.noteNumber}} </td>
                          <td class=" text-center"> <Tag color="success">{{debitNote.debitNote.currency}}{{debitNote.debitNote.grandTotal}}</Tag></td>
                          <td class=" text-center"> {{debitNote.payment.debitNoteApplied}}</td>
                          <td class=" text-center"> {{debitNote.payment.dateApplied}}</td>
                          <td class=" text-center"> {{debitNote.payment.debitNoteBalance}}</td>
                          <!-- <td class=" text-center"> {{debitNote.payment.invoiceReceivableBalance}}</td> -->
                      </tr>
                    </template>
              </tbody>
            </table>
            </div>
        </TabPane>


        <TabPane label="Deposit Account">
            <div class="panel">
              <br>
              <div class="container">
                <div class="row">
                  <div class="col-3">
                      <select v-model="search"  placeholder="Select Customer" class=" form-control" >
                        <option value="" disabled selected>Filter customer</option>
                        <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }}</option>
                     </select>
                    </div>
                      <div class="col-3">
                          <select name="" id="" class="  form-control">
                            <option value="" disabled selected>Filter Status</option>
                            <option value="all"> draft</option>
                            <option value="sent"> Sent</option>
                            <option value="service"> Unpaid</option>
                            <option value="service"> Paid</option>
                            <option value="service"> Overdue</option>
                            <option value="service"> Unsent</option>
                        </select>
                      </div>
                       <div class="col-3">
                        <Input  style="width: 250px"   search enter-button    placeholder="Invoice No..." />
                      </div>
                     <div class="col-3">
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
                 <br>

                 <div class="container">
                    <div class="row">
                      <div class="col-6">
                        <Alert show-icon>
                          Sub Total (Amount VAT Incl)
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
              <table class="table table-bordered table-striped  table-hover">
                <thead class="thead-default">
                <tr>
                 <!-- =<th class=" text-center"> Category</th> -->
                  <th class=" text-center"> Receiver Name</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">Transaction Date</th>
                  <th class=" text-center">Transaction No</th>
                  <th class=" text-center">Currency</th>
                  <th class=" text-center">Amount</th>
                  <th class=" text-center"> current Deposit Balance</th>
                  <th class=" text-center">Date</th>
                </tr>
                </thead>
                <tbody>
                <template>
                  <!-- <tr v-for="(invoice,index) in creditAcount.deposits " :key="index">
                        <td class=" text-center">{{invoice.customer.name}}</td>
                        <td class=" text-center">{{invoice.invoiceNo}}</td>
                        <td class=" text-center">{{invoice.customer. phone}}</td>
                        <td class=" text-center"> {{invoice.bidValidityDur}} {{invoice.bidValidityType}}</td>
                        <td class=" text-center"> <button @click="viewBoqs(invoice.boqs)" class=" btn btn-xs btn-info">view</button> </td>
                        <td class=" text-center">{{invoice.grandTotal}}</td >
                        <td class=" text-center"> <Tag color="success">Draft</Tag></td>
                        <td class=" text-center"> {{invoice.date}}</td>

                        <td class=" text-center">
                        <div class="dropdown ks-control">
                                <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="ks-icon la la-5x la-ellipsis-h"></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                    <a class="dropdown-item" href="#">View</a>
                                    <a @click.prevent="routeEditInvoice(invoice.id)" class="dropdown-item" href="#">Edit</a>
                                    <a @click.prevent="emailInvoice(invoice)" class="dropdown-item" href="#"> Send as Email</a>
                                    <a class="dropdown-item" href="#"> Export as PDF</a>
                                    <a class="dropdown-item" href="#"> Print</a>
                                    <a class="dropdown-item" href="#"> Delete</a>
                                </div>
                          </div>
                        </td>
                    </tr> -->
                  </template>
              </tbody>
            </table>
            </div>
        </TabPane>
         <TabPane label="Loan Account">
            <div class="panel">
              <br>
              <div class="container">
                <div class="row">
                  <div class="col-3">
                      <select v-model="search"  placeholder="Select Customer" class=" form-control" >
                        <option value="" disabled selected>Filter customer</option>
                        <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }}</option>
                     </select>
                    </div>
                      <div class="col-3">
                          <select name="" id="" class="  form-control">
                            <option value="" disabled selected>Filter Status</option>
                            <option value="all"> draft</option>
                            <option value="sent"> Sent</option>
                            <option value="service"> Unpaid</option>
                            <option value="service"> Paid</option>
                            <option value="service"> Overdue</option>
                            <option value="service"> Unsent</option>
                        </select>
                      </div>
                       <div class="col-3">
                        <Input  style="width: 250px"   search enter-button    placeholder="Invoice No..." />
                      </div>
                     <div class="col-3">
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
                 <br>

                 <div class="container">
                    <div class="row">
                      <div class="col-6">
                        <Alert show-icon>
                          Sub Total (Amount VAT Incl)
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
              <table class="table table-bordered table-striped  table-hover">
                <thead class="thead-default">
                <tr>
                  <th class=" text-center"> category</th>
                  <th class=" text-center"> Customer Name</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">Transaction Date</th>
                  <th class=" text-center">Transaction No</th>
                  <th class=" text-center">Currency</th>
                  <th class=" text-center">Amount</th>
                  <th class=" text-center"> Current Loan Balance</th>
                  <th class=" text-center">Date</th>
                </tr>
                </thead>
                <tbody>
                <template>
                  <!-- <tr v-for="(invoice,index) in creditAcount.loans " :key="index">
                        <td class=" text-center">{{invoice.customer.name}}</td>
                        <td class=" text-center">{{invoice.invoiceNo}}</td>
                        <td class=" text-center">{{invoice.customer. phone}}</td>
                        <td class=" text-center"> {{invoice.bidValidityDur}} {{invoice.bidValidityType}}</td>
                        <td class=" text-center"> <button @click="viewBoqs(invoice.boqs)" class=" btn btn-xs btn-info">view</button> </td>
                        <td class=" text-center">{{invoice.grandTotal}}</td >
                        <td class=" text-center"> <Tag color="success">Draft</Tag></td>
                        <td class=" text-center"> {{invoice.date}}</td>

                        <td class=" text-center">
                        <div class="dropdown ks-control">
                                <a class="btn btn-link ks-no-text ks-no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="ks-icon la la-5x la-ellipsis-h"></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                    <a class="dropdown-item" href="#">View</a>
                                    <a @click.prevent="routeEditInvoice(invoice.id)" class="dropdown-item" href="#">Edit</a>
                                    <a @click.prevent="emailInvoice(invoice)" class="dropdown-item" href="#"> Send as Email</a>
                                    <a class="dropdown-item" href="#"> Export as PDF</a>
                                    <a class="dropdown-item" href="#"> Print</a>
                                    <a class="dropdown-item" href="#"> Delete</a>
                                </div>
                          </div>
                        </td>
                    </tr> -->
                  </template>
              </tbody>
            </table>
            </div>
        </TabPane>
     </Tabs>
    </div>
   </div>
 </div>
</template>


<script>
  import { SpringSpinner } from "epic-spinners";
  export default {
    components: {
      SpringSpinner
    },
    data() {
      return {
        loading: false,
        search: "",
        creditAcount: '',
        modal: false,
        boqsDetails: '',
        networks: '',
      };
    },

    methods: {
      routeCreateInvoice() {
        this.$router.push({ name: "CreateInvoice" });
      },
      routeProforma(){
        this.$router.push({ name: "ProformaList" });
      },

      routeEditInvoice(val){
        console.log(val)
        this.$router.push({name: "EditInvoice", params: {id: val}})
      },
      emailInvoice(val){
           const data =  {
          title: val.description,
          business: val.business,
          total:   val.grandTotal,
          invoiceId: val.id,
          email: val.customer.name
        }
        this.$axios.post(`${this.$apiCloudenly}invoice-proforma/send`, data , this.$simpleAuthHeader).then(resp => {
           this.$swal(resp.data.message);
          }).catch(err => {
            console.log(err)
          })
      },

      viewBoqs(val){
        this.modal = true
        this.boqsDetails  = val
      },
    },

    computed: {
      //    filteredUsers() {
      //       return this.all.filter(user => {
      //       return user.customer.name.toLowerCase().includes(this.search.toLowerCase())
      //
      //   })
      // }
    },
    mounted() {
      this.userData = this.$store.state.userData;
      // this.$axios.get(`${this.$apiCloudenly}account-payable-and-receivable/receivables/${this.userData.businessId}/${this.userData.businessId}`, this.$simpleAuthHeader)
      //   .then(resp => {
      //     // console.log(resp.data);
      //     this.creditAcount = resp.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });


        this.$axios.get(`${this.$apiCloudenly}credit-account-register/${this.userData.businessId}/${this.userData.businessId}`, this.$simpleAuthHeader)
          .then(resp => {
            console.log(resp.data);
            this.creditAcount = resp.data;
          })
          .catch(err => {
            console.log(err);
          });

      //   // get list of sent invoice sent
      //     this.$axios.get(this.$apiCloudenly +"invoice-proforma/sent/all/invoice/" +this.userData.businessId,this.$simpleAuthHeader )
      //   .then(resp => {
      //     console.log('all sent', resp.data)
      //     this.allSent = resp.data;
      //     console.log(this.all);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      //
      //   // get community
      // this.$axios.get(this.$apiCloudenly +"network/all/" +this.userData.businessId,this.$simpleAuthHeader )
      //   .then(resp => {
      //     this.networks = resp.data;
      //     console.log(this.all);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

    }
  };
</script>

<style>
</style>
