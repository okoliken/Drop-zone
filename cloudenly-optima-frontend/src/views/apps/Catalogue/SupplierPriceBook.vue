
<template>
<div class="">
  <div class="ks-page-header">
    <section class="ks-title">
      <h3> Supplier Pricebook </h3>
      <div class="btn-group btn-lg float-right">
        <button type="button" class="btn btn-primary btn-sm ks-rounded btn-rounded float-right">Create Catalogue</button>
        <button type="button" class="btn ks-rounded btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a @click.prevent="routeeSaleCatalogue" class="dropdown-item" href="#">Sales Catalogue </a>
          <a @click.prevent="routePurchaseCatalogue" class="dropdown-item" href="#">Purchase Catalogue </a>
        </div>
      </div>
    </section>
  </div>
  <br>
  <div class="ks-body">
    <br><br><br>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <Card class=" bg-offwhite">
            <div class="   panel-body  ks-solid ks-bg-light-gray">
              <div class="card-body">
                <div class="row">
                  <div class="col-3 text-right panel-body">
                    <Icon color="blue" custom size=70 type="ios-analytics" />
                  </div>

                  <div class="col-9 panel-body">
                    <br>
                    <h4 class="card-title">
                      All Product Items
                      <br> <span> 45</span>
                    </h4>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </div>
        <div class="col-lg-4">
          <Card class=" bg-offwhite">
            <div class="  panel-body  ks-solid ks-bg-light-gray">
              <div class="card-body">
                <div class="row">
                  <div class="col-3 text-right panel-body">
                    <Icon color="#fffe3e4 " custom size=70 type="md-analytics" />
                  </div>
                  <div class="col-9 panel-body">
                    <br>
                    <h4 class="card-title">
                      All Service Items
                      <br> <span> 45</span>
                    </h4>
                  </div>
                </div>

              </div>
            </div>
          </Card>

        </div>

        <div class="col-lg-4 ">
          <Card class=" bg-offwhite">
            <div class=" panel-body ks-solid bg-offwhite ks-bg-light-gray">
              <div class="card-body">
                <div class="row">
                  <div class="col-3 text-right panel-body">
                    <Icon color="#cc34ed" custom size=70 type="md-pie" />
                  </div>
                  <div class="col-9 panel-body">
                    <br>
                    <h4 class="card-title">
                      Total Items
                      <br> <span> 45</span>
                    </h4>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <div class="container">
      <br>
      <div class="row">
        <div class="col-4">
          <Input style="width: 350px" search enter-button v-model="search" size="large" placeholder="Enter Product/Service Name..." />
        </div>

        <div class="col-4">
          <select name="" id="" class="  form-control">
            <option value="" disabled selected>Filter Pricebook</option>
            <option value="all"> All</option>
            <option value="product"> Product</option>
            <option value="service"> Service</option>
          </select>
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col-6">
              <DatePicker type="date" placeholder="from" style="width: 200px"></DatePicker>
            </div>
            <div class="col-6">
              <DatePicker type="date" placeholder="to" style="width: 200px"></DatePicker>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class=" container">
      <br>
      <div class="card" v-show="showLoading">
        <table class="table table-bordered table-hover ">
          <thead class=" thead-default">
            <tr>
              <th class=" text-center">S/N</th>
              <th class=" text-center">Name</th>
              <th class=" text-center"> Email</th>
              <th class=" text-center">Phone No</th>
              <th class=" text-center">Adress</th>
              <th class=" text-center">Contact Person</th>
              <th class=" text-center">Action</th>
            </tr>
          </thead>
        </table>
        <br>
        <div class="row" v-show="showLoading">
          <div class="col-sm-4"></div>
          <br>
          <div class="col-lg-4 push-1">
            <fulfilling-bouncing-circle-spinner :animation-duration="3000" :size="50" color="blue" />
          </div>
          <br><br><br><br>
        </div>
      </div>

      <div class="panel" v-show="showAlert">
        <table class="table table-bordered table-hover ">
          <thead class=" thead-default">
            <tr>
              <th class=" text-center">S/N</th>
              <th class=" text-center">Name</th>
              <th class=" text-center"> Email</th>
              <th class=" text-center">Phone No</th>
              <th class=" text-center">Adress</th>
              <th class=" text-center">Contact Person</th>
              <th class=" text-center">view</th>
            </tr>
          </thead>
        </table>
        <br>
        <div class=" container" role="alert" v-show="showAlert">
          <Alert type="info" show-icon>
            You dont have any Supplier yet!
            <span slot="desc"> <button class="btn-link "> <i class=" fa fa-1x fa-plus"></i> Create Supplier </button> </span>
          </Alert>
        </div>
      </div>

      <div class="" v-show="showTable">
        <table class="table table-striped panel table-hover ">
          <thead class=" thead-default">
            <tr>
              <th class=" text-center">S/N</th>
              <th class=" text-center">Name</th>
              <th class=" text-center"> Email</th>
              <th class=" text-center">Phone No</th>
              <!-- <th class=" text-center">Address</th> -->
              <th class=" text-center">Contact Person</th>
              <th class=" text-center">View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(network ,index) in  networkSupplier" :key="index">
              <td class=" text-center">{{index + 1}}</td>              
              <td class=" text-center">{{network.name}}</td>
              <td class=" text-center">{{network.email}}</td>
              <td class=" text-center">{{network.phone}}</td>
              <!-- <td class=" text-center">{{network.address}}</td> -->
              <td class=" text-center">{{network.contactPerson}}</td>
              <td class=" text-center"><button class=" btn btn-link" @click="routeSupplierpricebook(network.hash)"> 
                <i class="fa fa-eye"></i>
                 </button></td>
            </tr>
          </tbody>
        </table>
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

      showLoading: true,
      showAlert: false,
      showTable: false,
      loading: false,
      loading1: false,
      suplierLoading: true,
      modalSupplier: false,
      search: '',
      userData: '',
      networkSupplier: [],
    };
  },

  methods: {

    routePurchaseCatalogue() {
      this.$router.push({
        name: "CreatePurchaseServiceCatalogue"
      })
    },

    routeeSaleCatalogue() {
      this.$router.push({
        name: "CreateSalePurchaseServiceCatalogue"
      })
    },
    saveSupplier() {

    },

    routeSupplierpricebook(val) {
      this.$router.push({name: "PriceBookSupplierDetails", params: {id: val} })
    },

  },
  computed: {

  },
  mounted() {
    this.userData = this.$store.state.userData
    this.$axios.get(this.$apiCloudenly + "network/by-category/2", this.$simpleAuthHeader).then(resp => {
      console.log(resp.data)
      if (resp.data.length === 0) {
        this.showLoading = false,
          this.showAlert = true
      } else {
        this.networkSupplier = resp.data
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
