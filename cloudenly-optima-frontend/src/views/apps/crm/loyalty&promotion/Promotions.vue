<template>
  <div style="font-size: 14px">
    <!-- delete Promotion -->

    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Promotion"
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
            border-cloudenly-danger-main
            bg-white
          "
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{
              'bg-cloudenly-danger-mid': deleteButton,
              'cursor-not-allowed': deleteButton,
            }"
            @click="deletePromotion(promotion.id)"
            class="
              px-10
              py-3
              mr-5
              bg-cloudenly-danger-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
          >
            Delete
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Delete Promotion Section -->

    <!-- share Promotion -->
    <vs-popup
      button-close-hidden
      :active.sync="shareModal"
      title="share Promotion"
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
              <h1 class="m-0">Info</h1>
              <p>You are about to share this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="shareButton"
            :class="{
              'bg-cloudenly-primary-mid': shareButton,
              'cursor-not-allowed': shareButton,
            }"
            @click="sharePromotion(promotion.id)"
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
            Share
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="shareModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- restart Promotion -->
    <vs-popup
      button-close-hidden
      :active.sync="restartModal"
      title="Restart Promotion"
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
          <s-text
            label="Start Date:"
            type="date"
            class="my-2"
            v-model="restartDetails.startDate"
          />
          <br />
          <s-text
            label="End Date:"
            type="date"
            class="my-2"
            v-model="restartDetails.endDate"
          />
          <div class="flex items-center mx-2 my-4">
            <div class="text-center">
              <feather-icon
                svgClasses="text-cloudenly-primary-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">Info</h1>
              <p>You are about to restart this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="restartButton"
            :class="{
              'bg-cloudenly-primary-mid': shareButton,
              'cursor-not-allowed': shareButton,
            }"
            @click="restartPromotion(promotion.id)"
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
            Restart
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="restartModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- ProcessDraft Modal -->
    <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="share Promotion"
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
              <h1 class="m-0">Info</h1>
              <p>You are about to process this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="processButton"
            :class="{
              'bg-cloudenly-primary-mid': processButton,
              'cursor-not-allowed': processButton,
            }"
            @click="processDraft(promotion.id)"
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
            Process Draft
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="processModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </vs-popup>

    <!-- Suspend Modal -->
    <vs-popup
      button-close-hidden
      :active.sync="suspendModal"
      title="share Promotion"
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
              <h1 class="m-0">Info</h1>
              <p>You are about to suspend this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="suspendButton"
            :class="{
              'bg-cloudenly-primary-mid': suspendButton,
              'cursor-not-allowed': suspendButton,
            }"
            @click="suspendPromotion"
            class="
              px-10
              py-3
              mr-5
              bg-cloudenly-danger-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
          >
            Suspend
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="suspendModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </vs-popup>

    <!-- Resume Modal -->
    <vs-popup
      button-close-hidden
      :active.sync="resumeModal"
      title="share Promotion"
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
              <h1 class="m-0">Info</h1>
              <p>You are about to Reactivated this promotion</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="resumeButton"
            :class="{
              'bg-cloudenly-primary-mid': resumeButton,
              'cursor-not-allowed': resumeButton,
            }"
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
            @click="resumePromotion"
          >
            Resume
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="resumeModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Resume Promotion Section -->

    <!-- View Promo Items -->
    <vs-popup :active.sync="openPromoItemModal" title="View Promo Item">
      <div class>
        <table class="table table-auto table-responsive w-full">
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3 text-center">Name</th>
              <th class="py-3 text-center">Category</th>
              <th class="py-3 text-center">Image</th>
              <th class="py-3 text-center">Audience</th>
              <th class="py-3 text-center">Promo Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(boq, index) in promoBoqDetail" :key="index">
              <td class="py-3 text-center">{{ boq.name }}</td>
              <td class="py-3 text-center">{{ boq.category }}</td>
              <td class="py-3 text-center">{{ boq.image }}</td>
              <td class="py-3 text-center">{{ boq.category }}</td>
              <td class="py-3 text-center">{{ boq.promoDiscount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>
    <!-- End View Promo Item -->

    <h1 class="font-semibold mb-8">Promotions</h1>
    <div
      class="flex items-center justify-between rounded-md bg-white px-8 py-6"
    >
      <div
        class="
          flex
          items-center
          w-full
          mx-8
          border-2 border-l-0 border-t-0 border-b-0
        "
      >
        <div class="mr-10">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              rx="28"
              fill="#507FDF"
              fill-opacity="0.15"
            />
            <path
              d="M28 10.8889L14 17.1111V26.4444C14 35.0778 19.9733 43.1511 28 45.1111C36.0267 43.1511 42 35.0778 42 26.4444V17.1111L28 10.8889Z"
              fill="#1034A6"
            />
          </svg>
        </div>

        <div>
          <p class="font-semibold py-4 text-primary-optima-color text-2xl">
            {{ getPromotionStat.promoCount }}
          </p>
          <p class>Total Promos</p>
        </div>
      </div>

      <div
        class="
          flex
          items-center
          w-full
          mx-8
          border-2 border-l-0 border-t-0 border-b-0
        "
      >
        <div class="mr-10">
          <svg
            width="57"
            height="56"
            viewBox="0 0 57 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.333252"
              width="56"
              height="56"
              rx="28"
              fill="#E3D888"
              fill-opacity="0.15"
            />
            <path
              d="M25.2221 35.7778L18.9999 29.5556L21.1933 27.3622L25.2221 31.3756L35.4733 21.1244L37.6666 23.3333L25.2221 35.7778ZM28.3333 10.8889L14.3333 17.1111V26.4444C14.3333 35.0778 20.3066 43.1511 28.3333 45.1111C36.3599 43.1511 42.3333 35.0778 42.3333 26.4444V17.1111L28.3333 10.8889Z"
              fill="#E3D888"
            />
          </svg>
        </div>

        <div>
          <p class="font-bold py-4 text-cloudenly-warning-mid text-2xl">
            {{ getPromotionStat.activePromos }}
          </p>
          <p class>Active Promos</p>
        </div>
      </div>

      <div class="flex items-center w-full mx-5 border-none">
        <div class="mr-10">
          <svg
            width="57"
            height="56"
            viewBox="0 0 57 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.666748"
              width="56"
              height="56"
              rx="28"
              fill="#9BA0A7"
              fill-opacity="0.15"
            />
            <path
              d="M39.4667 38.566L42.5913 41.751L40.5083 43.8491L37.3535 40.6944L34.1535 43.8944L32.0252 41.751L35.2101 38.566L32.0252 35.3359L34.1083 33.2377L37.3083 36.4377L40.5083 33.2377L42.6667 35.3962L39.4667 38.566ZM28.2517 11.3962L41.8366 17.434V26.4906C41.8366 27.8491 41.6856 29.1774 41.3988 30.4906C40.1353 29.8359 38.7313 29.4992 37.3083 29.5094C34.9063 29.5094 32.6027 30.4636 30.9043 32.1621C29.2058 33.8605 28.2517 36.1641 28.2517 38.566C28.2517 40.6189 28.9309 42.5208 30.0932 44.0302L28.2517 44.6038C20.463 42.7019 14.6667 34.8679 14.6667 26.4906V17.434L28.2517 11.3962Z"
              fill="#5E646D"
            />
          </svg>
        </div>

        <div>
          <p class="font-semibold py-4 text-xl">
            ₦ {{ getPromotionStat.totalAmount }}
          </p>
          <p class>Total Transaction volume</p>
        </div>
      </div>
    </div>
    <div class="bg-white my-8 px-5 py-8">
      <div class="flex justify-between">
        <div class="w-5/12">
          <s-combo-box v-model="search" :value="search" />
        </div>
        <div class="flex">
          <div>
            <button
              class="
                bg-grey-lighter
                flex
                items-center
                mr-4
                text-primary-optima-color
                py-4
                px-8
              "
              style="border-radius: 50px"
            >
              Import/Export
              <svg
                class="ml-2"
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
            </button>
          </div>
          <div>
            <button
              class="
                bg-primary-optima-color
                flex
                items-center
                text-white
                py-4
                px-8
              "
              style="border-radius: 50px"
              @click="routeCreatePromotion"
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white py-8">
      <div class="flex justify-between">
        <label class="flex items-center ml-4">
          <s-text
            type="date"
            class="ml-5"
            v-model="searchParameter.startDate"
          />
          <s-text type="date" class="ml-5" v-model="searchParameter.endDate" />
        </label>
        <div>
          <div class="flex">
            <div>
              <svg
                class="mx-2"
                width="26"
                height="19"
                viewBox="0 0 26 19"
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
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 4.84297L15.6 10.9548V17.5L20.4 15.781V10.9548L26 4.84297V3.02796C26 2.18409 25.2837 1.5 24.4 1.5H11.6C10.7163 1.5 10 2.18409 10 3.02796V4.84297ZM24.4011 3.02803V3.79205H11.6011V3.02803H24.4011ZM12.5642 5.32001H23.4381L19.2382 9.90372H16.764L12.5642 5.32001ZM17.2011 11.4317V15.2952L18.8011 14.7223V11.4317H17.2011Z"
                  fill="#070707"
                />
              </svg>
            </div>
            <div>
              <svg
                class="mr-1"
                width="35"
                height="25"
                viewBox="0 0 35 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.25"
                  y1="21.75"
                  x2="0.25"
                  y2="3.25"
                  stroke="#9BA0A7"
                  stroke-width="0.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14.0647 2.5H28.0647C28.5951 2.5 29.1038 2.71071 29.4789 3.08579C29.854 3.46086 30.0647 3.96957 30.0647 4.5V11.58C28.5601 11.3272 27.0157 11.6561 25.7447 12.5H22.0647V16.5H23.1447C23.0347 17.18 23.0347 17.85 23.1447 18.5H14.0647C13.5343 18.5 13.0256 18.2893 12.6505 17.9142C12.2754 17.5391 12.0647 17.0304 12.0647 16.5V4.5C12.0647 3.4 12.9647 2.5 14.0647 2.5ZM14.0647 6.5V10.5H20.0647V6.5H14.0647ZM22.0647 6.5V10.5H28.0647V6.5H22.0647ZM14.0647 12.5V16.5H20.0647V12.5H14.0647ZM33.8447 18.82L32.7747 18C32.7947 17.83 32.8147 17.67 32.8147 17.5C32.8147 17.33 32.8047 17.17 32.7747 17L33.8347 16.18C33.8796 16.1415 33.9101 16.0887 33.921 16.0306C33.9319 15.9724 33.9226 15.9122 33.8947 15.86L32.8947 14.13C32.8347 14 32.7047 14 32.5647 14L31.3447 14.5C31.0647 14.32 30.8047 14.15 30.4947 14.03L30.3047 12.71C30.2947 12.59 30.1847 12.5 30.0647 12.5H28.0647C27.9447 12.5 27.8347 12.59 27.8147 12.71L27.6247 14.03C27.3247 14.16 27.0347 14.32 26.7747 14.5L25.5347 14C25.4247 14 25.2947 14 25.2247 14.13L24.2247 15.86C24.1647 15.97 24.1847 16.1 24.2847 16.18L25.3447 17C25.3048 17.3321 25.3048 17.6679 25.3447 18L24.2847 18.82C24.2398 18.8585 24.2093 18.9113 24.1984 18.9694C24.1875 19.0276 24.1968 19.0878 24.2247 19.14L25.2247 20.87C25.2847 21 25.4147 21 25.5347 21L26.7747 20.5C27.0347 20.68 27.3147 20.85 27.6247 20.97L27.8147 22.29C27.8347 22.41 27.9347 22.5 28.0647 22.5H30.0647C30.1847 22.5 30.2947 22.41 30.3147 22.29L30.5047 20.97C30.8047 20.84 31.0647 20.68 31.3447 20.5L32.5647 21C32.7047 21 32.8347 21 32.9047 20.87L33.9047 19.14C33.9326 19.0878 33.9419 19.0276 33.931 18.9694C33.9201 18.9113 33.8896 18.8585 33.8447 18.82ZM29.0647 19C28.2347 19 27.5647 18.33 27.5647 17.5C27.5647 16.67 28.2447 16 29.0647 16C29.8847 16 30.5647 16.67 30.5647 17.5C30.5647 18.33 29.9047 19 29.0647 19Z"
                  fill="#14171F"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getIsAccOwner || getPromotionPrivileges.viewRegister">
      <div class="mt-5">
        <div class="bg-white">
          <table v-if="searchPromotion.length > 0" class="table min-w-full">
            <thead class="bg-gray-300">
              <tr class>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Promo Name
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Promo Code
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Target Outlet(s)
                </th>
                <!-- <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Target Group
                </th> -->
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Promo Rate
                </th>
                <!-- <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Promo Qty
                </th> -->
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-3 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="font-normal"
                v-for="(promotion, index) in searchPromotion"
                :key="index"
                @click="searchPromotion()"
              >
                <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ promotion.name }}
                </td>
                <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ promotion.promoCode }}
                </td>
                <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ promotion.contactCategories }}
                </td>
                <!-- <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  Buddy Customer
                </td> -->
                <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ promotion.discount }}
                </td>
                <!-- <td
                  class="px-6 py-3 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ promotion.PromoBOQs.promoQuantity }}
                </td> -->

                <td
                  class="px-6 py-6 whitespace-no-wrap border-b border-gray-200"
                >
                  <span
                    class="
                      text-cloudenly-success-main
                      bg-cloudenly-success-off
                      py-4
                      px-6
                      rounded-md
                    "
                    v-if="promotion.status === 'draft'"
                    >Draft</span
                  >

                  <span
                    class="
                      text-cloudenly-success-main
                      bg-cloudenly-success-off
                      px-6
                      py-4
                      rounded-md
                    "
                    v-else-if="promotion.status === 'started'"
                    >Active</span
                  >

                  <span
                    class="
                      text-cloudenly-danger-main
                      bg-cloudenly-danger-off
                      px-4
                      py-4
                      rounded-md
                    "
                    v-else-if="promotion.status === 'suspended'"
                    >Inactive</span
                  >
                  <span
                    class="
                      text-cloudenly-danger-main
                      bg-cloudenly-danger-off
                      px-6
                      py-4
                      rounded-md
                    "
                    v-else-if="promotion.status === 'ended'"
                    >Ended</span
                  >

                  <span
                    class="
                      text-cloudenly-warning-main
                      bg-cloudenly-warning-off
                      px-4
                      py-4
                      rounded-md
                    "
                    v-else-if="promotion.status === 'upcoming'"
                    >Pending</span
                  >
                </td>

                <td
                  class="px-6 py-6 whitespace-no-wrap border-b border-gray-200"
                >
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="MoreHorizontalIcon"
                      ></feather-icon>
                    </div>

                    <vs-dropdown-menu
                      v-if="
                        isDraft === true &&
                          promotion.status  === 'draft'
                      "
                    >
                      <ul style="min-width: 15rem">
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openEditDrawer(promotion)"
                        >
                          <span class="">Edit</span>
                        </li>
                        <li
                          v-if="
                            getIsAccOwner ||
                            getPromotionPrivileges.deletePromotion
                          "
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Delete</span>
                        </li>
                        <li
                          v-if="
                            getIsAccOwner ||
                            getPromotionPrivileges.deletePromotion
                          "
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openProcessDrawer(promotion)"
                        >
                          <span class="">Process Draft</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>

                    <vs-dropdown-menu
                      v-else-if="promotion.status === 'started'"
                    >
                      <ul style="min-width: 15rem">
                        <li
                          @click="openShareModal(promotion)"
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                        >
                          <span class="">Share</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openViewDrawer(promotion)"
                        >
                          <span class="">View</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openSuspendDrawer(promotion)"
                        >
                          <span class="">On hold</span>
                        </li>
                        <!-- <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openEditDrawer(promotion)"
                        >
                          <span class="">Edit</span>
                        </li> -->
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click="routePromoAnalytics()"
                        >
                          Analytics
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click="openDeleteModal(promotion)"
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Cancel</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                        >
                          <span class="">History</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                    <vs-dropdown-menu
                      v-else-if="promotion.status  === 'upcoming'"
                    >
                       <ul style="min-width: 15rem">
                        <!--<li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openViewDrawer(promotion)"
                        >
                          <span class="">View</span>
                        </li> -->

                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openEditDrawer(promotion)"
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
                          @click="openDeleteModal(promotion)"
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Cancel</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>

                    <vs-dropdown-menu v-else-if="promotion.status === 'ended'">
                      <ul style="min-width: 15rem">
                        <li
                          v-if="
                            getIsAccOwner ||
                            getPromotionPrivileges.deletePromotion
                          "
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="openRestartDrawer(promotion)"
                        >
                          <span class="">Restart</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Cancel</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                    <vs-dropdown-menu
                      v-else-if="promotion.status  === 'suspended'"
                    >
                      <ul style="min-width: 15rem">
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click="openResumeModal(promotion)"
                          @click.prevent="toggleResume(promotion)"
                        >
                          <span class="">Reume</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Cancel</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>

                    <vs-dropdown-menu v-else>
                      <ul style="min-width: 15rem">
                        <li
                          v-if="
                            getIsAccOwner ||
                            getPromotionPrivileges.deletePromotion
                          "
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="toggleDelete(promotion)"
                        >
                          <span class="">Cancel</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else class="bg-white mx-auto mt-5">
            <s-table :headers="headers" :items="[]" :emptyStateImg="img">
              <div slot="title">
                <p class="text-xl font-semibold text-cloudenly-primary-main">
                  There are no promotion at the moment
                </p>
              </div>
              <div slot="body">
                <p class="text-md leading-normal">
                  When a customer initiates an action or submits a form/
                  document, they show up here
                </p>
              </div>
              <div slot="body" class="flex items-center justify-start">
                <p
                  @click="routeCreatePromotion()"
                  class="
                    bg-cloudenly-primary-main
                    px-8
                    py-4
                    mt-6
                    text-white text-center
                    cursor-pointer
                    rounded-full
                  "
                >
                  Create New
                </p>
              </div>
            </s-table>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>

    <div class="mt-6">
      <s-pagination @pagination="pagination($event)" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import CreatePromotion from "./createPromotion";
import Drawer from "../../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import STable from "@/components/scellooComponents/v1/sTable.vue";
import emptyTableIcon from "@/assets/images/optimaAsset/promotionEmptyState.svg";
export default {
  components: {
    CreatePromotion,
    Drawer,
    Datepicker,
    STable,
    emptyTableIcon,
  },
  data() {
    return {
      img: emptyTableIcon,
      promoDetails: {
        name: "",
        description: "",
        discount: "",
        loyaltyIds: [],
        outletsIds: [],
        contactCategories: [],
        promoCode: "",
        promoBoqs: [],
        status: "inactive",
        isDraft: false,
        startDate: moment().format("YYYY-MM-DD"),
        endDate: "",
      },
      restartDetails: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: "",
      },
      headers: [],
      selectedItems: [],
      openPromotionModal: false,
      openDrawer: false,
      search: "",
      singlePromotion: [],
      openPromoItemModal: false,
      promoBoqDetail: [],
      promotions: [],
      promotion: {},
      promoId: "",
      deleteModal: false,
      deleteButton: false,
      suspendButton: false,
      restartButton: false,
      resumeButton: false,
      shareButton: false,
      processButton: false,
      suspendModal: false,
      restartModal: false,
      resumeModal: false,
      shareModal: false,
      processModal: false,
      shareData: "",
      promotionDetails: "",
      searchParameter: { startDate: "", endDate: "" },
    };
  },
  computed: {
    ...mapGetters("crm/promotions", ["getPromotions", "getisPromotionSetup"]),
    ...mapGetters("crm/promotions", ["getPromotionStat", "getPromotionStat"]),
    ...mapGetters("crm/loyalty", ["allLoyalty", "getisLoyaltySetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getPromotionPrivileges"]),
    promotionList() {
      return this.getPromotions.map((item) => ({
        name: item.name,
        description: item.description,
        discount: item.discount,
        loyaltyIds: item.loyaltyIds,
        outletIds: item.outletIds,
        promoCode: item.promoCode,
        startDate: item.startDate,
        endDate: item.endDate,
        promoBoqs: item.promoBoqs,
        status: item.status,
        promoStatus: item.promoStatus,
        id: item.id,
      }));
    },
    searchPromotion() {
      return this.promotionList.filter((promotion) => {
        return promotion.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    routeCreatePromotion() {
      this.$router.push({ name: "CreatePromotion" });
    },
    routePromoAnalytics() {
      this.$router.push({ name: "PromoAnalytics" });
    },
    toggleResume(val) {
      this.promoId = val.id;
      this.resumeModal = true;
    },
    close() {
      this.openPromotionModal = false;
    },
    openEditDrawer(val) {
      this.$router.push({
        name: "EditPromotion",
        params: { id: val.id },
      });
    },
    openViewDrawer(val) {
      this.$router.push({
        name: "ViewPromotion",
        params: { id: val.id },
      });
    },
    openViewPromoBoq(val) {
      (this.openPromoItemModal = true), (this.promoBoqDetail = val);
    },
    openShareModal(val) {
      this.sharedData = val;
      this.sharedData.id = val.id;
      console.log(val.id);
      console.log(this.sharedData);
      this.shareModal = true;
    },
    closeDrawer() {
      this.openDrawer = false;
    },
    deleteItem(val) {
      this.singlePromotion.promoBoqs.splice(val, 1);
    },
    toggleDelete(val) {
      this.promoId = val.id;
      console.log(val.id);
      this.deleteModal = true;
    },
    openSuspendDrawer(val) {
      this.promoId = val.id;
      console.log(val.id);
      this.suspendModal = true;
    },
    openRestartDrawer(val) {
      this.promoId = val.id;
      console.log(val.id);
      this.restartModal = true;
    },
    openProcessDrawer(val) {
      this.promoId = val.id;
      console.log(val.id);
      this.processModal = true;
    },
    deletePromotion() {
      const data = {
        id: this.promoId,
      };
      this.$store
        .dispatch("crm/promotions/deletePromotion", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Promotion",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    openDeactivateModal(val) {
      this.promotionDetails = val;
      console.log(this.promotionDetails);
      this.deactivateModal = true;
    },
    openResumeModal(val) {
      this.promoId = val.id;
      this.ResumeModal = true;
    },
    restartPromotion() {
      this.restartButton = true;
      let payload = {
        promoId: this.promoId,
        startDate: this.restartDetails.startDate,
        endDate: this.restartDetails.endDate,
      };
      this.$store
        .dispatch("crm/promotions/restartPromotion", payload)
        .then((resp) => {
          this.restartButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.restartButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response,
            color: "danger",
            position: "top-right",
          });
        });
    },
    resumePromotion() {
      this.resumeButton = true;
      const data = {
        id: this.promoId,
      };
      this.$store
        .dispatch("crm/promotions/resumePromotion", data)
        .then((resp) => {
          this.resumeButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: resp.response.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.resumeButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    suspendPromotion() {
      this.suspendButton = true;
      const data = {
        id: this.promoId,
      };
      this.$store
        .dispatch("crm/promotions/suspendPromotion", data)
        .then((resp) => {
          this.suspendButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.suspendButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    processDraft() {
      this.processButton = true;
      const data = {
        id: this.promoId,
      };
      this.$store
        .dispatch("crm/promotions/processPromotion", data)
        .then((resp) => {
          this.suspendButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.processButton = false;
          this.$vs.notify({
            title: "Promotion",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    sharePromotion() {
      this.shareButton = true;
      let data = {
        promoId: this.sharedData.id,
        contactCategory: this.sharedData.contactCategories,
        loyaltyId: this.sharedData.loyaltyIds,
      };
      this.$store
        .dispatch("crm/promotions/sharePromotion", data)
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          this.shareButton = false;
          this.shareModal = false;
          this.$vs.notify({
            title: "Promotion",
            text:
              'Promotion "' +
              this.shareData.name +
              '" has been shared successfully',
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.shareButton = false;
          this.$vs.notify({
            title: "Promotion Shared",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
  async pagination(data) {
    await this.$store.dispatch("crm/promotions/getPromotion", data);
  },
  mounted() {
    this.$store.dispatch("crm/promotions/getPromotion");
    this.$store.dispatch("crm/promotions/getPromotionStat");
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 3px;
  height: 32px;
  &--search {
    background: #eee;
    border-radius: 50px;
    width: 380px;
    height: 36px;
    &::placeholder {
      color: #070707;
    }
  }
}
.button {
  border-radius: 50px;
  &--main {
    background: #1034a6;
  }
  &--alt {
    background: #f3f6f9;
    color: #1034a6;
  }
}
</style>