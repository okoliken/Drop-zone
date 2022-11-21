<template>
  <nav
    class="navbar flex items-center h-full px-8 font-normal"
    style="font-size: 14px"
  >
    <div class="flex items-center w-4/12">
      <div>
        <img :src="image_hamburger_menu" alt="humburger-menu" />
      </div>
      <div class="font-bold ml-8" style="font-size: 16px">Optima</div>
    </div>

    <div class="w-4/12 flex justify-center">
      <top-search style="font-size: 14px" />
    </div>

    <div class="flex items-center justify-end w-4/12">
      <div
        class="px-6 flex items-center rounded-full mr-6"
        style="background: #eee; height: 32px"
      >
        {{ getOrgData.name }}
      </div>

      <!-- <button
        class="navbar__link flex items-center justify-center mr-6 rounded-full"
        @click.prevent="routeMessaging"
      >
        <feedback class="fill-current" />
      </button> -->

      <button
        class="navbar__link flex items-center justify-center mr-6 rounded-full"
      >
        <notifications class="fill-current" />
      </button>

      <!-- setting section -->
      <div>
        <drop-down>
          <div slot="title">
            <button
              class="
                navbar__link
                flex
                items-center
                justify-center
                mr-6
                rounded-full
              "
            >
              <settings class="fill-current" />
            </button>
          </div>

          <div class="mt-5" slot="body">
            <div class="bg-white rounded-lg shadow-lg" style="min-width: 23rem">
              <div class="flex justify-center pt-3">
                <button
                  @click="$router.push({ name: 'settingsHome' })"
                  class="
                    py-5
                    px-20
                    text-primary-optima-color
                    w-ful
                    rounded-full
                    bg-gray-200
                  "
                >
                  All Settings
                </button>
              </div>

              <div class="px-4 mt-8">
                <hr class="bg-gray-500" />
                <p class="mt-8 text-md text-gray-400">Recent Activity</p>
                <ul class="mt-3 pb-5">
                  <li
                    @click="$router.push({ name: 'accountProfile' })"
                    class="flex items-center cursor-pointer py-5"
                  >
                    <span class="mr-3">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="14" fill="#F3F6F9" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.82366 20.5455C8.33594 20.202 7.88388 19.8114 7.47412 19.3801C7.71899 17.3095 10.1996 16.4546 13.9996 16.4546C17.7996 16.4546 20.2802 17.3095 20.5251 19.3801C20.1153 19.8114 19.6633 20.202 19.1756 20.5455H18.9087V19.7273C18.9087 18.7472 17.1544 18.091 13.9996 18.091C10.8449 18.091 9.09052 18.7472 9.09052 19.7273V20.5455H8.82366Z"
                          fill="#2D9CDB"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5 14C5 18.9706 9.02944 23 14 23C18.9706 23 23 18.9706 23 14C23 9.02944 18.9706 5 14 5C9.02944 5 5 9.02944 5 14ZM21.3631 14.0001C21.3631 18.0669 18.0663 21.3637 13.9995 21.3637C9.93265 21.3637 6.63584 18.0669 6.63584 14.0001C6.63584 9.93324 9.93265 6.63642 13.9995 6.63642C18.0663 6.63642 21.3631 9.93324 21.3631 14.0001ZM10.7271 12.3636C10.7271 10.5274 12.0191 9.09091 13.9999 9.09091C15.9751 9.09091 17.2726 10.6631 17.2726 12.5273C17.2726 15.2106 15.8147 16.4545 13.9999 16.4545C12.1679 16.4545 10.7271 15.1678 10.7271 12.3636ZM14.0005 14.8182C13.0336 14.8182 12.3642 14.2204 12.3642 12.3637C12.3642 11.3948 12.9645 10.7273 14.0005 10.7273C14.9952 10.7273 15.6369 11.505 15.6369 12.5273C15.6369 14.2442 14.9641 14.8182 14.0005 14.8182Z"
                          fill="#2F80ED"
                        />
                      </svg>
                    </span>
                    <span class="">Account Profile</span>
                  </li>

                  <li
                    @click="$router.push({ name: 'securityPolicy' })"
                    class="flex items-center cursor-pointer py-5"
                  >
                    <span class="mr-3">
                      <svg
                        width="30"
                        height="29"
                        viewBox="0 0 30 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="29.179"
                          height="28.54"
                          rx="14.27"
                          fill="#F3F6F9"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7 16.7982C7 19.0402 9.52818 21.2875 14.5845 23.54C19.6409 21.2927 22.1691 19.0455 22.1691 16.7982C22.1691 16.4781 22.1705 15.7954 22.1723 14.9503L22.1723 14.9405L22.1723 14.9397C22.1775 12.4473 22.1857 8.55398 22.1691 8.37091C22.1691 7.72404 21.9208 7.5737 21.2337 7.15763C21.0257 7.03165 20.7774 6.88131 20.4836 6.68545C19.2195 5.84273 17.1087 5 14.5845 5C11.6883 5 8.8218 6.59456 8.68545 6.68545C8.39167 6.88131 8.14341 7.03165 7.93537 7.15762L7.93537 7.15763C7.24827 7.5737 7 7.72404 7 8.37091V16.7982ZM20.4851 15.7487C20.4841 16.2789 20.4836 16.6041 20.4836 16.7982C20.4836 18.0742 18.6061 19.8098 14.5853 21.6877C10.5639 19.8056 8.6854 18.0694 8.6854 16.7982V8.67708L8.7931 8.61024L8.79312 8.61023C9.06563 8.44117 9.4208 8.22083 9.62032 8.08782C10.395 7.57138 12.7626 6.68544 14.5845 6.68544C16.4892 6.68544 18.3046 7.25842 19.5487 8.08782C19.7482 8.22083 20.1033 8.44117 20.3759 8.61022L20.3759 8.61024L20.4917 8.6821C20.4935 9.18144 20.4943 10.796 20.4912 12.677L20.4885 14.1026L20.4851 15.7487ZM12.0563 11.7419H17.1126C18.0435 11.7419 18.7981 12.4965 18.7981 13.4273V16.7982C18.7981 17.7291 18.0435 18.4837 17.1126 18.4837H12.0563C11.1254 18.4837 10.3708 17.7291 10.3708 16.7982V13.4273C10.3708 12.4965 11.1254 11.7419 12.0563 11.7419ZM12.0565 16.7982V13.4273H17.1128V16.7982H12.0565Z"
                          fill="#2F80ED"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.9789 11.8044H12.7576V10.5482C12.7576 9.50757 13.5778 8.66394 14.5895 8.66394C15.6013 8.66394 16.4215 9.50757 16.4215 10.5482V11.8044H15.2002V10.5482C15.2002 10.2013 14.9268 9.92013 14.5895 9.92013C14.2523 9.92013 13.9789 10.2013 13.9789 10.5482V11.8044Z"
                          fill="#F2994A"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.5845 15.9555C14.1191 15.9555 13.7418 15.5782 13.7418 15.1127C13.7418 14.6473 14.1191 14.27 14.5845 14.27C15.0499 14.27 15.4272 14.6473 15.4272 15.1127C15.4272 15.5782 15.0499 15.9555 14.5845 15.9555Z"
                          fill="#F2994A"
                        />
                      </svg>
                    </span>
                    <span class="">Security Policy</span>
                  </li>

                  <li
                    @click="$router.push({ name: 'usersAndGroups' })"
                    class="flex items-center cursor-pointer py-5"
                  >
                    <span class="mr-3">
                      <svg
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.540039"
                          width="28"
                          height="28"
                          rx="14"
                          fill="#F3F6F9"
                        />
                        <path
                          d="M23 23.54H21.7143V20.3257C21.7133 19.4735 21.3743 18.6565 20.7717 18.054C20.1691 17.4514 19.3522 17.1124 18.5 17.1114V15.8257C19.6931 15.827 20.8369 16.3016 21.6805 17.1452C22.5241 17.9888 22.9986 19.1326 23 20.3257V23.54Z"
                          fill="#4ECDC4"
                        />
                        <path
                          d="M17.8571 23.54H16.5714V20.3257C16.5704 19.4735 16.2314 18.6565 15.6289 18.054C15.0263 17.4514 14.2093 17.1124 13.3571 17.1114H9.5C8.64783 17.1124 7.83086 17.4514 7.22828 18.054C6.62571 18.6565 6.28674 19.4735 6.28571 20.3257V23.54H5V20.3257C5.00136 19.1326 5.4759 17.9888 6.31952 17.1452C7.16314 16.3016 8.30694 15.827 9.5 15.8257H13.3571C14.5502 15.827 15.694 16.3016 16.5376 17.1452C17.3812 17.9888 17.8558 19.1326 17.8571 20.3257V23.54Z"
                          fill="#333333"
                        />
                        <path
                          d="M16.5714 5.54004V6.82575C17.4239 6.82575 18.2415 7.1644 18.8443 7.7672C19.4471 8.36999 19.7857 9.18756 19.7857 10.04C19.7857 10.8925 19.4471 11.7101 18.8443 12.3129C18.2415 12.9157 17.4239 13.2543 16.5714 13.2543V14.54C17.7649 14.54 18.9095 14.0659 19.7534 13.222C20.5973 12.3781 21.0714 11.2335 21.0714 10.04C21.0714 8.84656 20.5973 7.70197 19.7534 6.85806C18.9095 6.01414 17.7649 5.54004 16.5714 5.54004Z"
                          fill="#4ECDC4"
                        />
                        <path
                          d="M11.4286 6.82575C12.0643 6.82575 12.6858 7.01427 13.2144 7.36746C13.7429 7.72065 14.1549 8.22265 14.3982 8.80998C14.6415 9.39732 14.7051 10.0436 14.5811 10.6671C14.4571 11.2906 14.151 11.8634 13.7014 12.3129C13.2519 12.7624 12.6792 13.0685 12.0557 13.1926C11.4322 13.3166 10.7859 13.2529 10.1985 13.0097C9.6112 12.7664 9.1092 12.3544 8.75601 11.8258C8.40282 11.2972 8.21431 10.6758 8.21431 10.04C8.21431 9.18756 8.55295 8.36999 9.15575 7.7672C9.75854 7.1644 10.5761 6.82575 11.4286 6.82575ZM11.4286 5.54004C10.5386 5.54004 9.66855 5.80396 8.92853 6.29843C8.1885 6.79289 7.61173 7.4957 7.27113 8.31796C6.93054 9.14023 6.84142 10.045 7.01506 10.9179C7.18869 11.7909 7.61727 12.5927 8.24661 13.222C8.87595 13.8514 9.67777 14.2799 10.5507 14.4536C11.4236 14.6272 12.3284 14.5381 13.1507 14.1975C13.9729 13.8569 14.6757 13.2801 15.1702 12.5401C15.6647 11.8001 15.9286 10.9301 15.9286 10.04C15.9286 8.84656 15.4545 7.70197 14.6106 6.85806C13.7667 6.01414 12.6221 5.54004 11.4286 5.54004Z"
                          fill="#333333"
                        />
                      </svg>
                    </span>
                    <span class="">Users & Groups</span>
                  </li>

                  <li
                    @click="$router.push({ name: 'locationsAndTaxes' })"
                    class="flex items-center cursor-pointer py-5"
                  >
                    <span class="mr-3">
                      <svg
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.540039"
                          width="28"
                          height="28"
                          rx="14"
                          fill="#F3F6F9"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.6 23.54L14.0781 20.0824H21.2C22.1941 20.0824 23 19.2685 23 18.2646V7.35783C23 6.35389 22.1941 5.54004 21.2 5.54004H6.8C5.80589 5.54004 5 6.35389 5 7.35783V18.2646C5 19.2685 5.80589 20.0824 6.8 20.0824H8.6V23.54ZM13.5618 18.2646L10.3999 20.2603V18.2646H6.79992V7.35782H21.1999V18.2646H13.5618Z"
                          fill="#111519"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.5 15.5378V13.72H15.8V15.5378H9.5Z"
                          fill="#4ECDC4"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.5 11.9023V10.0845H17.6V11.9023H9.5Z"
                          fill="#FF4F79"
                        />
                      </svg>
                    </span>
                    <span class="">Location and Taxes</span>
                  </li>
                </ul>

                <div class="flex items justify-end py-3">
                  <p class="flex items-center">
                    Last 5
                    <svg
                      class="ml-2"
                      width="7"
                      height="4"
                      viewBox="0 0 7 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 3.54004L0.468911 0.540039L6.53109 0.540039L3.5 3.54004Z"
                        fill="#070707"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </drop-down>
      </div>

      <cloudenly-app-navigator :token="getToken" class="mr-6" />

      <!-- user meta section -->

      <div>
        <drop-down>
          <div slot="title">
            <div class="cursor-pointer" style="height: 40px; width: 40px">
              <img
                v-if="getUserData.photo === null"
                :src="require(`@/assets/images/optimaAsset/avatar.png`)"
                alt
                class="
                  rounded-full
                  w-full
                  h-full
                  block
                  cursor-pointer
                  object-cover
                "
              />

              <img
                v-else
                :src="getUserData.photo"
                alt
                class="
                  rounded-full
                  w-full
                  h-full
                  block
                  cursor-pointer
                  object-cover
                "
              />
            </div>
          </div>

          <div class="mt-5" slot="body">
            <div
              class="bg-white rounded-lg shadow-lg py-5"
              style="min-width: 25rem"
            >
              <div class="flex justify-end"></div>
              <div class="flex">
                <div class="mx-auto">
                  <div style="height: 80px; width: 80px">
                    <img
                      v-if="getUserData.photo === null"
                      :src="require(`@/assets/images/optimaAsset/avatar.png`)"
                      alt
                      class="
                        rounded-full
                        w-full
                        h-full
                        block
                        cursor-pointer
                        object-cover
                      "
                    />

                    <img
                      v-else
                      :src="getUserData.photo"
                      alt
                      class="
                        rounded-full
                        w-full
                        h-full
                        block
                        cursor-pointer
                        object-cover
                      "
                    />
                  </div>
                </div>
              </div>

              <div class="flex">
                <div class="mx-auto">
                  <div class="mt-3 text-center">
                    <p class="text-xl font-bold">
                      {{ getUserData.fname }} {{ getUserData.lname }}
                    </p>

                    <p class="font-normal text-gray-600 mt-2">
                      {{ getUserData.email }}
                    </p>

                    <p class="text-cloudenly-primary-main font-normal mt-2">
                      {{ getUserRoles.name }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Organisation section -->

              <div class="mt-8 mb-5">
                <div class="flex rounded shadow-lg mx-5 py-2">
                  <div class="mx-auto text-center">
                    <p class="text-xl font-bold">Current Outlet</p>
                    <p
                      class="
                        text-primary-optima-color
                        mt-1
                        font-light
                        leading-loose
                      "
                    >
                      {{ getLoginOutlet.name }}
                    </p>
                  </div>
                </div>
              </div>

              <hr class="mx-5 bg-gray-600" />
              <!-- End Organisation Section -->

              <!-- Switch Outlet section -->

              <div class="mx-5 py-3 mt-3">
                <p>Switch Outlet</p>

                <div class="mt-4">
                  <ul v-if="getUserData.isRoot == true" style>
                    <li
                      class="
                        py-3
                        px-2
                        rounded
                        border
                        border-solid
                        border-t-0
                        border-l-0
                        border-r-0
                        border-gray-500
                        cursor-pointer
                        hover:bg-gray-100
                      "
                      v-for="(outlet, index) in $options.filters.limitArray(
                        getAllOrganisationLocation,
                        (length = 3)
                      )"
                      :key="index"
                    >
                      <p class="text-xl text-gray-500">{{ outlet.name }}</p>
                      <p class="text-gray-500 font-normal mt-1">
                        {{ outlet.state }} . {{ outlet.type }}
                      </p>
                    </li>
                  </ul>

                  <ul v-else style>
                    <li
                      class="
                        py-3
                        px-2
                        rounded
                        border
                        border-solid
                        border-t-0
                        border-l-0
                        border-r-0
                        border-gray-500
                        cursor-pointer
                        hover:bg-gray-100
                      "
                      v-for="(outlet, index) in $options.filters.limitArray(
                        getUserOutlets,
                        (length = 3)
                      )"
                      :key="index"
                    >
                      <p class="text-xl text-gray-500">{{ outlet.name }}</p>
                      <p class="text-gray-500 font-normal mt-1">
                        {{ outlet.address }} . {{ outlet.type }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- End Switch Outlet section -->

              <!-- sign out -->

              <div class="py-3 text-center">
                <p
                  @click="logout"
                  class="cursor-pointer text-cloudenly-danger-main"
                >
                  Sign Out
                </p>
              </div>
            </div>
          </div>
        </drop-down>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import TopSearch from "./components/topSearch.vue";
import CloudenlyAppNavigator from "@/components/cloudenly-app-navigator";

// SVG Components
import Feedback from "./components/svgFolder/feedback.vue";
import Notifications from "./components/svgFolder/notifications.vue";
import Grid from "./components/svgFolder/grid.vue";
import Settings from "./components/svgFolder/settings.vue";

// images
import image_avatar from "@/assets/images/optimaAsset/avatar.png";
import image_hamburger_menu from "@/assets/images/optimaAsset/hamburger_menu.svg";
import image_humanar_icon from "@/assets/images/optimaAsset/humanarIcon.svg";
import image_quantum_icon from "@/assets/images/optimaAsset/quantum.svg";
import image_dome_icon from "@/assets/images/optimaAsset/domeIcon.svg";
import setEnv from "../../../../utils/setEnv";

export default {
  name: "MainNavbar",

  components: {
    TopSearch,
    CloudenlyAppNavigator,
    Feedback,
    Notifications,
    Grid,
    Settings,
  },

  data() {
    return {
      image_avatar,
      image_hamburger_menu,
      image_humanar_icon,
      image_quantum_icon,
      image_dome_icon,
    };
  },

  computed: {
    ...mapGetters("auth/auth", [
      "getUserData",
      "getUserOutlets",
      "getDefaultUsersOutlet",
      "getOrgData",
      "getOrgApps",
      "getToken",
      "getLoginOutlet",
    ]),
    ...mapGetters("auth/roles", ["getUserRoles"]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
  },

  methods: {
    async logout() {
      let cloudenlyWebsiteUrl = setEnv(process.env).cloudenlyURL;
      console.log(cloudenlyWebsiteUrl);
      window.location.href = cloudenlyWebsiteUrl;
      await this.$store.dispatch("auth/auth/set_logout");
      localStorage.clear();
    },

    navigateToApp(app) {
      const cloudenlyURL = `${process.env.VUE_APP_CLOUDENLY}`;
      const humanarURL = process.env.VUE_APP_HUMANAR;
      const baseURL = `${humanarURL}?linchpin=${this.$store.state.auth.auth.humanarData}`;
      const orgApp = this.getOrgApps.find((item) => item.appSlug === app);
      if (!orgApp.subscription || !orgApp.subscription.isActive) {
        window.open(cloudenlyURL, "_blank");
        return;
      }
      window.open(baseURL, "_blank");
    },

    // routeMessaging() {
    //   let url = `${process.env.VUE_APP_MESSAGE}?linchpin=${this.$store.state.auth.auth.humanarData}`;
    //   window.open(url, "_blank");
    // },

    // routeGlobalSetting() {
    //   let url = `${process.env.VUE_APP_QUANTUM}/dashboard`;
    //   window.open(url, "_blank");
    // },
  },

  mounted() {
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: 0px 1px 10px rgba(17, 21, 25, 0.1);

  &__link {
    // background: #dadada;
    height: 36px;
    width: 36px;
    color: #070707;

    &:hover {
      background: #dadada;
      color: #1034a6;
    }
  }
}
</style>
