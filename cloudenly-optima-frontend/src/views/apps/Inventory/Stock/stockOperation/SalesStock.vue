<template>
  <div class="">
    <div class="ks-body">
      <!-- Added Stock Modal -->
      <vs-popup title="Add Stock" :active.sync="addStockModal">
        <div class="container">
          <div class="panel-body">
            <h5>Holding Item Name:</h5>
            <br />
            <h5>
              Holding Item Quantity (Stock Balance) : {{ tempStockBalance }}
            </h5>
            <br />
            <div class="card">
              <div class="card-body">
                <div class="container">
                  <div class="panel-body">
                    <div
                      v-if="stockbalance > 0"
                      class="form-group row no-gutters"
                    >
                      <label
                        for="example-text-input"
                        class="col-4 col-form-label"
                        ><h5>Quantity</h5></label
                      >
                      <div class="col-6">
                        <input
                          @keyup="calcHoldingStockBalance"
                          v-model="addedQty"
                          class="form-control"
                          type="text"
                          id="example-text-input"
                        />
                      </div>
                    </div>

                    <div v-else>
                      <Alert>
                        No Stock Available in your Holding Inventory You Can Add
                        to Stock Manually
                      </Alert>
                      <div class="form-group row no-gutters">
                        <label
                          for="example-text-input"
                          class="col-4 col-form-label"
                          ><h5>Quantity</h5></label
                        >
                        <div class="col-6">
                          <input
                            class="form-control"
                            v-model="addedQty"
                            type="text"
                            id="example-text-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="addToStock"
              type="button"
              class="px-5 py-2 rounded border-0 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </vs-popup>
      <!-- End AddStock Modal -->

      <!-- Issue Stock Modal -->

      <vs-popup title="Issue Stock" :active.sync="issueStockModal">
        <div class="container">
          <div class="flex justify-center">
            <button
              @click="issuedfromStock"
              type="button"
              class="px-5 py-2 rounded border-0 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </vs-popup>
      <!-- End Issue Stock Modal -->

      <!-- issue Stock -->
      <!-- <Modal
            v-model="issueStockModal"
            title="Issued Stock "
             :loading="loader"
             @on-ok="issuedfromStock">
                6     
          </Modal> -->

      <!-- Reorder Level Stock -->
      <!-- <Modal
            v-model="reoderStockModal"
            title="Reorder Level"
            :loading="loader"
            @on-ok="setReoderLevelStock">
             <div class="form-group row container">
                <label for="default-input-rounded" class=" form-control-label"> <h5> Reorder Level Quantity:</h5> </label>
                    <div class="col-sm-6">
                    <input type="text"  v-model="reorderLevelQty" placeholder="Enter Stock Quantity" class=" form-control" name="" id="">
                    <br>
                </div> 
            </div> 
             
         </Modal> -->

      <!-- De-active Inventory Item Modal -->
      <!-- <Modal
            v-model="deactiveModal"
            title="De-active Inventory Item"
            :loading="loader"
            ok-text = "proceed"
            @on-ok="deactiveItem">
              <div class="panel">
                  <div class="panel-body">
                       <div class="form-group row ">
                       <label for="default-input-rounded" class="col-4 form-control-label"> <h5> De-active Quantity :</h5> </label>
                        <div class="col-sm-8">
                        <input type="text"  v-model="deactivateData.quantity" placeholder="Enter Stock Quantity" class=" form-control" name="" id="">
                        </div> 
                  </div>

           <div class="form-group row ">
            <label for="default-input-rounded" class="col-4 form-control-label"> <h5> Reason :</h5> </label>
                <div class="col-sm-8">
                <input type="text"  v-model="deactivateData.reason" placeholder="Enter Stock Quantity" class=" form-control" name="" id="">
                </div> 
           </div>

           <div class="form-group row ">
            <label for="default-input-rounded" class="col-4 form-control-label"> <h5> Comment :</h5> </label>
                <div class="col-sm-8">
                 <textarea class=" form-control" v-model="deactivateData.comment" name="" id="" cols="20" rows="6"></textarea>
                </div> 
           </div>
                  </div>
              </div>
         </Modal> -->

      <!-- Remove Item  -->
      <!-- <Modal
        v-model="removeInventoryModal"
            title="Remove Item Inventory "
            :loading="loader"
            width= '650'
            >
            <div class="container">
                <div class="form-group row ">
                <label for="default-input-rounded" class="col-4 form-control-label"> <h5> Withdrwal Option :</h5> </label>
                    <div class="col-sm-8">
                    <select name="" id="">
                    <option value="">For Personal Use</option>
                    <option value="">Suspend For Sales</option>
                    <option value="">Withdraw From Sales</option>
                    <option value=""> Defective Item</option>
                      </select>
                        </div> 
                </div> 
            



           <div class="form-group row ">
            <label for="default-input-rounded" class="col-4 form-control-label"> <h5> Withdraw Quantity :</h5> </label>
                <div class="col-sm-8">
                <input type="text"  v-model="inventoryData.issuedQuantity" placeholder="Enter Stock Quantity" class=" form-control" name="" id="">
                </div> 
           </div>
        </div>
    </Modal> -->

      <!-- Reclassify Modal -->
      <!-- <Modal
        v-model="reclassifyModal"
        title="Reclassify Item "
        :loading="loader"
        >
            <div class="container">
            <div class="form-group row ">
            <label for="default-input-rounded" class=" form-control-label"> <h5> Select Inventory Class :</h5> </label>
                <div class="col-sm-8">
                <select class=" form-control" name="" id="">
                    <option v-for="(inventoryType,index) in inventoryType" :key="index" :value="inventoryType.hash"> {{inventoryType.name}}</option>
                </select>
                </div> 
           </div>

           
        </div>
    </Modal> -->

      <!-- Reallocate Modal -->
      <!-- <Modal
        v-model="reallocateModal"
        title="Reallocate Item "
        :loading="loader"
        @on-ok = "reallocate"
        >
           <div class="container">
            <div class="form-group row ">
             <label for="default-input-rounded" class=" col-4  form-control-label"> <h5> Select Inventory Class :</h5> </label>
                <div class="col-sm-8">
                 <select v-model="reallocateData.receivingInventoryTypeHash" class=" form-control" name="" id="">
                    <option v-for="(inventoryType,index) in inventoryType" :key="index" :value="inventoryType.hash"> {{inventoryType.name}}</option>
                </select>
                </div> 
                </div>

              <div class="form-group row ">
                <label for="default-input-rounded" class=" col-4  form-control-label"> <h5> Quantity :</h5> </label>
                <div class="col-sm-8">
                <input type="text" v-model="reallocateData.quantity"  placeholder="Enter Stock Quantity" class=" form-control" name="" id="">
                </div> 
             </div>
        </div>
    </Modal> -->

      <!-- reallocateData: {
            sendingInventoryTypeHash: '',
            receivingInventoryTypeHash: "",
            variantHash: "",
            quantity: ""
        }, -->

      <!-- <Drawer title="Add Item Inventory" width="600"  :closable="true" v-model="drawer">
              <add-stock />
            </Drawer> -->

      <!-- End Modal -->

      <div class="container">
        <!-- <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="#"> <h4>Total Inventory</h4></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#"> <h4>Holding Inventory</h4></a>
            </li>

            <li class="nav-item">
                <a class="nav-link active" href="#"> <h4>Removed Inventory</h4></a>
            </li>


            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><h4>Other Inventory</h4></a>
                <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </li>
           
            </ul> -->

        <div class="flex mb-3">
          <div class="w-1/3 mr-5">
            <vs-select
              class="w-full"
              v-model="search"
              placeholder="Select Customer"
            >
            </vs-select>
          </div>
          <div class="w-1/3 mr-5">
            <vs-select class="w-full" name="" id=""> </vs-select>
          </div>

          <div class="w-1/3">
            <vs-input placeholder="Items Sku No..." class="w-3/4" />
          </div>
        </div>
        <!-- <div class="container-fluid"> 
                        <div class="row" v-if ="toggleView">
                        <div class="col-3">
                            <Alert type="warning" show-icon>
                            Sub Total ( VAT Incl)
                            <Icon type="md-analytics" slot="icon"></Icon>
                            <template slot="desc"> <h5>$25000. 00</h5></template>
                            </Alert>
                        </div>
                        <div class="col-3">
                            <Alert type ="warning" show-icon>
                            Sub Total (Grand Total)
                            <Icon type="md-analytics" slot="icon"></Icon>
                            <template slot="desc"> <h5>$25000. 00</h5></template>
                        </Alert>
                        </div>
                        
                        <div class="col-3">
                            <Alert>
                                <p>Link to:</p>
                                <div class="row">
                                    <div>
                                        <ul>
                                        <li style="cursor:pointer" class="  btn-link">Material Return</li>
                                        <li style="cursor:pointer"  class="  btn-link">Material Request</li>
                                        <li style="cursor:pointer"  class="  btn-link">Generate waybill</li>
                                        <li style="cursor:pointer"  class="  btn-link">Good Receive Note</li>
                                    </ul>
                                    </div>
                                </div>
                            </Alert>
                        </div>

                         <div class="col-3">
                            <Alert show-icon>
                             4 New Item Added 
                            <Icon type="ios-bulb-outline" slot="icon"></Icon>
                            <template slot="desc">Add New Inventory Item. </template>
                        </Alert>
                        </div>

                        </div>

                      <div class="row" v-else >
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
                                    <DropdownItem>Remove</DropdownItem>
                                    <DropdownItem> Transfer</DropdownItem>
                                    <DropdownItem> Reclassified</DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                         </Alert>
                      </div>
                      <div class="col-3">
                        <Alert type ="warning" >
                          Total Inventory Selected:
                         
                          <template slot="desc"> <h5>{{inventoryData.length}}</h5></template>
                      </Alert>
                      </div>
                      
                      <div class="col-3">
                            <Alert>
                                <p>Link to:</p>
                                <div class="row">
                                    <div>
                                        <ul>
                                        <li style="cursor:pointer" class="  btn-link">Material Return</li>
                                        <li style="cursor:pointer"  class="  btn-link">Material Request</li>
                                        <li style="cursor:pointer"  class="  btn-link">Generate waybill</li>
                                        <li style="cursor:pointer"  class="  btn-link">Good Receive Note</li>
                                    </ul>
                                    </div>
                                </div>
                            </Alert>
                        </div>

                         <div class="col-3">
                            <Alert show-icon>
                             4 New Item Added 
                            <Icon type="ios-bulb-outline" slot="icon"></Icon>
                            <template slot="desc">Add New Inventory Item. </template>
                        </Alert>
                        </div>
                    </div>
                  </div> -->

        <div class=" ">
          <table class="table panel table-striped table-hover table-auto">
            <thead class="bg-grey-lighter">
              <tr>
                <th>
                  <label class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      @click="selectAll"
                      v-model="allSelected" />
                    <span class="custom-control-indicator"></span
                  ></label>
                </th>
                <th class="py-3 text-blue text-center">Name</th>
                <th class="py-3 text-blue text-center">Variant code</th>
                <th class="py-3 text-blue text-center">Description</th>
                <th class="py-3 text-blue text-center">UofM</th>
                <th class="py-3 text-blue text-center">Category</th>
                <th class="py-3 text-blue text-center">Opening Stock</th>
                <th class="py-3 text-blue text-center">Issued Stock</th>
                <th class="py-3 text-blue text-center">Added Stock</th>
                <th class="py-3 text-blue text-center">Stock Balance</th>
                <th class="py-3 text-blue text-center">Reorder Level</th>
                <th class="py-3 text-blue text-center" style="width: 4%">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(inventory, index) in allInventory" :key="index">
                <th>
                  <label class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      v-model="inventoryData"
                      :value="inventory.name"
                      class="custom-control-input"
                    />
                    <span class="custom-control-indicator"></span>
                  </label>
                </th>
                <td class="text-center">
                  {{ inventory.variantInfo.variantName }}
                </td>
                <td class="text-center">
                  {{ inventory.variantInfo.variantCode }}
                </td>
                <td class="text-center">
                  {{ inventory.inventory.description }}
                </td>
                <td class="text-center">{{ inventory.inventory.uofm }}</td>
                <td class="text-center">{{ inventory.inventory.category }}</td>
                <td class="text-center">
                  {{ inventory.inventory.openingStock }}
                </td>
                <td class="text-center">
                  {{ inventory.inventory.issuedStock }}
                </td>
                <td class="text-center">
                  {{ inventory.inventory.addedStock }}
                </td>
                <td class="text-center">
                  {{ inventory.inventory.stockBalance }}
                </td>
                <td class="text-center">
                  {{ inventory.inventory.reorderLevel }}
                </td>
                <td class="text-center">
                  <div class="dropdown ks-control">
                    <button
                      class="ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-small"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span
                        ><i class="ivu-icon ivu-icon-md-more fsz-20"></i
                      ></span>
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-right sc-dropdown-menu show"
                    >
                      <button
                        class="dropdown-item"
                        @click="openAddStock(inventory)"
                      >
                        Add
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openIssueStock(inventory)"
                      >
                        Issue
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openReorderLevel(inventory)"
                      >
                        Set Reorder Level
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openDeactiveModal(inventory)"
                      >
                        De-active Item
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openRemoveInventory(inventory)"
                      >
                        Remove from Inventory
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openReclassify(inventory)"
                      >
                        Reclassify Item
                      </button>
                      <button
                        class="dropdown-item"
                        @click="openReallocate(inventory)"
                      >
                        Reallocate item
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <th>
                  <label class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      v-model="inventoryData"
                      :value="inventory.name"
                      class="custom-control-input"
                    />
                    <span class="custom-control-indicator"></span>
                  </label>
                </th>
                <td class="text-center">Corolla</td>
                <td class="text-center">ET3434</td>
                <td class="text-center">Black Corolla</td>
                <td class="text-center">kg</td>
                <td class="text-center">salom</td>
                <td class="text-center">10</td>
                <td class="text-center">3</td>
                <td class="text-center">5</td>
                <td class="text-center">7</td>
                <td class="text-center">5</td>
                <td class="text-center">
                  <!-- <div class="dropdown ks-control">
                                        <button class="ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-small"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span><i class="ivu-icon ivu-icon-md-more fsz-20"></i></span>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right sc-dropdown-menu show">
                                            <button class="dropdown-item" @click="openAddStock(inventory)">Add </button>
                                            <button class="dropdown-item" @click="openIssueStock(inventory)">
                                                Issue</button>
                                            <button class="dropdown-item" @click="openReorderLevel(inventory)"> Set
                                                Reorder Level</button>
                                            <button class="dropdown-item" @click="openDeactiveModal(inventory)">
                                                De-active Item</button>
                                            <button class="dropdown-item" @click="openRemoveInventory(inventory)">Remove
                                                from Inventory</button>
                                            <button class="dropdown-item" @click="openReclassify(inventory)"> Reclassify
                                                Item</button>
                                            <button class="dropdown-item" @click="openReallocate(inventory)"> Reallocate
                                                item</button>
                                        </div>
                                    </div> -->

                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openAddStock(inventory)"
                        >
                          <span class="ml-2">Add Stock</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openIssueStock(inventory)"
                        >
                          <span class="ml-2">Issue Stock</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openReorderLevel(inventory)"
                        >
                          <span class="ml-2">Set Reorder Level</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openDeactiveModal(inventory)"
                        >
                          <span class="ml-2">Deactive Item</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openRemoveInventory(inventory)"
                        >
                          <span class="ml-2">Remove from Inventory</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openReclassify(inventory)"
                        >
                          <span class="ml-2">Reclassified Item</span>
                        </li>

                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="openReallocate(inventory)"
                        >
                          <span class="ml-2">Reallocate Item</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
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
  components: {},
  data() {
    return {
     
      search: "",
      drawer: false,
      classModal: false,
      allInventory: [],
      classInvent: [],
      issuedQuantity: "",
      reorderLevelQty: "",
      addedQty: "",
      category: "",
      inventoryType: "",
      inventory: {
        owner: "owner",
        creator: "creator",
        business: "business",
        group: "sales",
        category: "grocery",
        name: "spaghetti",
        sku: "spti010",
        variantCode: "pt",
        variantSku: "spti010pt",
        syncWithSales: "true",
        syncWithPurcahses: "false",
        inventoryType: "salesInventory",
        openingStock: "30",
        reorderLevel: "0",
        mac: "mac",
        valuationMethod: "valuationMethod",
        inventoryValue: "0",
        itemDimension: "0",
        itemWeight: "itemWeight",
        packageNumber: "packageNumber",
        packageDimension: "packageDimension",
        packageWeight: "packageWeight",
        packingListCount: "packingListCount",
        palletNumber: "palletNumber",
        palletDimension: "palletDimension",
        palletWeight: "palletWeight",
        batchNo: "batchNo",
        bin: "bin",
        rack: "rack",
        shelf: "shelf",
      },
      hash: "",
      stockbalance: "",
      addStockModal: false,
      reoderStockModal: false,
      issueStockModal: false,
      removeInventoryModal: false,
      reclassifyModal: false,
      reallocateModal: false,
      deactiveModal: false,
      reallocateData: {
        sendingInventoryTypeHash: "",
        receivingInventoryTypeHash: "",
        variantHash: "",
        quantity: "",
      },

      deactivateData: {
        quantity: "3",
        reason: "itemExpired",
        comment: "Items has to be removed",
        isActivated: false,
      },
      invoices: "",
      networks: "",
      tempStockBalance: "",
      loader: true,
      inventoryData: [],
      reorderLoader: true,
      userData: "",
      toggleView: true,
      allSelected: false,
      inventoryClassName: "",
      inventoryCal: "",
      inventoryColumn: [
        {
          title: "Name",
          key: "inventory",
          width: 200,
          fixed: "left",
        },
        {
          title: "code",
          key: "age",
          width: 100,
        },
        {
          title: "UofM (Purchase)",
          key: "province",
          width: 100,
        },
        {
          title: "UofM (Sales)",
          key: "city",
          width: 100,
        },
        {
          title: "Category",
          key: "address",
          width: 100,
        },
        {
          title: "Bin",
          key: "zip",
          width: 100,
        },
        {
          title: "Rack",
          key: "zip",
          width: 100,
        },
        {
          title: "Shelf",
          key: "zip",
          width: 100,
        },
        {
          title: "Opening Stock",
          key: "zip",
          width: 100,
        },

        {
          title: "Issued Stock",
          key: "zip",
          width: 100,
        },

        {
          title: "Added Stock",
          key: "zip",
          width: 100,
        },

        {
          title: "Stock Balance",
          key: "zip",
          width: 100,
        },

        {
          title: "Valuation Method",
          key: "zip",
          width: 100,
        },

        {
          title: "Purchase Unit Price",
          key: "zip",
          width: 100,
        },

        {
          title: "Sales Unit Price",
          key: "zip",
          width: 100,
        },

        {
          title: "Inventory Value",
          key: "zip",
          width: 100,
        },

        {
          title: "supplier",
          key: "zip",
          width: 100,
        },

        {
          title: "Action",
          key: "action",
          fixed: "right",
          width: 200,
          // eslint-disable-next-line no-unused-vars
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                },
                "Edit"
              ),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    selectAll: function () {
      this.inventoryData = [];
      if (!this.allSelected) {
        this.allInventory.map((inventory) => {
          this.inventoryData.push(inventory.name);
        });
      }
    },

    calcHoldingStockBalance() {
      this.tempStockBalance =
        parseInt(this.inventoryCal.holdingInventoryValue.stockBalance) -
        parseInt(this.addedQty || 0);
    },

    openInventoryClassModal() {
      this.classModal = true;
    },

    openAddStock(val) {
      console.log(val);
      //    this.tempStockBalance =  val.holdingInventoryValue.stockBalance
      //    this.stockbalance = val.holdingInventoryValue.stockBalance
      this.addStockModal = true;
      // this.inventoryCal = val
    },

    saveInventoryClass() {
      const data = {
        owner: this.userData.owner,
        creator: this.userData.owner,
        business: this.userData.businessId,
        name: this.inventoryClassName,
      };

      console.log(data);
      this.$axios
        .post(
          this.$apiCloudenly + "consolidated-catalog/inventory-type",
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
          this.$swal(resp.data.message);
          this.inventoryClassName = "";
          this.classModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.classModal = false;
        });
    },

    saveItemInventory() {
      this.$axios
        .post(
          this.$apiCloudenly + "consolidated-catalog/inventory/single-item",
          this.inventory,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openIssueStock(val) {
      this.issueStockModal = true;
      this.inventoryCal = val;
    },
    openReorderLevel(val) {
      this.reoderStockModal = true;
      this.inventoryCal = val;
    },

    openDeactiveModal(val) {
      this.deactiveModal = true;
      this.inventoryCal = val;
    },

    openRemoveInventory(val) {
      this.removeInventoryModal = true;
      this.inventoryCal = val;
    },

    openReclassify(val) {
      this.reclassifyModal = true;
      this.inventoryCal = val;
    },

    openReallocate(val) {
      console.log(val);
      this.reallocateModal = true;
      this.inventoryCal = val;
    },

    addInventory() {
      this.drawer = true;
    },

    addToStock() {
      const data = {
        addedStock: this.addedQty,
      };
      this.tempStockBalance = true;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "consolidated-catalog/inventory-type/add-to-inventory/" +
            this.inventoryCal.inventory.hash,
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          this.$swal(resp.data.message);
          this.tempStockBalance = false;
        })
        .catch((err) => {
          console.log(err);
          this.tempStockBalance = false;
        });
    },

    issuedfromStock() {
      const data = {
        issuedStock: this.issuedQuantity,
      };
      this.issueStockModal = true;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "consolidated-catalog/inventory-type/issue-from-inventory/" +
            this.inventoryCal.inventory.hash,
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          this.$swal(resp.data.message);
          this.issueStockModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.issueStockModal = false;
        });
    },

    setReoderLevelStock() {
      const data = {
        reorderLevel: this.reorderLevelQty,
      };
      this.reoderStockModal = true;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "consolidated-catalog/inventory/business/" +
            this.inventoryCal.inventory.hash,
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
          this.$swal(resp.data.message);
          this.reoderStockModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.reoderStockModal = false;
        });
    },

    deactiveItem() {
      // console.log(this.deactivateData)
      // console.log( this.inventoryCal.inventory.hash)
      this.deactiveModal = true;
      this.$axios
        .patch(
          this.$apiCloudenly +
            "consolidated-catalog/inventory-type/activate-inventory-item/" +
            this.inventoryCal.inventory.hash,
          this.deactivateData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
          this.$swal(resp.data.message);
          this.deactiveModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.deactiveModal = false;
        });
    },

    reallocate() {
      (this.reallocateData.sendingInventoryTypeHash = this.inventoryTypeHash),
        (this.reallocateData.variantHash = this.inventoryCal.inventory.variantHash);
      console.log(this.reallocateData);
      this.reallocateModal = true;
      this.$axios
        .post(
          this.$apiCloudenly +
            "consolidated-catalog/inventory-type/reallocate-item/" +
            this.userData.businessId,
          this.reallocateData,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
          this.$swal(resp.data.message);
          this.reallocateModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.reallocateModal = false;
        });
    },

    getInventory(data) {
      console.log(data);
    },
  },

  mounted() {
    //   this.userData = this.$store.state.userData
    //   this.inventoryTypeHash = this.$route.params.id
    //    // get inventory by class
    //     this.$axios .get(this.$apiCloudenly +  "consolidated-catalog/inventory/" + `${this.userData.businessId}/` +  this.inventoryTypeHash, this.$simpleAuthHeader) .then(resp => {
    //       this.allInventory = resp.data
    //       console.log(resp.data)
    //       this.classInvent = resp.data
    //           })
    //         .catch(err => {
    //         console.log(err);
    //      });
    //       this.$axios .get(this.$apiCloudenly +  "consolidated-catalog/inventory-type/all/" + this.userData.businessId, this.$simpleAuthHeader) .then(resp => {
    //       this.inventoryType = resp.data;
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // get inventory class type
    //  this.$axios.get(this.$apiCloudenly + "consolidated-catalog/get-set-inventory-type/" + this.userData.businessId, this.$simpleAuthHeader).then(resp => {
    //      this.inventoryType = resp.data
    //   }).catch(err => {
    //         console.log(err);
    //     });
  },

  watch: {
    inventoryData: function () {
      console.log(this.inventoryData.length);
      if (this.inventoryData.length === 0) {
        this.toggleView = true;
      } else {
        this.toggleView = false;
      }
    },
  },
};
</script>
<style scoped>
#invenCardHeader {
  padding: 5px !important;
  margin: 0px !important;
}
table {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  /* color: white */
}
thead {
  /* background-color:rgba(149, 93, 83, 0.26) !important; */
  /* color: white !important */
}

.scrollbardrawer {
  /* height: 95%;
  overflow-y: scroll; */
}
</style>

