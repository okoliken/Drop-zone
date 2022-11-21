  <template>
  <div>
    <div class="flex items-center">
      <div class="w-1/3 mr-5">
        <select
          v-model="search"
          class="w-full form-control-lg"
          placeholder="Select Supplier"
        ></select>
      </div>
      <div class="w-1/3 mr-5">
        <select
          name=""
          id=""
          placeholder="Filter by Status"
          class="w-full form-control-lg"
        ></select>
      </div>
      <div class="w-1/3">
        <input
          placeholder="search Credit Note..."
          class="w-full form-control-lg border border-solid border-grey-light"
        />
      </div>
      <div class="w-1/3">
        <div class="float-right">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <button
              class="inline-flex items-center border-0 py-1 px-4 mr-2 cursor-pointer bg-cloudenly-primary-main text-white rounded"
            >
              <span class="mr-1"> Generate New </span>
              <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
            </button>
            <vs-dropdown-menu>
              <ul style="min-width: 12rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click.prevent="routeCreditNote"
                >
                  <feather-icon
                    icon="CheckSquareIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Create New</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click.prevent="routeInvoice"
                >
                  <feather-icon
                    icon="CheckSquareIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2"> Invoice</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <table class="table table-auto table-responsive border-collapse w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3">S/N</th>
            <th class="py-3">CREDIT NO.</th>
            <th class="py-3">CUSTOMER NAME</th>
            <th class="py-3">GRAND TOTAL</th>
            <th class="py-3">BOQ</th>
            <th class="py-3">STATUS</th>
            <th class="py-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(debitnote, index) in creditNotesReceived" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ debitnote.noteNumber }}</td>
            <td class="text-center">{{ debitnote.network.name }}</td>
            <td class="text-center">
              {{ debitnote.currency }} {{ debitnote.grandTotal }}
            </td>
            <td class="text-center">
              <button
                @click="viewBoqs(debitnote.boqs)"
                class="btn btn-xs btn-primary"
              >
                view
              </button>
            </td>
            <td class="text-center">
              <Tag>Draft</Tag>
            </td>
            <td class="text-center">
              <div class="dropdown ks-control">
                <a
                  class="btn btn-link ks-no-text ks-no-arrow"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="ks-icon la la-ellipsis-h"></span>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenu1"
                >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="editCreditNote(debitnote.id)"
                    >Edit</a
                  >
                  <a
                    class="dropdown-item"
                    @click.prevent="sendEmail(debitnote)"
                    href="#"
                    >Email to Supplier</a
                  >
                  <!-- <a class="dropdown-item" @click.prevent="openModal(debitnote.id)" href="#">Share</a>
                                    <a class="dropdown-item" @click.prevent="" href="#"> Add Loyalty</a> -->
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      search: "",
      modal: false,
      showLoading: true,
      showAlert: false,
      showTable: false,
      creditNotes: "",
      userData: "",
      creditNotesReceived: "",
      boqsDetails: [],
    };
  },
  methods: {
    routeInvoice() {
      // this.$router.push({name: "DebitNoteInvoice"})
      this.$router.push({
        name: "SaleInvoice",
      });
    },

    routeCreditNote() {
      this.$router.push({
        name: "CreateCreditNote",
      });
    },
    editCreditNote(val) {
      this.$router.push({
        name: "EditCreditNote",
        params: {
          id: val,
        },
      });
    },

    viewBoqs(val) {
      this.modal = true;
      this.boqsDetails = val;
    },

    sendEmail(val) {
      const data = {
        title: val.noteDescription,
        business: val.name,
        total: val.grandTotal,
        noteId: val.id,
        email: val.network.email,
      };
      this.$axios
        .post(
          this.$apiCloudenly + "credit-debit-note/send/debit",
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data.message);
          this.$swal(resp.data.message);
          this.$router.push({
            name: "DebitNoteList",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.userData = this.$store.state.userData;
    //   get all credit Note....
    this.$axios
      .get(
        `${this.$apiCloudenly}credit-debit-note/all/credit/${this.userData.businessId}/${this.userData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.length === 0) {
          // this.creditNotes = ''
          (this.showLoading = false), (this.showAlert = true);
        } else {
          this.creditNotes = resp.data;
          this.showLoading = false;
          this.showTable = true;
        }
      })
      .catch((err) => {
        console.log(err);
        (this.showLoading = false), (this.showAlert = true);
      });

    this.$axios
      .get(
        `${this.$apiCloudenly}credit-debit-note/received/all/credit/${this.userData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.length === 0) {
          // this.creditNotes = ''
          (this.showLoading = false), (this.showAlert = true);
        } else {
          this.creditNotesReceived = resp.data;
          this.showLoading = false;
          this.showTable = true;
        }
      })
      .catch((err) => {
        console.log(err);
        (this.showLoading = false), (this.showAlert = true);
      });
  },
};
</script>

<style>
</style>
