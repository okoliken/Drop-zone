<template>
  <div class="mb-12">
    <div
      class="px-5 py-8 bg-white border border-solid border-grey-lighter shadow rounded"
    >
      <div class="row no-gutter mb-5">
        <div class="col-8">
          <div>
            <div class="form-group row no-gutters mb-0 pb-0">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
                >Select Outlet</label
              >
            </div>

            <div class="w-2/3">
              <select
                v-model="materialRequestData.contact"
                name=""
                class="py-4 px-2 rounded w-full border border-solid border-grey-light"
                id=""
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
            <div class="form-group row no-gutters mb-0 pb-0">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
                >Request Title</label
              >
            </div>
            <div class="form-group row no-gutters">
              <div class="w-full">
                <input
                  v-model="materialRequestData.title"
                  class="py-4 px-3 rounded border border-solid border-grey-light w-full"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="col-2 ">

          <div class="">
            <div class="md:w-full">
              <label class="block  mb-1 md:mb-0  font-bold text-sm  " for="inline-full-name">Request Number</label>
            </div>
            <div class=" md:w-full">
              <input placeholder="Enter Request No" v-model="materialRequestData.materialRequestNumber" type="text"
                class="form-control w-full" name="" id="">

            </div>
          </div>
        </div> -->
      </div>

      <div class="row no-gutter mb-5">
        <div class="col-4">
          <div class="">
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
              >Store Manager</label
            >
            <div class=" ">
              <input
                v-model="materialRequestData.storeManager"
                type="text"
                class="py-3 px-2 rounded w-full border border-solid border-grey-light"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="">
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
              >Request Department</label
            >
            <div class=" ">
              <input
                v-model="materialRequestData.requesterDepartment"
                type="text"
                class="py-3 px-2 rounded w-full border border-solid border-grey-light"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="">
            <label
              class="block md:text-left mb- md:mb-0 text-sm font-bold"
              for="inline-full-name"
              >Request From</label
            >
            <div class="md:full">
              <input
                disabled
                v-model="materialRequestData.requestedFrom"
                type="text"
                class="py-3 px-3 rounded border border-solid border-grey-light w-full"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
              >Request Description</label
            >
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea
                v-model="materialRequestData.description"
                rows="4"
                cols="30"
                class="form-control"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <label
            class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
            for="inline-full-name"
            >Validity Period</label
          >
          <div class="flex items-center w-full">
            <div class="w-2/3 mr-2">
              <input
                type="text"
                v-model="materialRequestData.validityDur"
                class="py-3 px-3 rounded border border-solid border-grey-light w-full"
                name=""
                id=""
              />
            </div>
            <div class="w-1/3">
              <select
                class="py-3 px-3 rounded border border-solid border-grey-light w-full"
                placeholder="Select Category"
                v-model="materialRequestData.validityType"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="">
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
              >Requested Date</label
            >
            <div class=" ">
              <datepicker
                v-model="materialRequestData.dateRequested"
                input-class="w-full py-3"
                placeholder="Select Date"
              >
              </datepicker>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="pb-5">
      <div class="shadow bg-white rounded">
        <table class="table w-full table-auto table-responsive">
          <thead class="bg-grey-light">
            <tr class="">
              <th class="text-center py-4">ITEM NAME</th>
              <th class="text-center py-4">DESCRIPTION</th>
              <th class="text-center py-4">SKU</th>
              <th class="text-center py-4">UofM</th>
              <th class="text-center py-4">REQUEST QTY</th>
              <th class="text-center py-4" style="width: 1%">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(
                material, index
              ) in materialRequestData.materialRequestBoqs"
              :key="index"
            >
              <td class="w-1/4">
                <input
                  disabled
                  class="form-control"
                  v-model="material.variantName"
                  name=""
                  id=""
                />
              </td>
              <td>
                <input
                  disabled
                  class="form-control"
                  v-model="material.description"
                  name=""
                  id=""
                />
              </td>
              <td>
                <input
                  disabled
                  class="form-control"
                  v-model="material.variantCode"
                  name=""
                  id=""
                />
              </td>
              <td>
                <input
                  disabled
                  class="form-control"
                  v-model="material.unitOfMeasure"
                  name=""
                  id=""
                />
              </td>

              <td>
                <input
                  v-model="material.quantityRequested"
                  class="form-control"
                  placeholder="Enter Quantity"
                />
              </td>
              <td class="text-center">
                <feather-icon
                  icon="TrashIcon"
                  @click="deleteItem(index)"
                  class="p-2 h-8 w-8 text-cloudenly-danger-main cursor-pointer text-red inline-flex"
                ></feather-icon>
              </td>
            </tr>
          </tbody>
        </table>

        <AddItemPurchase v-on:addItem="addItem" />
      </div>

      <div class="float-right mt-10 mb-10">
        <div class="">
          <button
            :disabled="updateButton"
            @click="updateMaterialRequest"
            type="button"
            :class="{
              'cursor-not-allowed': updateButton,
              'bg-cloudenly-primary-mid': updateButton,
            }"
            class="px-5 py-2 text-xl rounded border-none bg-cloudenly-primary-main cursor-pointer text-white"
          >
            Update Material Request
          </button>
        </div>
      </div>
    </section>
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
        requestedBy: "",
        requesterSignature: "",
        requesterDepartment: "",
        requestedFrom: "James",
        dateRequested: "",
        validityType: "",
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
      this.materialRequestData.contact = {
        contactId: null,
        contactOrgId: userInfo.orgId,
        contactOutletId: this.materialRequestData.contact.id,
        name: this.materialRequestData.contact.name,
        address: this.materialRequestData.contact.address,
        email: null,
        contactName: null,
        phoneNumber: null,
      };
      this.materialRequestData.storeName = this.materialRequestData.contact.name;
      this.materialRequestData.location = this.materialRequestData.contact.address;
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
            text:  err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),
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

<style>
</style>
