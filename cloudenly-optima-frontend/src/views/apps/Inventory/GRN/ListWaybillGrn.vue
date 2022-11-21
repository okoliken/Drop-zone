<template>
 <div>
   <div class="ks-page-header">
      <section class="ks-title">
        <h3>Purchase Sales Waybill</h3>
      </section>
    </div>
    <br><br><br><br><br>
     <div class="ks-body" >
         <br><br>
         <div class=" container ">
           <div class="row ">
                 <div class="col-4">
                      <select   name="" id="" class=" form-control">
                        <option value="" disabled selected>Filter Purchase Sales Invoice</option>
                        <option value="all"> All</option>
                        <option value="product"> Product</option>
                        <option value="service"> Service</option>
                      </select>
                  </div>

                  <div class="col-4">
                    <Input  style="width: 350px"  v-model="search" size="large" search enter-button placeholder="Enter Product/Service Name..." />
                  </div>
                  <div class="col-4">

                  </div>
             </div>
         </div>
             <br><br>

                 <Modal
                    v-model="modal"
                    title="Supplier BOQS Details"
                    width = 1000>

                    <table class=" table table-bordered">
                        <thead>
                            <tr>
                                <th class=" text-center">Name</th>
                                <th class=" text-center">type</th>
                                <th class=" text-center">Unit</th>
                                <th class=" text-center">Category</th>
                                <th class=" text-center">Description</th>
                                <th class=" text-center">quantity Invoiced </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(boq, index) in boqDetails" :key="index">
                                <td class=" text-center">{{boq.name}}</td>
                                <td class=" text-center">{{boq.type}}</td>
                                <td class=" text-center"> {{boq.unit}}</td>
                                <td class=" text-center"> {{boq.category}}</td>
                                <td class=" text-center"> {{boq.description}}</td>
                                <td class=" text-center"> {{boq.quantity}}</td>
                            </tr>
                        </tbody>
                    </table>
               </Modal>
         <div class="container">
              <div v-show="showTable">

                  <table class="table table-bordered table-striped  table-hover   large-only">
            <thead class="thead-default">
            <tr>
              <th width="1">S/N</th>
              <th>Invoice No</th>
              <th>Description</th>
              <th>Validity Period</th>
              <th>Validity Type</th>
              <th>BOQ</th>
              <th>Grand Total</th>
              <th class=" text-center">Status</th>
              <th class=" text-center">Action</th>
            </tr>
            </thead>
            <tbody>
                <template>
                  <tr v-for="(invoice,index) in allRequestion " :key="index">
                    <td scope="row">{{index+1}}</td>
                        <td>{{invoice.invoiceNo}}</td>
                        <td>{{invoice.description}}</td>
                        <td>{{invoice.bidValidityDur}}</td>
                        <td class="text-center"> {{invoice.bidValidityType}} </td>
                        <td> <button @click="showBoqs(invoice.boqs)" class="btn btn-xs btn-primary">View</button></td>
                        <td>{{invoice.grandTotal}}</td>
                        <td> <Badge dot>
                        </Badge></td>
                          <td class="text-center"> <button @click="routeWaybilGRN(invoice.hash)" class=" btn btn-sm btn-primary"> Generate GRN</button> </td>

                    </tr>
                  </template>
              </tbody>
            </table>

              </div>


                  <div v-show="showLoading">
                       <table class=" table table-bordered">
                            <thead class=" thead-default">
                            <tr>
                                <th width="1">S/N</th>
                                <th>Invoice No</th>
                                <th>Description</th>
                                <th>Validity Period</th>
                                <th>Validity Type</th>
                                <th>BOQ</th>
                                <th>Grand Total</th>
                                <th class=" text-center">Status</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                       </table>
                       <div class="row" >
                        <div class="col-sm-4"></div>
                            <br>
                            <div class="col-lg-4 push-1">
                         <fulfilling-bouncing-circle-spinner
                            :animation-duration="4000"
                            :size="50"
                            color="blue"
                          />
                         </div>
                            <br><br><br><br>
                        </div>
                  </div>
                   <div  v-show="showAlert">
                        <table class=" table table-bordered">
                            <thead class=" thead-default">
                            <tr>
                                <th width="1">S/N</th>
                                <th>Invoice No</th>
                                <th>Description</th>
                                <th>Validity Period</th>
                                <th>Validity Type</th>
                                <th>BOQ</th>
                                <th>Grand Total</th>
                                <th class=" text-center">Status</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                       </table>

                         <div class=" container" v-show="showAlert">
                       <Alert type="success" show-icon>
                           <h4>
                                You dont have any Purchase Waybill yet!
                           </h4>
                            <span slot="desc">   </span>
                        </Alert>
                   </div>

              </div>
              </div>
          </div>
    </div>
</template>


<script>
 import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
export default {
   components: {
      FulfillingBouncingCircleSpinner
    },
   data(){
   return {
      allRequestion: '',
      bussinesData: '',
      search: '',
      modal: false,
      showLoading: false,
      showAlert: false,
      showTable: false,
      boqDetails: '',

      }
    },
  methods: {
       showBoqs(boq){
        this.modal = true
        this.boqDetails = boq
      },

      routeWaybilGRN(val){
          this.$router.push({name: "CreateWaybillGrn" , params : {id: val}})
      },

  },
  mounted(){
     this.bussinesData = this.$store.state.userData
     console.log(this.bussinesData);
     this.showLoading = true
      this.$axios.get(`${this.$apiCloudenly}waybill/received/all/${this.bussinesData.businessId}`, this.$simpleAuthHeader).then((resp) => {
            console.log(resp.data)
            if(resp.data.length === 0){
            // this.allRequestion = ''
            this.showLoading = false,
            this.showAlert = true
            }else{
            this.allRequestion = resp.data
            this.showLoading = false
            this.showTable = true
            }
        }).catch((err) => {
            console.log(err)
            this.showLoading = false,
            this.showAlert = true
        });
  }
}
</script>

<style>

</style>
