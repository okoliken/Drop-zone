<template>
  <div class="">
    <back location="Material Request - Create New" class="mb-8" />
    <div
      v-if="getIsAccOwner || getMaterialRequestPrivileges.editMaterialRequest"
    >
      <div class="px-5 py-8 bg-white">
        <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
          <div class="col-4">
            <div>
              <div class="form-group row no-gutters mb-5 pb-0">
                <label
                  for="default-input-rounded"
                  class="label font-semibold mb-5"
                >
                  Select Outlet
                </label>
              </div>

              <div class="mb-5">
                <select
                  @change="selectedStoreManager"
                  v-model="materialRequestData.contact"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(outlet, index) in getOptimaOutlet"
                    :key="index"
                    :value="outlet"
                  >
                    {{ outlet.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div>
              <div class="mb-5">
                <label for="" class="font-semibold"> Request Title </label>
              </div>
              <div class="">
                <div class="w-full">
                  <input
                    v-model="materialRequestData.title"
                    class="py-2 px-3 rounded border-2 border-gray-400 w-full"
                    type="text"
                    name
                    id
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="">
              <div class="mb-5">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="font-semibold mb-5" for="inline-full-name">
                      Request Number
                    </label>
                  </div>

                  <!-- <div>
                    <button
                      @click="setupIdModal = true"
                      class="text-primary-optima-color"
                    > 
                      Setup Code Link
                    </button>
                  </div> -->
                </div>
              </div>
              <div class>
                <input
                  v-model="materialRequestData.materialRequestNumber"
                  type="text"
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  name
                  id
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
          <div class="col-4">
            <div class="">
              <div class="mb-5">
                <label class="font-semibold mb-5" for="inline-full-name">
                  Store Manager
                </label>
              </div>
              <div class>
                <select
                  v-model="materialRequestData.storeManagerId"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(manager, index) in getOptimaUsers"
                    :key="index"
                    :value="manager.id"
                  >
                    {{ manager.fname + " " + manager.lname }}
                  </option>
                </select>
              </div>
            </div>
          </div>

         

          <div class="col-4">
            <div>
              <div class="form-group row no-gutters mb-5 pb-0">
                <label
                  for="default-input-rounded"
                  class="label font-semibold mb-5"
                >
                  Select Function
                </label>
              </div>

              <div class="mb-5">
                <select
                  @change="selectedFunctionId"
                  v-model="materialRequestData.functionMakingRequestData"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(orgFunc, index) in getOrgFunction"
                    :key="index"
                    :value="orgFunc"
                  >
                    {{ orgFunc.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class>
              <div class="mb-5">
                <label class="font-semibold" for=""> Request From </label>
              </div>
              <div class="mb-5">
                <input
                  disabled
                  v-model="materialRequestData.requestedFrom"
                  type="text"
                  class="py-3 px-3 rounded border-2 border-gray-400 w-full"
                  name
                  id
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
          <div class="col-4">
            <div class>
              <div class="mb-5">
                <label class="font-semibold" for=""> Requested Date </label>
              </div>
              <div class>
                <datepicker
                  v-model="materialRequestData.dateRequested"
                  input-class="w-full py-3"
                  placeholder="Select Date"
                ></datepicker>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="mb-5">
              <label class="font-semibold" for=""> Validity Period </label>
            </div>
            <div class="flex items-center w-full">
              <div class="w-1/3">
                <select
                  class="py-2 px-3 border-2 border-gray-400 w-full"
                  placeholder="Select Category"
                  v-model="materialRequestData.validityType"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div class="w-2/3 mr-2">
                <input
                  type="text"
                  v-model="materialRequestData.validityDur"
                  class="py-2 px-3 border-2 border-gray-400 w-full"
                  name
                  id
                />
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="mb-5">
              <label for="" class="font-semibold"> Request Description </label>
            </div>
            <div class="form-group row no-gutters">
              <div class="col-md-12">
                <textarea
                  v-model="materialRequestData.description"
                  rows="4"
                  cols="30"
                  class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-10" />

        <section class="mt-10">
          <div class="">
            <span class="font-semibold">Bill of Quantity</span>
            <table class="table min-w-full mt-5">
              <thead class="bg-gray-300">
                <tr class>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    ITEM NAME
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    DESCRIPTION
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    SKU
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    UofM
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    REQUEST QTY
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(
                    material, index
                  ) in materialRequestData.materialRequestBoqs"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                      v-model="material.variantName"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                      v-model="material.description"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                      v-model="material.variantCode"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                      v-model="material.unitOfMeasure"
                      name
                      id
                    />
                  </td>

                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      v-model="material.quantityRequested"
                      class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                      placeholder="Enter Quantity"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <feather-icon
                      icon="TrashIcon"
                      @click="deleteItem(index)"
                      class="
                        p-2
                        h-8
                        w-8
                        text-cloudenly-danger-main
                        cursor-pointer
                        text-red
                        inline-flex
                      "
                    ></feather-icon>
                  </td>
                </tr>
              </tbody>
            </table>

            <AddItemPurchase v-on:addItem="addItem" />
          </div>

          <hr class="mt-10" />

          <div class="flex items-center justify-between mt-10">
            <button
              @click="$router.back()"
              style="background: #f3f6f9; color: #1034a6"
              type="button"
              class="px-8 py-4 rounded-full"
            >
              Cancel
            </button>

            <div>
              <button
                type=" button"
                :class="{ 'cursor-not-allowed': updateButton }"
                class="
                  py-4
                  px-8
                  text-white
                  bg-primary-optima-color
                  rounded-full
                "
                @click.prevent="updateMaterialRequest"
              >
                Update Request
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AddItemPurchase from "../../../components/AddItemWidget/AddItemPurchase";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    AddItemPurchase,
    Datepicker,
  },
  data() {
    return {
      updateButton: false,
      outlet: "",
      materialRequestData: {
        title: "",
        requestedOutletId: "",
        functionMakingRequest: "",
        functionMakingRequestId: "",
        functionMakingRequestData: "",
        materialRequestNumber: "",
        contact: {
          contactId: null,
          contactOrgId: null,
          contactOutletId: null,
          name: null,
          address: null,
          email: null,
          contactName: null,
          phoneNumber: null,
        },
        storeManagerId: "",
        requestedBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
        requesterSignature: "",
        requesterDepartment: "",
        requestedFrom: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
        dateRequested: "",
        validityType: "days",
        validityDur: "",
        storeName: "",
        location: "",
        storeManager: "",
        materialRequestBoqs: [],
      },
    };
  },

  methods: {
    addItem(val) {
      this.materialRequestData.materialRequestBoqs.push({
        variantCategory: val.item.category.name,
        variantName: val.variantName,
        variantCode: val.variantCode,
        customerVariantSku: val.variantSku,
        customerVariantId: null,
        supplierVariantSku: null,
        supplierVariantId: null,
        name: val.item.name,
        description: val.item.description,
        unitOfSale: val.retailPriceBooks.unitOfSale,
        quantityRequested: 0,
      });
    },

    deleteItem(val) {
      this.materialRequestData.materialRequestBoqs.splice(1, val);
    },

    updateMaterialRequest() {
      this.updateButton = true;
      let userInfo = this.$store.state.auth.auth.authData;

      this.materialRequestData.requestedBy = `${this.$store.state.auth.auth.userData.fname} ${ this.$store.state.auth.auth.userData.mname ? this.$store.state.auth.auth.userData.mname +" " + this.$store.state.auth.auth.userData.lname : this.$store.state.auth.auth.userData.lname }`;
      this.materialRequestData.requestedFrom = this.$store.state.auth.auth.loginOutlet.name;
      // this.materialRequestData.functionMakingRequestId =  this.materialRequestData.functionMakingRequestData.id ? this.materialRequestData.functionMakingRequestData.id : null  ; 
      // this.materialRequestData.functionMakingRequest = this.materialRequestData.functionMakingRequestData.name ? this.materialRequestData.functionMakingRequestData.name : "" ;

      let data = {
        userInfo: userInfo,
        payload: this.materialRequestData,
      };

      this.$store
        .dispatch("inventory/materialRequest/updateMaterialRequest", data)
        .then((resp) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Material Request ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.$router.push({ name: "MaterialRequest" });
        })
        .catch((err) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Material Request ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    selectedStoreManager() {
      this.materialRequestData.requestedOutletId =
        this.materialRequestData.contact.id;
      // console.log(this.materialReturnData.contact)
      // this.outlet = this.materialRetquestData.contact.id;
      let name = `${this.materialRequestData.contact.manager.fname} ${this.materialRequestData.contact.manager.lname}`;
      let storeManagerId = `${this.materialRequestData.contact.manager.id}`;
      this.materialRequestData.storeManager = name;
      this.materialRequestData.storeManagerName = name;
      this.materialRequestData.storeManagerId = storeManagerId;
    },

    selectedFunctionId() {
      // this.functionMakingRequestId = name;
      // console.log(this.functionMakingRequestId)
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getOptimaOutlet",
      "getUsers",
      "getOptimaUsers",
      "getOrgFunction",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getMaterialRequestPrivileges",
    ]),
  },

  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store
      .dispatch("inventory/materialRequest/getSingleMaterialRequest", id)
      .then((resp) => {
        this.materialRequestData = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
