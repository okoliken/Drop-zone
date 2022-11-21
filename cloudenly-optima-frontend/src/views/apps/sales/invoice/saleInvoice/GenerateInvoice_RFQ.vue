/* eslint-disable vue/no-side-effects-in-computed-properties */ /*
eslint-disable no-case-declarations */ /* eslint-disable no-case-declarations */
<template>
  <div class>
    <back location="Generate Invoice" />

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
              px-8
              py-3
              mr-5
              inline-flex
              items-center
              bg-cloudenly-primary-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
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
            class="
              px-10
              py-3
              mr-5
              bg-cloudenly-primary-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
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

    <div class="px-5 py-10 mt-5 bg-white shadow rounded">
      <div class="row flex mt-10">
        <div class="col-4 w-1/3 mr-8">
          <div class>
            <div class="mb-5 flex items-center justify-between">
              <div>
                <label for class="font-semibold">Customer:</label>
              </div>
            </div>

            <div class="p-3 w-full shadow shadow-md">
              <p class="text-lg mb-3">{{ selectedCustomer.name }}</p>
              <p class="text-lg">{{ selectedCustomer.email }}</p>
            </div>
          </div>
        </div>

        <div class="col-4 w-1/3 mr-8">
          <div class="mb-5">
            <label for class="font-semibold">Billing Address:</label>
          </div>
          <div class="form-group row no-gutters mb-10">
            <div class="col-md-12">
              <textarea
                v-model="invoiceData.billingAddress"
                rows="3"
                cols="30"
                class="py-2 px-2 border border-2 border-gray-400 w-full rounded"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4 w-1/3">
          <div class="mb-5">
            <label for class="font-semibold"> Delivery Address: </label>
          </div>
          <div class="form-group row no-gutters mb-10">
            <div class="col-md-12">
              <textarea
                v-model="invoiceData.deliveryAddress"
                rows="3"
                cols="30"
                class="py-2 px-2 border border-2 border-gray-400 w-full rounded"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="row flex mt-8">
        <div class="col-4 w-1/3 mr-8">
          <div class="mb-5">
            <div class="mb-5">
              <label class="font-semibold" for>Delivery Date:</label>
            </div>
            <div class>
              <datepicker
                v-model="invoiceData.deliveryDate"
                input-class="w-full  py-2 border-2 border-solid  rounded"
                placeholder="Select Date"
              ></datepicker>
            </div>
          </div>
        </div>

        <div class="col-4 w-1/3 mr-8">
          <div class>
            <div class="mb-5">
              <label class="font-semibold">Invoice No:</label>
            </div>
            <div class="md:w-full">
              <input
                v-model="invoiceData.invoiceNumber"
                type="text"
                class="px-2 py-2 border-2 border-gray-400 rounded w-full"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4 w-1/3">
          <div class="mb-5">
            <div class="w-full">
              <div class="mb-5">
                <label class="font-semibold" for>Sales Person:</label>
              </div>
              <div class>
                <select
                  v-model="invoiceData.salesChannel"
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

      <div class="row flex mt-8">
        <div class="col-4 w-1/3 mr-8">
          <div class>
            <div class="mb-5">
              <label class="font-semibold" for>Validity Period:</label>
            </div>
            <div class="md:w-full flex">
              <select
                v-model="invoiceData.validityType"
                class="w-1/3 py-1 border-2 border-gray-400"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="Month">Months</option>
              </select>
              <input
                type="text"
                class="w-2/3 py-2 px-3 mr-1 border-2 border-gray-400"
                placeholder="Enter Value"
                v-model="invoiceData.validityDur"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4 w-1/3 mr-8">
          <div class>
            <div class="mb-5">
              <label class="font-semibold" for>Currency:</label>
            </div>
            <div class="w-full">
              <select
                class="
                  w-full
                  py-2
                  border border-2 border-solid border-gray-400
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
        </div>

        <div class="col-4 w-1/3 ">
          <div class="mb-5">
            <label class="font-semibold" for>Payment Terms:</label>
          </div>
          <textarea
            v-model="invoiceData.paymentTerms"
            class="py-3 px-2 border-2 border-gray-400 w-full rounded"
            name
            id
            cols="30"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="col-6 py-5 mt-5 border border-solid border-grey-lighter">
        <div class="flex items-center w-full">
          <p class="font-bold mr-5">make invoice auto-recurring</p>
          <vs-checkbox v-model="invoiceData.recurringInvoice"></vs-checkbox>
        </div>

        <div
          v-show="invoiceData.recurringInvoice"
          class="flex items-center mt-3"
        >
          <div class="mr-3">
            <div class="mb-3">
              <label for>Start Date</label>
            </div>

            <datepicker
              v-model="invoiceData.autoRecurSetting.startDate"
              input-class="w-full  py-3  border-2 border-solid  rounded"
              placeholder="Select Date"
            ></datepicker>
          </div>

          <div class="mr-3">
            <div class="mb-3">
              <label for>End Date</label>
            </div>

            <datepicker
              v-model="invoiceData.autoRecurSetting.endDate"
              input-class="w-full  py-3  border border-2 border-solid  rounded"
              placeholder="Select Date"
            ></datepicker>
          </div>

          <div>
            <div class="mb-3">
              <label for>Frequency</label>
            </div>
            <select
              v-model="invoiceData.autoRecurSetting.repeat"
              class="
                w-full
                py-2
                border border-2 border-gray-400 border-solid
                rounded
              "
              name
              id
            >
              <option value="weeks">Weekly</option>
              <option value="months">Monthly</option>
            </select>
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
                      Matching Item
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
                      Discount Rate (%)
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
                      Discounted Unit Rate
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
                      class="
                        px-3
                        text-center
                        py-3
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
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                      />
                    </td>
                    <td
                      class="
                        px-3
                        text-center
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <select
                        @change="matchItem(boq, index)"
                        v-model="boq.itemMatched"
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
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
                      class="
                        px-3
                        text-center
                        py-3
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
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                      />
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-3
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
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                      />
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-3
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
                          border border-2 border-gray-400
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
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <input
                        v-if="boq.discountRate > 0"
                        v-model="boq.discountRate"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        @keyup="calcLineTotal(boq)"
                      />

                      <input
                        v-else
                        v-model="boq.discountRate"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
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
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <span
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        >{{ boq.lineDiscountAmount | formatCurrency }}</span
                      >
                    </td>

                    <td
                      class="
                        px-3
                        text-center
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                      "
                    >
                      <span
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        >{{ boq.lineTotalExcludingTax | formatCurrency }}</span
                      >
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
                    >
                      <span
                        class="
                          py-2
                          px-2
                          border border-2 border-gray-400
                          w-full
                          rounded
                        "
                        >{{ boq.discountedUnitRate | formatCurrency }}</span
                      >
                    </td>
                    <td
                      class="
                        px-3
                        py-3
                        whitespace-no-wrap
                        border-b border-gray-200
                        text-center
                      "
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
                      class="
                        text-center
                        leading-loose
                        font-normal
                        tracking-widest
                      "
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalDiscountAmount | currency }}
                    </td>
                    <td
                      class="
                        text-center
                        leading-loose
                        font-normal
                        tracking-widest
                      "
                      style="width: 10%"
                    >
                      {{ calTotalSubLineTotalExcludingTax | currency }}
                    </td>
                    <td
                      class="
                        text-center
                        leading-loose
                        font-normal
                        tracking-widest
                      "
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
              <p class="mt-8 font-normal">
                * Please note these settings will affect your item Bill of
                Quantity
              </p>

              <div class="mt-8">
                <table class="table">
                  <!-- <tr>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <label class="flex items-center font-normal" for>
                        <input
                          v-model="showPromo"
                          type="checkbox"
                          class="mr-2"
                          name=""
                          id=""
                        />
                        <span class="font-normal">Apply Promo Code</span></label
                      >
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <input
                        v-show="showPromo"
                        v-model="promoCode"
                        type="text"
                        placeholder="Enter Promo Code"
                        class="py-2 px-2 mr-8 border border-gray-400 border-2 rounded"
                      />
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <button
                        v-show="showPromo"
                        @click="promoModal = true"
                        type="button"
                        class="text-sm text-cloudenly-primary-main"
                      >
                        Apply Promo
                      </button>
                    </td>
                  </tr> -->

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
                        <span class="font-normal">Add Other cost</span></label
                      >
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <input
                        v-show="showShippingAddress"
                        @keyup="calShippingCharge"
                        v-model="invoiceData.shippingCharge"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-gray-400 border-2
                          rounded
                        "
                      />
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <select
                        v-show="showShippingAddress"
                        @change="calShippingCharge"
                        v-model="invoiceData.shippingChargeTaxPolicy"
                        class="
                          py-1
                          px-2
                          border border-gray-400 border-2
                          w-full
                          rounded
                        "
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
                          Add Special Discount</span
                        ></label
                      >
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <input
                        v-show="showSpecialDiscount"
                        @keyup="calTaxSpecialDiscount"
                        v-model="invoiceData.specialDiscount"
                        type="text"
                        class="
                          py-2
                          px-2
                          border border-gray-400 border-2
                          rounded
                        "
                      />
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <select
                        v-show="showSpecialDiscount"
                        @change="calTaxSpecialDiscount"
                        v-model="invoiceData.specialDiscountTaxPolicy"
                        class="
                          py-1
                          px-2
                          border border-gray-400 border-2
                          w-full
                          rounded
                        "
                        name
                        id
                      >
                        <option value="taxExclusive">Tax Exclusive</option>
                        <option value="taxInclusive">Tax Inclusive</option>
                        <option value="taxExempt">Tax Exempt</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </div>


          <hr class="mt-5" />

          <div class="mt-5">
            <div class="flex justify-between">
              <div class="w-1/3">
                <textarea
                  v-model="invoiceData.comment"
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
                      Invoice Total
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <span class="tracking-widest">{{
                        calSalesInvoiceTotal | currency
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
              class="
                px-5
                rounded-full
                py-3
                bg-gray-200
                text-lg text-primary-optima-color
              "
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              @click="processModal = true"
              type=" button"
              class="
                mr-5
                px-5
                rounded-full
                flex
                items-center
                py-3
                text-white text-lg
                bg-primary-optima-color
              "
            >
              <span>Process Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
// import AddCustomerWidget from "../../../components/AddItemWidget/catalogue";
// import AddItemWidget from "../../../components/AddItemWidget/customerPricebook";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import currencyList from "../../../../../utils/currency.js";
import { mapGetters } from "vuex";
import Drawer from "../../../../components/Drawer/drawer";

export default {
  components: {
    Datepicker,
    // AddCustomerWidget,
    // AddItemWidget,
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
        showPromo: false,
      showShippingAddress: false,
      showSpecialDiscount: false,
      invoiceData: {
        customer: {},
        description: null,
        invoiceNumber: null,
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

        // outlet: '',
        paymentTerms: "",
        deliveryDate: new Date(),
        salesPerson: "",

        shippingChargeTaxPolicy: "taxExempt",
        specialDiscountTaxPolicy: "taxExempt",

        totalTaxOnShippingCharge: 0,
        totalTaxOnSpecialDiscount: 0,

        invoiceSpecialDiscountTaxes: [],
        invoiceShippingChargeTaxes: [],

        totalSubLineTotalDiscountAmount: 0,
        totalSubLineTotalExcludingTax: 0,
        totalSubLineTotalTax: 0,
        totalCustomerDiscount: 0, //total customer discount
      },

      invoiceDrawer: false,
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
      this.$router.back()
    },

    // eslint-disable-next-line no-unused-vars
    matchItem(val, index) {
      // console.log(val, index, this.itemMatched);
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
      val.invoiceBoqTaxes = [];
      val.unitRateExcludingTax = 0; // this  is to calculate exclusive price for purchase order
      val.unitRateIncludingTax = 0; // this is to calculate inclusive price for purchase order
      val.taxType = val.itemMatched.item.taxType;
      (val.invoiceTaxPolicyRates = val.itemMatched.item.taxes.map((resp) => {
        return {
          name: resp.name,
          amount: resp.amount,
        };
      })),
        (val.totalTaxes = val.itemMatched.totalTaxes);
      this.calcLineTotal(val);
    },

    outside: function() {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    close() {
      this.invoiceDrawer = false;
    },

    // This calculate line item tax, discount and all other calculation on the boq base on the item tax policy
    calcLineTotal(val) {
      let taxPolicy = val.taxType;
      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          // console.log(val, "at tax exclusive");
          const exclusiveQuantity = Number.parseFloat(val.quantity || 0);
          const exclusiveUnitPrice = Number.parseFloat(val.unitPrice || 0);
          const exclusiveDiscRate = Number.parseFloat(val.discountRate || 0);

          val.discountedUnitRate =
            exclusiveUnitPrice * (1 - exclusiveDiscRate / 100);
          val.lineDiscountAmount =
            (exclusiveQuantity * exclusiveUnitPrice * exclusiveDiscRate) / 100;

          val.discountedLineTotal = val.discountedUnitRate * exclusiveQuantity;
          (val.totalTax =
            (Number.parseFloat(val.totalTaxes || 0) * val.discountedLineTotal) /
            100),
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
                (Number.parseFloat(resp.amount) *
                  Number.parseFloat(val.discountedLineTotal)) /
                100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case "taxInclusive":
          // Engine for Inclusive Engine
          console.log(val, "at tax inclusive");

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
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        case null:
          // Engine for null
          console.log(val, "at tax null");
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
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount: (0 * Number.parseFloat(val.discountedLineTotal)) / 100,
            };
          });

          break;

        // eslint-disable-next-line no-case-declarations
        default:
          console.log(val, "at tax default");
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
          val.invoiceBoqTaxes = val.invoiceTaxPolicyRates.map((resp) => {
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
      let shippingChargeTaxPolicy = this.invoiceData.shippingChargeTaxPolicy;
      this.isDeliveryTaxOpen = false;
      switch (shippingChargeTaxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          let exclusiveTaxes = this.allVat.taxes;
          let exclusiveTotal = 0;
          for (let i = 0; i < exclusiveTaxes.length; i++) {
            exclusiveTotal =
              exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;

          this.invoiceData.totalTaxOnShippingCharge =
            (Number.parseFloat(this.invoiceData.shippingCharge) *
              exclusiveTotalTaxes) /
            100;
          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number.parseFloat(resp.amount) *
                    this.invoiceData.shippingCharge) /
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
            inclusiveTotal =
              inclusiveTotal + Number.parseFloat(InclusiveTaxes[i].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.invoiceData.shippingCharge) /
            (1 + inclusiveTotalTaxes / 100);

          this.invoiceData.totalTaxOnShippingCharge =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) /
            100;

          this.invoiceData.invoiceShippingChargeTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number(resp.amount) *
                    Number.parseFloat(lineTotalExcludingTax)) /
                  100,
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
            exclusiveTotal =
              exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
          }
          let exclusiveTotalTaxes = exclusiveTotal;
          this.invoiceData.totalTaxOnSpecialDiscount =
            (Number.parseFloat(this.invoiceData.specialDiscount) *
              exclusiveTotalTaxes) /
            100;
          this.invoiceData.invoiceSpecialDiscountTaxes = this.allVat.taxes.map(
            (resp) => {
              return {
                taxId: resp.id,
                name: resp.name,
                label: resp.label,
                rate: resp.amount,
                amount:
                  (Number.parseFloat(resp.amount) *
                    this.invoiceData.specialDiscount) /
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
            inclusiveTotal =
              inclusiveTotal + Number.parseFloat(inclusiveTaxes[a].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.invoiceData.specialDiscount) /
            (1 + inclusiveTotalTaxes / 100);
          this.invoiceData.totalTaxOnSpecialDiscount =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) /
            100;
          this.taxesOnSpecialDiscount = this.allVat.taxes.map((resp) => {
            return {
              taxId: resp.id,
              name: resp.name,
              label: resp.label,
              rate: resp.amount,
              amount:
                (Number.parseFloat(resp.amount) *
                  Number.parseFloat(lineTotalExcludingTax)) /
                100,
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

    processInvoice() {
      this.processButton = true;
      this.invoiceData.customer = {
        supplierOrgId: this.$store.state.auth.auth.authData.orgId,
        contactId: this.selectedCustomer.contactId,
        email: this.selectedCustomer.email,
        name: this.selectedCustomer.name,
        address: this.selectedCustomer.address,
        contactName: this.selectedCustomer.contactName,
        phoneNumber: this.selectedCustomer.phoneNumber,
      };

      this.invoiceData.invoiceBoqTotalTaxes = this.totalTaxRate;
      this.invoiceData.invoiceBoqs = this.selectedItem;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.invoiceData,
      };
      this.processModal = false;
      this.$store
        .dispatch("sales/Invoice/createInvoice", data)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                invoiceId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };
            this.$store
              .dispatch("sales/Invoice/sendInvoice", data2)
              .then((resp) => {
                this.processModal = false;
                this.processButton = false;
                this.$vs.notify({
                  title: "Invoice",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
          }
          this.$router.push({
            name: "Invoice",
          });
        })
        .catch((err) => {
          this.processButton = false;
          this.processModal = true;
          this.$vs.notify({
            title: "Invoice",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("catalogue", ["getAllVat", "getAllVariant"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),

    calTotalSubLineTotalDiscountAmount() {
      let totalSubLineTotalDiscountAmount = 0;
      for (var i = 0; i < this.selectedItem.length; i++) {
        totalSubLineTotalDiscountAmount =
          totalSubLineTotalDiscountAmount +
          Number.parseFloat(this.selectedItem[i].lineDiscountAmount);
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
          Number.parseFloat(this.selectedItem[i].lineTotalExcludingTax);
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
          totalSubLineTotalTaxAmount +
          Number.parseFloat(this.selectedItem[i].totalTax);
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
        Number.parseFloat(this.invoiceData.totalSubLineTotalTax || 0) +
        Number.parseFloat(this.invoiceData.totalTaxOnShippingCharge || 0) -
        Number.parseFloat(this.invoiceData.totalTaxOnSpecialDiscount || 0);
      return this.invoiceData.salesTaxTotal;
    },

    // invoice total
    calSalesInvoiceTotal() {
      let total =
        Number.parseFloat(this.invoiceData.totalSubLineTotalExcludingTax || 0) +
        Number.parseFloat(this.invoiceData.shippingCharge || 0) -
        Number.parseFloat(this.invoiceData.specialDiscount || 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.invoiceData.invoiceTotal =
        Number.parseFloat(total) +
        Number.parseFloat(this.invoiceData.salesTaxTotal));
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // return this.invoiceData.totalSaleInvoice = Number.parseFloat(total) + Number.parseFloat(this.invoiceData.salesTaxTotal)
    },

    // total customer discount
    calTotalCustomerDiscount() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.invoiceData.totalCustomerDiscount =
        Number.parseFloat(
          this.invoiceData.totalSubLineTotalDiscountAmount | 0
        ) + Number.parseFloat(this.invoiceData.specialDiscount | 0);
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
        console.log(result);
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
        this.invoiceData.customer = resp.data.senderInfo;
        this.selectedCustomer = resp.data.senderInfo;
        this.invoiceData.currency = resp.data.requestForQuote.currency;
        this.invoiceData.deliveryAddress = resp.data.requestForQuote.deliveryAddress;
        this.invoiceData.billingAddress = resp.data.requestForQuote.deliveryAddress;
        this.invoiceData.description = resp.data.requestForQuote.description;
        this.invoiceData.billingAddress = resp.data.requestForQuote.deliveryAddress;
        this.invoiceData.originObject = "requestForQuote";
        this.invoiceData.originId = resp.data.id;

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
              invoiceBoqTaxes: [],
              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order
              taxType: null,
              invoiceTaxPolicyRates: [],
              totalTaxes: 0,
            };
          }
        );
       
      });

    // this.$store
    //   .dispatch("sales/Invoice/getInvoiceCode")
    //   .then((resp) => {
    //     if (resp.data.setting) {
    //       let format = resp.data.setting.codeFormat;
    //       (this.suffix = format.suffix),
    //         (this.prefix = format.prefix),
    //         (this.roots = format.roots[0]);
    //       this.separator = format.separator;
    //     } else {
    //       this.message = resp.data.message;
    //       // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // let data2 = {
    //   userInfo: this.$store.state.auth.auth.authData,
    //   payload: {
    //     moduleName: "INV",
    //     yearOfBirth: null,
    //     contactName: null,
    //   },
    // };
    // this.$store
    //   .dispatch("sales/Invoice/getGeneratedInvoiceCode", data2)
    //   .then((resp) => {
    //     this.invoiceData.invoiceNumber = resp.data.code;
    //     this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    //   });
    // this.$store.dispatch("sales/Invoice/getInvoiceCode");

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

    // this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    // this.$store.dispatch("crm/loyalty/getDefaultyLoyalty");
    // this.$store.dispatch("crm/loyalty/getAllLoyalty");
  },
};
</script>

<style scoped>
table th {
  white-space: nowrap !important;
}
</style>
