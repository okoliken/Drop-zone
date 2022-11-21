<template>
  <div id="div-with-loading" class="vs-con-loading__container">
    <div class="flex items-center">
      <feather-icon
        @click="$router.back()"
        icon="ArrowLeftIcon"
        svgClasses="mr-3 h-6 w-6 cursor-pointer"
      ></feather-icon>
      <span class="border-2 border-black border-t-0 border-b-0 border-l-0 pr-4">
        <p class="font-normal">Back</p>
      </span>
      <p class="ml-3 font-normal">Update Waybill</p>
    </div>

    <div
      v-if="
        getIsAccOwner ||
          geSalesWaybillPrivileges.editWaybill ||
          getInventoryWaybillPrivileges.editWaybill
      "
    >
      <div class="bg-white px-5 py-5 mt-8">
        <div class="">
          <p class="font-bold mb-10">Customer Details</p>

          <div class="flex mt-5">
            <div class="w-1/3 mr-10">
              <div class=" ">
                <span> Name</span>
                <div class="border py-3 px-2 mr-5 mt-2 rounded">
                  <p>{{ waybill.customer.name }}</p>
                </div>
              </div>
            </div>

            <div class="w-1/3 mr-10">
              <div class="">
                <span> Email</span>
                <div class="border py-3 px-2 mr-5 mt-2 rounded">
                  <p>{{ waybill.customer.email }}</p>
                </div>
              </div>
            </div>

            <div class="w-1/3 mr-10">
              <div class=" ">
                <span> Phone</span>
                <div class="border py-3 px-2 mr-5 mt-2 rounded">
                  <p>{{ waybill.customer.phoneNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex mt-10">
            <div class="w-1/3 pr-10">
              <span> Address</span>
              <div class="border py-3 px-2 mr-5 mt-2 rounded">
                <p>{{ waybill.customer.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-10" />

        <div class="mt-10">
          <p class="font-bold mb-5">Waybill Details</p>
        </div>

        <div class="">
          <div class="flex items-center justify-between mt-10">
            <div class="w-1/3 mr-10">
              <s-text
                label="Waybill Number:"
                v-if="getIsWaybillCode"
                :disabled="getIsWaybillCode"
                class="col-span-4 mb-12"
                v-model="waybill.waybillNumber"
              />
            </div>

            <div class="w-1/3 mr-10">
              <s-text
                label="Currency:"
                disabled
                class="col-span-4 mb-12"
                v-model="waybill.currency"
              />
            </div>

            <div class="w-1/3 mr-10">
              <s-text
                label="Reference:"
                disabled
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
                  class="py-3 px-2 border border-gray-300 rounded w-full"
                  id
                  cols="10"
                  rows="2"
                ></textarea>
              </label>
            </div>
            <div class="w-1/3 mr-10">
              <!-- <label for="">
              <span class="mb-3 block">Inventory Class</span>
              <select v-model="waybill.inventoryTypeId " class="py-2 px-2 border border-gray-300 rounded w-full" name="" id="">
                <option v-for="(inventory, index) in inventoryClass" :key="index" :value="inventory.id"> {{inventory.name}}</option>
              </select>
            </label> -->
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
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  #
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item Name
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
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <input
                    disabled
                    type="text"
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    v-model="boq.variantName"
                    name
                    id
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <input
                    disabled
                    type="text"
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    v-model="boq.supplierVariantSku"
                    name
                    id
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <input
                    disabled
                    type="text"
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    v-model="boq.description"
                    name
                    id
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <input
                    disabled
                    type="text"
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    v-model="boq.unitOfMeasure"
                    name
                    id
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <input
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    v-model="boq.quantity"
                    type="text"
                    name
                    id
                  />
                </td>

                <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                  <select
                    class="py-2 px-2 border border-gray-200 rounded w-full"
                    name=""
                    id=""
                    v-model="boq.inventoryTypeId"
                  >
                    <option
                      selected
                      value="26e3ee7d-3302-4e34-85a5-007b36881cb0"
                    >
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
              :disabled="updateButton"
              :class="{
                'cursor-not-allowed': updateButton,
                'bg-cloudenly-primary-off': updateButton,
              }"
              class="px-5 rounded-full py-3 bg-primary-optima-color text-white"
              @click="updateWaybill"
            >
              Update Waybill
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      updateButton: false,
      inventoryClass: [],
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
        inventoryTypeId: "",
      },
    };
  },
  methods: {
    updateWaybill() {
      this.updateButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.waybill,
      };

      this.$store
        .dispatch("sales/Waybill/updateWaybill", data)
        .then((resp) => {
          this.updateButton = false;
          this.$router.push({ name: "Waybill" });
          this.$vs.notify({
            title: "Waybill",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Waybill",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters("sales/Waybill", ["getIsWaybillCode"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "geSalesWaybillPrivileges",
      "getInventoryWaybillPrivileges",
    ]),
  },

  mounted() {
    // get quotation by id
    const id = this.$route.params.id;
    // console.log(id);
    this.$store
      .dispatch("sales/Waybill/getSingleWaybill", id)
      .then((resp) => {
        // console.log(resp.data)
        this.waybill = resp.data.waybill;
        // this.waybill.currency = resp.data.waybill.invoice.currency
      })
      .catch((err) => {
        console.log(err);
      });

    // generate waybill number

    this.$store
      .dispatch("sales/Waybill/getWaybillCode")
      .then((resp) => {
        if (resp.data.setting) {
          let format = resp.data.setting.codeFormat;
          (this.suffix = format.suffix),
            (this.prefix = format.prefix),
            (this.roots = format.roots[0]);
          this.separator = format.separator;
        } else {
          this.message = resp.data.message;
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // generate waybill number
    let data = {
      userInfo: this.$store.state.auth.auth.authData,
      payload: {
        moduleName: "WAYBILL",
        yearOfBirth: null,
        contactName: null,
      },
    };

    this.$store
      .dispatch("sales/Waybill/getGeneratedWaybillCode", data)
      .then((resp) => {
        console.log(resp);
        // this.waybill.waybillNumber = resp.data.code;
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      .catch((err) => {
        console.log(err);
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });

    this.$store
      .dispatch("inventory/stock/viewCurrentOutletInventoryType")
      .then((resp) => {
        // console.log(resp.data)
        this.inventoryClass = resp.data;
      });
  },
};
</script>

<style></style>
