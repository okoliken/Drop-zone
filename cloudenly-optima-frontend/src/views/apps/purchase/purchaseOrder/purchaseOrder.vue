/* eslint-disable no-case-declarations */
<template>
  <div>
    <!-- process purchase order section -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Order"
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
              <p>
                Please note that this purchase order may undergo approval
                process
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
            @click="processPurchaseOrder"
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
    <!-- End process purchase order Section -->

    <!-- setup purchase order code -->
    <Drawer :size="45" :visible="orderDrawer" v-on:closeDrawer="close">
      <div slot="title">
        <h2>Purchase Order Code Setup</h2>
      </div>

      <div slot="body">
        <div>
          <div class="mb-8">
            <div class>
              <p class="p-3 mb-0">
                A code will be generated for any request for quote you save....
              </p>
              <p class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer">
                Learn more here...
              </p>
            </div>
          </div>

          <div id="div-with-loading" class="mx-5 vs-con-loading__container">
            <div
              class="
                mb-8
                mx-16
                ml-16
                border border-solid border-gray-200-lighter
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
                      class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                      class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                      class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                        class="py-2 px-2 w-full border-2 border-gray-200"
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
                      class="py-2 px-2 w-full border-2 border-gray-200"
                    >
                      <option disabled selected value>
                        Select preferred Code Separator
                      </option>
                      <option value="slash">Slash</option>
                      <option value="hyphen">Hyphen</option>
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
                      text-xl-2
                      border-gray-200
                    "
                    >{{ previewFormat | capitalize }}</span
                  >
                </div>
              </div>

              <div class="flex pb-10 mb-10 mt-10">
                <div class="mx-auto">
                  <button
                    :disabled="saveButton"
                    @click="savePurchaseOrderCode"
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
    </Drawer>
    <!-- End section -->

    <!-- section -->

    <div
      v-if="
        getIsAccOwner ||
        getPurchaseOrderPrivileges.createPO ||
        getPurchaseOrderPrivileges.editPO
      "
    >
      <div id="div-with-loading" class="vs-con-loading__container w-full">
        <back
          :location="`Purchase Order - ${routeQuery.type || 'New'}`"
          class="mb-8"
        />

        <div class="bg-white px-6 pt-8 pb-10">
          <div class="flex items-center justify-between mb-10">
            <h2 class="font-semibold capitalize">
              {{ `${routeQuery.type || "Create New"} Purchase Order` }}
            </h2>

            <feather-icon
              icon="AlertCircleIcon"
              svgClasses="mr-3 h-6 w-6 cursor-pointer"
            />
          </div>

          <div class="grid grid-cols-12 col-gap-16 gap-10">
            <s-select
              label="Supplier Name:"
              :options="getSupplierContact"
              :disabled="routeQuery.type === 'view'"
              select-id="name"
              class="col-span-4 mb-12"
              @input="handleSupplier($event)"
              :value="purchaseOrderData.supplier.name"
            />

            <s-select
              label="Shipping Condition:"
              :options="conditionList"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4"
              v-model="purchaseOrderData.shippingCondition"
            />

            <!-- <div class="col-span-8"></div> -->

            <s-select
              label="Shipping Method:"
              :options="shippingMethods"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4 mb-12"
              v-model="purchaseOrderData.shippingMethod"
            />

            <s-select
              label="PO Currency:"
              :options="currencyList"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4"
              v-model="purchaseOrderData.currency"
            />

            <s-text
              label="PO Title:"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4 mb-12"
              v-model="purchaseOrderData.title"
            />

             <s-text
              label="PO Description:"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4 mb-12"
              v-model="purchaseOrderData.description"
            />

            <s-text class="col-span-4" v-model="purchaseOrderData.orderNumber">
              <template v-slot:label class="flex justify-between">
                <div class="mb-3">
                  <span>PO Number:</span>
                </div>

                <div class="mb-3">
                  <!-- <button
                    class="text-primary-optima-color"
                    @click="orderDrawer = true"
                    v-if="routeQuery.type !== 'view'"
                  >
                    Setup code number
                  </button> -->
                </div>
              </template>
            </s-text>

            <s-text
              label="Shipping Address:"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4 mb-12"
              v-model="purchaseOrderData.shippingAddress"
            />

            <s-text
              label="Delivery Address:"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4"
              v-model="purchaseOrderData.deliveryAddress"
            />

            <s-text
              label="Expected Delivery Date:"
              type="date"
              :disabled="routeQuery.type === 'view'"
              class="col-span-4"
              v-model="purchaseOrderData.expectedDeliveryDate"
            />

            <div class="col-span-12">
              <label class="flex flex-col">
                Payment Terms:

                <textarea
                  class="mt-3 px-4 py-2"
                  style="
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    height: 100px;
                    width: 100%;
                  "
                  :disabled="routeQuery.type === 'view'"
                  v-model="purchaseOrderData.paymentTerms"
                />
              </label>
            </div>
<!-- 
            <div class="col-span-4">
              <label class="flex flex-col">
                Other Terms:

                <textarea
                  class="mt-3 px-4 py-2"
                  style="
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    height: 100px;
                    width: 320px;
                  "
                  :disabled="routeQuery.type === 'view'"
                  v-model="purchaseOrderData.otherTerms"
                />
              </label>
            </div> -->


                      <!-- requestioner  -->
            <div class="col-span-12">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item bg-white border border-1 rounded-sm border-gray-500">
                  <h2 class="accordion-header  mb-0" id="headingTwo">
                    <button
                      class="
                        accordion-button
                        collapsed
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                        text-base text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        font-semibold
                        transition
                        focus:outline-none
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Requestioner
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="w-full flex">
                        <div class="w-1/3 mr-3">
                          <s-text class="text" label="Name:" disabled />
                          <s-text label="Phone Number:" type="number" class="my-4"  disabled/>
                        </div>
                        <div class="w-1/3 mr-3">
                          <s-text label="Function:" disabled />
                          <s-text label="Email:" type="email" class="my-4"  disabled/>
                        </div>
                        <div class="w-1/3 mr-3">
                          <s-text label="Title:" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item bg-white">
                  <h2 class="accordion-header mb-0" id="headingThree">
                    <button
                      class="
                        accordion-button
                        collapsed
                        relative
                        flex
                        items-center
                        w-full
                        py-4
                        px-5
                       text-gray-800 text-left
                        bg-white
                        border-0
                        rounded-none
                        font-semibold
                        transition
                        focus:outline-none
                      "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Purchasing Function
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body py-4 px-5">
                      <div class="w-full flex">
                        <div class="w-1/3 mr-3 mt-4">
                          <s-select label="Function:" />
                          <s-text label="Email:" type="email" disabled class="my-4" />
                        </div>
                        <div class="w-1/3 mr-3 mt-4">
                          <s-select label="Contact Person:" />
                        </div>
                        <div class="w-1/3 mt-4">
                          <s-text label="Phone Number:" disabled />
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- end of requestioner -->

            

            <s-content-seperator class="mt-12 mb-12" />
            
            <!-- Unit Price -->
            <div class="col-span-12 flex items-center mb-12">
              <span class="mr-8">Unit Price:</span>

              <div class="flex items-center" v-if="routeQuery.type !== 'view'">
                <label class="flex items-center">
                  Tax Inclusive
                  <input
                    type="radio"
                    value="taxInclusive"
                    class="ml-3"
                    @change="toggleTaxPolicyType"
                    v-model="taxType"
                  />
                </label>

                <label class="flex items-center ml-8">
                  Tax Exclusive
                  <input
                    type="radio"
                    value="taxExclusive"
                    class="ml-3"
                    @change="toggleTaxPolicyType"
                    v-model="taxType"
                  />
                </label>

                <label class="flex items-center ml-8">
                  Tax Exempt
                  <input
                    type="radio"
                    value="taxExempt"
                    class="ml-3"
                    @change="toggleTaxPolicyType"
                    v-model="taxType"
                  />
                </label>
              </div>

              <div v-else>{{ taxType }}</div>
            </div>

            <!-- selected Items -->
           <div class="col-span-12 mb-8 flex justify-between items-center">
              <h2 class="font-semibold">PO item(s)</h2>
              <button
                class="text-primary-optima-color font-medium"
                @click="hide = !hide"
              >
                {{ !hide ? "Hide" : "Add an Item / Service" }}
              </button>
            </div>




            <table class="col-span-12">
              <thead>
                <th class="" style="padding: 0; font-size: 12px">#</th>
                <th
                  class="text-sm font-normal"
                  style="padding: 0; font-size: 12px; color: #507fdf"
                  v-for="(header, i) in headers"
                  :key="i"
                >
                  {{ header }}
                </th>
              </thead>

              <tbody v-if="!purchaseOrderData.purchaseOrderBoqs.length">
                <tr class="h-16">
                  <td>1</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
              </tbody>

              <tbody v-else>
                <tr
                  v-for="(item, i) in purchaseOrderData.purchaseOrderBoqs"
                  :key="i"
                  class="h-20"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.unitOfSale }}</td>
                  <td>
                    <input
                      @keyup="calLineTotal(item, index)"
                      type="number"
                      :disabled="routeQuery.type === 'view'"
                      class="py-2 px-4 rounded"
                      style="border: 1px solid #ccc; height: 32px; width: 100px"
                      v-model="item.unitPrice"
                    />
                  </td>
                  <td>
                    <input
                      @keyup="calLineTotal(item, index)"
                      type="number"
                      :disabled="routeQuery.type === 'view'"
                      class="py-2 px-4 rounded"
                      style="border: 1px solid #ccc; height: 32px; width: 100px"
                      v-model="item.quantity"
                    />
                  </td>

                  <td>{{ item.lineTotal | formatCurrency }}</td>
                  <td>{{ item.totalLineTaxAmount | formatCurrency }}</td>
                  <td>
                     <select  style="border: 1px solid; height: 32px; width: 100px" v-model="item.accountId">
                      <option v-for="item in getAccListFromExpOrRevCostCentre" :value="item.id"
                              :key="item.id">{{
                          item.accountName
                        }}</option>
                    </select>
                  </td>
                  <td>
                    <div v-if="routeQuery.type === 'view'">N/A</div>

                    <feather-icon
                      @click="deleteItem(index)"
                      icon="Trash2Icon"
                      class="text-cloudenly-danger-main w-5 cursor-pointer"
                      v-else
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- <div class="col-span-12 mt-16 mb-5">
              <button
                class="text-primary-optima-color font-medium"
                @click="hide = !hide"
              >
                {{ !hide ? "Hide" : "Add an Item/Service" }}
              </button>
            </div> -->

          
            <s-content-seperator class="mb-12" />

            <!-- catalogue items -->
            <div class="col-span-12 font-normal" v-if="!hide">
              <div class="flex items-center">
                <s-combo-box />

                <div class="ml-12">
                  {{ getAllVariant.length }} Items in Catalogue
                </div>
              </div>

              <div class="mt-8 mb-8">Selected Products (0):</div>

              <div class="mb-5">All Products</div>

              <!-- variant list -->
              <div style="height: 270px; overflow-y: scroll">
                <div
                  class="grid grid-cols-12 mb-8"
                  v-for="(item, i) in getAllVariant"
                  :key="i"
                >
                  <div class="col-span-6">
                    <div class="font-semibold mb-2">
                      {{ i + 1 }}. {{ item.variantName }}
                    </div>
                    <div class="flex items-center">
                      <span>Item description: {{ item.description }}</span>
                      <span class="ml-8"
                        >Item type: {{ item.productOrService }}</span
                      >
                    </div>
                  </div>

                  <div class="col-span-3 flex items-center">
                    <span
                      :class="[
                        !item.stockBalance
                          ? 'text-danger-optima-color'
                          : 'text-tetiary-optima-color',
                      ]"
                      >{{ item.stockBalance }} &nbsp;</span
                    >in stock
                  </div>

                  <div class="col-span-3 flex items-center">
                    <button
                      class="text-primary-optima-color"
                      @click="addItem(item)"
                    >
                      Add this Item
                    </button>

                    <!-- <div style="color: #9ba0a7" v-else>Item Out of Stock</div> -->
                  </div>
                </div>
              </div>
            </div>

            <s-content-seperator class="my-12" v-if="!hide" />
          </div>

          <div class="flex justify-between items-center">
            <label class="flex flex-col">
              Terms and Conditions:

              <textarea
                class="mt-5 px-4 py-2"
                style="
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  height: 100px;
                  width: 500px;
                "
                :disabled="routeQuery.type === 'view'"
                v-model="purchaseOrderData.comment"
              />
            </label>

            <div class="w-4/12">
              <div class="flex justify-between mb-3">
                <h3>Sub-Total:</h3>
                <div>{{ calSubTotal | currency }}</div>
              </div>

              <div class="flex items-center justify-between mb-3">
                <h3>Delivery Charges:</h3>

                <input
                  type="number"
                  class="py-2 px-4 rounded"
                  style="border: 1px solid #ccc; height: 32px; width: 100px"
                  :disabled="routeQuery.type === 'view'"
                  @keyup="calculateTaxDeliveryCharges"
                  v-model="purchaseOrderData.deliveryCharges"
                />

                <div>{{ purchaseOrderData.deliveryCharges | currency }}</div>
              </div>

              <div class="flex items-center justify-between mb-3">
                <h3>Tax:</h3>
                <div>{{ calTotalTax | currency }}</div>
              </div>

              <div class="flex items-center justify-between">
                <h3>Order Total:</h3>
                <div>{{ calTotalOrder | currency }}</div>
              </div>
            </div>
          </div>
          
          <s-content-seperator class="my-12" />

          <div class="flex justify-between">
            <button
              class="px-8 py-4"
              style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
              @click="routerBack"
            >
              Cancel
            </button>

            <!-- handles PO creation and PR to PO generation -->
            <div
              class="flex items-center"
              v-if="
                !$route.params.id ||
                ($route.params.id && routeQuery.type === 'generate')
              "
            >
              <button
                class="
                  flex
                  items-center
                  px-6
                  py-4
                  mr-12
                  text-primary-optima-color
                "
                :class="{ 'cursor-not-allowed': draftButton }"
                style="background: #f3f6f9; border-radius: 50px"
                @click="savePurchaseOrder"
              >
                <feather-icon
                  v-show="draftButton"
                  svgClasses="animate-spin h-5 w-5 mr-3"
                  icon="CircleIcon"
                />
                Save as draft
              </button>

              <button
                class="px-6 py-4 bg-primary-optima-color flex items-center"
                style="border-radius: 50px; color: #f3f6f9"
                @click="processModal = true"
              >
                <feather-icon
                  v-show="processButton"
                  svgClasses="animate-spin h-5 w-5 mr-3"
                  icon="CircleIcon"
                  class="mr-3"
                />

                Process Order
              </button>
            </div>

            <!-- handles PO updating and change view to edit -->
            <div v-else>
              <button
                class="px-6 py-4 bg-primary-optima-color flex items-center"
                style="border-radius: 50px; color: #f3f6f9"
                @click="updatePurchaseOrder"
                v-if="routeQuery.type !== 'view'"
              >
                <feather-icon
                  v-show="isUpdating"
                  svgClasses="animate-spin h-5 w-5 mr-3"
                  icon="CircleIcon"
                  class="mr-3"
                />

                Update Order
              </button>

              <button
                class="px-6 py-4 bg-primary-optima-color flex items-center"
                style="border-radius: 50px; color: #f3f6f9"
                @click="$router.push({ name: 'PurchaseOrder', query: {} })"
                v-else
              >
                Edit Order
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
import { mapGetters } from "vuex";
import Catalogue from "../../../components/AddItemWidget/catalogue";
import Datepicker from "vuejs-datepicker";
import currencyList from "../../../../utils/currency";
import Drawer from "../../../components/Drawer/drawer";

export default {
  components: {
    Catalogue,
    Datepicker,
    Drawer,
  },

  data() {
    return {
      hide: true,
      isUpdating: false,
      search: "",
      processModal: false,
      currencyList,
      singleSupplier: "",
      suppliers: [],
      taxType: "taxExclusive",
      purchaseOrderData: {
        functionOrGroupId: this.$store.state.auth.auth.userData?.functionId,
        orderNumber: "",
        title: "",
        description: "",
        supplier: "",
        currency: "Nigerian Naira",
        expectedDeliveryDate: "",
        shippingMethod: "",
        shippingCondition: "",
        shippingAddress: "",
        deliveryAddress: "",
        paymentTerms: "",
        otherTerms: "",
        unitPrice: "",
        accountId: null,
        subTotal: "",
        deliveryCharges: 0,
        deliveryTaxAmount: 0,
        tax: 0,
        totalTaxPolicyRate: 0,
        taxType: "taxExclusive",
        total: 0,
        comment: "",
        purchaseOrderBoqs: [],
      },

      orderDrawer: false,
      message: "",
      draftButton: false,
      processButton: false,
      saveButton: false,
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
      conditionList: [
        {
          name: "EXW – Ex Works (named place of delivery)",
          id: "EXW – Ex Works (named place of delivery)",
        },
        {
          name: "FCA – Free Carrier (named place of delivery)",
          id: "FCA – Free Carrier (named place of delivery)",
        },
        {
          name: "CPT – Carriage Paid To (named place of destination)",
          id: "CPT – Carriage Paid To (named place of destination)",
        },
        {
          name: "CIP – Carriage and Insurance Paid to (named place of destination)",
          id: "CIP – Carriage and Insurance Paid to (named place of destination)",
        },
        {
          name: "DAT – Delivered At Terminal (named terminal at port or place of destination)",
          id: "DAT – Delivered At Terminal (named terminal at port or place of destination)",
        },
        {
          name: "DAP – Delivered At Place (named place of destination)",
          id: "DAP – Delivered At Place (named place of destination)",
        },
        {
          name: "DDP – Delivered Duty Paid (named place of destination)",
          id: "DDP – Delivered Duty Paid (named place of destination)",
        },
        {
          name: "FAS – Free Alongside Ship (named port of shipment)",
          id: "FAS – Free Alongside Ship (named port of shipment)",
        },
        {
          name: "FOB – Free on Board (named port of shipment)",
          id: "FOB – Free on Board (named port of shipment)",
        },
        {
          name: "CFR – Cost and Freight (named port of destination)",
          id: "CFR – Cost and Freight (named port of destination)",
        },
        {
          name: "CIF – Cost, Insurance & Freight (named port of destination)",
          id: "CIF – Cost, Insurance & Freight (named port of destination)",
        },
      ],
      headers: [
        "Item Name",
        "Item Description",
        "Unit of Measure",
        "Unit Price",
        "Quantity",
        "Line Total",
        "Total Tax",
        "Expenditure Category",
        "Actions",
      ],
      shippingMethods: ["Air Freight", "Sea Freight", "Inland Transport"],
    };
  },

  methods: {

    // setAccountId(val){
    //   // console.log(JSON.stringify(val))
    //   console.log(val.target.value)
    // },


    close() {
      this.orderDrawer = false;
    },

    routerBack() {
      if (this.routeQuery.type === "generate") {
        this.$router.push({
          name: "PurchaseRequisition",
        });
      } else {
        this.$router.push({
          name: "PurchaseOrders",
        });
      }
    },

    routeNumbering() {
      this.$router.push({
        name: "documentCode",
      });
    },

    deleteItem(val) {
      this.purchaseOrderData.purchaseOrderBoqs.splice(val, 1);
    },

    handleSupplier(val) {
      const result = this.getSupplierContact.find((item) => item.name === val);
      this.purchaseOrderData.supplier = result;
      this.purchaseOrderData.shippingAddress = result.address;
      this.purchaseOrderData.deliveryAddress = result.address;
    },

    addItem(val) {
      // console.log(val);
      this.purchaseOrderData.purchaseOrderBoqs.push({
        itemClass: val.productOrService,
        partNumber: val.partNumber,
        customerVariantId: null,
        supplierVariantId: null,
        name: val.variantName,
        description: val.item.description,
        quantity: 1,
        unitOfSale: val.retailPriceBooks[0].unitOfSale,
        unitPrice: val.retailPriceBooks[0].priceRRPUnit,
        lineTotal: 0,
        unitPriceTaxInclusive: 0,
        unitPriceTaxExclusive: 0,
        lineTotalTaxExclusive: 0,
        lineTotalTaxInclusive: 0,
        totalLineTaxAmount: 0,
      });
    },

    calLineTotal(val) {
      let taxPolicy = this.taxType;

      let lineQuantity = Number.parseFloat(val.quantity);
      let unitLinePrice = Number.parseFloat(val.unitPrice);
      // let lineDiscount = Number.parseFloat(val.discountRate);

      switch (taxPolicy) {
        // eslint-disable-next-line no-case-declarations
        case "taxExclusive":
          val.lineTotal = Number.parseFloat(lineQuantity) * Number.parseFloat(unitLinePrice);
          val.totalLineTaxAmount = (Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate) * Number.parseFloat(val.lineTotal)) /  100;
          console.log( val.totalLineTaxAmount)
          break;
        case "taxInclusive":
          val.lineTotal =  Number.parseFloat(lineQuantity) * Number.parseFloat(unitLinePrice);
          val.totalLineTaxAmount = ( Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate) * val.lineTotal) /
            100;
          break;
        case "taxExempt":
          val.lineTotal = Number.parseFloat(lineQuantity) * Number.parseFloat(unitLinePrice);
          val.totalLineTaxAmount = 0;
          break;

        default:
          break;
      }
    },

    calculateTaxDeliveryCharges() {
      let taxPolicy = this.taxType;
      let deliveryCharge = Number.parseFloat(
        this.purchaseOrderData.deliveryCharges || 0
      );
      switch (taxPolicy) {
        case "taxExclusive":
          this.purchaseOrderData.deliveryTaxAmount =
            (Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate || 0) *
              deliveryCharge) /
            100;
          break;

        case "taxInclusive":
          this.purchaseOrderData.deliveryTaxAmount =
            (Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate || 0) *
              deliveryCharge) /
            100;
          break;

        case "taxExempt":
          this.purchaseOrderData.deliveryTaxAmount = 0;

          break;
        default:
          break;
      }
    },

    toggleTaxPolicyType() {
      let taxPolicy = this.taxType;
      switch (taxPolicy) {
        case "taxExclusive":
          this.purchaseOrderData.purchaseOrderBoqs.map((resp) => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal:
                Number.parseFloat(resp.quantity) *
                Number.parseFloat(resp.unitPrice),
              totalLineTaxAmount:
                (Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate) *
                  Number.parseFloat(resp.quantity) *
                  Number.parseFloat(resp.unitPrice)) /
                100,
            };
          });
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate *
              Number.parseFloat(this.purchaseOrderData.deliveryCharges)) /
            100;

          break;
        case "taxInclusive":
          this.purchaseOrderData.purchaseOrderBoqs.map((resp) => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal:
                Number.parseFloat(resp.quantity) *
                Number.parseFloat(resp.unitPrice),
              totalLineTaxAmount:
                (Number.parseFloat(this.purchaseOrderData.totalTaxPolicyRate) *
                  Number.parseFloat(resp.quantity) *
                  Number.parseFloat(resp.unitPrice)) /
                100,
            };
          });
          this.purchaseOrderData.deliveryTaxAmount =
            (this.purchaseOrderData.totalTaxPolicyRate *
              Number.parseFloat(this.purchaseOrderData.deliveryCharges)) /
            100;

          break;

        case "taxExempt":
          this.purchaseOrderData.purchaseOrderBoqs.map((resp) => {
            return {
              itemClass: resp.type,
              partNumber: resp.partNumber,
              customerVariantId: null,
              supplierVariantId: null,
              name: resp.variantName,
              description: resp.description,
              quantity: resp.quantity,
              unitOfSale: resp.unitOfSaleUnit,
              unitPrice: resp.unitPrice,
              unitPriceTaxInclusive: resp.unitPriceTaxInclusive,
              unitPriceTaxExclusive: resp.unitPriceTaxExclusive,
              lineTotalTaxExclusive: resp.lineTotalTaxExclusive,
              lineTotalTaxInclusive: resp.lineTotalTaxInclusive,
              totalTax: resp.totalTax,
              lineTotal:
                Number.parseFloat(resp.quantity) *
                Number.parseFloat(resp.unitPrice),
              totalLineTaxAmount: 0,
            };
          });
          this.purchaseOrderData.deliveryTaxAmount = 0;

          break;
        default:
          break;
      }
    },

    savePurchaseOrder() {
      let userInfo = this.$store.state.auth.auth.authData;
      console.log(this.purchaseOrderData.supplier);
      this.purchaseOrderData.supplier = {
        contactId: this.purchaseOrderData.supplier.id,
        supplierOrgId: this.purchaseOrderData.supplier.contactOrgId,
        name: this.purchaseOrderData.supplier.name,
        address: this.purchaseOrderData.supplier.address,
        contactName: this.purchaseOrderData.supplier.contactPerson,
        phoneNumber: this.purchaseOrderData.supplier.phone,
        email: this.purchaseOrderData.supplier.email,
      };

      let data = {
        userInfo: userInfo,
        payload: {
          ...this.purchaseOrderData,
        },
      };
      this.draftButton = true;
      // console.log(data)

      this.$store
        .dispatch("purchase/PurchaseOrder/createPurchaseOrder", data)
        .then((resp) => {
          this.draftButton = false;

          this.$router.push({ name: "PurchaseOrders" });
          this.$vs.notify({
            title: "Purchase Order ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.draftButton = false;

          console.log(err);
          this.$vs.notify({
            title: "Purchase Order ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processPurchaseOrder() {
      let userInfo = this.$store.state.auth.auth.authData;
      this.purchaseOrderData.supplier = {
        contactId: this.purchaseOrderData.supplier.id,
        supplierOrgId: this.purchaseOrderData.supplier.contactOrgId,
        name: this.purchaseOrderData.supplier.name,
        address: this.purchaseOrderData.supplier.address,
        contactName: this.purchaseOrderData.supplier.contactPerson,
        phoneNumber: this.purchaseOrderData.supplier.phone,
        email: this.purchaseOrderData.supplier.email,
      };
      let data = {
        userInfo: userInfo,
        payload: {
          ...this.purchaseOrderData,
        },
      };
      // console.log(data)

      this.processButton = true;
      this.processModal = false;

      this.$store
        .dispatch("purchase/PurchaseOrder/createPurchaseOrder", data)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              userInfo: userInfo,
              payload: {
                purchaseOrderId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };

            this.$store
              .dispatch("purchase/PurchaseOrder/sendPurchaseOrder", data2)
              .then((resp) => {
                this.processModal = false;
                this.$vs.notify({
                  title: "Purchase Order",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
                this.$router.push({ name: "PurchaseOrders" });
              })
              .catch((err) => {
                console.log(err);
                this.processModal = true;
                this.$vs.notify({
                  title: "Purchase Order ",
                  text: err,
                  color: "danger",
                  position: "top-right",
                });
              });

            this.processButton = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.processButton = false;
          this.processModal = true;
          this.$vs.notify({
            title: "Purchase Order ",
            text: err,
            color: "danger",
            position: "top-right",
          });
        });
    },

    updatePurchaseOrder() {
      this.isUpdating = true;
      let userInfo = this.$store.state.auth.auth.authData;
      delete this.purchaseOrderData.orgInfo;
      this.purchaseOrderData.supplier = {
        contactId: this.purchaseOrderData.supplier.id,
        supplierOrgId: this.purchaseOrderData.supplier.contactOrgId,
        name: this.purchaseOrderData.supplier.name,
        address: this.purchaseOrderData.supplier.address,
        contactName: this.purchaseOrderData.supplier.contactPerson,
        phoneNumber: this.purchaseOrderData.supplier.phone,
        email: this.purchaseOrderData.supplier.email,
      };
      let data = {
        userInfo: userInfo,
        payload: {
          ...this.purchaseOrderData,
        },
      };
      this.$store
        .dispatch("purchase/PurchaseOrder/updatePurchaseOrder", data)
        .then((resp) => {
          this.isUpdating = false;
          this.$router.push({ name: "PurchaseOrders" });

          this.$vs.notify({
            title: "Purchase Order ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          // console.log(err)
          this.isUpdating = false;

          this.$vs.notify({
            title: "Purchase Order ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    savePurchaseOrderCode() {
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
        .dispatch("purchase/PurchaseOrder/createPurchaseOrderCode", dataPayload)
        .then((resp) => {
          this.saveButton = false;
          this.$vs.notify({
            title: "Purchase Order Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.previewCode();
        })
        .catch((err) => {
          this.saveButton = false;
          console.log(err);
          this.$vs.notify({
            title: "Purchase Order Code",
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
        .dispatch("purchase/PurchaseOrder/getPurchaseOrderOrderCode")
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
          moduleName: "PO",
          yearOfBirth: null,
          contactName: null,
        },
      };
      this.$store
        .dispatch("purchase/PurchaseOrder/getGeneratedPurchaseOrderCode", data)
        .then((resp) => {
          this.previewFormat = resp.data.code;
          this.$vs.loading.close("#div-with-loading-preview > .con-vs-loading");
        });
    },
  },

  computed: {
    filterSupplier() {
      return this.suppliers.filter((supplier) => {
        return supplier.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    ...mapGetters("crm/contact", ["getSupplierContact"]),
    ...mapGetters("purchase/PurchaseOrder", ["getIsPurchaseOrderCodeSetup"]),
    ...mapGetters("catalogue", ["getAllVariant"]),
    ...mapGetters("accounting/settings/", ["getAccListFromExpOrRevCostCentre"]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseOrderPrivileges",
    ]),

    // eslint-disable-next-line vue/return-in-computed-property
    calSubTotal() {
      let total = 0;
      for (
        var i = 0;
        i < this.purchaseOrderData.purchaseOrderBoqs.length;
        i++
      ) {
        total =
          total +
          Number.parseFloat(
            this.purchaseOrderData.purchaseOrderBoqs[i].lineTotal
          );
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.purchaseOrderData.subTotal = total);
    },

    calTotalTax() {
      let total = 0;
      for (
        var i = 0;
        i < this.purchaseOrderData.purchaseOrderBoqs.length;
        i++
      ) {
        total =
          total +
          Number.parseFloat(
            this.purchaseOrderData.purchaseOrderBoqs[i].totalLineTaxAmount
          );
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.purchaseOrderData.tax =
        Number.parseFloat(total) +
        Number.parseFloat(this.purchaseOrderData.deliveryTaxAmount));
    },

    calTotalOrder() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.purchaseOrderData.total =
        Number.parseFloat(this.purchaseOrderData.subTotal || 0) +
        Number.parseFloat(this.purchaseOrderData.deliveryCharges || 0) +
        Number.parseFloat(this.purchaseOrderData.tax || 0);
      return this.purchaseOrderData.total;
    },

    routeQuery() {
      return this.$route.query;
    },
  },

  async mounted() {
    await this.$store.dispatch("crm/contact/getAllSupplierContact");
    await this.$store.dispatch("catalogue/getAllCatalogueVariant");
    await this.$store.dispatch("accounting/settings/getAccListFromExpOrRevCostCentre");
    const { data: result } = await this.$store.dispatch(
      "catalogue/tax/getOutletVat"
    );

    if (result) {
      this.allVat = result.taxes;
      let total = 0;

      for (let i = 0; i < this.allVat.length; i++) {
        total = total + Number(this.allVat[i].amount);
      }
      this.purchaseOrderData.totalTaxPolicyRate = total;
    }

    try {
      const { id } = this.$route.params;

      await this.$store.dispatch("crm/contact/getAllSupplierContact");
      await this.$store.dispatch("catalogue/getAllCatalogueVariant");

      if (this.routeQuery.type === "generate") {
        const { data } = await this.$store.dispatch(
          "purchase/Requisition/getSingleRequisition",
          id
        );
        this.purchaseOrderData.title = data.purchaseRequisition.title;
        this.purchaseOrderData.description =
          data.purchaseRequisition.description;
        this.purchaseOrderData.originId = data.purchaseRequisition.id;
        this.purchaseOrderData.originObject =
          data.purchaseRequisition.originObject;

        this.purchaseOrderData.purchaseOrderBoqs =
          data.purchaseRequisition.purchaseRequisitionBoqs.map((item) => {
            return {
              itemClass: item.type,
              partNumber: item.partNumber,
              customerVariantId: item.customerVariantId,
              supplierVariantId: item.supplierVariantId,

              name: item.variantName,
              description: item.description,
              quantity: item.quantityRequested,
              unitOfSale: item.unitOfMeasure,
              unitPrice: 0,
              lineTotal: 0,
              unitPriceTaxInclusive: 0,
              unitPriceTaxExclusive: 0,
              lineTotalTaxExclusive: 0,
              lineTotalTaxInclusive: 0,
              totalLineTaxAmount: 0,
            };
          });
        this.purchaseOrderData.supplier =
          data.purchaseRequisition.purchaseRequisitionSuppliers[0];
        this.purchaseOrderData.currency = data.purchaseRequisition.currency;

        await this.$store.dispatch(
          "purchase/PurchaseOrder/getPurchaseOrderOrderCode"
        );
      } else {
        if (id) {
          const { data } = await this.$store.dispatch(
            "purchase/PurchaseOrder/getSinglePurchaseOrder",
            id
          );
          this.purchaseOrderData = data;
        }
      }
    } catch (err) {
      console.log(err);
      this.$vs.notify({
        title: "Purchase Order ",
        text: err.response.data.message,
        color: "danger",
        position: "top-right",
      });
    }
  },
};
</script>

<style scoped></style>
