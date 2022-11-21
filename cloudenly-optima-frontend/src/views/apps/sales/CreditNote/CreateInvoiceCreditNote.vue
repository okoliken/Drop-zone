/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-case-declarations */
/* eslint-disable no-case-declarations */
<template>
  <div class>
    <div class="flex items-center">
      <feather-icon
        @click="$router.back()"
        icon="ArrowLeftIcon"
        svgClasses="mr-3 h-6 w-6 cursor-pointer"
      ></feather-icon>
      <span class="border-2 border-black border-t-0 border-b-0 border-l-0 pr-4">
        <p class="font-normal">Back</p>
      </span>
      <p class="ml-3 font-normal">Create Credit Note</p>
    </div>

    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Invoice"
    >
      <div class="container">
        <div
          class="
            p-5
            border border-solid
            rounded
            border-l-4
            border-r-0
            border-b-0
            border-t-0
            border-cloudenly-primary-main
            bg-white
          "
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
              <p>Please note that this Invoice may undergo Approval Process</p>
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
            @click="processInvoice"
            class="
              px-5
              py-2
              mr-5
              bg-cloudenly-primary-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
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

    <!-- setup credit note code code -->
    <Drawer :size="45" :visible="invoiceDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h2>Invoice Code Setup</h2>
      </div>

      <div slot="body">
        <div>
          <div class>
            <div>
              <h3 class="text-xl">Invoice</h3>
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

              <div
                class="
                  mb-8
                  mx-16
                  ml-16
                  border border-solid border-grey-lighter
                  rounded-lg
                "
              >
                <div class="p-3">
                  <div class="flex items-center mb-5">
                    <div class="w-1/4 mr-5 text-right">Prefix</div>

                    <div class="w-1/3 mr-5">
                      <select
                        v-model="prefix.type"
                        name
                        id
                        class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          placeholder="eg: RFQ"
                          class="py-2 px-2 w-full border border-grey"
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
                        class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                        class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                          class="py-2 px-2 w-full border border-grey"
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
                        class="py-2 px-2 w-full border border-grey"
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

                <div class="flex items-center justify-center">
                  <div class="mr-3 text-xl">preview</div>
                  <div
                    id="div-with-loading-preview"
                    class="py-3 vs-con-loading__container"
                  >
                    <span
                      class="
                        px-3
                        py-5
                        my-5
                        border border-solid
                        bg-grey-lighter
                        font-bold
                        text-xl
                        border-grey
                      "
                      >{{ previewFormat | capitalize }}</span
                    >
                  </div>
                </div>

                <div class="flex pb-10 mb-10 mt-10">
                  <div class="mx-auto">
                    <button
                      :disabled="saveButton"
                      @click="saveInvoiceCode"
                      :class="{
                        'cursor-not-allowed': saveButton,
                        'bg-cloudenly-primary-mid': saveButton,
                      }"
                      class="
                        px-10
                        py-3
                        text-xl
                        border-none
                        bg-cloudenly-primary-main
                        rounded
                        text-white
                        cursor-pointer
                      "
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
    </Drawer>
    <!-- End section -->

    <!-- End Setup code number code -->

    <div class="px-5 py-10 mt-5 bg-white shadow rounded">
      <div>
        <p class="font-bold text-dark-optima-color">Credit Note Details</p>
        <div class="row mt-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="mt-2">
              <s-text
                label="Issue To (Customer Name):"
                placeholder="--Select a Customer--"
                class="width"
                v-model="selectedCustomer.name"
              />
            </div>
            <div class="mt-2">
              <s-text
                label="Customer Address:"
                placeholder="--Enter--"
                class="width"
                v-model="invoiceData.billingAddress"
              />
            </div>
            <div class="mt-2">
              <s-text
                label="Order Reference:"
                class="width"
                v-model="invoiceData.reference"
              />
            </div>
            <div class="mt-2">
              <p>Validity:</p>
              <div class="flex">
                <div>
                  <select
                    label="Validity"
                    class="select3"
                    v-model="invoiceData.validityType"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="Month">Months</option>
                  </select>
                </div>
                <div>
                  <s-text class="select4" v-model="invoiceData.validityDur" />
                </div>
              </div>
            </div>
            <div class="mt-2">
              <p>Currency:</p>
              <select
                label="Currency"
                class="select2"
                v-model="invoiceData.currency"
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
            <div class="mt-2">
              <s-text
                label="Payment Terms:"
                class="width"
                v-model="invoiceData.paymentTerms"
              />
            </div>
            <div class="mt-2">
              <p>
                <s-text
                  label="Date:"
                  type="date"
                  v-model="invoiceData.deliveryDate"
                  class="width"
                />
              </p>
            </div>
            <div class="mt-2">
              <s-text
                label="Credit Note ID:"
                class="width"
                v-model="invoiceData.invoiceNumber"
              />
            </div>
            <div class="mt-2">
              <p>Reason for Credit Note:</p>
              <select class="select2" v-model="invoiceData.salesChannel">
                <option value="quantity shortfall">Quantity Shortfall</option>
                <option value="defective item">Defective Item</option>
                <option value="damaged item">Damaged Item</option>
                <option value="sales return">Sales Return</option>
                <option value="incorrect item">Incorrect Item</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <!-- <div class="col-4">
          <div>
            <div class="mb-5 flex items-center justify-between">
              <div>
                <label for class="font-semibold">Customer:</label>
              </div>
            </div>

            <div v-show="showSelected" class="p-3 w-full shadow">
              <p class="text-lg mb-3">{{ selectedCustomer.name }}</p>
              <p class="text-lg">{{ selectedCustomer.email }}</p>
            </div>
          </div>
        </div> -->

        <!-- <div class="col-4">
          <div class="mb-5">
            <label for class="font-semibold"> Address:</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <s-text
                v-model="invoiceData.billingAddress"
                rows="3"
                cols="30"
                class="py-2 px-2 border border-gray-400 w-full rounded"
                placeholder="Enter Address"
              ></s-text>
            </div>
          </div>
        </div> -->

        <!-- <div class="col-4">
          <div class="mb-5">
            <label for class="font-semibold"> Order Reference: </label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea
                v-model="invoiceData.reference"
                rows="3"
                cols="30"
                class="py-2 px-2 border border-gray-400 w-full rounded"
                placeholder="Enter Reference"
              ></textarea>
            </div>
          </div>
        </div> -->
      </div>

      <div class="row mt-5">
        <!-- <div class="col-4">
          <div class="mb-5">
            <label class="block md:text-left" for="inline-full-name">
              Date</label
            >
          </div>
          <div class>
            <datepicker
              v-model="invoiceData.deliveryDate"
              input-class="w-full  py-3 border border-solid  rounded"
              placeholder="Select Date"
            ></datepicker>
          </div>
        </div> -->

        <!-- <div class="col-4">
          <div>
            <div class="mb-5">
              <label class="block" for="inline-full-name">Credit Note No</label>
            </div>
            <div class="md:w-full">
              <input
                disabled
                v-model="invoiceData.invoiceNumber"
                type="text"
                class="py-2 px-2 border border-solid border-grey rounded w-full"
                name
                id
              />
            </div>
          </div>
        </div> -->

        <!-- <div class="col-4">
          <div class="mb-5">
            <div class="w-full">
              <div class="mb-5">
                <label class="block md:text-left text-sm" for="inline-full-name"
                  >Reason for Credit Note</label
                >
              </div>
              <div class>
                <select
                  v-model="invoiceData.salesChannel"
                  class="
                    py-1
                    px-1
                    border border-solid border-grey
                    rounded
                    w-full
                  "
                  name
                  id
                >
                  <option>Quantity Shortfall</option>
                  <option>Defective Item</option>
                  <option>Damaged Item</option>
                  <option>Sales Return</option>
                  <option>Incorrect Item</option>
                </select>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div class="row mt-8">
        <div class="col-4">
          <div class>
            <div class="mb-5">
              <label class="block md:text-left" for="inline-full-name"
                >Validity Period</label
              >
            </div>

            <div class="md:w-full flex">
              <select
                v-model="invoiceData.validityType"
                class="w-1/3 py-1 border border-solid border-gray-400 px-2"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="Month">Months</option>
              </select>

              <input
                type="text"
                class="
                  w-full
                  py-2
                  border border-solid border-gray-400
                  px-2
                  mr-1
                "
                placeholder="Enter Value"
                v-model="invoiceData.validityDur"
                name
                id
              />
            </div>
          </div>
        </div> -->

      <!-- <div class="col-4">
          <div class>
            <div class="mb-5">
              <label class="font-semibold" for>Currency:</label>
            </div>
            <div class="w-full">
              <select
                class="
                  w-full
                  py-1
                  border border-solid border-gray-400
                  px-2
                  rounded
                "
                v-model="invoiceData.currency"
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
        </div> -->
      <!-- 
        <div class="col-4">
          <div class="mb-5">
            <label class="block md:text-left text-sm" for="inline-full-name"
              >Payment Terms</label
            >
          </div>

          <textarea
            v-model="invoiceData.paymentTerms"
            class="py-2 px-2 border border-solid border-gray-400 rounded w-full"
            name
            id
            cols="30"
            rows="3"
          ></textarea>
        </div> -->
      <!-- </div> -->

      <!-- proforma  and customer Details -->

      <hr class="mt-8" />

      <!-- Boqs -->

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
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Item Name
                    </th>

                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Item Description
                    </th>

                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      UofM
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Unit Price
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Quantity
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Disc. Rate (%)
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Total Discount
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Total (Ex Tax)
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Total Tax
                    </th>
                    <th
                      class="
                        py-3
                        px-6
                        tracking-wider
                        font-semibold
                        text-primary-optima-color
                      "
                    >
                      Total(Incl.Tax)
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
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        v-model="boq.name"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                      />
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                        v-model="boq.description"
                      />
                    </td>
                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        v-model="boq.unitOfMeasure"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                      />
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        @keyup="calcLineTotal(boq)"
                        v-model="boq.unitPrice"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                      />
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        v-model="boq.quantity"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                        @keyup="calcLineTotal(boq)"
                      />
                    </td>
                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        v-if="boq.discountRate > 0"
                        v-model="boq.discountRate"
                        type="number"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                        @keyup="calcLineTotal(boq)"
                      />

                      <input
                        v-else
                        v-model="boq.discountRate"
                        type="number"
                        class="
                          py-2
                          px-2
                          border border-solid border-grey
                          w-full
                          rounded
                        "
                        @keyup="calcLineTotal(boq)"
                      />
                    </td>
                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <span
                        class="py-2 px-2 border border-gray-400 w-full rounded"
                        >{{ boq.lineDiscountAmount | formatCurrency }}</span
                      >
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <span
                        class="py-2 px-2 border border-gray-400 w-full rounded"
                        >{{ boq.lineTotalExcludingTax | formatCurrency }}</span
                      >
                    </td>
                    <td
                      class="
                        px-3
                        text-center
                        py-2
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <vs-dropdown
                        class="text-center"
                        vs-custom-content
                        vs-trigger-click
                      >
                        <p
                          class="
                            text-center
                            center
                            text-cloudenly-primary-main
                            pl-5
                            flex
                            cursor-pointer
                            border border-solid
                            py-3
                            ml-2
                            pr-5
                            rounded
                          "
                        >
                          {{ boq.totalTax | formatCurrency }}
                        </p>
                        <vs-dropdown-menu>
                          <ul style="min-width: 23rem">
                            <li
                              v-for="(vat, index) in boq.invoiceBoqTaxes"
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
                      class="
                        px-3
                        text-center
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                      style="width: 10%"
                    >
                      <span
                        class="py-2 px-2 border border-gray-400 w-full rounded"
                        >{{ boq.unitRateIncludingTax | formatCurrency }}</span
                      >
                    </td>
                  </tr>

                  <tr class="pt-3 mt-3 mb-5">
                    <td style="width: 25%" class="pt-3"></td>
                    <td style="width: 20%"></td>
                    <td style="width: 10%"></td>
                    <td style="width: 15%" class="text-center mt-3 pt-3">
                      <p class="text-cloudenly-primary-main">Sub Total</p>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 5%"></td>
                    <td
                      class="text-center leading-loose font-normal"
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalDiscountAmount | currency }}
                    </td>
                    <td
                      class="text-center leading-loose font-normal"
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalExcludingTax | currency }}
                    </td>
                    <td
                      class="text-center leading-loose font-normal"
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

          <p class="font-medium text-cloudenly-primary-main">
            Add an item/service
          </p>

          <hr class="mt-5" />

          <div>
            <h5 class="font-bold text-dark-optima-color mt-3">
              Additional Charges
            </h5>
            <p class="mt-8 font-normal">
              * Please note these settings will affect your item Bill of
              Quantity
            </p>
            <div class="mt-5">
              <label
                class="flex items-center font-normal"
                for="Delivery Charge"
              >
                <input
                  v-model="showShippingAddress"
                  type="checkbox"
                  class="mr-2"
                  name=""
                  id=""
                />
                <span class="font-normal"
                  >Refund of Delivery Charge</span
                ></label
              >
              <div class="flex items-center mt-4">
                <!-- <div> -->
                <div>
                  <s-text
                    label="Delivery Charge:"
                    class="width"
                    placeholder="--Enter--"
                    v-show="showShippingAddress"
                    @keyup="calShippingCharge"
                    v-model="invoiceData.shippingCharge"
                  />
                </div>

                <div>
                  <select
                    v-show="showShippingAddress"
                    @change="calShippingCharge"
                    v-model="invoiceData.shippingChargeTaxPolicy"
                    name=""
                    id=""
                    class="select"
                  >
                    <option value="taxExclusive">Tax Exclusive</option>
                    <option value="taxInclusive">Tax Inclusive</option>
                    <option value="taxExempt">Tax Exempt</option>
                  </select>
                </div>

                <!-- </div> -->
              </div>
            </div>
            <div class="mt-3">
              <label
                class="flex items-center font-normal"
                for="Recovery Special Discount"
              >
                <input
                  v-model="showSpecialDiscount"
                  type="checkbox"
                  class="mr-2"
                  name=""
                  id=""
                />
                <span class="font-normal"
                  >Recovery of Special Discount Given</span
                ></label
              >
              <div class="flex items-center mt-4">
                <div>
                  <s-text
                    label="Special Discount:"
                    class="width"
                    v-show="showSpecialDiscount"
                    @keyup="calTaxSpecialDiscount"
                    v-model="invoiceData.specialDiscount"
                  />
                </div>

                <div>
                  <select
                    name=""
                    id=""
                    class="select"
                    v-show="showSpecialDiscount"
                    @change="calTaxSpecialDiscount"
                    v-model="invoiceData.specialDiscountTaxPolicy"
                  >
                    <option value="taxExclusive">Tax Exclusive</option>
                    <option value="taxInclusive">Tax Inclusive</option>
                    <option value="taxExempt">Tax Exempt</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <label class="flex items-center font-normal" for="Miscellaneous">
                <input
                  v-model="showMiscellaneous"
                  type="checkbox"
                  class="mr-2"
                  name=""
                  id=""
                />
                <span class="font-normal">Miscellaneous</span></label
              >
              <div class="flex items-center mt-4">
                <div>
                  <s-text
                    label="Misc. Charge:"
                    class="width"
                    placeholder="--Enter Comment--"
                    v-show="showMiscellaneous"
                    @keyup="calTaxSpecialDiscount"
                    v-model="invoiceData.miscellaneousAmount"
                  />
                </div>

                <div>
                  <select
                    name=""
                    id=""
                    class="select"
                    v-show="showMiscellaneous"
                    @change="calTaxSpecialDiscount"
                    v-model="invoiceData.miscellaneousTaxPolicy"
                  >
                    <option value="taxExclusive">Tax Exclusive</option>
                    <option value="taxInclusive">Tax Inclusive</option>
                    <option value="taxExempt">Tax Exempt</option>
                  </select>
                </div>

                <div>
                  <s-text
                    label="Comment:"
                    class="width ml-5"
                    placeholder="--Enter Comment--"
                    v-model="invoiceData.miscellaneousComment"
                  />
                </div>
              </div>
            </div>
            <!-- 
            <div class="mt-8">
              <table class="table">
                <tr>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <label class="flex items-center font-normal" for>
                      <input
                        v-model="showShippingAddress"
                        type="checkbox"
                        class="mr-2"
                        name=""
                        id=""
                      />
                      <span class="font-normal"
                        >Refund of Delivery Charge</span
                      ></label
                    >
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    
                    <input
                      v-show="showShippingAddress"
                      @keyup="calShippingCharge"
                      v-model="invoiceData.shippingCharge"
                      type="text"
                      class="py-2 px-2 border border-gray-400 rounded"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <select
                      v-show="showShippingAddress"
                      @change="calShippingCharge"
                      v-model="invoiceData.shippingChargeTaxPolicy"
                      class="py-1 px-2 border border-gray-400 w-full rounded"
                      name
                      id
                    >
                      <option value="taxExclusive">Tax Exclusive</option>
                      <option value="taxInclusive">Tax Inclusive</option>
                      <option value="taxExempt">Tax Exempt</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <label class="flex items-center font-normal" for>
                      <input
                        v-model="showSpecialDiscount"
                        type="checkbox"
                        class="mr-2"
                        name=""
                        id=""
                      />
                      <span class="font-normal">
                        Recovery of Special Discount</span
                      ></label
                    >
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <input
                      v-show="showSpecialDiscount"
                      @keyup="calTaxSpecialDiscount"
                      v-model="invoiceData.specialDiscount"
                      type="text"
                      class="py-2 px-2 border border-gray-400 rounded"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <select
                      v-show="showSpecialDiscount"
                      @change="calTaxSpecialDiscount"
                      v-model="invoiceData.specialDiscountTaxPolicy"
                      class="py-1 px-2 border border-gray-400 w-full rounded"
                      name
                      id
                    >
                      <option value="taxExclusive">Tax Exclusive</option>
                      <option value="taxInclusive">Tax Inclusive</option>
                      <option value="taxExempt">Tax Exempt</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <label class="flex items-center font-normal" for>
                      <input
                        v-model="showMiscellaneous"
                        type="checkbox"
                        class="mr-2"
                        name=""
                        id=""
                      />
                      <span class="font-normal"> Misc. Amount</span></label
                    >
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <input
                      v-show="showMiscellaneous"
                      @keyup="calTaxSpecialDiscount"
                      v-model="invoiceData.miscellaneousAmount"
                      type="text"
                      class="py-2 px-2 border border-gray-400 rounded"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <select
                      v-show="showMiscellaneous"
                      @change="calTaxSpecialDiscount"
                      v-model="invoiceData.miscellaneousTaxPolicy"
                      class="py-1 px-2 border border-gray-400 w-full rounded"
                      name
                      id
                    >
                      <option value="taxExclusive">Tax Exclusive</option>
                      <option value="taxInclusive">Tax Inclusive</option>
                      <option value="taxExempt">Tax Exempt</option>
                    </select>
                  </td>
                </tr>

                <tr v-show="showMiscellaneous">
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <label class="flex items-center font-normal" for>
                      <span class="font-normal"> Misc. Comment</span></label
                    >
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap">
                    <input
                      v-model="invoiceData.miscellaneousComment"
                      type="text"
                      class="py-2 px-2 border border-gray-400 rounded"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap"></td>
                </tr>
              </table>
            </div> -->
          </div>

          <hr class="mt-5" />

          <div class="mt-5">
            <div class="flex justify-between">
              <div class="w-1/3">
                <p>Note to Customer:</p>
                <textarea
                  v-model="invoiceData.comment"
                  class="w-full py-3 px-2 mt-2 border border-gray-400 rounded"
                  placeholder=" Enter Note for customer"
                  column="30"
                  rows="4"
                ></textarea>
                <!-- <s-text label="Note to Customer:" placeholder=" Enter Note for customer"  v-model="invoiceData.comment" class="textarea" /> -->
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
                      Total Tax
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
                      Credit Note Total
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calSalesInvoiceTotal | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr>

                  <!-- <tr>
                    <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                      Total Customer Discount
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calTotalCustomerDiscount | currency
                      }}</span>
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap"></td>
                  </tr> -->
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
              @click="routeCreditNote"
              type="button"
              class="
                px-5
                rounded-full
                py-3
                bg-gray-200
                text-primary-optima-color
              "
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              :disabled="saveButton"
              :class="{
                'cursor-not-allowed': updateButton,
                'bg-cloudenly-primary-off': updateButton,
                'text-white': updateButton,
              }"
              type=" button"
              class="
                mr-5
                px-5
                rounded-full
                py-3
                inline-flex
                items-center
                bg-gray-200
                text-primary-optima-color
              "
            >
              <feather-icon
                v-show="updateButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                class
                icon="CircleIcon"
              ></feather-icon>
              <span>Save as Draft</span>
            </button>

            <button
              :disabled="saveButton"
              :class="{
                'cursor-not-allowed': updateButton,
                'bg-cloudenly-primary-off': updateButton,
                'text-white': updateButton,
              }"
              type=" button"
              class="
                mr-5
                px-5
                rounded-full
                py-3
                inline-flex
                items-center
                text-white
                bg-primary-optima-color
              "
            >
              <feather-icon
                v-show="updateButton"
                svgClasses="animate-spin h-5 w-5 mr-3"
                class
                icon="CircleIcon"
              ></feather-icon>
              <span>Save and Process</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import AddItemWidget from "../../../components/AddItemWidget/customerPricebook";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import currencyList from "../../../../utils/currency.js";
import { mapGetters } from "vuex";
import Drawer from "../../../components/Drawer/drawer";

export default {
  components: {
    Datepicker,
    AddItemWidget,
    VuePerfectScrollbar,
    Drawer,
  },

  data() {
    return {
      showSelected: true,
      showCustomer: false,

      isDeliveryTaxOpen: false,
      isSpecialDiscTaxOpen: false,
      processModal: false,
      message: "",
      updateButton: false,
      promoCode: "",
      promoModal: false,
      currencyList: currencyList,
      customerModal: false,
      saveCustomerButton: false,
      saveButton: false,
      processButton: false,
      allVat: {},
      selectedItem: [],
      selectedCustomer: null,
      totalTaxRate: [],

      showPromo: false,
      showShippingAddress: true,
      showSpecialDiscount: true,
      showMiscellaneous: true,

      invoiceData: {
        customer: {},
        description: null,
        invoiceNumber: null,
        currency: "Nigerian Naira",
        validityType: "days",
        validityDur: null,
        deliveryAddress: null,
        billingAddress: null,
        salesChannel: null,
        recurringInvoice: false,
        isRental: false,
        reference: "",
        comment: "",
        autoRecurSetting: {
          startDate: null,
          endDate: null,
          repeat: null,
        },

        taxSubTotal: 0,
        lineSubTotalExTax: 0,

        shippingCharge: 0,
        specialDiscount: 0,

        totalExTax: 0,
        salesTaxTotal: 0,

        invoiceTotal: 0, // total quotation amount

        totalDiscount: 0, // total customer discount

        invoiceBoqs: [],

        invoiceBoqTotalTaxes: [],

        totalExTaxAmount: 0,
        totalTaxAmount: 0,

        totalSalesTax: 0,

        paymentTerms: "",
        deliveryDate: new Date(),
        salesPerson: "",

        shippingChargeTaxPolicy: "taxExempt",
        specialDiscountTaxPolicy: "taxExempt",
        miscellaneousTaxPolicy: "taxExempt",

        totalTaxOnShippingCharge: 0,
        totalTaxOnSpecialDiscount: 0,

        invoiceSpecialDiscountTaxes: [],
        invoiceShippingChargeTaxes: [],

        totalSubLineTotalDiscountAmount: 0,
        totalSubLineTotalExcludingTax: 0,
        totalSubLineTotalTax: 0,
        totalCustomerDiscount: 0, //total customer discount

        miscellaneousAmount: 0,
        miscellaneousComment: "",
      },

      network: {
        makeNetworkPublic: false,
        exposePricebook: false,
        contactOrgId: null,
        contactCategory: "retail",
        isDualCategory: false,
        category: "customer",
        kind: null,
        name: null,
        code: null,
        profile: "",
        industrySector: null,
        productServiceInterest: null,
        address: null,
        location: null,
        city: null,
        country: null,
        state: null,
        zipCode: null,
        contactPerson: null,
        phone: null,
        email: null,
        birthday: null,
        taxSettings: null,
        taxId: null,
        registrationNumber: null,
        isRestricted: false,
        accountManager: [],
        manageException: [],
        discountList: false,
        sendPromoAlert: false,
        loyaltySchemeId: null,
        loyaltyCommencementDate: null,
        leadStatus: "new",
      },
      invoiceDrawer: false,
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

  methods: {
    close() {
      this.invoiceDrawer = false;
    },

    hide() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    routeNumbering() {
      this.$router.push({
        name: "documentCode",
      });
    },

    routeCreditNote() {
      this.$router.push({
        name: "CreditNote",
      });
    },

    // This calculate line item tax, discount and all other calculation on the boq base on the item tax policy
    calcLineTotal(val) {
      let taxPolicy = val.taxType;
      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          // console.log(val, "at tax exclusive");
          const exclusiveQuantity = parseInt(val.quantity || 0);
          const exclusiveUnitPrice = parseInt(val.unitPrice || 0);
          const exclusiveDiscRate = parseInt(val.discountRate || 0);

          val.discountedUnitRate =
            exclusiveUnitPrice * (1 - exclusiveDiscRate / 100);
          val.lineDiscountAmount =
            (exclusiveQuantity * exclusiveUnitPrice * exclusiveDiscRate) / 100;

          val.discountedLineTotal = val.discountedUnitRate * exclusiveQuantity;
          (val.totalTax = (val.totalTaxes * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax =
            val.discountedLineTotal + val.totalTax / exclusiveQuantity;

          // This is to calculate tax component on each item
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount:
                (Number(resp.amount) * Number(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          // Engine for Inclusive Engine
          console.log(val, "at tax inclusive");

          const inclusiveQuantity = parseInt(val.quantity || 0);
          const inclusiveUnitPrice = parseInt(val.unitPrice || 0);
          const inclusiveDiscRate = parseInt(val.discountRate || 0);

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

          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
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
          console.log(val, "at tax exempt");
          const taxExemptQuantity = parseInt(val.quantity || 0);
          const taxExemptUnitPrice = parseInt(val.unitPrice || 0);
          const taxExemptDiscRate = parseInt(val.discountRate || 0);

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
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
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
          console.log(val, "at tax null");
          const nullQuantity = parseInt(val.quantity || 0);
          const nullUnitPrice = parseInt(val.unitPrice || 0);
          const nullDiscRate = parseInt(val.discountRate || 0);

          val.discountedUnitRate = nullUnitPrice * (1 - nullDiscRate / 100);
          val.lineDiscountAmount =
            (nullQuantity * nullUnitPrice * nullDiscRate) / 100;
          val.discountedLineTotal = val.discountedUnitRate * nullQuantity;

          (val.totalTax = (0 * val.discountedLineTotal) / 100),
            (val.lineTotalExcludingTax = val.discountedLineTotal);

          val.unitRateExcludingTax = val.discountedLineTotal;
          val.unitRateIncludingTax = val.discountedLineTotal + 0 / nullQuantity;

          // This is to calculate tax component on each item
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
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
          console.log(val, "at tax default");
          const defaultQty = parseInt(val.quantity || 0);
          const defaultUnitPrice = parseInt(val.unitPrice);
          const defaultRateDiscRate = parseInt(val.discountRate || 0);

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
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number(val.discountedLineTotal)) / 100,
            };
          });
          break;
      }
    },

    // calculate tax on shipping cost
    calShippingCharge() {
      // console.log('hello here', this.spingChargeTaxPolicy)
      let shippingChargeTaxPolicy = this.invoiceData.shippingChargeTaxPolicy;
      this.isDeliveryTaxOpen = false;
      switch (shippingChargeTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (let i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal = exclusiveTotal + Number(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;

          this.invoiceData.totalTaxOnShippingCharge =
            (parseInt(this.invoiceData.shippingCharge) * exclusiveTotalTaxes) /
            100;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) * this.invoiceData.shippingCharge) / 100,
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          let InclusiveTaxes = this.allVat.taxes;
          let inclusiveTotal = 0;
          for (let i = 0; i < InclusiveTaxes.length; i++) {
            inclusiveTotal = inclusiveTotal + Number(InclusiveTaxes[i].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            parseInt(this.invoiceData.shippingCharge) /
            (1 + inclusiveTotalTaxes / 100);

          this.invoiceData.totalTaxOnShippingCharge =
            (parseInt(lineTotalExcludingTax) * inclusiveTotalTaxes) / 100;

          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) * parseInt(lineTotalExcludingTax)) / 100,
              };
            }
          );

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          this.invoiceData.totalTaxOnShippingCharge = 0;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.invoiceData.shippingCharge) / 100,
              };
            }
          );
          break;

        // eslint-disable-next-line no-case-declarations
        default:
          this.invoiceData.totalTaxOnShippingCharge = 0;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount: (0 * this.invoiceData.shippingCharge) / 100,
              };
            }
          );

          break;
      }
    },

    // calculate tax on special discount
    calTaxSpecialDiscount() {
      let specialDiscountTaxPolicy = this.invoiceData.specialDiscountTaxPolicy;
      console.log(specialDiscountTaxPolicy);
      this.isSpecialDiscTaxOpen = false;
      switch (specialDiscountTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (var i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal = exclusiveTotal + Number(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;
          this.invoiceData.totalTaxOnSpecialDiscount =
            (parseInt(this.invoiceData.specialDiscount) * exclusiveTotalTaxes) /
            100;
          this.invoiceData.invoiceSpecialDiscountTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) * this.invoiceData.specialDiscount) /
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
            inclusiveTotal = inclusiveTotal + Number(inclusiveTaxes[a].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            parseInt(this.invoiceData.specialDiscount) /
            (1 + inclusiveTotalTaxes / 100);
          this.invoiceData.totalTaxOnSpecialDiscount =
            (parseInt(lineTotalExcludingTax) * inclusiveTotalTaxes) / 100;
          this.taxesOnSpecialDiscount = this.allVat.taxes.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount:
                (Number(resp.amount) * parseInt(lineTotalExcludingTax)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxExempt":
          this.invoiceData.totalTaxOnSpecialDiscount = 0;
          this.invoiceData.invoiceSpecialDiscountTaxes = this.allVat.taxes.map(
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
          this.invoiceData.totalTaxOnSpecialDiscount = 0;
          this.invoiceData.invoiceSpecialDiscountTaxes = this.allVat.taxes.map(
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

    // calculate tax on miscellaneous

    saveInvoiceCode() {
      this.saveButton = true;
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
        .dispatch("sales/Invoice/createInvoiceCode", dataPayload)
        .then((resp) => {
          console.log(resp);
          this.saveButton = false;
          this.$vs.notify({
            title: "Invoice Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });

          this.previewCode();
          this.invoiceDrawer = false;
        })
        .catch((err) => {
          this.saveButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Invoice Code",
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
        .dispatch("sales/Invoice/getInvoiceCode")
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
          moduleName: "INV",
          yearOfBirth: null,
          contactName: null,
        },
      };
      this.$store
        .dispatch("sales/Invoice/getGeneratedInvoiceCode", data)
        .then((resp) => {
          this.previewFormat = resp.data.code;
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        });
    },
  },

  computed: {
    ...mapGetters("catalogue", ["getAllVat"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),
    ...mapGetters("sales/Invoice", ["getIsInvoiceCodeSetup"]),

    calTotalSubLineTotalDiscountAmount() {
      let totalSubLineTotalDiscountAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalDiscountAmount =
          totalSubLineTotalDiscountAmount +
          parseInt(this.selectedItem[i].lineDiscountAmount);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.totalSubLineTotalDiscountAmount =
        totalSubLineTotalDiscountAmount);
    },

    calTotalSubLineTotalExcludingTax() {
      let totalSubLineTotalExcludingTax = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalExcludingTax =
          totalSubLineTotalExcludingTax +
          parseInt(this.selectedItem[i].lineTotalExcludingTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalSubLineTotalExcludingTax =
        totalSubLineTotalExcludingTax;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.invoiceData.totalSubLineTotalExcludingTax;
      // return (this.invoiceData.totalExTaxAmount = totalExTax);
    },

    calTotalSubLineTotalTaxAmount() {
      let totalSubLineTotalTaxAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalTaxAmount =
          totalSubLineTotalTaxAmount + parseInt(this.selectedItem[i].totalTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.taxSubTotal = totalSubLineTotalTaxAmount;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.totalSubLineTotalTax =
        totalSubLineTotalTaxAmount);
    },

    calTotalSalesTax() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.salesTaxTotal =
        parseInt(this.invoiceData.totalSubLineTotalTax || 0) +
        parseInt(this.invoiceData.totalTaxOnShippingCharge || 0) -
        parseInt(this.invoiceData.totalTaxOnSpecialDiscount || 0);
      return this.invoiceData.salesTaxTotal;
    },

    // invoice total
    calSalesInvoiceTotal() {
      let total =
        parseInt(this.invoiceData.totalSubLineTotalExcludingTax || 0) +
        parseInt(this.invoiceData.shippingCharge || 0) -
        parseInt(this.invoiceData.specialDiscount || 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.invoiceTotal =
        parseInt(total) + parseInt(this.invoiceData.salesTaxTotal));
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // return this.invoiceData.totalSaleInvoice = parseInt(total) + parseInt(this.invoiceData.salesTaxTotal)
    },

    // total customer discount
    calTotalCustomerDiscount() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalCustomerDiscount =
        parseInt(this.invoiceData.totalSubLineTotalDiscountAmount | 0) +
        parseInt(this.invoiceData.specialDiscount | 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalDiscount = this.invoiceData.totalCustomerDiscount;
      return this.invoiceData.totalCustomerDiscount;
    },

    calTotalTaxPolicy() {
      let taxrateTotal = {};
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalTaxRate = [];
      let tax = this.selectedItem.map((resp) => {
        return resp.invoiceBoqTaxes;
      });

      tax.push(this.invoiceData.invoiceSpecialDiscountTaxes);
      tax.push(this.invoiceData.invoiceShippingChargeTaxes);

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
    // console.log(this.$route.params.id)
    let id = this.$route.params.id;
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
    this.$store.dispatch("sales/Invoice/getSingleInvoice", id).then((resp) => {
      if (resp.data) {
        //  console.log("single invoice", resp.data);
        this.invoiceData = resp.data;
        this.invoiceData.autoRecurSetting = resp.data.autoRecurSetting || {
          startDate: null,
          endDate: null,
          repeat: null,
        };
        this.selectedItem = resp.data.invoiceBoqs;
        console.log(this.selectedItem);
        this.selectedCustomer = resp.data.customer;
        this.$store
          .dispatch(
            "crm/contact/getContactUpdateInvoiceItemAction",
            this.selectedCustomer
          )
          .then((resp) => {
            console.log(resp);
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          });
      }
    });
    // this.$store.dispatch("sales/Invoice/getInvoiceCode");
  },
};
</script>

<style scoped>
table th {
  white-space: nowrap !important;
}
.width {
  width: 300px !important;
}
.select {
  width: 300px !important;
  height: 32px !important;
  border: 0.5px solid !important ;
  border-color: #cccccc !important;
  margin-top: 18px !important;
  margin-left: 20px;
  border-radius: 4px;
}
.select2 {
  width: 300px !important;
  height: 32px !important;
  border: 0.5px solid !important ;
  border-color: #cccccc !important;
  margin-top: 18px !important;
  border-radius: 4px;
}
.select3 {
  width: 80px !important;
  height: 32px !important;
  border: 0.5px solid !important ;
  border-color: #cccccc !important;
  margin-top: 18px !important;
  border-radius: 4px;
}
textarea {
  width: 300px !important;
  height: 70px !important;
  border: 0.5px solid !important ;
  border-color: #cccccc !important;
}
.select4 {
  width: 220px !important;
  margin-top: 18px !important;
}
</style>
