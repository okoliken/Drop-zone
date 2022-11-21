<template>
  <div>
    
    <div class="container">
      <div class="flex">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Item Type</label>
            <select v-model="inventory.group" name="" class=" form-control" id="">
              <option value="sales"> Sales</option>
              <option value="products"> Products</option>
            </select>
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Item Category</label>
            <select v-model="inventory.category" name="" class=" form-control" id="">
              <option v-for="(cater , index)  in category" :key="index" :value="cater.name">{{cater.name}}</option>
            </select>
          </div>
        </div>
      </div>


      <div class="form-group">
        <label for="exampleInputEmail1">Item Name</label>
        <input v-model="inventory.name" type="email" class="form-control" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Enter Item Name">
      </div>


      <div class="form-group">
        <label for="exampleInputEmail1">Item Description</label>
        <textarea v-model="inventory.description" name="" class=" form-control" id="" cols="10" rows="3"></textarea>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">SKU</label>
            <input v-model="inventory.sku" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="Enter SKU">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Brand</label>
            <input v-model="inventory.brand" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="Enter Brand Name">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Supplier</label>
            <select v-model="inventory.supplier" name="" class=" form-control" id="">
              <option value="service"> Service</option>
              <option value="product"> Product</option>
            </select>
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Supplier Code</label>
            <select v-model="inventory.code" name="" class=" form-control" id="">
              <option value="service"> Service</option>
              <option value="product"> Product</option>
            </select>
          </div>
        </div>
      </div>

      <div class="">
        Price Information
      </div>
      <br>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Unit of Measure (Purchase)</label>
            <select v-model="inventory.purchaseUofM" name="" class=" form-control" id="">
              <option value="service"> Service</option>
              <option value="product"> Product</option>
            </select>
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Unit of Measure (Sales)</label>
            <select v-model="inventory.salesUofM" name="" class=" form-control" id="">
              <option value="service"> Service</option>
              <option value="product"> Product</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Purchase Price</label>
            <input v-model="inventory.purchasePrice" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="Enter SKU">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Wholesales Price</label>
            <input v-model="inventory.wholePrice" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Retail Price</label>
            <input v-model="inventory.retailPrice" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Discount Limit</label>
            <input v-model="inventory.discountLimit" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Wholesale Margin</label>
            <input v-model="inventory.wholesaleMargin" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Retail Margin</label>
            <input v-model="inventory.retailMargiin" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> % Wholesale Margin </label>
            <input v-model="inventory.percentWholesaleMargin" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> % Retail Margin</label>
            <input v-model="inventory.percentRetailMargin" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>




      <div class=" card card-header">
        Inventory Operation & Management Information
      </div>
      <br>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Opening Stock</label>
            <input v-model="inventory.openingStock" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Added Stock</label>
            <input v-model="inventory.addSotck" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Issued Stock</label>
            <input v-model="inventory.issuedStock" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Stock Balance</label>
            <input v-model="inventory.stockBalance" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Reorder Level</label>
            <input v-model="inventory.reorderLevel" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">MAC </label>
            <input v-model="inventory.mac" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Valuation Method</label>
            <input v-model="inventory.valuationMethod" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Inventory Value</label>
            <input v-model="inventory.inventoryValue" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>




      <div class=" card card-header">
        Inventory Handling Information
      </div>
      <br>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Item Dimension (LxWxH)</label>
            <input v-model="inventory.itemDimension" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Item Weight (Kg) </label>
            <input v-model="inventory.itemWeight" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Package Number </label>
            <input v-model="inventory.packageNumber" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Package Dimensions (LxWxH)</label>
            <input v-model="inventory.packageDimension" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Package Number</label>
            <input v-model="inventory.packageNumber" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Package Dimensions (LxWxH)</label>
            <input v-model="inventory.packageDimension" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Package Weight (Kg)</label>
            <input v-model="inventory.packageWeight" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Packing List Count</label>
            <input v-model="inventory.packingListCount" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Pallet Number </label>
            <input v-model="inventory.palletNumber" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Pallet Dimension (LxWxH)</label>
            <input v-model="inventory.palletDimension" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Pallet Weight (Kg)</label>
            <input v-model="inventory.palletWeight" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Batch No</label>
            <input v-model="inventory.batchNo" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">
          </div>
        </div>
      </div>


      <div class=" card card-header">
        Product Pack Size
      </div>
      <br>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Pack Size Label </label>
            <input v-model="inventory.labelSize" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Pack Size Quantity</label>
            <input v-model="inventory.packQuantity" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>
      </div>
      <br>

      <div class=" card card-header">
        Inventory Storage Information
      </div>
      <br>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> BIN #</label>
            <input v-model="inventory.bin" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Rack #</label>
            <input v-model="inventory.rack" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="exampleInputEmail1"> Shelf #</label>
            <input v-model="inventory.shelf" type="email" class="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="">

          </div>
        </div>
      </div>

        <div class="container">
          <div class="row ">
            <h5> Add item to Sales Catalogue &nbsp; &nbsp; <vs-Checkbox>Yes</vs-Checkbox>
              <vs-Checkbox>No</vs-Checkbox>
            </h5>
          </div>
          <br>
          <div class="row ">
            <h5> Add item to Purchase Catalogue &nbsp; &nbsp; <vs-Checkbox>Yes</vs-Checkbox>
              <vs-Checkbox>No</vs-Checkbox>
            </h5>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inventoryType: [],
        userData: '',
        category: '',
        inventory: {
          owner: "",
          creator: "",
          business: "",
          group: "",
          category: "",
          name: "",
          sku: "",
          variantCode: "",
          variantSku: "",
          syncWithSales: false,
          syncWithPurcahses: false,
          inventoryType: "",
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
          shelf: "shelf"
        },

      }
    },

  }
</script>

<style>

</style>