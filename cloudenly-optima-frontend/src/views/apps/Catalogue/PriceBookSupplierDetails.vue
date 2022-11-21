<template>
<div>
  <div class="ks-page-header">
    <section class="ks-title">
        <Breadcrumb>
            <BreadcrumbItem to="/">Supplier Pricebook</BreadcrumbItem>
            <BreadcrumbItem>Supplier Variant Items</BreadcrumbItem>
        </Breadcrumb>
    </section>
  </div>
  <div class="ks-body">
    <br><br><br><br>
    <div class="container  panel">
      <div class="panel-body">
        <div class="row">
          <div class="col-4">

          </div>

          <div class="col-4">


          </div>


          <div class="col-4">


          </div>
        </div>
      </div>
    </div>

    <Divider>Suppler Pricebook Details</Divider>

    <div class="container-fluid">
      <div class="card" v-show="showLoading">
        <table class=" table">
          <thead class="">
            <tr>
              <th class=" text-center" style="width: 1%">S/N</th>
              <th class=" text-center" style="width: 12%">Purchase No</th>
              <th class=" text-center">Description</th>
              <th class=" text-center">Validity Period</th>
              <th class=" text-center">Validity Type</th>
              <th class=" text-center">Reason</th>
              <th class=" text-center"> Supplier Name</th>
              <th class=" text-center">Boqs</th>
              <th class=" text-center">Status</th>
              <th class=" text-center">Action</th>
            </tr>
          </thead>
        </table>
        <div class=" container">
          <div class="row">
            <div class="col-sm-4"></div>
            <br>
            <div class="col-lg-4 push-1">
              <fulfilling-bouncing-circle-spinner :animation-duration="4000" :size="50" color="blue" />
            </div>
            <br><br><br><br>
          </div>
        </div>
      </div>

      <div class="panel" v-show="showAlert">
        <table class=" table">
          <thead class="">
            <tr>
              <th class=" text-center" style="width: 1%">S/N</th>
              <th class=" text-center" style="width: 12%">Purchase No</th>
              <th class=" text-center">Description</th>
              <th class=" text-center">Validity Period</th>
              <th class=" text-center">Validity Type</th>
              <th class=" text-center">Reason</th>
              <th class=" text-center"> Supplier Name</th>
              <th class=" text-center">Boqs</th>
              <th class=" text-center">Status</th>
              <th class=" text-center">Action</th>
            </tr>
          </thead>
        </table>
      </div>


      <div class="" v-show="showTable">
        <Tabs :animated = "false">
          <TabPane label="Supplier Product">
            <div class="container-fluid">

              <div class="row" v-if="toggleView">
                <div class="col-3">
                  <Alert type="warning" show-icon>
                    Sub Total ( VAT Incl)
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <template slot="desc">
                      <h5>$25000. 00</h5>
                    </template>
                  </Alert>
                </div>
                <div class="col-3">
                  <Alert type="warning" show-icon>
                    Sub Total (Grand Total)
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <template slot="desc">
                      <h5>$25000. 00</h5>
                    </template>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert>
                    <p>Link to:</p>
                    <div class="row">
                      <div>
                        <ul>
                          <li style="cursor:pointer" class="  btn-link">Sales Catalogue</li>
                          <li style="cursor:pointer" class="  btn-link">Purchase Catalogue</li>

                          <!-- <li style="cursor:pointer"  class="  btn-link">Good Receive Note</li> -->
                        </ul>
                      </div>
                    </div>
                  </Alert>
                </div>

                <div class="col-3">
                  <!-- <Alert show-icon>
                    {{alertInventoryData.holdingInventoryDifferenceLength}} New Item Added
                    <Icon type="ios-bulb-outline" slot="icon"></Icon>
                    <template slot="desc">Add New Inventory Item. </template>
                  </Alert> -->
                </div>
              </div>

              <div class="row" v-else>
                <div class="col-3">
                  <Alert type="warning">
                    Batch:
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <Dropdown style="margin-left: 20px">
                      <Button>
                        Action
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                      <DropdownMenu slot="list">
                        <DropdownItem>Purchase Order</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Alert>
                </div>
                <div class="col-3">
                  <Alert type="warning">
                    Total Varaint Items Selected:
                    <template slot="desc">
                      <h5>{{supplierPricebookData.length}}</h5>
                    </template>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert>
                    <p>Link to:</p>
                    <div class="row">
                      <div>
                        <ul>
                          <li style="cursor:pointer" class="  btn-link">Sales Catalogue</li>
                          <li style="cursor:pointer" class="  btn-link">Purchase Catalogue</li>

                          <!-- <li style="cursor:pointer"  class="  btn-link">Good Receive Note</li> -->
                        </ul>
                      </div>
                    </div>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert show-icon>
                  </Alert>
                </div>
              </div>
            </div>

            <table class="table panel table-striped table-hover  ">
              <thead class="thead-default">
                <tr>
                  <th> <label class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" @click="selectAll" v-model="allSelected">
                      <span class="custom-control-indicator"></span></label>
                  </th>
                  <th class=" text-center">Name</th>
                  <th class=" text-center">Variant code</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">UofM</th>
                  <th class=" text-center">Category</th>`
                  <th class=" text-center">WholeSale Price</th>
                  <th class=" text-center">Retail Price</th>
                  <th class=" text-center">Supplier Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pricebook, index) in  supplierPricebook.productItems" :key="index">
                  <th>
                    <label class="custom-control custom-checkbox">
                      <input type="checkbox" v-model="supplierPricebookData" :value=pricebook class="custom-control-input">
                      <span class="custom-control-indicator"></span>
                    </label>
                  </th>
                  <td class=" text-center">{{pricebook.variant.variantName}}</td>
                  <td class=" text-center">{{pricebook.variant.variantSku}}</td>
                  <td class=" text-center">{{pricebook.mainItem.description}}</td>
                  <td class=" text-center">{{pricebook.mainItem.salesUOfM}}</td>
                  <td class=" text-center">{{pricebook.category.name}}</td>
                  <td class=" text-center"> {{pricebook.variant.wholesalePrice}}</td>
                  <td class=" text-center">{{pricebook.variant.retailPrice}}</td>
                  <td class=" text-center">{{pricebook.supplierItemInfo.price}}</td>


                </tr>
              </tbody>
            </table>
          </TabPane>


          <TabPane label="Supplier Service">
            <div class="container-fluid">

              <div class="row" v-if="toggleView">
                <div class="col-3">
                  <Alert type="warning" show-icon>
                    Sub Total ( VAT Incl)
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <template slot="desc">
                      <h5>$25000. 00</h5>
                    </template>
                  </Alert>
                </div>
                <div class="col-3">
                  <Alert type="warning" show-icon>
                    Sub Total (Grand Total)
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <template slot="desc">
                      <h5>$25000. 00</h5>
                    </template>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert>
                    <p>Link to:</p>
                    <div class="row">
                      <div>
                        <ul>
                          <li style="cursor:pointer" class="  btn-link">Sales Catalogue</li>
                          <li style="cursor:pointer" class="  btn-link">Purchase Catalogue</li>

                          <!-- <li style="cursor:pointer"  class="  btn-link">Good Receive Note</li> -->
                        </ul>
                      </div>
                    </div>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert show-icon>
                    <!-- {{alertInventoryData.holdingInventoryDifferenceLength}} New Item Added
                    <Icon type="ios-bulb-outline" slot="icon"></Icon>
                    <template slot="desc">Add New Inventory Item. </template> -->
                  </Alert>
                </div>

              </div>

              <div class="row" v-else>
                <div class="col-3">
                  <Alert type="warning">
                    Batch:
                    <Icon type="md-analytics" slot="icon"></Icon>
                    <Dropdown style="margin-left: 20px">
                      <Button>
                        Action
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                      <DropdownMenu slot="list">
                        <DropdownItem>Purchase Order</DropdownItem>


                      </DropdownMenu>
                    </Dropdown>
                  </Alert>
                </div>
                <div class="col-3">
                  <Alert type="warning">
                    Total Varaint Items Selected:
                    <template slot="desc">
                      <h5>{{supplierPricebookData.length}}</h5>
                    </template>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert>
                    <p>Link to:</p>
                    <div class="row">
                      <div>
                        <ul>
                          <li style="cursor:pointer" class="  btn-link">Sales Catalogue</li>
                          <li style="cursor:pointer" class="  btn-link">Purchase Catalogue</li>

                        </ul>
                      </div>
                    </div>
                  </Alert>
                </div>

                <div class="col-3">
                  <Alert show-icon>

                  </Alert>
                </div>
              </div>
            </div>

            <table class="table panel table-striped table-hover  ">
              <thead class="thead-default">
                <tr>
                  <th> <label class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" @click="selectAll" v-model="allSelected">
                      <span class="custom-control-indicator"></span></label>
                  </th>
                  <th class=" text-center">Name</th>
                  <th class=" text-center">Variant code</th>
                  <th class=" text-center">Description</th>
                  <th class=" text-center">UofM</th>
                  <th class=" text-center">Category</th>
                  <th class=" text-center">WholeSale Price</th>
                  <th class=" text-center">Retail Price</th>
                  <th class=" text-center">Supplier Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pricebook, index) in  supplierPricebook.serviceItems " :key="index">
                  <th>
                    <label class="custom-control custom-checkbox">
                      <input type="checkbox" v-model="supplierPricebookData" :value=pricebook class="custom-control-input">
                      <span class="custom-control-indicator"></span>
                    </label>
                  </th>
                  <td class=" text-center">{{pricebook.variant.variantName}}</td>
                  <td class=" text-center">{{pricebook.variant.variantSku}}</td>
                  <td class=" text-center">{{pricebook.mainItem.description}}</td>
                  <td class=" text-center">{{pricebook.mainItem.salesUOfM}}</td>
                  <td class=" text-center">{{pricebook.category.name}}</td>
                  <td class=" text-center"> {{pricebook.variant.wholesalePrice}}</td>
                  <td class=" text-center">{{pricebook.variant.retailPrice}}</td>
                  <td class=" text-center">{{pricebook.supplierItemInfo.price}}</td>


                </tr>
              </tbody>
            </table>
          </TabPane>
        </Tabs>
      </div>
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
      bussinesData: '',
      userData: '',
      showLoading: true,
      showAlert: false,
      showTable: false,
      supplierPricebookData: [],
      supplierPricebook: [],
      toggleView: true,
      allSelected: false
    }
  },
  methods: {
    viewBoqs(val) {
      console.log(val)
      this.modal = true
      this.boqsDetails = val
    },

    selectAll: function() {
      this.supplierPricebookData = [];
      if (!this.allSelected) {
        this.supplierPricebook.productItems.map(pricebook => {
          this.supplierPricebookData.push(pricebook);
        });
      }
    },
  },

  watch: {
    "supplierPricebookData": function() {
      console.log(this.supplierPricebookData.length)
      if (this.supplierPricebookData.length === 0) {
        this.toggleView = true
      } else {
        this.toggleView = false
      }
    }
  },
  mounted() {
    this.bussinesData = this.$store.state.userData
    this.userData = this.$businessData
    this.hash = this.$route.params.id
    this.$axios.get(this.$apiCloudenly + "consolidated-catalog/get-supplier-item/" + this.hash, this.$simpleAuthHeader).then(resp => {
      console.log(resp.data)
      if (resp.data.length === 0) {
        this.showAlert = true
       } else {
        this.supplierPricebook = resp.data
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

<style scoped>


</style>
