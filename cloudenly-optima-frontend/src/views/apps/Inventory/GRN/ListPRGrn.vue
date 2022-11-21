<template>
 <div>
   <div class="ks-page-header">
      <section class="ks-title">
        <h3>Purchase Requisition</h3>
      </section>
    </div>
    <br><br><br><br><br>
     <div class="ks-body" >
         <br><br>
         <div class=" container ">
           <div class="row ">
                 <div class="col-4">
                      <select   name="" id="" class=" form-control">
                        <option value="" disabled selected>Filter Purchase Requsition</option>
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
              title="BOQ Details"
              width = 900 >

              <table class="table table-bordered">
                <thead class=" ">
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Unit</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th> Qty Requested</th>
                    <th>Proposed Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(boq , index) in boqDetails" :key="index">
                    <td> {{boq.name}} </td>
                    <td> {{boq.type}} </td>
                    <td> {{boq.unit}} </td>
                    <td> {{boq.code}} </td>
                    <td> {{boq.description}} </td>
                    <td> {{boq.quantityRequested}} </td>
                    <td> {{boq.proposedPurchasePrice}} </td>
                  </tr>
                </tbody>
              </table>
          </Modal>
         <div class="container">
              <div v-show="showTable">
                 <table class=" table table-bordered">
                     <thead class=" thead-default">
                       <tr>
                           <th class=" text-center" style="width: 1%">S/N</th>
                           <th class=" text-center" style="width: 12%"> Serial No</th>
                           <th class=" text-center">Description</th>
                           <th class=" text-center">BoQ</th>
                           <th class=" text-center" style="width: 1%"> action</th>
                       </tr>
                   </thead>
                    <tbody>
                       <tr v-for="(requisation, index) in allRequestion" :key="index">
                           <td class=" text-center">{{index + 1}}</td>
                           <td class=" text-center"> {{requisation.purchaseRequisitionNumber}}</td>
                           <td class=" text-center">{{requisation.description}}</td>
                           <td class=" text-center"> <button @click="showBoqs(requisation.boqs)" class=" btn btn-xs btn-primary">view</button> </td>                           
                          <td class="text-center"> <button @click="routeEditPr(requisation.id)" class=" btn btn-sm btn-primary"> Generate GRN</button> </td>   
                        </tr>
                   </tbody>
               </table>
              </div>


                  <div v-show="showLoading">  
                       <table class=" table table-bordered">
                            <thead class=" thead-default">
                            <tr>
                                <th class=" text-center" style="width: 1%">S/N</th>
                                <th class=" text-center" style="width: 12%"> Serial No</th>
                                <th class=" text-center">Description</th>
                                <th class=" text-center">BoQ</th>
                                <th class=" text-center" style="width: 1%"> action</th>
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
                   <div class=" container" v-show="showAlert">
                       <Alert type="success" show-icon>
                            You dont have any Purchase Requisation yet!
                            <span slot="desc">  <button  @click="createRequisation" class="btn-link "> <i class=" fa fa-1x fa-plus"></i> Create Purchase Requisation</button>. </span>
                        </Alert>
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
      createRequisation(){
          this.$router.push({name: "PurchaseRequisation"})
      },
      routeEditPr(val){
          this.$router.push({name: "CreatePRGoodRN" , params : {id: val}})
      },
      createNewGRN(){
        this.$router.push({name: "CreateGoodReceiveNote"})
      },
     

// Load Purchase Invoice
    //   loadPurchaseInvoice(){
    //        this.showTable = false
    //         this.showLoading = true,
    //       this.$axios.get(`${this.$apiCloudenly}invoice-proforma/recieved/all/invoice`, this.$simpleAuthHeader).then((resp) => {
    //         console.log(resp.data)
    //         if(resp.data.length === 0){
    //         // this.allRequestion = '' 
    //         this.showAlert = true        
    //         }else{
    //         this.allRequestion = resp.data
    //         this.showLoading = false
    //         this.showTable = true
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    //   }  
  },
  mounted(){
    //   get all purchase-requisition
     this.bussinesData = this.$store.state.userData
     this.showLoading = true

this.$axios.get(`${this.$apiCloudenly}purchase-requisition/all/${this.bussinesData.businessId}`, this.$simpleAuthHeader).then((resp) => {
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
