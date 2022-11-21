<template>
  <div class>
    <!-- Edit Main Variant Section -->
    <vs-popup
      button-close-hidden
      title="Edit Variant"
      :active.sync="editMainVariantModal"
    >
      <div class="container">
        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Name :</p>
          </label>

          <div class="col-7">
            <input
              type="text"
              v-model="mainVariant.name"
              placeholder=" Enter Category Name"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
              name
              id
            />
          </div>
        </div>

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Brand :</p>
          </label>
          <div class="col-7">
            <select
              v-model="mainVariant.brandId"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
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

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Category :</p>
          </label>
          <div class="col-7">
            <select
              v-model="mainVariant.categoryId"
              class="py-2 px-2 border border-solid border-grey rounded w-full"
            >
              <option
                v-for="(cat, index) in getallItemCategory"
                :key="index"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group flex items-center">
          <label for class="col-4 col-form-label">
            <p class="font-normal">Description :</p>
          </label>
          <div class="col-7">
            <input
              type="text"
              v-model="mainVariant.description"
              placeholder
              class="py-2 px-2 border border-solid border-grey rounded w-full"
              name
              id
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          :disabled="updateMainVariantButton"
          :class="{
            'cursor-not-allowed': updateMainVariantButton,
            'bg-cloudenly-primary-mid': updateMainVariantButton,
          }"
          @click="updateMainVariant"
          type="button"
          class="
            px-5
            py-2
            mr-2
            rounded
            text-white
            border-none
            cursor-pointer
            bg-cloudenly-primary-main
          "
        >
          Save changes
        </button>

        <button
          @click="editMainVariantModal = false"
          type="button"
          class="px-5 py-2 rounded border-none cursor-pointer bg-transparent"
        >
          Cancel
        </button>
      </div>
    </vs-popup>
    <!-- End Edit Main Variant Section -->

    <!-- Export Contact -->
    <vs-popup
      button-close-hidden
      title="Export your Catalogue"
      :active.sync="exportCatalogueModal"
    >
      <div v-if="getIsAccOwner || getSalesCataloguePrivileges.exportCatalogue">
        <div class="container">
          <div
            class="
              bg-white
              border-solid
              border-t-0
              border-r-0
              border-b-0
              border-cloudenly-danger-main
              rounded
              border-4
              shadow
              mb-2
            "
          >
            <div class="p-5">
              <div class>
                <h3 class="m-0">
                  You are about to export your Items Catalogue..
                  <span class="text-cloudenly-primary-main cursor-pointer pl-1"
                    >Note: File Format is in CSV..</span
                  >
                </h3>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center mt-8">
            <button
              @click="exportCatalogue"
              class="
                py-2
                px-10
                mr-5
                cursor-pointer
                border border-solid
                rounded
                text-white
                bg-cloudenly-primary-main
              "
            >
              Export
            </button>
            <button
              class="
                py-2
                px-10
                cursor-pointer
                bg-transparent
                border border-solid
                rounded
              "
              @click="exportCatalogueModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Export Contact -->

    <div class="pt-3 pb-3 px-2 bg-white">
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class>
            <div class="flex items-center">
              <input
                type="text"
                v-model="search"
                class="
                  py-3
                  px-3
                  w-full
                  border
                  bg-gray-300
                  rounded-full
                  focus:bg-white
                "
                placeholder="Search Service name"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <!-- <vs-dropdown v-show="showAction" vs-custom-content vs-trigger-click>
              <button
                class="inline-flex items-center mr-3 K py-1 px-2 cursor-pointer border border-solid rounded border-cloudenly-primary-mid"
              >
                <span class="mr-2">Actions</span>
                <vs-icon icon="arrow_drop_down " class size="25px"></vs-icon>
              </button>

              <vs-dropdown-menu>
                <ul style="min-width: 8rem">
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <feather-icon svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">
                      Price
                      Analytics
                    </span>
                  </li>

                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <feather-icon svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">
                      Create
                      Purchase Requisition
                    </span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>-->

            <!-- <vs-dropdown vs-custom-content vs-trigger-click>
              <button
                class="inline-flex items-center border-0 py-1 mr-2 px-2 cursor-pointer bg-cloudenly-primary-mid text-white rounded"
              >
                <span class="mr-2">Import/Export</span>
                <vs-icon icon="arrow_drop_down " class size="25px"></vs-icon>
              </button>

              <vs-dropdown-menu>
                <ul style="min-width:   10rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeImportCatalogue"
                  >
                    <feather-icon icon="DownloadCloudIcon" svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">Import</span>
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="exportCatalogueModal = true"
                  >
                    <feather-icon icon="UploadCloudIcon" svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">Export</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>-->

            <div class="mr-8">
              <button
                @click.prevent="routeCreateItem"
                class="
                  inline-flex
                  items-center
                  py-2
                  px-4
                  rounded-full
                  bg-cloudenly-primary-main
                  text-white
                "
              >
                <feather-icon
                  icon="PlusIcon"
                  svgClasses="h-6 w-6 mr-1 text-bold"
                ></feather-icon>
                <span class>Create New</span>
              </button>
            </div>

            <button
              @click.prevent="exportCatalogueModal = true"
              class="
                inline-flex
                items-center
                py-5
                px-5
                rounded-full
                bg-gray-100
              "
            >
              <span class="mr-2">Export Catalogue</span>
            </button>

            <!-- <drop-down>
              <div slot="title">
                <button class="inline-flex items-center border py-2 px-3 rounded-full bg-gray-100">
                  <span class="mr-2">Import/Export</span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-6 w-6 "></feather-icon>
                </button>
              </div>
              <div slot="body">
                <div class="rounded-md bg-white shadow-xs text-center py-2">
                  <div
                    class="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      @click.prevent="routeImportCatalogue"
                      href="#"
                      class="block px-4 py-2 text-sm leading-5 text-blue-700 hover:bg-gray-100 hover:text-blue-900 focus:outline-none focus:bg-gray-100 focus:text-blue-900"
                      role="menuitem"
                    >Import Catalogue</a>
                    <a
                      @click.prevent="exportCatalogueModal = true"
                      href="#"
                      class="block px-4 py-2 text-sm leading-5 text-blue-700 hover:bg-gray-100 hover:text-blue-900 focus:outline-none focus:bg-gray-100 focus:text-blue-900"
                      role="menuitem"
                    >Export Catalogue</a>
                  </div>
                </div>
              </div>
            </drop-down> -->

            <!-- <vs-dropdown vs-custom-content vs-trigger-click>
              <button
                class="inline-flex items-center border-0 py-1 mr-2 px-2 cursor-pointer bg-cloudenly-primary-main text-white rounded"
              >
                <span class="mr-2">Create</span>
                <vs-icon icon="arrow_drop_down " class size="25px"></vs-icon>
              </button>

              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeCreateItem"
                  >
                    <feather-icon svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">New Item</span>
                  </li>

                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <feather-icon svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">
                      From Purchase
                      Catalogue
                    </span>
                  </li>

                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <feather-icon svgClasses="w-4 h-4"></feather-icon>
                    <span class="ml-2">
                      From Inventory
                      Catalogue
                    </span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>-->
            <!-- <button
              @click="routeCreateItem"
              class="inline-flex items-center border-0 py-1 px-4 text-xl cursor-pointer bg-cloudenly-primary-main text-white rounded"
            >
              <span class="mr-2">Create</span>
            </button>-->
          </div>
        </div>
      </div>

      <div class="mt-8 px-2">
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
    </div>

    <div
      v-if="getIsAccOwner || getSalesCataloguePrivileges.viewItemRegister"
      class="mt-3"
    >
      <div v-if="getallSaleService.length > 0" class="bg-white">
        <table class="table min-w-full">
          <thead>
            <tr>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                NAME
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                CATEGORY
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                BRAND
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                DESCRIPTION
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                AVAILABILITY
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                LAST UPDATED
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in getallSaleService"
              :key="index"
              class="
                cursor-pointer
                hover:bg-grey-lighter
                border border-solid border-grey-lighter
              "
            >
              <td
                @click="routeViewVariant(item)"
                class="px-6 py-3 whitespace-no-wrap border border-gray-200"
              >
                {{ item.name }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ item.category | formatCat }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ item.brand | formatCat }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ item.description }}
              </td>

              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                <div v-if="item.inventoryQuantity === 0">
                  <span class="text-cloudenly-danger-main"
                    >{{ item.inventoryQuantity }} in
                    {{ item.variantNumber }} variant</span
                  >
                </div>

                <div v-else>
                  <span style="color: #4ecdc4">{{
                    item.inventoryQuantity
                  }}</span>
                  in {{ item.variantNumber }} variant
                </div>
              </td>

              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                {{ item.updatedAt | date }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                  <vs-dropdown-menu>
                    <ul style="min-width: 15rem">
                      <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                        <span >
                          Edit
                          Main Variant
                        </span>
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
                        <span> Add Variant </span>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white" v-else>
        <table class="table min-w-full">
          <thead>
            <tr>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                NAME
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                CATEGORY
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                BRAND
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                DESCRIPTION
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                AVAILABILITY
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                LAST UPDATED
              </th>
              <th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
                ACTIONS
              </th>
            </tr>
          </thead>
        </table>

        <div class="flex items-center justify-center mx-auto py-20">
          <div class="mr-8">
            <img src="../../../assets/images/optimaAsset/product.svg" alt />
          </div>

          <div class="">
            <p class="font-semibold mb-3 text-primary-optima-color">
              There are no purchase catalogue at the moment
            </p>
            <p class="mb-3">
              Create new or import/export with the options below.
            </p>

            <div class="items-center justify-between">
              <button
                @click.prevent="routeCreateItem"
                class="
                  mr-8
                  py-5
                  px-10
                  rounded-full
                  bg-primary-optima-color
                  text-white
                "
                href="#"
              >
                Create New
              </button>

              <button
                class="
                  py-5
                  px-10
                  rounded-full
                  bg-gray-200
                  text-primary-optima-color
                "
                @click.prevent="routeImportCatalogue"
                href="#"
              >
                Import a Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination section -->
      <div
        class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
      >
        <div class="flex items-center">
          <p class="mr-2">Show :</p>
          <select name class="py-1 mr-2" id>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>Per Page</p>
        </div>

        <div class="flex items-center">
          <p class="mr-2">Show</p>
          <select name class="py-1 mr-2" id>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>Per Page</p>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      showAdvance: false,
      isSelected: false,
      search: "",
      items: [],
      allItems: [],
      showAction: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      editMainVariantModal: false,
      mainVariant: "",
      exportCatalogueModal: false,
      updateMainVariantButton: false,
    };
  },

  computed: {
    ...mapGetters("catalogue", [
      "getallBrand",
      "getallItemCategory",
      "getallSaleService",
    ]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getSalesCataloguePrivileges",
    ]),
  },

  methods: {
    exportCatalogue() {
      this.exportCatalogueModal = false;
      this.$store
        .dispatch("catalogue/exportCatalogue")
        .then((resp) => {
          this.exportCatalogueModal = false;
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: err.response.data.message,
          });
        });
    },

    routeImportCatalogue() {
      this.$router.push({ name: "ImportCatalogue" });
    },

    selectAll() {
      this.items = [];
      if (!this.isSelected) {
        this.getallSaleService.map((item) => {
          this.items.push(item);
        });
      }
    },

    routeCreateItem() {
      this.$router.push({
        name: "CreateCatalogue",
        query: {
          module: "sale",
          group: "service",
          type: "new-item",
        },
      });
    },

    routeCreateVariant(val) {
      this.$router.push({
        name: "CreateItemVariant",
        params: {
          id: val,
        },
      });
    },

    routeViewVariant(val) {
      this.$router.push({
        name: "ViewVariant",
        params: {
          id: val.id,
        },
      });
    },

    editMainVaraint(val) {
      console.log(val);
      (this.editMainVariantModal = true),
        (this.mainVariant = {
          id: val.id,
          name: val.name,
          brand: val.brand.name,
          category: val.category,
          description: val.description,
          sku: val.sku,
          currency: val.currency,
        });
    },

    updateMainVariant() {
      let userInfo = this.$store.state.auth.auth.authData;
      let id = this.mainVariant.id;
      let data = {
        id: id,
        userInfo: userInfo,
        payload: this.mainVariant,
      };
      // console.log(data)
      this.$store
        .dispatch("catalogue/updateMainVaraint", data)
        .then((resp) => {
          console.log(resp);
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "primary",
            text: "Item Updated",
          });
          this.editMainVariantModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Item",
            position: "top-right",
            color: "danger",
            text: "Item Error",
          });
        });
    },
  },

  watch: {
    items: function () {
      if (this.items.length === 0) {
        this.showAction = false;
      } else {
        this.showAction = true;
      }
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getAllSalesServices");

    this.$store.dispatch("catalogue/getAllBrand");
    this.$store.dispatch("catalogue/getAllItemCategory");
  },
};
</script>

<style></style>
