<template>
  <div>
    <div
      v-if="getAllMarkupDiscount.length > 0"
      class="
        bg-white
        py-6
        px-5
        mt-6
        font-light
        text-base text-gray-500
        rounded-md
      "
    >
      <p class="mb-2">
        Your Account Owner/Root Admin has set up the markup and Allowable
        Discount shown below. You may wish to revise them for your own location.
        To revise,
      </p>
      <p>click on the edit tab to modify.</p>
    </div>
    <div
      class="bg-white px-6 py-8 mt-8 overflow-auto"
      v-if="getAllMarkupDiscount.length > 0"
    >
      <div class="flex justify-between items-center">
        <div>
          <s-combo-box />
        </div>

        <div v-if="getAllMarkupDiscount.length > 0">
          <p
            @click="editDiscountModal()"
            class="
              bg-cloudenly-primary-main
              px-16
              py-4
              mt-6
              text-white text-center
              cursor-pointer
              rounded-full
            "
          >
            Edit
          </p>
        </div>
      </div>
      <div
        class="flex justify-between items-center px-2 mt-10"
        v-if="getAllMarkupDiscount.length > 0"
      >
        <div class="flex items-center">
          <div>
            <div class="mr-3 text-black">From:</div>
          </div>
          <s-text :width="220" type="date" />

          <div class="items-center mr-0">
            <div class="mx-3 text-black">To:</div>
          </div>
          <s-text :width="220" type="date" />
        </div>
        <div @click="sortTableModal()" class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="bg-white mt-6">
      <div>
        <table v-if="getAllMarkupDiscount.length > 0" class="table min-w-full">
          <thead class="bg-gray-300">
            <tr class="border-1 border-gray-500">
              <!-- <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                   Location
                </th> -->
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Amount
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Sales Price (NGN)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Sales Margin (NGN)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Minimum Sales Price (NGN)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Margin at Maximum Discount (NGN)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Markup (%)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Sales Margin (%)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Max Allowable Discount (%)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Margin at Minimum Discount (NGN)
              </th>
              <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="
                hover:bg-grey-lightest
                border-1 border-gray-500
                font-normal
              "
              v-for="(markupDiscount, index) in getAllMarkupDiscount"
              :key="index"
            >
              <!-- <td class="px-6 py-8 border-1 border-gray-500 whitespace-no-wrap border">
                  location
                </td> -->
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.amount }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.salesPrice }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.salesMargin }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.minimumSalesPrice }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.marginAtMaximumDiscount }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.markupPercent }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.salesMarginPercentage }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.maximumAllowableDiscount }}
              </td>
              <td
                class="
                  px-6
                  py-8
                  border-1 border-gray-500
                  whitespace-no-wrap
                  border
                "
              >
                {{ markupDiscount.marginAtMinimumDiscount }}
              </td>
              <td>
                <div class="text-center cursor-pointer">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <feather-icon
                      icon="MoreHorizontalIcon"
                      svgClasses="w-6 h-6"
                    ></feather-icon>
                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click="editDiscountModal(markupDiscount.id)"
                        >
                          <span class="">Edit</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click="openDeleteMarkupModal(markupDiscount.id)"
                        >
                          Delete
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="bg-white py-32 mx-auto mt-5">
          <VuePerfectScrollbar v-once :settings="settings">
            <s-table :headers="headers" :items="[]" :emptyStateImg="img">
              <div slot="title">
                <p class="text-xl font-semibold mb-5 leading-normal">
                  There are no Retail markup & discount at the moment
                </p>
              </div>
              <div slot="body">
                <p class="font-normal">
                  When a customer initiates an action or submits a form/
                  document, they show up here
                </p>
              </div>
              <div slot="body" class="flex items-center justify-start">
                <p
                  @click="setupDiscount()"
                  class="
                    bg-cloudenly-primary-main
                    px-8
                    py-4
                    mt-6
                    text-white text-center
                    cursor-pointer
                    rounded-full
                    w-2/4
                  "
                >
                  Setup
                </p>
              </div>
            </s-table>
          </VuePerfectScrollbar>
        </div>
      </div>
    </div>

    <!-- setup discount modal -->
    <s-modal :modal="discountModal">
      <div class="w-full">
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Global Markup and Discount</h1>
          <div @click="discountModal = false" class="cursor-pointer">
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
                d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM8.99999 16.8636C13.0668 16.8636 16.3636 13.5668 16.3636 9.49999C16.3636 5.43317 13.0668 2.13636 8.99999 2.13636C4.93317 2.13636 1.63636 5.43317 1.63636 9.49999C1.63636 13.5668 4.93317 16.8636 8.99999 16.8636ZM6.30583 13.3515L9.00001 10.6573L11.6942 13.3515L12.8513 12.1944L10.1571 9.5002L12.8513 6.80601L11.6942 5.64893L9.00001 8.34311L6.30583 5.64893L5.14874 6.80601L7.84293 9.5002L5.14874 12.1944L6.30583 13.3515Z"
                fill="#F15846"
              />
            </svg>
          </div>
        </div>
        <div class="flex py-4 items-center text-black text-sm space-x-5">
          <label
            >Amount (NGN):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.amount"
          /></label>
          <label
            >Markup (%):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.markupPercent"
            />
          </label>
        </div>
        <div class="flex py-4 text-black items-center text-sm space-x-5">
          <label for=""
            >Sales Price (NGN):
            <s-text
              placeholder="--Enter--"
              label=""
              disable
              readonly
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.salesPrice"
          /></label>
          <label for=""
            >Sales Margin (NGN):
            <s-text
              placeholder="--Autoloaded--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.salesMargin"
            />
          </label>
        </div>
        <div class="flex py-4 items-center text-black text-sm space-x-5">
          <label class="text-black" for=""
            >Sales Margin (%):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.salesMarginPercentage"
          /></label>
          <label for=""
            >Maximum allowable Discount(%):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.maximumAllowableDiscount"
            />
          </label>
        </div>
        <div class="flex py-4 items-center text-black text-sm space-x-5">
          <label for=""
            >Minimum Sales Price (NGN):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.minimumSalesPrice"
          /></label>
          <label for=""
            >Margin at Maximum Discount (NGN):
            <s-text
              placeholder="--Autoloaded--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.marginAtMaximumDiscount"
            />
          </label>
        </div>
        <div class="flex py-4 items-center text-black text-sm space-x-5">
          <label for=""
            >Margin at Maximum Discount (%):
            <s-text
              placeholder="--Enter--"
              label=""
              :width="270"
              class="mt-3"
              v-model="markupDiscountData.marginAtMinimumDiscount"
          /></label>
        </div>
        <div class="flex py-4 items-center text-black text-sm space-x-5">
          <label for="">Allow Location Admins to Modify: </label>
          <div class="has-tooltip mr-12">
            <span
              class="
                tooltip
                cursor-pointer
                rounded
                ease-in-out
                shadow-lg
                p-1
                w-40
                bg-gray-100
                text-black
                -mt-8
              "
              >This enables admins to globally modify markup discount</span
            >
            <span class=""
              ><svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5ZM13.6365 7.5001C13.6365 10.8891 10.8892 13.6365 7.50013 13.6365C4.11111 13.6365 1.36377 10.8891 1.36377 7.5001C1.36377 4.11108 4.11111 1.36374 7.50013 1.36374C10.8892 1.36374 13.6365 4.11108 13.6365 7.5001ZM7.50158 11.5909C7.96196 11.5909 8.33518 11.2178 8.33518 10.7575C8.33518 10.2973 7.96196 9.92422 7.50158 9.92422C7.04119 9.92422 6.66797 10.2973 6.66797 10.7575C6.66797 11.2178 7.04119 11.5909 7.50158 11.5909ZM8.33958 4.09097H6.67236V9.09097H8.33958V4.09097Z"
                  fill="#F15846"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="space-x-5 flex items-center">
          <label class="flex items-center">
            <input
              type="radio"
              name="select1"
              v-model="markupDiscountData.allowLocationAdminsModify"
              :value="false"
              class="mr-2"
              checked
            />
            Yes
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="select1"
              v-model="markupDiscountData.allowLocationAdminsModify"
              :value="true"
              class="mr-2"
            />
            No
          </label>
        </div>

        <hr class="text-gray-400 mt-10 mb-10" />
        <div class="mt-10 flex justify-between">
          <s-button
            @click="discountModal = false"
            class="
              px-5
              py-2
              text-primary
              border-none
              cursor-pointer
              bg-gray-400
              rounded-full
            "
          >
            Cancel
          </s-button>
          <s-button
            class="
              bg-cloudenly-primary-main
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              rounded-full
            "
            @click="saveMarkupDiscount"
          >
            Save
          </s-button>
        </div>
      </div>
    </s-modal>

    <!-- Edit discount Modal -->
    <div v-if="updateMarkupDiscount">
      <s-modal :modal="editModal">
        <VuePerfectScrollbar class="scroll-area2" v-once :settings="settings">
          <div class="w-full">
            <div class="flex items-center justify-between mb-10">
              <h1 class="text-black text-lg">New Global Markup & Discount</h1>
              <div @click="editModal = false" class="cursor-pointer mr-4">
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
                    d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM8.99999 16.8636C13.0668 16.8636 16.3636 13.5668 16.3636 9.49999C16.3636 5.43317 13.0668 2.13636 8.99999 2.13636C4.93317 2.13636 1.63636 5.43317 1.63636 9.49999C1.63636 13.5668 4.93317 16.8636 8.99999 16.8636ZM6.30583 13.3515L9.00001 10.6573L11.6942 13.3515L12.8513 12.1944L10.1571 9.5002L12.8513 6.80601L11.6942 5.64893L9.00001 8.34311L6.30583 5.64893L5.14874 6.80601L7.84293 9.5002L5.14874 12.1944L6.30583 13.3515Z"
                    fill="#F15846"
                  />
                </svg>
              </div>
            </div>

            <div class="flex py-4 items-center text-black text-sm space-x-16">
              <label for=""
                >Overide all item based modifications:
                <div class="space-x-5 py-5 flex items-center">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="mod"
                      v-model="
                        updateMarkupDiscountData.overrideAllItemBasedModifications
                      "
                      :value="true"
                      class="mr-2"
                    />
                    Yes
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="mod"
                      v-model="
                        updateMarkupDiscountData.overrideAllItemBasedModifications
                      "
                      :value="false"
                      class="mr-2"
                    />
                    No
                  </label>
                </div>
              </label>
              <label for=""
                >Overide all location based modifications:
                <div class="space-x-5 py-5 flex items-center">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="mod1"
                      v-model="
                        updateMarkupDiscountData.overrideLocationBasedModifications
                      "
                      :value="true"
                      class="mr-2"
                      checked
                    />
                    Yes
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="mod1"
                      v-model="
                        updateMarkupDiscountData.overrideLocationBasedModifications
                      "
                      :value="false"
                      class="mr-2"
                    />
                    No
                  </label>
                </div>
              </label>
            </div>

            <div class="flex py-4 text-black items-center text-sm space-x-5">
              <label for=""
                >Amount (NGN):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.amount"
              /></label>
              <label for=""
                >Markup (%):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.markupPercent"
                />
              </label>
            </div>
            <div class="flex py-4 text-black items-center text-sm space-x-5">
              <label for=""
                >Sales Price (NGN):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.salesPrice"
              /></label>
              <label for=""
                >Sales Margin (%):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.salesMargin"
                />
              </label>
            </div>
            <div class="flex py-4 items-center text-black text-sm space-x-5">
              <label class="text-black" for=""
                >Sales Margin (%):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.salesMarginPercentage"
              /></label>
              <label for=""
                >Maximum allowable (%):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.maximumAllowableDiscount"
                />
              </label>
            </div>
            <div class="flex py-4 items-center text-black text-sm space-x-5">
              <label for=""
                >Minimum Sales Price (NGN):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.minimumSalesPrice"
              /></label>
              <label for=""
                >Margin at Maximum Discount (NGN):
                <s-text
                  placeholder="--Autoloaded--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.marginAtMaximumDiscount"
                />
              </label>
            </div>
            <div class="flex py-4 items-center text-black text-sm space-x-5">
              <label for=""
                >Margin at Minimum Discount (%):
                <s-text
                  placeholder="--Enter--"
                  label=""
                  :width="270"
                  class="mt-3"
                  v-model="updateMarkupDiscountData.marginAtMinimumDiscount"
              /></label>
            </div>
            <div class="flex py-4 items-center text-black text-sm space-x-5">
              <label for="">Allow Location Admins to Modify: </label>
              <div class="has-tooltip mr-12">
                <span
                  class="
                    tooltip
                    cursor-pointer
                    rounded
                    ease-in-out
                    shadow-lg
                    p-1
                    w-40
                    bg-gray-100
                    text-black
                    -mt-8
                  "
                  >This enables admins to globally modify markup discount based
                  on location</span
                >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5ZM13.6365 7.5001C13.6365 10.8891 10.8892 13.6365 7.50013 13.6365C4.11111 13.6365 1.36377 10.8891 1.36377 7.5001C1.36377 4.11108 4.11111 1.36374 7.50013 1.36374C10.8892 1.36374 13.6365 4.11108 13.6365 7.5001ZM7.50158 11.5909C7.96196 11.5909 8.33518 11.2178 8.33518 10.7575C8.33518 10.2973 7.96196 9.92422 7.50158 9.92422C7.04119 9.92422 6.66797 10.2973 6.66797 10.7575C6.66797 11.2178 7.04119 11.5909 7.50158 11.5909ZM8.33958 4.09097H6.67236V9.09097H8.33958V4.09097Z"
                    fill="#F15846"
                  />
                </svg>
              </div>
            </div>
            <div class="space-x-5 flex items-center">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="select1"
                  v-model="updateMarkupDiscountData.allowLocationAdminsModify"
                  :value="false"
                  class="mr-2"
                />
                Yes
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="select1"
                  v-model="updateMarkupDiscountData.allowLocationAdminsModify"
                  :value="true"
                  class="mr-2"
                />
                No
              </label>
            </div>

            <hr class="text-gray-400 mt-10 mb-10" />
            <div class="mt-10 flex justify-between">
              <s-button
                @click="editModal = false"
                class="
                  px-5
                  py-2
                  text-primary
                  border-none
                  cursor-pointer
                  bg-gray-400
                  rounded-full
                "
              >
                Cancel
              </s-button>
              <s-button
                class="
                  bg-cloudenly-primary-main
                  px-5
                  py-2
                  text-white
                  border-none
                  cursor-pointer
                  rounded-full
                "
                @click="updateMarkupDiscount"
              >
                Update
              </s-button>
            </div>
          </div>
        </VuePerfectScrollbar>
      </s-modal>
    </div>

    <!-- End of edit discount modal -->

    <!-- table columns modal -->
    <s-modal :modal="tableModal">
      <VuePerfectScrollbar class="scroll-area1" v-once :settings="settings">
        <div class="max-w-lg">
          <div class="text-black mt-4 flex justify-start">
            <div @click="tableModal = false" class="cursor-pointer">
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7M1 7L7 13M1 7H17"
                  stroke="#1034A6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="text-cloudenly-primary-main mx-4 text-xl font-extrabold"
            >
              Table Columns
            </div>
          </div>
          <p class="mt-8 text-light w-11/12 text-base leading-relaxed">
            Choose headings to display on table, and the order you wish to
            display these columns.
          </p>
        </div>
        <div class="flex items-end justify-end px-4 py-4">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                fill="white"
              />
              <path
                d="M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z"
                fill="#1034A6"
              />
            </svg>
          </div>
        </div>
        <div class="border-1 rounded-sm border-grey-light">
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Location</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Sample Unit Cost (NGN)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Markup (%)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Sales Price</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Sales Margin (NGN)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Sales Margin (%)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
        </div>
        <div
          class="
            border-dashed border-b-1 border-gray-light
            w-full
            my-4
            text-gray-400
          "
        ></div>
        <div class="border-1 rounded-sm border-grey-light">
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Max. Allowable Discount (%)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Minimum Sales Price</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Margin at Max. Discount (NGN)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Margin at Max. Discount (%)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-6 mt-16 px-6 mb-5">
          <div
            class="
              cursor-pointer
              px-8
              py-3
              rounded-full
              bg-cloudenly-primary-off
              text-cloudenly-primary-main
            "
            @click="tableModal = false"
          >
            Cancel
          </div>
          <div
            class="
              cursor-pointer
              text-white
              rounded-full
              px-8
              py-3
              bg-cloudenly-primary-main
            "
          >
            Apply
          </div>
        </div>
      </VuePerfectScrollbar>
    </s-modal>

    <!-- delete  modal -->
    <s-modal button-close-hidden :modal="deleteModal">
      <div class="w-full">
        <div class="">
          <div class="flex items-center">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main h-12 w-12"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>
            <div>
              <p class="text-xl font-bold mb-2">Warning</p>
              <p class="text-lg font-normal">
                You are about to delete this markup discount
              </p>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-center">
            <button
              class="
                px-5
                py-3
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded-full
              "
              @click="deleteMarkupDiscount()"
            >
              Delete
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="deleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </s-modal>
    <!-- end of delete modal -->

    <div class="mt-6" v-if="getAllMarkupDiscount.length > 0">
      <s-pagination @pagination="pagination($event)" />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import HamburgerMenu from "@/assets/images/optimaAsset/hamburger_menu-2.svg";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Seen from "@/assets/images/optimaAsset/seen.svg";
import markupDiscountEmptyIcon from "@/assets/images/optimaAsset/markupDiscountEmptyState.svg";
export default {
  name: "MarkupDiscount",
  components: {
    VuePerfectScrollbar,
    markupDiscountEmptyIcon,
    Seen,
  },
  data() {
    return {
      HamburgerMenu,
      Seen,
      img: markupDiscountEmptyIcon,
      getisMarkupDiscountSetup: false,
      discountModal: false,
      editModal: false,
      tableModal: false,
      deleteModal: false,
      // deleteButton: false,
      // updateButton: false,
      markupDiscount: {},
      markupId: "",
      settings: {
        maxScrollbarLength: 80,
      },
      markupDiscountData: {
        amount: "",
        salesPrice: "",
        salesMargin: "",
        minimumSalesPrice: "",
        marginAtMaximumDiscount: "",
        markupPercent: "",
        salesMarginPercentage: "",
        maximumAllowableDiscount: "",
        marginAtMinimumDiscount: "",
        allowLocationAdminsModify: false,

        outletData: [
          {
            outletName: "",
            id: "",
          },
        ],
        userInfo: {
          outletId: "",
          creatorId: "",
          orgId: "",
        },
      },
      updateMarkupDiscountData: {
        outletName: "",
        amount: "",
        salesPrice: "",
        salesMargin: "",
        minimumSalesPrice: "",
        marginAtMaximumDiscount: "",
        overrideLocationBasedModifications: "",
        overrideAllItemBasedModifications: "",
        markupPercent: "",
        salesMarginPercentage: "",
        maximumAllowableDiscount: "",
        marginAtMinimumDiscount: "",
        allowLocationAdminsModify: true,

        userInfo: {
          outletId: "",
          creatorId: "",
          orgId: "",
          isAdmin: true,
        },
      },
      headers: [],
    };
  },
  methods: {
    setupDiscount() {
      this.discountModal = true;
    },
    sortTableModal() {
      this.tableModal = true;
    },
    editDiscountModal(val) {
      this.markupId = val;
      this.editModal = true;
    },
    saveMarkupDiscount() {
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
        },
        payload: this.markupDiscountData,
      };

      this.$store
        .dispatch("crm/markupDiscount/createMarkupDiscount", data)
        .then((resp) => {
          this.discountModal = false;
          // console.log(resp);
          this.$vs.notify({
            title: "Markup & Discount",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Markup & Discount",
            text: err.response.data.messsage,
            color: "danger",
            position: "top-right",
          });
        });
    },
    openDeleteMarkupModal(val) {
      this.markupId = val;
      // console.log(val, "test val ID");
      this.deleteModal = true;
    },
    deleteMarkupDiscount() {
      let orgId = this.$store.state.auth.auth.authData.orgId;
      let id = this.markupId;

      let data = {
        orgId: orgId,
        id: id,
      };
      // console.log(data.id, 'test id')
      this.$store
        .dispatch("crm/markupDiscount/deleteMarkupDiscount", data)
        .then((resp) => {
          // this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Markup Discount",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          // this.deleteButton = false;
          this.$vs.notify({
            title: "Markup Discount",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    updateMarkupDiscount() {
      let id = this.markupId;
      let userAuth = this.$store.state.auth.auth.authData;
      //  this.updateButton = true;
      let data = {
        orgId: userAuth.orgId,
        id: id,

        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
          isAdmin: (this.isAdmin = true),
        },
        payload: {
          // outletName: this.updateMarkupDiscountData.outletName,
          amount: this.updateMarkupDiscountData.amount,
          salesPrice: this.updateMarkupDiscountData.salesPrice,
          salesMargin: this.updateMarkupDiscountData.salesMargin,
          minimumSalesPrice: this.updateMarkupDiscountData.minimumSalesPrice,
          marginAtMaximumDiscount:
            this.updateMarkupDiscountData.marginAtMaximumDiscount,
          overrideLocationBasedModifications:
            (this.updateMarkupDiscountData.overrideLocationBasedModifications = false),
          overrideAllItemBasedModifications:
            (this.updateMarkupDiscountData.overrideAllItemBasedModifications = false),
          markupPercent: this.updateMarkupDiscountData.markupPercent,
          salesMarginPercentage:
            this.updateMarkupDiscountData.salesMarginPercentage,
          maximumAllowableDiscount:
            this.updateMarkupDiscountData.maximumAllowableDiscount,
          marginAtMinimumDiscount:
            this.updateMarkupDiscountData.marginAtMinimumDiscount,
          allowLocationAdminsModify:
            (this.updateMarkupDiscountData.allowLocationAdminsModify = true),
          // ...this.updateMarkupDiscountData,
          // ...this.markupDiscountData.id
        },
      };
      this.$store
        .dispatch("crm/markupDiscount/updateMarkupDiscount", data)
        .then((resp) => {
          this.editModal = false;
          this.$vs.notify({
            title: "Markup & Discount",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Markup & Discount",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
  computed: {
    ...mapGetters("crm/markupDiscount", [
      "getAllMarkupDiscount",
      "getOneMarkupDiscount",
    ]),
  },
  mounted() {
    // this.$store.dispatch("crm/markupDiscount/getAllMarkupDiscount");

    this.$store
      .dispatch("userOutlet/getOptimaOrganisationOutlet")
      .then((resp) => {
        this.markupDiscountData.outletData = resp.data.outlets.map((resp) => {
          console.log(resp);
          return {
            outletName: resp.name,
            id: resp.id,
          };
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.scroll-area1 {
  position: relative;
  margin: auto;
  width: 400px;
  height: 600px;
}
.scroll-area2 {
  position: relative;
  margin: auto;
  width: 600px;
  height: 600px;
}
</style>