<template>
  <div class="font-normal">
    <!-- modals -->
    <setup-code-modal
      is-module
      module-name="GRN"
      :preview-code="grnData.grnNumber"
      :loading="isGeneratingCode"
      v-model="setupIdModal"
      @proceed="setupCodeFormat($event)"
    />

    <inventory-class-modal
      v-model="inventoryClassModal"
      :options="getOptimaOutlet"
      @proceed="createInventoryClass($event)"
    />

    <back location="Good Received Note" class="mb-8" />

    <div class="bg-white px-6 pt-6 pb-10 rounded">
      <div class="flex items-center justify-between mb-10">
        <h2 class="font-semibold">
          Generate Good Received Note from {{ getName | capitalize }}
        </h2>

        <feather-icon
          icon="AlertCircleIcon"
          svgClasses="mr-3 h-6 w-6 cursor-pointer"
        />
      </div>

      <div class="grid grid-cols-12 col-gap-16 row-gap-12 gap-10">
        <s-text
          label="Supplier Name:"
          disabled
          class="col-span-4"
          v-model="grnData.supplier.name"
        />

        <s-text
          label="Supplier Email:"
          disabled
          class="col-span-4"
          v-model="grnData.supplier.email"
        />

        <s-text class="col-span-4" disabled v-model="grnData.grnNumber">
          <template v-slot:label>
            <div class="flex justify-between mb-3 w-full">
              <span>GRN Number:</span>

              <!-- <button
                class="text-primary-optima-color"
                @click="setupIdModal = true"
              >
                Set Up GRN ID Format
              </button> -->
            </div>
          </template>
        </s-text>

        <s-text
          label="Date:"
          type="date"
          class="col-span-4"
          v-model="grnData.date"
        />

        <s-text
          label="Reference No:"
          disabled
          class="col-span-4"
          v-model="grnData.receiptNumber"
        />

        <s-select
          label="Currency:"
          :options="currencies"
          class="col-span-4"
          v-model="grnData.currency"
        />

        <s-text
          label="Reason:"
          class="col-span-4"
          v-model="grnData.reasonForGrn"
        />

        <s-text
          label="Description:"
          class="col-span-4"
          v-model="grnData.description"
        />

        <s-content-seperator class="mt-12 mb-8" />

        <custom-table
          :headers="headers"
          :items="grnData.goodsReceivedNoteBoqs"
          :compute-quantity-outstanding="computeQuantityOutstanding"
          @boqs="grnData.goodsReceivedNoteBoqs = $event"
        />
      </div>

      <s-content-seperator class="mt-12 mb-8" />

      <div class="flex justify-end">
        <div class="w-4/12">
          <div class="flex justify-between mb-5">
            <h3>Total Invoice Quantity:</h3>
            <div>{{ computeSummary.totalQuantityInvoiced }}</div>
          </div>

          <div class="flex justify-between mb-5">
            <h3>Total Received Quantity:</h3>
            <div>{{ computeSummary.totalQuantityReceived }}</div>
          </div>

          <div class="flex justify-between mb-5">
            <h3>Total Outstanding Quantity:</h3>
            <div>{{ computeSummary.totalQuantityOutstanding }}</div>
          </div>

          <div class="flex justify-between">
            <h3>Total GRN Amount:</h3>
            <div>{{ computeSummary.totalAmount | currency }}</div>
          </div>
        </div>
      </div>

      <s-content-seperator class="mt-12 mb-8" />

      <div class="flex justify-between">
        <button
          class="px-8 py-4"
          style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
          @click="$router.back()"
        >
          Cancel
        </button>

        <div class="flex items-center">
          <s-button
            class="bg-primary-optima-color text-white px-6 ml-10"
            @click="handleDraft"
            :loading="isSaving"
          >
            Save as Draft
          </s-button>

          <!-- <s-button
            class="bg-primary-optima-color text-white px-6 ml-10"
            :loading="isProcessing"
            @click="handleProcess"
            >Save & Process</s-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import { mapActions, mapGetters } from "vuex";
import currencies from "@/utils/currency";
import customTable from "./components/customTable.vue";
import setupCodeModal from "@/views/components/setupCodeModal";
import inventoryClassModal from "../outletsAndInventoryClasses/components/inventoryClassModal";

export default {
  name: "SharedGoodReceivedNote",
  components: { setupCodeModal, customTable, inventoryClassModal },
  data() {
    return {
      loading: true,
      isSaving: false,
      isProcessing: false,
      isGeneratingCode: false,
      setupIdModal: false,
      inventoryClassModal: false,
      currencies,
      inventoryClasses: [],
      headers: [
        { text: "Item Name", width: 20 },
        { text: "Matching Item", width: 30 },
        // { text: "SKU", width: 20 },
        { text: "Unit", width: 20 },
        { text: "Quantity Invoiced", width: 20 },
        { text: "Quantity Received", width: 20 },
        { text: "Quantity Outstanding", width: 20 },
        { text: "Purchase Price", width: 20 },
        { text: "GRN Amount", width: 20 },
        { text: "Inventory Class", width: 20 },
      ],

      grnData: {
        receiptNumber: "",
        originObject: "",
        originId: "",
        currency: "",
        date: "",
        description: "",
        goodsReceivedNoteBoqs: [],
        reasonForGrn: "",
        grnNumber: "",
        goodsOrderedBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
        inventoryTypeId: "",
        supplier: {
          contactId: "",
          supplierOrgId: "",
          name: "",
          address: "",
          email: "",
          contactName: "",
          phoneNumber: "",
        },
      },
    };
  },

  validations: {
    grnData: {
      inventoryTypeId: { required },
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),

    computeSummary() {
      const summary = {
        totalQuantityInvoiced: 0,
        totalQuantityReceived: 0,
        totalQuantityOutstanding: 0,
        totalAmount: 0,
      };

      this.grnData.goodsReceivedNoteBoqs.forEach((item) => {
        summary.totalQuantityInvoiced += item.quantityInvoiced;
        summary.totalQuantityReceived += item.quantityReceived;
        summary.totalQuantityOutstanding += item.quantityOutstanding;
        summary.totalAmount += item.amount;
      });

      return summary;
    },

    getName() {
      if (this.$route.query.type === "po") return "Purchase Order";
      return this.$route.query.type;
    },

    validateInventory() {
      if (
        this.$v.grnData.inventoryTypeId.$dirty &&
        !this.$v.grnData.inventoryTypeId.required
      )
        return ["Select a valid inventory"];
    },
  },

  methods: {
    ...mapActions({
      getQuotation: "purchase/Quotation/getSingleQuotation",
      getPurchaseOrder: "purchase/PurchaseOrder/getSinglePurchaseOrder",
      getInvoice: "purchase/Invoice/getSingleInvoiceReceived",
    }),

    async setupCodeFormat(payload) {
      try {
        this.isGeneratingCode = true;
        await this.$store.dispatch("inventory/grn/createGrnCode", payload);

        this.$vs.notify({
          title: "GRN Code",
          text: "Code Saved",
          color: "primary",
          position: "top-right",
        });

        this.getSetupCodeFormat();
      } catch (err) {
        this.$vs.notify({
          title: "GRN Code",
          text: "Code Error",
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isGeneratingCode = false;
      }
    },

    // fetch and format GRN Quotation Data
    async fetchQuotation() {
      console.log("Hello");
      try {
        const { id } = this.$route.params;
        const { data } = await this.getQuotation(id);
        this.grnData = {
          ...this.grnData,
          receiptNumber: data.quote.quoteNumber,
          originObject: "quote",
          originId: data.quote.id,
          currency: data.quote.currency,
          date: data.quote.updatedAt,
          description: data.quote.comment,
          goodsReceivedNoteBoqs: data.quote.quoteBoqs.map((item) => {
            return {
              customerVariantSku: item.customerVariantSku,
              customerVariantId: item.customerVariantId,

              supplierVariantSku: item.supplierVariantSku,
              supplierVariantId: item.supplierVariantId,

              category: item.category,
              variantName: item.name,
              variantCode: item.variantCode,
              description: item.description,
              unitOfSale: item.unitOfMeasure,
              quantityInvoiced: item.quantity,
              quantityReceived: 0,
              quantityOutstanding: this.computeQuantityOutstanding(
                item.quantity,
                0
              ),
              purchasePrice: item.unitPrice || 0,
              amount: item.quantity * item.unitPrice,
              inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
            };
          }),
          supplier: {
            contactId: data.senderInfo?.contactId,
            supplierOrgId: data.senderInfo?.supplierOrgId,
            name: data.senderInfo?.name,
            address: data.senderInfo?.address,
            email: data.senderInfo?.email,
            contactName: data.senderInfo?.contactName,
            phoneNumber: data.senderInfo?.phoneNumber,
          },
        };
      } catch (err) {
        console.log(err);
      }
    },

    // fetch and format GRN Purchase Order Data
    async fetchPurchaseOrder() {
      try {
        const { id } = this.$route.params;

        const { data } = await this.getPurchaseOrder(id);

        this.grnData = {
          ...this.grnData,
          receiptNumber: data.orderNumber,
          originObject: data.originObject,
          originId: data.originId,
          currency: data.currency,
          date: data.updatedAt,
          description: data.description,
          goodsReceivedNoteBoqs: data.purchaseOrderBoqs.map((item) => {
            return {
              customerVariantSku: item.customerVariantSku,
              customerVariantId: item.customerVariantId,
              supplierVariantSku: item.supplierVariantSku,
              supplierVariantId: item.supplierVariantId,
              category: item.category,
              variantName: item.name,
              variantCode: item.variantCode,
              description: item.description,
              unitOfSale: item.unitOfMeasure,
              quantityInvoiced: item.quantity,
              quantityReceived: 0,
              quantityOutstanding: this.computeQuantityOutstanding(
                item.quantity,
                0
              ),
              purchasePrice: item.unitPrice || 0,
              amount: 0,
              inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
            };
          }),
          supplier: {
            contactId: data.supplier?.contactId,
            supplierOrgId: data.supplier?.supplierOrgId,
            name: data.supplier?.name,
            address: data.supplier?.address,
            email: data.supplier?.email,
            contactName: data.supplier?.contactName,
            phoneNumber: data.supplier?.phoneNumber,
          },
        };
      } catch (err) {
        console.log(err);
      }
    },

    // fetch and format GRN Invoice Data
    async fetchInvoice() {
      try {
        const { id } = this.$route.params;

        const { data } = await this.getInvoice(id);

        this.grnData = {
          ...this.grnData,
          receiptNumber: data.invoice.invoiceNumber,
          originObject: "invoice",
          originId: data.invoice.id,
          currency: data.invoice.currency,
          date: data.invoice.date,
          description: data.invoice.comment,
          goodsReceivedNoteBoqs: data.invoice.invoiceBoqs.map((item) => {
            return {
              customerVariantSku: item.customerVariantSku,
              customerVariantId: item.customerVariantId,
              supplierVariantSku: item.supplierVariantSku,
              supplierVariantId: item.supplierVariantId,
              category: item.category,
              variantName: item.name,
              variantCode: item.variantCode,
              description: item.description,
              unitOfSale: item.unitOfMeasure,
              quantityInvoiced: item.quantity,
              quantityReceived: 0,
              quantityOutstanding: this.computeQuantityOutstanding(
                item.quantity,
                0
              ),
              purchasePrice: item.unitPrice || 0,
              amount: item.quantity * item.unitPrice,
              inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
            };
          }),
          supplier: {
            contactId: data.senderInfo?.contactId,
            supplierOrgId: data.senderInfo?.supplierOrgId,
            name: data.senderInfo?.name,
            address: data.senderInfo?.address,
            email: data.senderInfo?.email,
            contactName: data.senderInfo?.contactName,
            phoneNumber: data.senderInfo?.phoneNumber,
          },
        };
      } catch (err) {
        console.log(err);
      }
    },

    async getSetupCodeFormat() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            moduleName: "GRN",
            yearOfBirth: null,
            contactName: null,
          },
        };

        const { data } = await this.$store.dispatch(
          "inventory/grn/getGeneratedGrnCode",
          payload
        );

        this.grnData.grnNumber = data.code;
      } catch (err) {
        throw err;
      }
    },

    async fetchCurrentOutletInventoryTypes() {
      try {
        const { data } = await this.$store.dispatch(
          "inventory/stock/viewCurrentOutletInventoryType"
        );
        this.inventoryClasses = data;
      } catch (err) {
        throw err;
      }
    },

    computeQuantityOutstanding(quantityInvoiced, quantityReceived) {
      return +(quantityInvoiced - quantityReceived);
    },

    validateQuantityReceived() {
      return this.grnData.goodsReceivedNoteBoqs.find(
        (item) => !item.quantityReceived
      );
    },

    async handleDraft() {
      try {
        // this.$v.$touch();
        // const invalidQuantityReceived = this.validateQuantityReceived();
        // if (!this.$v.$invalid) {
        this.isSaving = true;
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: { ...this.grnData, ...this.computeSummary },
        };

        // if (!payload.payload.totalAmount) {
        //   throw new Error("GRN Amount is required to generate GRN");
        // }

        // if (invalidQuantityReceived) {
        //   throw new Error("Quantity received is required to generate GRN");
        // }

        // console.log(payload)
        const { data } = await this.$store.dispatch(
          "inventory/grn/createGrn",
          payload
        );

        this.$vs.notify({
          title: "Good Received Note",
          text: data.message,
          color: "primary",
          position: "top-right",
        });

        this.$router.back();
        // }
      } catch (err) {
        this.$vs.notify({
          title: "Good Received Note",
          text: err.response?.data.message || err,
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isSaving = false;
      }
    },

    async handleProcess() {
      try {
        // this.$v.$touch();
        // const invalidQuantityReceived = this.validateQuantityReceived();
        // if (!this.$v.$invalid) {
        this.isProcessing = true;
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: { ...this.grnData, ...this.computeSummary },
        };

        // if (!payload.payload.totalAmount) {
        //   throw new Error("GRN Amount is required to generate GRN");
        // }

        // if (invalidQuantityReceived) {
        //   throw new Error("Quantity received is required to generate GRN");
        // }

        const { data } = await this.$store.dispatch(
          "inventory/grn/createGrn",
          payload
        );

        const newPayload = {
          userInfo,
          payload: {
            grnId: data.id,
            manualApproval: {
              isManualApproval: false,
              scellooId: "",
            },
          },
        };

        const { data: response } = await this.$store.dispatch(
          "inventory/grn/sendGrn",
          newPayload
        );

        this.$vs.notify({
          title: "Good Received Note",
          text: response.message,
          color: "primary",
          position: "top-right",
        });

        this.$router.back();
        // }
      } catch (err) {
        this.$vs.notify({
          title: "Good Received Note",
          text: err.response?.data.message || err,
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isProcessing = false;
      }
    },

    async createInventoryClass({ name, outlets }) {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            name,
            outletIds: outlets.map((item) => item.id),
          },
        };

        const { data } = await this.$store.dispatch(
          "inventory/stock/createInventoryType",
          payload
        );

        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: "error",
          fixed: false,
        });
      }
    },
  },

  mounted() {
    const { type } = this.$route.query;
    console.log(type, "mounted level");
    switch (type) {
      case "quote":
        this.fetchQuotation();

        break;
      case "po":
        this.fetchPurchaseOrder();

        break;
      case "invoice":
        this.fetchInvoice();

        break;

      default:
        break;
    }

    this.getSetupCodeFormat();

    this.fetchCurrentOutletInventoryTypes();

    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
  },
};
</script>

<style></style>
