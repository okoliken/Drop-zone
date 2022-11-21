<template>
  <div>
    <back location="Numbering System" class="mb-8" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      select-key="id"
      @currentTab="currentTab = $event"
    />

    <div v-if="loading">Loading...</div>

    <div style="font-size: 14px;" v-else>
      <div class="bg-white p-6 mb-3 rounded">
        {{ currentTab.name }}
      </div>

      <div class="bg-white p-6 rounded ">
        <setup-code-options
          label="Prefix"
          :identifier-type="prefix.type"
          :identifier-typeformat="prefix.typeFormat"
          :module-name="currentTab.id"
          @identifier-type="prefix.type = $event"
          @identifier-typeformat="prefix.typeFormat = $event"
          class="mb-6"
        />

        <setup-code-options
          label="Base"
          :identifier-type="roots.type"
          :identifier-typeformat="roots.typeFormat"
          :module-name="currentTab.id"
          @identifier-type="roots.type = $event"
          @identifier-typeformat="roots.typeFormat = $event"
          class="mb-6"
        />

        <setup-code-options
          label="Suffix"
          :identifier-type="suffix.type"
          :identifier-typeformat="suffix.typeFormat"
          :module-name="currentTab.id"
          @identifier-type="suffix.type = $event"
          @identifier-typeformat="suffix.typeFormat = $event"
          class="mb-6 "
        />

        <div class="grid grid-cols-12 col-gap-10 gap-10">
          <s-select
            label="Seperator"
            :options="seperatorList"
            class="col-span-4"
            v-model="separator.type"
          />

          <div class="col-span-8 flex items-end">
            <div class="flex items-center w-full">
              <span class="w-2/12">ID Preview:</span>

              <span
                class="flex items-center justify-center px-8 rounded"
                style="height: 32px; background-color: #eee;"
                >{{ previewFormat || "XX-XX-XXXX" }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- action buttons section -->
      <div class="grid grid-cols-12 gap-10 bg-white pb-10 px-8">
        <s-content-seperator class="mb-10 mt-3" />

        <div class="col-span-12 flex">
          <s-button
            class="bg-primary-optima-color text-white px-8"
            :loading="isSubmitting"
            @click="handleCode"
          >
            Apply Update
          </s-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setupCodeOptions from "./components/setupCodeOptions.vue";
import { seperatorList } from "@/utils/setupCodeOptions";

export default {
  components: { setupCodeOptions },
  data() {
    return {
      currentTab: {
        name: "Product & SKU",
        id: "SKU",
        getCodePath: "catalogue/getSkuCode",
        generateCodePath: "catalogue/getGenerateSkuCode",
        createCodePath: "catalogue/createSkuCode",
      },
      tabs: [
        {
          name: "Product & SKU",
          id: "SKU",
          getCodePath: "catalogue/getSkuCode",
          generateCodePath: "catalogue/getGenerateSkuCode",
          createCodePath: "catalogue/createSkuCode",
        },
        {
          name: "Purchase Requisition",
          id: "PR",
          getCodePath: "purchase/Requisition/getPurchaseRequisitionCode",
          generateCodePath: "purchase/Requisition/getGeneratedRequisitionCode",
          createCodePath: "purchase/Requisition/createPurchaseRequisitionCode",
        },
        {
          name: "Purchase Order",
          id: "PO",
          getCodePath: "purchase/PurchaseOrder/getPurchaseOrderOrderCode",
          generateCodePath:
            "purchase/PurchaseOrder/getGeneratedPurchaseOrderCode",
          createCodePath: "purchase/PurchaseOrder/createPurchaseOrderCode",
        },
        {
          name: "Request For Quote",
          id: "RFQ",
          getCodePath: "purchase/RequestQuote/getRequestQuoteCode",
          generateCodePath:
            "purchase/RequestQuote/getGeneratedRequestForQuoteCode",
          createCodePath: "purchase/RequestQuote/createRequestQuoteCode",
        },
        {
          name: "Quote",
          id: "Quote",
          getCodePath: "sales/Quotation/getQuotationCode",
          generateCodePath: "sales/Quotation/getGeneratedQuotationCode",
          createCodePath: "sales/Quotation/createQuotationCode",
        },
        {
          name: "Invoice",
          id: "Invoice",
          getCodePath: "sales/Invoice/getInvoiceCode",
          generateCodePath: "sales/Invoice/getGeneratedInvoiceCode",
          createCodePath: "sales/Invoice/createInvoiceCode",
        },
        {
          name: "Waybill",
          id: "Waybill",
          getCodePath: "sales/Waybill/getWaybillCode",
          generateCodePath: "sales/Waybill/getGeneratedWaybillCode",
          createCodePath: "sales/Waybill/createWaybillCode",
        },
        {
          name: "Good Received Note",
          id: "GRN",
          getCodePath: "inventory/grn/getGrnCode",
          generateCodePath: "inventory/grn/getGeneratedGrnCode",
          createCodePath: "inventory/grn/createGrnCode",
        },
        {
          name: "Material Return",
          id: "Material Return",
          getCodePath: "inventory/materialReturn/getMaterialReturnCode",
          generateCodePath:
            "inventory/materialReturn/getGeneratedMaterialReturnCode",
          createCodePath: "inventory/materialReturn/createMaterialReturnCode",
        },
        {
          name: "Material Request",
          id: "Material Request",
          getCodePath: "inventory/materialRequest/getMaterialRequestCode",
          generateCodePath:
            "inventory/materialRequest/getGeneratedMaterialRequestCode",
          createCodePath: "inventory/materialRequest/createMaterialRequestCode",
        },
        // {
        //   name: "Credit Note",
        //   id: "Credit Note",
        //   getCodePath: "sales/Quotation/getQuotationCode",
        //   generateCodePath: "sales/Quotation/getGeneratedQuotationCode",
        //   createCodePath: "sales/Quotation/createQuotationCode",
        // },
        // {
        //   name: "Debit Note",
        //   id: "Debit Note",
        //   getCodePath: "sales/Quotation/getQuotationCode",
        //   generateCodePath: "sales/Quotation/getGeneratedQuotationCode",
        //   createCodePath: "sales/Quotation/getGeneratedQuotationCode",
        // },
        // { name: "Job Order", id: "Job Order" },
      ],

      loading: false,

      isSubmitting: false,
      previewFormat: null,

      prefix: {
        type: "",
        typeFormat: null,
      },

      suffix: {
        type: "",
        typeFormat: null,
      },

      roots: {
        type: "",
        typeFormat: null,
      },

      separator: {
        type: null,
      },

      seperatorList,
    };
  },

  watch: {
    currentTab: {
      immediate: true,
      handler() {
        this.handleReset();
        this.fetchCode();
      },
    },
  },

  methods: {
    handleReset() {
      this.prefix = {
        type: "",
        typeFormat: null,
      };

      this.roots = {
        type: "",
        typeFormat: null,
      };

      this.suffix = {
        type: "",
        typeFormat: null,
      };

      this.seperator = {
        type: "",
      };
    },

    async handleCode() {
      try {
        this.isSubmitting = true;

        const { authData: userInfo } = this.$store.state.auth.auth;
        const body = {
          userInfo,
          payload: {
            setting: {
              codeFormat: {
                prefix: this.prefix,
                roots: [this.roots],
                suffix: this.suffix,
                separator: this.separator,
              },
            },
          },
        };

        const { data } = await this.$store.dispatch(
          this.currentTab.createCodePath,
          body
        );

        this.$vs.notify({
          title: `${this.currentTab.name} Code`,
          text: data.message,
          color: "primary",
          position: "top-right",
        });

        this.previewCode();
      } catch (err) {
        console.log(err);

        this.$vs.notify({
          title: `${this.currentTab.name} Code`,
          text: "Code Error",
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    async previewCode() {
      try {
        const { authData: userInfo } = this.$store.state.auth.auth;

        const body = {
          userInfo,
          payload: {
            moduleName: this.currentTab.id,
            yearOfBirth: null,
            contactName: null,
          },
        };

        const response = await this.$store.dispatch(
          this.currentTab.generateCodePath,
          body
        );

        this.previewFormat = response.data.code;
      } catch (err) {
        this.$vs.notify({
          title: `${this.currentTab.name} Code`,
          text: err.response.data.message,
          color: "primary",
          position: "top-right",
        });
      }
    },

    async fetchCode() {
      try {
        this.loading = true;

        const response = await this.$store.dispatch(
          this.currentTab.getCodePath
        );

        // checks if doc code was setup
        if (response.data.setting) {
          const format = response.data.setting.codeFormat;
          this.suffix = format.suffix;
          this.prefix = format.prefix;
          this.roots = format.roots[0];
          this.separator = format.separator;
        } else {
          throw new Error(response.data.message);
        }

        this.previewCode();
      } catch (err) {
        this.$vs.notify({
          title: `${this.currentTab.name} Code`,
          text: err.message || err.response.data.message,
          color: "primary",
          position: "top-right",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
