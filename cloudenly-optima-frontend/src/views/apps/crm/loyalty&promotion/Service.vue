<template>
  <div>
    <div class="bg-white py-8">
      <div class=" flex justify-between">
        <label class="flex items-center ml-4">
          <s-combo-box />
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

      <div class="bg-white mx-auto mt-5">
        <div v-if="promoBoqs.length > 0" class>
          <table
            class="table table-auto table-responsive border-collapse w-full"
          >
            <thead class="bg-gray-300">
              <tr class>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  Name
                </th>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  code
                </th>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  Description
                </th>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  Supplier
                </th>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  Regular Price/unit
                </th>
                <th class="py-3 px-6 tracking-wider font-semibold">
                  Promo Price
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="item in promoBoqs" :key="item">
              <td class="py-4 px-4">{{ item.name }}</td>
              <td>{{ item.itemCode }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.supplier }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.promoPrice }}</td>

              <td>
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>

                  <vs-dropdown-menu>
                    <ul style="min-width: 15rem">
                      <li
                        @click="routeCreatePromotion()"
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
                      <li
                        class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                      >
                        Share
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
                        Delete
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </td>
            </tbody>
          </table>
        </div>
        <div v-else class="bg-white mx-auto mt-5">
          <s-table :headers="headers" :items="[]" :emptyStateImg="img">
            <div slot="title"></div>
            <div slot="body">
              <p class="text-md leading-normal">
                You do not have any product or service items in your catalogue
              </p>
            </div>
            <div slot="body" class="flex items-center justify-start">
              <div class="flex">
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
                  Add an Item
                </p>
                <p
                  @click="routeCreatePromotion()"
                  class="
                       bg-cloudenly-primary-off
                    px-8
                    py-4
                    mt-6
                    mx-6
                    text-cloudenly-primary-main text-center
                    cursor-pointer
                    rounded-full
                  "
                >
                  Import
                </p>
              </div>
            </div>
          </s-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    promoBoqs: {
      type: Array
    }
  },
  methods: {
    routeCreatePromotion() {
      this.$router.push({ name: "CreatePromotion" });
    }
  }
};
</script>
