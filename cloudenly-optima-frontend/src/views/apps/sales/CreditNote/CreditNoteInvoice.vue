 <template>
  <div>
    <div class="ks-page-header">
      <section class="ks-title">
        <h3>Sales Invoice</h3>
        <div class="btn-group btn-lg float-right">
          <button
            type="button"
            class="btn btn-success-outline ks-rounded float-right"
          >
            Generate Credit Note
          </button>
          <button
            type="button"
            class="btn btn-success-outline ks-rounded dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a @click.prevent="routeInvoice" class="dropdown-item" href="#"
              >Sales Invoice</a
            >
            <a
              @click.prevent="routeCreateCreditNote"
              class="dropdown-item"
              href="#"
              >Create New</a
            >
          </div>
        </div>
      </section>
    </div>
    <br /><br /><br /><br />
    <div class="ks-body">
      <Modal v-model="modal" title="BOQS Details" width="1000">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>type</th>
              <th>Unit</th>
              <th>Category</th>
              <th>Description</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in boqsDetails" :key="index">
              <td>{{ boq.name }}</td>
              <td>{{ boq.type }}</td>
              <td>{{ boq.unit }}</td>
              <td>{{ boq.category }}</td>
              <td>{{ boq.description }}</td>
              <td>{{ boq.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <div class="container">
        <button
          class="btn btn-lg btn-secondary ks-light"
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Filter
        </button>
        <br /><br />
        <div class="collapse panel" id="collapseExample">
          <div class="container bg-offwhite panel-body">
            <div class="row">
              <!-- <div class="col-1">

                      </div> -->
              <div class="col-5">
                <div class="col-5">
                  <Input
                    style="width: 400px"
                    v-model="search"
                    size="large"
                    search
                    enter-button
                    placeholder="Enter Product/Service Name..."
                  />
                </div>
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col-5">
                    <select name="" id="" class="form-control">
                      <option value="" disabled selected>
                        Filter Debit Note
                      </option>
                      <option value="all">All</option>
                      <option value="product">Sent</option>
                      <option value="service">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div v-show="showLoading">
          <table class="table table-bordered">
            <thead class="thead-default">
              <tr>
                <th class="text-center" style="width: 1%">S/N</th>
                <th class="text-center" style="width: 12%">Invoice No</th>
                <th class="text-center" style="width: 20%">Customer Name</th>
                <th class="text-center">Description</th>
                <th class="text-center">BoQ</th>
                <th class="text-center" style="width: 1%">action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <div class="row">
            <div class="col-sm-4"></div>
            <br />
            <div class="col-lg-4 push-1">
              <fulfilling-bouncing-circle-spinner
                :animation-duration="4000"
                :size="50"
                color="blue"
              />
            </div>
            <br /><br /><br /><br />
          </div>
        </div>

        <div v-show="showAlert">
          <table class="table table-bordered">
            <thead class="thead-default">
              <tr>
                <th class="text-center" style="width: 1%">S/N</th>
                <th class="text-center" style="width: 12%">Invoice No</th>
                <th class="text-center" style="width: 20%">Customer Name</th>
                <th class="text-center">Description</th>
                <th class="text-center">BoQ</th>
                <th class="text-center" style="width: 1%">action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <div class="container">
            <Alert type="info" show-icon>
              <template slot="desc">
                <h5>You dont receive any invoice yet!!</h5>
                <button @click="routeInvoice" class="btn-link">
                  <i class="fa fa-1x fa-plus"></i> Create Sales Invoice
                </button>
              </template>
            </Alert>
          </div>
        </div>

        <div v-show="showTable">
          <table class="table table-bordered">
            <thead class="thead-default">
              <tr>
                <th class="text-center" style="width: 1%">S/N</th>
                <th class="text-center" style="width: 12%">Invoice No</th>
                <th class="text-center" style="width: 20%">Customer Name</th>
                <th class="text-center">Description</th>
                <th class="text-center">BoQ</th>
                <th class="text-center" style="width: 1%">action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(invoice, index) in invoices" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ invoice.invoiceNo }}</td>
                <td class="text-center">{{ invoice.customer.name }}</td>
                <td class="text-center">{{ invoice.description }}</td>
                <td class="text-center">view</td>
                <td class="text-center">
                  <button
                    @click="routeCreditInvoiceNote(invoice.hash)"
                    class="btn btn-sm btn-primary"
                  >
                    Generate Credit Note
                  </button>
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
import { FulfillingSquareSpinner } from "epic-spinners";
export default {
  components: {
    FulfillingSquareSpinner,
  },
  data() {
    return {
      userData: "",
      invoices: "",
      search: "",
      showLoading: false,
      showAlert: false,
      showTable: false,
    };
  },

  methods: {
    routeCreateCreditNote() {
      this.$router.push({ name: "CreateCreditNote" });
    },

    // create Sales Inovice

    routeInvoice() {
      this.$router.push({ name: "SaleInvoice" });
    },

    loadInvoice() {
      this.showTable = false;
      (this.showLoading = true),
        this.$axios
          .get(
            `${this.$apiCloudenly}invoice-proforma/all/invoice/${this.userData.businessId}`,
            this.$simpleAuthHeader
          )
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.length === 0) {
              // this.invoices = ''
              this.showAlert = true;
            } else {
              this.invoices = resp.data;
              this.showLoading = false;
              this.showTable = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },

    routeCreditInvoiceNote(val) {
      console.log(val);
      this.$router.push({
        name: "CreateInvoiceCreditNote",
        params: { id: val },
      });
    },
  },
  computed: {},
  mounted() {
    this.userData = this.$store.state.userData;
    // get list of user in the store
    this.showTable = false;
    (this.showLoading = true),
      this.$axios
        .get(
          `${this.$apiCloudenly}invoice-proforma/all/invoice/${this.userData.businessId}`,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.length === 0) {
            // this.invoices = ''
            this.showAlert = true;
            this.showLoading = false;
          } else {
            this.invoices = resp.data;
            this.showLoading = false;
            this.showTable = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>

<style scoped>
.card-block {
  padding-left: 50px;
}
td {
  padding: 3px;
  /* margin: 0px; */
}
</style>
