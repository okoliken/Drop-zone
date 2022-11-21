<template>
  <div class="mt-3 px-2">
    <div class="mb-3">
      <div class="w-1/3">
        <input
          type="text"
          name=""
          class="py-3 px-2 rounded-lg border border-solid border-grey w-full"
          placeholder=" search "
          id=""
        />
      </div>
    </div>

    <div v-if="getAllContactWaybill.length > 0">
      <table class="table table-auto table-responsive border-collapse w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3 text-center">INVOICE NO.</th>
            <th class="py-3 text-center">DESCRIPTION</th>
            <th class="py-3 text-center">DATE ISSUE</th>
            <th class="py-3 text-center">BOQS</th>
            <th class="py-3 text-center">STATUS</th>
            <th class="py-3 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(waybill, index) in getAllContactWaybill" :key="index">
            <td class="text-center">{{ waybill.invoice.invoiceNo }}</td>
            <td class="text-center">{{ waybill.invoice.description }}</td>
            <td class="text-center">{{ waybill.createdAt }}</td>
            <td class="text-center">
              <button
                @click="showBoqs(waybill.boqs)"
                class="btn btn-xs btn-primary"
              >
                view
              </button>
            </td>
            <td class="text-center">{{ waybill.status }}</td>
            <td class="text-center">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon
                    class="h-6 w-6"
                    icon="MoreHorizontalIcon"
                  ></feather-icon>
                </div>
                <vs-dropdown-menu>
                  <ul style="min-width: 12rem">
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="editQuotation(waybill.id)"
                    >
                      <feather-icon
                        icon="CheckSquareIcon"
                        svgClasses="w-4 h-4"
                      ></feather-icon>
                      <span class="ml-2">Edit </span>
                    </li>
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="editQuotation(waybill.id)"
                    >
                      <feather-icon
                        icon="CheckSquareIcon"
                        svgClasses="w-4 h-4"
                      ></feather-icon>
                      <span class="ml-2">Process </span>
                    </li>
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="generateGrn(waybill.id)"
                    >
                      <feather-icon
                        icon="CheckSquareIcon"
                        svgClasses="w-4 h-4"
                      ></feather-icon>
                      <span class="ml-2">Generate GRN</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <table class="table table-auto border-collapse w-full">
        <thead class="bg-grey-lighter">
          <tr>
            <th class="py-3 text-center">INVOICE NO.</th>
            <th class="py-3 text-center">DESCRIPTION</th>
            <th class="py-3 text-center">DATE ISSUE</th>
            <th class="py-3 text-center">BOQS</th>
            <th class="py-3 text-center">STATUS</th>
            <th class="py-3 text-center">ACTION</th>
          </tr>
        </thead>
      </table>

      <div
        class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
      >
        <div class="p-5">
          <div class="">
            <h3 class="m-0">
              You have not send any waybill to this customer..
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      modal: false,
      boqDetails: [],
      search: "",
    };
  },

  computed: {
    ...mapGetters("crm/contactTransaction", ["getAllContactWaybill"]),
  },

  methods: {
    routeSalesInvoice() {
      this.$router.push({
        name: "Invoice",
      });
    },

    routeSalePurchaseOrder() {
      this.$router.push({
        name: "SalesOrder",
      });
    },

    generateGrn(val) {
      this.$router.push({
        name: "CreateWaybillGrn",
        params: {
          id: val,
        },
      });
    },

    showBoqs(val) {
      (this.modal = true), (this.boqDetails = val);
    },

    processWaybill() {},
  },

  mounted() {
    let data = this.$store.state.crm.contact.singleContact.email;
    this.$store.dispatch("crm/contactTransaction/getContactWaybill", data);
  },
};
</script>




<style>
</style>
