
<template>
  <div>
    <back location="View Variant Item" />
    <div
       v-if="`getIsAccOwner` || getPurchaseCataloguePrivileges.viewItem"
      class="mt-5"
    >
      <!-- Product Details -->
      <div class="py-8 px-10 bg-white rounded">
        <div
          v-if="!catalogueState.productDetail"
          class="mt-8 flex items-center justify-between"
        >
          <div>
            <div class="flex items-center">
              <p class="font-semibold text-lg">
                Product Details and Variant Information
              </p>
              <div class="py-1 px-8 flex items-center ml-8 rounded">
                <svg
                  class=""
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 16.5C8 21.1944 11.8056 25 16.5 25C21.1944 25 25 21.1944 25 16.5C25 11.8056 21.1944 8 16.5 8C11.8056 8 8 11.8056 8 16.5ZM23.453 16.4998C23.453 20.3407 20.3394 23.4543 16.4985 23.4543C12.6576 23.4543 9.54395 20.3407 9.54395 16.4998C9.54395 12.6589 12.6576 9.54524 16.4985 9.54524C20.3394 9.54524 23.453 12.6589 23.453 16.4998ZM16.5041 21.1363C17.0259 21.1363 17.4488 20.7135 17.4488 20.1919C17.4488 19.6703 17.0259 19.2475 16.5041 19.2475C15.9823 19.2475 15.5593 19.6703 15.5593 20.1919C15.5593 20.7135 15.9823 21.1363 16.5041 21.1363ZM17.4531 12.6364H15.5636V18.303H17.4531V12.6364Z"
                    fill="#070707"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center">
              <div
                @click="toggleProductDetailsEdit"
                class="flex items-center cursor-pointer mr-8"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9999 18.5V11.5H17.9999V18.5H1.99994V2.5H8.99994V0.5H1.99994C0.895369 0.5 -6.10352e-05 1.39543 -6.10352e-05 2.5V18.5C-6.10352e-05 19.6046 0.895369 20.5 1.99994 20.5H17.9999C19.1045 20.5 19.9999 19.6046 19.9999 18.5ZM17.178 1.22342C16.7197 0.76142 16.092 0.5 15.4373 0.5C14.7833 0.5 14.1563 0.76083 13.6953 1.22463L5.32644 9.59342C4.57861 10.2523 4.08838 11.2328 4.00319 12.2873L3.99994 15.5023V16.5023H8.13454C9.26884 16.4245 10.259 15.9295 10.9574 15.1238L19.2789 6.80584C19.7406 6.34416 20 5.71799 20 5.06508C20 4.41217 19.7406 3.786 19.2789 3.32432L17.178 1.22342ZM8.06392 14.5048C8.59815 14.467 9.09543 14.2184 9.49473 13.7616L15.5566 7.69972L12.8024 4.94527L6.69604 11.0496C6.29089 11.4079 6.04025 11.9092 5.99994 12.3678V14.5029L8.06392 14.5048ZM14.2168 3.53128L16.9708 6.28551L17.8647 5.39162C17.9513 5.30502 18 5.18756 18 5.06508C18 4.9426 17.9513 4.82514 17.8647 4.73854L15.7611 2.63486C15.6754 2.54855 15.5589 2.5 15.4373 2.5C15.3157 2.5 15.1992 2.54855 15.1135 2.63486L14.2168 3.53128Z"
                    fill="#35BA83"
                  />
                </svg>

                <span class="ml-2 text-green-600">Edit</span>
              </div>

              <div
                @click="toggleProductDetailsView"
                class="flex items-center cursor-pointer"
              >
                <svg
                  width="20"
                  class=""
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28584 9.63508C1.89084 10.1517 1.89084 10.8492 2.28584 11.3651C3.53001 12.9892 6.51501 16.3334 10 16.3334C13.485 16.3334 16.47 12.9892 17.7142 11.3651C17.9064 11.1177 18.0107 10.8133 18.0107 10.5001C18.0107 10.1868 17.9064 9.88247 17.7142 9.63508C16.47 8.01091 13.485 4.66675 10 4.66675C6.51501 4.66675 3.53001 8.01091 2.28584 9.63508V9.63508Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 13C8.61929 13 7.5 11.8807 7.5 10.5C7.5 9.11929 8.61929 8 10 8C11.3807 8 12.5 9.11929 12.5 10.5C12.5 11.8807 11.3807 13 10 13Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ml-2 text-yellow-600">View</span>
              </div>
            </div>
          </div>
        </div>

        <div v-show="catalogueState.productDetail">
          <form data-vv-scope="productDetail">
            <section class="">
              <div class="mt-5 mb-5">
                <p class="font-semibold text-lg">Product Details</p>
              </div>

              <s-photo
                :defaultPhoto="image_dummy"
                :title="'Image'"
                :showUpload="editable"
                url="http://18.135.196.19:5001/document-management/upload/profile-photo"
                v-model="variant.image"
              >
              </s-photo>

              <div class="flex mt-5 mb-5">
                <div
                  :class="{ error: errors.has('productDetail.name') }"
                  class="w-1/3 mr-16"
                >
                  <div class="mb-5">
                    <label class="flex items-center" for="inline-full-name">
                      <span class="font-semibold mr-5">Name :</span>
                      <span class="text-danger">*Required</span>
                    </label>
                  </div>
                  <div class>
                    <input
                      @blur="autoGenerateSKU"
                      class="
                        py-2
                        px-2
                        border-1 border-gray-500
                        rounded-sm
                        w-full
                      "
                      placeholder="Item Name"
                      v-model="itemInfo.name"
                      v-validate="'required'"
                      name="name"
                      :disabled="itemDisableState"
                    />
                    <div
                      class="error text-cloudenly-danger-main mt-2"
                      v-if="errors.has('productDetail.name')"
                    >
                      {{ errors.first("productDetail.name") }}
                    </div>
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
                          <span class="font-semibold">Brand :</span>
                        </label>
                      </div>
                      <!-- <div>
                        <span
                          @click="modalBrand = true"
                          class="text-cloudenly-primary-main cursor-pointer"
                          >Create new brand</span
                        >
                      </div> -->
                    </div>

                    <div class>
                      <select
                        v-model="itemInfo.brandId"
                        class="
                          py-2
                          border border-1 border-gray-500
                          rounded-sm
                          w-full
                        "
                        name="brand"
                        v-validate="'required'"
                        id
                        :disabled="itemDisableState"
                      >
                        <option
                          v-for="(brand, index) in getallBrand"
                          :key="index"
                          :value="brand.id"
                        >
                          {{ brand.name }}
                        </option>
                      </select>

                      <div
                        class="error text-cloudenly-danger-main mt-2"
                        v-if="errors.has('productDetail.brand')"
                      >
                        {{ errors.first("productDetail.brand") }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  :class="{ error: errors.has('productDetail.category') }"
                  class="w-1/3"
                >
                  <div class="mb-5 flex items-center justify-between">
                    <div class>
                      <label class="block" for="inline-full-name">
                        <span class="font-semibold">Category:</span>
                      </label>
                    </div>

                    <!-- <div>
                      <span
                        @click="modalCategory = true"
                        class="text-cloudenly-primary-main cursor-pointer"
                        >Create new category</span
                      >
                    </div> -->
                  </div>

                  <div class>
                    <select
                      v-model="itemInfo.categoryId"
                      class="
                        py-2
                        border border-1 border-gray-500
                        rounded
                        w-full
                      "
                      name="category"
                      v-validate="'required'"
                      id
                      :disabled="itemDisableState"
                    >
                      <option
                        v-for="(category, index) in getallItemCategory"
                        :key="index"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <div
                      class="error text-cloudenly-danger-main mt-2"
                      v-if="errors.has('productDetail.category')"
                    >
                      {{ errors.first("productDetail.category") }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex mt-10 mb-5">
                <div
                  :class="{ error: errors.has('productDetail.part number') }"
                  class="w-1/3 mr-16"
                >
                  <div class="mb-5">
                    <label class="flex items-center" for="inline-full-name">
                      <span class="font-semibold mr-5">Part Number :</span>
                    </label>
                  </div>
                  <div class>
                    <input
                      class="
                        py-2
                        px-2
                        rounded-sm
                        border-1 border-gray-500
                        w-full
                      "
                      placeholder="Manufacturer part no."
                      v-model="variant.manufacturerPartNumber"
                      name="part number"
                      :disabled="itemDisableState"
                    />
                  </div>
                </div>

                <div
                  :class="{ error: errors.has('productDetail.sku') }"
                  class="w-1/3 mr-16"
                >
                  <div class>
                    <div class="mb-5 flex items-center justify-between">
                      <div>
                        <label class="Block" for="inline-full-name">
                          <span class="font-semibold">SKU:</span>
                        </label>
                      </div>
                      <div>
                        <!-- <span
                      v-show="!getIsSkuSetup"
                      @click="skuSetupDrawer = true"
                      class="text-cloudenly-primary-main cursor-pointer"
                      >Set up SKU</span> -->
                      </div>
                    </div>

                    <div class>
                      <input
                        class="
                          py-2
                          px-2
                          rounded-sm
                          border-1 border-gray-500
                          w-full
                        "
                        placeholder
                        v-model="itemInfo.sku"
                        name="sku"
                        v-validate="'required'"
                        @blur="autoGenerateSKU"
                        :disabled="itemDisableState"
                      />

                      <div
                        class="error text-cloudenly-danger-main"
                        v-if="errors.has('productDetail.sku')"
                      >
                        {{ errors.first("productDetail.sku") }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  :class="{ error: errors.has('productDetail.Barcode') }"
                  class="w-1/3"
                >
                  <div class="mb-5">
                    <label class="block" for="inline-full-name">
                      <span class="font-semibold">Bar Code:</span>
                    </label>
                  </div>

                  <div class>
                    <input
                      class="
                        py-2
                        px-2
                        rounded-sm
                        border-1 border-gray-500
                        w-full
                      "
                      placeholder
                      v-model="itemInfo.barcode"
                      name="Barcode"
                      :disabled="itemDisableState"
                    />
                  </div>
                </div>
              </div>

              <div class="flex w-full mt-10 mb-5">
                <div
                  :class="{ error: errors.has('productDetail.Description') }"
                  class=""
                >
                  <div class="mb-5">
                    <label class="flex items-center" for="inline-full-name">
                      <span class="font-semibold mr-5">Description :</span>
                    </label>
                  </div>
                  <div class="w-full">
                    <textarea
                      rows="5"
                      cols="180"
                      @blur="autoGenerateSKU"
                      class="
                        py-3
                        px-3
                        w-full
                        rounded-sm
                        border-1 border-gray-500
                      "
                      placeholder="-- Enter Product Description --"
                      v-model="itemInfo.description"
                      v-validate="'required'"
                      :disabled="itemDisableState"
                    />
                    <div
                      class="error text-cloudenly-danger-main mt-2 w-full"
                      v-if="errors.has('productDetail.Description')"
                    >
                      {{ errors.first("productDetail.Description") }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>

          <!-- End Product Details Section -->
          <hr class="mt-8 bg-gray-400 text-gray-400" />

          <!-- Variant Information Section -->
          <section class="py-8 bg-white rounded">
            <div class="mt-5 flex items-center justify-between">
              <div>
                <p class="font-semibold text-lg mb-1 mr-5">
                  Variant Information
                  <span class="font-light text-danger">*Required</span>
                </p>
              </div>

              <div>
                <div class="flex items-center">
                  <button
                    class="mr-8 flex items-center text-primary-optima-color"
                  >
                    <span class="mr-3">
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM9.00086 16.8646C13.0677 16.8646 16.3645 13.5678 16.3645 9.50095C16.3645 5.43413 13.0677 2.13732 9.00086 2.13732C4.93403 2.13732 1.63722 5.43413 1.63722 9.50095C1.63722 13.5678 4.93403 16.8646 9.00086 16.8646ZM13.09 8.68077H9.81727V5.40805H8.1809V8.68077H4.90817V10.3171H8.1809V13.5899H9.81727V10.3171H13.09V8.68077Z"
                          fill="#1034A6"
                        />
                      </svg>
                    </span>
                    Add another variant
                  </button>
                  <button
                    @click="setupModal = true"
                    class="flex items-center text-primary-optima-color"
                  >
                    <span class="mr-3">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.125 1.75V4.25L6.875 4.875L5 3L2.5 5.5L4.375 7.375L3.75 8.625H1.25V12.375H3.75L4.375 13.625L2.5 15.5L5 18L6.875 16.125L8.125 16.75V19.25H11.875V16.75L13.125 16.125L15 18L17.5 15.5L15.625 13.625L16.25 12.375H18.75V8.625H16.25L15.625 7.375L17.5 5.5L15 3L13.125 4.875L11.875 4.25V1.75H8.125Z"
                          stroke="#1034A6"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 13C11.3807 13 12.5 11.8807 12.5 10.5C12.5 9.11929 11.3807 8 10 8C8.61929 8 7.5 9.11929 7.5 10.5C7.5 11.8807 8.61929 13 10 13Z"
                          stroke="#1034A6"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    Setup
                  </button>
                </div>
              </div>
            </div>
            <!-- Item characteristics modal -->

            <div class="mt-8">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th class="px-0">Variant Characteristic:</th>
                    <th class="px-0">Variant Value:</th>
                    <!-- <th></th> -->
                  </tr>
                </thead>

                <tbody class="mt-5">
                  <tr v-for="(xter, index) in variantValue" :key="index">
                    <td
                      :class="{ error: errors.has('productDetail.key') }"
                      class="w-1/2 pr-8"
                    >
                      <select
                        @change="getVariantValueKey"
                        v-model="xter.key"
                        class="
                          py-2
                          border border-1
                          rounded-sm
                          border-gray-500
                          w-full
                        "
                        v-validate="'required'"
                        name="key"
                        id
                        :disabled="itemDisableState"
                      >
                        <option
                          v-for="(v, i) in getVariantCharacteristics"
                          :key="i"
                          :value="v"
                        >
                          {{ v }}
                        </option>
                      </select>
                      <div
                        class="error text-cloudenly-danger-main mt-2"
                        v-if="errors.has('productDetail.key')"
                      >
                        {{ errors.first("productDetail.key") }}
                      </div>
                    </td>

                    <td
                      :class="{ error: errors.has('productDetail.value') }"
                      class="w-1/2 pr-8"
                    >
                      <select
                        @change="autogenerateVariantCode"
                        v-model="xter.value"
                        class="
                          py-2
                          px-2
                          border border-1 border-gray-500
                          rounded-sm
                          w-full
                        "
                        v-validate="'required'"
                        name="value"
                        id
                        :disabled="itemDisableState"
                      >
                        <option
                          v-for="(v, i) in itemCharacteristicsValue"
                          :key="i"
                          :value="v.value"
                        >
                          {{ v.value }}
                        </option>
                      </select>

                      <div
                        class="error text-cloudenly-danger-main mt-2"
                        v-if="errors.has('productDetail.value')"
                      >
                        {{ errors.first("productDetail.value") }}
                      </div>
                    </td>

                    <!-- <td>
                      <button
                        class="
                          px-10
                          py-3
                          bg-primary-optima-color
                          text-white
                          rounded-full
                        "
                      >
                        Apply
                      </button>
                    </td> -->
                  </tr>
                </tbody>
              </table>

              <!-- <hr class="mt-5" /> -->
            </div>
          </section>

          <!-- Variant sync Section -->
          <section class="py-8 bg-white rounded">
            <div class="mt-5">
              <p class="font-semibold text-lg mb-1">
                Item Catalogue Synchronization
              </p>
              <p class="text-danger text-sm">*Sync Item section</p>
            </div>

            <div class="mt-8 flex items-center">
              <div class="mr-10">
                <p class="text-cloudenly-primary-main">This item is:</p>
              </div>

              <div class="mr-10">
                <vs-checkbox v-model="variant.syncWithPurchaseCatalogue"
                  >Purchase Catalogue</vs-checkbox
                >
              </div>

              <div class="mr-10">
                <vs-checkbox v-model="variant.syncWithSaleCatalogue"
                  >Sale Catalogue</vs-checkbox
                >
              </div>

              <div>
                <vs-checkbox v-model="variant.syncWithInventory"
                  >Inventory Catalogue</vs-checkbox
                >
              </div>
            </div>
          </section>
          <!-- End variant sync section -->

          <!-- Section for Unit of Measure -->
          <section class="py-8 bg-white rounded">
            <p class="text-danger text-sm">
              *Please ensure you input all Unit of Measure, Purchase, Sales and
              Inventory information before you click the save button
            </p>

            <div class="mt-8">
              <p class="font-semibold text-lg mb-1">Unit of Measure (UoM)</p>
            </div>

            <div class="mt-8">
              <div>
                <table class="w-full">
                  <thead>
                    <tr>
                      <th class="py-3 font-medium"></th>
                      <th class="py-3 px-5 font-medium">
                        Unit Of Measurement <span class="text-danger">*</span>
                      </th>
                      <th class="py-3 px-5 font-medium">
                        Quantity <span class="text-danger-optima-color">*</span>
                      </th>
                      <th class="py-3 px-5 font-medium"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="py-3">Stock/Inventory Unit</td>

                      <td
                        :class="{
                          error: errors.has('productDetail.standardUom'),
                        }"
                        class="py-3 px-5"
                      >
                        <select
                          v-model="unitsOfMeasure.standardUom"
                          class="
                            py-2
                            px-2
                            border border-1 border-gray-500
                            w-full
                            rounded-sm
                          "
                          v-validate="'required'"
                          name="standardUom"
                          id
                          :disabled="itemDisableState"
                        >
                          <option
                            v-for="(unit, index) in unitOFMeasurementData"
                            :key="index"
                            :value="unit.value"
                          >
                            {{ unit.name }}
                          </option>
                        </select>

                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="errors.has('productDetail.standardUom')"
                        >
                          <!-- {{ errors.first("standardUom") }} -->
                          Required Field
                        </div>
                      </td>

                      <td
                        :class="{
                          error: errors.has('productDetail.UnitConversion'),
                        }"
                        class="py-3 px-5"
                      >
                        <input
                          v-model="unitsOfMeasure.standardUomConversionFactor"
                          class="
                            py-2
                            px-2
                            rounded-sm
                            border-1 border-gray-500
                            w-full
                          "
                          type="number"
                          name="UnitConversion"
                          v-validate="'required'"
                          :disabled="itemDisableState"
                        />
                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="errors.has('productDetail.UnitConversion')"
                        >
                          <!-- {{ errors.first("productDetail.UnitConversion") }} -->
                          Required Field
                        </div>
                      </td>

                      <td>
                        <p
                          class="
                            mt-1
                            font-light
                            text-cloudenly-danger-main text-sm
                          "
                        >
                          What quantity of this item do you have in one SKU?
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td class="py-3">Purchase Unit</td>

                      <td
                        :class="{
                          error: errors.has('productDetail.unitPurchase'),
                        }"
                        class="py-3 px-5"
                      >
                        <select
                          v-model="unitsOfMeasure.unitOfPurchase"
                          class="
                            py-2
                            px-2
                            border border-1 border-gray-500
                            w-full
                            rounded-sm
                          "
                          name="unitPurchase"
                          v-validate="'required'"
                          id
                          :disabled="itemDisableState"
                        >
                          <option
                            v-for="(unit, index) in unitOFMeasurementData"
                            :key="index"
                            :value="unit.value"
                          >
                            {{ unit.name }}
                          </option>
                        </select>

                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="errors.has('productDetail.unitPurchase')"
                        >
                          Required Field
                        </div>
                      </td>

                      <td
                        :class="{
                          error: errors.has(
                            'productDetail.unitOfPurchaseConversionFactor'
                          ),
                        }"
                        class="py-3 px-5"
                      >
                        <input
                          v-model="
                            unitsOfMeasure.unitOfPurchaseConversionFactor
                          "
                          class="
                            py-2
                            px-2
                            rounded-sm
                            border-1 border-gray-500
                            w-full
                          "
                          type="number"
                          name="unitOfPurchaseConversionFactor"
                          v-validate="'required'"
                          :disabled="itemDisableState"
                        />
                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="
                            errors.has(
                              'productDetail.unitOfPurchaseConversionFactor'
                            )
                          "
                        >
                          Required Field
                        </div>
                      </td>

                      <td>
                        <p
                          class="
                            mt-1
                            font-light
                            text-cloudenly-danger-main text-sm
                          "
                        >
                          What quantity of this item do you have in this unit?
                        </p>
                      </td>
                    </tr>

                    <tr
                      v-for="(salesUnit, index) in unitsOfMeasure.unitOfSale"
                      :key="index"
                    >
                      <td class="py-3">Sales Unit</td>

                      <td
                        :class="{
                          error: errors.has('productDetail.unitOfSale'),
                        }"
                        class="py-3 px-5"
                      >
                        <select
                          v-model="salesUnit.unitOfSale"
                          class="
                            py-2
                            px-2
                            border border-1 border-gray-500
                            rounded-sm
                            w-full
                          "
                          name="unitSales"
                          v-validate="'required'"
                          id
                          :disabled="itemDisableState"
                        >
                          <option
                            v-for="(unit, index) in unitOFMeasurementData"
                            :key="index"
                            :value="unit.value"
                          >
                            {{ unit.name }}
                          </option>
                        </select>

                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="errors.has('productDetail.unitSales')"
                        >
                          <!-- {{ errors.first("Unit conversion") }} -->
                          Required Field
                        </div>
                      </td>

                      <td
                        :class="{
                          error: errors.has('productDetail.conversionFactor'),
                        }"
                        class="py-3 px-5"
                      >
                        <input
                          v-model="salesUnit.conversionFactor"
                          class="
                            py-2
                            px-2
                            border border-1 border-gray-500
                            rounded
                            w-full
                          "
                          type="number"
                          v-validate="'required'"
                          name="conversionFactor"
                          :disabled="itemDisableState"
                        />
                        <div
                          class="error text-cloudenly-danger-main mt-2"
                          v-if="errors.has('productDetail.conversionFactor')"
                        >
                          <!-- {{ errors.first("Unit conversion") }} -->
                          Required Field
                        </div>
                      </td>

                      <td>
                        <span v-if="index === 0"
                          ><p
                            class="
                              mt-1
                              font-light
                              text-cloudenly-danger-main text-sm
                            "
                          >
                            What quantity of this item do you have in this unit?
                          </p>
                        </span>
                        <span v-else>
                          <feather-icon
                            icon="TrashIcon"
                            @click="deleteSalesInfoUnitOfMeasure(index)"
                            class="
                              p-2
                              cursor-pointer
                              text-cloudenly-danger-main
                              w-8
                              h-8
                              inline-flex
                            "
                          ></feather-icon>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Save  & update item Section -->

          <!-- <div class="py-8 bg-white">
            <div v-if="isItemDetailCreated" class="flex justify-end mt-8">
              <button
                @click="updateItemInfoVariant"
                type="button"
                :class="{
                  'cursor-not-allowed': updateItemInfoButton,
                  'text-cloudenly-primary-mid': updateItemInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg
                  mr-8
                  text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Update & Exit</span>
              </button>

              <button
                @click="toggleUpdateNext('purchaseState')"
                type="button"
                :class="{
                  'cursor-not-allowed': updateItemInfoButton,
                  'text-cloudenly-primary-mid': updateItemInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>update & Next </span>
              </button>
            </div>

            <div v-else class="flex justify-end mt-8">
              <button
                @click="saveItemInfoVariant('productDetail')"
                type="button"
                :class="{
                  'cursor-not-allowed': saveItemInfoButton,
                  'text-cloudenly-primary-mid': saveItemInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg
                  mr-8
                  text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Save & Exit</span>
              </button>

              <button
                @click="toggleNext('productDetail')"
                type="button"
                :class="{
                  'cursor-not-allowed': saveItemInfoButton,
                  'text-cloudenly-primary-mid': saveItemInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Next</span>
              </button>
            </div>
          </div> -->
          <!-- End save & update item info Section -->
        </div>
      </div>
      <!-- End Product Details -->

      <!-- Cost management section -->
      <section
        class="
          py-5
          px-10
          bg-white
          rounded
          border-2 border-l-0 border-r-0 border-b-0 border-gray-500
        "
      >
        <div
          v-if="!catalogueState.purchaseInfo"
          class="mt-8 flex items-center justify-between"
        >
          <div>
            <div class="flex items-center">
              <p class="font-semibold text-lg">Cost Information</p>
              <div class="bg-gray-200 py-1 px-8 flex items-center ml-8 rounded">
                <svg
                  class=""
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 16.5C8 21.1944 11.8056 25 16.5 25C21.1944 25 25 21.1944 25 16.5C25 11.8056 21.1944 8 16.5 8C11.8056 8 8 11.8056 8 16.5ZM23.453 16.4998C23.453 20.3407 20.3394 23.4543 16.4985 23.4543C12.6576 23.4543 9.54395 20.3407 9.54395 16.4998C9.54395 12.6589 12.6576 9.54524 16.4985 9.54524C20.3394 9.54524 23.453 12.6589 23.453 16.4998ZM16.5041 21.1363C17.0259 21.1363 17.4488 20.7135 17.4488 20.1919C17.4488 19.6703 17.0259 19.2475 16.5041 19.2475C15.9823 19.2475 15.5593 19.6703 15.5593 20.1919C15.5593 20.7135 15.9823 21.1363 16.5041 21.1363ZM17.4531 12.6364H15.5636V18.303H17.4531V12.6364Z"
                    fill="#070707"
                  />
                </svg>
                <span>
                  You must complete Unit of Measure(UoM) to update the Cost
                  Information
                </span>
              </div>
            </div>
          </div>

          <div>
            <div
              v-show="catalogueEditState.costManageState"
              class="flex items-center"
            >
              <div
                @click="togglePurchaseInfoEdit"
                class="flex items-center cursor-pointer mr-8"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9999 18.5V11.5H17.9999V18.5H1.99994V2.5H8.99994V0.5H1.99994C0.895369 0.5 -6.10352e-05 1.39543 -6.10352e-05 2.5V18.5C-6.10352e-05 19.6046 0.895369 20.5 1.99994 20.5H17.9999C19.1045 20.5 19.9999 19.6046 19.9999 18.5ZM17.178 1.22342C16.7197 0.76142 16.092 0.5 15.4373 0.5C14.7833 0.5 14.1563 0.76083 13.6953 1.22463L5.32644 9.59342C4.57861 10.2523 4.08838 11.2328 4.00319 12.2873L3.99994 15.5023V16.5023H8.13454C9.26884 16.4245 10.259 15.9295 10.9574 15.1238L19.2789 6.80584C19.7406 6.34416 20 5.71799 20 5.06508C20 4.41217 19.7406 3.786 19.2789 3.32432L17.178 1.22342ZM8.06392 14.5048C8.59815 14.467 9.09543 14.2184 9.49473 13.7616L15.5566 7.69972L12.8024 4.94527L6.69604 11.0496C6.29089 11.4079 6.04025 11.9092 5.99994 12.3678V14.5029L8.06392 14.5048ZM14.2168 3.53128L16.9708 6.28551L17.8647 5.39162C17.9513 5.30502 18 5.18756 18 5.06508C18 4.9426 17.9513 4.82514 17.8647 4.73854L15.7611 2.63486C15.6754 2.54855 15.5589 2.5 15.4373 2.5C15.3157 2.5 15.1992 2.54855 15.1135 2.63486L14.2168 3.53128Z"
                    fill="#35BA83"
                  />
                </svg>

                <span class="ml-2 text-green-600">Edit</span>
              </div>

              <div
                @click="togglePurchaseInfoView"
                class="flex items-center cursor-pointer"
              >
                <svg
                  width="20"
                  class=""
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28584 9.63508C1.89084 10.1517 1.89084 10.8492 2.28584 11.3651C3.53001 12.9892 6.51501 16.3334 10 16.3334C13.485 16.3334 16.47 12.9892 17.7142 11.3651C17.9064 11.1177 18.0107 10.8133 18.0107 10.5001C18.0107 10.1868 17.9064 9.88247 17.7142 9.63508C16.47 8.01091 13.485 4.66675 10 4.66675C6.51501 4.66675 3.53001 8.01091 2.28584 9.63508V9.63508Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 13C8.61929 13 7.5 11.8807 7.5 10.5C7.5 9.11929 8.61929 8 10 8C11.3807 8 12.5 9.11929 12.5 10.5C12.5 11.8807 11.3807 13 10 13Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ml-2 text-yellow-600">View</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-show="catalogueState.purchaseInfo"> -->
          <div>
          <div class="mt-5 flex items-center justify-between">
            <div>
              <p class="font-semibold text-lg">Cost Information</p>
            </div>

            <!-- <div class="flex items-center">
              <div class="mr-5">
                <button
                  type="button"
                  @click="addVariantSuppliers"
                  class="
                    text-cloudenly-primary-main
                    inline-flex
                    items-center
                    cursor-pointer
                  "
                >
                  <span class>
                    <feather-icon
                      icon="PlusCircleIcon"
                      svgClasses="h-5 w-5 mr-1"
                    ></feather-icon>
                  </span>
                  Add Another Cost
                </button>
              </div>

              <div>
                <button
                  @click="supplierModal = true"
                  class="
                    cursor-pointer
                    inline-flex
                    items-center
                    mr-1
                    text-cloudenly-primary-main
                  "
                >
                  <span class>
                    <feather-icon
                      icon="PlusCircleIcon"
                      svgClasses="h-5 w-5 mr-1"
                    ></feather-icon>
                  </span>
                  Create New Supplier
                </button>
              </div>
            </div> -->
          </div>

          <div class="flex items-center justify-between mt-5">
            <div class="flex items-center">
              <p>How do you want to sell this product?</p>
              <div class="ml-8 flex items-center">
                <label class="mr-8 flex items-center">
                  <input
                    class="mr-3"
                    type="radio"
                    value="purchaseToSell"
                    v-model="variant.itemType"
                  />
                  Purchase to Sell
                </label>

                <label class="flex items-center">
                  <input
                    class="mr-3"
                    type="radio"
                    value="produceToSell"
                    v-model="variant.itemType"
                  />
                  Produce to Sell
                </label>
              </div>
            </div>
          </div>

          <table class="table min-w-full mt-10">
            <thead>
              <tr>
                <th class="py-4 px-3 tracking-wider font-semibold">Default</th>
                <th
                  v-if="variant.itemType === 'purchaseToSell'"
                  class="py-4 px-3 tracking-wider font-semibold"
                >
                  Supplier
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">UofM</th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  Unit Cost (₦)
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">Quantity</th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  SKU Cost (NGN)
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  % Quantity
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  Weighted Av. SKU Cost (NGN)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(supplier, index) in variantSuppliers" :key="index">
                <td class="py-2 px-2 text-center">
                  <input
                    class="
                      leading-tight
                      w-5
                      bg-cloudenly-primary-main
                      text-cloudenly-primary-main
                    "
                    type="radio"
                    v-model="supplier.default"
                    :value="true"
                    name="supplierSelected"
                    :disabled="costManageDisableState"
                  />
                </td>

                <td
                  v-if="variant.itemType === 'purchaseToSell'"
                  class="py-2 px-2"
                >
                  <select
                    v-model="supplier.supplierId"
                    name
                    class="w-full rounded border-1 border-gray-400 py-2"
                    id
                    :disabled="costManageDisableState"
                  >
                    <option
                      v-for="(supplier, index) in getSupplierContact"
                      :key="index"
                      :value="supplier.id"
                    >
                      {{ supplier.name }}
                    </option>
                  </select>
                </td>

                <td class="py-2 px-2">
                  <select
                    v-if="index === 0"
                    @change="assignPurchaseUnit"
                    v-model="supplier.unitOfPurchase"
                    name
                    class="w-full rounded border-1 border-gray-400 py-2"
                    id
                    :disabled="costManageDisableState"
                  >
                    <option
                      v-for="(unit, index) in unitOFMeasurementData"
                      :key="index"
                      :value="unit.value"
                    >
                      {{ unit.name }}
                    </option>
                  </select>

                  <select
                    v-else
                    v-model="supplier.unitOfPurchase"
                    name
                    disabled
                    class="w-full rounded border-1 border-gray-400 py-2"
                    id
                  >
                    <option
                      v-for="(unit, index) in unitOFMeasurementData"
                      :key="index"
                      :value="unit.value"
                    >
                      {{ unit.name }}
                    </option>
                  </select>
                </td>

                <td class="py-2 px-2">
                  <input
                    pattern="[0-9]*"
                    v-model="supplier.pricePerUnit"
                    @keyup="calculateWeightedPurchaseAverage"
                    @blur="calculateWeightedPurchaseAverage"
                    type="text"
                    class="w-full rounded border-1 border-gray-400 py-2 px-2"
                    name
                    id
                    :disabled="costManageDisableState"
                  />
                </td>

                <td class="py-2 px-2">
                  <input
                    @keyup="calculateWeightedPurchaseAverage"
                    @blur="calculateWeightedPurchaseAverage"
                    class="w-full rounded border-1 border-gray-400 py-2 px-2"
                    type="text"
                    v-model="supplier.quantityPerUnit"
                    :disabled="costManageDisableState"
                  />
                </td>

                <td class="py-2 px-2">
                  <input
                    pattern="[0-9]*"
                    v-model="supplier.skuPrice"
                    disabled
                    readonly
                    type="number"
                    class="w-full rounded border-1 border-gray-400 py-2 px-2"
                    name
                    id
                  />
                </td>

                <td class="py-2 px-2">
                  <div class="flex items-center">
                    <input
                      readonly
                      disabled
                      v-model="supplier.percentageSupplied"
                      class="
                        w-full
                        border border-1 border-gray-400
                        py-2
                        px-2
                        rounded
                      "
                      type="text"
                    />
                  </div>
                </td>

                <td class="py-2 px-2">
                  <div class="flex items-center">
                    <input
                      v-model="supplier.weightedPurchasePrice"
                      readonly
                      disabled
                      class="
                        w-full
                        border border-1 border-gray-400
                        py-2
                        px-2
                        rounded
                      "
                      type="text"
                    />
                  </div>
                </td>

                <td class="py-2 px-2">
                  <span v-if="index === 0"></span>
                  <feather-icon
                    v-else
                    icon="TrashIcon"
                    @click="deleteVariantSuppliers(index)"
                    class="
                      p-2
                      cursor-pointer
                      text-cloudenly-danger-main
                      w-8
                      h-8
                      inline-flex
                    "
                  ></feather-icon>
                </td>
              </tr>

              <tr>
                <td class="py-2 px-2 text-center"></td>

                <td class="py-2 px-2"></td>

                <td class="py-2 px-2"></td>

                <td class="py-2 px-2"></td>

                <td class="py-2 px-2 text-center">
                  {{ calTotalSuppliedQuantity }}
                </td>

                <td class="py-2 px-2"></td>

                <td class="py-2 px-2 text-center">
                  {{ calTotalSuppliedPercentage }}
                </td>

                <td class="py-2 px-2 text-center">
                  {{ calTotalSupplierWeightedAvgSkuPrice }}
                </td>

                <td class="py-2 px-2"></td>
              </tr>
            </tbody>
          </table>

          <!-- <div class="py-8 bg-white">
            <div
              v-if="isCostManagementCreated"
              class="flex items-center justify-end mt-5 mb-5"
            >
              <button
                @click="updateSupplierVariantInfo"
                type="button"
                :class="{
                  'cursor-not-allowed': updatePurchaseInfoButton,
                  'text-cloudenly-primary-mid': updatePurchaseInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg
                  mr-8
                  text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Update & Exit</span>
              </button>

              <button
                @click="toggleUpdateNext('saleState')"
                type="button"
                :class="{
                  'cursor-not-allowed': updatePurchaseInfoButton,
                  'text-cloudenly-primary-mid': updatePurchaseInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Update and Continue</span>
              </button>
            </div>

            <div v-else class="flex items-center justify-end mt-5 mb-5">
              <button
                :class="{
                  'cursor-not-allowed': savePurchaseInfoButton,
                  'text-cloudenly-primary-mid': savePurchaseInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg
                  mr-8
                  text-cloudenly-primary-main
                  font-normal
                "
                @click="saveSupplierVariantInfo"
                type="button"
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Save & Exit</span>
              </button>

              <button
                @click="toggleNext('saleState')"
                type="button"
                :class="{
                  'cursor-not-allowed': savePurchaseInfoButton,
                  'text-cloudenly-primary-mid': savePurchaseInfoButton,
                }"
                class="
                  inline-flex
                  items-center
                  text-lg text-cloudenly-primary-main
                  font-normal
                "
              >
                <span>
                  <svg
                    class="fill-current mr-2"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                      fill=""
                    />
                  </svg>
                </span>
                <span>Next</span>
              </button>
            </div>
          </div> -->
        </div>
      </section>
      <!-- End cost management Section -->

      <!-- sales information section -->
      <section
        class="
          py-8
          px-10
          bg-white
          rounded
          border-2 border-l-0 border-r-0 border-b-0 border-gray-500
        "
      >
        <div
          v-if="!catalogueState.saleInfo"
          class="mt-8 flex items-center justify-between"
        >
          <div>
            <div class="flex items-center">
              <p class="font-semibold text-lg">Sales Information</p>
              <div>
                <svg
                  class="ml-6"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 16.5C8 21.1944 11.8056 25 16.5 25C21.1944 25 25 21.1944 25 16.5C25 11.8056 21.1944 8 16.5 8C11.8056 8 8 11.8056 8 16.5ZM23.453 16.4998C23.453 20.3407 20.3394 23.4543 16.4985 23.4543C12.6576 23.4543 9.54395 20.3407 9.54395 16.4998C9.54395 12.6589 12.6576 9.54524 16.4985 9.54524C20.3394 9.54524 23.453 12.6589 23.453 16.4998ZM16.5041 21.1363C17.0259 21.1363 17.4488 20.7135 17.4488 20.1919C17.4488 19.6703 17.0259 19.2475 16.5041 19.2475C15.9823 19.2475 15.5593 19.6703 15.5593 20.1919C15.5593 20.7135 15.9823 21.1363 16.5041 21.1363ZM17.4531 12.6364H15.5636V18.303H17.4531V12.6364Z"
                    fill="#070707"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div
              v-show="catalogueEditState.salesEditState"
              class="flex items-center"
            >
              <div
                @click="toggleSalesInfoEdit"
                class="flex items-center cursor-pointer mr-8"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9999 18.5V11.5H17.9999V18.5H1.99994V2.5H8.99994V0.5H1.99994C0.895369 0.5 -6.10352e-05 1.39543 -6.10352e-05 2.5V18.5C-6.10352e-05 19.6046 0.895369 20.5 1.99994 20.5H17.9999C19.1045 20.5 19.9999 19.6046 19.9999 18.5ZM17.178 1.22342C16.7197 0.76142 16.092 0.5 15.4373 0.5C14.7833 0.5 14.1563 0.76083 13.6953 1.22463L5.32644 9.59342C4.57861 10.2523 4.08838 11.2328 4.00319 12.2873L3.99994 15.5023V16.5023H8.13454C9.26884 16.4245 10.259 15.9295 10.9574 15.1238L19.2789 6.80584C19.7406 6.34416 20 5.71799 20 5.06508C20 4.41217 19.7406 3.786 19.2789 3.32432L17.178 1.22342ZM8.06392 14.5048C8.59815 14.467 9.09543 14.2184 9.49473 13.7616L15.5566 7.69972L12.8024 4.94527L6.69604 11.0496C6.29089 11.4079 6.04025 11.9092 5.99994 12.3678V14.5029L8.06392 14.5048ZM14.2168 3.53128L16.9708 6.28551L17.8647 5.39162C17.9513 5.30502 18 5.18756 18 5.06508C18 4.9426 17.9513 4.82514 17.8647 4.73854L15.7611 2.63486C15.6754 2.54855 15.5589 2.5 15.4373 2.5C15.3157 2.5 15.1992 2.54855 15.1135 2.63486L14.2168 3.53128Z"
                    fill="#35BA83"
                  />
                </svg>

                <span class="ml-2 text-green-600">Edit</span>
              </div>

              <div
                @click="toggleSalesInfoView"
                class="flex items-center cursor-pointer"
              >
                <svg
                  width="20"
                  class=""
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28584 9.63508C1.89084 10.1517 1.89084 10.8492 2.28584 11.3651C3.53001 12.9892 6.51501 16.3334 10 16.3334C13.485 16.3334 16.47 12.9892 17.7142 11.3651C17.9064 11.1177 18.0107 10.8133 18.0107 10.5001C18.0107 10.1868 17.9064 9.88247 17.7142 9.63508C16.47 8.01091 13.485 4.66675 10 4.66675C6.51501 4.66675 3.53001 8.01091 2.28584 9.63508V9.63508Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 13C8.61929 13 7.5 11.8807 7.5 10.5C7.5 9.11929 8.61929 8 10 8C11.3807 8 12.5 9.11929 12.5 10.5C12.5 11.8807 11.3807 13 10 13Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ml-2 text-yellow-600">View</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-show="catalogueState.saleInfo"> -->
          <div>
          <div class="mt-8 flex items-center justify-between">
            <div>
              <div class="flex items-center">
                <p class="font-semibold text-lg">Sales Information</p>
              </div>
            </div>

            <div>
              <div class="flex items-center">
                <!-- <div class="">
                  <span
                    @click="retailModal = true"
                    class="cursor-pointer text-cloudenly-primary-main mt-3"
                    >Setup discount limit & maximum markup
                  </span>
                </div> -->
              </div>
            </div>
          </div>

          <section class="mt-5 w-full">
            <div class>
              <vs-tabs alignment>
                <vs-tab label="Retail">
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
                            >Discount Limit (%)</label
                          >
                        </div>

                        <div class="flex items-center">
                          <input
                            @blur="calculateRetailSaleInfo"
                            @keyup="calculateRetailSaleInfo"
                            disabled
                            v-model="variant.retailDiscountLimit"
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

                      <div class="mr-16">
                        <div class="mb-5">
                          <label class="block pr-3" for="inline-full-name"
                            >Maximum Sales Mark-up</label
                          >
                        </div>

                        <div class="flex items-center">
                          <input
                            @blur="calculateRetailSaleInfo"
                            disabled
                            v-model="variant.retailMaximumSalesMarkup"
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

                      <div class="">
                        <div class="mb-5">
                          <label class="block pr-3" for="inline-full-name"
                            >Unit Cost Price Reference</label
                          >
                        </div>

                        <div>
                          <!-- <select
                            disable
                            readonly
                            v-model="variant.retailUsePurchasePriceReference"
                            @change="changeSaleRetailUnitPurchasePrice"
                            class="
                              py-1
                              px-2
                              rounded
                              border-2 border-gray-400
                              w-full
                            "
                            name
                            id
                          >
                            <option value="weightedAverage">
                              weighted Average price
                            </option>
                            <option value="defaultSupplier">
                              default supplier price
                            </option>
                          </select> -->

                          <div class="flex items-center">
                            <button
                              class="
                                py-2
                                px-4
                                border-r-0 border-1
                                font-bold
                                border-gray-400
                              "
                            >
                              NGN
                            </button>

                            <input
                              disabled
                              v-model="displayAveragePurchaseItem"
                              class="py-2 px-2 border-1 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>
                        <!-- <p class="mt-3">weighted Average price</p> -->
                      </div>

                      <!-- <div class="mt-5">
                        {{ displayAveragePurchaseItem | currency }}
                      </div> -->
                    </div>
                  </div>

                  <div class="mt-8">
                    <table class="table w-full">
                      <thead>
                        <tr>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th
                            class="py-3 px-3 font-semibold text-center w-1/5"
                          ></th>
                          <th
                            class="py-3 px-3 font-semibold text-center w-4/12"
                          ></th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-right
                            "
                          >
                            This is what your selling price will be when fully
                            discounted
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table class="table w-full">
                      <thead class>
                        <tr>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Default
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Unit of Sales
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Qty per Unit
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Unit Cost Price (N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Recommended Retail Price(N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales Margin(N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales Margin(%)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Retail Price (Fully Discounted)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales margin(N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales margin (%)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          class
                          v-for="(retail, index) in retailPriceBooks"
                          :key="index"
                        >
                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              class="
                                h-5
                                leading-tight
                                w-5
                                bg-cloudenly-primary-main
                                text-cloudenly-primary-main
                              "
                              type="radio"
                              v-model="retail.defaultPrice"
                              name="retail"
                              :value="true"
                              :disabled="salesDisableState"
                            />
                          </td>
                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.unitOfSale }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.quantityPerUnit }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              v-model="retail.unitPurchasePrice"
                              @keyup="calSaleRetailInfo(retail)"
                              class="
                                w-full
                                rounded
                                border-1 border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                              :disabled="salesDisableState"
                            />
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              @keyup="calSaleRetailInfo(retail)"
                              v-model="retail.recommendedRetailPrice"
                              class="
                                w-full
                                rounded
                                border-1 border-solid border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                              :disabled="salesDisableState"
                            />
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.saleMarginAmount }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.saleMarginPercentage }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.discountedRetailPrice }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.discountedSaleMarginAmount }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ retail.discountedSaleMarginPercentage }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </vs-tab>

                <vs-tab label="Wholesales">
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
                            >Discount Limit (%)</label
                          >
                        </div>

                        <div class="flex items-center">
                          <input
                            @blur="calculateWholesaleInfo"
                            @keyup="calculateWholesaleInfo"
                            disabled
                            v-model="variant.wholesaleDiscountLimit"
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

                      <div class="mr-16">
                        <div class="mb-5">
                          <label class="block pr-3" for="inline-full-name"
                            >Maximum Sales Mark-up</label
                          >
                        </div>

                        <div class="flex items-center">
                          <input
                            @blur="calculateWholesaleInfo"
                            disabled
                            v-model="variant.wholesaleMaximumSalesMarkup"
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

                      <div class="">
                        <div class="mb-5">
                          <label class="block pr-3" for="inline-full-name"
                            >Unit Cost Price Reference</label
                          >
                        </div>

                        <div>
                          <!-- <select
                            disable
                            readonly
                            v-model="variant.retailUsePurchasePriceReference"
                            @change="changeSaleRetailUnitPurchasePrice"
                            class="
                              py-1
                              px-2
                              rounded
                              border-2 border-gray-400
                              w-full
                            "
                            name
                            id
                          >
                            <option value="weightedAverage">
                              weighted Average price
                            </option>
                            <option value="defaultSupplier">
                              default supplier price
                            </option>
                          </select> -->

                          <div class="flex items-center">
                            <button
                              class="
                                py-2
                                px-4
                                border-r-0 border-1
                                font-bold
                                border-gray-400
                              "
                            >
                              NGN
                            </button>

                            <input
                              disabled
                              v-model="displayAveragePurchaseItemWholesale"
                              class="py-2 px-2 border-1 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>
                        <!-- <p class="mt-3">weighted Average price</p> -->
                      </div>

                      <!-- <div class="mt-5">
                        {{ displayAveragePurchaseItemWholesale | currency }}
                      </div> -->
                    </div>
                  </div>

                  <div class="mt-8">
                    <table class="table w-full">
                      <thead>
                        <tr>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th class="py-3 px-3 font-semibold text-center"></th>
                          <th
                            class="py-3 px-3 font-semibold text-center w-1/5"
                          ></th>
                          <th
                            class="py-3 px-3 font-semibold text-center w-4/12"
                          ></th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-right
                            "
                          >
                            This is what your selling price will be when fully
                            discounted
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table class="table w-full">
                      <thead class="bg-grey-lighter">
                        <tr>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Default
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Unit of Sales
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Qty per Unit
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Unit Purchase Price
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Recommended Wholesale Price
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales Margin(N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales Margin(%)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Wholesale Price (Fully Discounted)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales margin (N)
                          </th>
                          <th
                            class="
                              py-3
                              px-3
                              bg-gray-200
                              font-semibold
                              text-center
                            "
                          >
                            Sales margin(%)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          class
                          v-for="(wholesale, index) in wholesalePriceBooks"
                          :key="index"
                        >
                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              class="
                                h-5
                                leading-tight
                                w-5
                                bg-cloudenly-primary-main
                                text-cloudenly-primary-main
                              "
                              type="radio"
                              v-model="wholesale.defaultPrice"
                              name="wholesale"
                              :value="true"
                              :disabled="salesDisableState"
                            />
                          </td>
                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.unitOfSale }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.quantityPerUnit }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              readonly
                              disabled
                              v-model="wholesale.unitPurchasePrice"
                              @keyup="calSaleWholeSaleInfo(wholesale)"
                              class="
                                w-full
                                rounded
                                border-1 border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>
                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            <input
                              v-model="wholesale.recommendedWholesalePrice"
                              class="
                                w-full
                                rounded
                                border-1 border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.saleMarginAmount }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.saleMarginPercentage }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.discountedWholesalePrice }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.discountedSaleMarginAmount }}
                          </td>

                          <td
                            class="
                              py-3
                              px-3
                              border-1 border-gray-400
                              text-center
                            "
                          >
                            {{ wholesale.discountedSaleMarginPercentage }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </vs-tab>
              </vs-tabs>

              <vs-divider class></vs-divider>

              <div v-if="getIsOutletTaxSetup" class="p-3 mx-3 mb-3">
                <p class="font-normal text-xl text-cloudenly-primary-main">
                  Tax Treatment
                </p>
                <div>
                  <div class="mt-8 mb-3">
                    <select
                      @change="clearSelectedTax"
                      v-model="taxType"
                      :disabled="salesDisableState"
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
                    <table v-show="showTaxes" class="table w-auto">
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
                              :disabled="salesDisableState"
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

              <div
                v-else
                class="px-5 py-5 bg-cloudenly-danger-off shadow rounded"
              >
                <p class="text-xl">No tax found for this outlet</p>

                <div class="mt-3">
                  <button
                    type="button"
                    @click="taxDrawer = true"
                    class="
                      cursor-pointer
                      text-lg
                      border-none
                      text-cloudenly-primary-main
                    "
                  >
                    click here to setup
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- <div v-if="isSaleInfoCreated" class="flex justify-end mt-8">
            <button
              @click="createOrUpdateSaleInformation"
              type="button"
              :class="{
                'cursor-not-allowed': updateSalesInfoButton,
                'text-cloudenly-primary-mid': updateSalesInfoButton,
              }"
              class="
                inline-flex
                items-center
                text-lg
                mr-8
                text-cloudenly-primary-main
                font-normal
              "
            >
              <span>
                <svg
                  class="fill-current mr-2"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                    fill=""
                  />
                </svg>
              </span>
              <span>Update & Exit</span>
            </button>

            <button
              @click="toggleUpdateNext('inventoryState')"
              type="button"
              :class="{
                'cursor-not-allowed': updateSalesInfoButton,
                'text-cloudenly-primary-mid': updateSalesInfoButton,
              }"
              class="
                inline-flex
                items-center
                text-lg text-cloudenly-primary-main
                font-normal
              "
            >
              <span>
                <svg
                  class="fill-current mr-2"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                    fill=""
                  />
                </svg>
              </span>
              <span>Update and Continue</span>
            </button>
          </div>

          <div v-else class="flex justify-end mt-8">
            <button
              @click="saveSalesInfo"
              type="button"
              :class="{
                'cursor-not-allowed': saveSalesInfoButton,
                'text-cloudenly-primary-mid': saveSalesInfoButton,
              }"
              class="
                inline-flex
                items-center
                text-lg
                mr-8
                text-cloudenly-primary-main
                font-normal
              "
            >
              <span>
                <svg
                  class="fill-current mr-2"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6288 0C12.8258 0 13.0147 0.0782662 13.1541 0.217581C13.2934 0.356896 13.3716 0.545848 13.3716 0.742869V3.53383L11.8859 5.01956V1.48574H1.48574V13.3716H11.8859V11.3228L13.3716 9.83706V14.1145C13.3716 14.3115 13.2934 14.5005 13.1541 14.6398C13.0147 14.7791 12.8258 14.8574 12.6288 14.8574H0.742868C0.545847 14.8574 0.356896 14.7791 0.217581 14.6398C0.0782662 14.5005 0 14.3115 0 14.1145V0.742869C0 0.545848 0.0782662 0.356896 0.217581 0.217581C0.356896 0.0782662 0.545847 0 0.742868 0H12.6288ZM13.9496 5.05745L15 6.10787L9.22197 11.8859L8.17007 11.8844L8.17155 10.8355L13.9496 5.05745ZM7.42868 7.42869V8.91442H3.71434V7.42869H7.42868ZM9.65729 4.45721V5.94295H3.71434V4.45721H9.65729Z"
                    fill=""
                  />
                </svg>
              </span>
              <span>Save & Exit</span>
            </button>

            <button
              @click="toggleNext('inventoryState')"
              type="button"
              :class="{
                'cursor-not-allowed': saveSalesInfoButton,
                'text-cloudenly-primary-mid': saveSalesInfoButton,
              }"
              class="
                inline-flex
                items-center
                text-lg text-cloudenly-primary-main
                font-normal
              "
            >
              <span>
                <svg
                  class="fill-current mr-2"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.95474 12.042V0H7.5V12.042L12.3621 7.17997L13.4547 8.27263L6.72737 15L0 8.27263L1.09266 7.17997L5.95474 12.042Z"
                    fill=""
                  />
                </svg>
              </span>
              <span>Next</span>
            </button>
          </div> -->
        </div>
      </section>
      <!-- End Sale Section -->

      <!-- section for inventory -->
      <section
        class="
          py-8
          px-10
          bg-white
          rounded
          border-2 border-l-0 border-r-0 border-gray-500
        "
      >
        <div class="mt-8 flex items-center justify-between">
          <div class="flex items-center">
            <p class="font-semibold text-lg">Inventory Information</p>
            <div>
              <svg
                class="ml-6"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 16.5C8 21.1944 11.8056 25 16.5 25C21.1944 25 25 21.1944 25 16.5C25 11.8056 21.1944 8 16.5 8C11.8056 8 8 11.8056 8 16.5ZM23.453 16.4998C23.453 20.3407 20.3394 23.4543 16.4985 23.4543C12.6576 23.4543 9.54395 20.3407 9.54395 16.4998C9.54395 12.6589 12.6576 9.54524 16.4985 9.54524C20.3394 9.54524 23.453 12.6589 23.453 16.4998ZM16.5041 21.1363C17.0259 21.1363 17.4488 20.7135 17.4488 20.1919C17.4488 19.6703 17.0259 19.2475 16.5041 19.2475C15.9823 19.2475 15.5593 19.6703 15.5593 20.1919C15.5593 20.7135 15.9823 21.1363 16.5041 21.1363ZM17.4531 12.6364H15.5636V18.303H17.4531V12.6364Z"
                  fill="#070707"
                />
              </svg>
            </div>
          </div>

          <div>
            <div
              v-show="catalogueEditState.inventoryEditState"
              class="flex items-center"
            >
              <div class="flex items-center">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.9999 18.5V11.5H17.9999V18.5H1.99994V2.5H8.99994V0.5H1.99994C0.895369 0.5 -6.10352e-05 1.39543 -6.10352e-05 2.5V18.5C-6.10352e-05 19.6046 0.895369 20.5 1.99994 20.5H17.9999C19.1045 20.5 19.9999 19.6046 19.9999 18.5ZM17.178 1.22342C16.7197 0.76142 16.092 0.5 15.4373 0.5C14.7833 0.5 14.1563 0.76083 13.6953 1.22463L5.32644 9.59342C4.57861 10.2523 4.08838 11.2328 4.00319 12.2873L3.99994 15.5023V16.5023H8.13454C9.26884 16.4245 10.259 15.9295 10.9574 15.1238L19.2789 6.80584C19.7406 6.34416 20 5.71799 20 5.06508C20 4.41217 19.7406 3.786 19.2789 3.32432L17.178 1.22342ZM8.06392 14.5048C8.59815 14.467 9.09543 14.2184 9.49473 13.7616L15.5566 7.69972L12.8024 4.94527L6.69604 11.0496C6.29089 11.4079 6.04025 11.9092 5.99994 12.3678V14.5029L8.06392 14.5048ZM14.2168 3.53128L16.9708 6.28551L17.8647 5.39162C17.9513 5.30502 18 5.18756 18 5.06508C18 4.9426 17.9513 4.82514 17.8647 4.73854L15.7611 2.63486C15.6754 2.54855 15.5589 2.5 15.4373 2.5C15.3157 2.5 15.1992 2.54855 15.1135 2.63486L14.2168 3.53128Z"
                    fill="#35BA83"
                  />
                </svg>
                <div class="text-green-600 ml-2 mr-6">Edit</div>
              </div>
              <div class="flex items-center">
                <svg
                  width="20"
                  class=""
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28584 9.63508C1.89084 10.1517 1.89084 10.8492 2.28584 11.3651C3.53001 12.9892 6.51501 16.3334 10 16.3334C13.485 16.3334 16.47 12.9892 17.7142 11.3651C17.9064 11.1177 18.0107 10.8133 18.0107 10.5001C18.0107 10.1868 17.9064 9.88247 17.7142 9.63508C16.47 8.01091 13.485 4.66675 10 4.66675C6.51501 4.66675 3.53001 8.01091 2.28584 9.63508V9.63508Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 13C8.61929 13 7.5 11.8807 7.5 10.5C7.5 9.11929 8.61929 8 10 8C11.3807 8 12.5 9.11929 12.5 10.5C12.5 11.8807 11.3807 13 10 13Z"
                    stroke="#F7B538"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div class="text-base ml-2 text-yellow-600">View</div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-show="catalogueState.inventoryInfo"> -->
          <div>
          <div class="mt-10">
            <p class="font-semibold text-lg">Inventory Information</p>
            <div class="mt-10">
              <p class="text-cloudenly-primary-main font-medium">
                Inventory Operation and Management Information
              </p>
              <div>
                <div>
                  <div class="flex mt-8">
                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Variant SKU</label>
                        </div>
                        <input
                          readonly
                          disabled
                          v-model="variant.variantSku"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Variant Name</label>
                        </div>
                        <input
                          readonly
                          disabled
                          v-model="variant.variantName"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="w-1/3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Opening Stock</label>
                        </div>
                        <input
                          v-model="inventory.openingStock"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-8">
                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Reorder Level</label>
                        </div>
                        <input
                          v-model="inventory.reorderLevel"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Valuation Method</label
                          >
                        </div>
                        <select
                          v-model="inventory.valuationMethod"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                        >
                          <option value="lifo">LIFO</option>
                          <option value="fifo">FIFO</option>
                          <option value="weightedAverage">
                            Weighted Average
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <div class>
              <p class="text-cloudenly-primary-main font-medium">
                Inventory Handling Information
              </p>

              <div class="mt-10">
                <div class="">
                  <div class="flex">
                    <div class="mr-8 w-1/3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Batch Number</label>
                        </div>
                        <input
                          v-model="inventory.batchNo"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Expiry Date</label>
                        </div>

                        <s-text
                          type="date"
                          v-model="inventory.expiryDate"
                          input-class="w-full py-2 "
                          placeholder="Select Date"
                        ></s-text>
                      </div>
                    </div>

                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Item Dimension (LxWxH)</label
                          >
                        </div>

                        <div class="w-full flex items-center">
                          <div class="w-1/4">
                            <input
                              v-model="inventory.itemDimL"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="L"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.itemDimW"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="W"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.itemDimH"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="H"
                            />
                          </div>

                          <div class="w-1/4">
                            <select
                              v-model="inventory.itemDimUnit"
                              name
                              id
                              class="
                                py-2
                                border-gray-400 border-l-0 border-1
                                w-full
                              "
                            >
                              <option value="cm">CM</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="w-1/3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Item Weight</label>
                        </div>
                        <div class="flex items-center">
                          <input
                            v-model="inventory.itemWeight"
                            type="text"
                            class="py-2 px-2 border-gray-400 border-1 w-full"
                            id
                            aria-describedby=""
                            placeholder
                          />

                          <div class="w-1/4">
                            <select
                              name
                              id
                              class="
                                py-2
                                border-gray-400 border-l-0 border-1
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-8">
                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Package Number</label
                          >
                        </div>
                        <input
                          v-model="inventory.packageNumber"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Package Dimensions (LxWxH)</label
                          >
                        </div>

                        <div class="w-full flex items-center">
                          <div class="w-1/4">
                            <input
                              v-model="inventory.packageDimL"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="L"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.packageDimW"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="W"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.packageDimH"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="H"
                            />
                          </div>

                          <div class="w-1/4">
                            <select
                              v-model="inventory.packageDimUnit"
                              name
                              id
                              class="
                                py-2
                                border-gray-400 border-l-0 border-1
                                w-full
                              "
                            >
                              <option value="cm">CM</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Package Weight</label
                          >
                        </div>
                        <div class="flex items-center">
                          <div class="w-full">
                            <input
                              v-model="inventory.packageWeight"
                              type="text"
                              class="py-2 px-2 border-gray-400 border-1 w-full"
                              id
                              aria-describedby=""
                              placeholder
                            />
                          </div>
                          <div class="w-1/4">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1 border-l-0
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3 w-1/3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Item Qty. Per Package</label
                          >
                        </div>
                        <input
                          v-model="inventory.itemQuantityPerPackage"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-8">
                    <div class="w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Pallet Number</label>
                        </div>
                        <input
                          v-model="inventory.palletNumber"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Pallet Dimension (LxWxH)</label
                          >
                        </div>

                        <div class="w-full flex items-center">
                          <div class="w-1/4">
                            <input
                              v-model="inventory.palletDimL"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="L"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.palletDimW"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="W"
                            />
                          </div>

                          <div class="w-1/4">
                            <input
                              v-model="inventory.palletDimH"
                              type="text"
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1
                                rounded
                                w-full
                              "
                              id=""
                              aria-describedby="textHelp"
                              placeholder="H"
                            />
                          </div>

                          <div class="w-1/4">
                            <select
                              v-model="inventory.palletDimUnit"
                              name
                              id
                              class="
                                py-2
                                border-gray-400 border-l-0 border-1
                                w-full
                              "
                            >
                              <option value="cm">CM</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Pallet Weight</label>
                        </div>
                        <div class="flex items-center">
                          <div class="w-full">
                            <input
                              v-model="inventory.palletWeight"
                              type="text"
                              class="py-2 px-2 border-gray-400 border-1 w-full"
                              id
                              aria-describedby=""
                              placeholder
                            />
                          </div>
                          <div class="w-1/4">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border-gray-400 border-1 border-l-0
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3 w-1/3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Package Qty. Per Pallet</label
                          >
                        </div>
                        <input
                          v-model="inventory.packageQuantityPerPackage"
                          type="text"
                          class="
                            py-2
                            px-2
                            border-gray-400 border-1
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <p class="text-cloudenly-primary-main font-medium">Pack Size</p>
            <div class="mt-10">
              <div class="row flex">
                <div class="col-3 w-1/3 mr-8">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for>Pack Size Label</label>
                    </div>
                    <input
                      v-model="inventory.packSizeLabel"
                      type="text"
                      class="py-2 px-2 border-gray-400 border-1 rounded w-full"
                      id
                      aria-describedby=""
                      placeholder
                    />
                  </div>
                </div>

                <div class="col-3 w-1/3 mr-8">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for
                        >Pack Size Quantity</label
                      >
                    </div>
                    <div>
                      <input
                        v-model="inventory.packQuantity"
                        type="text"
                        class="
                          py-2
                          px-2
                          border-gray-400 border-1
                          rounded
                          w-full
                        "
                        id
                        aria-describedby=""
                        placeholder
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <p class="text-cloudenly-primary-main font-medium">
              Storage Information
            </p>
            <div class="mt-10">
              <div class="row flex">
                <div class="col-3 w-1/3 mr-8">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for>BIN #</label>
                    </div>
                    <input
                      v-model="inventory.bin"
                      type="text"
                      class="py-2 px-2 border-gray-400 border-1 rounded w-full"
                      id
                      aria-describedby=""
                      placeholder
                    />
                  </div>
                </div>

                <div class="col-3 w-1/3 mr-8">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for>Rack #</label>
                    </div>
                    <div>
                      <input
                        v-model="inventory.rack"
                        type="text"
                        class="
                          py-2
                          px-2
                          border-gray-400 border-1
                          rounded
                          w-full
                        "
                        id
                        aria-describedby=""
                        placeholder
                      />
                    </div>
                  </div>
                </div>

                <div class="col-3 w-1/3 mr-8">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for>shelf #</label>
                    </div>
                    <div>
                      <input
                        v-model="inventory.shelf"
                        type="text"
                        class="
                          py-2
                          px-2
                          border-gray-400 border-1
                          rounded
                          w-full
                        "
                        id
                        aria-describedby=""
                        placeholder
                      />
                    </div>
                  </div>
                </div>

                <div class="col-3 w-1/3">
                  <div class="form-group">
                    <div class="mb-5">
                      <label class="font-semibold" for>Room #</label>
                    </div>
                    <div>
                      <input
                        v-model="inventory.room"
                        type="text"
                        class="
                          py-2
                          px-2
                          border-gray-400 border-1
                          rounded
                          w-full
                        "
                        id
                        aria-describedby=""
                        placeholder
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Inventory Section -->

      <div class="py-12 px-8 flex justify-end bg-white">
        <div>
          <button
            @click="$router.back()"
            type="button"
            class="
              py-4
              px-8
              text-lg
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
              rounded-full
            "
          >
            Cancel
          </button>
        </div>

        <!-- <div class="">
          <div class="flex justify-end">
            <button
              v-if="isInventoryCreated"
              @click="createOrUpdateInventory"
              :class="{
                'cursor-not-allowed': saveInventoryInfoButton,
                'text-cloudenly-primary-mid': saveInventoryInfoButton,
              }"
              class="
                py-4
                px-8
                text-xl
                bg-primary-optima-color
                text-white
                rounded-full
              "
              type="button"
            >
              Update Product
            </button>

            <button
              v-else
              @click="createOrUpdateInventory"
              :class="{
                'cursor-not-allowed': saveInventoryInfoButton,
                'text-cloudenly-primary-mid': saveInventoryInfoButton,
              }"
              class="
                py-4
                px-8
                text-xl
                bg-primary-optima-color
                text-white
                rounded-full
              "
              type="button"
            >
              Create Product
            </button>
          </div>
        </div> -->
      </div>

    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
import UnitOfMeasurement from "../../../utils/unitOfMeasurement";
import Drawer from "../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import alertPrivilege from "../../components/Alert/AlertPrevilege";
import { VMoney } from "v-money";

// eslint-disable-next-line no-unused-vars
// import money from "money-math";

import vatSetting from "../settings/locationsAndTaxes/taxes/tax.vue";
import countryList from "../../../utils/country";
import stateList from "../../../utils/nigeriaState";

import { parseLocation } from "@/utils/helpers";

export default {
  components: {
    Drawer,
    Datepicker,
    alertPrivilege,
    vatSetting,
    sPhoto,
  },

  directives: {
    money: VMoney,
  },

  data() {
    return {
      editable: true,
      retailModal: "",
      setupModal: "",
      image_dummy,
      previewFormat: "",
      countryList: countryList,
      stateList: stateList,
      saveTaxButton: false,

      brandIds: [],
      categoryIds: [],
      selectedTaxes: [],

      outletIds: [], //this holds outlets id for user
      disableButton: false,
      isDisable: false,
      variantValue: [
        {
          key: "",
          value: "",
        },
      ],
      outletChecked: true,
      outlet: [],
      checked: true,
      check: false,
      skuSetupDrawer: false,
      taxDrawer: false,
      itemDescDrawer: false,
      retailDiscDrawer: false,
      wholesaleDiscDrawer: false,
      modalSave: false,

      isSubmitting: false,
      markupAndMarginType: "retail",
      setting: {
        minPercentageMarkup: 0,
        maxDiscountLimit: 0,
        price: 1,
        margin: 0,
        percentMargin: 0,
      },

      selectedSupplier: {
        supplierId: null,
        supplierVariantSku: "",
        supplierVariantName: "",
        unitOfPurchase: "",
        pricePerUnit: 0,
        skuPrice: 0,
        quantityPerUnit: 0,
        percentageSupplied: 0,
        weightedPurchasePrice: 0,
        default: false,

        unitSupplied: 0,
      },

      variantSuppliers: [
        {
          default: true,
          name: "",
          supplierId: null,
          supplierVariantSku: "",
          supplierVariantName: "",
          unitOfPurchase: "",
          pricePerUnit: 0,
          skuPrice: 0,
          quantityPerUnit: 0,
          percentageSupplied: 0,
          weightedPurchasePrice: 0,
          unitSupplied: 0,
        },
      ],

      retailPriceBooks: [
        {
          defaultPrice: true,
          unitOfSale: "",
          quantityPerUnit: "",
          unitPurchasePrice: 0,
          recommendedRetailPrice: 0,
          saleMarginPercentage: 0,
          saleMarginAmount: 0,
          discountedRetailPrice: 0,
          discountedSaleMarginAmount: 0,
          discountedSaleMarginPercentage: 0,
        },
      ],

      wholesalePriceBooks: [
        {
          defaultPrice: true,
          unitOfSale: "",
          quantityPerUnit: 0,
          unitPurchasePrice: 0,
          recommendedWholesalePrice: 0,
          saleMarginPercentage: 0,
          saleMarginAmount: 0,
          discountedWholesalePrice: 0,
          discountedSaleMarginAmount: 0,
          discountedSaleMarginPercentage: 0,
        },
      ],

      modalCategory: false,
      modalBrand: false,
      newCategoryName: "",
      newBrandName: "",
      unitOFMeasurementData: UnitOfMeasurement,
      supplierModal: false,
      vatToggle: false,
      showVariantVat: false,
      companyVat: "",
      supplier: "",
      allSupplier: "",
      variantConfig: [
        {
          key: "",
          value: "",
        },
      ],

      // eslint-disable-next-line no-dupe-keys
      taxes: [
        {
          name: "GST/VAT",
          label: "GST/VAT",
          amount: "7.5",
        },

        {
          name: "City Tax",
          label: "CTY Tax",
          amount: "2.5",
        },
      ],

      itemInfo: {
        categoryId: null,
        name: "",
        sku: "",
        brandId: null,
        description: "",
        barcode: "",
        currency: "",
      },

      unitsOfMeasure: {
        standardUom: "",
        standardUomConversionFactor: "",
        unitOfPurchase: "",
        unitOfPurchaseConversionFactor: "",
        unitOfSale: [
          {
            unitOfSale: "",
            conversionFactor: "",
          },
        ],
      },

      variant: {
        syncWithSaleCatalogue: true,
        syncWithPurchaseCatalogue: true,
        syncWithInventory: true, 
        variantName: "",
        variantCode: "",
        variantSku: "",
        image: "",
        manufacturerPartNumber: "",
        variantProperty: {},
        weightedAveragePricePerItem: 0,
        defaultSupplierPricePerItem: 0,
        weightedAveragePrice: 0,
        retailDiscountLimit: 0,
        retailMaximumSalesMarkup: 0,
        retailUsePurchasePriceReference: "weightedAverage",
        wholesaleDiscountLimit: 0,
        wholesaleMaximumSalesMarkup: 0,
        wholesaleUsePurchasePriceReference: "weightedAverage",

        // newly Added
        totalQuantitySupplied: 0,
        totalPercentSupplied: 0,

        //item variant cost info setting
        itemType: "purchaseToSell",
      },

      inventory: {
        openingStock: 0,
        addedStock: 0,
        issuedStock: 0,
        stockBalance: 0,
        reorderLevel: 0,
        mac: null,
        valuationMethod: "weightedAverage",
        inventoryValue: 0,
        itemDimension: null,
        itemWeight: 0,
        packageNumber: 0,
        packageDimension: 0,
        packageWeight: 0,
        packingListCount: 0,
        palletNumber: 0,
        palletDimension: null,
        palletWeight: null,
        batchNo: null,
        packSizeLabel: null,
        bin: null,
        rack: null,
        shelf: null,
        expiryDate: null,
        itemQuantityPerPackage: null,
        packageQuantityPerPackage: null,
        standardUom: "",

        // newly added
        itemDimL: 0,
        itemDimW: 0,
        itemDimH: 0,
        itemDimUnit: "",

        palletDimL: 0,
        palletDimW: 0,
        palletDimH: 0,
        palletDimUnit: "",

        packageDimL: 0,
        packageDimW: 0,
        packageDimH: 0,
        packageDimUnit: "",
      },

      network: {
        makeNetworkPublic: false,
        exposePricebook: false,
        // networkOrgId: null,
        isDualCategory: false,
        contactOrgId: null,
        category: "supplier",
        kind: "organization",
        name: null,
        code: null,
        profile: null,
        industryCategory: null,
        productServiceInterest: null,
        segmentation: null,
        bank: null,
        accountNumber: null,
        address: null,
        location: null,
        country: null,
        state: null,
        zipCode: null,
        contactPerson: null,
        phone: null,
        email: null,
        birthday: null,
        taxSettings: null,
        taxInfo: null,
        registrationNumber: null,
        currency: null,
        isRestricted: false,
        accountManager: [],
        manageException: [],
        discountList: false,
        sendPromoAlert: false,
        loyaltyCategoryId: null,
        loyaltyCommencementDate: null,
      },

      queryInfo: "",

      taxPolicyType: "invoiceBase",
      currentTaxPolicy: "taxExclusive",
      country: "",
      state: "",
      city: "",

      invoiceBase: {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
        },
      },

      itemBase: {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
          hybridTax: false,
        },
      },

      money: {
        // The character used to show the decimal place.
        // decimal: '.',
        // The character used to separate numbers in groups of three.
        // thousands: ',',
        // The currency name or symbol followed by a space.
        // prefix: 'NGN',
        // The suffix (If a suffix is used by the target currency.)
        // suffix: '',
        // Level of decimal precision. REQUIRED
        precision: 2,
        // If mask is false, outputs the number to the model. Otherwise outputs the masked string.
        masked: true,
      },

      saveButton: false,
      brandButton: false,
      categoryButton: false,
      saveSupplierButton: false,
      saveSkuButton: false,

      orgVatList: "",
      itemDescButton: false,

      catalogueState: {
        productDetail: true,
        purchaseInfo: false,
        saleInfo: false,
        inventoryInfo: false,
      },

      catalogueEditState: {
        productDetail: false,
        costManageState: false,
        salesEditState: false,
        inventoryEditState: false,
      },

      variantId: null,
      itemId: null,
      defaultSupplierPrice: 0,
      weightedAveragePriceItem: 0,
      weightedAveragePriceUnit: 0,
      taxType: "taxExclusive",
      showTaxes: true,

      itemVariantSetting: {
        key: "",
        value: "",
      },

      // new defined button
      saveItemInfoButton: false,
      savePurchaseInfoButton: false,
      saveSalesInfoButton: false,
      saveInventoryInfoButton: false,

      updateItemInfoButton: false,
      updatePurchaseInfoButton: false,
      updateSalesInfoButton: false,
      updateInventoryInfoButton: false,

      // sku code setup page

      isItemDetailCreated: false,
      isCostManagementCreated: false,
      isSaleInfoCreated: false,
      isInventoryCreated: false,

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
        type: "slash",
      },

      optionList: [
        { name: "Issuing Authority", id: "issuingAuthority" },
        { name: "Random Code", id: "randomCode" },
        { name: "Current Date", id: "currentDate" },
        { name: "Product Name", id: "productName" },
        { name: "Current Year", id: "currentYear" },
      ],
      randomCodes: [
        { name: "Alphabet", id: "alphabet" },
        { name: "Numeric", id: "numeric" },
        { name: "Alphanumeric", id: "alphanumeric" },
      ],
      currentYearList: [
        { name: "YY", id: "yy" },
        { name: "YYYY", id: "yyyy" },
      ],
      seperatorList: [
        { name: "Slash", id: "slash" },
        { name: "Hyphen", id: "hyphen" },
      ],

      itemCharacteristicsValue: [],
      outletVat: {},

      itemDisableState: true,
      costManageDisableState: true,
      salesDisableState: true,
      inventoryDisableState: true,
    };
  },

  methods: {

    routeEditLocation() {
      this.$router.push({
        name: "createLocation",
        params: {
          id: this.getAllOrganisationLocation[0].id,
        },
      });
    },

    convertCamelCase(val) {
      return (
        val
          // insert a space before all caps
          .replace(/([A-Z])/g, " $1")
          // uppercase the first character
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
      );
    },

    parseLocation,
    getUniqueLocation(identifier, items) {
      const locations = this.getAllOrganisationLocation.outlets.map((resp) => {
        return this.parseLocation(resp[identifier], items);
      });

      return [...new Set(locations)];
    },

    addSalesInfoUnitOfMeasure() {
      this.unitsOfMeasure.unitOfSale.push({
        unitOfSale: "",
        conversionFactor: "",
      });
    },

    deleteSalesInfoUnitOfMeasure(val) {
      this.unitsOfMeasure.unitOfSale.splice(val, 1);
    },

    clearSelectedTax() {
      if (this.taxType === "taxExempt") {
        this.showTaxes = false;
        this.selectedTaxes = [];
      } else {
        this.showTaxes = true;
      }
    },

    // save main item information
    saveItemInfoVariant(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.saveItemInfoButton = true;
          let userInfo = {
            orgId: this.$store.state.auth.auth.authData.orgId,
            creatorId: this.$store.state.auth.auth.authData.creatorId,
            outletIds: this.outletIds,
          };

          delete this.variantValue.id;

          this.variant.variantProperty = this.variantValue;
          this.itemInfo.categoryId = this.itemInfo.categoryId || null;
          this.itemInfo.brandId = this.itemInfo.brandId || null;
          let queryInfo = this.queryInfo;
          const dataPayload = {
            userInfo: userInfo,
            payload: {
              ...this.itemInfo,
              variant: {
                ...this.variant,
              },
              unitsOfMeasure: this.unitsOfMeasure,
            },
          };

          this.$store
            .dispatch("catalogue/createItemInformationCatalogue", {
              dataPayload,
              queryInfo,
            })
            .then((resp) => {
              this.$router.back();
              this.saveItemInfoButton = false;
              this.$vs.notify({
                title: "Item",
                position: "top-right",
                color: "primary",
                text: resp.data.message,
                fixed: false,
              });
            })
            .catch((err) => {
              this.saveItemInfoButton = false;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: err.response.data.message,
                fixed: false,
              });
              // eslint-disable-next-line no-console
              console.log(err);
            });
        }
      });
    },

    // save purchase section
    saveSupplierVariantInfo() {
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: this.outletIds,
      };

      this.defaultSupplierPrice = this.variantSuppliers.find((resp) => {
        resp.default === true;
      });

      if (this.defaultSupplierPrice === undefined) {
        this.defaultSupplierPrice = this.variantSuppliers[0];
      }
      this.savePurchaseInfoButton = true;

      const dataPayload = {
        userInfo: userInfo,
        payload: {
          variantId: this.variantId,
          itemId: this.itemId,
          variant: {
            defaultSupplierPrice: this.defaultSupplier.pricePerUnit,
            weightedAveragePriceItem: this.variant.weightedAveragePricePerItem,
            weightedAveragePriceUnit: this.variant.weightedAveragePrice,
            totalQuantitySupplied: this.variant.totalQuantitySupplied,
            totalPercentSupplied: this.variant.totalQuantitySupplied,
            variantSuppliers: this.variantSuppliers,
          },
        },
      };
      let queryInfo = this.queryInfo;
      this.$store
        .dispatch("catalogue/createSupplierVariant", {
          dataPayload,
          queryInfo,
        })
        .then((resp) => {
          this.$router.back();
          this.savePurchaseInfoButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.savePurchaseInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    // save sales information section
    saveSalesInfo() {
      this.saveSalesInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        // outletIds: this.outletIds,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      const dataPayload = {
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          taxType: this.taxType,
          taxes: this.selectedTaxes,
          variantId: this.variantId,
          itemInformation: {
            retailDiscountLimit: this.variant.retailDiscountLimit,
            retailMaximumSalesMarkup: this.variant.retailMaximumSalesMarkup,
            wholesaleDiscountLimit: this.variant.wholesaleDiscountLimit,
            wholesaleMaximumSalesMarkup:
              this.variant.wholesaleMaximumSalesMarkup,
          },
          variant: {
            syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
            syncWithPurchaseCatalogue: this.variant.syncWithPurchaseCatalogue,
            // syncWithInventory: true,
            retailPriceBooks: this.retailPriceBooks,
            wholesalePriceBooks: this.wholesalePriceBooks,
          },
        },
      };
      let queryInfo = this.queryInfo;

      // console.log(dataPayload, queryInfo)
      this.$store
        .dispatch("catalogue/createSaleInformation", {
          dataPayload,
          queryInfo,
        })
        .then((resp) => {
          // console.log(resp.data);
          this.saveSalesInfoButton = false;
          this.$router.back();
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.saveSalesInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    // save inventory section
    saveInventoryInfo() {
      this.saveInventoryInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      const inventoryPayload = {
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          variantId: this.variantId,
          retailPriceBooks: this.retailPriceBooks,
          variant: {
            syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
            syncWithPurchaseCatalogue: this.variant.syncWithPurchaseCatalogue,
            syncWithInventory: this.variant.syncWithInventory,
            inventory: this.inventory,
          },
        },
      };

      let queryInfo = this.queryInfo;
      // console.log(inventoryPayload);
      this.$store
        .dispatch("catalogue/createInventoryItem", {
          inventoryPayload,
          queryInfo,
        })
        .then((resp) => {
          this.saveInventoryInfoButton = false;
          this.$router.back();
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.saveInventoryInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          console.log(err);
        });
    },

    toggleNext(val) {
      // purchaseState , saleState, inventoryState, finalState
      let state = val;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: this.outletIds,
      };
      let queryInfo = this.queryInfo;

      // console.log(state);
      switch (state) {
        // eslint-disable-next-line no-case-declarations
        case "productDetail":
          // this.variantValue.map((variant) => {
          //   this.variant.variantProperty[variant.key] = variant.value;
          // });

          this.$validator.validateAll(state).then((resp) => {
            if (resp) {
              this.saveItemInfoButton = true;
              delete this.variantValue.id;
              this.variant.variantProperty = this.variantValue;
              this.itemInfo.categoryId = this.itemInfo.categoryId || null;
              this.itemInfo.brandId = this.itemInfo.brandId || null;
              let dataPayload = {
                userInfo: userInfo,
                payload: {
                  ...this.itemInfo,
                  variant: {
                    ...this.variant,
                  },
                  unitsOfMeasure: {
                    ...this.unitsOfMeasure,
                  },
                },
              };

              this.retailPriceBooks = this.unitsOfMeasure.unitOfSale.map(
                (resp) => {
                  return {
                    defaultPrice: false,
                    unitOfSale: resp.unitOfSale,
                    quantityPerUnit: resp.conversionFactor,
                    unitPurchasePrice: 0,
                    recommendedRetailPrice: 0,
                    saleMarginPercentage: 0,
                    saleMarginAmount: 0,
                    discountedRetailPrice: 0,
                    discountedSaleMarginAmount: 0,
                    discountedSaleMarginPercentage: 0,
                  };
                }
              );
              this.wholesalePriceBooks = this.unitsOfMeasure.unitOfSale.map(
                (resp) => {
                  return {
                    defaultPrice: false,
                    unitOfSale: resp.unitOfSale,
                    quantityPerUnit: resp.conversionFactor,
                    unitPurchasePrice: 0,
                    recommendedWholesalePrice: 0,
                    saleMarginPercentage: 0,
                    saleMarginAmount: 0,
                    discountedRetailPrice: 0,
                    discountedSaleMarginAmount: 0,
                    discountedSaleMarginPercentage: 0,
                  };
                }
              );

              this.variantSuppliers[0].unitOfPurchase =
                this.unitsOfMeasure.unitOfPurchase;
              this.variantSuppliers[0].quantityPerUnit =
                this.unitsOfMeasure.unitOfPurchaseConversionFactor;

              // this.catalogueState.productDetail = false;
              // this.catalogueState.purchaseInfo = true;
              // this.catalogueState.saleInfo = false;
              // this.catalogueState.inventoryInfo = false
              // this.isItemDetailCreated = true;

              this.$store
                .dispatch("catalogue/createItemInformationCatalogue", {
                  dataPayload,
                  queryInfo,
                })
                .then((resp) => {
                  if (resp.data) {
                    this.variantId = resp.data.variantInformation.id;
                    this.itemId = resp.data.variantInformation.itemId;
                    this.inventory.standardUom =
                      resp.data.itemUnitOfMeasureInformation.standardUom;
                    this.variantSuppliers[0].unitOfPurchase =
                      resp.data.itemUnitOfMeasureInformation.unitOfPurchase;
                    this.variantSuppliers[0].quantityPerUnit =
                      resp.data.itemUnitOfMeasureInformation.unitOfPurchaseConversionFactor;

                    this.catalogueState.productDetail = false;
                    this.catalogueState.purchaseInfo = true;
                    this.catalogueState.saleInfo = false;
                    this.catalogueState.inventoryInfo = false;
                    this.isItemDetailCreated = true;
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.saveItemInfoButton = false;
                  this.catalogueState.productDetail = true;
                  this.catalogueState.purchaseInfo = false;
                  this.catalogueState.saleInfo = false;
                  this.catalogueState.inventoryInfo = false;
                  this.isItemDetailCreated = false;
                  this.$vs.notify({
                    title: "Item Error",
                    position: "top-right",
                    color: "danger",
                    text: err.response.data.message,
                    fixed: false,
                  });
                });
              // eslint-disable-next-line no-empty
            } else {
            }
          });

          break;

        // eslint-disable-next-line no-case-declarations

        // eslint-disable-next-line no-case-declarations
        case "saleState":
          let defaultSupplier = this.variantSuppliers.find((resp) => {
            if (resp.default === true) {
              return resp;
            }
          });

          this.savePurchaseInfoButton = true;

          this.selectedSupplier = defaultSupplier;

          let variantSupplierPayload = {
            userInfo: userInfo,
            payload: {
              variantId: this.variantId,
              itemId: this.itemId,
              variant: {
                itemType: this.variant.itemType,
                defaultSupplierPrice: defaultSupplier.pricePerUnit,
                weightedAveragePriceItem:
                  this.variant.weightedAveragePricePerItem,
                weightedAveragePriceUnit: this.variant.weightedAveragePrice,
                totalQuantitySupplied: this.variant.totalQuantitySupplied,
                totalPercentSupplied: this.variant.totalQuantitySupplied,
                variantSuppliers: this.variantSuppliers,
              },
            },
          };

          this.retailPriceBooks = this.retailPriceBooks.map((resp) => {
            return {
              defaultPrice: false,
              unitOfSale: resp.unitOfSale,
              quantityPerUnit: resp.quantityPerUnit,
              unitPurchasePrice:
                Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit),
              recommendedRetailPrice: 0,
              saleMarginPercentage: 0,
              saleMarginAmount: 0,
              discountedRetailPrice: 0,
              discountedSaleMarginAmount: 0,
              discountedSaleMarginPercentage: 0,
            };
          });

          this.wholesalePriceBooks = this.wholesalePriceBooks.map((resp) => {
            return {
              defaultPrice: false,
              unitOfSale: resp.unitOfSale,
              quantityPerUnit: resp.quantityPerUnit,
              unitPurchasePrice:
                Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit),
              recommendedRetailPrice: 0,
              saleMarginPercentage: 0,
              saleMarginAmount: 0,
              discountedRetailPrice: 0,
              discountedSaleMarginAmount: 0,
              discountedSaleMarginPercentage: 0,
            };
          });

          this.changeSaleRetailUnitPurchasePrice();
          this.changeSaleWholeUnitPurchasePrice();

          this.$store
            .dispatch("catalogue/createSupplierVariant", {
              variantSupplierPayload,
              queryInfo,
            })
            .then((resp) => {
              console.log(resp.data);
              if (resp) {
                this.changeSaleRetailUnitPurchasePrice();
                this.changeSaleWholeUnitPurchasePrice();

                this.catalogueState.productDetail = false;
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = true;
                this.catalogueState.inventoryInfo = false;
                //state button
                this.catalogueEditState.costManageState = true;

                this.isCostManagementCreated = true;
              }
            })
            .catch((err) => {
              this.savePurchaseInfoButton = false;
              this.catalogueState.purchaseInfo = true;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = false;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: err,
                fixed: false,
              });
              console.log(err);
            });

          break;

        // eslint-disable-next-line no-case-declarations
        // eslint-disable-next-line no-case-declarations
        case "inventoryState":
          const salesPayload = {
            userInfo: {
              orgId: this.$store.state.auth.auth.authData.orgId,
              creatorId: this.$store.state.auth.auth.authData.creatorId,
              outletIds: [this.$store.state.auth.auth.authData.outletId],
            },
            payload: {
              itemId: this.itemId,
              taxType: this.taxType,
              taxes: this.selectedTaxes,
              variantId: this.variantId,
              itemInformation: {
                retailDiscountLimit: this.variant.retailDiscountLimit,
                retailMaximumSalesMarkup: this.variant.retailMaximumSalesMarkup,
                wholesaleDiscountLimit: this.variant.wholesaleDiscountLimit,
                wholesaleMaximumSalesMarkup:
                  this.variant.wholesaleMaximumSalesMarkup,
              },
              variant: {
                syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
                syncWithPurchaseCatalogue:
                  this.variant.syncWithPurchaseCatalogue,
                retailPriceBooks: this.retailPriceBooks,
                wholesalePriceBooks: this.wholesalePriceBooks,
              },
            },
          };

          this.$store
            .dispatch("catalogue/createSaleInformation", {
              salesPayload,
              queryInfo,
            })
            .then((resp) => {
              if (resp.data) {
                this.catalogueState.inventoryInfo = true;
                this.catalogueState.productDetail = false;
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = true;
                this.catalogueEditState.salesEditState = true;
                this.isSaleInfoCreated = true;
              }
            })
            .catch((err) => {
              console.log(err);
              this.saveSalesInfoButton = false;
              this.catalogueState.purchaseInfo = false;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = false;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: err.response.data.message,
                fixed: false,
              });
              console.log(err);
            });

          break;

        // eslint-disable-next-line no-case-declarations
        case "finalState":
          const inventoryPayload = {
            userInfo: {
              orgId: this.$store.state.auth.auth.authData.orgId,
              creatorId: this.$store.state.auth.auth.authData.creatorId,
              outletIds: [this.$store.state.auth.auth.authData.outletId],
            },
            payload: {
              itemId: this.itemId,
              variantId: this.variantId,
              variant: {
                syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
                syncWithPurchaseCatalogue:
                  this.variant.syncWithPurchaseCatalogue,
                syncWithInventory: this.variant.syncWithInventory,
                inventory: this.inventory,
              },
            },
          };

          this.saveInventoryInfoButton = true;

          this.$store
            .dispatch("catalogue/createInventoryItem", {
              inventoryPayload,
              queryInfo,
            })
            .then((resp) => {
              this.$router.back();
              this.saveInventoryInfoButton = false;
              this.catalogueState.purchaseInfo = false;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = false;
              this.$vs.notify({
                title: "Item",
                position: "top-right",
                color: "primary",
                text: resp.data.message,
                fixed: false,
              });
            })
            .catch((err) => {
              this.saveInventoryInfoButton = false;
              this.catalogueState.purchaseInfo = false;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = true;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: err.response.data.message,
                fixed: false,
              });
              console.log(err);
            });

          break;

        default:
          break;
      }
    },

    toggleUpdateNext(val) {
      // purchaseState , saleState, inventoryState, finalState
      let state = val;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };
      // let queryInfo = this.queryInfo;
      switch (state) {
        //eslint-disable-next-line no-case-declarations
        case "purchaseState":
          // this.variantValue.map((variant) => {
          //   this.variant.variantProperty[variant.key] = variant.value;
          // });

          delete this.variantValue.id;
          this.variant.variantProperty = this.variantValue;
          this.itemInfo.categoryId = this.itemInfo.categoryId || null;
          this.itemInfo.brandId = this.itemInfo.brandId || null;

          const dataPayload = {
            id: this.variantId,
            userInfo: userInfo,
            payload: {
              itemId: this.itemId,
              itemUnitsOfMeasureId: this.unitsOfMeasure.id,
              variant: { ...this.variant },
              unitsOfMeasure: this.unitsOfMeasure,
            },
          };

          this.variantSuppliers.map((resp) => {
            return {
              name: resp.name,
              supplierId: resp.supplierId,
              supplierVariantSku: resp.supplierVariantSku,
              supplierVariantName: resp.supplierVariantName,
              unitOfPurchase: this.unitsOfMeasure.unitOfPurchase,
              quantityPerUnit: resp.quantityPerUnit,
              pricePerUnit: resp.pricePerUnit,
              percentageSupplied: resp.percentageSupplied,
              skuPrice: resp.skuPrice,
              weightedPurchasePrice: resp.weightedPurchasePrice,
              default: resp.default,
              unitSupplied: resp.unitSupplied,
            };
          });

          // eslint-disable-next-line no-unused-vars
          this.retailPriceBooks = this.retailPriceBooks.map((resp, i) => {
            return {
              defaultPrice: resp.default,
              unitOfSale: this.unitsOfMeasure.unitOfSale[0].unitOfSale,
              quantityPerUnit:
                this.unitsOfMeasure.unitOfSale[0].conversionFactor,
              unitPurchasePrice: resp.unitPurchasePrice,
              recommendedRetailPrice: resp.recommendedRetailPrice,
              saleMarginPercentage: resp.saleMarginPercentage,
              saleMarginAmount: resp.saleMarginAmount,
              discountedRetailPrice: resp.discountedRetailPrice,
              discountedSaleMarginAmount: resp.discountedSaleMarginAmount,
              discountedSaleMarginPercentage:
                resp.discountedSaleMarginPercentage,
            };
          });

          // eslint-disable-next-line no-unused-vars
          this.wholesalePriceBooks = this.wholesalePriceBooks.map((resp, i) => {
            return {
              defaultPrice: resp.default,
              unitOfSale: this.unitsOfMeasure.unitOfSale[0].unitOfSale,
              quantityPerUnit:
                this.unitsOfMeasure.unitOfSale[0].conversionFactor,
              unitPurchasePrice: resp.unitPurchasePrice,
              recommendedRetailPrice: resp.recommendedRetailPrice,
              saleMarginPercentage: resp.saleMarginPercentage,
              saleMarginAmount: resp.saleMarginAmount,
              discountedRetailPrice: resp.discountedRetailPrice,
              discountedSaleMarginAmount: resp.discountedSaleMarginAmount,
              discountedSaleMarginPercentage:
                resp.discountedSaleMarginPercentage,
            };
          });

          this.variantSuppliers[0].unitOfPurchase =
            this.unitsOfMeasure.unitOfPurchase;
          this.variantSuppliers[0].quantityPerUnit =
            this.unitsOfMeasure.unitOfPurchaseConversionFactor;
          this.$store
            .dispatch("catalogue/updateItemVariantInformation", dataPayload)
            .then((resp) => {
              if (resp.data) {
                this.catalogueState.productDetail = false;
                this.catalogueState.purchaseInfo = true;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = false;
                this.isItemDetailCreated = true;

                this.calculateWeightedPurchaseAverage();
                this.changeSaleRetailUnitPurchasePrice();
                this.changeSaleWholeUnitPurchasePrice();

                this.$vs.notify({
                  title: "Item",
                  position: "top-right",
                  color: "primary",
                  text: resp.data.message,
                  fixed: false,
                });
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log(err);
              this.updateItemInfoButton = false;
              this.catalogueState.purchaseInfo = false;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = false;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: "error",
                fixed: false,
              });
            });

          break;

        // eslint-disable-next-line no-case-declarations
        case "saleState":
          let defaultSupplier = this.variantSuppliers.find((resp) => {
            if (resp.default === true) {
              return resp;
            }
          });
          this.updatePurchaseInfoButton = true;
          if (defaultSupplier === undefined) {
            defaultSupplier = this.variantSuppliers[0];
          }
          this.selectedSupplier = defaultSupplier;

          let variantSupplierPayload = {
            userInfo: userInfo,
            payload: {
              itemId: this.itemId,
              variant: {
                variantId: this.variantId,
                defaultSupplierPrice: defaultSupplier.pricePerUnit,
                weightedAveragePriceItem:
                  this.variant.weightedAveragePricePerItem,
                weightedAveragePriceUnit:
                  this.variant.weightedAveragePricePerItem,
                totalQuantitySupplied: this.variant.totalQuantitySupplied,
                totalPercentSupplied: this.variant.totalQuantitySupplied,
                variantSuppliers: this.variantSuppliers,
              },
            },
          };

          this.retailPriceBooks = this.retailPriceBooks.map((resp) => {
            return {
              defaultPrice: resp.default,
              unitOfSale: resp.unitOfSale,
              quantityPerUnit: resp.quantityPerUnit,
              unitPurchasePrice:
                Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit),
              recommendedRetailPrice: 0,
              saleMarginPercentage: 0,
              saleMarginAmount: 0,
              discountedRetailPrice: 0,
              discountedSaleMarginAmount: 0,
              discountedSaleMarginPercentage: 0,
            };
          });

          this.wholesalePriceBooks = this.wholesalePriceBooks.map((resp) => {
            return {
              defaultPrice: false,
              unitOfSale: resp.unitOfSale,
              quantityPerUnit: resp.quantityPerUnit,
              unitPurchasePrice:
                Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit),
              recommendedRetailPrice: 0,
              saleMarginPercentage: 0,
              saleMarginAmount: 0,
              discountedRetailPrice: 0,
              discountedSaleMarginAmount: 0,
              discountedSaleMarginPercentage: 0,
            };
          });

          this.changeSaleRetailUnitPurchasePrice();
          this.changeSaleWholeUnitPurchasePrice();
          this.$store
            .dispatch(
              "catalogue/updateVariantPurchaseInformation",
              variantSupplierPayload
            )
            .then((resp) => {
              if (resp.data) {
                this.changeSaleRetailUnitPurchasePrice();
                this.changeSaleWholeUnitPurchasePrice();

                this.catalogueState.productDetail = false;
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = true;
                this.catalogueState.inventoryInfo = false;
                //state button
                this.catalogueEditState.costManageState = true;

                this.isCostManagementCreated = true;
                this.$vs.notify({
                  title: "Item",
                  position: "top-right",
                  color: "primary",
                  text: resp.data.message,
                  fixed: false,
                });
              }
            })
            .catch((err) => {
              this.updatePurchaseInfoButton = false;
              this.catalogueState.purchaseInfo = true;
              this.catalogueState.saleInfo = false;
              this.catalogueState.inventoryInfo = false;
              this.$vs.notify({
                title: "Item Error",
                position: "top-right",
                color: "danger",
                text: "error",
                fixed: false,
              });
              // eslint-disable-next-line no-console
              console.log(err);
            });

          break;

        // eslint-disable-next-line no-case-declarations
        case "inventoryState":
          if (this.isSaleInfoCreated === true) {
            const salesPayload = {
              userInfo: userInfo,
              payload: {
                itemId: this.itemId,
                taxType: this.taxType,
                taxes: this.selectedTaxes,
                variantId: this.variantId,
                itemInformation: {
                  retailDiscountLimit: this.variant.retailDiscountLimit,
                  retailMaximumSalesMarkup:
                    this.variant.retailMaximumSalesMarkup,
                  wholesaleDiscountLimit: this.variant.wholesaleDiscountLimit,
                  wholesaleMaximumSalesMarkup:
                    this.variant.wholesaleMaximumSalesMarkup,
                },
                variant: {
                  isSale: true,
                  isPurchase: true,
                  syncWithSaleCatalogue: true,
                  syncWithPurchaseCatalogue: true,
                  retailPriceBooks: this.retailPriceBooks,
                  wholesalePriceBooks: this.wholesalePriceBooks,
                },
              },
            };

            console.log(salesPayload);

            this.updateSalesInfoButton = true;
            let queryInfo = this.queryInfo;
            this.$store
              .dispatch("catalogue/updateVariantSalesInformation", {
                salesPayload,
                queryInfo,
              })
              .then((resp) => {
                // console.log(resp.data);
                if (resp.data) {
                  this.$vs.notify({
                    title: "Item",
                    position: "top-right",
                    color: "primary",
                    text: resp.data.message,
                    fixed: false,
                  });
                  this.catalogueState.purchaseInfo = false;
                  this.catalogueState.saleInfo = false;

                  this.catalogueState.inventoryInfo = true;
                  this.catalogueState.productDetail = false;
                  this.catalogueState.purchaseInfo = false;
                  this.catalogueState.saleInfo = false;
                  this.catalogueEditState.salesEditState = true;
                  this.isSaleInfoCreated = true;
                }
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
                this.updateSalesInfoButton = false;
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = false;
                this.$vs.notify({
                  title: "Item Error",
                  position: "top-right",
                  color: "danger",
                  text: err.response.data.message,
                  fixed: false,
                });
                // eslint-disable-next-line no-console
                console.log(err);
              });
          } else {
            let queryInfo = this.queryInfo;
            const salesPayload = {
              userInfo: {
                orgId: this.$store.state.auth.auth.authData.orgId,
                creatorId: this.$store.state.auth.auth.authData.creatorId,
                outletIds: [this.$store.state.auth.auth.authData.outletId],
              },
              payload: {
                itemId: this.itemId,
                taxType: this.taxType,
                taxes: this.selectedTaxes,
                variantId: this.variantId,
                itemInformation: {
                  retailDiscountLimit: this.variant.retailDiscountLimit,
                  retailMaximumSalesMarkup:
                    this.variant.retailMaximumSalesMarkup,
                  wholesaleDiscountLimit: this.variant.wholesaleDiscountLimit,
                  wholesaleMaximumSalesMarkup:
                    this.variant.wholesaleMaximumSalesMarkup,
                },
                variant: {
                  syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue,
                  syncWithPurchaseCatalogue:
                    this.variant.syncWithPurchaseCatalogue,
                  retailPriceBooks: this.retailPriceBooks,
                  wholesalePriceBooks: this.wholesalePriceBooks,
                },
              },
            };
            this.updateSalesInfoButton = true;

            this.$store
              .dispatch("catalogue/createSaleInformation", {
                salesPayload,
                queryInfo,
              })
              .then((resp) => {
                if (resp.data) {
                  this.catalogueState.saleInfo = false;
                  this.catalogueState.productDetail = false;
                  this.catalogueState.purchaseInfo = false;
                  this.catalogueState.saleInfo = false;
                  this.catalogueState.inventoryInfo = true;
                  this.catalogueEditState.salesEditState = true;
                  this.isSaleInfoCreated = true;
                }
              })
              .catch((err) => {
                console.log(err);
                this.updateSalesInfoButton = false;
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = false;
                this.$vs.notify({
                  title: "Item Error",
                  position: "top-right",
                  color: "danger",
                  text: err.response.data.message,
                  fixed: false,
                });
                console.log(err);
              });
          }

          break;

        // eslint-disable-next-line no-case-declarations
        case "finalState":
          // update inventory section
          break;

        default:
          break;
      }
    },

    // update main item information
    updateItemInfoVariant() {
      this.updateItemInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };
      // this.variantValue.map(variant => {
      //   this.variant.variantProperty[variant.characteristic] = variant.value;
      // });
      delete this.variantValue.id;
      this.variant.variantProperty = this.variantValue;
      this.itemInfo.categoryId = this.itemInfo.categoryId || null;
      this.itemInfo.brandId = this.itemInfo.brandId || null;
      // let queryInfo = this.queryInfo;
      const dataPayload = {
        id: this.variantId,
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          itemUnitsOfMeasureId: this.unitsOfMeasure.id,
          variant: { ...this.variant },
          unitsOfMeasure: this.unitsOfMeasure,
        },
      };
      this.$store
        .dispatch("catalogue/updateItemVariantInformation", dataPayload)
        .then((resp) => {
          this.$router.back();
          this.updateItemInfoButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.updateItemInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    // update purchase section
    updateSupplierVariantInfo() {
      // eslint-disable-next-line no-unused-vars
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      let defaultSupplier = this.variantSuppliers.find((resp) => {
        if (resp.default === true) {
          return resp;
        }
      });

      if (defaultSupplier === undefined) {
        defaultSupplier = this.variantSuppliers[0];
      }
      this.updatePurchaseInfoButton = true;
      const dataPayload = {
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          variant: {
            variantId: this.variantId,
            defaultSupplierPrice: defaultSupplier.pricePerUnit,
            weightedAveragePriceItem: this.variant.weightedAveragePricePerItem,
            weightedAveragePriceUnit: this.variant.weightedAveragePricePerItem,
            totalQuantitySupplied: this.variant.totalQuantitySupplied,
            totalPercentSupplied: this.variant.totalQuantitySupplied,
            variantSuppliers: this.variantSuppliers,
          },
        },
      };

      this.$store
        .dispatch("catalogue/updateVariantPurchaseInformation", dataPayload)
        .then((resp) => {
          this.$router.back();
          this.updatePurchaseInfoButton = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.updatePurchaseInfoButton = false;
          // eslint-disable-next-line no-console
          console.log(err);
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
        });
    },

    // update sale information section
    updateSalesInfo() {
      this.updateSalesInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      const salesPayload = {
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          taxType: this.taxType,
          taxes: this.selectedTaxes,
          variantId: this.variantId,
          itemInformation: {
            retailDiscountLimit: this.variant.retailDiscountLimit,
            retailMaximumSalesMarkup: this.variant.retailMaximumSalesMarkup,
            wholesaleDiscountLimit: this.variant.wholesaleDiscountLimit,
            wholesaleMaximumSalesMarkup:
              this.variant.wholesaleMaximumSalesMarkup,
          },
          variant: {
            isSale: true,
            isPurchase: true,
            syncWithSaleCatalogue: true,
            syncWithPurchaseCatalogue: true,
            // syncWithInventory: true,
            retailPriceBooks: this.retailPriceBooks,
            wholesalePriceBooks: this.wholesalePriceBooks,
          },
        },
      };
      // let queryInfo = this.queryInfo;

      console.log(salesPayload);

      // this.$store
      //   .dispatch("catalogue/updateVariantSalesInformation", {
      //     salesPayload,
      //     queryInfo,
      //   })
      //   .then((resp) => {
      //     this.updateSalesInfoButton = false;
      //     this.$router.back();
      //     this.$vs.notify({
      //       title: "Item",
      //       position: "top-right",
      //       color: "primary",
      //       text: resp.data.message,
      //       fixed: false,
      //     });
      //   })
      //   .catch((err) => {
      //     this.updateSalesInfoButton = false;
      //     this.$vs.notify({
      //       title: "Item Error",
      //       position: "top-right",
      //       color: "danger",
      //       text: err.response.data.message,
      //       fixed: false,
      //     });
      //     // eslint-disable-next-line no-console
      //     console.log(err);
      //   });
    },

    // update inventory section
    updateInventoryInfo() {
      this.updateInventoryInfoButton = true;
      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      const inventoryPayload = {
        userInfo: userInfo,
        payload: {
          inventoryId: this.inventory.id,
          itemId: this.itemId,
          variantId: this.variantId,
          retailPriceBooks: this.retailPriceBooks,
          variant: {
            syncWithSaleCatalogue: this.variant.syncWithSaleCatalogue || true,
            syncWithPurchaseCatalogue:
              this.variant.syncWithPurchaseCatalogue || true,
            syncWithInventory: this.variant.syncWithInventory || true,
            inventory: this.inventory,
          },
        },
      };

      // let queryInfo = this.queryInfo;
      this.$store
        .dispatch("catalogue/updateInventoryInformation", inventoryPayload)
        .then((resp) => {
          this.updateInventoryInfoButton = false;
          this.$router.back();
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          this.updateInventoryInfoButton = false;
          this.$vs.notify({
            title: "Item Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    createOrUpdateSaleInformation() {
      if (this.isSaleInfoCreated === true) {
        this.updateSalesInfo();
      } else {
        this.saveSalesInfo;
      }
    },

    createOrUpdateInventory() {
      if (this.isInventoryCreated === true) {
        this.updateInventoryInfo();
      } else {
        this.saveInventoryInfo();
      }
    },

    toggleProductDetailsView() {
      this.catalogueState.productDetail = true;
      this.catalogueState.purchaseInfo = false;
      this.catalogueState.saleInfo = false;
      this.catalogueState.inventoryInfo = false;
      this.itemDisableState = true;
    },

    toggleProductDetailsEdit() {
      this.itemDisableState = false;
      this.catalogueState.productDetail = true;
      this.catalogueState.purchaseInfo = false;
      this.catalogueState.saleInfo = false;
      this.catalogueState.inventoryInfo = false;
    },

    togglePurchaseInfoEdit() {
      this.catalogueState.productDetail = false;
      this.catalogueState.purchaseInfo = true;
      this.catalogueState.saleInfo = false;
      this.catalogueState.inventoryInfo = false;

      this.costManageDisableState = false;
    },

    togglePurchaseInfoView() {
      this.catalogueState.productDetail = false;
      this.catalogueState.purchaseInfo = true;
      this.catalogueState.saleInfo = false;
      this.catalogueState.inventoryInfo = false;

      this.costManageDisableState = true;
    },

    toggleSalesInfoEdit() {
      this.catalogueState.productDetail = false;
      this.catalogueState.purchaseInfo = false;
      this.catalogueState.saleInfo = true;
      this.catalogueState.inventoryInfo = false;

      this.salesDisableState = false;
    },

    toggleSalesInfoView() {
      this.catalogueState.productDetail = false;
      this.catalogueState.purchaseInfo = false;
      this.catalogueState.saleInfo = true;
      this.catalogueState.inventoryInfo = false;

      this.salesDisableState = true;
    },

    toggleInventoryInfoEdit() {
      this.catalogueState.productDetail = false;
      this.catalogueState.purchaseInfo = false;
      this.catalogueState.salesInfo = false;
      this.catalogueState.inventoryInfo = true;
    },

    preventLetterE(evt) {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }

      this.assignPurchaseUnit();
    },

    addTaxRate() {
      this.taxes.push({
        name: "Enter Name",
        label: "Enter Label",
        amount: "Enter Rate",
      });
    },

    deleteTaxItemRate(val) {
      this.taxes.splice(val, 1);
    },

    checkedInvoiceBased() {
      this.itemBase.isSelected = false;
      this.itemBase.options = {
        taxInclusive: false,
        taxExclusive: false,
        hybridTax: false,
      };
    },

    checkedItemBased() {
      this.invoiceBase.isSelected = false;
      this.invoiceBase.options = {
        taxInclusive: false,
        taxExclusive: false,
        hybridTax: false,
      };
    },

    // disable multiple check invoice based
    invoiceBaseSetup(val) {
      let taxPolicy = val;
      switch (taxPolicy) {
        case "exclusive":
          this.invoiceBase.options = {
            taxInclusive: false,
            taxExclusive: true,
            hybridTax: false,
          };
          break;
        case "inclusive":
          this.invoiceBase.options = {
            taxInclusive: true,
            taxExclusive: false,
            hybridTax: false,
          };
          break;
      }
    },

    // disable multiple check item based
    itemBaseSetup(val) {
      let taxPolicy = val;
      switch (taxPolicy) {
        case "exclusive":
          this.itemBase.options = {
            taxInclusive: false,
            taxExclusive: true,
            hybridTax: false,
          };
          break;
        case "inclusive":
          this.itemBase.options = {
            taxInclusive: true,
            taxExclusive: false,
            hybridTax: false,
          };
          break;
        case "both":
          this.itemBase.options = {
            taxInclusive: false,
            taxExclusive: false,
            hybridTax: true,
          };
          break;
      }
    },

    // Calculation for global discount and markup setting
    calDiscountMarkupSetting() {
      //  this.setting
      let markupPrice =
        Number(this.setting.price) +
        Number(this.setting.minPercentageMarkup / 100) *
          Number(this.setting.price);

      console.log(markupPrice);

      let discountedPrice =
        Number(markupPrice) -
        markupPrice * Number(this.setting.maxDiscountLimit / 100);
      this.setting.margin = discountedPrice - this.setting.price;

      // this.setting.margin = markupPrice

      //  this.setting.percentMargin =
      this.setting.percentMargin =
        Number(this.setting.margin / this.setting.price) * 100;
    },

    close() {
      this.skuSetupDrawer = false;
      this.taxDrawer = false;
      this.itemDescDrawer = false;
      this.retailDiscDrawer = false;
      this.wholesaleDiscDrawer = false;
    },

    addVariantSuppliers() {
      this.variantSuppliers.push({
        name: "",
        supplierId: null,
        supplierVariantSku: "",
        supplierVariantName: "",
        unitOfPurchase: this.variantSuppliers[0].unitOfPurchase,
        quantityPerUnit: 0,
        pricePerUnit: 0,
        skuPrice: 0,
        unitSupplied: 0,
        percentageSupplied: 0,
        weightedPurchasePrice: 0,
        default: false,
      });
    },

    assignPurchaseUnit() {
      this.variantSuppliers.map((resp) => {
        resp.unitOfPurchase = this.variantSuppliers[0].unitOfPurchase;
        // resp.quantityPerUnit = this.variantSuppliers[0].quantityPerUnit;
      });
    },

    deleteVariantSuppliers(index) {
      this.variantSuppliers.splice(index, 1);
      this.calculateWeightedPurchaseAverage();
    },

    calculateWeightedPurchaseAverage() {
      // get total quantity supplier
      let sumTotalSupplied = 0;
      for (var a = 0; a < this.variantSuppliers.length; a++) {
        sumTotalSupplied =
          Number.parseFloat(sumTotalSupplied) +
          Number.parseFloat(this.variantSuppliers[a].quantityPerUnit);
      }
      let newTotal = Number.parseFloat(sumTotalSupplied);

      this.variantSuppliers = this.variantSuppliers.map((resp) => {
        return {
          name: resp.name,
          supplierId: resp.supplierId,
          supplierVariantSku: resp.supplierVariantSku,
          supplierVariantName: resp.supplierVariantName,
          unitOfPurchase: resp.unitOfPurchase,
          quantityPerUnit: resp.quantityPerUnit,
          pricePerUnit: resp.pricePerUnit,
          unitSupplied: resp.unitSupplied,
          skuPrice: this.calcSkuPrice(
            resp.pricePerUnit,
            this.unitsOfMeasure.unitOfPurchaseConversionFactor
          ),
          percentageSupplied: this.calcPercentage(
            resp.quantityPerUnit,
            newTotal
          ),
          weightedPurchasePrice: this.calcWeightedPurchasePrice(
            resp.skuPrice,
            resp.percentageSupplied
          ),
          default: resp.default,
        };
      });

      // this have to optimized this for delete action
      this.variantSuppliers = this.variantSuppliers.map((resp) => {
        return {
          name: resp.name,
          supplierId: resp.supplierId,
          supplierVariantSku: resp.supplierVariantSku,
          supplierVariantName: resp.supplierVariantName,
          unitOfPurchase: resp.unitOfPurchase,
          quantityPerUnit: resp.quantityPerUnit,
          pricePerUnit: resp.pricePerUnit,
          unitSupplied: resp.unitSupplied,
          skuPrice: this.calcSkuPrice(
            resp.pricePerUnit,
            this.unitsOfMeasure.unitOfPurchaseConversionFactor
          ),
          percentageSupplied: this.calcPercentage(
            resp.quantityPerUnit,
            newTotal
          ),
          weightedPurchasePrice: this.calcWeightedPurchasePrice(
            resp.skuPrice,
            resp.percentageSupplied
          ),
          default: resp.default,
        };
      });
    },

    calcSkuPrice(price, unit) {
      let skuPrice = Number.parseFloat(price) / Number.parseFloat(unit);
      return skuPrice.toFixed(2);
    },

    calcPercentage(qty, total) {
      // console.log(qty, total)
      let percentage =
        (Number.parseFloat(qty) / Number.parseFloat(total)) * 100;
      // console.log(percentage , 'this is the percentage')
      return percentage.toFixed(2);
    },

    calcWeightedPurchasePrice(skuPrice, percentageSupplied) {
      let weightedPrice =
        (Number.parseFloat(skuPrice) * Number.parseFloat(percentageSupplied)) /
        100;
      return weightedPrice.toFixed(2);
    },

    calculateRetailSaleInfo() {
      this.retailPriceBooks.map((resp) => {
        resp.recommendedRetailPrice = this.calculateRecommendedPrice(
          resp.unitPurchasePrice,
          this.variant.retailMaximumSalesMarkup
        );
        resp.saleMarginAmount = this.calculateMarginAmount(
          resp.recommendedRetailPrice,
          resp.unitPurchasePrice
        );
        resp.saleMarginPercentage = this.calculateSalesMarginPercent(
          this.variant.retailMaximumSalesMarkup
        );
        resp.discountedRetailPrice = this.calDiscountedPrice(
          resp.recommendedRetailPrice,
          this.variant.retailDiscountLimit
        );
        resp.discountedSaleMarginAmount = this.calDiscountMarginAmount(
          resp.discountedRetailPrice,
          resp.unitPurchasePrice
        );
        resp.discountedSaleMarginPercentage = this.calcSalesMarginPercentage(
          resp.discountedSaleMarginAmount,
          resp.discountedRetailPrice
        );
      });
    },

    calculateWholesaleInfo() {
      this.wholesalePriceBooks.map((resp) => {
        resp.recommendedWholesalePrice = this.calculateRecommendedPrice(
          resp.unitPurchasePrice,
          this.variant.wholesaleMaximumSalesMarkup
        );
        resp.saleMarginAmount = this.calculateMarginAmount(
          resp.recommendedWholesalePrice,
          resp.unitPurchasePrice
        );
        resp.saleMarginPercentage = this.calculateSalesMarginPercent(
          this.variant.wholesaleMaximumSalesMarkup
        );
        resp.discountedWholesalePrice = this.calDiscountedPrice(
          resp.recommendedWholesalePrice,
          this.variant.wholesaleDiscountLimit
        );
        resp.discountedSaleMarginAmount = this.calDiscountMarginAmount(
          resp.discountedWholesalePrice,
          resp.unitPurchasePrice
        );
        resp.discountedSaleMarginPercentage = this.calcSalesMarginPercentage(
          resp.discountedSaleMarginAmount,
          resp.discountedWholesalePrice
        );
      });
    },

    calSaleRetailInfo(val) {
      val.recommendedRetailPrice = this.calculateRecommendedPrice(
        val.unitPurchasePrice,
        this.variant.retailMaximumSalesMarkup
      );
      val.saleMarginAmount = this.calculateMarginAmount(
        val.recommendedRetailPrice,
        val.unitPurchasePrice
      );
      val.saleMarginPercentage = this.calculateSalesMarginPercent(
        this.variant.retailMaximumSalesMarkup
      );
      val.discountedRetailPrice = this.calDiscountedPrice(
        val.recommendedRetailPrice,
        this.variant.retailDiscountLimit
      );
      val.discountedSaleMarginAmount = this.calDiscountMarginAmount(
        val.discountedRetailPrice,
        val.unitPurchasePrice
      );
      val.discountedSaleMarginPercentage = this.calcSalesMarginPercentage(
        val.discountedSaleMarginAmount,
        val.discountedRetailPrice
      );
    },

    calSaleWholeSaleInfo(val) {
      val.recommendedWholesalePrice = this.calculateRecommendedPrice(
        val.unitPurchasePrice,
        this.variant.wholesaleMaximumSalesMarkup
      );
      val.saleMarginAmount = this.calculateMarginAmount(
        val.recommendedWholesalePrice,
        val.unitPurchasePrice
      );
      val.saleMarginPercentage = this.calculateSalesMarginPercent(
        this.variant.wholesaleMaximumSalesMarkup
      );
      val.discountedWholesalePrice = this.calDiscountedPrice(
        val.recommendedWholesalePrice,
        this.variant.wholesaleDiscountLimit
      );
      val.discountedSaleMarginAmount = this.calDiscountMarginAmount(
        val.discountedWholesalePrice,
        val.unitPurchasePrice
      );
      val.discountedSaleMarginPercentage = this.calcSalesMarginPercentage(
        val.discountedSaleMarginAmount,
        val.discountedWholesalePrice
      );
    },

    calculateRecommendedPrice(purchasePrice, maxSalesMarkup) {
      const recommendedPrice =
        Number.parseFloat(purchasePrice) *
        (1 + Number.parseFloat(maxSalesMarkup) / 100);
      return recommendedPrice.toFixed(2);
    },

    calculateMarginAmount(recommendedPrice, purchasePrice) {
      const salesMarginAmount =
        Number.parseFloat(recommendedPrice) - Number.parseFloat(purchasePrice);
      console.log(salesMarginAmount);
      return salesMarginAmount.toFixed(2);
    },

    calculateSalesMarginPercent(val) {
      return Number.parseFloat(val).toFixed(2);
    },

    calDiscountedPrice(recommendedPrice, discount) {
      const discountPrice =
        Number.parseFloat(recommendedPrice) *
        (1 - Number.parseFloat(discount) / 100);
      return discountPrice.toFixed(2);
    },

    calDiscountMarginAmount(discPrice, price) {
      const discountedSaleMarginAmount =
        Number.parseFloat(discPrice) - Number.parseFloat(price);
      return discountedSaleMarginAmount.toFixed(2);
    },

    calcSalesMarginPercentage(saleMarginAmount, price) {
      const recommendedPricediscountedSaleMarginPercentage =
        (Number.parseFloat(saleMarginAmount) / Number.parseFloat(price)) * 100;
      return recommendedPricediscountedSaleMarginPercentage.toFixed(2);
    },

    changeSaleRetailUnitPurchasePrice() {
      let changeUnitPurchasePrice =
        this.variant.retailUsePurchasePriceReference;
      // console.log(changeUnitPurchasePrice);
      switch (changeUnitPurchasePrice) {
        case "weightedAverage":
          this.retailPriceBooks.map((resp) => {
            resp.unitPurchasePrice =
              Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit) || 0;
            resp.recommendedRetailPrice = this.calculateRecommendedPrice(
              resp.unitPurchasePrice,
              this.variant.retailMaximumSalesMarkup
            );
            resp.saleMarginAmount = this.calculateMarginAmount(
              resp.recommendedRetailPrice,
              resp.unitPurchasePrice
            );
            resp.saleMarginPercentage = this.calculateSalesMarginPercent(
              this.variant.retailMaximumSalesMarkup
            );
            resp.discountedRetailPrice = this.calDiscountedPrice(
              resp.recommendedRetailPrice,
              this.variant.retailDiscountLimit
            );
            resp.discountedSaleMarginAmount = this.calDiscountMarginAmount(
              resp.discountedRetailPrice,
              resp.unitPurchasePrice
            );
            resp.discountedSaleMarginPercentage =
              this.calcSalesMarginPercentage(
                resp.discountedSaleMarginAmount,
                resp.unitPurchasePrice
              );
          });
          break;

        // eslint-disable-next-line no-case-declarations
        case "defaultSupplier":
          // let supplierPricePerItem =  Number.parseFloat(this.selectedSupplier.pricePerUnit) / Number.parseFloat(this.selectedSupplier.quantityPerUnit);
          // this.retailPriceBooks.map((resp) => {
          //   this.variant.defaultSupplierPricePerItem = Number.parseFloat(supplierPricePerItem );
          //   resp.unitPurchasePrice = Number.parseFloat(supplierPricePerItem) * Number.parseFloat(resp.quantityPerUnit) || 0;
          //   resp.recommendedRetailPrice = Number.parseFloat(resp.unitPurchasePrice) * (1 + Number.parseFloat(this.variant.retailMaximumSalesMarkup) / 100);
          //   resp.saleMarginAmount = Number.parseFloat(resp.recommendedRetailPrice) - Number.parseFloat(resp.unitPurchasePrice);
          //   resp.saleMarginPercentage = this.variant.retailMaximumSalesMarkup;
          //   resp.discountedRetailPrice =Number.parseFloat(resp.recommendedRetailPrice) * (1 - Number.parseFloat(this.variant.retailDiscountLimit) / 100);
          //   resp.discountedSaleMarginAmount = Number.parseFloat(resp.discountedRetailPrice) - Number.parseFloat(resp.unitPurchasePrice);
          //   resp.discountedSaleMarginPercentage = (Number.parseFloat(resp.discountedSaleMarginAmount) /Number.parseFloat(resp.unitPurchasePrice)) * 100;
          // });
          break;
        default:
          break;
      }
    },

    changeSaleWholeUnitPurchasePrice() {
      let changeUnitPurchasePrice =
        this.variant.wholesaleUsePurchasePriceReference;
      switch (changeUnitPurchasePrice) {
        case "weightedAverage":
          this.wholesalePriceBooks.map((resp) => {
            resp.unitPurchasePrice =
              Number.parseFloat(this.variant.weightedAveragePricePerItem) *
                Number.parseFloat(resp.quantityPerUnit) || 0;

            resp.recommendedWholesalePrice = this.calculateRecommendedPrice(
              resp.unitPurchasePrice,
              this.variant.wholesaleMaximumSalesMarkup
            );
            resp.saleMarginAmount = this.calculateMarginAmount(
              resp.recommendedWholesalePrice,
              resp.unitPurchasePrice
            );
            resp.saleMarginPercentage = this.calculateSalesMarginPercent(
              this.variant.wholesaleMaximumSalesMarkup
            );
            resp.discountedWholesalePrice = this.calDiscountedPrice(
              resp.recommendedWholesalePrice,
              this.variant.wholesaleDiscountLimit
            );
            resp.discountedSaleMarginAmount = this.calDiscountMarginAmount(
              resp.discountedWholesalePrice,
              resp.unitPurchasePrice
            );
            resp.discountedSaleMarginPercentage =
              this.calcSalesMarginPercentage(
                resp.discountedSaleMarginAmount,
                resp.unitPurchasePrice
              );
          });
          break;

        case "defaultSupplier":
          // this.wholesalePriceBooks.map((resp) => {
          //   resp.unitPurchasePrice = (Number.parseFloat(this.selectedSupplier.pricePerUnit) /  Number.parseFloat(this.selectedSupplier.quantityPerUnit)) *  Number.parseFloat(resp.quantityPerUnit) || 0;
          //   resp.recommendedWholesalePrice =  Number.parseFloat(resp.unitPurchasePrice) *  (1 + Number.parseFloat(this.variant.wholesaleMaximumSalesMarkup) / 100);
          //   resp.saleMarginAmount =  Number.parseFloat(resp.recommendedWholesalePrice) - Number.parseFloat(resp.unitPurchasePrice);
          //   resp.saleMarginPercentage = this.variant.wholesaleMaximumSalesMarkup;
          //   resp.discountedWholesalePrice = Number.parseFloat(resp.recommendedWholesalePrice) * (1 - Number.parseFloat(this.variant.wholesaleDiscountLimit) / 100);
          //   resp.discountedSaleMarginAmount = Number.parseFloat(resp.discountedWholesalePrice) - Number.parseFloat(resp.unitPurchasePrice);
          //   resp.discountedSaleMarginPercentage = (Number.parseFloat(resp.discountedSaleMarginAmount) /  Number.parseFloat(resp.unitPurchasePrice)) * 100;
          // });
          break;
        default:
          break;
      }
    },

    saveSupplier() {
      let userAuth = this.$store.state.auth.auth.authData;
      userAuth.outletId = userAuth.orgId;
      const dataPayload = {
        userInfo: {
          ...userAuth,
        },
        payload: {
          ...this.network,
        },
      };
      this.$store
        .dispatch("crm/contact/createNewContact", dataPayload)
        .then((resp) => {
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "success",
            position: "top-right",
          });
          this.supplierModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: err.respond.data.message,
            color: "danger",
            position: "top-right",
          });
          // this.supplierModal = false
        });
    },

    reset() {
      this.invoiceBase = {
        isSelected: false,
        options: {
          taxExclusive: false,
          taxInclusive: false,
        },
      };

      this.itemBase = {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
          hybridTax: false,
        },
      };
    },

    async saveTaxPolicy() {
      try {
        this.isSubmitting = true;

        this[this.taxPolicyType]["isSelected"] = true;
        this[this.taxPolicyType]["options"][this.currentTaxPolicy] = true;

        const { authData } = this.$store.state.auth.auth;

        const dataPayload = {
          userInfo: authData,
          payload: {
            country: this.country,
            state: this.state,
            city: this.city,
            taxPolicy: {
              invoiceBase: this.invoiceBase,
              itemBase: this.itemBase,
            },
            taxes: this.taxes,
          },
        };

        const { data } = await this.$store.dispatch(
          "catalogue/tax/createTaxPolicy",
          dataPayload
        );

        this.isSubmitting = false;
        this.getOutletVatCreated();
        this.taxDrawer = false;

        this.reset();
        this.$vs.notify({
          title: "Tax",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
        this.getOutletVatCreated();
        this.taxDrawer = false;
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Tax",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    saveItemCategory() {
      this.categoryButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      const data = {
        userInfo: userInfo,
        payload: {
          name: this.newCategoryName,
          brandIds: [this.brandIds],
        },
      };
      this.$store
        .dispatch("catalogue/createItemCategory", data)
        .then((resp) => {
          console.log(resp.data);
          this.modalCategory = false;
          this.categoryButton = false;
          this.$vs.notify({
            title: "Successfully",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
          this.newCategoryName = "";
          this.brandIds = "";
        })
        .catch((err) => {
          this.categoryButton = false;
          this.$vs.notify({
            title: "Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
        });
    },

    saveBrand() {
      this.brandButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      const data = {
        userInfo: userInfo,
        payload: {
          name: this.newBrandName,
          categoryIds: [this.categoryIds],
        },
      };
      this.$store
        .dispatch("catalogue/createBrand", data)
        .then((resp) => {
          this.modalBrand = false;
          this.brandButton = false;
          this.$vs.notify({
            title: "Brand",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
          this.newBrandName = "";
          this.categoryIds = "";
        })
        .catch((err) => {
          this.brandButton = false;
          this.$vs.notify({
            title: "Error",
            position: "top-right",
            color: "danger",
            text: err.response.data.message,
            fixed: false,
          });
          console.log(err);
        });
    },

    autoGenerateSKU() {
      // let data = {
      //   userInfo: this.$store.state.auth.auth.authData,
      //   payload: {
      //     moduleName: "sku",
      //     productName: this.itemInfo.name,
      //     yearOfBirth: null,
      //     contactName: null,
      //   },
      // };

      // this.$store
      //   .dispatch("catalogue/getGenerateSkuCode", data)
      //   .then((resp) => {
      //     this.itemInfo.sku = resp.data.code;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // this.itemInfo.name.trim();
      // this.itemInfo.sku = this.itemInfo.name.replace(/[aeiou,' ']/gi, "").toUpperCase() +"-" +("" + Math.random()).substring(2, 5);
      // console.log(this.variantValue);

      let variants = this.variantValue.map((variant) => {
        return variant.value;
      });
      this.variant.variantCode = variants
        .toString()
        .replace(/[aeiou,]/gi, "")
        .toUpperCase();
      this.variant.variantSku =
        this.itemInfo.sku + "-" + this.variant.variantCode;
      this.variant.variantName = `${this.itemInfo.name}-(${variants})`;
      // inventory
      this.inventory.variantHash = this.variant.variantCode;
      this.inventory.variantCode = this.variant.variantCode;
    },

    autogenerateVariantCode() {
      // console.log(this.variantValue);
      let variants = this.variantValue[0].value;
      // console.log(variants);
      // .map(variant => {
      //   return variant.value;
      // });
      this.variant.variantCode = variants
        .toString()
        .replace(/[aeiou,]/gi, "")
        .toUpperCase();
      this.variant.variantSku =
        this.itemInfo.sku + "-" + this.variant.variantCode;
      this.variant.variantName = `${this.itemInfo.name}-(${variants})`;

      // Inventory
      this.inventory.variantHash = this.variant.variantCode;
      this.inventory.variantCode = this.variant.variantSku;
    },

    // Discount Section
    saveRetailDiscountRate() {
      this.disableButton = true;
      this.retailModal = true;
      let userInfo = this.$store.state.auth.auth.authData;
      userInfo.outletIds = this.outletIds;

      let data = {
        userInfo: userInfo,
        payload: {
          setting: this.setting,
        },
      };
      this.$store
        .dispatch("catalogue/discount/createRetailDiscount", data)
        .then((resp) => {
          // console.log(resp.data)

          if (resp.data) {
            this.disableButton = false;
            this.$store
              .dispatch("catalogue/discount/getRetailDiscount")
              .then((resp) => {
                // console.log(resp.data)
                this.variant.retailDiscountLimit =
                  resp.data.setting.maxDiscountLimit || "0";
                this.variant.retailMaximumSalesMarkup =
                  resp.data.setting.minPercentageMarkup || "0";
                this.calculateRetailSaleInfo();
                this.$vs.notify({
                  title: "Setup",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
                // this.retailDiscDrawer = false;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Setup",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    saveWholesaleDiscountRate() {
      this.disableButton = true;
      let userInfo = this.$store.state.auth.auth.authData;
      userInfo.outletIds = this.outletIds;

      let data = {
        userInfo: userInfo,
        payload: {
          setting: this.setting,
        },
      };
      this.$store
        .dispatch("catalogue/discount/createWholesaleDiscount", data)
        .then((resp) => {
          if (resp.data) {
            this.disableButton = false;
            this.$store
              .dispatch("catalogue/discount/getWholesaleDiscount")
              .then((resp) => {
                this.variant.wholesaleDiscountLimit =
                  resp.data.setting.maxDiscountLimit || "0";
                this.variant.wholesaleMaximumSalesMarkup =
                  resp.data.setting.minPercentageMarkup || "0";
                this.calculateWholesaleInfo();
                this.$vs.notify({
                  title: "Setup",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
                // this.wholesaleDiscDrawer = false;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Setup",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    // save item characteristics..
    saveItemCharacteristics() {
      this.setupModal = true;
      let data = {
        userInfo: this.$store.state.auth.auth.authData,
        payload: {
          characteristic: this.itemVariantSetting.key,
          value: this.itemVariantSetting.value,
        },
      };

      this.itemDescButton = true;

      // this.$store.dispatch("catalogue/itemCharacteristics/createItemCharacteristics", data)

      // this.$validator.validateAll().then((resp) => {
      // if (resp) {
      this.setupModal = true;
      this.itemDescButton = true;

      this.variantValue[0].key = this.itemVariantSetting.key;
      this.itemCharacteristicsValue = [this.itemVariantSetting.value];
      this.variantValue[0].value = this.itemVariantSetting.value;

      this.$store
        .dispatch(
          "catalogue/itemCharacteristics/createItemCharacteristics",
          data
        )
        .then((resp) => {
          this.$vs.notify({
            title: "Item Characteristic",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.itemDescDrawer = false;
          this.setupModal = false;
          this.itemDescButton = false;

          // this.variantValue[0].key = this.itemVariantSetting.key;
          // this.variantValue[0].value = this.itemVariantSetting.value;

          this.variantValue[0].key = "";
          this.variantValue[0].value = "";

          (this.itemVariantSetting.key = ""),
            (this.itemVariantSetting.value = "");
        })

        .catch((err) => {
          console.log(err);
          this.itemDescButton = false;
          this.setupModal = false;
          this.$vs.notify({
            title: "Item Characteristic",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
      // } else {
      // this.itemDescButton = false;
      // this.setupModal = false;
      // }
      // });
    },

    //set sku code setting

    resetValues(obj) {
      this[obj].typeFormat = "";
    },

    saveSkuCode() {
      this.isSubmitting = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let dataPayload = {
        userInfo: userInfo,
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
      this.$store
        .dispatch("catalogue/createSkuCode", dataPayload)
        .then((resp) => {
          this.isSubmitting = false;
          if (resp.data) {
            // console.log(resp.data)
            let data = {
              userInfo: userInfo,
              payload: {
                moduleName: "SKU",
                yearOfBirth: null,
                contactName: null,
                productName: this.itemInfo.name || "example",
              },
            };

            this.$store
              .dispatch("catalogue/getGenerateSkuCode", data)
              .then((resp) => {
                this.previewFormat = resp.data.code;
                this.itemInfo.sku = resp.data.code;

                // this.variant.
                this.$vs.loading.close(
                  "#div-with-loading-preview > .con-vs-loading"
                );
                this.$vs.notify({
                  title: "SKU Code",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
          }
        })
        .catch((err) => {
          this.isSubmitting = false;
          this.$vs.notify({
            title: "SKU Code",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    getVariantValueKey() {
      let itemCharacteristics = this.variantValue[0].key;
      let filterValue = this.getItemCharacteristic.filter((resp) => {
        if (resp.characteristic === itemCharacteristics) {
          return resp.value;
        }
      });
      this.itemCharacteristicsValue = filterValue;
    },

    async getOutletVatCreated() {
      const { data } = await this.$store.dispatch("catalogue/tax/getOutletVat");
      // console.log(data, "This is the outlet output");
      this.outletVat = data;
      // console.log(this.outletVat);
    },

    //This is discount section modal
    markedUpPrice() {
      return (
        this.setting.price * (this.setting.minPercentageMarkup / 100) +
        this.setting.price
      );
    },

    discountedPrice() {
      return (1 - this.setting.maxDiscountLimit / 100) * this.markedUpPrice();
    },

    marginAtMaxDiscount() {
      this.setting.margin = this.discountedPrice() - this.setting.price;
    },

    percentageMarginAtMaxDiscount() {
      let num = (this.setting.margin / this.discountedPrice()) * 100;
      this.setting.percentMargin = this.roundNumber(num, 1) || 0;
    },

    roundNumber(value, precision) {
      const multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    },

    handleCalculation() {
      this.marginAtMaxDiscount();
      this.percentageMarginAtMaxDiscount();
    },

    async fetchMarkupAndMargin() {
      try {
        if (this.markupAndMarginType === "retail") {
          const { data } = await this.$store.dispatch(
            "catalogue/discount/getRetailDiscount"
          );
          if (Object.keys({ ...data.setting }).length === 0) {
            this.setting = this.setting;
          } else {
            this.setting = { ...data.setting };
          }
        } else {
          const { data } = await this.$store.dispatch(
            "catalogue/discount/getWholesaleDiscount"
          );

          if (Object.keys({ ...data.setting }).length === 0) {
            this.setting = this.setting;
          } else {
            this.setting = { ...data.setting };
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateMarkupAndMargin() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;
        const newUserInfo = {
          orgId: userInfo.orgId,
          outletId: userInfo.outletId,
          creatorId: userInfo.creatorId,
          outletIds: [userInfo.outletId],
        };
        const payload = {
          userInfo: newUserInfo,
          payload: {
            setting: this.setting,
          },
        };

        let response;

        this.isSubmitting = true;

        if (this.markupAndMarginType === "retail") {
          const { data } = await this.$store.dispatch(
            "catalogue/discount/createRetailDiscount",
            payload
          );
          response = data;
          this.variant.retailDiscountLimit = this.setting.maxDiscountLimit;
          this.variant.retailMaximumSalesMarkup =
            this.setting.minPercentageMarkup;
        } else {
          const { data } = await this.$store.dispatch(
            "catalogue/discount/createWholesaleDiscount",
            payload
          );
          response = data;
          this.variant.wholesaleDiscountLimit = this.setting.maxDiscountLimit;
          this.variant.wholesaleMaximumSalesMarkup =
            this.setting.minPercentageMarkup;
        }
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Markup And Margin",
          text: response.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  computed: {
    ...mapGetters("catalogue", [
      "getallBrand",
      "getIsSkuSetup",
      "getallItemCategory",
      "getIsDiscountSetup",
      "getDiscountRate",
      "getOrgDiscountMarkup",
    ]),
    ...mapGetters("catalogue/tax", [
      "getIsCreatedTax",
      "getOutletTax",
      "getIsOutletTaxSetup",
    ]),
    ...mapGetters("catalogue/itemCharacteristics", [
      "getIsItemCharacteristicsCreated",
      "getItemCharacteristic",
    ]),

    ...mapGetters("catalogue/discount", [
      "getIsRetailDiscountSetup",
      "getIsWholesaleDiscountSetup",
    ]),
    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("userOutlet", [
      "getOutlets",
      "getIsOutletCreated",
      "getAllOrganisationLocation",
      "getOptimaUsers",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseCataloguePrivileges",
      "getSalesCataloguePrivileges",
    ]),

    calTotalSupplierWeightedAvgSkuPrice() {
      let total = 0;
      for (var a = 0; a < this.variantSuppliers.length; a++) {
        total =
          total +
          Number.parseFloat(this.variantSuppliers[a].weightedPurchasePrice);
      }
      let newTotal = total;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.variant.weightedAveragePriceItem = newTotal.toFixed(2);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.variant.weightedAveragePricePerItem = newTotal.toFixed(2);
      return newTotal.toFixed(2);
    },

    calTotalSuppliedPercentage() {
      let total = 0;
      for (var a = 0; a < this.variantSuppliers.length; a++) {
        total =
          total +
          Number.parseFloat(this.variantSuppliers[a].percentageSupplied);
      }
      let newTotal = total;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.variant.totalPercentSupplied =
        Number.parseFloat(newTotal).toFixed(2);
      return this.variant.totalPercentSupplied;
    },

    calTotalSuppliedQuantity() {
      let total = 0;
      for (var a = 0; a < this.variantSuppliers.length; a++) {
        total =
          total + Number.parseFloat(this.variantSuppliers[a].quantityPerUnit);
      }
      let newTotal = total;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.variant.totalQuantitySupplied = newTotal.toFixed(2);
      return newTotal.toFixed(2);
    },

    // eslint-disable-next-line vue/return-in-computed-property
    displayAveragePurchaseItem() {
      // eslint-disable-next-line no-cond-assign
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // eslint-disable-next-line no-cond-assign
      if (this.variant.retailUsePurchasePriceReference === "weightedAverage") {
        return this.variant.weightedAveragePricePerItem;
        // eslint-disable-next-line no-cond-assign
      } else if (
        this.variant.retailUsePurchasePriceReference === "defaultSupplier"
      ) {
        return this.variant.defaultSupplierPricePerItem;
      }
    },

    displayAveragePurchaseItemWholesale() {
      // eslint-disable-next-line no-cond-assign
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // eslint-disable-next-line no-cond-assign
      if (
        this.variant.wholesaleUsePurchasePriceReference === "weightedAverage"
      ) {
        return this.variant.weightedAveragePricePerItem;
        // eslint-disable-next-line no-cond-assign
      } else if (
        this.variant.wholesaleUsePurchasePriceReference === "defaultSupplier"
      ) {
        return this.variant.defaultSupplierPricePerItem;
      }
    },

    // eslint-disable-next-line vue/return-in-computed-property
    getOutletCountry() {
      // console.log(this.getAllOrganisationLocation, " we are now");
      let country = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.country;
      });
      return [...new Set(country)];
    },

    getOutletState() {
      let state = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.state;
      });
      return [...new Set(state)];
    },

    getOutletCity() {
      let city = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.city;
      });
      return [...new Set(city)];
    },

    getVariantValue() {
      let value = this.getItemCharacteristic.map((resp) => {
        return resp.value;
      });
      return [...new Set(value)];
    },

    getVariantCharacteristics() {
      let characteristics = this.getItemCharacteristic.map((resp) => {
        return resp.characteristic;
      });
      return [...new Set(characteristics)];
    },
  },

  watch: {
    variantConfig: function () {
      let variants = this.variantConfig.map((variant) => {
        return variant.value;
      });

      this.variantValue = variants.toString();
      this.variant.variantCode = variants
        .toString()
        .replace(/[aeiou,]/gi, "")
        .toUpperCase();
      this.variant.variantSku =
        this.itemInfo.sku + "-" + this.variant.variantCode;
      this.variant.variantName = `${this.itemInfo.name} -  (${variants.join(
        "/"
      )})`;

      this.inventory.variantHash = this.variant.variantCode;
      this.inventory.variantCode = this.variant.variantCode;
    },

    markupAndMarginType: {
      immediate: true,
      handler() {
        this.fetchMarkupAndMargin();
      },
    },
  },

  mounted() {
       this.queryInfo = this.$route.query;
    this.itemId = this.queryInfo.itemId;
    this.variantId = this.queryInfo.variantId;
    let userAuth = this.$store.state.auth.auth.authData;
    let userInfo = {
      userInfo: {
        ...userAuth,
      },
    };
    // get item information
    this.$store
      .dispatch("catalogue/getItemInformation", {
        itemId: this.queryInfo.itemId,
      })
      .then((resp) => {
        // TODO: auto detect tax type
        this.itemInfo = resp.data.message[0];
      });
    // This to get item variant information
    this.$store
      .dispatch("catalogue/getItemVariantInformation", this.queryInfo)
      .then((resp) => {
        this.variant = resp.data.message[0];
        this.unitsOfMeasure = resp.data.message[0].itemUnitOfMeasures[0];
        this.variantValue = resp.data.message[0].variantProperty;
        this.itemCharacteristicsValue = [this.variantValue[0]];
      })
      .catch((err) => {
        console.log(err);
      });
    // This to get purchase information
    this.$store
      .dispatch("catalogue/getPurchaseVariantInformation", this.queryInfo)
      .then((resp) => {
        console.log(resp.data, "variant supplier");
        this.variantSuppliers =
          resp.data.responseObject.variantSupplierInformation;
        if (resp.data.responseObject.variantSupplierInformation.length === 0) {
          this.variantSuppliers = [
            {
              name: null,
              supplierId: null,
              supplierVariantSku: "",
              supplierVariantName: "",
              unitOfPurchase: this.unitsOfMeasure.unitOfPurchase,
              quantityPerUnit:
                this.unitsOfMeasure.unitOfPurchaseConversionFactor,
              pricePerUnit: 0,
              percentageSupplied: null,
              skuPrice: 0,
              weightedPurchasePrice: 0,
              default: true,
              unitSupplied: 0,
            },
          ];
        } else {
          this.variantSuppliers =
            resp.data.responseObject.variantSupplierInformation;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // This to get sales and inventory information
    this.$store
      .dispatch("catalogue/getSalesVariantInformation", this.queryInfo)
      .then((resp) => {
        console.log(resp.data, "sale information");
        this.taxType = resp.data.taxType;
        this.selectedTaxes = resp.data.itemTax;
        this.selectedTaxes = this.selectedTaxes.map((res) => {
          return res;
        });
        if (resp.data.variants.length === 0) {
          this.isSaleInfoCreated = false;
          this.isInventoryInfoCreated = false;
        } else {
          this.isSaleInfoCreated = true;
          this.isInventoryInfoCreated = true;
          this.retailPriceBooks = resp.data.variants[0].retailPriceBooks;
          this.wholesalePriceBooks = resp.data.variants[0].wholesalePriceBooks;
          this.inventory = resp.data.variants[0].inventories[0];
          this.selectedTaxes = resp.data.itemTax;
          this.selectedTaxes = this.selectedTaxes.map((res) => {
            return res;
          });
        }
      });
    this.$store.dispatch("catalogue/getAllBrand", userInfo);
    this.$store.dispatch("catalogue/getAllItemCategory", userInfo);
    this.$store.dispatch("catalogue/itemCharacteristics/getItemCharacteristic");
    this.$store.dispatch("crm/contact/getAllSupplierContact");
    this.$store.dispatch("catalogue/tax/getOutletVat").then((resp) => {
      this.outletVat = resp.data;
    });
    this.$store
      .dispatch("catalogue/discount/getRetailDiscount")
      // eslint-disable-next-line no-unused-vars
      .then((resp) => {
        // console.log(resp, "discount section");
        // this.variant.retailDiscountLimit = resp.data.setting.maxDiscountLimit || "0";
        // this.variant.retailMaximumSalesMarkup =resp.data.setting.minPercentageMarkup || "0";
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store
      .dispatch("catalogue/discount/getWholesaleDiscount")
      // eslint-disable-next-line no-unused-vars
      .then((resp) => {
        // this.variant.wholesaleDiscountLimit = resp.data.setting.maxDiscountLimit || "0";
        // this.variant.wholesaleMaximumSalesMarkup = resp.data.setting.minPercentageMarkup || "0";
      })
      .catch((err) => {
        console.log(err);
      });
      this.displayAveragePurchaseItem()
      this.displayAveragePurchaseItemWholesale()
  },

};
</script>

<style lang="css" scoped>
.select {
  border: 1px solid #cccccc;
  border-radius: 2px !important;
}
</style>
