<template>
  <div>
    <back v-if="queryInfo === 'new-item'" location="Create Service New Item" />
    <back v-else location="Edit Service New Item" />

    <div class="mt-5">
      <form data-vv-scope="productDetail">
        <section class="py-8 px-10 bg-white rounded">
          <div class="mt-5 mb-5">
            <p class="font-semibold text-lg">Service Item Details</p>
          </div>

          <div class="mb-5 flex items-center justify-between">
            <s-photo
              :defaultPhoto="image_dummy"
              :title="'Image'"
              :showUpload="editable"
              url="http://18.135.196.19:5001/document-management/upload/profile-photo"
              v-model="variant.image"
            >
            </s-photo>

            <!-- QR CODE -->
            <div class="rounded-md border border-1 border-primary-optima-color  w-76 qrc-shadow py-8 px-20">
              <div>
                <button class="text-primary-optima-color text-md font-[500]">
                  QR Code
                </button>
              </div>
            </div>

            <!-- END -->
          </div>

          <div class="flex mt-10 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5 flex items-center justify-between">
                <div class>
                  <label class="block" for="inline-full-name">
                    <span class="font-normal">Category:</span>
                  </label>
                </div>
              </div>

              <div class>
                <select
                  v-model="variant.categoryId"
                  class="py-2 border border-1 border-gray-500 rounded w-full"
                  name="category"
                  v-validate="'required'"
                  id
                >
                  <option
                    v-for="(category, index) in getAllItemCategory"
                    :key="index"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div
              :class="{ error: errors.has('productDetail.brand') }"
              class="w-1/3 mr-16"
            >
              <div class>
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <label class="Block" for="inline-full-name">
                      <span class="font-normal">Sub Category :</span>
                    </label>
                  </div>
                </div>

                <div class>
                  <select
                    v-model="variant.subCategoryId"
                    class="
                      py-2
                      border border-1 border-gray-500
                      rounded-sm
                      w-full
                    "
                    name="brand"
                    v-validate="'required'"
                    id
                  >
                    <option
                      v-for="(brand, index) in getAllItemCategory"
                      :key="index"
                      :value="brand.id"
                    >
                      {{ brand.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="w-1/3">
              <div class="mb-5">
                <label class="flex items-center" for="inline-full-name">
                  <span class="font-normal mr-5">Service Name :</span>
                  <span class="text-danger">*Required</span>
                </label>
              </div>
              <div class>
                <input
                  class="py-2 px-2 border-1 border-gray-500 rounded-sm w-full"
                  placeholder="Item Name"
                  v-model="variant.name"
                  v-validate="'required'"
                  name="name"
                />
              </div>
            </div>
          </div>

          <div class="flex mt-10 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="flex items-center" for="inline-full-name">
                  <span class="font-normal mr-5">Supplier :</span>
                </label>
              </div>
              <div class>
                <select
                  v-model="variant.supplierId"
                  class="py-2 border border-1 border-gray-500 rounded-sm w-full"
                  name="brand"
                  v-validate="'required'"
                  id
                >
                  <option
                    v-for="(supplier, index) in getSupplierContact"
                    :key="index"
                    :value="supplier.id"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="w-1/3 mr-16">
              <div class>
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <label class="Block" for="inline-full-name">
                      <span class="font-normal">Unit of Service:</span>
                    </label>
                  </div>
                  <div></div>
                </div>

                <div class="flex">
                  <input
                    class="py-2 px-2 rounded-sm border-1 border-gray-500 w-full"
                    placeholder
                    v-model="variant.unitPrice"
                    name="sku"
                    v-validate="'required'"
                  />

                  <select
                    @change="toggleUnit"
                    v-model="variant.unitOfService"
                    class="
                      select
                      py-2
                      px-2
                      rounded-sm
                      border-1 border-gray-500
                      w-1/3
                    "
                    name=""
                    id=""
                  >
                    <option
                      v-for="(unit, index) in unitOFMeasurementData"
                      :key="index"
                      :value="unit.value"
                    >
                      {{ unit.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="w-1/3">
              <div class>
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <label class="Block" for="inline-full-name">
                      <span class="font-normal">Item Code:</span>
                    </label>
                  </div>
                  <div></div>
                </div>

                <div class="">
                  <input
                    class="py-2 px-2 rounded-sm border-1 border-gray-500 w-full"
                    placeholder
                    v-model="variant.code"
                    name="sku"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex mt-10 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="block" for="inline-full-name">
                  <span class="font-normal">Insourced or Outsourced:</span>
                </label>
              </div>
              <div class="flex items-center mt-3">
                <label
                  v-for="(itemSource, i) in getItemSource"
                  :key="i"
                  class="mr-8 flex items-center"
                >
                  <input
                    v-model="variant.sourcedId"
                    class="mr-3"
                    type="radio"
                    :name="itemSource.name"
                    :value="itemSource.id"
                  />
                  <span>{{ itemSource.name }}</span>
                </label>
              </div>
            </div>

            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="block" for="inline-full-name">
                  <span class="font-normal"
                    >Do you want this service to be priced:</span
                  >
                </label>
              </div>

              <div class="flex items-center mt-3">
                <label class="mr-8 flex items-center">
                  <input
                    v-model="variant.priced"
                    :value="true"
                    class="mr-3"
                    type="radio"
                    name="yes"
                  />
                  <span>Yes</span>
                </label>

                <label class="flex items-center">
                  <input
                    v-model="variant.priced"
                    :value="false"
                    class="mr-3"
                    type="radio"
                    name="no"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div class="w-1/3">
              <div v-show="variant.priced">
                <div class="mb-5">
                  <label class="flex items-center" for="inline-full-name">
                    <span class="font-normal mr-5"> Cost Per Unit (NGN) :</span>
                  </label>
                </div>
                <div class>
                  <input
                    @keyup="calFeeInfo"
                    @blur="calFeeInfo"
                    class="py-2 px-2 rounded-sm border-1 border-gray-500 w-full"
                    placeholder="Cost per Unit."
                    v-model="variant.costPerUnit"
                    name="part number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-show="variant.priced" class="flex mt-10 mb-5">
            <div class="w-1/3">
              <div class="mb-5">
                <label class="block" for="inline-full-name">
                  <span class="font-normal"> Applicable Discount: </span>
                </label>
              </div>

              <div class="flex items-center mt-3">
                <label class="mr-8 flex items-center">
                  <input
                    v-model="variant.discount"
                    :value="true"
                    class="mr-3"
                    type="radio"
                    name="discount"
                  />
                  <span>Yes</span>
                </label>

                <label class="flex items-center">
                  <input
                    v-model="variant.discount"
                    :value="false"
                    class="mr-3"
                    type="radio"
                    name="discount"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section
          v-show="variant.priced"
          class="py-8 px-10 mt-5 bg-white rounded"
        >
          <div class="flex items-center justify-between mb-5">
            <div>
              <p>Fee Information</p>
            </div>

            <div class="flex items-center cursor-pointer">
              <span @click="collapse = !collapse" class="mr-3">
                <svg
                  class="w-full"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.6466 8.5L13.7644 7.38219L6.88219 0.5L0 7.38219L1.11781 8.5L6.88219 2.73562L12.6466 8.5Z"
                    fill="#1034A6"
                  />
                </svg>
              </span>
              <span
                @click="collapse = !collapse"
                class="text-primary-optima-color"
              >
                collapse
              </span>
            </div>
          </div>

          <svg
            width="1072"
            height="1"
            viewBox="0 0 1072 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="0.5"
              x2="1072"
              y2="0.5"
              stroke="#C2C7D6"
              stroke-dasharray="8 8"
            />
          </svg>
          <div v-show="collapse">
            <div class="mt-8">
              <div
                class="
                  pb-8
                  flex
                  w-full
                  border-1 border-t-0 border-r-0 border-l-0
                "
              >
                <div class="flex items-center mt-5">
                  <div class="mr-16">
                    <div class="mb-5">
                      <label class="block pr-3" for="inline-full-name"
                        >Service Cost (NGN)</label
                      >
                    </div>

                    <div class="flex items-center">
                      <input
                        disabled
                        readonly
                        @keyup="calFeeInfo"
                        @blur="calFeeInfo"
                        v-model="variant.feeInformation.serviceCost"
                        class="py-2 px-2 border-1 border-gray-400"
                        type="text"
                        name
                        id
                      />
                    </div>
                  </div>

                  <div class="mr-16">
                    <div class="mb-5">
                      <label class="block pr-3" for="inline-full-name"
                        >Fee Markup</label
                      >
                    </div>

                    <div class="flex items-center">
                      <input
                        @keyup="calFeeInfo"
                        @blur="calFeeInfo"
                        v-model="variant.feeInformation.feeMarkUpPercentage"
                        class="py-2 px-2 border-1 border-gray-400"
                        type="text"
                        name
                        id
                      />
                      <button
                        class="
                          py-1
                          px-4
                          -m-12
                          border-1
                          font-bold
                          border-gray-400 border-t-0 border-r-0 border-b-0
                        "
                      >
                        %
                      </button>
                    </div>
                  </div>

                  <div v-show="variant.discount" class="mr-16">
                    <div class="mb-5">
                      <label class="block pr-3" for="inline-full-name"
                        >Maximum Discount
                      </label>
                    </div>

                    <div class="flex items-center">
                      <input
                        @keyup="calFeeInfo"
                        @blur="calFeeInfo"
                        v-model="variant.feeInformation.maxDiscountPercentage"
                        class="py-2 px-2 border-1 border-gray-400"
                        type="text"
                        name
                        id
                      />
                      <button
                        class="
                          py-1
                          px-4
                          -m-12
                          border-1
                          font-bold
                          border-gray-400 border-t-0 border-r-0 border-b-0
                        "
                      >
                        %
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 overflow-hidden overflow-x-auto">
                <table class="table w-full">
                  <thead class>
                    <tr>
                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Unit of Service
                      </th>

                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Qty
                      </th>
                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Item Price (NGN)
                      </th>
                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Margin(NGN)
                      </th>

                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Margin(%)
                      </th>

                      <th
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Min. Price (NGN)
                      </th>

                      <th
                        v-show="variant.discount"
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Max. Allowable Disc. (%)
                      </th>

                      <th
                        v-show="variant.discount"
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Disc. margin (NGN)
                      </th>

                      <th
                        v-show="variant.discount"
                        class="py-3 px-3 bg-gray-200 font-semibold text-center"
                      >
                        Discount Margin % (NGN)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr class="w-full">
                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          disabled
                          readonly
                          v-model="variant.feeInformation.unitOfService"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          disabled
                          readonly
                          v-model="variant.feeInformation.quantity"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.itemPrice"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.priceMargin"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.percentageMargin"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.minimumPrice"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        v-show="variant.discount"
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.maxDiscountPercentage"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        v-show="variant.discount"
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="variant.feeInformation.discountPriceMargin"
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>

                      <td
                        v-show="variant.discount"
                        class="py-3 px-3 border-1 border-gray-400 text-center"
                      >
                        <input
                          v-model="
                            variant.feeInformation.discountPercentageMargin
                          "
                          class="py-2 px-2 border-1 border-gray-400"
                          type="text"
                          name
                          id
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="mt-5">
              <div>
                <label class="flex items-center" for="tax">
                  <input
                    v-model="showTaxes"
                    class="mr-3"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <span class="font-normal">
                    Apply VAT to this Service Item</span
                  >
                </label>

                <div v-show="showTaxes">
                  <div class="mt-8 mb-3">
                    <select
                      @change="clearSelectedTax"
                      v-model="taxType"
                      class="py-2 px-2 rounded border-1 border-gray-400 w-1/4"
                      name
                      id
                    >
                      <option value="taxExclusive">Tax Exclusive</option>
                      <option value="taxInclusive">Tax Inclusive</option>
                      <option value="taxExempt">Tax Exempt</option>
                    </select>
                  </div>

                  <div class="mt-5">
                    <p class="text-lg">
                      Outlet Jurisdiction : - {{ outletVat.country }}
                      {{ outletVat.state }}
                    </p>
                  </div>

                  <div class="mt-5">
                    <table class="table w-auto">
                      <tbody>
                        <tr
                          v-for="(tax, index) in outletVat.taxes"
                          :key="index"
                        >
                          <td class="py-3 px-6">
                            <vs-checkbox
                              class="py-0 p-0 m-0"
                              :vs-value="tax.id"
                              v-model="selectedTaxes"
                            ></vs-checkbox>
                          </td>

                          <td class="py-3 px-8">
                            <div>
                              <span class="mr-2 font-semibold">Tax Name :</span>
                              <span>{{ tax.name }}</span>
                            </div>
                          </td>
                          <td class="py-3">
                            <div>
                              <span class="mr-2 font-semibold"> Rate :</span>
                              <span>{{ tax.amount }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      <div
        v-if="queryInfo === 'new-item'"
        class="py-12 px-8 flex justify-between bg-white"
      >
        <div>
          <button
            @click="$router.back()"
            type="button"
            class="
              py-3
              px-5
              text-lg
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
              rounded-full
            "
          >
            Cancel
          </button>
        </div>

        <div>
          <s-button
            :loading="saveItemInfoButton"
            @click="saveItemInfoVariant"
            type="button"
            class="px-8 bg-primary-optima-color text-white"
          >
            Save
          </s-button>
        </div>
      </div>

      <div v-else class="py-12 px-8 flex justify-between bg-white">
        <div>
          <button
            @click="$router.back()"
            type="button"
            class="
              py-3
              px-5
              text-lg
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
              rounded-full
            "
          >
            Cancel
          </button>
        </div>

        <div>
          <button
            @click="updateServiceItem"
            type="button"
            class="
              py-3
              px-5
              text-lg
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
              rounded-full
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
import Drawer from "../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import alertPrivilege from "../../components/Alert/AlertPrevilege";

import vatSetting from "../settings/locationsAndTaxes/taxes/tax.vue";
import UnitOfMeasurement from "../../../utils/unitOfMeasurement";

export default {
  components: {
    Drawer,
    Datepicker,
    alertPrivilege,
    vatSetting,
    sPhoto
  },

  data() {
    return {
      collapse: true,
      image_dummy,
      editable: true,
      itemDisableState: false,
      saveItemInfoButton: false,
      unitOFMeasurementData: UnitOfMeasurement,
      outletIds: [],
      selectedTaxes: [],
      outletVat: {},
      taxType: "taxExclusive",
      queryInfo: "",
      showTaxes: false,
      variant: {
        name: "",
        image: null,
        categoryId: null,
        subCategoryId: null,
        unitOfService: null,
        unitPrice: 0,
        costPerUnit: 0,
        itemCode: null,
        sourcedId: null,
        priced: true,
        discount: true,
        supplierId: null,
        feeInformation: {
          serviceCost: 0,
          feeMarkUpId: null,
          feeMarkUpPercentage: 0,
          // discountPercentage: 10
          maxDiscountPercentage: 0,
          unitOfService: "",
          quantity: 1,
          itemPrice: 0,
          priceMargin: 0,
          percentageMargin: 0,
          taxType: "taxExempt",
          minimumPrice: 0,
          discountPriceMargin: 0,
          discountPercentageMargin: 0
        },
        tax: {
          taxId: null,
          taxIds: []
        }
      }
    };
  },
  methods: {
    // save main item information
    saveItemInfoVariant() {
      this.saveItemInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        creatorsOutletId: this.$store.state.auth.auth.authData.outletId,
        outletIds: this.outletIds
      };

      if (this.selectedTaxes.length === 0) {
        delete this.variant.tax;
      } else {
        this.variant.tax.taxIds = this.selectedTaxes;
      }

      const dataPayload = {
        userInfo: userInfo,
        payload: {
          ...this.variant
        }
      };

      console.log(dataPayload);

      this.$store
        .dispatch("catalogue/serviceItem/createServiceItemAction", dataPayload)
        .then(resp => {
          this.$router.back();
          this.saveItemInfoButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false
          });
        })
        .catch(err => {
          console.log(err);
          this.saveItemInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    updateServiceItem() {},
    async getOutletVatCreated() {
      const { data } = await this.$store.dispatch("catalogue/tax/getOutletVat");
      // console.log(data, "This is the outlet output");
      this.outletVat = data;
      // console.log(this.outletVat);
    },

    toggleUnit() {
      this.variant.feeInformation.unitOfService = this.variant.unitOfService;
    },

    calFeeInfo() {
      this.variant.feeInformation.serviceCost = parseInt(
        this.variant.costPerUnit
      );

      this.variant.feeInformation.itemPrice = parseInt(
        this.variant.feeInformation.serviceCost *
          (1 + parseInt(this.variant.feeInformation.feeMarkUpPercentage) / 100)
      );

      this.variant.feeInformation.priceMargin =
        parseInt(this.variant.feeInformation.itemPrice) -
        parseInt(this.variant.feeInformation.serviceCost);

      this.variant.feeInformation.percentageMargin =
        (parseInt(this.variant.feeInformation.priceMargin) /
          parseInt(this.variant.feeInformation.itemPrice)) *
        100;

      this.variant.feeInformation.maxDiscountPercentage = this.variant.feeInformation.maxDiscountPercentage;

      this.variant.feeInformation.discountPercentage = parseInt(
        this.variant.feeInformation.discountPercentage
      );

      // this min price
      this.variant.feeInformation.minimumPrice =
        parseInt(this.variant.feeInformation.itemPrice) *
        (1 - parseInt(this.variant.feeInformation.maxDiscountPercentage) / 100);

      this.variant.feeInformation.discountPriceMargin =
        parseInt(this.variant.feeInformation.minimumPrice) -
        parseInt(this.variant.feeInformation.serviceCost);

      this.variant.feeInformation.discountPercentageMargin =
        (parseInt(this.variant.feeInformation.discountPriceMargin) /
          parseInt(this.variant.feeInformation.minimumPrice)) *
        100;
      this.variant.feeInformation.discountPercentageMargin = this.variant.feeInformation.discountPercentageMargin.toFixed(
        2
      );

      this.variant.feeInformation.itemPrice = this.variant.feeInformation.itemPrice.toFixed(
        2
      );
      this.variant.feeInformation.priceMargin = this.variant.feeInformation.priceMargin.toFixed(
        2
      );
      this.variant.feeInformation.percentageMargin = this.variant.feeInformation.percentageMargin.toFixed(
        2
      );
      this.variant.feeInformation.maxDiscountPercentage = this.variant.feeInformation.maxDiscountPercentage.toFixed(
        2
      );
      this.variant.feeInformation.discountPercentage = this.variant.feeInformation.discountPercentage.toFixed(
        2
      );
      this.variant.feeInformation.minimumPrice = this.variant.feeInformation.minimumPrice.toFixed(
        2
      );
      this.variant.feeInformation.discountPriceMargin = this.variant.feeInformation.discountPriceMargin.toFixed(
        2
      );
    },

    clearSelectedTax() {
      this.selectedTaxes = [];
    }
  },

  computed: {
    ...mapGetters("catalogue", [
      "getAllBrand",
      "getIsSkuSetup",
      "getAllItemCategory"
    ]),

    ...mapGetters("catalogue/serviceItem", ["getItemSource"]),
    ...mapGetters("crm/contact", ["getSupplierContact"])
  },

  mounted() {
    let userAuth = this.$store.state.auth.auth.authData;
    let userInfo = {
      userInfo: {
        ...userAuth
      }
    };

    this.queryInfo = this.$route.query.type;
    switch (this.queryInfo) {
      // eslint-disable-next-line no-case-declarations
      case "new-item":
        // getItemCharacteristic
        this.$store.dispatch("catalogue/getAllBrand", userInfo);
        this.$store.dispatch("catalogue/getAllItemCategory", userInfo);
        this.$store.dispatch("crm/contact/getAllSupplierContact");

        this.$store
          .dispatch("catalogue/markupDiscount/getOutletServiceMarkupDiscount")
          .then(resp => {
            // console.log(resp.data.data);
            this.variant.feeInformation.feeMarkUpId = resp.data.data.id || null;
            this.variant.feeInformation.feeMarkUpPercentage =
              resp.data.data.salesMarginPercentage || 0;
            this.variant.feeInformation.maxDiscountPercentage =
              resp.data.data.maximumAllowableDiscount || 0;
          });

        this.$store.dispatch("catalogue/serviceItem/getItemSourceAction");

        // get all optima outlet
        this.$store
          .dispatch("userOutlet/getOptimaOrganisationOutlet")
          .then(resp => {
            this.outletIds = resp.data.outlets.map(resp => {
              return resp.id;
            });
          })
          .catch(err => {
            console.log(err);
          });
        this.calFeeInfo();
        this.getOutletVatCreated();
        this.$store.dispatch("crm/contact/getAllSupplierContact");

        break;
      case "edit-item":
    }
  }
};
</script>

<style></style>
