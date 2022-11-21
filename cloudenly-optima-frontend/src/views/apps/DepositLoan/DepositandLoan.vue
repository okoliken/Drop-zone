<template>
  <div class=" ">
    <div class="ks-page-header">
      <section class="ks-title">
        <h3>Deposit and Loan Account</h3>
        <div class="btn-group btn-lg float-right">
          <button @click="routeCreateDeposit" type="button"
            class="btn btn-primary ks-rounded btn-rounded float-right">Go to</button>
          <button type="button" class="btn ks-rounded btn-primary dropdown-toggle" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a @click.prevent="routeCreateDeposit" class="dropdown-item" href="#">Deposit </a>
            <a @click.prevent="routeCreateLoan" class="dropdown-item" href="#">Loan </a>
            <a @click.prevent="routeSummary" class="dropdown-item" href="#"> Summary </a>
          </div>
        </div>
      </section>
    </div>
    <div class="ks-body">
      <br><br><br><br>
      <div class="container ">
        <div class="row">

          <div class="6">
            <Card>
              <h5 slot="title">
                Deposit and Loan Summary
              </h5>

              <!-- <table class=" table table-bordered">
                <thead class=" thead-default">
                  <tr>
                    <th></th>
                    <th class="v-middle"> Issued </th>
                    <th class="v-middle"> Recieved </th>
                    <th class=" v-middle"> Net Position </th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Deposit</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>

                  </tr>


                  <tr>
                    <td>Loan</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>


                  </tr>

                  <tr>
                    <td>Total</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                </tbody>
              </table> -->
            </Card>
          </div>
          <!-- <div class="col-6">
              <line-chart> </line-chart>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { SpringSpinner } from "epic-spinners";f
  // import LineChart from '../../../shared/LineChart.js'
  export default {
    components: {
      // SpringSpinner,
      // LineChart
    },
    data() {
      return {
        loading: false,
        search: "",
        all: [],
        deposit: '',
        loans: [],
        userData: "",
        boqsDetails: [],
        modal: false,
      };
    },

    methods: {
      routeCreateDeposit() {
        this.$router.push({ name: "DepositAccount" });
      },
      routeCreateLoan(){
        this.$router.push({ name: "LoanAccount" });
      },


      routeSummary(){
        this.$router.push({ name: "DepositLoan" });
      },
    },


    computed: {

    },
    mounted() {
      this.userData = this.$store.state.userData;
        // get list of deposit loan
      this.$axios.get(this.$apiCloudenly +"deposit-loan/deposit/" +this.userData.businessId, this.$simpleAuthHeader )
        .then(resp => {
          // console.log(resp.data)
          this.deposit = resp.data;
          // console.log(this.deposit)
        })
        .catch(err => {
          console.log(err);
        });

        this.$axios.get(this.$apiCloudenly +"deposit-loan/loan/" +this.userData.businessId, this.$simpleAuthHeader )
        .then(resp => {
          console.log(resp.data)
          this.loans = resp.data;
        })
        .catch(err => {
          console.log(err);
        });


      }
    };
</script>

<style>
   .v-middle {
    vertical-align: middle !important
  }
</style>
