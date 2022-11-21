/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-case-declarations */
/* eslint-disable no-case-declarations */
<template>
  <div class>
    <back location="Edit Quotation" />

    <vs-popup
      :button-close-hidden="true"
      title="New Customer"
      :active.sync="customerModal"
    >
      <form data-vv-scope="form-2" action>
        <div class>
          <div class="mr-10">
            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.name') }"
            >
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="text-right">Name</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="name"
                  v-validate="'required'"
                  v-model="network.name"
                  class="w-full"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.name')"
                >
                  {{ errors.first("form-2.name") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.email') }"
            >
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="t">Email</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="email"
                  class="w-full"
                  v-validate="'required|email'"
                  v-model="network.email"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.email')"
                >
                  {{ errors.first("form-2.email") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.phone') }"
            >
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="t">Phone</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="phone"
                  class="w-full"
                  v-validate="'required'"
                  v-model="network.phoneNumber"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.phone')"
                >
                  {{ errors.first("form-2.phone") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.price') }"
            >
              <div class="md:w-1/3 text-right w-full">Price Reference</div>
              <div class="vx-col sm:w-2/3 w-full">
                <select
                  name="price"
                  v-model="network.contactCategory"
                  class="
                    block
                    w-full
                    bg-gray-200
                    border border-gray-200
                    text-gray-700
                    py-3
                    px-2
                    pr-8
                    rounded
                    leading-tight
                    focus:outline-none focus:bg-white focus:border-gray-500
                  "
                  id="grid-state"
                >
                  <option value="wholesale">Wholesale</option>
                  <option value="retail">Retail</option>
                </select>
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.price')"
                >
                  {{ errors.first("form-2.price") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.loyalty') }"
            >
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class>Loyalty</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <select
                  name="loyalty"
                  v-model="network.loyaltySchemeId"
                  class="
                    block
                    w-full
                    bg-gray-200
                    border border-gray-200
                    text-gray-700
                    py-3
                    px-2
                    pr-8
                    rounded
                    leading-tight
                    focus:outline-none focus:bg-white focus:border-gray-500
                  "
                  id="grid-state"
                >
                  <option
                    v-for="(loyalty, index) in allLoyalty"
                    :key="index"
                    :value="loyalty.id"
                  >
                    {{ loyalty.loyaltyCategory }}
                  </option>
                  <option value="null">None</option>
                </select>
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.loyalty')"
                >
                  {{ errors.first("form-2.loyalty") }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              :disabled="saveCustomerButton"
              :class="{
                'cursor-not-allowed': saveCustomerButton,
                'bg-cloudenly-primary-mid': saveCustomerButton,
              }"
              type="button"
              @click="saveNewCustomer('form-2')"
              class="
                px-10
                py-3
                border-none
                cursor-pointer
                bg-cloudenly-primary-main
                text-white
                rounded
              "
            >
              Save
            </button>

            <button
              type="button"
              @click="customerModal = false"
              class="
                px-10
                py-3
                border-none
                cursor-pointer
                bg-transparent
                rounded
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
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

    <div v-if="getIsAccOwner || getSalesQuotePrivileges.editQuote">
      <div class="px-5 py-10 mt-5 bg-white shadow rounded">
        <div class="row flex mt-10">
          <div class="col-4 w-1/3 mr-8">
            <div class>
              <div class="mb-5 flex items-center justify-between">
                <div>
                  <label for class="font-semibold">Customer:</label>
                </div>

                <div>
                  <button
                    @click="customerModal = true"
                    class="cursor-pointer text-primary-optima-color"
                  >
                    New Customer
                  </button>
                </div>
              </div>

              <div v-show="showSelected" class="p-3 w-full shadow shadow-md">
                <p class="text-lg mb-3">{{ selectedCustomer.name }}</p>
                <p class="text-lg">{{ selectedCustomer.email }}</p>
                <div>
                  <p
                    @click="toggleShowCustomer"
                    class="
                      text-cloudenly-primary-main
                      mt-5
                      text-right
                      cursor-pointer
                      font-semibold
                    "
                  >
                    change Customer
                  </p>
                </div>
              </div>
              <div v-show="showCustomer" class="flex items-center w-full">
                <div class="mr-5 w-full">
                  <select
                    @change="selectCustomer()"
                    v-model="selectedCustomer"
                    name
                    id
                    class="
                      px-2
                      py-2
                      border border-2 border-gray-400
                      w-full
                      rounded
                    "
                  >
                    <option
                      v-for="(customer, index) in allContact"
                      :key="index"
                      :value="customer"
                    >
                      {{ customer.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-4 w-1/3 mr-8">
            <div class="mb-5">
              <label for class="font-semibold">Billing Address:</label>
            </div>
            <div class="form-group row no-gutters">
              <div class="col-md-12">
                <textarea
                  v-model="quotationData.billingAddress"
                  rows="3"
                  cols="30"
                  class="
                    py-2
                    px-2
                    border border-2 border-gray-400
                    w-full
                    rounded
                  "
                  placeholder="Enter Address"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="col-4 w-1/3">
            <div class="mb-5">
              <label for class="font-semibold"> Delivery Address: </label>
            </div>
            <div class="form-group row no-gutters">
              <div class="col-md-12">
                <textarea
                  v-model="quotationData.deliveryAddress"
                  rows="3"
                  cols="30"
                  class="
                    py-2
                    px-2
                    border border-2 border-gray-400
                    w-full
                    rounded
                  "
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
                  v-model="quotationData.deliveryDate"
                  input-class="w-full  py-2 border border-solid border-2  rounded"
                  placeholder="Select Date"
                ></datepicker>
              </div>
            </div>
          </div>

          <div class="col-4 w-1/3 mr-8">
            <div class>
              <div class="mb-5">
                <label class="font-semibold">Quote No:</label>
              </div>
              <div class="md:w-full">
                <input
                  v-model="quotationData.quoteNumber"
                  type="text"
                  class="
                    px-2
                    py-2
                    border border-2 border-gray-400
                    rounded
                    w-full
                  "
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
                    v-model="quotationData.salesChannel"
                    class="
                      py-1
                      px-2
                      border border-2 border-gray-400
                      rounded
                      w-full
                    "
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
                  v-model="quotationData.validityType"
                  class="w-1/3 py-1 border border-2 border-gray-400"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
                <input
                  type="text"
                  class="w-2/3 py-2 px-3 mr-1 border border-2 border-gray-400"
                  placeholder="Enter Value"
                  v-model="quotationData.validityDur"
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
                    border border-solid border-2 border-gray-400
                    px-2
                    rounded
                  "
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

          <div class="col-4 w-1/3">
            <div class="mb-5">
              <label class="font-semibold" for>Payment Terms:</label>
            </div>
            <textarea
              v-model="quotationData.paymentTerms"
              class="py-3 px-2 border border-2 border-gray-400 w-full rounded"
              name
              id
              cols="30"
              rows="3"
            ></textarea>
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
                          py-3
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
                          py-3
                          whitespace-no-wrap
                          border-b border-gray-200
                        "
                      >
                        <input
                          v-if="boq.discountRate > 0"
                          v-model="boq.discountRate"
                          disabled
                          readonly
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

                        <input
                          v-else
                          v-model="boq.discountRate"
                          disabled
                          readonly
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
                          py-3
                          whitespace-no-wrap
                          border-b border-gray-200
                        "
                      >
                        <span
                          class="
                            py-2
                            px-2
                            border border-gray-400
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
                            border border-gray-400
                            w-full
                            rounded
                          "
                          >{{
                            boq.lineTotalExcludingTax | formatCurrency
                          }}</span
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
                            border border-gray-400
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

              <div class>
                <AddItemWidget v-on:addItem="addItem" />
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
                        class="py-2 px-2 mr-8 border border-gray-400 rounded"
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
                        <span class="font-normal"
                          >Delivery & Other Charges</span
                        ></label
                      >
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <input
                        v-show="showShippingAddress"
                        @keyup="calShippingCharge"
                        v-model="quotationData.shippingCharge"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded"
                      />
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <select
                        v-show="showShippingAddress"
                        @change="calShippingCharge"
                        v-model="quotationData.shippingChargeTaxPolicy"
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
                          Add Special Discount</span
                        ></label
                      >
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <input
                        v-show="showSpecialDiscount"
                        @keyup="calTaxSpecialDiscount"
                        v-model="quotationData.specialDiscount"
                        type="text"
                        class="py-2 px-2 border border-gray-400 rounded"
                      />
                    </td>
                    <td class="px-6 py-3 whitespace-no-wrap">
                      <select
                        v-show="showSpecialDiscount"
                        @change="calTaxSpecialDiscount"
                        v-model="quotationData.specialDiscountTaxPolicy"
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
                </table>
              </div>
            </div>

            <hr class="mt-5" />

            <div class="mt-5">
              <div class="flex justify-between">
                <div class="w-1/3">
                  <textarea
                    v-model="quotationData.comment"
                    class="
                      w-full
                      py-3
                      px-2
                      border border-gray-400 border-2
                      rounded
                    "
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
                        Delivery & Other Charges
                      </td>
                      <td class="px-6 py-3 whitespace-no-wrap">
                        <span class="tracking-widest">{{
                          quotationData.shippingCharge | currency
                        }}</span>
                      </td>
                      <td class="px-6 py-3 whitespace-no-wrap"></td>
                    </tr>


                     <tr>
                      <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                        Special Discount
                      </td>
                      <td class="px-6 py-3 whitespace-no-wrap">
                        <span class="tracking-widest">{{
                          quotationData.specialDiscount | currency
                        }}</span>
                      </td>
                      <td class="px-6 py-3 whitespace-no-wrap"></td>
                    </tr>

                    <tr>
                      <td class="px-6 py-3 whitespace-no-wrap text-gray-600">
                        Quote Total
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
                :disabled="updateButton"
                :class="{
                  'cursor-not-allowed': updateButton,
                  'bg-cloudenly-primary-off': updateButton,
                  'text-white': updateButton,
                }"
                @click="updateQuotation"
                type=" button"
                class="
                  mr-5
                  px-5
                  rounded-full
                  flex
                  items-center
                  py-3
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
                <span class>Update and Continue</span>
              </button>
            </div>
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
      updateButton: false,
      processButton: false,
      allVat: {},
      selectedItem: [],
      selectedCustomer: {},
      showCustomer: false,
      showSelected: true,
      totalTaxRate: [],
      showPromo: false,
      showShippingAddress: false,
      showSpecialDiscount: false,
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

        // payment section
        paymentTransactionId: null,
        paymentTransactionUrl: null,
        paymentStatus: null,
        subAccountCode: null,
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
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
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

    outside: function () {
      this.isDeliveryTaxOpen = false;
      this.isSpecialDiscTaxOpen = false;
    },

    close() {
      this.quoteDrawer = false;
    },

    toggleShowCustomer() {
      this.showCustomer = !this.showCustomer;
      this.showSelected = !this.showSelected;
    },

    returnCategory(val) {
      if (val.item === null) {
        return null;
      } else {
        return val.item.category.name;
      }
    },

    returnDescription(val) {
      if (val.item === null) {
        return null;
      } else {
        return val.item.description;
      }
    },

    addItem(val, type) {
      if (this.selectedCustomer === null) {
        this.$vs.dialog({
          color: "warning",
          title: `Alert`,
          text: "You have not selected any customer. please select customer or create new",
          // cancel:this.acceptAlert
        });
      } else {
        // console.log(val, type)
        if (val.hasOwnProperty("retailPriceBooks")) {
          // eslint-disable-next-line no-empty
          if (type === "promoPrice") {
            this.selectedItem.push({
              priceBooks: val.retailPriceBooks, // to be remove

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,

              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
              description: this.returnDescription(val),

              discountRate: val.retailPriceBooks[0].promoDiscountRate,

              unitPrice: val.retailPriceBooks[0].recommendedRetailPrice || 0,

              quantity: 0,
              discountedUnitRate: 0,
              lineDiscountAmount: 0,
              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,
              quoteBoqTaxes: [],
              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order
              taxType: val.item.taxType,
              quoteTaxPolicyRates: val.taxes.map((resp) => {
                return {
                  name: resp.name,
                  amount: resp.amount,
                };
              }),
              totalTaxes: val.totalTaxes,
            });
            // eslint-disable-next-line no-empty
          } else {
            this.selectedItem.push({
              priceBooks: val.retailPriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,

              category: this.returnCategory(val),

              itemClass: val.productOrService,
              unitOfMeasure: val.retailPriceBooks[0].unitOfSale,

              description: this.returnDescription(val),

              discountRate: val.retailPriceBooks[0].loyaltyDiscountRate,

              unitPrice: val.retailPriceBooks[0].recommendedRetailPrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              quoteBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,

              quoteTaxPolicyRates: val.taxes.map((resp) => {
                return {
                  name: resp.name,
                  amount: resp.amount,
                };
              }),
              totalTaxes: val.totalTaxes,
            });
          }
          // eslint-disable-next-line no-empty
        } else {
          if (type === "promoPrice") {
            this.selectedItem.push({
              priceBooks: val.wholesalePriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.wholesalePriceBooks[0].unitOfSale,
              description: this.returnDescription(val),
              discountRate: val.wholesalePriceBooks[0].promoDiscountRate,

              unitPrice:
                val.wholesalePriceBooks[0].recommendedWholesalePrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              quoteBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              quoteTaxPolicyRates: val.taxes.map((resp) => {
                return {
                  name: resp.name,
                  amount: resp.amount,
                };
              }),
              totalTaxes: val.totalTaxes,
            });
          } else {
            this.selectedItem.push({
              priceBooks: val.wholesalePriceBooks, // to be removed

              supplierVariantSku: val.variantSku,
              supplierVariantId: val.id,
              customerVariantSku: null,
              customerVariantId: null,

              name: val.variantName,
              category: this.returnCategory(val),
              itemClass: val.productOrService,
              unitOfMeasure: val.wholesalePriceBooks[0].unitOfSale,

              description: this.returnDescription(val),
              discountRate: val.wholesalePriceBooks[0].loyaltyDiscountRate,
              unitPrice:
                val.wholesalePriceBooks[0].recommendedWholesalePrice || 0,

              quantity: 0,

              discountedUnitRate: 0,
              lineDiscountAmount: 0,

              discountedLineTotal: 0,
              lineTotalExcludingTax: 0,
              totalTax: 0,

              quoteBoqTaxes: [],

              unitRateExcludingTax: 0, // this  is to calculate exclusive price for purchase order
              unitRateIncludingTax: 0, // this is to calculate inclusive price for purchase order

              taxType: val.item.taxType,
              quoteTaxPolicyRates: val.taxes.map((resp) => {
                return {
                  name: resp.name,
                  amount: resp.amount,
                };
              }),
              totalTaxes: val.totalTaxes,
            });
          }
        }
      }
    },

    // this set customer address to customer delivery address
    selectCustomer() {
      // console.log(this.selectedCustomer)
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 1,
      });
      this.$store
        .dispatch(
          "crm/contact/getContactInvoiceItemAction",
          this.selectedCustomer
        )
        .then((resp) => {
          // console.log(resp)
          if (resp)
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        });
      this.selectedItem = [];
      this.quotationData.deliveryAddress = this.selectedCustomer.address;
      this.quotationData.billingAddress = this.selectedCustomer.address;
    },

    deleteItem(index) {
      this.selectedItem.splice(index, 1);
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

          console.log(val.discountedLineTotal);
          // This is to calculate tax component on each item
          val.quoteBoqTaxes = val.quoteTaxPolicyRates.map((resp) => {
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
            exclusiveTotal =
              exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
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
                  (Number.parseFloat(resp.amount) *
                    this.quotationData.shippingCharge) /
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
            Number.parseFloat(this.quotationData.shippingCharge) /
            (1 + inclusiveTotalTaxes / 100);

          this.quotationData.totalTaxOnShippingCharge =
            (Number.parseFloat(lineTotalExcludingTax) * inclusiveTotalTaxes) /
            100;

          this.quotationData.quoteShippingChargeTaxes = this.allVat.taxes.map(
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
            exclusiveTotal =
              exclusiveTotal + Number.parseFloat(exclusiveTaxes[i].amount);
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
            inclusiveTotal =
              inclusiveTotal + Number.parseFloat(inclusiveTaxes[a].amount);
          }
          let inclusiveTotalTaxes = inclusiveTotal;

          let lineTotalExcludingTax =
            Number.parseFloat(this.quotationData.specialDiscount) /
            (1 + inclusiveTotalTaxes / 100);
          this.quotationData.totalTaxOnSpecialDiscount =
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

    updateQuotation() {
      this.updateButton = true;

      this.quotationData.customer = {
        supplierOrgId: this.selectedCustomer.supplierOrgId,
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
      this.$store
        .dispatch("sales/Quotation/updateQuotation", data)
        .then((resp) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Quotation",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });

          this.$router.push({
            name: "ProformaQuote",
          });
        })
        .catch((err) => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Quotation",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processQuotation() {
      this.processButton = true;
      this.quotationData.customer = {
        supplierOrgId: this.selectedCustomer.contactOrgId,
        contactId: this.selectedCustomer.id,
        email: this.selectedCustomer.email,
        name: this.selectedCustomer.name,
        address: this.selectedCustomer.address,
        contactName: this.selectedCustomer.contactName,
        phoneNumber: this.selectedCustomer.phone,
      };

      this.quotationData.quoteBoqTotalTaxes = this.totalTaxRate;
      this.quotationData.quoteBoqs = this.selectedItem;

      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.quotationData,
      };

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
          this.$vs.notify({
            title: "Quotation",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    saveNewCustomer(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.saveCustomerButton = true;
          this.isDisable = true;
          let userAuth = this.$store.state.auth.auth.authData;
          userAuth.registeredBy = `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`;
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
                color: "primary",
                position: "top-right",
              });
              this.customerModal = false;
              this.saveCustomerButton = false;
              this.isDisable = false;
            })
            .catch((err) => {
              this.saveCustomerButton = false;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        } else {
          this.$vs.notify({
            title: "Incomplete Input Field",
            position: "top-center",
            color: "danger",
          });
        }
      });
    },

    getSubAccount() {
      this.quotationData.subAccountCode =
        this.getCollectionAccounts[0].subAccountCode;
    },
  },

  computed: {
    ...mapGetters("catalogue", ["getAllVat"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("userOutlet", ["getOptimaOutlet", "getOptimaUsers"]),
    ...mapGetters("sales/Quotation", ["getIsQuotationCodeSetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSalesQuotePrivileges"]),
    ...mapGetters("payment/collection", ["getCollectionAccounts"]),

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
          parseInt(this.selectedItem[i].lineTotalExcludingTax);
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
        totalSubLineTotalTaxAmount =
          totalSubLineTotalTaxAmount + parseInt(this.selectedItem[i].totalTax);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.taxSubTotal = totalSubLineTotalTaxAmount;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.quotationData.totalSubLineTotalTax =
        totalSubLineTotalTaxAmount);
    },

    calTotalSalesTax() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.salesTaxTotal =
        parseInt(this.quotationData.totalSubLineTotalTax || 0) +
        parseInt(this.quotationData.totalTaxOnShippingCharge || 0) -
        parseInt(this.quotationData.totalTaxOnSpecialDiscount || 0);
      return this.quotationData.salesTaxTotal;
    },

    // quote total
    calSalesQuoteTotal() {
      let total =
        parseInt(this.quotationData.totalSubLineTotalExcludingTax || 0) +
        parseInt(this.quotationData.shippingCharge || 0) -
        parseInt(this.quotationData.specialDiscount || 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.quotationData.quoteTotal =
        parseInt(total) + parseInt(this.quotationData.salesTaxTotal));
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // return this.quotationData.totalSaleInvoice = parseInt(total) + parseInt(this.quotationData.salesTaxTotal)
    },

    // total customer discount
    calTotalCustomerDiscount() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.quotationData.totalCustomerDiscount =
        parseInt(this.quotationData.totalSubLineTotalDiscountAmount | 0) +
        parseInt(this.quotationData.specialDiscount | 0);
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

  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 1,
    });
    let id = this.$route.params.id;
    this.$store
      .dispatch("sales/Quotation/getSingleQuotation", id)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          this.quotationData = resp.data;
          this.selectedItem = resp.data.quoteBoqs;
          this.selectedCustomer = resp.data.customer;
          // console.log('this is selected customer',this.selectedCustomer);
          this.$store
            .dispatch(
              "crm/contact/getContactUpdateInvoiceItemAction",
              this.selectedCustomer
            )
            .then((resp) => {
              if (resp)
                this.$vs.loading.close("#div-with-loading > .con-vs-loading");
            });
        }
      });

    let data = {
      userInfo: this.$store.state.auth.auth.authData,
    };
    this.$store
      .dispatch("catalogue/tax/getOutletVat", data)
      .then((resp) => {
        // console.log(resp.data)
        this.allVat = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    // this.$store.dispatch("crm/loyalty/getDefaultyLoyalty");
    // this.$store.dispatch("crm/loyalty/getAllLoyalty");

    await this.$store.dispatch("payment/collection/getCollectionAccounts");
    this.getSubAccount();
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style scoped>
table th {
  white-space: nowrap !important;
}
</style>
