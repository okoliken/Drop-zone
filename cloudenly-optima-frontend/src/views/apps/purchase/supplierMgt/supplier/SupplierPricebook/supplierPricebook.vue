<template>
  <div>
    <SupplierAnalysis/>
    <br>

    <!-- <vx-card> -->
    <vs-row>
      <vs-col vs-type="flex" vs-justify vs-align="center" vs-w="3">
        <vs-input icon="search" placeholder="Search Supplier" class="w-full"/>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-select placeholder="Filter Product catalogue" class="w-full">
          <vs-select-item value="Product" text="All"></vs-select-item>
          <vs-select-item value="Product" text="Product"></vs-select-item>
          <vs-select-item value="Product" text="Service"></vs-select-item>
        </vs-select>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3"></vs-col>

      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end" vs-w="3">
        <vs-button @click="routeCreateItem" color="primary" type="filled">Create Purchase Catalogue</vs-button>
      </vs-col>
    </vs-row>
 
    <div class="mt-3">
      <table class="table table-auto border-collapse table-responsive w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-4 text-bold text-center   text-cloudenly-primary-main">Name</th>
            <th class="py-4 text-bold text-center  text-cloudenly-primary-main">Email</th>
            <th class="py-4 text-bold text-center  text-cloudenly-primary-main">Phone No</th>
            <th class="py-4 text-bold text-center  text-cloudenly-primary-main">Address</th>
            <th class="py-4 text-bold text-center  text-cloudenly-primary-main">Contact Person</th>
            <th class="py-4 text-bold text-center > text-cloudenly-primary-main">View</th>
          </tr>
        </thead>

        <tbody class="bg-white  ">
          <tr v-for="(supplier , index) in users" :key="index" class="cursor-pointer hover:bg-grey-lighter" @click.prevent="routeSupplierPriceDetails">
            <td class=" text-center pt-3 pb-3">{{supplier.name}}</td>
            <td class=" text-center pt-3 pb-3">{{supplier.email}}</td>
            <td class=" text-center pt-3 pb-3">{{supplier.name}}</td>
            <td class=" text-center pt-3 pb-3">{{supplier.name}}</td>
            <td class=" text-center pt-3 pb-3">{{supplier.name}}</td>
            <td class="text-center">
              <a @click.prevent="routeSupplierPriceDetails" href="#">
              </a>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
    <!-- </vx-card> -->
  </div>
</template>

<script>
import SupplierAnalysis from "../supplierAnalysis";
// import { EyeIcon } from "vue-feather-icons";
export default {
  components: {
    SupplierAnalysis,
  },

  data() {
    return {
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          website: "hildegard.org"
        },

        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          website: "demarco.info"
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          website: "demarco.info"
        },

        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          website: "demarco.info"
        }
      ]
    };
  },

  methods: {
    callback(key) {
      console.log(key);
    },
    routeCreateItem() {
      this.$router.push({ name: "CreatePurchaseItem" });
    },

    routeSupplierPriceDetails() {
      this.$router.push({ name: "supplierPriceDetail", params: { id: 123 } });
    }
  }
};
</script>

<style>
</style>
