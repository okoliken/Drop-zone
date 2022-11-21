<template>
    <div class="">

        <div class=" mb-3">
            <div class="flex">
                <div class="w-1/2 mr-5">
                    <vs-alert active="true">
                        Sub Total (Amount VAT Incl)
                        <h5>$25000. 00</h5>

                    </vs-alert>

                </div>
                <div class="w-1/2">
                    <vs-alert active="true">

                        Sub Total (Amount VAT Incl)

                        <h5>$25000. 00</h5>


                    </vs-alert>
                </div>
            </div>
        </div>

        <div class=" mb-3">

            <div class="flex items-center  align-items-center mb-3">

                <div class=" w-1/3 mr-2">
                    <vs-select v-model="search" placeholder="Select Customer" class=" w-full">
                        <option value="" disabled selected>Filter customer</option>
                        <option v-for="network in networks" :value="network.name" :key="network.id">{{ network.name }}
                        </option>
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

                <div class="w-1/3">


                    <section class="mb-3 float-right">
                        <button @click="routeCreateRentalInvoice" type="button" class="">Create Rental Invoice
                        </button>
                    </section>

                </div>



            </div>
        </div>

        <table class="table table-auto table-responsive w-full">
            <thead class=" bg-grey-lighter">
                <tr>
                    <th class=" py-4"> CUSTOMER NAME</th>
                    <th class=" py-4"> INVOICE</th>
                    <th class=" py-4">PHONE NO.</th>
                    <th class=" py-4">VALIDITY</th>
                    <th class=" py-4">BOQ</th>
                    <th class=" py-4">AMOUNT (VAT Incl)</th>
                    <th class=" py-4">STATUS</th>
                    <th class=" py-4">DATE</th>
                    <th class=" py-4">ACTION</th>
                </tr>
            </thead>
            <tbody>
                <template>
                    <!-- <tr v-for="(invoice,index) in filteredUsers " :key="index">
                        <td class="">{{invoice.customer.name}}</td>
                        <td class="">{{invoice.invoiceNo}}</td>
                        <td class="">{{invoice.customer. phone}}</td>
                        <td class=""> {{invoice.bidValidityDur}} {{invoice.bidValidityType}}</td>
                        <td class=""> <button @click="viewBoqs(invoice)"
                                class=" btn btn-xs btn-info">view</button> </td>
                        <td class="">{{invoice.grandTotal}}</td>
                        <td class="">
                            <Poptip trigger="hover" word-wrap width="100"
                                content="Quotation you created but you have not sent fot Approval">
                                <Tag color="orange">Draft</Tag>

                            </Poptip>
                        </td>
                        <td class=""> {{invoice.date}}</td>
                        <td class="">
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
                    </tr> -->



                    <tr>
                        <td class="py-3 pl-3 pb-3">Olamiposi Olorunsola</td>
                        <td class="py-3 pl-3 pb-3">234</td>
                        <td class="py-3 pl-3 pb-3">07066921563</td>
                        <td class="py-3 pl-3 pb-3"> 30-Days</td>
                        <td class="py-3 pl-3 pb-3"> <button
                                class=" cursor-pointer outline-none rounded-full px-2 bg-cloudenly-primary-main text-white">view</button>
                        </td>
                        <td class="py-3 pl-3 pb-3">45,000.00</td>
                        <td class="py-3 pl-3 pb-3">
                            <span class=" font-semibold text-cloudenly-danger-main">Draft</span>
                        </td>
                        <td class="py-3 pl-3 pb-3"> 3/6/2019</td>
                        <td class="py-3 pl-3 pb-3">
                            <!-- <div class="dropdown">
                                 <button class="btn border rounded-full dropdown-toggle" type="button"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 </button>
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
                            </div> -->
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>




<script>

// import invoiceAnalysis from "../invoice/salesInvoiceAnalysis"
  export default {
    components: {
    //   invoiceAnalysis
    },
    data() {
      return {
        loading: false,
        search: "",
        all: [],
        allSent: [],
        userData: "",
        boqsDetails: [],
        modal: false,
        networks: '',
      };
    },

    methods: {
      routeCreateRentalInvoice() {
        this.$router.push({
          name: "CrudRentalInvoice"
        });
      },
      routeProforma() {
        this.$router.push({
          name: "ProformaList"
        });
      },

      routeEditRental(val) {
        console.log(val)
        this.$router.push({
          name: "EditRentalInvoice",
          params: {
            id: val
          }
        })
      },
      emailInvoice(val) {
        const data = {
          title: val.description,
          business: val.business,
          total: val.grandTotal,
          invoiceId: val.hash,
          email: val.customer.email
        }
        this.$axios.post(`${this.$apiCloudenly}invoice-proforma/send`, data, this.$simpleAuthHeader).then(resp => {
          this.$swal(resp.data.message);
        }).catch(err => {
          console.log(err)
        })
      },

      viewBoqs(val) {
        this.modal = true
        this.boqsDetails = val
      },
    },

    computed: {
      filteredUsers() {
        return this.all.filter(user => {
          return user.customer.name.toLowerCase().includes(this.search.toLowerCase())

        })
      }
    },
    mounted() {
      this.userData = this.$store.state.userData;
      // get list of user in the store
      this.$axios
        .get(this.$apiCloudenly + "invoice-proforma/all/invoice/" + this.userData.businessId + "/" + this.userData
          .businessId + "/rental", this.$simpleAuthHeader
        )
        .then(resp => {
          console.log(resp.data);
          this.all = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
      // get list of sent invoice sent
      this.$axios.get(this.$apiCloudenly + "invoice-proforma/sent/all/invoice/" + this.userData.businessId + "/" + this
          .userData.businessId + "/rental", this.$simpleAuthHeader)
        .then(resp => {
          console.log(resp.data);
          this.allSent = resp.data;
        })
        .catch(err => {
          console.log(err);
        });

      // get community
      this.$axios.get(this.$apiCloudenly + "network/all/" + this.userData.businessId, this.$simpleAuthHeader)
        .then(resp => {
          this.networks = resp.data;
        })
        .catch(err => {
          console.log(err);
        });

    }
  };
</script>



<style>

</style>