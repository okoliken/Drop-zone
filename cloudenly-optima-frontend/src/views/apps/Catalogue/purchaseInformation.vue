<template>
   <div>
       <div class="border border-solid border-grey shadow">
              <table class="table w-full table-bordered">
                <thead class="">
                  <tr class=" bg-grey-light ">
                    <th class="py-2 w-32 text-center"> Default Supplier</th>
                    <th class="py-2 w-64 text-center"> Supplier Name </th>
                    <th class="py-2 w-32 text-center"> UofM </th>
                    <th class="py-2 w-16 text-center"> Quantity </th>
                    <th class="py-2 w-16 text-center"> Price </th>
                    <th class="py-2 w-6  text-center"> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(supplier,index) in variantSuppliers" :key="index" class="pb-6">

                    <td class="text-center pl-5">

                      <input class="h-5 leading-tight w-5 bg-cloudenly-primary-main text-cloudenly-primary-main"
                        type="radio" @click="chooseDefault(supplier, index)" v-model="selectedSupplier"
                        name="supplierSelected" :value="supplier">

                      <!-- <vs-checkbox :checked=false v-model="selectedSupplier" :vs-value="supplier" 
                       @click="chooseDefault(supplier, index)" class="pl-12"></vs-checkbox> -->

                    </td>

                    <td>
                      <select v-model="supplier.supplierId" name="" class=" form-control" id="">
                        <option v-for="(supplier, index) in getSupplierContact" :key="index" :value="supplier.id">
                          {{supplier.name}}
                        </option>
                      </select>
                    </td>

                    <td>
                      <select v-model="supplier.unitOfMeasure" name="" class=" form-control " id="">
                        <option v-for="(unit, index) in unitOFMeasurementData" :key="index" :value="unit.value">
                          {{unit.name}}</option>
                      </select>
                    </td>

                    <td> <input @keypress="preventLetterE" pattern="[0-9]*" v-model="supplier.quantityPerPack"
                        type="number" class=" form-control" name="" id=""></td>

                    <td>
                      <input placeholder="" @blur="calcAveragePurchasePrice" class=" form-control" type="text"
                        v-model.lazy="supplier.price" name="" id="" v-money="money">
                    </td>

                    <td class="text-center">
                      <feather-icon icon="TrashIcon" @click="deleteVariantSuppliers"
                        class="p-2 cursor-pointer text-cloudenly-danger-main w-8 h-8  inline-flex"></feather-icon>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class=" flex items-center justify-center mt-3 mb-3 ">
                <div class="mr-5">
                  <a @click="addVariantSuppliers" class="text-decoration-none cursor-pointer "><span class=""></span>
                    Add Another Supplier
                  </a>
                </div>

                <div>
                  <a @click="openSupplier"
                    class=" cursor-pointer hover:text-cloudenly-warning-main text-cloudenly-warning-main text-decoration-none ">
                    Create New Supplier
                  </a>
                </div>
              </div>


            </div>
   </div>
</template>


<script>
  
  export default {

    components: {

    },

    data() {
      return {

         variantSuppliers: [
          {
          supplierId: '',
          supplierVariantSku: "",
          supplierVariantName: "",
          unitOfMeasure: '',
          quantityPerPack: '',
          price: 0
        }
        ],
      }
    },


    methods: {

    }


  }

</script>


<style>

</style>
