<template>
  <div id="div-with-loading" class="vs-con-loading__container">
    <!-- modals -->
    <setup-code-modal
      is-module
      module-name="WAYBILL"
      :preview-code="waybill.waybillNumber"
      :loading="isGeneratingCode"
      v-model="setupIdModal"
      @proceed="setupCodeFormat($event)"
    />

    <!-- <inventory-class-modal
      v-model="inventoryClassModal"
      :options="getOptimaOutlet"
      @proceed="createInventoryClass($event)"
    /> -->

    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Invoice"
    >
      <div class="container">
        <div
          class="p-5 border-2 border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white"
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-primary-main"
                class="h-8 w-8"
                icon="InfoIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">Process Info</h1>
              <p>Please note that this Waybill may undergo Approval Process</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="processButton"
            :class="{
              'cursor-not-allowed': processButton,
              'bg-cloudenly-primary-mid': processButton,
            }"
            @click="processWaybill"
            class="px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
          >
            Process
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="processModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>

    <back location="Generate Waybill" class="mb-8" />

    <div class="bg-white p-6 rounded">
      <div class="">
        <p class="font-bold mb-10">Customer Details</p>

        <div class="flex mt-5">
          <div class="w-1/3 mr-10">
            <div class=" ">
              <span> Name</span>
              <div class="border-2 border-gray-400 py-5 px-2 mr-5 mt-2 rounded">
                <p>{{ customer.name }}</p>
              </div>
            </div>
          </div>

          <div class="w-1/3 mr-10">
            <div class="">
              <span> Email</span>
              <div class="border-2 border-gray-400 py-5 px-2 mr-5 mt-2 rounded">
                <p>{{ customer.email }}</p>
              </div>
            </div>
          </div>

          <div class="w-1/3 mr-10">
            <div class=" ">
              <span> Phone</span>
              <div class="border-2 border-gray-400 py-5 px-2 mr-5 mt-2 rounded">
                <p>{{ customer.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-10">
          <div class="w-1/3 pr-10">
            <span> Address</span>
            <div class="border-2 border-gray-400 py-5 px-2 mr-5 mt-2 rounded">
              <p>{{ customer.address }}</p>
            </div>
          </div>
        </div>
      </div>

      <hr class="mt-10" />

      <div>
        <div class="flex justify-between">
          <div class="w-1/3 mr-10 mt-10">
            <s-text
              label="Waybill No"
              class="col-span-4 mb-12"
              :error="validateWaybillNumber"
              v-model="$v.waybill.waybillNumber.$model"
            >
              <!-- <template v-slot:label>
                <div class="flex justify-between mb-3 w-full">
                  <span>Waybill Number:</span>

                  <button
                    class="text-primary-optima-color"
                    @click="setupIdModal = true"
                    v-if="!getIsWaybillCode"
                  >
                    Set Up waybill ID Format
                  </button>
                </div>
              </template> -->
            </s-text>
          </div>

          <div class="w-1/3 mr-10 mt-10">
            <s-text
              label="Currency:"
              disabled
              class="col-span-4 mb-12"
              v-model="waybill.currency"
            />
          </div>

          <div class="w-1/3 mr-10 mt-10">
            <s-text
              disabled
              label="Reference:"
              class="col-span-4 mb-12"
              v-model="waybill.reference"
            />
          </div>
        </div>

        <div class="flex justify-between">
          <div class="w-1/3 mr-10">
            <label for="">
              <span class="mb-3 block">Description</span>
              <textarea
                name
                placeholder="Description"
                v-model="waybill.comment"
                class="py-3 px-2 border-2 border-gray-400 rounded w-full"
                id
                cols="10"
                rows="2"
              ></textarea>
            </label>
          </div>

          <div class="w-1/3 mr-10">
            <!-- <s-select
              :options="getCurrentOutletInventories"
              :error="validateInventory"
              v-model="$v.waybill.inventoryTypeId.$model"
            >
              <template v-slot:label>
                <div class="flex justify-between mb-3 w-full">
                  <span>Inventory:</span>

                  <button
                    class="text-primary-optima-color"
                    @click="inventoryClassModal = true"
                  >
                    Set up inventory class
                  </button>
                </div>
              </template>
            </s-select> -->
          </div>

          <div class="w-1/3 mr-10"></div>
        </div>
      </div>

      <hr class="mt-10" />
      <div class="mt-10">
        <p class="font-bold mb-5">Bill of Quantity</p>
        <table class="table min-w-full">
          <thead class="bg-gray-300">
            <tr>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">#</th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Item Name
              </th>

              <th
                v-if="documentType === 'saleOrder'"
                class="py-4 px-6 tracking-wider text-dark-optima-color"
              >
                Matching Item
              </th>

              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                SKU
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Item Description
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Unit of Measure
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Quantity
              </th>

              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Inventory Class
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(boq, index) in waybill.waybillBoqs" :key="index">
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <input
                  disabled
                  type="text"
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  v-model="boq.variantName"
                  name
                  id
                />
              </td>

              <td
                v-if="documentType === 'saleOrder'"
                class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400"
              >
                <select
                  @change="matchItem(boq, index)"
                  v-model="boq.itemMatched"
                  class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                  name
                  id
                >
                  <option
                    v-for="(item, index) in getAllVariant"
                    :key="index"
                    :value="item"
                  >
                    {{ item.variantName }}
                  </option>
                </select>
              </td>

              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <input
                  disabled
                  type="text"
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  v-model="boq.supplierVariantSku"
                  name
                  id
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <input
                  disabled
                  type="text"
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  v-model="boq.description"
                  name
                  id
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <input
                  disabled
                  type="text"
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  v-model="boq.unitOfMeasure"
                  name
                  id
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <input
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  v-model="boq.quantity"
                  type="text"
                  name
                  id
                />
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border-2 border-gray-400">
                <select
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  name=""
                  id=""
                  v-model="boq.inventoryTypeId"
                >
                  <option selected value="26e3ee7d-3302-4e34-85a5-007b36881cb0">
                    Holding inventory
                  </option>
                  <option
                    v-for="(inventory, index) in getCurrentOutletInventories"
                    :key="index"
                    :value="inventory.id"
                  >
                    {{ inventory.name }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr class="mt-10" />

      <div class="mt-10 mb-5 flex justify-between">
        <div>
          <button
            @click="$router.back()"
            type="button"
            class="px-5 rounded-full py-3 bg-gray-200 text-primary-optima-color"
          >
            Cancel
          </button>
        </div>

        <div>
          <button
            :disabled="saveButton"
            :class="{
              'cursor-not-allowed': saveButton,
              'bg-cloudenly-primary-off': saveButton,
            }"
            class="mr-5 px-5 inline-flex items-center rounded-full py-3 bg-gray-200 text-primary-optima-color"
            @click="saveWaybill"
          >
            Save and continue
          </button>

          <button
            class="px-5 rounded-full py-3 bg-primary-optima-color text-white"
            @click="processModal = true"
          >
            Process Waybill
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import setupCodeModal from "@/views/components/setupCodeModal";
// import inventoryClassModal from ".../outletsAndInventoryClasses/components/inventoryClassModal";

export default {
  components: {
    setupCodeModal,
    //    inventoryClassModal
  },
  data() {
    return {
      setupIdModal: false,
      inventoryClassModal: false,
      saveButton: false,
      processButton: false,

      isGeneratingCode: false,

      customer: {
        contactId: "",
        contactOrgId: "",
        name: "",
        address: "",
        contactName: "",
        phoneNumber: "",
      },
      waybill: {
        customer: {
          contactId: "",
          contactOrgId: "",
          name: "",
          address: "",
          contactName: "",
          phoneNumber: "",
        },
        invoiceId: "",
        currency: "",
        reference: "",
        comment: "",
        waybillNumber: "",
        // inventoryTypeId: "",
        totalAmountInvoiced: "",
        waybillBoqs: [],
      },
      isSubmitting: false,
      documentType: "",
      processModal: false,
    };
  },

  validations: {
    waybill: {
      inventoryTypeId: { required },
      waybillNumber: { required },
    },
  },

  methods: {
    saveWaybill() {
      // trigger validation
      // this.$v.$touch();

      // check validity
      // if (!this.$v.$invalid) {
      this.saveButton = true;
      const userInfo = this.$store.state.auth.auth.authData;
      this.waybill.customer = this.customer;
      const data = {
        userInfo: userInfo,
        payload: this.waybill,
      };

      // console.log(data)
      this.$store
        .dispatch("sales/Waybill/createWaybill", data)
        .then((resp) => {
          this.saveButton = false;
          this.$router.push({ name: "Waybill" });
          this.$vs.notify({
            title: "Waybill",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Waybill",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
      // }
    },

    processWaybill() {
      // trigger validation
      // this.$v.$touch();
      // check validity
      // if (!this.$v.$invalid) {
      this.processButton = true;
      const userInfo = this.$store.state.auth.auth.authData;
      this.waybill.customer = this.customer;
      const data = {
        userInfo: userInfo,
        payload: this.waybill,
      };
      this.$store
        .dispatch("sales/Waybill/createWaybill", data)
        .then((resp) => {
          // console.log(resp);
          if (resp.data) {
            const data2 = {
              userInfo: userInfo,
              payload: {
                waybillId: resp.data.id,
                inventoryTypeId: null,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("sales/Waybill/processWaybill", data2)
              .then((resp) => {
                this.$router.push({ name: "Waybill" });
                this.processButton = false;
                this.$vs.notify({
                  title: "Waybill",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          this.processButton = false;
          this.$vs.notify({
            title: "Waybill",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
      // }
    },

    async setupCodeFormat(payload) {
      try {
        this.isGeneratingCode = true;
        await this.$store.dispatch("sales/Waybill/createWaybillCode", payload);

        this.$vs.notify({
          title: "Waybill Code",
          text: "Code Saved",
          color: "primary",
          position: "top-right",
        });

        await this.generateSetupCodeFormat();
      } catch (err) {
        this.$vs.notify({
          title: "Waybill Code",
          text: "Code Error",
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isGeneratingCode = false;
      }
    },

    async generateSetupCodeFormat() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const body = {
          userInfo,
          payload: {
            moduleName: "Waybill",
            yearOfBirth: null,
            contactName: null,
          },
        };

        const { data } = await this.$store.dispatch(
          "sales/Waybill/getGeneratedWaybillCode",
          body
        );

        this.waybill.waybillNumber = data.code;
      } catch (err) {
        throw err;
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
        });
      }
    },

    async fetchInvoice() {
      try {
        const { id } = this.$route.params;
        const { data: invoice } = await this.$store.dispatch(
          "sales/Invoice/getSingleInvoice",
          id
        );
        // console.log(invoice.invoiceBoqs)
        this.waybill.reference = invoice.invoiceNumber;
        this.waybill.comment = invoice.comment;
        this.waybill.currency = invoice.currency;
        this.waybill.totalAmountInvoiced = invoice.invoiceTotal;
        this.waybill.originId = invoice.id;
        this.waybill.originObject = "invoice";
        this.customer = invoice.customer;
        this.waybill.invoiceId = invoice.id;
        this.waybill.quoteId = null;
        this.waybill.purchaseOrderId = null;
        // eslint-disable-next-line no-unused-vars
        this.waybill.waybillBoqs = invoice.invoiceBoqs.map((resp) => {
          return {
            inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
            customerVariantSku: resp.customerVariantSku,
            customerVariantId: resp.customerVariantId,
            supplierVariantSku: resp.supplierVariantSku,
            supplierVariantId: resp.supplierVariantId,
            category: resp.category,
            variantName: resp.name,
            variantCode: resp.variantCode,
            description: resp.description,
            unitOfMeasure: resp.unitOfMeasure,
            type: resp.itemClass,
            quantity: resp.quantity,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchQuote() {
      const { id } = this.$route.params;
      try {
        const { data: quote } = await this.$store.dispatch(
          "sales/Quotation/getSingleQuotation",
          id
        );

        // console.log(quote)
        (this.waybill.invoiceId = null), (this.waybill.purchaseOrderId = null);
        (this.waybill.quoteId = quote.id),
          (this.waybill.originId = quote.id),
          (this.waybill.reference = quote.quoteNumber);
        this.waybill.comment = quote.comment;
        this.waybill.currency = quote.currency;

        this.waybill.totalAmountInvoiced = quote.quoteTotal;
        this.waybill.originId = quote.id;
        this.waybill.originObject = "quote";
        this.customer = quote.customer;
        this.waybill.waybillBoqs = quote.quoteBoqs.map((resp) => {
          return {
            inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
            customerVariantSku: resp.customerVariantSku,
            customerVariantId: resp.customerVariantId,
            supplierVariantSku: resp.supplierVariantSku,
            supplierVariantId: resp.supplierVariantId,
            category: resp.category,
            variantName: resp.name,
            variantCode: resp.variantCode,
            description: resp.description,
            unitOfMeasure: resp.unitOfMeasure,
            type: resp.itemClass,
            quantity: resp.quantity,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchSaleOrder() {
      try {
        const { id } = this.$route.params;

        const { data: order } = await this.$store.dispatch(
          "sales/SaleOrder/getSingleSaleOrder",
          id
        );

        this.waybill.reference = order.purchaseOrder.orderNumber;
        this.waybill.comment = order.purchaseOrder.description;
        this.waybill.currency = order.purchaseOrder.currency;
        this.waybill.purchaseOrderId = order.id;
        this.waybill.totalAmountInvoiced = order.purchaseOrder.total;
        this.waybill.originId = order.id;
        this.waybill.originObject = "purchaseOrder";
        this.customer = order.senderInfo;
        this.waybill.invoiceId = null;
        this.waybill.quoteId = null;

        this.waybill.waybillBoqs = order.purchaseOrder.purchaseOrderBoqs.map(
          (resp) => {
            return {
              inventoryTypeId: "26e3ee7d-3302-4e34-85a5-007b36881cb0", // this is the default holding inventory id === Don't change it without informing the backend
              customerVariantSku: resp.customerVariantSku,
              customerVariantId: resp.customerVariantId,
              supplierVariantSku: resp.supplierVariantSku,
              supplierVariantId: resp.supplierVariantId,
              category: resp.category,
              variantName: resp.name,
              variantCode: resp.variantCode,
              description: resp.description,
              unitOfMeasure: resp.unitOfSale,
              type: resp.itemClass,
              quantity: resp.quantity,
            };
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    matchItem(val, index) {
      console.log(val.itemMatched, index);
      this.waybill.waybillBoqs.forEach((resp, i) => {
        if (index === i) {
          (val.inventoryTypeId = val.inventoryTypeId),
            (val.customerVariantSku = val.customerVariantSku);
          (val.customerVariantId = val.itemMatched.id),
            (val.supplierVariantSku = val.itemMatched.variantSku);
          val.supplierVariantId = val.itemMatched.id;
          val.category = val.category;
          val.variantName = val.variantName;
          val.variantCode = val.variantCode;
          val.description = val.description;
          val.unitOfMeasure = val.unitOfMeasure;
          val.type = val.type;
          val.quantity = val.quantity;
        }
      });
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),
    ...mapGetters("sales/Waybill", ["getIsWaybillCode"]),
    ...mapGetters("catalogue", ["getAllVat", "getAllVariant"]),
    ...mapGetters("inventory/stock", ["getCurrentOutletInventories"]),
    validateInventory() {
      if (
        this.$v.waybill.inventoryTypeId.$dirty &&
        !this.$v.waybill.inventoryTypeId.required
      )
        return ["Select a valid inventory"];
    },
    validateWaybillNumber() {
      if (
        this.$v.waybill.waybillNumber.$dirty &&
        !this.$v.waybill.waybillNumber.required
      )
        return ["Waybill number is required"];
    },
  },

  async mounted() {
    const module = this.$route.query.module;
    this.documentType = this.$route.query.module;
    try {
      switch (module) {
        case "invoice":
          this.fetchInvoice();
          break;
        case "quote":
          this.fetchQuote();
          break;

        case "saleOrder":
          this.fetchSaleOrder();
          break;
      }

      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });

      await this.$store.dispatch("sales/Waybill/getWaybillCode");
      const body = {
        userInfo: this.$store.state.auth.auth.authData,
        payload: {
          moduleName: "WAYBILL",
          yearOfBirth: null,
          contactName: null,
        },
      };
      await this.$store.dispatch("catalogue/getAllCatalogueVariant");

      // check waybill code is setup before generating waybill code
      if (this.getIsWaybillCode) {
        const { data } = await this.$store.dispatch(
          "sales/Waybill/getGeneratedWaybillCode",
          body
        );

        this.waybill.waybillNumber = data.code;
      }

      await this.$store.dispatch(
        "inventory/stock/viewCurrentOutletInventoryType"
      );

      await this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    } catch (err) {
      throw err;
    } finally {
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    }
  },
};
</script>

<style></style>
