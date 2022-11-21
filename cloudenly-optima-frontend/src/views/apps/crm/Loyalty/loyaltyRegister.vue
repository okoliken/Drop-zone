<template>
  <div>
    <s-modal :modal="showDeactivateLoyaltyModal">
      <div
        class="rounded bg-white px-2 py-5 font-normal"
        style="width: 350px; font-size: 14px"
      >
        <div class="text-xl mb-10 text-black font-semibold">Deactivate Loyalty Scheme</div>

        <div>
          <p>
            Sorry you cannot deactivate a Loyalty Scheme that has members added
            to it.
          </p>

          <br />
          <p>
            For you to deactivate, you have to migrate members to another loyalty
            scheme.
          </p>
        </div>

        <s-content-seperator class="my-8" />

        <div class="flex items-center justify-between">
          <button
            @click="showDeactivateLoyaltyModal = false"
            type="button"
            class="px-5 py-2 text-lg cursor-pointer bg-transparent border-0"
          >
            Cancel
          </button>

          <s-button
            @click="deactivateLoyalty"
            :loading="deactivateLoader"
            type="button"
            class="
              px-5
              py-2
              text-lg
              rounded-full
              bg-primary-optima-color
              text-white
            "
          >
            Deactivate
          </s-button>
        </div>
      </div>
    </s-modal>

    <s-modal :modal="migrateLoyaltyModal">
      <div
        class="rounded bg-white font-normal"
        style="width: 300px; height: 450px"
      >
        <div class="text-xl mb-10">Migrate</div>

        <p>
          You are about to migrate from Gold. Note that this action cannot be
          reversed. Are you sure you wish to proceed?
        </p>

        <select
          class="px-2 py-2 rounded-md border border-1 border-gray-300"
          name=""
          id=""
        ></select>

        <input
          v-click-outside="outside"
          @click="isOpen = !isOpen"
          type="search"
          placeholder=""
          class="px-2 py-2 rounded-md border border-1 border-gray-300"
          :style="`width: 300px;`"
          v-model="search"
        />

        <div
          v-if="isOpen"
          slot="body"
          class="origin-top-left left-0 w-auto z-50 rounded-md"
        >
          <div
            :style="`width: 300px;`"
            class="py-2 px-2 bg-white shadow-md border rounded-md"
          >
            <ul>
              <li
                class="
                  py-3
                  px-2
                  mb-2
                  rounded
                  shadow
                  hover:bg-grey-lighter
                  rounded-lg
                  cursor-pointer
                "
                v-for="(item, index) in $options.filters.limitArray(
                  filteredContact,
                  (length = 5)
                )"
                :key="index"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <span class="mr-5">
                      <img :src="item.profileImage" alt="" srcset="" />
                    </span>
                    <div class="">
                      <span>
                        {{ item.name }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <s-checkbox :value="item" v-model="customers" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <s-content-seperator class="my-8" />
        <div class="flex justify-end mt-2">
          <button
            @click="addCustomer"
            class="px-10 py-4 bg-primary-optima-color text-white rounded-full"
          >
            Migrate
          </button>
        </div>
      </div>
    </s-modal>

    <s-modal :modal="showDeleteLoyaltyModal">
      <div
        class="rounded bg-white px-2 py-5 font-normal"
        style="width: 350px; font-size: 14px"
      >
        <div class="text-xl mb-10">Delete Loyalty Scheme</div>

        <div>
          <p>
            Sorry you cannot delete a Loyalty Scheme that has members added to
            it.
          </p>

          <br />
          <p>
            For you to delete, you have to migrate to another loyalty scheme.
          </p>
        </div>

        <s-content-seperator class="my-8" />

        <div class="flex items-center justify-between">
          <button
            type="button"
            class="px 5 py-2 text-lg cursor-pointer bg-transparent border-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </s-modal>

    <s-modal :modal="showAddMemberLoyaltyModal">
      <div
        class="rounded bg-white font-normal"
        style="width: 300px; height: 450px"
      >
        <div class="flex items-center justify-between mb-10">
          <div class="text-xl">Add Member</div>
          <div>
            <span
              class="cursor-pointer"
              @click="showAddMemberLoyaltyModal = false"
              role="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99999 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 8.99999C16.3636 4.93317 13.0668 1.63636 8.99999 1.63636C4.93317 1.63636 1.63636 4.93317 1.63636 8.99999C1.63636 13.0668 4.93317 16.3636 8.99999 16.3636ZM6.30583 12.8515L9.00001 10.1573L11.6942 12.8515L12.8513 11.6944L10.1571 9.0002L12.8513 6.30601L11.6942 5.14893L9.00001 7.84311L6.30583 5.14893L5.14874 6.30601L7.84293 9.0002L5.14874 11.6944L6.30583 12.8515Z"
                  fill="#F15846"
                />
              </svg>
            </span>
          </div>
        </div>

        <input
          v-click-outside="outside"
          @click="isOpen = !isOpen"
          type="search"
          placeholder=""
          class="px-2 py-2 rounded-md border border-1 border-gray-300"
          :style="`width: 300px;`"
          v-model="search"
        />

        <div
          v-if="isOpen"
          slot="body"
          class="origin-top-left left-0 w-auto z-50 rounded-md"
        >
          <div
            :style="`width: 300px;`"
            class="py-2 px-2 bg-white shadow-md border rounded-md"
          >
            <ul>
              <li
                class="
                  py-3
                  px-2
                  mb-2
                  rounded
                  shadow
                  hover:bg-grey-lighter
                  rounded-lg
                  cursor-pointer
                "
                v-for="(item, index) in $options.filters.limitArray(
                  filteredContact,
                  (length = 5)
                )"
                :key="index"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <span class="mr-5">
                      <!-- <img :src="item.profileImage" alt="" srcset="" /> -->
                    </span>
                    <div class="">
                      <span>
                        {{ item.name }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <s-checkbox :value="item" v-model="customers" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <s-content-seperator class="my-8" />
        <div class="flex justify-end mt-2">
          <s-button
            :loading="addMemberLoader"
            @click="addCustomer"
            class="px-10 py-4 bg-primary-optima-color text-white rounded-full"
          >
            Add
          </s-button>
        </div>
      </div>
    </s-modal>

    <div>
      <div class="mt-5 bg-white">
        <div class="py-5 px-3 flex items-center justify-between w-full">
          <div>
            <s-combo-box v-model="searchLoyalty" :value="search" />
          </div>
          <div>
            <div class="flex items-center mx-5">
              <button
                class="
                  px-8
                  py-4
                  mr-8
                  inline-flex
                  items-center
                  rounded-full
                  bg-gray-400
                "
              >
                <span class="text-primary-optima-color mr-3">
                  Import / Export</span
                >
                <span>
                  <svg
                    width="14"
                    height="6"
                    viewBox="0 0 14 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 6L0.937823 2.8858e-07L13.0622 1.34852e-06L7 6Z"
                      fill="#1034A6"
                    />
                  </svg>
                </span>
              </button>

              <button
                @click="createLoyaltyModal"
                class="
                  px-8
                  py-4
                  rounded-full
                  bg-cloudenly-primary-main
                  text-white
                "
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 mb-3 py-3 px-3 bg-white">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center w-2/3">
            <div class="flex items-center">
              <div
                class="
                  1/4
                  flex
                  items-center
                  border border-1
                  rounded-lg
                  border-gray-400
                  px-2
                "
              >
                <svg
                  class="mx-4"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.79941 3.69988H3.19946V2.89901H1.60018V5.30054H14.3997V2.89901H12.7994V3.69988H11.1995V2.89901H4.79941V3.69988ZM14.3997 6.90048H1.60018V14.8986H14.3997V6.90048ZM11.1995 1.30054H4.79941V0.5H3.19946V1.30054H1.59994C0.716318 1.30054 0 2.01686 0 2.90048V14.9C0 15.7837 0.716318 16.5 1.59994 16.5H14.3995C15.2831 16.5 15.9994 15.7837 15.9994 14.9V2.90048C15.9994 2.01686 15.2831 1.30054 14.3995 1.30054H12.7994V0.5H11.1995V1.30054ZM5.59994 10.0998H4V8.49988H5.59994V10.0998ZM7.19946 10.0998H8.79941V8.49988H7.19946V10.0998ZM11.9998 10.0998H10.3998V8.49988H11.9998V10.0998ZM4 13.299H5.59994V11.6991H4V13.299ZM8.79941 13.299H7.19946V11.6991H8.79941V13.299Z"
                    fill="#070707"
                  />
                </svg>

                <svg
                  class="mr-3"
                  width="1"
                  height="37"
                  viewBox="0 0 1 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.25"
                    y1="0.75"
                    x2="0.249999"
                    y2="36.25"
                    stroke="#9BA0A7"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class="p-0 border-0 m-0"
                  placeholder="*To Date"
                  type="date"
                  name="date"
                  id=""
                />
              </div>
              <div class="ml-3 w-1/4">
                <select
                  class="py-2 border border-1 border-gray-400 rounded-lg"
                  name=""
                  id=""
                >
                  <option value="">2022</option>
                </select>
              </div>
            </div>

            <div class="flex items-center ml-5">
              <div
                class="
                  1/4
                  flex
                  items-center
                  border border-1
                  rounded-lg
                  border-gray-400
                  px-2
                "
              >
                <svg
                  class="mx-4"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.79941 3.69988H3.19946V2.89901H1.60018V5.30054H14.3997V2.89901H12.7994V3.69988H11.1995V2.89901H4.79941V3.69988ZM14.3997 6.90048H1.60018V14.8986H14.3997V6.90048ZM11.1995 1.30054H4.79941V0.5H3.19946V1.30054H1.59994C0.716318 1.30054 0 2.01686 0 2.90048V14.9C0 15.7837 0.716318 16.5 1.59994 16.5H14.3995C15.2831 16.5 15.9994 15.7837 15.9994 14.9V2.90048C15.9994 2.01686 15.2831 1.30054 14.3995 1.30054H12.7994V0.5H11.1995V1.30054ZM5.59994 10.0998H4V8.49988H5.59994V10.0998ZM7.19946 10.0998H8.79941V8.49988H7.19946V10.0998ZM11.9998 10.0998H10.3998V8.49988H11.9998V10.0998ZM4 13.299H5.59994V11.6991H4V13.299ZM8.79941 13.299H7.19946V11.6991H8.79941V13.299Z"
                    fill="#070707"
                  />
                </svg>

                <svg
                  class="mr-3"
                  width="1"
                  height="37"
                  viewBox="0 0 1 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.25"
                    y1="0.75"
                    x2="0.249999"
                    y2="36.25"
                    stroke="#9BA0A7"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class="p-0 border-0 m-0"
                  placeholder="*To Date"
                  type="date"
                  name="date"
                  id=""
                />
              </div>
              <div class="ml-3 w-1/4">
                <select
                  class="py-2 border border-1 border-gray-400 rounded-lg"
                  name=""
                  id=""
                >
                  <option value="">2022</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <button
              class="
                py-2
                px-2
                mr-5
                border border-1 border-primary-optima-color
                text-primary-optima-color
                inline-flex
                items-center
                rounded-lg
              "
            >
              <span class="mr-5"> Bulk Selection</span>
              <span>
                <svg
                  width="14"
                  height="7"
                  viewBox="0 0 14 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 6.5L0.937823 0.5L13.0622 0.500001L7 6.5Z"
                    fill="#1034A6"
                  />
                </svg>
              </span>
            </button>

            <svg
              width="1"
              height="19"
              viewBox="0 0 1 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.25"
                y1="0.25"
                x2="0.249999"
                y2="18.75"
                stroke="#9BA0A7"
                stroke-width="0.5"
                stroke-linecap="round"
              />
            </svg>

            <div class="ml-5 mr-5">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 3.84297L5.6 9.95479V16.5L10.4 14.781V9.95479L16 3.84297V2.02796C16 1.18409 15.2837 0.5 14.4 0.5H1.6C0.716344 0.5 0 1.18409 0 2.02796V3.84297ZM14.4011 2.02803V2.79205H1.6011V2.02803H14.4011ZM2.56415 4.32001H13.4381L9.23819 8.90372H6.76401L2.56415 4.32001ZM7.2011 10.4317V14.2952L8.8011 13.7223V10.4317H7.2011Z"
                  fill="#070707"
                />
              </svg>
            </div>

            <svg
              width="1"
              height="19"
              viewBox="0 0 1 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.25"
                y1="0.25"
                x2="0.249999"
                y2="18.75"
                stroke="#9BA0A7"
                stroke-width="0.5"
                stroke-linecap="round"
              />
            </svg>

            <div class="ml-3">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.06464 2.5H17.0646C17.5951 2.5 18.1038 2.71071 18.4788 3.08579C18.8539 3.46086 19.0646 3.96957 19.0646 4.5V11.58C17.5601 11.3272 16.0157 11.6561 14.7446 12.5H11.0646V16.5H12.1446C12.0346 17.18 12.0346 17.85 12.1446 18.5H3.06464C2.5342 18.5 2.0255 18.2893 1.65042 17.9142C1.27535 17.5391 1.06464 17.0304 1.06464 16.5V4.5C1.06464 3.4 1.96464 2.5 3.06464 2.5ZM3.06464 6.5V10.5H9.06464V6.5H3.06464ZM11.0646 6.5V10.5H17.0646V6.5H11.0646ZM3.06464 12.5V16.5H9.06464V12.5H3.06464ZM22.8446 18.82L21.7746 18C21.7946 17.83 21.8146 17.67 21.8146 17.5C21.8146 17.33 21.8046 17.17 21.7746 17L22.8346 16.18C22.8796 16.1415 22.91 16.0887 22.9209 16.0306C22.9318 15.9724 22.9226 15.9122 22.8946 15.86L21.8946 14.13C21.8346 14 21.7046 14 21.5646 14L20.3446 14.5C20.0646 14.32 19.8046 14.15 19.4946 14.03L19.3046 12.71C19.2946 12.59 19.1846 12.5 19.0646 12.5H17.0646C16.9446 12.5 16.8346 12.59 16.8146 12.71L16.6246 14.03C16.3246 14.16 16.0346 14.32 15.7746 14.5L14.5346 14C14.4246 14 14.2946 14 14.2246 14.13L13.2246 15.86C13.1646 15.97 13.1846 16.1 13.2846 16.18L14.3446 17C14.3047 17.3321 14.3047 17.6679 14.3446 18L13.2846 18.82C13.2397 18.8585 13.2093 18.9113 13.1983 18.9694C13.1874 19.0276 13.1967 19.0878 13.2246 19.14L14.2246 20.87C14.2846 21 14.4146 21 14.5346 21L15.7746 20.5C16.0346 20.68 16.3146 20.85 16.6246 20.97L16.8146 22.29C16.8346 22.41 16.9346 22.5 17.0646 22.5H19.0646C19.1846 22.5 19.2946 22.41 19.3146 22.29L19.5046 20.97C19.8046 20.84 20.0646 20.68 20.3446 20.5L21.5646 21C21.7046 21 21.8346 21 21.9046 20.87L22.9046 19.14C22.9326 19.0878 22.9418 19.0276 22.9309 18.9694C22.92 18.9113 22.8896 18.8585 22.8446 18.82ZM18.0646 19C17.2346 19 16.5646 18.33 16.5646 17.5C16.5646 16.67 17.2446 16 18.0646 16C18.8846 16 19.5646 16.67 19.5646 17.5C19.5646 18.33 18.9046 19 18.0646 19Z"
                  fill="#14171F"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <table class="table min-w-full">
        <thead class="bg-gray-300">
          <tr class>
            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Category
            </th>

            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Description
            </th>
            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Applicable discount
            </th>

            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Last updated
            </th>
            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Members
            </th>

            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            >
              Status
            </th>

            <th
              class="
                py-3
                px-6
                tracking-wider
                whitespace-nowrap
                text-dark-optima-color
              "
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(loyalty, index) in filteredLoyalty"
            :key="index"
            class="
              font-normal
              cursor-pointer
              hover:bg-grey-lightest
              border border-solid
              rounded
              border-grey-lighter border-l-0 border-r-0
            "
          >
            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              {{ loyalty.name }}
            </td>

            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              {{ loyalty.description }}
            </td>

            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              {{ loyalty.applicableDiscount }}
              <span class="ml-3"> %</span>
            </td>

            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              {{ loyalty.createdAt | date }}
            </td>
            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              <span
                class="
                  cursor-pointer
                  text-cloudenly-primary-main
                  rounded-lg
                  p-1
                "
                >{{ loyalty.contacts }}</span
              >
            </td>

            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              <span
                class="py-2 px-2 rounded-sm text-white green"
                v-if="loyalty.status === 'active'"
              >
                {{ loyalty.status | capitalize }}
              </span>
              <span class="bg-red-200 py-2 px-2 rounded-sm text-red-600" v-else>
                {{ loyalty.status }}
              </span>
            </td>

            <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon
                    class="h-6 w-6"
                    icon="MoreHorizontalIcon"
                  ></feather-icon>
                </div>
                <vs-dropdown-menu>
                  <ul style="min-width: 10rem">
                    <li
                      @click="routeEditLoyalty(loyalty)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      Edit
                    </li>

                    <!-- <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      Update Status
                    </li> -->

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      Migrate
                    </li>

                    <li
                      @click="openAddCustomerModal(loyalty)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      Add Member
                    </li>

                    <li
                      @click="openDeactivateModal(loyalty)"
                      v-if="loyalty.contacts <= 0"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      Deactivate
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
      <s-pagination class="py-6" @pagination="pagination($event)" />
    </div>
  </div>
</template>

<script>
import searchCustomer from "../../../components/searchCustomer.vue";

import { mapGetters } from "vuex";

export default {
  components: { searchCustomer },
  data() {
    return {
      showDeactivateLoyaltyModal: false,
      migrateLoyaltyModal: false,
      showDeleteLoyaltyModal: false,
      showAddMemberLoyaltyModal: false,
      customers: [],
      isOpen: false,
      search: "",
      searchLoyalty: "",
      loyaltyData: {
        type: "",
        loyaltyId: "",
        contacts: [],
      },

      migrateDate: {},
      deactivateLoader: false,
      addMemberLoader: false,
    };
  },

  computed: {
    ...mapGetters("crm/loyalty", ["allLoyalty", "getContact"]),

    filteredContact() {
      return this.getContact.filter((contact) => {
        return contact.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    filteredLoyalty() {
      return this.allLoyalty.filter((resp) => {
        return resp.name
          .toLowerCase()
          .includes(this.searchLoyalty.toLowerCase());
      });
    },
  },

  methods: {
    createLoyaltyModal() {
      this.$router.push({
        name: "crmSettings",
      });
    },

    openDeleteModal() {
      this.showDeleteLoyaltyModal = true;
    },

    openMigrateModal() {
      this.migrateLoyaltyModal = true;
    },

    deactivateLoyalty() {
      this.deactivateLoader = true;
      this.$store
        .dispatch("crm/loyalty/deactivateLoyalty", this.loyaltyData)
        .then((resp) => {
          // console.log(resp);
          this.deactivateLoader = false;
          this.showDeactivateLoyaltyModal = false;
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deactivateLoader = false;
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    migrateLoyalty() {
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
        },
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/migrateLoyalty", data)
        .then((resp) => {
          console.log(resp);
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    deleteLoyalty() {
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
        },
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/deleteLoyalty", data)
        .then((resp) => {
          // console.log(resp);
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          // console.log(err);
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    removeLoyalty() {
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
        },
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/removeContactFromLoyalty", data)
        .then((resp) => {
          // console.log(resp);
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          // console.log(err);
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    addCustomer() {
      this.addMemberLoader = true;
      this.customers = this.customers.map((resp) => {
        return {
          name: resp.name,
          customerId: resp.id,
          email: resp.email,
          contactCategory: resp.contactCategory,
        };
      });
      this.loyaltyData.contacts = this.customers;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/addContactToLoyalty", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.loyaltyData = {};
          this.addMemberLoader = false;
          this.showAddMemberLoyaltyModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.showAddMemberLoyaltyModal = true;
          this.addMemberLoader = false;
          this.$vs.notify({
            title: "Loyalty",
            text: " Loyalty Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    openAddCustomerModal(val) {
      this.showAddMemberLoyaltyModal = true;
      this.loyaltyData.type = val.type;
      this.loyaltyData.loyaltyId = val.id;
    },

    openDeactivateModal(val) {
      console.log(val);
      this.loyaltyData = val;
      this.showDeactivateLoyaltyModal = true;
    },

    routeEditLoyalty(val) {
      this.$router.push({
        name: "EditLoyalty",
        params: {
          id: val.id,
        },
      });
    },
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
  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },
  async mounted() {
    // await this.$store.dispatch("crm/loyalty/getAllLoyalty");
    await this.$store.dispatch("crm/loyalty/getContact");
  },
};
</script>

<style scoped>
.green{
  background-color: rgb(28, 242, 28);
}
</style>