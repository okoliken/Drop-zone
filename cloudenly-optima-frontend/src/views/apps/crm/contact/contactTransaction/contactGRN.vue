<template>
  <div>
    <table class="table table-auto border-collapse w-full">
      <thead class="bg-grey-lighter">
        <tr>
          <th class="py-3" style="width: 1%">S/N</th>
          <th class="py-3" style="width: 12%">GRN NO.</th>
          <th class="py-3">DESCRIPTION</th>
          <th class="py-3">REASON</th>
          <th class="py-3">QTY INVOICED</th>
          <th class="py-3">QTY OUTSTANDING</th>
          <th class="py-3">QTY RECEIVED</th>
          <th class="py-3">AMOUNT</th>
          <th class="py-3">STATUS</th>
          <th class="py-3" style="width: 1%">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grn, index) in getAllContactGRN" :key="index">
          <td class="py-2 pl-3">{{ index + 1 }}</td>
          <td class="py-2 pl-3">{{ grn.grnNumber }}</td>
          <td class="py-2 pl-3">{{ grn.description }}</td>
          <td class="py-2 pl-3">{{ grn.reasonForGrn }}</td>
          <td class="py-2 pl-3">{{ grn.totalQuantityInvoiced }}</td>
          <td class="py-2 pl-3">{{ grn.totalQuantityOutstanding }}</td>
          <td class="py-2 pl-3">{{ grn.totalQuantityReceived }}</td>
          <td class="py-2 pl-3">{{ grn.totalAmount }}</td>
          <td class="py-2 pl-3">{{ grn.status }}</td>
          <td class="text-center">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon
                  class="h-6 w-6"
                  icon="ChevronDownIcon"
                ></feather-icon>
              </div>
              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeEditGRN(grn.id)"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Edit GRN </span>
                  </li>
                  <li
                    class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="processGrn(grn.id)"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Process GRN </span>
                  </li>

                  <li
                    class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="deleteGrn(grn.id)"
                  >
                    <feather-icon
                      icon="CheckSquareIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2">Delete Request </span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      allGoodRecieveNote: "",
      bussinesData: "",
      showLoading: true,
      search: "",
      grnData: "",
      inventoryType: "",
      InvenTypeHash: "",
      showModal: false,
      showAlert: false,
      showTable: false,
    };
  },
  method: {
    routeEditGRN(val) {
      this.$router.push({ name: "EditGoodReceiveNote", params: { id: val } });
    },

    createNewGRN() {
      this.$router.push({ name: "CreateGoodReceiveNote" });
    },

    openModal(val) {
      this.grnData = val;
      this.showModal = true;
    },

    routerListPR() {
      this.$router.push({ name: "PurchaseOrder" });
    },

    routerListWaybill() {
      this.$router.push({ name: "Waybill" });
    },

    routerListInvoice() {
      this.$router.push({ name: "PurchaseInvoice" });
    },

    processGrn(val) {
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          grn: val,
          manualApproval: {
            isManualApproval: false,
            scellooId: "",
          },
        },
      };

      this.$store
        .dispatch("inventory/grn/sendGrn", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Good Recieve Note",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Good Receive Note",
            text: "Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    deleteGrn(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          goodsReceivedNoteIds: [val],
        },
      };

      this.$store
        .dispatch("inventory/grn/deleteGrn", { data: data })
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Good Recieve Note",
            text: "Deleted",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Good Recieve Note",
            text: "Error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contactTransaction", ["getAllContactGRN"]),
  },

  mounted() {
    let data = {
      email: this.$store.state.crm.contact.singleContact.email,
      contactOrgId: this.$store.state.crm.contact.singleContact.contactOrgId,
    };

    this.$store
      .dispatch("crm/contactTransaction/getContactGrn", data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>