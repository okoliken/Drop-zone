<template>
    <div class=" ">
        <div class="">
        

            <div class="container mb-3">
                <div class="flex">
                    <div class="w-1/3 ">
                        <div class=" alert alert-danger">
                            Sub Total ( VAT Incl)
                            <h5>$25000. 00</h5>

                        </div>

                    </div>
                    <div class="w-1/3 ">
                        <div class=" alert alert-danger">
                            Sub Total ( VAT Incl)
                            <h5>$25000. 00</h5>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class=" alert alert-info alert-danger-solid">
                            <p>Link to:</p>
                            <div class="flex">
                                <div class="col-4">
                                    <ul>
                                        <li class="  btn-link">Material Return</li>
                                        <li class="  btn-link">Material Request</li>
                                        <li class="  btn-link">Generate waybill</li>
                                        <li class="  btn-link">Good Receive Note</li>
                                    </ul>
                                </div>
                                <div class="col-8">
                                    <ul>
                                        <li class="  btn-link">Remove from Inventory</li>
                                        <li class="  btn-link">Issue Maintenance Job Order</li>
                                        <li class="  btn-link">Issue Project Job Order</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container mb-3">
                 <div class="flex">
                <div class=" w-1/3 mr-5">
                    <vs-select  class=" w-full" v-model="search" placeholder="Select Customer">
                       
                    </vs-select>
                </div>
                <div class=" w-1/3 mr-5">
                    <vs-select class=" w-full" name="" id="">
                        
                    </vs-select>
                </div>

                <div class=" w-1/3">
                    <vs-input placeholder="Items Sku No..."  class=" w-3/4"/>
                </div>
            </div>
            </div>


            <div class="">
                <table class="table table-auto w-full   ">
                    <thead class="bg-grey-lighter">
                        <tr>
                            <th class=" py-3 text-blue text-center">Name</th>
                            <th class=" py-3 text-blue text-center">code</th>
                            <th class=" py-3 text-blue text-center">Description</th>
                            <th class=" py-3 text-blue text-center">UofM</th>
                            <th class=" py-3 text-blue text-center"> Category</th>
                            <th class=" py-3 text-blue text-center"> Opening Stock</th>
                            <th class=" py-3 text-blue text-center"> Issued Stock</th>
                            <th class=" py-3 text-blue text-center">Added Stock</th>
                            <th class=" py-3 text-blue text-center"> Stock Balance</th>
                            <th class=" py-3 text-blue text-center"> Inventory Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(inventory, index ) in  allInventorys" :key="index">
                            <td class=" text-center">{{inventory.name}}</td>
                            <td class=" text-center">{{inventory.unit}}</td>
                            <td class=" text-center">{{inventory.sellingPrice}}</td>
                            <td class=" text-center">{{inventory.openingStock}}</td>
                            <td class=" text-center">{{inventory.issuedQuantity}}</td>
                            <td class=" text-center"> {{inventory.addedQuantity}}</td>
                            <td class=" text-center"> {{inventory.closingStock}}</td>
                            <td class=" text-center">{{inventory.closingStock}}</td>
                            <td class=" text-center"> {{inventory.reorderLevel}}</td>
                            <td class=" text-center"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        drawer: false,
        allInventorys: [],
        addStockModal: false,
        reoderStockModal:false,
        invoices: '',
        loader: true,
        reorderLoader: true,
        userData: '',
        inventoryData : '',
      };
    },

    methods: {
       openAddStock(val){
            this.addStockModal = true
            this.inventoryData = val
           },
        openReorderLevel(val){
            this.reoderStockModal = true
            this.inventoryData = val
           },

           addInventory(){
               this.drawer  = true
           },
      inventoryCal() {
        // eslint-disable-next-line no-unused-vars
        const closingStock = parseInt(this.inventoryData.closingStock || 0);
        const openingStock = parseInt(this.inventoryData.openingStock || 0);
        const addedStock = parseInt(this.inventoryData.addedQuantity || 0);
        const issuedStock = parseInt(this.inventoryData.issuedQuantity || 0);
        const sellingPrice = parseInt(this.inventoryData.sellingPrice || 0);
        this.inventoryData.closingStock = (openingStock + addedStock) - issuedStock;
        console.log(this.inventoryData.closingStock )
        this.inventoryData.inventoryValue = sellingPrice * parseInt(this.inventoryData.closingStock)
      },

     createWaybill(val){
        console.log(val)
        this.$router.push({name: "CreateWaybill", params: {id: val} })
         },
     stockSubmit(){
         this.loader = true
        this.$axios
          .patch(`${this.$apiCloudenly}inventory/update/${this.inventoryData.id}`,this.inventoryData, this.$simpleAuthHeader)
          .then(resp => {
            console.log(resp.data.message);
             this.$Notice.success({
                    title: 'Success',
                    desc: resp.data.message
                });
            this.addStockModal = false
            this.reoderStockModal = false
             })
          .catch(err => {
            console.log(err);
            this.addStockModal = false
            this.reoderStockModal = false
          });
         },
      },

    mounted() {
     

    }
  }
</script>
<style scoped>

/* #invenCardHeader{
    padding: 5px !important;
    margin: 0px !important
}
table{
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  color: white
}
  thead{
   background-color:rgba(149, 93, 83, 0.26) !important;
   color: white !important
}

.scrollbardrawer {
  height: 95%;
  overflow-y: scroll;
} */

</style>
