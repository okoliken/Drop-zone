<template>
  <div>
    <div class="flex items-center">
      <div class="w-1/3 mr-5">
        <select
          v-model="search"
          class="w-full py-3 px-2 rounded border border-solid border-grey"
          placeholder="Select Supplier"
        ></select>
      </div>
      <div class="w-1/3 mr-5">
        <select
          name
          id
          placeholder="Filter by Status"
          class="w-full py-3 px-2 rounded border border-solid border-grey"
        ></select>
      </div>
      <div class="w-1/3">
        <input
          placeholder="search Credit Note..."
          class="w-full py-3 px-2 rounded border border-solid border-grey"
        />
      </div>

      <div class="w-1/3">
        <div class="float-right">
          <div>
            <drop-down>
              <div slot="title">
                <button
                  class="inline-flex items-center border-0 py-1 px-4 mr-2 cursor-pointer bg-cloudenly-primary-main text-white rounded"
                >
                  <span class="mr-1">Generate New</span>
                  <vs-icon icon="arrow_drop_down " class size="20px"></vs-icon>
                </button>

                <div slot="body">
                  <ul style="min-width: 12rem">
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="routeCreditNote"
                    >
                      <feather-icon
                        icon="CheckSquareIcon"
                        svgClasses="w-4 h-4"
                      ></feather-icon>
                      <span class="ml-2"> Create New </span>
                    </li>
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="routeInvoice"
                    >
                      <feather-icon
                        icon="CheckSquareIcon"
                        svgClasses="w-4 h-4"
                      ></feather-icon>
                      <span class="ml-2">Invoice</span>
                    </li>
                  </ul>
                </div>
              </div>
            </drop-down>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <table class="table table-auto table-responsive border-collapse w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-4 text-center">S/N</th>
            <th class="py-4 text-center">CREDIT NO</th>
            <th class="py-4 text-center">CUSTOMER NAME</th>
            <th class="py-4 text-center">GRAND TOTAL</th>
            <th class="py-4 text-center">BOQ</th>
            <th class="py-4 text-center">STATUS</th>
            <th class="py-4 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(creditNote, index) in creditNotes" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ creditNote.noteNumber }}</td>
            <td class="text-center">{{ creditNote.network.name }}</td>
            <td class="text-center">
              {{ creditNote.currency }} {{ creditNote.grandTotal }}
            </td>
            <td class="text-center">
              <button
                @click="viewBoqs(creditNote.boqs)"
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
                    @click.prevent="editCreditNote(creditNote.hash)"
                    >Edit</a
                  >
                  <a
                    class="dropdown-item"
                    @click.prevent="sendEmail(creditNote)"
                    href="#"
                  >
                    Email to Supplier
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div class="mt-1">
          <!-- <table class="table table-auto table-responsive w-full border-collapse">
              <thead class="bg-grey-lighter">
                <tr>
                  <th class="py-4 text-center">S/N</th>
            <th class="py-4 text-center">CREDIT NO</th>
            <th class="py-4 text-center">CUSTOMER NAME</th>
            <th class="py-4 text-center">GRAND TOTAL</th>
            <th class="py-4 text-center">BOQ</th>
            <th class="py-4 text-center">STATUS</th>
            <th class="py-4 text-center">ACTION</th>
                </tr>
              </thead>
          </table>-->
        </div>
        <div
          class="bg-white border-solid border-l-0 border-r-0 border-b-0 border-cloudenly-danger-mid rounded border-4 shadow mb-2"
        >
          <div class="p-5">
            <div class>
              <h3 class="m-0">
                You have not created any credit note ..
                <span class="text-cloudenly-primary-main cursor-pointer pl-1"
                  >click here to create your first credit note..</span
                >
              </h3>
              <p class="text-cloudenly-primary-main cursor-pointer">
                Learn more here...
              </p>
            </div>
          </div>
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
      modal: false,
      showLoading: true,
      showAlert: false,
      showTable: false,
      creditNotes: [],
      userData: "",
      creditNotesReceived: "",
      boqsDetails: [],
    };
  },
  methods: {
    routeInvoice() {
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
      console.log(val);
    },
  },
  mounted() {},
};
</script>

<style>
</style>
 