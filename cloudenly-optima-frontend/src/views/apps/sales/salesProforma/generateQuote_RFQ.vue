/* eslint-disable vue/no-side-effects-in-computed-properties */ /*
eslint-disable no-case-declarations */ /* eslint-disable no-case-declarations */
<template>
  <div class>
    <back location="Generate Quotation" />
   
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Quotation"
    >
      <div class="container">
        <div
          class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white"
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
              <p>
                Please note that this Quotation may undergo Approval Process
              </p>
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
            @click="processQuotation"
            class="px-5 py-2 mr-5 inline-flex items-center bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
          >
            <feather-icon
              v-show="processButton"
              svgClasses="animate-spin h-5 w-5 mr-3"
              class
              icon="CircleIcon"
            ></feather-icon>
            <span>Process</span>
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

    <vs-popup
      :button-close-hidden="true"
      title="Apply Promotion"
      :active.sync="promoModal"
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
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">Process Promo</h1>
              <p>Please note this will reset you item boq</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            class="px-10 py-3 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
          >
            Apply
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="promoModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>

    <!-- Set up quote number code -->
    <Drawer :size="50" :visible="quoteDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h2>Quote Code Setup</h2>
      </div>

      <div slot="body">
        <div>
          <div class>
            <div>
              <p class="text-xl">Quote</p>
            </div>
            <div>
              <div class="mb-8">
                <div class>
                  <p class="p-3 mb-0">
                    Setup and Manage the code that will be generated when you
                    create a Quote...
                  </p>
                  <p
                    class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer"
                  >
                    Learn more here...
                  </p>
                </div>
              </div>

              <div id="div-with-loading" class="mx-5 vs-con-loading__container">
                <div
                  class="mb-8 mx-16 ml-16 border-2 border-solid border-grey-lighter rounded-lg"
                >
                  <div class="p-3">
                    <div class="flex items-center w-full mb-5">
                      <div class="w-1/4 mr-5 text-right">Prefix</div>

                      <div class="w-1/3 mr-5">
                        <select
                          v-model="prefix.type"
                          name
                          id
                          class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                        >
                          <option value="randomCode">Random Code</option>
                          <option value="currentDate">Current Date</option>
                          <option value="currentYear">Current Year</option>
                          <option value="moduleName">Module Name</option>
                        </select>
                      </div>

                      <div class="w-1/3">
                        <div v-if="prefix.type === 'randomCode'">
                          <select
                            v-model="prefix.typeFormat"
                            name
                            id
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
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
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                            id
                          >
                            <option value="yy">YY</option>
                            <option value="yyyy">YYYY</option>
                          </select>
                        </div>

                        <div v-else-if="prefix.type === 'moduleName'">
                          <input
                            v-model="prefix.typeFormat"
                            type="text"
                            placeholder="eg:QUOTE"
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                            name
                            id
                          />
                        </div>
                        <div v-else></div>
                      </div>
                    </div>

                    <div class="flex items-center mb-5">
                      <div class="w-1/4 mr-5 text-right">Base</div>

                      <div class="w-1/3 mr-5">
                        <select
                          v-model="roots.type"
                          name
                          id
                          class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                        >
                          <option value="randomCode">Random Code</option>
                          <option value="currentDate">Current Date</option>
                          <option value="currentYear">Current Year</option>
                          <option value="moduleName">Module Name</option>
                        </select>
                      </div>

                      <div class="w-1/3">
                        <div v-if="roots.type === 'randomCode'">
                          <select
                            v-model="roots.typeFormat"
                            name
                            id
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
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
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                            id
                          >
                            <option value="yy">YY</option>
                            <option value="yyyy">YYYY</option>
                          </select>
                        </div>

                        <div v-else-if="roots.type === 'moduleName'">
                          <input
                            v-model="roots.typeFormat"
                            type="text"
                            placeholder="eg: RFQ"
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                            name
                            id
                          />
                        </div>
                        <div v-else></div>
                      </div>
                    </div>

                    <div class="flex items-center mb-5">
                      <div class="w-1/4 mr-5 text-right">Suffix</div>

                      <div class="w-1/3 mr-5">
                        <select
                          v-model="suffix.type"
                          name
                          id
                          class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                        >
                          <option value="randomCode">Random Code</option>
                          <option value="currentDate">Current Date</option>
                          <option value="currentYear">Current Year</option>
                          <option value="moduleName">Module Name</option>
                        </select>
                      </div>

                      <div class="w-1/3">
                        <div v-if="suffix.type === 'randomCode'">
                          <select
                            v-model="suffix.typeFormat"
                            name
                            id
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
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
                            class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                            id
                          >
                            <option disabled selected value>
                              Select year format
                            </option>
                            <option value="yy">YY</option>
                            <option value="yyyy">YYYY</option>
                          </select>
                        </div>

                        <div v-else-if="suffix.type === 'moduleName'">
                          <input
                            v-model="suffix.typeFormat"
                            type="text"
                            placeholder="eg: RFQ"
                            class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                            name
                            id
                          />
                        </div>
                        <div v-else></div>
                      </div>
                    </div>

                    <div class="flex items-center mb-5">
                      <div class="w-1/4 mr-5 text-right">Separator</div>

                      <div class="w-1/3">
                        <select
                          v-model="separator.type"
                          id
                          class="py-1 px-2 border-2 border-gray-400 w-full rounded"
                        >
                          <option disabled selected value>
                            Select preferred Code Separator
                          </option>
                          <option value="hyphen">Hyphen</option>
                          <option value="slash">Slash</option>
                          <!-- <option value="">No Separator</option> -->
                        </select>
                      </div>

                      <div class="w-1/3"></div>
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <p class="text-lg font-medium text-cloudenly-warning-main">
                      {{ message }}
                    </p>
                  </div>

                  <div class="flex items-center justify-center mt-3">
                    <div class="mr-3 text-xl">preview</div>

                    <div
                      id="div-with-loading-preview"
                      class="py-3 vs-con-loading__container"
                    >
                      <span
                        class="px-3 py-5 my-5 bg-grey-lighter font-bold text-xl"
                        >{{ previewFormat | capitalize }}</span
                      >
                    </div>
                  </div>

                  <div class="flex pb-10 mb-10 mt-10">
                    <div class="mx-auto">
                      <button
                        :disabled="saveCodeButton"
                        @click="saveQuotationCode"
                        :class="{
                          'cursor-not-allowed': saveCodeButton,
                          'bg-cloudenly-primary-mid': saveCodeButton,
                        }"
                        class="px-5 py-2 border-none bg-cloudenly-primary-main rounded text-white cursor-pointer"
                        type="button"
                      >
                        Save & Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>

    <!-- End Setup code number code -->

    <div class="px-5 py-10 mt-5 bg-white shadow rounded">
      <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
        <div class="col-4">
          <div class>
            <div class="mb-5 flex items-center justify-between">
              <div>
                <label for class="font-semibold">Customer:</label>
              </div>
            </div>

            <div class="p-3 w-full shadow">
              <p class="text-lg mb-3">{{ selectedCustomer.name }}</p>
              <p class="text-lg">{{ selectedCustomer.email }}</p>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-5">
            <label for class="font-semibold">Billing Address:</label>
          </div>
          <div class="form-group row no-gutters mb-10">
            <div class="col-md-12">
              <textarea
                v-model="quotationData.billingAddress"
                rows="3"
                cols="30"
                class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-5">
            <label for class="font-semibold"> Delivery Address: </label>
          </div>
          <div class="form-group row no-gutters mb-10">
            <div class="col-md-12">
              <textarea
                v-model="quotationData.deliveryAddress"
                rows="3"
                cols="30"
                class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
        <div class="col-4">
          <div class="mb-10">
            <div class="mb-5">
              <label class="font-semibold" for>Delivery Date:</label>
            </div>
            <div class>
              <datepicker
                v-model="quotationData.deliveryDate"
                input-class="w-full  py-2 border-2 border-solid  rounded"
                placeholder="Select Date"
              ></datepicker>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <div class="mb-5">
              <div class="flex item-center justify-between">
                <label class="font-semibold">Quote No:</label>

                <!-- <span>
                  <button
                    v-if="!getIsQuotationCodeSetup"
                    type="button"
                    class="text-cloudenly-primary-main cursor-pointer"
                    @click="quoteDrawer = true"
                  >
                    Setup code number
                  </button>
                </span> -->
              </div>
            </div>
            <div class="md:w-full">
              <input
                
                v-model="quotationData.quoteNumber"
                type="text"
                class="px-2 py-2 border-2 border-gray-400 rounded w-full"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-10">
            <div class="w-full">
              <div class="mb-5">
                <label class="font-semibold" for>Sales Person:</label>
              </div>
              <div class>
                <select
                  v-model="quotationData.salesChannel"
                  class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                  name
                  id
                >
                  <option
                    v-for="(user, index) in getOptimaUsers"
                    :key="index"
                    :value="user.id"
                  >
                    {{ user.fname }}-
                    {{ user.lname }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
        <div class="col-4">
          <div class="mb-10">
            <div class="mb-5">
              <label class="font-semibold" for>Validity Period:</label>
            </div>
            <div class="md:w-full flex">
              <select
                v-model="quotationData.validityType"
                class="w-1/3 py-2 border-2 border-gray-400"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
              <input
                type="text"
                class="w-2/3 py-2 px-3 mr-1 border-2 border-gray-400"
                placeholder="Enter Value"
                v-model="quotationData.validityDur"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-10">
            <div class="mb-5">
              <label class="font-semibold" for>Currency:</label>
            </div>
            <div class="w-full">
              <select
                class="w-full py-2 border-2 border-solid border-gray-400 px-2 rounded"
                v-model="quotationData.currency"
              >
                <option
                  v-for="(currency, index) in currencyList"
                  :key="index"
                  :value="currency"
                >
                  {{ currency }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-5">
            <label class="font-semibold" for>Payment Terms:</label>
          </div>
          <textarea
            v-model="quotationData.paymentTerms"
            class="py-3 px-2 border-2 border-gray-400 w-full rounded"
            name
            id
            cols="30"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
        <div class="col-4">
          <div class>
            <div class="mb-5">
              <label class="font-semibold" for>Reference No.:</label>
            </div>
            <div class="w-full">
              <input
                type="text"
                class="w-full py-2 px-3 mr-1 border-2 border-gray-400"
                placeholder="Enter Value"
                v-model="quotationData.reference"
                name
                id
              />
            </div>
          </div>
        </div>
      </div>

      <hr class="mt-8" />

      <div class="pt-3">
        <section>
          <div class="mt-3">
            <p class="font-bold text-dark-optima-color">Bill of Quantity</p>
          </div>

          <div id="div-with-loading" class="vs-con-loading__container mt-8">
            <div class="overflow-x-auto">
              <table style="width: 100%" class="table w-full mb-3">
                <thead>
                  <tr class>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Item Name
                    </th>

                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Matching Item
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      UofM
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Unit Price
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Quantity
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Discount Rate (%)
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Total Discount
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Total (Ex Tax)
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Total Tax
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Discounted Unit Rate
                    </th>
                    <th
                      class="py-3 px-6 tracking-wider font-semibold text-primary-optima-color"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(boq, index) in selectedItem"
                    :key="index"
                    class="mb-5"
                  >
                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      <input
                        v-model="boq.name"
                        type="text"
                        class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                      />
                    </td>

                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
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

                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-400"
                    >
                      <input
                        v-model="boq.unitOfMeasure"
                        type="text"
                        class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                      />
                    </td>

                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-400"
                    >
                      <input
                        @keyup="calcLineTotal(boq)"
                        v-model="boq.unitPrice"
                        type="text"
                        class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                      />
                    </td>

                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-400"
                    >
                      <input
                        v-model="boq.quantity"
                        type="text"
                        class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                        @keyup="calcLineTotal(boq)"
                      />
                    </td>
                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      <input
                        v-model="boq.discountRate"
                        type="text"
                        class="py-2 px-2 border-2 border-solid border-gray-400 w-full rounded"
                        @keyup="calcLineTotal(boq)"
                      />
                    </td>
                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      <span
                        class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                        >{{ boq.lineDiscountAmount | formatCurrency }}</span
                      >
                    </td>

                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      <span
                        class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                        >{{ boq.lineTotalExcludingTax | formatCurrency }}</span
                      >
                    </td>
                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                      style="width: 10%"
                    >
                      <vs-dropdown
                        class="text-center"
                        vs-custom-content
                        vs-trigger-click
                      >
                        <p
                          class="text-center center text-cloudenly-primary-main pl-5 flex cursor-pointer border-2 border-solid py-3 ml-2 pr-5 rounded"
                        >
                          {{ boq.totalTax | formatCurrency }}
                        </p>

                        <vs-dropdown-menu>
                          <ul style="min-width: 23rem">
                            <li
                              v-for="(vat, index) in boq.quoteBoqTaxes"
                              :key="index"
                              class="flex py-2 px-4 cursor-pointer"
                            >
                              {{ vat.name }} - {{ vat.rate }}% :
                              <span class="ml-5 text-cloudenly-warning-main">
                                Tax Amount =
                                {{ vat.amount | currency }}
                              </span>
                            </li>
                          </ul>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </td>
                    <td
                      class="px-3 text-center py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      <span
                        class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                        >{{ boq.discountedUnitRate | formatCurrency }}</span
                      >
                    </td>
                    <td
                      class="px-3 py-3 whitespace-no-wrap border-b border-gray-200 text-center"
                    >
                      <feather-icon
                        @click="deleteItem(index)"
                        icon="TrashIcon"
                        svgClasses="w-6 h-6  cursor-pointer "
                      ></feather-icon>
                    </td>
                  </tr>

                  <tr class="pt-8 mt-8 mb-5">
                    <td style="width: 25%" class="pt-3"></td>
                    <td style="width: 20%"></td>
                    <td></td>
                    <td style="width: 15%" class="text-center mt-3 pt-3">
                      <p class="text-cloudenly-primary-main">Sub Total</p>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 5%"></td>
                    <td
                      class="text-center leading-loose font-normal tracking-widest"
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalDiscountAmount | currency }}
                    </td>
                    <td
                      class="text-center leading-loose font-normal tracking-widest"
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalExcludingTax | currency }}
                    </td>
                    <td
                      class="text-center leading-loose font-normal tracking-widest"
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalTaxAmount | currency }}
                    </td>
                    <td style="width: 10%"></td>
                    <td class="text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr class="mt-5" />

          <div>
            <p class="mt-8">
              * Please note these settings will affect your item Bill of
              Quantity
            </p>

            <div class="mt-5 grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
              <!-- apply promo section -->
              <!-- <div class="col-4">
                <div class="mb-5">
                  <div class="mb-5">
                    <label class="font-semibold" for>Apply Promo:</label>
                  </div>

                  <div class="flex items-center">
                    <input
                      v-model="promoCode"
                      type="text"
                      placeholder="Enter Promo Code"
                      class="py-2 px-2 mr-8 border-2 border-gray-400 rounded"
                    />

                    <button
                      @click="promoModal = true"
                      type="button"
                      class="text-sm text-cloudenly-primary-main"
                    >
                      Apply Promo
                    </button>
                  </div>
                </div>
              </div> -->

              <div class="col-4 mt-8">
                <div class="mb-5">
                  <div class="mb-5">
                    <label class="font-semibold" for>Delivery Charge:</label>
                  </div>

                  <div class="flex items-center">
                    <div class="mr-5">
                      <input
                        @keyup="calShippingCharge"
                        v-model="quotationData.shippingCharge"
                        type="text"
                        class="py-2 px-2 border-2 border-gray-400 rounded"
                      />
                    </div>

                    <div>
                      <select
                        @change="calShippingCharge"
                        v-model="quotationData.shippingChargeTaxPolicy"
                        class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                        name
                        id
                      >
                        <option value="taxExclusive">Tax Exclusive</option>
                        <option value="taxInclusive">Tax Inclusive</option>
                        <option value="taxExempt">Exempt</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-4 mt-8">
                <div class="mb-5">
                  <div class="mb-5">
                    <label class="font-semibold" for>Special Discount:</label>
                  </div>

                  <div class="flex items-center">
                    <div class="mr-5">
                      <input
                        @keyup="calTaxSpecialDiscount"
                        v-model="quotationData.specialDiscount"
                        type="text"
                        class="py-2 px-2 border-2 border-gray-400 rounded w-full"
                      />
                    </div>

                    <div>
                      <select
                        @change="calTaxSpecialDiscount"
                        v-model="quotationData.specialDiscountTaxPolicy"
                        class="py-2 px-2 border-2 border-gray-400 w-full rounded"
                        name
                        id
                      >
                        <option value="taxExclusive">Exclusive</option>
                        <option value="taxInclusive">Inclusive</option>
                        <option value="taxExempt">Exempt</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="mt-5" />

          <div class="mt-5">
            <div class="flex justify-between">
              <div class="w-1/3">
                <textarea
                  v-model="quotationData.comment"
                  class="w-full py-3 px-2 border-2 border-gray-400 rounded"
                  placeholder=" Enter Note for customer"
                  column="30"
                  rows="4"
                ></textarea>
              </div>
              <table class="table">
                <tbody>
                  <tr v-for="(vat, index) in calTotalTaxPolicy" :key="index">
                    <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                      {{ vat.name }}
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        vat.amount | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr>

                  <tr>
                    <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                      Total Sales Tax
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calTotalSalesTax | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr>

                  <tr>
                    <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                      Quotation Total
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calSalesQuoteTotal | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr>

                  <tr>
                    <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                      Total Customer Discount
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calTotalCustomerDiscount | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer-->

      <hr class="mt-5" />

      <div class="pb-10 px-2 mt-8">
        <div class="flex justify-between">
          <div>
            <button
              @click="routeBack"
              type="button"
              class="px-5 rounded-full text-lg py-3 bg-gray-200 text-primary-optima-color"
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              @click="processModal = true"
              type=" button"
              :class="{
                'cursor-not-allowed': processButton,
                'bg-cloudenly-primary-mid': processButton,
              }"
              class="mr-5 px-5 rounded-full flex items-center py-3 text-lg text-white bg-primary-optima-color"
            >
              <span>Process Quotation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import AddCustomerWidget from "../../../components/AddItemWidget/catalogue";
import AddItemWidget from "../../../components/AddItemWidget/customerPricebook";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import currencyList from "../../../../utils/currency.js";
import { mapGetters } from "vuex";
import Drawer from "../../../components/Drawer/drawer";

export default {
  components: {
    Datepicker,
    AddCustomerWidget,
    AddItemWidget,
    VuePerfectScrollbar,
    Drawer,
  },

  data() {
    return {
      isDeliveryTaxOpen: false,
      isSpecialDiscTaxOpen: false,
      processModal: false,
      promoCode: "",
      promoModal: false,
      currencyList: currencyList,
      customerModal: false,
      saveCustomerButton: false,
      processButton: false,
      allVat: {},
      selectedItem: [],
      selectedCustomer: {},
      showCustomer: false,
      showSelected: true,
      totalTaxRate: [],
      itemMatched: {},

      quotationData: {
        customer: {},
        description: null,
        quoteNumber: null,
        currency: null,
        validityType: null,
        validityDur: null,
        deliveryAddress: null,
        billingAddress: null,
        salesChannel: null,
        recurringInvoice: false,
        isRental: false,

        reference: "",

        comment: "",

        serviceSubTotal: 0, // don't know what this is for
        productSubTotal: 0, // don't know what this is for

        taxSubTotal: 0,
        lineSubTotalExTax: 0,

        shippingCharge: 0,
        specialDiscount: 0,

        totalExTax: 0,
        salesTaxTotal: 0,

        quoteTotal: 0, // total quotation amount

        totalDiscount: 0, // total customer discount

        quoteBoqs: [],

        quoteBoqTotalTaxes: [],

        totalExTaxAmount: 0,
        totalTaxAmount: 0,

        totalSalesTax: 0,

        // outlet: '',
        paymentTerms: "",
        deliveryDate: new Date(),
        salesPerson: "",

        shippingChargeTaxPolicy: "taxExempt",
        specialDiscountTaxPolicy: "taxExempt",

        totalTaxOnShippingCharge: 0,
        totalTaxOnSpecialDiscount: 0,

        quoteSpecialDiscountTaxes: [],
        quoteShippingChargeTaxes: [],

        totalSubLineTotalDiscountAmount: 0,
        totalSubLineTotalExcludingTax: 0,
        totalSubLineTotalTax: 0,
        totalCustomerDiscount: 0, //total customer discount
      },

      quoteDrawer: false,
      message: "",
      saveCodeButton: false,
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
        type: "slash",
      },
    };
  },

  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isDeliveryTaxOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },

  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  methods: {
    routeBack() {
      this.$router.push({
        name: "ProformaQuote",
      });
    },

    // eslint-disable-next-line no-unused-vars
    matchItem(val, index) {
      // console.log(val.itemMatched , index )
      this.selectedItem.forEach((resp, i) => {
        if (index === i) {
          val.supplierVariantSku = val.itemMatched.variantSku;
          val.supplierVariantId = val.itemMatched.id;
          val.customerVariantSku = val.customerVariantSku;
          val.customerVariantId = val.customerVariantId;
          val.name = val.name;
          val.category = val.category;
          val.itemClass = this.itemClass;
          val.unitOfMeasure = val.itemMatched.retailPriceBooks[0].unitOfSale;
          val.discountRate = val.itemMatched.retailDiscountLimit;
          val.unitPrice =
            val.itemMatched.retailPriceBooks[0].recommendedRetailPrice || 0;
          val.quantity = val.quantity;
          val.discountedUnitRate = 0;
          val.lineDiscountAmount = 0;
          val.discountedLineTotal = 0;
          val.lineTotalExcludingTax = 0;
          val.totalTax = 0;
          val.quoteBoqTaxes = [];
          val.unitRateExcludingTax = 0; // this  is to calculate exclusive price for purchase order
          val.unitRateIncludingTax = 0; // this is to calculate inclusive price for purchase order
          val.taxType = val.itemMatched.item.taxType;
          (val.quoteTaxPolicyRates = val.itemMatched.item.taxes.map((resp) => {
            return {
              name: resp.name,
              amount: resp.amount,
            };
          })),
            (val.totalTaxes = val.itemMatched.totalTaxes);
          this.calcLineTotal(val);
        }
      });
    },

    outside: function() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    close() {
      this.quoteDrawer = false;
    },

    // This calculate line item tax, discount and all other calculation on the boq base on the item tax policy
     calcLineTotal(val) {
      // console.log(val);
      let taxPolicy = val.taxType;
      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          // console.log(val, "at tax exclusive");
          const exclusiveQuantity = Number.parseFloat(val.quantity || 0);
          const exclusiveUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const exclusiveDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =  exclusiveUnitPrice * (1 - exclusiveDiscRate / 100);
          val.lineDiscountAmount =  (exclusiveQuantity * exclusiveUnitPrice * exclusiveDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * exclusiveQuantity;
          (val.totalTax = (Number.parseFloat(val.totalTaxes || 0) * val.discountedLineTotal) / 100),

          (val.lineTotalExcludingTax = val.discountedLineTotal);
          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + val.totalTax / exclusiveQuantity;

          console.log(val.discountedLineTotal)
          // This is to calculate tax component on each item
          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (Number.parseFloat(resp.amount) * Number.parseFloat(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          // Engine for Inclusive Engine
          // console.log(val, "at tax inclusive");

          const inclusiveQuantity = Number.parseFloat(val.quantity || 0);
          const inclusiveUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const inclusiveDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            inclusiveUnitPrice * (1 - inclusiveDiscRate / 100);
          val.lineDiscountAmount =
            (inclusiveQuantity * inclusiveUnitPrice * inclusiveDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * inclusiveQuantity;

          let lineTotalExcludingTax =
            val.discountedLineTotal / (1 + val.totalTaxes / 100);
          val.lineTotalExcludingTax = lineTotalExcludingTax.toFixed();

          let totalTax = (val.totalTaxes * val.lineTotalExcludingTax) / 100;
          val.totalTax = totalTax.toFixed();

          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (resp.amount * val.lineTotalExcludingTax) / 100,
            };
          });

          val.unitRateExcludingTax =
            val.lineTotalExcludingTax / inclusiveQuantity;
          val.unitRateIncludingTax =
            val.totalTaxAmount + val.lineTotalExcludingTax / inclusiveQuantity;

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          // Engine for Tax Exempt
          // console.log(val, "at tax exempt");
          const taxExemptQuantity = Number.parseFloat(val.quantity || 0);
          const taxExemptUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const taxExemptDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            taxExemptUnitPrice * (1 - taxExemptDiscRate / 100);
          val.lineDiscountAmount =
            (taxExemptQuantity * taxExemptUnitPrice * taxExemptDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * taxExemptQuantity;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax =
            val.discountedLineTotal + 0 / exclusiveQuantity;

          // This is to calculate tax component on each item
          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case null:
          // Engine for null
          // console.log(val, "at tax null");
          const nullQuantity = Number.parseFloat(val.quantity || 0);
          const nullUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const nullDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate = nullUnitPrice * (1 - nullDiscRate / 100);
          val.lineDiscountAmount =
            (nullQuantity * nullUnitPrice * nullDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * nullQuantity;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + 0 / nullQuantity;

          // This is to calculate tax component on each item
          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        default:
          // console.log(val, "at tax default");
          const defaultQty = Number.parseFloat(val.quantity || 0);
          const defaultUnitPrice = Number.parseFloat(val.unitPrice);
          const defaultRateDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            defaultUnitPrice * (1 - defaultRateDiscRate / 100);
          val.lineDiscountAmount =
            (defaultQty * defaultUnitPrice * defaultRateDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * defaultQty;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + 0 / defaultQty;

          // This is to calculate tax component on each item
          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
            };
          });
          break;
      }
    },

    // calculate ta on shipping cost
     calShippingCharge() {
      // console.log('hello here', this.spingChargeTaxPolicy)
      let shippingChargeTaxPolicy = this.quotationData.shippingChargeTaxPolicy;
      this.isDeliveryTaxOpen = false;
      switch (shippingChargeTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (let i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal = exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;

          this.quotationData.totalTaxOnShippingCharge =
            (Number.parseFloat(this.quotationData.shippingCharge) *
              exclusiveTotalTaxes) /
            100;
          this.quotationData.quoteShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number.parseFloat(resp.amount) * this.quotationData.shippingCharge) /
                  100,
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          let InclusiveTaxes = this.allVat.taxes;
          let inclusiveTotal = 0;
          for (let i = 0; i < InclusiveTaxes.length; i++) {
            inclusiveTotal = inclusiveTotal + Number.parseFloat(InclusiveTaxes[i].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.quotationData.shippingCharge) /
            (1 + inclusiveTotalTaxes / 100);

          this.quotationData.totalTaxOnShippingCharge =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) / 100;

          this.quotationData.quoteShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) * Number.parseFloat(lineTotalExcludingTax)) / 100,
              };
            }
          );

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          this.quotationData.totalTaxOnShippingCharge = 0;
          this.quotationData.quoteShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.quotationData.shippingCharge) / 100,
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        default:
          this.quotationData.totalTaxOnShippingCharge = 0;
          this.quotationData.quoteShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.quotationData.shippingCharge) / 100,
              };
            }
          );

          break;
      }
    },

      calTaxSpecialDiscount() {
      let specialDiscountTaxPolicy =
        this.quotationData.specialDiscountTaxPolicy;
      console.log(specialDiscountTaxPolicy);
      this.isSpecialDiscTaxOpen = false;
      switch (specialDiscountTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (var i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal = exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;
          this.quotationData.totalTaxOnSpecialDiscount =
            (Number.parseFloat(this.quotationData.specialDiscount) *
              exclusiveTotalTaxes) /
            100;
          this.quotationData.quoteSpecialDiscountTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) * this.quotationData.specialDiscount) /
                  100,
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          let inclusiveTaxes = this.allVat.taxes;
          let inclusiveTotal = 0;
          for (var a = 0; a < inclusiveTaxes.length; a++) {
            inclusiveTotal = inclusiveTotal + Number.parseFloat(inclusiveTaxes[a].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.quotationData.specialDiscount) /
            (1 + inclusiveTotalTaxes / 100);
          this.quotationData.totalTaxOnSpecialDiscount =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) / 100;
          this.taxesOnSpecialDiscount = this.allVat.taxes.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount:
                (Number.parseFloat(resp.amount) * Number.parseFloat(lineTotalExcludingTax)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          this.quotationData.totalTaxOnSpecialDiscount = 0;
          this.quotationData.quoteSpecialDiscountTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                name: resp.name,
                rate: resp.amount,
                amount: 0,
              };
            }
          );

          break;

        default:
          this.quotationData.totalTaxOnSpecialDiscount = 0;
          this.quotationData.quoteSpecialDiscountTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                name: resp.name,
                rate: resp.amount,
                amount: 0,
              };
            }
          );

          break;
      }
    },

    processQuotation() {
      this.processButton = true;
      this.quotationData.customer = {
        supplierOrgId: this.$store.state.auth.auth.authData.orgId,
        contactId: this.selectedCustomer.contactId,
        email: this.selectedCustomer.email,
        name: this.selectedCustomer.name,
        address: this.selectedCustomer.address,
        contactName: this.selectedCustomer.contactName,
        phoneNumber: this.selectedCustomer.phoneNumber,
      };

      this.quotationData.quoteBoqTotalTaxes = this.totalTaxRate;
      this.quotationData.quoteBoqs = this.selectedItem;
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: this.quotationData,
      };
      this.processModal = false;
      this.$store
        .dispatch("sales/Quotation/createQuotation", data)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                quoteId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("sales/Quotation/sendQuotation", data2)
              .then((resp) => {
                this.processModal = false;
                this.processButton = false;
                this.$vs.notify({
                  title: "Quotation",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
          }
          this.$router.push({
            name: "ProformaQuote",
          });
        })
        .catch((err) => {
          this.processButton = false;
          this.processModal = true;
          this.$vs.notify({
            title: "Quotation",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    saveQuotationCode() {
      this.saveCodeButton = true;
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
        .dispatch("sales/Quotation/createQuotationCode", dataPayload)
        .then((resp) => {
          // console.log(resp);
          this.saveCodeButton = false;
          this.$vs.notify({
            title: "Quotation Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.previewCode();
          // this.quoteDrawer = false;
        })
        .catch((err) => {
          this.saveCodeButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Quotation Code",
            text: "Code Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    previewCode() {
      this.$vs.loading({
        container: "#div-with-loading-preview",
        scale: 0.5,
      });
      let userInfo = this.$store.state.auth.auth.authData;
      delete userInfo.orgInfo;
      this.$store
        .dispatch("sales/Quotation/getQuotationCode")
        .then((resp) => {
          this.message = "";
          let format = resp.data.setting.codeFormat;
          (this.suffix = format.suffix),
            (this.prefix = format.prefix),
            (this.roots = format.roots[0]);
          this.separator = format.separator;
        })
        .catch((err) => {
          console.log(err);
        });

      let data = {
        userInfo: userInfo,
        payload: {
          moduleName: "QUOTE",
          yearOfBirth: null,
          contactName: null,
        },
      };
      this.$store
        .dispatch("sales/Quotation/getGeneratedQuotationCode", data)
        .then((resp) => {
          this.previewFormat = resp.data.code;
          this.quotationData.quoteNumber = resp.data.code;
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        });
    },
  },

  computed: {
    ...mapGetters("catalogue", ["getAllVat", "getAllVariant"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),
    ...mapGetters("sales/Quotation", ["getIsQuotationCodeSetup"]),

    
    calTotalSubLineTotalDiscountAmount() {
      let totalSubLineTotalDiscountAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalDiscountAmount =
          totalSubLineTotalDiscountAmount +
          Number.parseFloat(this.selectedItem[i].lineDiscountAmount);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.quotationData.totalSubLineTotalDiscountAmount =
        totalSubLineTotalDiscountAmount);
    },

    calTotalSubLineTotalExcludingTax() {
      let totalSubLineTotalExcludingTax = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalExcludingTax =
          totalSubLineTotalExcludingTax +
          Number.parseFloat(this.selectedItem[i].lineTotalExcludingTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.totalSubLineTotalExcludingTax =
        totalSubLineTotalExcludingTax;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.quotationData.totalSubLineTotalExcludingTax;
      // return (this.quotationData.totalExTaxAmount = totalExTax);
    },

    calTotalSubLineTotalTaxAmount() {
      let totalSubLineTotalTaxAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        // console.log(this.selectedItem[i].totalTax)
        totalSubLineTotalTaxAmount = totalSubLineTotalTaxAmount + Number.parseFloat(this.selectedItem[i].totalTax);
      }
      // console.log(totalSubLineTotalTaxAmount)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.taxSubTotal = totalSubLineTotalTaxAmount;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.quotationData.totalSubLineTotalTax =
        totalSubLineTotalTaxAmount);
    },

    calTotalSalesTax() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.salesTaxTotal =
        Number.parseFloat(this.quotationData.totalSubLineTotalTax || 0) +
        Number.parseFloat(this.quotationData.totalTaxOnShippingCharge || 0) -
        Number.parseFloat(this.quotationData.totalTaxOnSpecialDiscount || 0);
      return this.quotationData.salesTaxTotal;
    },

    // quote total
    calSalesQuoteTotal() {
      let total =
        Number.parseFloat(this.quotationData.totalSubLineTotalExcludingTax || 0) +
        Number.parseFloat(this.quotationData.shippingCharge || 0) -
        Number.parseFloat(this.quotationData.specialDiscount || 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.quotationData.quoteTotal =
        Number.parseFloat(total) + Number.parseFloat(this.quotationData.salesTaxTotal));
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // return this.quotationData.totalSaleInvoice = Number.parseFloat(total) + Number.parseFloat(this.quotationData.salesTaxTotal)
    },

    // total customer discount
    calTotalCustomerDiscount() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.totalCustomerDiscount =
        Number.parseFloat(this.quotationData.totalSubLineTotalDiscountAmount | 0) +
        Number.parseFloat(this.quotationData.specialDiscount | 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.totalDiscount =
        this.quotationData.totalCustomerDiscount;
      return this.quotationData.totalCustomerDiscount;
    },

    calTotalTaxPolicy() {
      let taxrateTotal = {};
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalTaxRate = [];
      let tax = this.selectedItem.map((resp) => {
        return resp.quoteBoqTaxes;
      });

      tax.push(this.quotationData.quoteSpecialDiscountTaxes);
      tax.push(this.quotationData.quoteShippingChargeTaxes);

      // flatten all tax array of object
      var taxeRateComponent = [].concat.apply([], tax);
      taxeRateComponent.forEach((result) => {
        if (taxrateTotal.hasOwnProperty(result.name)) {
          taxrateTotal[result.name] = taxrateTotal[result.name] + result.amount;
        } else {
          taxrateTotal[result.name] = result.amount;
        }
      });

      for (var resp in taxrateTotal) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalTaxRate.push({
          // taxId: resp.id,
          name: resp,
          amount: taxrateTotal[resp],
        });
      }

      return this.totalTaxRate;
    },
  },

  mounted() {
    let id = this.$route.params.id;

    this.$store
      .dispatch("sales/Request/getSingleReceivedRequestQuote", id)
      .then((resp) => {
        // console.log(resp.data);
        this.quotationData.customer = resp.data.senderInfo;
        this.selectedCustomer = resp.data.senderInfo;
        this.quotationData.currency = resp.data.requestForQuote.currency;
        this.quotationData.deliveryAddress =
          resp.data.requestForQuote.deliveryAddress;
        this.quotationData.billingAddress =
          resp.data.requestForQuote.deliveryAddress;
        this.quotationData.description = resp.data.requestForQuote.description;
        this.quotationData.originObject = "requestForQuote";
        this.quotationData.originId = resp.data.id;
        this.quotationData.reference =
          resp.data.requestForQuote.requestForQuoteNumber;

        this.selectedItem = resp.data.requestForQuote.requestForQuoteBoqs.map(
          (resp) => {
            return {
              supplierVariantSku: null,
              supplierVariantId: null,
              customerVariantSku: resp.supplierVariantSku,
              customerVariantId: resp.supplierVariantId,

              name: resp.variantName,
              category: resp.category,
              itemClass: resp.itemClass,
              unitOfMeasure: resp.unitOfSaleUnit,
              description: resp.description,
              discountRate: 0,
              unitPrice: resp.unitPrice,
              quantity: resp.orderQuantity,
              discountedUnitRate: 0,
              lineDiscountAmount: 0,
              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,
              quoteBoqTaxes: [],
              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order
              taxType: null,
              quoteTaxPolicyRates: [],
              totalTaxes: 0,
            };
          }
        );
      });

    this.$store
      .dispatch("sales/Quotation/getQuotationCode")
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

    let data2 = {
      userInfo: this.$store.state.auth.auth.authData,
      payload: {
        moduleName: "QUOTE",
        yearOfBirth: null,
        contactName: null,
      },
    };

    this.$store
      .dispatch("sales/Quotation/getGeneratedQuotationCode", data2)
      .then((resp) => {
        this.quotationData.quoteNumber = resp.data.code;
      });

    this.$store.dispatch("sales/Quotation/getQuotationCode");

    this.$store.dispatch("catalogue/getAllCatalogueVariant");

    let data = {
      userInfo: this.$store.state.auth.auth.authData,
    };
    this.$store
      .dispatch("catalogue/tax/getOutletVat", data)
      .then((resp) => {
        this.allVat = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    this.$store.dispatch("crm/loyalty/getDefaultyLoyalty");
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
  },
};
</script>

<style scoped>
table th {
  white-space: nowrap !important;
}
</style>
