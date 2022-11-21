/* eslint-disable no-console */
<template>
  <div class>
    <back location="Create New Variant" />

    <!-- Modal for Brand Creation-->
    <vs-popup title="Create New Brand" :active.sync="modalBrand">
      <div class="container">
        <div class="form-group row flex items-center mb-5">
          <label for class="col-4 w-1/3 col-form-label text-right">
            <h5>New Brand :</h5>
          </label>
          <div class="col-7 w-1/2">
            <input
              type="text"
              v-model="newBrandName"
              placeholder=" Enter Brand Name"
              class="py-2 px-3 border border-2 border-gray-400 w-full"
              name
              id
            />
          </div>
        </div>

        <div class="form-group row flex items-center mb-8">
          <label for class="col-4 w-1/3 col-form-label text-right">
            <h5>Category :</h5>
          </label>

          <div class="col-7 w-1/2">
            <select
              v-model="categoryIds"
              class="py-2 px-2 border border-2 border-gray-400 w-full"
              name
              id
            >
              <option
                v-for="(category, index) in getallItemCategory"
                :key="index"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            :disabled="brandButton"
            :class="{
              'cursor-not-allowed': brandButton,
              'bg-cloudenly-primary-mid': brandButton,
            }"
            @click="saveBrand"
            type="button"
            class="
              px-10
              py-2
              border-none
              rounded
              bg-cloudenly-primary-main
              cursor-pointer
              text-white text-xl
            "
          >
            Save
          </button>
        </div>
      </div>
    </vs-popup>
    <!--End modal for Brand -->

    <!-- Modal for item category creation -->
    <vs-popup title="Create New Category" :active.sync="modalCategory">
      <div class="container">
        <div class="form-group row flex items-center mb-5">
          <label for class="col-4 w-1/3 col-form-label text-right">
            <h5>Category :</h5>
          </label>
          <div class="col-7 w-1/2">
            <input
              type="text"
              v-model="newCategoryName"
              placeholder=" Enter Category Name"
              class="py-2 px-3 border border-2 border-gray-400 w-full"
              name
              id
            />
          </div>
        </div>

        <div class="form-group row row flex items-center mb-8">
          <label for class="col-4 w-1/3 col-form-label text-right">
            <h5>Brand :</h5>
          </label>
          <div class="col-7 w-1/2">
            <select
              v-model="categoryIds"
              class="py-2 px-3 border border-2 border-gray-400 w-full"
              name
              id
            >
              <option
                v-for="(brand, index) in getallBrand"
                :key="index"
                :value="brand.id"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button
            :disabled="categoryButton"
            :class="{
              'cursor-not-allowed': categoryButton,
              'bg-cloudenly-primary-mid': categoryButton,
            }"
            @click="saveItemCategory"
            type="button"
            class="
              px-10
              py-2
              border-none
              rounded
              bg-cloudenly-primary-main
              cursor-pointer
              text-white text-xl
            "
          >
            Save
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Modal Item Category -->

    <!-- Add New Supplier Modal -->
    <vs-popup title="New Supplier " :active.sync="supplierModal">
      <div>
        <div class="form-group row">
          <label for class="col-4 col-form-label">
            <h5>Name</h5>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="network.name"
              placeholder=" Enter  Name"
              class="form-control"
              name
              id
            />
          </div>
        </div>

        <div class="form-group row">
          <label for class="col-4 col-form-label">
            <h5>Email</h5>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="network.email"
              placeholder=" Enter Email "
              class="form-control"
              name
              id
            />
          </div>
        </div>

        <div class="form-group row">
          <label for class="col-4 col-form-label">
            <h5>Phone Number</h5>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="network.phone"
              placeholder=" Enter Phone Number"
              class="form-control"
              name
              id
            />
          </div>
        </div>

        <div class="form-group row">
          <label for class="col-4 col-form-label">
            <h5>Address</h5>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="network.address"
              placeholder=" Enter Address"
              class="form-control"
              name
              id
            />
          </div>
        </div>

        <div class="flex justify-center">
          <button
            :disabled="saveSupplierButton"
            :class="{
              'cursor-not-allowed': saveSupplierButton,
              'bg-cloudenly-primary-mid': saveSupplierButton,
            }"
            @click="saveSupplier"
            type="button"
            class="
              px-10
              py-2
              border-none
              rounded
              bg-cloudenly-primary-main
              cursor-pointer
              text-white text-xl
            "
          >
            Save
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End supplier section -->

    <!-- Drawer for item characteristics setup -->
    <Drawer v-on:closeDrawer="close" :visible="itemDescDrawer" :size="40">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">
          Define item characteristics
        </p>
      </div>

      <div slot="body">
        <div class="p-5">
          <table class="table w-full">
            <thead class>
              <tr class>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  ITEM CHARACTERISTICS
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  ITEM VALUE
                </th>
              </tr>
            </thead>
            <tbody class>
              <tr>
                <td class="px-6 py-3 whitespace-no-wrap">
                  <input
                    placeholder="eg: Color, Size"
                    class="py-1 px-2 border border-gray-400 rounded"
                    type="text"
                    v-model="itemVariantSetting.key"
                    name
                    id
                  />
                </td>
                <td class="px-6 py-3 whitespace-no-wrap">
                  <input
                    placeholder="eg: Red, Small "
                    class="py-1 px-2 border border-gray-400 rounded"
                    type="text"
                    v-model="itemVariantSetting.value"
                    name
                    id
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-5 flex items-center justify-center">
            <button
              :class="{
                'cursor-pointer': itemDescButton,
                'bg-cloudenly-primary-off': itemDescButton,
              }"
              @click="saveItemCharacteristics"
              class="px-5 py-2 rounded-full bg-primary-optima-color text-white"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </Drawer>

    <!-- Drawer for sku setup -->
    <Drawer v-on:closeDrawer="close" :visible="drawer" :size="50">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Create SKU Format</p>
      </div>

      <div slot="body">
        <div class="p-3 bg-cloudenly-warning-off rounded">
          <p>
            This is a one time process and you can update your SKU format in
            Product Setting
          </p>
        </div>
        <hr />

        <div class="flex items-center mb-5 mt-10">
          <div class="w-1/3 mr-5 text-right">Prefix</div>

          <div class="w-1/3 mr-5">
            <select
              v-model="prefix.type"
              name
              id
              class="py-2 px-2 border border-gray-400 rounded w-full"
            >
              <option value="randomCode">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="currentYear">Current Year</option>
              <option value="productName">Product Name</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="prefix.type === 'randomCode'">
              <select
                v-model="prefix.typeFormat"
                name
                id
                class="py-2 px-2 border border-gray-400 rounded w-full"
              >
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>
            <div v-else-if="prefix.type === 'currentYear'">
              <select
                v-model="prefix.typeFormat"
                name
                class="py-2 px-2 border border-gray-400 rounded w-full"
                id
              >
                <option disabled selected value>Select year format</option>
                <option value="yy">YY</option>
                <option value="yyyy">YYYY</option>
              </select>
            </div>
            <div v-else></div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/3 mr-5 text-right">Base</div>

          <div class="w-1/3 mr-5">
            <select
              v-model="roots.type"
              name
              id
              class="py-2 px-2 border border-gray-400 rounded w-full"
            >
              <option value="randomCode">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="currentYear">Current Year</option>
              <option value="productName">Product Name</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="roots.type === 'randomCode'">
              <select
                v-model="roots.typeFormat"
                name
                id
                class="py-2 px-2 border border-gray-400 rounded w-full"
              >
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>

            <div v-else-if="roots.type === 'currentYear'">
              <select
                v-model="roots.typeFormat"
                name
                class="py-2 px-2 border border-gray-400 rounded w-full"
                id
              >
                <option disabled selected value>Select year format</option>
                <option value="yy">YY</option>
                <option value="yyyy">YYYY</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/3 mr-5 text-right">Suffix</div>

          <div class="w-1/3 mr-5">
            <select
              v-model="suffix.type"
              name
              id
              class="py-2 px-2 border border-gray-400 rounded w-full"
            >
              <option value="randomCode">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="currentYear">Current Year</option>
              <option value="productName">Product Name</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="suffix.type === 'randomCode'">
              <select
                v-model="suffix.typeFormat"
                name
                id
                class="py-2 px-2 border border-gray-400 rounded w-full"
              >
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>

            <div v-else-if="suffix.type === 'currentYear'">
              <select
                v-model="suffix.typeFormat"
                name
                class="py-2 px-2 border border-gray-400 rounded w-full"
                id
              >
                <option disabled selected value>Select year format</option>
                <option value="yy">YY</option>
                <option value="yyyy">YYYY</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/3 mr-2 text-right">Separator</div>

          <div class="w-1/3">
            <select
              v-model="separator.type"
              id
              class="py-2 px-2 border border-gray-400 rounded w-full"
            >
              <option value disabled selected>
                Select preferred Code Separator
              </option>
              <option value="hyphen">Slash</option>
              <option value="slash">Hyphen</option>
            </select>
          </div>

          <div class="w-1/3"></div>
        </div>

        <vs-divider />
        <div class="flex items-center justify-center">
          <div class>
            <button
              :disabled="saveSkuButton"
              :class="{
                'cursor-not-allowed': saveSkuButton,
                'bg-cloudenly-primary-mid': saveSkuButton,
              }"
              @click="saveSkuCode"
              class="
                mr-5
                px-2
                py-3
                border-none
                bg-cloudenly-primary-main
                rounded
                text-white
                cursor-pointer
              "
              type="button"
            >
              Create SKU Format
            </button>

            <button
              class="px-2 py-3 border-none bg-transparent cursor-pointer"
              @click="close"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- Drawer for tax setting -->

    <Drawer v-on:closeDrawer="close" :visible="taxDrawer" :size="50">
      <div slot="title">
        <p class>Tax Setting</p>
      </div>

      <div slot="body">
        <div class="mb-8">
          <div class="border border-gray-400-lighter">
            <div class="p-3 bg-cloudenly-success-mid">
              <p class="m-0">Getting Started with Tax</p>
            </div>
            <p class="p-3 mb-0 text-muted text-sm tracking-wide">
              Every transaction line item you enter into Invoice and quote needs
              a Tax Rate. Tax Rates can have multiple Tax Components. For
              instance, you can have an item that is charged a Tax Rate called
              "City Tax (8%)" that has two components: a city tax of 5% and an
              import tax of 3%.
            </p>
            <p class="pl-3 pb-2 text-cloudenly-primary-main cursor-pointer">
              Learn more here...
            </p>
          </div>
        </div>

        <div class="px-5 py-5 border border-gray-400-light bg-white">
          <div class="p-3">
            <p class="m-0 text-xl">Tax Jurisdiction</p>

            <!-- <div class="flex items-center mt-5">
              <div class="w-1/2">
                <p class="text-xl font-bold">
                  Select Outlet
                  <span class="text-cloudenly-warning-main">*</span>
                </p>
                <select
                  class="py-2 w-2/3"
                  @change="applyOutlet(selectedOutlet)"
                  v-model="selectedOutlet"
                  name
                  id
                >
                  <option
                    v-for="(outlet, index) in getAllOrganisationLocation "
                    :key="index"
                    :value="outlet"
                  >{{outlet.name}}</option>
                </select>
              </div>

              <div>

              </div>
            </div>-->

            <div class="flex items-center mt-5">
              <div class="w-1/2">
                <div class :class="{ error: errors.has('country') }">
                  <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                    >Country</label
                  >
                </div>

                <div class>
                  <select
                    v-model="country"
                    name="country"
                    v-validate="'required'"
                    class="py-1 rounded border border-gray-400 w-2/3"
                    id
                  >
                    <option value disabled selected>Select Country</option>
                    <option
                      v-for="(country, index) in getOutletCountry"
                      :key="index"
                      :value="country"
                    >
                      {{ country | capitalize }}
                    </option>
                  </select>

                  <div
                    class="error text-cloudenly-danger-main"
                    v-if="errors.has('country')"
                  >
                    {{ errors.first("country") }}
                  </div>
                </div>
              </div>

              <div class="w-1/2">
                <div class :class="{ error: errors.has('state') }">
                  <label
                    class="block mb-1 md:mb-0 pr-3 text-xl"
                    for="inline-full-name"
                    >State</label
                  >
                </div>

                <div>
                  <select
                    v-if="country === 'Nigeria'"
                    v-model="state"
                    name="state"
                    v-validate="'required'"
                    class="py-1 rounded border border-solid w-2/3"
                    id
                  >
                    <option value disabled selected>Select State</option>
                    <option
                      v-for="(state, index) in getOutletState"
                      :key="index"
                      :value="state"
                    >
                      {{ state | capitalize }}
                    </option>
                  </select>

                  <input
                    v-else
                    class="py-1 px-2 w-2/3 rounded border border-gray-400"
                    name="state"
                    v-validate="'required'"
                  />
                  <div
                    class="error text-cloudenly-danger-main"
                    v-if="errors.has('state')"
                  >
                    {{ errors.first("state") }}
                  </div>
                </div>

                <div
                  v-show="false"
                  class="md:flex md:items-center items-center"
                >
                  <div class :class="{ error: errors.has('city') }">
                    <label
                      class="block md:text-right mb-1 md:mb-0 pr-3"
                      for="inline-full-name"
                    >
                      Select City
                    </label>
                  </div>
                  <div class="w-1/2">
                    <select
                      v-if="country === 'nigeria'"
                      v-model="city"
                      name="city"
                      v-validate="'required'"
                      class="py-1 rounded border border-gray-400"
                      id
                    >
                      <option
                        v-for="(state, index) in stateList"
                        :key="index"
                        :value="state"
                      >
                        {{ state | capitalize }}
                      </option>
                    </select>

                    <input
                      v-else
                      class="py-1 px-2 rounded border border-gray-400"
                      name="city"
                      v-validate="'required'"
                    />
                    <div
                      class="error text-cloudenly-danger-main"
                      v-if="errors.has('city')"
                    >
                      {{ errors.first("city") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 p-3">
            <p class="m-0 text-xl">Tax Policy</p>

            <div class="mt-5">
              <div class="flex items-center">
                <vs-checkbox
                  @change="checkedInvoiceBased"
                  v-model="invoiceBase.isSelected"
                  >Invoice Based</vs-checkbox
                >
                <vs-checkbox
                  @change="checkedItemBased"
                  v-model="itemBase.isSelected"
                  >Item Based</vs-checkbox
                >
              </div>

              <div v-show="invoiceBase.isSelected">
                <p class="p-1 text-cloudenly-primary-main">
                  Set how you treat your Invoice price items: Price Items could
                  be Tax Exclusive, Inclusive
                </p>
                <div class="flex items-center">
                  <vs-checkbox
                    @change="invoiceBaseSetup('exclusive')"
                    v-model="invoiceBase.options.taxExclusive"
                    >Tax Exclusive</vs-checkbox
                  >
                  <vs-checkbox
                    @change="invoiceBaseSetup('inclusive')"
                    v-model="invoiceBase.options.taxInclusive"
                    >Tax Inclusive</vs-checkbox
                  >
                </div>
              </div>

              <div v-show="itemBase.isSelected">
                <p class="p-1 text-cloudenly-primary-main">
                  Set how you treat your Invoice price items: Price Items could
                  be Tax Exclusive, Inclusive or Both
                </p>

                <div class="flex items-center">
                  <vs-checkbox
                    @change="itemBaseSetup('exclusive')"
                    v-model="itemBase.options.taxExclusive"
                  >
                    Tax Exclusive
                  </vs-checkbox>
                  <vs-checkbox
                    @change="itemBaseSetup('inclusive')"
                    v-model="itemBase.options.taxInclusive"
                  >
                    Tax Inclusive
                  </vs-checkbox>
                  <vs-checkbox
                    @change="itemBaseSetup('both')"
                    v-model="itemBase.options.hybridTax"
                    >Both</vs-checkbox
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="p-3 mt-3">
            <p class="m-0 text-xl">Tax Rate(s)</p>
            <div class="mt-3">
              <table class="table border-collapse w-full">
                <thead class="bg-grey-lighter">
                  <tr class>
                    <th class="py-3">TAX NAME</th>
                    <th class="py-3">INVOICE TAX LABEL</th>
                    <th class="py-3">TAX RATE (%)</th>
                    <th class="py-3">ACTION</th>
                  </tr>
                </thead>
                <tbody class="py-2">
                  <tr v-for="(vat, index) in taxes" :key="index">
                    <td class="py-2 pl-3">
                      <input
                        type="text"
                        class="py-1 px-2 rounded border border-gray-400 w-full"
                        v-model="vat.name"
                      />
                    </td>
                    <td class="py-2 pl-3">
                      <input
                        type="text"
                        class="py-1 px-2 rounded border border-gray-400 w-full"
                        v-model="vat.label"
                      />
                    </td>
                    <td class="py-2 pl-3">
                      <input
                        type="text"
                        class="py-1 px-2 rounded border border-gray-400 w-full"
                        v-model="vat.amount"
                      />
                    </td>
                    <td class="py-2">
                      <feather-icon
                        @click="deleteTaxItemRate(index)"
                        class="
                          pl-2
                          h-6
                          w-6
                          text-cloudenly-danger-main
                          cursor-pointer
                        "
                        icon="Trash2Icon"
                      ></feather-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <a
              @click.prevent="addTaxRate"
              class="flex items-center mt-3"
              href="#"
            >
              <feather-icon
                class="pl-2 mr-1 h-8 w-8"
                icon="PlusCircleIcon"
              ></feather-icon>
              <span class>Add Another</span>
            </a>
          </div>
        </div>

        <div class="flex mt-3 mb-3">
          <div class="mx-auto">
            <div class="flex items-center justify-center">
              <button
                :disabled="saveTaxButton"
                @click="saveTaxPolicy"
                :class="{
                  'cursor-not-allowed': saveTaxButton,
                  'bg-cloudenly-primary-mid': saveTaxButton,
                }"
                class="
                  px-10
                  py-2
                  mr-5
                  bg-cloudenly-primary-main
                  border-none
                  rounded
                  text-white
                  cursor-pointer
                "
              >
                Save
              </button>
              <button
                @click="close"
                class="px-5 py-2 bg-transparent border-none cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>

    <!-- Setup For Global Discount and Market For Retail  -->
    <Drawer v-on:closeDrawer="close" :visible="retailDiscDrawer" :size="50">
      <div slot="title">Define Discount Limit</div>

      <div slot="body">
        <div class="mb-8">
          <div class="border border-gray-400 border-t-0">
            <div class="p-3 border border-gray-400 bg-cloudenly-success-mid">
              <h3 class="m-0">
                Getting Started with Price Margins and Discounts
              </h3>
            </div>
            <p class="p-3 mb-0">
              Setup your Discount Limit and Markup Discount this will help your
              define your profit margin for each item in your catalogue
            </p>
            <p class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer">
              Learn more here...
            </p>
          </div>
        </div>

        <div class="p-5 pl-10">
          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Price</label
              >
            </div>
            <div class="w-1/3">
              <input
                @keyup="calDiscountMarkupSetting"
                v-model="setting.price"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Markup</label
              >
            </div>
            <div class="w-1/3 flex items-center">
              <input
                placeholder="Set Markup Value"
                @keyup="calDiscountMarkupSetting"
                v-model="setting.minPercentageMarkup"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
              <span class="-ml-5">%</span>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Discount Limit</label
              >
            </div>
            <div class="w-1/3">
              <div class="flex items-center">
                <input
                  placeholder="Set Discount Value"
                  @keyup="calDiscountMarkupSetting"
                  v-model="setting.maxDiscountLimit"
                  class="py-2 px-2 border border-gray-400 w-full rounded"
                />
                <span class="-ml-5">%</span>
              </div>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3"></div>
            <div class="w-2/3">
              <p>
                This implies the maximum discount applicable to any item. You
                may, however, adjust individually per item as you deem fit.
              </p>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Margin @ Disc Price</label
              >
            </div>
            <div class="w-1/3 flex items-center">
              <input
                disabled
                @keyup="calDiscountMarkupSetting"
                v-model="setting.margin"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >% Margin</label
              >
            </div>
            <div class="w-1/3">
              <div class="flex items-center">
                <input
                  placeholder="Percentage Margin"
                  disabled
                  v-model="setting.percentMargin"
                  class="
                    py-2
                    px-2
                    border border-solid border-grey
                    w-full
                    rounded
                  "
                />
                <span class="-ml-5">%</span>
              </div>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <!-- <label class="block  mb-1 md:mb-0 pr-3" for="inline-full-name"> % Margin </label> -->
            </div>
            <div class="w-2/3">
              <p>
                This is your margin rate on any item. You may, however, adjust
                individually per item as you deem fit.
              </p>
            </div>
          </div>

          <div class="flex justify-center items-center">
            <button
              type="button"
              :disabled="disableButton"
              :class="{
                'cursor-not-allowed': isDisable,
                'bg-cloudenly-primary-mid': isDisable,
              }"
              @click="saveRetailDiscountRate"
              class="
                cursor-pointer
                outline-none
                bg-cloudenly-primary-main
                p-2
                px-5
                py-2
                text-white
                rounded-lg
                border-0
              "
            >
              Save Discount Setup
            </button>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End Global Discount Setup section -->

    <!-- Setup For Global Discount and Market For Wholesale  -->
    <Drawer v-on:closeDrawer="close" :visible="wholesaleDiscDrawer" :size="50">
      <div slot="title">Define Discount Limit (Wholesale)</div>

      <div slot="body">
        <div class="mb-8">
          <div class="border border-gray-400 border-t-0">
            <div class="p-3 border border-gray-400 bg-cloudenly-success-mid">
              <h3 class="m-0">
                Getting Started with Price Margins and Discounts
              </h3>
            </div>
            <p class="p-3 mb-0">
              Setup your Discount Limit and Markup Discount this will help your
              define your profit margin for each item in your catalogue
            </p>
            <p class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer">
              Learn more here...
            </p>
          </div>
        </div>

        <div class="p-5 pl-10">
          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Price</label
              >
            </div>
            <div class="w-1/3">
              <input
                @keyup="calDiscountMarkupSetting"
                v-model="setting.price"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Markup</label
              >
            </div>
            <div class="w-1/3 flex items-center">
              <input
                placeholder="Set Markup Value"
                @keyup="calDiscountMarkupSetting"
                v-model="setting.minPercentageMarkup"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
              <span class="-ml-5">%</span>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Discount Limit</label
              >
            </div>
            <div class="w-1/3">
              <div class="flex items-center">
                <input
                  placeholder="Set Discount Value"
                  @keyup="calDiscountMarkupSetting"
                  v-model="setting.maxDiscountLimit"
                  class="py-2 px-2 border border-gray-400 w-full rounded"
                />
                <span class="-ml-5">%</span>
              </div>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3"></div>
            <div class="w-2/3">
              <p>
                This implies the maximum discount applicable to any item. You
                may, however, adjust individually per item as you deem fit.
              </p>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >Margin @ Disc Price</label
              >
            </div>
            <div class="w-1/3 flex items-center">
              <input
                disabled
                @keyup="calDiscountMarkupSetting"
                v-model="setting.margin"
                class="py-2 px-2 border border-gray-400 w-full rounded"
              />
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center">
            <div class="w-1/3">
              <label class="block mb-1 md:mb-0 pr-3" for="inline-full-name"
                >% Margin</label
              >
            </div>
            <div class="w-1/3">
              <div class="flex items-center">
                <input
                  placeholder="Percentage Margin"
                  disabled
                  v-model="setting.percentMargin"
                  class="
                    py-2
                    px-2
                    border border-solid border-grey
                    w-full
                    rounded
                  "
                />
                <span class="-ml-5">%</span>
              </div>
            </div>
          </div>

          <div class="md:flex md:items-center flex w-full items-center mb-5">
            <div class="w-1/3">
              <!-- <label class="block  mb-1 md:mb-0 pr-3" for="inline-full-name"> % Margin </label> -->
            </div>
            <div class="w-2/3">
              <p>
                This is your margin rate on any item. You may, however, adjust
                individually per item as you deem fit.
              </p>
            </div>
          </div>

          <div class="flex justify-center items-center">
            <button
              type="button"
              :disabled="disableButton"
              :class="{
                'cursor-not-allowed': isDisable,
                'bg-cloudenly-primary-mid': isDisable,
              }"
              @click="saveWholesaleDiscountRate"
              class="
                cursor-pointer
                outline-none
                bg-cloudenly-primary-main
                p-2
                px-5
                py-2
                text-white
                rounded-lg
                border-0
              "
            >
              Save Discount Setup
            </button>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End Global Discount Setup section -->

    <div
      class="mt-5"
      v-if="
        getIsAccOwner ||
        getPurchaseCataloguePrivileges.createNewItem ||
        getSalesCataloguePrivileges.createNewItem
      "
    >
      <!-- Product Details -->

      <div>
        <section class="py-8 px-10 bg-white rounded">
          <div class="mt-5">
            <p class="font-semibold text-lg">Product Details</p>
          </div>

          <div class="flex mt-5 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="flex items-center" for="inline-full-name">
                  <span class="font-semibold mr-5">Name :</span>
                  <span class="text-danger">*Required</span>
                </label>
              </div>
              <div class>
                <input
                  @blur="autoGenerateSKU"
                  readonly
                  disabled
                  class="
                    py-2
                    px-2
                    rounded
                    border-2 border border-gray-400
                    w-full
                  "
                  placeholder="Item Name"
                  v-model="itemInfo.name"
                />
              </div>
            </div>

            <div class="w-1/3 mr-16">
              <div class>
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <label class="Block" for="inline-full-name">
                      <span class="font-semibold">Brand :</span>
                    </label>
                  </div>
                  <div></div>
                </div>

                <div class>
                  <select
                    v-model="itemInfo.brandId"
                    disabled
                    readonly
                    class="
                      py-2
                      px-2
                      rounded
                      border-2 border border-gray-400
                      w-full
                    "
                    name
                    id
                  >
                    <option
                      v-for="(brand, index) in getallBrand"
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
              <div class="mb-5 flex items-center justify-between">
                <div class>
                  <label class="block" for="inline-full-name">
                    <span class="font-semibold">Category:</span>
                  </label>
                </div>

                <div></div>
              </div>

              <div class>
                <select
                  v-model="itemInfo.categoryId"
                  readonly
                  disabled
                  class="
                    py-2
                    px-2
                    rounded
                    border-2 border border-gray-400
                    w-full
                  "
                  name
                  id
                >
                  <option
                    v-for="(category, index) in getallItemCategory"
                    :key="index"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex mt-10 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="flex items-center" for="inline-full-name">
                  <span class="font-semibold mr-5">Part Number :</span>
                </label>
              </div>
              <div class>
                <input
                  class="py-2 px-2 rounded border-2 border-gray-400 w-full"
                  placeholder="Manufacturer part no."
                  v-model="variant.manufacturerPartNumber"
                />
              </div>
            </div>

            <div class="w-1/3 mr-16">
              <div class>
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <label class="Block" for="inline-full-name">
                      <span class="font-semibold">SKU:</span>
                    </label>
                  </div>
                  <div>
                    <span
                      v-show="!getIsSkuSetup"
                      @click="drawer = true"
                      class="text-cloudenly-primary-main cursor-pointer"
                      >Set up SKU</span
                    >
                  </div>
                </div>

                <div class>
                  <input
                    disabled
                    class="py-2 px-2 rounded border-2 border-gray-400 w-full"
                    placeholder
                    v-model="itemInfo.sku"
                  />
                </div>
              </div>
            </div>

            <div class="w-1/3">
              <div class="mb-5">
                <label class="block" for="inline-full-name">
                  <span class="font-semibold">Bar Code:</span>
                </label>
              </div>

              <div class>
                <input
                  class="py-2 px-2 rounded border-2 border-gray-400 w-full"
                  placeholder
                  v-model="itemInfo.barcode"
                />
              </div>
            </div>
          </div>

          <div class="flex mt-10 mb-5">
            <div class="w-1/3 mr-16">
              <div class="mb-5">
                <label class="flex items-center" for="inline-full-name">
                  <span class="font-semibold mr-5">Description :</span>
                </label>
              </div>
              <div class>
                <textarea
                  @blur="autoGenerateSKU"
                  readonly
                  disabled
                  class="py-2 px-2 rounded border-2 border-gray-400 w-full"
                  placeholder="Item description"
                  v-model="itemInfo.description"
                />
              </div>
            </div>

            <div class="w-1/3 mr-16"></div>

            <div class="w-1/3"></div>
          </div>
        </section>

        <!-- Variant Information Section -->
        <section class="py-8 px-10 mt-5 bg-white rounded">
          <div class="mt-5 flex items-center">
            <p class="font-semibold text-lg mb-1 mr-5">Variant Information</p>
            <p class="font-light text-danger">*Required</p>
          </div>

          <div class="mt-8">
            <table class="table table-fixed w-1/2">
              <thead>
                <tr>
                  <th class="text-md tracking-wider">Image</th>
                  <th class="text-md tracking-wider">
                    Variant Characteristic:
                  </th>
                  <th class="text-md tracking-wider">Variant Value:</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(xter, index) in variantValue" :key="index">
                  <td class="py-3 px-2">
                    <div class="flex items-center">
                      <span>
                        <svg
                          width="55"
                          height="55"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="10"
                            y="6"
                            width="35"
                            height="35"
                            rx="5"
                            fill="#BDBDBD"
                            filter="url(#filter0_d)"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.8 14h15.4c1 0 1.9.8 1.9 1.8v15.4c0 1-.9 1.9-2 1.9H19.9c-1 0-1.9-.9-1.9-2V15.9c0-1 .9-1.9 2-1.9zm0 1.8V27l3.9-3.8 3.3 3.4 6.3-6.3 1.9 2v-6.4H19.8zm0 15.4v-1.6l3.9-3.8 5.3 5.4h-9.2zm15.4 0h-3.5l-3.3-3.4 4.9-4.9 1.9 2v6.3zm-5.8-11.5a2.9 2.9 0 1 0-5.7 0 2.9 2.9 0 0 0 5.7 0zm-3.8 0a1 1 0 1 1 1.9 0 1 1 0 0 1-2 0z"
                            fill="#F3F6F9"
                          />
                          <defs>
                            <filter
                              id="filter0_d"
                              x="0"
                              y="0"
                              width="55"
                              height="55"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="5" />
                              <feColorMatrix
                                values="0 0 0 0 0.0666667 0 0 0 0 0.0823529 0 0 0 0 0.0980392 0 0 0 0.1 0"
                              />
                              <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow"
                              />
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </span>
                      <span>
                        <p class="text-cloudenly-primary-main">Upload</p>
                      </span>
                    </div>
                  </td>

                  <td
                    :class="{ error: errors.has('productDetail.key') }"
                    class="py-3 px-2"
                  >
                    <select
                      @change="getVariantValueKey"
                      v-model="xter.key"
                      class="
                        py-2
                        px-2
                        border border-2
                        rounded
                        border-gray-400
                        w-full
                      "
                      v-validate="'required'"
                      name="key"
                      id
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

                    <div class="mt-4">
                      <span
                        @click="itemDescDrawer = true"
                        class="text-cloudenly-primary-main cursor-pointer"
                      >
                        Create New
                      </span>
                    </div>
                  </td>

                  <td
                    :class="{ error: errors.has('productDetail.value') }"
                    class="py-3"
                  >
                    <select
                      @change="autogenerateVariantCode"
                      v-model="xter.value"
                      class="
                        py-2
                        px-2
                        border border-2 border-gray-400
                        rouded
                        w-full
                      "
                      v-validate="'required'"
                      name="value"
                      id
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

                    <div class="mt-4">
                      <span
                        @click="itemDescDrawer = true"
                        class="text-cloudenly-primary-main cursor-pointer"
                      >
                        Create New
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <hr class="mt-5" />

            <div class="mt-6 flex items-center justify-between">
              <div>
                <div>
                  <span
                    @click="itemDescDrawer = true"
                    class="text-cloudenly-primary-main cursor-pointer"
                    >Create new characteristics</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Variant sync Section -->
        <section class="py-8 px-10 mt-5 bg-white rounded">
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

        <!-- Section for Unit of Measure -->
        <section class="py-8 px-10 mt-5 bg-white rounded">
          <p class="text-danger text-sm">
            *Please ensure you input all Unit of Measure, Purchase, Sales and
            Inventory information before you click the save button
          </p>

          <div class="mt-8">
            <p class="font-semibold text-lg mb-1">Unit of Measure (UoM)</p>
          </div>

          <div class="mt-8">
            <div>
              <table>
                <thead>
                  <tr>
                    <th class="py-3 font-medium"></th>
                    <th class="py-3 px-5 font-medium">Unit Of Measure</th>
                    <th class="py-3 px-5 font-medium">Quantity</th>
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
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        v-validate="'required'"
                        name="standardUom"
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
                          rounded
                          border-2 border-gray-400
                          w-full
                        "
                        type="number"
                        name="UnitConversion"
                        v-validate="'required'"
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
                        This is the measure by which items are maintained in
                        inventory
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
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        name="unitPurchase"
                        v-validate="'required'"
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
                        v-model="unitsOfMeasure.unitOfPurchaseConversionFactor"
                        class="
                          py-2
                          px-2
                          rounded
                          border-2 border-gray-400
                          w-full
                        "
                        type="number"
                        name="unitOfPurchaseConversionFactor"
                        v-validate="'required'"
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
                        How many items of these stock are contained in this
                        unit?
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
                          border border-2 border-gray-400
                          rounded
                          w-full
                        "
                        name="unitSales"
                        v-validate="'required'"
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
                          border border-2 border-gray-400
                          rounded
                          w-full
                        "
                        type="number"
                        v-validate="'required'"
                        name="conversionFactor"
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
                          How many items of these stock are contained in this
                          unit?
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

              <div>
                <!-- <button
                  @click="addSalesInfoUnitOfMeasure"
                  class="inline-flex items-center cursor-pointer text-cloudenly-primary-main"
                >
                  <feather-icon
                    svgClasses="h-6 w-6 mr-1"
                    icon="PlusCircleIcon"
                  ></feather-icon
                  >Add another sales unit
                </button> -->
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <!-- <svg class="fill-current  animate-spin text-cloudenly-primary-main " xmlns="http://www.w3.org/2000/svg" 
                  width="26.3" height="26.4">
                <circle cx="13.8" cy="3.1" r="3.1"/>
                <circle cx="13.8" cy="24.5" r="1.8"/>
                <circle cx="6.2" cy="6.2" r="2.8"/>
                <circle cx="21.4" cy="21.4" r="1.5"/>
                <circle cx="3.1" cy="13.8" r="2.5"/>
                <circle cx="24.5" cy="13.8" r="1.2"/>
                <path d="M4.7 19.8a2.2 2.2 0 1 0 3 3 2.2 2.2 0 0 0-3-3z"/>
                <circle cx="21.4" cy="6.2" r=".9"/>
              </svg> -->

            <button
              @click="saveSubVariantInformation"
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
              @click="toggleNext('purchaseState')"
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
        </section>
        <!-- End variant section -->
      </div>

      <!-- Section for purchase Information -->
      <section
        class="
          py-8
          px-10
          bg-white
          rounded
          border-2 border-l-0 border-r-0 border-b-0 border-gray-500
        "
      >
        <div class="mt-8">
          <p class="font-semibold text-lg mb-1">Purchase Information</p>
        </div>

        <div v-show="catalogueState.purchaseInfo">
          <!-- <div> -->
          <table class="table min-w-full mt-10">
            <thead>
              <tr>
                <th class="py-4 px-3 tracking-wider font-semibold">Default</th>
                <th class="py-4 px-3 tracking-wider font-semibold">Supplier</th>
                <th class="py-4 px-3 tracking-wider font-semibold">UofM</th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  Unit Price (₦)
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  Quantity Supplied
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  SKU Price (NGN)
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  % Supplied
                </th>
                <th class="py-4 px-3 tracking-wider font-semibold">
                  Weighted Av. SKU price (NGN)
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
                  />
                </td>

                <td class="py-2 px-2">
                  <select
                    v-model="supplier.supplierId"
                    name
                    class="w-full rounded border-2 border-gray-400 py-2"
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
                </td>

                <td class="py-2 px-2">
                  <select
                    v-if="index === 0"
                    @change="assignPurchaseUnit"
                    v-model="supplier.unitOfPurchase"
                    name
                    class="w-full rounded border-2 border-gray-400 py-2"
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

                  <select
                    v-else
                    v-model="supplier.unitOfPurchase"
                    name
                    disabled
                    class="w-full rounded border-2 border-gray-400 py-2"
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
                    class="w-full rounded border-2 border-gray-400 py-2 px-2"
                    name
                    id
                  />
                </td>

                <td class="py-2 px-2">
                  <input
                    @keyup="calculateWeightedPurchaseAverage"
                    @blur="calculateWeightedPurchaseAverage"
                    class="w-full rounded border-2 border-gray-400 py-2 px-2"
                    type="text"
                    v-model="supplier.quantityPerUnit"
                  />
                </td>

                <td class="py-2 px-2">
                  <input
                    pattern="[0-9]*"
                    v-model="supplier.skuPrice"
                    disabled
                    readonly
                    type="number"
                    class="w-full rounded border-2 border-gray-400 py-2 px-2"
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
                        border border-2 border-gray-400
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
                        border border-2 border-gray-400
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

          <div class="flex items-center justify-between mt-3 mb-3">
            <div class="flex items-center">
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
                  Add Another Supplier
                </button>
              </div>

              <div>
                <button
                  @click="supplierModal = true"
                  class="cursor-pointer inline-flex items-center mr-1"
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
            </div>

            <!-- <div>
                        <div class="flex items-center justify-end mx-32 mt-5">
                          Weighted Average Price (Unit) :
                          <span class="ml-3 tracking-widest">{{
                            variant.weightedAveragePrice | formatCurrency
                          }}</span>
                        </div>

                        <div class="flex items-center justify-end mx-32 mt-5">
                          Weighted Average Price (Item) :
                          <span class="ml-3 tracking-widest">{{
                            variant.weightedAveragePricePerItem | formatCurrency
                          }}</span>
                        </div>
                      </div> -->
          </div>

          <div class="flex justify-end mt-8">
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
                  class="fill-current mr-1"
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
        </div>
      </section>
      <!-- End Purchase Section -->

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
        <div class="mt-8">
          <p class="font-semibold text-lg mb-1">Sales Information</p>
        </div>

        <div v-show="catalogueState.saleInfo">
          <!-- <div> -->
          <section class="mt-5 w-full">
            <div class>
              <vs-tabs alignment>
                <vs-tab class label="Retail">
                  <div
                    class="
                      flex
                      w-full
                      border-2 border-t-0 border-r-0 border-l-0
                    "
                  >
                    <div class="py-8">
                      <div class="flex" v-if="getIsRetailDiscountSetup">
                        <div class="mr-10">
                          <div class=":mb-5">
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Discount Limit (%)</label
                            >
                          </div>

                          <div class="flex items-center">
                            <button class="py-3 px-2 border font-bold">
                              %
                            </button>
                            <input
                              @blur="calculateRetailSaleInfo"
                              @keyup="calculateRetailSaleInfo"
                              disabled
                              v-model="variant.retailDiscountLimit"
                              class="py-2 px-2 border border-2 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>

                        <div class="mr-10">
                          <div class="mb-5">
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Minimum Sales Mark-up (%)</label
                            >
                          </div>

                          <div class="flex items-center">
                            <button class="py-3 px-2 border font-bold">
                              %
                            </button>
                            <input
                              @blur="calculateRetailSaleInfo"
                              disabled
                              v-model="variant.retailMaximumSalesMarkup"
                              class="py-2 px-2 border border-2 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>

                        <div class="ml-16">
                          <div>
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Purchase price reference</label
                            >
                          </div>

                          <div>
                            <select
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
                            </select>
                          </div>
                        </div>

                        <div class="mt-5">
                          {{ displayAveragePurchaseItem | currency }}
                        </div>
                      </div>

                      <div v-else>
                        <div class="flex items-center">
                          <div class="mr-10">
                            <div class="mb-5">
                              <label class for="inline-full-name"
                                >Discount Limit</label
                              >
                            </div>

                            <div class="flex items-center">
                              <button class="py-3 px-2 border font-bold">
                                %
                              </button>
                              <input
                                @blur="calculateRetailSaleInfo"
                                v-model="variant.retailDiscountLimit"
                                class="
                                  py-2
                                  px-2
                                  border border-2 border-gray-400
                                "
                                type="text"
                                name
                                id
                              />
                            </div>
                          </div>

                          <div class="mr-10">
                            <div class="mb-5">
                              <label
                                class="block mb-1 md:mb-0 pr-3"
                                for="inline-full-name"
                                >Minimum Sales Mark-up</label
                              >
                            </div>

                            <div class="flex items-center">
                              <button class="py-3 px-2 border font-bold">
                                %
                              </button>
                              <input
                                @blur="calculateRetailSaleInfo"
                                v-model="variant.retailMaximumSalesMarkup"
                                class="
                                  py-2
                                  px-2
                                  border border-2 border-gray-400
                                "
                                type="text"
                                name
                                id
                              />
                            </div>
                          </div>

                          <div class>
                            <div class="mb-5">
                              <label class="block mb-5" for="inline-full-name"
                                >Use purchase price reference</label
                              >
                            </div>

                            <div>
                              <select
                                disabled
                                readonly
                                v-model="
                                  variant.retailUsePurchasePriceReference
                                "
                                @change="changeSaleRetailUnitPurchasePrice"
                                class="
                                  py-2
                                  px-2
                                  rounded
                                  border-2 border-gray-400
                                  w-full
                                "
                                name
                                id
                              >
                                <option value="weightedAverage">
                                  Use weighted average price
                                </option>
                                <option value="defaultSupplier">
                                  Use default supplier price
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="ml-16">
                            {{ displayAveragePurchaseItem | currency }}
                          </div>
                        </div>

                        <div>
                          <div class="mt-5">
                            <span
                              @click="retailDiscDrawer = true"
                              class="
                                cursor-pointer
                                text-cloudenly-primary-main
                                mt-3
                              "
                              >Setup discount limit & maximum markup
                              (Retail)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-8">
                    <table class="table w-full table-responsive table-bordered">
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
                            Unit Purchase Price (NGN)
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
                            Recommended Retail Price(NGN)
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
                            Sales Margin(NGN)
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
                            Sales margin(NGN)
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
                          <td class="py-3 px-3 border text-center">
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
                            />
                          </td>
                          <td class="py-3 px-3 border text-center">
                            {{ retail.unitOfSale }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ retail.quantityPerUnit }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            <input
                              v-model="retail.unitPurchasePrice"
                              @keyup="calSaleRetailInfo(retail)"
                              class="
                                w-full
                                rounded
                                border-2 border-solid border-gray-200
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>

                          <td class="py-3 px-3 border text-center">
                            <input
                              @keyup="calSaleRetailInfo(retail)"
                              v-model="retail.recommendedRetailPrice"
                              class="
                                w-full
                                rounded
                                border-2 border-solid border-gray-200
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ retail.saleMarginAmount }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ retail.saleMarginPercentage }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ retail.discountedRetailPrice }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ retail.discountedSaleMarginAmount }}
                          </td>

                          <td class="py-3 px-3 border text-center">
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
                      flex
                      w-full
                      border-2 border-t-0 border-r-0 border-l-0
                    "
                  >
                    <div class="py-8">
                      <div class="flex" v-if="getIsWholesaleDiscountSetup">
                        <div class="mr-10">
                          <div class=":mb-5">
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Discount Limit (%)</label
                            >
                          </div>

                          <div class="flex items-center">
                            <button class="py-2 px-2 border font-bold">
                              %
                            </button>
                            <input
                              @blur="calculateWholesaleInfo"
                              disabled
                              v-model="variant.wholesaleDiscountLimit"
                              class="py-2 px-2 border border-2 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>

                        <div class="mr-10">
                          <div class="mb-5">
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Minimum Sales Mark-up (%)</label
                            >
                          </div>

                          <div class="flex items-center">
                            <button
                              class="
                                py-3
                                px-2
                                border border-2 border-gray-400
                                font-bold
                              "
                            >
                              %
                            </button>
                            <input
                              @blur="calculateWholesaleInfo"
                              disabled
                              v-model="variant.wholesaleMaximumSalesMarkup"
                              class="py-2 px-2 border border-2 border-gray-400"
                              type="text"
                              name
                              id
                            />
                          </div>
                        </div>

                        <div class="ml-16">
                          <div>
                            <label
                              class="block mb-1 md:mb-0 pr-3"
                              for="inline-full-name"
                              >Purchase price reference</label
                            >
                          </div>

                          <div>
                            <select
                              disabled
                              readonly
                              v-model="
                                variant.wholesaleUsePurchasePriceReference
                              "
                              @change="changeSaleWholeUnitPurchasePrice"
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
                                Use weighted Average price
                              </option>
                              <option value="defaultSupplier">
                                Use default supplier price
                              </option>
                            </select>
                          </div>
                        </div>

                        <div class="mt-5">
                          {{ displayAveragePurchaseItemWholesale | currency }}
                        </div>
                      </div>

                      <div v-else>
                        <div class="flex items-center">
                          <div class="mr-10">
                            <div class="mb-5">
                              <label class for="inline-full-name"
                                >Discount Limit</label
                              >
                            </div>

                            <div class="flex items-center">
                              <button
                                class="
                                  py-3
                                  px-2
                                  border border-gray-400
                                  font-bold
                                "
                              >
                                %
                              </button>
                              <input
                                @blur="calculateWholesaleInfo"
                                v-model="variant.wholesaleDiscountLimit"
                                class="
                                  py-2
                                  px-2
                                  border border-2 border-gray-400
                                "
                                type="text"
                                name
                                id
                              />
                            </div>
                          </div>

                          <div class="mr-10">
                            <div class="mb-5">
                              <label
                                class="block mb-1 md:mb-0 pr-3"
                                for="inline-full-name"
                                >Minimum Sales Mark-up</label
                              >
                            </div>

                            <div class="flex items-center">
                              <button class="py-3 px-2 border font-bold">
                                %
                              </button>
                              <input
                                @blur="calculateWholesaleInfo"
                                v-model="variant.wholesaleMaximumSalesMarkup"
                                class="
                                  py-2
                                  px-2
                                  border border-2 border-gray-400
                                "
                                type="text"
                                name
                                id
                              />
                            </div>
                          </div>

                          <div class>
                            <div class="mb-5">
                              <label class="block mb-5" for="inline-full-name"
                                >Use purchase price reference</label
                              >
                            </div>

                            <div>
                              <select
                                disabled
                                readonly
                                v-model="
                                  variant.wholesaleUsePurchasePriceReference
                                "
                                @change="changeSaleWholeUnitPurchasePrice"
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
                                  Use weighted average price
                                </option>
                                <option value="defaultSupplier">
                                  Use default supplier price
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="ml-16">
                            {{ displayAveragePurchaseItemWholesale | currency }}
                          </div>
                        </div>

                        <div>
                          <div class="mt-5">
                            <span
                              @click="wholesaleDiscDrawer = true"
                              class="
                                cursor-pointer
                                text-cloudenly-primary-main
                                mt-3
                              "
                              >Setup discount limit & maximum markup
                              (Wholesale)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-8">
                    <table class="table w-full table-responsive table-bordered">
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
                            Sales Margin(NGN)
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
                            Sales margin (NGN)
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
                          <td class="py-3 px-3 border text-center">
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
                            />
                          </td>
                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.unitOfSale }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.quantityPerUnit }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            <input
                              readonly
                              disabled
                              v-model="wholesale.unitPurchasePrice"
                              @keyup="calSaleWholeSaleInfo(wholesale)"
                              class="
                                w-full
                                rounded
                                border-2 border-solid border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>
                          <td class="py-3 px-3 border text-center">
                            <input
                              v-model="wholesale.recommendedWholesalePrice"
                              class="
                                w-full
                                rounded
                                border-2 border-solid border-gray-400
                                py-2
                                px-2
                              "
                              type="text"
                              name
                              id
                            />
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.saleMarginAmount }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.saleMarginPercentage }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.discountedWholesalePrice }}
                          </td>

                          <td class="py-3 px-3 border text-center">
                            {{ wholesale.discountedSaleMarginAmount }}
                          </td>

                          <td class="py-3 px-3 border text-center">
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
                      class="py-2 px-2 rounded border border-gray-400 w-1/4"
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
                              <span class="mr-2 font-semibold">Vat Rate :</span>
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
                class="px-5 py-2 bg-cloudenly-danger-off shadow rounded"
              >
                <p class="text-xl">No tax found for this outlet</p>
                <button
                  @click="taxDrawer = true"
                  class="
                    cursor-pointer
                    px-5
                    py-2
                    border-none
                    text-cloudenly-primary-main
                  "
                >
                  click here to setup
                </button>
              </div>
            </div>
          </section>

          <div class="flex justify-end mt-8">
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
          </div>
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
        <div class="mt-8">
          <p class="font-semibold text-lg mb-1">Inventory Information</p>
        </div>

        <div v-show="catalogueState.inventoryInfo">
          <!-- <div> -->
          <div class="mt-10">
            <div class="mt-10">
              <p class="text-cloudenly-primary-main font-medium">
                Inventory Operation and Management Information
              </p>
              <div>
                <div>
                  <div class="row flex mt-8">
                    <div class="col-3 w-1/3 mr-8">
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
                            border border-gray-400 border-2
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
                            border border-gray-400 border-2
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col-3 w-1/3">
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
                            border border-gray-400 border-2
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

                  <div class="row flex mt-8">
                    <div class="col-3 w-1/3 mr-3">
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
                            border border-gray-400 border-2
                            rounded
                            w-full
                          "
                          id
                          aria-describedby=""
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-3">
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
                            border border-gray-400 border-2
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

              <div>
                <div class="mt-8">
                  <div class="row flex">
                    <div class="col-3 w-1/3 mr-3">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Item Dimension (LxWxH)</label
                          >
                        </div>
                        <input
                          v-model="inventory.itemDimension"
                          type="text"
                          class="
                            py-2
                            px-2
                            border border-gray-400 border-2
                            rounded
                            w-full
                          "
                          id=""
                          aria-describedby="textHelp"
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Item Weight</label>
                        </div>
                        <div class="flex items-center">
                          <div class="w-1/3">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                          <input
                            v-model="inventory.itemWeight"
                            type="text"
                            class="
                              py-2
                              px-2
                              border border-gray-400 border-2
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
                          <label class="font-semibold" for>Expiry Date</label>
                        </div>

                        <datepicker
                          v-model="inventory.expiryDate"
                          input-class="w-full py-1"
                          placeholder="Select Date"
                        ></datepicker>
                      </div>
                    </div>

                    <div class="col-3 w-1/3">
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
                            border border-gray-400 border-2
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

                  <div class="row flex mt-8">
                    <div class="col-3 w-1/3 mr-8">
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
                            border border-gray-400 border-2
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
                        <div class="flex items-center">
                          <div class="w-1/3">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
                                w-full
                              "
                            >
                              <option value="kg">CM</option>
                              <option value="gram">MM</option>
                              <option value="Ounce">M</option>
                            </select>
                          </div>
                          <div class="w-full">
                            <input
                              v-model="inventory.packageDimension"
                              type="text"
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
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

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for
                            >Package Weight</label
                          >
                        </div>
                        <div class="flex items-center">
                          <div class="w-1/3">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                          <div class="w-full">
                            <input
                              v-model="inventory.packageWeight"
                              type="text"
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
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
                            border border-gray-400 border-2
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

                  <div class="row flex mt-8">
                    <div class="col-3 w-1/3 mr-8">
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
                            border border-gray-400 border-2
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
                        <div class="flex items-center">
                          <div class="w-1/3">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
                                w-full
                              "
                            >
                              <option value="kg">CM</option>
                              <option value="gram">MM</option>
                              <option value="Ounce">M</option>
                            </select>
                          </div>
                          <div class="w-full">
                            <input
                              v-model="inventory.palletDimension"
                              type="text"
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
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

                    <div class="col-3 w-1/3 mr-8">
                      <div class="form-group">
                        <div class="mb-5">
                          <label class="font-semibold" for>Pallet Weight</label>
                        </div>
                        <div class="flex items-center">
                          <div class="w-1/3">
                            <select
                              name
                              id
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
                                w-full
                              "
                            >
                              <option value="kg">kg</option>
                              <option value="gram">Gram</option>
                              <option value="Ounce">Pound</option>
                            </select>
                          </div>
                          <div class="w-full">
                            <input
                              v-model="inventory.palletWeight"
                              type="text"
                              class="
                                py-2
                                px-2
                                border border-gray-400 border-2
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
                            border border-gray-400 border-2
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
                      class="
                        py-2
                        px-2
                        border border-gray-400 border-2
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
                          border border-gray-400 border-2
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
                      class="
                        py-2
                        px-2
                        border border-gray-400 border-2
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
                      <label class="font-semibold" for>Rack #</label>
                    </div>
                    <div>
                      <input
                        v-model="inventory.rack"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-gray-400 border-2
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
                          border border-gray-400 border-2
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
                          border border-gray-400 border-2
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

          <div class="mt-10 mb-10">
            <div class="flex justify-end">
              <button
                @click="saveInventoryInfo"
                :class="{
                  'cursor-not-allowed': saveInventoryInfoButton,
                  'text-cloudenly-primary-mid': saveInventoryInfoButton,
                }"
                class="
                  py-3
                  px-5
                  bg-cloudenly-primary-off
                  text-cloudenly-primary-main
                  rounded-full
                "
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- End Inventory Section -->

      <div
        class="
          p-8
          flex
          justify-between
          bg-white
          border border-l-0 border-b-o border-r-0
        "
      >
        <div>
          <button
            @click="$router.back()"
            type="button"
            class="
              py-3
              px-5
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
              rounded-full
            "
          >
            Cancel
          </button>
        </div>

        <div></div>
      </div>
    </div>
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import UnitOfMeasurement from "../../../utils/unitOfMeasurement";
import Drawer from "../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import alertPrivilege from "../../components/Alert/AlertPrevilege";
import { VMoney } from "v-money";
// import money from "money-math";
import vatSetting from "../settings/locationsAndTaxes/taxes/tax";
import countryList from "../../../utils/country";
import stateList from "../../../utils/nigeriaState";

export default {
  components: {
    Drawer,
    Datepicker,
    alertPrivilege,
    vatSetting,
  },

  directives: {
    money: VMoney,
  },

  data() {
    return {
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
      drawer: false,
      taxDrawer: false,
      itemDescDrawer: false,
      retailDiscDrawer: false,
      wholesaleDiscDrawer: false,

      modalSave: false,
      setting: {
        minPercentageMarkup: 0,
        maxDiscountLimit: 0,
        price: 1,
        margin: 0,
        percentMargin: 0,
      },

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

      totalWeightedAverage: 0,

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
      },

      inventory: {
        openingStock: 0,
        addedStock: 0,
        issuedStock: 0,
        stockBalance: 0,
        reorderLevel: 0,
        mac: null,
        valuationMethod: "lifo",
        inventoryValue: 0,
        itemDimension: 0,
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
        purchaseInfo: false,
        saleInfo: false,
        inventoryInfo: false,
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

      itemCharacteristicsValue: [],
      outletVat: {},
    };
  },

  methods: {
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
    saveSubVariantInformation() {
      this.saveItemInfoButton = true;

      let userInfo = {
        orgId: this.$store.state.auth.auth.authData.orgId,
        creatorId: this.$store.state.auth.auth.authData.creatorId,
        outletIds: this.outletIds,
      };

      delete this.variantValue.id;
      this.variant.variantProperty = this.variantValue;

      let queryInfo = this.itemInfo.productOrService;
      const dataPayload = {
        userInfo: userInfo,
        payload: {
          itemId: this.itemId,
          variant: {
            ...this.variant,
          },
          unitsOfMeasure: this.unitsOfMeasure,
        },
      };

      // console.log(dataPayload, queryInfo)
      this.$store
        .dispatch("catalogue/createSubItemVariantInformation", {
          dataPayload,
          queryInfo,
        })
        .then((resp) => {
          // console.log(resp.data);
          this.saveItemInfoButton = false;
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

      this.savePurchaseInfoButton = true;

      const dataPayload = {
        userInfo: userInfo,
        payload: {
          variantId: this.variantId,
          itemId: this.itemId,
          variant: {
            defaultSupplierPrice: this.defaultSupplierPrice.pricePerUnit,
            weightedAveragePriceItem: this.variant.weightedAveragePricePerItem,
            weightedAveragePriceUnit: this.variant.weightedAveragePrice,
            variantSuppliers: this.variantSuppliers,
          },
        },
      };
      let queryInfo = this.itemInfo.productOrService;
      this.$store
        .dispatch("catalogue/createSupplierVariant", {
          dataPayload,
          queryInfo,
        })
        .then((resp) => {
          // console.log(resp.data);
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
        // outletIds: this.outletIds,
        outletIds: [this.$store.state.auth.auth.authData.outletId],
      };

      //  this.inventory.standardUom = this.unitsOfMeasure.standardUom;
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
      // eslint-disable-next-line no-console
      // console.log(inventoryPayload);
      this.$store
        .dispatch("catalogue/createInventoryItem", {
          inventoryPayload,
          queryInfo,
        })
        .then((resp) => {
          // console.log(resp.data);
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
          // eslint-disable-next-line no-console
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

      let queryInfo = this.itemInfo.productOrService;
      switch (state) {
        // eslint-disable-next-line no-case-declarations
        case "purchaseState":
          // this.variantValue.map((variant) => {
          //   this.variant.variantProperty[variant.key] = variant.value;
          // });
          this.saveItemInfoButton = true;
          delete this.variantValue.id;
          // console.log(this.variantValue);
          this.variant.variantProperty = this.variantValue;
          // this.itemInfo.categoryId = this.itemInfo.categoryId || null;
          // this.itemInfo.brandId = this.itemInfo.brandId || null;

          let dataPayload = {
            userInfo: userInfo,
            payload: {
              itemId: this.itemId,
              variant: {
                ...this.variant,
              },
              unitsOfMeasure: {
                ...this.unitsOfMeasure,
              },
            },
          };

          this.retailPriceBooks = this.unitsOfMeasure.unitOfSale.map((resp) => {
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
          });
          this.wholesalePriceBooks = this.unitsOfMeasure.unitOfSale.map(
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

          // console.log(dataPayload);

          this.$store
            .dispatch("catalogue/createSubItemVariantInformation", {
              dataPayload,
              queryInfo,
            })
            .then((resp) => {
              if (resp.data) {
                // console.log(resp.data);
                this.variantId = resp.data.variantInfo.id;
                // this.itemId = resp.data.variantInfo.itemId;
                this.inventory.standardUom =
                  resp.data.itemUnitOfMeasureInfo.standardUom;

                this.variantSuppliers[0].unitOfPurchase =
                  resp.data.itemUnitOfMeasureInfo.unitOfPurchase;
                this.variantSuppliers[0].quantityPerUnit =
                  resp.data.itemUnitOfMeasureInfo.unitOfPurchaseConversionFactor;

                this.catalogueState.purchaseInfo = true;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = false;
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log(err);
              this.saveItemInfoButton = false;
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
          // console.log(defaultSupplier);
          let variantSupplierPayload = {
            userInfo: userInfo,
            payload: {
              variantId: this.variantId,
              itemId: this.itemId,
              variant: {
                defaultSupplierPrice: defaultSupplier.pricePerUnit,
                weightedAveragePriceItem:
                  this.variant.weightedAveragePricePerItem,
                weightedAveragePriceUnit: this.variant.weightedAveragePrice,
                variantSuppliers: this.variantSuppliers,
              },
            },
          };
          // console.log('purchase payload',  this.variant.weightedAveragePricePerItem,)

          this.retailPriceBooks = this.retailPriceBooks.map((resp) => {
            return {
              defaultPrice: false,
              unitOfSale: resp.unitOfSale,
              quantityPerUnit: resp.quantityPerUnit,
              unitPurchasePrice:
                parseInt(this.variant.weightedAveragePricePerItem) *
                parseInt(resp.quantityPerUnit),
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
                parseInt(this.variant.weightedAveragePricePerItem) *
                parseInt(resp.quantityPerUnit),
              recommendedRetailPrice: 0,
              saleMarginPercentage: 0,
              saleMarginAmount: 0,
              discountedRetailPrice: 0,
              discountedSaleMarginAmount: 0,
              discountedSaleMarginPercentage: 0,
            };
          });

          // console.log('retail',this.retailPriceBooks);
          // console.log('wholesale',this.wholesalePriceBooks);

          this.changeSaleRetailUnitPurchasePrice();
          this.changeSaleWholeUnitPurchasePrice();

          this.$store
            .dispatch("catalogue/createSupplierVariant", {
              variantSupplierPayload,
              queryInfo,
            })
            .then((resp) => {
              if (resp.data) {
                this.changeSaleRetailUnitPurchasePrice();
                this.changeSaleWholeUnitPurchasePrice();
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = true;
                this.catalogueState.inventoryInfo = false;
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
                text: err.response.data.message,
                fixed: false,
              });
              // eslint-disable-next-line no-console
              console.log(err);
            });

          break;

        // eslint-disable-next-line no-case-declarations

        // eslint-disable-next-line no-case-declarations
        case "inventoryState":
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
                syncWithSaleCatalogue: true,
                syncWithPurchaseCatalogue: true,
                retailPriceBooks: this.retailPriceBooks,
                wholesalePriceBooks: this.wholesalePriceBooks,
              },
            },
          };

          this.saveSalesInfoButton = true;

          this.$store
            .dispatch("catalogue/createSaleInformation", {
              salesPayload,
              queryInfo,
            })
            .then((resp) => {
              // console.log(resp.data);
              if (resp.data) {
                this.catalogueState.purchaseInfo = false;
                this.catalogueState.saleInfo = false;
                this.catalogueState.inventoryInfo = true;
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
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
            });
          break;

        // eslint-disable-next-line no-case-declarations
        case "finalState":
          const inventoryPayload = {
            userInfo: userInfo,
            payload: {
              itemId: this.itemId,
              variantId: this.variantId,
              variant: {
                syncWithSaleCatalogue: true,
                syncWithPurchaseCatalogue: true,
                syncWithInventory: true,
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
              // console.log(resp.data);
              this.saveInventoryInfoButton = false;
              this.$router.back();
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
              // eslint-disable-next-line no-console
              console.log(err);
            });

          break;

        default:
          break;
      }
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

      // eslint-disable-next-line no-console
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
      this.drawer = false;
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
        unitSupplied: 0,
        percentageSupplied: null,
        weightedPurchasePrice: 0,
        default: false,
      });
    },

    assignPurchaseUnit() {
      this.variantSuppliers.map((resp) => {
        resp.unitOfPurchase = this.variantSuppliers[0].unitOfPurchase;
        resp.quantityPerUnit = this.variantSuppliers[0].quantityPerUnit;
      });
    },

    deleteVariantSuppliers(index) {
      this.variantSuppliers.splice(index, 1);
      this.calculateWeightedPurchaseAverage();
    },

    calculateWeightedPurchaseAverage() {
      let sumTotalSupplied = 0;
      for (var a = 0; a < this.variantSuppliers.length; a++) {
        sumTotalSupplied =
          sumTotalSupplied +
          Number.parseFloat(this.variantSuppliers[a].quantityPerUnit);
      }
      let newTotal = sumTotalSupplied;

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
      let percentage =
        (Number.parseFloat(qty) / Number.parseFloat(total)) * 100;
      return percentage.toFixed(2);
    },

    calcWeightedPurchasePrice(skuPrice, percentageSupplied) {
      let weightedPrice =
        (Number.parseFloat(skuPrice) * Number.parseFloat(percentageSupplied)) /
        100;
      return weightedPrice.toFixed(2);
    },

    calcAveragePurchasePrice() {
      var totalWeightedPurchasePrice = 0;
      var totalQuantitySupplied = 0;

      for (var i = 0; i < this.variantSuppliers.length; i++) {
        totalQuantitySupplied =
          parseInt(totalQuantitySupplied || 0) +
          parseInt(this.variantSuppliers[i].unitSupplied || 0);
        totalWeightedPurchasePrice =
          parseInt(totalWeightedPurchasePrice || 0) +
          parseInt(this.variantSuppliers[i].weightedPurchasePrice || 0);
      }

      this.variant.weightedAveragePrice =
        parseInt(totalWeightedPurchasePrice || 0) /
        parseInt(totalQuantitySupplied || 0);
      this.variant.weightedAveragePricePerItem =
        parseInt(this.variant.weightedAveragePrice || 0) /
        parseInt(this.variantSuppliers[0].quantityPerUnit || 0);
      this.totalQuantitySupplied = parseInt(totalQuantitySupplied || 0);
      this.totalWeightedPurchasePrice = parseInt(
        totalWeightedPurchasePrice || 0
      );
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
      // eslint-disable-next-line no-console
      console.log(changeUnitPurchasePrice);

      switch (changeUnitPurchasePrice) {
        case "weightedAverage":
          this.retailPriceBooks.map((resp) => {
            resp.unitPurchasePrice =
              parseInt(this.variant.weightedAveragePricePerItem) *
                parseInt(resp.quantityPerUnit) || 0;
            resp.recommendedRetailPrice =
              parseInt(resp.unitPurchasePrice) *
              (1 + parseInt(this.variant.retailMaximumSalesMarkup) / 100);
            resp.saleMarginAmount =
              parseInt(resp.recommendedRetailPrice) -
              parseInt(resp.unitPurchasePrice);
            resp.saleMarginPercentage = this.variant.retailMaximumSalesMarkup;
            resp.discountedRetailPrice =
              parseInt(resp.recommendedRetailPrice) *
              (1 - parseInt(this.variant.retailDiscountLimit) / 100);
            resp.discountedSaleMarginAmount =
              parseInt(resp.discountedRetailPrice) -
              parseInt(resp.unitPurchasePrice);
            resp.discountedSaleMarginPercentage =
              (parseInt(resp.discountedSaleMarginAmount) /
                parseInt(resp.unitPurchasePrice)) *
              100;
          });
          break;

        // eslint-disable-next-line no-case-declarations
        case "defaultSupplier":
          let supplierPricePerItem =
            parseInt(this.selectedSupplier.pricePerUnit) /
            parseInt(this.selectedSupplier.quantityPerUnit);

          this.retailPriceBooks.map((resp) => {
            this.variant.defaultSupplierPricePerItem =
              parseInt(supplierPricePerItem);

            resp.unitPurchasePrice =
              parseInt(supplierPricePerItem) * parseInt(resp.quantityPerUnit) ||
              0;
            resp.recommendedRetailPrice =
              parseInt(resp.unitPurchasePrice) *
              (1 + parseInt(this.variant.retailMaximumSalesMarkup) / 100);
            resp.saleMarginAmount =
              parseInt(resp.recommendedRetailPrice) -
              parseInt(resp.unitPurchasePrice);
            resp.saleMarginPercentage = this.variant.retailMaximumSalesMarkup;
            resp.discountedRetailPrice =
              parseInt(resp.recommendedRetailPrice) *
              (1 - parseInt(this.variant.retailDiscountLimit) / 100);
            resp.discountedSaleMarginAmount =
              parseInt(resp.discountedRetailPrice) -
              parseInt(resp.unitPurchasePrice);
            resp.discountedSaleMarginPercentage =
              (parseInt(resp.discountedSaleMarginAmount) /
                parseInt(resp.unitPurchasePrice)) *
              100;
          });
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
              parseInt(this.variant.weightedAveragePricePerItem) *
                parseInt(resp.quantityPerUnit) || 0;
            resp.recommendedWholesalePrice =
              parseInt(resp.unitPurchasePrice) *
              (1 + parseInt(this.variant.wholesaleMaximumSalesMarkup) / 100);
            resp.saleMarginAmount =
              parseInt(resp.recommendedWholesalePrice) -
              parseInt(resp.unitPurchasePrice);
            resp.saleMarginPercentage =
              this.variant.wholesaleMaximumSalesMarkup;
            resp.discountedWholesalePrice =
              parseInt(resp.recommendedWholesalePrice) *
              (1 - parseInt(this.variant.wholesaleDiscountLimit) / 100);
            resp.discountedSaleMarginAmount =
              parseInt(resp.discountedWholesalePrice) -
              parseInt(resp.unitPurchasePrice);
            resp.discountedSaleMarginPercentage =
              (parseInt(resp.discountedSaleMarginAmount) /
                parseInt(resp.unitPurchasePrice)) *
              100;
          });
          break;

        case "defaultSupplier":
          this.wholesalePriceBooks.map((resp) => {
            resp.unitPurchasePrice =
              (parseInt(this.selectedSupplier.pricePerUnit) /
                parseInt(this.selectedSupplier.quantityPerUnit)) *
                parseInt(resp.quantityPerUnit) || 0;
            resp.recommendedWholesalePrice =
              parseInt(resp.unitPurchasePrice) *
              (1 + parseInt(this.variant.wholesaleMaximumSalesMarkup) / 100);
            resp.saleMarginAmount =
              parseInt(resp.recommendedWholesalePrice) -
              parseInt(resp.unitPurchasePrice);
            resp.saleMarginPercentage =
              this.variant.wholesaleMaximumSalesMarkup;
            resp.discountedWholesalePrice =
              parseInt(resp.recommendedWholesalePrice) *
              (1 - parseInt(this.variant.wholesaleDiscountLimit) / 100);
            resp.discountedSaleMarginAmount =
              parseInt(resp.discountedWholesalePrice) -
              parseInt(resp.unitPurchasePrice);
            resp.discountedSaleMarginPercentage =
              (parseInt(resp.discountedSaleMarginAmount) /
                parseInt(resp.unitPurchasePrice)) *
              100;
          });
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
          // eslint-disable-next-line no-console
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

    saveTaxPolicy() {
      let userInfo = this.$store.state.auth.auth.authData;
      const dataPayload = {
        userInfo: userInfo,
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
      this.$store
        .dispatch("catalogue/createTaxPolicy", dataPayload)
        .then((resp) => {
          this.$vs.notify({
            title: "Tax",
            text: resp.data.message,
            color: "success",
            position: "top-right",
          });
          this.country = "";
          this.state = "";
          this.city = "";
          (this.invoiceBase = {
            isSelected: false,
            options: {
              taxInclusive: false,
              taxExclusive: false,
              hybridTax: false,
            },
          }),
            (this.itemBase = {
              isSelected: false,
              options: {
                taxInclusive: false,
                taxExclusive: false,
                hybridTax: false,
              },
            });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.$vs.notify({
            title: "Tax",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
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
          // eslint-disable-next-line no-console
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
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    autoGenerateSKU() {
      let data = {
        userInfo: this.$store.state.auth.auth.authData,
        payload: {
          moduleName: "sku",
          productName: this.itemInfo.name,
          yearOfBirth: null,
          contactName: null,
        },
      };

      this.$store
        .dispatch("catalogue/getGenerateSkuCode", data)
        .then((resp) => {
          this.itemInfo.sku = resp.data.code;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });

      // this.itemInfo.name.trim();
      // this.itemInfo.sku = this.itemInfo.name.replace(/[aeiou,' ']/gi, "").toUpperCase() +"-" +("" + Math.random()).substring(2, 5);

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
      let variants = this.variantValue[0].value;

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
                this.retailDiscDrawer = false;
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
              });
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
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
                this.wholesaleDiscDrawer = false;
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
              });
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.$vs.notify({
            title: "Setup",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    saveSkuCode() {
      this.saveSkuButton = true;
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
          this.saveSkuButton = false;
          this.$vs.notify({
            title: "SKU Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          let data = {
            userInfo: this.$store.state.auth.auth.authData,
            payload: {
              moduleName: "sku",
              productName: this.itemInfo.name,
              yearOfBirth: null,
              contactName: null,
            },
          };

          this.$store
            .dispatch("catalogue/getGenerateSkuCode", data)
            .then((resp) => {
              this.itemInfo.sku = resp.data.code;
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log(err);
            });

          this.drawer = false;
        })
        .catch((err) => {
          this.saveSkuButton = false;
          this.$vs.notify({
            title: "SKU Code",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    // save item characteristics..
    saveItemCharacteristics() {
      this.itemDescButton = true;
      let data = {
        userInfo: this.$store.state.auth.auth.authData,
        payload: {
          characteristic: this.itemVariantSetting.key,
          value: this.itemVariantSetting.value,
        },
      };

      this.$store
        .dispatch(
          "catalogue/itemCharacteristics/createItemCharacteristics",
          data
        )
        .then((resp) => {
          this.itemDescButton = true;
          this.itemDescButton = false;
          this.$vs.notify({
            title: "Item Characteristic",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.itemDescDrawer = false;
          this.itemDescButton = false;
        })
        .catch((err) => {
          this.itemDescButton = false;
          this.$vs.notify({
            title: "Item Characteristic",
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

    defaultSupplierPriceItem() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.variant.defaultSupplierPricePerItem =
        parseInt(this.selectedSupplier.pricePerUnit) /
        parseInt(this.selectedSupplier.quantityPerUnit));
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
    itemInfoSKU: function () {
      this.variantCode = this.itemInfo.sku;
    },

    variantConfig: function () {
      let varaints = this.variantConfig.map((variant) => {
        return variant.value;
      });

      this.variantValue = varaints.toString();
      this.variant.variantCode = varaints
        .toString()
        .replace(/[aeiou,]/gi, "")
        .toUpperCase();
      this.variant.variantSku =
        this.itemInfo.sku + "-" + this.variant.variantCode;
      this.variant.variantName = `${this.itemInfo.name} -  (${varaints.join(
        "/"
      )})`;
      // this.variant.variantName =  this.itemInfo.name + "-" + varaints.join(' ')
      this.inventory.variantHash = this.variant.variantCode;
      this.inventory.variantCode = this.variant.variantCode;
    },
  },

  mounted() {
    const id = this.$route.params.id;

    this.itemId = id;
    let payload = {
      id: id,
    };

    this.queryInfo = this.$route.query;

    console.log(this.queryInfo);

    let userAuth = this.$store.state.auth.auth.authData;
    let userInfo = {
      userInfo: {
        ...userAuth,
      },
    };

    this.$store
      .dispatch("catalogue/getItemVariant", payload)
      .then((resp) => {
        // console.log(resp.data)
        this.itemInfo = resp.data.item;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    this.$store.dispatch("catalogue/getAllBrand", userInfo);
    this.$store.dispatch("catalogue/getAllItemCategory", userInfo);
    this.$store.dispatch("crm/contact/getAllSupplierContact");
    this.$store.dispatch("catalogue/getSkuCode");
    this.$store.dispatch("catalogue/tax/getAllOrgTaxes").then((resp) => {
      this.orgVatList = resp.data;
    });
    this.$store.dispatch("catalogue/itemCharacteristics/getItemCharacteristic");
    this.$store
      .dispatch("catalogue/discount/getRetailDiscount")
      .then((resp) => {
        // console.log(resp, "discount section");
        this.variant.retailDiscountLimit =
          resp.data.setting.maxDiscountLimit || "0";
        this.variant.retailMaximumSalesMarkup =
          resp.data.setting.minPercentageMarkup || "0";
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    this.$store
      .dispatch("catalogue/discount/getWholesaleDiscount")
      .then((resp) => {
        this.variant.wholesaleDiscountLimit =
          resp.data.setting.maxDiscountLimit || "0";
        this.variant.wholesaleMaximumSalesMarkup =
          resp.data.setting.minPercentageMarkup || "0";
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    // get all optima outlet
    this.$store
      .dispatch("userOutlet/getOptimaOrganisationOutlet")
      .then((resp) => {
        this.outletIds = resp.data.outlets.map((resp) => {
          return resp.id;
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    this.$store.dispatch("catalogue/itemCharacteristics/getItemCharacteristic");
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.getOutletVatCreated();

    //
  },
};
</script>

<style lang="css" scoped></style>
