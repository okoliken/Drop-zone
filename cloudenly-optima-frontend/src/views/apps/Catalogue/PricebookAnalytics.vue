
<template>
 <div class="">
        <div class="ks-page-header">
      <section class="ks-title">
         <h3> Pricebook Analytics </h3>
      </section>
    </div>
    <br>
       <div class="ks-body">
             <br><br><br><br>
                 <div class="container ">
                  <Card>
                    <br>
                     <div class="row">
                       
                      <div class="col-5">
                        <div class="form-group row no-gutters">
                          <label for="" class="col-sm-3 form-control-label"><h5>Item List: </h5></label>
                             <div class="col-sm-8">
                               <select   name="" id="" class="  form-control">
                             <option value="" disabled selected>Select Items </option>
                             <option v-for="(pricebook, index) in allPricebooks" :key="index" value="">{{pricebook.name}}</option>
                            </select>
                          </div>
                       </div>                
                      </div>
                     
                     <div class="col-6">
                       <div class="row">
                          <div class="col-3 text-right ">
                            <h4>Filter</h4>
                          </div>
                         <div class="col-4">
                               <DatePicker type="date" placeholder="from" style="width: 200px"></DatePicker>
                         </div>
                         <div class="col-4">
                           <DatePicker type="date" placeholder="to" style="width: 200px"></DatePicker>
                         </div>
                       </div>
                     </div>
                       
                      </div>
                  </Card>
                </div>

                <Divider>
                 Price  Analysis
                </Divider>
              <div class=" container-fluid">
                <div class="panel">
                   <table class=" table table-bordered">
                        <thead>
                          <tr>
                            <th class=" text-center"> Item Name</th>
                            <th class=" text-center"> Unit</th>
                            <th class=" text-center"> Control Purchase Price</th>
                            <th class=" text-center"> Supplier Purchase Price</th>
                            <th class=" text-center">Purchase Price Variance</th>
                            <th class=" text-center">Control Selling Price</th>
                            <th class=" text-center">Sale Margin </th>
                            <th class=" text-center">% Sales Margin</th>
                            <th class=" text-center">Supplier name</th>
                            <th class=" text-center">Date</th>
                            <th class=" text-center">Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

      </div>

 </div>
</template>

<script>
export default {
  data () {
    return {
      userData: '',
      allPricebooks: ''
      
    }
  },

  mounted () {
      this.userData = this.$store.state.userData      

      this.$axios.get(this.$apiCloudenly + "solo-catalog-pricebook/all/" + this.userData.businessId, this.$simpleAuthHeader).then(resp => {
        // console.log(resp.data)
          // if(resp.data.length === 0){
          //   this.showLoading = false,
          //   this.showAlert = true        
          //   }else{
            this.allPricebooks = resp.data
            // this.showLoading = false
            // this.showTable = true
            // }
        }).catch((err) => {
            console.log(err)
            // this.showLoading = false,
            // this.showAlert = true 
        });
   }
}
  
</script>


<style scoped>

</style>
