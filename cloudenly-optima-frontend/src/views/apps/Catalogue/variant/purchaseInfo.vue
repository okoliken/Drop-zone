<template>
  <div class="mt-5 shadow">
    <div class="border border-solid border-grey mt-5 shadow">
      <table class="table w-full table-bordered">
        <thead class>
          <tr class="bg-grey-light">
            <th class="py-4 w-32 text-center">Default Supplier</th>
            <th class="py-4 w-64 text-center">Supplier Name</th>
            <th class="py-4 w-32 text-center">UofM</th>
            <th class="py-4 w-16 text-center">Quantity</th>
            <th class="py-4 w-16 text-center">Price</th>
            <th class="py-4 w-6 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier,index) in variantSuppliers" :key="index" class="pb-6">
            <td class="text-center pl-5">
              <input
                class="h-5 leading-tight w-5 bg-cloudenly-primary-main text-cloudenly-primary-main"
                type="radio"
                @click="chooseDefault(supplier, index)"
                v-model="selectedSupplier"
                name="supplierSelected"
                :value="supplier"
              />
            </td>

            <td>
              <select v-model="supplier.supplierId" name class="form-control" id>
                <option
                  v-for="(supplier, index) in getSupplierContact"
                  :key="index"
                  :value="supplier.id"
                >{{supplier.name}}</option>
              </select>
            </td>

            <td>
              <select v-model="supplier.unitOfMeasure" name class="form-control" id>
                <option
                  v-for="(unit, index) in unitOFMeasurementData"
                  :key="index"
                  :value="unit.value"
                >{{unit.name}}</option>
              </select>
            </td>

            <td>
              <input
                @keypress="preventLetterE"
                pattern="[0-9]*"
                v-model="supplier.quantityPerPack"
                type="number"
                class="form-control"
                name
                id
              />
            </td>

            <td>
              <input
                placeholder
                @blur="calcAvaragePurchasePrice"
                class="form-control"
                type="text"
                v-model.lazy="supplier.price"
                name
                id
                v-money="money"
              />
            </td>

            <td class="text-center">
              <feather-icon
                icon="TrashIcon"
                @click="deletevariantSuppliers"
                class="p-2 cursor-pointer text-cloudenly-danger-main w-8 h-8 inline-flex"
              ></feather-icon>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-center mt-3 mb-3">
        <div class="mr-5">
          <a @click="addvariantSuppliers" class="text-decoration-none cursor-pointer">
            <span class></span>
            Add Another Supplier
          </a>
        </div>

        <div>
          <a
            @click="openSupplier"
            class="cursor-pointer hover:text-cloudenly-warning-main text-cloudenly-warning-main text-decoration-none"
          >Create New Supplier</a>
        </div>
      </div>
    </div>

    <div class="flex justify-center mb-5 mt-10">
      <button
        class="px-8 py-2 cursor-pointer bg-cloudenly-primary-main border-none text-white"
      >Update</button>
    </div>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import { mapGetters } from "vuex";
import unitOfMeasurement from "../../../../utils/unitOfMeasurement";
import money from 'money-math'
export default {
  data() {
    return {
      selectedSupplier: [],
      unitOFMeasurementData: unitOfMeasurement,
      supplierModal: false,
      variantSuppliers: [
        {
          supplierId: "",
          supplierVariantSku: "",
          supplierVariantName: "",
          unitOfMeasure: "",
          quantityPerPack: "",
          price: 0
        }
      ],

      money: {
        // The character used to show the decimal place.
        // decimal: '.',
        // The character used to separate numbers in groups of three.
        // thousands: ',',
        // The currency name or symbol followed by a space.
        // prefix: 'NGN',
        // The suffix (If a suffix is used by the target currency.)
        // suffix: '',
        // Level of decimal precision. REQUIRED
        precision: 2,
        // If mask is false, outputs the number to the model. Otherwise outputs the masked string.
        masked: true
      }
    };
  },

  directives: {
    money: VMoney
  },

  computed: {
    ...mapGetters("crm/contact", ["getSupplierContact"])
  },

  methods: {
    preventLetterE(evt) {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }
    },

    calcAvaragePurchasePrice() {
      var totalSupplierPrice = "0";
      let averageNo = String(this.variantSuppliers.length) + ".00";
      for (var i = 0; i < this.variantSuppliers.length; i++) {
        totalSupplierPrice = money.add(
          totalSupplierPrice,
          this.variantSuppliers[i].price || "0"
        );
      }
      this.averagePrice = money.div(totalSupplierPrice, averageNo);
    },

    deletevariantSuppliers(index) {
      this.variantSuppliers.splice(index, 1);
      this.calcAvaragePurchasePrice();
    },

    addvariantSuppliers() {
      this.variantSuppliers.push({
        supplierId: "",
        supplierVariantSku: "",
        supplierVariantName: "",
        unitOfMeasure: "",
        quantityPerPack: 0,
        price: 0
      });
    },

    openSupplier() {
      this.supplierModal = true;
    }
  },

  mounted() {
    // console.log(this.$route.params.id);
    this.$store.dispatch("crm/contact/getAllSupplierContact");
  }
};
</script>

<style>
</style>