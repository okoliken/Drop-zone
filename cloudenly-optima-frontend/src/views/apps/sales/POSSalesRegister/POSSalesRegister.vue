<template>
  <div>
    <back location="POS Sales" />

    <div class="mt-8" v-if="allPos.length > 0">
      <posAnalysis />
      <div class="bg-white flex justify-between items-center px-4 py-8 mt-8">
        <div>
          <s-combo-box />
        </div>
        <div>
          <s-button
            @click="$router.push({ name: 'createNewSale' })"
            class="
              bg-cloudenly-primary-main
              px-8
              py-4
              text-white
              border-none
              cursor-pointer
              rounded-full
            "
          >
            Create New
          </s-button>
        </div>
      </div>

      <s-modal class="h-auto" :modal="tableModal">
        <!-- <VuePerfectScrollbar class="scroll-area" v-once :settings="settings"> -->
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
              <p>Reference No.</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Date</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Customer</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Type</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Sales Total (NGN)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Tax (NGN)</p>
            </div>
            <div>
              <img :src="Seen" alt="Seen" />
            </div>
          </div>
          <div class="flex justify-between items-center px-4 py-5">
            <div class="flex items-center space-x-4">
              <p><img :src="HamburgerMenu" alt="HamburgerMenu" /></p>
              <p>Transaction Status</p>
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
              <p>Payment Status</p>
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
        <!-- </VuePerfectScrollbar> -->
      </s-modal>

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

            <div @click="sortTableModal()" class="ml-5 mr-5 cursor-pointer">
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

            <div @click="sortTableModal()" class="ml-3 cursor-pointer">
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

      <!-- Table -->
      <div class="bg-white mt-3 mb-5">
        <div>
          <table class="table min-w-full">
            <thead class="bg-gray-300 shadow-md">
              <tr class="border-gray-400">
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Reference No.
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Customer
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Type
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Sales Total (NGN)
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Tax (NGN)
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Transaction Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="pos in allPos"
                :key="pos"
                class="
                  hover:bg-grey-lightest
                  border-1 border-gray-400
                  font-normal
                "
              >
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ pos.reference }}
                </td>
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ pos.salesDate | date }}
                </td>

                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ pos.customerName }}
                </td>
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ pos.salesType }}
                </td>
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  252-45
                </td>
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                  "
                >
                  {{ pos.amount | formatCurrency }}
                </td>
                <td
                  class="
                    px-6
                    py-8
                    border-1 border-gray-400
                    whitespace-no-wrap
                    border
                    text-center
                  "
                >
                  <span
                    v-if="pos.salesStatus === 'completed'"
                    class="bg-green-100 px-3 rounded-md py-1 text-green-400"
                    >Completed</span
                  >

                  <span
                    class="
                      text-cloudenly-danger-main
                      bg-cloudenly-danger-off
                      px-3
                      py-1
                      rounded-md
                    "
                    v-else
                    >On hold</span
                  >
                </td>
                <td
                  class="px-6 py-6 whitespace-no-wrap border-b border-gray-400"
                >
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
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="viewPos(pos)"
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
                          @click.prevent="viewPos(pos)"
                        >
                          <span class="">Void</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="viewPos(pos)"
                        >
                          <span class="">Reprint</span>
                        </li>
                        <li
                          class="
                            flex
                            py-2
                            px-4
                            cursor-pointer
                            hover:bg-primary hover:text-white
                          "
                          @click.prevent="viewPos(pos)"
                        >
                          <span class="">Process return</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
        <!-- End Table  -->
        <s-pagination />
      </div>

    </div>

    <div v-else class="mt-8" >
      <emptyState />
    </div>
  </div>
</template>

<script>
import posAnalysis from "./posAnalysis.vue";
import emptyState from "./emptyState.vue";
import HamburgerMenu from "@/assets/images/optimaAsset/hamburger_menu-2.svg";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Seen from "@/assets/images/optimaAsset/seen.svg";
import { mapGetters } from "vuex";

export default {
  components: {
    VuePerfectScrollbar,
    posAnalysis,
    emptyState,
  },
  name: "POSSalesRegister",
  data() {
    return {
      HamburgerMenu,
      Seen,
      settings: {
        maxScrollbarLength: 60,
      },
      tableModal: false,
    };
  },
  methods: {
    sortTableModal() {
      this.tableModal = true;
    },
    viewPos(val) {
      this.$router.push({
        name: "viewSalesRegister",
        params: { id: val.id },
      });
    },
  },
  computed: {
    ...mapGetters("sales/Pos", ["allPos"]),
  },
  mounted() {
    this.$store.dispatch("sales/Pos/getAllPos");
  },
};
</script>

<style lang="scss" scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 600px;
}
</style>
