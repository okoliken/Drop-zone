<template>
  <div class="container">

    <!-- Edit Pricebook Modal -->
    <!-- End Edit Pricebook Modal -->
    <div class="">

      <div class="flex justify-between flex-row-reverse items-center ">

          <button type="submit" class="cursor-pointer outline-none bg-cloudenly-primary-main p-2 text-white rounded-full border-0
               :hover:text-white font-bold py-2 px-4">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            Export Inventory
          </button>

        <vs-input style="width: 370px" v-model="search" size="large" placeholder="Enter Product/Service Name..." />
      </div>


      <!-- <Drawer
                    title="Item Details"
                    v-model="modal"
                    width="720"
                    :mask-closable="false"
                    :styles="styles">

                    <div class=" container panel" >
                      <br>
                    <div class="row">
                        <div class="col-6 text-left">
                            <h4>{{singleItem.name}}</h4><br>
                            <h5>Item Code : {{singleItem.code}}</h5><br>
                            <h5>Stock Value(Purchase Price) : {{itemDetails.purchasePrice}} </h5><br>
                            <h5>Stock Value(Selling Price) : {{itemDetails.sellingPrice}} </h5><br>
                        </div>

                        <div class="col-6 text-right">
                            <br>
                            <h5> Total Invoice Qty : {{singleItem.invoicedQuantity}}</h5><br>
                            <h5> Total Waybill Qty :  {{singleItem.waybillQuantity}} </h5><br>
                            <h5> Total Invoice but not Waybill:  {{singleItem.quantityInvoicedNotSupplied}} </h5> <br>
                            <h5> Stock Balance: {{singleItem.closingStock}} </h5>
                        </div>
                    </div>
                        
                    <div class="card">
                        <Tabs type="card">
                          <TabPane label="Waybill History">
                              <table class=" table">
                                  <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Invoice No</th>
                                    <th>Invoice Qty</th>
                                    <th>Waybill Qty</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(waybill, index) in itemDetails.wayBillHistory" :key="index">
                                      <td>{{waybill.wayBillHistory.createdAt}}</td>
                                      <td>{{waybill.wayBillHistory.invoiceNumber}}</td>
                                      <td>{{waybill.wayBillHistory.wayBillHistory.invoiceQuantity}}</td>
                                      <td>{{waybill.wayBillHistory.wayBillHistory.wayBillQuantity}}</td>
                                    </tr>
                                  </tbody>
                              </table>
                          </TabPane> 
                             <TabPane label="Stock Balance History">
                            <table class=" table">
                                  <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Opening Stock Qty</th>
                                    <th>Closing Stock Qty</th>
                                  </tr>
                                  </thead>

                                  <tbody>
                                    <tr v-for="(stockHistory, index) in itemDetails.stockBalanceHistory" :key="index">
                                      <td>{{stockHistory.createdAt}}</td>
                                      <td>{{stockHistory.openingStock}}</td>
                                      <td>{{stockHistory.closingStock}}</td>
                                    </tr>
                                  </tbody>
                              </table>
                          </TabPane>
                          <TabPane label=" Activity History"> <table class=" table">
                                  <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Activity</th>
                                    <th>Qty</th>
                                    <th>Action By</th>
                                    <th>From</th>
                                    <th>To</th>
                                  </tr>
                                  </thead>
                              </table>
                          </TabPane>
                        </Tabs>
                    </div>
                        
                      </div>
             </Drawer> -->

      <div class="mt-3">

        <table class="table table-auto  w-full  ">
          <thead class="bg-grey-lighter">
            <tr>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center"> Item Name</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Unit</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center"> Opening Stock</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Issue Qty</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Added Stock</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Closing Stock</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Invoice Qty</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Reoder Level</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Inventory Value</th>
              <th class=" py-4 text-cloudenly-primary-main text-lg text-center">Action</th>
            </tr>
          </thead>  
          <tbody>
            <tr v-for="(inventory, index ) in  allInventorys" :key="index">
              <td class=" text-center">{{inventory.name}}</td>
              <td class=" text-center">{{inventory.unit}}</td>
              <td class=" text-center">{{inventory.openingStock}}</td>
              <td class=" text-center">{{inventory.issuedQuantity}}</td>
              <td class=" text-center"> {{inventory.addedQuantity}} </td>
              <td class=" text-center">{{inventory.closingStock}}</td>
              <td class=" text-center"> {{inventory.invoicedQuantity}}</td>
              <td class=" text-center"> {{inventory.reorderLevel}}</td>
              <td class=" text-center"> {{inventory.inventoryValue}}</td>
              <td class=" text-center"> <button @click="openModal(inventory)" class=" btn btn-xs btn-primary"> view
                  details</button></td>
            </tr>

            <tr>
              <td class=" text-center">Toyota Corolla </td>
              <td class=" text-center">Kg </td>
              <td class=" text-center"> 50 </td>
              <td class=" text-center"> </td>
              <td class=" text-center">  </td>
              <td class=" text-center"> </td>
              <td class=" text-center"> </td>
              <td class=" text-center"> </td>
              <td class=" text-center"> </td>
              <td class=" text-center"><button class=""> view details</button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        search: '',
        modal: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static',
        },
        allInventorys: [],
        itemDetails: '',
        singleItem: '',
        allService: [],
        userData: '',
        networkSupplier: [],
        showLoading: true,
        showAlert: false,
        showTable: false

      };
    },

    methods: {
      openModal(val) {
        console.log(val)
        this.modal = true
        this.singleItem = val
        console.log(this.singleItem)
        this.$axios.get(`${this.$apiCloudenly}inventory/price-analytics/${val.code}/${this.userData.businessId}`, this
          .$simpleAuthHeader).then(resp => {
          console.log(resp.data)
          this.itemDetails = resp.data
        }).catch(err => {
          console.log(err)
        })
      },
      routeManageStock() {
        this.$router.push({
          name: "ManageStock"
        })
      },
      routeAddStock() {
        this.$router.push({
          name: "AddStock"
        })
      }

    },
    computed: {

    },
    mounted() {
      

    }
  }
</script>

<style scoped>

</style>